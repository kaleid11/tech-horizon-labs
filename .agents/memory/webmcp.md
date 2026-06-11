---
name: WebMCP integration (Tech Horizon Labs site)
description: How in-browser AI-agent tools are exposed and where page scoring logic actually lives.
---

# WebMCP on the THL static site

WebMCP tools are registered from a single feature-detected IIFE at the end of
`client/static/main.js` (minified into both `client/static/main.min.js` and
`dist/static/main.min.js`). Pages already load `/main.min.js`, so no per-page
HTML wiring is needed.

**Rule:** register via `navigator.modelContext.registerTool()` (current spec).
`provideContext()` was removed from the WebMCP spec in March 2026. Keep a
fallback to `provideContext({tools})` for older drafts, but prefer registerTool.
**Why:** the API changed between drafts; supporting both avoids breaking on
either runtime while staying spec-current.

**Non-obvious:** the interactive pages' scoring data and functions are NOT in
main.js. Each page (`assessment.html`, `scorecard.html`, `tools.html`) defines
them as classic-script globals in an inline `<script>` (e.g. `QUESTIONS`,
`STAGES`, `DIMENSIONS`, `SECTIONS`, `getStage`). Because main.js is `defer`red,
those globals already exist when it runs, so WebMCP tools read `window.*` /
the DOM at boot. To add/adjust a tool, source truth is the page's inline script.

**Dev serving gotcha:** `server/static.ts` serves `dist/static` when it exists,
else `client/static`. After editing `main.js`, regenerate BOTH minified files
(esbuild --minify) or the running dev app won't reflect changes.
