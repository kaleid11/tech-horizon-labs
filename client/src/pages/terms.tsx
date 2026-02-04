import { Navbar, Footer, SkipLink } from "@/components/layout";
import { PageSEO } from "@/components/seo/page-seo";

export default function Terms() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO
        title="Terms of Service"
        description="Tech Horizon Labs terms of service. Read our terms and conditions for using our AI consulting services and website."
        canonical="https://techhorizonlabs.com/terms"
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="pt-32 pb-12 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-300">Last updated: February 2026</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto prose prose-lg prose-aubergine">

              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the Tech Horizon Labs website and services, you agree to be
                bound by these Terms of Service. If you do not agree to these terms, please do not
                use our services.
              </p>

              <h2>2. Services Description</h2>
              <p>
                Tech Horizon Labs provides AI consulting services, including but not limited to:
              </p>
              <ul>
                <li>AI readiness assessments</li>
                <li>AI system implementation and deployment</li>
                <li>Knowledge base architecture and data preparation</li>
                <li>Team training and enablement</li>
                <li>Ongoing AI infrastructure support</li>
              </ul>

              <h2>3. Client Responsibilities</h2>
              <p>When engaging our services, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information about your business requirements</li>
                <li>Grant necessary access to systems and data required for service delivery</li>
                <li>Respond to communications in a timely manner</li>
                <li>Ensure compliance with applicable laws and regulations</li>
                <li>Pay fees as agreed in the service agreement</li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the
                property of Tech Horizon Labs or its licensors and is protected by Australian and
                international copyright laws.
              </p>
              <p>
                Work product created specifically for clients remains the property of the client
                upon full payment, unless otherwise specified in a separate agreement.
              </p>

              <h2>5. Confidentiality</h2>
              <p>
                We treat all client information as confidential. We will not disclose your business
                information to third parties without your consent, except as required by law or as
                necessary to provide our services.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Tech Horizon Labs shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising from
                your use of our services or website.
              </p>
              <p>
                Our total liability for any claim arising from our services shall not exceed the
                fees paid by you for the specific service giving rise to the claim.
              </p>

              <h2>7. Warranties and Disclaimers</h2>
              <p>
                We provide our services "as is" and make no warranties, express or implied, regarding
                the suitability of our services for your specific needs. AI technology is evolving
                rapidly, and results may vary based on implementation and usage.
              </p>
              <p>
                We do not guarantee specific outcomes, including but not limited to time savings,
                cost reductions, or revenue increases. Case study results represent specific client
                situations and may not be typical.
              </p>

              <h2>8. Privacy and Data Protection</h2>
              <p>
                We handle all personal information in accordance with our{" "}
                <a href="/privacy" className="text-salmon-600 hover:underline">Privacy Policy</a> and
                the Australian Privacy Act 1988. By using our services, you consent to our data
                practices as described in our Privacy Policy.
              </p>

              <h2>9. Termination</h2>
              <p>
                Either party may terminate a consulting engagement with 14 days written notice.
                Upon termination, you must pay for all services rendered up to the termination date.
                We will return or destroy any confidential materials as requested.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the
                laws of Queensland, Australia. Any disputes shall be subject to the exclusive
                jurisdiction of the courts of Queensland.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will
                be effective immediately upon posting to this page. Your continued use of our
                services after changes are posted constitutes acceptance of the modified terms.
              </p>

              <h2>12. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:hello@techhorizonlabs.com" className="text-salmon-600 hover:underline">hello@techhorizonlabs.com</a></li>
                <li>Location: Sunshine Coast, Queensland, Australia</li>
                <li>ABN: 80 976 285 425</li>
              </ul>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
