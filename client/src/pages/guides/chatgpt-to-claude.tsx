import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeftRight, CheckCircle2, XCircle, Calendar, ArrowRight, FileText, Download, Upload, Lightbulb, Shield, Brain } from "lucide-react";

export default function ChatGPTToClaudeMigration() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Switching from ChatGPT to Claude: Complete Migration Guide",
    "description": "Transfer your prompts, context, and memory in 10 minutes. Keep the best of both.",
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
    "datePublished": "2026-03-10",
    "dateModified": "2026-03-10",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://techhorizonlabs.com/guides/chatgpt-to-claude"
    },
    "image": "https://techhorizonlabs.com/og-image.png"
  };

  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.guides.chatgptToClaude} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-salmon-500 text-sm font-medium backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-salmon-500" />
              </span>
              Updated March 2026
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Switching from ChatGPT to Claude:<br />
              <span className="text-salmon-500">Complete Migration Guide</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mb-4 leading-relaxed">
              Transfer your prompts, context, and memory in 10 minutes. Keep the best of both.
            </p>

            <p className="text-sm text-gray-400">
              By <strong className="text-white">Huxley Peckham</strong> · Founder, Tech Horizon Labs · March 2026 · 10 min read
            </p>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "Learn", href: "/resources" },
          { label: "ChatGPT to Claude Migration Guide" }
        ]} />

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <article className="max-w-3xl mx-auto prose prose-lg prose-gray">

              {/* Intro Callout */}
              <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8 not-prose mb-12">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-6 w-6 text-salmon-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-aubergine-900 font-bold text-lg mb-2">Why migrate?</p>
                    <p className="text-gray-700">
                      Most power users don't switch entirely — they add Claude as a second tool and shift their critical work. This guide shows you how to transfer your best prompts, set up Claude Projects, and decide when to use each.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Why Consider Claude? */}
              <h2>Why Consider Claude?</h2>

              <p>
                Before you migrate anything, it helps to understand where Claude genuinely outperforms ChatGPT — and where it doesn't. Here's an honest feature comparison based on daily use of both tools.
              </p>

              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-aubergine-900 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Feature</th>
                      <th className="px-4 py-3 text-left font-bold">ChatGPT</th>
                      <th className="px-4 py-3 text-left font-bold">Claude</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Reasoning Depth</td>
                      <td className="px-4 py-3 text-gray-600">Good</td>
                      <td className="px-4 py-3 text-gray-600">Excellent — noticeably better on complex tasks</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Projects/Memory</td>
                      <td className="px-4 py-3 text-gray-600">Memory + GPTs</td>
                      <td className="px-4 py-3 text-gray-600">Projects with file upload + persistent context</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Writing Quality</td>
                      <td className="px-4 py-3 text-gray-600">Creative, varied</td>
                      <td className="px-4 py-3 text-gray-600">More accurate, better analysis</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Code Quality</td>
                      <td className="px-4 py-3 text-gray-600">Good</td>
                      <td className="px-4 py-3 text-gray-600">Better debugging, cleaner code</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Hallucinations</td>
                      <td className="px-4 py-3 text-gray-600">Moderate</td>
                      <td className="px-4 py-3 text-gray-600">Lower (especially with Search on)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Best For</td>
                      <td className="px-4 py-3 text-gray-600">Creative tasks, ideation</td>
                      <td className="px-4 py-3 text-gray-600">Analysis, strategy, professional writing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 3: Phase 1 — Export from ChatGPT */}
              <h2>Phase 1: Export from ChatGPT (5 mins)</h2>

              <p>
                You don't need to export everything — just the prompts and context that actually work for you. Here's the fastest approach:
              </p>

              <div className="not-prose space-y-4 my-8">
                {[
                  { step: 1, icon: FileText, text: "Find your best conversations in ChatGPT — the ones where the output was genuinely useful" },
                  { step: 2, icon: FileText, text: "Copy the prompts that worked well — not the outputs, the inputs you gave" },
                  { step: 3, icon: FileText, text: "Create a Google Doc and paste your best prompts with brief notes on what each does" },
                  { step: 4, icon: FileText, text: "Go to Settings \u2192 Personalisation \u2192 Copy your Custom Instructions" },
                  { step: 5, icon: FileText, text: "Copy your Memory items (Settings \u2192 Personalisation \u2192 Manage Memory)" },
                  { step: 6, icon: FileText, text: "Add these Custom Instructions and Memory items to your Google Doc" },
                  { step: 7, icon: Download, text: "Download the Google Doc as Markdown (.md format)" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-salmon-700 font-bold text-sm">{item.step}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8 not-prose mb-8">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-6 w-6 text-salmon-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-aubergine-900 font-bold text-lg mb-2">Why Markdown?</p>
                    <p className="text-gray-700">
                      Claude's Projects work best with .md files. They're searchable, lightweight, and Claude can reference specific sections easily.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Optional:</strong> You can also download your full ChatGPT history as a reference archive.
                See the{" "}
                <a href="https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data" target="_blank" rel="noopener noreferrer" className="text-salmon-600 hover:text-salmon-700">
                  official ChatGPT export guide
                </a>{" "}
                for instructions.
              </p>

              {/* Section 4: Phase 2 — Import to Claude */}
              <h2>Phase 2: Import to Claude (5 mins)</h2>

              <p>
                Now bring everything into Claude's Projects system. This is where the persistent context magic happens.
              </p>

              <div className="not-prose space-y-4 my-8">
                {[
                  { step: 1, icon: Upload, text: "Go to Claude.ai \u2192 Click 'Projects' in the left sidebar" },
                  { step: 2, icon: Upload, text: "Click 'Create Project'" },
                  { step: 3, icon: Upload, text: "Name it descriptively (e.g., 'Business Strategy' not 'Work')" },
                  { step: 4, icon: Upload, text: "In 'Instructions' \u2192 Paste your ChatGPT Custom Instructions" },
                  { step: 5, icon: Upload, text: "Click 'Add to Project Knowledge' \u2192 Upload your .md file" },
                  { step: 6, icon: Upload, text: "Create a new chat INSIDE your Project" },
                  { step: 7, icon: Brain, text: "Toggle 'Extended Thinking' ON (reasoning mode)" },
                  { step: 8, icon: Shield, text: "Toggle 'Web Search' ON (real-time accuracy)" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-salmon-700 font-bold text-sm">{item.step}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                For more details, see the{" "}
                <a href="https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude" target="_blank" rel="noopener noreferrer" className="text-salmon-600 hover:text-salmon-700">
                  official Claude import/export guide
                </a>.
              </p>

              {/* Section 5: When to Use Each */}
              <h2>When to Use Each (The Honest Answer)</h2>

              <p>
                The smartest approach isn't "switch everything" — it's knowing which tool wins for which task.
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <h3 className="font-bold text-aubergine-900">Claude Wins</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Complex analysis and strategy documents</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Code review and debugging</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Research summaries and professional writing</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Anything requiring deep reasoning</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Privacy-sensitive business data</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Australian compliance-critical work</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-aubergine-900">ChatGPT Wins</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />Creative brainstorming and marketing copy</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />Image generation (DALL-E)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />Quick ideation and voice mode conversations</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />Broad plugin ecosystem integrations</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />Tasks where team familiarity matters</li>
                  </ul>
                </div>
              </div>

              {/* Section 6: The Best Workflow */}
              <h2>The Best Workflow</h2>

              <blockquote className="border-l-4 border-salmon-500 pl-6 italic text-aubergine-800 bg-salmon-50 p-6 rounded-r-xl not-prose my-8">
                <p className="text-lg mb-2">"Brainstorm in ChatGPT, refine in Claude. Use ChatGPT for the first 80% creative exploration, then bring the best ideas to Claude for rigorous analysis, fact-checking, and polishing."</p>
                <cite className="text-sm text-gray-600 not-italic">— The hybrid approach that works best in practice</cite>
              </blockquote>

              <p>
                This isn't about loyalty to one platform. It's about leveraging each tool's strengths. ChatGPT excels at rapid ideation and creative exploration. Claude excels at careful analysis, accuracy, and working with sensitive data. The best results come from using both intentionally.
              </p>

              {/* Section 7: Tips for a Smooth Transition */}
              <h2>Tips for a Smooth Transition</h2>

              <div className="not-prose space-y-4 my-8">
                {[
                  { icon: ArrowLeftRight, text: "Your prompts may need adjustment — Claude responds better to context-rich, specific instructions rather than brief commands" },
                  { icon: FileText, text: "Claude doesn't have a plugin ecosystem — use Projects and file uploads instead for persistent context" },
                  { icon: Brain, text: "Extended Thinking mode is Claude's superpower for complex problems — toggle it on for strategy, analysis, and debugging" },
                  { icon: Upload, text: "Claude Projects persist context between conversations — use them instead of re-explaining every time" },
                  { icon: Shield, text: "Web Search in Claude is opt-in — toggle it on when you need current information, off when you need focused analysis" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <item.icon className="h-5 w-5 text-salmon-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Section 8: Australian Business Considerations */}
              <h2>Australian Business Considerations</h2>

              <p>
                If you're running an Australian business, there are specific reasons why Claude is often the preferred choice for sensitive work:
              </p>

              <div className="not-prose grid md:grid-cols-1 gap-4 my-8">
                {[
                  { icon: Shield, title: "Privacy Act 1988 Alignment", desc: "Anthropic doesn't train on your inputs by default. This simplifies your obligations under the Privacy Act and reduces the risk of inadvertent data sharing." },
                  { icon: FileText, title: "Australian Privacy Principles", desc: "Claude's data practices simplify compliance with Australian Privacy Principles (APPs), particularly around data collection, use, and disclosure." },
                  { icon: Upload, title: "Organised Business Data", desc: "Projects keep business data organised and contextualised. Upload contracts, policies, and procedures once — reference them across all conversations." },
                  { icon: Brain, title: "Full Document Analysis", desc: "Extended context windows handle full Australian legal documents, financial reports, and compliance frameworks without needing to chunk or summarise." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 bg-green-50 rounded-xl p-6 border border-green-100">
                    <item.icon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-aubergine-900 mb-1 text-base">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </article>
          </div>
        </section>

        {/* Explore More */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/insights/claude-vs-chatgpt-2026" className="text-salmon-600 hover:text-salmon-700 underline">Claude vs ChatGPT 2026</a>
                <a href="/resources" className="text-salmon-600 hover:text-salmon-700 underline">Resources</a>
                <a href="/services/audit" className="text-salmon-600 hover:text-salmon-700 underline">Free Assessment</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help Setting Up Claude for Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute call. We'll assess your current AI setup and recommend the best configuration for your specific workflows.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105 group" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
