# Tech Horizon Labs - AI Consulting Website

## Overview

This is a modern consulting website for Tech Horizon Labs, an AI implementation consulting firm based on the Sunshine Coast, Queensland, Australia (ABN: 80 976 285 425). The site showcases their "infrastructure before automation" approach to AI consulting, featuring service offerings, case studies, pricing, an academy for AI training resources, and an AI industry research hub.

**Target Keywords**: "AI QLD", "AI consulting Australia", "AI consulting Queensland", "AI consulting Sunshine Coast", "AI business training sunshine coast"

The application is built as a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (March 2026)

### SEO/AEO/GEO Optimization (GSC-Driven)
- Full GSC audit performed: identified "ai business training sunshine coast" (94 impressions, position 5.72, 0% CTR) as #1 quick win
- Optimized all page titles/descriptions based on real search performance data
- Brisbane location page content strengthened (was ranking position 73-93)
- Portfolio case studies updated with real Academy metrics
- Homepage hero sharpened with concrete outcomes (2 days to 1 hour)
- Added comprehensive JSON-LD schema markup (LocalBusiness, Organization, FAQPage, Service, Person, BreadcrumbList)
- Created robots.txt allowing AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.)
- Generated XML sitemap with 20 URLs, all dates set to 2026-03-02

### AI Research Hub (`/research`)
- Deep analysis of 10 AI companies (Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, DeepSeek, Qwen, Perplexity, Kimi, Mistral)
- Covers governance, funding rounds, investor breakdowns, policy shifts, timelines, safety issues, controversies, supply chain
- Data files in `client/src/data/research/` (types.ts, index.ts, + 10 company files)
- Comparison dashboard on landing page: Valuation Race (multi-line chart, private companies only), Total Funding (horizontal bars), Quick Stats (table)
- Valuation chart redesigned: clean SVG line chart, show values on click only, rotated labels with stagger for dense data, dynamic width, area fill gradient, post-money display
- Google DeepMind and Meta AI now have Market Cap tabs with Alphabet/Meta market cap trajectory (excluded from private valuation race chart)
- fmtVal() supports trillion-scale values ($1.6T format)
- Meta AI data updated: Yann LeCun departure (Nov 2025), Alexandr Wang (Chief AI Officer), Shengjia Zhao (Chief Scientist MSL)
- DeepSeek added: self-funded from High-Flyer quant, R1 model, US sanctions controversies
- Qwen (Alibaba Cloud) added: Tongyi Lab, Apache 2.0 open-source, $53B infrastructure pledge
- Integrated with THL's design system (aubergine/salmon palette), Navbar/Footer, PageSEO
- CTA callout linking to Klipy CRM booking for AI platform assessment
- Targets informational queries: "claude", "openai", "perplexity ai", "deepseek", "qwen", "AI company research"

### Pages
- `/` - Homepage with hero, trust bar, service cards, case study highlights
- `/services/audit` - Readiness Assessment service page with FAQ schema
- `/services/accelerator` - Foundation Sprint service page (4-week sprint)
- `/services/partner` - Ongoing Evolution partnership page
- `/locations/sunshine-coast` - Local SEO page with FAQ schema
- `/locations/brisbane` - Brisbane/SEQ focus with manufacturing case studies (strengthened content)
- `/locations/queensland` - State-wide overview and hub page
- `/locations/gold-coast` - Tourism/hospitality industry focus
- `/portfolio` - 5 case studies with real metrics (40% admin reduction, 60% faster quotes, 30% downtime, 80% onboarding, 100% privacy)
- `/portfolio/accounting-firm` - Invoice AI case study
- `/portfolio/construction-builder` - Construction AI case study (2 days → 1 hour)
- `/portfolio/real-estate-agency` - Real estate AI case study
- `/portfolio/manufacturing` - Manufacturing AI case study
- `/portfolio/healthcare-clinic` - Healthcare AI case study
- `/academy` - Preview page linking to academy.techhorizonlabs.com
- `/research` - AI Research Hub: 10 companies, governance/funding/policy analysis, comparison dashboard
- `/about` - Huxley Peckham bio, E-E-A-T signals, ABN disclosure, partner affiliations
- `/resources` - Articles, weekly workshops schedule, newsletter, downloadable tools
- `/openclaw` - OpenClaw setup page: honest security assessment, safe vs risky use cases, CVE timeline, safe deployment guide, FAQ schema
- `/events` - "AI on the Coast" community meetup page: bi-monthly events at Sunshine Beach Surf Club, event format, topics, venue info, Luma placeholder
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Booking Integration
- All CTAs link directly to Klipy CRM booking: https://app.klipycrm.com/book/pre-discovery/free-pre-discovery
- ContactFormDialog offers both direct calendar booking and message form options (used in navbar only)
- All page CTAs use direct `<a href={BOOKING_URL}>` links with Calendar icon for immediate booking
- BOOKING_URL constant exported from contact-form-dialog.tsx for consistency

### Navigation
- Services dropdown menu in navbar with links to all 3 service pages
- Main nav: Services (dropdown), Portfolio, Research, Locations, Academy
- Mobile menu with dedicated Services section and all nav items
- All buttons have hover:scale-105 micro-interaction for premium feel

### Trust Signals & Partners
- TrustBar component on homepage with partner logos (Google, Anthropic, OpenAI, AWS, n8n, Docker, fal.ai)
- industry.gov.au National AI Directory listing badge
- GoodFirms "Top Artificial Intelligence Company" badge
- Footer "Community" section with links to Events, OpenClaw, Academy, Resources, About, Newsletter, AI Ethics
- Footer with SVG partner icons, ABN 80 976 285 425, Sunshine Coast address

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS v4 with custom theme variables defined in `client/src/index.css`
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for interactive visualizations
- **Build Tool**: Vite with custom plugins for Replit integration
- **SEO**: PageSEO component for per-page meta tags; LocationSchema for JSON-LD FAQ schema

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod for type-safe validation
- **Email Service**: Resend integration via Replit connectors

### Data Storage
- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Current Tables**:
  - `contact_submissions`: Stores contact form submissions (name, email, company, message)
  - `newsletter_signups`: Stores newsletter email subscriptions with unique constraint
- **Migrations**: Managed via Drizzle Kit with migrations output to `./migrations`

### Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── seo/              # SEO components (PageSEO, LocationSchema)
│   │   │   ├── sections/         # Homepage sections (hero, trust bar, etc.)
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── layout.tsx        # Navbar & Footer (exported separately)
│   │   │   ├── contact-form-dialog.tsx  # BOOKING_URL constant + dialog
│   │   │   └── newsletter-dialog.tsx
│   │   ├── data/
│   │   │   └── research/         # AI Research Hub data (10 company files)
│   │   │       ├── types.ts      # TypeScript interfaces
│   │   │       ├── index.ts      # Company registry, helpers, color constants
│   │   │       ├── anthropic.ts
│   │   │       ├── openai.ts
│   │   │       ├── google-deepmind.ts
│   │   │       ├── meta-ai.ts
│   │   │       ├── xai.ts
│   │   │       ├── deepseek.ts
│   │   │       ├── qwen.ts
│   │   │       ├── perplexity.ts
│   │   │       ├── kimi.ts
│   │   │       └── mistral.ts
│   │   ├── pages/
│   │   │   ├── locations/        # Location pages (sunshine-coast, brisbane, queensland, gold-coast)
│   │   │   ├── portfolio/        # Individual case study pages
│   │   │   ├── services/         # Service pages (audit, accelerator, partner)
│   │   │   ├── home.tsx          # Homepage
│   │   │   ├── portfolio.tsx     # Portfolio index
│   │   │   ├── research.tsx      # AI Research Hub
│   │   │   ├── academy.tsx       # Academy preview
│   │   │   ├── about.tsx         # About/founder page
│   │   │   ├── resources.tsx     # Resources/articles
│   │   │   ├── privacy.tsx       # Privacy policy
│   │   │   └── terms.tsx         # Terms of service
│   │   ├── hooks/
│   │   └── lib/
│   └── index.html                # SEO meta tags & JSON-LD schema
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── db.ts
├── shared/
│   └── schema.ts
├── public/
│   ├── robots.txt               # AI crawler permissions
│   ├── sitemap.xml              # XML sitemap (20 URLs)
│   └── og-image.png             # Open Graph image
```

### Key Design Patterns
- **Shared Schema**: Database schema and Zod validators defined once in `shared/` and imported by both frontend and backend
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Path Aliases**: TypeScript configured with `@/` for client src, `@shared/` for shared code
- **SEO Components**: PageSEO for meta tags, LocationSchema for structured FAQ data
- **Lazy Loading**: All secondary pages use React.lazy() for code splitting
- **Research Data**: Static TypeScript data files (no API needed) for AI company research

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Email Service
- **Resend**: Email delivery for contact notifications and newsletter welcome messages
- Connected via Replit connectors (fetches credentials from connector API)

### Frontend Libraries
- **TanStack React Query**: Server state management and caching
- **Framer Motion**: Animation library for UI interactions
- **Radix UI**: Accessible component primitives (accordion, dialog, dropdown, etc.)
- **Lucide React**: Icon library

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development server

## Domain Strategy

- **techhorizonlabs.com**: Done-for-you consulting services (this site)
- **academy.techhorizonlabs.com**: Done-with-you training/workshops (separate subdomain, different keywords to avoid cannibalization)
- **tech-horizon.beehiiv.com**: Newsletter platform
