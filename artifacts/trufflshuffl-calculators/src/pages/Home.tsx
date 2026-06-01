import { Link } from "wouter";
import { WorldClock } from "@/components/WorldClock";
import {
  TrendingUp, DollarSign, Home, Droplets, Zap, Heart, Calculator,
  Fuel, Hammer, PaintBucket, Leaf, Layers, Activity, BarChart2
} from "lucide-react";

const CALCULATORS = [
  {
    href: "/investment",
    icon: TrendingUp,
    title: "Investment Calculator",
    desc: "Compound vs simple interest, growth projections, multiple investment types",
    category: "Financial",
    color: "text-yellow-400",
  },
  {
    href: "/loan",
    icon: DollarSign,
    title: "Loan Calculator",
    desc: "Monthly repayments, total interest, and the impact of extra payments",
    category: "Financial",
    color: "text-yellow-400",
  },
  {
    href: "/mortgage",
    icon: Home,
    title: "Mortgage Calculator",
    desc: "Bond repayments, transfer duty, attorney fees and LTV ratio",
    category: "Financial",
    color: "text-yellow-400",
  },
  {
    href: "/bond",
    icon: BarChart2,
    title: "Bond Calculator",
    desc: "Bond price, yield to maturity, duration and coupon schedule",
    category: "Financial",
    color: "text-yellow-400",
  },
  {
    href: "/amortization",
    icon: Calculator,
    title: "Amortization Calculator",
    desc: "Full payment schedule month-by-month with overpayment analysis",
    category: "Financial",
    color: "text-yellow-400",
  },
  {
    href: "/fuel",
    icon: Fuel,
    title: "Fuel & Trip Calculator",
    desc: "Fuel cost, trip time and distance, plus fuel unit conversions",
    category: "Fuel & Travel",
    color: "text-blue-400",
  },
  {
    href: "/pool",
    icon: Droplets,
    title: "Pool Size Calculator",
    desc: "Volume in litres, gallons, fill time and chemical dosing guide",
    category: "Home & Garden",
    color: "text-teal-400",
  },
  {
    href: "/paving",
    icon: Layers,
    title: "Paving Calculator",
    desc: "Number of pavers needed, packs, wastage and total cost estimate",
    category: "Home & Garden",
    color: "text-teal-400",
  },
  {
    href: "/renovation",
    icon: Hammer,
    title: "Renovation Cost Calculator",
    desc: "Cost ranges for 15 renovation types, quality grades and timelines",
    category: "Home & Garden",
    color: "text-teal-400",
  },
  {
    href: "/paint",
    icon: PaintBucket,
    title: "Paint Calculator",
    desc: "Litres needed per room, tin sizes, coats and total cost breakdown",
    category: "Home & Garden",
    color: "text-teal-400",
  },
  {
    href: "/calories",
    icon: Zap,
    title: "Calorie Calculator",
    desc: "TDEE, BMR, macros and a food calorie tracker by meal",
    category: "Health",
    color: "text-green-400",
  },
  {
    href: "/bmi",
    icon: Activity,
    title: "BMI Calculator",
    desc: "Body mass index, healthy weight range and ideal weight formulas",
    category: "Health",
    color: "text-green-400",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Financial: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Fuel & Travel": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Home & Garden": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Health: "bg-green-500/10 text-green-400 border-green-500/20",
};

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
          Comprehensive financial, home, fuel and health calculators — all free, all private, no sign-up required.
        </p>
      </section>

      {/* World Clock */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">Live World Clock</h2>
        <WorldClock />
      </section>

      {/* Calculator Grid */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 text-center">All Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CALCULATORS.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.href} href={calc.href} data-testid={`card-${calc.href.replace("/", "")}`}>
                <div className="group bg-card border border-border rounded-xl p-5 h-full hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors`}>
                      <Icon className={`w-5 h-5 ${calc.color}`} />
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[calc.category]}`}>
                      {calc.category}
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
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40">
        <div className="container mx-auto px-4 py-8 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">TrufflShuffl®</strong> is a registered trademark. All intellectual property rights in and to the game are owned in South Africa by WordShuffl Trading.
          </p>
          <p className="text-xs text-muted-foreground">This site is for educational and informational purposes only.</p>
          <p className="text-xs text-muted-foreground">© 2026 TrufflShuffl.com. ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
}
