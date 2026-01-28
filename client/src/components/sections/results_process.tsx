import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Settings, Database, Building, Briefcase, ShoppingBag } from "lucide-react";

export function Results() {
  const cases = [
    {
      icon: Building,
      company: "Construction Company, Brisbane",
      problem: "40+ subcontractors, invoices in every format, 6+ hours manual data entry twice/month",
      solution: "Automated invoice processing with Claude + Make.com",
      result: "5 hours saved every 2 weeks = 130 hours/year",
      color: "bg-blue-50 text-blue-700"
    },
    {
      icon: Briefcase,
      company: "Professional Services, Sunshine Coast",
      problem: "Manual client onboarding, 47 emails per client, 3 hours per process",
      solution: "Automated workflow with Skills + templates",
      result: "2.5 hours saved per client × 24/year = 60 hours",
      color: "bg-purple-50 text-purple-700"
    },
    {
      icon: ShoppingBag,
      company: "E-commerce, Gold Coast",
      problem: "Manual inventory updates, 2 hours daily, frequent stockouts",
      solution: "Real-time sync across 3 platforms with automation",
      result: "10 hours/week saved = 520 hours/year",
      color: "bg-emerald-50 text-emerald-700"
    }
  ];

  return (
    <section id="results" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-primary mb-16 text-center">Real Businesses. Real Results.</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, i) => (
            <div key={i} className="border border-gray-100 p-8 hover:border-gray-300 transition-colors flex flex-col h-full bg-white shadow-sm hover:shadow-md">
              <div className={`w-12 h-12 ${item.color} flex items-center justify-center mb-6 rounded-none`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{item.company}</h3>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Problem</div>
                  <p className="text-sm text-gray-600">{item.problem}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Solution</div>
                  <p className="text-sm text-gray-600">{item.solution}</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs font-semibold text-accent-foreground uppercase tracking-wider mb-1">Result</div>
                  <p className="font-bold text-primary">{item.result}</p>
                </div>
              </div>

              <Button variant="link" className="p-0 h-auto justify-start text-primary hover:text-accent-foreground group">
                Read Case Study <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Infrastructure First. Automation Second. Scale Third.</h2>
          <p className="text-blue-100 text-lg">Our proven methodology for sustainable AI adoption.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-blue-800 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-navy-800 border-2 border-accent rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/20">
              <Database className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-accent">Foundation</h3>
            <ul className="space-y-2 text-blue-100 text-sm mb-6">
              <li>AI Opportunity Audit</li>
              <li>Security setup</li>
              <li>Data organization</li>
              <li>Skills creation</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-blue-900 w-full">
              <p className="text-xs text-blue-300 uppercase tracking-widest mb-1">Timeline</p>
              <p className="font-bold">2-4 weeks</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-navy-800 border-2 border-gray-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/20">
              <Settings className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Implementation</h3>
            <ul className="space-y-2 text-blue-100 text-sm mb-6">
              <li>Build automation system</li>
              <li>Integrate with tools</li>
              <li>Test & refine</li>
              <li>Full training</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-blue-900 w-full">
              <p className="text-xs text-blue-300 uppercase tracking-widest mb-1">Timeline</p>
              <p className="font-bold">4-8 weeks</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-navy-800 border-2 border-gray-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/20">
              <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Scale</h3>
            <ul className="space-y-2 text-blue-100 text-sm mb-6">
              <li>Ongoing optimization</li>
              <li>New systems added</li>
              <li>Strategic advisory</li>
              <li>Priority support</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-blue-900 w-full">
              <p className="text-xs text-blue-300 uppercase tracking-widest mb-1">Timeline</p>
              <p className="font-bold">Ongoing</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-yellow-400 font-semibold text-lg px-8 h-14 rounded-none">
            Book Discovery Call
          </Button>
        </div>
      </div>
    </section>
  );
}
