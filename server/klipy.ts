import { log } from "./index";

const KLIPY_API_URL = "https://api.klipy.ai/v1/people";

interface KlipyContact {
  name: string;
  email: string;
  company?: string;
  source: "website-contact" | "website-newsletter" | "website-audit" | "report-download" | "ai-readiness-assessment";
  metadata?: Record<string, string | number>;
}

/**
 * Push a contact to Klipy CRM (fire-and-forget).
 * Logs errors but never throws — same pattern as email functions.
 */
export function pushToKlipy(data: KlipyContact): void {
  const apiKey = process.env.KLIPY_API;
  if (!apiKey) {
    log("Klipy API key not configured, skipping CRM sync", "klipy");
    return;
  }

  const nameParts = data.name.split(" ");
  const firstName = nameParts[0] || data.name;
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  const body: Record<string, unknown> = {
    type: "email",
    identifier: data.email,
    firstName,
    ...(lastName && { lastName }),
    ...(data.company && { title: data.company }),
    remarks: `Source: ${data.source}${data.metadata ? ` | ${JSON.stringify(data.metadata)}` : ""}`,
  };

  fetch(KLIPY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-KLIPY-API-KEY": apiKey,
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text().catch(() => "no body");
        log(`Klipy API error ${res.status}: ${text}`, "klipy");
      } else {
        log(`Klipy contact synced: ${data.email} (${data.source})`, "klipy");
      }
    })
    .catch((err) => {
      log(`Klipy sync failed: ${err instanceof Error ? err.message : String(err)}`, "klipy");
    });
}
