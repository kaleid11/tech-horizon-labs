export interface CompanyMeta {
  id: string;
  name: string;
  color: string;
  tagline: string;
  headerTitle: string;
  headerSubtitle: string;
  lastUpdated: string;
  keyModel: string;
  openSource: string;
}

export interface TabDef {
  id: string;
  label: string;
  badge?: string;
}

export interface BoardMember {
  name: string;
  role: string;
  tag: string;
  color: string;
  desc: string;
  seatType?: string;
  voting?: string;
  born?: string;
  parents?: string;
  education?: string;
  career?: string;
  personal?: string;
  keyFact?: string;
  title?: string;
}

export interface DepartedMember {
  name: string;
  role: string;
  departed: string;
  note: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  sev: "info" | "warn" | "critical";
  desc: string;
  color?: string;
  plaintiff?: string;
}

export interface FundingRound {
  date: string;
  label: string;
  total: number;
  val: number | null;
  post?: number | null;
  lead: string;
  inv: { n: string; a: number; note?: string }[];
  events: string[];
  exits?: { who: string; detail: string }[];
}

export interface InvestorProfile {
  color: string;
  total: string;
  equity: string;
  votes: string;
  boardSeat: string;
  capped: string;
  type: string;
  desc: string;
  ceo: string;
  founded: string;
  hq: string;
  marketCap: string;
  keyPeople: string;
}

export interface PolicyShift {
  title: string;
  area: string;
  color: string;
  before: string;
  after: string;
  date: string;
  significance: string;
}

export interface SupplyChainEntity {
  name: string;
  role: string;
  impact: string;
  color: string;
  desc: string;
  ticker: string;
}

export interface OwnershipSlice {
  label: string;
  pct: number;
  color: string;
  note: string;
}

export interface Competitor {
  name: string;
  users: string;
  color: string;
  note: string;
}

export interface ShareClass {
  title: string;
  who: string;
  power: string;
  color: string;
  desc: string;
}

export interface FinancialMetric {
  label: string;
  value: string;
  color: string;
}

export interface RestructuringPhase {
  phase: string;
  color: string;
  desc: string;
}

export interface CompanyData {
  meta: CompanyMeta;
  tabs: TabDef[];
  boardMembers: BoardMember[];
  fundingRounds: FundingRound[];
  trustees?: BoardMember[];
  departedTrustees?: DepartedMember[];
  shareStructure?: ShareClass[];
  timeline?: TimelineEvent[];
  policyShifts?: PolicyShift[];
  supplyChain?: SupplyChainEntity[];
  ownership?: OwnershipSlice[];
  competitors?: Competitor[];
  investorProfiles?: Record<string, InvestorProfile>;
  safetyIssues?: TimelineEvent[];
  restructuring?: RestructuringPhase[];
  copyrightCases?: TimelineEvent[];
  controversies?: TimelineEvent[];
  financials?: FinancialMetric[];
  pentagonTimeline?: TimelineEvent[];
  competitorStats?: FinancialMetric[];
}

export function parseDate(d: string): number {
  const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const parts = d.split(" ");
  if (parts.length === 2) return new Date(parseInt(parts[1]), months[parts[0]] || 0, 1).getTime();
  return new Date(parseInt(parts[0]), 0, 1).getTime();
}

export function fmtVal(v: number | null): string {
  if (v === null) return "—";
  if (v >= 1000000) { const t = (v / 1000000).toFixed(1); return `$${t.endsWith('.0') ? t.slice(0, -2) : t}T`; }
  return v >= 1000 ? `$${(v / 1000).toFixed(v >= 100000 ? 0 : v >= 10000 ? 0 : 1)}B` : `$${v}M`;
}

export const C = {
  gold: "#d4a843", red: "#e05555", green: "#44c488", blue: "#4488dd",
  purple: "#8855cc", teal: "#44aabb", orange: "#dd8844", pink: "#cc5588",
  cyan: "#55bbdd", warn: "#ff6b35", dim: "#4e4e6a", sub: "#8888a4",
};

const IC: Record<string, string> = {
  "Amazon": "#FF9900", "Google": "#4285F4", "Spark Capital": "#E84855",
  "Menlo Ventures": "#7B68EE", "Lightspeed": "#00C9A7", "FTX": "#02C3BD",
  "SK Telecom": "#E4002B", "Jaan Tallinn": C.teal, "Dustin Moskovitz": C.orange,
  "Eric Schmidt": C.pink, "Salesforce": "#00A1E0", "Zoom": "#2D8CFF",
  "Sound Ventures": C.purple, "ICONIQ": "#9F7AEA", "Fidelity": "#4CAF50",
  "Microsoft": "#00BCF2", "Nvidia": "#76B900", "GIC": "#C62828",
  "Coatue": "#FF6F00", "D.E. Shaw": "#5C6BC0", "Dragoneer": "#26A69A",
  "Founders Fund": "#AB47BC", "MGX": "#F06292", "Blackstone": "#212121",
  "Sequoia": "#E65100", "Qatar": "#880E4F", "BlackRock": "#333333",
  "Goldman Sachs": "#1565C0", "SoftBank": "#FF6B00", "IVP": "#7B68EE",
  "NEA": "#26A69A", "Jeff Bezos": "#FF9900", "Databricks": "#FF3621",
  "Accel": "#3B82F6", "Alibaba": "#FF6A00", "Tencent": "#00B140",
  "IDG Capital": "#6366F1", "Thrive Capital": "#8B5CF6",
  "Khosla Ventures": "#059669", "a16z": "#FF5722",
};

export function getInvestorColor(name: string): string {
  for (const [k, v] of Object.entries(IC)) {
    if (name.includes(k)) return v;
  }
  return C.sub;
}

export function fmt(n: number): string {
  return n >= 1000 ? "$" + (n / 1000).toFixed(1) + "B" : "$" + n + "M";
}

export function computeInvestorTotals(rounds: FundingRound[]): [string, number][] {
  const totals: Record<string, number> = {};
  const norm = (name: string): string => {
    const m: [string, string][] = [
      ["Amazon", "Amazon"], ["Google", "Google"], ["FTX", "FTX/Alameda"],
      ["Alameda", "FTX/Alameda"], ["Spark", "Spark Capital"],
      ["Menlo", "Menlo Ventures"], ["Lightspeed", "Lightspeed"],
      ["SK ", "SK Telecom"], ["ICONIQ", "ICONIQ Capital"],
      ["Fidelity", "Fidelity"], ["Microsoft", "Microsoft"],
      ["Nvidia", "Nvidia"], ["GIC", "GIC (Singapore)"],
      ["Coatue", "Coatue"], ["D.E. Shaw", "D.E. Shaw"],
      ["Dragoneer", "Dragoneer"], ["Founders Fund", "Founders Fund"],
      ["MGX", "MGX (Abu Dhabi)"], ["BlackRock", "BlackRock"],
      ["Blackstone", "Blackstone"], ["Qatar", "Qatar Investment"],
      ["Goldman", "Goldman Sachs"], ["Jaan", "Jaan Tallinn"],
      ["Dustin", "Dustin Moskovitz"], ["Eric Schmidt", "Eric Schmidt"],
      ["Salesforce", "Salesforce"], ["Zoom", "Zoom"],
      ["Sound", "Sound Ventures"], ["SoftBank", "SoftBank"],
      ["IVP", "IVP"], ["NEA", "NEA"], ["Jeff Bezos", "Jeff Bezos"],
      ["Databricks", "Databricks"], ["Accel", "Accel"],
      ["Alibaba", "Alibaba"], ["Tencent", "Tencent"],
      ["IDG Capital", "IDG Capital"], ["Thrive", "Thrive Capital"],
      ["Khosla", "Khosla Ventures"], ["a16z", "a16z"],
      ["Elon Musk", "Elon Musk"], ["Sam Altman", "Sam Altman"],
      ["5Y Capital", "5Y Capital"], ["Gaorong", "Gaorong Capital"],
      ["Cathay", "Cathay Capital"], ["Andon", "Andon Hong Kong"],
      ["Elad Gil", "Elad Gil"],
    ];
    for (const [k, v] of m) { if (name.includes(k)) return v; }
    return "Other";
  };
  rounds.forEach(r => r.inv.forEach(inv => {
    const k = norm(inv.n);
    totals[k] = (totals[k] || 0) + inv.a;
  }));
  return Object.entries(totals).sort((a, b) => b[1] - a[1]);
}
