import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import SunshineCoastLocation from "@/pages/locations/sunshine-coast";
import BrisbaneLocation from "@/pages/locations/brisbane";
import QueenslandLocation from "@/pages/locations/queensland";
import GoldCoastLocation from "@/pages/locations/gold-coast";
import Portfolio from "@/pages/portfolio";
import Academy from "@/pages/academy";
import About from "@/pages/about";
import Resources from "@/pages/resources";
import AuditService from "@/pages/services/audit";
import AcceleratorService from "@/pages/services/accelerator";
import PartnerService from "@/pages/services/partner";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/locations/sunshine-coast" component={SunshineCoastLocation} />
      <Route path="/locations/brisbane" component={BrisbaneLocation} />
      <Route path="/locations/queensland" component={QueenslandLocation} />
      <Route path="/locations/gold-coast" component={GoldCoastLocation} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/academy" component={Academy} />
      <Route path="/about" component={About} />
      <Route path="/resources" component={Resources} />
      <Route path="/services/audit" component={AuditService} />
      <Route path="/services/accelerator" component={AcceleratorService} />
      <Route path="/services/partner" component={PartnerService} />
      <Route component={NotFound} />
    </Switch>
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
