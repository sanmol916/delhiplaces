"use client";

import { useT } from "@/lib/i18n";
import { ui } from "@/lib/dictionary";
import { Logo } from "@/components/header";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-white/10 bg-ink/60">
      <div className="container-page flex flex-col items-center gap-4 py-10 text-center">
        <Logo />
        <p className="max-w-md text-sm text-white/55">{t(ui.brandTagline)}</p>
        <p className="text-xs text-white/35">
          {t(ui.footerNote)} · © {new Date().getFullYear()} Mohalla
        </p>
      </div>
    </footer>
  );
}
