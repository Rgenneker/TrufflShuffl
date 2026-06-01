import { useEffect } from "react";
import { LANGUAGES, type LangCode } from "@/lib/i18n";

const BASE_URL = "https://www.trufflshuffl.com";

interface Props {
  lang: LangCode;
}

export function HreflangTags({ lang }: Props) {
  useEffect(() => {
    // Derive the page-relative path (e.g. "/investment")
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const pathname = window.location.pathname;
    const withoutBase = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
    // withoutBase looks like /en/investment → strip leading /lang/
    const segments = withoutBase.split("/").filter(Boolean); // ["en","investment"]
    const pageSegments = segments.slice(1); // ["investment"]
    const pagePath = pageSegments.length ? `/${pageSegments.join("/")}` : "";

    // Remove any existing alternate/canonical links we manage
    document.querySelectorAll('link[data-i18n]').forEach(el => el.remove());

    // Add hreflang for each language
    LANGUAGES.forEach(l => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = l.hreflang;
      link.href = `${BASE_URL}/${l.code}${pagePath}`;
      link.dataset.i18n = "1";
      document.head.appendChild(link);
    });

    // x-default → English
    const xDef = document.createElement("link");
    xDef.rel = "alternate";
    xDef.hreflang = "x-default";
    xDef.href = `${BASE_URL}/en${pagePath}`;
    xDef.dataset.i18n = "1";
    document.head.appendChild(xDef);

    // Canonical = current language URL
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${BASE_URL}/${lang}${pagePath}`;
    canonical.dataset.i18n = "1";
    document.head.appendChild(canonical);

    return () => {
      document.querySelectorAll('link[data-i18n]').forEach(el => el.remove());
    };
  }, [lang, typeof window !== "undefined" ? window.location.pathname : ""]);

  return null;
}
