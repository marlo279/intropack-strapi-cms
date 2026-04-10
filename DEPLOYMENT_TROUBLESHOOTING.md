# Deployment Troubleshooting: Strapi CMS on Railway

**Service**: `intropack-strapi-cms`
**Platform**: Railway
**Stack**: Strapi 5 · PostgreSQL · Node 18 · Docker

---

## The Problem

After deploying the service to Railway, Strapi failed to start. The container exited immediately with an `AggregateError` that looked roughly like this in the logs:

```
AggregateError
    at internalConnectMultiple (node:net:1117:18)
    at afterConnectMultiple (node:net:1684:7)
```

`AggregateError` is a JavaScript error type that wraps multiple underlying errors into one. Node.js uses it internally when a connection attempt cycles through several addresses and all of them fail. The problem is that the default Node.js error output only prints the top-level `AggregateError` message — it does **not** automatically print the individual errors it contains. This made the logs completely unhelpful: we could see that something failed, but not *what* or *why*.

---

## Step 1 — Add Process-Level Error Handlers

The first step was to make the error output actually useful. We added `unhandledRejection` and `uncaughtException` handlers at the top of `config/server.js` that explicitly iterate over the contained errors inside any `AggregateError` and print each one individually.

**`config/server.js`** (relevant addition):

```js
process.on("unhandledRejection", (reason, promise) => {
  console.error("=== Unhandled Promise Rejection ===");
  if (reason instanceof AggregateError) {
    console.error("AggregateError message:", reason.message);
    reason.errors.forEach((err, i) => {
      console.error(`  Contained error [${i}]:`, err);
      console.error(`  Stack [${i}]:`, err?.stack);
    });
  } else {
    console.error("Reason:", reason);
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("=== Uncaught Exception ===");
  if (err instanceof AggregateError) {
    err.errors.forEach((e, i) => {
      console.error(`  Contained error [${i}]:`, e);
      console.error(`  Stack [${i}]:`, e?.stack);
    });
  } else {
    console.error("Error:", err);
  }
  process.exit(1);
});
```

**Why this matters**: Without this, Node.js swallows the inner errors of an `AggregateError` and you are left debugging blind. These handlers ensure every contained error — including its message, code, and stack trace — is printed before the process exits.

---

## Step 2 — Add Database Diagnostics

The next step was to understand exactly what configuration Strapi was using when it tried to connect to the database. We added diagnostic logging at the top of `config/database.js` to print every relevant environment variable at startup, before any connection was attempted.

**`config/database.js`** (relevant addition):

```js
module.exports = ({ env }) => {
  const rawDatabaseUrl = env("DATABASE_URL");

  console.log("[DB Config] DATABASE_CLIENT              :", env("DATABASE_CLIENT", "(not set — defaulting to sqlite)"));
  console.log("[DB Config] DATABASE_URL                 :", rawDatabaseUrl
    ? rawDatabaseUrl.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:****@")
    : "(not set)");
  console.log("[DB Config] DATABASE_CONNECTION_TIMEOUT  :", env("DATABASE_CONNECTION_TIMEOUT", "(not set — defaulting to 60000)"));

  // ... rest of config
};
```

The password in the connection string is masked (`****`) so it is safe to log. The final resolved config object is also logged after construction so you can confirm exactly what Knex (Strapi's query builder) receives.

---

## Step 3 — Identify the Missing `DATABASE_URL`

With the diagnostics in place, the next deploy produced logs that immediately revealed the root cause:

```
[DB Config] DATABASE_CLIENT              : postgres
[DB Config] DATABASE_URL                 : (not set)
```

`DATABASE_URL` was not set. Strapi was configured to use the `postgres` client (via `DATABASE_CLIENT=postgres`), but the connection string it needed was `undefined`. This caused Knex to attempt a connection with no valid target, which produced the `AggregateError` wrapping a series of `ECONNREFUSED` / address-resolution failures.

**Why did this happen?** On Railway, environment variables are not automatically shared between services. Even though a PostgreSQL service existed in the same project, its connection string had to be explicitly referenced in the Strapi service's variable configuration. That reference had not been added.

---

## Step 4 — Add `DATABASE_URL` to the Strapi Service

The fix was to add the `DATABASE_URL` variable to the `intropack-strapi-cms` service in the Railway dashboard, pointing it at the internal (private network) connection string of the PostgreSQL service.

**In the Railway dashboard**:

1. Open the `intropack-strapi-cms` service → **Variables**.
2. Add a new variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Use Railway's reference syntax to pull the value from the Postgres service, e.g.:
     ```
     ${{Postgres.DATABASE_PRIVATE_URL}}
     ```
     This resolves to a `postgresql://` connection string using Railway's internal private network (e.g. `postgresql://postgres:password@postgres.railway.internal:5432/railway`).

Using the **private** URL (`.railway.internal`) rather than the public URL is preferred for internal service-to-service communication — it is faster, does not consume egress bandwidth, and keeps traffic off the public internet.

---

## Step 5 — Disable SSL for Internal Connections

After adding `DATABASE_URL`, the service still failed to start. The new error (now visible thanks to Step 1) was:

```
error: no pg_hba.conf entry for host "...", SSL off
```

or conversely, the PostgreSQL server on Railway's internal network does not terminate SSL — it expects plain connections on the private network. Knex's `pg` driver defaults to attempting an SSL handshake, which the server rejects.

**The fix** was to explicitly set `ssl: false` in the postgres connection config inside `config/database.js`:

```js
postgres: {
  connection: {
    connectionString: rawDatabaseUrl,
    ssl: false,          // Internal Railway connections do not use SSL
  },
  pool: { min: 2, max: 10 },
},
```

**Why `ssl: false`?** Railway's internal PostgreSQL service communicates over the private network (`*.railway.internal`) which does not require or support SSL. SSL is only needed for connections coming in over the public internet. Forcing SSL on an internal connection causes the handshake to fail immediately.

---

## Lessons Learned

### 1. `AggregateError` hides its children — always unwrap it
Node.js does not print the inner errors of an `AggregateError` by default. Any production Node.js service should have `unhandledRejection` and `uncaughtException` handlers that explicitly iterate `err.errors` and log each one. Add this once and never debug a silent `AggregateError` again.

### 2. Log your config at startup
Printing the resolved values of critical environment variables (with secrets masked) at startup costs nothing and saves enormous time. If the config is wrong, you see it in the first line of the logs — before any connection is even attempted.

### 3. Railway does not auto-share variables between services
Environment variables from one Railway service (e.g. Postgres) are not automatically available in another (e.g. Strapi). You must explicitly add a reference variable using Railway's `${{ServiceName.VARIABLE}}` syntax. Always verify that every required variable is present in the target service's variable list.

### 4. Use the private URL for internal connections
When two services are in the same Railway project, always use the `*_PRIVATE_URL` variant of the connection string. It routes traffic over Railway's internal network, which is faster and does not require SSL.

### 5. Disable SSL for internal PostgreSQL connections
When connecting to PostgreSQL over Railway's private network, set `ssl: false` in your Knex/database config. The internal network does not support SSL termination, and leaving SSL enabled (or relying on the driver default) will cause the connection to be rejected.
