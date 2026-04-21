import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";

const isProd = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (isProd ? "info" : "debug"),
  base: { service: "thl-site" },
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie", 'req.headers["x-admin-key"]'],
    censor: "[redacted]",
  },
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Request-scoped HTTP logger. Attaches a short request ID to every request
 * (also set as res `x-request-id` header so clients can reference it in
 * bug reports). Access via req.id inside handlers.
 */
export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const incoming = req.headers["x-request-id"];
    const id = typeof incoming === "string" && incoming.length > 0 && incoming.length < 80
      ? incoming
      : randomUUID().slice(0, 8);
    res.setHeader("x-request-id", id);
    return id;
  },
  customLogLevel: (_req, res, err) => {
    if (err) return "error";
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      remoteAddress: req.remoteAddress,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
