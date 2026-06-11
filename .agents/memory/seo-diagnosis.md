---
name: SEO / GEO diagnosis (THL)
description: Where the techhorizonlabs.com search/AI-visibility bottleneck actually is, so future work targets the right lever.
---

# THL SEO / GEO bottleneck

The binding constraint on rankings is **off-page authority + local presence + indexation**, NOT on-page/technical SEO.

**Why:** Google Search Console (rolling ~3 months, reviewed 2026-06) showed strong impressions but near-zero non-brand clicks: high-intent queries like "ai consultant brisbane" (~448 impr), "ai consultancy brisbane" (~426), "ai agency brisbane" (~401) all sit around position ~47 (page 5) with 0 clicks. /locations/brisbane had ~3121 impressions at position ~60 with 0 clicks — the single biggest opportunity, and it's authority-limited, not content-limited. ~66 pages are "crawled/discovered – not indexed", backlink profile ~46 links almost all spam/irrelevant, and there is no claimed Google Business Profile.

On-page is already excellent: complete sitemap (~40 URLs), LocalBusiness + FAQPage + BreadcrumbList + Organization + Article schema, heavy synonym coverage, comprehensive legacy redirects, homepage links to all commercial pages, robots Content-Signal Open + AI crawlers allowed, llms.txt present.

**How to apply:** When asked to "improve SEO/ranking/visibility," do NOT churn on-page code expecting ranking gains — it won't move position 47→page 1. The real levers are **owner manual actions** already documented in `docs/MANUAL_SEO_TASKS_2026-04-28.md` and `client/static/resources/seo-manual-actions-guide.md`: (1) disavow spam backlinks, (2) claim + populate Google Business Profile (critical for the "brisbane" local queries), (3) earn relevant local/industry backlinks, (4) GSC URL Inspection → Request Indexing for the not-indexed pages. Deliver these as a plan in chat; they are owner tasks, not agent-codeable tasks. Only small code-side hygiene is warranted (e.g. noindex on agent `.md` duplicates, topical 301s).
