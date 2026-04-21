# Tech Horizon Labs - AI Consulting Website

## Overview

This project is a full-stack TypeScript website for Tech Horizon Labs, an AI implementation consulting firm. Its purpose is to showcase their "infrastructure before automation" approach to AI consulting, attract businesses seeking AI solutions, and establish THL as a premier fractional AI ops consultancy. Key features include service offerings, case studies, pricing, an AI training academy, an AI industry research hub, and interactive diagnostic tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: Static HTML pages served via Express.
- **Styling**: Tailwind CSS v4 with custom theme (Fraunces, Instrument Sans fonts; specific color palette).
- **Animations**: Dot-grid canvas background and CSS fade-in animations.
- **Build**: esbuild for server bundling.
- **SEO**: Server-side meta injection, per-page JSON-LD schemas (FAQPage, Article, BreadcrumbList, LocalBusiness, Organization), and comprehensive SEO configuration (robots.txt, sitemap, canonical tags, OG/Twitter cards).
- **Critical CSS**: Inlined directly into HTML responses for fast initial load.

### Backend
- **Framework**: Express 5 on Node.js.
- **API**: RESTful endpoints under `/api/*`.
- **Database ORM**: Drizzle ORM with PostgreSQL dialect.
- **Schema Validation**: Zod with drizzle-zod.
- **Static Serving**: Handles page routing with meta injection for core pages and direct serving for static files. Implements 410 Gone for permanently removed legacy URLs.

### Data Storage
- **Database**: PostgreSQL.
- **Schema**: Defined in `shared/schema.ts` for contact submissions, newsletter signups, and audit submissions.
- **Migrations**: Managed via Drizzle Kit, supporting both quick iteration (`db:push`) and reviewable migrations (`db:generate` then `db:migrate`).

### Key Design Patterns
- **Shared Schema**: Centralized schema and Zod validators for frontend and backend.
- **Storage Abstraction**: `IStorage` interface for database operations.
- **Path Aliases**: TypeScript aliases for client and shared code.

### Feature Specifications
- **Navigation**: Includes Services, Portfolio, Research, Locations, Academy, with booking CTAs.
- **AI Research Hub (`/research`)**: Deep analysis of 10 AI companies, featuring comparison dashboards, cumulative funding charts, and detailed company profiles. Data is embedded directly, with custom SVG charts and interactive elements.
- **AI Readiness Assessment (`/assessment`)**: A 10-question assessment providing immediate, ungated results (scored 0-100, mapping to 4 stages: Unaware, ChatGPT Plateau, Enabled, AI-Native). Includes optional email follow-up.
- **AI Readiness Scorecard (`/scorecard`)**: A 28-question diagnostic across 6 dimensions, with email-gated recommendations.
- **AI Readiness Report (`/report`)**: Gated landing page for a downloadable PDF report, requiring email submission.
- **AI Tool Cheat Sheet (`/tools`)**: A printable list of recommended AI tools with category filters.
- **Insights (`/insights`)**: A collection of 10 articles on various AI topics, each with rich SEO metadata and related content.
- **Location & Industry Pages**: Dedicated pages for key locations and industries, featuring specific use cases and localized content.
- **Training Pages (`/training/*`)**: Details on AI training workshops.
- **Downloadable Resources (`/resources/*`)**: Both free and email-gated resources available.
- **Strategy Positioning**: Incorporates internal frameworks like 4 AI Maturity Stages and 3 Trainer Archetypes.
- **Email System**: Uses Resend for auto-replies, welcome emails, and internal notifications.
- **Analytics**: Plausible Analytics for pageview tracking.
- **Branding Assets**: Consistent logo usage and branding across the site.

## External Dependencies

- **PostgreSQL**: Primary database.
- **Drizzle ORM**: Database interaction.
- **Resend**: Email sending service.
- **Klipy CRM**: CRM integration for bookings and subscriber syncing.
- **Beehiiv**: Newsletter platform integration.
- **esbuild**: Build tool.
- **Cloudflare Turnstile**: CAPTCHA service for form submissions.
- **Sentry**: Error tracking and performance monitoring.
- **Plausible Analytics**: Website analytics.