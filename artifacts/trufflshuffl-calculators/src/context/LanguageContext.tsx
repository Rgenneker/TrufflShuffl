import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TRANSLATIONS, LANGUAGES, type LangCode, type T } from "@/lib/i18n";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: T;
  rtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: TRANSLATIONS.en,
  rtl: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = localStorage.getItem("lang") as LangCode | null;
    if (saved && TRANSLATIONS[saved]) return saved;
    // Detect browser language
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("af")) return "af";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("ar")) return "ar";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("de")) return "de";
    if (nav.startsWith("zh-hk") || nav.startsWith("zh-yue") || nav.startsWith("yue")) return "yue";
    if (nav.startsWith("zh")) return "zh";
    if (nav.startsWith("ru")) return "ru";
    return "en";
  });

  function setLang(l: LangCode) {
    setLangState(l);
    localStorage.setItem("lang", l);
  }

  const langMeta = LANGUAGES.find(l => l.code === lang)!;
  const rtl = langMeta?.rtl ?? false;

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  }, [lang, rtl]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang], rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
