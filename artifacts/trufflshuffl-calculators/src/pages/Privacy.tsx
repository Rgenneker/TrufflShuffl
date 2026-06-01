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

export default function PrivacyPage() {
  const updated = "1 June 2026";
  const sections = [
    "Information We Collect", "How We Use Information", "Google AdSense & Cookies",
    "Analytics", "Data Storage & Security", "Children's Privacy",
    "Your Rights", "Changes to This Policy", "Contact Us",
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
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-20 bg-card border border-border rounded-xl p-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Contents</p>
              {sections.map((s, i) => (
                <a key={s} href={`#p${i + 1}`} className="block text-xs text-muted-foreground hover:text-primary transition-colors py-0.5">
                  {i + 1}. {s}
                </a>
              ))}
            </div>
          </aside>

          <div className="flex-1 space-y-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              WordShuffl Trading ("we", "us", "our") operates TrufflShuffl.com. This Privacy Policy explains how we handle information when you use our calculator suite. We are committed to protecting your privacy and being transparent about our practices.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-sm text-green-300 font-semibold">Short version</p>
              <p className="text-sm text-green-200 mt-1">All calculator inputs and results stay in your browser. We do not collect, store, or transmit any values you enter into our calculators.</p>
            </div>

            <Section id="p1" title="1. Information We Collect">
              <p><strong className="text-foreground">Calculator data:</strong> None. All calculator inputs and results are processed locally in your browser using JavaScript. No values you enter (amounts, measurements, personal details) are transmitted to our servers or stored anywhere outside your device.</p>
              <p><strong className="text-foreground">Automatically collected data:</strong> Like most websites, our hosting infrastructure may automatically log standard server access data, including your IP address (truncated), browser type, referring URL, pages visited, and timestamps. This data is used solely for security monitoring and aggregate traffic analysis.</p>
              <p><strong className="text-foreground">Contact form:</strong> If you use our contact form, it opens your email client with pre-filled content. No data passes through our servers via the form itself.</p>
            </Section>

            <Section id="p2" title="2. How We Use Information">
              <p>We use automatically collected technical data to:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Monitor the security and performance of the Site</li>
                <li>Understand aggregate usage patterns to improve our tools</li>
                <li>Detect and prevent abuse or unauthorised access</li>
              </ul>
              <p>We do not sell, rent, or share your data with third parties for marketing purposes.</p>
            </Section>

            <Section id="p3" title="3. Google AdSense &amp; Cookies">
              <p>TrufflShuffl.com uses Google AdSense to display advertisements. Google AdSense uses cookies and similar tracking technologies to serve ads based on your prior visits to our Site and other sites on the internet.</p>
              <p><strong className="text-foreground">Cookies used by Google AdSense may include:</strong></p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><code className="text-xs bg-card px-1 rounded">__ga</code>, <code className="text-xs bg-card px-1 rounded">__gads</code> — Google advertising and analytics cookies</li>
                <li><code className="text-xs bg-card px-1 rounded">IDE</code> — DoubleClick cookie used by Google for targeting advertisements</li>
                <li><code className="text-xs bg-card px-1 rounded">DSID</code>, <code className="text-xs bg-card px-1 rounded">FLC</code> — frequency capping and ad personalisation</li>
              </ul>
              <p>You can opt out of personalised advertising at any time:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a></li>
                <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance opt-out</a></li>
                <li>Your browser's cookie settings</li>
              </ul>
              <p>We also store a single <code className="text-xs bg-card px-1 rounded">theme</code> key in your browser's <code className="text-xs bg-card px-1 rounded">localStorage</code> to remember your light/dark mode preference. This data never leaves your device.</p>
            </Section>

            <Section id="p4" title="4. Analytics">
              <p>We may use Google Analytics to understand aggregate usage of the Site. If enabled, Google Analytics collects anonymised data about pages visited, session duration, and device type. IP addresses are anonymised. You can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics opt-out browser add-on</a>.</p>
            </Section>

            <Section id="p5" title="5. Data Storage &amp; Security">
              <p>We implement reasonable technical measures to protect the Site from unauthorised access. Because calculator data is processed exclusively client-side and no personal financial data is transmitted to us, the risk of a data breach affecting your calculator inputs is zero by design.</p>
              <p>We cannot guarantee absolute security of data transmitted over the internet. Use the Site at your own risk in accordance with our Terms of Service.</p>
            </Section>

            <Section id="p6" title="6. Children's Privacy">
              <p>TrufflShuffl.com is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.</p>
            </Section>

            <Section id="p7" title="7. Your Rights">
              <p>Depending on your jurisdiction, you may have rights under applicable data protection law (including POPIA in South Africa and GDPR in the EU), including the right to access, correct, or delete personal data held about you.</p>
              <p>Because we collect minimal identifiable data, most requests can be addressed simply by clearing your browser's cookies and localStorage. For other requests, contact us at <a href="mailto:hello@trufflshuffl.com" className="text-primary hover:underline">hello@trufflshuffl.com</a>.</p>
            </Section>

            <Section id="p8" title="8. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the Site after any changes constitutes acceptance of the revised Policy.</p>
            </Section>

            <Section id="p9" title="9. Contact Us">
              <p>For privacy-related questions or requests, contact us at <a href="mailto:hello@trufflshuffl.com" className="text-primary hover:underline">hello@trufflshuffl.com</a> or visit our <Link href="/contact"><span className="text-primary hover:underline cursor-pointer">Contact page</span></Link>.</p>
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
