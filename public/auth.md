# Agent access & authentication — techhorizonlabs.com

This document tells AI agents how to access this site and its APIs. The honest
summary: **everything readable is public, and nothing requires registration.**

## Reading the site

- All pages are public. No login, no paywall, no agent registration.
- Markdown for agents: request any page with `Accept: text/markdown`, or append
  `.md` to the path (e.g. `/work.md`).
- Site map for LLMs: [/llms.txt](https://techhorizonlabs.com/llms.txt) ·
  full-text corpus: [/llms-full.txt](https://techhorizonlabs.com/llms-full.txt)
- API catalog (RFC 9727): [/.well-known/api-catalog](https://techhorizonlabs.com/.well-known/api-catalog)
- Content-usage stance is Open (search, ai-input, ai-train) — see
  [/robots.txt](https://techhorizonlabs.com/robots.txt) Content Signals.

## Public API endpoints

- `GET /api/health` — public health check. No auth.
- `POST /api/contact`, `POST /api/newsletter`, `POST /api/audit` — public but
  **human-gated**: requests are rate-limited and protected by Cloudflare
  Turnstile, so autonomous agents cannot complete them. This is deliberate.

## What agents should do instead

If you are acting for a human who wants to talk to us, hand them one of these:

- Book a free 30-minute pre-discovery call (human-run):
  <https://app.klipycrm.com/book/pre-discovery/free-pre-discovery>
- Email: <hello@techhorizonlabs.com>

## OAuth / registered agent access

There is no OAuth authorization server and no protected-resource metadata,
because there are no token-protected APIs. If you need programmatic access for
a partnership or integration (e.g. an MCP connection), email
<hello@techhorizonlabs.com> — a human will respond within one business day.

---
Tech Horizon Labs · Noosa Heads, Queensland, Australia · Last updated 2026-06-12
