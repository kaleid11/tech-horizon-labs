import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, Award, TrendingUp, AlertTriangle, Flame, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Terminal } from "@/components/ui/terminal";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-aubergine-900 text-white min-h-[90vh] flex items-center">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-salmon-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-salmon-500 text-sm font-medium backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-salmon-500"></span>
              </span>
              Practical up-to-date AI systems
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Deploy Now, <br/>
              <span className="text-gradient-salmon">Not Study Later.</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              We track AI tool releases, test them with Australian business operators, map compliance, and hand you production-ready workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="bg-salmon-500 text-aubergine-900 hover:bg-salmon-600 font-bold text-lg px-8 h-14 rounded-full shadow-lg shadow-salmon-500/25 group transition-all hover:scale-105">
                Book Discovery Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-medium text-lg px-8 h-14 rounded-full backdrop-blur-sm">
                Join Free Academy
              </Button>
            </div>

            <div className="pt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-400 items-center border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-salmon-500" />
                <span>1,300+ Tested Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>ISO 27001 Mapped</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span>Live Weekly Updates</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <Terminal />
            </div>
            
            {/* Floating Elements - Animated */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-2xl hidden md:block z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-300">DeepSeek API Cost</div>
                  <div className="text-lg font-bold text-white">$0.55 / M Tokens</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-2xl hidden md:block z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-300">Compliance Status</div>
                  <div className="text-lg font-bold text-white">Privacy Act Ready</div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-aubergine-900/20 text-aubergine-900 rounded-full px-4 py-1">THE REALITY CHECK</Badge>
          <h2 className="text-4xl font-bold text-aubergine-900 mb-6">New Tool Launches Weekly.<br/>Do You Have Time to Test Them All?</h2>
          <p className="text-xl text-gray-600">The gap is the opportunity. Big corporates are slow. Small operators move fast but lack structure. We close that gap.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-aubergine-900 mb-4">What's Happening</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> DeepSeek launches at $0.55</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> OpenAI Operator goes live</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> 1,000+ new AI tools/month</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> Competitors moving fast</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="bg-aubergine-900 p-8 rounded-2xl border border-aubergine-800 shadow-xl relative overflow-hidden text-white transform md:-translate-y-4 group">
            <div className="absolute top-0 right-0 bg-salmon-500 text-aubergine-900 text-xs font-bold px-3 py-1 rounded-bl-xl">THE PAIN</div>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6 text-salmon-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The "Research Overhead"</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">•</span> Which tool is compliant?</li>
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">•</span> How do I integrate this?</li>
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">•</span> Is my data secure?</li>
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">•</span> Wasted hours on YouTube</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-aubergine-900 mb-4">The Solution</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> We test, you deploy</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> Compliance already mapped</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> Production-ready templates</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> No research overhead</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
