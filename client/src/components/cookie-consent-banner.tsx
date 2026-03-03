import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Cookie } from "lucide-react";

export function CookieConsentBanner() {
  const { consent, acceptAll, rejectNonEssential } = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-aubergine-900/95 backdrop-blur-md border border-aubergine-700/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie className="h-6 w-6 text-salmon-400 flex-shrink-0 hidden sm:block" aria-hidden="true" />
            <div className="flex-1 text-sm text-gray-300">
              <p>
                We use cookies to analyse site traffic and improve your experience.
                Essential cookies are always active.
                See our{" "}
                <a
                  href="/privacy"
                  className="text-salmon-400 hover:text-salmon-300 underline"
                >
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={rejectNonEssential}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg hover:bg-aubergine-800 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold bg-salmon-500 text-aubergine-900 rounded-lg hover:bg-salmon-400 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
