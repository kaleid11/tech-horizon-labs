import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, Award } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.png";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
              Everyone's Buying AI Tools. <br />
              <span className="text-gray-400">Nobody's Building AI Infrastructure.</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              We're the consulting firm that won't let you automate chaos. 
              Infrastructure first. Security default. No vendor lock-in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-yellow-400 font-semibold text-lg px-8 h-14 rounded-none">
                Book Discovery Call
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-gray-50 font-medium text-lg px-8 h-14 rounded-none">
                Join Free Academy →
              </Button>
            </div>

            <div className="pt-8 flex flex-wrap gap-6 text-sm text-gray-500 items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Featured: Noosa Chamber of Commerce</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>100+ Australian SMEs</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full -z-10" />
            <img 
              src={heroImage} 
              alt="Claude Desktop Interface with Skills Panel" 
              className="rounded-lg shadow-2xl border border-gray-200 w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary rounded-none px-3 py-1">THE PROBLEM</Badge>
          <h2 className="text-4xl font-bold text-primary mb-4">The Infrastructure Gap</h2>
          <p className="text-xl text-gray-600">You can't automate chaos. You can't secure what you don't understand.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm group hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">What's Trending</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> ChatGPT Enterprise: $60/user</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> Claude Pro: $20/user</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> AI automation tools</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">•</span> Viral AI assistants</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="bg-white p-8 border-2 border-accent/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-xs font-bold px-2 py-1">IGNORED</div>
            <div className="w-12 h-12 bg-yellow-50 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">What Businesses Miss</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Standardized file naming</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Security protocols</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Organized data for AI</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Basic process mapping</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm group hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><line x1="12" x2="12" y1="1" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">The Result</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> $1000s wasted monthly</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> Tools sitting unused</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> Zero real ROI</li>
              <li className="flex items-start gap-2"><span className="text-red-500 font-bold">•</span> Frustrated teams</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
