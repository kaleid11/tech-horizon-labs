import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Users, CheckCircle2, Calendar, TrendingUp, Shield, Headphones, GraduationCap, Layers } from "lucide-react";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

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
                <div className="text-3xl font-bold text-salmon-500">Weekly</div>
                <div className="text-sm text-gray-400">Strategy Sessions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Flexible</div>
                <div className="text-sm text-gray-400">Work Credits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Academy</div>
                <div className="text-sm text-gray-400">Platform Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Phased</div>
                <div className="text-sm text-gray-400">Project Delivery</div>
              </div>
            </div>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "Services", href: "/services/audit" },
          { label: "Ongoing Evolution" },
        ]} />

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

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <TrendingUp className="h-10 w-10 text-salmon-500 mx-auto mb-4" />
                  <h3 className="font-bold text-aubergine-900 mb-2">Weekly Strategy</h3>
                  <p className="text-gray-600 text-sm">
                    Weekly 30-minute strategy sessions plus quarterly deep-dive roadmap reviews
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Layers className="h-10 w-10 text-salmon-500 mx-auto mb-4" />
                  <h3 className="font-bold text-aubergine-900 mb-2">Flexible Credits</h3>
                  <p className="text-gray-600 text-sm">
                    Monthly work credits to mix development, consulting, and support hours as needed
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <GraduationCap className="h-10 w-10 text-salmon-500 mx-auto mb-4" />
                  <h3 className="font-bold text-aubergine-900 mb-2">Academy Access</h3>
                  <p className="text-gray-600 text-sm">
                    Full Tech Horizon Academy platform access for your entire team
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Shield className="h-10 w-10 text-salmon-500 mx-auto mb-4" />
                  <h3 className="font-bold text-aubergine-900 mb-2">Phased Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Structured project milestones with clear checkpoints — not open-ended timelines
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
                    "Weekly 30-minute strategy sessions with quarterly deep-dive reviews",
                    "Monthly flexible work credits — mix development, consulting, and support",
                    "Full Tech Horizon Academy platform access for your team",
                    "Priority async support with next-business-day response",
                    "Phased project delivery with structured milestones and checkpoints",
                    "Monthly system health checks and optimization",
                    "Proactive AI tool and workflow recommendations",
                    "Annual compliance review and updates",
                    "Dedicated account manager",
                    "Discounted rates on additional build projects"
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
                <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">Case Studies</a>
                <a href="/academy" className="text-salmon-600 hover:text-salmon-700 underline">AI Academy</a>
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
