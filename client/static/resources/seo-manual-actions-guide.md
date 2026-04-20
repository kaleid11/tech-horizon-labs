# SEO Manual Actions Guide — Tech Horizon Labs

**Last updated:** April 2026
**For:** Huxley Peckham (site owner)
**Site:** techhorizonlabs.com

This guide covers every manual SEO action that cannot be done in code. Work through the sections in order. The priority sections should be completed first as they have the most impact on search visibility.

---

## Timeline Overview

| When | What | Platform | Priority |
|------|------|----------|----------|
| **Week 1** | Submit sitemap to Google | GSC | High |
| **Week 1** | Request indexing of all new/updated pages | GSC | High |
| **Week 1** | Set up Google Business Profile | GBP | High |
| **Week 1** | Remove cached old WordPress URLs | GSC | High |
| **Week 2** | Set up Bing Webmaster Tools and submit sitemap | Bing WMT | Medium |
| **Week 2** | Check which URL ranks for training keywords | GSC | Medium |
| **Week 2** | Set up Plausible conversion tracking | Plausible | Medium |
| **Month 1** | Begin backlink outreach | Email/LinkedIn | Medium |
| **Ongoing** | Monthly keyword monitoring | GSC | Routine |
| **Ongoing** | Monthly backlink check | GSC | Routine |
| **Quarterly** | Review and update GBP posts | GBP | Routine |

---

## 1. Google Search Console (GSC) — High Priority

### 1.1 Verify Site Ownership (if not already done)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add property"
3. Choose "URL prefix" and enter `https://techhorizonlabs.com`
4. Verify using DNS verification: Add the TXT record Google provides to your Cloudflare DNS settings. This is the simplest method and does not require any code changes.
5. Once verified, you will see the GSC dashboard

### 1.2 Submit the Sitemap

1. In GSC, go to **Sitemaps** in the left sidebar
2. Enter `sitemap.xml` in the "Add a new sitemap" field
3. Click **Submit**
4. Wait for Google to process it (usually within 24-48 hours)
5. Check back to confirm status shows "Success" and the discovered URL count matches 34

### 1.3 Request Indexing of New and Updated Pages

Google will eventually find these pages via the sitemap, but requesting indexing speeds up the process significantly. Do this for every page you want indexed quickly.

1. In GSC, go to **URL Inspection** (top search bar)
2. Paste each URL below one at a time
3. Click **Request Indexing** for each one
4. Wait for the "Indexing requested" confirmation before moving to the next URL

**Priority pages to request indexing for (do these first):**

- `https://techhorizonlabs.com/`
- `https://techhorizonlabs.com/assessment`
- `https://techhorizonlabs.com/scorecard`
- `https://techhorizonlabs.com/report`
- `https://techhorizonlabs.com/academy`
- `https://techhorizonlabs.com/research`
- `https://techhorizonlabs.com/tools`

**Location and industry pages:**

- `https://techhorizonlabs.com/locations/sunshine-coast`
- `https://techhorizonlabs.com/locations/brisbane`
- `https://techhorizonlabs.com/locations/gold-coast`
- `https://techhorizonlabs.com/locations/queensland`
- `https://techhorizonlabs.com/industries/legal`
- `https://techhorizonlabs.com/industries/construction`
- `https://techhorizonlabs.com/industries/healthcare`
- `https://techhorizonlabs.com/industries/retail`

**Insights articles:**

- `https://techhorizonlabs.com/insights`
- `https://techhorizonlabs.com/insights/ai-implementation-cost-australia`
- `https://techhorizonlabs.com/insights/ai-mistakes-australian-businesses`
- `https://techhorizonlabs.com/insights/ai-readiness-stages-australia`
- `https://techhorizonlabs.com/insights/how-australia-uses-ai-2026`
- `https://techhorizonlabs.com/insights/ai-impact-by-industry`
- `https://techhorizonlabs.com/insights/claude-vs-chatgpt-2026`
- `https://techhorizonlabs.com/insights/ai-training-gap-australia`
- `https://techhorizonlabs.com/insights/accc-microsoft-copilot-australia`
- `https://techhorizonlabs.com/insights/ai-governance-australian-business`
- `https://techhorizonlabs.com/insights/ai-for-law-firms-australia`

**Training and other pages:**

- `https://techhorizonlabs.com/training/sunshine-coast`
- `https://techhorizonlabs.com/about`
- `https://techhorizonlabs.com/work`
- `https://techhorizonlabs.com/contact`
- `https://techhorizonlabs.com/security`
- `https://techhorizonlabs.com/openclaw`

Note: Google limits indexing requests to a certain number per day. If you hit the limit, continue the next day.

### 1.4 Remove Cached Old WordPress URLs

If the site was previously on WordPress, old URLs may still appear in Google's index. These show up as 404 errors or redirect to the wrong place.

1. In GSC, go to **Pages** (under Indexing in the left sidebar)
2. Look for pages with errors, especially any old WordPress-style URLs (e.g. URLs with `?p=`, `/wp-content/`, `/wp-admin/`, or `/category/`)
3. For each old URL that should not exist:
   - Go to **Removals** in the left sidebar
   - Click **New Request**
   - Enter the old URL
   - Select "Remove this URL only"
   - Click **Submit**
4. Also check the **Coverage** report for "Crawled — currently not indexed" pages that might be old WordPress URLs

### 1.5 Check Which URL Ranks for Training Keywords

This is important because you have both `/training/sunshine-coast` and `/academy` targeting similar keywords. You want to make sure the right page ranks.

1. In GSC, go to **Performance** (Search results)
2. Click **+ New** filter, then **Query**
3. Search for these terms one at a time:
   - "ai training sunshine coast"
   - "ai workshop sunshine coast"
   - "ai business training sunshine coast"
   - "ai training course queensland"
4. For each query, look at which page appears in the **Pages** tab below
5. If `/academy` is ranking instead of `/training/sunshine-coast` for location-specific queries (or vice versa), note it down — this may need a content adjustment

### 1.6 Monthly GSC Monitoring Routine

Do this on the first Monday of each month:

1. **Performance check:**
   - Go to Performance > Search results
   - Set date range to "Last 28 days"
   - Note total clicks, impressions, average CTR, and average position
   - Compare to previous period
   - Look at the top queries driving traffic

2. **Indexing check:**
   - Go to Pages (under Indexing)
   - Check for any new errors or pages that dropped out of the index
   - If new pages were added since last check, request indexing for them

3. **Core Web Vitals:**
   - Go to Experience > Core Web Vitals
   - Check for any "Poor" or "Needs Improvement" URLs
   - Note these for technical investigation

---

## 2. Google Business Profile (GBP) — High Priority

The current GBP listing has stale copy and settings from an earlier version of the brand. Work through 2.1 to 2.10 in order. Total time is about 30 minutes (plus a one-off ~15 minute baseline ranking snapshot in 2.9). All edits are inside [business.google.com](https://business.google.com), nothing in this section requires code changes.

### 2.1 Fix the Description

The current description mentions "Silicon Valley" and "smart assistants" and is no longer aligned with the website. Replace it with the copy below.

**Where to edit:** GBP dashboard > Edit profile > About > Business description.

**Paste this into the long description field (about 670 characters, well under the 750 limit):**

> Tech Horizon Labs is a Queensland fractional AI ops consultancy based in Noosa Heads. We help small and mid-sized Australian businesses move past ChatGPT experiments and deploy AI systems that actually run inside their workflows. Our Horizon Method has four stages. We Map your real workflows, Blueprint the right system, Deploy it on private Australian infrastructure, and Retain the knowledge inside your team through training. We work on-site across the Sunshine Coast, Brisbane, and the Gold Coast, and remotely across Queensland. Privacy Act aligned, Australian-hosted, fixed-price builds. Book a free 30-minute discovery call at techhorizonlabs.com.

**Paste this into the "From the business" short description field (about 230 characters):**

> Queensland fractional AI ops consultancy. We help Australian SMBs deploy AI inside real workflows using the Horizon Method: Map, Blueprint, Deploy, Retain. Privacy Act aligned, Australian-hosted, fixed-price builds. Free 30-minute discovery call.

### 2.2 Fix the Categories

The current primary category "Computer support and services" is wrong. It tells Google we fix laptops, not deploy AI systems. Replace it with the list below.

**Where to edit:** GBP dashboard > Edit profile > About > Business category.

| Slot | Category | Why |
|------|----------|-----|
| **Primary** | Business Management Consultant | Highest match for fractional ops consulting and the broadest discovery surface for SMB owners searching for help. |
| Secondary 1 | Software Company | Captures custom AI system builds, internal tooling, and data infrastructure work. |
| Secondary 2 | Educational Consultant | Captures the Academy, training workshops, and AI literacy programs. |
| Secondary 3 | Marketing Consultant | Captures content automation, SEO automation, and customer-facing AI work. |
| Secondary 4 | Computer Consultant | Keeps a small slice of generic IT-adjacent search traffic without making it primary. |

Remove "Computer support and services" entirely. It pulls the wrong audience and dilutes the relevance signal.

### 2.3 Fix the Service Areas

The current setting "Sunshine Coast and nearby areas" is too narrow. The website has dedicated location pages for Brisbane, Gold Coast, and Queensland, and remote engagements happen state-wide. Match GBP to the website.

**Where to edit:** GBP dashboard > Edit profile > Location > Service area.

**Remove:** "Sunshine Coast and nearby areas".

**Add each of the following as separate service area entries:**

- Noosa Heads, QLD
- Noosaville, QLD
- Sunshine Coast, QLD
- Maroochydore, QLD
- Mooloolaba, QLD
- Caloundra, QLD
- Nambour, QLD
- Gympie, QLD
- Brisbane, QLD
- Gold Coast, QLD
- Queensland, Australia

GBP allows up to 20 service areas. Adding the major suburbs explicitly helps the listing surface in suburb-level "near me" searches.

### 2.4 Fix the Hours

The current setting "Open 24 hours" looks wrong to Google for a consulting business and to humans browsing the listing. Google quietly down-weights small businesses that claim 24/7 availability when they are not a 24/7 service. Switch to standard business hours.

**Where to edit:** GBP dashboard > Edit profile > Hours.

**Set the regular weekly hours to:**

- Monday: 8:30 am – 5:30 pm
- Tuesday: 8:30 am – 5:30 pm
- Wednesday: 8:30 am – 5:30 pm
- Thursday: 8:30 am – 5:30 pm
- Friday: 8:30 am – 5:30 pm
- Saturday: Closed
- Sunday: Closed

**Add this line into the description of the GBP "More hours" or notes field if available:** "Off-hours discovery calls available by appointment via the booking link."

Also set Christmas Day, Boxing Day, New Year's Day, Australia Day, Good Friday, Easter Monday, Anzac Day, Queen's Birthday (QLD), Labour Day (QLD), and Christmas Eve (half day) as special hours each year. GBP prompts for these automatically about a month in advance.

### 2.5 Services Catalogue

The Services section on GBP is a separate field from the description and shows up as a structured list inside Maps and Search. Add each of the items below.

**Where to edit:** GBP dashboard > Edit profile > Services > Add service.

For each service, fill the Name field with the bold heading, the Description field with the sentence after it, and leave Price as "Price on request" unless otherwise noted.

1. **AI Readiness Assessment** — Free 30-minute pre-discovery call to map where AI fits in your business and which Horizon stage you are in. *Price: Free.*
2. **Horizon Method Implementation** — End-to-end AI system build using our four-stage Map, Blueprint, Deploy, Retain process. Fixed-price 4 to 12 week sprint.
3. **Workflow Automation Build** — Custom automation that connects your existing tools, removes manual handoffs, and runs on Australian infrastructure.
4. **Private AI System Deployment** — Privacy Act aligned AI deployments using your own data, hosted on Australian or self-managed infrastructure.
5. **AI Training Workshops** — Half-day, full-day, and multi-day workshops for staff and leadership. Sunshine Coast in-person and remote across Queensland.
6. **AI Academy Membership** — Ongoing AI literacy and tools program with monthly office hours, prompt library, and workflow templates.
7. **Fractional AI Operations** — Embedded part-time AI lead for SMBs that are not ready for a full-time hire. Monthly retainer.
8. **AI Governance and Policy** — Internal AI usage policy, vendor review, Privacy Act review, and staff acceptable use guidance.

### 2.6 GBP Posts (first two months)

GBP posts surface inside the local pack, the knowledge panel, and Maps. Schedule one per week for the next eight weeks. Use the Posts tab in the GBP dashboard.

**Post 1 — What's New (week 1):**
- Title: Queensland AI ops, no Silicon Valley fluff
- Body: We help Australian SMBs deploy AI that actually runs inside the workflows you already have. Not generic chatbots. Real systems on private infrastructure.
- CTA: Book — free 30-minute discovery call.
- Image: Logo on warm cream background.

**Post 2 — Offer (week 2):**
- Title: Free AI Readiness Assessment
- Body: Ten questions, one minute, instant result. Find out which of the four AI maturity stages your business is in. No email required.
- CTA: Sign up — start the assessment.
- Image: Screenshot of the assessment results screen.

**Post 3 — What's New (week 3):**
- Title: The Horizon Method explained
- Body: Map your workflows. Blueprint the right system. Deploy on Australian infrastructure. Retain the knowledge inside your team. Four stages, fixed price, no scope creep.
- CTA: Learn more — the Horizon Method.
- Image: Simple four-step diagram with the four stage names.

**Post 4 — Event (week 4):**
- Title: AI workshop, Sunshine Coast
- Body: Half-day in-person AI workshop for local business owners. Hands-on with Claude and ChatGPT inside your real workflows. Limited seats.
- CTA: Sign up — see workshop dates.
- Image: Photo from a previous workshop, or a clean photo of the venue.

**Post 5 — Offer (week 5):**
- Title: Free 2026 AI Readiness Report
- Body: Our State of AI Readiness report for Australian SMBs. Covers what is actually working, what is not, and where the money is going. PDF, no fluff.
- CTA: Download — get the report.
- Image: Cover image of the PDF report.

**Post 6 — What's New (week 6):**
- Title: AI for Australian law firms
- Body: Privilege-aware AI for precedent search, document drafting, and client intake automation. Privacy Act aligned. Built in four to six weeks.
- CTA: Learn more — AI for law firms.
- Image: Clean header image with a legal-themed icon.

**Post 7 — What's New (week 7):**
- Title: Why Brisbane SMBs are calling us
- Body: Manufacturing, professional services, legal, construction. Brisbane SMBs are deploying private AI systems in four-week fixed-price sprints. Here is how.
- CTA: Learn more — Brisbane AI consulting.
- Image: Brisbane skyline or a generic Queensland-themed photo.

**Post 8 — Offer (week 8):**
- Title: Book a free 30-minute discovery call
- Body: No sales pitch. We map where AI fits in your business and tell you honestly whether it is worth doing now or later.
- CTA: Book — pick a time.
- Image: Photo of Huxley, or a clean call-themed graphic.

After the first two months, post one to two updates per month. Mix offer, event, and what's-new posts.

### 2.7 Q&A Seeding

Seed the Questions and Answers section yourself before customers start asking. Post each question from a personal Google account, then answer it from the business account. This is fully within Google's guidelines and is the standard local SEO practice.

**Where to edit:** Open the public GBP listing in Google Search > scroll to "Questions and answers" > Ask a question.

1. **Q:** How much does AI implementation cost in Australia?
   **A:** Most of our SMB engagements run between AUD 8,000 and AUD 50,000 depending on scope. We work fixed price, not hourly, so the number is locked in before we start. Free 30-minute discovery call to scope your specific project.

2. **Q:** Where is Tech Horizon Labs based?
   **A:** Noosa Heads on the Sunshine Coast. We work on-site across the Sunshine Coast, Brisbane, and Gold Coast, and remotely across all of Queensland.

3. **Q:** What does an AI implementation actually include?
   **A:** Workflow mapping, system design, build, deployment on private Australian infrastructure, integration with your existing tools, staff training, and a 30-day post-launch support window. Everything in one fixed price.

4. **Q:** How long does an AI project take?
   **A:** Most builds run four to twelve weeks from kickoff to go-live. The first week is workflow mapping. Build and deployment take two to ten weeks depending on scope. Training is the final week.

5. **Q:** Who runs Tech Horizon Labs?
   **A:** Huxley Peckham. Background in AI implementation for Australian SMBs. Based in Noosa Heads. Available for direct contact, no account managers in between.

6. **Q:** Do you work with Brisbane businesses?
   **A:** Yes. We have a dedicated Brisbane practice covering manufacturing, professional services, legal, construction, and healthcare. On-site discovery in Brisbane, remote build, and on-site training. See techhorizonlabs.com/locations/brisbane.

7. **Q:** What industries do you specialise in?
   **A:** Legal, construction, healthcare, retail, manufacturing, accounting, and professional services. We have published case studies and industry pages for each. Most of our work is with services businesses between 5 and 200 staff.

8. **Q:** Do you offer AI training?
   **A:** Yes. Half-day and full-day workshops on the Sunshine Coast, multi-day intensives, remote sessions across Queensland, and an ongoing AI Academy membership for businesses that want continual upskilling.

9. **Q:** What makes you different from a generic AI agency?
   **A:** We build infrastructure before automation. Most agencies sell chatbots and call it AI. We map your real workflows first, deploy private systems on Australian infrastructure, and train your team to keep running them after we leave. Fixed price, Privacy Act aligned, no lock-in.

10. **Q:** How do I book a call?
    **A:** Free 30-minute pre-discovery call at app.klipycrm.com/book/pre-discovery/free-pre-discovery, or visit techhorizonlabs.com and click "Book a call". No sales pitch on the first call.

### 2.8 Photo Upload Checklist

GBP listings with 10 or more recent photos rank measurably better in the local pack than listings with the logo only. Upload the following set in the first session, then add 2 to 3 fresh photos per quarter.

**Where to edit:** GBP dashboard > Photos > Add photos.

Required first batch:

1. **Logo** — square 1080x1080 PNG, transparent background. Use `attached_assets/T_(1)_1775353639173.png` as the source.
2. **Cover photo** — wide 16:9 photo, ideally a clean Sunshine Coast or Noosa landscape with a subtle brand colour overlay.
3. **Headshot of Huxley** — clean professional photo, neutral background, looking at camera.
4. **Second photo of Huxley** — working at a desk or presenting, mid-action, more candid.
5. **Third photo of Huxley** — at a workshop or with a client, ideally with people in frame.
6. **Workshop photo 1** — wide shot of a training session in progress.
7. **Workshop photo 2** — close-up of attendees working with laptops or whiteboarding.
8. **Co-working space exterior** — only if you have a regular workspace clients can visit. Otherwise skip.
9. **Co-working space interior** — same caveat as above.
10. **Dashboard screenshot 1** — anonymised screenshot of an AI dashboard or automation workflow you have built.
11. **Dashboard screenshot 2** — different anonymised system, ideally from a different industry.
12. **Before-and-after diagram** — simple workflow diagram showing manual process versus AI-augmented process.
13. **Speaking engagement photo** — Huxley speaking at a Chamber of Commerce event or similar.
14. **Team or partner photo** — even if it is just Huxley with a contractor or collaborator. Listings with a "team" feel rank better than solo-operator listings.
15. **Award, certification, or media mention** — screenshot or photo of any third-party recognition.

**Important:** Do not upload AI-generated or stock images. Google can detect both, and AI-generated images in particular are starting to trigger demotion in local results. Use real photography only. iPhone shots are fine.

### 2.9 Track Which GBP Changes Actually Moved Rankings

After applying the GBP cleanup (sections 2.1 to 2.8), measure the impact so the next quarter is informed by data, not guesswork. Without a baseline, there is no way to know whether the category fix, the photos, or the posts did the work.

**Setup (once, before applying any GBP changes):**

1. Download the tracker template: `/resources/gbp-ranking-tracker.csv`.
2. Open Google Sheets, then File > Import > Upload, and upload the CSV. Choose "Replace spreadsheet" and keep "Detect automatically" for the separator.
3. The 12 priority local keywords are pre-filled. They are the subset of section 6.1 that has the strongest local-pack intent (queensland, sunshine coast, brisbane, noosa, gold coast plus the national commercial terms).
4. Fill in the **Baseline (pre-cleanup)** and **Baseline date** columns BEFORE making any GBP edits. Use the snapshot capture method below.
5. As each GBP change from sections 2.1 to 2.8 is applied, record the date in the **GBP Changes Log** rows of the sheet.

**GBP Snapshot Capture Checklist (do this for the baseline, then every Friday for 12 weeks):**

For each of the 12 keywords, capture the current local pack position using one of the two free methods below. Pick one method and stick with it for all 12 weeks so the data is comparable.

*Option A — Local Falcon free tier (recommended, ~5 minutes per snapshot):*

1. Sign up at [localfalcon.com](https://www.localfalcon.com) (free tier allows a limited number of scans per month, enough for a weekly snapshot of the 12 priority keywords).
2. Add the GBP listing as a location.
3. Run a scan for each keyword with a 3x3 grid centred on the Sunshine Coast (Maroochydore is a good central pin).
4. Record the **average pack position** the scan reports for that keyword in the matching Wk column.
5. If the listing does not appear in any of the 9 grid points, leave the cell blank (counts as "not in top 20").

*Option B — Manual incognito searches (free, ~15 minutes per snapshot):*

1. Open Chrome in an incognito window. Sign out of any Google account.
2. Set the search location to the Sunshine Coast: search for anything, click "Tools" under the search bar, then change "Any location" to a Sunshine Coast suburb (or use a free VPN/location tool to set the Maroochydore postcode 4558).
3. Search each of the 12 keywords one at a time.
4. For each search, scroll until the listing appears in the local pack (the map block) or in the organic results. Record the position:
   - 1, 2, or 3 if the listing is in the local pack (with "1" being the top map result)
   - 4 to 10 if it appears only in organic page 1 below the pack
   - 11 to 20 if it appears on page 2
   - Leave blank if it does not appear in the top 20
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

---

### 2.10 Quarterly Maintenance Checklist

Block 30 minutes in the calendar every 90 days for the following.

- Add 2 to 3 new photos. Rotate older photos to the back of the gallery.
- Confirm the description still matches the latest website positioning. Update it if any major service or location changes.
- Confirm hours are correct. Set special hours for upcoming Queensland public holidays.
- Post 1 to 2 updates per month minimum. Posts older than 6 months stop appearing in search.
- Review and respond to every review within 48 hours. Thank positive reviewers by name. Respond to negative reviews calmly with a path to resolution.
- Open the Insights tab. Note the top 5 search queries that surfaced the listing this quarter. Use those queries to inform new posts and Q&A entries.
- Review the Services list. Add any new offerings, remove anything no longer sold.
- Confirm the booking link still works. GBP occasionally drops the link if the destination URL changes.

---

## 3. Bing Webmaster Tools — Medium Priority

### 3.1 Set Up Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Sign in with a Microsoft account
3. Click "Add your site"
4. Enter `https://techhorizonlabs.com`
5. Import from GSC is the fastest option if you have already set up GSC:
   - Click "Import from GSC"
   - Authorise the connection
   - Your sitemap and verified site will be imported automatically
6. If not using GSC import, verify via DNS (add a CNAME record to Cloudflare)

### 3.2 Submit the Sitemap

1. Go to **Sitemaps** in the left sidebar
2. Click "Submit sitemap"
3. Enter `https://techhorizonlabs.com/sitemap.xml`
4. Click **Submit**

### 3.3 Submit Key URLs

1. Go to **URL Submission** in the left sidebar
2. Submit the same priority URLs listed in section 1.3 above
3. Bing allows bulk URL submission (up to 10,000 per day), so you can submit them all at once

---

## 4. Plausible Analytics — Conversion Tracking

Plausible is already installed across all 34 pages. These steps add conversion goal tracking so you can measure which pages drive actual business actions.

### 4.1 Set Up Goals in Plausible

1. Log in to your Plausible dashboard
2. Go to **Site Settings** > **Goals**
3. Add the following custom event goals (you will need to add the corresponding JavaScript later, or ask your developer):

| Goal Name | What It Tracks |
|-----------|----------------|
| `Assessment Started` | Someone begins the AI Readiness Assessment |
| `Assessment Completed` | Someone finishes the Assessment |
| `Scorecard Started` | Someone begins the Scorecard |
| `Scorecard Email Submitted` | Someone submits their email on the Scorecard |
| `Report Downloaded` | Someone downloads the AI Readiness Report |
| `Contact Form Submitted` | Someone submits the contact form |
| `Newsletter Signup` | Someone signs up for the newsletter |
| `Booking Link Clicked` | Someone clicks a "Book a call" CTA |

4. For now, you can set up **pageview goals** without code changes:
   - Add a pageview goal for `/assessment` (tracks visits to the assessment)
   - Add a pageview goal for `/scorecard` (tracks visits to the scorecard)
   - Add a pageview goal for `/report` (tracks visits to the report page)
   - Add a pageview goal for `/contact` (tracks visits to the contact page)

### 4.2 Monthly Analytics Review

On the first Monday of each month (combine with GSC review):

1. Check which pages get the most traffic
2. Check which pages have the highest bounce rate
3. Check traffic sources (direct, search, referral)
4. Check which insights articles drive the most traffic
5. Note any pages with growing or declining traffic trends

---

## 5. Backlink Opportunities — Medium Priority

Backlinks from relevant Australian sites will significantly improve search rankings. These are opportunities specific to Tech Horizon Labs.

### 5.1 Business Directories (Do First)

Submit to these Australian business directories. Most are free.

| Directory | URL | Priority |
|-----------|-----|----------|
| GoodFirms | goodfirms.co (already listed) | Done |
| Clutch.co | clutch.co | High |
| True Local | truelocal.com.au | High |
| Yellow Pages AU | yellowpages.com.au | High |
| Hotfrog | hotfrog.com.au | Medium |
| StartLocal | startlocal.com.au | Medium |
| Business.com.au | business.com.au | Medium |
| Australian Business Directory | australianbusinessdirectory.com.au | Medium |
| Sunshine Coast Business Directory | sunshinecoastbusinessdirectory.com.au | High |
| Noosa Chamber of Commerce | noosachamber.com.au | High |
| Brisbane Business Hub | brisbanebusinesshub.com.au | Medium |

For each directory:
1. Create a listing with consistent NAP (Name, Address, Phone):
   - **Name:** Tech Horizon Labs
   - **Phone:** +61 478 919 419
   - **Email:** hello@techhorizonlabs.com
   - **Website:** https://techhorizonlabs.com
   - **ABN:** 80 976 285 425
2. Use the same business description as the GBP profile
3. Select relevant categories (AI consulting, IT consulting, business automation)

### 5.2 Industry and Content Backlinks

These take more effort but are higher value.

**Guest posting opportunities:**
- SmartCompany (smartcompany.com.au) — pitch an article about AI adoption in Australian SMBs
- Kochie's Business Builders (kochiesbusinessbuilders.com.au) — pitch AI tips for small business
- Dynamic Business (dynamicbusiness.com) — pitch on AI readiness stages
- Anthill Magazine (anthillonline.com) — pitch on AI implementation costs

**Pitch template:**
> Subject: Guest article pitch — AI readiness for Australian SMBs
>
> Hi [Editor name],
>
> I run Tech Horizon Labs, an AI consulting firm based in Queensland. I work with Australian SMBs deploying AI systems and have some insights from our 2026 AI Readiness survey that I think would interest your readers.
>
> Possible topics:
> - Why 46% of Australian SMBs are stuck at the "ChatGPT Plateau" stage
> - The real cost of AI implementation for Australian businesses ($8K-$50K)
> - The 5 AI mistakes Australian businesses keep making
>
> Happy to write 800-1,200 words with original data. No sales pitch — just practical insights.
>
> Cheers,
> Huxley Peckham
> Tech Horizon Labs
> techhorizonlabs.com

**Professional associations:**
- Join the AI Group (theaigroup.com.au) if applicable
- Queensland AI Hub or similar state-level AI organisations
- Australian Information Industry Association (AIIA)
- Get listed in their member directories

**Local business networks:**
- Noosa Chamber of Commerce — get a member listing with backlink
- Sunshine Coast Business Council
- Brisbane Chamber of Commerce
- Attend local business events and get listed on event pages

### 5.3 Monthly Backlink Monitoring

1. In GSC, go to **Links** in the left sidebar
2. Check "Top linking sites" — note any new domains linking to you
3. Check "Top linked pages" — confirm your most important pages are getting links
4. If any spammy sites are linking to you, consider using the GSC Disavow Tool (but only if the links are clearly harmful)

---

## 6. Keyword Monitoring Schedule

### 6.1 Primary Keywords to Track

Check rankings for these terms monthly in GSC (Performance > Search results > Queries):

**High priority (commercial intent):**
- "ai consultant queensland"
- "ai consultant sunshine coast"
- "ai consultant brisbane"
- "ai implementation australia"
- "ai consulting australia"
- "ai for small business australia"
- "ai systems for business"

**Medium priority (informational/long-tail):**
- "ai readiness assessment"
- "ai readiness stages"
- "how much does ai cost australia"
- "ai for law firms australia"
- "ai training sunshine coast"
- "claude vs chatgpt 2026"
- "ai governance australia"
- "ai impact by industry"

**Local keywords:**
- "ai consultant noosa"
- "ai consultant gold coast"
- "ai training brisbane"
- "ai workshop queensland"

### 6.2 Monthly Keyword Tracking Process

1. Go to GSC > Performance > Search results
2. Set date to "Last 28 days"
3. Click "Compare" and select "Previous period"
4. For each keyword group above, note:
   - Current position (average)
   - Impressions
   - Clicks
   - CTR
   - Change from previous period
5. Record these in a simple spreadsheet (even Google Sheets is fine)
6. Look for:
   - Keywords moving from page 2 to page 1 (positions 11-20 dropping to 1-10) — these are close to breakthrough
   - Keywords with high impressions but low CTR — these may need better meta titles/descriptions
   - New keywords appearing that you did not target — these reveal what Google thinks your site is about

---

## 7. Quick Reference — What to Do When

### Weekly (10 minutes)
- Check GSC for any new crawl errors
- Respond to any GBP reviews
- During the 12-week post-cleanup window: capture the GBP ranking snapshot (section 2.9)

### Monthly (30 minutes)
- GSC performance review (section 1.6)
- Plausible analytics review (section 4.2)
- Keyword ranking check (section 6.2)
- Backlink check in GSC (section 5.3)

### Quarterly (1 hour)
- Update GBP posts and run the GBP quarterly maintenance checklist (section 2.10)
- Capture the weekly GBP ranking snapshot (section 2.9) — also do this every Friday, not just quarterly
- Review and refresh meta descriptions for underperforming pages
- Check if any new pages need sitemap/indexing updates
- Evaluate backlink outreach results and plan next round

### When New Pages Are Added
- Request indexing in GSC (section 1.3)
- Submit URL to Bing Webmaster Tools (section 3.3)
- Update sitemap URL count reference if tracking it
- Add internal links from existing relevant pages

---

## Notes

- **GSC daily limits:** Google limits URL inspection/indexing requests. If you hit the limit, continue the next day. No penalty for hitting the limit.
- **Indexing timeline:** New pages typically appear in Google within 2-7 days after requesting indexing. Some pages may take longer.
- **GBP verification:** Postcard verification can take 5-14 days. Phone or email verification is faster when available.
- **Backlinks take time:** Do not expect immediate ranking improvements from backlinks. The effect builds over 2-6 months.
- **NAP consistency:** Always use exactly the same business name, address, and phone number across every directory and platform. Inconsistencies confuse Google.
