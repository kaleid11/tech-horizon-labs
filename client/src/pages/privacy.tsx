import { Navbar, Footer, SkipLink } from "@/components/layout";
import { PageSEO } from "@/components/seo/page-seo";

export default function Privacy() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO
        title="Privacy Policy"
        description="Tech Horizon Labs privacy policy. Learn how we collect, use, and protect your personal information in compliance with the Australian Privacy Act 1988."
        canonical="https://techhorizonlabs.com/privacy"
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="pt-32 pb-12 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-300">Last updated: February 2026</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto prose prose-lg prose-aubergine">

              <h2>1. Introduction</h2>
              <p>
                Tech Horizon Labs ("we", "our", "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our services.
              </p>
              <p>
                We are bound by the Australian Privacy Principles contained in the Privacy Act 1988 (Cth)
                and comply with all applicable privacy laws.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>Information you provide to us:</h3>
              <ul>
                <li>Name and contact information (email, phone number)</li>
                <li>Company name and business details</li>
                <li>Messages and enquiries submitted through our contact forms</li>
                <li>Newsletter subscription preferences</li>
              </ul>

              <h3>Information collected automatically:</h3>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and provide customer support</li>
                <li>Send newsletters and marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your
                personal information against unauthorised access, alteration, disclosure, or destruction.
                This includes:
              </p>
              <ul>
                <li>Encrypted data transmission (SSL/TLS)</li>
                <li>Secure server infrastructure</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication measures</li>
              </ul>

              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfil the
                purposes for which it was collected, or as required by law. Contact form submissions
                and newsletter subscriptions are retained until you request deletion.
              </p>

              <h2>6. Your Rights</h2>
              <p>Under Australian privacy law, you have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
              </ul>

              <h2>7. Third-Party Services</h2>
              <p>
                We may use third-party services for analytics, email delivery, and hosting.
                These services have their own privacy policies and may collect information
                as described in their respective policies.
              </p>

              <h2>8. Cookies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your
                experience. You can control cookie preferences through your browser settings.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the
                "Last updated" date.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices,
                please contact us:
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
