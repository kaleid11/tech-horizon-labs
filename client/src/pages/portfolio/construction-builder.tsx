import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { PageSEO } from "@/components/seo/page-seo";
import { HardHat, Clock, Shield, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can AI help construction businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI can dramatically reduce admin time in construction. One Sunshine Coast construction director went from spending 2 days processing invoices and timesheets to just 1 hour — set up in only 2 hours. AI also enables offline quoting on job sites, eliminates calculation errors, and frees up weekends previously lost to paperwork."
      }
    },
    {
      "@type": "Question",
      "name": "Can AI work offline on construction sites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We build offline-first AI solutions that run on tablets without internet connectivity. The system syncs data when a connection is available, so your team can generate accurate quotes and process documents right from remote job sites."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to implement AI for a construction company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Foundation Sprint delivers a working AI solution in 4 weeks. One construction director was fully set up and saving time within 2 hours of the initial deployment. We focus on fast, practical implementation — not months of consulting."
      }
    },
    {
      "@type": "Question",
      "name": "What results can construction companies expect from AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Real results from our clients include: 60% faster quote generation, zero quoting errors, 100% offline capability, and a construction director reducing invoice and timesheet processing from 2 days to 1 hour. Results vary by business but are consistently measurable."
      }
    }
  ]
};

export default function ConstructionBuilderCaseStudy() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO
        title="AI for Construction | Builder Case Study"
        description="Construction director went from 2 days processing invoices and timesheets to 1 hour. Setup took 2 hours. See how AI transforms construction businesses on the Sunshine Coast."
        canonical="https://techhorizonlabs.com/portfolio/construction-builder"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Link href="/portfolio" data-testid="link-back-portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-salmon-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <HardHat className="h-8 w-8 text-salmon-400" />
              </div>
              <div>
                <div className="text-sm text-salmon-400 font-medium mb-2">
                  Construction • Sunshine Coast
                </div>
                <h1 data-testid="heading-casestudy-title" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  AI for Construction: Builder Accelerates Sales Cycle with Offline AI
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700 max-w-2xl">
              <div>
                <div className="text-3xl font-bold text-salmon-500">60%</div>
                <div className="text-sm text-gray-400">Faster quote generation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">100%</div>
                <div className="text-sm text-gray-400">Offline capability</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">0</div>
                <div className="text-sm text-gray-400">Quoting errors</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                <div>
                  <h2 className="font-bold text-2xl text-aubergine-900 mb-4 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-gray-400" />
                    The Challenge
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    A successful Sunshine Coast builder was losing valuable evenings and weekends creating complex quotes. Their process was slow, prone to errors, and couldn't be done on-site without an internet connection.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full mt-2 flex-shrink-0"></span>
                      Complex quotes taking 2-3 hours each to prepare
                    </li>
                    <li className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full mt-2 flex-shrink-0"></span>
                      Frequent errors in calculations leading to margin loss
                    </li>
                    <li className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full mt-2 flex-shrink-0"></span>
                      Unable to generate quotes on remote job sites without internet
                    </li>
                    <li className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full mt-2 flex-shrink-0"></span>
                      Owner sacrificing family time to catch up on admin
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-bold text-2xl text-aubergine-900 mb-4 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-gray-400" />
                    Our Solution
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    The Automation Accelerator we delivered was a custom quoting app that runs entirely offline on their team's tablets. It uses an AI model to generate complex, accurate proposals in minutes, right from the worksite.
                  </p>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">Offline-First Architecture</h4>
                      <p className="text-sm text-gray-600">Custom app runs on tablets without internet, syncs when connected.</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">AI-Powered Estimation</h4>
                      <p className="text-sm text-gray-600">Local AI model trained on their historical pricing data for accuracy.</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">Instant PDF Generation</h4>
                      <p className="text-sm text-gray-600">Professional branded quotes generated and emailed in under a minute.</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">Material Cost Integration</h4>
                      <p className="text-sm text-gray-600">Live pricing from suppliers ensures accurate material estimates.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-bold text-2xl text-aubergine-900 mb-4 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    The Results
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                      <div className="text-3xl font-bold text-green-600">60%</div>
                      <div className="text-sm text-gray-600">Faster quote generation</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                      <div className="text-3xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-600">Offline capability</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                      <div className="text-3xl font-bold text-green-600">0</div>
                      <div className="text-sm text-gray-600">Quoting errors</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-salmon-50 to-salmon-100 rounded-xl p-8 border border-salmon-200">
                  <h3 className="font-bold text-xl text-aubergine-900 mb-3" data-testid="heading-academy-metric">
                    Real Result from Tech Horizon Academy
                  </h3>
                  <p className="text-lg text-aubergine-800 leading-relaxed">
                    A construction director who completed our Academy training went from <strong className="text-salmon-600">2 days processing invoices and timesheets to just 1 hour</strong>. The entire setup took <strong className="text-salmon-600">2 hours</strong>. This is a real outcome from a real business operator — not a hypothetical.
                  </p>
                </div>

                <blockquote className="bg-aubergine-50 rounded-xl p-8 border-l-4 border-salmon-500">
                  <p className="text-aubergine-800 italic leading-relaxed text-xl mb-4">
                    "I used to spend my Sundays doing quotes. Now I generate them on-site in 10 minutes. My family got their weekends back."
                  </p>
                  <footer className="text-gray-600 font-medium">
                    — Owner, Sunshine Coast Building Company
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Quoting Process?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Book a free 15-minute discovery call. We'll identify your highest-impact automation opportunity and give you honest advice.
            </p>
            <Button data-testid="button-casestudy-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
