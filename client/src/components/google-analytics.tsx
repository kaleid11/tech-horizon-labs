import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

const GA_MEASUREMENT_ID = "G-TN1HR73SJH";

export function GoogleAnalytics() {
  const { consent } = useCookieConsent();
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Standard gtag function — pushes arguments into dataLayer
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }

    // Expose globally for gtag.js script
    if (!window.gtag) {
      window.gtag = gtag;
    }

    // Set default consent to denied (Consent Mode v2)
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    if (consent === "all") {
      // Update consent to granted
      gtag("consent", "update", {
        analytics_storage: "granted",
      });

      // Load gtag.js script if not already loaded
      if (!scriptRef.current) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);
        scriptRef.current = script;

        gtag("js", new Date());
        gtag("config", GA_MEASUREMENT_ID, {
          anonymize_ip: true,
          send_page_view: true,
        });
      }
    } else if (consent === "essential" && scriptRef.current) {
      // User revoked consent — remove script
      scriptRef.current.remove();
      scriptRef.current = null;
    }
  }, [consent]);

  return null;
}
