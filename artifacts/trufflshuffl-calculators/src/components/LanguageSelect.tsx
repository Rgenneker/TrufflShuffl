import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES, type LangCode } from "@/lib/i18n";
import { useLang } from "@/context/LanguageContext";

interface Props {
  className?: string;
}

export function LanguageSelect({ className }: Props) {
  const { lang, setLang } = useLang();
  const current = LANGUAGES.find(l => l.code === lang)!;

  return (
    <Select value={lang} onValueChange={v => setLang(v as LangCode)}>
      <SelectTrigger
        className={`h-8 text-xs gap-1.5 bg-transparent border-border hover:border-primary/50 transition-colors ${className ?? ""}`}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <SelectValue>
          <span className="hidden sm:inline">{current.flag} {current.label}</span>
          <span className="sm:hidden">{current.flag}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-72 min-w-[200px]">
        {LANGUAGES.map(l => (
          <SelectItem key={l.code} value={l.code}>
            <span className="flex items-center gap-2">
              <span>{l.flag}</span>
              <span className="font-medium">{l.label}</span>
              {l.label !== l.labelEn && (
                <span className="text-muted-foreground text-xs">— {l.labelEn}</span>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
