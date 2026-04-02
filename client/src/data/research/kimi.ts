import type { CompanyData } from "./types";
import { C } from "./types";

export const kimiData: CompanyData = {
  meta: {
    id: "kimi", name: "Kimi (Moonshot)", color: "#FF4444",
    tagline: "Beijing AI lab. Accused of scraping Claude. ~80 employees, $240M rev.",
    headerTitle: "Moonshot AI — China's", headerSubtitle: "Global AI Breakout",
    lastUpdated: "Mar 2026", keyModel: "Kimi 2.5", openSource: "No",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "controversies", label: "Controversies", badge: "!" },
    { id: "competition", label: "Six Little Tigers" },
    { id: "funding", label: "Funding" },
    { id: "investors", label: "Investors" },
  ],
  boardMembers: [
    { name: "Yang Zhilin", role: "Founder & CEO", tag: "CEO", color: "#FF4444", desc: "Born ~1993. Tsinghua PhD (NLP). Interned at Meta AI & Google Brain. Published foundational Transformer-XL and XLNet papers. Carnegie Mellon researcher. Founded Recurrent AI (prev startup), then Moonshot AI 2023." },
    { name: "Zhou Xinyu", role: "Co-Founder & CTO", tag: "CTO", color: C.orange, desc: "Tsinghua classmate of Yang. Core technical architect. Led development of Kimi's 2M-token context window — a key differentiator." },
  ],
  controversies: [
    { date: "Feb 2026", title: "Anthropic Scraping Accusation", sev: "critical", desc: "Anthropic publicly accuses Moonshot AI of creating 'thousands of fraudulent accounts' to scrape millions of Claude conversations for training data. Moonshot denies. Legal action expected." },
    { date: "2024", title: "Investor Lawsuit (Recurrent AI)", sev: "warn", desc: "5 investors from Yang's previous startup Recurrent AI file arbitration at Hong Kong International Arbitration Centre. Allege breach of fiduciary duty — claim Yang took technology and key employees to Moonshot without proper IP separation." },
    { date: "Oct 2024", title: "User Growth Crash", sev: "warn", desc: "After peaking at 36M MAU in Oct 2024 (driven by aggressive marketing subsidies), Kimi's user base crashes to 10-15M. Subsidy-driven growth proves unsustainable in China's brutal LLM price war." },
    { date: "2024-2025", title: "92% Price Collapse", sev: "info", desc: "China's LLM API pricing drops 92% in under a year. ByteDance's Doubao leads the race to zero. Moonshot's margins compressed — pivots to overseas markets where pricing power still exists." },
    { date: "Feb 2026", title: "Overseas Revenue Surpasses Domestic", sev: "info", desc: "Moonshot announces overseas revenue now exceeds domestic. 170% monthly growth in global paid users. 4x API revenue growth Nov-Dec 2025. The China market is a race to zero — survival means going global." },
  ],
  competitors: [
    { name: "ByteDance Doubao", users: "160M MAU", color: "#FF0050", note: "Market leader by users. Massive subsidies. Integrated into TikTok/Douyin ecosystem." },
    { name: "DeepSeek", users: "Undisclosed", color: C.blue, note: "Open-source leader. R1 model matches GPT-4. Fraction of the cost. Funded by quant fund High-Flyer." },
    { name: "Alibaba Qwen", users: "Undisclosed", color: "#FF6A00", note: "Alibaba Cloud's model. Qwen 2.5 competitive with frontier models. Free API tier undercuts everyone." },
    { name: "MiniMax", users: "~20M MAU", color: C.purple, note: "Video and multimodal focus. Hailuo AI video generation. Similar funding trajectory to Moonshot." },
    { name: "Zhipu AI", users: "~15M MAU", color: C.teal, note: "Tsinghua University spin-off. GLM series. Government contracts focus. Most 'establishment' of the Tigers." },
    { name: "Baichuan", users: "~10M MAU", color: C.orange, note: "Founded by ex-Sogou CEO Wang Xiaochuan. Enterprise focus. Less consumer, more B2B." },
  ],
  competitorStats: [
    { label: "TEAM", value: "~80", color: C.green },
    { label: "ANNUAL REV", value: "$240M", color: C.gold },
    { label: "REV/EMPLOYEE", value: "$3M", color: "#FF4444" },
  ],
  fundingRounds: [
    { date: "2023", label: "Seed", total: 60, val: 300, lead: "Various", inv: [{ n: "5Y Capital", a: 20 }, { n: "Gaorong Capital", a: 15 }, { n: "Other", a: 25 }], events: ["$300M valuation", "Company founded"] },
    { date: "Feb 2024", label: "Series A", total: 1000, val: 2500, lead: "Alibaba", inv: [{ n: "Alibaba", a: 400 }, { n: "Tencent", a: 200 }, { n: "5Y Capital", a: 100 }, { n: "Other", a: 300 }], events: ["$2.5B valuation", "Alibaba's largest AI bet"] },
    { date: "Aug 2024", label: "Series B", total: 300, val: 3300, lead: "Tencent", inv: [{ n: "Tencent", a: 120 }, { n: "Gaorong Capital", a: 80 }, { n: "Other", a: 100 }], events: ["$3.3B valuation", "36M MAU peak"] },
    { date: "Dec 2025", label: "Series C", total: 500, val: 4300, lead: "IDG Capital", inv: [{ n: "IDG Capital", a: 200 }, { n: "Cathay Capital", a: 100 }, { n: "Andon Hong Kong", a: 80 }, { n: "Other", a: 120 }], events: ["$4.3B valuation", "K1.5 launch"] },
    { date: "Feb 2026", label: "Series D (T1)", total: 700, val: 10000, lead: "Alibaba / Tencent / 5Y Capital", inv: [{ n: "Alibaba", a: 250, note: "Existing backer" }, { n: "Tencent", a: 200, note: "Existing backer" }, { n: "5Y Capital", a: 150, note: "Early backer since seed" }, { n: "Other", a: 100 }], events: ["First tranche CLOSED at $10B valuation", "Fastest Chinese AI co to decacorn status", "Cash reserves >$1.4B", "Series D expansion to $18B in discussion (Mar 2026)"] },
  ],
};
