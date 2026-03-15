import { auditQuestions, DIMENSIONS } from "./audit-questions-data";

export interface DimensionScore {
  dimension: string;
  label: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AuditResults {
  totalScore: number;
  maxScore: number;
  percentage: number;
  dimensions: DimensionScore[];
  tier: "academy" | "audit" | "accelerator" | "partner";
  tierLabel: string;
  tierDescription: string;
  recommendations: string[];
}

export function calculateResults(answers: Record<string, number>): AuditResults {
  const dimensionScores: Record<string, { total: number; max: number }> = {};

  // Initialize dimensions
  for (const dim of Object.keys(DIMENSIONS)) {
    dimensionScores[dim] = { total: 0, max: 0 };
  }

  // Calculate dimension scores
  for (const q of auditQuestions) {
    const maxOptionValue = Math.max(...q.options.map((o) => o.value));
    dimensionScores[q.dimension].max += maxOptionValue;
    dimensionScores[q.dimension].total += answers[q.id] || 0;
  }

  // Build dimension results
  const dimensions: DimensionScore[] = Object.entries(dimensionScores).map(
    ([dim, { total, max }]) => ({
      dimension: dim,
      label: DIMENSIONS[dim as keyof typeof DIMENSIONS],
      score: total,
      maxScore: max,
      percentage: max > 0 ? Math.round((total / max) * 100) : 0,
    })
  );

  const totalScore = dimensions.reduce((sum, d) => sum + d.score, 0);
  const maxScore = dimensions.reduce((sum, d) => sum + d.maxScore, 0);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Determine tier
  let tier: AuditResults["tier"];
  let tierLabel: string;
  let tierDescription: string;

  if (percentage <= 25) {
    tier = "academy";
    tierLabel = "Academy";
    tierDescription =
      "You're early in the AI journey — and that's fine. The best next step is building foundational knowledge before investing in implementation.";
  } else if (percentage <= 50) {
    tier = "audit";
    tierLabel = "Free AI Assessment";
    tierDescription =
      "There's clear potential, but we need to dig deeper to find the right opportunity. A free 15-minute discovery call will identify your highest-impact AI use case.";
  } else if (percentage <= 75) {
    tier = "accelerator";
    tierLabel = "Accelerator";
    tierDescription =
      "Your business is ready to implement. One problem, one solution, four weeks — the Accelerator is designed for businesses at your stage.";
  } else {
    tier = "partner";
    tierLabel = "Transformation Partner";
    tierDescription =
      "You're ready to scale AI across your business. A fractional AI department that continuously identifies and implements the next opportunity.";
  }

  // Generate recommendations
  const recommendations = generateRecommendations(dimensions, tier);

  return {
    totalScore,
    maxScore,
    percentage,
    dimensions,
    tier,
    tierLabel,
    tierDescription,
    recommendations,
  };
}

function generateRecommendations(
  dimensions: DimensionScore[],
  tier: AuditResults["tier"]
): string[] {
  const recs: string[] = [];
  const sorted = [...dimensions].sort((a, b) => a.percentage - b.percentage);
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];

  // Weakest dimension recommendation
  if (weakest.percentage < 40) {
    const dimRecs: Record<string, string> = {
      process:
        "Your processes have significant room for automation. Start by documenting your top 3 most time-consuming repetitive tasks.",
      data: "Data organisation is your biggest gap. Before AI can help, your data needs to be structured and accessible. Start with centralising key documents.",
      tech: "Your technology foundation needs attention. Consider starting with free AI tools like Claude or ChatGPT to build familiarity before investing in custom solutions.",
      team: "Team readiness is your main challenge. Focus on building AI literacy through workshops and hands-on experimentation with safe, non-critical tasks.",
      strategy:
        "Strategic alignment is your priority. Define clear goals for what efficiency improvements would mean for your business before choosing tools.",
    };
    recs.push(dimRecs[weakest.dimension] || "Focus on strengthening your weakest area first.");
  }

  // Strongest dimension leverage
  if (strongest.percentage > 60) {
    recs.push(
      `Your ${strongest.label.toLowerCase()} is a strength — leverage this as your starting point for AI implementation.`
    );
  }

  // Tier-specific recommendations
  switch (tier) {
    case "academy":
      recs.push(
        "Join the Tech Horizon Academy (free) for weekly workshops and 1,300+ templates to build your AI skills at your own pace."
      );
      recs.push(
        "Start small: pick one simple task (like email templates or meeting notes) and try automating it with a free AI tool."
      );
      break;
    case "audit":
      recs.push(
        "Book a free 15-minute discovery call to identify the one task that would give you the biggest return from AI automation."
      );
      recs.push(
        "Meanwhile, start documenting your repetitive processes — timing them will reveal surprising opportunities."
      );
      break;
    case "accelerator":
      recs.push(
        "Your business is prime for a focused 4-week Accelerator sprint. One problem, one solution, measurable results."
      );
      recs.push(
        "Consider which process, if automated, would free up the most valuable time in your business."
      );
      break;
    case "partner":
      recs.push(
        "You're ready for ongoing AI partnership. A fractional AI department can continuously identify and implement the next AI opportunity."
      );
      recs.push(
        "Think about a 12-month AI roadmap — which processes should be automated first, second, and third?"
      );
      break;
  }

  // Always add privacy recommendation if data handling is weak
  const dataDim = dimensions.find((d) => d.dimension === "data");
  const techDim = dimensions.find((d) => d.dimension === "tech");
  if ((dataDim && dataDim.percentage < 50) || (techDim && techDim.percentage < 50)) {
    recs.push(
      "Prioritise data security: any AI solution should run on private infrastructure with your data under your control."
    );
  }

  return recs.slice(0, 5);
}
