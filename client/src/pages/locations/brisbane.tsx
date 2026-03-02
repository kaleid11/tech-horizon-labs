import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { MapPin, CheckCircle2, Building2, Factory, Briefcase, TrendingUp, Calendar, ArrowRight, Cpu, Users, Shield } from "lucide-react";
import { Link } from "wouter";
import { LocationSchema } from "@/components/seo/location-schema";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

const brisbaneFaqs = [
  {
    question: "Do you work with Brisbane businesses remotely?",
    answer: "Yes. While we're based on the Sunshine Coast, Brisbane is just an hour away. We work with Brisbane clients through a mix of remote collaboration and on-site visits as needed. Most implementation work happens remotely with regular check-ins. We regularly meet clients in Brisbane CBD, South Bank, and Fortitude Valley."
  },
  {
    question: "How does AI help Brisbane manufacturers?",
    answer: "The biggest wins for Brisbane manufacturers are predictive maintenance (reducing unexpected downtime by 30%+), quality control automation, and supply chain optimization. One Brisbane manufacturer saved $50K+ annually with our predictive maintenance system. These systems run on your own infrastructure, keeping proprietary data secure."
  },
  {
    question: "What's the difference between your approach and big consulting firms?",
    answer: "We're not here to sell you a 6-month discovery phase. Our 4-week Automation Accelerator delivers a working AI system. Not a PowerPoint deck. We're built for Brisbane SMEs, not enterprise clients with unlimited budgets."
  },
  {
    question: "What does an AI consultant in Brisbane actually do?",
    answer: "We assess your business processes, identify the highest-impact automation opportunities, and build private AI systems that run on Australian infrastructure. For Brisbane businesses, this typically means automating admin tasks, predictive maintenance for manufacturers, document processing for professional services, or AI-powered quoting for construction firms. Everything is Privacy Act 1988 compliant."
  },
  {
    question: "How much does AI consulting cost for a Brisbane business?",
    answer: "Our AI Readiness Assessment is free — a 15-minute discovery call to identify your best opportunities. Implementation starts with our 4-week Foundation Sprint. We provide fixed quotes after discovery so there are no surprises. Most Brisbane SMEs see 3-5x ROI within 12 months."
  },
  {
    question: "Can you help Brisbane businesses comply with the Privacy Act when using AI?",
    answer: "Absolutely. Privacy compliance is built into everything we do. We deploy private AI infrastructure that keeps your data on Australian servers. No data leaves the country. This is especially critical for Brisbane's healthcare, legal, and financial services sectors where data privacy isn't optional."
  },
  {
    question: "What industries do you serve in Brisbane?",
    answer: "We work with Brisbane manufacturers, construction companies, professional services firms (accounting, legal, consulting), healthcare providers, real estate agencies, and logistics companies. Our AI solutions are tailored to each industry's specific workflows and compliance requirements."
  },
  {
    question: "Is there an AI development company in Brisbane that works with small businesses?",
    answer: "Yes — that's exactly what Tech Horizon Labs is built for. Most AI development companies target enterprise clients with six-figure budgets. We specialise in practical AI for Brisbane SMEs with 5-50 employees. Real systems, real results, without the enterprise price tag."
  }
];

export default function BrisbaneLocation() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.locations.brisbane} />
      <LocationSchema
        location="Brisbane"
        description="AI consulting and AI solutions for Brisbane businesses. Private AI infrastructure, Privacy Act compliant, serving Brisbane CBD, South Bank, Fortitude Valley and all SEQ. 4-week implementation sprints."
        faqs={brisbaneFaqs}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Brisbane, Queensland</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Consulting &<br />AI Solutions for<br />
              <span className="text-salmon-500">Brisbane Business</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              Brisbane manufacturers cutting downtime by 30%. Professional services firms slashing admin by 40%. Construction directors saving 2 days per week on invoices. We build private, production-ready AI systems for Brisbane SMEs — without the enterprise price tag.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button data-testid="button-bne-book-discovery" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Discovery Call
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8" asChild>
                <Link href="/portfolio/manufacturing">See Brisbane Case Study</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="stat-bne-operators">300+</div>
                <div className="text-sm text-gray-400">SEQ Operators</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="stat-bne-downtime">30%</div>
                <div className="text-sm text-gray-400">Less Downtime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="stat-bne-implementation">4 Week</div>
                <div className="text-sm text-gray-400">Implementation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="stat-bne-hosted">100%</div>
                <div className="text-sm text-gray-400">Australian Hosted</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                AI Implementation for Brisbane Businesses
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  Brisbane's economy is built on manufacturing, professional services, construction, and logistics — industries where AI delivers immediate, measurable ROI when implemented correctly. From Brisbane CBD's professional services hub to the manufacturing districts of the south side, businesses across Greater Brisbane are adopting AI to stay competitive.
                </p>
                
                <p>
                  The challenge? Most AI solutions are designed for Sydney or Melbourne enterprises with IT departments and six-figure budgets. Brisbane SMEs need something different: practical AI that works for businesses with 5-50 employees.
                </p>
                
                <p>
                  That's what we build. Production-ready AI systems that:
                </p>
                
                <ul>
                  <li><strong>Run on Australian infrastructure</strong> — no data leaving the country</li>
                  <li><strong>Work with your existing systems</strong> — we integrate, not replace</li>
                  <li><strong>Deliver results in weeks, not months</strong> — 4-week implementation sprints</li>
                  <li><strong>Scale with you</strong> — from single workflow to enterprise-wide transformation</li>
                  <li><strong>Comply with the Privacy Act 1988</strong> — built-in, not bolted on</li>
                </ul>
                
                <p>
                  We've helped a Brisbane manufacturer reduce machine downtime by 30% with predictive maintenance AI (saving $50K+ annually), professional services firms cut admin by 40%, and construction companies cut invoice processing from 2 days to 1 hour.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h3 className="text-xl font-bold text-aubergine-900 mb-4">Brisbane Industries We Serve</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Manufacturing & Logistics",
                    "Professional Services",
                    "Construction & Property",
                    "Healthcare & Medical",
                    "Financial Services",
                    "Government & Education",
                    "Legal & Consulting",
                    "Real Estate & Property Management",
                    "Retail & E-Commerce"
                  ].map((industry) => (
                    <div key={industry} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-salmon-500 flex-shrink-0" />
                      <span>{industry}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-cream-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-4 text-center">
                Brisbane Business Districts We Serve
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                From the CBD to the outer suburbs, we work with Brisbane businesses wherever they operate. On-site visits available across Greater Brisbane and South East Queensland.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-salmon-100 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="h-5 w-5 text-salmon-600" />
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">Brisbane CBD & South Bank</h3>
                  <p className="text-gray-600 text-sm">
                    Professional services, financial firms, and corporate headquarters. AI-powered document processing, client intake automation, and compliance workflows.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">Fortitude Valley & Newstead</h3>
                  <p className="text-gray-600 text-sm">
                    Tech startups, creative agencies, and growing businesses. AI workflow automation, content generation, and customer service systems.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Factory className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">South Side & Industrial</h3>
                  <p className="text-gray-600 text-sm">
                    Manufacturing, logistics, and construction businesses. Predictive maintenance AI, supply chain optimization, and automated quoting systems.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">North Brisbane & Northside</h3>
                  <p className="text-gray-600 text-sm">
                    Healthcare clinics, dental practices, and allied health providers. Private AI for patient management, appointment automation, and clinical documentation — fully HIPAA and Privacy Act compliant.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">Greater Brisbane & SEQ</h3>
                  <p className="text-gray-600 text-sm">
                    Ipswich, Logan, Redlands, Moreton Bay. Construction firms, real estate agencies, and trade businesses. AI quoting tools, tenant onboarding automation, and invoice processing systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-4 text-center">
                What AI Can Do for Brisbane Businesses
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Practical AI applications delivering measurable ROI for Brisbane industries. Not theoretical — these are systems we've built and deployed.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-gray-200 rounded-2xl p-6 hover:border-salmon-300 transition-colors">
                  <h3 className="font-bold text-aubergine-900 mb-3 flex items-center gap-2">
                    <Factory className="h-5 w-5 text-salmon-500" />
                    AI for Brisbane Manufacturers
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Predictive maintenance — reduce unplanned downtime by 30%+
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Quality control automation with computer vision
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Supply chain optimization and demand forecasting
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Private systems — all data stays on-premises
                    </li>
                  </ul>
                  <Link href="/portfolio/manufacturing" className="inline-flex items-center gap-1 text-salmon-600 font-medium text-sm mt-4 hover:text-salmon-700">
                    Read Brisbane Manufacturing Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 hover:border-salmon-300 transition-colors">
                  <h3 className="font-bold text-aubergine-900 mb-3 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-salmon-500" />
                    AI for Professional Services
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Document processing and data extraction
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Client intake automation — 40% less admin time
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Compliance checking and regulatory workflows
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Strict data privacy — no data leaves your office
                    </li>
                  </ul>
                  <Link href="/portfolio/accounting-firm" className="inline-flex items-center gap-1 text-salmon-600 font-medium text-sm mt-4 hover:text-salmon-700">
                    Read Accounting Firm Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 hover:border-salmon-300 transition-colors">
                  <h3 className="font-bold text-aubergine-900 mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-salmon-500" />
                    AI for Construction & Property
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Invoice processing: 2 days → 1 hour
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Automated quoting — 60% faster, zero errors
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Offline AI that works on-site without internet
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Tenant onboarding and lease automation
                    </li>
                  </ul>
                  <Link href="/portfolio/construction-builder" className="inline-flex items-center gap-1 text-salmon-600 font-medium text-sm mt-4 hover:text-salmon-700">
                    Read Construction Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 hover:border-salmon-300 transition-colors">
                  <h3 className="font-bold text-aubergine-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-salmon-500" />
                    AI for Healthcare & Allied Health
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Patient appointment automation — 50% fewer no-shows
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Clinical documentation and note-taking
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      100% private — zero patient data exposure
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Privacy Act 1988 compliant by design
                    </li>
                  </ul>
                  <Link href="/portfolio/healthcare-clinic" className="inline-flex items-center gap-1 text-salmon-600 font-medium text-sm mt-4 hover:text-salmon-700">
                    Read Healthcare Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4">
              Brisbane & SEQ Case Studies
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Real Brisbane businesses, real AI implementations, real measurable results. Every project delivered using our proven 4-week Foundation Sprint.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Brisbane Manufacturer</h3>
                    <p className="text-sm text-gray-500">Manufacturing • South Brisbane</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Predictive maintenance AI monitors equipment in real-time, predicting failures before they happen. Private system runs on-premises. Saving $50K+ annually.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <span>30% reduced downtime</span>
                </div>
                <Link href="/portfolio/manufacturing" className="inline-flex items-center gap-1 text-sm text-salmon-600 font-medium hover:text-salmon-700">
                  Full case study <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Professional Services</h3>
                    <p className="text-sm text-gray-500">Legal & Consulting • Brisbane CBD</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Document processing and client intake automation with strict data privacy. All processing happens on local infrastructure. Team now focuses on advisory work.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <span>40% admin reduction</span>
                </div>
                <Link href="/portfolio/accounting-firm" className="inline-flex items-center gap-1 text-sm text-salmon-600 font-medium hover:text-salmon-700">
                  Full case study <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Property Developer</h3>
                    <p className="text-sm text-gray-500">Real Estate • Greater Brisbane</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Automated tenant onboarding, lease generation, and compliance checking. 100% accurate, 100% compliant. Processing 3x more applications.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <span>80% faster onboarding</span>
                </div>
                <Link href="/portfolio/real-estate-agency" className="inline-flex items-center gap-1 text-sm text-salmon-600 font-medium hover:text-salmon-700">
                  Full case study <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/portfolio">View All Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-4 text-center">
                How We Work with Brisbane Businesses
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Our proven 3-step process delivers working AI systems in 4 weeks. Not a PowerPoint deck — a production system your team can use immediately.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-salmon-600">1</span>
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">Free Readiness Assessment</h3>
                  <p className="text-gray-600 text-sm">
                    15-minute discovery call to identify your highest-impact automation opportunity. We'll assess your data readiness and give honest advice on whether AI is right for you.
                  </p>
                  <Link href="/services/audit" className="inline-flex items-center gap-1 text-salmon-600 font-medium text-sm mt-3 hover:text-salmon-700">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-salmon-600">2</span>
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">4-Week Foundation Sprint</h3>
                  <p className="text-gray-600 text-sm">
                    Build and deploy your private AI system. Working solution on Australian infrastructure. Team trained to use it. Privacy Act compliant from day one.
                  </p>
                  <Link href="/services/accelerator" className="inline-flex items-center gap-1 text-salmon-600 font-medium text-sm mt-3 hover:text-salmon-700">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-salmon-600">3</span>
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">Ongoing Evolution</h3>
                  <p className="text-gray-600 text-sm">
                    Continuous partnership keeping your AI infrastructure current as tools advance. Quarterly roadmap reviews, priority support, new systems added.
                  </p>
                  <Link href="/services/partner" className="inline-flex items-center gap-1 text-salmon-600 font-medium text-sm mt-3 hover:text-salmon-700">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore AI for Your Brisbane Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute discovery call. We'll identify your highest-impact automation opportunity and give you honest advice about whether AI is the right solution.
            </p>
            <Button data-testid="button-bne-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
              </a>
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Serving Brisbane CBD, South Bank, Fortitude Valley, Newstead, and all Greater Brisbane & SEQ suburbs
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center">
              Frequently Asked Questions — AI Consulting Brisbane
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {brisbaneFaqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6" data-testid={`faq-brisbane-${index}`}>
                  <h3 className="font-bold text-aubergine-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-cream-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-aubergine-900 mb-4">
                Learn AI Skills with Tech Horizon Academy
              </h2>
              <p className="text-gray-600 mb-6">
                Not ready for consulting? Join 300+ Queensland business operators in the Tech Horizon Academy. 1,300+ tested AI workflows, weekly workshops, and a community of Brisbane and SEQ business owners learning to deploy AI themselves.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-6" asChild>
                  <Link href="/academy">Explore the Academy</Link>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/resources">Free AI Resources</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
