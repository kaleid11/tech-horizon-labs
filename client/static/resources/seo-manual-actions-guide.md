# SEO Manual Actions Guide — Tech Horizon Labs

**Last updated:** April 2026
**For:** Huxley Peckham (site owner)
**Site:** techhorizonlabs.com

This guide covers every manual SEO action that cannot be done in code. Work through the sections in order. The priority sections should be completed first as they have the most impact on search visibility.

---

## Timeline Overview

| When | What | Platform | Priority |
|------|------|----------|----------|
| **Week 1** | Submit sitemap to Google and Bing | GSC, Bing WMT | High |
| **Week 1** | Request indexing of all new/updated pages | GSC | High |
| **Week 1** | Set up Google Business Profile | GBP | High |
| **Week 1** | Remove cached old WordPress URLs | GSC | High |
| **Week 2** | Submit sitemap to Bing | Bing WMT | Medium |
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
4. Verify using one of these methods (DNS is recommended):
   - **DNS verification** (recommended): Add the TXT record Google provides to your Cloudflare DNS settings
   - **HTML file**: Download the verification file and place it in `client/static/` (then add a route in code)
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

### 2.1 Create or Claim Your Profile

1. Go to [business.google.com](https://business.google.com)
2. Sign in with the Google account you want to manage the business from
3. Click "Add your business to Google"
4. Enter the business details:
   - **Business name:** Tech Horizon Labs
   - **Category:** "IT Consultant" (primary), then add: "Artificial Intelligence Consultant", "Business Management Consultant"
   - **Service area:** Select "Queensland, Australia" (since you serve clients remotely across the state)
   - Do NOT add a physical address unless you want the Noosa Heads address publicly listed. If you work from home, choose "service area business" instead.
5. Complete the verification process (Google will send a postcard or offer phone/email verification)

### 2.2 Complete Your Profile

Once verified, fill in every field:

1. **Business description** (750 characters max):
   > Tech Horizon Labs builds and deploys AI systems for growing Australian businesses. We map your workflows, find the bottleneck, build the fix, and train your team. Based in Noosa Heads, Queensland. Specialising in AI implementation, workflow automation, and AI training for SMBs across the Sunshine Coast, Brisbane, Gold Coast, and all of Queensland. ABN 80 976 285 425.

2. **Phone:** +61 478 919 419
3. **Website:** https://techhorizonlabs.com
4. **Booking link:** https://app.klipycrm.com/book/pre-discovery/free-pre-discovery
5. **Service areas:** Sunshine Coast, Brisbane, Gold Coast, Queensland
6. **Business hours:** Set your actual working hours
7. **Services offered:** Add each service:
   - AI Implementation Consulting
   - AI Readiness Assessment
   - Workflow Automation
   - AI Training and Workshops
   - Data Infrastructure Setup
   - AI Strategy Consulting

8. **Photos:**
   - Upload the logo (use the 1000x1000 source file from `attached_assets/`)
   - Upload a professional headshot if available
   - Upload any relevant photos of workshops, presentations, or office setup

### 2.3 Create Your First GBP Posts

Google Business Profile posts appear in local search results and help with visibility. Create one post per week for the first month.

**Post 1 — Introduction:**
> Helping Queensland businesses deploy AI that actually works. Not chatbots. Not generic tools. Custom AI systems built on your own data and infrastructure. Book a free 30-minute pre-discovery call to find out where AI fits in your business.

**Post 2 — Free Assessment:**
> How ready is your business for AI? Take our free 10-question AI Readiness Assessment and find out which of the 4 maturity stages you are in. No email required. Instant results. techhorizonlabs.com/assessment

**Post 3 — Training:**
> AI training workshops for Sunshine Coast and Queensland businesses. Learn to use Claude, ChatGPT, and automation tools in your actual workflows. In-person and remote options. techhorizonlabs.com/academy

**Post 4 — Industry focus:**
> We build private, privilege-aware AI systems for Australian law firms. Precedent search, document drafting, and client intake automation — delivered in 4 weeks. techhorizonlabs.com/industries/legal

### 2.4 Quarterly GBP Maintenance

- Update business hours if they change
- Add 1-2 new posts per month
- Respond to any reviews within 24 hours
- Update services if new offerings are added
- Check the "Insights" tab for search query data

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

### Monthly (30 minutes)
- GSC performance review (section 1.6)
- Plausible analytics review (section 4.2)
- Keyword ranking check (section 6.2)
- Backlink check in GSC (section 5.3)

### Quarterly (1 hour)
- Update GBP posts (section 2.4)
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
