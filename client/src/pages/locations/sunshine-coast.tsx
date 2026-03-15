import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { MapPin, Clock, CheckCircle2, Building2, Users, TrendingUp, Calendar } from "lucide-react";
import { Link } from "wouter";
import { LocationSchema } from "@/components/seo/location-schema";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

const sunshineCoastFaqs = [
  {
    question: "Do you offer on-site AI consultations on the Sunshine Coast?",
    answer: "Yes, we're based right here on the Sunshine Coast. For local businesses, we offer in-person discovery meetings, on-site implementation support, and face-to-face training sessions. We typically work with clients from Noosa to Caloundra and everywhere in between."
  },
  {
    question: "What does private AI mean for my Sunshine Coast business?",
    answer: "Private AI means your sensitive data—client financials, patient records, business intelligence—never leaves your premises. The AI runs on your own computers or Australian-hosted infrastructure. This is critical for compliance with Australian privacy laws and builds trust with your local client base."
  },
  {
    question: "How much does AI consulting cost on the Sunshine Coast?",
    answer: "Our AI Opportunity Audit is free. 15 minutes to identify your highest-impact automation opportunity. Implementation projects typically start at $5,000 for a focused 4-week sprint. We're transparent about pricing because hidden costs waste everyone's time."
  }
];

export default function SunshineCoastLocation() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.locations.sunshineCoast} />
      <LocationSchema
        location="Sunshine Coast"
        description="Sunshine Coast-based AI consulting. Local expertise, enterprise-grade AI infrastructure for Sunshine Coast businesses."
        faqs={sunshineCoastFaqs}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Our Home Base</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Consulting<br />
              <span className="text-salmon-500">Sunshine Coast</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>TL;DR:</strong> We're based right here on the Sunshine Coast. Local business, local expertise, production-ready AI systems that keep your data in Queensland.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button data-testid="button-sc-book-discovery" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Discovery Call
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8" asChild>
                <Link href="/portfolio">View Local Case Studies</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">40%</div>
                <div className="text-sm text-gray-400">Admin Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">60%</div>
                <div className="text-sm text-gray-400">Faster Quotes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">4 Week</div>
                <div className="text-sm text-gray-400">Implementation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">100%</div>
                <div className="text-sm text-gray-400">Data Privacy</div>
              </div>
            </div>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "About", href: "/about" },
          { label: "Locations", href: "/locations/queensland" },
          { label: "Sunshine Coast" },
        ]} />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                Why Sunshine Coast Businesses Choose Local AI Consulting
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  <strong>Answer first:</strong> Because we understand your market, we're a 15-minute drive away. And we build systems that keep sensitive client data on Australian soil.
                </p>
                
                <p>
                  The Sunshine Coast is growing fast. From Caloundra to Noosa, local businesses are facing the same challenge: how to compete with bigger players who have bigger budgets and bigger teams.
                </p>
                
                <p>
                  AI is the great equalizer—but only if it's implemented right. That means:
                </p>
                
                <ul>
                  <li><strong>Private AI systems</strong> that run on your own infrastructure (critical for accountants, lawyers, healthcare providers)</li>
                  <li><strong>Offline capability</strong> for builders and tradies who work on-site without reliable internet</li>
                  <li><strong>Australian compliance</strong> baked in from day one (Privacy Act 1988, industry-specific regulations)</li>
                </ul>
                
                <p>
                  We've helped Noosa accounting firms cut admin by 40%, Sunshine Coast builders generate quotes 60% faster, and local healthcare clinics automate patient communications while keeping data 100% private.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h3 className="text-xl font-bold text-aubergine-900 mb-4">Sunshine Coast Industries We Serve</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Accounting & Finance",
                    "Construction & Trades",
                    "Real Estate",
                    "Healthcare & Allied Health",
                    "Tourism & Hospitality",
                    "Professional Services"
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

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
              Sunshine Coast Case Studies
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Noosa Accounting Firm</h3>
                    <p className="text-sm text-gray-500">Professional Services</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Automated client document processing and intake workflow with private, on-device AI. Sensitive financial data never leaves their office.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>40% reduction in admin time</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Sunshine Coast Builder</h3>
                    <p className="text-sm text-gray-500">Construction</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Custom offline quoting app with AI-powered proposal generation. Works without internet on-site, generates complex quotes in minutes.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>60% faster quote generation</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/portfolio">View All Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Talk AI for Your Sunshine Coast Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute discovery call. No sales pitch. Just honest conversation about whether AI makes sense for your specific situation.
            </p>
            <Button data-testid="button-sc-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
              </a>
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Based in Sunshine Coast • Serving Noosa, Maroochydore, Caloundra, Buderim & surrounds
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center">
              Frequently Asked Questions - Sunshine Coast AI Consulting
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Do you offer on-site consultations on the Sunshine Coast?</h3>
                <p className="text-gray-600">
                  Yes, we're based right here. For local Sunshine Coast businesses, we offer in-person discovery meetings, on-site implementation support, and face-to-face training sessions. We typically work with clients from Noosa to Caloundra and everywhere in between.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">What does private AI mean for my Sunshine Coast business?</h3>
                <p className="text-gray-600">
                  Private AI means your sensitive data—client financials, patient records, business intelligence—never leaves your premises. The AI runs on your own computers or Australian-hosted infrastructure. This is critical for compliance with Australian privacy laws and builds trust with your local client base.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">How much does AI consulting cost on the Sunshine Coast?</h3>
                <p className="text-gray-600">
                  Our AI Opportunity Audit is free. 15 minutes to identify your highest-impact automation opportunity. Implementation projects typically start at $5,000 for a focused 4-week sprint. We're transparent about pricing because hidden costs waste everyone's time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">Case Studies</a>
                <a href="/services/audit" className="text-salmon-600 hover:text-salmon-700 underline">Free AI Assessment</a>
                <a href="/contact" className="text-salmon-600 hover:text-salmon-700 underline">Contact Us</a>
                <a href="/locations/queensland" className="text-salmon-600 hover:text-salmon-700 underline">All Queensland</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
