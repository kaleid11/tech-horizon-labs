import IndustryLandingTemplate from "@/components/industry-landing-template";
import { SEO_CONFIGS } from "@/components/seo/page-seo";
import { ShoppingBag, Package, BarChart3 } from "lucide-react";
import { getIndustryRelevantData } from "@/data/ai-impact-by-industry";

export default function RetailIndustry() {
  return (
    <IndustryLandingTemplate
      seoConfig={SEO_CONFIGS.industries.retail}
      industry="Retail"
      slug="retail"
      tagline="AI for Retail — QLD & Australia"
      heroDescription="Every retail AI pitch starts with 'personalised customer experiences.' But if your inventory data lives in three different systems and your staff spend hours on stock counts, no amount of personalisation will fix your margins. We find the operational bottleneck first."
      aiImpact={{
        headline: "Retail AI opportunity spans sales, management, and back-office operations.",
        description: "Sales & Related occupations have 68% theoretical coverage, Management 60%, and the admin underpinning retail operations sits at 94%. But observed usage across all three categories is below 32%. Inventory forecasting, order processing, and unified reporting are proven use cases waiting for adoption.",
        data: getIndustryRelevantData("retail"),
      }}
      stats={[
        { value: "30%", label: "Less Stockouts" },
        { value: "45%", label: "Faster Reordering" },
        { value: "4 Weeks", label: "To Implement" },
        { value: "100%", label: "Data Private" },
      ]}
      bottleneckTitle="The Bottleneck Most Retailers Don't Know They Have"
      bottleneckDescription="Retail margins are tight enough without invisible inefficiencies eating into them. The bottleneck usually isn't customer-facing — it's operational. Manual stock reconciliation across locations, ad-hoc reordering based on gut feel, disjointed customer data between online and in-store, and staff spending time on reporting that could be automated. Fix the back-office, and the front-of-house takes care of itself."
      whatOthersSell="A 'personalised AI shopping experience', a product recommendation engine trained on someone else's customers, and a chatbot that answers questions your FAQ page already covers."
      whatWeActuallyDo="We look at your actual operations — inventory flow, ordering process, customer data, and staff time allocation — find the one task creating the most drag on margins, and build a focused solution that works with your POS and existing systems."
      useCases={[
        {
          icon: Package,
          title: "Inventory Forecasting",
          subtitle: "Supply Chain",
          description: "AI analyses sales patterns, seasonal trends, and supplier lead times to predict stock needs. Reorder suggestions generated automatically — staff review and approve.",
          metric: "30% fewer stockouts",
        },
        {
          icon: ShoppingBag,
          title: "Order Processing",
          subtitle: "Operations",
          description: "Automated purchase order generation, supplier communication, and delivery tracking. The manual spreadsheet dance between systems stops here.",
          metric: "45% faster reordering",
        },
        {
          icon: BarChart3,
          title: "Sales Reporting",
          subtitle: "Insights",
          description: "Unified reporting across POS, e-commerce, and wholesale channels. Ask questions in plain English — 'what sold best last weekend?' — and get answers instantly.",
          metric: "80% less reporting time",
        },
      ]}
      faqs={[
        {
          question: "Does this work with our existing POS system?",
          answer: "We integrate with major POS platforms including Shopify, Lightspeed, Square, and Vend. If you use something else, the audit will determine compatibility. The goal is always to enhance your existing setup.",
        },
        {
          question: "We sell online and in-store. Can AI help unify our data?",
          answer: "That's one of the most common bottlenecks we find. We build systems that connect your channels so inventory, customer data, and reporting speak the same language across platforms.",
        },
        {
          question: "We're a single-location store. Is this overkill?",
          answer: "Not necessarily. Even a single store can save significant hours on inventory management, reordering, and reporting. The free audit will tell you whether the ROI makes sense for your scale.",
        },
        {
          question: "What about our customer data?",
          answer: "All customer data stays on private infrastructure — we never send it to overseas servers. Fully compliant with the Privacy Act 1988 and Australian Consumer Law requirements.",
        },
      ]}
    >
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Related Services & Industries</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/services/accelerator" className="text-salmon-600 hover:text-salmon-700 underline">Foundation Sprint</a>
          <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">Case Studies</a>
          <a href="/industries/construction" className="text-salmon-600 hover:text-salmon-700 underline">AI for Construction</a>
          <a href="/locations/queensland" className="text-salmon-600 hover:text-salmon-700 underline">Queensland Coverage</a>
        </div>
      </div>
    </IndustryLandingTemplate>
  );
}
