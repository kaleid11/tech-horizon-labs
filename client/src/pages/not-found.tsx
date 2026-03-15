import { Navbar, Footer } from "@/components/layout";
import { PageSEO } from "@/components/seo/page-seo";
import { Search, Briefcase, FileText, GraduationCap, ClipboardCheck, Mail, ArrowRight } from "lucide-react";

const popularPages = [
  { title: "Free AI Readiness Assessment", desc: "15-minute discovery call", href: "/services/audit", icon: Search },
  { title: "Portfolio & Case Studies", desc: "Real business results", href: "/portfolio", icon: Briefcase },
  { title: "Resources & Guides", desc: "Articles, guides & tools", href: "/resources", icon: FileText },
  { title: "Academy", desc: "1,300+ templates & workshops", href: "/academy", icon: GraduationCap },
  { title: "AI Readiness Quiz", desc: "Free 2-min self-assessment", href: "/audit-tool", icon: ClipboardCheck },
  { title: "Contact Us", desc: "Book a call or send a message", href: "/contact", icon: Mail },
];

export default function NotFound() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-background">
      <PageSEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex
      />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-7xl font-bold text-salmon-500 mb-4">404</p>
            <h1 className="text-3xl md:text-4xl font-bold text-aubergine-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved. Try one of these instead:
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-salmon-600 font-medium hover:text-salmon-700 transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Home
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {popularPages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-salmon-300 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-salmon-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <page.icon className="h-5 w-5 text-salmon-600" />
                </div>
                <h3 className="font-bold text-aubergine-900 mb-1">{page.title}</h3>
                <p className="text-sm text-gray-500">{page.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
