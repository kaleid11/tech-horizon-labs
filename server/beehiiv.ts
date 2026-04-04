import { log } from "./index";

/**
 * Push a subscriber to Beehiiv newsletter (fire-and-forget).
 */
export function pushToBeehiiv(
  email: string,
  options?: { reactivate?: boolean; tags?: string[] }
): void {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) return;

  fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      reactivate_existing: options?.reactivate ?? true,
      send_welcome_email: false,
      ...(options?.tags?.length ? { tags: options.tags } : {}),
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
