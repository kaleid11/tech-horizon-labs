import { useState, useMemo, useEffect } from "react";
import { companies, companyOrder, C, fmt, getInvestorColor, computeInvestorTotals, parseDate, fmtVal } from "@/data/research/index";
import type { BoardMember, TimelineEvent, FundingRound, PolicyShift, SupplyChainEntity, CompanyData, FinancialMetric, RestructuringPhase } from "@/data/research/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Navbar, Footer, SkipLink } from "@/components/layout";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { PageSEO } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ChevronDown, ChevronRight, ArrowLeft, Calendar } from "lucide-react";

const BASE_URL = "https://techhorizonlabs.com";

function SevDot({ sev }: { sev: string }) {
  const color = sev === "critical" ? C.red : sev === "warn" ? C.warn : C.blue;
  return <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />;
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-md p-3 border border-gray-200 text-center">
      <p className="font-mono text-[9px] tracking-wider text-gray-500">{label}</p>
      <p className="font-serif text-lg font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

function ComparisonDashboard({ onSelectCompany }: { onSelectCompany: (id: string) => void }) {
  const [view, setView] = useState<"valuation" | "funding" | "stats">("valuation");

  const companyValuations = useMemo(() => {
    return companyOrder.map(id => {
      const co = companies[id];
      const valRounds = co.fundingRounds.filter(r => r.val);
      const points = valRounds.map(r => ({ date: parseDate(r.date), val: r.val!, label: r.date }));
      const latestVal = points.length > 0 ? points[points.length - 1].val : null;
      const totalRaised = co.fundingRounds.reduce((s, r) => s + r.total, 0);
      return { id, name: co.meta.name, color: co.meta.color, points, latestVal, totalRaised };
    });
  }, []);

  const views = [
    { id: "valuation" as const, label: "Valuation Race" },
    { id: "funding" as const, label: "Total Funding" },
    { id: "stats" as const, label: "Quick Stats" },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <p className="font-mono text-[9px] tracking-[2px] font-bold text-aubergine-700">COMPARE</p>
        <div className="flex gap-1 ml-auto">
          {views.map(v => (
            <button key={v.id} onClick={() => setView(v.id)} data-testid={`dashboard-tab-${v.id}`}
              className={`px-3 py-1.5 rounded-md font-mono text-[9px] tracking-wide border transition-all ${view === v.id ? "bg-aubergine-900 text-white border-aubergine-900 font-bold" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "valuation" && (
        <div>
          <ValuationRaceChart data={companyValuations} onSelect={onSelectCompany} />
          <p className="text-center font-mono text-[8px] text-gray-400 mt-1">Private company valuations only. Google DeepMind and Meta AI shown by parent market cap in their profiles.</p>
        </div>
      )}
      {view === "funding" && <FundingComparisonChart data={companyValuations} onSelect={onSelectCompany} />}
      {view === "stats" && <StatsGrid data={companyValuations} onSelect={onSelectCompany} />}
    </div>
  );
}

function ValuationRaceChart({ data, onSelect }: { data: { id: string; name: string; color: string; points: { date: number; val: number; label: string }[]; latestVal: number | null; totalRaised: number }[]; onSelect: (id: string) => void }) {
  const publicIds = new Set(["google-deepmind", "meta-ai"]);
  const withVals = data.filter(d => d.points.length > 0 && !publicIds.has(d.id));
  if (withVals.length === 0) return null;

  const allPts = withVals.flatMap(d => d.points);
  const minT = Math.min(...allPts.map(p => p.date));
  const maxT = Math.max(...allPts.map(p => p.date));
  const maxV = Math.max(...allPts.map(p => p.val));

  const pad = { top: 20, right: 120, bottom: 30, left: 60 };
  const w = 900;
  const h = 280;
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const getX = (t: number) => pad.left + (maxT === minT ? chartW / 2 : ((t - minT) / (maxT - minT)) * chartW);
  const getY = (v: number) => pad.top + chartH - (v / maxV) * chartH;

  const gridLines = 4;
  const gridVals = Array.from({ length: gridLines + 1 }, (_, i) => (maxV / gridLines) * i);

  const years = new Set<number>();
  for (let y = new Date(minT).getFullYear(); y <= new Date(maxT).getFullYear(); y++) years.add(y);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ minWidth: 500 }} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Valuation race chart comparing AI companies over time">
        {gridVals.map((gv, i) => {
          const y = getY(gv);
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="#f3f4f6" strokeWidth="1" strokeDasharray={i === 0 ? "0" : "3 3"} />
              <text x={pad.left - 6} y={y + 3} textAnchor="end" fill="#c0c0c0" fontSize="7" fontFamily="monospace">{fmtVal(gv)}</text>
            </g>
          );
        })}

        {Array.from(years).map(yr => {
          const x = getX(new Date(yr, 0, 1).getTime());
          return x >= pad.left && x <= w - pad.right ? (
            <text key={yr} x={x} y={h - 4} textAnchor="middle" fill="#c0c0c0" fontSize="8" fontFamily="monospace">{yr}</text>
          ) : null;
        })}

        <line x1={pad.left} y1={pad.top + chartH} x2={w - pad.right} y2={pad.top + chartH} stroke="#e5e7eb" strokeWidth="1" />

        {withVals.map(co => {
          if (co.points.length < 2) return null;
          const pts = co.points.sort((a, b) => a.date - b.date);
          const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.date)} ${getY(p.val)}`).join(" ");
          const lastPt = pts[pts.length - 1];
          return (
            <g key={co.id} className="cursor-pointer" onClick={() => onSelect(co.id)} data-testid={`race-line-${co.id}`}>
              <path d={d} fill="none" stroke={co.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
              <circle cx={getX(lastPt.date)} cy={getY(lastPt.val)} r="3.5" fill={co.color} stroke="white" strokeWidth="1.5" />
              <text x={w - pad.right + 8} y={getY(lastPt.val) + 3} fill={co.color} fontSize="8" fontWeight="bold" fontFamily="monospace">
                {co.name.split("(")[0].trim().split(" ")[0]}
              </text>
              <text x={w - pad.right + 8} y={getY(lastPt.val) + 12} fill="#999" fontSize="6" fontFamily="monospace">
                {fmtVal(lastPt.val)}
              </text>
            </g>
          );
        })}

        {withVals.filter(co => co.points.length === 1).map(co => {
          const pt = co.points[0];
          return (
            <g key={co.id} className="cursor-pointer" onClick={() => onSelect(co.id)} data-testid={`race-dot-${co.id}`}>
              <circle cx={getX(pt.date)} cy={getY(pt.val)} r="4" fill={co.color} stroke="white" strokeWidth="1.5" />
              <text x={getX(pt.date) + 6} y={getY(pt.val) + 3} fill={co.color} fontSize="7" fontWeight="bold" fontFamily="monospace">
                {co.name.split("(")[0].trim().split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function FundingComparisonChart({ data, onSelect }: { data: { id: string; name: string; color: string; totalRaised: number }[]; onSelect: (id: string) => void }) {
  const sorted = [...data].sort((a, b) => b.totalRaised - a.totalRaised);
  const maxFunding = Math.max(...sorted.map(d => d.totalRaised));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
      {sorted.map(co => {
        const pct = (co.totalRaised / maxFunding) * 100;
        return (
          <button key={co.id} onClick={() => onSelect(co.id)} data-testid={`funding-bar-${co.id}`}
            className="w-full flex items-center gap-3 group hover:bg-gray-50 rounded-md p-1.5 transition-colors text-left">
            <span className="font-mono text-[9px] font-bold w-24 shrink-0 truncate" style={{ color: co.color }}>
              {co.name.split("(")[0].trim()}
            </span>
            <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500 group-hover:opacity-90"
                style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: co.color + "cc" }} />
            </div>
            <span className="font-mono text-[10px] font-bold text-gray-600 w-16 text-right shrink-0">
              {fmtVal(co.totalRaised)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StatsGrid({ data, onSelect }: { data: { id: string; name: string; color: string; latestVal: number | null; totalRaised: number }[]; onSelect: (id: string) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left p-3 font-mono text-[10px] tracking-wider text-gray-400 font-bold">COMPANY</th>
            <th className="text-right p-3 font-mono text-[10px] tracking-wider text-gray-400 font-bold">VALUATION</th>
            <th className="text-right p-3 font-mono text-[10px] tracking-wider text-gray-400 font-bold">TOTAL RAISED</th>
            <th className="text-left p-3 font-mono text-[10px] tracking-wider text-gray-400 font-bold hidden sm:table-cell">KEY MODEL</th>
            <th className="text-left p-3 font-mono text-[10px] tracking-wider text-gray-400 font-bold hidden md:table-cell">OPEN SOURCE</th>
          </tr>
        </thead>
        <tbody>
          {data.map(co => {
            const os = companies[co.id].meta.openSource;
            return (
              <tr key={co.id} onClick={() => onSelect(co.id)} data-testid={`stats-row-${co.id}`}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="p-3">
                  <span className="font-mono text-[10px] font-bold" style={{ color: co.color }}>
                    {co.name}
                  </span>
                </td>
                <td className="p-3 text-right font-mono text-[10px] font-bold text-aubergine-900" data-testid={`text-valuation-${co.id}`}>
                  {fmtVal(co.latestVal)}
                </td>
                <td className="p-3 text-right font-mono text-[10px] text-gray-600" data-testid={`text-raised-${co.id}`}>
                  {fmtVal(co.totalRaised)}
                </td>
                <td className="p-3 font-mono text-[10px] text-gray-500 hidden sm:table-cell">
                  {companies[co.id].meta.keyModel}
                </td>
                <td className="p-3 font-mono text-[10px] hidden md:table-cell">
                  <span className={os.startsWith("Yes") ? "text-green-600" : os.startsWith("Partial") ? "text-amber-500" : "text-gray-400"}>
                    {os}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function HeroSection({ onSelectCompany }: { onSelectCompany: (id: string) => void }) {
  return (
    <div className="py-12 md:py-20">
      <div className="mb-10">
        <p className="font-mono text-[10px] text-salmon-500 tracking-[3px] mb-4 font-bold">AI INDUSTRY RESEARCH</p>
        <h1 className="text-4xl md:text-6xl font-bold text-aubergine-900 mb-4 leading-[1.1]">
          Power, Money &<br />Control in AI
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
          Deep analysis of governance, funding, and policy across the world's most important AI companies.
          Free and open research from Tech Horizon Labs.
        </p>
        <a href="/insights/claude-vs-chatgpt-2026" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-salmon-50 border border-salmon-200 rounded-full text-salmon-700 text-sm font-medium hover:bg-salmon-100 transition-colors">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon-500 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-salmon-500" /></span>
          New: Claude vs ChatGPT 2026 — Honest Comparison →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {companyOrder.map(id => {
          const co = companies[id];
          return (
            <button key={id} onClick={() => onSelectCompany(id)} data-testid={`company-card-${id}`}
              className="text-left p-4 rounded-lg border bg-white transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
              style={{ borderColor: co.meta.color + "25" }}>
              <p className="font-mono text-[10px] tracking-wider font-bold mb-1" style={{ color: co.meta.color }}>
                {co.meta.name.toUpperCase()}
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{co.meta.tagline}</p>
            </button>
          );
        })}
      </div>

      <ComparisonDashboard onSelectCompany={onSelectCompany} />
    </div>
  );
}

function GovernancePanel({ company, onPersonClick }: { company: CompanyData; onPersonClick: (p: BoardMember) => void }) {
  const accent = company.meta.color;
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {company.shareStructure && (
        <div className="rounded-lg border p-4 bg-white" style={{ borderColor: accent + "20" }}>
          <p className="font-mono text-[9px] tracking-[2px] font-bold mb-3" style={{ color: accent }}>
            {company.meta.id === "anthropic" ? "16-CLASS SHARE ARCHITECTURE · DELAWARE PBC" : "CORPORATE STRUCTURE"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {company.shareStructure.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 border" style={{ borderColor: s.color + "20" }}>
                <p className="font-mono text-[10px] font-bold mb-1" style={{ color: s.color }}>{s.title}</p>
                <p className="text-xs text-aubergine-900 font-semibold">{s.who}</p>
                <p className="font-mono text-[11px] font-bold my-1" style={{ color: s.power.includes("ZERO") ? C.red : C.green }}>{s.power}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {company.ownership && (
        <div className="rounded-lg border p-4 bg-white" style={{ borderColor: accent + "20" }}>
          <p className="font-mono text-[9px] tracking-[2px] font-bold mb-3" style={{ color: accent }}>OWNERSHIP STRUCTURE</p>
          <div className="space-y-2">
            {company.ownership.map((o, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-md bg-gray-50 border border-gray-200">
                <span className="font-serif text-lg font-bold w-12 text-right" style={{ color: o.color }}>{o.pct}%</span>
                <div className="flex-1 h-4 bg-white rounded border border-gray-200 overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${o.pct}%`, backgroundColor: o.color + "55" }} />
                </div>
                <div className="min-w-[100px] sm:min-w-[120px]">
                  <p className="text-xs font-semibold" style={{ color: o.color }}>{o.label}</p>
                  <p className="text-[9px] text-gray-500">{o.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="font-mono text-[9px] tracking-[2px] font-bold" style={{ color: accent }}>
        {company.meta.id === "anthropic" ? "BOARD OF DIRECTORS · 6 SEATS" : "LEADERSHIP"}
      </p>
      <div className="space-y-2">
        {company.boardMembers.map((m, i) => (
          <button key={i} onClick={() => onPersonClick(m)} data-testid={`board-member-${i}`}
            className="w-full text-left bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-3 transition-colors hover:border-salmon-400">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: m.color + "15", border: `2px solid ${m.color}35`, color: m.color }}>
              {m.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-aubergine-900 font-semibold">{m.name}</span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded" style={{ backgroundColor: m.color + "18", color: m.color }}>
                  {m.seatType || m.tag}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">{m.role}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>
        ))}
      </div>

      {company.trustees && company.trustees.length > 0 && (
        <div className="rounded-lg border p-4 bg-white" style={{ borderColor: C.green + "20" }}>
          <p className="font-mono text-[9px] tracking-[2px] font-bold mb-1" style={{ color: C.green }}>
            LONG-TERM BENEFIT TRUST · {company.trustees.length} TRUSTEES
          </p>
          <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
            The LTBT appoints board members to ensure Anthropic stays mission-aligned. But 2 of 3 original safety-focused trustees departed and were replaced by geopolitics/policy experts.
          </p>
          <div className="space-y-2">
            {company.trustees.map((t, i) => (
              <button key={i} onClick={() => onPersonClick(t)}
                className="w-full text-left bg-gray-50 rounded-lg p-3 border border-gray-200 transition-colors hover:border-salmon-400">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: t.color + "15", color: t.color }}>{t.name[0]}</span>
                  <span className="text-sm text-aubergine-900 font-semibold">{t.name}</span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded" style={{ backgroundColor: t.color + "18", color: t.color }}>{t.role}</span>
                </div>
                {t.keyFact && <p className="text-[11px] text-gray-500 italic">"{t.keyFact}"</p>}
              </button>
            ))}
          </div>
          {company.departedTrustees && company.departedTrustees.length > 0 && (
            <div className="mt-3 bg-gray-50 rounded-lg p-3 border" style={{ borderColor: C.red + "18" }}>
              <p className="font-mono text-[9px] tracking-wider font-bold mb-2" style={{ color: C.red }}>DEPARTED TRUSTEES</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {company.departedTrustees.map((d, i) => (
                  <div key={i} className="p-2 rounded border" style={{ borderColor: C.red + "15", backgroundColor: C.red + "05" }}>
                    <p className="text-xs text-aubergine-900 font-semibold">{d.name}</p>
                    <p className="font-mono text-[10px]" style={{ color: C.red }}>{d.role} · Left {d.departed}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{d.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {company.financials && !company.restructuring && (
        <div className="rounded-lg border p-4 bg-white" style={{ borderColor: accent + "20" }}>
          <p className="font-mono text-[9px] tracking-[2px] font-bold mb-3" style={{ color: accent }}>KEY FINANCIALS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {company.financials.map((f, i) => <MetricCard key={i} label={f.label} value={f.value} color={f.color} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelinePanel({ events, accent, title }: { events: TimelineEvent[]; accent: string; title?: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {title && <p className="font-mono text-[9px] tracking-[2px] font-bold mb-2" style={{ color: accent }}>{title}</p>}
      {events.map((e, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button onClick={() => setExpanded(expanded === i ? null : i)} data-testid={`timeline-event-${i}`}
            className="w-full text-left p-3 flex items-center gap-3">
            <SevDot sev={e.sev} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-aubergine-900 font-semibold">{e.title}</p>
              <p className="font-mono text-[10px] text-gray-500">{e.date}</p>
            </div>
            {expanded === i ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
          </button>
          {expanded === i && (
            <div className="px-3 pb-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-lg p-3">{e.desc}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PentagonPanel({ events }: { events: TimelineEvent[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const latestCritical = [...events].filter(e => e.sev === "critical").sort((a, b) => parseDate(b.date) - parseDate(a.date))[0];
  const crisisDate = latestCritical ? latestCritical.date.toUpperCase() : "FEB 2026";
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="rounded-lg p-4 border" style={{ background: `linear-gradient(135deg, ${C.red}12, transparent)`, borderColor: C.red + "30" }}>
        <p className="font-mono text-[9px] tracking-[2px] font-bold mb-2" style={{ color: C.red }}>PENTAGON CRISIS · {crisisDate}</p>
        <h2 className="text-xl md:text-2xl font-bold text-aubergine-900 mb-2 leading-tight">
          Trump Bans All Federal Agencies from Using Anthropic
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Executive order issued after Anthropic refused Pentagon demand for "all lawful uses" of Claude — including mass surveillance and autonomous weapons.
        </p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <MetricCard label="CONTRACT VALUE" value="$200M" color={C.red} />
          <MetricCard label="PHASE-OUT" value="6 Months" color={C.warn} />
          <MetricCard label="IPO RISK" value="$380B" color={C.red} />
        </div>
      </div>
      {events.map((e, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button onClick={() => setExpanded(expanded === i ? null : i)} data-testid={`pentagon-event-${i}`}
            className="w-full text-left p-3 flex items-center gap-3">
            <SevDot sev={e.sev} />
            <div className="flex-1"><p className="text-xs text-aubergine-900 font-semibold">{e.title}</p><p className="font-mono text-[10px] text-gray-500">{e.date}</p></div>
            {expanded === i ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
          </button>
          {expanded === i && (
            <div className="px-3 pb-3"><p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-lg p-3">{e.desc}</p></div>
          )}
        </div>
      ))}
    </div>
  );
}

function PolicyPanel({ shifts, accent }: { shifts: PolicyShift[]; accent: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="font-mono text-[9px] tracking-[2px] font-bold mb-2" style={{ color: accent }}>POLICY SHIFTS · BEFORE vs. AFTER</p>
      {shifts.map((p, i) => (
        <div key={i} className="bg-white rounded-lg p-3 border cursor-pointer" style={{ borderColor: p.color + "20" }}
          onClick={() => setExpanded(expanded === i ? null : i)}>
          <div className="flex justify-between items-center" style={{ marginBottom: expanded === i ? "10px" : 0 }}>
            <div>
              <p className="text-base md:text-lg font-bold text-aubergine-900">{p.title}</p>
              <p className="font-mono text-[10px] font-bold" style={{ color: p.color }}>{p.area} · {p.date}</p>
            </div>
            {expanded === i ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
          </div>
          {expanded === i && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-3 border" style={{ borderColor: C.red + "15" }}>
                  <p className="font-mono text-[9px] tracking-wider font-bold mb-1" style={{ color: C.red }}>BEFORE</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{p.before}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border" style={{ borderColor: C.green + "15" }}>
                  <p className="font-mono text-[9px] tracking-wider font-bold mb-1" style={{ color: C.green }}>AFTER</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{p.after}</p>
                </div>
              </div>
              <div className="rounded-md p-3 border" style={{ backgroundColor: p.color + "08", borderColor: p.color + "15" }}>
                <p className="font-mono text-[9px] tracking-wider font-bold mb-1" style={{ color: p.color }}>SIGNIFICANCE</p>
                <p className="text-[11px] text-aubergine-900 leading-relaxed">{p.significance}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SupplyChainPanel({ entities }: { entities: SupplyChainEntity[] }) {
  const impactColors: Record<string, string> = { CRITICAL: C.red, HIGH: C.warn, MEDIUM: C.blue, BENEFICIARY: C.green };
  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="font-mono text-[9px] tracking-[2px] font-bold" style={{ color: C.gold }}>DEFENSE SUPPLY CHAIN IMPACT</p>
      <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
        Trump's supply chain risk designation means: no contractor, supplier, or partner doing business with the US military may conduct ANY commercial activity with Anthropic.
      </p>
      {entities.map((s, i) => (
        <div key={i} className="bg-white rounded-lg p-3 border" style={{ borderColor: s.color + "20" }}>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-aubergine-900 font-semibold">{s.name}</span>
              {s.ticker !== "N/A" && s.ticker !== "Private" && <span className="font-mono text-[10px] text-gray-500">{s.ticker}</span>}
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded font-bold"
              style={{ backgroundColor: (impactColors[s.impact] || C.dim) + "18", color: impactColors[s.impact] || C.dim }}>{s.impact}</span>
          </div>
          <p className="font-mono text-[10px] font-semibold mb-1" style={{ color: s.color }}>{s.role}</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

function RoundDetail({ r, accent }: { r: FundingRound; accent: string }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
        <div>
          <p className="text-lg font-bold text-aubergine-900">{r.label}</p>
          <p className="font-mono text-[10px] text-gray-500">{r.date} · Led by {r.lead}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xl font-bold" style={{ color: accent }}>{fmt(r.total)}</p>
          {r.val && <p className="font-mono text-[10px] text-gray-500">@ {fmt(r.val)} val</p>}
        </div>
      </div>
      <div className="space-y-1 mb-3">
        {r.inv.map((inv, i) => {
          const maxA = Math.max(...r.inv.map(x => x.a));
          return (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded bg-gray-50">
              <span className="text-[11px] w-20 sm:w-28 truncate font-semibold flex-shrink-0" style={{ color: getInvestorColor(inv.n) }}>{inv.n}</span>
              <div className="flex-1 h-3 bg-white rounded overflow-hidden">
                <div className="h-full rounded" style={{ width: `${(inv.a / maxA) * 100}%`, backgroundColor: getInvestorColor(inv.n) + "55" }} />
              </div>
              <span className="font-mono text-xs text-aubergine-900 font-bold min-w-[50px] text-right">{fmt(inv.a)}</span>
            </div>
          );
        })}
      </div>
      {r.events.length > 0 && (
        <div className="border-t border-gray-200 pt-2">
          {r.events.map((e, i) => <p key={i} className="text-[11px] text-gray-500 mb-0.5">{e}</p>)}
        </div>
      )}
    </div>
  );
}

function FundingPanel({ rounds, accent }: { rounds: FundingRound[]; accent: string }) {
  const [active, setActive] = useState<number | null>(null);
  const maxTotal = Math.max(...rounds.map(x => x.total));
  const minBarWidth = 70;
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-2 items-end pt-2 relative" style={{ minWidth: `${rounds.length * minBarWidth}px` }}>
          {rounds.map((r, i) => {
            const h = Math.max(24, (r.total / maxTotal) * 120);
            return (
              <button key={i} onClick={() => setActive(active === i ? null : i)} data-testid={`funding-round-${i}`}
                className="flex flex-col items-center gap-1 flex-1" style={{ minWidth: minBarWidth }}>
                <span className="font-mono text-[10px] text-gray-500 whitespace-nowrap">{fmt(r.total)}</span>
                <div className="w-4/5 rounded-t transition-all duration-300"
                  style={{ height: h, backgroundColor: active === i ? accent : accent + "44", border: active === i ? `2px solid ${accent}` : "none" }} />
                <span className="font-mono text-[10px] text-gray-500 text-center leading-tight whitespace-nowrap">{r.label}</span>
              </button>
            );
          })}
          <div className="absolute bottom-[18px] left-0 right-0 h-px bg-gray-200" />
        </div>
      </div>
      {active !== null ? (
        <RoundDetail r={rounds[active]} accent={accent} />
      ) : (
        <div className="text-center p-8 text-gray-500 font-mono text-xs bg-white rounded-lg border border-dashed border-gray-300">
          Click any round above to see full investor breakdown
        </div>
      )}
    </div>
  );
}

function InvestorPanel({ company }: { company: CompanyData }) {
  const accent = company.meta.color;
  const sorted = useMemo(() => computeInvestorTotals(company.fundingRounds), [company.fundingRounds]);
  const maxAmt = sorted[0]?.[1] || 1;
  const totalAll = sorted.reduce((s, [, a]) => s + a, 0);
  const [expandedInv, setExpandedInv] = useState<string | null>(null);

  return (
    <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {sorted.map(([name, amt], i) => {
        const profile = company.investorProfiles?.[name];
        const isExpanded = expandedInv === name;
        return (
          <div key={i}>
            <button onClick={() => profile ? setExpandedInv(isExpanded ? null : name) : null}
              data-testid={`investor-${i}`}
              className={`w-full flex items-center gap-2 p-2 rounded-md bg-white border border-gray-200 text-left transition-colors ${profile ? "cursor-pointer hover:border-salmon-400" : "cursor-default"}`}>
              <span className="text-[11px] w-24 sm:w-28 truncate font-semibold flex-shrink-0" style={{ color: getInvestorColor(name) }}>{name}</span>
              <div className="flex-1 h-4 bg-gray-50 rounded overflow-hidden">
                <div className="h-full rounded" style={{ width: `${(amt / maxAmt) * 100}%`, backgroundColor: getInvestorColor(name) + "55" }} />
              </div>
              <span className="font-mono text-xs text-aubergine-900 font-bold min-w-[50px] text-right">{fmt(amt)}</span>
              {profile && (isExpanded ? <ChevronDown className="w-3 h-3 text-gray-400" /> : <ChevronRight className="w-3 h-3 text-gray-400" />)}
            </button>
            {isExpanded && profile && (
              <div className="bg-white rounded-lg p-3 border border-gray-200 mt-1 mb-2 ml-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                  {[
                    { l: "TOTAL INVESTED", v: profile.total, c: profile.color },
                    { l: "EQUITY", v: profile.equity, c: accent },
                    { l: "VOTES", v: profile.votes, c: profile.votes === "ZERO" ? C.red : C.green },
                    { l: "BOARD SEAT", v: profile.boardSeat, c: profile.boardSeat.includes("YES") ? C.green : C.dim },
                    { l: "TYPE", v: profile.type, c: C.sub },
                    { l: "HQ", v: profile.hq, c: C.sub },
                  ].map((m, j) => (
                    <div key={j} className="bg-gray-50 rounded p-2 border border-gray-200">
                      <p className="font-mono text-[9px] tracking-wider text-gray-500">{m.l}</p>
                      <p className="text-[11px] font-semibold" style={{ color: m.c }}>{m.v}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{profile.desc}</p>
              </div>
            )}
          </div>
        );
      })}
      <p className="text-center mt-3 font-mono text-[10px] text-gray-500">
        TOTAL: {fmt(totalAll)} across {company.fundingRounds.length} rounds
        {Object.keys(company.investorProfiles || {}).length > 0 && " · Click investors with profiles for deep-dive"}
      </p>
    </div>
  );
}

function ValuationPanel({ rounds, accent }: { rounds: FundingRound[]; accent: string }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const vals = rounds.filter(r => r.val).map(r => ({ label: r.label, val: r.val!, date: r.date, post: r.post }));
  if (vals.length === 0) return <p className="text-gray-500 text-sm p-8 text-center" data-testid="valuation-empty">No valuation data available.</p>;

  const timestamps = vals.map(v => parseDate(v.date));
  const minT = Math.min(...timestamps);
  const maxT = Math.max(...timestamps);
  const maxV = Math.max(...vals.map(v => v.val));

  const dense = vals.length > 6;
  const pad = { top: 30, right: 30, bottom: dense ? 90 : 50, left: 65 };
  const baseW = Math.max(600, vals.length * 90);
  const w = baseW;
  const h = dense ? 320 : 300;
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const getX = (t: number) => pad.left + (maxT === minT ? chartW / 2 : ((t - minT) / (maxT - minT)) * chartW);
  const getY = (v: number) => pad.top + chartH - (v / maxV) * chartH;

  const points = vals.map((v, i) => ({ x: getX(timestamps[i]), y: getY(v.val), ...v, idx: i }));

  const staggeredOffsets = useMemo(() => {
    const offsets: number[] = new Array(points.length).fill(0);
    const minGap = 45;
    const levels = [0, 12, 24];
    for (let i = 1; i < points.length; i++) {
      if (Math.abs(points[i].x - points[i - 1].x) < minGap) {
        const prevLevel = levels.indexOf(offsets[i - 1]);
        offsets[i] = levels[(prevLevel + 1) % levels.length];
      }
    }
    return offsets;
  }, [points]);

  const gridLines = 4;
  const gridVals = Array.from({ length: gridLines + 1 }, (_, i) => (maxV / gridLines) * i);

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-3">
      <div className="bg-white rounded-lg border border-gray-200 p-3 overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ minWidth: 400 }} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Company valuation history chart">
          {gridVals.map((gv, i) => {
            const y = getY(gv);
            return (
              <g key={i}>
                <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="#f0f0f0" strokeWidth="1" strokeDasharray={i === 0 ? "0" : "3 3"} />
                <text x={pad.left - 8} y={y + 3} textAnchor="end" fill="#b0b0b0" fontSize="8" fontFamily="monospace">
                  {fmtVal(gv)}
                </text>
              </g>
            );
          })}

          <line x1={pad.left} y1={pad.top + chartH} x2={w - pad.right} y2={pad.top + chartH} stroke="#e0e0e0" strokeWidth="1" />

          <defs>
            <linearGradient id={`val-area-${accent.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {points.length > 1 && (
            <path
              d={`${pathD} L ${points[points.length - 1].x} ${pad.top + chartH} L ${points[0].x} ${pad.top + chartH} Z`}
              fill={`url(#val-area-${accent.replace("#", "")})`}
            />
          )}

          <path d={pathD} fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {points.map((p, i) => (
            <g key={i} className="cursor-pointer" onClick={() => setActiveIdx(activeIdx === i ? null : i)} data-testid={`valuation-dot-${i}`}>
              <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
              <circle cx={p.x} cy={p.y} r={activeIdx === i ? 6 : 4} fill={activeIdx === i ? accent : "white"} stroke={accent} strokeWidth="2"
                style={{ transition: "r 0.15s, fill 0.15s" }} />

              {activeIdx === i && (
                <g>
                  <rect x={p.x - 30} y={p.y - 26} width="60" height="18" rx="4" fill={accent} opacity="0.95" />
                  <text x={p.x} y={p.y - 14} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    {fmtVal(p.val)}
                  </text>
                </g>
              )}

              {dense ? (
                <text x={p.x} y={pad.top + chartH + 14 + staggeredOffsets[i]} textAnchor="end" fill="#888" fontSize="7" fontFamily="monospace"
                  transform={`rotate(-45, ${p.x}, ${pad.top + chartH + 14 + staggeredOffsets[i]})`}>
                  {p.label}
                </text>
              ) : (
                <g>
                  <text x={p.x} y={pad.top + chartH + 14} textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="monospace">
                    {p.label}
                  </text>
                  <text x={p.x} y={pad.top + chartH + 24} textAnchor="middle" fill="#b0b0b0" fontSize="7" fontFamily="monospace">
                    {p.date}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>

      {activeIdx !== null ? (
        <div className="bg-white rounded-lg p-4 border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <div>
              <p className="text-lg font-bold text-aubergine-900">{vals[activeIdx].label}</p>
              <p className="font-mono text-[10px] text-gray-500">{vals[activeIdx].date}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xl font-bold" style={{ color: accent }}>{fmtVal(vals[activeIdx].val)}</p>
              <p className="font-mono text-[10px] text-gray-500">
                {vals[activeIdx].post ? `${fmtVal(vals[activeIdx].post!)} post-money` : "valuation"}
              </p>
            </div>
          </div>
          {activeIdx > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200 flex gap-4">
              <div>
                <p className="font-mono text-[10px] text-gray-500">CHANGE</p>
                <p className="font-mono text-sm font-bold" style={{ color: vals[activeIdx].val >= vals[activeIdx - 1].val ? "#44c488" : "#e05555" }}>
                  {vals[activeIdx].val >= vals[activeIdx - 1].val ? "+" : ""}{(((vals[activeIdx].val - vals[activeIdx - 1].val) / vals[activeIdx - 1].val) * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-gray-500">FROM PREVIOUS</p>
                <p className="font-mono text-sm text-gray-700">{fmtVal(vals[activeIdx - 1].val)} → {fmtVal(vals[activeIdx].val)}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-xs text-gray-400 font-mono" data-testid="valuation-hint">Click a data point to see details</p>
      )}
    </div>
  );
}

function RestructuringPanel({ phases, financials, accent }: { phases: RestructuringPhase[]; financials?: FinancialMetric[]; accent: string }) {
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="font-mono text-[9px] tracking-[2px] font-bold" style={{ color: accent }}>CORPORATE EVOLUTION</p>
      {phases.map((p, i) => (
        <div key={i} className="bg-white rounded-lg p-3 border border-gray-200" style={{ borderLeftWidth: "3px", borderLeftColor: p.color }}>
          <p className="font-mono text-xs font-bold mb-1" style={{ color: p.color }}>{p.phase}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
        </div>
      ))}
      {financials && (
        <div className="rounded-lg p-3 border" style={{ backgroundColor: C.red + "08", borderColor: C.red + "20" }}>
          <p className="font-mono text-[9px] tracking-wider font-bold mb-2" style={{ color: C.red }}>FINANCIALS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {financials.map((f, i) => <MetricCard key={i} label={f.label} value={f.value} color={f.color} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function CompetitionPanel({ company }: { company: CompanyData }) {
  const accent = company.meta.color;
  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="font-mono text-[9px] tracking-[2px] font-bold" style={{ color: accent }}>
        {company.meta.id === "kimi" ? "CHINA'S 'SIX LITTLE TIGERS' · AI STARTUP LANDSCAPE" : "COMPETITIVE LANDSCAPE"}
      </p>
      {company.meta.id === "kimi" && (
        <p className="text-[11px] text-gray-500 leading-relaxed mb-2">
          China's LLM market saw a 92% API price collapse from May 2024 to early 2025. ByteDance's Doubao dominates on users. DeepSeek leads open-source. Moonshot/Kimi is pivoting overseas to survive.
        </p>
      )}
      {company.competitors?.map((c, i) => (
        <div key={i} className="bg-white rounded-lg p-3 border" style={{ borderColor: c.color + "20" }}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-aubergine-900 font-semibold">{c.name}</span>
            <span className="font-mono text-[10px] font-semibold" style={{ color: c.color }}>{c.users}</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed">{c.note}</p>
        </div>
      ))}
      {company.competitorStats && (
        <div className="rounded-lg p-3 border mt-3" style={{ backgroundColor: accent + "08", borderColor: accent + "20" }}>
          <p className="font-mono text-[9px] font-bold mb-2" style={{ color: accent }}>{company.meta.name.toUpperCase()}'S POSITION</p>
          <div className="grid grid-cols-3 gap-2">
            {company.competitorStats.map((s, i) => <MetricCard key={i} label={s.label} value={s.value} color={s.color} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function PersonModal({ person, onClose }: { person: BoardMember | null; onClose: () => void }) {
  if (!person) return null;
  const fields = [
    person.born && { label: "Born", value: person.born },
    person.parents && { label: "Family", value: person.parents },
    person.education && { label: "Education", value: person.education },
    person.career && { label: "Career", value: person.career },
    person.voting && { label: "Voting Power", value: person.voting },
    person.personal && { label: "Personal", value: person.personal },
    person.keyFact && { label: "Key Fact", value: person.keyFact },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Dialog open={!!person} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: person.color + "15", border: `2px solid ${person.color}35`, color: person.color }}>
              {person.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <DialogTitle className="text-aubergine-900">{person.name}</DialogTitle>
              <p className="text-xs text-gray-500">{person.role}</p>
            </div>
          </div>
        </DialogHeader>
        <p className="text-xs text-gray-500 leading-relaxed mt-2">{person.desc}</p>
        {fields.length > 0 && (
          <div className="space-y-3 mt-3">
            {fields.map((f, i) => (
              <div key={i}>
                <p className="font-mono text-[9px] tracking-wider font-bold mb-1" style={{ color: person.color }}>{f.label.toUpperCase()}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.value}</p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CompanyView({ company, tabId, setTabId, onPersonClick, onBack }: {
  company: CompanyData;
  tabId: string;
  setTabId: (t: string) => void;
  onPersonClick: (p: BoardMember) => void;
  onBack: () => void;
}) {
  const accent = company.meta.color;
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-gray-500 text-xs mb-4 hover:text-aubergine-900 transition-colors" data-testid="button-research-back">
        <ArrowLeft className="w-4 h-4" /> All companies
      </button>
      <div className="mb-6">
        <p className="font-mono text-[9px] tracking-[3px] mb-2 font-bold" style={{ color: accent }}>
          {company.meta.name.toUpperCase()} · UPDATED {company.meta.lastUpdated.toUpperCase()}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-aubergine-900 mb-1 leading-tight">
          {company.meta.headerTitle}<br />{company.meta.headerSubtitle}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">{company.meta.tagline}</p>
      </div>
      <div className="flex gap-1 mb-5 overflow-x-auto pb-2">
        {company.tabs.map(tab => (
          <button key={tab.id} onClick={() => setTabId(tab.id)} data-testid={`tab-${tab.id}`}
            className="px-3 py-1.5 rounded-md font-mono text-[9px] tracking-wide whitespace-nowrap flex items-center gap-1 transition-all border"
            style={tabId === tab.id
              ? { backgroundColor: accent, color: "#ffffff", borderColor: accent, fontWeight: 700 }
              : { backgroundColor: "transparent", color: "#6b7280", borderColor: "#e5e7eb" }}>
            {tab.label}
            {tab.badge && (
              <span className="ml-1 px-1 rounded text-[9px] font-bold"
                style={{
                  backgroundColor: tabId === tab.id ? "#ffffff44" : C.red + "30",
                  color: tabId === tab.id ? "#ffffff" : C.red,
                }}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
      {tabId === "governance" && <GovernancePanel company={company} onPersonClick={onPersonClick} />}
      {tabId === "pentagon" && company.pentagonTimeline && <PentagonPanel events={company.pentagonTimeline} />}
      {tabId === "policy" && company.policyShifts && <PolicyPanel shifts={company.policyShifts} accent={accent} />}
      {tabId === "supply" && company.supplyChain && <SupplyChainPanel entities={company.supplyChain} />}
      {tabId === "funding" && <FundingPanel rounds={company.fundingRounds} accent={accent} />}
      {tabId === "investors" && <InvestorPanel company={company} />}
      {tabId === "valuation" && <ValuationPanel rounds={company.fundingRounds} accent={accent} />}
      {tabId === "timeline" && company.timeline && <TimelinePanel events={company.timeline} accent={accent} />}
      {tabId === "safety" && company.safetyIssues && <TimelinePanel events={company.safetyIssues} accent={C.red} title="SAFETY & ETHICS ISSUES" />}
      {tabId === "restructuring" && company.restructuring && <RestructuringPanel phases={company.restructuring} financials={company.financials} accent={accent} />}
      {tabId === "copyright" && company.copyrightCases && <TimelinePanel events={company.copyrightCases} accent={accent} title="COPYRIGHT & LEGAL CASES" />}
      {tabId === "controversies" && company.controversies && <TimelinePanel events={company.controversies} accent={accent} title="CONTROVERSIES" />}
      {tabId === "competition" && company.competitors && <CompetitionPanel company={company} />}
    </div>
  );
}

export default function ResearchPage() {
  const [companyId, setCompanyId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const co = params.get("company");
    return co && companies[co] ? co : null;
  });
  const [tabId, setTabId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const co = params.get("company");
    const tab = params.get("tab");
    if (co && companies[co] && tab && companies[co].tabs.some(t => t.id === tab)) return tab;
    if (co && companies[co]) return companies[co].tabs[0]?.id || "";
    return "";
  });
  const [selectedPerson, setSelectedPerson] = useState<BoardMember | null>(null);

  const company = companyId ? companies[companyId] : null;

  const selectCompany = (id: string) => {
    setCompanyId(id);
    setTabId(companies[id].tabs[0]?.id || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (companyId && tabId) {
      const url = new URL(window.location.href);
      url.searchParams.set("company", companyId);
      url.searchParams.set("tab", tabId);
      window.history.replaceState(null, "", url.toString());
    } else if (!companyId) {
      const url = new URL(window.location.href);
      url.searchParams.delete("company");
      url.searchParams.delete("tab");
      window.history.replaceState(null, "", url.pathname);
    }
  }, [companyId, tabId]);

  useEffect(() => {
    if (company) {
      document.title = `${company.meta.name}: Governance & Funding Analysis | Tech Horizon Labs`;
    }
  }, [company]);

  const seoTitle = company
    ? `${company.meta.name} Governance & Funding Analysis`
    : "AI Company Research: Power, Money & Control";
  const seoDescription = company
    ? `Deep analysis of ${company.meta.name}'s governance, funding rounds, investors, and policy. Free research from Tech Horizon Labs.`
    : "Deep analysis of governance, funding, and policy across Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, DeepSeek, Qwen, Perplexity, Kimi, and Mistral. Free AI industry research from Tech Horizon Labs.";

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonical={`${BASE_URL}/research`}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content" className="max-w-5xl mx-auto px-4 pt-32 pb-6">
        <PageBreadcrumb items={[
          { label: "Learn", href: "/resources" },
          { label: "Research" },
        ]} />

        {!company ? (
          <HeroSection onSelectCompany={selectCompany} />
        ) : (
          <CompanyView
            company={company}
            tabId={tabId}
            setTabId={(t) => { setTabId(t); }}
            onPersonClick={setSelectedPerson}
            onBack={() => setCompanyId(null)}
          />
        )}

        <section className="my-16 bg-aubergine-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want help choosing the right AI platform for your business?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            We evaluate 200+ AI tools monthly and help Australian businesses implement the right solution. Not the most hyped one.
          </p>
          <Button size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="link-research-book">
              <Calendar className="mr-2 h-5 w-5" />
              Book a Free Assessment
            </a>
          </Button>
        </section>

        <div className="text-center pb-8">
          <p className="font-mono text-[10px] text-gray-400">
            Sources: SEC filings, Crunchbase, FT, Bloomberg, CNBC, AP, Reuters, Semafor, DefenseScoop, TechCrunch, SCMP
          </p>
        </div>
      </main>

      <PersonModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
      <Footer />
    </div>
  );
}
