import type { CompanyData } from "./types";
import { C } from "./types";

export const mistralData: CompanyData = {
  meta: {
    id: "mistral", name: "Mistral AI", color: "#FF7000",
    tagline: "Europe's AI champion. French sovereignty. Open-weight models.",
    headerTitle: "Mistral AI — Europe's", headerSubtitle: "Answer to Silicon Valley",
    lastUpdated: "Mar 2026", keyModel: "Mistral Large", openSource: "Yes (Apache)", founded: "2023", hq: "Paris",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Key Events" },
    { id: "funding", label: "Funding" },
    { id: "investors", label: "Investors" },
    { id: "competition", label: "Competition" },
    { id: "controversies", label: "Controversies", badge: "!" },
  ],
  boardMembers: [
    { name: "Arthur Mensch", role: "CEO & Co-Founder", tag: "CEO", color: "#FF7000", desc: "Former DeepMind researcher. ENS Paris graduate. Led work on Chinchilla scaling laws at DeepMind. Founded Mistral May 2023. The face of European AI sovereignty." },
    { name: "Guillaume Lample", role: "Chief Scientist & Co-Founder", tag: "Chief Scientist", color: C.blue, desc: "Former Meta AI researcher. Expert in NLP and machine translation. Co-created CrossLingual Language Model pretraining. ENS Paris and Sorbonne PhD." },
    { name: "Timothee Lacroix", role: "CTO & Co-Founder", tag: "CTO", color: C.green, desc: "Former Meta AI researcher. Expertise in large-scale distributed training systems. Built infrastructure for LLaMA at Meta before founding Mistral." },
  ],
  timeline: [
    { date: "May 2023", title: "Mistral AI Founded", sev: "info", desc: "Three ex-DeepMind/Meta researchers found Mistral in Paris. Raised $113M seed round in weeks — a European record. Mission: build open, efficient AI models." },
    { date: "Sep 2023", title: "Mistral 7B Released", sev: "info", desc: "Mistral 7B released as open weights. Outperforms LLaMA 2 13B on most benchmarks despite being half the size. Proves European AI can compete." },
    { date: "Dec 2023", title: "$415M Series A", sev: "critical", desc: "Raises $415M at $2B valuation. A16z leads. Largest Series A for a European AI company. Just 7 months after founding." },
    { date: "Feb 2024", title: "Mistral Large + Le Chat", sev: "info", desc: "Mistral Large launched — first commercial model. Le Chat (consumer chatbot) launched same day. Partnership with Microsoft Azure." },
    { date: "Jun 2024", title: "$640M Series B", sev: "critical", desc: "$640M at $6B valuation. General Catalyst leads. DST Global, Nvidia, Samsung participate. Tripled valuation in 6 months." },
    { date: "Mar 2025", title: "EU AI Act Navigation", sev: "warn", desc: "Mistral initially lobbied against EU AI Act's open-source restrictions. Pivoted to compliance. Positioned as the 'responsible European alternative' to US/China AI." },
    { date: "Jul 2025", title: "Mistral Medium 3 Launch", sev: "info", desc: "Mistral Medium 3 released. Competitive with GPT-4o at fraction of cost. Mixture-of-experts architecture. Le Chat reaches 10M users." },
    { date: "Nov 2025", title: "Series C — $2B", sev: "critical", desc: "$2B raised at $15B valuation. Sovereign wealth funds participate. French government provides compute subsidies. Europe's most valuable AI startup." },
  ],
  fundingRounds: [
    { date: "Jun 2023", label: "Seed", total: 113, val: 260, lead: "Lightspeed", inv: [{ n: "Lightspeed", a: 40 }, { n: "Other", a: 73 }], events: ["European record seed round", "Founded just weeks earlier"] },
    { date: "Dec 2023", label: "Series A", total: 415, val: 2000, lead: "a16z", inv: [{ n: "a16z", a: 150 }, { n: "Lightspeed", a: 80 }, { n: "Nvidia", a: 50 }, { n: "Other", a: 135 }], events: ["$2B valuation", "Largest European AI Series A"] },
    { date: "Jun 2024", label: "Series B", total: 640, val: 6000, lead: "General Catalyst", inv: [{ n: "General Catalyst", a: 200 }, { n: "Nvidia", a: 100 }, { n: "Samsung", a: 50 }, { n: "Other", a: 290 }], events: ["$6B valuation", "3x in 6 months"] },
    { date: "Nov 2025", label: "Series C", total: 2000, val: 15000, lead: "Various", inv: [{ n: "SoftBank", a: 500 }, { n: "Other", a: 1500, note: "Sovereign wealth, European VCs" }], events: ["$15B valuation", "Europe's most valuable AI startup"] },
  ],
  competitors: [
    { name: "OpenAI (GPT-4o)", users: "300M+ weekly", color: "#10A37F", note: "Mistral's primary enterprise target. Mistral Large competes on price-performance: comparable quality at a fraction of GPT-4o's API cost. OpenAI wins on brand recognition, ecosystem integrations, and enterprise sales. Mistral wins on data sovereignty for European deployments." },
    { name: "Anthropic (Claude)", users: "Unknown MAU", color: "#D4A843", note: "Claude 3.5 Sonnet dominates enterprise writing and analysis. Mistral competes on European data residency — Claude has no EU-hosted offering. Open-weight models give Mistral an on-premise option Claude can't match." },
    { name: "Meta AI (LLaMA)", users: "700M+ (Meta AI)", color: "#0668E1", note: "The primary open-source competitor. LLaMA 3 70B vs Mistral Large. Meta has unlimited compute and distribution via Facebook and Instagram. Mistral's advantage is efficiency — Mistral 7B and Medium 3 outperform larger LLaMA variants on cost-normalised benchmarks." },
    { name: "Google Gemini", users: "Unknown enterprise", color: "#4285F4", note: "Gemini 2.0 for enterprise cloud. Google Cloud integration is Mistral's main structural disadvantage in cloud-native shops — enterprises already on GCP rarely switch. Mistral counters with Azure partnership and open-weight deployability." },
    { name: "DeepSeek", users: "Undisclosed", color: "#4D6BFE", note: "The most dangerous efficiency competitor. DeepSeek V3 was trained for $5.6M vs Mistral's €150M+ investment, and matches or beats Mistral on many benchmarks. Directly challenges Mistral's core positioning as the cost-efficient frontier model. US/EU enterprise adoption is constrained by data sovereignty concerns over DeepSeek." },
  ],
  competitorStats: [
    { label: "SERIES C VALUATION", value: "$15B", color: "#FF7000" },
    { label: "LE CHAT USERS", value: "10M+", color: C.blue },
    { label: "MODEL VARIANTS", value: "5+", color: C.green },
  ],
  controversies: [
    { date: "2023–2025", title: "EU AI Act Lobbying Reversal", sev: "warn", desc: "In 2023, CEO Arthur Mensch publicly and repeatedly argued that the EU AI Act's obligations on general-purpose AI model providers were excessive, would harm European competitiveness, and should be lightened for foundation model developers. Mistral was among the most vocal industry voices lobbying against the general-purpose AI (GPAI) provisions. By 2025, once it became clear the Act would pass in its current form regardless of lobbying, Mistral pivoted sharply — repositioning itself publicly as the 'responsible European alternative' to US and Chinese AI, and framing EU AI Act compliance as a competitive advantage. Critics in Brussels and the AI policy community noted this looked less like a genuine change of view and more like market opportunism: opposing regulation when it was a cost, embracing it as a brand asset once it became inevitable." },
    { date: "Feb 2024", title: "Microsoft Partnership vs Sovereignty Narrative", sev: "critical", desc: "Mistral's core founding narrative and primary marketing asset is European AI sovereignty — the proposition that European enterprises should choose Mistral to be free from dependence on US Big Tech cloud providers. In February 2024, Mistral announced a distribution partnership with Microsoft Azure, making Mistral models available through Azure AI Studio and Azure Marketplace. Critics noted the immediate contradiction: Mistral's stated reason for existing is independence from US tech infrastructure, yet its growth is now materially dependent on Microsoft's cloud distribution, Azure's enterprise sales team, and Microsoft's commercial relationships. Mistral's response — that Azure is a distribution channel, not a control mechanism — is technically accurate but practically difficult to distinguish from dependency when Microsoft becomes the primary route to enterprise customers." },
    { date: "Ongoing", title: "French State Compute Subsidies", sev: "info", desc: "Mistral has received preferential access to French public compute infrastructure: access to the Jean Zay supercomputer at IDRIS (operated by GENCI, the French national HPC body) and priority allocation of GPU compute from French public research infrastructure. The French government has also actively promoted Mistral as a national AI champion through government communications, funded research partnerships, and regulatory positioning. While accessing public research infrastructure is entirely legal and common in European academic settings, critics in Germany, the Netherlands, and the European Commission have questioned whether the French state's active backing of a specific private startup constitutes an EU single market competitive distortion — in effect, French taxpayers subsidising compute costs for a private company competing against other European AI startups without equivalent state backing." },
    { date: "Ongoing", title: "Training Data and Copyright Exposure", sev: "info", desc: "Like all frontier LLM developers, Mistral has not published a detailed training data composition report. Its open-weight release strategy means independent researchers can systematically probe model outputs for evidence of verbatim reproduction of copyrighted material — a scrutiny level that closed-source models avoid. Several independent researchers have documented instances of apparent near-verbatim reproduction of copyrighted texts in Mistral model outputs. Mistral has made no public comment on specific findings. European copyright law — including the EU Copyright Directive's text and data mining exception for research — provides a legal basis for some training data use, but commercial applications are subject to stricter requirements. As European AI regulation matures, Mistral's training data provenance will face more formal scrutiny than its US competitors, who operate under different copyright frameworks." },
  ],
};
