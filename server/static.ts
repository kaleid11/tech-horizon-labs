import express, { type Express } from "express";
import fs from "fs";
import path from "path";

const BASE_URL = "https://techhorizonlabs.com";
const SITE_NAME = "Tech Horizon Labs";

/**
 * Route-to-file and meta mapping for the static site.
 */
const PAGES: Record<string, { file: string; title: string; description: string }> = {
  "/": {
    file: "index.html",
    title: "AI Systems for Growing Businesses",
    description: "Tech Horizon Labs builds and deploys AI systems for growing businesses across the Sunshine Coast and Australia. We map workflows, build the systems, and train your team.",
  },
  "/work": {
    file: "work.html",
    title: "Work",
    description: "AI systems we've built and deployed for real businesses. Talent agencies, accounting firms, builders, manufacturers, and more.",
  },
  "/about": {
    file: "about.html",
    title: "About",
    description: "Tech Horizon Labs is run by Huxley Peckham from Noosa, Queensland. We build and deploy AI systems for growing Australian businesses.",
  },
  "/academy": {
    file: "academy.html",
    title: "Academy",
    description: "Workshops and courses on AI tools for business. 1,300+ templates, weekly live sessions, 300+ operators. Australian compliance pre-mapped.",
  },
  "/contact": {
    file: "contact.html",
    title: "Contact",
    description: "Get in touch with Tech Horizon Labs. Based in Noosa Heads, Queensland. Serving businesses across Australia.",
  },
  "/research": {
    file: "research.html",
    title: "Research",
    description: "AI landscape research. Company valuations, funding analysis, and model comparisons. Data we track to pick the right tools for our clients.",
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

  const fullTitle = urlPath === "/"
    ? `${SITE_NAME} — ${page.title}`
    : `${page.title} — ${SITE_NAME}`;
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
