import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Calendar, ArrowRight, CheckCircle2, BookOpen, Search, Zap, Users } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { AuditResults } from "./audit-scoring";

interface AuditResultsDisplayProps {
  results: AuditResults;
  name: string;
}

const tierIcons = {
  academy: BookOpen,
  audit: Search,
  accelerator: Zap,
  partner: Users,
};

const tierColors = {
  academy: "bg-blue-50 border-blue-200 text-blue-800",
  audit: "bg-green-50 border-green-200 text-green-800",
  accelerator: "bg-salmon-50 border-salmon-200 text-salmon-800",
  partner: "bg-aubergine-50 border-aubergine-200 text-aubergine-800",
};

const tierCTAs: Record<string, { label: string; href: string }> = {
  academy: { label: "Join Free Academy", href: "https://academy.techhorizonlabs.com" },
  audit: { label: "Find My Bottleneck", href: BOOKING_URL },
  accelerator: { label: "Find My Bottleneck", href: BOOKING_URL },
  partner: { label: "Discuss Partnership", href: BOOKING_URL },
};

export function AuditResultsDisplay({ results, name }: AuditResultsDisplayProps) {
  const TierIcon = tierIcons[results.tier];
  const chartData = results.dimensions.map((d) => ({
    dimension: d.label,
    score: d.percentage,
    fullMark: 100,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Score Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-aubergine-900 mb-2">
          {name ? `${name}'s` : "Your"} AI Readiness Score
        </h2>
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-salmon-500 to-salmon-600 text-white shadow-xl mb-4">
          <div className="text-center">
            <div className="text-4xl font-bold">{results.percentage}</div>
            <div className="text-xs opacity-80">out of 100</div>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
        <h3 className="text-lg font-bold text-aubergine-900 mb-4 text-center">
          Readiness by Dimension
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#e76f51"
                fill="#e76f51"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {results.dimensions.map((d) => (
            <div key={d.dimension} className="text-center">
              <div className="text-2xl font-bold text-aubergine-900">
                {d.percentage}%
              </div>
              <div className="text-xs text-gray-500">{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Tier */}
      <div
        className={`rounded-2xl border-2 p-8 mb-8 ${tierColors[results.tier]}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <TierIcon className="h-8 w-8" />
          <div>
            <div className="text-xs font-medium uppercase tracking-wider opacity-70">
              Recommended Next Step
            </div>
            <h3 className="text-xl font-bold">{results.tierLabel}</h3>
          </div>
        </div>
        <p className="mb-6">{results.tierDescription}</p>
        <Button
          className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 group"
          asChild
        >
          <a
            href={tierCTAs[results.tier].href}
            target={results.tier === "academy" ? "_blank" : undefined}
            rel={results.tier === "academy" ? "noopener noreferrer" : undefined}
          >
            <Calendar className="mr-2 h-5 w-5" />
            {tierCTAs[results.tier].label}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-aubergine-900 mb-6">
          Personalised Recommendations
        </h3>
        <div className="space-y-4">
          {results.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-salmon-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
