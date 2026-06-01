import { useState, useEffect } from "react";

const ZONES = [
  { city: "Johannesburg", tz: "Africa/Johannesburg", abbr: "SAST" },
  { city: "London", tz: "Europe/London", abbr: "GMT/BST" },
  { city: "New York", tz: "America/New_York", abbr: "EST/EDT" },
  { city: "Dubai", tz: "Asia/Dubai", abbr: "GST" },
  { city: "Sydney", tz: "Australia/Sydney", abbr: "AEST" },
  { city: "Tokyo", tz: "Asia/Tokyo", abbr: "JST" },
];

function formatTime(tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).format(new Date());
}

function formatDate(tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz, day: "2-digit", month: "short", year: "numeric",
  }).format(new Date());
}

export function WorldClock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full overflow-x-auto" data-testid="world-clock">
      <div className="flex gap-3 min-w-max px-1 pb-1 justify-center flex-wrap">
        {ZONES.map((z) => (
          <div
            key={z.city}
            className="flex flex-col items-center bg-card border border-border rounded-xl px-5 py-4 min-w-[130px] shadow-sm"
            data-testid={`clock-${z.city.toLowerCase().replace(" ", "-")}`}
          >
            <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-1">{z.city}</span>
            <span className="font-mono text-2xl font-bold text-primary tabular-nums leading-none">
              {formatTime(z.tz)}
            </span>
            <span className="text-xs text-muted-foreground mt-1">{formatDate(z.tz)}</span>
            <span className="text-xs font-medium text-accent mt-0.5">{z.abbr}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
