import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Users, CheckCircle2, Calendar, TrendingUp, Shield, Headphones } from "lucide-react";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

export default function PartnerService() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.services.partner} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ongoing Evolution",
            "description": "Continuous AI partnership keeping your infrastructure current as tools and capabilities advance. Quarterly roadmap reviews, priority support, and continuous optimization.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tech Horizon Labs",
              "@id": "https://techhorizonlabs.com/#organization"
            },
            "areaServed": "Queensland, Australia"
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
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Step 3 of 3</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transformation<br />
              <span className="text-salmon-500">Partner</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>Your fractional AI department.</strong> We find the next bottleneck, fix it, train your team, and keep your business evolving. Quarterly roadmaps, priority support, continuous optimization.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-partner-book">
                  <Calendar className="mr-2 h-5 w-5" />
                  Discuss Partnership
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">Quarterly</div>
                <div className="text-sm text-gray-400">Roadmap Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Priority</div>
                <div className="text-sm text-gray-400">Support Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Ongoing</div>
                <div className="text-sm text-gray-400">Optimization</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Long-term</div>
                <div className="text-sm text-gray-400">Partnership</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                Beyond One-Off Projects
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  <strong>Answer first:</strong> The Transformation Partner program is for businesses who've completed an Automation Accelerator and want ongoing support to expand their AI capabilities.
                </p>
                
                <p>
                  AI isn't a one-and-done project. The tools change weekly. New opportunities emerge. Your business evolves. The Partnership ensures you stay ahead without dedicating internal resources to AI research.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <TrendingUp className="h-10 w-10 text-salmon-500 mx-auto mb-4" />
                  <h3 className="font-bold text-aubergine-900 mb-2">Quarterly Roadmap</h3>
                  <p className="text-gray-600 text-sm">
                    Strategic planning sessions to identify next automation opportunities
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Headphones className="h-10 w-10 text-salmon-500 mx-auto mb-4" />
                  <h3 className="font-bold text-aubergine-900 mb-2">Priority Support</h3>
                  <p className="text-gray-600 text-sm">
                    Direct access for questions, issues, and optimization requests
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Shield className="h-10 w-10 text-salmon-500 mx-auto mb-4" />
                  <h3 className="font-bold text-aubergine-900 mb-2">Proactive Updates</h3>
                  <p className="text-gray-600 text-sm">
                    We monitor AI developments and proactively suggest improvements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
              What's Included
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="space-y-4">
                  {[
                    "Quarterly AI roadmap review and planning sessions",
                    "Priority support with 24-hour response time",
                    "Monthly system health checks and optimization",
                    "Proactive AI tool and workflow recommendations",
                    "Discounted rates on additional Accelerator projects",
                    "Early access to new templates and workflows",
                    "Annual compliance review and updates",
                    "Dedicated account manager"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-salmon-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6 text-center">
                How to Become a Partner
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">Complete an Automation Accelerator</h3>
                    <p className="text-gray-600">
                      Partnership is available to businesses who've worked with us on at least one implementation project.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">Discuss Your Goals</h3>
                    <p className="text-gray-600">
                      We'll explore your long-term AI vision and how the Partnership can support your growth.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">Begin the Partnership</h3>
                    <p className="text-gray-600">
                      Start with your first quarterly roadmap session and ongoing support access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Long-Term AI Partnership?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Start with a free AI Opportunity Audit. If we're a good fit, we can discuss the full pathway from Accelerator to Partnership.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-partner-cta-book">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Audit
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
