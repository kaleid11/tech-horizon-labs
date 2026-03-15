import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Calendar, FileText, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

export default function Academy() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.academy} />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">AI Training for Australian SMEs</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tech Horizon<br />
              <span className="text-salmon-500">Academy</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong>TL;DR:</strong> Practical, up-to-date AI systems you can deploy now—for operators who want to stay ahead without the research overhead. 1,300+ tested workflows, weekly live workshops, Australian compliance mapped.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
                <a href="https://academy.techhorizonlabs.com" target="_blank" rel="noopener noreferrer">
                  Visit the Academy <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">1,300+</div>
                <div className="text-sm text-gray-400">Templates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">300+</div>
                <div className="text-sm text-gray-400">SEQ Operators</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Weekly</div>
                <div className="text-sm text-gray-400">Live Workshops</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">100%</div>
                <div className="text-sm text-gray-400">AU Compliance</div>
              </div>
            </div>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "Learn", href: "/resources" },
          { label: "Academy" },
        ]} />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                Two Ways to Work With Us
              </h2>
              <p className="text-lg text-gray-600">
                <strong>Done-for-you consulting</strong> (this site) or <strong>done-with-you training</strong> (Academy). Different needs, different solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-aubergine-900 mb-4">Tech Horizon Labs</h3>
                <p className="text-gray-600 mb-6">
                  <strong>Done-for-you AI consulting.</strong> We build private, production-ready AI systems for your specific business needs.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>Custom AI systems built for your business</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>Private, on-premises implementation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>4-week implementation sprints</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>Ongoing partnership available</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-500 mb-4">Best for: Businesses needing custom solutions</p>
                <Button variant="outline" className="w-full rounded-full" asChild>
                  <a href="/services/audit">Explore Consulting Services</a>
                </Button>
              </div>

              <div className="bg-salmon-50 rounded-2xl p-8 border-2 border-salmon-200">
                <h3 className="text-xl font-bold text-aubergine-900 mb-4">Tech Horizon Academy</h3>
                <p className="text-gray-600 mb-6">
                  <strong>Done-with-you AI training.</strong> Learn to deploy AI workflows yourself with our templates, workshops, and community.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>1,300+ production-ready templates</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>Weekly live workshops (Tue/Thu/Fri)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>300+ SEQ operator community</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <span>Australian compliance pre-mapped</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-500 mb-4">Best for: Teams learning AI themselves</p>
                <Button className="w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full" asChild>
                  <a href="https://academy.techhorizonlabs.com" target="_blank" rel="noopener noreferrer">
                    Visit the Academy <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
              What's Inside the Academy
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <FileText className="h-8 w-8 text-salmon-500 mb-4" />
                <h3 className="font-bold text-aubergine-900 mb-2">1,300+ Templates</h3>
                <p className="text-gray-600 text-sm">
                  Production-ready workflows organized by industry. Copy-paste and deploy today.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Calendar className="h-8 w-8 text-salmon-500 mb-4" />
                <h3 className="font-bold text-aubergine-900 mb-2">Weekly Workshops</h3>
                <p className="text-gray-600 text-sm">
                  Live sessions every week: What's New (Tue 10am), Deep Dives (Thu 2pm), Q&A (Fri 4pm AEST).
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Users className="h-8 w-8 text-salmon-500 mb-4" />
                <h3 className="font-bold text-aubergine-900 mb-2">300+ Operators</h3>
                <p className="text-gray-600 text-sm">
                  SEQ business operators sharing workflows, asking questions, and celebrating wins together.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-salmon-500 mb-4" />
                <h3 className="font-bold text-aubergine-900 mb-2">AU Compliance</h3>
                <p className="text-gray-600 text-sm">
                  Every template mapped to Australian regulations: Privacy Act, NDIS, industry-specific requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
                The Academy Difference
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-2">Practical, Not Theoretical</h3>
                    <p className="text-gray-600">
                      No "AI for beginners" courses. No 12-week certification programs. Week 1: Get templates. Week 2: Deploy workflows. Week 3: Optimize.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-2">Up-to-Date, Not Frozen</h3>
                    <p className="text-gray-600">
                      AI tools change weekly. When DeepSeek launches at $0.55/million tokens, you have the template by Friday. Living platform, not a frozen course from 2024.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-salmon-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-aubergine-900 mb-2">Australian, Not American</h3>
                    <p className="text-gray-600">
                      Brisbane-Noosa-Gold Coast references. Local compliance focus. Peer community of Queensland business operators, not Silicon Valley startups.
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
              Ready to Stay Ahead Without the Research Overhead?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join 300+ SEQ operators who are deploying AI workflows every week. Templates, workshops, community—$97-$300/month.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
              <a href="https://academy.techhorizonlabs.com" target="_blank" rel="noopener noreferrer">
                Explore the Academy <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              academy.techhorizonlabs.com • Separate from consulting services
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
