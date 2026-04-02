import type { CompanyData } from "./types";
import { C } from "./types";

export const perplexityData: CompanyData = {
  meta: {
    id: "perplexity", name: "Perplexity", color: "#20B2AA",
    tagline: "AI search engine. $20B valuation. Copyright wars.",
    headerTitle: "Perplexity — AI Search", headerSubtitle: "vs. Copyright Law",
    lastUpdated: "Mar 2026", keyModel: "pplx-api", openSource: "No",
  },
  tabs: [
    { id: "governance", label: "Leadership" },
    { id: "copyright", label: "Copyright Wars", badge: "!" },
    { id: "funding", label: "Funding" },
    { id: "investors", label: "Investors" },
  ],
  boardMembers: [
    { name: "Aravind Srinivas", role: "CEO & Co-Founder", tag: "CEO", color: "#20B2AA", desc: "PhD Berkeley (AI/ML under Pieter Abbeel). Interned at Google DeepMind, OpenAI. Founded Perplexity 2022. Indian-born, moved to US for grad school." },
    { name: "Denis Yarats", role: "CTO & Co-Founder", tag: "CTO", color: C.blue, desc: "Ex-Meta AI Research. Focus on reinforcement learning and robotics. Builds the core infrastructure." },
    { name: "Johnny Ho", role: "Co-Founder", tag: "Co-Founder", color: C.purple, desc: "Ex-Quora engineer. Built initial search and ranking systems. Expertise in information retrieval." },
    { name: "Andy Konwinski", role: "Co-Founder", tag: "Co-Founder", color: C.orange, desc: "Co-creator of Apache Spark, co-founded Databricks. UC Berkeley PhD. Brings big data infrastructure expertise." },
  ],
  copyrightCases: [
    { date: "Jun 2024", title: "Dow Jones / NY Post Lawsuit", sev: "critical", plaintiff: "Dow Jones / NY Post", desc: "Dow Jones and New York Post (News Corp) sue for scraping paywalled articles. Allege Perplexity reproduced full article content as AI-generated answers, bypassing subscriptions." },
    { date: "Oct 2024", title: "Cloudflare Confirms Scraping", sev: "warn", plaintiff: "Cloudflare", desc: "Cloudflare CEO Matthew Prince publicly confirms Perplexity was 'flagrantly' ignoring robots.txt and scraping behind their protection. Spoofed user-agent strings detected." },
    { date: "Dec 2024", title: "Tribune / Britannica Join", sev: "warn", plaintiff: "Chicago Tribune / others", desc: "Tribune Publishing, Encyclopedia Britannica, and Merriam-Webster join the lawsuits. Pattern: Perplexity answers reproduce publishers' exact analysis without attribution." },
    { date: "Dec 2025", title: "New York Times Files Suit", sev: "critical", plaintiff: "New York Times", desc: "NYT files suit, the most significant copyright case. Alleges systematic reproduction of journalism. If NYT wins, it could reshape how AI search engines operate." },
    { date: "Jan 2026", title: "BBC / Reddit Complaints", sev: "warn", plaintiff: "BBC / Reddit", desc: "BBC and Reddit both file complaints. Reddit alleges violation of their terms of service. Growing coalition of content creators vs. AI search." },
    { date: "Aug 2025", title: "Truth Social Partnership", sev: "info", plaintiff: "Truth Social", desc: "Partners with Trump's Truth Social to provide 'Truth Search AI.' Controversial move — perceived as political alignment for regulatory protection." },
  ],
  fundingRounds: [
    { date: "2022", label: "Seed", total: 5, val: null, lead: "Various", inv: [{ n: "Angel investors", a: 5 }], events: ["Company founded by 4 co-founders"] },
    { date: "Mar 2023", label: "Series A", total: 26, val: 125, lead: "NEA", inv: [{ n: "NEA", a: 10 }, { n: "Elad Gil", a: 5 }, { n: "Jeff Bezos", a: 5 }, { n: "Other", a: 6 }], events: ["$125M valuation", "Bezos personal investment"] },
    { date: "Jan 2024", label: "Series B", total: 74, val: 520, lead: "IVP", inv: [{ n: "IVP", a: 25 }, { n: "NEA", a: 15 }, { n: "Jeff Bezos", a: 10 }, { n: "Nvidia", a: 10 }, { n: "Other", a: 14 }], events: ["$520M valuation", "Nvidia strategic"] },
    { date: "Jun 2024", label: "Series B+", total: 250, val: 3000, lead: "IVP", inv: [{ n: "IVP", a: 80 }, { n: "NEA", a: 40 }, { n: "SoftBank", a: 40 }, { n: "Databricks", a: 30 }, { n: "Other", a: 60 }], events: ["$3B valuation", "6x in 5 months"] },
    { date: "Dec 2024", label: "Series C", total: 500, val: 9000, lead: "IVP", inv: [{ n: "IVP", a: 150 }, { n: "Jeff Bezos", a: 50 }, { n: "Nvidia", a: 50 }, { n: "Other", a: 250 }], events: ["$9B valuation", "Triple in 6 months"] },
    { date: "Jun 2025", label: "Series D", total: 500, val: 14000, lead: "Accel", inv: [{ n: "Accel", a: 150 }, { n: "SoftBank", a: 100 }, { n: "Nvidia", a: 50 }, { n: "Other", a: 200 }], events: ["$14B valuation", "30M monthly users"] },
    { date: "Sep 2025", label: "Series E", total: 200, val: 20000, lead: "Undisclosed", inv: [{ n: "Existing backers", a: 200, note: "Specific investors not disclosed at announcement. Backers include Nvidia, NEA, Accel, SoftBank, Jeff Bezos." }], events: ["$20B valuation", "43% jump from $14B in 3 months", "~$200M ARR", "30M+ monthly users"] },
  ],
};
