import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

// ─────────────────────────────────────────────────────────────
// Recipient-wiring tests for internal alert emails.
//
// These exercise the REAL email.ts functions (unlike api.test.ts,
// which mocks the whole module) so a regression in who the contact
// and audit notifications are addressed to is caught automatically.
// The Resend SDK and the connector credential fetch are stubbed.
// ─────────────────────────────────────────────────────────────

const sendMock = vi.fn(async () => ({ data: { id: "test-message-id" }, error: null }));

// A plain class (not a vi.fn) so the global `restoreMocks: true` in
// vitest.config.ts can't wipe the constructor implementation between tests.
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("@sentry/node", () => ({
  captureException: vi.fn(),
}));

// NOTIFY_EMAIL is read once at module load, so set it before importing email.ts
// (done via the dynamic import in beforeAll below).
const NOTIFY_EMAIL = "alerts@techhorizonlabs.com";
const FROM_EMAIL = "noreply@techhorizonlabs.com";
process.env.NOTIFY_EMAIL = NOTIFY_EMAIL;
process.env.REPLIT_CONNECTORS_HOSTNAME = "connectors.example";
process.env.REPL_IDENTITY = "test-identity";

// Stub the connector credential lookup so getCredentials() resolves.
global.fetch = vi.fn(async () => ({
  json: async () => ({
    items: [{ settings: { api_key: "test-api-key", from_email: FROM_EMAIL } }],
  }),
})) as unknown as typeof fetch;

let sendContactNotification: typeof import("../server/email").sendContactNotification;
let sendAuditNotification: typeof import("../server/email").sendAuditNotification;
let sendContactAutoReply: typeof import("../server/email").sendContactAutoReply;
let sendAuditResults: typeof import("../server/email").sendAuditResults;
let sendNewsletterWelcome: typeof import("../server/email").sendNewsletterWelcome;

beforeAll(async () => {
  const mod = await import("../server/email");
  sendContactNotification = mod.sendContactNotification;
  sendAuditNotification = mod.sendAuditNotification;
  sendContactAutoReply = mod.sendContactAutoReply;
  sendAuditResults = mod.sendAuditResults;
  sendNewsletterWelcome = mod.sendNewsletterWelcome;
});

beforeEach(() => {
  sendMock.mockClear();
});

describe("sendContactNotification recipient wiring", () => {
  it("addresses the notification to NOTIFY_EMAIL with replyTo set to the submitter", async () => {
    await sendContactNotification({
      name: "Jane Doe",
      email: "jane@example.com",
      company: "Acme Co",
      message: "I'd like to learn more about your AI consulting services.",
    });

    expect(sendMock).toHaveBeenCalledOnce();
    const payload = sendMock.mock.calls[0][0] as { to: string; replyTo: string; from: string };
    expect(payload.to).toBe(NOTIFY_EMAIL);
    expect(payload.replyTo).toBe("jane@example.com");
    // The internal alert must never be addressed back to the sending address.
    expect(payload.to).not.toBe(payload.from);
  });
});

describe("sendAuditNotification recipient wiring", () => {
  it("addresses the notification to NOTIFY_EMAIL with replyTo set to the submitter", async () => {
    await sendAuditNotification({
      name: "John Smith",
      email: "john@example.com",
      business: "Smith Industries",
      score: 72,
      tier: "Stage 3 — Enabled",
      wantsContact: true,
      wantsResultsEmail: true,
      wantsNewsletter: false,
    });

    expect(sendMock).toHaveBeenCalledOnce();
    const payload = sendMock.mock.calls[0][0] as { to: string; replyTo: string; from: string };
    expect(payload.to).toBe(NOTIFY_EMAIL);
    expect(payload.replyTo).toBe("john@example.com");
    expect(payload.to).not.toBe(payload.from);
  });
});

describe("sendContactAutoReply recipient wiring", () => {
  it("addresses the auto-reply to the submitter, not the team inbox or sending address", async () => {
    await sendContactAutoReply({
      name: "Jane Doe",
      email: "jane@example.com",
    });

    expect(sendMock).toHaveBeenCalledOnce();
    const payload = sendMock.mock.calls[0][0] as { to: string; from: string };
    expect(payload.to).toBe("jane@example.com");
    // Must never go to the internal inbox or back to the sending address.
    expect(payload.to).not.toBe(NOTIFY_EMAIL);
    expect(payload.to).not.toBe(payload.from);
  });
});

describe("sendAuditResults recipient wiring", () => {
  it("addresses the results email to the visitor, not the team inbox or sending address", async () => {
    await sendAuditResults({
      email: "john@example.com",
      name: "John Smith",
      score: 72,
      tier: "Stage 3 — Enabled",
      recommendations: ["Map your highest-value AI starting point.", "Embed AI in one core process."],
    });

    expect(sendMock).toHaveBeenCalledOnce();
    const payload = sendMock.mock.calls[0][0] as { to: string; from: string };
    expect(payload.to).toBe("john@example.com");
    expect(payload.to).not.toBe(NOTIFY_EMAIL);
    expect(payload.to).not.toBe(payload.from);
  });
});

describe("sendNewsletterWelcome recipient wiring", () => {
  it("addresses the welcome email to the signup, not the team inbox or sending address", async () => {
    await sendNewsletterWelcome("subscriber@example.com");

    expect(sendMock).toHaveBeenCalledOnce();
    const payload = sendMock.mock.calls[0][0] as { to: string; from: string };
    expect(payload.to).toBe("subscriber@example.com");
    expect(payload.to).not.toBe(NOTIFY_EMAIL);
    expect(payload.to).not.toBe(payload.from);
  });
});
