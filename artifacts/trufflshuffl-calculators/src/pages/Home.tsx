import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { WorldClock } from "@/components/WorldClock";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useLang } from "@/context/LanguageContext";
import {
  TrendingUp, DollarSign, Home, Droplets, Zap, Heart, Calculator,
  Fuel, Hammer, PaintBucket, Layers, Activity, BarChart2,
  Ruler, Shirt, ArrowLeftRight, Percent, PiggyBank, Target,
  Calendar, Briefcase, BadgeDollarSign, ArrowRight, BookOpen
} from "lucide-react";

function InlineAd() {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);
  useEffect(() => {
    if (!ref.current || injected.current) return;
    injected.current = true;
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    s.src = "https://pl29742062.effectivecpmnetwork.com/ad0a4242c48089c8f2af3f8331cc6c92/invoke.js";
    document.body.appendChild(s);
  }, []);
  return (
    <div className="flex justify-center items-center py-2">
      <div id="container-ad0a4242c48089c8f2af3f8331cc6c92" ref={ref} />
    </div>
  );
}

const CATEGORY_META: Record<string, { color: string; badge: string }> = {
  Financial:           { color: "text-yellow-400",  badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  Business:            { color: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  "Fuel & Travel":     { color: "text-blue-400",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "Home & Garden":     { color: "text-teal-400",    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  Health:              { color: "text-green-400",   badge: "bg-green-500/10 text-green-400 border-green-500/20" },
  "Dates & Time":      { color: "text-cyan-400",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  Fashion:             { color: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  "Unit Conversions":  { color: "text-violet-400",  badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
};

export default function HomePage() {
  const { t } = useLang();

  const CALCULATORS = [
    // Financial
    { href: "/investment",    icon: TrendingUp,      title: t.calcInvestmentTitle,   desc: t.calcInvestmentDesc,   category: "Financial" },
    { href: "/loan",          icon: DollarSign,      title: t.calcLoanTitle,         desc: t.calcLoanDesc,         category: "Financial" },
    { href: "/mortgage",      icon: Home,            title: t.calcMortgageTitle,     desc: t.calcMortgageDesc,     category: "Financial" },
    { href: "/bond",          icon: BarChart2,       title: t.calcBondTitle,         desc: t.calcBondDesc,         category: "Financial" },
    { href: "/amortization",  icon: Calculator,      title: t.calcAmortizationTitle, desc: t.calcAmortizationDesc, category: "Financial" },
    // Business
    { href: "/vat",           icon: BadgeDollarSign, title: t.calcVATTitle,          desc: t.calcVATDesc,          category: "Business" },
    { href: "/percentage",    icon: Percent,         title: t.calcPercentageTitle,   desc: t.calcPercentageDesc,   category: "Business" },
    { href: "/retirement",    icon: PiggyBank,       title: t.calcRetirementTitle,   desc: t.calcRetirementDesc,   category: "Business" },
    { href: "/roi",           icon: Target,          title: t.calcROITitle,          desc: t.calcROIDesc,          category: "Business" },
    { href: "/savings",       icon: TrendingUp,      title: t.calcSavingsTitle,      desc: t.calcSavingsDesc,      category: "Business" },
    { href: "/salary",        icon: Briefcase,       title: t.calcSalaryTitle,       desc: t.calcSalaryDesc,       category: "Business" },
    // Fuel & Travel
    { href: "/fuel",          icon: Fuel,            title: t.calcFuelTitle,         desc: t.calcFuelDesc,         category: "Fuel & Travel" },
    // Home & Garden
    { href: "/pool",          icon: Droplets,        title: t.calcPoolTitle,         desc: t.calcPoolDesc,         category: "Home & Garden" },
    { href: "/paving",        icon: Layers,          title: t.calcPavingTitle,       desc: t.calcPavingDesc,       category: "Home & Garden" },
    { href: "/renovation",    icon: Hammer,          title: t.calcRenovationTitle,   desc: t.calcRenovationDesc,   category: "Home & Garden" },
    { href: "/paint",         icon: PaintBucket,     title: t.calcPaintTitle,        desc: t.calcPaintDesc,        category: "Home & Garden" },
    // Health
    { href: "/calories",      icon: Zap,             title: t.calcCalorieTitle,      desc: t.calcCalorieDesc,      category: "Health" },
    { href: "/bmi",           icon: Activity,        title: t.calcBMITitle,          desc: t.calcBMIDesc,          category: "Health" },
    // Dates & Time
    { href: "/age",           icon: Calendar,        title: t.calcAgeTitle,          desc: t.calcAgeDesc,          category: "Dates & Time" },
    // Fashion
    { href: "/clothing-size", icon: Shirt,           title: t.calcClothingTitle,     desc: t.calcClothingDesc,     category: "Fashion" },
    { href: "/shoe-size",     icon: Ruler,           title: t.calcShoeTitle,         desc: t.calcShoeDesc,         category: "Fashion" },
    { href: "/belt-ring",     icon: Heart,           title: t.calcBeltRingTitle,     desc: t.calcBeltRingDesc,     category: "Fashion" },
    // Unit Conversions
    { href: "/units",         icon: ArrowLeftRight,  title: t.calcUnitTitle,         desc: t.calcUnitDesc,         category: "Unit Conversions" },
  ];

  const CATEGORIES = [
    { key: "Financial",        label: t.catFinancial },
    { key: "Business",         label: t.catBusiness },
    { key: "Fuel & Travel",    label: t.catFuelTravel },
    { key: "Home & Garden",    label: t.catHomeGarden },
    { key: "Health",           label: t.catHealth },
    { key: "Dates & Time",     label: t.catDatesTime },
    { key: "Fashion",          label: t.catFashion },
    { key: "Unit Conversions", label: t.catUnitConversions },
  ];

  const POPULAR_CONVERSIONS = [
    "miles-to-km", "kg-to-pounds", "celsius-to-fahrenheit",
    "litres-to-gallons", "mph-to-kmh", "sqm-to-sqft",
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
      <section className="container mx-auto px-4 pt-10 pb-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-foreground">{t.heroTitle1}</span>{" "}
          <span className="text-primary">{t.heroTitle2}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {t.heroSubtitle}
        </p>
      </section>

      {/* World Clock */}
      <section className="container mx-auto px-4 pb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">
          {t.liveWorldClock}
        </h2>
        <WorldClock />
      </section>

      {/* Ad — between world clock and calculator grid (natural content break) */}
      <div className="container mx-auto px-4 pb-8">
        <InlineAd />
      </div>

      {/* Popular unit conversions strip */}
      <section className="container mx-auto px-4 pb-10">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400">Popular Conversions</h2>
          <div className="flex-1 h-px bg-border" />
          <Link href="/units" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            All converters <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_CONVERSIONS.map(slug => {
            const label = slug.replace(/-/g, " ").replace("to", "→");
            return (
              <Link key={slug} href={`/convert/${slug}`}>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:border-violet-400 transition-colors cursor-pointer">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Articles banner */}
      <section className="container mx-auto px-4 pb-10">
        <Link href="/articles">
          <div className="group flex items-center justify-between bg-card border border-border hover:border-primary/50 rounded-2xl px-6 py-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Measurement &amp; Conversion Articles</p>
                <p className="text-xs text-muted-foreground mt-0.5">143 in-depth guides across length, weight, temperature, speed, and more</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
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
            <Link href="/articles"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Articles</span></Link>
            <Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.about}</span></Link>
            <Link href="/contact"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.contact}</span></Link>
            <Link href="/terms"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.terms}</span></Link>
            <Link href="/privacy"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.privacy}</span></Link>
            <Link href="/sitemap"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t.sitemap}</span></Link>
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
