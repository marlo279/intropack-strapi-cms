#!/bin/sh
set -e

# Fix permissions on mounted volumes
chown -R node:node /app/database /app/public/uploads 2>/dev/null || true
chmod -R 755 /app/database /app/public/uploads 2>/dev/null || true

exec "$@"
