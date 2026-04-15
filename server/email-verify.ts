import dns from "dns";

const KNOWN_GOOD_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "yahoo.com.au",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "fastmail.com",
  "zoho.com",
  "ymail.com",
  "msn.com",
  "bigpond.com",
  "bigpond.net.au",
  "optusnet.com.au",
  "internode.on.net",
  "iinet.net.au",
  "tpg.com.au",
  "dodo.com.au",
  "ozemail.com.au",
]);

const mxCache = new Map<string, { valid: boolean; expires: number }>();
const MX_CACHE_TTL = 1000 * 60 * 30;

function extractDomain(email: string): string | null {
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const domain = parts[1].toLowerCase().trim();
  if (!domain || !domain.includes(".")) return null;
  return domain;
}

function lookupMx(domain: string): Promise<boolean> {
  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
}

export async function verifyEmailDomain(email: string): Promise<{ valid: boolean; reason?: string }> {
  if (!email || typeof email !== "string") {
    return { valid: false, reason: "Email is required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, reason: "This email address does not appear to be valid." };
  }

  const domain = extractDomain(email);
  if (!domain) {
    return { valid: false, reason: "This email address does not appear to be valid." };
  }

  if (KNOWN_GOOD_DOMAINS.has(domain)) {
    return { valid: true };
  }

  const cached = mxCache.get(domain);
  if (cached && cached.expires > Date.now()) {
    if (!cached.valid) {
      return { valid: false, reason: "This email address does not appear to be valid." };
    }
    return { valid: true };
  }

  try {
    const hasMx = await lookupMx(domain);
    mxCache.set(domain, { valid: hasMx, expires: Date.now() + MX_CACHE_TTL });

    if (!hasMx) {
      return { valid: false, reason: "This email address does not appear to be valid." };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: "Unable to verify this email address. Please try again." };
  }
}
