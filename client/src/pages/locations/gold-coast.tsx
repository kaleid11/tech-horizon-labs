import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { MapPin, CheckCircle2, Hotel, Building2, Users, TrendingUp, Calendar } from "lucide-react";
import { Link } from "wouter";
import { LocationSchema } from "@/components/seo/location-schema";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

const goldCoastFaqs = [
  {
    question: "Do you work with seasonal businesses on the Gold Coast?",
    answer: "Absolutely. Many Gold Coast hospitality and tourism businesses have seasonal peaks. Our AI systems scale with your demand—handling high-volume periods efficiently while keeping costs reasonable during quieter times."
  },
  {
    question: "How do you handle multi-language requirements?",
    answer: "Our AI systems support multiple languages out of the box. For Gold Coast tourism businesses serving international visitors, we configure guest communication in Mandarin, Japanese, Korean, German, French, and more—all while keeping data private and secure."
  },
  {
    question: "Can AI integrate with our existing booking system?",
    answer: "Yes. We integrate with major hospitality platforms including property management systems, channel managers, and booking engines. The goal is to enhance your existing workflow, not replace it entirely."
  }
];

export default function GoldCoastLocation() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.locations.goldCoast} />
      <LocationSchema
        location="Gold Coast"
        description="AI consulting services on the Gold Coast. Private infrastructure, compliant systems for Gold Coast enterprises."
        faqs={goldCoastFaqs}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Tourism & Business Hub</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Consulting<br />
              <span className="text-salmon-500">Gold Coast</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>TL;DR:</strong> Gold Coast hospitality, tourism, and real estate businesses are automating faster than ever. We build private AI systems that handle the repetitive work while you focus on guests and clients.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button data-testid="button-gc-book-discovery" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Discovery Call
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8" asChild>
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">40%</div>
                <div className="text-sm text-gray-400">Admin Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">24/7</div>
                <div className="text-sm text-gray-400">Guest Response</div>
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
          { label: "Gold Coast" },
        ]} />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                AI for Gold Coast's Tourism & Hospitality Industry
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  <strong>Answer first:</strong> The Gold Coast runs on service. Hotels, restaurants, tour operators, and property managers all face the same challenge: delivering exceptional experiences while managing ever-increasing admin.
                </p>
                
                <p>
                  AI is transforming how Gold Coast businesses operate:
                </p>
                
                <ul>
                  <li><strong>24/7 guest communication</strong>—AI handles enquiries while your team sleeps</li>
                  <li><strong>Booking and reservation automation</strong>—reduce no-shows, optimize capacity</li>
                  <li><strong>Property management workflows</strong>—tenant screening, lease processing, maintenance requests</li>
                  <li><strong>Multi-language support</strong>—serve international visitors in their language</li>
                </ul>
                
                <p>
                  The key difference? We build <strong>private AI systems</strong> that keep guest and client data secure. No sending sensitive information to overseas servers.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h3 className="text-xl font-bold text-aubergine-900 mb-4">Gold Coast Industries We Serve</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Hotels & Resorts",
                    "Tour Operators",
                    "Real Estate & Property",
                    "Restaurants & Hospitality",
                    "Healthcare & Wellness",
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
              Gold Coast Use Cases
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Hotel className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Hotel & Resort</h3>
                    <p className="text-sm text-gray-500">Hospitality</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  AI concierge handles guest enquiries 24/7 in multiple languages. Integrates with booking systems for seamless reservations.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>40% fewer front desk calls</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Property Manager</h3>
                    <p className="text-sm text-gray-500">Real Estate</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Automated tenant screening, lease generation, and maintenance request handling. Holiday rental management automation.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>80% faster tenant processing</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Tour Operator</h3>
                    <p className="text-sm text-gray-500">Tourism</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Booking automation, customer follow-up, review collection, and itinerary generation. Multi-language support for international visitors.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>50% more reviews collected</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Automate Your Gold Coast Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute discovery call. We'll identify your highest-impact automation opportunity—no obligation, just honest advice.
            </p>
            <Button data-testid="button-gc-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
              </a>
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Serving Surfers Paradise, Broadbeach, Burleigh, Coolangatta & all Gold Coast
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center">
              Frequently Asked Questions - Gold Coast AI Consulting
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Do you work with seasonal businesses on the Gold Coast?</h3>
                <p className="text-gray-600">
                  Absolutely. Many Gold Coast hospitality and tourism businesses have seasonal peaks. Our AI systems scale with your demand—handling high-volume periods efficiently while keeping costs reasonable during quieter times.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">How do you handle multi-language requirements?</h3>
                <p className="text-gray-600">
                  Our AI systems support multiple languages out of the box. For Gold Coast tourism businesses serving international visitors, we configure guest communication in Mandarin, Japanese, Korean, German, French, and more—all while keeping data private and secure.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Can AI integrate with our existing booking system?</h3>
                <p className="text-gray-600">
                  Yes. We integrate with major hospitality platforms including property management systems, channel managers, and booking engines. The goal is to enhance your existing workflow, not replace it entirely.
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
