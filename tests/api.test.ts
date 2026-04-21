import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import express, { type Express } from "express";
import request from "supertest";
import { createServer } from "http";

// ─────────────────────────────────────────────────────────────
// Module mocks — must come BEFORE the code-under-test is imported.
// ─────────────────────────────────────────────────────────────

const mockStorage = {
  createContactSubmission: vi.fn(async (data: unknown) => ({ id: "test-contact-id", ...(data as object), submittedAt: new Date() })),
  getAllContactSubmissions: vi.fn(async () => []),
  createNewsletterSignup: vi.fn(async (data: unknown) => ({ id: "test-newsletter-id", ...(data as object), subscribedAt: new Date() })),
  getNewsletterSignupByEmail: vi.fn(async () => undefined),
  createAuditSubmission: vi.fn(async (data: unknown) => ({ id: "test-audit-id", ...(data as object), submittedAt: new Date() })),
};

vi.mock("../server/storage", () => ({ storage: mockStorage }));

vi.mock("../server/email", () => ({
  sendContactNotification: vi.fn(async () => undefined),
  sendContactAutoReply: vi.fn(async () => undefined),
  sendNewsletterWelcome: vi.fn(async () => undefined),
  sendAuditResults: vi.fn(async () => undefined),
  sendAuditNotification: vi.fn(async () => undefined),
}));

vi.mock("../server/klipy", () => ({ pushToKlipy: vi.fn(async () => undefined) }));
vi.mock("../server/beehiiv", () => ({ pushToBeehiiv: vi.fn(async () => undefined) }));

vi.mock("../server/email-verify", () => ({
  verifyEmailDomain: vi.fn(async (email: string) => {
    if (!email || !email.includes("@")) return { valid: false, reason: "invalid" };
    if (email.endsWith("@nomx.invalid")) return { valid: false, reason: "This email address does not appear to be valid." };
    return { valid: true };
  }),
}));

vi.mock("../server/turnstile", () => ({
  verifyTurnstile: vi.fn(async (_token: unknown) => ({ success: true, skipped: true })),
}));

// ─────────────────────────────────────────────────────────────
// Test app factory — builds a fresh Express instance per test suite.
// ─────────────────────────────────────────────────────────────

const DEV_ORIGIN = "http://localhost:5000";
const BAD_ORIGIN = "https://evil.example";

async function buildTestApp(): Promise<Express> {
  // Leave NODE_ENV as "test" (set via vitest config) — anti-spam's dev-origin
  // allowlist accepts anything non-production, and the rate limiter's skip()
  // specifically checks for "test".
  const app = express();
  app.use(express.json());
  const { registerRoutes } = await import("../server/routes");
  const httpServer = createServer(app);
  await registerRoutes(httpServer, app);
  return app;
}

beforeEach(() => {
  vi.clearAllMocks();
  mockStorage.getNewsletterSignupByEmail.mockResolvedValue(undefined);
});

// ─────────────────────────────────────────────────────────────
// /api/health
// ─────────────────────────────────────────────────────────────

describe("GET /api/health", () => {
  let app: Express;
  beforeAll(async () => { app = await buildTestApp(); });

  it("returns 200 with expected shape", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      ok: true,
      env: expect.any(String),
      uptime_s: expect.any(Number),
    });
  });
});

// ─────────────────────────────────────────────────────────────
// /api/contact
// ─────────────────────────────────────────────────────────────

describe("POST /api/contact", () => {
  let app: Express;
  beforeAll(async () => { app = await buildTestApp(); });

  const validPayload = {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Hello, I would like to learn more about your AI consulting services for my business.",
  };

  it("accepts a valid submission", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", DEV_ORIGIN)
      .send(validPayload);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(mockStorage.createContactSubmission).toHaveBeenCalledOnce();
  });

  it("rejects submissions with no Origin header (403)", async () => {
    const res = await request(app).post("/api/contact").send(validPayload);
    expect(res.status).toBe(403);
    expect(mockStorage.createContactSubmission).not.toHaveBeenCalled();
  });

  it("rejects submissions from disallowed origins (403)", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", BAD_ORIGIN)
      .send(validPayload);
    expect(res.status).toBe(403);
    expect(mockStorage.createContactSubmission).not.toHaveBeenCalled();
  });

  it("silently 200s when the honeypot is filled (no DB insert, no email)", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", DEV_ORIGIN)
      .send({ ...validPayload, company_website: "http://bot.example" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(mockStorage.createContactSubmission).not.toHaveBeenCalled();
  });

  it("rejects gibberish names (the exact spam payload)", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", DEV_ORIGIN)
      .send({ ...validPayload, name: "jAKYpUOwMLaTrOwdozp" });
    expect(res.status).toBe(400);
    expect(mockStorage.createContactSubmission).not.toHaveBeenCalled();
  });

  it("rejects gibberish messages (the exact spam payload)", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", DEV_ORIGIN)
      .send({ ...validPayload, message: "VPZCpXeyZuCCrmMsaPiRaLp" });
    expect(res.status).toBe(400);
    expect(mockStorage.createContactSubmission).not.toHaveBeenCalled();
  });

  it("rejects emails with no MX record", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", DEV_ORIGIN)
      .send({ ...validPayload, email: "x@nomx.invalid" });
    expect(res.status).toBe(400);
    expect(mockStorage.createContactSubmission).not.toHaveBeenCalled();
  });

  it("rejects payloads missing required fields", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Origin", DEV_ORIGIN)
      .send({ name: "Jane", email: "jane@example.com" });
    expect(res.status).toBe(400);
  });

  it("rejects Turnstile failures with 400 on production origin", async () => {
    const turnstile = await import("../server/turnstile");
    vi.mocked(turnstile.verifyTurnstile).mockResolvedValueOnce({ success: false, reason: "bad token" });

    const res = await request(app)
      .post("/api/contact")
      .set("Origin", "https://techhorizonlabs.com")
      .send({ ...validPayload, turnstileToken: "fake" });
    expect(res.status).toBe(400);
    expect(mockStorage.createContactSubmission).not.toHaveBeenCalled();
  });

  it("skips Turnstile on allowed non-production origins (e.g. Replit preview)", async () => {
    const turnstile = await import("../server/turnstile");
    // If Turnstile were called, the default mock returns { success: true, skipped: true }.
    // Prove it isn't called by mocking a failure that would otherwise 400 — and asserting 200.
    vi.mocked(turnstile.verifyTurnstile).mockResolvedValueOnce({ success: false, reason: "bad token" });

    const res = await request(app)
      .post("/api/contact")
      .set("Origin", DEV_ORIGIN)
      .send(validPayload);
    expect(res.status).toBe(200);
    expect(vi.mocked(turnstile.verifyTurnstile)).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
// /api/newsletter
// ─────────────────────────────────────────────────────────────

describe("POST /api/newsletter", () => {
  let app: Express;
  beforeAll(async () => { app = await buildTestApp(); });

  it("accepts a valid signup", async () => {
    const res = await request(app)
      .post("/api/newsletter")
      .set("Origin", DEV_ORIGIN)
      .send({ email: "new@example.com", source: "footer" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(mockStorage.createNewsletterSignup).toHaveBeenCalledOnce();
  });

  it("rejects a duplicate signup", async () => {
    mockStorage.getNewsletterSignupByEmail.mockResolvedValueOnce({
      id: "dup",
      email: "dup@example.com",
      source: null,
      subscribedAt: new Date(),
    });
    const res = await request(app)
      .post("/api/newsletter")
      .set("Origin", DEV_ORIGIN)
      .send({ email: "dup@example.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/already/i);
    expect(mockStorage.createNewsletterSignup).not.toHaveBeenCalled();
  });

  it("allows duplicate report-download (resend email)", async () => {
    mockStorage.getNewsletterSignupByEmail.mockResolvedValueOnce({
      id: "existing",
      email: "back@example.com",
      source: "report-download",
      subscribedAt: new Date(),
    });
    const res = await request(app)
      .post("/api/newsletter")
      .set("Origin", DEV_ORIGIN)
      .send({ email: "back@example.com", source: "report-download" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("rejects bogus origin", async () => {
    const res = await request(app)
      .post("/api/newsletter")
      .set("Origin", BAD_ORIGIN)
      .send({ email: "x@example.com" });
    expect(res.status).toBe(403);
  });

  it("silently 200s on honeypot", async () => {
    const res = await request(app)
      .post("/api/newsletter")
      .set("Origin", DEV_ORIGIN)
      .send({ email: "x@example.com", company_website: "http://bot.example" });
    expect(res.status).toBe(200);
    expect(mockStorage.createNewsletterSignup).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
// /api/audit
// ─────────────────────────────────────────────────────────────

describe("POST /api/audit", () => {
  let app: Express;
  beforeAll(async () => { app = await buildTestApp(); });

  const anonymousAnswers = { answers: JSON.stringify([1, 2, 3, 0, 1, 2, 3, 0, 1, 2]) };

  it("accepts anonymous completion (no contact info, no opt-in)", async () => {
    const res = await request(app)
      .post("/api/audit")
      .set("Origin", DEV_ORIGIN)
      .send(anonymousAnswers);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(mockStorage.createAuditSubmission).toHaveBeenCalledOnce();
  });

  it("rejects opt-in without name and email", async () => {
    const res = await request(app)
      .post("/api/audit")
      .set("Origin", DEV_ORIGIN)
      .send({ ...anonymousAnswers, wantsContact: true });
    expect(res.status).toBe(400);
    expect(mockStorage.createAuditSubmission).not.toHaveBeenCalled();
  });

  it("accepts full opt-in with name + email", async () => {
    const res = await request(app)
      .post("/api/audit")
      .set("Origin", DEV_ORIGIN)
      .send({
        ...anonymousAnswers,
        name: "Jane Doe",
        email: "jane@example.com",
        wantsContact: true,
        wantsResultsEmail: true,
      });
    expect(res.status).toBe(200);
    expect(mockStorage.createAuditSubmission).toHaveBeenCalledOnce();
  });

  it("rejects malformed answers JSON", async () => {
    const res = await request(app)
      .post("/api/audit")
      .set("Origin", DEV_ORIGIN)
      .send({ answers: "not-json" });
    expect(res.status).toBe(400);
  });

  it("rejects answer count ≠ 10", async () => {
    const res = await request(app)
      .post("/api/audit")
      .set("Origin", DEV_ORIGIN)
      .send({ answers: JSON.stringify([1, 2, 3]) });
    expect(res.status).toBe(400);
  });

  it("rejects out-of-range answer indices", async () => {
    const res = await request(app)
      .post("/api/audit")
      .set("Origin", DEV_ORIGIN)
      .send({ answers: JSON.stringify([0, 1, 2, 3, 4, 0, 1, 2, 3, 0]) });
    expect(res.status).toBe(400);
  });

  it("silently 200s on honeypot", async () => {
    const res = await request(app)
      .post("/api/audit")
      .set("Origin", DEV_ORIGIN)
      .send({ ...anonymousAnswers, company_website: "http://bot.example" });
    expect(res.status).toBe(200);
    expect(mockStorage.createAuditSubmission).not.toHaveBeenCalled();
  });
});
