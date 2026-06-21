import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

export interface PageGuideSection {
  heading: string;
  paragraphs: string[];
}

export interface PageGuideFAQ {
  q: string;
  a: string;
}

export interface PageGuide {
  title: string;
  intro: string[];
  sections: PageGuideSection[];
  faqs: PageGuideFAQ[];
}

interface Props {
  guide: PageGuide;
}

export function CalculatorPageGuide({ guide }: Props) {
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card/30">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-card/60 transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-base">{guide.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {guide.sections.length} sections &middot; {guide.faqs.length} FAQs
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-10 border-t border-border">
          <div className="mt-6 space-y-4">
            {guide.intro.map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            {guide.sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-primary mb-3">
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

          <div className="mt-12">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-card/60 transition-colors text-left"
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
                    <div className="px-5 pb-4 border-t border-border bg-card/20">
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
