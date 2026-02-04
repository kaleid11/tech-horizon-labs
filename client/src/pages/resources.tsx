import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NewsletterDialog } from "@/components/newsletter-dialog";
import { FileText, Video, Download, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

const articles = [
  {
    id: "ai-implementation-roadmap",
    title: "AI Implementation Roadmap for Australian SMEs",
    description: "A practical 4-step framework for implementing AI in your small business—without the enterprise complexity or Silicon Valley assumptions.",
    category: "Guide",
    readTime: "8 min read",
    keywords: ["AI implementation", "Australian SME", "AI roadmap"]
  },
  {
    id: "private-ai-vs-cloud",
    title: "Private AI vs Cloud AI: What Australian Businesses Need to Know",
    description: "Understanding the trade-offs between on-premises AI and cloud-based solutions for Privacy Act compliance and data sovereignty.",
    category: "Explainer",
    readTime: "6 min read",
    keywords: ["private AI", "cloud AI", "data privacy", "Privacy Act"]
  },
  {
    id: "reduce-admin-time-ai",
    title: "How to Reduce Admin Time by 40% with AI",
    description: "Real strategies from Queensland businesses that cut administrative workload using private AI systems—with specific workflows you can implement.",
    category: "Case Study",
    readTime: "10 min read",
    keywords: ["reduce admin", "AI automation", "business efficiency"]
  },
  {
    id: "ai-compliance-australia",
    title: "AI Compliance for Australian Businesses: Privacy Act & Beyond",
    description: "What you need to know about using AI systems while staying compliant with Australian privacy laws and industry regulations.",
    category: "Compliance",
    readTime: "7 min read",
    keywords: ["AI compliance", "Privacy Act", "Australian regulations"]
  },
  {
    id: "offline-ai-construction",
    title: "Offline AI for Construction: Quoting on the Job Site",
    description: "How Sunshine Coast builders are generating accurate quotes on-site without internet using private AI apps on tablets.",
    category: "Industry",
    readTime: "5 min read",
    keywords: ["construction AI", "offline AI", "quoting automation"]
  }
];

const workshops = [
  {
    title: "What's New in AI",
    day: "Every Tuesday",
    time: "10:00 AM AEST",
    description: "Weekly walkthrough of the latest AI tool releases and how they apply to Australian SMEs."
  },
  {
    title: "Deep Dive Workshop",
    day: "Every Thursday",
    time: "2:00 PM AEST",
    description: "Hands-on session focused on a specific workflow—bring your laptop and follow along."
  },
  {
    title: "Ask Us Anything",
    day: "Every Friday",
    time: "4:00 PM AEST",
    description: "Live drop-in session. Bring your questions, stuck points, or ideas—we troubleshoot together."
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.resources} />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Free<br />
              <span className="text-salmon-500">Resources</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              Practical AI guides, case studies, and tools for Australian SMEs. No fluff, no hype—just actionable information you can use today.
            </p>

            <NewsletterDialog>
              <Button data-testid="button-resources-newsletter" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8">
                Subscribe to Newsletter
              </Button>
            </NewsletterDialog>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 mb-4">
              Articles & Guides
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl">
              Deep dives into AI implementation, compliance, and practical strategies for Australian businesses.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow relative"
                  itemScope
                  itemType="https://schema.org/Article"
                >
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-aubergine-100 text-aubergine-700 px-2 py-1 rounded-full font-medium">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-salmon-600 mb-3">
                    <FileText className="h-4 w-4" />
                    <span>{article.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2 leading-tight" itemProp="headline">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4" itemProp="description">
                    {article.description}
                  </p>
                  <NewsletterDialog>
                    <button className="flex items-center text-salmon-600 text-sm font-medium group hover:text-salmon-700 transition-colors">
                      <span>Get Notified When Published</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </NewsletterDialog>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-4 text-center">
                Weekly Live Workshops
              </h2>
              <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                Free weekly sessions through the Tech Horizon Academy. Stay current as AI tools change.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {workshops.map((workshop, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-salmon-600 mb-3">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">{workshop.day}</span>
                    </div>
                    <h3 className="font-bold text-aubergine-900 mb-1">{workshop.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{workshop.time}</p>
                    <p className="text-gray-600 text-sm">{workshop.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="rounded-full" asChild>
                  <a href="https://academy.techhorizonlabs.com" target="_blank" rel="noopener">
                    Join Academy for Workshops <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-4 text-center">
                Tech Horizon News
              </h2>
              <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                Weekly newsletter for SEQ business operators. AI tool updates, local case studies, and practical workflows.
              </p>

              <div className="bg-gradient-to-br from-aubergine-900 to-aubergine-800 rounded-2xl p-8 md:p-12 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  AI Can Transform Your Business. We Show You How.
                </h3>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Every week: Latest tool releases, tested workflows, Queensland case studies. No spam, just practical AI insights for Australian SMEs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <NewsletterDialog>
                    <Button data-testid="button-resources-subscribe" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8">
                      Subscribe Free
                    </Button>
                  </NewsletterDialog>
                  <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full" asChild>
                    <a href="https://tech-horizon.beehiiv.com" target="_blank" rel="noopener">
                      View Past Issues <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 mb-4 text-center">
              Free Tools & Downloads
            </h2>
            <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
              Practical resources you can use right away—no email required.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Download className="h-6 w-6 text-salmon-600" />
                </div>
                <div>
                  <h3 className="font-bold text-aubergine-900 mb-1">AI Readiness Checklist</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    10 questions to assess if your business is ready for AI implementation.
                  </p>
                  <NewsletterDialog>
                    <button className="text-salmon-600 text-sm font-medium hover:underline focus-visible:underline flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Subscribe to Download
                    </button>
                  </NewsletterDialog>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-salmon-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Download className="h-6 w-6 text-salmon-600" />
                </div>
                <div>
                  <h3 className="font-bold text-aubergine-900 mb-1">ROI Calculator Template</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Spreadsheet to calculate potential time and cost savings from AI automation.
                  </p>
                  <NewsletterDialog>
                    <button className="text-salmon-600 text-sm font-medium hover:underline focus-visible:underline flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Subscribe to Download
                    </button>
                  </NewsletterDialog>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Personalized Guidance?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Resources are great for learning, but sometimes you need direct advice. Book a free 15-minute discovery call.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8" asChild>
              <a href="/services/audit">Book a Free Readiness Assessment</a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
