import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-primary mb-16 text-center">Transparent Pricing</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 border border-gray-200 flex flex-col h-full hover:border-primary transition-colors">
            <h3 className="text-lg font-bold text-primary mb-2">AI Opportunity Audit</h3>
            <div className="text-3xl font-bold mb-6">$2,500</div>
            <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-600">
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 2-week engagement</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Workflow analysis</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Security audit</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> ROI projection</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Implementation roadmap</li>
            </ul>
            <Button className="w-full bg-primary text-white rounded-none">Book Audit</Button>
          </div>

          {/* Card 2 - Featured */}
          <div className="p-6 border-2 border-accent flex flex-col h-full relative bg-gray-50">
            <div className="absolute top-0 right-0 bg-accent text-xs font-bold px-2 py-1 text-primary">POPULAR</div>
            <h3 className="text-lg font-bold text-primary mb-2">Automation Accelerator</h3>
            <div className="text-3xl font-bold mb-6">$10K - $25K</div>
            <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-600">
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 4-8 week project</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> One core system built</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Full integration</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Team training (4 hours)</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 30-day support</li>
            </ul>
            <Button className="w-full bg-accent text-primary hover:bg-yellow-400 rounded-none">Book Discovery</Button>
          </div>

          {/* Card 3 */}
          <div className="p-6 border border-gray-200 flex flex-col h-full hover:border-primary transition-colors">
            <h3 className="text-lg font-bold text-primary mb-2">Transformation Partner</h3>
            <div className="text-3xl font-bold mb-6">From $5K<span className="text-base font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-600">
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 3-month minimum</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Continuous optimization</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> New implementations</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Strategic advisory</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Priority support</li>
            </ul>
            <Button className="w-full bg-primary text-white rounded-none">Book Discovery</Button>
          </div>

          {/* Card 4 */}
          <div className="p-6 border border-gray-200 flex flex-col h-full hover:border-primary transition-colors bg-gray-50/50">
            <h3 className="text-lg font-bold text-primary mb-2">Quick Support</h3>
            <div className="text-3xl font-bold mb-6">$150<span className="text-base font-normal text-gray-500">/hr</span></div>
            <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-600">
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 4-hour minimum</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> For Academy members</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Same-week availability</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Hands-on help</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> No commitment</li>
            </ul>
            <Button variant="outline" className="w-full rounded-none">Academy Members →</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Academy() {
  return (
    <section id="academy" className="py-24 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-0 md:pr-8 md:border-r border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-4">Not Ready for Consulting?</h3>
              <p className="text-gray-600 mb-6">
                Start learning for free at Tech Horizon Academy. Join 800+ members in weekly workshops on Claude, Skills, and automation.
              </p>
              <ul className="space-y-2 mb-8 text-sm font-medium text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Free tier available
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> No consulting pressure
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Weekly live workshops
                </li>
              </ul>
              <Button variant="outline" className="w-full md:w-auto rounded-none border-primary text-primary hover:bg-gray-50">
                Join Free Workshop →
              </Button>
            </div>
            
            <div className="pl-0 md:pl-4">
              <div className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 text-xs font-bold mb-4">BEST VALUE</div>
              <h3 className="text-2xl font-bold text-primary mb-4">Hybrid Path</h3>
              <p className="text-gray-600 mb-6">
                Combine Academy + Consulting. You learn the principles, we build the systems. Academy members get 15% off consulting services.
              </p>
              <Button className="w-full md:w-auto bg-primary text-white rounded-none hover:bg-navy-800">
                Book Hybrid Discovery →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
