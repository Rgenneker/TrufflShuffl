import { Link } from "wouter";
import { Calculator, BookOpen, Globe, Shield, Mail, ArrowLeft } from "lucide-react";

export default function AboutPage() {
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

      <main className="container mx-auto px-4 py-14 max-w-3xl space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">About TrufflShuffl Calculators</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Free, private, professional-grade calculators built for curious minds — from Cape Town to Casablanca, London to Lagos.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            TrufflShuffl® is a South African educational brand owned by <strong className="text-foreground">WordShuffl Trading</strong>, a registered business dedicated to making knowledge accessible, practical and enjoyable. The TrufflShuffl Calculator Suite extends that mission into the world of personal finance, home improvement, health and everyday unit conversions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe that financial literacy and practical numeracy should not be gated behind expensive software or confusing spreadsheets. Every calculator on this platform is completely free to use, requires no registration, and runs entirely in your browser — your data never leaves your device.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: BookOpen,
              title: "Educational Mission",
              desc: "Every calculator comes with plain-language explanations, step-by-step instructions, and real-world context so you understand not just the answer, but why it matters.",
            },
            {
              icon: Shield,
              title: "100% Private",
              desc: "All calculations happen locally in your browser. We collect no personal data, store no financial information, and require no account to use any tool.",
            },
            {
              icon: Globe,
              title: "Global Coverage",
              desc: "Support for 47 world currencies and internationally recognised sizing standards, making our tools useful whether you're in Johannesburg, New York or Singapore.",
            },
            {
              icon: Calculator,
              title: "16 Calculators",
              desc: "From compound interest and mortgage bonds to clothing sizes, ring sizing and 12-category unit conversion — the most comprehensive free calculator suite available.",
            },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-card border border-border rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Calculators</h2>
          <p className="text-muted-foreground leading-relaxed">
            The suite covers six major categories: <strong className="text-foreground">Financial</strong> (investment, loan, mortgage, bond, amortization), <strong className="text-foreground">Fuel &amp; Travel</strong> (trip cost and fuel efficiency), <strong className="text-foreground">Home &amp; Garden</strong> (pool volume, paving, renovation, paint), <strong className="text-foreground">Health</strong> (calorie/TDEE and BMI), <strong className="text-foreground">Fashion</strong> (clothing size, shoe size, belt and ring sizing), and <strong className="text-foreground">Unit Conversions</strong> (12 categories with hundreds of unit pairs).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The financial calculators support <strong className="text-foreground">47 world currencies</strong> — from the South African Rand and US Dollar to the Nigerian Naira, Indian Rupee, and beyond. All calculations are performed client-side using internationally accepted financial formulae.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Important Disclaimer</h2>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
            <p className="text-sm text-yellow-200 leading-relaxed">
              All calculators on TrufflShuffl.com are provided for <strong>educational and informational purposes only</strong>. Results should not be construed as financial, legal, medical, or professional advice. Always consult a qualified professional before making financial decisions. TrufflShuffl and WordShuffl Trading accept no liability for decisions made based on calculator outputs.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Contact &amp; Legal</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact">
              <button className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">
                <Mail className="w-4 h-4" /> Contact Us
              </button>
            </Link>
            <Link href="/terms">
              <button className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms &amp; Conditions
              </button>
            </Link>
            <Link href="/privacy">
              <button className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
            </Link>
          </div>
        </section>

        <footer className="border-t border-border pt-6 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">TrufflShuffl®</strong> is a registered trademark. All intellectual property rights owned in South Africa by WordShuffl Trading.
          </p>
          <p className="text-xs text-muted-foreground">© 2026 TrufflShuffl.com. ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
}
