import * as Sentry from "@sentry/node";

// MUST be imported before any other server module so OpenTelemetry can
// wrap Express, pg, http, etc. See server/index.ts top import order.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN) && process.env.NODE_ENV !== "test",
  environment: process.env.NODE_ENV ?? "development",
  release: process.env.RELEASE_SHA,
  // Low default sample rate; raise via env when investigating performance.
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.05"),
  // Suppress the honeypot-drop fake-200 path from polluting Sentry.
  ignoreErrors: [
    "Too many requests. Please try again later.",
  ],
});
