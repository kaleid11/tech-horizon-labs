import IndustryLandingTemplate from "@/components/industry-landing-template";
import { SEO_CONFIGS } from "@/components/seo/page-seo";
import { HardHat, FileText, Clock } from "lucide-react";
import { getIndustryRelevantData } from "@/data/ai-impact-by-industry";

export default function ConstructionIndustry() {
  return (
    <IndustryLandingTemplate
      seoConfig={SEO_CONFIGS.industries.construction}
      industry="Construction"
      slug="construction"
      breadcrumbItems={[
        { label: "Services", href: "/services/audit" },
        { label: "Industries", href: "/industries/construction" },
        { label: "Construction" },
      ]}
      tagline="AI for Construction — Sunshine Coast & QLD"
      heroDescription="Most AI consultants sell construction companies chatbots and dashboards. We find the one bottleneck buried in your quoting, invoicing, or compliance process that's costing you hours every week — then fix it."
      aiImpact={{
        headline: "Construction's AI opportunity isn't on the tools — it's in the office.",
        description: "Research shows construction site work has low AI coverage (30%), but the admin tasks around it — quoting, invoicing, compliance — fall under Office & Admin Support (94% coverage). Only 6% of construction businesses use AI for any task. The gap is enormous.",
        data: getIndustryRelevantData("construction"),
      }}
      stats={[
        { value: "60%", label: "Faster Quotes" },
        { value: "2 Days", label: "Saved Per Week" },
        { value: "4 Weeks", label: "To Implement" },
        { value: "100%", label: "Privacy Compliant" },
      ]}
      bottleneckTitle="The Bottleneck Most Builders Don't Know They Have"
      bottleneckDescription="Every builder knows quoting takes too long. What most don't realise is how much time leaks through invoice processing, variation tracking, and compliance documentation. A construction director we worked with was spending 2 full days a week on invoicing alone — and didn't consider it a problem because 'that's just how it works.' It's not."
      whatOthersSell="A shiny AI chatbot for your website, a 'smart' project dashboard that nobody uses, and a 12-month digital transformation roadmap that costs more than your last excavator."
      whatWeActuallyDo="We map your actual workflow, find the specific task eating the most time, and build one focused solution that works within your existing systems. If a spreadsheet fix is better than AI, we'll tell you."
      useCases={[
        {
          icon: FileText,
          title: "Invoice Automation",
          subtitle: "Admin",
          description: "Construction director cut invoice processing from 2 days to 1 hour. AI reads invoices, matches to POs, flags discrepancies automatically.",
          metric: "2 days → 1 hour weekly",
        },
        {
          icon: HardHat,
          title: "Quote Generation",
          subtitle: "Sales",
          description: "AI-assisted quoting pulls from historical data, supplier pricing, and project specs. Same accuracy, 60% of the time.",
          metric: "60% faster quoting",
        },
        {
          icon: Clock,
          title: "Compliance Docs",
          subtitle: "Operations",
          description: "Automated safety documentation, site diaries, and compliance reports. Pre-filled from project data, ready for review and sign-off.",
          metric: "80% less paperwork",
        },
      ]}
      caseStudyLink="/portfolio/construction-builder"
      caseStudyLabel="Builder Case Study"
      faqs={[
        {
          question: "We're builders, not tech people. Can we actually use this?",
          answer: "That's the whole point. If your team can use a smartphone, they can use what we build. We train your admin staff, PMs, and site managers in the tools — and if something doesn't stick, we adjust until it does.",
        },
        {
          question: "What about sensitive project data and client information?",
          answer: "Everything runs on private infrastructure. Your project data, client details, and financial information never touch overseas servers. We build to Privacy Act 1988 compliance from day one.",
        },
        {
          question: "How much does it cost?",
          answer: "The initial audit is free — 15 minutes to identify your biggest bottleneck. If we recommend an implementation, our Accelerator starts at $5K for a 4-week sprint. But if the ROI doesn't justify it, we'll say so.",
        },
        {
          question: "Do you work with residential or commercial builders?",
          answer: "Both. The bottlenecks are different — residential tends to be quoting and variation management, commercial is more about compliance and subcontractor coordination — but the approach is the same: find the right problem, fix it, prove it worked.",
        },
      ]}
    >
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Related Services & Industries</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/portfolio/construction-builder" className="text-salmon-600 hover:text-salmon-700 underline">Case Study</a>
          <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
          <a href="/industries/accounting" className="text-salmon-600 hover:text-salmon-700 underline">AI for Accounting</a>
          <a href="/locations/queensland" className="text-salmon-600 hover:text-salmon-700 underline">Queensland Coverage</a>
        </div>
      </div>
    </IndustryLandingTemplate>
  );
}
