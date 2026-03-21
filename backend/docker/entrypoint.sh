#!/bin/sh
set -eu

run_migrations="${DB_RUN_MIGRATIONS:-true}"
max_attempts="${DB_MIGRATION_MAX_ATTEMPTS:-30}"
retry_delay_seconds="${DB_MIGRATION_RETRY_DELAY_SECONDS:-2}"

if [ "$run_migrations" = "true" ]; then
  echo "Running database migrations..."

  attempt=1
  while [ "$attempt" -le "$max_attempts" ]; do
    if npx mikro-orm migration:up --config ./src/configs/mikro-orm.config.ts; then
      echo "Migrations applied successfully."
      break
    fi

    echo "Migration attempt ${attempt}/${max_attempts} failed. Retrying in ${retry_delay_seconds}s..."
    attempt=$((attempt + 1))
    sleep "$retry_delay_seconds"
  done

  if [ "$attempt" -gt "$max_attempts" ]; then
    echo "Migration failed after ${max_attempts} attempts. Exiting."
    exit 1
  fi
else
  echo "DB_RUN_MIGRATIONS=false, skipping migrations."
fi

exec node dist/src/main.js