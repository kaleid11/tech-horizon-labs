import type { CompanyData } from "./types";
import { C } from "./types";

export const metaAIData: CompanyData = {
  meta: {
    id: "meta-ai", name: "Meta AI", color: "#0668E1",
    tagline: "Open-source AI leader. LLaMA models. $50B+ Reality Labs losses.",
    headerTitle: "Meta AI — Open Source", headerSubtitle: "Strategy & The LLaMA Empire",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Key Events" },
    { id: "funding", label: "Investment" },
    { id: "investors", label: "Strategy" },
  ],
  boardMembers: [
    { name: "Mark Zuckerberg", role: "CEO & Chairman, Meta", tag: "CEO", color: "#0668E1", desc: "Founded Facebook at 19. Controls Meta through dual-class share structure with ~60% voting power. Bet the company on metaverse, now pivoting to AI. Net worth ~$180B." },
    { name: "Yann LeCun", role: "Chief AI Scientist", tag: "Chief Scientist", color: C.green, desc: "Turing Award winner (2018). Pioneer of convolutional neural networks. VP & Chief AI Scientist at Meta since 2013 (FAIR). Vocal critic of AI doomerism. Advocates for open-source AI." },
    { name: "Chris Cox", role: "Chief Product Officer", tag: "CPO", color: C.orange, desc: "One of Facebook's first 15 engineers. Built News Feed. Left 2019, returned 2020. Oversees Meta AI integration across Facebook, Instagram, WhatsApp." },
    { name: "Ahmad Al-Dahle", role: "VP, GenAI", tag: "VP GenAI", color: C.purple, desc: "Leads Meta's generative AI team. Previously at Apple (Siri). Oversees LLaMA model development, Meta AI assistant, and AI integration across all Meta products." },
    { name: "Joelle Pineau", role: "VP, AI Research (FAIR)", tag: "VP FAIR", color: C.teal, desc: "McGill University professor. Leads FAIR (Fundamental AI Research). Focus on reinforcement learning, robotics, and open science. Championed LLaMA's open release." },
  ],
  timeline: [
    { date: "Dec 2013", title: "FAIR Founded", sev: "info", desc: "Facebook AI Research (FAIR) founded under Yann LeCun. One of the first major corporate AI labs. Focus on fundamental research and open publication." },
    { date: "Feb 2023", title: "LLaMA 1 Released", sev: "critical", desc: "LLaMA released to researchers. Leaked publicly within a week. 65B parameter model matching GPT-3.5. Kickstarted the open-source LLM revolution." },
    { date: "Jul 2023", title: "LLaMA 2 — Full Open Source", sev: "critical", desc: "LLaMA 2 released as fully open source. Free for commercial use. Partnership with Microsoft for distribution. Changed the AI industry's dynamics." },
    { date: "Apr 2024", title: "LLaMA 3 Launch", sev: "info", desc: "LLaMA 3 released in 8B and 70B variants. State-of-the-art open model. 400B version follows. Training on 15T+ tokens." },
    { date: "Sep 2024", title: "LLaMA 3.2 — Multimodal", sev: "info", desc: "LLaMA 3.2 adds vision capabilities. 11B and 90B multimodal models. Lightweight 1B and 3B models for edge devices." },
    { date: "Jan 2025", title: "Meta AI Assistant Hits 700M Users", sev: "info", desc: "Meta AI assistant integrated across WhatsApp, Instagram, Facebook reaches 700M monthly users. Largest AI assistant deployment by user count." },
    { date: "2024-2025", title: "Reality Labs: $50B+ Losses", sev: "warn", desc: "Reality Labs division has accumulated $50B+ in losses since 2020. Metaverse pivot widely criticized. Zuckerberg pivots narrative to AI-first." },
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
