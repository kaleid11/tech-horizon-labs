import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { CheckCircle2, TrendingUp, Calendar, ArrowRight, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { PageSEO } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { OccupationAIData } from "@/data/ai-impact-by-industry";

interface IndustryFAQ {
  question: string;
  answer: string;
}

interface UseCase {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
}

interface IndustryStat {
  value: string;
  label: string;
}

interface IndustryAIImpact {
  headline: string;
  description: string;
  data: OccupationAIData[];
}

interface IndustryLandingProps {
  seoConfig: {
    title: string;
    description: string;
    canonical: string;
  };
  industry: string;
  slug: string;
  tagline: string;
  heroDescription: string;
  stats: IndustryStat[];
  bottleneckTitle: string;
  bottleneckDescription: string;
  whatOthersSell: string;
  whatWeActuallyDo: string;
  useCases: UseCase[];
  caseStudyLink?: string;
  caseStudyLabel?: string;
  faqs: IndustryFAQ[];
  aiImpact?: IndustryAIImpact;
  breadcrumbItems?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export default function IndustryLandingTemplate({
  seoConfig,
  industry,
  slug,
  tagline,
  heroDescription,
  stats,
  bottleneckTitle,
  bottleneckDescription,
  whatOthersSell,
  whatWeActuallyDo,
  useCases,
  caseStudyLink,
  caseStudyLabel,
  faqs,
  aiImpact,
  breadcrumbItems,
  children,
}: IndustryLandingProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `https://techhorizonlabs.com/industries/${slug}#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...seoConfig} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-salmon-500 text-sm font-medium backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-salmon-500" />
              </span>
              {tagline}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI for {industry}:<br />
              <span className="text-salmon-500">Find the Right Problem First.</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              {heroDescription}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105 group" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free AI Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              {caseStudyLink && (
                <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8" asChild>
                  <a href={caseStudyLink}>See {caseStudyLabel || "Case Study"}</a>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-salmon-500">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {breadcrumbItems && <PageBreadcrumb items={breadcrumbItems} />}

        {/* The Bottleneck Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6">
                {bottleneckTitle}
              </h2>

              <div className="prose prose-lg text-gray-600 mb-12">
                <p>{bottleneckDescription}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                  <h3 className="font-bold text-aubergine-900 mb-4 text-lg">What Other AI Consultants Sell You</h3>
                  <p className="text-gray-600">{whatOthersSell}</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                  <h3 className="font-bold text-aubergine-900 mb-4 text-lg">What THL Actually Does</h3>
                  <p className="text-gray-600">{whatWeActuallyDo}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-12">
              Real {industry} Results
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {useCases.map((useCase, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <useCase.icon className="h-8 w-8 text-salmon-500" />
                    <div>
                      <h3 className="font-bold text-aubergine-900">{useCase.title}</h3>
                      <p className="text-sm text-gray-500">{useCase.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <div className="flex items-center gap-2 text-salmon-600 font-bold">
                    <TrendingUp className="h-5 w-5" />
                    <span>{useCase.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {aiImpact && (
          <section className="py-16 bg-white border-t border-gray-100" data-testid="section-ai-impact">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-6 w-6 text-salmon-600" />
                  <h2 className="text-2xl font-bold text-aubergine-900">Industry AI Adoption Data</h2>
                </div>
                <p className="text-lg text-gray-600 mb-2 font-medium">{aiImpact.headline}</p>
                <p className="text-gray-600 mb-8">{aiImpact.description}</p>

                <div className="space-y-4">
                  {aiImpact.data.map((d) => (
                    <div key={d.occupation} className="bg-gray-50 rounded-xl p-5 border border-gray-200" data-testid={`impact-bar-${d.occupation.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-aubergine-900 text-sm">{d.occupation}</h3>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-salmon-50 text-salmon-700">{d.gap}pt gap</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>AI Capability</span>
                            <span className="font-mono font-bold" style={{ color: d.color }}>{d.theoreticalCoverage}%</span>
                          </div>
                          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${d.theoreticalCoverage}%`, backgroundColor: d.color }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Actual Usage</span>
                            <span className="font-mono font-bold text-gray-500">{d.observedUsage}%</span>
                          </div>
                          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-400 rounded-full" style={{ width: `${d.observedUsage}%` }} />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{d.keyInsight}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <Link href="/insights/ai-impact-by-industry" className="text-salmon-600 hover:text-salmon-700 text-sm font-medium flex items-center gap-1" data-testid="link-full-research">
                    See full AI Impact by Industry research <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Every {industry} Business Has an AI Opportunity.<br />
              <span className="text-salmon-500">Let's Find Yours.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute call. We'll identify your highest-impact AI opportunity — or tell you honestly if the timing isn't right.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105 group" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free AI Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center">
              {industry} AI Consulting — FAQs
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-aubergine-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {children && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
              {children}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
