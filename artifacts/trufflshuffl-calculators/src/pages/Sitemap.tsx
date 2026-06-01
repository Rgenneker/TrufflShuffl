import { Link } from "wouter";
import { ArrowLeft, Globe, ExternalLink } from "lucide-react";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useLang } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/i18n";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function langUrl(langCode: string, path: string) {
  return `${BASE}/${langCode}${path === "/" ? "" : path}`;
}

function LangStrip({ path }: { path: string }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {LANGUAGES.map(l => (
        <a
          key={l.code}
          href={langUrl(l.code, path)}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background border border-border text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
          title={l.labelEn}
        >
          <span>{l.flag}</span>
          <span className="font-mono uppercase">{l.code}</span>
        </a>
      ))}
    </div>
  );
}

interface PageRowProps {
  href: string;
  label: string;
  desc?: string;
}

function PageRow({ href, label, desc }: PageRowProps) {
  return (
    <div className="py-3 border-b border-border/40 last:border-0">
      <div className="flex items-start gap-2">
        <ExternalLink className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
        <div className="flex-1 min-w-0">
          <Link href={href} className="font-medium text-foreground hover:text-primary transition-colors">
            {label}
          </Link>
          {desc && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>}
          <LangStrip path={href} />
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  accent: string;
  children: React.ReactNode;
}

function Section({ title, accent, children }: SectionProps) {
  return (
    <section className="bg-card border border-border rounded-xl overflow-hidden">
      <div className={`px-5 py-3 border-b border-border ${accent} flex items-center gap-2`}>
        <Globe className="w-4 h-4 opacity-70" />
        <h2 className="font-bold text-sm uppercase tracking-widest">{title}</h2>
      </div>
      <div className="px-5 divide-y divide-border/0">
        {children}
      </div>
    </section>
  );
}

export default function SitemapPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            {t.backToCalculators}
          </Link>
          <LanguageSelect />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        {/* Hero */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            {t.sitemap}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            HTML <span className="text-primary">Sitemap</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Complete directory of every page on TrufflShuffl.com — available in 9 languages.
            Click any <span className="font-mono text-xs bg-background border border-border rounded px-1 py-0.5">flag · code</span> tag
            to jump directly to that page in your preferred language.
          </p>
        </div>

        {/* Language reference */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available languages</p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(l => (
              <a
                key={l.code}
                href={langUrl(l.code, "/")}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background border border-border text-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                <span>{l.flag}</span>
                <span className="font-medium">{l.label}</span>
                {l.label !== l.labelEn && (
                  <span className="text-muted-foreground text-xs">({l.labelEn})</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* ── MAIN PAGES ────────────────────────────────────────────── */}
        <Section title="Main Pages" accent="bg-primary/5 text-primary">
          <PageRow
            href="/"
            label="Home — TrufflShuffl Calculator Suite"
            desc="Landing page with all 16 calculators, live world clock, and category navigation."
          />
          <PageRow
            href="/about"
            label={t.about}
            desc="Who we are, our mission, and everything about the TrufflShuffl Calculator Suite."
          />
          <PageRow
            href="/contact"
            label={t.contact}
            desc="Get in touch with the TrufflShuffl team."
          />
        </Section>

        {/* ── FINANCIAL CALCULATORS ─────────────────────────────────── */}
        <Section title={t.catFinancial} accent="bg-yellow-500/5 text-yellow-400">
          <PageRow href="/investment"   label={t.calcInvestmentTitle}   desc="Compound vs simple interest, growth projections, multiple investment types and 47 currencies." />
          <PageRow href="/loan"         label={t.calcLoanTitle}         desc="Monthly repayments, total interest, and the impact of extra payments on any loan." />
          <PageRow href="/mortgage"     label={t.calcMortgageTitle}     desc="Bond repayments, transfer duty, attorney fees and LTV ratio." />
          <PageRow href="/bond"         label={t.calcBondTitle}         desc="Bond price, yield to maturity, duration and coupon schedule." />
          <PageRow href="/amortization" label={t.calcAmortizationTitle} desc="Full payment schedule showing principal/interest split month-by-month." />
        </Section>

        {/* ── FUEL & TRAVEL ─────────────────────────────────────────── */}
        <Section title={t.catFuelTravel} accent="bg-blue-500/5 text-blue-400">
          <PageRow href="/fuel" label={t.calcFuelTitle} desc="Petrol, diesel and gas cost calculator with trip distance, fuel efficiency and time estimates." />
        </Section>

        {/* ── HOME & GARDEN ─────────────────────────────────────────── */}
        <Section title={t.catHomeGarden} accent="bg-teal-500/5 text-teal-400">
          <PageRow href="/pool"       label={t.calcPoolTitle}       desc="Pool volume in litres or gallons based on shape and dimensions." />
          <PageRow href="/paving"     label={t.calcPavingTitle}     desc="Number of pavers needed for any area — choose from standard paver sizes." />
          <PageRow href="/renovation" label={t.calcRenovationTitle} desc="Cost estimator for home renovations with 20+ project categories." />
          <PageRow href="/paint"      label={t.calcPaintTitle}      desc="Litres or gallons of paint needed for any room, including doors and windows." />
        </Section>

        {/* ── HEALTH ────────────────────────────────────────────────── */}
        <Section title={t.catHealth} accent="bg-green-500/5 text-green-400">
          <PageRow href="/calories" label={t.calcCalorieTitle} desc="Daily calorie needs (TDEE) and macro breakdown based on your goals." />
          <PageRow href="/bmi"      label={t.calcBMITitle}     desc="Body Mass Index calculator with WHO category ranges and healthy weight range." />
        </Section>

        {/* ── FASHION ───────────────────────────────────────────────── */}
        <Section title={t.catFashion} accent="bg-pink-500/5 text-pink-400">
          <PageRow href="/clothing-size" label={t.calcClothingTitle}  desc="Convert clothing sizes across US, UK, EU, AU/NZ and Asian sizing standards." />
          <PageRow href="/shoe-size"     label={t.calcShoeTitle}      desc="Shoe size converter covering US, UK, EU and CM measurements for men, women and kids." />
          <PageRow href="/belt-ring"     label={t.calcBeltRingTitle}  desc="Belt length and ring size guide — circumference to ring size across US, UK, EU standards." />
        </Section>

        {/* ── UNIT CONVERSIONS ──────────────────────────────────────── */}
        <Section title={t.catUnitConversions} accent="bg-violet-500/5 text-violet-400">
          <PageRow href="/units" label={t.calcUnitTitle} desc="12 conversion categories: length, weight, temperature, volume, area, speed, time, data, pressure, energy, power and fuel economy." />
        </Section>

        {/* ── LEGAL & INFORMATION ───────────────────────────────────── */}
        <Section title="Legal & Information" accent="bg-muted/40 text-muted-foreground">
          <PageRow href="/privacy" label={t.privacy} desc="How TrufflShuffl handles (or rather, doesn't handle) your data." />
          <PageRow href="/terms"   label={t.terms}   desc="Terms and conditions of using TrufflShuffl.com and its calculator tools." />
          <PageRow
            href="/terms"
            label="Legal Notice"
            desc="TrufflShuffl® is a registered trademark. All intellectual property rights owned in South Africa by WordShuffl Trading. All calculators are provided for educational purposes only."
          />
        </Section>

        {/* Footer note */}
        <div className="border-t border-border pt-6 text-center space-y-1.5">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">TrufflShuffl®</strong> {t.footerTrademark}
          </p>
          <p className="text-xs text-muted-foreground">{t.footerDisclaimer}</p>
          <p className="text-xs text-muted-foreground">{t.footerCopyright}</p>
        </div>
      </main>
    </div>
  );
}
