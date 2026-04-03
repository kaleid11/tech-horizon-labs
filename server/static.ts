import express, { type Express } from "express";
import fs from "fs";
import path from "path";

const BASE_URL = "https://techhorizonlabs.com";
const SITE_NAME = "Tech Horizon Labs";

/**
 * Route-to-file and meta mapping for the static site.
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
    description: "Free AI readiness self-assessment for Australian businesses. 10 questions, instant results. Find out which of the 4 AI Maturity Stages your business is in — Discovery, ChatGPT Plateau, Systematically Enabled, or Fully AI-Native.",
  },
  "/privacy": {
    file: "privacy.html",
    title: "Privacy Policy",
    description: "Tech Horizon Labs privacy policy. How we collect, use, and protect your personal information under the Australian Privacy Act 1988.",
  },
  "/terms": {
    file: "terms.html",
    title: "Terms of Service",
    description: "Tech Horizon Labs terms of service for our AI implementation services and website.",
  },
};

/**
 * Inject correct meta tags into HTML based on the requested URL path.
 */
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

function servePage(servingDir: string, urlPath: string): string | null {
  const page = PAGES[urlPath];
  if (!page) return null;

  const filePath = path.resolve(servingDir, page.file);
  if (!fs.existsSync(filePath)) return null;

  const html = fs.readFileSync(filePath, "utf-8");
  return injectMeta(html, urlPath);
}

export function serveStatic(app: Express) {
  const projectRoot = process.cwd();
  const staticDir = path.resolve(projectRoot, "client", "static");
  const distStaticDir = path.resolve(projectRoot, "dist", "static");
  const servingDir = fs.existsSync(distStaticDir) ? distStaticDir : staticDir;

  if (!fs.existsSync(servingDir)) {
    throw new Error(`Could not find the static directory: ${servingDir}`);
  }

  // Register explicit GET routes for each known page FIRST
  for (const [route, _config] of Object.entries(PAGES)) {
    app.get(route, (_req, res) => {
      const html = servePage(servingDir, route);
      if (html) {
        res.setHeader("Content-Type", "text/html");
        res.send(html);
      } else {
        res.status(404).send("Page not found");
      }
    });
  }

  // Serve CSS, JS, favicon, and other static assets
  app.use(express.static(servingDir));

  // Serve public dir for sitemap, robots, og-image
  const publicDir = path.resolve(projectRoot, "public");
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
  }

  // Catch-all 404
  app.use((_req, res) => {
    const html = servePage(servingDir, "/");
    res.status(404).setHeader("Content-Type", "text/html");
    res.send(html || "Not found");
  });
}
