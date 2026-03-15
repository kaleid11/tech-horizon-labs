import type { CompanyData } from "./types";
import { C } from "./types";

export const googleDeepMindData: CompanyData = {
  meta: {
    id: "google-deepmind", name: "Google DeepMind", color: "#4285F4",
    tagline: "World's largest AI lab. Gemini models. $2.3T parent company.",
    headerTitle: "Google DeepMind", headerSubtitle: "The AI Superpower Within Alphabet",
    lastUpdated: "Mar 2026", keyModel: "Gemini 3.1 Pro", openSource: "No",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Key Events" },
    { id: "funding", label: "Investment" },
    { id: "valuation", label: "Market Cap" },
    { id: "investors", label: "Ecosystem" },
  ],
  boardMembers: [
    { name: "Sundar Pichai", role: "CEO, Alphabet & Google", tag: "CEO", color: "#4285F4", desc: "Born in Chennai, India. Stanford MS, Wharton MBA. Led Chrome, Android, and Google's AI pivot. CEO since 2015 (Alphabet 2019). Oversees all AI strategy." },
    { name: "Demis Hassabis", role: "CEO, Google DeepMind", tag: "DeepMind CEO", color: "#34A853", desc: "Child chess prodigy. Founded DeepMind 2010. Nobel Prize in Chemistry 2024 for AlphaFold. Merged Google Brain + DeepMind Apr 2023. Leads Gemini development." },
    { name: "Jeff Dean", role: "Chief Scientist, Google DeepMind", tag: "Chief Scientist", color: C.orange, desc: "Google employee #20. Built MapReduce, BigTable, TensorFlow. Led Google Brain. Now Chief Scientist overseeing fundamental AI research." },
    { name: "James Manyika", role: "SVP, Research, Technology & Society", tag: "SVP", color: C.purple, desc: "Former McKinsey Global Institute chairman. Rhodes Scholar. Oxford DPhil. Leads Google's AI policy, responsible AI, and societal impact initiatives." },
    { name: "Koray Kavukcuoglu", role: "VP Research, DeepMind", tag: "VP Research", color: C.teal, desc: "Joined DeepMind 2013. Led teams behind AlphaGo, AlphaFold, and Gemini. Key architect of DeepMind's research strategy." },
  ],
  timeline: [
    { date: "Jan 2014", title: "Google Acquires DeepMind", sev: "critical", desc: "Google acquires DeepMind for ~$500M. Conditions include creation of AI ethics board (later dissolved). Largest AI acquisition at the time." },
    { date: "Mar 2016", title: "AlphaGo Defeats Lee Sedol", sev: "info", desc: "AlphaGo defeats world Go champion Lee Sedol 4-1. Watched by 200M people. Moment that put AI on the global map." },
    { date: "Dec 2020", title: "AlphaFold Solves Protein Folding", sev: "info", desc: "AlphaFold predicts 3D structures of nearly all known proteins. Called 'the most important AI breakthrough ever' by scientists. Nobel Prize follows in 2024." },
    { date: "Apr 2023", title: "Brain + DeepMind Merged", sev: "critical", desc: "Google Brain and DeepMind merged into Google DeepMind under Hassabis. Internal politics resolved. Unified 2,000+ researcher team." },
    { date: "Dec 2023", title: "Gemini 1.0 Launch", sev: "info", desc: "Gemini multimodal model launched. Ultra, Pro, and Nano variants. First model to claim human-expert performance on MMLU benchmark." },
    { date: "Feb 2024", title: "Gemini Image Controversy", sev: "warn", desc: "Gemini generates historically inaccurate diverse images (Black Nazi soldiers, etc). Google pauses image generation. Major PR crisis." },
    { date: "Dec 2024", title: "Gemini 2.0 Launch", sev: "info", desc: "Gemini 2.0 Flash released. Agentic AI capabilities. Native tool use. Multimodal reasoning across text, images, audio, video." },
    { date: "Aug 2024", title: "Antitrust Ruling", sev: "critical", desc: "Judge rules Google maintained illegal monopoly in search. DOJ seeks remedies including potential Chrome divestiture. AI search under scrutiny." },
    { date: "Oct 2024", title: "Nobel Prize for AlphaFold", sev: "info", desc: "Demis Hassabis and John Jumper awarded Nobel Prize in Chemistry for AlphaFold. First Nobel for an AI system's contribution." },
  ],
  fundingRounds: [
    { date: "Jan 2014", label: "Acquisition", total: 500, val: 500, lead: "Google (Alphabet)", inv: [{ n: "Google", a: 500, note: "Acquisition price ~$500M" }], events: ["DeepMind acquired by Google"] },
    { date: "2023", label: "AI CapEx", total: 32000, val: 1700000, lead: "Alphabet Internal", inv: [{ n: "Alphabet", a: 32000, note: "AI infrastructure capex" }], events: ["Google Cloud AI revenue $33B", "Custom TPU v5 chips", "$300M invested in Anthropic", "Alphabet market cap ~$1.7T"] },
    { date: "2024", label: "AI CapEx", total: 50000, val: 2100000, lead: "Alphabet Internal", inv: [{ n: "Alphabet", a: 50000, note: "AI infrastructure capex" }], events: ["Google Cloud AI revenue $43B", "Gemini 2.0 launched", "Nobel Prize for AlphaFold", "Alphabet market cap ~$2.1T"] },
    { date: "2025", label: "AI CapEx", total: 75000, val: 2300000, lead: "Alphabet Internal", inv: [{ n: "Alphabet", a: 75000, note: "Committed AI infrastructure" }], events: ["$75B AI infrastructure commitment", "Gemini 3.0", "2,000+ DeepMind researchers", "Alphabet market cap ~$2.3T"] },
  ],
  financials: [
    { label: "ALPHABET REVENUE", value: "$350B", color: "#4285F4" },
    { label: "AI CAPEX (2025)", value: "$75B", color: C.warn },
    { label: "CLOUD AI REV", value: "$43B", color: C.green },
    { label: "MARKET CAP", value: "$2.3T", color: "#34A853" },
  ],
};
