import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { MapPin, CheckCircle2, Building2, Factory, Briefcase, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function BrisbaneLocation() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <Navbar />
      
      <main>
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Queensland's Capital</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Consulting<br />
              <span className="text-salmon-500">Brisbane</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>TL;DR:</strong> Brisbane businesses are moving fast on AI. We help SEQ companies implement private, production-ready AI systems without the enterprise price tag.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <ContactFormDialog>
                <Button data-testid="button-bne-book-discovery" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8">
                  Book Free Discovery Call
                </Button>
              </ContactFormDialog>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8" asChild>
                <Link href="/portfolio">View Brisbane Case Studies</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">300+</div>
                <div className="text-sm text-gray-400">SEQ Operators</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">30%</div>
                <div className="text-sm text-gray-400">Less Downtime</div>
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
                AI Implementation for Brisbane Businesses
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  <strong>Answer first:</strong> Brisbane's economy is built on manufacturing, professional services, and logistics—industries where AI delivers immediate, measurable ROI when implemented correctly.
                </p>
                
                <p>
                  The challenge? Most AI solutions are designed for Sydney or Melbourne enterprises with IT departments and six-figure budgets. Brisbane SMEs need something different: practical AI that works for businesses with 5-50 employees.
                </p>
                
                <p>
                  That's what we build. Production-ready AI systems that:
                </p>
                
                <ul>
                  <li><strong>Run on Australian infrastructure</strong>—no data leaving the country</li>
                  <li><strong>Work with your existing systems</strong>—we integrate, not replace</li>
                  <li><strong>Deliver results in weeks, not months</strong>—4-week implementation sprints</li>
                  <li><strong>Scale with you</strong>—from single workflow to enterprise-wide transformation</li>
                </ul>
                
                <p>
                  We've helped Brisbane manufacturers reduce machine downtime by 30% with predictive maintenance AI, professional services firms cut admin by 40%, and construction companies accelerate their sales cycles.
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
                    "Government & Education"
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
              Brisbane & SEQ Case Studies
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Brisbane Manufacturer</h3>
                    <p className="text-sm text-gray-500">Manufacturing</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Predictive maintenance AI monitors equipment in real-time, predicting failures before they happen. Private system runs on-premises.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>30% reduced downtime</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Professional Services</h3>
                    <p className="text-sm text-gray-500">Legal & Consulting</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Document processing and client intake automation with strict data privacy. All processing happens on local infrastructure.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>40% admin reduction</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-salmon-500" />
                  <div>
                    <h3 className="font-bold text-aubergine-900">Property Developer</h3>
                    <p className="text-sm text-gray-500">Real Estate</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Automated tenant onboarding, lease generation, and compliance checking. 100% accurate, 100% compliant.
                </p>
                <div className="flex items-center gap-2 text-salmon-600 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>80% faster onboarding</span>
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
              Ready to Explore AI for Your Brisbane Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute discovery call. We'll identify your highest-impact automation opportunity and give you honest advice about whether AI is the right solution.
            </p>
            <ContactFormDialog>
              <Button data-testid="button-bne-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8">
                Book Free Discovery Call
              </Button>
            </ContactFormDialog>
            <p className="text-sm text-gray-400 mt-4">
              Serving Brisbane CBD, South Bank, Fortitude Valley, and all SEQ suburbs
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center">
              Frequently Asked Questions - Brisbane AI Consulting
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">Do you work with Brisbane businesses remotely?</h3>
                <p className="text-gray-600">
                  Yes. While we're based on the Sunshine Coast, Brisbane is just an hour away. We work with Brisbane clients through a mix of remote collaboration and on-site visits as needed. Most implementation work happens remotely with regular check-ins.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">How does AI help Brisbane manufacturers?</h3>
                <p className="text-gray-600">
                  The biggest wins for Brisbane manufacturers are predictive maintenance (reducing unexpected downtime by 30%+), quality control automation, and supply chain optimization. These systems run on your own infrastructure, keeping proprietary data secure.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-aubergine-900 mb-2">What's the difference between your approach and big consulting firms?</h3>
                <p className="text-gray-600">
                  We're not here to sell you a 6-month discovery phase. Our 4-week Automation Accelerator delivers a working AI system—not a PowerPoint deck. We're built for Brisbane SMEs, not enterprise clients with unlimited budgets.
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
