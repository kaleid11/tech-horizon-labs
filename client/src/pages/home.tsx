import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Hero, TrustBar, Problem } from "@/components/sections/hero_problem";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Results, Process } from "@/components/sections/results_process";
import { Pricing, Academy } from "@/components/sections/pricing_academy";
import { Founder, FAQ, CTA } from "@/components/sections/founder_faq_cta";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://techhorizonlabs.com/#organization",
  "name": "Tech Horizon Labs",
  "url": "https://techhorizonlabs.com",
  "logo": "https://techhorizonlabs.com/opengraph.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://techhorizonlabs.com/services/audit",
    "availableLanguage": "English",
  },
  "areaServed": {
    "@type": "State",
    "name": "Queensland",
    "containedInPlace": {
      "@type": "Country",
      "name": "Australia",
    },
  },
  "sameAs": [
    "https://academy.techhorizonlabs.com",
    "https://tech-horizon.beehiiv.com",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-background selection:bg-accent selection:text-primary">
      <PageSEO {...SEO_CONFIGS.home} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
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
