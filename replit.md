# Tech Horizon Labs - AI Consulting Website

## Overview

This project is a modern full-stack TypeScript website for Tech Horizon Labs, an AI implementation consulting firm. It showcases their "infrastructure before automation" approach to AI consulting, featuring service offerings, case studies, pricing, an academy for AI training, and an AI industry research hub. The primary goal is to attract businesses seeking AI solutions and establish the firm as a leader in AI consulting, particularly in the Queensland, Australia region.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS v4 with a custom theme, using Fraunces (serif headings) and Instrument Sans (body) fonts, and a color palette including `--bg: #FAFAF8` and `--accent: #B5654A`.
- **UI Components**: shadcn/ui library built on Radix UI primitives.
- **State Management**: TanStack React Query for server state.
- **Animations**: Framer Motion for interactive UI elements and a narrative particle canvas that changes behavior based on scroll position.
- **Build Tool**: Vite with custom Replit integration plugins.
- **SEO**: Dedicated `PageSEO` component for meta tags and `LocationSchema` for JSON-LD FAQ schema.
- **Static Site**: The `client/static/` directory hosts the main static pages (`index.html`, `work.html`, `about.html`, `contact.html`, `academy.html`, `research.html`, `security.html`), while the React app handles dynamic routes and deeper content.

### Backend Architecture
- **Framework**: Express 5 on Node.js.
- **API Design**: RESTful endpoints under the `/api/*` prefix.
- **Database ORM**: Drizzle ORM with PostgreSQL dialect.
- **Schema Validation**: Zod with drizzle-zod for type-safe validation.

### Data Storage
- **Database**: PostgreSQL, configured via `DATABASE_URL`.
- **Schema**: Defined in `shared/schema.ts`, including tables for `contact_submissions` and `newsletter_signups`.
- **Migrations**: Managed via Drizzle Kit.

### Key Design Patterns
- **Shared Schema**: Database schema and Zod validators are defined once in `shared/` for both frontend and backend.
- **Storage Abstraction**: An `IStorage` interface in `server/storage.ts` abstracts database operations.
- **Path Aliases**: TypeScript aliases `@/` for client source and `@shared/` for shared code.
- **SEO Components**: `PageSEO` for meta tags and `LocationSchema` for structured FAQ data.
- **Lazy Loading**: Secondary pages are lazy-loaded using `React.lazy()` for code splitting.
- **Research Data**: AI company research data is stored in static TypeScript files (`client/src/data/research/`).

### Feature Specifications
- **Navigation**: Main navigation includes Services (dropdown), Portfolio, Research, Locations, and Academy.
- **Booking Integration**: All CTAs link directly to Klipy CRM booking, with a `ContactFormDialog` for alternative message submissions.
- **Trust Signals**: Homepage features a `TrustBar` with partner logos (Google, Anthropic, OpenAI, AWS, n8n, Docker, fal.ai), industry badges, and a footer with community links.
- **AI Research Hub (`/research`)**: Deep analysis of 10 AI companies — Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, DeepSeek, Qwen (Alibaba), Perplexity, Kimi, and Mistral — with comparison dashboards (Valuation Race, Total Funding, Quick Stats), detailed company profiles, down round indicators, and former leadership tracking. Data files in `client/src/data/research/`.
- **Newsletter & Events Integration**: `/api/newsletter` endpoint for email validation, deduplication, database storage, Resend welcome emails, Klipy CRM syncing, and Beehiiv API integration. Events page is fully wired with Luma integration.
- **AI Readiness Report (`/report`)**: Gated landing page for "State of AI Readiness: Australian SMB 2026" PDF. Collects name + email via `/api/report-download`, stores to newsletter_signups, sends PDF download email via Resend, syncs to Klipy and Beehiiv with `report-download` tag. PDF at `client/static/ai-readiness-report-2026.pdf`.
- **AI Readiness Assessment (`/assessment`)**: 10-question multi-step assessment scoring 0–100 across AI maturity dimensions. Results map to 4 stages (Discovery, Pilot, Integration, Optimisation) with personalised recommendations. Contact gate before results; calls `/api/audit` which stores to `audit_submissions` table, emails results and booking CTA to user, and notifies Huxley. Old `/audit-tool` URL redirects here.
- **Contact Auto-Reply**: `sendContactAutoReply` sends confirmation to contact form submitters with Klipy booking CTA. Fire-and-forget in `/api/contact` route.
- **SEO Optimization**: Comprehensive JSON-LD schema markup (LocalBusiness, Organization, FAQPage, Service, Person, BreadcrumbList), `robots.txt` allowing AI crawlers, and a generated XML sitemap.

## External Dependencies

### Database
- **PostgreSQL**: Primary database.
- **Drizzle ORM**: For database interactions.

### Email Service
- **Resend**: For sending emails (contact notifications, newsletter welcome).

### CRM & Event Management
- **Klipy CRM**: For booking integrations and newsletter subscriber syncing.
- **Luma**: For event management and registration.
- **Beehiiv**: For newsletter platform integration.

### Frontend Libraries
- **TanStack React Query**: For server state management.
- **Framer Motion**: For animations.
- **Radix UI**: For accessible UI primitives.
- **Lucide React**: For icons.

### Build & Development Tools
- **Vite**: Frontend build tool.
- **esbuild**: Server bundling.
- **tsx**: TypeScript execution for development.