import { useParams } from "wouter";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CONVERSION_PAIRS, findPair, CONVERSION_VALUES } from "@/lib/conversions";
import { useLang } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight, Calculator, BookOpen } from "lucide-react";
import { getArticlesByCategory } from "@/lib/articles";

function fmt(n: number, precision: number): string {
  if (!isFinite(n)) return "—";
  if (precision === 0) return n.toLocaleString("en", { maximumFractionDigits: 0 });
  return n.toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: precision });
}

const TABLE_VALUES = [1, 2, 3, 5, 10, 15, 20, 25, 50, 100, 200, 250, 500, 1000];

export default function ConversionPage() {
  const params = useParams<{ pair: string; value?: string }>();
  const { lang } = useLang();
  const pair = findPair(params.pair ?? "");
  const [inputVal, setInputVal] = useState(params.value ?? "1");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (params.value) setInputVal(params.value);
  }, [params.value]);

  useEffect(() => {
    if (pair && inputVal !== "") {
      const n = parseFloat(inputVal);
      if (!isNaN(n)) setResult(pair.convert(n));
      else setResult(null);
    }
  }, [inputVal, pair]);

  if (!pair) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Conversion Not Found</h1>
          <Link href="/" className="text-primary hover:underline">← Back to Calculators</Link>
        </div>
      </div>
    );
  }

  const numVal = parseFloat(inputVal);
  const hasResult = result !== null && !isNaN(numVal);
  const pageVal = params.value ? parseFloat(params.value) : null;
  const pageResult = pageVal !== null ? pair.convert(pageVal) : null;

  const title = pageVal !== null
    ? `${fmt(pageVal, 0)} ${pair.fromLabel} to ${pair.toLabel} — ${fmt(pageResult!, pair.precision)} ${pair.toSymbol}`
    : `${pair.fromLabel} to ${pair.toLabel} Converter`;

  const description = pageVal !== null
    ? `${fmt(pageVal, 0)} ${pair.fromLabel} = ${fmt(pageResult!, pair.precision)} ${pair.toSymbol}. Free instant ${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()} converter. Formula: ${pair.formula}.`
    : `Free online ${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()} converter. Instant results with formula, table and live calculator. Category: ${pair.category}.`;

  useEffect(() => {
    if (!pair) return;
    const pageVal = params.value ? parseFloat(params.value) : null;
    const pageResult = pageVal !== null ? pair.convert(pageVal) : null;
    const t = pageVal !== null
      ? `${fmt(pageVal, 0)} ${pair.fromLabel} to ${pair.toLabel} — ${fmt(pageResult!, pair.precision)} ${pair.toSymbol} | TrufflShuffl`
      : `${pair.fromLabel} to ${pair.toLabel} Converter | TrufflShuffl`;
    document.title = t;

    const desc = pageVal !== null
      ? `${fmt(pageVal, 0)} ${pair.fromLabel} = ${fmt(pageResult!, pair.precision)} ${pair.toSymbol}. Free instant converter. Formula: ${pair.formula}.`
      : `Free online ${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()} converter with formula, table and live calculator.`;

    const setMeta = (sel: string, attr: string, val: string) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[name="keywords"]', "content", `${pair.fromLabel} to ${pair.toLabel}, ${pair.category.toLowerCase()} converter, unit conversion`);

    // JSON-LD
    document.querySelectorAll('script[data-conv-ld]').forEach(s => s.remove());
    const faqLd = {
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": `How do you convert ${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Formula: ${pair.formula}. Example: ${pageVal ?? 1} ${pair.fromSymbol} = ${fmt(pair.convert(pageVal ?? 1), pair.precision)} ${pair.toSymbol}.` },
      }],
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-conv-ld", "1");
    s.textContent = JSON.stringify(faqLd);
    document.head.appendChild(s);

    return () => { document.querySelectorAll('script[data-conv-ld]').forEach(el => el.remove()); };
  }, [pair, params.value]);

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-sm text-muted-foreground">{pair.category} Conversion</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

          {/* Hero result */}
          {pageVal !== null && pageResult !== null && (
            <div className="text-center py-6">
              <div className="text-muted-foreground text-sm uppercase tracking-widest mb-2">{pair.category} Conversion</div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                <span className="text-primary">{fmt(pageVal, 0)} {pair.fromSymbol}</span>
                {" = "}
                <span className="text-amber-400">{fmt(pageResult, pair.precision)} {pair.toSymbol}</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                {fmt(pageVal, 0)} {pair.fromLabel} = {fmt(pageResult, pair.precision)} {pair.toLabel}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground">
                <Calculator className="h-3.5 w-3.5" />
                Formula: <code className="font-mono">{pair.formula}</code>
              </div>
            </div>
          )}

          {pageVal === null && (
            <div className="text-center py-4">
              <div className="text-muted-foreground text-sm uppercase tracking-widest mb-2">{pair.category}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {pair.fromLabel} to {pair.toLabel} Converter
              </h1>
              <p className="text-muted-foreground">
                Instantly convert {pair.fromLabel.toLowerCase()} ({pair.fromSymbol}) to {pair.toLabel.toLowerCase()} ({pair.toSymbol}).
              </p>
              <div className="mt-3 inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground">
                <Calculator className="h-3.5 w-3.5" />
                Formula: <code className="font-mono">{pair.formula}</code>
              </div>
            </div>
          )}

          {/* Live calculator */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Live Converter</h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <label className="text-sm text-muted-foreground mb-1 block">{pair.fromLabel} ({pair.fromSymbol})</label>
                <Input
                  type="number"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className="text-lg"
                  placeholder="Enter value..."
                />
              </div>
              <div className="flex items-center justify-center pt-5">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 w-full">
                <label className="text-sm text-muted-foreground mb-1 block">{pair.toLabel} ({pair.toSymbol})</label>
                <div className="h-10 flex items-center px-3 bg-muted rounded-md border border-border text-lg font-semibold text-amber-400">
                  {hasResult ? fmt(result!, pair.precision) : "—"}
                </div>
              </div>
            </div>
            {hasResult && (
              <p className="mt-3 text-sm text-muted-foreground text-center">
                {fmt(numVal, 0)} {pair.fromSymbol} = {fmt(result!, pair.precision)} {pair.toSymbol}
              </p>
            )}
          </div>

          {/* Conversion table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {pair.fromLabel} to {pair.toLabel} — Common Values
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-muted-foreground font-medium">{pair.fromLabel} ({pair.fromSymbol})</th>
                    <th className="px-4 py-3 text-left text-muted-foreground font-medium">{pair.toLabel} ({pair.toSymbol})</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_VALUES.map((v, i) => (
                    <tr key={v} className={i % 2 === 0 ? "bg-background" : "bg-card"}>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        <Link href={`/convert/${pair.slug}/${v}`} className="hover:text-primary transition-colors">
                          {fmt(v, 0)} {pair.fromSymbol}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-amber-400 font-semibold">
                        {fmt(pair.convert(v), pair.precision)} {pair.toSymbol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to convert */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              How to Convert {pair.fromLabel} to {pair.toLabel}
            </h2>
            <p className="text-muted-foreground">
              To convert from {pair.fromLabel.toLowerCase()} to {pair.toLabel.toLowerCase()}, apply the following formula:
            </p>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm text-center text-foreground">
              {pair.formula}
            </div>
            {pageVal !== null && pageResult !== null && (
              <p className="text-muted-foreground">
                <strong>Example:</strong> {fmt(pageVal, 0)} {pair.fromSymbol} × the conversion factor = {fmt(pageResult, pair.precision)} {pair.toSymbol}
              </p>
            )}
          </div>

          {/* Related conversions */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Related {pair.category} Conversions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CONVERSION_PAIRS
                .filter(p => p.category === pair.category && p.slug !== pair.slug)
                .slice(0, 6)
                .map(p => (
                  <Link
                    key={p.slug}
                    href={`/convert/${p.slug}`}
                    className="block bg-card border border-border rounded-lg px-4 py-3 hover:border-primary transition-colors text-sm text-foreground hover:text-primary"
                  >
                    {p.fromLabel} → {p.toLabel}
                  </Link>
                ))}
            </div>
          </div>

          {/* Related articles */}
          {(() => {
            const articles = getArticlesByCategory(pair.category).slice(0, 3);
            if (articles.length === 0) return null;
            return (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {pair.category} Articles
                  </h2>
                  <Link href="/articles" className="text-sm text-primary hover:underline">
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {articles.map(a => (
                    <Link
                      key={a.slug}
                      href={`/articles/${a.slug}`}
                      className="group block bg-card border border-border rounded-xl p-4 hover:border-primary/60 transition-all"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                        {a.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{a.subtitle}</p>
                      <p className="text-xs text-muted-foreground mt-2">{a.readTime} min read</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

        </div>
      </div>
    </>
  );
}
