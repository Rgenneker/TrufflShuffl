import { Link } from "wouter";
import { ALL_ARTICLES, ARTICLE_CATEGORIES, getArticlesByCategory } from "@/lib/articles";
import { SEOHead } from "@/components/SEOHead";
import { useLang } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ArticlesPage() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const displayed =
    activeCategory === "All"
      ? ALL_ARTICLES
      : getArticlesByCategory(activeCategory);

  const categoryTotals = ARTICLE_CATEGORIES.map(cat => ({
    name: cat,
    count: getArticlesByCategory(cat).length,
  }));

  return (
    <>
      <SEOHead lang={lang} />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Measurement &amp; Conversion Articles
            </h1>
            <p className="text-muted-foreground text-lg">
              In-depth guides to units of measurement across science, engineering, sport, and everyday life — authored by Lexigenz Authors.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All ({ALL_ARTICLES.length})
            </button>
            {categoryTotals.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setActiveCategory(name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === name
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {name} ({count})
              </button>
            ))}
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map(article => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block bg-card border border-border rounded-xl p-5 hover:border-primary/60 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.readTime} min read
                  </span>
                </div>
                <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {article.subtitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-muted/60 text-muted-foreground rounded px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {displayed.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No articles in this category yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
