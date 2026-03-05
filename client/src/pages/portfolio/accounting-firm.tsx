import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { PageSEO } from "@/components/seo/page-seo";
import { Building2, Clock, Shield, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does AI invoice processing work for accounting firms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI invoice processing uses on-device machine learning to extract data from invoices, receipts, and financial documents automatically. Our solution deploys a private AI model that processes documents locally — no sensitive financial data ever leaves your office. It integrates directly with accounting software like Xero for seamless workflows."
      }
    },
    {
      "@type": "Question",
      "name": "Is AI safe for handling sensitive accounting data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, when deployed correctly. Our approach uses private, on-premises AI that processes all data locally. Unlike cloud-based AI tools, sensitive client financial data never leaves your office network. This approach is compliant with Australian Privacy Act requirements and maintains full data sovereignty."
      }
    },
    {
      "@type": "Question",
      "name": "How much time can AI save an accounting firm?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Noosa accounting firm client reduced admin time by 40%, with staff previously spending 50%+ of their day on data entry now focusing on high-value advisory work. Client onboarding was cut from 5-7 business days to under 2 days. The full implementation took just 4 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Can AI integrate with Xero and other accounting software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our AI solutions integrate seamlessly with existing accounting software stacks including Xero, MYOB, and QuickBooks. The AI handles document extraction, data validation, and automated intake workflows while your existing tools continue to manage the accounting processes you already rely on."
      }
    }
  ]
};

export default function AccountingFirmCaseStudy() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO
        title="Invoice AI & Accounting Automation | Case Study"
        description="Noosa accounting firm cut admin by 40% with private AI invoice processing. On-premises AI keeps sensitive data secure. Real Australian accounting AI case study."
        canonical="https://techhorizonlabs.com/portfolio/accounting-firm"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Link href="/portfolio" data-testid="link-back-portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-salmon-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building2 className="h-8 w-8 text-salmon-400" />
              </div>
              <div>
                <div className="text-sm text-salmon-400 font-medium mb-2">
                  Professional Services • Noosa, Sunshine Coast
                </div>
                <h1 data-testid="heading-casestudy-title" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Invoice AI: Noosa Accounting Firm Cuts Admin by 40%
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700 max-w-2xl">
              <div>
                <div className="text-3xl font-bold text-salmon-500">40%</div>
                <div className="text-sm text-gray-400">Admin time reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">100%</div>
                <div className="text-sm text-gray-400">Data stays on-premises</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">4 weeks</div>
                <div className="text-sm text-gray-400">Implementation time</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                <div>
                  <h2 className="font-bold text-2xl text-aubergine-900 mb-4 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-gray-400" />
                    The Challenge
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    A Noosa-based accounting firm was drowning in manual data entry and a time-consuming client onboarding process. Their team was spending more time on paperwork than on high-value advisory work.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full mt-2 flex-shrink-0"></span>
                      Staff spending 50%+ of their day on repetitive data entry tasks
                    </li>
                    <li className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full mt-2 flex-shrink-0"></span>
                      Client onboarding taking 5-7 business days to complete
                    </li>
                    <li className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-salmon-500 rounded-full mt-2 flex-shrink-0"></span>
                      Concerns about data privacy with cloud-based AI tools
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-bold text-2xl text-aubergine-900 mb-4 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-gray-400" />
                    Our Solution
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We built an Automation Accelerator that deployed a private, on-device AI to process client documents and automate the entire intake workflow. The system is 100% secure, meaning sensitive financial data never leaves their office.
                  </p>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">Private AI Deployment</h4>
                      <p className="text-sm text-gray-600">On-premises AI model processes documents locally with no cloud dependency.</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">Automated Intake Workflow</h4>
                      <p className="text-sm text-gray-600">New clients automatically processed through document extraction and data validation.</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">Integration with Xero</h4>
                      <p className="text-sm text-gray-600">Seamless connection to their existing accounting software stack.</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-aubergine-900 mb-2">Staff Training</h4>
                      <p className="text-sm text-gray-600">Comprehensive training to ensure team adoption and ongoing success.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-bold text-2xl text-aubergine-900 mb-4 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    The Results
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                      <div className="text-3xl font-bold text-green-600">40%</div>
                      <div className="text-sm text-gray-600">Admin time reduction</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                      <div className="text-3xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-600">Data stays on-premises</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                      <div className="text-3xl font-bold text-green-600">4 weeks</div>
                      <div className="text-sm text-gray-600">Implementation time</div>
                    </div>
                  </div>
                </div>

                <blockquote className="bg-aubergine-50 rounded-xl p-8 border-l-4 border-salmon-500">
                  <p className="text-aubergine-800 italic leading-relaxed text-xl mb-4">
                    "We went from spending half our day on data entry to focusing on what we're actually good at—advising clients. The AI handles the grunt work now."
                  </p>
                  <footer className="text-gray-600 font-medium">
                    — Practice Manager, Noosa Accounting Firm
                  </footer>
                </blockquote>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Related</h3>
                  <div className="flex flex-wrap gap-4">
                    <a href="/industries/accounting" className="text-salmon-600 hover:text-salmon-700 underline">AI for Accounting</a>
                    <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
                    <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">All Case Studies</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Book a free 15-minute discovery call. We'll identify your highest-impact automation opportunity and give you honest advice.
            </p>
            <Button data-testid="button-casestudy-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
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
