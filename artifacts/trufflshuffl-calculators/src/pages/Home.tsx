import { Link } from "wouter";
import { WorldClock } from "@/components/WorldClock";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useLang } from "@/context/LanguageContext";
import {
  TrendingUp, DollarSign, Home, Droplets, Zap, Heart, Calculator,
  Fuel, Hammer, PaintBucket, Layers, Activity, BarChart2,
  Ruler, Shirt, ArrowLeftRight
} from "lucide-react";

const CATEGORY_META: Record<string, { color: string; badge: string }> = {
  Financial:           { color: "text-yellow-400",  badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  "Fuel & Travel":     { color: "text-blue-400",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "Home & Garden":     { color: "text-teal-400",    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  Health:              { color: "text-green-400",   badge: "bg-green-500/10 text-green-400 border-green-500/20" },
  Fashion:             { color: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  "Unit Conversions":  { color: "text-violet-400",  badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
};

export default function HomePage() {
  const { t } = useLang();

  const CALCULATORS = [
    // Financial
    { href: "/investment",    icon: TrendingUp,    title: t.calcInvestmentTitle,   desc: t.calcInvestmentDesc,   category: "Financial" },
    { href: "/loan",          icon: DollarSign,    title: t.calcLoanTitle,         desc: t.calcLoanDesc,         category: "Financial" },
    { href: "/mortgage",      icon: Home,          title: t.calcMortgageTitle,     desc: t.calcMortgageDesc,     category: "Financial" },
    { href: "/bond",          icon: BarChart2,     title: t.calcBondTitle,         desc: t.calcBondDesc,         category: "Financial" },
    { href: "/amortization",  icon: Calculator,    title: t.calcAmortizationTitle, desc: t.calcAmortizationDesc, category: "Financial" },
    // Fuel & Travel
    { href: "/fuel",          icon: Fuel,          title: t.calcFuelTitle,         desc: t.calcFuelDesc,         category: "Fuel & Travel" },
    // Home & Garden
    { href: "/pool",          icon: Droplets,      title: t.calcPoolTitle,         desc: t.calcPoolDesc,         category: "Home & Garden" },
    { href: "/paving",        icon: Layers,        title: t.calcPavingTitle,       desc: t.calcPavingDesc,       category: "Home & Garden" },
    { href: "/renovation",    icon: Hammer,        title: t.calcRenovationTitle,   desc: t.calcRenovationDesc,   category: "Home & Garden" },
    { href: "/paint",         icon: PaintBucket,   title: t.calcPaintTitle,        desc: t.calcPaintDesc,        category: "Home & Garden" },
    // Health
    { href: "/calories",      icon: Zap,           title: t.calcCalorieTitle,      desc: t.calcCalorieDesc,      category: "Health" },
    { href: "/bmi",           icon: Activity,      title: t.calcBMITitle,          desc: t.calcBMIDesc,          category: "Health" },
    // Fashion
    { href: "/clothing-size", icon: Shirt,         title: t.calcClothingTitle,     desc: t.calcClothingDesc,     category: "Fashion" },
    { href: "/shoe-size",     icon: Ruler,         title: t.calcShoeTitle,         desc: t.calcShoeDesc,         category: "Fashion" },
    { href: "/belt-ring",     icon: Heart,         title: t.calcBeltRingTitle,     desc: t.calcBeltRingDesc,     category: "Fashion" },
    // Unit Conversions
    { href: "/units",         icon: ArrowLeftRight,title: t.calcUnitTitle,         desc: t.calcUnitDesc,         category: "Unit Conversions" },
  ];

  const CATEGORIES = [
    { key: "Financial",         label: t.catFinancial },
    { key: "Fuel & Travel",     label: t.catFuelTravel },
    { key: "Home & Garden",     label: t.catHomeGarden },
    { key: "Health",            label: t.catHealth },
    { key: "Fashion",           label: t.catFashion },
    { key: "Unit Conversions",  label: t.catUnitConversions },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Calculator className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-foreground">TrufflShuffl</span>
              <span className="text-xs text-muted-foreground block -mt-0.5">{t.calculatorSuite}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">{t.educationalUseOnly}</span>
            <LanguageSelect />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-14 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-foreground">{t.heroTitle1}</span>{" "}
          <span className="text-primary">{t.heroTitle2}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {t.heroSubtitle}
        </p>
      </section>

      {/* World Clock */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">
          {t.liveWorldClock}
        </h2>
        <WorldClock />
      </section>

      {/* Calculator Grid — grouped by category */}
      <section className="container mx-auto px-4 pb-20 space-y-12">
        {CATEGORIES.map(({ key: cat, label: catLabel }) => {
          const calcs = CALCULATORS.filter(c => c.category === cat);
          const meta = CATEGORY_META[cat];
          return (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-5">
                <h2 className={`text-xs font-semibold uppercase tracking-widest ${meta.color}`}>{catLabel}</h2>
                <div className="flex-1 h-px bg-border" />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${meta.badge}`}>
                  {calcs.length} {t.tools}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {calcs.map((calc) => {
                  const Icon = calc.icon;
                  return (
                    <Link key={calc.href} href={calc.href} data-testid={`card-${calc.href.replace("/", "")}`}>
                      <div className="group bg-card border border-border rounded-xl p-5 h-full hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
                            <Icon className={`w-5 h-5 ${meta.color}`} />
                          </div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${meta.badge}`}>
                            {catLabel}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-sm leading-snug">
                          {calc.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{calc.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40">
        <div className="container mx-auto px-4 py-10 space-y-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.about}</span></Link>
            <Link href="/contact"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.contact}</span></Link>
            <Link href="/terms"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.terms}</span></Link>
            <Link href="/privacy"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.privacy}</span></Link>
            <a href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">{t.sitemap}</a>
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">TrufflShuffl®</strong> {t.footerTrademark}
            </p>
            <p className="text-xs text-muted-foreground">{t.footerDisclaimer}</p>
            <p className="text-xs text-muted-foreground">{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
