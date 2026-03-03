import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "thl-cookie-consent";

export type ConsentState = "all" | "essential" | null;

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "all" || stored === "essential") return stored;
      return null;
    } catch {
      return null;
    }
  });

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const val = e.newValue;
        if (val === "all" || val === "essential") setConsent(val);
        else setConsent(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const acceptAll = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "all");
    } catch {}
    setConsent("all");
  }, []);

  const rejectNonEssential = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
    } catch {}
    setConsent("essential");
  }, []);

  return {
    consent,
    acceptAll,
    rejectNonEssential,
    hasConsented: consent !== null,
  };
}
