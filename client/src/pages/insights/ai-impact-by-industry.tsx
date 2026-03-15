import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { Calendar, ArrowRight, TrendingUp, BarChart3, ExternalLink, AlertTriangle, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { occupationData, keyFindings } from "@/data/ai-impact-by-industry";

function OccupationBar({ data }: { data: typeof occupationData[0] }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-salmon-200 transition-colors" data-testid={`card-occupation-${data.occupation.toLowerCase().replace(/[^a-z]/g, '-')}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-aubergine-900 text-sm">{data.occupation}</h3>
        <span className="text-xs font-mono px-2 py-1 rounded-full bg-salmon-50 text-salmon-700" data-testid={`text-gap-${data.occupation.toLowerCase().replace(/[^a-z]/g, '-')}`}>
          {data.gap}pt gap
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Theoretical AI Coverage</span>
            <span className="font-mono font-bold" style={{ color: data.color }}>{data.theoreticalCoverage}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${data.theoreticalCoverage}%`, backgroundColor: data.color }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Observed AI Usage</span>
            <span className="font-mono font-bold text-gray-600">{data.observedUsage}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-400 rounded-full transition-all duration-700" style={{ width: `${data.observedUsage}%` }} />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">{data.keyInsight}</p>
    </div>
  );
}

export default function AIImpactByIndustry() {
  const sorted = [...occupationData].sort((a, b) => b.gap - a.gap);
  const avgTheoretical = Math.round(occupationData.reduce((s, d) => s + d.theoreticalCoverage, 0) / occupationData.length);
  const avgObserved = Math.round(occupationData.reduce((s, d) => s + d.observedUsage, 0) / occupationData.length);
  const avgGap = avgTheoretical - avgObserved;

  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.insights.aiImpactByIndustry} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "AI Impact by Industry — Capability vs Adoption in 2026",
            "description": "Analysis of AI's theoretical capability versus actual adoption across 10 occupation categories. Based on Anthropic's labor market research.",
            "author": {
              "@type": "Person",
              "name": "Huxley Peckham",
              "url": "https://techhorizonlabs.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Tech Horizon Labs",
              "@id": "https://techhorizonlabs.com/#organization"
            },
            "datePublished": "2026-03-15",
            "dateModified": "2026-03-15"
          })
        }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-salmon-500 text-sm font-medium backdrop-blur-md mb-6">
              <BarChart3 className="h-4 w-4" />
              Industry Research
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="heading-ai-impact">
              AI Impact by Industry:<br />
              <span className="text-salmon-500">The Gap Between Can and Does.</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mb-4 leading-relaxed">
              Research shows AI can theoretically assist {avgTheoretical}% of tasks across major occupations. Actual adoption sits at {avgObserved}%. That {avgGap}-point gap is where the real opportunity lives for Australian businesses.
            </p>
            <p className="text-base text-gray-400 max-w-2xl mb-8">
              Based on labor market research examining AI capability versus real-world adoption across 10 occupation categories. Interpreted for Australian SMEs by Tech Horizon Labs.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="text-avg-theoretical">{avgTheoretical}%</div>
                <div className="text-sm text-gray-400">Avg. AI Capability</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="text-avg-observed">{avgObserved}%</div>
                <div className="text-sm text-gray-400">Avg. Actual Usage</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="text-avg-gap">{avgGap}pts</div>
                <div className="text-sm text-gray-400">Average Gap</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">10</div>
                <div className="text-sm text-gray-400">Occupations Analysed</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-4" data-testid="heading-capability-gap">
                The Capability-Adoption Gap
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Every bar below shows two things: what AI can theoretically do for that occupation (coloured bar) and what businesses are actually using it for (grey bar). The gap between them is untapped potential. Sorted by largest gap first.
              </p>

              <div className="grid gap-4">
                {sorted.map((d) => (
                  <OccupationBar key={d.occupation} data={d} />
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-500">
                    Theoretical coverage figures based on analysis of AI capability across detailed task categories within each occupation. Observed usage based on survey data of actual AI tool adoption in workplaces. Source: Labor market impact research by leading AI research organisations, 2024-2025.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-4">
                Key Findings for Australian Businesses
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                What this data actually means for SMEs on the Sunshine Coast, in Brisbane, and across Queensland.
              </p>

              <div className="grid gap-6">
                {keyFindings.map((finding, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200" data-testid={`card-finding-${i}`}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-salmon-100 flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 text-salmon-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-aubergine-900 mb-2">{finding.title}</h3>
                        <p className="text-gray-600">{finding.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-aubergine-900 mb-8">
                What This Means for Your Industry
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Construction", slug: "construction", stat: "94% admin coverage, 6% site adoption", icon: "🏗️" },
                  { label: "Accounting", slug: "accounting", stat: "94% admin + 78% financial ops coverage", icon: "📊" },
                  { label: "Legal", slug: "legal", stat: "81% legal task coverage, 28% adoption", icon: "⚖️" },
                  { label: "Healthcare", slug: "healthcare", stat: "56% clinical coverage, 14% adoption", icon: "🏥" },
                  { label: "Retail", slug: "retail", stat: "68% sales + 60% management coverage", icon: "🛍️" },
                ].map((ind) => (
                  <Link key={ind.slug} href={`/industries/${ind.slug}`}>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-salmon-300 hover:shadow-sm transition-all cursor-pointer group" data-testid={`link-industry-${ind.slug}`}>
                      <div className="text-2xl mb-2">{ind.icon}</div>
                      <h3 className="font-bold text-aubergine-900 group-hover:text-salmon-600 transition-colors">{ind.label}</h3>
                      <p className="text-sm text-gray-500 mt-1">{ind.stat}</p>
                      <div className="flex items-center gap-1 text-salmon-600 text-sm font-medium mt-3">
                        See industry page <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-salmon-500" />
              <span className="text-salmon-500 font-medium">The Bottom Line</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              AI Won't Save Your Business.<br />
              <span className="text-salmon-500">Fixing the Right Problem Will.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              The data shows AI capability is high across almost every occupation. The gap is in knowing which problem to solve first — and deploying it safely, privately, and compliantly. That's what we do.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105 group" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Find My Bottleneck
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8" asChild>
                <Link href="/research" data-testid="link-research-hub">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  AI Research Hub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
