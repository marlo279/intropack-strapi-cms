"use strict";

module.exports = {
  register({ strapi }) {},

  async bootstrap({ strapi }) {
    // Set public API permissions for products and news-articles
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (!publicRole) {
      strapi.log.warn("Public role not found, skipping permission setup");
      return;
    }

    const contentTypes = [
      { uid: "api::product.product", actions: ["find", "findOne"] },
      { uid: "api::news-article.news-article", actions: ["find", "findOne"] },
    ];

    for (const ct of contentTypes) {
      for (const action of ct.actions) {
        const permKey = `${ct.uid}.${action}`;
        const existing = await strapi
          .query("plugin::users-permissions.permission")
          .findOne({ where: { action: permKey, role: publicRole.id } });

        if (!existing) {
          await strapi.query("plugin::users-permissions.permission").create({
            data: { action: permKey, role: publicRole.id, enabled: true },
          });
          strapi.log.info(`Permission enabled: ${permKey}`);
        } else if (!existing.enabled) {
          await strapi
            .query("plugin::users-permissions.permission")
            .update({ where: { id: existing.id }, data: { enabled: true } });
          strapi.log.info(`Permission enabled (updated): ${permKey}`);
        }
      }
    }

    strapi.log.info("Public API permissions configured");
  },
};
