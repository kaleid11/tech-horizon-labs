import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Hero, TrustBar, Problem } from "@/components/sections/hero_problem";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Results, Process } from "@/components/sections/results_process";
import { Pricing, Academy } from "@/components/sections/pricing_academy";
import { Founder, FAQ, CTA } from "@/components/sections/founder_faq_cta";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-background selection:bg-accent selection:text-primary">
      <PageSEO {...SEO_CONFIGS.home} />
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Problem />
        <Ecosystem />
        <Results />
        <Process />
        <Pricing />
        <Academy />
        <Founder />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
