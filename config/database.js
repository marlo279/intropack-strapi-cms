const path = require("path");

module.exports = ({ env }) => {
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
        connectionString: env("DATABASE_URL"),
        ssl: env("DATABASE_SSL", "false") === "true" ? { rejectUnauthorized: false } : false,
      },
      migrations: {
        lock: null,
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env("DATABASE_CONNECTION_TIMEOUT", "60000"),
    },
  };
};
