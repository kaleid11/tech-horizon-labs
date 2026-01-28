import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import founderImage from "@/assets/founder.png";

export function Founder() {
  return (
    <section id="founder" className="py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute inset-0 bg-salmon-500 rounded-3xl rotate-3 opacity-20 transform translate-x-4 translate-y-4"></div>
            <img 
              src={founderImage} 
              alt="Huxley Patterson" 
              className="w-full max-w-md mx-auto md:mr-auto rounded-3xl grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl relative z-10"
            />
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-4xl font-bold text-aubergine-900 mb-6">Why We're Different</h2>
            
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p className="font-bold text-salmon-600 text-xl">I'm Huxley, founder of Tech Horizon Labs.</p>
              
              <p>I built this firm after watching businesses waste money on AI tools they weren't ready for.</p>
              
              <p>They'd buy Claude Pro, ChatGPT Enterprise, automation platforms - then realize their data was too messy to use them. Files named 'Final_FINAL_v3_ACTUAL.docx'. No security protocols. No processes.</p>
              
              <p>So we do it differently:</p>
              <ul className="list-none pl-0 space-y-2">
                <li className="flex gap-2 items-center"><span className="w-2 h-2 bg-salmon-500 rounded-full"></span> Infrastructure before automation</li>
                <li className="flex gap-2 items-center"><span className="w-2 h-2 bg-salmon-500 rounded-full"></span> Education is mandatory (not optional)</li>
                <li className="flex gap-2 items-center"><span className="w-2 h-2 bg-salmon-500 rounded-full"></span> Security is default (not an add-on)</li>
                <li className="flex gap-2 items-center"><span className="w-2 h-2 bg-salmon-500 rounded-full"></span> We're tool-agnostic (no vendor kickbacks)</li>
              </ul>
              
              <p className="text-sm italic text-gray-500 mt-6 border-l-4 border-salmon-200 pl-4">
                We're slower than competitors promising "30-day AI transformation." We're more expensive than offshore agencies. But our clients own their systems, understand their infrastructure, and aren't dependent on us.
              </p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-gray-200">
              <div>
                <div className="text-4xl font-bold text-aubergine-900">100+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Implementations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-aubergine-900">$2.1M</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Saved for clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "What makes you different from other AI consultants?", a: "We build infrastructure before automation. Most consultants skip straight to tools and automation. We fix your foundation first: data organization, security, processes. It's slower but it actually works." },
    { q: "Should I join the Academy or hire you for consulting?", a: "Academy: You have time, some technical ability, and want to learn + build yourself with community support. Consulting: You need it done fast, with expert implementation and guaranteed results. Most cost-effective: Both (learn the principles, we build the systems)." },
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
    <section className="py-32 bg-aubergine-900 text-white text-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-aubergine-900 via-aubergine-900 to-salmon-900/20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Build Infrastructure That <span className="text-gradient-salmon">Actually Works?</span></h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Book a free 15-minute discovery call. No sales pressure. Just an honest assessment of whether you're ready for automation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button size="lg" className="bg-salmon-500 text-aubergine-900 hover:bg-salmon-600 font-bold text-lg px-10 h-16 rounded-full w-full sm:w-auto shadow-xl shadow-salmon-500/20">
            Book Discovery Call
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-medium text-lg px-10 h-16 rounded-full w-full sm:w-auto">
            Join Free Academy
          </Button>
        </div>
        
        <div className="inline-block bg-white/5 rounded-full px-6 py-2 border border-white/10 text-sm text-gray-400">
          Discovery call includes: Current state assessment, honest recommendations, and next steps.
        </div>
      </div>
    </section>
  );
}
