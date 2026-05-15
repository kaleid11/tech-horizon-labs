# Beehiiv Welcome Automation — Build Spec

This document is the build spec for the Beehiiv **welcome automation** that runs for every new subscriber pushed from techhorizonlabs.com. The code side is already done (`server/beehiiv.ts` sends `send_welcome_email: true` plus a `lead_magnet` custom field). This document covers the part that must be configured **inside the Beehiiv dashboard**.

The immediate "here is your file / here is your report" email is sent by Resend (see `server/email.ts > sendNewsletterWelcome`). Beehiiv handles **touches 2 onward**, so none of the emails below should re-deliver the lead magnet — they should build on it.

---

## 1. The custom field

Beehiiv > **Audience > Custom Fields** — confirm a field exists:

- **Name:** `lead_magnet`
- **Type:** Text (single line)

The same string is also pushed as a tag, so either can be used as the branch condition. Prefer the custom field.

Possible values (passed by the site):

| Value | Where it comes from |
|---|---|
| `academy-download-setup-guide` | `/academy` — AI Setup & Configuration Guide form |
| `academy-download-claude-cowork` | `/academy` — Claude Cowork Setup Guide form |
| `academy-download-migration` | `/academy` — ChatGPT-to-Claude Migration Guide form |
| `report-download` | `/report` — State of AI Readiness 2026 |
| `contact-form` | `/contact` — main contact form |
| `ai-readiness-assessment` | `/assessment` — quiz completions with email |
| `website-newsletter` | Generic newsletter signups elsewhere on site |
| *(empty)* | Fallback — treat as `website-newsletter` |

---

## 2. Automation shape

Create **one automation** in Beehiiv > Automations:

- **Name:** `Welcome — Lead Magnet Branching`
- **Trigger:** Subscriber is created (any source)
- **First step:** Branch / "If/else" on the `lead_magnet` custom field

Branches (in this order, first match wins):

1. `lead_magnet` is `academy-download-setup-guide` → **Branch A1**
2. `lead_magnet` is `academy-download-claude-cowork` → **Branch A2**
3. `lead_magnet` is `academy-download-migration` → **Branch A3**
4. `lead_magnet` is `report-download` → **Branch R**
5. `lead_magnet` is `ai-readiness-assessment` → **Branch Q**
6. `lead_magnet` is `contact-form` → **Branch C**
7. Else (empty or `website-newsletter`) → **Branch N**

> Beehiiv currently caps "else if" nesting; if needed, split into two automations (Academy / Other) both triggered on subscriber-created.

Global settings for every email below:

- **From name:** Tech Horizon Labs
- **Reply-to:** the same address used by Resend (`hello@techhorizonlabs.com` or whatever `FROM_EMAIL` resolves to)
- **Send window:** weekdays, 9am AEST
- **Skip if subscriber unsubscribed:** yes

---

## 3. Branch A1 — Setup & Configuration Guide (3 emails)

Subscriber already received the DOCX via Resend. Goal: get them to actually open the guide, then cross-sell Claude Cowork + the readiness assessment.

### A1-Email-1 — Delay: **1 day**
**Subject:** The Setup Triangle, in one sentence
**Preheader:** Projects, Thinking Mode, Search — why all three matter.

> Hi {{ first_name | default: "there" }},
>
> Quick follow-up on the AI Setup & Configuration Guide you grabbed yesterday.
>
> The whole guide hinges on one idea we call the **Setup Triangle**: Projects, Thinking Mode, and Search. Most teams turn on one of the three, get mediocre results, and quietly decide AI "isn't ready." All three together is what turns ChatGPT or Claude from a novelty into a daily tool.
>
> If you have not opened the guide yet, the 10-minute section to start with is **"Projects: your AI's working memory"** — it is the single biggest unlock for most teams.
>
> [Re-open the guide](https://techhorizonlabs.com/resources/ai-setup-configuration-guide.docx)
>
> — Tech Horizon Labs

### A1-Email-2 — Delay: **3 days after Email 1**
**Subject:** What "good" Claude / ChatGPT setup actually looks like
**Preheader:** A 30-second checklist you can run against your own account today.

> Hi {{ first_name | default: "there" }},
>
> A quick self-check. By the end of this week, on whichever tool your team uses, you want to be able to say "yes" to all four:
>
> 1. There is **at least one Project** with custom instructions matched to a real workflow (not a generic "you are a helpful assistant" prompt).
> 2. **Extended / advanced thinking** is on for anything analytical.
> 3. **Web search** is turned on and you have decided when it is allowed to run.
> 4. There is a written **one-page playbook** the team can point new hires at.
>
> If you are missing #4, the Setup Guide has a template for it in the appendix.
>
> Next email I will share the Claude-specific version of this — the Cowork Setup — because Projects work slightly differently there and it trips most teams up.
>
> — Tech Horizon Labs

### A1-Email-3 — Delay: **4 days after Email 2**
**Subject:** Next step: turn Claude into a daily coworker
**Preheader:** The companion guide to the setup you just configured.

> Hi {{ first_name | default: "there" }},
>
> If you went through the Setup Guide, the natural next read is the **Claude Cowork Setup Guide** — same Setup Triangle, but applied specifically to making Claude a daily coworker rather than a one-off chatbot.
>
> [Grab the Claude Cowork Guide (free DOCX)](https://techhorizonlabs.com/academy)
>
> And if you have not done it yet, the **free 10-question AI Readiness Assessment** maps your business to one of four maturity stages and gives you a personalised next step:
>
> [Take the assessment](https://techhorizonlabs.com/assessment)
>
> If you would rather talk it through, our free 15-minute pre-discovery call is here: [Book a call](https://techhorizonlabs.com/contact)
>
> — Tech Horizon Labs

---

## 4. Branch A2 — Claude Cowork Setup Guide (3 emails)

### A2-Email-1 — Delay: **1 day**
**Subject:** Two settings most people skip in Claude
**Preheader:** Extended thinking + Projects custom instructions.

> Hi {{ first_name | default: "there" }},
>
> If you are dipping into the Claude Cowork Guide today, the two settings worth fixing first are:
>
> 1. **Extended thinking** — on for anything that needs reasoning, off for quick drafts. Most teams leave it off by default and wonder why outputs feel shallow.
> 2. **Project custom instructions** — written like a job description, not a prompt. There is a template in the guide under "Projects done right."
>
> [Re-open the guide](https://techhorizonlabs.com/resources/claude-cowork-setup-guide.docx)
>
> — Tech Horizon Labs

### A2-Email-2 — Delay: **3 days after Email 1**
**Subject:** "Cowork" is a verb, not a feature
**Preheader:** What separates the teams who get value from Claude from the ones who don't.

> Hi {{ first_name | default: "there" }},
>
> The teams who get real value from Claude treat it the way they would treat a new junior hire: brief it properly, give it the context it needs, review the first few outputs carefully, then let it run.
>
> The teams who don't, paste a one-line prompt in, get an okay-but-generic reply, and conclude AI is overhyped.
>
> The difference is **Projects** — a per-workflow workspace with files, instructions, and history. If you have not created one yet, that is the single highest-leverage thing you can do this week.
>
> — Tech Horizon Labs

### A2-Email-3 — Delay: **4 days after Email 2**
**Subject:** Coming from ChatGPT? Here is the migration map
**Preheader:** What transfers cleanly, what does not.

> Hi {{ first_name | default: "there" }},
>
> A lot of people grab the Claude Cowork Guide while they are still mostly on ChatGPT. If that is you, the **ChatGPT-to-Claude Migration Guide** covers what transfers cleanly, what needs rebuilding, and the workflow differences that actually matter:
>
> [Grab the Migration Guide (free DOCX)](https://techhorizonlabs.com/academy)
>
> And whenever you are ready to talk through embedding this inside real business workflows, the free 15-minute pre-discovery call is here:
>
> [Book a call](https://techhorizonlabs.com/contact)
>
> — Tech Horizon Labs

---

## 5. Branch A3 — ChatGPT-to-Claude Migration (3 emails)

### A3-Email-1 — Delay: **1 day**
**Subject:** What actually transfers from ChatGPT to Claude
**Preheader:** Prompts: yes. Custom GPTs: not really. Here is the map.

> Hi {{ first_name | default: "there" }},
>
> Quick map of what survives the move from ChatGPT to Claude:
>
> - **Prompts and writing style guides** — transfer cleanly.
> - **Custom GPTs** — closest equivalent is a Claude Project. You will need to rebuild them, but the briefing is portable.
> - **Memory** — Claude does not keep cross-chat memory the same way; Projects do that work instead.
> - **Browsing / tools** — both have search, configured slightly differently.
>
> Full breakdown is in the guide:
>
> [Re-open the Migration Guide](https://techhorizonlabs.com/resources/chatgpt-to-claude-migration.docx)
>
> — Tech Horizon Labs

### A3-Email-2 — Delay: **3 days after Email 1**
**Subject:** You don't have to pick one
**Preheader:** Most teams run both. Here's how to decide what goes where.

> Hi {{ first_name | default: "there" }},
>
> A surprising number of teams settle on **both** tools, not one. A rough heuristic:
>
> - **Claude:** long-form writing, document analysis, anything where you want a careful, thinking-out-loud collaborator.
> - **ChatGPT:** quick tasks, image work, voice mode, anything where ecosystem and speed matter.
>
> If you want a unified setup that works across both, the **AI Setup & Configuration Guide** covers the Setup Triangle for each:
>
> [Grab the Setup Guide (free DOCX)](https://techhorizonlabs.com/academy)
>
> — Tech Horizon Labs

### A3-Email-3 — Delay: **4 days after Email 2**
**Subject:** Where does your business actually sit on AI?
**Preheader:** A 10-question assessment that maps you to one of four maturity stages.

> Hi {{ first_name | default: "there" }},
>
> Once you have picked your tools, the next question is usually "okay, where do we actually start?"
>
> The free **AI Readiness Assessment** is a 10-question quiz that maps your business to one of four maturity stages — Unaware, ChatGPT Plateau, Enabled, AI-Native — and gives you a personalised next-step plan. Most people finish it in about 4 minutes.
>
> [Take the assessment](https://techhorizonlabs.com/assessment)
>
> Or if you would rather talk: [book a free 15-minute pre-discovery call](https://techhorizonlabs.com/contact).
>
> — Tech Horizon Labs

---

## 6. Branch R — State of AI Readiness Report (4 emails)

The report itself is the lead magnet, so this sequence treats subscribers as further along — more strategy, less "how to configure Claude."

### R-Email-1 — Delay: **1 day**
**Subject:** The one chart from the report most people screenshot
**Preheader:** Australia ranks 7th globally — yet only 5% of SMBs are AI-enabled.

> Hi {{ first_name | default: "there" }},
>
> One number from the report that tends to land hardest: Australia ranks **7th globally** for AI adoption per capita, but only **5% of Australian SMBs** are fully AI-enabled. That gap is the $44B GDP opportunity the report is built around.
>
> If you have not opened it yet, the four-stage maturity model (Unaware → ChatGPT Plateau → Enabled → AI-Native) on page 6 is the section to start with.
>
> [Re-open the report](https://techhorizonlabs.com/ai-readiness-report-2026.pdf)
>
> — Tech Horizon Labs

### R-Email-2 — Delay: **3 days after Email 1**
**Subject:** Why most teams stall at "ChatGPT Plateau"
**Preheader:** It's not the tool. It's the lack of infrastructure underneath it.

> Hi {{ first_name | default: "there" }},
>
> The most common stage in the report is the **ChatGPT Plateau** — a handful of people use AI personally, nothing is embedded in workflows, and the business plateaus around 10–15% productivity gain.
>
> The plateau is almost never a tool problem. It is an **infrastructure** problem: no shared Projects, no playbooks, no defined workflows, no agreed data boundaries.
>
> That is the whole "infrastructure before automation" thesis we work from — and it is the gap the next stage (Enabled) closes.
>
> — Tech Horizon Labs

### R-Email-3 — Delay: **4 days after Email 2**
**Subject:** Where do you actually sit? (4-minute self-check)
**Preheader:** The same maturity model from the report, run against your own business.

> Hi {{ first_name | default: "there" }},
>
> If the report's maturity model resonated, the **AI Readiness Assessment** is the self-serve version — 10 questions, 4 minutes, scored against the same four stages, with a personalised next-step plan at the end.
>
> [Take the assessment](https://techhorizonlabs.com/assessment)
>
> For something deeper, the **AI Readiness Scorecard** is 28 questions across six dimensions:
>
> [Open the scorecard](https://techhorizonlabs.com/scorecard)
>
> — Tech Horizon Labs

### R-Email-4 — Delay: **5 days after Email 3**
**Subject:** What a "fractional AI ops" engagement actually looks like
**Preheader:** A short pitch — and an easy way to ask questions.

> Hi {{ first_name | default: "there" }},
>
> Last one in this sequence. A lot of report readers ask the same question: "what does it actually look like to bring someone in to fix this?"
>
> Our fractional AI ops engagements typically run 90 days and cover three things:
>
> 1. **Infrastructure** — Projects, playbooks, data boundaries, tooling.
> 2. **Enablement** — small-group training so the team can actually use it.
> 3. **Workflow embedding** — picking 2–3 real workflows and getting them shipped.
>
> No agents-on-rails, no "transformation" decks. Just the boring middle layer most consultancies skip.
>
> If that sounds relevant: [book a free 15-minute pre-discovery call](https://techhorizonlabs.com/contact). No deck, just a conversation.
>
> — Tech Horizon Labs

---

## 7. Branch Q — AI Readiness Assessment finisher (2 emails)

These subscribers already saw their results on-page. Don't repeat the score; nudge to the next step.

### Q-Email-1 — Delay: **1 day**
**Subject:** Your assessment result — what to do this week
**Preheader:** Two concrete next steps based on where you scored.

> Hi {{ first_name | default: "there" }},
>
> You finished the AI Readiness Assessment yesterday — thanks for taking it.
>
> Whatever stage you landed on, two concrete next steps for this week:
>
> 1. Grab the **AI Setup & Configuration Guide** — free DOCX, covers the Setup Triangle for both Claude and ChatGPT.
>    [Get the guide](https://techhorizonlabs.com/academy)
> 2. Read the **State of AI Readiness 2026** report — the macro view of where Australian SMBs sit.
>    [Get the report](https://techhorizonlabs.com/report)
>
> — Tech Horizon Labs

### Q-Email-2 — Delay: **5 days after Email 1**
**Subject:** The deeper version of the assessment
**Preheader:** 28 questions, 6 dimensions, fuller picture.

> Hi {{ first_name | default: "there" }},
>
> The 10-question assessment is the quick read. If you want the fuller picture, the **AI Readiness Scorecard** is 28 questions across six dimensions — strategy, data, tooling, people, governance, and workflows — with email-gated recommendations at the end.
>
> [Open the scorecard](https://techhorizonlabs.com/scorecard)
>
> And whenever talking it through would be useful, the free 15-minute pre-discovery call is here:
>
> [Book a call](https://techhorizonlabs.com/contact)
>
> — Tech Horizon Labs

---

## 8. Branch C — Contact form (1 email, optional)

Contact-form submitters already get a Resend auto-reply. Beehiiv should stay quiet for ~7 days, then send one soft nurture email. Do **not** send anything if a sales conversation is already underway — gate this branch with a "subscriber has not been tagged `customer` or `in-conversation`" condition if you maintain those tags.

### C-Email-1 — Delay: **7 days**
**Subject:** While we sort out a time
**Preheader:** Two things worth reading in the meantime.

> Hi {{ first_name | default: "there" }},
>
> While we sort out a time to chat, two things from the Academy that tend to be useful background reading:
>
> - **AI Setup & Configuration Guide** — the Setup Triangle for Claude and ChatGPT. [Get it free.](https://techhorizonlabs.com/academy)
> - **State of AI Readiness 2026** report — Australian SMB macro view. [Get the report.](https://techhorizonlabs.com/report)
>
> — Tech Horizon Labs

---

## 9. Branch N — Generic newsletter (3 emails)

Fires for `website-newsletter` and for empty `lead_magnet`.

### N-Email-1 — Delay: **immediately on enter** (acts as the welcome)
**Subject:** Welcome to Tech Horizon Labs
**Preheader:** What you'll get from us, and three things worth reading first.

> Hi {{ first_name | default: "there" }},
>
> Welcome — glad to have you in.
>
> We are Tech Horizon Labs, a fractional AI ops consultancy. We work on the boring middle layer most consultancies skip: getting AI properly **embedded** inside SMB and mid-market workflows, before anyone goes near agents or automation.
>
> Three things worth bookmarking:
>
> 1. **AI Readiness Assessment** — 10 questions, 4 minutes, maps you to one of four maturity stages. [Take it.](https://techhorizonlabs.com/assessment)
> 2. **Academy** — free setup guides for Claude and ChatGPT. [Browse.](https://techhorizonlabs.com/academy)
> 3. **State of AI Readiness 2026** — our research report on Australian SMB AI adoption. [Get the report.](https://techhorizonlabs.com/report)
>
> — Tech Horizon Labs

### N-Email-2 — Delay: **4 days after Email 1**
**Subject:** Infrastructure before automation
**Preheader:** The one-sentence version of how we think about AI.

> Hi {{ first_name | default: "there" }},
>
> The single sentence that drives most of what we write:
>
> **Infrastructure before automation.**
>
> Almost every business that struggles with AI does so because they tried to automate before they had Projects, playbooks, data boundaries, and trained people in place. The order matters: get the infrastructure right and automation becomes easy. Skip it and automation becomes brittle and expensive.
>
> If you want the practical version, the **AI Setup & Configuration Guide** is the place to start:
>
> [Get the guide](https://techhorizonlabs.com/academy)
>
> — Tech Horizon Labs

### N-Email-3 — Delay: **5 days after Email 2**
**Subject:** Where do you actually sit?
**Preheader:** Four AI maturity stages — and which one fits you.

> Hi {{ first_name | default: "there" }},
>
> The four-stage maturity model we use:
>
> 1. **Unaware** — AI is not really on the agenda.
> 2. **ChatGPT Plateau** — a few personal users, nothing embedded.
> 3. **Enabled** — Projects and playbooks live, AI inside real workflows.
> 4. **AI-Native** — AI is part of how the business operates.
>
> The 10-question assessment will tell you which one you are in, plus a next-step plan:
>
> [Take the assessment](https://techhorizonlabs.com/assessment)
>
> Or if it is easier, book a free 15-minute pre-discovery call: [Book a call](https://techhorizonlabs.com/contact)
>
> — Tech Horizon Labs

---

## 10. QA checklist before turning the automation on

- [ ] Custom field `lead_magnet` exists and is populated on a recent test subscriber.
- [ ] Each branch condition matches the **exact** string from the table in section 1 (case-sensitive).
- [ ] "Else" branch catches both empty and `website-newsletter`.
- [ ] Beehiiv's default publication welcome email is **disabled** (otherwise it duplicates N-Email-1).
- [ ] Every CTA link tested live.
- [ ] Send window set to business hours, AEST.
- [ ] One end-to-end test per branch using a real signup on the corresponding form (Academy x3, /report, /assessment, /contact, generic newsletter).

## 11. After it is live

Beehiiv will report per-email open / click / unsubscribe by branch. Re-review at 30 days; the Academy branches and Branch R are the ones most worth iterating on because they have the highest intent.

A separate long-term nurture sequence (touches 8+) is tracked as its own task and lives downstream of this automation.
