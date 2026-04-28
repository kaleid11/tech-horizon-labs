# Manual SEO + GEO tasks — 2026-04-28 audit

> Reference for Huxley. Things only you can do (or things that need a decision from you before code can ship). Generated from the 2026-04-28 GEO+SEO audit, cross-checked against actual repo state.

**See also:** `client/static/resources/seo-manual-actions-guide.md` — the existing 664-line guide already covers GSC, GBP, Bing, Plausible, backlinks, keyword monitoring. Don't re-do that work; this file only captures **new** items from the 28 Apr audit and decisions needed to unblock code.

---

## Status legend

- 🚨 = Critical / time-sensitive
- ⚠️ = High priority
- 💡 = Nice-to-have
- ☐ = Not started · ◐ = In progress · ☑ = Done

---

## 1. THL — manual GSC + GBP work (you only)

### 1.1 🚨 ☐ Submit disavow file via Google Search Console

22 spam URL-shortener domains are dragging the THL spam-score to 43.

**Steps:**
1. Save the file below as `disavow.txt` (or use the copy in this repo at the path shown after this list).
2. Go to https://search.google.com/search-console/disavow-links
3. Select the **techhorizonlabs.com** property
4. Upload `disavow.txt`. Disavow applies to all subdomains automatically (covers THA too).

**Disavow file content:**

```
domain:anchorurl.cloud
domain:urls-shortener.eu
domain:shortenurls.eu
domain:jake.eu
domain:ready.pro
domain:wallpapers.pro
domain:bye.fyi
domain:ycm.info
domain:alljobs.info
domain:tunca.org
domain:musweb.org
domain:booksreadr.org
domain:globalecommerce.org
domain:way2check.cv
domain:websiterace.com
domain:getwebsiteworth.com
domain:quero.party
domain:australianwebdirectory.pro
domain:great-choice-for-pbn-domains.co.uk
domain:runningwebsites.net
domain:screenshots.wiki
domain:drjack.world
```

> The audit also mentioned a copy at `/Users/thclaw-1/Documents/thl_geo_audit/disavow.txt` for direct upload. If you want me to drop a copy into this repo at `docs/disavow.txt` for convenience, ask.

### 1.2 ⚠️ ☐ Claim Google Business Profile for THL

No GBP exists yet for Tech Horizon Labs. Blue Seas AI Consulting (Buderim) currently owns the Knowledge Graph for "AI consultant Sunshine Coast" because they have GBP + 14 reviews.

The existing manual guide at `client/static/resources/seo-manual-actions-guide.md` Section 2 has paste-ready GBP description, categories, service areas, hours, services catalogue, and Q&A seeding. **Use that, not what's below.** Steps below are just the wrapper.

**Steps:**
1. Go to https://business.google.com → "Add your business" → "Tech Horizon Labs"
2. Address: Noosa Heads (use the same address as the THL LocalBusiness schema)
3. Categories — primary: "Business Management Consultant"; secondary: "Software Company", "Computer Consultant", "Educational Consultant" (full reasoning in Section 2.2 of the existing guide)
4. Hours: Mon–Fri 8:30–17:30, by-appt outside (NOT 24/7 — Google demotes that)
5. Paste description from existing guide Section 2.1
6. Add 8–12 photos (existing guide Section 2.8 lists exactly which)
7. Verify by postcard (~7 days)
8. After verification: request 5 reviews from past clients, post first GBP update from existing guide Section 2.6

### 1.3 💡 ☐ Validate all schemas after I push code changes

Once I've finished the THL Part 2 code fixes, you should run:

- https://search.google.com/test/rich-results — paste each URL listed below
- https://validator.schema.org/ — paste each URL

URLs to test:
- https://techhorizonlabs.com/
- https://techhorizonlabs.com/industries/legal
- https://techhorizonlabs.com/insights/claude-vs-chatgpt-2026 (representative insight)
- https://techhorizonlabs.com/insights/how-australia-uses-ai-2026

---

## 2. THA (academy.techhorizonlabs.com) — needs separate session

I am NOT in the THA repo this session. To do any of the urgent fixes from Part 1 of the audit, open Claude Code inside the academy repo and reference this file.

### 2.1 🚨 Decisions needed before THA code can be written

| # | Decision | Status |
|---|---|---|
| a | Pro tier price (Partner is now $2,000/mo per your reply) | ☐ — send Pro tier monthly price |
| b | Free tier — confirm "Free" still exists, or has it been replaced? | ☐ |
| c | Workshop instructor — "All workshops taught by Huxley" — accurate? Any guest instructors? | ☐ |
| d | Course schema — confirm weekly cadence still correct? | ☐ |
| e | Confirm THA `opengraph.jpg` exists at `/opengraph.jpg` on production | ☐ — check yourself or I can curl when scoped to THA |
| f | THA URL inventory — which of these actually return 200 today? `/prompts`, `/ai-tools`, `/digital-team`, `/learn`, `/learn/geo`, `/wiki`, `/frameworks`, `/agents`, `/audit`, `/free-resources`, `/newsletter`. (The audit speculated all 11; we should not publish them in `llms.txt` if they 404.) | ☐ |

### 2.2 🚨 Trackers — keep / remove decision (per your reply: only Plausible + GSC actively used)

You confirmed you only intentionally use Plausible Analytics + GSC. Here's a recommended keep/remove for THA based on what the audit detected:

**Keep these (legitimate):**

| Tracker | Reason |
|---|---|
| Plausible Analytics | Your primary analytics — privacy-first, no consent banner needed in AU |
| Google Search Console verification meta tag | GSC ownership proof — passive, no script |
| Google Fonts (`fonts.googleapis.com`) | Probably loading Fraunces / Instrument Sans matching THL branding. Can self-host to remove the third-party request — recommend keeping for now if your design uses them |
| YouTube embed | Only if there are testimonial videos on THA. Defer-load on click using a lite player wrapper to remove from initial page weight |

**Remove these (no campaigns, dead weight):**

| Tracker | What it is | Action |
|---|---|---|
| Google Tag Manager | Loads ad/remarketing pixels. If you don't run paid campaigns, GTM has no purpose — removes the need for the entire chain below | **Remove** |
| Google Analytics (GA4) | Redundant with Plausible. You already use Plausible as your primary | **Remove** unless you specifically need GA4 features Plausible lacks |
| DoubleClick Ads | Google's ad pixel — pure remarketing; only relevant for active Google Ads | **Remove** |
| leadsy.ai | Identity-resolution / B2B visitor tracking. Active subscription? If no, kill it | **Remove unless you're actively paying for leadsy** |
| trovo-tag.com | Unknown tag manager — probably loaded by another script. Almost certainly dead | **Remove** |
| remarketstats.com | Beeswax DSP remarketing pixel — only relevant for active programmatic ad campaigns | **Remove** |
| usbrowserspeed.com | Beeswax-related telemetry | **Remove** |
| Beeswax DSP | Programmatic ad demand-side platform. Only relevant if you're running display ad campaigns | **Remove** |

**GoodFirms badge — verify, don't blanket-trust:**

You mentioned "the goodfirms tracker." If GoodFirms is on THA only as a static image badge linking to your profile, it's fine — keeps zero overhead. If GoodFirms is loading a `<script src="...goodfirms...">` tag (some directories require an embedded JS widget for the "verified by" rating), then it's a tracker too. Recommend: convert any GoodFirms widget to a static badge image + link.

**My recommendation:** strip everything except Plausible, the GSC meta tag, Google Fonts, and a static GoodFirms badge. If page weight is still over 2 MB after that, self-host fonts and convert YouTube embeds to facade-loaded.

### 2.3 ⚠️ ☐ Repeat (1.2) but for Tech Horizon Academy?

You may want a separate GBP for the Academy if you do in-person training events. Decision needed: one GBP for the Labs umbrella, or two (Labs + Academy)? Most consultancies keep one — secondary services list the training under it.

### 2.4 ⚠️ ☐ Confirm there's no spam in THA backlink profile

The disavow in 1.1 covers techhorizonlabs.com root + all subdomains, so THA is automatically protected once the disavow upload is done. No separate action needed — but verify in GSC that THA inherits the property if it's set up as a separate property.

---

## 3. Cross-site decisions

### 3.1 ⚠️ ☐ Confirm Huxley's personal social handles (or confirm they shouldn't appear)

Per your reply, THA Person/Organization `sameAs` should match THL — i.e. no personal LinkedIn or Twitter handle for Huxley. **Decision logged.** Both sites will use brand-only social: `linkedin.com/company/tech-horizon-labs` and `x.com/techhorizonlabs`.

If at any point you want to add personal-social to schema (it does help E-E-A-T), send me the verified URLs and I'll add to both sites' Person blocks.

### 3.2 💡 ☐ Decide: keep `@techhorizonlabs` or migrate Academy to its own X handle?

The audit assumed `@techhorizonau` for THA. We've ruled that out. If you ever want a separate Academy X handle (some operators do for community engagement), tell me and I'll update Org schema across both sites. Status quo: brand-only handle on both.

---

## 4. Things from the audit you can ignore (already done or wrong)

These are in the audit doc but should NOT take any of your time. Logged here so you don't accidentally repeat the work or give the audit author bad feedback:

| Audit item | Why you can ignore |
|---|---|
| **Section 2.2** — "Verify Article + Person schema on all 10 /insights/*" | Already complete. Every one of the 10 posts has Article + Person + BreadcrumbList + FAQPage + Organization + ImageObject + WebPage. The audit's verification step would have shown this. |
| **Section 1.4 Block 4** — `priceValidUntil: 2027-12-31` | Arbitrary date the audit invented. Don't publish until you set a real validity window (or omit the field entirely, which Google accepts). |
| **Section 1.4 Block 4** — `"price": "PRICE_TBD"` placeholder | Never publish placeholders into JSON-LD — fails Rich Results validation, and Google can flag misleading structured data. We'll wait for confirmed Pro tier price before publishing the Offer block. |
| **Section 1.4 Block 1** — `https://twitter.com/techhorizonau` in sameAs | Wrong handle. Per 3.1 above, we use the brand handle on both sites. |

---

## 5. After I've shipped the THL code fixes, please do

A short verification pass once code is deployed:

1. ☐ `curl -s https://techhorizonlabs.com/insights/claude-vs-chatgpt-2026 | grep -c Speakable` → expect `1`
2. ☐ `curl -s https://techhorizonlabs.com/industries/legal | wc -w` → expect higher than the current ~8.2 KB after expansion
3. ☐ `curl -s https://techhorizonlabs.com/about | grep -oE '<title>[^<]*</title>'` → confirm ≤ 60 chars
4. ☐ Validate two insights URLs in https://search.google.com/test/rich-results with zero errors
5. ☐ Re-submit GSC sitemap to bump re-crawl

---

## Done criteria

- [ ] Disavow uploaded via GSC (Section 1.1)
- [ ] GBP claimed and verified for THL (Section 1.2)
- [ ] THA pricing + URL inventory + tracker keep-list confirmed (Sections 2.1, 2.2)
- [ ] THL post-deploy verification commands pass (Section 5)

Estimated manual effort: ~3 hours over a week (most of which is waiting for GBP postcard verification).

---

*Generated 2026-04-28. Cross-references the audit doc the agent received and the existing manual guide at `client/static/resources/seo-manual-actions-guide.md`.*
