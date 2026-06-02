"use client";

import { useT, type Localized } from "@/lib/i18n";

export function SectionHeading({
  label,
  title,
  sub,
}: {
  label: Localized;
  title: Localized;
  sub: Localized;
}) {
  const { t } = useT();
  return (
    <div className="mb-7 max-w-2xl">
      <span className="section-label">
        <span className="h-px w-6 bg-neon-lime" />
        {t(label)}
      </span>
      <h2 className="heading-xl text-3xl text-white sm:text-4xl">{t(title)}</h2>
      <p className="mt-2 text-white/55">{t(sub)}</p>
    </div>
  );
}
