import type { CompanyData } from "./types";
import { C } from "./types";

export const metaAIData: CompanyData = {
  meta: {
    id: "meta-ai", name: "Meta AI", color: "#0668E1",
    tagline: "Open-source AI leader. LLaMA models. LeCun departed Nov 2025. $1.6T market cap.",
    headerTitle: "Meta AI — Open Source", headerSubtitle: "Strategy & The LLaMA Empire",
    lastUpdated: "Mar 2026", keyModel: "LLaMA 4", openSource: "Yes (LLaMA)",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Key Events" },
    { id: "funding", label: "Investment" },
    { id: "investors", label: "Strategy" },
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
    { date: "2023-2026", label: "AI CapEx", total: 65000, val: null, lead: "Meta Internal", inv: [{ n: "Meta Internal", a: 65000, note: "Cumulative AI infrastructure spend" }], events: ["$65B+ in AI infrastructure", "600K+ GPU cluster planned", "Custom MTIA chips"] },
  ],
  financials: [
    { label: "META REVENUE", value: "$160B", color: "#0668E1" },
    { label: "AI CAPEX 2025", value: "$60-65B", color: C.warn },
    { label: "META AI USERS", value: "700M", color: C.green },
    { label: "MARKET CAP", value: "$1.6T", color: "#0668E1" },
  ],
};
