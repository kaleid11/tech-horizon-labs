import express, { type Express } from "express";
import fs from "fs";
import path from "path";

const BASE_URL = "https://techhorizonlabs.com";
const SITE_NAME = "Tech Horizon Labs";

/**
 * Route-to-meta mapping for server-side meta tag injection.
 * Ensures crawlers see correct title/description without executing JavaScript.
 */
const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "AI Consulting Sunshine Coast & Brisbane — Claude & ChatGPT Setup",
    description: "Get your team using Claude and ChatGPT the right way. Learn fast at the Academy or let us map your workflows with precision consulting. Queensland AI consulting for Australian businesses.",
  },
  "/about": {
    title: "About Us — AI Consulting Queensland",
    description: "Meet Huxley Peckham, Founder of Tech Horizon Labs. AI Systems Architect helping Queensland and Australian SMEs deploy private, compliant AI systems.",
  },
  "/portfolio": {
    title: "AI Case Studies — Real Business Results",
    description: "Real AI case studies from Australian businesses. Construction directors saving 2 days/week, manufacturers cutting downtime 30%. See measurable results.",
  },
  "/portfolio/accounting-firm": {
    title: "Invoice AI & Accounting Automation",
    description: "Noosa accounting firm cut admin by 40% with private AI invoice processing. On-premises AI keeps sensitive data secure. Real Australian case study.",
  },
  "/portfolio/construction-builder": {
    title: "AI for Construction — Builder Case Study",
    description: "Construction director went from 2 days processing invoices and timesheets to 1 hour. See how AI transforms construction businesses.",
  },
  "/portfolio/real-estate-agency": {
    title: "Real Estate AI — Tenant Onboarding",
    description: "Real estate agency automates tenant onboarding workflow with private AI. Faster processing, fewer errors, and better tenant experience.",
  },
  "/portfolio/manufacturing": {
    title: "AI for Manufacturing — Predictive Maintenance",
    description: "Brisbane manufacturer reduced machine downtime by 30% and saves $50K+ annually with AI-powered predictive maintenance. Queensland case study.",
  },
  "/portfolio/healthcare-clinic": {
    title: "Healthcare AI — Patient Privacy Case Study",
    description: "Allied health clinic guarantees patient privacy with private AI systems. Reduced admin burden while maintaining full health data compliance.",
  },
  "/academy": {
    title: "AI Business Training Sunshine Coast",
    description: "1,300+ tested AI workflows, weekly live workshops, and 300+ operators. Learn to find and fix business bottlenecks with AI. Hands-on templates included.",
  },
  "/resources": {
    title: "AI Resources & Training Guides",
    description: "Free AI workshop materials, training guides, and templates for Australian businesses. Practical AI skills from invoice automation to workflow optimisation.",
  },
  "/services/audit": {
    title: "Free AI Readiness Assessment",
    description: "Free 15-minute AI readiness assessment for Australian businesses. Identify your highest-impact opportunities and understand your data readiness.",
  },
  "/services/accelerator": {
    title: "AI Foundation Sprint — 4 Weeks",
    description: "4-week AI implementation sprint. Build your AI-ready knowledge base and deploy private infrastructure with hands-on setup and staff training.",
  },
  "/services/partner": {
    title: "Ongoing AI Partnership & Support",
    description: "Continuous AI partnership keeping your infrastructure current as tools advance. Monthly reviews, priority support, and proactive updates.",
  },
  "/research": {
    title: "AI Research Hub & Company Analysis",
    description: "Deep analysis of Anthropic, OpenAI, Google DeepMind, Meta AI and more. Company comparisons, governance, funding rounds, and AI policy shifts.",
  },
  "/locations/queensland": {
    title: "AI Consulting Queensland — All Regions",
    description: "Queensland AI consulting that finds your costliest bottleneck and fixes it. Private infrastructure, compliant by design, Brisbane to Gold Coast.",
  },
  "/locations/brisbane": {
    title: "AI Consulting Brisbane — Local Expert",
    description: "Brisbane AI consulting that finds the right problem before selling you tools. Manufacturers cut downtime 30%, firms reduce admin 40%. Privacy Act compliant.",
  },
  "/locations/sunshine-coast": {
    title: "AI Consulting Sunshine Coast",
    description: "Sunshine Coast AI consulting that finds your costliest bottleneck and fixes it. Local expertise, private infrastructure, compliant by design.",
  },
  "/locations/gold-coast": {
    title: "AI Consulting Gold Coast — Local Expert",
    description: "Gold Coast AI consulting that finds the right problem first. Private infrastructure, compliant systems, real results for local businesses.",
  },
  "/industries/construction": {
    title: "AI for Construction Companies",
    description: "Construction AI consulting that finds the bottleneck costing builders the most. 60% faster quotes, 2 days saved per week. Free 15-min assessment.",
  },
  "/industries/accounting": {
    title: "AI for Accounting Firms — Cut Admin",
    description: "AI consulting for accounting firms. Find the bottleneck eating your billable hours — receipt processing, document triage, client follow-ups. 40% reduction.",
  },
  "/industries/legal": {
    title: "AI for Law Firms — Document Automation",
    description: "Legal AI consulting that finds the right problem first. 50% faster document review, 70% less manual searching. Private, privilege-aware infrastructure.",
  },
  "/industries/healthcare": {
    title: "AI for Healthcare — Cut Admin Time",
    description: "Healthcare AI consulting that reduces admin burden on clinicians. 35% less documentation time, 50% faster referrals. Private, health data compliant.",
  },
  "/industries/retail": {
    title: "AI for Retail — Smarter Operations",
    description: "Retail AI consulting that fixes operational bottlenecks — inventory forecasting, order processing, unified reporting. 30% fewer stockouts.",
  },
  "/insights/claude-vs-chatgpt-2026": {
    title: "Claude vs ChatGPT 2026 Comparison",
    description: "Honest Claude vs ChatGPT comparison from a consultant who deploys both. Real client data on privacy, cost, quality, and when to use each.",
  },
  "/audit-tool": {
    title: "AI Readiness Self-Assessment Tool",
    description: "Free 2-minute AI readiness assessment. 10 questions, instant results with a personalised radar chart showing your strengths and gaps.",
  },
  "/ai-ethics": {
    title: "Our AI Ethics & Transparency Principles",
    description: "How Tech Horizon Labs uses AI responsibly. Our five principles, data handling commitments, and clear boundaries on what we will and won't do.",
  },
  "/guides/claude-cowork-setup": {
    title: "Claude Cowork Setup Guide for Australian Businesses",
    description: "Step-by-step Claude Cowork setup with Australian compliance mapping. Desktop app config, connectors, best practices, and Privacy Act considerations.",
  },
  "/guides/chatgpt-to-claude": {
    title: "Migrating from ChatGPT to Claude — Practical Guide",
    description: "How to migrate business workflows from ChatGPT to Claude. Feature comparison, prompt translation, project setup, and hybrid workflow strategies.",
  },
  "/contact": {
    title: "Contact Tech Horizon Labs",
    description: "Book a free 15-minute AI discovery call, send us a message, or find our contact details. Sunshine Coast, Queensland — serving all of Australia.",
  },
  "/events": {
    title: "AI on the Coast — Sunshine Coast AI Meetup",
    description: "Free bi-monthly AI meetup at Sunshine Beach Surf Club. Practical talks, live demos, and honest conversations about AI for local businesses.",
  },
  "/openclaw": {
    title: "OpenClaw Setup Sunshine Coast — Honest Expert Guide",
    description: "OpenClaw setup on the Sunshine Coast by a consultant who tells you what it can and can't safely do. 512 known vulnerabilities. We deploy it right or recommend something better.",
  },
  "/insights/ai-impact-by-industry": {
    title: "AI Impact by Industry — Capability vs Adoption 2026",
    description: "Which industries benefit most from AI? Data shows 94% of admin tasks are AI-ready but only 32% of businesses use it. See the gap by occupation.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "Tech Horizon Labs privacy policy. How we collect, use, and protect your personal information under the Australian Privacy Act 1988.",
  },
  "/terms": {
    title: "Terms of Service",
    description: "Tech Horizon Labs terms of service. Read our terms and conditions for using our AI consulting services and website.",
  },
};

/**
 * Inject correct meta tags into index.html based on the requested URL path.
 * This ensures search engine crawlers see the right metadata without executing JS.
 */
function injectMeta(html: string, urlPath: string): string {
  const meta = PAGE_META[urlPath];
  if (!meta) return html;

  const fullTitle = `${meta.title} | ${SITE_NAME}`;
  const canonical = urlPath === "/" ? BASE_URL : `${BASE_URL}${urlPath}`;

  // Replace title tag
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${fullTitle}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace Open Graph tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${fullTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${fullTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.description}" />`
  );

  return html;
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Read index.html once at startup
  const indexHtml = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  app.use(express.static(distPath));

  // fall through to index.html with injected meta tags
  app.use("/{*path}", (req, res) => {
    const html = injectMeta(indexHtml, req.path);
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
}
