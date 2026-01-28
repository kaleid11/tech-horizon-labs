import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Pricing() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-aubergine-900 mb-16 text-center">Transparent Pricing</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-8 bg-white rounded-2xl border border-gray-100 flex flex-col h-full hover:border-salmon-300 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold text-aubergine-900 mb-2">AI Opportunity Audit</h3>
            <div className="text-3xl font-bold mb-6 text-salmon-500">$2,500</div>
            <p className="text-sm text-gray-500 mb-6">The best place to start. Know exactly where your opportunities are.</p>
            <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-700">
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> 2-week engagement</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Workflow analysis</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Security & Data audit</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> ROI projection</li>
            </ul>
            <Button variant="outline" className="w-full border-aubergine-900 text-aubergine-900 hover:bg-aubergine-50 rounded-full">Book Audit</Button>
          </div>

          {/* Card 2 - Featured */}
          <div className="p-8 bg-aubergine-900 text-white rounded-2xl border-2 border-salmon-500 flex flex-col h-full relative shadow-xl transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-salmon-500 text-aubergine-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
            <h3 className="text-lg font-bold mb-2 text-salmon-100">Automation Accelerator</h3>
            <div className="text-3xl font-bold mb-6 text-white">$10K - $25K</div>
            <p className="text-sm text-gray-300 mb-6">For businesses ready to build a specific system.</p>
            <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-300">
              <li className="flex gap-3"><Check className="w-4 h-4 text-salmon-500 shrink-0 mt-0.5" /> 4-8 week project</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-salmon-500 shrink-0 mt-0.5" /> One core system built</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-salmon-500 shrink-0 mt-0.5" /> Full API integration</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-salmon-500 shrink-0 mt-0.5" /> Team training (4 hours)</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-salmon-500 shrink-0 mt-0.5" /> 30-day support</li>
            </ul>
            <Button className="w-full bg-salmon-500 text-aubergine-900 hover:bg-salmon-600 rounded-full font-bold">Book Discovery</Button>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white rounded-2xl border border-gray-100 flex flex-col h-full hover:border-salmon-300 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold text-aubergine-900 mb-2">Transformation Partner</h3>
            <div className="text-3xl font-bold mb-6 text-aubergine-900">From $5K<span className="text-base font-normal text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-500 mb-6">Your external AI department.</p>
            <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-700">
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> 3-month minimum</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Continuous optimization</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> New implementations</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Strategic advisory</li>
            </ul>
            <Button variant="outline" className="w-full border-aubergine-900 text-aubergine-900 hover:bg-aubergine-50 rounded-full">Book Discovery</Button>
          </div>

          {/* Card 4 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col h-full hover:border-salmon-300 transition-all">
            <h3 className="text-lg font-bold text-aubergine-900 mb-2">Quick Support</h3>
            <div className="text-3xl font-bold mb-6 text-gray-600">$150<span className="text-base font-normal text-gray-500">/hr</span></div>
            <p className="text-sm text-gray-500 mb-6">Expert help when you get stuck.</p>
            <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-600">
              <li className="flex gap-3"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 4-hour minimum</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> For Academy members</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> Same-week availability</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> Hands-on debugging</li>
            </ul>
            <Button variant="ghost" className="w-full rounded-full hover:bg-gray-200">Academy Members →</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Academy() {
  return (
    <section id="academy" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-aubergine-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-salmon-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="pr-0 md:pr-8 md:border-r border-white/10">
              <h3 className="text-3xl font-bold mb-4">Not Ready for Consulting?</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Start learning for free at Tech Horizon Academy. Join 800+ members in weekly workshops on Claude, Skills, and automation.
              </p>
              <ul className="space-y-3 mb-8 text-sm font-medium text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-salmon-500 rounded-full"></div> Free tier available
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-salmon-500 rounded-full"></div> No consulting pressure
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-salmon-500 rounded-full"></div> Weekly live workshops
                </li>
              </ul>
              <Button variant="outline" className="w-full md:w-auto rounded-full border-white text-white hover:bg-white/10 px-8">
                Join Free Workshop →
              </Button>
            </div>
            
            <div className="pl-0 md:pl-4">
              <Badge className="bg-salmon-500 text-aubergine-900 hover:bg-salmon-400 mb-4">BEST VALUE</Badge>
              <h3 className="text-3xl font-bold mb-4 text-salmon-100">Hybrid Path</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Combine Academy + Consulting. You learn the principles, we build the systems. Academy members get 15% off consulting services.
              </p>
              <Button className="w-full md:w-auto bg-salmon-500 text-aubergine-900 rounded-full hover:bg-salmon-600 font-bold px-8 shadow-lg shadow-salmon-500/20">
                Book Hybrid Discovery →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
