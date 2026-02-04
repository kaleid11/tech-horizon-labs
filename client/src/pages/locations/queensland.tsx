import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { MapPin, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import { LocationSchema } from "@/components/seo/location-schema";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

const queenslandFaqs = [
  {
    question: "What makes you different from other AI consultants in Queensland?",
    answer: "We're the 'anti-hype' firm. No buzzwords, no 6-month discovery phases, no enterprise pricing. We build practical AI systems for SMEs with 5-50 employees. Our 4-week Automation Accelerator delivers a working system, not a PowerPoint deck."
  },
  {
    question: "Do you work with regional Queensland businesses?",
    answer: "Yes. Our remote collaboration model works for businesses anywhere in Queensland. Plus, our AI systems are designed to work offline—critical for regional areas with unreliable internet. We've worked with clients from Cairns to the Darling Downs."
  },
  {
    question: "How do you ensure Australian data compliance?",
    answer: "All our AI systems are designed with Australian compliance built in. We use Australian-hosted infrastructure, implement Privacy Act 1988 requirements, and map industry-specific regulations (healthcare, financial services, etc.) into every solution. Your data never leaves Australian soil."
  }
];

export default function QueenslandLocation() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.locations.queensland} />
      <LocationSchema
        location="Queensland"
        description="Enterprise AI consulting across Queensland. Private infrastructure, compliant by design, serving Brisbane, Gold Coast, Sunshine Coast and regional QLD."
        faqs={queenslandFaqs}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">State-Wide Coverage</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Consulting<br />
              <span className="text-salmon-500">Queensland</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>TL;DR:</strong> Queensland's anti-hype AI consulting firm. We build private, production-ready AI systems for Australian SMEs—from the Sunshine Coast to the Outback.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button data-testid="button-qld-book-discovery" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Discovery Call
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">300+</div>
                <div className="text-sm text-gray-400">QLD Operators</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">1,300+</div>
                <div className="text-sm text-gray-400">Templates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">4 Week</div>
                <div className="text-sm text-gray-400">Implementation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">100%</div>
                <div className="text-sm text-gray-400">Australian Hosted</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                Why Queensland Businesses Need Local AI Expertise
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  <strong>Answer first:</strong> Queensland's economy is different from Sydney or Melbourne. Our industries—construction, mining services, agriculture, tourism, healthcare—have unique requirements that generic AI solutions don't address.
                </p>
                
                <p>
                  We're the "anti-hype AI consulting firm" because we focus on what actually works for Queensland businesses:
                </p>
                
                <ul>
                  <li><strong>Private AI systems</strong>—your data stays in Queensland, not Silicon Valley</li>
                  <li><strong>Offline capability</strong>—essential for regional and remote operations</li>
                  <li><strong>Australian compliance</strong>—Privacy Act, industry regulations, all mapped</li>
                  <li><strong>Practical implementation</strong>—4 weeks to production, not 6 months of discovery</li>
                </ul>
                
                <p>
                  <strong>Key statistic:</strong> Queensland SMEs using private AI systems report 40% reduction in administrative workload and 60% faster quote generation—without compromising data security.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4">
              AI Consulting Across Queensland
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Based on the Sunshine Coast, serving all of QLD. Click below to learn more about our services in your area.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Link href="/locations/sunshine-coast">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-aubergine-900">Sunshine Coast</h3>
                    <ArrowRight className="h-5 w-5 text-salmon-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Our home base. Noosa, Maroochydore, Caloundra, Buderim and surrounds.
                  </p>
                  <div className="text-sm text-salmon-600 font-medium">
                    On-site consultations available
                  </div>
                </div>
              </Link>

              <Link href="/locations/brisbane">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-aubergine-900">Brisbane</h3>
                    <ArrowRight className="h-5 w-5 text-salmon-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Queensland's capital. CBD, South Bank, inner suburbs and greater SEQ.
                  </p>
                  <div className="text-sm text-salmon-600 font-medium">
                    Remote + periodic on-site
                  </div>
                </div>
              </Link>

              <Link href="/locations/gold-coast">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-aubergine-900">Gold Coast</h3>
                    <ArrowRight className="h-5 w-5 text-salmon-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Tourism and hospitality hub. Surfers Paradise, Broadbeach, and beyond.
                  </p>
                  <div className="text-sm text-salmon-600 font-medium">
                    Remote + periodic on-site
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-aubergine-900 mb-4">Regional Queensland</h3>
                <p className="text-gray-600 mb-6">
                  We work with businesses across regional QLD through remote collaboration. Our offline-capable AI systems are particularly valuable for regional operations where internet connectivity is unreliable.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Toowoomba",
                    "Cairns",
                    "Townsville",
                    "Rockhampton",
                    "Mackay",
                    "Gladstone",
                    "Bundaberg",
                    "Hervey Bay"
                  ].map((city) => (
                    <div key={city} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-salmon-500 flex-shrink-0" />
                      <span className="text-sm">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
              Queensland Industries We Serve
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Construction & Trades",
                  description: "Offline quoting, project management, safety compliance automation",
                  result: "60% faster quotes"
                },
                {
                  title: "Professional Services",
                  description: "Document processing, client intake, compliance workflows",
                  result: "40% admin reduction"
                },
                {
                  title: "Healthcare & Allied Health",
                  description: "Patient communication, scheduling, privacy-compliant AI",
                  result: "100% data privacy"
                },
                {
                  title: "Manufacturing",
                  description: "Predictive maintenance, quality control, supply chain optimization",
                  result: "30% less downtime"
                },
                {
                  title: "Real Estate & Property",
                  description: "Tenant onboarding, lease automation, compliance checking",
                  result: "80% faster processing"
                },
                {
                  title: "Agriculture & Mining Services",
                  description: "Remote operations, offline capability, logistics optimization",
                  result: "Works without internet"
                }
              ].map((industry) => (
                <div key={industry.title} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-2">{industry.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{industry.description}</p>
                  <div className="text-salmon-600 font-medium text-sm">{industry.result}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore AI for Your Queensland Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute discovery call. We'll identify your highest-impact automation opportunity and give you honest advice—no sales pitch.
            </p>
            <Button data-testid="button-qld-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center">
              Frequently Asked Questions - AI QLD
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">What makes you different from other AI consultants in Queensland?</h3>
                <p className="text-gray-600">
                  We're the "anti-hype" firm. No buzzwords, no 6-month discovery phases, no enterprise pricing. We build practical AI systems for SMEs with 5-50 employees. Our 4-week Automation Accelerator delivers a working system, not a PowerPoint deck.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Do you work with regional Queensland businesses?</h3>
                <p className="text-gray-600">
                  Yes. Our remote collaboration model works for businesses anywhere in Queensland. Plus, our AI systems are designed to work offline—critical for regional areas with unreliable internet. We've worked with clients from Cairns to the Darling Downs.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">How do you ensure Australian data compliance?</h3>
                <p className="text-gray-600">
                  All our AI systems are designed with Australian compliance built in. We use Australian-hosted infrastructure, implement Privacy Act 1988 requirements, and map industry-specific regulations (healthcare, financial services, etc.) into every solution. Your data never leaves Australian soil.
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
