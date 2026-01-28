# Tech Horizon Labs - AI Consulting Website

## Overview

This is a modern consulting website for Tech Horizon Labs, an AI implementation consulting firm based in Brisbane, Australia. The site showcases their "infrastructure before automation" approach to AI consulting, featuring service offerings, case studies, pricing, and an academy for AI training resources.

The application is built as a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS v4 with custom theme variables defined in `client/src/index.css`
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for interactive visualizations
- **Build Tool**: Vite with custom plugins for Replit integration

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
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # UI components and sections
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   └── schema.ts     # Drizzle schema definitions
```

### Key Design Patterns
- **Shared Schema**: Database schema and Zod validators defined once in `shared/` and imported by both frontend and backend
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Path Aliases**: TypeScript configured with `@/` for client src, `@shared/` for shared code

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