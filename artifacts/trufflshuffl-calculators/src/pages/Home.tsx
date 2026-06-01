import { Link } from "wouter";
import { WorldClock } from "@/components/WorldClock";
import {
  TrendingUp, DollarSign, Home, Droplets, Zap, Heart, Calculator,
  Fuel, Hammer, PaintBucket, Layers, Activity, BarChart2,
  Ruler, Shirt, ArrowLeftRight
} from "lucide-react";

const CALCULATORS = [
  // Financial
  {
    href: "/investment",
    icon: TrendingUp,
    title: "Investment Calculator",
    desc: "Compound vs simple interest, growth projections, multiple investment types",
    category: "Financial",
  },
  {
    href: "/loan",
    icon: DollarSign,
    title: "Loan Calculator",
    desc: "Monthly repayments, total interest, and the impact of extra payments",
    category: "Financial",
  },
  {
    href: "/mortgage",
    icon: Home,
    title: "Mortgage Calculator",
    desc: "Bond repayments, transfer duty, attorney fees and LTV ratio",
    category: "Financial",
  },
  {
    href: "/bond",
    icon: BarChart2,
    title: "Bond Calculator",
    desc: "Bond price, yield to maturity, duration and coupon schedule",
    category: "Financial",
  },
  {
    href: "/amortization",
    icon: Calculator,
    title: "Amortization Calculator",
    desc: "Full payment schedule month-by-month with overpayment analysis",
    category: "Financial",
  },
  // Fuel & Travel
  {
    href: "/fuel",
    icon: Fuel,
    title: "Fuel & Trip Calculator",
    desc: "Fuel cost, trip time and distance, plus fuel unit conversions",
    category: "Fuel & Travel",
  },
  // Home & Garden
  {
    href: "/pool",
    icon: Droplets,
    title: "Pool Size Calculator",
    desc: "Volume in litres, gallons, fill time and chemical dosing guide",
    category: "Home & Garden",
  },
  {
    href: "/paving",
    icon: Layers,
    title: "Paving Calculator",
    desc: "Number of pavers needed, packs, wastage and total cost estimate",
    category: "Home & Garden",
  },
  {
    href: "/renovation",
    icon: Hammer,
    title: "Renovation Cost Calculator",
    desc: "Cost ranges for 15 renovation types, quality grades and timelines",
    category: "Home & Garden",
  },
  {
    href: "/paint",
    icon: PaintBucket,
    title: "Paint Calculator",
    desc: "Litres needed per room, tin sizes, coats and total cost breakdown",
    category: "Home & Garden",
  },
  // Health
  {
    href: "/calories",
    icon: Zap,
    title: "Calorie Calculator",
    desc: "TDEE, BMR, macros and a food calorie tracker by meal",
    category: "Health",
  },
  {
    href: "/bmi",
    icon: Activity,
    title: "BMI Calculator",
    desc: "Body mass index, healthy weight range and ideal weight formulas",
    category: "Health",
  },
  // Fashion
  {
    href: "/clothing-size",
    icon: Shirt,
    title: "Clothing Size Calculator",
    desc: "Find your UK, US and EU clothing size from chest, waist and hip measurements",
    category: "Fashion",
  },
  {
    href: "/shoe-size",
    icon: Ruler,
    title: "Shoe Size Calculator",
    desc: "Foot length and width to EU, UK and US shoe sizes with width fitting guide",
    category: "Fashion",
  },
  {
    href: "/belt-ring",
    icon: Heart,
    title: "Belt & Ring Size Calculator",
    desc: "Belt length from waist size, ring size from home measurements with full charts",
    category: "Fashion",
  },
  // Unit Conversions
  {
    href: "/units",
    icon: ArrowLeftRight,
    title: "Unit Converter",
    desc: "12 categories: length, weight, temperature, volume, area, speed, pressure, energy, data, time, angle and fuel",
    category: "Unit Conversions",
  },
];

const CATEGORY_META: Record<string, { color: string; badge: string }> = {
  Financial:         { color: "text-yellow-400",  badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  "Fuel & Travel":   { color: "text-blue-400",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "Home & Garden":   { color: "text-teal-400",    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  Health:            { color: "text-green-400",   badge: "bg-green-500/10 text-green-400 border-green-500/20" },
  Fashion:           { color: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  "Unit Conversions":{ color: "text-violet-400",  badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
};

const CATEGORIES = ["Financial", "Fuel & Travel", "Home & Garden", "Health", "Fashion", "Unit Conversions"];

export default function HomePage() {
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
              <span className="text-xs text-muted-foreground block -mt-0.5">Calculator Suite</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">Educational use only</span>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-14 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-foreground">Professional</span>{" "}
          <span className="text-primary">Calculators</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Comprehensive financial, home, fuel, health, fashion and unit calculators — all free, all private, no sign-up required.
        </p>
      </section>

      {/* World Clock */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">Live World Clock</h2>
        <WorldClock />
      </section>

      {/* Calculator Grid — grouped by category */}
      <section className="container mx-auto px-4 pb-20 space-y-12">
        {CATEGORIES.map(cat => {
          const calcs = CALCULATORS.filter(c => c.category === cat);
          const meta = CATEGORY_META[cat];
          return (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-5">
                <h2 className={`text-xs font-semibold uppercase tracking-widest ${meta.color}`}>{cat}</h2>
                <div className="flex-1 h-px bg-border" />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${meta.badge}`}>{calcs.length} tools</span>
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
                            {cat}
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
            <Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">About</span></Link>
            <Link href="/contact"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contact</span></Link>
            <Link href="/terms"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Terms &amp; Conditions</span></Link>
            <Link href="/privacy"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></Link>
            <a href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</a>
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">TrufflShuffl®</strong> is a registered trademark. All intellectual property rights in and to the game are owned in South Africa by WordShuffl Trading.
            </p>
            <p className="text-xs text-muted-foreground">This site is for educational and informational purposes only. Not financial, legal or medical advice.</p>
            <p className="text-xs text-muted-foreground">© 2026 TrufflShuffl.com. ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
