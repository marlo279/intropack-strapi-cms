FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Strapi requires these env vars at build time to compile the admin panel.
# Railway only injects real env vars at runtime, so we use placeholders here.
# The real values from Railway will override these at container startup.
ENV NODE_ENV=production
ENV APP_KEYS=build-placeholder-key1,build-placeholder-key2
ENV JWT_SECRET=build-placeholder-jwt-secret
ENV ADMIN_JWT_SECRET=build-placeholder-admin-jwt-secret
ENV API_TOKEN_SALT=build-placeholder-api-token-salt
ENV TRANSFER_TOKEN_SALT=build-placeholder-transfer-token-salt

RUN npm run build

# Ensure uploads and database dirs exist with correct permissions and ownership
RUN mkdir -p /app/public/uploads /app/database/migrations && \
    chown -R node:node /app/public/uploads /app/database/migrations && \
    chmod 755 /app/public/uploads /app/database/migrations

USER node

EXPOSE 1337

CMD ["npm", "run", "start"]
