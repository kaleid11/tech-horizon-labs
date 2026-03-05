import { Navbar, Footer, SkipLink } from "@/components/layout";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import {
  Scale,
  ShieldCheck,
  Users,
  Eye,
  Target,
  Bot,
  Building2,
  Server,
  Cloud,
  XCircle,
  Lock,
  FileCheck,
  Trash2,
  AlertTriangle,
} from "lucide-react";

const principles = [
  {
    icon: Scale,
    title: "Honest Assessment Over Tool-Pushing",
    description:
      "We'll tell you if a spreadsheet solves your problem better than AI. Our job is finding the right solution, not selling the most expensive one.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by Default",
    description:
      "Australian data stays in Australia where possible. We default to private, local infrastructure and only recommend cloud processing when it genuinely makes sense.",
  },
  {
    icon: Users,
    title: "Human Oversight Always",
    description:
      "AI assists, humans decide. Every system we deploy keeps your team in control. No black boxes, no autonomous decision-making without human review.",
  },
  {
    icon: Eye,
    title: "Transparency in What We Use and How",
    description:
      "We're open about the tools and models we use in our own operations and in client work. No hidden AI, no undisclosed data processing.",
  },
  {
    icon: Target,
    title: "Right-Sized Solutions",
    description:
      "We recommend less, not more. If three tools can be replaced by one, we'll say so. Complexity is a cost, not a feature.",
  },
];

const usageCategories = [
  {
    icon: Bot,
    title: "Client Consulting",
    description:
      "AI assistants for research, code generation, and document analysis — always under human review and with client awareness.",
  },
  {
    icon: Building2,
    title: "Internal Operations",
    description:
      "CRM automation, email workflows, and content generation to run our business efficiently.",
  },
  {
    icon: Server,
    title: "Local Processing",
    description:
      "On-premises models for sensitive data that never leaves the client's control. Recommended for regulated industries.",
  },
  {
    icon: Cloud,
    title: "Third-Party APIs",
    description:
      "Cloud AI services selected for quality, privacy, and Australian data handling. We vet every provider we use.",
  },
];

const boundaries = [
  {
    icon: XCircle,
    text: "Won't recommend AI where a spreadsheet works better",
  },
  {
    icon: AlertTriangle,
    text: "Won't process client data through tools without explicit consent",
  },
  {
    icon: Lock,
    text: "Won't lock clients into proprietary systems",
  },
  {
    icon: XCircle,
    text: "Won't use client data for training third-party models",
  },
];

const dataPromises = [
  {
    icon: FileCheck,
    title: "NDA Protection",
    description: "All client data processed under NDA as standard practice.",
  },
  {
    icon: Server,
    title: "Local Hosting Available",
    description:
      "Model hosting on your premises for sensitive industries — healthcare, legal, finance.",
  },
  {
    icon: XCircle,
    title: "No Training on Your Data",
    description:
      "Your data is never used to train, fine-tune, or improve third-party models.",
  },
  {
    icon: Trash2,
    title: "Clear Retention Policies",
    description:
      "Defined data retention and deletion policies. We delete when the job is done.",
  },
];

export default function AIEthics() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.aiEthics} />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Ethics & Transparency
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              We tell businesses to walk the talk with AI. Here's how we walk
              ours — our principles, how we use AI, and what we won't do.
            </p>
          </div>
        </section>

        {/* Our AI Principles */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-aubergine-900 mb-4">
              Our AI Principles
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              Five commitments that guide every engagement, recommendation, and
              deployment.
            </p>
            <div className="space-y-8">
              {principles.map((p) => (
                <div key={p.title} className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-salmon-50 flex items-center justify-center flex-shrink-0">
                    <p.icon className="h-6 w-6 text-salmon-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-aubergine-900 mb-1">
                      {p.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Use AI */}
        <section className="py-20 bg-cream-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-aubergine-900 mb-4">
              How We Use AI
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              We use AI in our own operations — here's the general categories
              and how they serve our clients.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {usageCategories.map((cat) => (
                <div
                  key={cat.title}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-aubergine-50 flex items-center justify-center mb-4">
                    <cat.icon className="h-5 w-5 text-aubergine-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-aubergine-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Won't Do */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-aubergine-900 mb-4">
              What We Won't Do
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              Clear boundaries matter more than vague promises. Here are ours.
            </p>
            <div className="bg-aubergine-900 rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                {boundaries.map((b, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <b.icon className="h-5 w-5 text-salmon-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-lg">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Client Data Promise */}
        <section className="py-20 bg-cream-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-aubergine-900 mb-4">
              Client Data Promise
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              How we handle your data — no surprises, no fine print.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {dataPromises.map((dp) => (
                <div key={dp.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-salmon-50 flex items-center justify-center flex-shrink-0">
                    <dp.icon className="h-5 w-5 text-salmon-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-aubergine-900 mb-1">
                      {dp.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {dp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/about" className="text-salmon-600 hover:text-salmon-700 underline">About Us</a>
                <a href="/services/audit" className="text-salmon-600 hover:text-salmon-700 underline">Free Assessment</a>
                <a href="/privacy" className="text-salmon-600 hover:text-salmon-700 underline">Privacy Policy</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Questions About Our Approach?</h2>
            <p className="text-gray-300 mb-6">
              We're happy to discuss our AI ethics framework, data handling, or
              anything else. Transparency is the point.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center px-6 py-3 bg-salmon-500 hover:bg-salmon-400 text-aubergine-900 font-semibold rounded-full transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
