import IndustryLandingTemplate from "@/components/industry-landing-template";
import { SEO_CONFIGS } from "@/components/seo/page-seo";
import { Calculator, FileSearch, Users } from "lucide-react";

export default function AccountingIndustry() {
  return (
    <IndustryLandingTemplate
      seoConfig={SEO_CONFIGS.industries.accounting}
      industry="Accounting"
      slug="accounting"
      tagline="AI for Accounting Firms — QLD & Australia"
      heroDescription="Your clients expect faster turnarounds. Your staff are drowning in data entry. Most AI vendors pitch document automation without checking whether your data is even structured for it. We find the actual bottleneck first."
      stats={[
        { value: "40%", label: "Admin Reduction" },
        { value: "3x", label: "Faster Data Entry" },
        { value: "4 Weeks", label: "To Implement" },
        { value: "100%", label: "ATO Compliant" },
      ]}
      bottleneckTitle="The Bottleneck Most Accounting Firms Don't Know They Have"
      bottleneckDescription="It's not that your team is slow — it's that they're spending 40% of their time on tasks that never needed to be manual in the first place. Bank statement reconciliation, receipt classification, client data entry, BAS preparation — the repetitive work that eats into the advisory time your clients are actually paying for."
      whatOthersSell="A generic document scanner with 'AI-powered OCR', a chatbot for your website, and a pitch about how AI will 'revolutionise' your practice — with zero understanding of APES 110, TPB requirements, or how your practice management system actually works."
      whatWeActuallyDo="We sit down with your senior staff, map the workflow from client document receipt to lodgement, find the specific bottleneck eating the most billable hours, and build a focused fix that integrates with your existing software — Xero, MYOB, or whatever you use."
      useCases={[
        {
          icon: Calculator,
          title: "Receipt Processing",
          subtitle: "Data Entry",
          description: "AI classifies receipts, extracts data, matches to chart of accounts, and pre-fills entries. Staff review rather than type.",
          metric: "40% less admin time",
        },
        {
          icon: FileSearch,
          title: "Document Triage",
          subtitle: "Workflow",
          description: "Client documents automatically sorted, classified, and routed to the right team member. No more shared inbox chaos.",
          metric: "3x faster processing",
        },
        {
          icon: Users,
          title: "Client Communication",
          subtitle: "Advisory",
          description: "Automated follow-ups for missing documents, BAS reminders, and status updates. Frees up your team for actual advisory work.",
          metric: "60% fewer follow-up calls",
        },
      ]}
      caseStudyLink="/portfolio/accounting-firm"
      caseStudyLabel="Accounting Firm Case Study"
      faqs={[
        {
          question: "Does this work with our existing practice management software?",
          answer: "Yes. We integrate with Xero, MYOB, QuickBooks, and most practice management platforms. The goal is to enhance your existing workflow, not rip and replace.",
        },
        {
          question: "What about data security and TPB compliance?",
          answer: "Everything runs on private infrastructure — your client data never leaves your control. We build to Privacy Act 1988 compliance and understand TPB requirements around data handling.",
        },
        {
          question: "We're a small firm with 5-10 staff. Is this for us?",
          answer: "That's exactly our sweet spot. Small to mid-sized firms benefit the most because every hour of admin saved goes directly to the bottom line. The free audit will tell you if the ROI justifies it.",
        },
        {
          question: "How long before we see results?",
          answer: "The bottleneck audit takes 15 minutes and gives you immediate clarity. If we implement, the Accelerator is a 4-week sprint — most firms see measurable time savings within the first month.",
        },
      ]}
    >
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Related Services & Industries</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/portfolio/accounting-firm" className="text-salmon-600 hover:text-salmon-700 underline">Case Study</a>
          <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
          <a href="/industries/construction" className="text-salmon-600 hover:text-salmon-700 underline">AI for Construction</a>
          <a href="/locations/queensland" className="text-salmon-600 hover:text-salmon-700 underline">Queensland Coverage</a>
        </div>
      </div>
    </IndustryLandingTemplate>
  );
}
