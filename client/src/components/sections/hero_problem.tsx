import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, TrendingUp, AlertTriangle, Flame, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Terminal } from "@/components/ui/terminal";
import { BOOKING_URL } from "@/components/contact-form-dialog";

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
              <Button size="lg" className="bg-salmon-500 text-aubergine-900 hover:bg-salmon-600 font-bold text-lg px-8 h-14 rounded-full shadow-lg shadow-salmon-500/25 group transition-all hover:scale-105" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-hero-book">
                  Book Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-medium text-lg px-8 h-14 rounded-full backdrop-blur-sm" asChild>
                <a href="/academy">
                  Join Free Academy
                </a>
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
                  <div className="text-xs text-gray-300">Avg. Admin Time Saved</div>
                  <div className="text-lg font-bold text-white">15+ hrs/week</div>
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

export function TrustBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-gray-500 text-center">Trusted technology partners powering our AI solutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12" data-testid="trustbar-partners">
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="partner-google">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="text-sm font-semibold">Google</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="partner-anthropic">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <span className="text-sm font-semibold">Anthropic</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="partner-openai">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/></svg>
              <span className="text-sm font-semibold">OpenAI</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="partner-aws">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>
              <span className="text-sm font-semibold">AWS</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="partner-n8n">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              <span className="text-sm font-semibold">n8n</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="partner-docker">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>
              <span className="text-sm font-semibold">Docker</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="partner-falai">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span className="text-sm font-semibold">fal.ai</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a 
              href="https://www.industry.gov.au/science-technology-and-innovation/technology/national-ai-centre/national-ai-directory" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-700 text-sm font-medium transition-colors"
              data-testid="link-trustbar-ai-directory"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              Listed on industry.gov.au National AI Directory
            </a>
            <a 
              href="https://www.goodfirms.co/company/tech-horizon-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              data-testid="link-trustbar-goodfirms"
            >
              <img 
                src="https://assets.goodfirms.co/badges/color-badge/artificial-intelligence.svg" 
                alt="Top Artificial Intelligence Company on Goodfirms" 
                title="Top Artificial Intelligence Company"
                className="h-10"
                loading="lazy"
                data-testid="img-trustbar-goodfirms"
              />
            </a>
          </div>
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
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> AI costs dropping 90% yearly</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> New automation tools weekly</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> Your competitors are adopting</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> Staff time wasted on repetition</li>
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
