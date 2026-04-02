import type { CompanyData } from "./types";
import { C } from "./types";

export const deepseekData: CompanyData = {
  meta: {
    id: "deepseek", name: "DeepSeek", color: "#4D6BFE",
    tagline: "Self-funded open-source AI lab from China. R1 rivaled GPT-4o at a fraction of the cost.",
    headerTitle: "DeepSeek — China's", headerSubtitle: "Open-Source Disruptor",
    lastUpdated: "Mar 2026", keyModel: "DeepSeek V3", openSource: "Yes (MIT)", founded: "2023", hq: "Hangzhou",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Timeline" },
    { id: "funding", label: "Funding" },
    { id: "controversies", label: "Controversies", badge: "!" },
    { id: "competition", label: "Competition" },
  ],
  boardMembers: [
    { name: "Liang Wenfeng", role: "Founder & CEO", tag: "Founder", color: "#4D6BFE", desc: "Born ~1985, Guangdong, China. Zhejiang University (BS & MS in Electronic Engineering). Co-founded High-Flyer (幻方量化) in 2015, a quantitative hedge fund that became one of China's largest with ~$8B AUM at peak. Used quant fund profits to stockpile ~10,000 Nvidia A100 GPUs before US export controls. Founded DeepSeek in May 2023 as a pure AI research lab, self-funded entirely from High-Flyer profits. Rarely gives interviews. Known for frugal, research-first culture." },
    { name: "Zhu Qi", role: "Co-Founder & Researcher", tag: "Research", color: C.blue, desc: "Core technical leader at DeepSeek. Background in machine learning and systems engineering. Co-authored key DeepSeek papers including the V2/V3 architecture innovations." },
    { name: "Guo Daya", role: "Co-Founder & Researcher", tag: "Research", color: C.teal, desc: "Key researcher at DeepSeek. Contributed to Mixture-of-Experts architecture and multi-head latent attention innovations that dramatically reduced training costs." },
  ],
  timeline: [
    { date: "2015", title: "High-Flyer Founded", sev: "info", desc: "Liang Wenfeng co-founds High-Flyer (幻方量化) quantitative hedge fund in Hangzhou. Grows to ~$8B AUM. Begins investing heavily in GPU infrastructure for trading models." },
    { date: "2021-2022", title: "GPU Stockpiling", sev: "info", desc: "High-Flyer acquires ~10,000 Nvidia A100 GPUs before US export controls take effect. This GPU stockpile becomes the foundation for DeepSeek's compute infrastructure." },
    { date: "May 2023", title: "DeepSeek Founded", sev: "info", desc: "Liang Wenfeng establishes DeepSeek (深度求索) as a standalone AI research lab in Hangzhou, funded entirely from High-Flyer profits. Mission: open-source AGI research." },
    { date: "Nov 2023", title: "DeepSeek-67B Released", sev: "info", desc: "First major release. A 67-billion parameter open-source LLM competitive with Llama 2 70B. Signals serious capability from a self-funded Chinese lab." },
    { date: "Jun 2024", title: "DeepSeek-V2 Released", sev: "info", desc: "Introduces Multi-head Latent Attention (MLA) and DeepSeekMoE architecture. 236B total params, only 21B active per token. 42x cheaper inference than GPT-4. Game-changing efficiency." },
    { date: "Dec 2024", title: "DeepSeek-V3 Released", sev: "info", desc: "671B parameter MoE model. Trained for ~$5.6M in compute (2.788M H800 GPU hours). Matches or exceeds GPT-4o and Claude 3.5 Sonnet on most benchmarks. Open-weight under MIT license." },
    { date: "Jan 2025", title: "DeepSeek-R1 Released", sev: "critical", desc: "Reasoning model matching OpenAI o1 performance. Trained using pure reinforcement learning (no supervised fine-tuning for reasoning). Open-weight. Sent shockwaves through Silicon Valley — $1T wiped from US tech stocks in a single day." },
    { date: "Jan 27, 2025", title: "$1 Trillion Market Crash", sev: "critical", desc: "DeepSeek-R1 tops the App Store. Nvidia drops 17% (~$600B market cap loss) in a single day. Nasdaq falls 3.1%. The 'Sputnik moment' for American AI. Questions the entire narrative of AI requiring massive capital expenditure." },
    { date: "Feb 2025", title: "US Government Scrutiny", sev: "warn", desc: "US lawmakers raise concerns about DeepSeek's ties to the Chinese government. Calls for investigation into data handling practices. Multiple countries begin reviewing DeepSeek's use in government systems." },
    { date: "Mar 2025", title: "DeepSeek-V3-0324 Update", sev: "info", desc: "Updated V3 model with improved reasoning, coding, and creative writing. Closes gap further with frontier models while maintaining cost advantage." },
    { date: "Apr 2025", title: "DeepSeek Prover V2", sev: "info", desc: "DeepSeek-Prover-V2 released — a specialist model for formal mathematical theorem proving using Lean 4. Achieved state-of-the-art results on competition mathematics benchmarks including AMC, AIME, and IMO problems. Demonstrates DeepSeek's expansion beyond general reasoning into formal verification." },
    { date: "May 2025", title: "DeepSeek-R1-0528", sev: "info", desc: "Updated R1 reasoning model released as a free API drop-in. Improved performance on coding, mathematics, and multi-step reasoning over the January 2025 original. Maintains open-weights release under MIT licence. Continues the pattern of rapid iterative improvements without announced training cost increases." },
    { date: "2025", title: "Government Ban Wave Expands", sev: "warn", desc: "Government bans on DeepSeek expand beyond Italy and the US Navy. Australia bans DeepSeek from all government devices and systems (citing national security). Taiwan's government bans DeepSeek from public sector use. The UK government issues guidance against DeepSeek use on official devices. South Korea's public sector follows. Enterprise security teams at major Western banks and consultancies add DeepSeek to prohibited services lists." },
    { date: "2025", title: "US ENFORCE Act & Legislative Pressure", sev: "warn", desc: "US legislators introduce the ENFORCE Act targeting Chinese AI companies including DeepSeek. Proposed measures include mandatory disclosure of training data sources, prohibitions on government contract eligibility, and app store removal requirements. While not yet passed into law as of early 2026, the legislative attention signals escalating regulatory risk for DeepSeek's US market access and creates uncertainty for enterprise adopters." },
  ],
  fundingRounds: [
    { date: "May 2023", label: "Self-Funded", total: 0, val: null, lead: "High-Flyer Capital", inv: [{ n: "High-Flyer (internal)", a: 0, note: "Entirely self-funded from quant fund profits" }], events: ["No external funding raised", "~10,000 A100 GPUs from High-Flyer"], external: false },
  ],
  financials: [
    { label: "FUNDING MODEL", value: "Self-Funded", color: "#4D6BFE" },
    { label: "GPU CLUSTER", value: "~10K A100s", color: C.green },
    { label: "V3 TRAINING COST", value: "$5.6M", color: C.gold },
    { label: "TEAM SIZE", value: "~200", color: C.teal },
    { label: "OPEN SOURCE", value: "MIT License", color: C.purple },
    { label: "HQ", value: "Hangzhou, China", color: C.orange },
  ],
  controversies: [
    { date: "Jan 2025", title: "Silicon Valley Panic & 'Sputnik Moment'", sev: "critical", desc: "DeepSeek-R1 achieving GPT-4o-level performance at a fraction of the cost triggers the largest single-day tech selloff in history. ~$1T wiped from US tech market caps. Nvidia drops 17%. The fundamental premise that AI requires massive capital expenditure is challenged." },
    { date: "Feb 2025", title: "US National Security Concerns", sev: "critical", desc: "US Navy bans DeepSeek from government devices. Italy's data protection authority blocks the app. Multiple countries investigate ties to Chinese government. Concerns over data being stored on servers in China subject to Chinese national security laws." },
    { date: "Jan 2025", title: "Data Provenance Questions", sev: "warn", desc: "Researchers question whether DeepSeek's training data includes outputs distilled from OpenAI and other US models — potentially violating terms of service. OpenAI claims evidence of systematic distillation. DeepSeek denies." },
    { date: "2024-2025", title: "US Export Control Circumvention", sev: "warn", desc: "DeepSeek's use of Nvidia A100 and H800 GPUs raises questions about circumvention of US chip export controls. GPUs were acquired before the Oct 2022 ban, but ongoing access to restricted chips via intermediaries is alleged." },
    { date: "Jan 2025", title: "Censorship and Content Filtering", sev: "info", desc: "DeepSeek's models include hardcoded censorship for topics sensitive to the Chinese government (Tiananmen Square, Taiwan independence, Xi Jinping criticism). Researchers demonstrate these filters can be easily bypassed but highlight the political alignment baked into the model." },
    { date: "Feb 2025", title: "Training Cost Skepticism", sev: "info", desc: "The claimed $5.6M training cost for V3 is widely debated. Critics note this excludes research experimentation costs, earlier model iterations, and the cost of the GPU cluster itself. True all-in cost likely much higher, though still far below US frontier labs." },
  ],
  competitors: [
    { name: "OpenAI", users: "300M+ weekly users", color: "#10A37F", note: "Largest AI company. GPT-4o and o1 models. $300B valuation. DeepSeek-R1 directly challenged o1's reasoning dominance." },
    { name: "Meta AI (Llama)", users: "400M+ downloads", color: "#0084FF", note: "Open-source leader by adoption. Llama 3.1 405B. DeepSeek competes on efficiency — comparable quality with far fewer resources." },
    { name: "Alibaba Qwen", users: "Undisclosed", color: "#FF6A00", note: "Alibaba Cloud's Qwen 2.5 models. Fellow Chinese open-source competitor. Apache 2.0 license. Free API tier." },
    { name: "Kimi (Moonshot AI)", users: "~15M MAU", color: "#FF4444", note: "Another 'Little Tiger.' Consumer-focused with 2M token context window. $10B+ target valuation. More VC-funded traditional model." },
    { name: "Mistral AI", users: "Undisclosed", color: "#FF7000", note: "Europe's open-source champion. Similar efficiency-first ethos. Mixtral MoE architecture preceded DeepSeek's MoE work." },
  ],
  competitorStats: [
    { label: "TEAM", value: "~200", color: C.green },
    { label: "V3 TRAINING", value: "$5.6M", color: C.gold },
    { label: "R1 BENCHMARK", value: "≈ o1-preview", color: "#4D6BFE" },
  ],
};
