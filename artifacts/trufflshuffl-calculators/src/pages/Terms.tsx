import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-3 scroll-mt-20">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  const updated = "1 June 2026";
  const sections = [
    "Acceptance of Terms", "Use of the Service", "Intellectual Property",
    "No Professional Advice", "Disclaimer of Warranties", "Limitation of Liability",
    "Third-Party Advertising", "Links to Third-Party Sites", "Changes to Terms",
    "Governing Law", "Contact",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Calculators
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="space-y-2 mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Terms &amp; Conditions</h1>
          <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        </div>

        <div className="flex gap-8">
          {/* TOC — hidden on mobile */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-20 bg-card border border-border rounded-xl p-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Contents</p>
              {sections.map((s, i) => (
                <a key={s} href={`#s${i + 1}`} className="block text-xs text-muted-foreground hover:text-primary transition-colors py-0.5">
                  {i + 1}. {s}
                </a>
              ))}
            </div>
          </aside>

          <div className="flex-1 space-y-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please read these Terms and Conditions carefully before using TrufflShuffl.com (the "Site") operated by WordShuffl Trading ("we", "us", or "our"). By accessing or using the Site, you agree to be bound by these Terms.
            </p>

            <Section id="s1" title="1. Acceptance of Terms">
              <p>By accessing TrufflShuffl.com you confirm that you are at least 13 years of age and that you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, please discontinue use of the Site immediately.</p>
            </Section>

            <Section id="s2" title="2. Use of the Service">
              <p>You may use the calculators and tools on TrufflShuffl.com for personal, educational, and non-commercial purposes only. You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Copy, scrape, republish, or redistribute any calculator, tool, or content without written permission</li>
                <li>Use the Site in any manner that could damage, disable, overburden, or impair it</li>
                <li>Attempt to gain unauthorised access to any part of the Site or its infrastructure</li>
                <li>Use automated scripts, bots, or scrapers to access calculator outputs</li>
                <li>Frame or embed any calculator or page on another website without prior written consent</li>
              </ul>
            </Section>

            <Section id="s3" title="3. Intellectual Property">
              <p>All content on TrufflShuffl.com — including but not limited to calculator logic, code, design, text, graphics, and the TrufflShuffl® name and logo — is the exclusive intellectual property of WordShuffl Trading and is protected by South African and international copyright and trademark law.</p>
              <p>The TrufflShuffl® trademark is registered in South Africa. Unauthorised use of the mark or any confusingly similar mark is prohibited.</p>
            </Section>

            <Section id="s4" title="4. No Professional Advice">
              <p>All calculators and content on TrufflShuffl.com are provided for <strong className="text-foreground">educational and informational purposes only</strong> and do not constitute financial, legal, medical, tax, or any other professional advice.</p>
              <p>Calculator results are based on the inputs provided and standard mathematical formulae. They do not account for your specific financial situation, jurisdiction-specific regulations, or real-time market conditions. Always consult a qualified professional before making financial, health, or legal decisions.</p>
            </Section>

            <Section id="s5" title="5. Disclaimer of Warranties">
              <p>The Site and all calculators are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p>We do not warrant that the Site will be uninterrupted, error-free, or that calculator results will be accurate, complete, or current. Interest rates, tax brackets, and regulatory figures embedded in calculators are indicative and may not reflect current rates.</p>
            </Section>

            <Section id="s6" title="6. Limitation of Liability">
              <p>To the maximum extent permitted by applicable law, WordShuffl Trading and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site or its calculators — even if advised of the possibility of such damages.</p>
              <p>Our total liability to you for any claim arising from use of the Site shall not exceed ZAR 500 (five hundred South African rand).</p>
            </Section>

            <Section id="s7" title="7. Third-Party Advertising">
              <p>TrufflShuffl.com displays advertisements served by Google AdSense and potentially other third-party networks. These advertisers may use cookies and similar tracking technologies to serve personalised ads based on your browsing behaviour.</p>
              <p>We do not control the content of third-party advertisements and are not responsible for any products, services, or content advertised. For information about how Google uses your data, please review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Privacy Policy</a>.</p>
              <p>You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutads.info</a>.</p>
            </Section>

            <Section id="s8" title="8. Links to Third-Party Sites">
              <p>The Site may contain links to third-party websites. These links are provided for convenience only. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the privacy policy of every site you visit.</p>
            </Section>

            <Section id="s9" title="9. Changes to Terms">
              <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the updated Terms. We recommend checking this page periodically.</p>
            </Section>

            <Section id="s10" title="10. Governing Law">
              <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of South Africa.</p>
            </Section>

            <Section id="s11" title="11. Contact">
              <p>If you have questions about these Terms, please contact us at <a href="mailto:hello@trufflshuffl.com" className="text-primary hover:underline">hello@trufflshuffl.com</a> or visit our <Link href="/contact"><span className="text-primary hover:underline cursor-pointer">Contact page</span></Link>.</p>
            </Section>

            <footer className="border-t border-border pt-6 text-center space-y-1">
              <p className="text-xs text-muted-foreground">© 2026 TrufflShuffl.com — WordShuffl Trading. ALL RIGHTS RESERVED</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
