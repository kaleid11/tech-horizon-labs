import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Award, MapPin, Briefcase, Users, Calendar, ExternalLink, Shield, BadgeCheck } from "lucide-react";
import huxleyProfile from "@/assets/huxley-profile.jpg";

export default function About() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <Navbar />
      
      <main>
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About<br />
              <span className="text-salmon-500">Tech Horizon Labs</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Queensland's anti-hype AI consulting firm. We build infrastructure before automation—practical AI systems for Australian SMEs who want results, not buzzwords.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                  <div className="sticky top-24">
                    <img 
                      src={huxleyProfile} 
                      alt="Huxley Peckham - AI Infrastructure Consultant, Tech Horizon Labs" 
                      className="w-48 h-48 object-cover rounded-2xl mb-4 shadow-lg"
                      loading="lazy"
                      itemProp="image"
                      data-testid="img-founder-profile"
                    />
                    <h2 className="text-2xl font-bold text-aubergine-900" itemProp="name">Huxley Peckham</h2>
                    <p className="text-salmon-600 font-medium mb-4" itemProp="jobTitle">Founder & AI Infrastructure Consultant</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Sunshine Coast, QLD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Tech Horizon Labs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2" itemScope itemType="https://schema.org/Person">
                  <meta itemProp="name" content="Huxley Peckham" />
                  <meta itemProp="jobTitle" content="Founder & AI Infrastructure Consultant" />
                  <meta itemProp="worksFor" content="Tech Horizon Labs" />
                  
                  <h3 className="text-2xl font-bold text-aubergine-900 mb-6">
                    The Anti-Hype AI Consultant
                  </h3>
                  
                  <div className="prose prose-lg text-gray-600 space-y-6" itemProp="description">
                    <p>
                      I started Tech Horizon Labs because I was tired of seeing small business owners get sold expensive AI solutions that didn't work.
                    </p>
                    
                    <p>
                      The AI industry has a hype problem. Every week there's a new "revolutionary" tool that's going to "transform your business." Most of it is noise. Most of it doesn't work for SMEs with 5-50 employees. Most of it sends your sensitive data to overseas servers.
                    </p>
                    
                    <p>
                      I believe in a different approach: <strong>infrastructure before automation</strong>. Before we talk about AI, we need to understand your data, your workflows, your compliance requirements. Then we build systems that actually work—private, secure, and practical.
                    </p>

                    <blockquote className="border-l-4 border-salmon-500 pl-6 italic text-aubergine-800 bg-gray-50 p-4 rounded-r-lg">
                      "I'd rather give you a working system in 4 weeks than a PowerPoint deck in 6 months."
                    </blockquote>
                    
                    <h4 className="text-xl font-bold text-aubergine-900 mt-8">What I Believe</h4>
                    
                    <ul>
                      <li><strong>Your data stays yours.</strong> Private AI systems that run on your infrastructure, not Silicon Valley servers.</li>
                      <li><strong>Practical over theoretical.</strong> No 12-week certification courses. Week 1: templates. Week 2: deployment.</li>
                      <li><strong>Australian compliance first.</strong> Privacy Act 1988, industry regulations—mapped into every solution.</li>
                      <li><strong>Honest about what works.</strong> If AI isn't the right solution, I'll tell you.</li>
                    </ul>

                    <h4 className="text-xl font-bold text-aubergine-900 mt-8">The Academy</h4>
                    
                    <p>
                      Beyond consulting, I run the <a href="https://academy.techhorizonlabs.com" target="_blank" rel="noopener" className="text-salmon-600 hover:underline">Tech Horizon Academy</a>—a community of 300+ SEQ business operators learning to deploy AI workflows together. 1,300+ templates, weekly workshops, Australian compliance pre-mapped.
                    </p>
                    
                    <p>
                      The Academy exists because not every business needs a $5,000+ consulting engagement. Some teams want to learn and implement themselves. Both paths work—it depends on your situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
              Why Work With Us
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-salmon-600" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Proven Results</h3>
                <p className="text-gray-600 text-sm">
                  40% admin reduction, 60% faster quotes, 30% less downtime. Real metrics from real Queensland businesses.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-salmon-600" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Local Expertise</h3>
                <p className="text-gray-600 text-sm">
                  Based on the Sunshine Coast. We understand Queensland's business environment, compliance requirements, and opportunities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-salmon-600" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Community Backed</h3>
                <p className="text-gray-600 text-sm">
                  300+ SEQ operators in our Academy community. You're not figuring this out alone—you're joining a network.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
                Company Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-4">Business Information</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-500">Business Name</dt>
                      <dd className="font-medium text-gray-900">Tech Horizon Labs</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">ABN</dt>
                      <dd className="font-medium text-gray-900">80 976 285 425</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Location</dt>
                      <dd className="font-medium text-gray-900">Sunshine Coast, Queensland, Australia</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Service Area</dt>
                      <dd className="font-medium text-gray-900">Queensland-wide (remote) + SEQ (on-site)</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-4">Partners & Affiliations</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>Google Cloud Partner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>Anthropic (Claude) Integration Partner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>AWS Technology Partner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>OpenAI Integration Partner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>n8n Automation Partner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>Docker Certified</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>fal.ai Partner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full"></span>
                      <span>Noosa Chamber of Commerce Member</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-aubergine-900 mb-2">National AI Directory Listed</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Officially listed on the Australian Government's National AI Centre directory as a verified AI training and consulting provider.
                      </p>
                      <a 
                        href="https://www.industry.gov.au/science-technology-and-innovation/technology/national-ai-centre/national-ai-directory" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        data-testid="link-about-ai-directory"
                      >
                        View on industry.gov.au
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-start gap-4">
                    <a 
                      href="https://www.goodfirms.co/company/tech-horizon-labs" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                      data-testid="link-about-goodfirms"
                    >
                      <img 
                        src="https://assets.goodfirms.co/badges/color-badge/artificial-intelligence.svg" 
                        alt="Top Artificial Intelligence Company on Goodfirms" 
                        title="Top Artificial Intelligence Company"
                        className="w-20 h-auto"
                        loading="lazy"
                        data-testid="img-about-goodfirms"
                      />
                    </a>
                    <div>
                      <h3 className="font-bold text-aubergine-900 mb-2">Top AI Company on GoodFirms</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Recognized as a Top Artificial Intelligence Company by GoodFirms, a leading B2B research and reviews platform.
                      </p>
                      <a 
                        href="https://www.goodfirms.co/company/tech-horizon-labs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-800 font-medium transition-colors"
                        data-testid="link-about-goodfirms-view"
                      >
                        View on GoodFirms
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Talk About Your AI Opportunity
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute discovery call. No sales pitch—just honest conversation about whether AI makes sense for your specific situation.
            </p>
            <Button data-testid="button-about-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
