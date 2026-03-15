import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import founderImageWebp from "@/assets/huxley-profile.webp";
import founderImageJpg from "@/assets/huxley-profile.jpg";
import { ShieldCheck, Calendar, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/components/contact-form-dialog";

export function Founder() {
  return (
    <section id="founder" className="py-24 bg-cream-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-4xl font-bold text-aubergine-900 mb-6">Built For Operators.<br/>By An Operator.</h2>
            
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p className="font-bold text-salmon-600 text-xl">I'm Huxley Peckham.</p>
              
              <p>I spent 18 months consulting with Australian businesses on AI implementation. I heard the same questions every time: "Which tool?", "How do I start?", "What about compliance?"</p>
              
              <p>So I built what I wish existed: <strong>Tech Horizon Academy.</strong></p>
              
              <p>It's a living platform with 1,300+ tested AI workflows that update weekly as tools change. Not a course that goes stale. Not consulting at $20K+. Just practical systems operators can deploy now.</p>
              
              <div className="bg-white p-6 rounded-xl border-l-4 border-salmon-500 shadow-sm mt-8">
                <p className="italic text-gray-600 font-medium mb-0">
                  "The goal: level the playing field so small businesses compete through speed."
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="px-4 py-2 bg-aubergine-100 text-aubergine-900 rounded-full text-sm font-semibold">Founder – AI Systems Architect</div>
                <div className="px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">Blockchain Security Expert</div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
             {/* Profile Image Card */}
            <div className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
               <picture>
                 <source srcSet={founderImageWebp} type="image/webp" />
                 <img
                   src={founderImageJpg}
                   alt="Huxley Peckham - Founder, Tech Horizon Labs – AI Systems Architect for QLD/Aussie SMEs"
                   className="w-full h-auto rounded-2xl object-cover aspect-[4/5]"
                   loading="lazy"
                   width={480}
                   height={600}
                 />
               </picture>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg">
                <div className="flex items-center gap-3">
                   <div className="bg-green-100 p-2 rounded-full">
                     <ShieldCheck className="w-5 h-5 text-green-600" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 uppercase font-bold">Experience</p>
                     <p className="font-bold text-aubergine-900">Reduced client costs by 40%</p>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Background Decor */}
            <div className="absolute top-10 -right-10 w-full h-full bg-salmon-500 rounded-3xl -z-10 opacity-20 transform rotate-6"></div>
          </div>
          
        </div>


      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "What makes you different from other AI consultants?", a: "We don't just plug in ChatGPT and walk away. We prepare your data, build knowledge bases, and set up Claude or ChatGPT the right way — with proper workflows, compliance, and team training. Infrastructure first, automation second." },
    { q: "Should I join the Academy or hire you for consulting?", a: "Academy (fast path): Start using Claude and ChatGPT this week with 1,300+ templates, workshops, and community support. Consulting (precision path): We map your workflows, identify the highest-ROI bottleneck, and build tailored AI systems. Best value: Both — your team learns at the Academy while we handle the complex builds. Academy members get 15% off consulting." },
    { q: "Why do you show pricing ranges?", a: "Because honest pricing depends on scope. Basic invoice automation: $10K. Complex multi-system integration: $25K. We show ranges to set expectations, then provide fixed quotes after discovery. No surprises." },
    { q: "Do you work outside Queensland?", a: "Yes, 40% of our clients are interstate. We're fully remote-capable while being Brisbane-based for local clients who want in-person workshops." },
    { q: "What if the ROI doesn't work out?", a: "Our audit phase projects ROI before you commit. If we can't show 3-5x ROI within 12 months, we'll tell you not to proceed. We've turned away 30% of prospects because timing wasn't right." },
    { q: "How long until I see results?", a: "Audit results: Immediate (you get the roadmap). First automation: 4-8 weeks to launch. ROI positive: Typically 6-12 weeks after launch." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-aubergine-900 mb-12 text-center">Common Questions</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-gray-100 bg-cream-50 px-8 rounded-xl">
              <AccordionTrigger className="text-left font-bold text-aubergine-900 hover:text-salmon-600 py-6 text-lg">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section id="contact" className="py-32 bg-aubergine-900 text-white text-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-aubergine-900 via-aubergine-900 to-salmon-900/20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Get Your Team <span className="text-gradient-salmon">Using AI Properly?</span></h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Start learning Claude and ChatGPT at the Academy today, or book a free 15-minute call and we'll map out the right approach for your business. No pitch, no pressure.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button data-testid="button-book-discovery" size="lg" className="bg-salmon-500 text-aubergine-900 hover:bg-salmon-600 font-bold text-lg px-10 h-16 rounded-full w-full sm:w-auto shadow-xl shadow-salmon-500/20 transition-all hover:scale-105 group" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-5 w-5" />
              Book Free Discovery Call
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button data-testid="button-join-academy" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-medium text-lg px-10 h-16 rounded-full w-full sm:w-auto" asChild>
            <a href="/academy">
              Join Free Academy
            </a>
          </Button>
        </div>
        
        <div className="inline-block bg-white/5 rounded-full px-6 py-2 border border-white/10 text-sm text-gray-400">
          Includes: workflow assessment, honest recommendation, and clear next steps.
        </div>
      </div>
    </section>
  );
}
