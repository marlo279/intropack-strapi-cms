const path = require("path");

module.exports = ({ env }) => {
  // --- DB diagnostics: log all relevant env vars at startup ---
  const rawDatabaseUrl = env("DATABASE_URL");
  console.log("[DB Config] DATABASE_CLIENT              :", env("DATABASE_CLIENT", "(not set — defaulting to sqlite)"));
  console.log("[DB Config] DATABASE_URL                 :", rawDatabaseUrl
    ? rawDatabaseUrl.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:****@")
    : "(not set)");
  console.log("[DB Config] DATABASE_CONNECTION_TIMEOUT  :", env("DATABASE_CONNECTION_TIMEOUT", "(not set — defaulting to 60000)"));
  console.log("[DB Config] DATABASE_FILENAME            :", env("DATABASE_FILENAME", "(not set — defaulting to .tmp/data.db)"));

  try {
    const client = env("DATABASE_CLIENT", "sqlite");

    const connections = {
      sqlite: {
        connection: {
          filename: path.join(
            __dirname,
            "..",
            env("DATABASE_FILENAME", ".tmp/data.db")
          ),
        },
        useNullAsDefault: true,
      },
      postgres: {
        connection: {
          connectionString: rawDatabaseUrl,
          ssl: { rejectUnauthorized: false },
        },
        pool: {
          min: 2,
          max: 10,
        },
      },
    };

    const config = {
      connection: {
        client,
        ...connections[client],
        acquireConnectionTimeout: parseInt(env("DATABASE_CONNECTION_TIMEOUT", "60000"), 10),
      },
    };

    // Log the final resolved config (mask password in connection string)
    const sanitizedConfig = JSON.parse(JSON.stringify(config));
    if (sanitizedConfig.connection?.connection?.connectionString) {
      sanitizedConfig.connection.connection.connectionString =
        sanitizedConfig.connection.connection.connectionString.replace(
          /:\/\/([^:]+):([^@]+)@/,
          "://$1:****@"
        );
    }
    console.log("[DB Config] Final connection config      :", JSON.stringify(sanitizedConfig, null, 2));

    return config;
  } catch (err) {
    console.error("[DB Config] ERROR building database config:", err);
    throw err;
  }
};
