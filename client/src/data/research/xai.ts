import type { CompanyData } from "./types";
import { C } from "./types";

export const xaiData: CompanyData = {
  meta: {
    id: "xai", name: "xAI", color: "#1DA1F2",
    tagline: "Elon Musk's AI lab. Grok. $230B valuation. 'Any lawful use' military stance.",
    headerTitle: "xAI — Musk's Play", headerSubtitle: "For AI Dominance",
    lastUpdated: "Mar 2026", keyModel: "Grok 4", openSource: "Partial (Grok)",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "timeline", label: "Key Events" },
    { id: "funding", label: "Funding" },
    { id: "investors", label: "Investors" },
  ],
  boardMembers: [
    { name: "Elon Musk", role: "Founder & CEO", tag: "CEO", color: "#1DA1F2", desc: "CEO of Tesla, SpaceX, owner of X (Twitter). Co-founded OpenAI 2015, left board 2018. Founded xAI Jul 2023. Suing OpenAI over nonprofit deviation. Net worth ~$300B+." },
    { name: "Igor Babuschkin", role: "Co-Founder", tag: "Co-Founder", color: C.orange, desc: "Former DeepMind researcher. Worked on Gopher and Chinchilla models. Left DeepMind to co-found xAI with Musk." },
    { name: "Toby Pohlen", role: "Co-Founder", tag: "Co-Founder", color: C.purple, desc: "Former DeepMind researcher. Expertise in reinforcement learning. Part of the founding team that left top AI labs to join Musk." },
    { name: "Jimmy Ba", role: "Co-Founder", tag: "Co-Founder", color: C.teal, desc: "University of Toronto professor. Co-inventor of the Adam optimizer and Layer Normalization — two foundational deep learning techniques used everywhere." },
  ],
  timeline: [
    { date: "Jul 2023", title: "xAI Founded", sev: "info", desc: "Elon Musk founds xAI with team of researchers from DeepMind, Google, Microsoft, and OpenAI. Mission: 'understand the true nature of the universe.'" },
    { date: "Nov 2023", title: "Grok 1.0 Launch", sev: "info", desc: "Grok launches exclusively for X Premium+ subscribers. Marketed as 'witty' and willing to answer questions other AIs won't. Real-time X integration." },
    { date: "Mar 2024", title: "Grok Open-Sourced", sev: "info", desc: "Grok-1 (314B MoE) open-sourced. Largest open model at the time. Strategic move to undermine OpenAI's closed approach." },
    { date: "May 2024", title: "$6B Series B", sev: "critical", desc: "$6B raised at $24B valuation. Investors: a16z, Sequoia, Valor Equity, Saudi Prince Alwaleed. Fastest funding ramp in AI history." },
    { date: "Sep 2024", title: "Colossus Supercluster", sev: "info", desc: "100,000 Nvidia H100 GPU 'Colossus' cluster built in Memphis in 122 days. Largest AI training cluster in the world at the time." },
    { date: "Dec 2024", title: "$6B Series C", sev: "critical", desc: "Another $6B at $45B valuation. a16z, BlackRock, Fidelity, Kingdom Holdings, Sequoia, Nvidia participate." },
    { date: "Mar 2025", title: "X Corp Merger", sev: "critical", desc: "xAI and X (Twitter) merge into X.AI Holdings Corp. Combined entity valued at ~$113B. Gives xAI access to X's 600M+ user base and real-time data moat." },
    { date: "Mar 2025", title: "Grok 3 Launch", sev: "info", desc: "Grok 3 released. Trained on Colossus. Claims to surpass GPT-4 and Claude on multiple benchmarks. 'Unhinged mode' generates controversy." },
    { date: "Sep 2025", title: "$10B Series D", sev: "critical", desc: "$10B raised at $200B valuation. Saudi Arabia's PIF leads. Builds Colossus 2 data centre in Tennessee. SpaceX contributes $2B internally." },
    { date: "Jan 2026", title: "'Any Lawful Use' Pentagon Deal + $20B Series E", sev: "critical", desc: "xAI agrees to 'any lawful use' terms with Pentagon. Grok approved for classified systems. Simultaneously closes $20B Series E at $230B valuation — Valor Equity, QIA, Fidelity, Nvidia, Tesla, Cisco. Total raised: ~$37B+." },
  ],
  fundingRounds: [
    { date: "Nov 2023", label: "Series A", total: 500, val: 4000, lead: "Various", inv: [{ n: "Various", a: 500, note: "Early investors" }], events: ["$4B valuation", "Grok 1.0 launch"] },
    { date: "May 2024", label: "Series B", total: 6000, val: 24000, lead: "a16z / Sequoia", inv: [{ n: "a16z", a: 1500 }, { n: "Sequoia", a: 1000 }, { n: "Other", a: 3500 }], events: ["$24B valuation", "Fastest AI funding ramp"] },
    { date: "Dec 2024", label: "Series C", total: 6000, val: 45000, lead: "a16z", inv: [{ n: "a16z", a: 1200 }, { n: "BlackRock", a: 1000 }, { n: "Fidelity", a: 800 }, { n: "Nvidia", a: 500 }, { n: "Sequoia", a: 500 }, { n: "Other", a: 2000 }], events: ["$45B valuation", "Colossus operational"] },
    { date: "Sep 2025", label: "Series D", total: 10000, val: 200000, lead: "Saudi Arabia PIF", inv: [{ n: "Saudi Arabia PIF", a: 3000, note: "Reported — Saudi Arabia's sovereign wealth fund led. Round confirmed via Bloomberg / Reuters Sep 2025." }, { n: "SpaceX", a: 2000, note: "Reported — Musk's internal entity. Some sources count separately from external raise." }, { n: "Other", a: 5000, note: "Reported — institutional investors and VCs." }], events: ["Reported: $200B valuation", "4x from Series C in 9 months", "Colossus 2 Tennessee data centre build-out"] },
    { date: "Jan 2026", label: "Series E", total: 20000, val: 230000, lead: "Valor Equity / QIA", inv: [{ n: "Valor Equity Partners", a: 3000, note: "Reported — confirmed participant per Bloomberg Jan 2026." }, { n: "Qatar Investment Authority", a: 2500, note: "Reported — confirmed participant." }, { n: "Fidelity", a: 2000, note: "Reported — confirmed participant." }, { n: "Nvidia", a: 2000, note: "Reported — confirmed participant." }, { n: "Tesla", a: 2000, note: "Reported — subject to regulatory approval at time of announcement." }, { n: "Cisco Investments", a: 1000, note: "Reported — confirmed participant." }, { n: "MGX (Abu Dhabi)", a: 1000, note: "Reported — confirmed participant." }, { n: "StepStone Group", a: 1000, note: "Reported — confirmed participant." }, { n: "Other", a: 5500 }], events: ["Reported: $230B valuation (upsized from $15B target to $20B)", "Pentagon 'any lawful use' deal signed", "Grok 4 approved for classified systems"] },
  ],
};
