import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Zap, Clock, CheckCircle2, Calendar } from "lucide-react";
import { Link } from "wouter";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

export default function AcceleratorService() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.services.accelerator} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Foundation Sprint",
            "description": "4-week implementation sprint to build your AI-ready knowledge base and deploy private infrastructure. Working solution in weeks, not months.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tech Horizon Labs",
              "@id": "https://techhorizonlabs.com/#organization"
            },
            "areaServed": "Queensland, Australia",
            "offers": {
              "@type": "Offer",
              "price": "5000",
              "priceCurrency": "AUD",
              "availability": "https://schema.org/InStock"
            }
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
              <Zap className="h-5 w-5" />
              <span className="text-sm font-medium">Step 2 of 3</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automation<br />
              <span className="text-salmon-500">Accelerator</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>One bottleneck. One fix. Four weeks.</strong> We identify the right problem, build the right solution — private infrastructure, Australian compliance, working system — not a PowerPoint deck.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-accelerator-book">
                  <Calendar className="mr-2 h-5 w-5" />
                  Start With Free Audit
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">$5K+</div>
                <div className="text-sm text-gray-400">Starting Price</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">4 weeks</div>
                <div className="text-sm text-gray-400">Timeline</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">1</div>
                <div className="text-sm text-gray-400">Working System</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">100%</div>
                <div className="text-sm text-gray-400">Private & Secure</div>
              </div>
            </div>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "Services", href: "/services/audit" },
          { label: "Foundation Sprint" },
        ]} />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                The 4-Week Sprint
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-16 text-center flex-shrink-0">
                    <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-salmon-600">1</span>
                    </div>
                    <div className="text-xs text-gray-500">Week 1</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">Discovery & Architecture</h3>
                    <p className="text-gray-600">
                      Deep dive into your workflow, data sources, and compliance requirements. We design the system architecture and define success metrics.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 text-center flex-shrink-0">
                    <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-salmon-600">2-3</span>
                    </div>
                    <div className="text-xs text-gray-500">Week 2-3</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">Build & Integration</h3>
                    <p className="text-gray-600">
                      We build your AI system—private infrastructure, Australian-hosted, integrated with your existing tools. Regular check-ins to ensure alignment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 text-center flex-shrink-0">
                    <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-salmon-600">4</span>
                    </div>
                    <div className="text-xs text-gray-500">Week 4</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-1">Testing & Deployment</h3>
                    <p className="text-gray-600">
                      Thorough testing with real data, team training, and production deployment. You leave with a working system and documentation.
                    </p>
                  </div>
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Private AI Infrastructure", desc: "On-premises or Australian-hosted—your data never leaves your control" },
                { title: "Custom Integration", desc: "Connected to your existing tools (CRM, accounting, email, etc.)" },
                { title: "Compliance Mapping", desc: "Privacy Act 1988 and industry-specific regulations built in" },
                { title: "Team Training", desc: "Your staff knows how to use and maintain the system" },
                { title: "Documentation", desc: "Complete technical and user documentation" },
                { title: "30-Day Support", desc: "Post-deployment support to ensure smooth operation" }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-salmon-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-aubergine-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                Proven Results
              </h2>
              <p className="text-gray-600 mb-12">
                Real outcomes from Queensland businesses who completed the Automation Accelerator.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold text-salmon-600 mb-2">40%</div>
                  <div className="text-sm text-gray-600">Admin reduction (accounting firm)</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-salmon-600 mb-2">60%</div>
                  <div className="text-sm text-gray-600">Faster quotes (builder)</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-salmon-600 mb-2">30%</div>
                  <div className="text-sm text-gray-600">Less downtime (manufacturer)</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-salmon-600 mb-2">80%</div>
                  <div className="text-sm text-gray-600">Faster onboarding (real estate)</div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/portfolio">View All Case Studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Accelerate Your AI Implementation?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Start with a free AI Opportunity Audit to identify your highest-impact automation opportunity.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-accelerator-cta-book">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Audit First
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
