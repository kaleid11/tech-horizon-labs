import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { McpVisualization } from "@/components/ui/mcp-visualization";
import { ArrowRight, Microscope, Shield, Users } from "lucide-react";

export function Ecosystem() {
  return (
    <section className="py-24 bg-aubergine-900 text-white overflow-hidden relative border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-salmon-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center mb-24">
          {/* Text Content */}
          <div>
            <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 mb-6 px-4 py-1.5 text-sm">
              THE NERVOUS SYSTEM
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              One Brain. <br/>
              <span className="text-gradient-salmon">Connected To Everything.</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Forget "copy-pasting" into ChatGPT. We build <strong className="text-white">Model Context Protocol (MCP)</strong> servers that connect your AI directly to your live business data.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              When your AI can read your Xero, search your Gmail, and update your Airtable securely, it stops being a chatbot and starts being a workforce.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Secure by Design</h4>
                  <p className="text-sm text-gray-400">Data stays in your ecosystem. No training on your IP.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Agent-to-Agent Workflows</h4>
                  <p className="text-sm text-gray-400">Your Research Agent passes data to your Finance Agent automatically.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="relative h-full min-h-[500px] lg:min-h-[600px] flex items-center">
             <div className="w-full">
               <McpVisualization />
             </div>
          </div>
        </div>

        {/* The "Startup Department" Section */}
        <div className="bg-white rounded-3xl p-8 md:p-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-aubergine-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10 text-center max-w-3xl mx-auto">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-salmon-100 rounded-2xl mb-8">
               <Microscope className="w-8 h-8 text-salmon-600" />
             </div>
             
             <h2 className="text-3xl md:text-4xl font-bold text-aubergine-900 mb-6">
               Not Just A Course. <br/>
               <span className="text-salmon-600">Your Outsourced AI R&D Team.</span>
             </h2>
             
             <p className="text-xl text-gray-600 mb-10 leading-relaxed">
               Hiring a "Head of AI" costs $180k+. Joining the Academy gives you an entire department that researches, tests, and validates tools 40 hours a week—so you don't have to.
             </p>
             
             <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
               <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="font-bold text-aubergine-900 mb-2">Weekly Lab Reports</div>
                 <p className="text-sm text-gray-600">We verify which new models (DeepSeek, Claude 3.7) are actually production-ready.</p>
               </div>
               <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="font-bold text-aubergine-900 mb-2">Compliance Mapping</div>
                 <p className="text-sm text-gray-600">Every workflow is stress-tested against Australian Privacy Principles.</p>
               </div>
               <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="font-bold text-aubergine-900 mb-2">Implementation Support</div>
                 <p className="text-sm text-gray-600">Stuck? Our team debugs your prompts and connections live.</p>
               </div>
             </div>

             <Button size="lg" className="bg-aubergine-900 text-white hover:bg-aubergine-800 rounded-full px-10 h-14 font-semibold text-lg">
               Hire Your AI Department
               <ArrowRight className="ml-2 w-5 h-5" />
             </Button>
           </div>
        </div>

      </div>
    </section>
  );
}
