# Setup guide: DNS & visibility (manual steps)

> **Who this is for:** Huxley (the site owner).
> **What it is:** A single checklist of the things that *cannot* be done in the website's code and that only you can do, because they need access to your domain's DNS settings or to third-party dashboards (Resend, Google, Bing).
>
> Everything in this file is a manual action. The website code is already handled by the other agent-readiness tasks. Nothing here is urgent unless marked 🚨.
>
> **How to read each item:** every step tells you **what** to do, **where** to do it, and **how to verify** it worked.

---

## Quick legend

- 🚨 = Do this first (affects whether email/search actually works)
- ⭐ = High value, do soon
- 💡 = Optional / advanced — nice to have, not required

---

## 1. 🚨 Confirm the email sending domain is verified (Resend)

Your site sends auto-replies, welcome emails, and internal notifications through **Resend**. Resend will only deliver mail reliably once your sending domain (`techhorizonlabs.com`) is **Verified**. If it isn't, emails can silently fail or land in spam in production.

This is a one-time check (plus a one-time DNS step if it isn't done yet).

**Where:** [https://resend.com/domains](https://resend.com/domains)

**What to do:**
1. Log in to Resend and open **Domains**.
2. Find `techhorizonlabs.com` and look at its status.
   - If it already says **Verified** — you're done, nothing else to do here.
   - If it says **Pending** or **Not started**, Resend will show a list of DNS records (an `SPF`/`TXT` record, `DKIM` records, and usually a `Return-Path`/`MX` record for the `send` subdomain). Add each of those records at your domain's DNS provider (wherever `techhorizonlabs.com` is registered/managed), then come back to Resend and click **Verify**.
3. Make sure the **From** address used by the app (e.g. `hello@techhorizonlabs.com`) sits on this verified domain.

**How to verify it worked:**
- Resend **Domains** page shows a green **Verified** badge.
- Send yourself a test from a form on the live site (e.g. the contact form) and confirm the auto-reply arrives in the inbox (not spam).
- Optional deeper check: paste the domain into [https://www.mail-tester.com](https://www.mail-tester.com) or send a test to a Gmail address, open the message → **Show original**, and confirm `SPF: PASS` and `DKIM: PASS`.

> **Note:** internal notification emails go to your notify address (e.g. `hello@techhorizonlabs.com`), not to the From address. If notifications aren't arriving, check that address too.

---

## 2. 💡 DNS-based agent discovery (DNS-AID) — optional / advanced

This is an emerging, optional standard that lets AI agents discover your site's agent endpoints by looking up special DNS records, instead of only crawling the website. It is **not required** for normal search, marketing, or email. Only do this if you want to be an early adopter of agent-discovery on the DNS layer. It requires access to your domain's DNS provider.

There are two parts: (A) publishing discovery records, and (B) signing your zone with DNSSEC so agents can trust those records.

### 2A. Publish SVCB/HTTPS discovery records under the `_agents` label

The idea: agents look up a name like `_agents.techhorizonlabs.com` and read an `SVCB` (or `HTTPS`) record that points them at where your machine-readable agent files live. Your site already publishes the human/AI-readable map at `https://techhorizonlabs.com/llms.txt` and `https://techhorizonlabs.com/.well-known/` style files (handled in code), so this record simply advertises that location over DNS.

**Where:** your DNS provider's control panel (the same place you'll add the Resend records — wherever `techhorizonlabs.com` is managed).

**What to add** — a record of type `SVCB` (preferred) or `HTTPS`. Exact entry format varies by provider; conceptually it looks like this:

```dns
; SVCB record advertising the agent endpoint for the apex domain
_agents.techhorizonlabs.com.   3600  IN  SVCB  1 techhorizonlabs.com. (
    alpn="h2,h3"
    port=443
)
```

Notes on the fields:
- `_agents` is the discovery label agents look under.
- `1` is the SVCB priority (use `1` for a single record).
- `techhorizonlabs.com.` is the target host serving your agent/`llms.txt` files.
- `alpn` advertises HTTP/2 and HTTP/3 support; `port=443` is standard HTTPS.

Some providers don't expose `SVCB` directly. If yours only supports `HTTPS` records, use type `HTTPS` with the same parameters. If it supports neither, you cannot do this step on that provider — either skip it or move DNS to a provider that supports SVCB/HTTPS records (e.g. Cloudflare).

**How to verify it worked:**
```bash
dig _agents.techhorizonlabs.com SVCB +short
# or, if you used an HTTPS-type record:
dig _agents.techhorizonlabs.com HTTPS +short
```
You should see your record returned. DNS changes can take up to a few hours to propagate.

### 2B. Enable DNSSEC (so the records above can be trusted)

DNSSEC cryptographically signs your DNS zone so agents (and resolvers) can verify the discovery records weren't tampered with. Without it, the `_agents` records are unsigned and less trustworthy. This is the "advanced" half — it's a one-click toggle on some providers and a two-step (registrar + DNS host) process on others.

**Where:** your DNS provider's **DNSSEC** setting, and possibly your domain **registrar**.

**What to do:**
1. In your DNS host, turn on **DNSSEC** / **Enable DNSSEC**. The host will generate a **DS record** (Delegation Signer) — it shows a key tag, algorithm, digest type, and digest.
2. If your registrar is *different* from your DNS host, copy that **DS record** into the registrar's DNSSEC section so the parent zone (`.com`) knows your zone is signed. (If your registrar and DNS host are the same company, e.g. Cloudflare or Namecheap doing both, this is usually automatic.)

**How to verify it worked:**
```bash
dig techhorizonlabs.com DNSKEY +short      # should return keys
dig techhorizonlabs.com +dnssec | grep RRSIG   # should show RRSIG signatures
```
Or use the visual checker at [https://dnssec-analyzer.verisignlabs.com](https://dnssec-analyzer.verisignlabs.com) — paste `techhorizonlabs.com` and confirm all-green.

> ⚠️ DNSSEC misconfiguration can take a domain offline. If the registrar and DNS host are separate, enable signing at the DNS host **first**, confirm signatures resolve, **then** add the DS at the registrar. If anything goes wrong, removing the DS record at the registrar disables DNSSEC and restores normal resolution.

---

## 3. ⭐ Search & marketing visibility checklist

Concrete actions to maximise ranking in classic search **and** visibility in AI answers (AEO/GEO — Answer/Generative Engine Optimisation). Most of these are dashboard tasks, not code.

> Some of these overlap with the longer guide at `client/static/resources/seo-manual-actions-guide.md` (Google Business Profile, backlinks, keyword monitoring). This section is the short, prioritised version focused on **search consoles + machine-readable files + AI answer visibility**.

### 3.1 ⭐ Submit & verify the sitemap in Google Search Console

**Where:** [https://search.google.com/search-console](https://search.google.com/search-console)

**What to do:**
1. Confirm the `techhorizonlabs.com` property is verified (DNS TXT verification is the most robust — it covers all subdomains).
2. Go to **Sitemaps** → submit `https://techhorizonlabs.com/sitemap.xml`.
3. Re-submit whenever you add or remove pages, to nudge a re-crawl.

**How to verify:** Sitemaps page shows status **Success** and a discovered-URL count that matches the number of `<url>` entries in `public/sitemap.xml`.

### 3.2 ⭐ Submit & verify the sitemap in Bing Webmaster Tools

Bing also powers ChatGPT search and Copilot, so this directly helps AI-answer visibility.

**Where:** [https://www.bing.com/webmasters](https://www.bing.com/webmasters)

**What to do:**
1. Add the `techhorizonlabs.com` site (you can import settings directly from Google Search Console to save time).
2. Submit `https://techhorizonlabs.com/sitemap.xml` under **Sitemaps**.

**How to verify:** the sitemap shows **Submitted/Success** and URLs begin appearing under **URL Inspection** / **Indexed**.

### 3.3 ⭐ Keep `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt` current

These machine-readable files live in `public/` and are how both search crawlers and AI agents understand the site. They drift out of date as pages are added or removed.

**What to check (after any page is added/removed/renamed):**
- `public/sitemap.xml` — every live page is listed, no 404/410 pages remain, `lastmod` dates reflect real updates.
- `public/robots.txt` — still allows the search and AI crawlers you want, and the `Sitemap:` line points to the live sitemap.
- `public/llms.txt` — the curated map lists the current core/research/insights pages and the "Last updated" date is recent.
- `public/llms-full.txt` — the full-text corpus regenerates at build time; confirm it reflects current page content after a deploy.

**How to verify:**
```bash
curl -s https://techhorizonlabs.com/sitemap.xml | grep -c "<loc>"   # count of URLs
curl -sI https://techhorizonlabs.com/robots.txt | head -1           # expect 200
curl -sI https://techhorizonlabs.com/llms.txt | head -1             # expect 200
```
Spot-check a few URLs from the sitemap return `200` (not `301`/`404`/`410`).

### 3.4 ⭐ Confirm structured data (JSON-LD) and canonical tags

The pages ship JSON-LD schemas (Organization, LocalBusiness, FAQPage, Article, BreadcrumbList) and canonical tags. After each deploy, confirm they're valid — invalid structured data won't earn rich results and weakens AI extraction.

**Where:**
- [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [https://validator.schema.org](https://validator.schema.org)

**What to do:** paste a representative URL from each page type and confirm zero errors:
- `https://techhorizonlabs.com/`
- `https://techhorizonlabs.com/industries/legal`
- `https://techhorizonlabs.com/insights/claude-vs-chatgpt-2026`

**How to verify each page has a self-referencing canonical:**
```bash
curl -s https://techhorizonlabs.com/about | grep -i 'rel="canonical"'
```
The canonical URL should be the page's own clean URL (no query params, no trailing inconsistencies).

### 3.5 💡 Confirm the "Open" content-usage stance

You've chosen an **open** stance — AI crawlers are welcomed and citation with a link back is encouraged. This is already expressed in `public/robots.txt` (explicit `Allow` for the major AI crawlers) and in the licence line of `public/llms.txt`.

**What to do:** just confirm you still want this. If you ever want to *restrict* AI training use, that's a code change (tighten `robots.txt` and the `llms.txt` licence line) — flag it and the other agent-readiness work can handle it. No action needed if you're keeping it open.

### 3.6 ⭐ AEO/GEO — showing up in AI answers

Getting cited by ChatGPT, Perplexity, Claude, and Google AI Overviews rewards slightly different things than classic SEO. Priorities, in order:

1. **Be crawlable by AI bots** — already done in `robots.txt`. Verify it stays that way (3.3).
2. **Answer real questions directly.** Each key page should state the answer in the first paragraph, in plain language, before the marketing. AI engines lift concise, self-contained answers. The FAQ schema on the pages helps here.
3. **Cite primary sources and real numbers.** Your insights pages already use first-party survey data and named sources — keep doing this. AI engines prefer pages with verifiable, specific claims (dates, figures, named studies) over vague copy.
4. **Earn mentions on third-party sites.** AI answers heavily weight what *other* reputable sites say about you (directories, press, partner sites, LinkedIn). This is the backlink/PR work in the longer guide — it's the single biggest lever for being named in AI answers.
5. **Keep entity consistency.** Business name, address, founder name, and social handles should be identical across the site schema, Google Business Profile, and any directory listing. Inconsistency confuses the entity graph that AI engines rely on.

**How to verify (spot-check, monthly):**
- Ask the AI engines directly: in ChatGPT (with search), Perplexity, and Google's AI Overview, search things like *"AI consultant Sunshine Coast"*, *"AI implementation consulting Queensland"*, *"fractional AI ops Australia"* and note whether Tech Horizon Labs is named or cited.
- Track the trend over time rather than a single result — AI answers vary run-to-run. Improvement in how often/accurately you're cited is the signal that the work is paying off.

---

## Done criteria

- [ ] Resend shows `techhorizonlabs.com` as **Verified** and a live-form test email arrives (Section 1)
- [ ] Sitemap submitted & succeeding in **Google Search Console** (3.1) and **Bing Webmaster Tools** (3.2)
- [ ] `sitemap.xml` / `robots.txt` / `llms.txt` all return 200 and are current (3.3)
- [ ] Structured data validates with zero errors; canonicals are self-referencing (3.4)
- [ ] (Optional) `_agents` SVCB/HTTPS record resolves and DNSSEC validates green (Section 2)

---

*Manual-only steps. No website code changes are required to follow this guide — the in-code agent-readiness, SEO, and email work is handled separately. Last written 2026-06-11.*
