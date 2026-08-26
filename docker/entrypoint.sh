#!/bin/sh
#
# Container entrypoint. Runs once per instance start, before any request is
# served, then hands PID 1 to the CMD (supervisord).
#
# Everything here is either (a) required to satisfy the Cloud Run contract, or
# (b) a fail-fast check that turns a silent misconfiguration into one obvious
# line in the log instead of a 500 on every page.

set -eu

log() { echo "[entrypoint] $*"; }
fatal() { echo "[entrypoint] FATAL: $*" >&2; exit 1; }

# -----------------------------------------------------------------------------
# 1. Listen on the port Cloud Run asked for
# -----------------------------------------------------------------------------
# Cloud Run picks the port and passes it in $PORT. A container that listens
# anywhere else fails the startup probe and the revision never goes live.
PORT="${PORT:-8080}"
sed -i "s/listen 8080 default_server;/listen ${PORT} default_server;/; \
        s/listen \[::\]:8080 default_server;/listen [::]:${PORT} default_server;/" \
    /etc/nginx/http.d/default.conf
log "nginx will listen on port ${PORT}"

# -----------------------------------------------------------------------------
# 2. Fail fast on configuration that cannot possibly work
# -----------------------------------------------------------------------------
# No APP_KEY means no session cookies, no encrypted values and no signed URLs.
# Laravel would boot and then throw on the first request; better to never start.
[ -n "${APP_KEY:-}" ] || fatal "APP_KEY is unset. Generate one with 'php artisan key:generate --show' and set it as an environment variable or Secret Manager secret."

case "${APP_KEY}" in
    base64:*|*[!\ ]*) : ;;
    *) fatal "APP_KEY looks empty or malformed." ;;
esac

# Cloud Run instances have no persistent disk, so a SQLite file is discarded
# every time an instance is recycled — which happens constantly at min-instances=0.
case "${DB_CONNECTION:-}" in
    ""|sqlite)
        log "WARNING: DB_CONNECTION='${DB_CONNECTION:-unset}'. Cloud Run has no persistent"
        log "WARNING: disk; SQLite data will be lost on every instance restart. Use MySQL."
        ;;
esac

# APP_DEBUG=true renders full stack traces — including environment variables and
# database credentials — to anyone who triggers an error.
case "${APP_DEBUG:-}" in
    true|1|on|On|TRUE)
        log "WARNING: APP_DEBUG is enabled. Stack traces with credentials will be"
        log "WARNING: shown to end users. Set APP_DEBUG=false for production."
        ;;
esac

# -----------------------------------------------------------------------------
# 3. Writable paths
# -----------------------------------------------------------------------------
# storage/app/public may be a freshly mounted (and therefore empty) GCS bucket,
# so the subdirectories are recreated on every start rather than only at build.
mkdir -p storage/framework/cache/data \
         storage/framework/sessions \
         storage/framework/views \
         storage/logs \
         storage/app/public \
         bootstrap/cache \
         /tmp/opcache

# Only chown what must be writable. Doing this to the whole tree on every start
# is slow and would also try to rewrite every object in the mounted bucket.
chown -R www-data:www-data storage/framework storage/logs bootstrap/cache 2>/dev/null || true
chmod -R 775 storage/framework storage/logs bootstrap/cache 2>/dev/null || true

# -----------------------------------------------------------------------------
# 4. Warm Laravel's caches
# -----------------------------------------------------------------------------
# These are built HERE, at container start, and deliberately not at image build
# time: config:cache freezes the values of env() at the moment it runs, and at
# build time none of the Cloud Run environment variables exist yet. Baking the
# cache into the image would ship a config that points at nothing.
#
# Caching config does NOT break the runtime env() calls in PaymentController.
# config:cache only stops Laravel from reading a .env *file*; variables injected
# into the process environment by Cloud Run remain visible to env() through
# php-fpm (which is why clear_env=no in php-fpm.conf is mandatory).
rm -f bootstrap/cache/config.php bootstrap/cache/routes-v7.php bootstrap/cache/events.php

php artisan config:cache
php artisan view:cache

# routes/web.php defines several routes as closures. Laravel 11+ ships
# laravel/serializable-closure and can cache these (older guidance that closure
# routes are uncacheable no longer applies), but it is not worth failing a
# deploy over a performance optimisation, so a failure here is non-fatal.
php artisan route:cache || log "WARNING: route:cache failed; continuing with runtime route resolution."

# -----------------------------------------------------------------------------
# 5. Migrations — opt-in only
# -----------------------------------------------------------------------------
# Leave RUN_MIGRATIONS unset on Cloud Run. During a rollout several instances
# boot at once and Laravel's migrator takes no distributed lock, so they race
# each other on the `migrations` table and can half-apply a schema.
#
# The safe pattern is a one-off Cloud Run Job run BEFORE switching traffic:
#     gcloud run jobs execute emi-migrate --region="$REGION" --wait
#
# This switch exists for local docker-compose use, where there is exactly one
# instance. The failure is not swallowed: booting against a half-migrated schema
# produces confusing "table not found" errors on random requests instead of one
# clear startup failure.
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
    log "RUN_MIGRATIONS=true — applying database migrations"
    php artisan migrate --force
fi

log "startup complete; handing off to $*"
exec "$@"
