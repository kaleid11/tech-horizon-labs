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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Transformation Partner program?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Transformation Partner is a fractional AI ops lead on retainer. You get weekly strategy sessions, monthly flexible work credits, full Academy access for your team, priority async support, and phased project delivery. It's the outcomes of a full-time AI department without the $200K salary."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to complete an Accelerator first?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The Partnership is available to businesses who've worked with us on at least one implementation project (typically the Automation Accelerator). This ensures we understand your systems, workflows, and team before taking on an ongoing role."
                }
              },
              {
                "@type": "Question",
                "name": "How is this different from hiring a full-time AI specialist?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A full-time AI specialist costs $150K-$200K per year plus benefits. Our Partnership gives you a fractional AI ops lead who already knows your systems — at a fraction of that cost. You get weekly strategy calls, flexible work credits, and proactive recommendations as AI tools evolve."
                }
              },
              {
                "@type": "Question",
                "name": "What does the weekly strategy session cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each 30-minute weekly session covers current system performance, new bottleneck identification, AI tool updates relevant to your workflows, and upcoming project priorities. Quarterly deep-dive sessions review the full roadmap and set strategic goals for the next quarter."
                }
              },
              {
                "@type": "Question",
                "name": "Can I cancel the partnership at any time?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The Partnership runs month-to-month after the initial commitment period. We earn your continued business by delivering measurable results, not by locking you into long contracts. Most partners save 20+ hours per week across their team."
                }
              }
            ]
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
              <strong>Your fractional AI ops lead.</strong> We find the next bottleneck, fix it, train your team, and keep your systems evolving. You get the outcomes of a full-time AI department without the $200K salary.
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
                  <strong>Answer first:</strong> The Transformation Partner program is for businesses who've completed an Accelerator and want a fractional AI ops lead on retainer. Someone who knows your systems, spots the next bottleneck, and fixes it before it costs you.
                </p>
                
                <p>
                  AI isn't a one-and-done project. The tools change weekly. New bottlenecks emerge as you grow. The Partnership means you always have an architect on call who knows your workflows inside out.
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
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">What is the Transformation Partner program?</h3>
                <p className="text-gray-600">
                  A fractional AI ops lead on retainer. You get weekly strategy sessions, monthly flexible work credits, full Academy access for your team, priority async support, and phased project delivery. It's the outcomes of a full-time AI department without the $200K salary.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Do I need to complete an Accelerator first?</h3>
                <p className="text-gray-600">
                  Yes. The Partnership is available to businesses who've worked with us on at least one implementation project (typically the <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Automation Accelerator</a>). This ensures we understand your systems before taking on an ongoing role.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">How is this different from hiring a full-time AI specialist?</h3>
                <p className="text-gray-600">
                  A full-time AI specialist costs $150K-$200K per year plus benefits. Our Partnership gives you a fractional AI ops lead who already knows your systems — at a fraction of that cost.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">What does the weekly strategy session cover?</h3>
                <p className="text-gray-600">
                  Each 30-minute session covers current system performance, new bottleneck identification, AI tool updates relevant to your workflows, and upcoming priorities. Quarterly deep-dive sessions review the full roadmap.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Can I cancel the partnership at any time?</h3>
                <p className="text-gray-600">
                  Yes. The Partnership runs month-to-month after the initial commitment period. We earn your continued business by delivering measurable results, not by locking you into long contracts.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
                <a href="/services/audit" className="text-salmon-600 hover:text-salmon-700 underline">Free AI Audit</a>
                <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">Case Studies</a>
                <a href="/assessment" className="text-salmon-600 hover:text-salmon-700 underline">AI Readiness Assessment</a>
                <a href="/academy" className="text-salmon-600 hover:text-salmon-700 underline">AI Academy</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a Fractional AI Ops Lead?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Start with a free audit. If we're a good fit, we'll show you exactly how the pathway from Accelerator to Partnership works. Most partners save 20+ hours per week across their team.
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
