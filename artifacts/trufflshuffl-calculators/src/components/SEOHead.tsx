import { useEffect } from "react";
import { TRANSLATIONS, type LangCode } from "@/lib/i18n";

interface Props {
  lang: LangCode;
}

export function SEOHead({ lang }: Props) {
  useEffect(() => {
    const t = TRANSLATIONS[lang];

    // Title
    document.title = t.metaTitle;

    // Description
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement("meta"); (desc as HTMLMetaElement).name = "description"; document.head.appendChild(desc); }
    (desc as HTMLMetaElement).content = t.metaDescription;

    // Keywords
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) { kw = document.createElement("meta"); (kw as HTMLMetaElement).name = "keywords"; document.head.appendChild(kw); }
    (kw as HTMLMetaElement).content = t.metaKeywords;

    // OG title + description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) { ogTitle = document.createElement("meta"); ogTitle.setAttribute("property", "og:title"); document.head.appendChild(ogTitle); }
    ogTitle.setAttribute("content", t.metaTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) { ogDesc = document.createElement("meta"); ogDesc.setAttribute("property", "og:description"); document.head.appendChild(ogDesc); }
    ogDesc.setAttribute("content", t.metaDescription);

    // Twitter
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) { twTitle = document.createElement("meta"); (twTitle as HTMLMetaElement).name = "twitter:title"; document.head.appendChild(twTitle); }
    (twTitle as HTMLMetaElement).content = t.metaTitle;

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twDesc) { twDesc = document.createElement("meta"); (twDesc as HTMLMetaElement).name = "twitter:description"; document.head.appendChild(twDesc); }
    (twDesc as HTMLMetaElement).content = t.metaDescription;
  }, [lang]);

  return null;
}
