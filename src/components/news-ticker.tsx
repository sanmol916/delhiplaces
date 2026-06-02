"use client";

import { Radio } from "lucide-react";
import { useT, type Localized } from "@/lib/i18n";
import { ui } from "@/lib/dictionary";

export function NewsTicker({ items }: { items: Localized[] }) {
  const { t } = useT();
  const loop = [...items, ...items];

  return (
    <div className="flex items-stretch overflow-hidden border-y border-white/10 bg-white/[0.03]">
      <div className="z-10 flex shrink-0 items-center gap-2 bg-grad-brand px-4 text-xs font-bold uppercase tracking-widest text-white">
        <Radio className="h-4 w-4 animate-pulse" />
        {t(ui.liveNow)}
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap py-2.5 pl-10">
          {loop.map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-lime" />
              {t(item)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
