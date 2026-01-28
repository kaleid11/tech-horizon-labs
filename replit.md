# Tech Horizon Labs - AI Consulting Website

## Overview

This is a modern consulting website for Tech Horizon Labs, an AI implementation consulting firm based on the Sunshine Coast, Queensland, Australia (ABN: 80 976 285 425). The site showcases their "infrastructure before automation" approach to AI consulting, featuring service offerings, case studies, pricing, and an academy for AI training resources.

**Target Keywords**: "AI QLD", "AI consulting Australia", "AI consulting Queensland", "AI consulting Sunshine Coast"

The application is built as a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2026)

### SEO/AEO/GEO Optimization
- Added comprehensive JSON-LD schema markup (LocalBusiness, Organization, FAQPage, Service, Person)
- Optimized meta tags with Queensland/Australian keywords
- Created robots.txt allowing AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.)
- Generated XML sitemap with proper priorities

### New Pages
- `/locations/sunshine-coast` - Local SEO page with FAQ schema
- `/locations/brisbane` - Brisbane/SEQ focus with manufacturing case studies
- `/locations/queensland` - State-wide overview and hub page
- `/locations/gold-coast` - Tourism/hospitality industry focus
- `/portfolio` - 5 case studies with real metrics (40% admin reduction, 60% faster quotes, 30% downtime, 80% onboarding, 100% privacy)
- `/academy` - Preview page linking to academy.techhorizonlabs.com (separate subdomain for training/workshops)
- `/about` - Huxley Peckham bio, E-E-A-T signals, ABN disclosure, partner affiliations
- `/resources` - Articles, weekly workshops schedule, newsletter, downloadable tools

### Navigation & Footer
- Updated navigation: Services, Portfolio, Locations, Academy
- Footer includes: ABN 80 976 285 425, Sunshine Coast address, location links, partner logos (AWS, OpenAI, Noosa Chamber, Source Media)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS v4 with custom theme variables defined in `client/src/index.css`
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for interactive visualizations
- **Build Tool**: Vite with custom plugins for Replit integration
- **SEO**: LocationSchema component for per-page JSON-LD FAQ schema

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
│   │   │   ├── seo/              # SEO components (LocationSchema)
│   │   │   ├── sections/         # Homepage sections
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── layout.tsx        # Navbar & Footer
│   │   │   ├── contact-form-dialog.tsx
│   │   │   └── newsletter-dialog.tsx
│   │   ├── pages/
│   │   │   ├── locations/        # Location-specific pages (sunshine-coast, brisbane, queensland, gold-coast)
│   │   │   ├── home.tsx          # Homepage
│   │   │   ├── portfolio.tsx     # Case studies
│   │   │   ├── academy.tsx       # Academy preview
│   │   │   ├── about.tsx         # About/founder page
│   │   │   └── resources.tsx     # Resources/articles
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
│   ├── sitemap.xml              # XML sitemap
│   └── og-image.png             # Open Graph image
```

### Key Design Patterns
- **Shared Schema**: Database schema and Zod validators defined once in `shared/` and imported by both frontend and backend
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Path Aliases**: TypeScript configured with `@/` for client src, `@shared/` for shared code
- **SEO Components**: Reusable LocationSchema component for per-page structured data

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
