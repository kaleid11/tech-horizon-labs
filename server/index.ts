// IMPORTANT: Sentry init must run before any module it wants to
// auto-instrument (Express, pg, http). Keep this as the very first import.
import "./instrument";

import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import * as Sentry from "@sentry/node";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { logger, httpLogger } from "./logger";

const app = express();

// Structured request logging with request IDs (sets x-request-id header).
// Installed first so every downstream middleware sees req.id.
app.use(httpLogger);

// Enable gzip/brotli compression for all responses
app.use(compression());

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://plausible.io", "https://challenges.cloudflare.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://www.google-analytics.com", "https://www.googletagmanager.com", "https://plausible.io", "https://challenges.cloudflare.com"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://challenges.cloudflare.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding external resources
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
  },
}));
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  logger.info({ source }, message);
}

(async () => {
  await registerRoutes(httpServer, app);

  // Strip trailing slashes globally (except root "/") — runs after redirect routes
  app.use((req, res, next) => {
    if (req.path !== "/" && req.path.endsWith("/")) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      return res.redirect(301, req.path.slice(0, -1) + query);
    }
    next();
  });

  // Sentry captures unhandled errors. Must be installed BEFORE our custom
  // handler so the error makes it into Sentry before we send a response.
  Sentry.setupExpressErrorHandler(app);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const clientMessage = status >= 500
      ? "Internal Server Error"
      : (err.message || "Request failed");

    logger.error({ err, req_id: (req as any).id, status }, "request failed");

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message: clientMessage });
  });

  // Serve static HTML files in both dev and production
  serveStatic(app);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})().catch((err) => {
  logger.fatal({ err }, "fatal startup error");
  process.exit(1);
});
