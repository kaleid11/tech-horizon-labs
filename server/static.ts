import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { htmlToMarkdown, extractTitle } from "./markdown";

const BASE_URL = "https://techhorizonlabs.com";
const SITE_NAME = "Tech Horizon Labs";

let _criticalCSS: string | null = null;
function getCriticalCSS(servingDir: string): string {
  if (_criticalCSS !== null) return _criticalCSS;
  const critPath = path.resolve(servingDir, "critical.css");
  if (fs.existsSync(critPath)) {
    _criticalCSS = fs.readFileSync(critPath, "utf-8").trim();
  } else {
    _criticalCSS = "";
  }
  return _criticalCSS;
}

function injectCriticalCSS(html: string, servingDir: string): string {
  const css = getCriticalCSS(servingDir);
  if (!css) return html;
  const styleBlock = `<style>${css}</style>`;
  const asyncLink = `<link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="/styles.css"></noscript>`;
  const pattern = /<link[^>]*href=["']\/styles\.css["'][^>]*>/i;
  if (!pattern.test(html)) {
    console.warn("[critical-css] No stylesheet link found to replace — page will use default loading");
    return html;
  }
  return html.replace(pattern, `${styleBlock}\n  ${asyncLink}`);
}

/**
 * Inject a <meta name="turnstile-sitekey"> tag so main.js can read the
 * public sitekey without it being hardcoded into HTML files.
 * No-op when TURNSTILE_SITEKEY is unset (keeps forms working in dev).
 */
function injectTurnstileSitekey(html: string): string {
  const sitekey = process.env.TURNSTILE_SITEKEY;
  if (!sitekey) return html;
  if (html.includes('name="turnstile-sitekey"')) return html;
  const tag = `<meta name="turnstile-sitekey" content="${sitekey}">`;
  if (html.includes("</head>")) {
    return html.replace("</head>", `  ${tag}\n</head>`);
  }
  return html;
}

/**
 * Core pages with server-side meta injection.
 */
const PAGES: Record<string, { file: string; title: string; description: string; fullTitle?: string }> = {
  "/": {
    file: "index.html",
    title: "AI Systems for Growing Businesses",
    description: "Tech Horizon Labs builds AI systems for VCs, SaaS scale-ups, wealth managers, talent agencies, and growing Australian businesses. Australian-built. Global clients. We map workflows, build the systems, train your team.",
  },
  "/work": {
    file: "work.html",
    fullTitle: "AI Case Studies — 8 Australian Builds | Tech Horizon Labs",
    title: "AI Case Studies",
    description: "Eight AI systems built for Australian businesses: 40% admin cut, 60% faster quotes, 80% faster onboarding, 50% fewer no-shows, $50K+ savings.",
  },
  "/about": {
    file: "about.html",
    fullTitle: "Huxley Peckham — Queensland AI Systems Architect",
    title: "About Huxley Peckham",
    description: "Huxley Peckham runs Tech Horizon Labs from Noosa Heads, Queensland. AI systems and workflow automation for growing Australian businesses. Infrastructure before automation.",
  },
  "/academy": {
    file: "academy.html",
    fullTitle: "AI Workshop Academy — Training for Australian Business Operators | Tech Horizon Labs",
    title: "AI Workshop Academy",
    description: "AI workshops, live sessions, and 1,300+ workflow templates for Australian business operators. Weekly live training, 300+ operators. Australian compliance pre-mapped. From $197/month.",
  },
  "/contact": {
    file: "contact.html",
    fullTitle: "Book a Free AI Consultation — Tech Horizon Labs",
    title: "Book a Free AI Consultation",
    description: "Book a free pre-discovery call with Tech Horizon Labs. Based in Noosa Heads, Queensland. We reply within one business day. We turn away 30% of inquiries — we'll tell you honestly if it's not the right fit.",
  },
  "/research": {
    file: "research.html",
    fullTitle: "AI Company Research Hub — Power, Money & Control in AI | Tech Horizon Labs",
    title: "AI Company Research Hub",
    description: "Free AI industry research covering governance, funding, and competitive analysis for Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, DeepSeek, Qwen, Perplexity, Kimi, and Mistral.",
  },
  "/report": {
    file: "report.html",
    fullTitle: "State of AI Readiness: Australian SMB 2026 — Free Report | Tech Horizon Labs",
    title: "State of AI Readiness: Australian SMB 2026",
    description: "Free report: first-party survey data from 54 Australian SMBs combined with Anthropic Economic Index, Deloitte, and IDC research. Download the 2026 AI Readiness Report.",
  },
  "/assessment": {
    file: "assessment.html",
    fullTitle: "Free AI Readiness Assessment — Where Does Your Business Stand? | Tech Horizon Labs",
    title: "AI Readiness Self-Assessment",
    description: "Free AI readiness self-assessment for Australian businesses. 10 questions, instant results. Find out which of the 4 AI Maturity Stages your business is in — Unaware, ChatGPT Plateau, Enabled, or AI-Native.",
  },
};

/**
 * Static HTML pages served directly (already have their own meta tags).
 * Maps URL path → file path relative to the static directory.
 */
const STATIC_FILES: Record<string, string> = {
  // Legal pages
  "/privacy": "privacy.html",
  "/terms": "terms.html",
  // Special pages
  "/security": "security.html",
  "/openclaw": "openclaw.html",
  "/tools": "tools.html",
  "/scorecard": "scorecard.html",
  // Location pages
  "/locations/sunshine-coast": "locations/sunshine-coast.html",
  "/locations/brisbane": "locations/brisbane.html",
  "/locations/gold-coast": "locations/gold-coast.html",
  "/locations/queensland": "locations/queensland.html",
  // Industry pages
  "/industries/legal": "industries/legal.html",
  "/industries/construction": "industries/construction.html",
  "/industries/healthcare": "industries/healthcare.html",
  "/industries/retail": "industries/retail.html",
  // ICP landing pages
  "/for/vcs-and-pe": "for/vcs-and-pe.html",
  "/for/wealth-management": "for/wealth-management.html",
  "/for/talent-agencies": "for/talent-agencies.html",
  "/for/manufacturing": "for/manufacturing.html",
  "/for/saas-scale-ups": "for/saas-scale-ups.html",
  // Training pages
  "/training/sunshine-coast": "training/sunshine-coast.html",
  // Insights
  "/insights": "insights/index.html",
  "/insights/how-australia-uses-ai-2026": "insights/how-australia-uses-ai-2026.html",
  "/insights/claude-vs-chatgpt-2026": "insights/claude-vs-chatgpt-2026.html",
  "/insights/ai-impact-by-industry": "insights/ai-impact-by-industry.html",
  "/insights/ai-implementation-cost-australia": "insights/ai-implementation-cost-australia.html",
  "/insights/ai-mistakes-australian-businesses": "insights/ai-mistakes-australian-businesses.html",
  "/insights/ai-readiness-stages-australia": "insights/ai-readiness-stages-australia.html",
  "/insights/ai-training-gap-australia": "insights/ai-training-gap-australia.html",
  "/insights/accc-microsoft-copilot-australia": "insights/accc-microsoft-copilot-australia.html",
  "/insights/ai-governance-australian-business": "insights/ai-governance-australian-business.html",
  "/insights/ai-for-law-firms-australia": "insights/ai-for-law-firms-australia.html",
};

/**
 * In-memory HTML cache — populated on first request, avoids disk reads per request.
 */
const htmlCache = new Map<string, string>();

function injectMeta(html: string, urlPath: string): string {
  const page = PAGES[urlPath];
  if (!page) return html;

  const fullTitle = page.fullTitle ?? (urlPath === "/"
    ? `${SITE_NAME} — ${page.title}`
    : `${page.title} — ${SITE_NAME}`);
  const canonical = urlPath === "/" ? BASE_URL : `${BASE_URL}${urlPath}`;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${fullTitle}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${page.description}">`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${canonical}">`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${fullTitle}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${page.description}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${canonical}">`
  );

  return html;
}

function getHtml(servingDir: string, filePath: string, urlPath?: string): string | null {
  const cacheKey = urlPath ?? filePath;
  const cached = htmlCache.get(cacheKey);
  if (cached) return cached;

  const fullPath = path.resolve(servingDir, filePath);
  if (!fs.existsSync(fullPath)) return null;

  let html = fs.readFileSync(fullPath, "utf-8");
  if (urlPath && PAGES[urlPath]) {
    html = injectMeta(html, urlPath);
  }
  html = injectCriticalCSS(html, servingDir);
  html = injectTurnstileSitekey(html);

  if (process.env.NODE_ENV === "production") {
    htmlCache.set(cacheKey, html);
  }

  return html;
}

/**
 * In-memory markdown cache — mirrors htmlCache. Keyed by route (or file).
 */
const mdCache = new Map<string, string>();

/**
 * Resolve the markdown view of a page. Prefers a pre-generated `.md` sibling
 * (written at build time next to each `.html`); falls back to converting the
 * HTML on the fly so the dev server works without a build. Returns null when
 * the source HTML is missing.
 */
function getMarkdown(
  servingDir: string,
  file: string,
  title?: string,
  cacheKey?: string,
): string | null {
  const key = cacheKey ?? file;
  const cached = mdCache.get(key);
  if (cached) return cached;

  const mdPath = path.resolve(servingDir, file.replace(/\.html$/, ".md"));
  let md: string | null = null;
  if (fs.existsSync(mdPath)) {
    md = fs.readFileSync(mdPath, "utf-8");
  } else {
    const htmlPath = path.resolve(servingDir, file);
    if (!fs.existsSync(htmlPath)) return null;
    const html = fs.readFileSync(htmlPath, "utf-8");
    md = htmlToMarkdown(html, title ?? extractTitle(html));
  }

  if (process.env.NODE_ENV === "production") {
    mdCache.set(key, md);
  }
  return md;
}

/**
 * True only when the client explicitly prefers markdown. Browsers and search
 * crawlers send `text/html` (or a wildcard accept), which resolves to HTML —
 * keeping the negotiation strictly additive.
 */
function prefersMarkdown(req: Request): boolean {
  return req.accepts(["text/html", "text/markdown"]) === "text/markdown";
}

/** Absolute URL of the markdown sibling for a given HTML file path. */
function mdUrlFor(file: string): string {
  return `${BASE_URL}/${file.replace(/\.html$/, ".md")}`;
}

/**
 * Attach RFC 8288 `Link` headers advertising agent-discoverable resources:
 * sitemap, llms.txt, the API catalog, the agent-skills index, and (where
 * available) the markdown alternate of the current page.
 */
function setDiscoveryLinks(res: Response, mdUrl?: string): void {
  const links = [
    `<${BASE_URL}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
    `<${BASE_URL}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${BASE_URL}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
    `<${BASE_URL}/.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"`,
  ];
  if (mdUrl) {
    links.push(`<${mdUrl}>; rel="alternate"; type="text/markdown"`);
  }
  res.setHeader("Link", links.join(", "));
}

/**
 * RFC 9727 / RFC 9264 linkset describing the public JSON API. Each endpoint is
 * an anchored context with documentation (llms.txt) and status (/api/health)
 * relations.
 */
function buildApiCatalog(): unknown {
  const serviceDoc = [
    { href: `${BASE_URL}/llms.txt`, type: "text/plain", title: "Tech Horizon Labs LLM map" },
  ];
  const status = [
    { href: `${BASE_URL}/api/health`, type: "application/json", title: "Health check" },
  ];
  const endpoint = (anchorPath: string) => ({
    anchor: `${BASE_URL}${anchorPath}`,
    "service-doc": serviceDoc,
    status,
  });
  return {
    linkset: [
      endpoint("/api/health"),
      endpoint("/api/contact"),
      endpoint("/api/newsletter"),
      endpoint("/api/audit"),
    ],
  };
}

function sha256OfFile(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;
  const buf = fs.readFileSync(filePath);
  return "sha256:" + crypto.createHash("sha256").update(buf).digest("hex");
}

function sha256OfString(value: string): string {
  return "sha256:" + crypto.createHash("sha256").update(value, "utf-8").digest("hex");
}

/**
 * Agent Skills Discovery index (v0.2.0): a `schema` field plus a `skills` array
 * where each entry carries name, type, description, url, and a sha256 digest of
 * the referenced resource.
 */
function buildSkillsIndex(publicDir: string): unknown {
  const skills: Array<{
    name: string;
    type: string;
    description: string;
    url: string;
    digest: string;
  }> = [];

  const add = (
    name: string,
    type: string,
    description: string,
    urlPath: string,
    digest: string | null,
  ) => {
    if (!digest) return;
    skills.push({ name, type, description, url: `${BASE_URL}${urlPath}`, digest });
  };

  add(
    "llms.txt",
    "documentation",
    "Curated map of Tech Horizon Labs pages for LLMs and research agents.",
    "/llms.txt",
    sha256OfFile(path.resolve(publicDir, "llms.txt")),
  );
  add(
    "llms-full.txt",
    "documentation",
    "Concatenated plain-text corpus of every indexed page.",
    "/llms-full.txt",
    sha256OfFile(path.resolve(publicDir, "llms-full.txt")),
  );
  add(
    "sitemap.xml",
    "sitemap",
    "XML sitemap of all canonical URLs with lastmod dates.",
    "/sitemap.xml",
    sha256OfFile(path.resolve(publicDir, "sitemap.xml")),
  );
  add(
    "robots.txt",
    "policy",
    "Crawler allow-list and Content-Signal content-usage preferences.",
    "/robots.txt",
    sha256OfFile(path.resolve(publicDir, "robots.txt")),
  );
  add(
    "api-catalog",
    "api",
    "Linkset catalog of the public JSON API endpoints.",
    "/.well-known/api-catalog",
    sha256OfString(JSON.stringify(buildApiCatalog(), null, 2)),
  );

  return {
    schema: "https://agentskills.org/schemas/agent-skills-discovery/v0.2.0",
    skills,
  };
}

export function serveStatic(app: Express) {
  const projectRoot = process.cwd();
  const staticDir = path.resolve(projectRoot, "client", "static");
  const distStaticDir = path.resolve(projectRoot, "dist", "static");
  const servingDir = fs.existsSync(distStaticDir) ? distStaticDir : staticDir;

  if (!fs.existsSync(servingDir)) {
    throw new Error(`Could not find the static directory: ${servingDir}`);
  }

  // Serve sitemap.xml and robots.txt with correct content types
  const publicDir = path.resolve(projectRoot, "public");
  app.get("/sitemap.xml", (_req, res) => {
    const filePath = path.resolve(publicDir, "sitemap.xml");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/xml");
      res.sendFile(filePath);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });
  app.get("/robots.txt", (_req, res) => {
    const filePath = path.resolve(publicDir, "robots.txt");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/plain");
      res.sendFile(filePath);
    } else {
      res.status(404).send("Robots.txt not found");
    }
  });

  // llms.txt + llms-full.txt — AI-crawler content map and full-text corpus.
  // llms.txt is hand-authored and committed; llms-full.txt is generated at
  // build time into public/ (gitignored) — served as text/plain either way.
  for (const name of ["llms.txt", "llms-full.txt"]) {
    app.get("/" + name, (_req, res) => {
      const filePath = path.resolve(publicDir, name);
      if (fs.existsSync(filePath)) {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.sendFile(filePath);
      } else {
        res.status(404).send(name + " not found");
      }
    });
  }

  // ===== Agent discovery endpoints =====
  // Registered before the catch-all 404 and the static middleware so they are
  // never shadowed.

  // RFC 9727 API catalog (RFC 9264 linkset) of the public JSON API.
  app.get("/.well-known/api-catalog", (_req, res) => {
    res.setHeader("Content-Type", "application/linkset+json");
    res.send(JSON.stringify(buildApiCatalog(), null, 2));
  });

  // Agent Skills Discovery index — agent-readable resources with sha256 digests.
  app.get("/.well-known/agent-skills/index.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(buildSkillsIndex(publicDir), null, 2));
  });

  // Register core pages (with meta injection)
  for (const [route, config] of Object.entries(PAGES)) {
    app.get(route, (req, res) => {
      setDiscoveryLinks(res, mdUrlFor(config.file));
      // Response body varies by Accept (HTML vs Markdown), so caches must key on it.
      res.setHeader("Vary", "Accept");
      if (prefersMarkdown(req)) {
        const md = getMarkdown(servingDir, config.file, config.fullTitle ?? config.title, route);
        if (md) {
          res.setHeader("Content-Type", "text/markdown; charset=utf-8");
          return res.send(md);
        }
      }
      const html = getHtml(servingDir, config.file, route);
      if (html) {
        res.setHeader("Content-Type", "text/html");
        res.send(html);
      } else {
        res.status(404).send("Page not found");
      }
    });
  }

  // Register static file pages (already have their own meta tags)
  for (const [route, file] of Object.entries(STATIC_FILES)) {
    app.get(route, (req, res) => {
      setDiscoveryLinks(res, mdUrlFor(file));
      // Response body varies by Accept (HTML vs Markdown), so caches must key on it.
      res.setHeader("Vary", "Accept");
      if (prefersMarkdown(req)) {
        const md = getMarkdown(servingDir, file, undefined, route);
        if (md) {
          res.setHeader("Content-Type", "text/markdown; charset=utf-8");
          return res.send(md);
        }
      }
      const html = getHtml(servingDir, file);
      if (html) {
        res.setHeader("Content-Type", "text/html");
        res.send(html);
      } else {
        res.status(404).send("Page not found");
      }
    });
  }

  // Trailing-slash redirects for specific nested routes
  for (const route of Object.keys(STATIC_FILES)) {
    if (route.includes("/") && route !== "/") {
      app.get(route + "/", (_req, res) => res.redirect(301, route));
    }
  }

  // Wildcard redirects — catch any nested slugs NOT handled above
  app.get("/locations/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/locations/:slug/", (_req, res) => res.redirect(301, "/"));
  app.get("/industries/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/industries/:slug/", (_req, res) => res.redirect(301, "/"));
  app.get("/insights/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/insights/:slug/", (_req, res) => res.redirect(301, "/"));
  app.get("/training/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/training/:slug/", (_req, res) => res.redirect(301, "/academy"));

  app.use("/fonts", express.static(path.join(servingDir, "fonts"), {
    maxAge: "365d",
    immutable: true,
  }));

  app.use(
    express.static(servingDir, {
      setHeaders: (res, filePath) => {
        // The pre-generated `.md` siblings are agent-readable duplicates of
        // their HTML pages (advertised via the rel="alternate" Link header).
        // Keep them fetchable by AI crawlers but out of the search index so
        // Google never treats them as duplicate content of the HTML version.
        if (filePath.endsWith(".md")) {
          res.setHeader("X-Robots-Tag", "noindex");
        }
      },
    }),
  );

  // Serve public dir for og-image and other public assets
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
  }

  // Catch-all 404
  app.use((_req, res) => {
    res.status(404).setHeader("Content-Type", "text/html");
    res.send(`<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — Tech Horizon Labs</title>
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/styles.css">
  <style>
    .notfound-container { display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:2rem; }
    .notfound-container h1 { font-size:3rem;margin-bottom:1rem; }
    .notfound-container p { color:var(--text-secondary);max-width:480px;margin-bottom:1.5rem; }
    .notfound-links { display:flex;flex-wrap:wrap;gap:1rem;justify-content:center; }
  </style>
</head>
<body>
  <nav class="site-nav" aria-label="Main navigation">
    <a href="/" class="brand"><img src="/logo.webp" alt="Tech Horizon Labs logo" class="brand-logo" width="28" height="28">Tech Horizon Labs</a>
  </nav>
  <main class="notfound-container">
    <h1>404</h1>
    <p>The page you are looking for does not exist or has been moved.</p>
    <div class="notfound-links">
      <a href="/" class="link-arrow">Go to homepage</a>
      <a href="/contact" class="link-arrow">Contact us</a>
      <a href="/insights" class="link-arrow">Read our insights</a>
    </div>
  </main>
</body>
</html>`);
  });
}
