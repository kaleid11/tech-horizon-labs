import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Settings, Database, Building, Briefcase, ShoppingBag, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export function Results() {
  const cases = [
    {
      icon: Building,
      company: "Manufacturing, Brisbane",
      problem: "Unpredictable equipment failures causing costly production halts",
      solution: "Predictive maintenance with IoT sensors + private AI",
      result: "30% reduced downtime = $50K+ annual savings",
      color: "bg-blue-100 text-blue-700",
      link: "/portfolio/manufacturing"
    },
    {
      icon: Briefcase,
      company: "Accounting Firm, Noosa",
      problem: "Half the day spent on manual data entry instead of advisory work",
      solution: "Private on-device AI for document processing",
      result: "40% admin reduction, 100% data privacy",
      color: "bg-purple-100 text-purple-700",
      link: "/portfolio/accounting-firm"
    },
    {
      icon: ShoppingBag,
      company: "Construction, Sunshine Coast",
      problem: "Complex quotes taking hours, couldn't work offline on-site",
      solution: "Offline AI quoting app on tablets",
      result: "60% faster quotes, zero errors",
      color: "bg-green-100 text-green-700",
      link: "/portfolio/construction-builder"
    }
  ];

  return (
    <section id="results" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-aubergine-900 mb-4">Real Businesses. Real Results.</h2>
            <p className="text-lg text-gray-600">We don't deal in theoreticals. Here's what happens when you fix the infrastructure first.</p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" className="rounded-full border-aubergine-900 text-aubergine-900 hover:bg-aubergine-50">
              View All Case Studies
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, i) => (
            <div key={i} className="group border border-gray-100 p-8 rounded-2xl hover:border-salmon-300 transition-all flex flex-col h-full bg-cream-50 hover:shadow-lg">
              <div className={`w-14 h-14 ${item.color} flex items-center justify-center mb-6 rounded-xl group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-aubergine-900 mb-2">{item.company}</h3>
              
              <div className="space-y-6 mb-8 flex-grow">
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">The Problem</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.problem}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="text-xs font-semibold text-salmon-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Settings className="w-3 h-3" /> The Solution
                  </div>
                  <p className="text-sm text-gray-700">{item.solution}</p>
                </div>
                <div className="pt-2">
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1 flex items-center gap-2">
                     <Check className="w-3 h-3" /> The Result
                  </div>
                  <p className="font-bold text-aubergine-900 text-lg">{item.result}</p>
                </div>
              </div>

              <Link href={item.link}>
                <Button variant="link" className="p-0 h-auto justify-start text-salmon-600 hover:text-salmon-700 group-hover:translate-x-1 transition-all font-semibold">
                  Read Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="py-24 bg-aubergine-900 text-white relative overflow-hidden">
      {/* Clean gradient background for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-aubergine-800/50 via-transparent to-salmon-500/5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="bg-salmon-500 text-aubergine-900 hover:bg-salmon-400 mb-6">OUR METHODOLOGY</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Infrastructure First.<br/>Automation Second.</h2>
          <p className="text-gray-300 text-lg">We refuse to build fragile systems. Our 3-step process ensures your AI implementation is secure, scalable, and actually useful.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-gray-700 via-salmon-500/50 to-gray-700 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-aubergine-800 border border-salmon-500/30 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-black/50 group-hover:border-salmon-500 transition-colors">
              <Database className="w-10 h-10 text-salmon-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Foundation</h3>
            <ul className="space-y-3 text-gray-400 text-sm mb-8 text-left inline-block">
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> AI Opportunity Audit</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Security protocols</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Data cleaning & org</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-white/10 w-full max-w-[200px]">
              <p className="text-xs text-salmon-400 uppercase tracking-widest mb-1">Timeline</p>
              <p className="font-bold text-white">2-4 weeks</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-aubergine-800 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-black/50 group-hover:border-white/30 transition-colors">
              <Settings className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Implementation</h3>
            <ul className="space-y-3 text-gray-400 text-sm mb-8 text-left inline-block">
              <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500" /> Build automation system</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500" /> API integrations</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500" /> Team training</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-white/10 w-full max-w-[200px]">
              <p className="text-xs text-blue-400 uppercase tracking-widest mb-1">Timeline</p>
              <p className="font-bold text-white">4-8 weeks</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-aubergine-800 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-black/50 group-hover:border-white/30 transition-colors">
              <FileText className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Scale</h3>
            <ul className="space-y-3 text-gray-400 text-sm mb-8 text-left inline-block">
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Ongoing optimization</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> New systems added</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Priority support</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-white/10 w-full max-w-[200px]">
              <p className="text-xs text-green-400 uppercase tracking-widest mb-1">Timeline</p>
              <p className="font-bold text-white">Ongoing</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Button size="lg" className="bg-white text-aubergine-900 hover:bg-gray-100 font-bold text-lg px-8 h-14 rounded-full">
            Start With An Audit
          </Button>
        </div>
      </div>
    </section>
  );
}
