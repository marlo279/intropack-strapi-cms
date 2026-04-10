process.on("unhandledRejection", (reason, promise) => {
  console.error("=== Unhandled Promise Rejection ===");
  console.error("Promise:", promise);
  if (reason instanceof AggregateError) {
    console.error("AggregateError message:", reason.message);
    console.error("AggregateError stack:", reason.stack);
    reason.errors.forEach((err, i) => {
      console.error(`  Contained error [${i}]:`, err);
      console.error(`  Stack [${i}]:`, err?.stack);
    });
  } else {
    console.error("Reason:", reason);
    if (reason?.stack) console.error("Stack:", reason.stack);
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("=== Uncaught Exception ===");
  if (err instanceof AggregateError) {
    console.error("AggregateError message:", err.message);
    console.error("AggregateError stack:", err.stack);
    err.errors.forEach((e, i) => {
      console.error(`  Contained error [${i}]:`, e);
      console.error(`  Stack [${i}]:`, e?.stack);
    });
  } else {
    console.error("Error:", err);
    console.error("Stack:", err?.stack);
  }
  process.exit(1);
});

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env("PORT", "1337"),
  app: {
    // keys: env("APP_KEYS", "").split(","),
    keys: env("APP_KEYS", "").split(",").filter(Boolean),
  },
  webhooks: {
    populateRelations: env("WEBHOOKS_POPULATE_RELATIONS", "false") === "true",
  },
});
