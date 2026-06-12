# Demo-Led Homepage Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage a reactive demo — vertical chips drive per-vertical run-log replays in a two-face panel — at ~7 sections / ~800 visible words, with FAQ relocated to /contact and testimonials distributed by proof adjacency.

**Architecture:** Static HTML in `client/static/` served by Express with runtime critical-CSS inlining and build-time agent-markdown generation (`server/markdown.ts` strips `<svg>` but keeps hidden HTML — replay scripts therefore live as hidden DOM, not JS data). Page JS is vanilla IIFEs in `client/static/main.js`, loaded as `/main.min.js` (must be regenerated after every main.js edit).

**Tech Stack:** Vanilla JS (ES5-style IIFEs), vitest, esbuild, Express 5. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-06-12-homepage-demo-led-rebuild-design.md`

**Blocked on user (does not block any task below):** full video transcripts (tasks use verified on-page quotes as excerpts until supplied); founder video recording; Replit republish at the end.

---

## File map

| File | Action | Responsibility |
|---|---|---|
| `client/static/index.html` | Modify | Hero restructure, 10 replay scripts, anatomy face, section cuts, proof quote, CTA copy |
| `client/static/contact.html` | Modify | Receives FAQ section + FAQPage JSON-LD |
| `client/static/main.js` | Modify | Replace `HERO RUN-LOG REPLAY` IIFE with demo controller |
| `client/static/main.min.js` | Regenerate | esbuild minify of main.js |
| `client/static/styles.css` | Modify | Flip button, runlog CTA, chip-active, anatomy face, proof quote CSS |
| `client/static/critical.css` | Modify | Above-the-fold: chips-in-hero + flip button + label span |
| `client/static/infrastructure.html` | Modify | Add `id="how-a-theo-run-works"` anchor |
| `client/static/industries/construction.html` | Modify | KPP video + excerpt + VideoObject schema |
| `client/static/training/sunshine-coast.html` | Modify | KPP video + excerpt + schema |
| `client/static/academy.html` | Modify | FireUP video + excerpt + schema |
| `client/static/about.html` | Modify | FireUP text quote |
| `client/static/locations/sunshine-coast.html` | Modify | Tourism Noosa video + excerpt + schema |
| `client/static/work.html` | Modify | All three videos + schema |
| `client/static/for/*.html`, `client/static/industries/*.html` | Sweep | Ensure ≥1 `/assessment` link each |
| `tests/homepage.test.ts` | Create | Markup + markdown + relocation assertions |

---

### Task 1: Homepage test scaffold + ten replay scripts

**Files:**
- Create: `tests/homepage.test.ts`
- Modify: `client/static/index.html` (the `hero-runlog` aside, currently ~lines 277–287)

- [ ] **Step 1: Write the failing tests**

Create `tests/homepage.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { htmlToMarkdown, extractTitle } from "../server/markdown";

const indexHtml = readFileSync("client/static/index.html", "utf-8");
const indexMd = htmlToMarkdown(indexHtml, extractTitle(indexHtml));

const VERTICALS = [
  "growing-businesses", "vcs-and-pe", "wealth-management", "saas-scale-ups",
  "talent-agencies", "legal", "construction", "healthcare", "manufacturing",
  "engineering-firms",
];

describe("homepage replay scripts", () => {
  it("has a runlog script block for all ten verticals", () => {
    for (const v of VERTICALS) {
      expect(indexHtml).toContain(`class="runlog-script" data-vertical="${v}"`);
    }
  });

  it("shows exactly one script by default (the rest hidden)", () => {
    const blocks = indexHtml.match(/class="runlog-script"[^>]*/g) ?? [];
    expect(blocks.length).toBe(10);
    expect(blocks.filter((b) => !b.includes("hidden")).length).toBe(1);
  });

  it("keeps replay scripts readable in agent markdown", () => {
    expect(indexMd).toContain("BOQ extracted");        // construction
    expect(indexMd).toContain("bearing wear");          // manufacturing
    expect(indexMd).toContain("precedent set pulled");  // legal
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/homepage.test.ts`
Expected: FAIL — `data-vertical="vcs-and-pe"` not found (only the old single script exists).

- [ ] **Step 3: Replace the run-log body with ten script blocks**

In `client/static/index.html`, replace the whole `<aside class="hero-runlog" …>…</aside>` with:

```html
        <aside class="hero-runlog" id="hero-runlog" aria-label="Theo agent run log — the governed pattern, replayed per industry">
          <div class="hero-runlog-head">
            <span class="hero-runlog-dot" aria-hidden="true"></span>
            <span class="hero-runlog-label">Theo &middot; run log &mdash; the pattern, replayed</span>
            <button type="button" class="runlog-flip" aria-expanded="false">what&rsquo;s behind this run &rarr;</button>
          </div>
          <div class="runlog-face runlog-face-log" data-testid="hero-runlog">

            <div class="runlog-script" data-vertical="growing-businesses" data-label="Theo &middot; run log &mdash; the pattern, replayed">
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">pricing-page revisit &middot; fresh (2h)</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">lead confirmed &middot; 3 sources</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">ICP fit &middot; proceed</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">outreach v1 &rarr; review queue</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">approved &middot; a person presses send</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; reasons recorded</span></div>
              <p class="runlog-cta"><a href="/infrastructure" class="link-arrow">See the full GTM infrastructure &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="vcs-and-pe" data-label="Theo &middot; run log &mdash; the VC &amp; PE playbook" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">data room opened &middot; new deal in flow</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">filings cross-checked &middot; 3 sources</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">mandate fit &middot; proceed</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">diligence brief v1 &rarr; partner review</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">partner approved &middot; brief circulated</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; sources cited</span></div>
              <p class="runlog-cta"><a href="/for/vcs-and-pe" class="link-arrow">See the VC &amp; PE playbook &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="wealth-management" data-label="Theo &middot; run log &mdash; the wealth playbook" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">review date due &middot; client file flagged</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">holdings reconciled &middot; registry + CRM</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">advice boundary &middot; within scope</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">review pack v1 &rarr; adviser queue</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">adviser approved &middot; pack sent</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; compliance trail complete</span></div>
              <p class="runlog-cta"><a href="/for/wealth-management" class="link-arrow">See the wealth playbook &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="saas-scale-ups" data-label="Theo &middot; run log &mdash; the SaaS playbook" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">churn-risk ping &middot; usage down 40%</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">account health confirmed &middot; 3 signals</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">playbook tier check &middot; proceed</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">save-play email v1 &rarr; CSM queue</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">CSM approved &middot; send</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; outcome tracked</span></div>
              <p class="runlog-cta"><a href="/for/saas-scale-ups" class="link-arrow">See the SaaS playbook &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="talent-agencies" data-label="Theo &middot; run log &mdash; the talent pattern, shipped" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">brief in &middot; senior role, 4 regions</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">candidate pool matched &middot; intel fresh</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">rep conflict check &middot; clear</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">shortlist + outreach &rarr; agent review</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">agent approved &middot; sent as themselves</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; deal stage updated</span></div>
              <p class="runlog-cta"><a href="/for/talent-agencies" class="link-arrow">See the live talent engagement &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="legal" data-label="Theo &middot; run log &mdash; the legal playbook" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">new matter intake &middot; commercial lease</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">precedent set pulled &middot; privilege intact</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">data residency &middot; on-prem only</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">first-pass clauses &rarr; principal review</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">principal approved &middot; file updated</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; audit trail kept</span></div>
              <p class="runlog-cta"><a href="/industries/legal" class="link-arrow">See the legal playbook &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="construction" data-label="Theo &middot; run log &mdash; the trades pattern, shipped" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">site photos + plans in (7:12am)</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">BOQ extracted &middot; rates current (Jun)</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">margin floor check &middot; pass</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">quote v1 &rarr; builder review</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">builder approved &middot; sent from the ute</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; filed to job</span></div>
              <p class="runlog-cta"><a href="/industries/construction" class="link-arrow">See the construction playbook &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="healthcare" data-label="Theo &middot; run log &mdash; the healthcare playbook" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">referral received &middot; allied health</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">patient record matched &middot; on-device</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">clinical data stays local &middot; enforced</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">intake summary &rarr; clinician review</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">clinician approved &middot; filed</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; nothing left the building</span></div>
              <p class="runlog-cta"><a href="/industries/healthcare" class="link-arrow">See the healthcare playbook &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="manufacturing" data-label="Theo &middot; run log &mdash; the manufacturing pattern, shipped" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">vibration anomaly &middot; line 3 sensor</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">pattern matched &middot; 92% bearing wear</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">severity threshold &middot; ticket tier 2</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">maintenance order &rarr; supervisor</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">supervisor approved &middot; scheduled</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; downtime avoided</span></div>
              <p class="runlog-cta"><a href="/for/manufacturing" class="link-arrow">See the manufacturing playbook &rarr;</a></p>
            </div>

            <div class="runlog-script" data-vertical="engineering-firms" data-label="Theo &middot; run log &mdash; the firm-brain pattern, shipped" hidden>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">signal</span><span class="rl-text">RFT published &middot; transport corridor</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">verify</span><span class="rl-text">past projects matched &middot; corpus search</span></div>
              <div class="runlog-line"><span class="rl-mark">&#10003;</span><span class="rl-step">guard</span><span class="rl-text">ring-fence check &middot; cleared team only</span></div>
              <div class="runlog-line"><span class="rl-mark">&#9998;</span><span class="rl-step">draft</span><span class="rl-text">tender response v1 &rarr; director review</span></div>
              <div class="runlog-line rl-human"><span class="rl-mark">&#9679;</span><span class="rl-step">human</span><span class="rl-text">director approved &middot; submitted</span></div>
              <div class="runlog-line"><span class="rl-mark">&#8635;</span><span class="rl-step">log</span><span class="rl-text">appended &middot; win/loss recorded</span></div>
              <p class="runlog-cta"><a href="/for/engineering-firms" class="link-arrow">See the engineering playbook &rarr;</a></p>
            </div>

          </div>
        </aside>
```

(The anatomy face is added in Task 4 — the flip button is inert until then; that's fine, it's progressive enhancement.)

- [ ] **Step 4: Run tests to verify the script assertions pass**

Run: `npx vitest run tests/homepage.test.ts`
Expected: PASS (all 3 tests).

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: 116+ tests pass, 0 fail.

- [ ] **Step 6: Commit**

```bash
git add tests/homepage.test.ts client/static/index.html
git commit -m "Add ten per-vertical run-log replay scripts to the hero panel"
```

---

### Task 2: Chips into the hero

**Files:**
- Modify: `client/static/index.html` (hero section + delete "Who we work with" section)
- Modify: `client/static/critical.css`, `client/static/styles.css`

- [ ] **Step 1: Move the chip grid into the hero**

In `client/static/index.html`, inside `<div class="hero-copy">`, directly after the `<p><a href="/contact" class="link-arrow">Book a free discovery call &rarr;</a></p>` line, insert:

```html
          <div class="chip-grid hero-chips" id="who-we-work-with" data-testid="vertical-chips" aria-label="Pick your world — the run log replays it">
            <a class="chip" href="/assessment" data-vertical="growing-businesses" data-testid="icp-card-growing-businesses">Growing businesses</a>
            <a class="chip" href="/for/vcs-and-pe" data-vertical="vcs-and-pe" data-testid="icp-card-vcs-and-pe">VCs &amp; private equity</a>
            <a class="chip" href="/for/wealth-management" data-vertical="wealth-management" data-testid="icp-card-wealth-management">Wealth management</a>
            <a class="chip" href="/for/saas-scale-ups" data-vertical="saas-scale-ups" data-testid="icp-card-saas-scale-ups">SaaS scale-ups</a>
            <a class="chip" href="/for/talent-agencies" data-vertical="talent-agencies" data-testid="icp-card-talent-agencies">Talent agencies</a>
            <a class="chip" href="/industries/legal" data-vertical="legal" data-testid="icp-card-legal">Legal firms</a>
            <a class="chip" href="/industries/construction" data-vertical="construction" data-testid="icp-card-construction">Construction &amp; trades</a>
            <a class="chip" href="/industries/healthcare" data-vertical="healthcare" data-testid="icp-card-healthcare">Healthcare &amp; allied health</a>
            <a class="chip" href="/for/manufacturing" data-vertical="manufacturing" data-testid="icp-card-manufacturing">Manufacturing</a>
            <a class="chip chip-accent" href="/for/engineering-firms" data-vertical="engineering-firms" data-testid="icp-card-engineering">Engineering &amp; project advisory</a>
          </div>
```

The `id="who-we-work-with"` preserves the six `/for/*` pages + infrastructure.html links to `/#who-we-work-with` — verify none break: `grep -rn "#who-we-work-with" client/static --include="*.html"` should list only links (no id definitions elsewhere).

- [ ] **Step 2: Replace the hero subline with the contrast line**

Replace:

```html
<p class="subline">We map your workflows, find the bottleneck, build the fix, and train your team to run it. AI infrastructure you own &mdash; not another platform.</p>
```

with:

```html
<p class="subline">We map your workflows, find the bottleneck, build the fix, and train your team to run it. Not an agency retainer, not another platform &mdash; infrastructure you own, with the run log to prove it.</p>
```

- [ ] **Step 3: Delete the "Who we work with" section**

Delete the whole `<section class="section container-wide fade-in" id="who-we-work-with" …>…</section>` block AND the `<div class="accent-rule container"></div>` directly after it. (The id now lives on the hero chip grid.)

- [ ] **Step 4: Add chip + hero CSS**

Append to the rebuild block in `client/static/styles.css` (after the `.hero-runlog` rules):

```css
/* Chips inside the hero — the demo's selector */
.hero-chips { margin-top: 1.25rem; gap: 0.5rem; }
.hero-chips .chip { font-size: 0.875rem; padding: 0.45rem 0.875rem; }
.hero-chips .chip.chip-active { background: var(--accent); border-color: var(--accent); color: #ffffff; }
```

Append to `client/static/critical.css` (above-the-fold mirror):

```css
.hero-chips { margin-top: 1.25rem; gap: 0.5rem; display: flex; flex-wrap: wrap; }
.hero-chips .chip { font-size: 0.875rem; padding: 0.45rem 0.875rem; display: inline-block; border: 1px solid var(--border); border-radius: 999px; background: var(--white); color: var(--text); text-decoration: none; }
.hero-chips .chip.chip-active { background: var(--accent); border-color: var(--accent); color: #ffffff; }
.hero-runlog-label { flex: 1; }
.runlog-flip { margin-left: auto; background: none; border: 0; color: #B5654A; font: inherit; font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
```

- [ ] **Step 5: Run suite + visual smoke**

Run: `npm test` — Expected: PASS.
Run: `grep -c 'data-vertical' client/static/index.html` — Expected: `20` (10 chips + 10 scripts).

- [ ] **Step 6: Commit**

```bash
git add client/static/index.html client/static/styles.css client/static/critical.css
git commit -m "Move vertical chips into the hero as the demo selector"
```

---

### Task 3: Demo controller JS

**Files:**
- Modify: `client/static/main.js` — replace the entire `HERO RUN-LOG REPLAY` IIFE (comment block + `(function () { … })();`)
- Regenerate: `client/static/main.min.js`

- [ ] **Step 1: Replace the replay IIFE with the controller**

Replace the whole block from `/* ===…HERO RUN-LOG REPLAY…=== */` through its closing `})();` with:

```js
/* =====================================================
   HERO RUN-LOG DEMO — chips select a vertical, the panel
   replays that vertical's run-log; a flip button shows the
   run's anatomy. Scripts are SSR'd in the DOM (one visible,
   nine hidden) for crawlers and no-JS; reduced motion gets
   instant, static scripts.
   ===================================================== */
(function () {
  'use strict';
  var panel = document.getElementById('hero-runlog');
  if (!panel) return;

  var headLabel = panel.querySelector('.hero-runlog-label');
  var scripts = Array.prototype.slice.call(panel.querySelectorAll('.runlog-script'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.hero-chips .chip[data-vertical]'));
  if (!scripts.length) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var caret = document.createElement('span');
  caret.className = 'runlog-caret';
  caret.setAttribute('aria-hidden', 'true');
  caret.textContent = '▌';
  var timer = null;

  function activeScript() {
    return panel.querySelector('.runlog-script:not([hidden])');
  }

  function show(script) {
    scripts.forEach(function (s) { if (s !== script) s.setAttribute('hidden', ''); });
    script.removeAttribute('hidden');
    var label = script.getAttribute('data-label');
    if (headLabel && label) headLabel.innerHTML = label;
  }

  function replay(script) {
    if (timer) { clearTimeout(timer); timer = null; }
    if (caret.parentNode) caret.parentNode.removeChild(caret);
    var lines = Array.prototype.slice.call(script.querySelectorAll('.runlog-line'));
    lines.forEach(function (l) { l.style.visibility = ''; });
    if (reduced || !lines.length) return; // reduced motion: static, complete
    lines.forEach(function (l) { l.style.visibility = 'hidden'; });
    var i = 0;
    function step() {
      if (i >= lines.length) {
        if (caret.parentNode) caret.parentNode.removeChild(caret);
        timer = null;
        return;
      }
      var line = lines[i];
      line.style.visibility = '';
      line.appendChild(caret);
      i++;
      var next = lines[i];
      timer = setTimeout(step, next && next.classList.contains('rl-human') ? 950 : 480);
    }
    step();
  }

  // Faces + flip (anatomy face added in markup separately; guard for absence)
  var faceLog = panel.querySelector('.runlog-face-log');
  var faceAnatomy = panel.querySelector('.runlog-face-anatomy');
  var flip = panel.querySelector('.runlog-flip');
  function flipTo(which) {
    if (!faceLog || !faceAnatomy) return;
    if (which === 'anatomy') { faceLog.setAttribute('hidden', ''); faceAnatomy.removeAttribute('hidden'); }
    else { faceAnatomy.setAttribute('hidden', ''); faceLog.removeAttribute('hidden'); }
    if (flip) {
      flip.innerHTML = which === 'anatomy' ? '&larr; back to the log' : 'what&rsquo;s behind this run &rarr;';
      flip.setAttribute('aria-expanded', which === 'anatomy' ? 'true' : 'false');
    }
  }
  if (flip && faceAnatomy) {
    flip.addEventListener('click', function () {
      flipTo(faceAnatomy.hasAttribute('hidden') ? 'anatomy' : 'log');
    });
  } else if (flip) {
    flip.setAttribute('hidden', ''); // no anatomy markup yet — hide the button
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
      var v = chip.getAttribute('data-vertical');
      var script = panel.querySelector('.runlog-script[data-vertical="' + v + '"]');
      if (!script) return; // unknown vertical — navigate normally
      ev.preventDefault();
      chips.forEach(function (c) { c.classList.toggle('chip-active', c === chip); });
      flipTo('log');
      show(script);
      replay(script);
    });
  });

  var played = false;
  function initialPlay() {
    if (played) return;
    played = true;
    replay(activeScript());
  }
  if (reduced) {
    // static — nothing to schedule
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { initialPlay(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(panel);
  } else {
    initialPlay();
  }
})();
```

- [ ] **Step 2: Syntax check + minify**

Run: `node --check client/static/main.js` — Expected: no output (OK).
Run: `npx esbuild client/static/main.js --minify --outfile=client/static/main.min.js --allow-overwrite` — Expected: `Done` with ~35kb output.

- [ ] **Step 3: Add controller CSS (flip button, CTA line)**

Append to the rebuild block in `client/static/styles.css`:

```css
.hero-runlog-label { flex: 1; }
.runlog-flip { margin-left: auto; background: none; border: 0; color: var(--accent); font-family: var(--font-body); font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; padding: 0; flex-shrink: 0; }
.runlog-flip:hover { text-decoration: underline; }
.runlog-cta { margin: 0.75rem 0 0; font-family: var(--font-body); font-size: 0.8125rem; }
.runlog-cta .link-arrow { color: #d8d4cf; }
.runlog-cta .link-arrow:hover { color: #ffffff; }
```

- [ ] **Step 4: Serve + smoke-check**

```bash
npm run build && PORT=5064 NODE_ENV=production node dist/index.cjs &
sleep 2
curl -s http://localhost:5064/ | grep -c "runlog-script"   # Expected: 10
curl -s http://localhost:5064/main.min.js | grep -c "runlog-flip"   # Expected: 1
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add client/static/main.js client/static/main.min.js client/static/styles.css
git commit -m "Add demo controller: chips drive per-vertical run-log replays"
```

---

### Task 4: Anatomy face + infrastructure anchor

**Files:**
- Modify: `client/static/index.html` (inside `hero-runlog`, after the `runlog-face-log` div)
- Modify: `client/static/infrastructure.html` (h2 anchor)
- Modify: `client/static/styles.css`
- Test: `tests/homepage.test.ts`

- [ ] **Step 1: Add failing tests**

Append to `tests/homepage.test.ts` (inside the file, new describe):

```ts
describe("anatomy face", () => {
  it("keeps the run anatomy readable in agent markdown", () => {
    expect(indexMd).toContain("drafts-only");
    expect(indexMd).toContain("append-only run log");
  });
  it("links to the infrastructure run anchor, which exists", () => {
    expect(indexHtml).toContain('href="/infrastructure#how-a-theo-run-works"');
    const infra = readFileSync("client/static/infrastructure.html", "utf-8");
    expect(infra).toContain('id="how-a-theo-run-works"');
  });
});
```

Run: `npx vitest run tests/homepage.test.ts` — Expected: FAIL (anatomy text + anchor missing).

- [ ] **Step 2: Add the anatomy face markup**

In `client/static/index.html`, directly after the closing `</div>` of `runlog-face-log` (before `</aside>`), insert:

```html
          <div class="runlog-face runlog-face-anatomy" hidden>
            <p class="anat-flow">your systems (email &middot; CRM &middot; docs) &rarr; <strong>agent fleet</strong> &rarr; <strong>human gate</strong> &rarr; what ships</p>
            <ul class="anat-rails">
              <li>drafts-only outbound &mdash; a person presses send</li>
              <li>read-only CRM by default &mdash; writes need approval</li>
              <li>guards run before drafting, not after</li>
              <li>signals stamped with source + freshness</li>
              <li>append-only run log &mdash; every action, with reasons</li>
            </ul>
            <p class="anat-foot">Frontier-native, model-agnostic rails &mdash; the fleet improves as models do. Owned by you: agents, prompts, playbooks, logs in your tenancy.</p>
            <p class="runlog-cta"><a href="/infrastructure#how-a-theo-run-works" class="link-arrow">How a full run works &rarr;</a></p>
          </div>
```

- [ ] **Step 3: Add the anchor to infrastructure.html**

Find `<h2>How a Theo run works</h2>` in `client/static/infrastructure.html` and change it to:

```html
<h2 id="how-a-theo-run-works">How a Theo run works</h2>
```

- [ ] **Step 4: Anatomy CSS**

Append to the rebuild block in `client/static/styles.css`:

```css
.runlog-face-anatomy { font-family: var(--font-body); font-size: 0.8125rem; line-height: 1.65; color: #d8d4cf; }
.runlog-face-anatomy .anat-flow { margin: 0 0 0.625rem; color: #ffffff; }
.runlog-face-anatomy .anat-rails { margin: 0 0 0.625rem; padding-left: 1.1rem; }
.runlog-face-anatomy .anat-rails li { margin-bottom: 0.2rem; }
.runlog-face-anatomy .anat-foot { margin: 0; color: #8b949e; }
```

- [ ] **Step 5: Run tests, minify not needed (no JS change)**

Run: `npx vitest run tests/homepage.test.ts` — Expected: PASS.
Run: `npm test` — Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add client/static/index.html client/static/infrastructure.html client/static/styles.css tests/homepage.test.ts
git commit -m "Add anatomy face to the run-log panel and infrastructure run anchor"
```

---

### Task 5: Section cuts + FAQ relocation

**Files:**
- Modify: `client/static/index.html`, `client/static/contact.html`
- Test: `tests/homepage.test.ts`

- [ ] **Step 1: Add failing relocation tests**

Append to `tests/homepage.test.ts`:

```ts
describe("section cuts and FAQ relocation", () => {
  const contactHtml = readFileSync("client/static/contact.html", "utf-8");
  it("homepage no longer carries FAQ content or FAQPage schema", () => {
    expect(indexHtml).not.toContain('"FAQPage"');
    expect(indexHtml).not.toContain("People also ask about AI consulting");
  });
  it("contact page carries the FAQ and FAQPage schema", () => {
    expect(contactHtml).toContain('"FAQPage"');
    expect(contactHtml).toContain("People also ask about AI consulting");
  });
  it("homepage dropped the cut sections", () => {
    expect(indexHtml).not.toContain("Inside an engagement");
    expect(indexHtml).not.toContain("Tools we deploy");
    expect(indexHtml).not.toContain("From the blog");
    expect(indexHtml).not.toContain("Two ways to work with us");
    expect(indexHtml).not.toContain("What clients say");
  });
});
```

NOTE: `indexHtml`/`indexMd` are read at module top — these tests reread nothing; the existing consts are fine because vitest re-imports per run.

Run: `npx vitest run tests/homepage.test.ts` — Expected: FAIL.

- [ ] **Step 2: Move FAQ to /contact**

In `client/static/index.html`:
1. Cut the entire `<section …>` containing `<h2>People also ask about AI consulting</h2>` (and its preceding `<div class="accent-rule container"></div>`).
2. Cut the entire `<script type="application/ld+json">` block whose body contains `"@type": "FAQPage"` (head, ~line 111).

In `client/static/contact.html`:
1. Paste the FAQPage JSON-LD block into `<head>` directly before `</head>`.
2. Paste the FAQ section directly before the page's final CTA section (or before `</main>` if there is no final CTA section).

- [ ] **Step 3: Delete the cut sections from index.html**

Delete each of these `<section>` blocks plus the `<div class="accent-rule container"></div>` immediately preceding each (use the h2 text to locate):
1. `<h2>Inside an engagement</h2>` section (content lives on /work).
2. `<h2>What clients say</h2>` section — but FIRST copy the "Real clarity on the options…" quote card's `blockquote` text and its `testimonial-name`/`testimonial-role` values verbatim into a scratch buffer; Task 6 reuses them. Also note the Joanne Hill video card markup — Task 7 moves it.
3. `<h2>Tools we deploy</h2>` warm-band section.
4. `<h2>Two ways to work with us</h2>` section.
5. `<h2>From the blog</h2>` section.

- [ ] **Step 4: Keep /tools reachable from the body**

In the "Your data stays yours" section, change the closing link line to:

```html
<p style="margin-top:var(--space-sm);"><a href="/security" class="link-arrow">How we handle data and compliance &rarr;</a> &nbsp;&middot;&nbsp; <a href="/tools" class="link-arrow">The security and AI tool stack &rarr;</a></p>
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run tests/homepage.test.ts` — Expected: PASS.
Run: `npm test` — Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add client/static/index.html client/static/contact.html tests/homepage.test.ts
git commit -m "Cut homepage to core sections; relocate FAQ and schema to /contact"
```

---

### Task 6: Proof band quote + method line + CTA band merge

**Files:**
- Modify: `client/static/index.html`, `client/static/styles.css`

- [ ] **Step 1: Add the quote to the proof band**

In the `<h2>Measured results</h2>` section, after the closing `</div>` of `results-grid`, insert (name/role copied verbatim from the card noted in Task 5 Step 3):

```html
      <figure class="proof-quote fade-in">
        <blockquote>&ldquo;Real clarity on the options. Compliance, data residency, extensibility considerations. Confidence that the approach is both practical and future-proof.&rdquo;</blockquote>
        <figcaption><!-- name — role, verbatim from the removed card --></figcaption>
      </figure>
```

(Replace the figcaption comment with the actual `Name — Role` text found in Task 5. Per spec §5, swap this quote for Jo's admin/timesheet line when her transcript arrives.)

- [ ] **Step 2: Proof-quote CSS**

Append to the rebuild block in `client/static/styles.css`:

```css
.proof-quote { margin: var(--space-sm) 0 0; max-width: 680px; }
.proof-quote blockquote { font-family: var(--font-display); font-size: 1.125rem; line-height: 1.55; margin: 0 0 0.5rem; }
.proof-quote figcaption { color: var(--text-secondary); font-size: 0.875rem; }
```

- [ ] **Step 3: Method section funding line**

In the `<h2 id="infrastructure-heading">One method. Infrastructure you own.</h2>` section, directly after the "First production numbers…" paragraph, insert:

```html
        <p style="margin-top:var(--space-xs);max-width:740px;">GTM is the first install because it pays for itself &mdash; then funds the systems beneath it: timesheets, quoting, reporting, the admin layer.</p>
```

- [ ] **Step 4: CTA band absorbs "two ways"**

In the `cta-double` block, after the existing `<p>` description, insert:

```html
          <p style="color:var(--text-secondary);line-height:1.6;max-width:520px;margin:0.5rem 0 0;font-size:0.875rem;">Installed in your tenancy from day one &mdash; or piloted on ours, then migrated. <a href="/infrastructure">Two ways to deploy &rarr;</a></p>
```

- [ ] **Step 5: Word-count gate**

```bash
node -e "
const fs=require('fs');
const h=fs.readFileSync('client/static/index.html','utf8');
const m=(h.match(/<main[\s\S]*<\/main>/)||[h])[0];
const t=m.replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<svg[\s\S]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
console.log('total words (incl ~350 hidden script/anatomy words):', t.split(' ').filter(Boolean).length);
"
```

Expected: ≤ 1200 total (≈ visible ~850 + hidden replay scripts/anatomy ≈ 350). If higher, trim copy — do not delete sections.

- [ ] **Step 6: Run suite + commit**

Run: `npm test` — Expected: PASS.

```bash
git add client/static/index.html client/static/styles.css
git commit -m "Merge proof quote, method funding line, and two-ways CTA copy"
```

---

### Task 7: Video placements with excerpts + VideoObject schema

**Files:**
- Modify: `client/static/industries/construction.html`, `client/static/training/sunshine-coast.html`, `client/static/academy.html`, `client/static/about.html`, `client/static/locations/sunshine-coast.html`, `client/static/work.html`

- [ ] **Step 1: Fetch video metadata (uploadDate per video)**

```bash
for id in 2mO4qxvQTx4 M8WoVjZ3niY k_FAP3jF7Ls; do
  echo "== $id"
  curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$id&format=json" | head -c 200; echo
  curl -sL "https://www.youtube.com/watch?v=$id" | grep -o '"uploadDate":"[^"]*"' | head -1
done
```

Expected: a JSON title line and an `"uploadDate":"YYYY-MM-DD…"` line per id. **If uploadDate cannot be fetched** (consent wall), omit the `uploadDate` property from that video's JSON-LD and add `Review` schema only — do not invent a date.

- [ ] **Step 2: Reusable embed + excerpt + schema block**

For each placement below, insert this block (adjusting `VIDEO_ID`, `TITLE`, `DESC`, `EXCERPT`, `NAME`, `ROLE`, `DATE`) inside the page's testimonial/proof area, or before the final CTA section if none exists:

```html
<div class="testimonial-card testimonial-card--video fade-in">
  <div class="testimonial-video-slot">
    <iframe class="testimonial-video-iframe" width="560" height="315"
      src="https://www.youtube.com/embed/VIDEO_ID"
      title="TITLE" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>
  <blockquote class="testimonial-quote">EXCERPT</blockquote>
  <div class="testimonial-attribution">
    <span class="testimonial-name">NAME</span>
    <span class="testimonial-role">ROLE</span>
  </div>
</div>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "TITLE",
  "description": "DESC",
  "thumbnailUrl": "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg",
  "uploadDate": "DATE",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "publisher": { "@type": "Organization", "name": "Tech Horizon Labs" }
}
</script>
```

Placement matrix (EXCERPT = the verified on-page quotes that already exist; full transcripts swap in when the user supplies them):

| Page | VIDEO_ID | NAME / ROLE | EXCERPT | DESC |
|---|---|---|---|---|
| `industries/construction.html` | `2mO4qxvQTx4` | Joanne Hill / KPPQLD | "The content's been great. Basic skills on how to keep working with AI and building it out. I really needed a 'where to start' kind of thing." | "Joanne Hill of KPPQLD on starting with AI for timesheet and admin workflows — client testimonial for Tech Horizon Labs." |
| `training/sunshine-coast.html` | `2mO4qxvQTx4` | Joanne Hill / KPPQLD | same | "Joanne Hill of KPPQLD on Tech Horizon Labs AI training — where to start and how to keep building." |
| `academy.html` | `M8WoVjZ3niY` | Participant / FireUP Coaching | "You combine everything. Different platforms for different things. It's the orchestration of multiple AI models that I hadn't seen before." | "A FireUP Coaching participant on Tech Horizon Labs' multi-model AI orchestration training." |
| `locations/sunshine-coast.html` | `k_FAP3jF7Ls` | Tour Operator / Tourism Noosa Event | "You've saved me at least a day's work from just two hours together." | "A Tourism Noosa tour operator on time saved with AI — Tech Horizon Labs workshop, Sunshine Coast." |
| `work.html` | all three | as above | as above | as above |

`about.html` gets the FireUP **text quote only** (no embed): reuse the existing `testimonial-card testimonial-card--quote` markup pattern with the orchestration quote and FireUP attribution.

- [ ] **Step 3: Verify each page parses and schema is valid JSON**

```bash
for f in client/static/industries/construction.html client/static/training/sunshine-coast.html client/static/academy.html client/static/about.html client/static/locations/sunshine-coast.html client/static/work.html; do
  node -e "
    const m = require('fs').readFileSync('$f','utf8').match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g) || [];
    m.forEach(s => JSON.parse(s.replace(/<\/?script[^>]*>/g,'')));
    console.log('$f', m.length, 'JSON-LD blocks OK');
  "
done
```

Expected: each file prints `… OK` with no JSON parse errors.

- [ ] **Step 4: Run suite + commit**

Run: `npm test` — Expected: PASS.

```bash
git add client/static/industries/construction.html client/static/training/sunshine-coast.html client/static/academy.html client/static/about.html client/static/locations/sunshine-coast.html client/static/work.html
git commit -m "Distribute video testimonials with excerpts and VideoObject schema"
```

---

### Task 8: Assessment-link sweep (conversion flow edges)

**Files:**
- Modify: any `client/static/for/*.html` / `client/static/industries/*.html` missing an assessment link

- [ ] **Step 1: Audit**

Run: `grep -L "/assessment" client/static/for/*.html client/static/industries/*.html`
Expected: a (possibly empty) list of files with no assessment link.

- [ ] **Step 2: Add the CTA line to each listed file**

For each file from Step 1, insert directly before the page's **final** `</section>`:

```html
<p style="margin-top:var(--space-sm);"><a href="/assessment" class="link-arrow">Take the 3-minute AI readiness assessment &rarr;</a></p>
```

- [ ] **Step 3: Re-audit + commit**

Run: `grep -L "/assessment" client/static/for/*.html client/static/industries/*.html` — Expected: no output.

```bash
git add client/static/for client/static/industries
git commit -m "Ensure every vertical page links the readiness assessment"
```

(Skip the commit if Step 1 listed no files.)

---

### Task 9: Full verification + served checks

**Files:** none (verification only; fixes loop back to the owning task)

- [ ] **Step 1: Static gates**

```bash
npm run check        # Expected: exit 0
npm test             # Expected: all pass (≈120+)
npm run build        # Expected: 41 pages, stylesheet + critical CSS checks ✓
```

- [ ] **Step 2: Served checks**

```bash
PORT=5064 NODE_ENV=production node dist/index.cjs &
sleep 2
curl -s http://localhost:5064/ -o /tmp/h.html
grep -c 'runlog-script' /tmp/h.html                     # Expected: 10
grep -c 'hero-chips' /tmp/h.html                        # Expected: >=1
grep -c 'FAQPage' /tmp/h.html                           # Expected: 0
curl -s http://localhost:5064/contact | grep -c 'FAQPage'   # Expected: 1
curl -s http://localhost:5064/index.md | grep -c "BOQ extracted"        # Expected: 1
curl -s http://localhost:5064/index.md | grep -c "append-only run log"  # Expected: 1
curl -s http://localhost:5064/contact.md | grep -c "People also ask"    # Expected: 1
kill %1
```

- [ ] **Step 3: Commit any build artifacts + push**

```bash
git status --short    # expect clean or only intended files
git push github main
```

- [ ] **Step 4: Browser QA (gate: needs `/reload-plugins` from the user for Playwright)**

Checklist (run via Playwright if available, otherwise hand to the user):
1. Chip click → script swaps, replay runs, header label updates, chip highlights.
2. Cmd/ctrl-click a chip → navigates to the vertical page.
3. Flip button → anatomy face; flip back; chip click while on anatomy → returns to log face.
4. `prefers-reduced-motion: reduce` → full script visible instantly, no caret.
5. 375px width: chips wrap, panel readable, SVG fallback shows under 640px.
6. No console errors.

---

## Self-review (done at write time)

- **Spec coverage:** §1→Tasks 1–3; §2→Task 4; §3→Task 1; §4→Tasks 2, 5, 6; §5→Task 7 (+homepage quote in Task 6); §6→Task 8 + runlog CTAs (Task 1); §7→contrast line (Task 2), funding line (Task 6), precision numbers retained (trust row untouched), frontier line (Task 4); §8→Tasks 5, 9; §9→Tasks 1, 4, 5, 9.
- **Known deferred items:** full transcripts + founder video (user-supplied); homepage quote swap to Jo's admin line (spec §5) happens when her transcript arrives.
- **Type consistency:** class names `runlog-script` / `runlog-face-log` / `runlog-face-anatomy` / `hero-runlog-label` / `runlog-flip` / `hero-chips` / `chip-active` are identical across Tasks 1–4 markup, JS, and CSS.
