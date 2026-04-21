import type { Request } from "express";

const ALLOWED_ORIGINS = new Set<string>([
  "https://techhorizonlabs.com",
  "https://www.techhorizonlabs.com",
]);

// Dev origins are accepted when NODE_ENV !== "production"
const DEV_ORIGIN_PATTERNS: RegExp[] = [
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/[a-z0-9-]+\.(replit\.dev|repl\.co|janeway\.replit\.dev|kirk\.replit\.dev|picard\.replit\.dev|riker\.replit\.dev|sisko\.replit\.dev)$/,
  /^https:\/\/[a-z0-9-]+\.replit\.app$/,
];

function originOf(req: Request): string | null {
  const origin = (req.headers.origin || req.headers.referer || "").toString().trim();
  if (!origin) return null;
  try {
    return new URL(origin).origin;
  } catch {
    return null;
  }
}

export function isAllowedOrigin(req: Request): boolean {
  const host = originOf(req);
  if (!host) return false;

  if (ALLOWED_ORIGINS.has(host)) return true;

  if (process.env.NODE_ENV !== "production") {
    return DEV_ORIGIN_PATTERNS.some((re) => re.test(host));
  }

  return false;
}

/**
 * Returns true only when the request originates from the real production
 * domain (techhorizonlabs.com). Use this to gate checks that can only
 * succeed on the production host — notably Cloudflare Turnstile, whose
 * sitekey is domain-bound and cannot validate from Replit preview URLs.
 */
export function isProductionOrigin(req: Request): boolean {
  const host = originOf(req);
  return host !== null && ALLOWED_ORIGINS.has(host);
}

/**
 * Field-name bots often target (autofill "company website"-style honeypot).
 */
export const HONEYPOT_FIELD = "company_website";

export function isHoneypotTripped(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Detects random-string gibberish like "jAKYpUOwMLaTrOwdozp" and
 * "VPZCpXeyZuCCrmMsaPiRaLp" — the payloads common to mass-automated
 * contact-form spam.
 *
 * Three independent signals; ANY one firing flags the text as gibberish.
 * All three require the payload to be a single unbroken run (no spaces)
 * and ≥ 8 chars, which exempts real sentences, names, and acronyms.
 *
 * 1. Long consonant run — ≥ 5 consecutive consonants. English rarely
 *    exceeds 4 (e.g. "strengths"); random strings hit 5+ frequently.
 * 2. High case jitter — ≥ 35% of letters switch case from the prior
 *    letter. Real names change case at most at word boundaries.
 * 3. Very low vowel ratio — < 0.2 vowels. Fully random letter strings
 *    average ~0.19; English text averages ~0.38.
 */
export function looksLikeGibberish(text: string | null | undefined): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  if (trimmed.length < 8) return false;
  if (/\s/.test(trimmed)) return false;

  const letters = trimmed.match(/[a-zA-Z]/g);
  if (!letters || letters.length < 8) return false;

  const VOWEL = /[aeiouAEIOU]/;
  const LETTER = /[a-zA-Z]/;
  let maxConsonantRun = 0;
  let currentRun = 0;
  let caseTransitions = 0;
  let letterPairs = 0;
  let vowelCount = 0;
  let prevLetter: string | null = null;

  // Iterate the original string so separators (hyphens, apostrophes) reset
  // the consonant-run and case-transition state — "Anne-Marie" is two words,
  // not one weird-looking one.
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (!LETTER.test(ch)) {
      currentRun = 0;
      prevLetter = null;
      continue;
    }
    if (VOWEL.test(ch)) {
      vowelCount++;
      currentRun = 0;
    } else {
      currentRun++;
      if (currentRun > maxConsonantRun) maxConsonantRun = currentRun;
    }
    if (prevLetter !== null) {
      const prevUpper = prevLetter === prevLetter.toUpperCase() && prevLetter !== prevLetter.toLowerCase();
      const curUpper = ch === ch.toUpperCase() && ch !== ch.toLowerCase();
      if (prevUpper !== curUpper) caseTransitions++;
      letterPairs++;
    }
    prevLetter = ch;
  }

  if (maxConsonantRun >= 5) return true;
  if (letterPairs > 0 && caseTransitions / letterPairs >= 0.35) return true;
  if (vowelCount / letters.length < 0.2) return true;

  return false;
}
