import { Navbar, Footer } from "@/components/layout";
import { PageSEO } from "@/components/seo/page-seo";

export default function NotFound() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-background">
      <PageSEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex
      />
      <Navbar />
      <main className="flex items-center justify-center py-32 px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-salmon-500 mb-4">404</p>
          <h1 className="text-2xl font-bold text-aubergine-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-salmon-500 text-white font-semibold rounded-lg hover:bg-salmon-600 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
