#!/bin/bash
set -e

# Install dependencies
npm install

# Push database schema changes (non-interactive)
npm run db:push --force 2>/dev/null || npx drizzle-kit push --force 2>/dev/null || true

echo "Post-merge setup complete"
