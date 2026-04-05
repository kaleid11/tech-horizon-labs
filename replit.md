# Tech Horizon Labs - AI Consulting Website

## Overview

This project is a modern full-stack TypeScript website for Tech Horizon Labs (ABN: 80 976 285 425), an AI implementation consulting firm run by Huxley Peckham from Noosa Heads, Queensland. It showcases their "infrastructure before automation" approach to AI consulting, featuring service offerings, case studies, pricing, an academy for AI training, an AI industry research hub, and interactive diagnostic tools. The primary goal is to attract businesses seeking AI solutions and establish THL as Queensland's premier fractional AI ops consultancy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Static HTML pages served via Express
- **Routing**: Express for all page routes
- **Styling**: Tailwind CSS v4 with a custom theme, using Fraunces (serif headings) and Instrument Sans (body) fonts, and a color palette including `--bg: #FAFAF8` and `--accent: #B5654A`.
- **Animations**: Dot-grid canvas background and CSS fade-in animations via `main.js`.
- **Build Tool**: esbuild for server bundling.
- **SEO**: Server-side meta injection via `server/static.ts` for core pages, plus per-page JSON-LD schemas (FAQPage, Article, BreadcrumbList, LocalBusiness, Organization).
- **Static Site**: The `client/static/` directory hosts the main static pages. Core pages (index, work, about, academy, contact, research, report, assessment) get server-side meta injection. Static file pages (tools, scorecard, locations, industries, insights, privacy, terms, security, openclaw) serve their own embedded meta.

### Backend Architecture
- **Framework**: Express 5 on Node.js with strict routing enabled.
- **API Design**: RESTful endpoints under the `/api/*` prefix.
- **Database ORM**: Drizzle ORM with PostgreSQL dialect.
- **Schema Validation**: Zod with drizzle-zod for type-safe validation.
- **Static Serving**: `server/static.ts` handles page routing with two maps: `PAGES` (with meta injection) and `STATIC_FILES` (serve-as-is). Wildcard redirects for unknown nested slugs come after specific routes.
- **Post-Merge**: `scripts/post-merge.sh` runs `npm install` and `drizzle-kit push` after task merges.

### Data Storage
- **Database**: PostgreSQL, configured via `DATABASE_URL`.
- **Schema**: Defined in `shared/schema.ts`, including tables for `contact_submissions`, `newsletter_signups`, and `audit_submissions`.
- **Migrations**: Managed via Drizzle Kit (`npm run db:push`).

### Key Design Patterns
- **Shared Schema**: Database schema and Zod validators are defined once in `shared/` for both frontend and backend.
- **Storage Abstraction**: An `IStorage` interface in `server/storage.ts` abstracts database operations.
- **Path Aliases**: TypeScript aliases `@/` for client source and `@shared/` for shared code.
- **Research Data**: AI company research data is embedded directly in `client/static/research.html`.

### Feature Specifications

#### Navigation
Main navigation includes Services (dropdown), Portfolio, Research, Locations, and Academy. All booking CTAs link to: `https://app.klipycrm.com/book/pre-discovery/free-pre-discovery`

#### AI Research Hub (`/research`)
Deep analysis of 10 AI companies — Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, DeepSeek, Qwen (Alibaba), Perplexity, Kimi, and Mistral. Features a three-view comparison dashboard (Valuation Race multi-line SVG chart, Total Funding horizontal bar chart, Quick Stats grid), cumulative funding raised line chart, expandable company profile cards with tabbed UI (Overview/Funding/Investors), and at-a-glance comparison table. All data embedded in `client/static/research.html`. FAQPage JSON-LD schema included. Company colors: Anthropic #d4a843, OpenAI #10A37F, Google DeepMind #4285F4, Meta AI #0668E1, xAI #1DA1F2, DeepSeek #E53935, Qwen #FF6A00, Perplexity #20B8CD, Kimi #6366F1, Mistral #FF7000.

#### AI Readiness Assessment (`/assessment`)
10-question multi-step assessment scoring 0-100. Results are completely ungated — shown immediately after completing all questions. Results map to 4 stages:
- Stage 1: Unaware (0-25)
- Stage 2: ChatGPT Plateau (26-50)
- Stage 3: Enabled (51-75)
- Stage 4: AI-Native (76-100)

Optional "Stay in touch?" card below results with checkboxes: send results by email, request human follow-up, newsletter signup. Calls `/api/audit` with opt-in flags. Huxley notification via Resend if follow-up requested. CTA card links to `/scorecard` for deeper analysis. Old `/audit-tool` URL redirects here.

#### AI Readiness Scorecard (`/scorecard`)
28-question diagnostic across 6 dimensions (A-F): Current AI Usage, Data & Knowledge Readiness, Tool Integration, Team AI Capability, Strategy & Governance, Measurable Impact. Scores 28-140 mapping to the same 4 stages. Section scores visible without email. Email gate (light) unlocks dimension-specific recommendations. Submissions go to `/api/newsletter` with `source: "scorecard"`.

#### AI Readiness Report (`/report`)
Gated landing page for "State of AI Readiness: Australian SMB 2026" PDF. Collects email via `/api/newsletter` with `source: "report-download"`. Post-submission shows 4-step "what next" flow linking to assessment, scorecard, and discovery call.

#### AI Tool Cheat Sheet (`/tools`)
Printable one-pager with Huxley's top 10 recommended AI tools (Claude, Claude Code/Replit, ChatGPT/Codex, Opus.pro, NotebookLM, Gemini, Acronis, MacWhisper, LM Studio, Keeper Security) plus honourable mentions. Category filter, print CSS, Article + FAQPage JSON-LD.

#### Insights (`/insights`)
8 articles: AI Implementation Cost, 5 AI Mistakes, AI Readiness Stages, Claude vs ChatGPT 2026, How Australia Uses AI 2026, AI Impact by Industry, The AI Training Gap (Frontier Orchestrator framework), ACCC & Microsoft Copilot (AI bundling). Each has Article + FAQPage + BreadcrumbList JSON-LD, author bio, CTAs, related articles, and scroll-triggered newsletter bar.

#### Location Pages (`/locations/*`)
4 pages: Sunshine Coast, Brisbane, Gold Coast, Queensland. FAQPage + ServiceArea JSON-LD. Cross-linked to sibling locations.

#### Industry Pages (`/industries/*`)
4 pages: Legal, Construction, Healthcare, Retail. Industry-specific AI use cases and CTAs.

#### Strategy Positioning (from internal frameworks)
- **4 AI Maturity Stages**: Unaware, ChatGPT Plateau, Enabled, AI-Native
- **3 Trainer Archetypes** (Frontier Orchestrator framework): Business Coach, Single-Tool Specialist, Frontier Orchestrator — detailed on about page
- **Efficiency AI → Opportunity AI** framing on homepage
- **Academy Tiers**: Community (Free), Base ($97/mo), Pro ($300/mo), Partner ($1,000/mo)

#### Email System
- `sendContactAutoReply`: confirmation to contact form submitters
- `sendNewsletterWelcome`: welcome email for newsletter/report signups
- `sendAuditResults`: assessment results email with stage, recommendations, booking CTA
- `sendAuditNotification`: internal notification to hello@techhorizonlabs.com
- All via Resend. Fire-and-forget for CRM (Klipy) and newsletter (Beehiiv) syncing.

#### SEO/AEO/GEO
- robots.txt with explicit Allow for 14 AI crawlers
- Sitemap with 31 URLs
- FAQPage JSON-LD on key pages (homepage, assessment, scorecard, tools, location pages, and 5 of 8 articles — the 3 oldest articles lack FAQ content sections)
- LocalBusiness + Organization schema on homepage
- Article schema on all insights articles and tools page
- BreadcrumbList on all pages
- Canonical tags on all pages
- OG + Twitter Card meta on all pages

## External Dependencies

### Database
- **PostgreSQL**: Primary database.
- **Drizzle ORM**: For database interactions.

### Email Service
- **Resend**: For sending emails (contact notifications, newsletter welcome, audit results).

### CRM & Newsletter
- **Klipy CRM**: For booking integrations and subscriber syncing.
- **Beehiiv**: For newsletter platform integration.

### Build & Development Tools
- **esbuild**: Server bundling.
- **tsx**: TypeScript execution for development.

## File Structure (Key Files)

### Server
- `server/index.ts` — Express app setup, strict routing enabled
- `server/routes.ts` — API endpoints + 301 redirects
- `server/static.ts` — Static page routing (PAGES + STATIC_FILES maps)
- `server/email.ts` — Resend email functions
- `server/storage.ts` — Database operations interface

### Shared
- `shared/schema.ts` — Drizzle schema (contact_submissions, newsletter_signups, audit_submissions)

### Static Pages
- `client/static/index.html` through `client/static/terms.html` — all static pages
- `client/static/insights/*.html` — insight articles
- `client/static/locations/*.html` — location pages
- `client/static/industries/*.html` — industry pages

### Research Hub
- `client/static/research.html` — Research Hub with valuation chart, company profiles, and comparison table

### SEO
- `public/sitemap.xml` — XML sitemap
- `public/robots.txt` — Robots directives

### Infrastructure
- `scripts/post-merge.sh` — Post-merge setup script (npm install + db push)
