export interface OccupationAIData {
  occupation: string;
  theoreticalCoverage: number;
  observedUsage: number;
  gap: number;
  color: string;
  relevantIndustries: string[];
  keyInsight: string;
}

export const occupationData: OccupationAIData[] = [
  {
    occupation: "Office & Administrative Support",
    theoreticalCoverage: 94,
    observedUsage: 32,
    gap: 62,
    color: "#e86c5a",
    relevantIndustries: ["accounting", "legal", "healthcare", "construction", "retail"],
    keyInsight: "Nearly all admin tasks can be AI-assisted, but only a third of businesses have adopted any AI for admin. The biggest untapped productivity gain across every industry.",
  },
  {
    occupation: "Computer & Mathematical",
    theoreticalCoverage: 90,
    observedUsage: 55,
    gap: 35,
    color: "#4488dd",
    relevantIndustries: [],
    keyInsight: "Tech-adjacent roles lead in adoption but still leave significant capability on the table. Data analysis and coding assistance are the most adopted use cases.",
  },
  {
    occupation: "Legal",
    theoreticalCoverage: 81,
    observedUsage: 28,
    gap: 53,
    color: "#8855cc",
    relevantIndustries: ["legal"],
    keyInsight: "Legal work has extremely high AI potential — document review, research, and drafting are all strong AI use cases. But adoption lags due to privilege concerns, compliance requirements, and conservative firm culture.",
  },
  {
    occupation: "Business & Financial Operations",
    theoreticalCoverage: 78,
    observedUsage: 30,
    gap: 48,
    color: "#44c488",
    relevantIndustries: ["accounting", "retail"],
    keyInsight: "Financial analysis, reporting, and compliance tasks are highly automatable. Most firms still rely on manual spreadsheet workflows that AI could streamline dramatically.",
  },
  {
    occupation: "Management",
    theoreticalCoverage: 60,
    observedUsage: 22,
    gap: 38,
    color: "#dd8844",
    relevantIndustries: ["construction", "retail"],
    keyInsight: "Management tasks like scheduling, reporting, and decision support are increasingly AI-capable. But most managers don't know what tools exist or how to integrate them.",
  },
  {
    occupation: "Sales & Related",
    theoreticalCoverage: 68,
    observedUsage: 24,
    gap: 44,
    color: "#cc5588",
    relevantIndustries: ["retail", "construction"],
    keyInsight: "Customer communication, proposal generation, and lead qualification are strong AI use cases. Retail and construction quoting see the most practical benefit.",
  },
  {
    occupation: "Healthcare Practitioners",
    theoreticalCoverage: 56,
    observedUsage: 14,
    gap: 42,
    color: "#44aabb",
    relevantIndustries: ["healthcare"],
    keyInsight: "Clinical documentation and referral processing are proven AI use cases. But adoption is extremely low due to regulatory caution and data privacy concerns. The gap represents a significant opportunity for compliant, private AI solutions.",
  },
  {
    occupation: "Construction & Extraction",
    theoreticalCoverage: 30,
    observedUsage: 6,
    gap: 24,
    color: "#d4a843",
    relevantIndustries: ["construction"],
    keyInsight: "Lower theoretical coverage than desk-based work, but the admin around construction (quoting, invoicing, compliance) scores much higher. The opportunity isn't on-site AI — it's automating the paperwork.",
  },
  {
    occupation: "Education & Training",
    theoreticalCoverage: 73,
    observedUsage: 26,
    gap: 47,
    color: "#6677cc",
    relevantIndustries: [],
    keyInsight: "Content creation, assessment, and curriculum development are strong AI use cases. Staff training and onboarding across all industries benefit from these same capabilities.",
  },
  {
    occupation: "Arts, Design & Media",
    theoreticalCoverage: 65,
    observedUsage: 34,
    gap: 31,
    color: "#bb5599",
    relevantIndustries: [],
    keyInsight: "Creative industries show higher-than-average adoption, driven by image generation and content tools. Marketing teams across all sectors are early adopters.",
  },
];

export function getIndustryRelevantData(industrySlug: string): OccupationAIData[] {
  return occupationData.filter(d => d.relevantIndustries.includes(industrySlug));
}

export const keyFindings = [
  {
    title: "The Admin Gap Is Universal",
    description: "Office & Administrative Support has 94% theoretical AI coverage but only 32% observed usage. Every industry — from construction to healthcare — has admin tasks that AI can handle today but isn't.",
  },
  {
    title: "Regulated Industries Lag Most",
    description: "Legal (81% theoretical, 28% observed) and Healthcare (56% theoretical, 14% observed) show the largest adoption gaps relative to capability. Privacy and compliance concerns slow adoption, but compliant solutions exist.",
  },
  {
    title: "Construction's Real Opportunity Isn't On-Site",
    description: "Construction & Extraction scores only 30% for theoretical AI coverage. But the admin tasks around construction — quoting, invoicing, compliance documentation — fall under Office & Admin (94%). The bottleneck is the paperwork.",
  },
  {
    title: "Financial Operations Are Ripe",
    description: "Business & Financial Operations at 78% theoretical coverage means most accounting, bookkeeping, and financial analysis tasks are AI-ready. At only 30% observed usage, firms doing this well have a genuine competitive advantage.",
  },
  {
    title: "Adoption Follows Awareness, Not Capability",
    description: "The pattern across every occupation is clear: the gap between what AI can do and what businesses actually use it for is driven by awareness, not technology limitations. The tools exist. The knowledge of how to deploy them safely doesn't.",
  },
];
