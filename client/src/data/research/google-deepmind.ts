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
    { id: "competition", label: "Competition" },
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
    { date: "2023", label: "AI CapEx", total: 32000, val: 1700000, lead: "Alphabet Internal", inv: [{ n: "Alphabet", a: 32000, note: "AI infrastructure capex" }], events: ["Google Cloud AI revenue $33B", "Custom TPU v5 chips", "$300M invested in Anthropic", "Alphabet market cap ~$1.7T"], external: false },
    { date: "2024", label: "AI CapEx", total: 50000, val: 2100000, lead: "Alphabet Internal", inv: [{ n: "Alphabet", a: 50000, note: "AI infrastructure capex" }], events: ["Google Cloud AI revenue $43B", "Gemini 2.0 launched", "Nobel Prize for AlphaFold", "Alphabet market cap ~$2.1T"], external: false },
    { date: "2025", label: "AI CapEx", total: 75000, val: 2300000, lead: "Alphabet Internal", inv: [{ n: "Alphabet", a: 75000, note: "Committed AI infrastructure" }], events: ["$75B AI infrastructure commitment", "Gemini 3.0", "2,000+ DeepMind researchers", "Alphabet market cap ~$2.3T"], external: false },
  ],
  financials: [
    { label: "ALPHABET REVENUE", value: "$350B", color: "#4285F4" },
    { label: "AI CAPEX (2025)", value: "$75B", color: C.warn },
    { label: "CLOUD AI REV", value: "$43B", color: C.green },
    { label: "MARKET CAP", value: "$2.3T", color: "#34A853" },
  ],
  competitors: [
    { name: "OpenAI", users: "300M+ weekly users", color: "#10A37F", note: "The defining rivalry. ChatGPT disrupted Google's search monopoly — the first genuine threat in 20 years. Gemini 2.0 Flash vs GPT-4o is the current benchmark battle. Google has more raw research talent and far more training data via Search, YouTube, and Gmail. OpenAI has faster product iteration, stronger developer mindshare, and Microsoft's enterprise distribution. Google Cloud AI generates ~$43B revenue but Azure-OpenAI is eating enterprise budgets. DeepMind's structural advantage: it can train on Google's entire data corpus. Its weakness: moving from research to product has historically taken 2x as long." },
    { name: "Anthropic", users: "Unknown MAU", color: "#D4A843", note: "The most unusual competitive relationship in AI. Google has invested ~$3.3B in Anthropic — a deliberate hedge — while Gemini directly competes with Claude for the same enterprise contracts. Claude 3.5 Sonnet is DeepMind's primary rival in enterprise writing and long-context reasoning. Google simultaneously funds Anthropic's safety research and tries to beat it commercially. If Claude wins enterprise, Google loses the API battle but wins the investment. If Gemini wins, Google wins both. Only Google is playing both sides of this board." },
    { name: "Meta AI (LLaMA)", users: "700M MAU", color: "#0668E1", note: "Meta's open-source strategy is an existential threat to Google's API revenue model. If LLaMA 3 70B (free, on-premise) is good enough for enterprise workloads, companies stop paying for Gemini API entirely. Google's response: compete on capability (Gemini Pro/Ultra genuinely outperforms LLaMA on complex tasks) and ecosystem integration (Google Workspace, Vertex AI). DeepMind's structural advantage over LLaMA is genuine — but it narrows every release cycle." },
    { name: "Microsoft + OpenAI", users: "1.2B Office 365 users", color: "#00BCF2", note: "The Azure-OpenAI partnership is structurally parallel to Google's own AI+Cloud model — but 2-3 years ahead in enterprise adoption. Copilot integration across Office 365 (1.2B users) and Teams reaches the exact enterprise buyers Google targets with Workspace. Microsoft's go-to-market machine is world-class. Google has superior underlying research and a larger data advantage, but Microsoft has already signed the contracts. Enterprise AI adoption is sticky: once Copilot is embedded in workflows, switching to Gemini requires re-training and re-integrating — a significant barrier." },
    { name: "Apple Intelligence", users: "1B+ iPhone users", color: "#A2AAAD", note: "On-device AI is the emerging battleground Google cannot ignore. Google Gemini Nano runs on-device on Pixel phones; Apple Intelligence runs on iPhone. The stakes: whoever wins the on-device layer controls the most personal and contextually rich AI — calendar, messages, photos, location. Google's Android distribution is broader (3B+ devices) but Apple's hardware-software integration is tighter and its users are higher-value. Google's Gemini Nano partnership with Samsung Galaxy gives it reach, but Apple's vertical control of its supply chain is a durable moat on the device layer." },
  ],
  competitorStats: [
    { label: "ALPHABET MARKET CAP", value: "$2.3T", color: "#4285F4" },
    { label: "CLOUD AI REVENUE", value: "$43B/yr", color: "#34A853" },
    { label: "ALPHAFOLD CITATIONS", value: "2M+", color: C.gold },
  ],
};
