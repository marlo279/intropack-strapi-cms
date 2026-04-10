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
