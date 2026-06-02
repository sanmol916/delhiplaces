"use client";

import { Languages } from "lucide-react";
import { LOCALES, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { locale, setLocale } = useT();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      <Languages className="ml-1.5 h-4 w-4 text-white/50" aria-hidden />
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold transition",
            locale === l.code
              ? "bg-grad-brand text-white shadow-glow"
              : "text-white/60 hover:text-white",
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
