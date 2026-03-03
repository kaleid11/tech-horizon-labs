import type { CompanyData } from "./types";
import { C } from "./types";

export const qwenData: CompanyData = {
  meta: {
    id: "qwen", name: "Qwen (Alibaba)", color: "#FF6A00",
    tagline: "Alibaba Cloud's open-source AI. Qwen2.5 models. Apache 2.0 licensed.",
    headerTitle: "Qwen — Alibaba Cloud's", headerSubtitle: "Open-Source AI Division",
    lastUpdated: "Mar 2026", keyModel: "Qwen 3.5", openSource: "Yes (Apache)",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Timeline" },
    { id: "funding", label: "Investment" },
    { id: "competition", label: "Competition" },
  ],
  boardMembers: [
    { name: "Eddie Wu (Wu Yongming)", role: "CEO, Alibaba Group", tag: "CEO", color: "#FF6A00", desc: "Became Alibaba Group CEO in Sep 2023, succeeding Daniel Zhang. Co-founder of Alipay. Leading Alibaba's AI-first pivot, declaring AI the company's top strategic priority and committing massive infrastructure investment." },
    { name: "Jingren Zhou", role: "Head of Alibaba Cloud Intelligence, CTO", tag: "CTO", color: C.blue, desc: "Leads the Qwen model development team at Alibaba Cloud. Previously VP of Technology at Alibaba DAMO Academy. Key architect behind the Qwen series of models and Alibaba's AI infrastructure strategy." },
    { name: "Joseph Tsai (Cai Chongxin)", role: "Executive Chairman, Alibaba Group", tag: "Chairman", color: C.gold, desc: "Co-founder of Alibaba. Became Executive Chairman in Sep 2023. Yale Law graduate. Oversees Alibaba's strategic direction including the AI and cloud computing pivot." },
    { name: "Fan Jiang", role: "Chairman & CEO, Alibaba Cloud Intelligence", tag: "Cloud CEO", color: C.teal, desc: "Appointed Chairman and CEO of Alibaba Cloud Intelligence Group in 2024. Previously CEO of Ele.me. Tasked with accelerating cloud + AI integration and driving enterprise AI adoption." },
    { name: "Jack Ma (Ma Yun)", role: "Co-Founder", tag: "Founder", color: C.orange, desc: "Alibaba co-founder. Stepped back from public roles after 2020 regulatory crackdown. Returned to limited advisory capacity in 2023. No longer in day-to-day operations but remains influential." },
  ],
  timeline: [
    { date: "Aug 2023", title: "Qwen 1.0 Released", sev: "info", desc: "Alibaba Cloud releases Qwen (Tongyi Qianwen) 1.0 as open source. Initial models include 7B and 14B parameter variants. Marks Alibaba's entry into the open-source LLM race." },
    { date: "Dec 2023", title: "Qwen 1.5 — Audio & Vision", sev: "info", desc: "Qwen 1.5 series released with expanded multimodal capabilities. Qwen-Audio and Qwen-VL models demonstrate strong performance. Models range from 0.5B to 72B parameters." },
    { date: "Jun 2024", title: "Qwen2 Launch", sev: "critical", desc: "Qwen2 released across 5 sizes (0.5B to 72B). Matches or exceeds LLaMA 3 on benchmarks. Supports 29 languages. Apache 2.0 license. Over 40,000 derivative models on Hugging Face within months." },
    { date: "Sep 2024", title: "Qwen2.5 — Frontier Open Model", sev: "critical", desc: "Qwen2.5 released with models from 0.5B to 72B. Qwen2.5-72B-Instruct rivals GPT-4o on coding and math benchmarks. Qwen2.5-Coder and Qwen2.5-Math specialized variants launched. Over 10M downloads in first month." },
    { date: "Nov 2024", title: "QwQ — Reasoning Model", sev: "critical", desc: "QwQ (Qwen with Questions) 32B released — an open-source reasoning model. Competes with OpenAI's o1-preview on math and coding tasks. Shows chain-of-thought reasoning. Demonstrates open-source can match proprietary reasoning capabilities." },
    { date: "Feb 2025", title: "$53B AI Infrastructure Pledge", sev: "critical", desc: "Alibaba announces $53B investment in AI and cloud infrastructure over the next 3 years. Largest AI infrastructure commitment by a Chinese company. Signals Qwen/cloud as the company's core growth engine." },
    { date: "Mar 2025", title: "Qwen2.5-VL & Omni Models", sev: "info", desc: "Qwen2.5-VL vision-language models released. Video understanding and agentic capabilities added. Free API access provided through Alibaba Cloud, undercutting competitors on pricing." },
    { date: "2025", title: "Free API Tier Launch", sev: "info", desc: "Alibaba Cloud launches free API tier for Qwen models, enabling developers to use frontier AI at zero cost. Strategy aims to drive Alibaba Cloud adoption and build ecosystem lock-in." },
  ],
  fundingRounds: [
    { date: "2023-2025", label: "Cloud AI R&D", total: 10000, val: null, lead: "Alibaba Group", inv: [{ n: "Alibaba Internal", a: 10000, note: "Estimated AI R&D within cloud division" }], events: ["Part of Alibaba Cloud's budget", "DAMO Academy research"] },
    { date: "Feb 2025", label: "Infrastructure Pledge", total: 53000, val: null, lead: "Alibaba Group", inv: [{ n: "Alibaba Capital", a: 53000, note: "$53B over 3 years for AI + cloud" }], events: ["Largest Chinese AI infrastructure commitment", "Data centers, GPUs, custom chips"] },
  ],
  financials: [
    { label: "ALIBABA CLOUD REV", value: "$16.3B", color: "#FF6A00" },
    { label: "AI INFRA PLEDGE", value: "$53B/3yr", color: C.warn },
    { label: "HUGGING FACE MODELS", value: "40,000+", color: C.green },
    { label: "ALIBABA MARKET CAP", value: "$330B", color: "#FF6A00" },
  ],
  competitors: [
    { name: "Meta LLaMA", users: "700M+ (Meta AI)", color: "#0668E1", note: "Largest open-source competitor. LLaMA 3+ series. Backed by Meta's $65B AI CapEx. Dominant in English-language markets." },
    { name: "DeepSeek", users: "Undisclosed", color: "#4488dd", note: "Open-weight Chinese rival. R1 reasoning model. Self-funded by quant fund. Cost-efficiency claims challenged Qwen's positioning." },
    { name: "ByteDance Doubao", users: "160M MAU", color: "#FF0050", note: "Closed-source competitor in China. Massive user base via TikTok/Douyin ecosystem. Aggressive pricing undercutting." },
    { name: "Baidu ERNIE", users: "~300M users", color: "#2932E1", note: "Baidu's proprietary LLM. Integrated into search. Strong in enterprise China market. Less focus on open-source." },
    { name: "Mistral", users: "Enterprise focus", color: "#FF7000", note: "European open-source rival. Mixture-of-experts architecture. Strong enterprise traction. Smaller model sizes." },
  ],
  competitorStats: [
    { label: "MODEL VARIANTS", value: "100+", color: C.green },
    { label: "LANGUAGES", value: "29+", color: C.gold },
    { label: "LICENSE", value: "Apache 2.0", color: "#FF6A00" },
  ],
};
