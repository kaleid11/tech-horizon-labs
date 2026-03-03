import { Navbar, Footer, SkipLink } from "@/components/layout";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { AuditWizard } from "@/components/audit/audit-wizard";

export default function AuditToolPage() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.auditTool} />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="pt-32 pb-20 bg-cream-50 min-h-screen">
          <div className="container mx-auto px-4 md:px-6">
            <AuditWizard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
