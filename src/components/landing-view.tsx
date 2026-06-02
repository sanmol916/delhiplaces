"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ui } from "@/lib/dictionary";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { areas, accentTheme } from "@/lib/areas";
import { cn } from "@/lib/utils";

export function LandingView() {
  const { t } = useT();

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-grad-brand opacity-30 blur-[100px]" />
        <div className="container-page py-20 text-center lg:py-28">
          <Reveal>
            <span className="chip mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-lime" />
              Delhi · हाइपरलोकल
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="heading-xl mx-auto mt-5 max-w-4xl text-6xl leading-[1.02] text-white sm:text-7xl lg:text-8xl">
              Your <span className="gradient-text">mohalla</span>,
              <br />
              <span className="gradient-text-lime">alive</span> online.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
              {t(ui.brandTagline)} {t(ui.joinSub)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Choose area */}
      <section className="container-page pb-24">
        <Reveal>
          <h2 className="section-label justify-center text-center">
            <span className="h-px w-6 bg-neon-lime" />
            {t(ui.chooseArea)}
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {areas.map((area, i) => {
            const th = accentTheme[area.accent];
            return (
              <Reveal key={area.slug} delay={i * 0.08}>
                <Link
                  href={`/${area.slug}`}
                  className="group relative block overflow-hidden rounded-[2rem] border border-white/10"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={area.heroImage}
                      alt={t(area.name)}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="flex items-center gap-1.5 text-sm text-white/60">
                      <MapPin className="h-4 w-4" /> {t(area.tagline)}
                    </p>
                    <h3 className="heading-xl mt-1 text-4xl text-white">
                      <span className={cn("bg-clip-text text-transparent", th.gradient)}>
                        {t(area.name)}
                      </span>
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-4">
                        {area.stats.slice(0, 2).map((s) => (
                          <div key={s.label.en}>
                            <p className={cn("text-lg font-bold heading-xl", th.text)}>{s.value}</p>
                            <p className="text-[11px] uppercase tracking-wide text-white/45">{t(s.label)}</p>
                          </div>
                        ))}
                      </div>
                      <span className={cn("flex h-12 w-12 items-center justify-center rounded-full text-ink transition group-hover:scale-110", th.gradient)}>
                        <ArrowUpRight className="h-6 w-6" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
