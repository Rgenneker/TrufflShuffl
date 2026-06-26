import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { WorldClock } from "@/components/WorldClock";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useLang } from "@/context/LanguageContext";
import {
  TrendingUp, DollarSign, Home, Droplets, Zap, Heart, Calculator,
  Fuel, Hammer, PaintBucket, Layers, Activity, BarChart2,
  Ruler, Shirt, ArrowLeftRight, Percent, PiggyBank, Target,
  Calendar, Briefcase, BadgeDollarSign, ArrowRight, BookOpen,
  Sun, Lightbulb, HardHat, Dumbbell, Car, Plane, PawPrint,
  ChefHat, GraduationCap, Wrench, Leaf, Sparkles, Cpu,
  CreditCard, Landmark, LineChart, Wallet, HeartPulse, Clock,
  BatteryCharging, Building2, Fish
} from "lucide-react";
import { CategoryGuide } from "@/components/CategoryGuide";

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
  Financial:              { color: "text-yellow-400",   badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  Investing:              { color: "text-amber-400",    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  Business:               { color: "text-orange-400",   badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  "Fuel & Travel":        { color: "text-blue-400",     badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  Automotive:             { color: "text-slate-400",    badge: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  "Electric Vehicles":    { color: "text-emerald-400",  badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  "Solar & Energy":       { color: "text-amber-300",    badge: "bg-amber-400/10 text-amber-300 border-amber-400/20" },
  "Home Electricity":     { color: "text-yellow-300",   badge: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20" },
  Water:                  { color: "text-sky-400",      badge: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  "Home & Garden":        { color: "text-teal-400",     badge: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  Construction:           { color: "text-stone-400",    badge: "bg-stone-500/10 text-stone-400 border-stone-500/20" },
  Health:                 { color: "text-green-400",    badge: "bg-green-500/10 text-green-400 border-green-500/20" },
  Fitness:                { color: "text-red-400",      badge: "bg-red-500/10 text-red-400 border-red-500/20" },
  "Dates & Time":         { color: "text-cyan-400",     badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  Fashion:                { color: "text-pink-400",     badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  "Unit Conversions":     { color: "text-violet-400",   badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  "Pets & Animals":       { color: "text-lime-400",     badge: "bg-lime-500/10 text-lime-400 border-lime-500/20" },
  "Food & Cooking":       { color: "text-orange-300",   badge: "bg-orange-400/10 text-orange-300 border-orange-400/20" },
  Education:              { color: "text-purple-400",   badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  "Engineering & Science":{ color: "text-cyan-300",     badge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20" },
  Environment:            { color: "text-green-300",    badge: "bg-green-400/10 text-green-300 border-green-400/20" },
  Lifestyle:              { color: "text-rose-400",     badge: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  Technology:             { color: "text-fuchsia-400",  badge: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20" },
};

export default function HomePage() {
  const { t } = useLang();

  const CALCULATORS = [
    // Financial
    { href: "/investment",    icon: TrendingUp,      title: t.calcInvestmentTitle,    desc: t.calcInvestmentDesc,    category: "Financial" },
    { href: "/loan",          icon: DollarSign,      title: t.calcLoanTitle,          desc: t.calcLoanDesc,          category: "Financial" },
    { href: "/mortgage",      icon: Home,            title: t.calcMortgageTitle,      desc: t.calcMortgageDesc,      category: "Financial" },
    { href: "/bond",          icon: BarChart2,       title: t.calcBondTitle,          desc: t.calcBondDesc,          category: "Financial" },
    { href: "/amortization",  icon: Calculator,      title: t.calcAmortizationTitle,  desc: t.calcAmortizationDesc,  category: "Financial" },
    { href: "/credit-card",   icon: CreditCard,      title: "Credit Card Calculator", desc: "Monthly interest costs, minimum payment impact and payoff planner",         category: "Financial" },
    { href: "/debt",          icon: Landmark,        title: "Debt Consolidation",      desc: "Compare consolidation options and calculate your debt-to-income ratio",      category: "Financial" },
    { href: "/net-worth",     icon: Wallet,          title: "Net Worth & FIRE",        desc: "Calculate your net worth and find your financial independence number",         category: "Financial" },
    // Investing
    { href: "/investing",     icon: LineChart,       title: "Investing Calculator",    desc: "Dollar-cost averaging, CAGR, and dividend income projections",               category: "Investing" },
    { href: "/investment",    icon: TrendingUp,      title: "Compound Interest",       desc: "Compound vs simple interest, growth projections with regular contributions",   category: "Investing" },
    { href: "/retirement",    icon: PiggyBank,       title: t.calcRetirementTitle,    desc: t.calcRetirementDesc,    category: "Investing" },
    { href: "/roi",           icon: Target,          title: t.calcROITitle,           desc: t.calcROIDesc,           category: "Investing" },
    { href: "/savings",       icon: TrendingUp,      title: t.calcSavingsTitle,       desc: t.calcSavingsDesc,       category: "Investing" },
    // Business
    { href: "/vat",           icon: BadgeDollarSign, title: t.calcVATTitle,           desc: t.calcVATDesc,           category: "Business" },
    { href: "/gst",           icon: BadgeDollarSign, title: "GST Calculator",          desc: "Add GST to a price, remove GST from a GST-inclusive amount — Australia, NZ, Canada, Singapore and more", category: "Business" },
    { href: "/excise",        icon: Landmark,        title: "Excise Duty Calculator",  desc: "Calculate excise duties on fuel, tobacco, beer, spirits and wine — Australia, UK and US (2026 rates)", category: "Business" },
    { href: "/customs",       icon: Building2,       title: "Customs & Tariff Calculator", desc: "Estimate import duties for US, EU, UK, Australia and Canada — includes 2026 US reciprocal tariffs and FTA rates", category: "Business" },
    { href: "/percentage",    icon: Percent,         title: t.calcPercentageTitle,    desc: t.calcPercentageDesc,    category: "Business" },
    { href: "/salary",        icon: Briefcase,       title: t.calcSalaryTitle,        desc: t.calcSalaryDesc,        category: "Business" },
    { href: "/business-tools",icon: TrendingUp,      title: "Business Tools",          desc: "Profit margin, break-even point, and sales commission calculator",           category: "Business" },
    // Fuel & Travel
    { href: "/fuel",          icon: Fuel,            title: t.calcFuelTitle,          desc: t.calcFuelDesc,          category: "Fuel & Travel" },
    { href: "/travel",        icon: Plane,           title: "Travel Calculator",       desc: "Trip budget, jet lag, baggage fees and foreign currency conversion",          category: "Fuel & Travel" },
    // Automotive
    { href: "/automotive",    icon: Car,             title: "Automotive Calculator",   desc: "Tyre size comparison, vehicle depreciation and braking distance",             category: "Automotive" },
    // Electric Vehicles
    { href: "/ev",            icon: BatteryCharging, title: "EV Calculator",           desc: "Charging costs, cost per km and ICE vs EV running cost comparison",          category: "Electric Vehicles" },
    // Solar & Energy
    { href: "/solar",         icon: Sun,             title: "Solar Calculator",        desc: "Panel sizing, battery backup runtime, payback period and ROI",               category: "Solar & Energy" },
    // Home Electricity
    { href: "/electricity",   icon: Lightbulb,       title: "Electricity Calculator",  desc: "Appliance running costs, UPS battery runtime and geyser electricity usage",  category: "Home Electricity" },
    // Water
    { href: "/water",         icon: Droplets,        title: "Water Calculator",        desc: "Household water usage, rainwater harvesting and tank sizing",                category: "Water" },
    // Home & Garden
    { href: "/pool",          icon: Droplets,        title: t.calcPoolTitle,          desc: t.calcPoolDesc,          category: "Home & Garden" },
    { href: "/paving",        icon: Layers,          title: t.calcPavingTitle,        desc: t.calcPavingDesc,        category: "Home & Garden" },
    { href: "/renovation",    icon: Hammer,          title: t.calcRenovationTitle,    desc: t.calcRenovationDesc,    category: "Home & Garden" },
    { href: "/paint",         icon: PaintBucket,     title: t.calcPaintTitle,         desc: t.calcPaintDesc,         category: "Home & Garden" },
    // Construction
    { href: "/construction",  icon: HardHat,         title: "Construction Calculator", desc: "Concrete volume, bricks, excavation and rebar weight calculations",          category: "Construction" },
    // Health
    { href: "/calories",      icon: Zap,             title: t.calcCalorieTitle,       desc: t.calcCalorieDesc,       category: "Health" },
    { href: "/bmi",           icon: Activity,        title: t.calcBMITitle,           desc: t.calcBMIDesc,           category: "Health" },
    { href: "/body-health",   icon: HeartPulse,      title: "Body Health Calculator",  desc: "TDEE, BMR, body fat percentage and daily water intake goal",                 category: "Health" },
    // Fitness
    { href: "/fitness",       icon: Dumbbell,        title: "Fitness Calculator",      desc: "Running pace, cycling calories, heart rate zones and one-rep max",           category: "Fitness" },
    // Dates & Time
    { href: "/age",           icon: Calendar,        title: t.calcAgeTitle,           desc: t.calcAgeDesc,           category: "Dates & Time" },
    { href: "/time-tools",    icon: Clock,           title: "Time Tools",              desc: "Countdown timer, working days calculator and overtime pay",                   category: "Dates & Time" },
    // Fashion
    { href: "/clothing-size", icon: Shirt,           title: t.calcClothingTitle,      desc: t.calcClothingDesc,      category: "Fashion" },
    { href: "/shoe-size",     icon: Ruler,           title: t.calcShoeTitle,          desc: t.calcShoeDesc,          category: "Fashion" },
    { href: "/belt-ring",     icon: Heart,           title: t.calcBeltRingTitle,      desc: t.calcBeltRingDesc,      category: "Fashion" },
    // Unit Conversions
    { href: "/units",         icon: ArrowLeftRight,  title: t.calcUnitTitle,          desc: t.calcUnitDesc,          category: "Unit Conversions" },
    // Pets & Animals
    { href: "/pets",          icon: PawPrint,        title: "Pet Calculator",          desc: "Dog and cat age in human years, feeding amounts and medication doses",        category: "Pets & Animals" },
    // Food & Cooking
    { href: "/food",          icon: ChefHat,         title: "Food & Cooking",          desc: "Recipe scaling, coffee brew ratios, BBQ braai times and bread hydration",    category: "Food & Cooking" },
    // Education
    { href: "/education",     icon: GraduationCap,   title: "Education Calculator",    desc: "GPA calculator, final exam score needed and study hours planner",            category: "Education" },
    // Engineering & Science
    { href: "/engineering",   icon: Wrench,          title: "Engineering Calculator",  desc: "Ohm's Law, cable voltage drop (SANS 10142), torque and wire sizing",         category: "Engineering & Science" },
    // Environment
    { href: "/environment",   icon: Leaf,            title: "Environmental Calculator","desc": "Carbon footprint, tree offset calculator and personal water footprint",       category: "Environment" } as any,
    // Lifestyle
    { href: "/lifestyle",     icon: Sparkles,        title: "Lifestyle Calculator",    desc: "Wedding budget, event planning and holiday savings goal",                    category: "Lifestyle" },
    // Technology
    { href: "/tech",          icon: Cpu,             title: "Technology Calculator",   desc: "Internet speed, storage needs, AI API costs and SSD lifespan",              category: "Technology" },
  ];

  const CATEGORIES = [
    { key: "Financial",              label: "Financial" },
    { key: "Investing",              label: "Investing" },
    { key: "Business",               label: "Business" },
    { key: "Fuel & Travel",          label: "Fuel & Travel" },
    { key: "Automotive",             label: "Automotive" },
    { key: "Electric Vehicles",      label: "Electric Vehicles" },
    { key: "Solar & Energy",         label: "Solar & Energy" },
    { key: "Home Electricity",       label: "Home Electricity" },
    { key: "Water",                  label: "Water" },
    { key: "Home & Garden",          label: t.catHomeGarden },
    { key: "Construction",           label: "Construction" },
    { key: "Health",                 label: t.catHealth },
    { key: "Fitness",                label: "Fitness" },
    { key: "Dates & Time",           label: t.catDatesTime },
    { key: "Fashion",                label: t.catFashion },
    { key: "Unit Conversions",       label: t.catUnitConversions },
    { key: "Pets & Animals",         label: "Pets & Animals" },
    { key: "Food & Cooking",         label: "Food & Cooking" },
    { key: "Education",              label: "Education" },
    { key: "Engineering & Science",  label: "Engineering & Science" },
    { key: "Environment",            label: "Environment" },
    { key: "Lifestyle",              label: "Lifestyle" },
    { key: "Technology",             label: "Technology" },
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

      {/* Ad */}
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

      {/* Calculator Grid */}
      <section className="container mx-auto px-4 pb-20 space-y-12">
        {CATEGORIES.map(({ key: cat, label: catLabel }) => {
          const calcs = CALCULATORS.filter(c => c.category === cat);
          if (calcs.length === 0) return null;
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
                    <Link key={calc.href + calc.title} href={calc.href} data-testid={`card-${calc.href.replace("/", "")}`}>
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
                        <p className="text-xs text-muted-foreground leading-relaxed">{(calc as any).desc || calc.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <CategoryGuide category={cat} color={meta.color} />
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
