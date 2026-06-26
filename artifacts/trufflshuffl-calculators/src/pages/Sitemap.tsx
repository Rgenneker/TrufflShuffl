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
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            {t.sitemap}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            HTML <span className="text-primary">Sitemap</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Complete directory of all 48 calculator pages on TrufflShuffl.com — available in 9 languages.
            Click any <span className="font-mono text-xs bg-background border border-border rounded px-1 py-0.5">flag · code</span> tag
            to jump directly to that page in your preferred language.
          </p>
        </div>

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
          <PageRow href="/" label="Home — TrufflShuffl Calculator Suite" desc="Landing page with 48 calculators across 23 categories, live world clock, and language navigation." />
          <PageRow href="/about" label={t.about} desc="Who we are, our mission, and everything about the TrufflShuffl Calculator Suite." />
          <PageRow href="/contact" label={t.contact} desc="Get in touch with the TrufflShuffl team." />
        </Section>

        {/* ── FINANCIAL CALCULATORS ─────────────────────────────────── */}
        <Section title="Financial" accent="bg-yellow-500/5 text-yellow-400">
          <PageRow href="/investment"   label={t.calcInvestmentTitle}   desc="Compound vs simple interest, growth projections, multiple investment types and 47 currencies." />
          <PageRow href="/loan"         label={t.calcLoanTitle}         desc="Monthly repayments, total interest, and the impact of extra payments on any loan." />
          <PageRow href="/mortgage"     label={t.calcMortgageTitle}     desc="Bond repayments, transfer duty, attorney fees and LTV ratio." />
          <PageRow href="/bond"         label={t.calcBondTitle}         desc="Bond price, yield to maturity, duration and coupon schedule." />
          <PageRow href="/amortization" label={t.calcAmortizationTitle} desc="Full payment schedule showing principal/interest split month-by-month." />
          <PageRow href="/credit-card"  label="Credit Card Calculator"  desc="Payoff timeline, total interest cost, and minimum payment impact analysis." />
          <PageRow href="/debt"         label="Debt Payoff Calculator"   desc="Snowball vs avalanche comparison, total interest, and payoff date across multiple debts." />
          <PageRow href="/net-worth"    label="Net Worth & FIRE Calculator" desc="Net worth snapshot and financial independence number calculator." />
        </Section>

        {/* ── INVESTING ─────────────────────────────────────────────── */}
        <Section title="Investing" accent="bg-orange-500/5 text-orange-400">
          <PageRow href="/investing"  label="Investing Calculator"   desc="Dollar-cost averaging, CAGR, and dividend income projections." />
          <PageRow href="/retirement" label={t.calcRetirementTitle}  desc="Retirement savings projections, real value adjusted for inflation, monthly income estimate." />
          <PageRow href="/roi"        label={t.calcROITitle}         desc="Return on investment, annualised ROI, profit/loss, break-even analysis." />
          <PageRow href="/savings"    label={t.calcSavingsTitle}     desc="Future value of savings with regular contributions and compound interest." />
        </Section>

        {/* ── BUSINESS & TAX ────────────────────────────────────────── */}
        <Section title="Business & Tax" accent="bg-amber-500/5 text-amber-400">
          <PageRow href="/vat"           label={t.calcVATTitle}           desc="Add VAT, remove VAT, split VAT — any rate worldwide. Default 15% (South Africa)." />
          <PageRow href="/gst"           label="GST Calculator"           desc="Add/remove/split GST for Australia (10%), NZ (15%), Canada (5%), Singapore (9%), India and custom rates." />
          <PageRow href="/excise"        label="Excise Duty Calculator"   desc="Fuel, tobacco, beer, spirits and wine excise for Australia, UK and US — 2026 rates." />
          <PageRow href="/customs"       label="Customs & Tariff Calculator" desc="Import duties for US, EU, UK, Australia and Canada — includes 2026 US reciprocal tariffs, Section 232, and FTA rates." />
          <PageRow href="/percentage"    label={t.calcPercentageTitle}    desc="What is X% of Y, X is what % of Y, percentage change, and increase/decrease calculations." />
          <PageRow href="/salary"        label={t.calcSalaryTitle}        desc="Annual, monthly, weekly, daily and hourly salary breakdowns with tax estimates." />
          <PageRow href="/business-tools" label="Business Tools"          desc="Profit margin, break-even point, and sales commission calculator." />
        </Section>

        {/* ── FUEL & TRAVEL ─────────────────────────────────────────── */}
        <Section title={t.catFuelTravel} accent="bg-blue-500/5 text-blue-400">
          <PageRow href="/fuel"   label={t.calcFuelTitle} desc="Petrol, diesel and gas cost calculator with trip distance, fuel efficiency and time estimates." />
          <PageRow href="/travel" label="Travel Calculator" desc="Trip budget, jet lag, baggage fees and foreign currency conversion." />
        </Section>

        {/* ── AUTOMOTIVE ────────────────────────────────────────────── */}
        <Section title="Automotive" accent="bg-slate-500/5 text-slate-400">
          <PageRow href="/automotive" label="Automotive Calculator" desc="Tyre size comparison, vehicle depreciation, and braking distance." />
        </Section>

        {/* ── ELECTRIC VEHICLES ─────────────────────────────────────── */}
        <Section title="Electric Vehicles" accent="bg-emerald-500/5 text-emerald-400">
          <PageRow href="/ev" label="EV Calculator" desc="EV charging costs, cost per km, and ICE vs EV running cost comparison." />
        </Section>

        {/* ── SOLAR & ENERGY ────────────────────────────────────────── */}
        <Section title="Solar & Energy" accent="bg-yellow-500/5 text-yellow-300">
          <PageRow href="/solar" label="Solar Calculator" desc="Solar panel sizing, battery backup runtime, payback period and ROI." />
        </Section>

        {/* ── HOME ELECTRICITY ──────────────────────────────────────── */}
        <Section title="Home Electricity" accent="bg-cyan-500/5 text-cyan-400">
          <PageRow href="/electricity" label="Electricity Calculator" desc="Appliance running costs, UPS battery runtime, and geyser electricity usage." />
        </Section>

        {/* ── WATER ─────────────────────────────────────────────────── */}
        <Section title="Water" accent="bg-sky-500/5 text-sky-400">
          <PageRow href="/water" label="Water Calculator" desc="Household water usage, rainwater harvesting, and tank sizing." />
        </Section>

        {/* ── HOME & GARDEN ─────────────────────────────────────────── */}
        <Section title={t.catHomeGarden} accent="bg-teal-500/5 text-teal-400">
          <PageRow href="/pool"       label={t.calcPoolTitle}       desc="Pool volume in litres or gallons based on shape and dimensions, fill time, chemical dosing." />
          <PageRow href="/paving"     label={t.calcPavingTitle}     desc="Number of pavers needed for any area — choose from standard paver sizes." />
          <PageRow href="/renovation" label={t.calcRenovationTitle} desc="Cost estimator for home renovations with 15+ project categories and quality grades." />
          <PageRow href="/paint"      label={t.calcPaintTitle}      desc="Litres or gallons of paint needed for any room, including doors and windows." />
        </Section>

        {/* ── CONSTRUCTION ──────────────────────────────────────────── */}
        <Section title="Construction" accent="bg-stone-500/5 text-stone-400">
          <PageRow href="/construction" label="Construction Calculator" desc="Concrete volume, brick quantities, excavation volume, and rebar weight." />
        </Section>

        {/* ── HEALTH ────────────────────────────────────────────────── */}
        <Section title={t.catHealth} accent="bg-green-500/5 text-green-400">
          <PageRow href="/calories"    label={t.calcCalorieTitle}   desc="Daily calorie needs (TDEE) and macro breakdown based on your goals." />
          <PageRow href="/bmi"         label={t.calcBMITitle}       desc="Body Mass Index with WHO category ranges and healthy weight range." />
          <PageRow href="/body-health" label="Body Health Calculator" desc="Body fat percentage, waist-to-hip ratio, VO2 max estimate and ideal weight." />
        </Section>

        {/* ── FITNESS ───────────────────────────────────────────────── */}
        <Section title="Fitness" accent="bg-lime-500/5 text-lime-400">
          <PageRow href="/fitness" label="Fitness Calculator" desc="One-rep max, training zones, run pace, and calories burned by activity." />
        </Section>

        {/* ── DATES & TIME ──────────────────────────────────────────── */}
        <Section title="Dates & Time" accent="bg-violet-500/5 text-violet-400">
          <PageRow href="/age"        label={t.calcAgeTitle}       desc="Age in years, months and days; time to next birthday; date differences." />
          <PageRow href="/time-tools" label="Time Tools Calculator" desc="Time zone converter, world clock, countdown timer, and date arithmetic." />
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

        {/* ── PETS ──────────────────────────────────────────────────── */}
        <Section title="Pets" accent="bg-amber-500/5 text-amber-300">
          <PageRow href="/pets" label="Pet Calculator" desc="Dog/cat food portions, vet age equivalent, and weight-based medication dosing." />
        </Section>

        {/* ── FOOD ──────────────────────────────────────────────────── */}
        <Section title="Food & Nutrition" accent="bg-red-500/5 text-red-400">
          <PageRow href="/food" label="Food Calculator" desc="Recipe scaling, nutritional lookup, and cooking unit conversions." />
        </Section>

        {/* ── EDUCATION ─────────────────────────────────────────────── */}
        <Section title="Education" accent="bg-indigo-500/5 text-indigo-400">
          <PageRow href="/education" label="Education Calculator" desc="GPA converter, grade percentage, study hours planner, and student loan calculator." />
        </Section>

        {/* ── ENGINEERING ───────────────────────────────────────────── */}
        <Section title="Engineering" accent="bg-zinc-500/5 text-zinc-400">
          <PageRow href="/engineering" label="Engineering Calculator" desc="Ohm's law, beam load, pipe flow, and stress/strain calculations." />
        </Section>

        {/* ── ENVIRONMENT ───────────────────────────────────────────── */}
        <Section title="Environment" accent="bg-green-500/5 text-green-300">
          <PageRow href="/environment" label="Environment Calculator" desc="Carbon footprint, water footprint, and recycling impact calculations." />
        </Section>

        {/* ── LIFESTYLE ─────────────────────────────────────────────── */}
        <Section title="Lifestyle" accent="bg-purple-500/5 text-purple-400">
          <PageRow href="/lifestyle" label="Lifestyle Calculator" desc="Sleep calculator, hydration needs, and caffeine half-life tracker." />
        </Section>

        {/* ── TECHNOLOGY ────────────────────────────────────────────── */}
        <Section title="Technology" accent="bg-cyan-500/5 text-cyan-300">
          <PageRow href="/tech" label="Tech Calculator" desc="SSD TBW lifespan, RAM requirements, network speed, and binary/hex conversion." />
        </Section>

        {/* ── LEGAL & INFORMATION ───────────────────────────────────── */}
        <Section title="Legal & Information" accent="bg-muted/40 text-muted-foreground">
          <PageRow href="/privacy" label={t.privacy} desc="How TrufflShuffl handles (or rather, doesn't handle) your data." />
          <PageRow href="/terms"   label={t.terms}   desc="Terms and conditions of using TrufflShuffl.com and its calculator tools." />
        </Section>

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
