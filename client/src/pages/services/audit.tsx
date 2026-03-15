import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Search, Clock, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

export default function AuditService() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.services.audit} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Readiness Assessment",
            "description": "Free 15-minute AI readiness assessment. Identify your highest-impact opportunities and understand your data readiness for AI implementation.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tech Horizon Labs",
              "@id": "https://techhorizonlabs.com/#organization"
            },
            "areaServed": "Queensland, Australia",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "AUD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <Search className="h-5 w-5" />
              <span className="text-sm font-medium">Step 1 of 3</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Opportunity<br />
              <span className="text-salmon-500">Audit</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>TL;DR:</strong> Free 15-minute call. We identify your highest-impact AI opportunity — and tell you honestly whether it's worth pursuing.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-audit-book">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Audit
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">Free</div>
                <div className="text-sm text-gray-400">No Cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">15 min</div>
                <div className="text-sm text-gray-400">Duration</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">1</div>
                <div className="text-sm text-gray-400">Clear Opportunity</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">0</div>
                <div className="text-sm text-gray-400">Obligation</div>
              </div>
            </div>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "Services", href: "/services/audit" },
          { label: "Readiness Assessment" },
        ]} />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                What Happens During the Audit
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">You Tell Us About Your Business</h3>
                    <p className="text-gray-600">
                      What you do, where you're spending time on repetitive tasks, what's frustrating your team. 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">We Identify the Opportunity</h3>
                    <p className="text-gray-600">
                      Based on what we've seen work for similar Queensland businesses, we pinpoint your highest-impact automation opportunity. 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">Honest Next Steps</h3>
                    <p className="text-gray-600">
                      If AI is the right fit, we'll explain what implementation looks like. If it's not, we'll tell you that too. No hard sell. 5 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
              Who This Is For
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-aubergine-900 mb-4 text-lg">Good Fit ✓</h3>
                <ul className="space-y-3">
                  {[
                    "Queensland SME with 5-50 employees",
                    "Spending significant time on repetitive admin",
                    "Handling sensitive data (client records, financials)",
                    "Open to automation but unsure where to start",
                    "Want to understand AI without the hype"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-aubergine-900 mb-4 text-lg">Not Right For</h3>
                <ul className="space-y-3">
                  {[
                    "Businesses looking for free consulting",
                    "Companies that need a solution delivered overnight",
                    "Organisations not willing to invest in proper foundations",
                    "Businesses outside Australia"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-500">
                      <span className="text-gray-400 mt-0.5">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your AI Opportunity?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15 minutes. Zero cost. No obligation. Pick a time that works for you.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-audit-cta-book">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Audit Now
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
                <div className="flex flex-wrap gap-4">
                  <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
                  <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">Case Studies</a>
                  <a href="/audit-tool" className="text-salmon-600 hover:text-salmon-700 underline">Self-Assessment Tool</a>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center mt-16">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Is this really free?</h3>
                <p className="text-gray-600">
                  Yes. The AI Opportunity Audit is a genuine 15-minute discovery call with no cost and no obligation. We use it to understand if there's a good fit before proposing any paid work.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">What if AI isn't right for my business?</h3>
                <p className="text-gray-600">
                  We'll tell you. Honestly. If AI doesn't make sense for your situation, we'd rather say that upfront than waste your time and ours. We might suggest alternatives or recommend you revisit in 6-12 months.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">What happens after the audit?</h3>
                <p className="text-gray-600">
                  If we identify a good opportunity and you want to proceed, the next step is our Automation Accelerator—a 4-week sprint to build and deploy your first AI system. But there's no pressure to continue.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
