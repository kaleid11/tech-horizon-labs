import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Shield, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Calendar, Server, Lock, Terminal, Cpu } from "lucide-react";
import { Link } from "wouter";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

const openclawFaqs = [
  {
    question: "What is OpenClaw and should my business use it?",
    answer: "OpenClaw is a free, open-source AI assistant that runs on your own computer. It can automate tasks like scheduling, file management, and developer workflows. However, it has documented security vulnerabilities including data leaks and prompt injection attacks. Whether it's right for your business depends on the use case. We help you evaluate that honestly."
  },
  {
    question: "Is OpenClaw safe for managing business emails?",
    answer: "We don't recommend OpenClaw for email or inbox management. Security researchers have documented data exfiltration vulnerabilities, malicious skills in the ClawHub marketplace, and prompt injection attacks that can leak sensitive information. For email automation, we recommend purpose-built tools with proper security audits instead."
  },
  {
    question: "How much does an OpenClaw setup cost on the Sunshine Coast?",
    answer: "A safe OpenClaw deployment with proper isolation (dedicated VM, separate accounts, vetted skills only) typically runs $2,000-$4,000 depending on your use case complexity. This includes security hardening, workflow configuration, and team training. The initial consultation is free."
  },
  {
    question: "What's the difference between Tech Horizon Labs and other OpenClaw setup services?",
    answer: "Most OpenClaw deployment services will connect it to your email, calendar, and business tools without discussing the security risks. We're honest about what OpenClaw can and can't safely do. We set it up in isolated environments with proper guardrails, and we'll tell you when a different tool is a better fit for your needs."
  },
  {
    question: "Can OpenClaw run on local hardware like PicoClaw on ESP32?",
    answer: "Yes. We specialise in local AI deployments including PicoClaw on ESP32 microcontrollers for edge computing, and local AI servers for businesses that need data to stay on-premises. These setups keep your data completely private with zero cloud dependency."
  }
];

const safeUseCases = [
  { title: "Developer Workflows", desc: "Code reviews, PR notifications, automated debugging in sandboxed environments" },
  { title: "Personal Task Automation", desc: "Reminders, note-taking, file organisation on a dedicated machine" },
  { title: "Smart Home Control", desc: "Philips Hue, Home Assistant, IoT device management" },
  { title: "Learning & Experimentation", desc: "Trying AI agent workflows, testing prompts, prototyping automations" },
  { title: "Local AI Server Projects", desc: "PicoClaw on ESP32, self-hosted AI for hobby and research projects" },
  { title: "Internal Dev Tools", desc: "Webhook triggers, cron jobs, CI/CD notifications on isolated infrastructure" },
];

const riskyUseCases = [
  { title: "Email & Inbox Management", desc: "Data exfiltration risks confirmed by security researchers. Your client data could leak." },
  { title: "Client Data Processing", desc: "512 vulnerabilities found in audit, 8 critical. Not suitable for sensitive business data." },
  { title: "Financial Systems Access", desc: "Malicious skills in ClawHub can steal credentials. Never connect to banking or accounting." },
  { title: "Production Business Systems", desc: "CVE-2026-25253 allows remote code execution. Not hardened for production environments." },
];

const securityIncidents = [
  { date: "Jan 2026", event: "Security audit finds 512 vulnerabilities, 8 critical", severity: "critical" },
  { date: "Jan 2026", event: "CVE-2026-25253 disclosed. Remote code execution via WebSocket (CVSS 8.8)", severity: "critical" },
  { date: "Jan-Feb 2026", event: "ClawHavoc campaign. 800+ malicious skills on ClawHub (20% of marketplace)", severity: "critical" },
  { date: "Feb 2026", event: "Data exfiltration and multi-user session leakage confirmed by Giskard", severity: "high" },
  { date: "Feb 2026", event: "Creator Peter Steinberger leaves project to join OpenAI", severity: "info" },
  { date: "Mar 2026", event: "Chinese government bans OpenClaw on state computers", severity: "high" },
  { date: "Mar 2026", event: "Link preview exfiltration vulnerability discovered by PromptArmor", severity: "high" },
];

export default function OpenClawPage() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.openclaw} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://techhorizonlabs.com/openclaw#service",
                "name": "OpenClaw Setup & Consulting — Sunshine Coast",
                "description": "Honest OpenClaw setup and consulting on the Sunshine Coast. We tell you what it's good at, what it's dangerous for, and how to deploy it safely.",
                "url": "https://techhorizonlabs.com/openclaw",
                "provider": {
                  "@type": "Organization",
                  "@id": "https://techhorizonlabs.com/#organization",
                  "name": "Tech Horizon Labs"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Sunshine Coast",
                  "containedInPlace": {
                    "@type": "State",
                    "name": "Queensland",
                    "containedInPlace": {
                      "@type": "Country",
                      "name": "Australia"
                    }
                  }
                }
              },
              {
                "@type": "FAQPage",
                "@id": "https://techhorizonlabs.com/openclaw#faq",
                "mainEntity": openclawFaqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              }
            ]
          })
        }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <Terminal className="h-5 w-5" />
              <span className="text-sm font-medium">OpenClaw Setup & Consulting</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="heading-openclaw-hero">
              OpenClaw Setup<br />
              <span className="text-salmon-500">Sunshine Coast</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-4 leading-relaxed">
              <strong>The honest take:</strong> OpenClaw is a powerful open-source AI assistant. It's also a documented security risk. We help you use it safely for what it's actually good at.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
              160,000+ GitHub stars. 512 known vulnerabilities. We set it up right, or we tell you when something else is a better fit.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button data-testid="button-openclaw-book-consult" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Free OpenClaw Consultation
                </a>
              </Button>
              <Button data-testid="button-openclaw-readiness" variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8" asChild>
                <Link href="/services/audit">AI Readiness Assessment</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">160K+</div>
                <div className="text-sm text-gray-400">GitHub Stars</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">50+</div>
                <div className="text-sm text-gray-400">Integrations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">MIT</div>
                <div className="text-sm text-gray-400">Open Source License</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">512</div>
                <div className="text-sm text-gray-400">Known Vulnerabilities</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6" data-testid="heading-what-is-openclaw">
                What OpenClaw Actually Is
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  OpenClaw is an open-source AI assistant created by Peter Steinberger (who has since left to join OpenAI). It runs on your own computer and connects to AI models like Claude, GPT, or Gemini to automate tasks through natural language.
                </p>
                <p>
                  It connects to 50+ services including messaging apps (WhatsApp, Slack, Telegram), productivity tools (Notion, GitHub), and smart home devices. It has persistent memory, can run scheduled tasks, and execute shell commands on your machine.
                </p>
                <p>
                  The project went viral in January 2026, hitting 160,000+ GitHub stars. A marketplace called ClawHub has 3,000+ community-built skill extensions. It's genuinely impressive technology for certain use cases.
                </p>
                <p>
                  <strong>But here's what most OpenClaw setup services won't tell you:</strong> it has serious, documented security issues that make it unsuitable for anything involving sensitive business data.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4" data-testid="heading-good-vs-bad">
              Honest Assessment: What It's Good At vs. What It's Not
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Other OpenClaw consultants will connect it to everything. We think that's irresponsible. Here's our honest breakdown.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-aubergine-900">Safe Use Cases</h3>
                </div>
                <div className="space-y-4">
                  {safeUseCases.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-aubergine-900" data-testid={`text-safe-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>{item.title}</div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-aubergine-900">Risky Use Cases</h3>
                </div>
                <div className="space-y-4">
                  {riskyUseCases.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-aubergine-900" data-testid={`text-risky-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>{item.title}</div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">
                    If someone offers to connect OpenClaw to your business email, ask them about CVE-2026-25253 and the ClawHavoc campaign. If they don't know what those are, find a different consultant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4" data-testid="heading-security-timeline">
              The Security Reality
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              These aren't theoretical risks. These are documented incidents from the first three months of 2026.
            </p>

            <div className="max-w-3xl mx-auto space-y-4">
              {securityIncidents.map((incident, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-4 p-4 rounded-xl border ${
                    incident.severity === 'critical' ? 'border-red-200 bg-red-50' :
                    incident.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                    'border-blue-200 bg-blue-50'
                  }`}
                  data-testid={`incident-${i}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {incident.severity === 'critical' ? (
                      <ShieldAlert className="h-5 w-5 text-red-600" />
                    ) : incident.severity === 'high' ? (
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    ) : (
                      <Shield className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                        incident.severity === 'critical' ? 'bg-red-200 text-red-800' :
                        incident.severity === 'high' ? 'bg-orange-200 text-orange-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>{incident.severity}</span>
                      <span className="text-sm text-gray-500">{incident.date}</span>
                    </div>
                    <p className="text-gray-800 text-sm">{incident.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4" data-testid="heading-safe-setup">
              How We Set Up OpenClaw Safely
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              If OpenClaw is right for your use case, we deploy it with proper security guardrails. No shortcuts.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-aubergine-50 rounded-xl flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-aubergine-700" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Dedicated VM Isolation</h3>
                <p className="text-gray-600 text-sm">
                  OpenClaw runs in its own virtual machine. Never on your primary work computer. If it gets compromised, your main systems stay safe.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-aubergine-50 rounded-xl flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-aubergine-700" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Separate Accounts Only</h3>
                <p className="text-gray-600 text-sm">
                  We create dedicated accounts for OpenClaw. Never your real email, real calendar, or real business tools. Isolated credentials that can be revoked instantly.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-aubergine-50 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-aubergine-700" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Vetted Skills Only</h3>
                <p className="text-gray-600 text-sm">
                  We audit every ClawHub skill before installation. 20% of the marketplace has been flagged as malicious. We only install skills we've personally reviewed.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-aubergine-50 rounded-xl flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-aubergine-700" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Local AI Options</h3>
                <p className="text-gray-600 text-sm">
                  For maximum privacy, we can configure OpenClaw with local LLMs via Ollama instead of cloud APIs. Your prompts and data never leave your network.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-aubergine-50 rounded-xl flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-aubergine-700" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Network Monitoring</h3>
                <p className="text-gray-600 text-sm">
                  We set up outbound network monitoring to detect if OpenClaw or any skill attempts to exfiltrate data to unknown endpoints. Early warning system.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-aubergine-50 rounded-xl flex items-center justify-center mb-4">
                  <Terminal className="h-6 w-6 text-aubergine-700" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-2">Honest Scoping</h3>
                <p className="text-gray-600 text-sm">
                  If your use case is better served by n8n, Claude, or a purpose-built solution, we'll tell you. We don't force OpenClaw where it doesn't belong.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-aubergine-900 mb-6" data-testid="heading-local-ai">
                Beyond OpenClaw: Local AI Infrastructure
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  OpenClaw is just one piece of the local AI puzzle. We specialise in building complete private AI infrastructure for Sunshine Coast businesses.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-2">PicoClaw on ESP32</h3>
                  <p className="text-sm text-gray-600">
                    Tiny AI on microcontrollers. Perfect for IoT, sensor networks, and edge computing where cloud access isn't available or desirable.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-2">Local AI Servers</h3>
                  <p className="text-sm text-gray-600">
                    Full local LLM infrastructure using Ollama. Run AI models on your own hardware with zero cloud dependency and complete data sovereignty.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-2">n8n Automation</h3>
                  <p className="text-sm text-gray-600">
                    Self-hosted workflow automation that's battle-tested for production use. A safer alternative to OpenClaw for business-critical processes.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-aubergine-900 mb-2">Private AI Deployment</h3>
                  <p className="text-sm text-gray-600">
                    Enterprise-grade AI systems that keep your data on Australian soil. Compliant with Privacy Act 1988 and industry regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want an Honest OpenClaw Assessment?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Free 15-minute call. We'll tell you if OpenClaw is right for your use case, or if something else would work better. No sales pitch, just honest advice.
            </p>
            <Button data-testid="button-openclaw-cta-book" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </a>
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Based in Sunshine Coast, QLD • OpenClaw, PicoClaw, Local AI Servers
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-aubergine-900 mb-8 text-center" data-testid="heading-openclaw-faq">
              Frequently Asked Questions - OpenClaw Sunshine Coast
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {openclawFaqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-aubergine-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
