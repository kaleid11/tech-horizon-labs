import { log } from "./index";

/**
 * Push a subscriber to Beehiiv newsletter (fire-and-forget).
 *
 * Notes:
 *  (a) This call is fire-and-forget. Errors are logged but never thrown back to
 *      the caller, so a Beehiiv outage will not break newsletter / contact /
 *      audit / academy-download flows on the main site.
 *  (b) `send_welcome_email` is now TRUE. Beehiiv's welcome automation is the
 *      intended home of the LONG-TERM nurture sequence (drip emails, re-engagement,
 *      lead-magnet branching). That sequence is configured inside the Beehiiv
 *      dashboard, not in this codebase. Use the `lead_magnet` custom field (passed
 *      below) to branch the automation by the specific lead magnet that converted.
 *  (c) The immediate "here is your file" transactional email is NOT sent by
 *      Beehiiv. It is sent locally via Resend in `server/email.ts`
 *      (`sendNewsletterWelcome`). That keeps the per-resource download link
 *      under our direct control and removes any dependency on Beehiiv-side
 *      template plumbing for the actual file delivery.
 */
export function pushToBeehiiv(
  email: string,
  options?: { reactivate?: boolean; tags?: string[]; source?: string }
): void {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) return;

  const source = options?.source;
  const tags = [
    ...(options?.tags ?? []),
    ...(source && !options?.tags?.includes(source) ? [source] : []),
  ];

  fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      reactivate_existing: options?.reactivate ?? true,
      send_welcome_email: true,
      utm_source: "techhorizonlabs.com",
      ...(source ? { utm_medium: source } : {}),
      ...(tags.length ? { tags } : {}),
      ...(source
        ? { custom_fields: [{ name: "lead_magnet", value: source }] }
        : {}),
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        log(`Beehiiv sync ${res.status}: ${body}`, "beehiiv");
      }
    })
    .catch((err) =>
      log(`Beehiiv sync failed: ${err instanceof Error ? err.message : String(err)}`, "beehiiv")
    );
}
