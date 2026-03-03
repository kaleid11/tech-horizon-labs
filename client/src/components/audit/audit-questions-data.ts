export interface AuditOption {
  label: string;
  value: number;
}

export interface AuditQuestion {
  id: string;
  dimension: "process" | "data" | "tech" | "team" | "strategy";
  question: string;
  options: AuditOption[];
}

export const DIMENSIONS = {
  process: "Process Readiness",
  data: "Data Maturity",
  tech: "Tech Readiness",
  team: "Team Capability",
  strategy: "Strategic Alignment",
} as const;

export const DIMENSION_COLORS: Record<string, string> = {
  process: "#e76f51",
  data: "#2a9d8f",
  tech: "#264653",
  team: "#e9c46a",
  strategy: "#f4a261",
};

export const auditQuestions: AuditQuestion[] = [
  // Process (2 questions)
  {
    id: "process-1",
    dimension: "process",
    question: "How much time does your team spend on repetitive administrative tasks each week?",
    options: [
      { label: "Very little — most things are already streamlined", value: 5 },
      { label: "A few hours — some manual tasks but manageable", value: 10 },
      { label: "Significant time — at least a day per week across the team", value: 15 },
      { label: "Massive — multiple days lost to admin, data entry, and manual processes", value: 20 },
    ],
  },
  {
    id: "process-2",
    dimension: "process",
    question: "What's the most painful repetitive task in your business?",
    options: [
      { label: "Nothing stands out — processes run smoothly", value: 2 },
      { label: "Data entry and filing (invoices, receipts, records)", value: 8 },
      { label: "Client communication and follow-ups", value: 10 },
      { label: "Reporting, compliance documentation, or quoting", value: 15 },
    ],
  },
  // Data (2 questions)
  {
    id: "data-1",
    dimension: "data",
    question: "Where does your business data primarily live?",
    options: [
      { label: "Centralised system (CRM, ERP, or cloud platform)", value: 15 },
      { label: "Mix of cloud tools (spreadsheets, email, shared drives)", value: 10 },
      { label: "Mostly in spreadsheets and local files", value: 5 },
      { label: "Scattered — paper, email, different people's computers", value: 2 },
    ],
  },
  {
    id: "data-2",
    dimension: "data",
    question: "How organised is your business data?",
    options: [
      { label: "Well-structured with consistent naming and formats", value: 15 },
      { label: "Reasonably organised but some inconsistencies", value: 10 },
      { label: "Varies by department — some good, some messy", value: 5 },
      { label: "We'd need to spend significant time cleaning it up", value: 2 },
    ],
  },
  // Tech (2 questions)
  {
    id: "tech-1",
    dimension: "tech",
    question: "Does your team currently use any AI tools (ChatGPT, Claude, Copilot, etc.)?",
    options: [
      { label: "Yes — several team members use AI tools regularly", value: 15 },
      { label: "A few people have tried them casually", value: 10 },
      { label: "We've talked about it but haven't started", value: 5 },
      { label: "No — AI isn't on our radar yet", value: 2 },
    ],
  },
  {
    id: "tech-2",
    dimension: "tech",
    question: "How does your business handle sensitive data (client records, financials)?",
    options: [
      { label: "Strict policies, encrypted systems, access controls in place", value: 15 },
      { label: "Basic security — passwords, some access controls", value: 10 },
      { label: "Informal approach — we know what's sensitive but no formal policy", value: 5 },
      { label: "We haven't thought much about data security", value: 2 },
    ],
  },
  // Team (2 questions)
  {
    id: "team-1",
    dimension: "team",
    question: "How comfortable is your team with adopting new technology?",
    options: [
      { label: "Very — they actively seek out new tools and processes", value: 15 },
      { label: "Open to it — they'll learn if shown the value", value: 10 },
      { label: "Cautious — change is slow but possible", value: 5 },
      { label: "Resistant — we've had trouble with past technology changes", value: 2 },
    ],
  },
  {
    id: "team-2",
    dimension: "team",
    question: "How many employees does your business have?",
    options: [
      { label: "Just me (sole operator)", value: 5 },
      { label: "2-10 employees", value: 10 },
      { label: "11-50 employees", value: 15 },
      { label: "50+ employees", value: 12 },
    ],
  },
  // Strategy (2 questions)
  {
    id: "strategy-1",
    dimension: "strategy",
    question: "What budget have you allocated (or would you consider) for improving business operations?",
    options: [
      { label: "We have budget set aside for operational improvements", value: 15 },
      { label: "We'd invest if the ROI was clear (a few thousand dollars)", value: 12 },
      { label: "Very limited — looking for low/no cost solutions first", value: 5 },
      { label: "No budget — we need to see results before spending anything", value: 2 },
    ],
  },
  {
    id: "strategy-2",
    dimension: "strategy",
    question: "How urgently do you need to improve efficiency?",
    options: [
      { label: "Critical — we're losing money or clients due to inefficiency", value: 15 },
      { label: "Important — we want to scale but current processes won't support it", value: 12 },
      { label: "Would be nice — no urgency but we'd like to improve", value: 7 },
      { label: "Not urgent — just exploring what's possible", value: 3 },
    ],
  },
];
