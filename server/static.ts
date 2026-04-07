import express, { type Express } from "express";
import fs from "fs";
import path from "path";

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
  const replaced = html.replace(
    /<link[^>]*href=["']\/styles\.css["'][^>]*>/i,
    `${styleBlock}\n  ${asyncLink}`
  );
  return replaced;
}

/**
 * Core pages with server-side meta injection.
 */
const PAGES: Record<string, { file: string; title: string; description: string; fullTitle?: string }> = {
  "/": {
    file: "index.html",
    title: "AI Systems for Growing Businesses",
    description: "Tech Horizon Labs builds and deploys AI systems for growing businesses across the Sunshine Coast and Australia. We map workflows, build the systems, and train your team.",
  },
  "/work": {
    file: "work.html",
    fullTitle: "AI Systems We've Built for Australian Businesses | Tech Horizon Labs",
    title: "AI Systems Portfolio",
    description: "AI systems built and deployed for real businesses across Queensland and Australia. Talent agencies, accounting firms, builders, construction, allied health, energy, and manufacturing.",
  },
  "/about": {
    file: "about.html",
    fullTitle: "About Huxley Peckham — Queensland AI Consultant | Tech Horizon Labs",
    title: "About Huxley Peckham",
    description: "Huxley Peckham runs Tech Horizon Labs from Noosa Heads, Queensland. AI systems and workflow automation for growing Australian businesses. Infrastructure before automation.",
  },
  "/academy": {
    file: "academy.html",
    fullTitle: "AI Workshop Academy — Training for Australian Business Operators | Tech Horizon Labs",
    title: "AI Workshop Academy",
    description: "AI workshops, live sessions, and 1,300+ workflow templates for Australian business operators. Weekly live training, 300+ operators. Australian compliance pre-mapped. From $97/month.",
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

  if (process.env.NODE_ENV === "production") {
    htmlCache.set(cacheKey, html);
  }

  return html;
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

  // Register core pages (with meta injection)
  for (const [route, config] of Object.entries(PAGES)) {
    app.get(route, (_req, res) => {
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
    app.get(route, (_req, res) => {
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

  app.use("/fonts", express.static(path.join(servingDir, "fonts"), {
    maxAge: "365d",
    immutable: true,
  }));

  app.use(express.static(servingDir));

  // Serve public dir for og-image and other public assets
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
  }

  // Catch-all 404
  app.use((_req, res) => {
    const html = getHtml(servingDir, "index.html", "/");
    res.status(404).setHeader("Content-Type", "text/html");
    res.send(html || "Not found");
  });
}
