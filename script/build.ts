import { build as esbuild } from "esbuild";
import { rm, readFile, writeFile, cp, readdir } from "fs/promises";
import { join } from "path";
import { htmlToMarkdown, extractTitle } from "../server/markdown";

// Server deps to bundle (reduces cold start openat syscalls)
const allowlist = [
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "helmet",
  "compression",
  "nanoid",
  "pg",
  "resend",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("copying static site...");
  await cp("client/static", "dist/static", { recursive: true });

  console.log("minifying client JS...");
  await esbuild({
    entryPoints: ["client/static/main.js"],
    minify: true,
    outfile: "dist/static/main.min.js",
    logLevel: "info",
  });

  console.log("minifying client CSS...");
  await esbuild({
    entryPoints: ["client/static/styles.css"],
    minify: true,
    loader: { ".css": "css" },
    outfile: "dist/static/styles.css",
    allowOverwrite: true,
    logLevel: "info",
  });

  console.log("minifying critical CSS...");
  await esbuild({
    entryPoints: ["client/static/critical.css"],
    minify: true,
    loader: { ".css": "css" },
    outfile: "dist/static/critical.css",
    allowOverwrite: true,
    logLevel: "info",
  });

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

async function collectHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

async function verifyStylesheetLinks() {
  console.log("verifying stylesheet links in HTML files...");
  const htmlFiles = await collectHtmlFiles("dist/static");
  const pattern = /<link[^>]*href=["']\/styles\.css["'][^>]*>/i;
  const missing: string[] = [];

  for (const file of htmlFiles) {
    const content = await readFile(file, "utf-8");
    if (!pattern.test(content)) {
      missing.push(file.replace("dist/static/", ""));
    }
  }

  if (missing.length > 0) {
    console.error(
      `\n❌ BUILD FAILED: ${missing.length} HTML file(s) missing <link href="/styles.css"> tag.\n` +
      `   These pages will NOT receive critical CSS injection at runtime:\n` +
      missing.map((f) => `     - ${f}`).join("\n") +
      `\n   Add <link rel="stylesheet" href="/styles.css"> to each file's <head>.\n`
    );
    process.exit(1);
  }

  console.log(`  ✓ all ${htmlFiles.length} HTML files have stylesheet link`);
}

async function checkCriticalCssDrift() {
  console.log("checking critical CSS drift...");
  const styles = await readFile("client/static/styles.css", "utf-8");
  const critical = await readFile("client/static/critical.css", "utf-8");

  const checks: { label: string; pattern: RegExp }[] = [
    { label: "@font-face 'Fraunces'", pattern: /@font-face\s*\{[^}]*font-family:\s*['"]Fraunces['"]/s },
    { label: "@font-face 'Instrument Sans'", pattern: /@font-face\s*\{[^}]*font-family:\s*['"]Instrument Sans['"]/s },
    { label: ":root variables", pattern: /:root\s*\{/ },
    { label: ".site-nav", pattern: /\.site-nav\s*\{/ },
    { label: ".hero", pattern: /\.hero\s*\{/ },
    { label: ".hero h1", pattern: /\.hero\s+h1\s*\{/ },
    { label: ".fade-in", pattern: /\.fade-in\s*\{/ },
    { label: ".skip-link", pattern: /\.skip-link\s*\{/ },
    { label: ".trust-row", pattern: /\.trust-row\s*\{/ },
    { label: ".nav-links", pattern: /\.nav-links\s*\{/ },
  ];

  const warnings: string[] = [];
  for (const check of checks) {
    if (check.pattern.test(styles) && !check.pattern.test(critical)) {
      warnings.push(check.label);
    }
  }

  if (warnings.length > 0) {
    console.warn(
      `\n⚠️  Critical CSS drift detected — ${warnings.length} selector group(s) in styles.css but missing from critical.css:\n` +
      warnings.map((w) => `     - ${w}`).join("\n") +
      `\n   Update client/static/critical.css to include above-the-fold selectors.\n`
    );
  } else {
    console.log(`  ✓ critical.css covers all ${checks.length} expected selector groups`);
  }
}

/**
 * Generate public/llms-full.txt — a single plain-text corpus of every page,
 * concatenated in URL order, for AI crawlers / retrieval use. Mirrors the
 * set of URLs in public/sitemap.xml so llms-full.txt stays aligned with
 * what we surface to Google.
 */
async function generateLlmsFullTxt() {
  console.log("generating public/llms-full.txt...");
  const htmlFiles = await collectHtmlFiles("dist/static");
  const staticRoot = "dist/static";

  const urlFor = (relPath: string) => {
    const withoutRoot = relPath.replace(/^dist\/static\//, "").replace(/^dist[\\/]static[\\/]/, "");
    let route = "/" + withoutRoot.replace(/index\.html$/, "").replace(/\.html$/, "");
    if (route === "/") return "https://techhorizonlabs.com/";
    route = route.replace(/\/$/, "");
    return `https://techhorizonlabs.com${route}`;
  };

  const stripHtml = (html: string): string =>
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
      .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/[ \t]+/g, " ")
      .replace(/\s*\n\s*/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

  const ordered = htmlFiles.slice().sort((a, b) => a.localeCompare(b));
  const stamp = new Date().toISOString().slice(0, 10);

  const chunks: string[] = [
    "# Tech Horizon Labs — full site corpus",
    "",
    "> Plain-text concatenation of every indexed page on https://techhorizonlabs.com.",
    "> Generated from client/static/*.html at build time. Navigation, footer, scripts, and styles are stripped.",
    "> See https://techhorizonlabs.com/llms.txt for the curated map.",
    "",
    `Generated: ${stamp}`,
    `Pages: ${ordered.length}`,
    "",
    "---",
    "",
  ];

  for (const file of ordered) {
    const rel = file.replace(/^.*dist[\\/]static[\\/]/, "dist/static/");
    const url = urlFor(rel);
    const html = await readFile(file, "utf-8");
    const text = stripHtml(html);
    if (!text) continue;
    chunks.push(`## ${url}`);
    chunks.push("");
    chunks.push(text);
    chunks.push("");
    chunks.push("---");
    chunks.push("");
  }

  const out = chunks.join("\n");
  await writeFile("public/llms-full.txt", out, "utf-8");
  const kb = (Buffer.byteLength(out) / 1024).toFixed(1);
  console.log(`  ✓ public/llms-full.txt (${ordered.length} pages, ${kb} KB)`);
}

/**
 * Pre-generate a markdown view of every page as a `.md` sibling next to its
 * `.html` in dist/static. Served at runtime via content negotiation
 * (Accept: text/markdown) and directly at the `.md` URL. Reuses the same
 * page-collection approach as llms-full.txt.
 */
async function generateAgentMarkdown() {
  console.log("generating agent markdown (.md siblings)...");
  const htmlFiles = await collectHtmlFiles("dist/static");
  let count = 0;
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf-8");
    const md = htmlToMarkdown(html, extractTitle(html));
    if (!md.trim()) continue;
    await writeFile(file.replace(/\.html$/, ".md"), md, "utf-8");
    count++;
  }
  console.log(`  ✓ ${count} markdown files written`);
}

buildAll()
  .then(() => verifyStylesheetLinks())
  .then(() => checkCriticalCssDrift())
  .then(() => generateLlmsFullTxt())
  .then(() => generateAgentMarkdown())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
