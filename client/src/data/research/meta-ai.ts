import type { CompanyData } from "./types";
import { C } from "./types";

export const metaAIData: CompanyData = {
  meta: {
    id: "meta-ai", name: "Meta AI", color: "#0668E1",
    tagline: "Open-source AI leader. LLaMA models. LeCun departed Nov 2025. $1.6T market cap.",
    headerTitle: "Meta AI — Open Source", headerSubtitle: "Strategy & The LLaMA Empire",
    lastUpdated: "Mar 2026", keyModel: "LLaMA 4", openSource: "Yes (LLaMA)", founded: "2013", hq: "Menlo Park",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Key Events" },
    { id: "funding", label: "Investment" },
    { id: "valuation", label: "Market Cap" },
    { id: "investors", label: "Strategy" },
    { id: "competition", label: "Competition" },
  ],
  boardMembers: [
    { name: "Mark Zuckerberg", role: "CEO & Chairman, Meta", tag: "CEO", color: "#0668E1", desc: "Founded Facebook at 19. Controls Meta through dual-class share structure with ~60% voting power. Bet the company on metaverse, now pivoting to AI. Net worth ~$180B." },
    { name: "Alexandr Wang", role: "Chief AI Officer", tag: "Chief AI Officer", color: C.orange, desc: "Former CEO of Scale AI. Recruited by Zuckerberg in June 2025 after $14.5B Scale AI investment. Leads Meta Superintelligence Labs (MSL). At 28, became one of Meta's most powerful executives." },
    { name: "Shengjia Zhao", role: "Chief Scientist, MSL", tag: "Chief Scientist", color: C.green, desc: "Appointed Chief Scientist of Meta Superintelligence Labs in July 2025. Previously at OpenAI (2022-2025) where he worked on ChatGPT, GPT-4, and o1 reasoning model." },
    { name: "Chris Cox", role: "Chief Product Officer", tag: "CPO", color: C.purple, desc: "One of Facebook's first 15 engineers. Built News Feed. Left 2019, returned 2020. Oversees Meta AI integration across Facebook, Instagram, WhatsApp." },
    { name: "Ahmad Al-Dahle", role: "VP, GenAI", tag: "VP GenAI", color: C.teal, desc: "Leads Meta's generative AI team. Previously at Apple (Siri). Oversees LLaMA model development, Meta AI assistant, and AI integration across all Meta products." },
  ],
  departedTrustees: [
    { name: "Yann LeCun", role: "Chief AI Scientist (2013-2025)", departed: "Nov 2025", note: "Turing Award winner. Founded FAIR in 2013. Left after 12 years citing strategic disagreements with Zuckerberg. Forced to report to 28-year-old Alexandr Wang. Launched AMI Labs in Paris to pursue 'world models' approach. Valued at ~$3.5B pre-launch." },
    { name: "Joelle Pineau", role: "VP, AI Research (FAIR)", departed: "2025", note: "McGill University professor. Led FAIR and championed LLaMA's open-source release. Focus on reinforcement learning and robotics." },
  ],
  timeline: [
    { date: "Dec 2013", title: "FAIR Founded", sev: "info", desc: "Facebook AI Research (FAIR) founded under Yann LeCun. One of the first major corporate AI labs. Focus on fundamental research and open publication." },
    { date: "Feb 2023", title: "LLaMA 1 Released", sev: "critical", desc: "LLaMA released to researchers. Leaked publicly within a week. 65B parameter model matching GPT-3.5. Kickstarted the open-source LLM revolution." },
    { date: "Jul 2023", title: "LLaMA 2 — Full Open Source", sev: "critical", desc: "LLaMA 2 released as fully open source. Free for commercial use. Partnership with Microsoft for distribution. Changed the AI industry's dynamics." },
    { date: "Apr 2024", title: "LLaMA 3 Launch", sev: "info", desc: "LLaMA 3 released in 8B and 70B variants. State-of-the-art open model. 400B version follows. Training on 15T+ tokens." },
    { date: "Sep 2024", title: "LLaMA 3.2 — Multimodal", sev: "info", desc: "LLaMA 3.2 adds vision capabilities. 11B and 90B multimodal models. Lightweight 1B and 3B models for edge devices." },
    { date: "Jan 2025", title: "Meta AI Assistant Hits 700M Users", sev: "info", desc: "Meta AI assistant integrated across WhatsApp, Instagram, Facebook reaches 700M monthly users. Largest AI assistant deployment by user count." },
    { date: "2024-2025", title: "Reality Labs: $50B+ Losses", sev: "warn", desc: "Reality Labs division has accumulated $50B+ in losses since 2020. Metaverse pivot widely criticized. Zuckerberg pivots narrative to AI-first." },
    { date: "Jun 2025", title: "Scale AI Deal & Wang Hired", sev: "critical", desc: "Zuckerberg invests $14.5B in Scale AI and recruits 28-year-old CEO Alexandr Wang as Meta's Chief AI Officer. Creates Meta Superintelligence Labs (MSL)." },
    { date: "Jul 2025", title: "Shengjia Zhao Joins from OpenAI", sev: "info", desc: "Shengjia Zhao hired from OpenAI as Chief Scientist of MSL. Previously worked on ChatGPT, GPT-4, and o1 reasoning model." },
    { date: "Nov 2025", title: "Yann LeCun Departs", sev: "critical", desc: "Yann LeCun leaves Meta after 12 years as Chief AI Scientist. Cites strategic disagreements with Zuckerberg's shift from research to rapid deployment. Launches AMI Labs in Paris focused on 'world models'. LeCun was forced to report to Wang despite nearly 40 years age gap." },
    { date: "Feb 2026", title: "LLaMA 4 Expected", sev: "info", desc: "LLaMA 4 in development. Expected to include mixture-of-experts architecture. Targeting GPT-4+ performance in open weights." },
  ],
  fundingRounds: [
    { date: "2023", label: "AI CapEx", total: 15000, val: 950000, lead: "Meta Internal", inv: [{ n: "Meta Internal", a: 15000, note: "AI infrastructure spend" }], events: ["LLaMA 2 release drives open-source AI", "Meta market cap ~$950B"], external: false },
    { date: "2024", label: "AI CapEx", total: 35000, val: 1400000, lead: "Meta Internal", inv: [{ n: "Meta Internal", a: 35000, note: "AI infrastructure spend" }], events: ["LLaMA 3 launch", "Meta AI assistant 700M users", "Meta market cap ~$1.4T"], external: false },
    { date: "2025", label: "AI CapEx", total: 65000, val: 1600000, lead: "Meta Internal", inv: [{ n: "Meta Internal", a: 65000, note: "AI infrastructure commitment" }], events: ["$60-65B AI capex commitment", "600K+ GPU cluster planned", "Custom MTIA chips", "Meta market cap ~$1.6T"], external: false },
  ],
  financials: [
    { label: "META REVENUE", value: "$160B", color: "#0668E1" },
    { label: "AI CAPEX 2025", value: "$60-65B", color: C.warn },
    { label: "META AI USERS", value: "700M", color: C.green },
    { label: "MARKET CAP", value: "$1.6T", color: "#0668E1" },
  ],
  competitors: [
    { name: "OpenAI", users: "300M+ weekly users", color: "#10A37F", note: "Meta AI vs ChatGPT is the raw scale war. Meta AI has 700M monthly users across WhatsApp, Instagram, Facebook, and Messenger — more than double ChatGPT's 300M weekly actives. But Meta wins on distribution, not intent: users encounter Meta AI because they're already on the platform. ChatGPT users seek it out. OpenAI dominates premium enterprise and developer mindshare — GPT-4o API usage far exceeds LLaMA deployments in revenue-generating apps. The fundamental question: can Meta AI capture enough monetisable intent (shopping, local services, creative work) to justify $65B in annual AI capex?" },
    { name: "Google DeepMind", users: "Unknown enterprise", color: "#4285F4", note: "Two data monopolies at war. Google controls search intent (what people want to find); Meta controls the social graph (who people know and what they share). Both are embedding AI deeply into their platforms. The open-source battleground: LLaMA leads open-source adoption by downloads; Gemini leads by raw capability. Meta's $14.5B Scale AI investment is a direct signal that data quality — not model architecture — is the next moat, and Meta is already one of the world's largest data collectors." },
    { name: "Anthropic", users: "Unknown MAU", color: "#D4A843", note: "Claude is the quality benchmark for enterprise AI writing and analysis. Meta AI is mass-market consumer. These two barely compete directly — except through LLaMA. Developers who use LLaMA to build apps are the same developers who would otherwise license Claude API. Meta's open-source strategy creates a floor on Claude API pricing: if LLaMA is free and good enough, Claude must compete on quality premium alone. Meta's hedge: massive investment in Scale AI signals awareness that enterprise data quality labelling is where the next frontier is built." },
    { name: "ByteDance (TikTok/Doubao)", users: "160M+ MAU", color: "#FF0050", note: "The rivalry that most resembles Meta's own competitive history. ByteDance built TikTok by taking the young consumer attention Meta thought it owned — now it's doing the same with AI. Doubao has 160M MAU in China and is expanding globally with aggressive API pricing (often 10-50x cheaper than comparable Western models). The TikTok-Meta rivalry extends fully into AI: ByteDance's recommendation algorithms and AI assistants compete for the same young users, the same creator economy, and the same advertising dollars. If TikTok survives US scrutiny, Doubao becomes the next major competitive threat to Meta AI globally." },
    { name: "Apple Intelligence", users: "1B+ iPhone users", color: "#A2AAAD", note: "Apple's on-device AI and Siri integration represent Meta's most structurally difficult competitive threat. Apple controls the hardware layer for over 1B users — including the most valuable demographic for advertising. If Apple locks AI into device-level workflows (summarising notifications, managing calendars, automating tasks without leaving the phone), Meta's app-layer AI assistant loses relevance on the most lucrative hardware. Apple Intelligence doesn't need to match Meta AI in capability — it just needs to be convenient enough on the device that users stop opening WhatsApp to ask Meta AI questions." },
  ],
  competitorStats: [
    { label: "META AI MAU", value: "700M", color: "#0668E1" },
    { label: "LLAMA DOWNLOADS", value: "400M+", color: C.green },
    { label: "REALITY LABS LOSS", value: "$50B+", color: C.red },
  ],
};
