# SEO Manual Actions Guide — Australian SMB Template

**Last updated:** April 2026
**For:** Australian SMB owners running their own SEO

This guide covers every manual SEO action that cannot be done in code or by your developer. Work through the sections in order. The high-priority sections should be completed first because they have the most impact on search visibility.

The guide is a template. Anywhere you see `[YOUR ...]` placeholders, swap in your own business details. Worked examples are shown in callouts and use a fictional consulting business so you can see how a real fill-in looks.

---

> **Want this done for you?**
> Tech Horizon Labs runs a free SEO/GEO audit on your site using our agentic team. We map your manual SEO actions automatically and hand you the prioritised list — no setup, no obligation. Book a free 30-minute discovery call at [app.klipycrm.com/book/pre-discovery/free-pre-discovery](https://app.klipycrm.com/book/pre-discovery/free-pre-discovery).

---

## Timeline Overview

| When | What | Platform | Priority |
|------|------|----------|----------|
| **Week 1** | Submit sitemap to Google | GSC | High |
| **Week 1** | Request indexing of priority pages | GSC | High |
| **Week 1** | Set up / clean Google Business Profile | GBP | High |
| **Week 1** | Remove cached old URLs (post-migration) | GSC | High |
| **Week 2** | Set up Bing Webmaster Tools and submit sitemap | Bing WMT | Medium |
| **Week 2** | Check which URL ranks for priority keywords | GSC | Medium |
| **Week 2** | Set up conversion goals in your analytics | Analytics | Medium |
| **Month 1** | Begin backlink outreach | Email / LinkedIn | Medium |
| **Ongoing** | Monthly keyword monitoring | GSC | Routine |
| **Ongoing** | Monthly backlink check | GSC | Routine |
| **Quarterly** | Review and update GBP posts | GBP | Routine |

---

## 1. Google Search Console (GSC) — High Priority

### 1.1 Verify Site Ownership

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click "Add property".
3. Choose "URL prefix" and enter `https://[YOUR DOMAIN]`.
4. Verify using DNS verification. Add the TXT record Google provides to your DNS settings (Cloudflare, GoDaddy, etc.). This is the simplest method and does not require any code changes.
5. Once verified, you will see the GSC dashboard.

### 1.2 Submit the Sitemap

1. In GSC, go to **Sitemaps** in the left sidebar.
2. Enter `sitemap.xml` in the "Add a new sitemap" field.
3. Click **Submit**.
4. Wait for Google to process it (usually within 24-48 hours).
5. Check back to confirm the status shows "Success" and the discovered URL count roughly matches the number of pages on your site.

### 1.3 Request Indexing of Priority Pages

Google will eventually find every page via the sitemap, but requesting indexing speeds the process up significantly. Do this for every page you want indexed quickly.

1. In GSC, go to **URL Inspection** (top search bar).
2. Paste each URL one at a time.
3. Click **Request Indexing** for each one.
4. Wait for the "Indexing requested" confirmation before moving to the next URL.

**Priority page framework (submit in this order):**

1. Homepage.
2. Your top 5-10 commercial / money pages (the pages that describe what you sell).
3. Your lead-magnet and contact pages (free downloads, quotes, bookings, contact).
4. Each location page (one per suburb / city you serve).
5. Each industry or service page (one per vertical you target).
6. Your blog or insights index.
7. Your top 10-20 blog articles ranked by current traffic or commercial relevance.
8. Any other recently published or recently updated page.

Google limits indexing requests to roughly 10-20 per day per property. If you hit the limit, continue the next day.

> **Worked example.** A Queensland fractional AI ops consultancy with 34 pages would submit: homepage, `/assessment`, `/scorecard`, `/report`, `/academy`, `/research`, `/tools`, then the location pages (`/locations/brisbane`, `/locations/sunshine-coast`, etc.), then industry pages, then the `/insights/...` articles. Total ~30 URLs spread across 2 days.

### 1.4 Remove Cached Old URLs

If you migrated from another platform (WordPress, Wix, Squarespace, Shopify, etc.), old URLs may still appear in Google's index. They show up as 404 errors or redirect to the wrong place.

1. In GSC, go to **Pages** (under Indexing in the left sidebar).
2. Look for pages with errors, especially old platform-style URLs (e.g. `?p=`, `/wp-content/`, `/wp-admin/`, `/category/`, or auto-generated tag/archive URLs).
3. For each old URL that should not exist:
   - Go to **Removals** in the left sidebar.
   - Click **New Request**.
   - Enter the old URL.
   - Select "Remove this URL only".
   - Click **Submit**.
4. Also check the **Coverage** report for "Crawled — currently not indexed" pages that might be old migration leftovers.

### 1.5 Check Which URL Ranks for Each Priority Keyword

This matters whenever you have two pages that target similar keywords (e.g. a service page and a location page, or a service page and a blog article). You want to make sure the *right* page ranks for the *right* query.

1. In GSC, go to **Performance** > Search results.
2. Click **+ New** filter, then **Query**.
3. Search for each of your priority keywords one at a time.
4. For each query, look at which page appears in the **Pages** tab below.
5. If the wrong page is ranking (e.g. a blog post is outranking your money page for a commercial query), note it down. The fix is usually internal-link consolidation and a content adjustment — covered in section 6.

### 1.6 Monthly GSC Monitoring Routine

Do this on the first Monday of each month:

1. **Performance check:** Performance > Search results. Set date range to "Last 28 days". Note total clicks, impressions, average CTR, and average position. Compare to the previous period. Look at the top queries driving traffic.
2. **Indexing check:** Pages (under Indexing). Check for any new errors or pages that dropped out of the index. If new pages were added since last check, request indexing for them.
3. **Core Web Vitals:** Experience > Core Web Vitals. Check for any "Poor" or "Needs Improvement" URLs. Note these for technical investigation.

---

## 2. Google Business Profile (GBP) — High Priority

Your GBP listing is what shows up in the local pack (the map block at the top of Google for local searches) and in Google Maps. For most SMBs it drives more leads than the website does. Work through 2.1 to 2.10 in order. Total time is about 30 minutes plus a one-off ~15 minute baseline ranking snapshot in 2.9. All edits are inside [business.google.com](https://business.google.com); nothing in this section requires code changes.

### 2.1 Rewrite the Description

GBP gives you two description fields. Keep the long description under 750 characters and the short "From the business" description under 250.

**Where to edit:** GBP dashboard > Edit profile > About > Business description.

**Long description template (paste-ready, fill in the placeholders):**

> [YOUR BUSINESS NAME] is a [YOUR REGION] [YOUR BUSINESS TYPE] based in [YOUR PRIMARY SUBURB]. We help [YOUR TARGET CUSTOMER] [DO THE THING YOU DO]. Our approach has [N] stages. We [STAGE 1], [STAGE 2], [STAGE 3], and [STAGE 4]. We work on-site across [PRIMARY SERVICE AREAS] and remotely across [WIDER SERVICE AREA]. [TRUST SIGNAL 1], [TRUST SIGNAL 2], [TRUST SIGNAL 3]. Book a free [N]-minute [CALL TYPE] at [YOUR DOMAIN] or call [YOUR PHONE].

**Short "From the business" template (about 230 characters):**

> [YOUR REGION] [YOUR BUSINESS TYPE]. We help [YOUR TARGET CUSTOMER] [DO THE THING YOU DO] using [YOUR METHOD OR DIFFERENTIATOR]. [TRUST SIGNAL]. Free [N]-minute [CALL TYPE].

> **Worked example — fictional consulting business.**
> "Tech Horizon Labs is a Queensland fractional AI ops consultancy based in Noosa Heads. We help small and mid-sized Australian businesses move past ChatGPT experiments and deploy AI systems that actually run inside their workflows. Our Horizon Method has four stages. We Map your real workflows, Blueprint the right system, Deploy it on private Australian infrastructure, and Retain the knowledge inside your team through training. We work on-site across the Sunshine Coast, Brisbane, and the Gold Coast, and remotely across Queensland. Privacy Act aligned, Australian-hosted, fixed-price builds. Book a free 30-minute discovery call at techhorizonlabs.com."

### 2.2 Fix the Categories

The primary category is the single most important field on GBP for local ranking. Most legacy listings have an inherited primary category that no longer matches what the business actually sells. Pick a primary that exactly matches your core offering.

**Where to edit:** GBP dashboard > Edit profile > About > Business category.

**Slot framework:**

| Slot | Choose | Why |
|------|--------|-----|
| **Primary** | The single category that best describes your core paid offering. | This is the highest-weighted relevance signal for the local pack. |
| Secondary 1 | A category that captures a different revenue line. | Picks up adjacent searches. |
| Secondary 2 | A category that captures a service or audience the primary misses. | Adds discovery surface. |
| Secondary 3 | A broader category that captures generic intent. | Catches casual searchers. |
| Secondary 4 | Optional — a niche category if it fits. | Only if it is genuinely accurate. |

**Removal rule:** Remove any category that does not exactly match what you sell. Inherited or aspirational categories dilute the relevance signal and pull in the wrong audience.

> **Worked example.** A fractional AI consultancy might pick: **Primary** = Business Management Consultant, **Secondary** = Software Company, Educational Consultant, Marketing Consultant, Computer Consultant. They would explicitly remove "Computer support and services" because it tells Google they fix laptops, not deploy AI systems.

### 2.3 Update the Service Areas

GBP allows up to 20 service areas. Adding the major suburbs explicitly helps the listing surface in suburb-level "near me" searches.

**Where to edit:** GBP dashboard > Edit profile > Location > Service area.

**Service area framework:**

1. Your primary suburb (where you are physically based).
2. The 3-5 closest neighbouring suburbs.
3. The major town or city near you (e.g. Brisbane, Melbourne, Sydney).
4. Any second or third town / city you regularly travel to.
5. Your state or region as a catch-all for remote work.

**Remove:** any single broad entry like "[Primary suburb] and nearby areas" — replace it with explicit named suburbs.

> **Worked example — Sunshine Coast based consultancy.**
> Noosa Heads, QLD; Noosaville, QLD; Sunshine Coast, QLD; Maroochydore, QLD; Mooloolaba, QLD; Caloundra, QLD; Nambour, QLD; Gympie, QLD; Brisbane, QLD; Gold Coast, QLD; Queensland, Australia.

### 2.4 Fix the Hours

"Open 24 hours" is a red flag to Google for any business that is not genuinely a 24/7 service. Google quietly down-weights small businesses that claim 24/7 availability when they are not. Set standard business hours.

**Where to edit:** GBP dashboard > Edit profile > Hours.

**Weekly hours template:**

- Monday: [YOUR OPEN TIME] – [YOUR CLOSE TIME]
- Tuesday: [YOUR OPEN TIME] – [YOUR CLOSE TIME]
- Wednesday: [YOUR OPEN TIME] – [YOUR CLOSE TIME]
- Thursday: [YOUR OPEN TIME] – [YOUR CLOSE TIME]
- Friday: [YOUR OPEN TIME] – [YOUR CLOSE TIME]
- Saturday: [YOUR HOURS OR "Closed"]
- Sunday: [YOUR HOURS OR "Closed"]

If you take after-hours bookings by appointment, add a note in the description or "More hours" field: "After-hours [CALL TYPE OR APPOINTMENTS] available by appointment via the booking link."

**Australian public holiday list to add as special hours each year:** Christmas Day, Boxing Day, New Year's Day, Australia Day, Good Friday, Easter Monday, Anzac Day, your state's public holidays (e.g. Queen's Birthday, Labour Day), and Christmas Eve (often a half day). GBP prompts for these automatically about a month in advance.

### 2.5 Services Catalogue

The Services section on GBP is a separate field from the description and shows up as a structured list inside Maps and Search. Add one entry per service you actually want to be found for.

**Where to edit:** GBP dashboard > Edit profile > Services > Add service.

**Service item template (repeat for each service):**

- **Name:** [SERVICE NAME]
- **Description:** [ONE-SENTENCE DESCRIPTION OF WHAT IT IS AND WHO IT IS FOR]. [DELIVERY MODEL OR FORMAT].
- **Price:** [PRICE OR "Price on request" OR "Free"]

> **Worked example — fractional AI consultancy.**
> 1. **AI Readiness Assessment** — Free 30-minute pre-discovery call to map where AI fits in your business. *Price: Free.*
> 2. **Horizon Method Implementation** — End-to-end AI system build using our four-stage Map, Blueprint, Deploy, Retain process. Fixed-price 4 to 12 week sprint.
> 3. **Workflow Automation Build** — Custom automation that connects your existing tools, removes manual handoffs, and runs on Australian infrastructure.
> 4. **Private AI System Deployment** — Privacy Act aligned AI deployments on Australian or self-managed infrastructure.
> 5. **AI Training Workshops** — Half-day, full-day, and multi-day workshops for staff and leadership.
> 6. **AI Academy Membership** — Ongoing AI literacy program with monthly office hours, prompt library, and workflow templates.
> 7. **Fractional AI Operations** — Embedded part-time AI lead on a monthly retainer.
> 8. **AI Governance and Policy** — Internal AI usage policy, vendor review, Privacy Act review, and staff acceptable-use guidance.

### 2.6 GBP Posts (first two months)

GBP posts surface inside the local pack, the knowledge panel, and Maps. Schedule one per week for the next eight weeks. Use the Posts tab in the GBP dashboard.

**Post 1 — What's New (week 1):**
- Title: [YOUR REGION] [YOUR BUSINESS TYPE], [YOUR DIFFERENTIATOR]
- Body: We help [YOUR TARGET CUSTOMER] [DO THE THING YOU DO]. [ONE-LINE PROOF].
- CTA: Book — free [CALL TYPE].
- Image: Logo on brand-colour background.

**Post 2 — Offer (week 2):**
- Title: Free [YOUR LEAD MAGNET NAME]
- Body: [WHAT THE LEAD MAGNET DOES IN ONE SENTENCE]. [WHY IT IS USEFUL]. [DELIVERY FORMAT].
- CTA: Sign up — get the [LEAD MAGNET].
- Image: Screenshot or cover of the lead magnet.

**Post 3 — What's New (week 3):**
- Title: [YOUR METHOD OR FRAMEWORK NAME] explained
- Body: [STAGE 1]. [STAGE 2]. [STAGE 3]. [STAGE 4]. [N] stages, [PRICING MODEL], [GUARANTEE OR PROMISE].
- CTA: Learn more — [YOUR METHOD].
- Image: Simple diagram of the stages.

**Post 4 — Event (week 4):**
- Title: [YOUR EVENT TYPE], [YOUR LOCATION]
- Body: [EVENT FORMAT] for [YOUR TARGET AUDIENCE]. [WHAT THEY WILL LEARN OR LEAVE WITH]. Limited seats.
- CTA: Sign up — see dates.
- Image: Photo from a previous event, or a clean venue photo.

**Post 5 — Offer (week 5):**
- Title: Free [YOUR FLAGSHIP REPORT OR DOWNLOAD]
- Body: [WHAT IT COVERS]. [WHY IT IS DIFFERENT FROM GENERIC CONTENT]. [FORMAT].
- CTA: Download — get the [DOWNLOAD].
- Image: Cover image of the report.

**Post 6 — What's New (week 6):**
- Title: [YOUR SERVICE] for [YOUR INDUSTRY VERTICAL]
- Body: [HOW YOUR SERVICE APPLIES TO THIS VERTICAL]. [INDUSTRY-SPECIFIC TRUST SIGNAL]. [TIMELINE OR PRICING].
- CTA: Learn more — [SERVICE FOR INDUSTRY].
- Image: Industry-themed header image.

**Post 7 — What's New (week 7):**
- Title: Why [SECOND CITY] [YOUR TARGET CUSTOMER]s are calling us
- Body: [LIST OF SUB-VERTICALS]. [SECOND CITY] [TARGET CUSTOMER]s are [DOING THE THING]. Here is how.
- CTA: Learn more — [SECOND CITY] [SERVICE].
- Image: Second-city skyline or regional photo.

**Post 8 — Offer (week 8):**
- Title: Book a free [N]-minute [CALL TYPE]
- Body: No sales pitch. We [WHAT YOU DO ON THE CALL] and tell you honestly whether [YOUR SERVICE] is worth doing now or later.
- CTA: Book — pick a time.
- Image: Owner photo or a clean call-themed graphic.

After the first two months, post one to two updates per month. Mix offer, event, and what's-new posts.

### 2.7 Q&A Seeding

Seed the Questions and Answers section yourself before customers start asking. Post each question from a personal Google account, then answer it from the business account. This is fully within Google's guidelines and is the standard local SEO practice.

**Where to edit:** Open the public GBP listing in Google Search > scroll to "Questions and answers" > Ask a question.

**Question framework — write 10 of these:**

1. **Q:** How much does [YOUR SERVICE] cost? **A:** [PRICE RANGE]. [HOW YOU PRICE — fixed, hourly, retainer]. [FREE CONSULT OFFER].
2. **Q:** Where is [YOUR BUSINESS NAME] based? **A:** [YOUR PRIMARY SUBURB]. [WHERE ELSE YOU WORK ON-SITE]. [WHERE YOU WORK REMOTELY].
3. **Q:** What does [YOUR SERVICE] actually include? **A:** [STAGE / DELIVERABLE 1], [STAGE 2], [STAGE 3], [STAGE 4]. [WHAT IS INCLUDED IN THE FIXED PRICE].
4. **Q:** How long does a [YOUR SERVICE] project take? **A:** [TYPICAL RANGE]. [BREAKDOWN BY PHASE]. [WHAT DETERMINES THE LENGTH].
5. **Q:** Who runs [YOUR BUSINESS NAME]? **A:** [OWNER NAME]. [BACKGROUND]. [WHERE BASED]. [AVAILABILITY].
6. **Q:** Do you work with [SECOND CITY] businesses? **A:** Yes. [WHAT YOUR PRACTICE IN THAT CITY COVERS]. [DELIVERY MODEL FOR THAT CITY]. [LINK TO LOCATION PAGE].
7. **Q:** What industries do you specialise in? **A:** [LIST OF VERTICALS]. [PROOF — case studies, industry pages]. [TYPICAL CUSTOMER SIZE].
8. **Q:** Do you offer [TRAINING / SUPPORT / RETAINER]? **A:** Yes. [WHAT FORMATS]. [WHERE]. [ONGOING OPTIONS].
9. **Q:** What makes you different from a generic [YOUR INDUSTRY] provider? **A:** [YOUR CORE DIFFERENTIATOR EXPLAINED]. [WHAT OTHERS DO]. [WHAT YOU DO INSTEAD].
10. **Q:** How do I book a call? **A:** Free [N]-minute [CALL TYPE] at [YOUR BOOKING LINK]. No sales pitch on the first call.

> **Worked example for Q1.**
> "Q: How much does AI implementation cost in Australia? A: Most of our SMB engagements run between AUD 8,000 and AUD 50,000 depending on scope. We work fixed price, not hourly, so the number is locked in before we start. Free 30-minute discovery call to scope your specific project."

### 2.8 Photo Upload Checklist

GBP listings with 10 or more recent photos rank measurably better in the local pack than listings with the logo only. Upload the following set in the first session, then add 2 to 3 fresh photos per quarter.

**Where to edit:** GBP dashboard > Photos > Add photos.

Required first batch:

1. Logo — square 1080x1080 PNG, transparent background.
2. Cover photo — wide 16:9 photo, ideally a clean local landscape with a subtle brand-colour overlay.
3. Headshot of the owner / lead — clean professional photo, neutral background.
4. Second photo of the owner — working or presenting, mid-action, more candid.
5. Third photo of the owner — at an event or with a client.
6. Workspace photo 1 — wide shot of the workspace, workshop, or service in progress.
7. Workspace photo 2 — close-up, attendees or tools in frame.
8. Premises exterior — only if customers visit. Otherwise skip.
9. Premises interior — same caveat.
10. Work-product screenshot 1 — anonymised screenshot of something you have built or delivered.
11. Work-product screenshot 2 — different anonymised example, ideally from a different industry.
12. Before-and-after diagram — simple visual showing the transformation you deliver.
13. Speaking engagement photo — owner speaking at a Chamber of Commerce event or similar.
14. Team or partner photo — even if it is just the owner with a contractor or collaborator. Listings with a "team" feel rank better than solo-operator listings.
15. Award, certification, or media mention — screenshot or photo of any third-party recognition.

**Important:** Do not upload AI-generated or stock images. Google can detect both, and AI-generated images in particular are starting to trigger demotion in local results. Use real photography only. Phone shots are fine.

### 2.9 Track Which GBP Changes Actually Moved Rankings

After applying the GBP cleanup (sections 2.1 to 2.8), measure the impact so the next quarter is informed by data, not guesswork. Without a baseline, there is no way to know whether the category fix, the photos, or the posts did the work.

**Setup (once, before applying any GBP changes):**

1. Download the tracker template: `/resources/gbp-ranking-tracker.csv`.
2. Open Google Sheets, then File > Import > Upload, and upload the CSV. Choose "Replace spreadsheet" and keep "Detect automatically" for the separator.
3. Fill in your own 10-15 priority local keywords using the keyword bucket framework in section 6 of this guide. Pick the keywords with the strongest local-pack intent.
4. Fill in the **Baseline (pre-cleanup)** and **Baseline date** columns BEFORE making any GBP edits. Use the snapshot capture method below.
5. As each GBP change from sections 2.1 to 2.8 is applied, record the date in the **GBP Changes Log** rows of the sheet.

**GBP Snapshot Capture Checklist (do this for the baseline, then every Friday for 12 weeks):**

For each keyword, capture the current local pack position using one of the two free methods below. Pick one method and stick with it for all 12 weeks so the data is comparable.

*Option A — Local Falcon free tier (recommended, ~5 minutes per snapshot):*

1. Sign up at [localfalcon.com](https://www.localfalcon.com) (the free tier allows a limited number of scans per month, enough for a weekly snapshot of 10-15 keywords).
2. Add your GBP listing as a location.
3. Run a scan for each keyword with a 3x3 grid centred on your primary service area.
4. Record the **average pack position** the scan reports in the matching Wk column.
5. If the listing does not appear in any of the 9 grid points, leave the cell blank (counts as "not in top 20").

*Option B — Manual incognito searches (free, ~15 minutes per snapshot):*

1. Open Chrome in an incognito window. Sign out of any Google account.
2. Set the search location to your primary suburb: search for anything, click "Tools" under the search bar, then change "Any location" to your suburb (or use a free VPN/location tool to set your postcode).
3. Search each keyword one at a time.
4. For each search, scroll until the listing appears in the local pack (the map block) or in the organic results. Record the position:
   - 1, 2, or 3 if in the local pack (1 = top map result).
   - 4 to 10 if it appears only in organic page 1 below the pack.
   - 11 to 20 if it appears on page 2.
   - Leave blank if it does not appear in the top 20.
5. Always search from the same location and the same browser state. Mixing logged-in searches with incognito searches will pollute the data.

**Weekly cadence:**

- Capture every Friday at roughly the same time of day for 12 weeks.
- Total time: ~5 to 15 minutes per week depending on the method chosen.
- Add the date a GBP change is made to the **GBP Changes Log** as it happens — do not try to remember it later.

**Reviewing the results at week 12:**

1. Open the tracker. Fill in the **Delta (Wk12 - Baseline)** column. A negative number is good (e.g. baseline 14 → Wk12 6 = delta -8).
2. Cross-reference the dates of any large jumps against the **GBP Changes Log**. If three keywords jumped between Wk3 and Wk4 and the only change in that window was the categories fix, the categories did the work.
3. Fill in the **12-Week Review** rows at the bottom of the sheet. This becomes the input for the next quarter's plan.
4. If a keyword has not moved at all after 12 weeks, the GBP cleanup is not the lever for that term — note it as needing a different intervention (more content targeting that query, a relevant backlink, or a dedicated landing page).

### 2.10 Quarterly Maintenance Checklist

Block 30 minutes in the calendar every 90 days for the following.

- Add 2 to 3 new photos. Rotate older photos to the back of the gallery.
- Confirm the description still matches your latest positioning. Update it if any major service or location has changed.
- Confirm hours are correct. Set special hours for upcoming Australian public holidays.
- Post 1 to 2 updates per month minimum. Posts older than 6 months stop appearing in search.
- Review and respond to every review within 48 hours. Thank positive reviewers by name. Respond to negative reviews calmly with a path to resolution.
- Open the Insights tab. Note the top 5 search queries that surfaced the listing this quarter. Use those queries to inform new posts and Q&A entries.
- Review the Services list. Add any new offerings, remove anything no longer sold.
- Confirm the booking link still works. GBP occasionally drops the link if the destination URL changes.

---

## 3. Bing Webmaster Tools — Medium Priority

### 3.1 Set Up Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters).
2. Sign in with a Microsoft account.
3. Click "Add your site".
4. Enter `https://[YOUR DOMAIN]`.
5. Import from GSC is the fastest option if you have already set up GSC:
   - Click "Import from GSC".
   - Authorise the connection.
   - Your sitemap and verified site will be imported automatically.
6. If not using GSC import, verify via DNS (add a CNAME record to your DNS provider).

### 3.2 Submit the Sitemap

1. Go to **Sitemaps** in the left sidebar.
2. Click "Submit sitemap".
3. Enter `https://[YOUR DOMAIN]/sitemap.xml`.
4. Click **Submit**.

### 3.3 Submit Key URLs

1. Go to **URL Submission** in the left sidebar.
2. Submit the same priority URLs from section 1.3 above.
3. Bing allows bulk URL submission (up to 10,000 per day), so you can submit them all at once.

---

## 4. Analytics — Conversion Tracking

Whichever analytics tool you use (Plausible, GA4, Fathom, Simple Analytics, Matomo, etc.), the goal is the same: track which pages drive real business actions, not just pageviews.

### 4.1 Set Up Goals in Your Analytics

Add the following custom event or goal entries. Some will be pageview goals (no code change); others are custom events your developer will need to wire up.

| Goal Name | What It Tracks | Type |
|-----------|----------------|------|
| `Lead Magnet Started` | Someone begins your headline quiz, calculator, or assessment | Custom event |
| `Lead Magnet Completed` | Someone finishes it | Custom event |
| `Email Submitted` | Someone submits their email for a gated download | Custom event |
| `Report Downloaded` | Someone downloads the flagship PDF / DOCX | Custom event |
| `Contact Form Submitted` | Someone submits the contact form | Custom event |
| `Newsletter Signup` | Someone signs up for the newsletter | Custom event |
| `Booking Link Clicked` | Someone clicks a "Book a call" CTA | Custom event |

For a no-code start, add pageview goals for `/contact`, `/book`, `/[LEAD MAGNET PATH]`, and your main commercial pages.

### 4.2 Monthly Analytics Review

On the first Monday of each month (combine with GSC review):

1. Check which pages get the most traffic.
2. Check which pages have the highest bounce rate.
3. Check traffic sources (direct, search, referral).
4. Check which blog articles drive the most traffic.
5. Note any pages with growing or declining traffic trends.

---

## 5. Backlink Opportunities — Medium Priority

Backlinks from relevant Australian sites will significantly improve search rankings. These are the categories any Australian SMB can pursue.

### 5.1 Business Directories (Do First)

Submit to these Australian business directories. Most are free.

| Directory | URL | Priority |
|-----------|-----|----------|
| Clutch.co | clutch.co | High |
| GoodFirms | goodfirms.co | High |
| True Local | truelocal.com.au | High |
| Yellow Pages AU | yellowpages.com.au | High |
| Hotfrog | hotfrog.com.au | Medium |
| StartLocal | startlocal.com.au | Medium |
| Business.com.au | business.com.au | Medium |
| Australian Business Directory | australianbusinessdirectory.com.au | Medium |
| [Your regional business directory] | [search "[YOUR REGION] business directory"] | High |
| [Your local Chamber of Commerce] | [search "[YOUR SUBURB] chamber of commerce"] | High |
| [Your nearest capital city business hub] | [search "[CITY] business hub"] | Medium |

For each directory:

1. Create a listing with consistent NAP (Name, Address, Phone):
   - **Name:** [YOUR BUSINESS NAME]
   - **Phone:** [YOUR PHONE]
   - **Email:** [YOUR EMAIL]
   - **Website:** https://[YOUR DOMAIN]
   - **ABN:** [YOUR ABN]
2. Use the same business description as the GBP profile (section 2.1).
3. Select relevant categories (match the GBP primary category where possible).

### 5.2 Industry and Content Backlinks

These take more effort but are higher value.

**Guest posting opportunities — Australian SMB-friendly publications:**

- SmartCompany (smartcompany.com.au)
- Kochie's Business Builders (kochiesbusinessbuilders.com.au)
- Dynamic Business (dynamicbusiness.com)
- Anthill Magazine (anthillonline.com)
- Your industry's national trade publication.
- Your state's small business association blog.

**Pitch template (fill in the blanks):**

> Subject: Guest article pitch — [YOUR ANGLE] for Australian [YOUR INDUSTRY OR AUDIENCE]
>
> Hi [EDITOR NAME],
>
> I run [YOUR BUSINESS NAME], a [YOUR BUSINESS TYPE] based in [YOUR REGION]. I work with [YOUR TARGET CUSTOMER] and have some insights from [YOUR DATA SOURCE — a survey, a year of client engagements, original research] that I think would interest your readers.
>
> Possible topics:
> - [TOPIC 1 — counter-intuitive insight with a number].
> - [TOPIC 2 — practical how-to with a specific outcome].
> - [TOPIC 3 — mistake-list framed for your audience].
>
> Happy to write 800-1,200 words with original data. No sales pitch — just practical insights.
>
> Cheers,
> [YOUR NAME]
> [YOUR BUSINESS NAME]
> [YOUR DOMAIN]

**Professional associations to consider:**

- The relevant industry body for your vertical (national or state).
- AIIA, AI Group, AMA, Law Society, Master Builders, etc. — whichever applies to your business.
- Get listed in their member directories. These are usually high-authority backlinks.

**Local business networks:**

- Your suburb's Chamber of Commerce.
- Your region's Business Council.
- The nearest capital city Chamber of Commerce if you serve that market.
- Attend local business events and get listed on event pages.

### 5.3 Monthly Backlink Monitoring

1. In GSC, go to **Links** in the left sidebar.
2. Check "Top linking sites" — note any new domains linking to you.
3. Check "Top linked pages" — confirm your most important pages are getting links.
4. If any spammy sites are linking to you, consider using the GSC Disavow Tool — but only if the links are clearly harmful.

---

## 6. Keyword Monitoring Schedule

### 6.1 Keyword Bucket Framework

Group your keywords into three buckets. Track each bucket separately so you can see which type of traffic is growing.

**Bucket A — Commercial intent (someone ready to buy).** Pattern: `[your service] [your location]`, `[your service] near me`, `best [your service]`, `[your service] cost`, `hire [your service provider]`.

**Bucket B — Informational / long-tail (someone researching).** Pattern: `how to [solve the problem you solve]`, `what is [your service]`, `[your service] vs [alternative]`, `is [your service] worth it`, `[your service] guide`.

**Bucket C — Local (someone in your service area).** Pattern: `[your service] [your suburb]`, `[your service] [your city]`, `[your service] [your state]`, `[your industry] [your region]`.

**Pick 10-15 priority keywords total:** roughly 5-7 commercial, 3-5 informational, 3-5 local. Track these monthly. Anything more becomes noise.

> **Worked example — Queensland AI consultancy.**
> *Commercial:* "ai consultant queensland", "ai consultant sunshine coast", "ai consultant brisbane", "ai implementation australia", "ai consulting australia", "ai for small business australia", "ai systems for business".
> *Informational:* "ai readiness assessment", "ai readiness stages", "how much does ai cost australia", "claude vs chatgpt 2026", "ai governance australia".
> *Local:* "ai consultant noosa", "ai consultant gold coast", "ai training brisbane", "ai workshop queensland".

### 6.2 Monthly Keyword Tracking Process

1. Go to GSC > Performance > Search results.
2. Set date to "Last 28 days".
3. Click "Compare" and select "Previous period".
4. For each keyword in your 10-15 priority list, note:
   - Current position (average).
   - Impressions.
   - Clicks.
   - CTR.
   - Change from previous period.
5. Record these in a simple spreadsheet — even Google Sheets is fine.
6. Look for:
   - Keywords moving from page 2 to page 1 (positions 11-20 dropping to 1-10) — these are close to breakthrough.
   - Keywords with high impressions but low CTR — these may need better meta titles / descriptions.
   - New keywords appearing that you did not target — these reveal what Google thinks your site is about.

---

## 7. Quick Reference — What to Do When

### Weekly (10 minutes)
- Check GSC for any new crawl errors.
- Respond to any GBP reviews.
- During the 12-week post-cleanup window: capture the GBP ranking snapshot (section 2.9).

### Monthly (30 minutes)
- GSC performance review (section 1.6).
- Analytics review (section 4.2).
- Keyword ranking check (section 6.2).
- Backlink check in GSC (section 5.3).

### Quarterly (1 hour)
- Update GBP posts and run the GBP quarterly maintenance checklist (section 2.10).
- Capture the weekly GBP ranking snapshot (section 2.9) — also do this every Friday, not just quarterly.
- Review and refresh meta descriptions for underperforming pages.
- Check if any new pages need sitemap / indexing updates.
- Evaluate backlink outreach results and plan next round.

### When New Pages Are Added
- Request indexing in GSC (section 1.3).
- Submit URL to Bing Webmaster Tools (section 3.3).
- Update sitemap URL count reference if tracking it.
- Add internal links from existing relevant pages.

---

> **Want this done for you?**
> Working through this guide takes most owners 3-5 weeks of part-time effort, and most of the wins compound over months. If you would rather skip the manual setup, Tech Horizon Labs runs a free SEO/GEO audit on your site using our agentic team. We map every action in this guide to your specific site, prioritise the list by expected impact, and hand it back to you. Book a free 30-minute discovery call at [app.klipycrm.com/book/pre-discovery/free-pre-discovery](https://app.klipycrm.com/book/pre-discovery/free-pre-discovery).

---

## Notes

- **GSC daily limits:** Google limits URL inspection / indexing requests. If you hit the limit, continue the next day. No penalty for hitting the limit.
- **Indexing timeline:** New pages typically appear in Google within 2-7 days after requesting indexing. Some pages take longer.
- **GBP verification:** Postcard verification can take 5-14 days. Phone or email verification is faster when available.
- **Backlinks take time:** Do not expect immediate ranking improvements from backlinks. The effect builds over 2-6 months.
- **NAP consistency:** Always use exactly the same business name, address, and phone number across every directory and platform. Inconsistencies confuse Google.
