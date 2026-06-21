import { useParams } from "wouter";
import { Link } from "wouter";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { useLang } from "@/context/LanguageContext";
import { useEffect } from "react";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLang();
  const article = getArticleBySlug(params.slug ?? "");

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | TrufflShuffl`;
    const setMeta = (sel: string, attr: string, val: string) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };
    setMeta('meta[name="description"]', "content", article.subtitle);
    setMeta('meta[name="keywords"]', "content", article.tags.join(", "));

    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    };
    document.querySelectorAll('script[data-article-ld]').forEach(s => s.remove());
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-article-ld", "1");
    s.textContent = JSON.stringify(faqLd);
    document.head.appendChild(s);
    return () => { document.querySelectorAll('script[data-article-ld]').forEach(el => el.remove()); };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
          <Link href="/articles" className="text-primary hover:underline">← Back to Articles</Link>
        </div>
      </div>
    );
  }

  const related = getArticlesByCategory(article.category)
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/articles" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="text-sm text-muted-foreground">{article.category} Articles</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-10">

          {/* Main content */}
          <article>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {article.readTime} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" /> {article.author}
              </span>
              <span className="text-xs text-muted-foreground">{article.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {article.subtitle}
            </p>

            {/* Article body */}
            <div
              className="prose prose-invert max-w-none
                prose-headings:text-foreground prose-headings:font-semibold
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-foreground
                prose-em:text-muted-foreground
                prose-ul:text-muted-foreground prose-ul:space-y-1 prose-ul:my-4
                prose-li:leading-relaxed
                prose-code:text-amber-400 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                [&_.lead]:text-base [&_.lead]:text-foreground/90 [&_.lead]:leading-relaxed [&_.lead]:mb-6
                [&_.did-you-know]:bg-primary/10 [&_.did-you-know]:border [&_.did-you-know]:border-primary/30 [&_.did-you-know]:rounded-xl [&_.did-you-know]:p-5 [&_.did-you-know]:my-6
                [&_.did-you-know_h3]:text-primary [&_.did-you-know_h3]:text-sm [&_.did-you-know_h3]:font-semibold [&_.did-you-know_h3]:mb-2 [&_.did-you-know_h3]:mt-0
                [&_.did-you-know_p]:text-muted-foreground [&_.did-you-know_p]:text-sm [&_.did-you-know_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="flex items-center flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              {article.tags.map(tag => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground rounded px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* FAQs */}
            {article.faqs.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-2 text-base">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              {/* Related articles */}
              {related.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                    More {article.category} Articles
                  </h3>
                  <div className="space-y-3">
                    {related.map(a => (
                      <Link
                        key={a.slug}
                        href={`/articles/${a.slug}`}
                        className="block group"
                      >
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-0.5">
                          {a.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{a.readTime} min read</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/articles"
                    className="block mt-4 text-xs text-primary hover:underline"
                  >
                    All {article.category} articles →
                  </Link>
                </div>
              )}

              {/* Back to articles */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                  Browse All Articles
                </h3>
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Articles
                </Link>
              </div>
            </div>
          </aside>

        </div>

        {/* Mobile related articles */}
        {related.length > 0 && (
          <div className="lg:hidden mt-10 pt-6 border-t border-border">
            <h3 className="font-semibold text-foreground mb-4">More {article.category} Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map(a => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/60 transition-colors"
                >
                  <p className="text-sm font-medium text-foreground leading-snug mb-1">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.readTime} min read</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
