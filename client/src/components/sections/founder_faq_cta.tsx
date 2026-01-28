import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import founderImage from "@/assets/founder.png";

export function Founder() {
  return (
    <section id="founder" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src={founderImage} 
              alt="Huxley Patterson" 
              className="w-full max-w-md mx-auto md:mr-auto rounded-none grayscale hover:grayscale-0 transition-all duration-500 shadow-xl"
            />
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-bold text-primary mb-6">Why We're Different</h2>
            
            <div className="prose prose-lg text-gray-600">
              <p className="font-medium text-primary">I'm Huxley, founder of Tech Horizon Labs.</p>
              
              <p>I built this firm after watching businesses waste money on AI tools they weren't ready for.</p>
              
              <p>They'd buy Claude Pro, ChatGPT Enterprise, automation platforms - then realize their data was too messy to use them. Files named 'Final_FINAL_v3_ACTUAL.docx'. No security protocols. No processes.</p>
              
              <p>So we do it differently:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Infrastructure before automation</li>
                <li>Education is mandatory (not optional)</li>
                <li>Security is default (not an add-on)</li>
                <li>We're tool-agnostic (no vendor kickbacks)</li>
              </ul>
              
              <p>We're slower than competitors promising "30-day AI transformation." We're more expensive than offshore agencies.</p>
              
              <p className="font-bold text-primary">But our clients own their systems, understand their infrastructure, and aren't dependent on us.</p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-accent-foreground">100+</div>
                <div className="text-sm text-gray-500">Implementations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-foreground">$2.1M</div>
                <div className="text-sm text-gray-500">Saved for clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-foreground">0</div>
                <div className="text-sm text-gray-500">Security incidents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-foreground">97%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Common Questions</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-gray-200 bg-white px-6">
              <AccordionTrigger className="text-left font-medium text-primary hover:text-accent-foreground py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
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
    <section className="py-32 bg-primary text-white text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Infrastructure That Actually Works?</h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Book a free 15-minute discovery call. No sales pressure.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-yellow-400 font-bold text-lg px-10 h-16 rounded-none w-full sm:w-auto">
            Book Discovery Call
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-medium text-lg px-10 h-16 rounded-none w-full sm:w-auto">
            Join Free Academy
          </Button>
        </div>
        
        <p className="text-sm text-blue-300 max-w-md mx-auto">
          Discovery call includes: Current state assessment, honest recommendations (even if it's "not ready yet"), roadmap overview, next steps.
        </p>
      </div>
    </section>
  );
}
