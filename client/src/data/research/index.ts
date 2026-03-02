import type { CompanyData } from "./types";
import { anthropicData } from "./anthropic";
import { openaiData } from "./openai";
import { perplexityData } from "./perplexity";
import { kimiData } from "./kimi";
import { googleDeepMindData } from "./google-deepmind";
import { metaAIData } from "./meta-ai";
import { xaiData } from "./xai";
import { mistralData } from "./mistral";

export const companies: Record<string, CompanyData> = {
  anthropic: anthropicData,
  openai: openaiData,
  perplexity: perplexityData,
  kimi: kimiData,
  "google-deepmind": googleDeepMindData,
  "meta-ai": metaAIData,
  xai: xaiData,
  mistral: mistralData,
};

export const companyOrder = [
  "anthropic", "openai", "google-deepmind", "meta-ai",
  "xai", "perplexity", "kimi", "mistral",
];

export type { CompanyData, CompanyMeta, TabDef, BoardMember, DepartedMember, TimelineEvent, FundingRound, InvestorProfile, PolicyShift, SupplyChainEntity, OwnershipSlice, Competitor, ShareClass, FinancialMetric, RestructuringPhase } from "./types";
export { C, getInvestorColor, fmt, computeInvestorTotals } from "./types";
