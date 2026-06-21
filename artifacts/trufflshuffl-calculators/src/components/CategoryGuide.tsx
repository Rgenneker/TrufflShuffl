import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { CATEGORY_GUIDES } from "@/lib/categoryGuides";

interface Props {
  category: string;
  color: string;
}

export function CategoryGuide({ category, color }: Props) {
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guide = CATEGORY_GUIDES.find(g => g.category === category);
  if (!guide) return null;

  return (
    <div className="mt-6 border border-border rounded-2xl overflow-hidden bg-card/40">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-card/80 transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center`}>
            <BookOpen className={`w-3.5 h-3.5 ${color}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{guide.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {guide.sections.length} sections · {guide.faqs.length} FAQs
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-8 border-t border-border">
          {/* Intro */}
          <div className="mt-6 space-y-3">
            {guide.intro.map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Sections */}
          <div className="mt-8 space-y-7">
            {guide.sections.map((section, i) => (
              <div key={i}>
                <h3 className={`text-base font-semibold mb-3 ${color}`}>
                  {section.heading}
                </h3>
                <div className="space-y-3">
                  {section.paragraphs.map((para, j) => (
                    <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-card/80 transition-colors text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 border-t border-border bg-card/30">
                      <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
