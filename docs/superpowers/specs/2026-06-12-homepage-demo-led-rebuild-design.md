# Homepage demo-led rebuild — design

**Date:** 2026-06-12
**Status:** Approved in brainstorm; pending spec review
**Owner:** Huxley / Tech Horizon Labs

## Problem

The June 2026 homepage rebuild (commit `7d9660b`) tightened the page but it still runs ~1,750 visible words across 13 sections, the run-log hero is passive, and the page doesn't visibly differentiate from the outbound-agency market (ColdIQ et al.) or demonstrate the governance rails that are THL's actual edge.

## Decisions made (brainstorm)

| Question | Decision |
|---|---|
| Primary audience | Genuinely mixed — homepage routes; vertical pages convert |
| Killer demo | Reactive replay: chips drive the run-log per vertical |
| Cut depth | Ruthless: ~7 sections, ~800 visible words |
| Video testimonials | Distributed by audience to vertical pages; founder video on /about + /contact; /work keeps full set; homepage keeps one text quote |
| Architecture | A: Demo-led — chips move into the hero as the demo's selector |
| Old "LIVE report" window | Reinvented as the panel's second face ("anatomy"), reusing orphaned `.report-window` CSS |

## 1 · Hero = the demo

- Chip row (10 verticals) moves into the hero under the h1/subline, replacing the separate "Who we work with" section.
- Clicking a chip replays the run-log panel with that vertical's workflow; the panel footer CTA swaps to that vertical's playbook link ("See the legal playbook →").
- Default replay on load: Theo GTM (THL's own pipeline).
- Chips remain real `<a>` links to vertical pages. JS intercepts plain left-clicks to drive the demo; modified clicks (cmd/ctrl/middle) navigate. The footer CTA carries navigation duty after a replay.
- ICP rotator in the h1 is unchanged.
- Reduced motion: no replay animation; selected vertical's script renders complete. No JS: default script fully visible (current behaviour).

## 2 · Two-face panel (report window reinvented)

- **Face 1 — log:** the replay, scripted per vertical.
- **Face 2 — anatomy:** "what's behind this run →" toggle flips the panel to a condensed view of the run architecture: *your systems → agent fleet → human gate → what ships → owned by you*, plus the five guarantees in one-line form (drafts-only · read-only CRM · guards before drafting · freshness-stamped signals · append-only log).
- Reuses the orphaned `.report-window` / `.report-badge` CSS from the removed homepage section.
- Anatomy face links to `/infrastructure#how-a-theo-run-works` (canonical prose; this anchor id must be added to the existing "How a Theo run works" h2, which currently has none).
- Both faces are static HTML in the DOM (crawlable; included in `index.md`).

## 3 · Replay scripts — one grammar, ten costumes

Grammar (fixed, 6 lines): **signal → verify → guard → draft → human → log**.

Sourcing rule: scripts come from shipped work only; where a vertical has no shipped engagement, the script shows the playbook pattern and the panel header labels it "the playbook" rather than implying a live client. No invented client work.

| Vertical | Script source | Basis |
|---|---|---|
| Growing businesses (default until selection) | Theo GTM | Production (3-of-50 campaign) |
| VCs & PE | Diligence/deal-flow playbook | Playbook |
| Wealth management | Compliance-aware advisor playbook | Playbook |
| SaaS scale-ups | Support/GTM ops playbook | Playbook |
| Talent agencies | Candidate match + deal lifecycle | Shipped (live engagement, /work) |
| Legal | Precedent/intake playbook | Playbook |
| Construction & trades | Quote assembly | Shipped (builder, 60% faster quotes) |
| Healthcare | Intake/notes playbook (on-device) | Playbook |
| Manufacturing | Sensor → maintenance ticket | Shipped (manufacturer, $50K+ savings) |
| Engineering & advisory | Proposal/RFT assembly | Shipped pattern (firm-brain engagement) |

All 10 scripts are static HTML (one visible, nine hidden via `hidden`/CSS state). Hidden scripts are genuine UI state (same pattern as tabs) and flow into the agent markdown.

## 4 · Page architecture — 7 sections, ~800 words

1. **Hero** — h1 (rotator) + 2-line subline + vertical chips + two-face panel + trust row
2. **One method** — SVG diagram + mobile fallback (as built), plus one line of the revenue-first narrative: "GTM is the first install because it pays for itself — then funds the systems beneath it."
3. **Proof band** — 4 metric cards + one strongest text quote, merged into a single band
4. **Security badge row** — unchanged, links /security and /tools
5. **CTA band** — assessment primary, report secondary, book-a-call link; absorbs "Two ways to work with us" copy in one sentence
6. **Industries & locations chip grid** — unchanged (SEO)
7. Footer

### Relocation map (nothing dies)

| Leaving homepage | New home | Notes |
|---|---|---|
| FAQ section ("People also ask") | `/contact` | **FAQPage JSON-LD moves with it** — schema must match visible content |
| Blog teasers | gone | nav + footer already link /insights |
| Tools pill wall | gone | security section + footer link /tools |
| "Two ways to work with us" | merged into CTA band | one sentence + link to /infrastructure deployment models |
| Testimonial grid | vertical/industry pages + /work | see §5 |

## 5 · Video testimonials & GEO

**Rule:** every placed video gets its **full transcript on-page** + `VideoObject` schema (and `Review` schema where the content is a review). AI engines don't watch video; they read transcripts and schema. Humans watch video where trust decisions happen.

**Current inventory and placement** (only 3 videos exist; none match the 10 verticals — be honest about that):

| Video | Speaker / flavour | Placement |
|---|---|---|
| `2mO4qxvQTx4` | Joanne Hill, KPPQLD — training, "where to start" | `/training/sunshine-coast` (moves off homepage) |
| `M8WoVjZ3niY` | Participant, FireUP Coaching — "orchestration I hadn't seen" | `/academy` |
| `k_FAP3jF7Ls` | Tour Operator, Tourism Noosa — "saved me a day's work" | `/locations/sunshine-coast` |
| Founder video (to be recorded) | Huxley — who you'd be working with | `/about` + `/contact` |

- `/work` additionally embeds all client videos (the complete set).
- Vertical/industry pages carry text quotes only until a matched video exists; as new videos are recorded they slot in under the same rule.
- Homepage keeps exactly one text quote in the proof band — proposed: the compliance/clarity quote ("Real clarity on the options. Compliance, data residency, extensibility…"), which lands across the mixed audience.

## 6 · Conversion flow (existing assets only)

**See it → see it for your world → locate yourself → talk.**

Homepage demo → chip/playbook CTA → vertical page (matched video proof) → assessment (ungated results) → book-a-call; report = nurture asset for not-ready visitors. Implementation wires edges only: each replay ends in its playbook link; vertical pages lead follow-up CTAs with the assessment; assessment results lead with booking.

## 7 · ColdIQ differentiation checklist (hard requirements)

ColdIQ (coldiq.com, June 2026): "Tomorrow's GTM Systems Built for You Today" / "We build B2B Revenue Engines that sell for you." Agency retainers, 3-month minimum, proof = client logos + pipeline dollars ($7.83M etc.), targets >$100K/mo B2B, expertise framing = Clay + deliverability, "GTM Flywheel" = outbound/ads/content integration.

The homepage must:

1. **Never read as an agency.** No "we run your campaigns" language. The offer is installed, owned infrastructure. One explicit contrast line on the homepage: *"Agencies rent you an engine and keep it. We install one you own."* (Full comparison table stays on /infrastructure.)
2. **Not compete on pipeline dollars or logo walls.** THL's proof is precision-honesty: 3-of-50, 100% verified before drafting, real sender identity, append-only log. Small numbers, stated plainly, beat big numbers visitors discount.
3. **Show the rails, don't claim them.** The run-log's `human · approved — a person presses send` beat and the anatomy face are the demo of governance. ColdIQ cannot show this; a rented SaaS stack has no inspectable rails. This is the killer-demo thesis.
4. **Flywheel inversion.** ColdIQ's flywheel integrates marketing channels. THL's flywheel funds the business: GTM install pays for itself, then funds data/service/scale systems. One line on the homepage (§4.2), full narrative on /infrastructure.
5. **Audience honesty.** ColdIQ filters for >$100K/mo. THL is AU-grounded (Spam Act 2003 compliance line stays on /infrastructure), vertical-fluent, on-site capable — the chips and locations grid carry this without copy bloat.
6. **Frontier-native line stays visible** somewhere on the page (method section or anatomy face): the rails are model-agnostic; the fleet improves as models do — vs 2020-era stack wiring.

## 8 · SEO/GEO guarantees

- h1/rotator, title, meta description, Organization/LocalBusiness/Service JSON-LD: unchanged.
- FAQPage JSON-LD relocates with the FAQ content to /contact — never orphaned on a page that doesn't show it.
- All 10 replay scripts + anatomy face crawlable in DOM and present in `index.md` (converter includes hidden HTML; verified — SVG is the only stripped element).
- Every cut section's destination remains linked from homepage body or persistent nav/footer.
- Homepage visible word count target ~800, denser in entities (verticals, workflows, place names) than current padding.
- `llms-full.txt` and `.md` siblings regenerate at build; no pipeline changes needed.

## 9 · Verification

- Existing 113-test suite stays green; add converter-level expectations that `index.md` contains replay-script and anatomy text.
- Served-page checks: chips render as links; default script visible without JS; FAQPage schema absent from `/` and present on `/contact`.
- Browser QA (Playwright, after plugin reload): chip click swaps replay + CTA; modified-click navigates; anatomy toggle; reduced-motion path; 375px layout.
- Word-count check: visible homepage text ≤ ~900 words.

## Out of scope

- Recording/producing the founder video (placement is specced; the asset is Huxley's).
- Building new vertical-page FAQs or new case studies.
- Any change to /assessment, /scorecard mechanics.
- The live-demo ("enter your URL") concept — explicitly rejected in brainstorm.
