import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CURRENCIES, type Currency } from "@/lib/currencies";

interface Props {
  value: Currency;
  onChange: (c: Currency) => void;
  className?: string;
}

export function CurrencySelect({ value, onChange, className }: Props) {
  return (
    <Select
      value={value.code}
      onValueChange={code => {
        const c = CURRENCIES.find(c => c.code === code);
        if (c) onChange(c);
      }}
    >
      <SelectTrigger className={className} data-testid="select-currency">
        <SelectValue>
          <span className="font-mono font-semibold text-primary">{value.code}</span>
          <span className="text-muted-foreground ml-1 text-xs">{value.symbol}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {CURRENCIES.map(c => (
          <SelectItem key={c.code} value={c.code}>
            <span className="font-mono font-semibold">{c.code}</span>
            <span className="text-muted-foreground ml-2 text-xs">{c.symbol} — {c.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
