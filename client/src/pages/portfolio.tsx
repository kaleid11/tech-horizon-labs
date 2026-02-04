import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Building2, HardHat, Home, Factory, Heart, Clock, Shield, Calendar } from "lucide-react";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

const caseStudies = [
  {
    id: "accounting-firm",
    title: "Noosa Accounting Firm Cuts Admin by 40%",
    industry: "Professional Services",
    location: "Noosa, Sunshine Coast",
    icon: Building2,
    challenge: "A Noosa-based accounting firm was drowning in manual data entry and a time-consuming client onboarding process. Their team was spending more time on paperwork than on high-value advisory work.",
    solution: "We built an Automation Accelerator that deployed a private, on-device AI to process client documents and automate the entire intake workflow. The system is 100% secure, meaning sensitive financial data never leaves their office.",
    results: [
      { metric: "40%", label: "Admin time reduction" },
      { metric: "100%", label: "Data stays on-premises" },
      { metric: "4 weeks", label: "Implementation time" }
    ],
    testimonial: "We went from spending half our day on data entry to focusing on what we're actually good at—advising clients. The AI handles the grunt work now."
  },
  {
    id: "construction-builder",
    title: "Builder Accelerates Sales Cycle with Offline AI",
    industry: "Construction",
    location: "Sunshine Coast",
    icon: HardHat,
    challenge: "A successful Sunshine Coast builder was losing valuable evenings and weekends creating complex quotes. Their process was slow, prone to errors, and couldn't be done on-site without an internet connection.",
    solution: "The Automation Accelerator we delivered was a custom quoting app that runs entirely offline on their team's tablets. It uses an AI model to generate complex, accurate proposals in minutes, right from the worksite.",
    results: [
      { metric: "60%", label: "Faster quote generation" },
      { metric: "100%", label: "Offline capability" },
      { metric: "0", label: "Quoting errors" }
    ],
    testimonial: "I used to spend my Sundays doing quotes. Now I generate them on-site in 10 minutes. My family got their weekends back."
  },
  {
    id: "real-estate-agency",
    title: "Agency Automates Tenant Onboarding Workflow",
    industry: "Real Estate",
    location: "Noosa, Sunshine Coast",
    icon: Home,
    challenge: "A growing real estate agency in Noosa struggled with the high volume of repetitive paperwork and communication needed to onboard new tenants. The process was slow for their staff and frustrating for applicants.",
    solution: "Our Automation Accelerator streamlined the entire process. The new system automatically processes applications, generates lease agreements, and handles routine communication, ensuring 100% compliance and a better experience for everyone.",
    results: [
      { metric: "80%", label: "Faster onboarding" },
      { metric: "100%", label: "Compliance rate" },
      { metric: "3x", label: "More applications processed" }
    ],
    testimonial: "Tenant applications that used to take days now take hours. Our property managers can focus on relationships, not paperwork."
  },
  {
    id: "manufacturing",
    title: "Manufacturer Reduces Machine Downtime by 30%",
    industry: "Manufacturing",
    location: "Brisbane, Queensland",
    icon: Factory,
    challenge: "A Brisbane-based manufacturer was struggling with unpredictable and costly production halts due to unexpected equipment failures. Unplanned downtime was costing them thousands every week.",
    solution: "We delivered an Automation Accelerator that integrated sensors with a private AI model. The system now monitors equipment performance in real-time and predicts potential failures before they happen, allowing the team to perform maintenance proactively.",
    results: [
      { metric: "30%", label: "Reduced downtime" },
      { metric: "$50K+", label: "Annual savings" },
      { metric: "Real-time", label: "Monitoring" }
    ],
    testimonial: "We used to wait for things to break. Now we know a week in advance when something needs attention. Game changer for production planning."
  },
  {
    id: "healthcare-clinic",
    title: "Allied Health Clinic Guarantees Patient Privacy with AI",
    industry: "Healthcare",
    location: "Sunshine Coast",
    icon: Heart,
    challenge: "A busy allied health clinic needed to automate their patient appointment reminders and follow-up communication but was rightly concerned about patient privacy. Standard cloud-based AI tools posed an unacceptable risk to their sensitive data.",
    solution: "Our Automation Accelerator runs entirely on the clinic's local server. It intelligently manages their appointment schedule, sends personalised reminders, and handles post-visit follow-ups without any patient data ever leaving their control.",
    results: [
      { metric: "100%", label: "Data stays on-premises" },
      { metric: "50%", label: "Fewer no-shows" },
      { metric: "0", label: "Privacy concerns" }
    ],
    testimonial: "Patient privacy isn't optional for us—it's everything. This system lets us use AI without any compromise. Our patients trust us, and we can keep that trust."
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.portfolio} />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Proof, Not<br />
              <span className="text-salmon-500">Promises</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>TL;DR:</strong> Real Queensland businesses. Real AI implementations. Real, measurable results. No theoretical case studies—every project here is a partnership we've delivered.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">40%</div>
                <div className="text-sm text-gray-400">Avg. Admin Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">60%</div>
                <div className="text-sm text-gray-400">Faster Quotes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">30%</div>
                <div className="text-sm text-gray-400">Less Downtime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">100%</div>
                <div className="text-sm text-gray-400">Data Privacy</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {caseStudies.map((study, index) => (
                <article 
                  key={study.id} 
                  id={study.id}
                  className={`${index > 0 ? 'pt-16 mt-16 border-t border-gray-200' : ''}`}
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <study.icon className="h-6 w-6 text-salmon-600" />
                    </div>
                    <div>
                      <div className="text-sm text-salmon-600 font-medium mb-1">
                        {study.industry} • {study.location}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-aubergine-900" itemProp="headline">
                        {study.title}
                      </h2>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {study.results.map((result, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-salmon-600">{result.metric}</div>
                        <div className="text-sm text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="font-bold text-aubergine-900 mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                        The Challenge
                      </h3>
                      <p className="text-gray-600 leading-relaxed" itemProp="description">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-aubergine-900 mb-2 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-gray-400" />
                        Our Solution
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  <blockquote className="bg-aubergine-50 rounded-xl p-6 border-l-4 border-salmon-500">
                    <p className="text-aubergine-800 italic leading-relaxed">
                      "{study.testimonial}"
                    </p>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4">
              Our Process in Action
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Every case study above followed our proven 3-step pathway. Here's how we deliver results in 4 weeks.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-salmon-600">1</span>
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">AI Opportunity Audit</h3>
                <p className="text-gray-600 text-sm">
                  15-minute discovery call to identify your highest-impact automation opportunity. Free, no obligation.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-salmon-600">2</span>
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Automation Accelerator</h3>
                <p className="text-gray-600 text-sm">
                  4-week sprint to build and deploy your private AI system. Working solution, not a PowerPoint deck.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-salmon-600">3</span>
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Transformation Partner</h3>
                <p className="text-gray-600 text-sm">
                  Ongoing partnership for continuous optimization. Quarterly roadmap reviews, priority support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Become Our Next Case Study?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute discovery call. We'll identify your highest-impact automation opportunity and give you honest advice about whether AI is the right solution for your business.
            </p>
            <Button data-testid="button-portfolio-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
              </a>
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Based in Sunshine Coast • Serving Brisbane, Gold Coast, and all of Queensland
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
