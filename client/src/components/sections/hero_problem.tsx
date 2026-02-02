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
              Stop Wasting Money on <br/>
              <span className="text-gradient-salmon">AI Advice That Doesn't Work.</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              We test 200+ AI tools monthly so Queensland businesses get what actually works—not what's being sold. Your fractional AI advisor who's in the trenches, not the boardroom.
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
              <div className="flex items-center gap-3 bg-salmon-500/20 px-4 py-2 rounded-full border border-salmon-500/30" data-testid="badge-admin-reduction">
                <span className="text-2xl font-bold text-salmon-500">40%</span>
                <span className="text-white font-medium">Admin Reduction</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-privacy-act">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Privacy Act Ready</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-noosa-chamber">
                <Zap className="w-5 h-5 text-blue-400" />
                <span>Noosa Chamber Featured</span>
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

const partners = [
  { name: "Google", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
  { name: "Microsoft", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/></svg> },
  { name: "AWS", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.264-.168.312a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/></svg> },
  { name: "OpenAI", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg> },
  { name: "Apple", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg> },
  { name: "Canva", logo: "https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg" },
  { name: "Noosa Chamber", logo: "https://noosachamberofcommerce.com.au/resources/Pictures/white-transparent-bkgr.png" },
  { name: "Source Media", logo: "https://www.sourcemedia.com.au/wp-content/uploads/2025/12/SM-2025-colour-text-only-white-outline-horizontal-LARGE-scaled-scaled.webp" },
  { name: "Klipy", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#1A5EFF"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v6H8v-6z" fill="white"/><circle cx="12" cy="8" r="2" fill="white"/></svg> },
  { name: "Anthropic", icon: <svg className="h-6 w-6" viewBox="0 0 46 32" fill="currentColor"><path d="M27.62 0h7.11L46 32h-7.11L27.62 0zM14.91 0h7.18L33.9 32h-7.18L14.91 0zM0 32h7.11l3.69-9.4h14.76l1.89 4.82h7.49L22.62 0 0 32z"/></svg> },
  { name: "Docker", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186"/></svg> },
  { name: "n8n", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg> },
];

export function TrustBar() {
  return (
    <section className="py-8 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-sm text-gray-500 text-center mb-6">Technology & Community Partners</p>
        
        <div className="relative">
          <div className="flex animate-marquee" data-testid="trustbar-partners">
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={`${partner.name}-${i}`}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mx-8 flex-shrink-0"
                data-testid={`partner-${partner.name.toLowerCase().replace(/\s/g, '-')}-${i}`}
              >
                {'logo' in partner ? (
                  <img src={partner.logo} alt={partner.name} className="h-6 w-auto max-w-[100px] object-contain" loading="lazy" />
                ) : (
                  partner.icon
                )}
                <span className="text-sm font-semibold whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
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
              className="h-20"
              loading="lazy"
              data-testid="img-trustbar-goodfirms"
            />
          </a>
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
          <Badge variant="outline" className="mb-4 border-red-500/30 text-red-600 bg-red-50 rounded-full px-4 py-1">SOUND FAMILIAR?</Badge>
          <h2 className="text-4xl font-bold text-aubergine-900 mb-6">You've Already Wasted Time & Money<br/>on AI "Advice"</h2>
          <p className="text-xl text-gray-600">Hours on YouTube tutorials. Thousands on workshops that end with "you should use AI." Tool-locked sessions pushing one vendor's solution. We've heard it all.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1 - The YouTube Trap */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group" data-testid="problem-youtube">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-aubergine-900 mb-4">The YouTube Rabbit Hole</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Hours watching tutorials</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Outdated info (AI moves fast)</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> No one to sense-check ideas</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Still confused about where to start</li>
            </ul>
          </div>

          {/* Column 2 - The Workshop Scam */}
          <div className="bg-aubergine-900 p-8 rounded-2xl border border-aubergine-800 shadow-xl relative overflow-hidden text-white transform md:-translate-y-4 group" data-testid="problem-workshops">
            <div className="absolute top-0 right-0 bg-salmon-500 text-aubergine-900 text-xs font-bold px-3 py-1 rounded-bl-xl">$5K+ WASTED</div>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 text-salmon-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The $5K Workshop Trap</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">✗</span> Paid thousands to attend</li>
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">✗</span> Left with "you should use AI"</li>
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">✗</span> No implementation roadmap</li>
              <li className="flex items-start gap-2"><span className="text-salmon-500 font-bold">✗</span> Still at square one</li>
            </ul>
          </div>

          {/* Column 3 - The Vendor Lock */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group" data-testid="problem-vendor-lock">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-aubergine-900 mb-4">The Vendor Lock-In</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✗</span> MS Copilot pushed at you</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✗</span> Consultant sells one tool</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✗</span> Better alternatives ignored</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✗</span> Paying more than needed</li>
            </ul>
          </div>
        </div>

        {/* The Alternative */}
        <div className="mt-16 bg-gradient-to-r from-aubergine-900 to-aubergine-800 rounded-3xl p-8 md:p-12 text-white text-center" data-testid="problem-solution">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">There's a Better Way</h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Work with someone who tests 200+ AI tools monthly, isn't locked to any vendor, and gives you honest advice based on what actually works—not what pays them commission.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /><span>Vendor-neutral advice</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /><span>Front-line testing</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /><span>Someone to bounce ideas off</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
