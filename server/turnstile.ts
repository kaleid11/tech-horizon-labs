const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult =
  | { success: true; skipped?: boolean }
  | { success: false; reason: string };

/**
 * Verifies a Cloudflare Turnstile token against the siteverify endpoint.
 *
 * Dev behaviour: if TURNSTILE_SECRET is unset AND NODE_ENV !== "production",
 * verification is skipped (returns success) so local dev isn't blocked.
 * In production with the secret unset, verification hard-fails so the
 * protection isn't silently disabled.
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  remoteIp?: string
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { success: false, reason: "Turnstile not configured on server." };
    }
    return { success: true, skipped: true };
  }

  if (!token || typeof token !== "string" || token.length < 10) {
    return { success: false, reason: "Missing or invalid challenge token." };
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const resp = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body: form,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!resp.ok) {
      return { success: false, reason: "Challenge verification upstream error." };
    }
    const data = (await resp.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success === true) {
      return { success: true };
    }
    const codes = Array.isArray(data["error-codes"]) ? data["error-codes"].join(",") : "unknown";
    return { success: false, reason: `Challenge failed (${codes}).` };
  } catch (err) {
    return {
      success: false,
      reason: err instanceof Error && err.name === "AbortError"
        ? "Challenge verification timed out."
        : "Challenge verification failed.",
    };
  }
}
