import { Navbar, Footer, SkipLink } from "@/components/layout";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { AuditWizard } from "@/components/audit/audit-wizard";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

export default function AuditToolPage() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.auditTool} />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <PageBreadcrumb items={[
          { label: "Work", href: "/portfolio" },
          { label: "AI Readiness Quiz" },
        ]} />

        <section className="pt-32 pb-20 bg-cream-50 min-h-screen">
          <div className="container mx-auto px-4 md:px-6">
            <AuditWizard />

            <div className="mt-12 pt-8 border-t border-gray-200 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/services/audit" className="text-salmon-600 hover:text-salmon-700 underline">Book a Full Assessment</a>
                <a href="/portfolio" className="text-salmon-600 hover:text-salmon-700 underline">See Real Results</a>
                <a href="/resources" className="text-salmon-600 hover:text-salmon-700 underline">Free Resources</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
