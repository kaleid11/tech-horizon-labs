import IndustryLandingTemplate from "@/components/industry-landing-template";
import { SEO_CONFIGS } from "@/components/seo/page-seo";
import { Scale, FileText, Search } from "lucide-react";
import { getIndustryRelevantData } from "@/data/ai-impact-by-industry";

export default function LegalIndustry() {
  return (
    <IndustryLandingTemplate
      seoConfig={SEO_CONFIGS.industries.legal}
      industry="Legal"
      slug="legal"
      tagline="AI for Law Firms — QLD & Australia"
      heroDescription="Every legal AI vendor leads with 'document review automation.' But if your firm's documents aren't structured consistently, or your precedent system is a shared drive with 10 years of folders, no AI tool will save you. We find the actual problem first."
      aiImpact={{
        headline: "Legal is one of the highest-coverage occupations for AI — but one of the slowest adopters.",
        description: "At 81% theoretical coverage, legal work ranks among the most AI-ready occupations. Document review, research, and drafting are all strong use cases. Yet only 28% of firms use any AI tools. Privilege concerns and conservative culture slow adoption, but compliant, private solutions exist.",
        data: getIndustryRelevantData("legal"),
      }}
      stats={[
        { value: "50%", label: "Faster Document Review" },
        { value: "70%", label: "Less Manual Searching" },
        { value: "4 Weeks", label: "To Implement" },
        { value: "100%", label: "Privilege Protected" },
      ]}
      bottleneckTitle="The Bottleneck Most Law Firms Don't Know They Have"
      bottleneckDescription="It's not the legal work that's killing your margins — it's the non-legal work wrapped around it. Finding precedents takes 30 minutes when it should take 30 seconds. Client intake involves retyping the same information into three different systems. File notes are written at 11pm because there wasn't time during the day. The bottleneck is usually in the workflow, not the lawyering."
      whatOthersSell="An AI contract review tool that hasn't been trained on Australian law, a 'legal chatbot' that gives generic answers, and a pitch about replacing junior lawyers — which misses the point entirely."
      whatWeActuallyDo="We map your firm's actual workflow — intake, research, drafting, review, filing — find the specific step eating the most non-billable time, and build a focused solution. Private infrastructure, privilege-aware, Australian law context."
      useCases={[
        {
          icon: Search,
          title: "Precedent Search",
          subtitle: "Research",
          description: "AI searches your firm's document history using natural language. 'Find all property settlements with sunset clauses from 2023' — answered in seconds, not hours.",
          metric: "70% faster research",
        },
        {
          icon: FileText,
          title: "Document Drafting",
          subtitle: "Productivity",
          description: "AI-assisted first drafts using your firm's templates and precedents. Lawyers review and refine rather than starting from scratch.",
          metric: "50% faster first drafts",
        },
        {
          icon: Scale,
          title: "Client Intake",
          subtitle: "Operations",
          description: "Automated intake forms, conflict checks, and matter opening. Information flows once, populates everywhere it needs to go.",
          metric: "60% less admin per matter",
        },
      ]}
      faqs={[
        {
          question: "What about legal professional privilege?",
          answer: "Everything runs on private infrastructure — your client data and communications never leave your control. We build privilege-aware systems that understand the distinction between privileged and non-privileged documents.",
        },
        {
          question: "Is this trained on Australian law?",
          answer: "We don't sell a generic AI tool. We build custom solutions using your firm's own documents, precedents, and templates. The AI understands your context because it's built from your data, not scraped from the internet.",
        },
        {
          question: "We're worried about AI giving wrong legal advice.",
          answer: "Good — so are we. Our tools assist lawyers, they don't replace them. AI handles the searching, sorting, and first-draft creation. Every output goes through human review. The goal is to free up your lawyers' time, not replace their judgement.",
        },
        {
          question: "What practice areas does this work for?",
          answer: "Any practice area with document-heavy workflows benefits. We've seen the biggest impact in property/conveyancing, family law, commercial, and estate planning — but the bottleneck audit will tell you exactly where your firm's biggest opportunity is.",
        },
      ]}
    >
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Related Services & Industries</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
          <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">Case Studies</a>
          <a href="/industries/accounting" className="text-salmon-600 hover:text-salmon-700 underline">AI for Accounting</a>
          <a href="/locations/queensland" className="text-salmon-600 hover:text-salmon-700 underline">Queensland Coverage</a>
        </div>
      </div>
    </IndustryLandingTemplate>
  );
}
