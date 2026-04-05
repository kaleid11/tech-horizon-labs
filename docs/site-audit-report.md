# Tech Horizon Labs — Full Site Audit Report
**Date:** 5 April 2026
**Auditor:** Automated + manual verification
**Server:** Express (localhost:5000)

---

## 1. HTTP Status Codes — All Routes

| Status | Route |
|--------|-------|
| 200 | `/` |
| 200 | `/work` |
| 200 | `/about` |
| 200 | `/academy` |
| 200 | `/contact` |
| 200 | `/research` |
| 200 | `/report` |
| 200 | `/assessment` |
| 200 | `/privacy` |
| 200 | `/terms` |
| 200 | `/security` |
| 200 | `/openclaw` |
| 200 | `/tools` |
| 200 | `/scorecard` |
| 200 | `/locations/sunshine-coast` |
| 200 | `/locations/brisbane` |
| 200 | `/locations/gold-coast` |
| 200 | `/locations/queensland` |
| 200 | `/industries/legal` |
| 200 | `/industries/construction` |
| 200 | `/industries/healthcare` |
| 200 | `/industries/retail` |
| 200 | `/insights` |
| 200 | `/insights/how-australia-uses-ai-2026` |
| 200 | `/insights/claude-vs-chatgpt-2026` |
| 200 | `/insights/ai-impact-by-industry` |
| 200 | `/insights/ai-implementation-cost-australia` |
| 200 | `/insights/ai-mistakes-australian-businesses` |
| 200 | `/insights/ai-readiness-stages-australia` |
| 200 | `/insights/ai-training-gap-australia` |
| 200 | `/insights/accc-microsoft-copilot-australia` |
| 200 | `/sitemap.xml` |
| 200 | `/robots.txt` |
| 200 | `/styles.css` |
| 200 | `/main.js` |
| 200 | `/favicon.svg` |

**Result: PASS** — All 36 tested URLs return HTTP 200.

---

## 2. Redirect Tests

| Status | Source | Destination |
|--------|--------|-------------|
| 301 | `/audit-tool` | `/assessment` |
| 301 | `/insights/nonexistent` | `/` |
| 301 | `/locations/nonexistent` | `/` |
| 301 | `/industries/nonexistent` | `/` |
| 301 | `/insights/ai-training-gap-australia/` | `/insights/ai-training-gap-australia` |
| 301 | `/locations/sunshine-coast/` | `/locations/sunshine-coast` |

**Result: PASS** — Legacy redirect (`/audit-tool`), trailing-slash redirects, and wildcard catches all function correctly.

---

## 3. API Endpoint Health

| Endpoint | Method | Result | HTTP |
|----------|--------|--------|------|
| `/api/newsletter` | POST | `{"success":true}` | 200 |
| `/api/contact` | POST | `{"success":true}` | 200 |
| `/api/audit` | POST | Validation working (rejects malformed input) | 400 |

**Result: PASS** — All 3 API endpoints respond correctly. The `/api/audit` endpoint correctly validates input schema (expects string `answers`, not array).

---

## 4. Booking URL Consistency

All booking CTAs across the site use the correct URL:
`https://app.klipycrm.com/book/pre-discovery/free-pre-discovery`

Checked across all static HTML files in `client/static/`, `client/static/insights/`, `client/static/locations/`, `client/static/industries/`.

**Result: PASS** — No variant or incorrect booking URLs found.

---

## 5. Stage Name Consistency

The four AI maturity stage names are used consistently across all pages:
- Stage 1: **Unaware**
- Stage 2: **ChatGPT Plateau**
- Stage 3: **Enabled**
- Stage 4: **AI-Native**

No incorrect stage names (e.g., "Explorer", "Advanced", "Expert") found in any HTML file.

**Result: PASS**

---

## 6. JSON-LD Structured Data

| Article | Article Schema | FAQPage Schema | BreadcrumbList Schema |
|---------|:-:|:-:|:-:|
| ai-training-gap-australia.html | ✅ | ✅ | ✅ |
| accc-microsoft-copilot-australia.html | ✅ | ✅ | ✅ |
| ai-readiness-stages-australia.html | ✅ | ✅ | ✅ |
| ai-implementation-cost-australia.html | ✅ | ✅ | ✅ |
| ai-mistakes-australian-businesses.html | ✅ | ✅ | ✅ |
| how-australia-uses-ai-2026.html | ✅ | — | ✅ |
| claude-vs-chatgpt-2026.html | ✅ | — | ✅ |
| ai-impact-by-industry.html | ✅ | — | ✅ |

**Note:** Three older articles (how-australia-uses-ai-2026, claude-vs-chatgpt-2026, ai-impact-by-industry) lack FAQPage JSON-LD. These articles do not have FAQ sections in their HTML content, so adding FAQPage schema without corresponding FAQ content would be inconsistent. This is a pre-existing condition, not a regression.

**Result: PASS** (with note on pre-existing gap for 3 articles without FAQ content)

---

## 7. Canonical Tags

All pages checked have correct canonical URLs pointing to `https://techhorizonlabs.com/...` with the correct path.

**Result: PASS**

---

## 8. Sitemap Completeness

- **Sitemap URLs:** 31
- **PAGES routes (server/static.ts):** 8 core pages (with meta injection)
- **STATIC_FILES routes (server/static.ts):** 23 static pages (including insights index)
- **Total registered page routes:** 31

All 31 page routes are represented in the sitemap (31 URLs). The sitemap does not include `/sitemap.xml`, `/robots.txt`, or static assets (correct behavior).

**Result: PASS**

---

## 9. robots.txt Verification

- Serves correctly at `/robots.txt` with `Content-Type: text/plain`
- Allows all crawlers (`User-agent: *`)
- Includes explicit Allow directives for 14 AI crawlers
- References sitemap at `https://techhorizonlabs.com/sitemap.xml`

**Result: PASS**

---

## 10. Meta Tag Verification (Title, Description, Canonical, OG)

All 31 page routes were checked for the following meta tags:
- `<title>` — exactly 1 per page
- `<meta name="description">` — exactly 1 per page
- `<link rel="canonical">` — exactly 1 per page
- `<meta property="og:title">` — present
- `<meta property="og:description">` — present

No duplicates or missing tags were found on any page.

**Result: PASS** — All 31 pages have correct, non-duplicate meta tags.

---

## 11. Internal Link Check

Crawled all 31 page routes and extracted internal links (`href="/..."`) from each page. Every internal link resolves to HTTP 200 or 301 (trailing-slash redirect).

**Result: PASS** — Zero broken internal links found.

---

## Summary

| Check | Result |
|-------|--------|
| HTTP status codes (36 URLs) | ✅ PASS |
| Redirects (6 patterns) | ✅ PASS |
| API endpoints (3 endpoints) | ✅ PASS |
| Booking URL consistency | ✅ PASS |
| Stage name consistency | ✅ PASS |
| JSON-LD structured data | ✅ PASS (note: 3 older articles lack FAQPage — no FAQ content to match) |
| Canonical tags | ✅ PASS |
| Sitemap completeness (31 URLs) | ✅ PASS |
| robots.txt | ✅ PASS |
| Meta tags (no duplicates/missing) | ✅ PASS |
| Internal links (zero broken) | ✅ PASS |

**No issues requiring fixes were found.**
