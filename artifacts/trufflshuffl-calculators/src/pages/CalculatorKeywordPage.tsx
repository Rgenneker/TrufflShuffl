import { Link, useRoute } from "wouter";

type KeywordPage = {
  keyword: string;
  slug: string;
};

const keywords: KeywordPage[] = require("../data/truffl-keywords.json");

const keywordPages = keywords as KeywordPage[];

export default function CalculatorKeywordPage() {
  const [, params] = useRoute("/calculator/:slug");
  const slug = params?.slug;

  const page = keywordPages.find((item) => item.slug === slug);

  if (!page) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Calculator Page Not Found</h1>
        <Link href="/" className="text-blue-600 underline">
          Back to TrufflShuffl
        </Link>
      </main>
    );
  }

  const words = page.keyword.split(" ");

  const relatedKeywords = keywordPages
    .filter(
      (item) =>
        item.slug !== slug &&
        words.some((word) =>
          item.keyword.toLowerCase().includes(word.toLowerCase())
        )
    )
    .slice(0, 10);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{page.keyword}</h1>

      <p className="text-lg mb-6">
        Use TrufflShuffl for {page.keyword}. Access useful calculators,
        conversion tools, finance calculators and everyday calculation helpers
        online.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">About {page.keyword}</h2>
        <p>
          This page helps users looking for {page.keyword}. TrufflShuffl provides
          browser-based calculators and conversion tools for finance, business,
          units, dates, health, construction and everyday calculations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Popular Calculator Uses</h2>
        <ul className="list-disc pl-6">
          <li>Financial calculations</li>
          <li>Currency and exchange rate conversions</li>
          <li>Unit, weight, length and temperature conversions</li>
          <li>Business, profit, margin and VAT calculations</li>
          <li>Date, time, age and percentage calculations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Related Calculator Searches
        </h2>

        <ul className="list-disc pl-6">
          {relatedKeywords.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/calculator/${item.slug}`}
                className="text-blue-600 hover:underline"
              >
                {item.keyword}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}