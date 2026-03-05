import { Navbar, Footer, SkipLink } from "@/components/layout";
import { PageSEO } from "@/components/seo/page-seo";

export default function Privacy() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO
        title="Privacy Policy"
        description="Tech Horizon Labs privacy policy. How we collect, use, and protect your personal information under the Australian Privacy Act 1988."
        canonical="https://techhorizonlabs.com/privacy"
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="pt-32 pb-12 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-300">Last updated: March 2026</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto prose prose-lg prose-aubergine">

              <h2>1. Introduction</h2>
              <p>
                Tech Horizon Labs ("we", "our", "us") is an AI consulting business based on the
                Sunshine Coast, Queensland, Australia (ABN: 80 976 285 425). We are committed to
                protecting your privacy and handling your personal information responsibly.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website at techhorizonlabs.com or use our services.
                We are bound by the Australian Privacy Principles contained in the{" "}
                <strong>Privacy Act 1988 (Cth)</strong> and comply with all applicable privacy laws.
              </p>

              <h2>2. Information We Collect</h2>

              <h3>Contact Form</h3>
              <p>When you submit our contact form, we collect:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Company name (optional)</li>
                <li>Message content</li>
              </ul>

              <h3>Newsletter Signup</h3>
              <p>When you subscribe to our newsletter, we collect:</p>
              <ul>
                <li>Email address</li>
              </ul>

              <h3>AI Readiness Audit Tool</h3>
              <p>When you complete our self-assessment tool, we collect:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Business name</li>
                <li>Assessment scores and answers</li>
              </ul>

              <h3>Analytics (with consent)</h3>
              <p>
                If you accept analytics cookies, Google Analytics (GA4) collects anonymised
                usage data including pages visited, session duration, device type, and approximate
                location. This data is aggregated and cannot identify you personally.
              </p>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li><strong>Respond to enquiries</strong> — contact form submissions are emailed to our team for follow-up</li>
                <li><strong>Deliver newsletters</strong> — your email is passed to our newsletter platform for distribution</li>
                <li><strong>Provide audit results</strong> — assessment data is used to generate personalised recommendations emailed to you</li>
                <li><strong>Analyse website usage</strong> — anonymised analytics help us improve site content and performance (consent-required)</li>
                <li><strong>Manage leads</strong> — contact details are synced to our CRM for relationship management</li>
                <li><strong>Comply with legal obligations</strong> — as required by Australian law</li>
              </ul>

              <h2>4. Third-Party Services</h2>
              <p>
                We use the following third-party services to operate our business. Each service
                receives only the minimum data necessary for its function.
              </p>

              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Purpose</th>
                      <th>Data Shared</th>
                      <th>Jurisdiction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Resend</strong></td>
                      <td>Transactional email delivery</td>
                      <td>Email address, name, message content</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td><strong>Google Analytics (GA4)</strong></td>
                      <td>Website analytics (consent-required)</td>
                      <td>Anonymised browsing data, IP anonymised</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td><strong>Klipy</strong></td>
                      <td>CRM — lead management</td>
                      <td>Name, email, company, submission source</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td><strong>Beehiiv</strong></td>
                      <td>Newsletter platform</td>
                      <td>Email address</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td><strong>Replit</strong></td>
                      <td>Application hosting</td>
                      <td>All submitted form data (stored in database)</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td><strong>Anthropic (Claude)</strong></td>
                      <td>AI processing for consulting</td>
                      <td>Client data only with explicit consent</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td><strong>OpenRouter</strong></td>
                      <td>AI model testing and comparison</td>
                      <td>Client data only with explicit consent</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td><strong>Google Workspace</strong></td>
                      <td>Internal business operations</td>
                      <td>Business correspondence</td>
                      <td>Australia (data region setting)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>5. Cookies & Tracking</h2>
              <p>
                Our website uses a cookie consent system. Only essential cookies are set by default.
                Analytics cookies require your explicit consent.
              </p>

              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Type</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                      <th>Consent Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>thl-cookie-consent</code></td>
                      <td>Essential / Functional</td>
                      <td>Stores your cookie preference</td>
                      <td>Persistent (localStorage)</td>
                      <td>No — essential</td>
                    </tr>
                    <tr>
                      <td><code>_ga</code></td>
                      <td>Analytics</td>
                      <td>Google Analytics visitor identifier</td>
                      <td>2 years</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td><code>_ga_TN1HR73SJH</code></td>
                      <td>Analytics</td>
                      <td>Google Analytics session state</td>
                      <td>2 years</td>
                      <td>Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>6. Data Retention</h2>
              <ul>
                <li><strong>Contact form submissions</strong> — retained until you request deletion</li>
                <li><strong>Newsletter subscriptions</strong> — retained until you unsubscribe</li>
                <li><strong>Audit tool submissions</strong> — retained for 2 years, then deleted</li>
                <li><strong>Analytics data</strong> — 14 months (GA4 default retention period)</li>
                <li><strong>CRM records</strong> — retained until you request deletion or the business relationship ends</li>
              </ul>

              <h2>7. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your
                personal information:
              </p>
              <ul>
                <li>All data transmitted via SSL/TLS encryption</li>
                <li>Database stored with encryption at rest on Replit infrastructure</li>
                <li>Access controls limiting data access to authorised personnel</li>
                <li>Admin endpoints protected by API key authentication</li>
                <li>Regular review of security practices and access logs</li>
              </ul>

              <h2>8. Your Rights</h2>
              <p>Under the Australian Privacy Act 1988, you have the right to:</p>
              <ul>
                <li><strong>Access</strong> — request a copy of the personal information we hold about you</li>
                <li><strong>Correction</strong> — request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion</strong> — request deletion of your personal information</li>
                <li><strong>Opt-out</strong> — unsubscribe from marketing communications at any time</li>
                <li><strong>Complain</strong> — lodge a complaint with the{" "}
                  <a
                    href="https://www.oaic.gov.au/privacy/privacy-complaints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-salmon-600 hover:underline"
                  >
                    Office of the Australian Information Commissioner (OAIC)
                  </a>
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:hello@techhorizonlabs.com" className="text-salmon-600 hover:underline">
                  hello@techhorizonlabs.com
                </a>.
                We will respond within 30 days.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Some of our third-party service providers are based in the United States (see
                Section 4). When your data is transferred outside Australia, we ensure that:
              </p>
              <ul>
                <li>The service provider has strong privacy practices and appropriate security measures</li>
                <li>Data is transferred only for the specific purpose described</li>
                <li>We maintain contractual protections where available</li>
                <li>Australian-hosted alternatives are used where possible (e.g., Google Workspace data region)</li>
              </ul>

              <h2>10. Notifiable Data Breaches</h2>
              <p>
                In the event of a data breach that is likely to result in serious harm, we will:
              </p>
              <ul>
                <li>Notify affected individuals as soon as practicable</li>
                <li>Report the breach to the OAIC within 30 days as required by the{" "}
                  <strong>Notifiable Data Breaches (NDB) scheme</strong>
                </li>
                <li>Take immediate steps to contain and remediate the breach</li>
                <li>Document the breach and our response for compliance records</li>
              </ul>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on
                this page with an updated "Last updated" date. We encourage you to review this
                policy periodically. Material changes affecting how we process your data will
                be communicated via email where possible.
              </p>

              <h2>12. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, our data practices, or wish
                to exercise your rights, please contact us:
              </p>
              <ul>
                <li>Email:{" "}
                  <a href="mailto:hello@techhorizonlabs.com" className="text-salmon-600 hover:underline">
                    hello@techhorizonlabs.com
                  </a>
                </li>
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
