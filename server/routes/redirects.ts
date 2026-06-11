import type { Express, Request, Response } from "express";

/**
 * 410 Gone helper for permanently removed WordPress-era URLs.
 * Returning 410 (rather than 404 or a catch-all redirect) tells Google
 * to drop the URL from its index faster than a soft-404 would.
 */
export function gone(_req: Request, res: Response) {
  res.status(410).type("html").send(`<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Removed — Tech Horizon Labs</title>
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <nav class="site-nav" aria-label="Main navigation">
    <a href="/" class="brand"><img src="/logo.webp" alt="Tech Horizon Labs logo" class="brand-logo" width="28" height="28">Tech Horizon Labs</a>
  </nav>
  <main class="container" style="padding:4rem 1rem;text-align:center;">
    <h1>This page has been permanently removed.</h1>
    <p style="color:var(--text-secondary);max-width:520px;margin:1rem auto 2rem;">It was part of our old WordPress site and is no longer available. Try the homepage, our latest insights, or get in touch.</p>
    <p><a href="/" class="link-arrow">Go to homepage</a> &middot; <a href="/insights" class="link-arrow">Read our insights</a> &middot; <a href="/contact" class="link-arrow">Contact us</a></p>
  </main>
</body>
</html>`);
}

/**
 * Registers every legacy / WordPress-era / old-SPA redirect + 410.
 * Mounted first in registerRoutes so we intercept before any other handler.
 */
export function registerLegacyRedirects(app: Express) {
  // ===== Legacy WordPress query-string handler =====
  // /?p=123 (and similar single-param ?p=) was the WP "ugly permalink" — 410 it.
  app.get("/", (req, res, next) => {
    if (typeof req.query.p === "string" && req.query.p.length > 0) {
      return gone(req, res);
    }
    next();
  });

  // ===== 301 Redirects — old React SPA routes to new static pages =====

  // Portfolio → Work
  app.get("/portfolio", (_req, res) => res.redirect(301, "/work"));
  app.get("/portfolio/", (_req, res) => res.redirect(301, "/work"));
  app.get("/portfolio/:slug", (_req, res) => res.redirect(301, "/work"));
  app.get("/portfolio/:slug/", (_req, res) => res.redirect(301, "/work"));

  // Services → Homepage
  app.get("/services", (_req, res) => res.redirect(301, "/"));
  app.get("/services/", (_req, res) => res.redirect(301, "/"));
  app.get("/services/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/services/:slug/", (_req, res) => res.redirect(301, "/"));

  // NOTE: Wildcard redirects for /locations/:slug, /industries/:slug, /insights/:slug
  // are registered in static.ts AFTER the specific page routes, to avoid catching them.

  // Guides → Academy (with a topical exception below)
  // The legacy /guides/chatgpt-to-claude URL still ranks on page 1; send it to
  // the matching comparison insight rather than the generic Academy page.
  app.get("/guides/chatgpt-to-claude", (_req, res) => res.redirect(301, "/insights/claude-vs-chatgpt-2026"));
  app.get("/guides/chatgpt-to-claude/", (_req, res) => res.redirect(301, "/insights/claude-vs-chatgpt-2026"));
  app.get("/guides/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/guides/:slug/", (_req, res) => res.redirect(301, "/academy"));

  // Individual removed pages
  app.get("/audit-tool", (_req, res) => res.redirect(301, "/assessment"));
  app.get("/audit-tool/", (_req, res) => res.redirect(301, "/assessment"));
  app.get("/ai-ethics", (_req, res) => res.redirect(301, "/about"));
  app.get("/events", (_req, res) => res.redirect(301, "/"));
  app.get("/resources", (_req, res) => res.redirect(301, "/academy"));
  app.get("/resources/", (_req, res) => res.redirect(301, "/academy"));

  // ===== Legacy redirects (WordPress era + old site) =====

  app.get("/for-business", (_req, res) => res.redirect(301, "/"));
  app.get("/for-business/", (_req, res) => res.redirect(301, "/"));
  app.get("/contact-us", (_req, res) => res.redirect(301, "/contact"));
  app.get("/contact-us/", (_req, res) => res.redirect(301, "/contact"));
  app.get("/about-us", (_req, res) => res.redirect(301, "/about"));
  app.get("/about-us/", (_req, res) => res.redirect(301, "/about"));
  app.get("/blog", (_req, res) => res.redirect(301, "/insights"));
  app.get("/blog/", (_req, res) => res.redirect(301, "/insights"));

  // Known legacy blog slugs (5 named WordPress articles) → 301 to /insights
  // Unknown blog slugs → 410 Gone so Google drops them from the index
  const KNOWN_BLOG_SLUGS = new Set([
    "navigating-the-ai-hype-cycle-turning-ai-potential-into-business-reality",
    "why-your-sunshine-coast-business-needs-a-no-nonsense-ai-consultant-in-2025-breaking-down-the-latest-ai-revolution",
    "master-ai-brain-dumping-sunshine-coast-ai-consultants-2025-guide",
    "ai-consultants-reveal-the-truth-about-privacy-in-the-age-of-artificial-intelligence",
    "your-enterprise-ai-tools-are-probably-overkill-heres-what-queensland-businesses-actually-need",
  ]);
  const blogSlugHandler = (req: Request, res: Response) => {
    const rawSlug = req.params.slug;
    const slug = typeof rawSlug === "string" ? rawSlug.replace(/\/$/, "") : "";
    if (KNOWN_BLOG_SLUGS.has(slug)) return res.redirect(301, "/insights");
    return gone(req, res);
  };
  app.get("/blog/:slug", blogSlugHandler);
  app.get("/blog/:slug/", blogSlugHandler);

  app.get("/membership", (_req, res) => res.redirect(301, "/academy"));
  app.get("/membership/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/ai-workshop-business-sunshine-coast", (_req, res) => res.redirect(301, "/training/sunshine-coast"));
  app.get("/ai-workshop-business-sunshine-coast/", (_req, res) => res.redirect(301, "/training/sunshine-coast"));

  // WordPress-era URL patterns — 410 Gone (no equivalent destination)
  app.get("/category/:slug", gone);
  app.get("/category/:slug/", gone);
  app.get("/tag/:slug", gone);
  app.get("/tag/:slug/", gone);
  app.get("/page/:slug", gone);
  app.get("/page/:slug/", gone);
  app.get(/^\/wp-content\/.*/, gone);
  app.get(/^\/wp-includes\/.*/, gone);
  app.get(/^\/wp-json(\/.*)?$/, gone);
  app.get("/wp-admin", gone);
  app.get(/^\/wp-admin\/.*/, gone);
  app.get("/wp-login.php", gone);
  app.get("/xmlrpc.php", gone);
  app.get("/comments/feed", gone);
  app.get("/comments/feed/", gone);
  app.get("/trackback", gone);
  app.get("/trackback/", gone);

  app.get("/privacy-policy", (_req, res) => res.redirect(301, "/privacy"));
  app.get("/privacy-policy/", (_req, res) => res.redirect(301, "/privacy"));
  app.get("/terms-of-service", (_req, res) => res.redirect(301, "/terms"));
  app.get("/terms-of-service/", (_req, res) => res.redirect(301, "/terms"));
  app.get("/book-here", (_req, res) => res.redirect(301, "/contact"));
  app.get("/book-here/", (_req, res) => res.redirect(301, "/contact"));
  app.get("/feed", gone);
  app.get("/feed/", gone);
  app.get(/^\/feed\/.*/, gone);
  app.get("/workshop/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshop/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/course/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/course/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/home", (_req, res) => res.redirect(301, "/"));
  app.get("/home/", (_req, res) => res.redirect(301, "/"));
  app.get("/index.html", (_req, res) => res.redirect(301, "/"));
  app.get("/index.php", (_req, res) => res.redirect(301, "/"));

  // ===== Additional WordPress legacy redirects =====
  app.get("/navigating-the-ai-hype-cycle-turning-ai-potential-into-business-reality", (_req, res) => res.redirect(301, "/insights"));
  app.get("/why-your-sunshine-coast-business-needs-a-no-nonsense-ai-consultant-in-2025-breaking-down-the-latest-ai-revolution", (_req, res) => res.redirect(301, "/insights"));
  app.get("/master-ai-brain-dumping-sunshine-coast-ai-consultants-2025-guide", (_req, res) => res.redirect(301, "/insights"));
  app.get("/ai-consultants-reveal-the-truth-about-privacy-in-the-age-of-artificial-intelligence", (_req, res) => res.redirect(301, "/insights"));
  app.get("/your-enterprise-ai-tools-are-probably-overkill-heres-what-queensland-businesses-actually-need", (_req, res) => res.redirect(301, "/insights"));
  app.get("/ai-business-training-sunshine-coast", (_req, res) => res.redirect(301, "/training/sunshine-coast"));
  app.get("/ai-business-training-sunshine-coast/", (_req, res) => res.redirect(301, "/training/sunshine-coast"));
  app.get("/ai-consultant-sunshine-coast-business-transformation", (_req, res) => res.redirect(301, "/locations/sunshine-coast"));
  app.get("/ai-consultant-sunshine-coast-business-transformation/", (_req, res) => res.redirect(301, "/locations/sunshine-coast"));
  app.get("/unctad-2025-ai-report-australia-guide", (_req, res) => res.redirect(301, "/insights"));
  app.get("/unctad-2025-ai-report-australia-guide/", (_req, res) => res.redirect(301, "/insights"));
  app.get("/for-home", (_req, res) => res.redirect(301, "/academy"));
  app.get("/for-home/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/author/huxleythzn-world", (_req, res) => res.redirect(301, "/about"));
  app.get("/author/huxleythzn-world/", (_req, res) => res.redirect(301, "/about"));
  app.get("/event/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/event/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/events/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/events/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses/sample-course", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses/sample-course/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/product-category/support", (_req, res) => res.redirect(301, "/contact"));
  app.get("/product-category/support/", (_req, res) => res.redirect(301, "/contact"));
  app.get("/product/free-pre-discovery-call", (_req, res) => res.redirect(301, "/contact"));
  app.get("/product/free-pre-discovery-call/", (_req, res) => res.redirect(301, "/contact"));
}
