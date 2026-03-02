import type { CompanyData } from "./types";
import { C } from "./types";

export const mistralData: CompanyData = {
  meta: {
    id: "mistral", name: "Mistral AI", color: "#FF7000",
    tagline: "Europe's AI champion. French sovereignty. Open-weight models.",
    headerTitle: "Mistral AI — Europe's", headerSubtitle: "Answer to Silicon Valley",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Key Events" },
    { id: "funding", label: "Funding" },
    { id: "investors", label: "Investors" },
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
};
