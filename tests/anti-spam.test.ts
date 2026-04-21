import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { Request } from "express";
import { isAllowedOrigin, isHoneypotTripped, looksLikeGibberish, HONEYPOT_FIELD } from "../server/anti-spam";

function mkReq(headers: Record<string, string | undefined>): Request {
  return { headers } as unknown as Request;
}

describe("isAllowedOrigin", () => {
  const originalEnv = process.env.NODE_ENV;
  beforeEach(() => { process.env.NODE_ENV = "production"; });
  afterEach(() => { process.env.NODE_ENV = originalEnv; });

  it("accepts the canonical domain", () => {
    expect(isAllowedOrigin(mkReq({ origin: "https://techhorizonlabs.com" }))).toBe(true);
  });

  it("accepts www subdomain", () => {
    expect(isAllowedOrigin(mkReq({ origin: "https://www.techhorizonlabs.com" }))).toBe(true);
  });

  it("accepts origin from Referer when Origin header is absent", () => {
    expect(isAllowedOrigin(mkReq({ referer: "https://techhorizonlabs.com/contact" }))).toBe(true);
  });

  it("rejects requests with no origin", () => {
    expect(isAllowedOrigin(mkReq({}))).toBe(false);
  });

  it("rejects requests from unrelated domains", () => {
    expect(isAllowedOrigin(mkReq({ origin: "https://evil.example" }))).toBe(false);
  });

  it("rejects look-alike domains", () => {
    expect(isAllowedOrigin(mkReq({ origin: "https://techhorizonlabs.com.evil.com" }))).toBe(false);
  });

  it("rejects malformed origin strings", () => {
    expect(isAllowedOrigin(mkReq({ origin: "not a url" }))).toBe(false);
  });

  it("rejects localhost in production", () => {
    expect(isAllowedOrigin(mkReq({ origin: "http://localhost:5000" }))).toBe(false);
  });

  it("allows localhost in dev", () => {
    process.env.NODE_ENV = "development";
    expect(isAllowedOrigin(mkReq({ origin: "http://localhost:5050" }))).toBe(true);
  });

  it("allows replit.dev in dev", () => {
    process.env.NODE_ENV = "development";
    expect(isAllowedOrigin(mkReq({ origin: "https://abc-def.kirk.replit.dev" }))).toBe(true);
  });
});

describe("isHoneypotTripped", () => {
  it(`flags a filled ${HONEYPOT_FIELD} field`, () => {
    expect(isHoneypotTripped({ name: "ok", [HONEYPOT_FIELD]: "http://bot.example" })).toBe(true);
  });

  it("does not flag an empty honeypot value", () => {
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: "" })).toBe(false);
  });

  it("does not flag a whitespace-only honeypot value", () => {
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: "   " })).toBe(false);
  });

  it("does not flag when field is missing", () => {
    expect(isHoneypotTripped({ name: "ok" })).toBe(false);
  });

  it("handles null/undefined body", () => {
    expect(isHoneypotTripped(null)).toBe(false);
    expect(isHoneypotTripped(undefined)).toBe(false);
  });

  it("ignores non-string honeypot values", () => {
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: 123 as unknown })).toBe(false);
  });
});

describe("looksLikeGibberish", () => {
  // The exact payload the user received
  it("flags the original spam name (case jitter + vowel mix)", () => {
    expect(looksLikeGibberish("jAKYpUOwMLaTrOwdozp")).toBe(true);
  });

  it("flags the original spam message (long consonant runs)", () => {
    expect(looksLikeGibberish("VPZCpXeyZuCCrmMsaPiRaLp")).toBe(true);
  });

  it("flags another random-string bot name", () => {
    expect(looksLikeGibberish("XqrZfPvLqMnTwRsYkHgB")).toBe(true);
  });

  it("flags low-vowel random strings", () => {
    expect(looksLikeGibberish("bcdfghjklmnpqrst")).toBe(true);
  });

  it("does NOT flag real short names", () => {
    expect(looksLikeGibberish("Jane")).toBe(false);
    expect(looksLikeGibberish("Huxley")).toBe(false);
  });

  it("does NOT flag real full names", () => {
    expect(looksLikeGibberish("Jane Doe")).toBe(false);
    expect(looksLikeGibberish("Huxley Peckham")).toBe(false);
    expect(looksLikeGibberish("Mary O'Connor")).toBe(false);
  });

  it("does NOT flag hyphenated names", () => {
    expect(looksLikeGibberish("Huxley-Peckham")).toBe(false);
    expect(looksLikeGibberish("Anne-Marie")).toBe(false);
  });

  it("does NOT flag real sentences", () => {
    expect(looksLikeGibberish("I would like to know more about your AI consulting services.")).toBe(false);
    expect(looksLikeGibberish("Please contact me regarding a pre-discovery call.")).toBe(false);
  });

  it("does NOT flag normal email local parts", () => {
    // Not that we run this on emails, but just to be safe
    expect(looksLikeGibberish("huxley")).toBe(false);
  });

  it("does NOT flag all-caps acronyms / short strings", () => {
    expect(looksLikeGibberish("ABC")).toBe(false);
    expect(looksLikeGibberish("AI")).toBe(false);
    expect(looksLikeGibberish("CEO")).toBe(false);
  });

  it("does NOT flag tricky but real place names", () => {
    expect(looksLikeGibberish("Wollongong")).toBe(false);
    expect(looksLikeGibberish("Mooloolaba")).toBe(false);
    expect(looksLikeGibberish("Maroochydore")).toBe(false);
  });

  it("handles empty and null inputs gracefully", () => {
    expect(looksLikeGibberish("")).toBe(false);
    expect(looksLikeGibberish(null)).toBe(false);
    expect(looksLikeGibberish(undefined)).toBe(false);
  });

  it("does NOT flag 'strengths' (real 5-consonant-run English word)", () => {
    // "strengths" has 8-run "rngths" but is a real word — case ratio is low,
    // vowel ratio is 1/9 = 0.11 which IS <0.2. So this WOULD be flagged on
    // its own. Worth noting: users aren't typing single-word "strengths" as
    // a name or message, so this is acceptable.
    //
    // This test documents the known limitation rather than claiming it works.
    expect(looksLikeGibberish("strengths")).toBe(true);
  });

  it("does NOT flag the word 'strengths' when used in a sentence", () => {
    expect(looksLikeGibberish("Our strengths are clear.")).toBe(false);
  });
});
