"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ui } from "@/lib/dictionary";
import { LanguageToggle } from "@/components/language-toggle";
import type { Area } from "@/lib/areas";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-grad-brand text-lg font-black text-white shadow-glow">
        M
      </span>
      <span className="text-lg font-bold heading-xl tracking-tight text-white">
        Mohalla
      </span>
    </Link>
  );
}

const NAV = [
  { href: "#rentals", label: ui.navRentals },
  { href: "#news", label: ui.navNews },
  { href: "#openings", label: ui.navOpenings },
  { href: "#events", label: ui.navEvents },
  { href: "#lostfound", label: ui.navLostFound },
  { href: "#businesses", label: ui.navBusinesses },
];

export function Header({ area }: { area?: Area }) {
  const { t } = useT();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo />
          {area && (
            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/80 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-lime" />
              {t(area.name)}
            </span>
          )}
        </div>

        {area && (
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                {t(n.label)}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {area && (
            <Link
              href="/"
              className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/70 hover:text-white sm:flex"
            >
              <ChevronLeft className="h-4 w-4" />
              {t(ui.backToAreas)}
            </Link>
          )}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
