import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Lazy load secondary pages for better initial load performance
const SunshineCoastLocation = lazy(() => import("@/pages/locations/sunshine-coast"));
const BrisbaneLocation = lazy(() => import("@/pages/locations/brisbane"));
const QueenslandLocation = lazy(() => import("@/pages/locations/queensland"));
const GoldCoastLocation = lazy(() => import("@/pages/locations/gold-coast"));
const Portfolio = lazy(() => import("@/pages/portfolio"));
const Academy = lazy(() => import("@/pages/academy"));
const About = lazy(() => import("@/pages/about"));
const Resources = lazy(() => import("@/pages/resources"));
const AuditService = lazy(() => import("@/pages/services/audit"));
const AcceleratorService = lazy(() => import("@/pages/services/accelerator"));
const PartnerService = lazy(() => import("@/pages/services/partner"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const AccountingFirmCaseStudy = lazy(() => import("@/pages/portfolio/accounting-firm"));
const ConstructionBuilderCaseStudy = lazy(() => import("@/pages/portfolio/construction-builder"));
const RealEstateAgencyCaseStudy = lazy(() => import("@/pages/portfolio/real-estate-agency"));
const ManufacturingCaseStudy = lazy(() => import("@/pages/portfolio/manufacturing"));
const HealthcareClinicCaseStudy = lazy(() => import("@/pages/portfolio/healthcare-clinic"));
const Research = lazy(() => import("@/pages/research"));
const ConstructionIndustry = lazy(() => import("@/pages/industries/construction"));
const AccountingIndustry = lazy(() => import("@/pages/industries/accounting"));
const LegalIndustry = lazy(() => import("@/pages/industries/legal"));
const HealthcareIndustry = lazy(() => import("@/pages/industries/healthcare"));
const RetailIndustry = lazy(() => import("@/pages/industries/retail"));
const ClaudeVsChatGPT2026 = lazy(() => import("@/pages/insights/claude-vs-chatgpt-2026"));
const AuditTool = lazy(() => import("@/pages/audit-tool"));

// Simple loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="animate-pulse text-aubergine-900">Loading...</div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/locations/sunshine-coast" component={SunshineCoastLocation} />
        <Route path="/locations/brisbane" component={BrisbaneLocation} />
        <Route path="/locations/queensland" component={QueenslandLocation} />
        <Route path="/locations/gold-coast" component={GoldCoastLocation} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/portfolio/accounting-firm" component={AccountingFirmCaseStudy} />
        <Route path="/portfolio/construction-builder" component={ConstructionBuilderCaseStudy} />
        <Route path="/portfolio/real-estate-agency" component={RealEstateAgencyCaseStudy} />
        <Route path="/portfolio/manufacturing" component={ManufacturingCaseStudy} />
        <Route path="/portfolio/healthcare-clinic" component={HealthcareClinicCaseStudy} />
        <Route path="/academy" component={Academy} />
        <Route path="/about" component={About} />
        <Route path="/resources" component={Resources} />
        <Route path="/services/audit" component={AuditService} />
        <Route path="/services/accelerator" component={AcceleratorService} />
        <Route path="/services/partner" component={PartnerService} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/research" component={Research} />
        <Route path="/industries/construction" component={ConstructionIndustry} />
        <Route path="/industries/accounting" component={AccountingIndustry} />
        <Route path="/industries/legal" component={LegalIndustry} />
        <Route path="/industries/healthcare" component={HealthcareIndustry} />
        <Route path="/industries/retail" component={RetailIndustry} />
        <Route path="/insights/claude-vs-chatgpt-2026" component={ClaudeVsChatGPT2026} />
        <Route path="/audit-tool" component={AuditTool} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
