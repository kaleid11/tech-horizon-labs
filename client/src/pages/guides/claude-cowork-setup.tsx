import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Monitor, Settings, Brain, MessageSquare, Cloud, Plug, Layout, FileText, CheckCircle2, Shield, AlertTriangle, Calendar, ArrowRight, HelpCircle, ClipboardCheck } from "lucide-react";

export default function ClaudeCoworkSetup() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Claude Cowork Setup Guide: From Zero to Autonomous AI in 15 Minutes",
    "description": "Complete setup from beginner to advanced — Desktop app, connectors, compliance, and best practices for Australian businesses.",
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
    "dateModified": "2026-03-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://techhorizonlabs.com/guides/claude-cowork-setup"
    },
    "image": "https://techhorizonlabs.com/og-image.png"
  };

  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.guides.claudeCoworkSetup} />
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
              Claude Cowork Setup Guide:<br />
              <span className="text-salmon-500">From Zero to Autonomous AI in 15 Minutes</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mb-4 leading-relaxed">
              Complete setup from beginner to advanced — Desktop app, connectors, compliance, and best practices for Australian businesses.
            </p>

            <p className="text-sm text-gray-400">
              By <strong className="text-white">Huxley Peckham</strong> · Founder, Tech Horizon Labs · March 2026 · 15 min read
            </p>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "Learn", href: "/resources" },
          { label: "Claude Cowork Setup Guide" }
        ]} />

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <article className="max-w-3xl mx-auto prose prose-lg prose-gray">

              {/* Section 1: What is Claude Cowork? */}
              <h2 className="flex items-center gap-3">
                <Monitor className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                What is Claude Cowork?
              </h2>

              <p>
                Claude Cowork is a desktop AI agent that can read, edit, and create files on your computer. Unlike regular chat, Cowork works <strong>autonomously</strong> — you assign a task, and Claude makes a plan, executes it, and checks its own work.
              </p>

              <p>
                Think of it as hiring a capable assistant who sits at your computer and handles the tedious work while you focus on higher-value tasks.
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-bold text-aubergine-900 mb-3 text-base flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    What Cowork Can Do
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Organise files — sort, rename, move hundreds of files</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Create spreadsheets from receipt photos</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Draft reports from scattered notes</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Process multiple documents at once</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Work while you do other things</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-3 text-base flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    What Cowork Cannot Do
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 flex-shrink-0">-</span>Access anything outside folders you explicitly allow</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 flex-shrink-0">-</span>Send emails (but can draft them)</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 flex-shrink-0">-</span>Browse the web</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 flex-shrink-0">-</span>Make purchases or financial transactions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8 not-prose mb-8">
                <p className="text-aubergine-900 font-bold text-lg mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-salmon-500" />
                  Pro Tip
                </p>
                <p className="text-gray-700">
                  Cowork runs in a sandboxed environment. It can only touch files in folders you grant access to — your system is protected.
                </p>
              </div>

              {/* Section 2: Step 1 — Get the Desktop App */}
              <h2 className="flex items-center gap-3">
                <Monitor className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Step 1: Get the Desktop App
              </h2>

              <h3>Requirements</h3>
              <ul>
                <li><strong>macOS</strong> (Windows coming soon)</li>
                <li><strong>Claude Pro</strong> ($20/month) or <strong>Claude Max</strong> ($100-200/month) subscription</li>
                <li>~500MB disk space</li>
              </ul>

              <h3>Installation Steps</h3>
              <ol>
                <li>Download from <strong>claude.ai/download</strong></li>
                <li>Install and open the app</li>
                <li>Sign in with your Anthropic account</li>
                <li>Find the <strong>Cowork tab</strong> — you'll see three tabs: Chat, Cowork, and Code</li>
              </ol>

              <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8 not-prose mb-8">
                <p className="text-aubergine-900 font-bold text-lg mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Important
                </p>
                <p className="text-gray-700">
                  If you don't see the Cowork tab, make sure you're on Claude Pro or Max. Cowork is not available on the free plan.
                </p>
              </div>

              {/* Section 3: Step 2 — Enable Capabilities */}
              <h2 className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Step 2: Enable Capabilities
              </h2>

              <p>
                Navigate to <strong>Settings → Capabilities</strong> and enable the following:
              </p>

              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-aubergine-900 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Setting</th>
                      <th className="px-4 py-3 text-left font-bold">What It Does</th>
                      <th className="px-4 py-3 text-left font-bold">Set To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Artifacts</td>
                      <td className="px-4 py-3 text-gray-600">Creates documents, code, designs in a side panel</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">ON</span></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">AI-powered artifacts</td>
                      <td className="px-4 py-3 text-gray-600">Builds interactive apps using Claude API</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">ON</span></td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Cloud code execution</td>
                      <td className="px-4 py-3 text-gray-600">Creates docs, spreadsheets, PDFs, reports</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">ON</span></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Allow network egress</td>
                      <td className="px-4 py-3 text-gray-600">Installs packages for advanced analysis</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">ON</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 4: Step 3 — Set Up Memory */}
              <h2 className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Step 3: Set Up Memory
              </h2>

              <p>
                Navigate to <strong>Settings → Memory</strong> and enable both settings:
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-bold text-aubergine-900 mb-1 text-base">Search and reference chats</h3>
                  <p className="text-gray-600 text-sm mb-2">Claude can search past conversations for context</p>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">ON</span>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-bold text-aubergine-900 mb-1 text-base">Generate memory from chat history</h3>
                  <p className="text-gray-600 text-sm mb-2">Claude learns your preferences over time</p>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">ON</span>
                </div>
              </div>

              {/* Section 5: Step 4 — Set Personal Preferences */}
              <h2 className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Step 4: Set Personal Preferences
              </h2>

              <p>
                Navigate to <strong>Settings → General → Personal preferences</strong>. This is where you tell Claude how you like to work. Keep it under 500 characters.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 not-prose my-8">
                <h3 className="font-bold text-aubergine-900 mb-3 text-base">Example Preferences</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-salmon-500 mt-0.5 flex-shrink-0" />"Keep explanations brief and direct"</li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-salmon-500 mt-0.5 flex-shrink-0" />"I'm in Australia, use Australian spelling"</li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-salmon-500 mt-0.5 flex-shrink-0" />"Format outputs for easy copy-paste"</li>
                </ul>
              </div>

              {/* Section 6: Step 5 — Connect Your Services */}
              <h2 className="flex items-center gap-3">
                <Cloud className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Step 5: Connect Your Services
              </h2>

              <p>
                Cloud Connectors let Cowork access your existing business tools. Navigate to your connector settings and connect the services you use.
              </p>

              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-aubergine-900 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Service</th>
                      <th className="px-4 py-3 text-left font-bold">What It Enables</th>
                      <th className="px-4 py-3 text-left font-bold">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Google Drive</td>
                      <td className="px-4 py-3 text-gray-600">Search and read docs/files</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">HIGH</span></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Gmail</td>
                      <td className="px-4 py-3 text-gray-600">Search emails, draft responses</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">HIGH</span></td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Google Calendar</td>
                      <td className="px-4 py-3 text-gray-600">View events, find free time</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">HIGH</span></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Stripe</td>
                      <td className="px-4 py-3 text-gray-600">View customers, revenue data</td>
                      <td className="px-4 py-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold">MEDIUM</span></td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">GitHub</td>
                      <td className="px-4 py-3 text-gray-600">Access repos, issues</td>
                      <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-bold">DEV ONLY</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 7: Step 6 — Desktop Connectors */}
              <h2 className="flex items-center gap-3">
                <Plug className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Step 6: Desktop Connectors
              </h2>

              <p>
                Desktop Connectors extend Cowork's reach to your local applications and system. These are available to install from the connector settings.
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                {[
                  { title: "Claude in Chrome", desc: "Browse and interact with web content (included by default)" },
                  { title: "Control your Mac", desc: "Navigate and interact with macOS applications" },
                  { title: "Desktop Commander", desc: "Advanced file management and system operations" },
                  { title: "PDF Tools", desc: "Read, extract, and manipulate PDF documents" },
                  { title: "iMessages", desc: "Search and reference your iMessage history" },
                  { title: "Apple Notes", desc: "Access and search your Apple Notes content" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-aubergine-900 mb-1 text-base">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8 not-prose mb-8">
                <p className="text-aubergine-900 font-bold text-lg mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-salmon-500" />
                  Pro Tip
                </p>
                <p className="text-gray-700">
                  Start with <strong>Claude in Chrome</strong> and <strong>Desktop Commander</strong> for maximum file management power. You can always add more connectors later.
                </p>
              </div>

              {/* Section 8: Step 7 — Your First Cowork Task */}
              <h2 className="flex items-center gap-3">
                <Layout className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Step 7: Your First Cowork Task
              </h2>

              <p>
                The Cowork interface has three panels:
              </p>

              <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="font-bold text-aubergine-900 mb-1 text-base">Left Panel</p>
                  <p className="text-gray-600 text-sm">Task history</p>
                </div>
                <div className="bg-salmon-50 rounded-xl p-6 text-center border border-salmon-200">
                  <p className="font-bold text-aubergine-900 mb-1 text-base">Centre</p>
                  <p className="text-gray-600 text-sm">Main task area</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="font-bold text-aubergine-900 mb-1 text-base">Right Panel</p>
                  <p className="text-gray-600 text-sm">Progress, artifacts, context</p>
                </div>
              </div>

              <h3>Quick-Start Buttons</h3>

              <p>
                Cowork provides quick-start buttons to get you going. You'll see these options when you start a new task:
              </p>

              <div className="not-prose flex flex-wrap gap-3 my-6">
                {["Create a file", "Crunch data", "Make a prototype", "Organise files", "Prep for a meeting", "Draft a message"].map((label, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-aubergine-900 border border-gray-200">
                    {label}
                  </span>
                ))}
              </div>

              <h3>Your First Task: Organise Files</h3>

              <ol>
                <li>Click the <strong>Cowork</strong> tab in the Desktop app</li>
                <li>Click <strong>"Organise files"</strong> or type your task directly</li>
                <li>Grant access to the folder you want organised (e.g., your Downloads folder)</li>
                <li>Describe what you want: <em>"Sort all files in this folder by type — documents, images, spreadsheets — and rename them with the date prefix YYYY-MM-DD"</em></li>
                <li>Review Claude's plan before it executes</li>
                <li>Approve each step (or let Claude work autonomously)</li>
                <li>Review the results in the right panel</li>
              </ol>

              {/* Section 9: Example Tasks to Try */}
              <h2 className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Example Tasks to Try
              </h2>

              <p>
                Once you're comfortable with the basics, try these practical tasks:
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8">
                  <p className="text-aubergine-900 font-bold text-lg mb-2">1. Organise Your Downloads</p>
                  <p className="text-gray-700 text-sm">
                    Point Cowork at your Downloads folder and ask it to sort files by type, rename them consistently with date prefixes, and delete obvious duplicates. A task that takes hours manually, done in minutes.
                  </p>
                </div>
                <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8">
                  <p className="text-aubergine-900 font-bold text-lg mb-2">2. Receipt to Expense Report</p>
                  <p className="text-gray-700 text-sm">
                    Drop receipt photos into a folder, then ask Cowork to extract the date, vendor, and amount from each receipt and compile everything into a spreadsheet. Perfect for BAS time.
                  </p>
                </div>
                <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8">
                  <p className="text-aubergine-900 font-bold text-lg mb-2">3. Meeting Prep</p>
                  <p className="text-gray-700 text-sm">
                    Connect Gmail and Google Drive, then ask Cowork to search for all previous correspondence with a contact and create a one-page brief summarising the relationship history, key decisions, and open items.
                  </p>
                </div>
                <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8">
                  <p className="text-aubergine-900 font-bold text-lg mb-2">4. Document Draft from Notes</p>
                  <p className="text-gray-700 text-sm">
                    Give Cowork access to a folder of scattered meeting notes and ask it to combine them into a coherent report with sections, action items, and key decisions highlighted.
                  </p>
                </div>
              </div>

              {/* Section 10: Best Practices */}
              <h2 className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Best Practices
              </h2>

              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-bold text-aubergine-900 mb-3 text-base flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Do
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Start with specific, well-defined tasks</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Give clear success criteria</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Use approval prompts for important steps</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Check the progress panel regularly</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />Always review outputs before using them</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-3 text-base flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Don't
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">x</span>Give access to your entire home directory</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">x</span>Assume Claude understood perfectly first time</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">x</span>Run multiple complex tasks simultaneously</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">x</span>Ignore security warnings or approval prompts</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">x</span>Use Cowork for real-time web browsing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8 not-prose mb-8">
                <p className="text-aubergine-900 font-bold text-lg mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Prompt Injection Risk
                </p>
                <p className="text-gray-700">
                  Be cautious when processing files from untrusted sources. Malicious documents could contain hidden instructions designed to manipulate AI behaviour. Always review what Cowork plans to do before approving actions on unfamiliar files.
                </p>
              </div>

              <h3>Best Practices for Larger Organisations</h3>

              <div className="not-prose grid md:grid-cols-1 gap-4 my-8">
                {[
                  { title: "Use .claude/rules/ for standards", desc: "Define folder structure and naming conventions in rule files so every team member's Cowork follows the same patterns." },
                  { title: "Batch tasks: start small", desc: "Test on a small sample before running high-volume processing. Verify results, then scale up." },
                  { title: "Backup before destructive actions", desc: "Always keep a manual backup before running tasks that rename, move, or delete files in bulk." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-6">
                    <div className="w-6 h-6 bg-salmon-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-salmon-700 font-bold text-xs">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-aubergine-900 mb-1 text-base">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 11: Australian Compliance Considerations */}
              <h2 className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Australian Compliance Considerations
              </h2>

              <p>
                If you're using Cowork with data that falls under the <strong>Privacy Act 1988</strong> and the <strong>Australian Privacy Principles (APPs)</strong>, here's what to keep in mind:
              </p>

              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-aubergine-900 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Compliance Area</th>
                      <th className="px-4 py-3 text-left font-bold">Consideration</th>
                      <th className="px-4 py-3 text-left font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Data Collection (APP 3 & 5)</td>
                      <td className="px-4 py-3 text-gray-600">Ensure source data was collected lawfully with consent</td>
                      <td className="px-4 py-3 text-gray-600">Never use on folders with sensitive personal information without compliance clearance</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Data Security (APP 11)</td>
                      <td className="px-4 py-3 text-gray-600">Files processed locally in sandbox</td>
                      <td className="px-4 py-3 text-gray-600">Enable device security, don't process untrusted files</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Cross-Border Disclosure (APP 8)</td>
                      <td className="px-4 py-3 text-gray-600">Cloud connectors may access data hosted outside Australia</td>
                      <td className="px-4 py-3 text-gray-600">Review connection permissions carefully</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-aubergine-900">Data Minimisation (APP 10 & 11)</td>
                      <td className="px-4 py-3 text-gray-600">Only feed minimum necessary data</td>
                      <td className="px-4 py-3 text-gray-600">Delete task session and outputs once complete</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Ways to Limit Exposure</h3>

              <ol>
                <li><strong>Strict folder scoping</strong> — create a dedicated temporary folder and only grant Cowork access to that folder</li>
                <li><strong>Model selection</strong> — use Haiku for less sensitive data processing, manual processing for highly sensitive material</li>
                <li><strong>Prompt auditing</strong> — save your task prompts and action logs for audit trails</li>
                <li><strong>Use .claude/rules/ for exclusion rules</strong> — define which file types or folders should never be processed</li>
                <li><strong>Always review approval prompts</strong> — never blindly approve actions, especially on sensitive data</li>
              </ol>

              {/* Section 12: Troubleshooting */}
              <h2 className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Troubleshooting
              </h2>

              <div className="not-prose grid md:grid-cols-1 gap-4 my-8">
                {[
                  { q: "\"I don't see the Cowork tab\"", a: "You need a Claude Pro or Max subscription. The free plan doesn't include Cowork. Also make sure you're using the Desktop app — Cowork isn't available in the browser." },
                  { q: "\"Connector won't connect\"", a: "Try disconnecting and reconnecting the service. Check that you're signing into the correct Google account if using Google services." },
                  { q: "\"Claude can't see my files\"", a: "You need to explicitly grant folder access for each task. Cowork doesn't have persistent access to your file system — you approve access each time." },
                  { q: "\"Task is taking forever\"", a: "Check the Progress panel on the right side. If it's stuck, try giving clearer, more specific instructions. Break large tasks into smaller steps." },
                  { q: "\"Results aren't what I expected\"", a: "Be more specific in your instructions. Include examples of what you want, define naming conventions explicitly, and use approval prompts so you can course-correct mid-task." },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-aubergine-900 mb-2 text-base flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-salmon-500 flex-shrink-0" />
                      {item.q}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>

              {/* Section 13: Setup Checklist */}
              <h2 className="flex items-center gap-3">
                <ClipboardCheck className="h-6 w-6 text-salmon-500 flex-shrink-0" />
                Setup Checklist
              </h2>

              <div className="bg-salmon-50 border border-salmon-200 rounded-2xl p-8 not-prose mb-8">
                <p className="text-aubergine-900 font-bold text-lg mb-4">Your Complete Setup Checklist</p>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Download and install the Claude Desktop app",
                    "Sign in with Claude Pro or Max account",
                    "Enable all four Capabilities settings",
                    "Turn on both Memory settings",
                    "Set your Personal Preferences (under 500 characters)",
                    "Connect Cloud Connectors (Google Drive, Gmail, Calendar)",
                    "Install Desktop Connectors (Chrome, Desktop Commander)",
                    "Complete your first Cowork task",
                    "Review Australian compliance considerations for your use case",
                    "Set up .claude/rules/ if working in a team",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-salmon-400 rounded flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="border-l-4 border-salmon-500 pl-6 italic text-aubergine-800 bg-salmon-50 p-6 rounded-r-xl not-prose my-8">
                <p className="text-lg mb-2">"The best AI setup is the one you'll actually use consistently. Start simple, build confidence, then expand. Cowork rewards incremental adoption."</p>
                <cite className="text-sm text-gray-600 not-italic">— Huxley Peckham, Founder, Tech Horizon Labs</cite>
              </blockquote>

            </article>
          </div>
        </section>

        {/* Explore More */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/research" className="text-salmon-600 hover:text-salmon-700 underline">AI Research Hub</a>
                <a href="/services/audit" className="text-salmon-600 hover:text-salmon-700 underline">Free Assessment</a>
                <a href="/insights/claude-vs-chatgpt-2026" className="text-salmon-600 hover:text-salmon-700 underline">Claude vs ChatGPT 2026</a>
                <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">Case Studies</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help Setting Up AI for Your Team?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              15-minute call. We'll assess your setup, identify quick wins, and map out a deployment plan tailored to your business.
            </p>
            <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105 group" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Free Setup Call
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
