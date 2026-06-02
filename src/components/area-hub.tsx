"use client";

import Image from "next/image";
import { ArrowRight, Sparkles, Plus } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ui, sections } from "@/lib/dictionary";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NewsTicker } from "@/components/news-ticker";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { MapEmbed } from "@/components/map-embed";
import {
  RentalCard,
  NewsCard,
  OpeningCard,
  EventCard,
  LostFoundCard,
  BusinessCard,
} from "@/components/cards";
import {
  AdvertiserCard,
  AlertCard,
  SchoolCard,
  HospitalCard,
  PoliceCard,
  AtmCard,
  InfluencerCard,
} from "@/components/cards-extra";
import { accentTheme, type Area, type ModuleKey } from "@/lib/areas";
import { cn } from "@/lib/utils";

const GRID_2 = "grid gap-4 sm:grid-cols-2";
const GRID_3 = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";

function ModuleBlock({ area, k }: { area: Area; k: ModuleKey }) {
  const { t } = useT();
  const copy = sections[k];

  let body: React.ReactNode = null;

  switch (k) {
    case "alerts":
      if (!area.alerts.length) return null;
      body = (
        <div className={GRID_2}>
          {area.alerts.map((a) => <AlertCard key={a.id} item={a} />)}
        </div>
      );
      break;
    case "advertiser":
      body = <AdvertiserCard item={area.advertiser} />;
      break;
    case "rentals":
      body = (
        <div className={GRID_3}>
          {area.rentals.map((r) => <RentalCard key={r.id} item={r} accent={area.accent} />)}
        </div>
      );
      break;
    case "pg":
      if (!area.pgs?.length) return null;
      body = (
        <div className={GRID_3}>
          {area.pgs.map((r) => <RentalCard key={r.id} item={r} accent={area.accent} />)}
        </div>
      );
      break;
    case "institutes":
      if (!area.institutes?.length) return null;
      body = (
        <div className={GRID_3}>
          {area.institutes.map((s) => <OpeningCard key={s.id} item={s} />)}
        </div>
      );
      break;
    case "news":
      body = (
        <div className="grid gap-4 lg:grid-cols-2">
          {area.news.map((n) => <NewsCard key={n.id} item={n} />)}
        </div>
      );
      break;
    case "openings":
      body = (
        <div className={GRID_2}>
          {area.openings.map((o) => <OpeningCard key={o.id} item={o} />)}
        </div>
      );
      break;
    case "events":
      body = (
        <div className={GRID_2}>
          {area.events.map((e) => <EventCard key={e.id} item={e} />)}
        </div>
      );
      break;
    case "businesses":
      body = (
        <div className={GRID_3}>
          {area.businesses.map((b) => <BusinessCard key={b.id} item={b} />)}
        </div>
      );
      break;
    case "influencers":
      body = (
        <div className={GRID_2}>
          {area.influencers.map((i) => <InfluencerCard key={i.id} item={i} />)}
        </div>
      );
      break;
    case "lostfound":
      body = (
        <>
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/60">⚠️ {t(ui.lostFoundNote)}</p>
            <button type="button" className="btn-lime shrink-0">
              <Plus className="h-4 w-4" /> {t(ui.reportItem)}
            </button>
          </div>
          <div className={GRID_2}>
            {area.lostFound.map((l) => <LostFoundCard key={l.id} item={l} />)}
          </div>
        </>
      );
      break;
    case "schools":
      body = (
        <div className={GRID_2}>
          {area.schools.map((s) => <SchoolCard key={s.id} item={s} />)}
        </div>
      );
      break;
    case "hospitals":
      body = (
        <div className={GRID_2}>
          {area.hospitals.map((h) => <HospitalCard key={h.id} item={h} />)}
        </div>
      );
      break;
    case "police":
      body = (
        <div className={GRID_2}>
          {area.police.map((p) => <PoliceCard key={p.id} item={p} />)}
        </div>
      );
      break;
    case "atms":
      body = (
        <div className={GRID_3}>
          {area.atms.map((a) => <AtmCard key={a.id} item={a} />)}
        </div>
      );
      break;
    case "map":
      body = <MapEmbed query={area.mapQuery} />;
      break;
  }

  if (!body) return null;

  return (
    <section id={k} className="scroll-mt-24">
      <Reveal>
        <SectionHeading label={copy.label} title={copy.title} sub={copy.sub} />
      </Reveal>
      <Reveal delay={0.05}>{body}</Reveal>
    </section>
  );
}

export function AreaHub({ area }: { area: Area }) {
  const { t } = useT();
  const th = accentTheme[area.accent];

  return (
    <>
      <Header area={area} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-neon-lime" />
              {t(area.tagline)}
            </span>
            <h1 className="heading-xl mt-4 text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              <span className={cn("bg-clip-text text-transparent", th.gradient)}>
                {t(area.name)}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/60">{t(area.blurb)}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#rentals" className="btn-grad">
                {t(ui.exploreArea)} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#join" className="btn-outline">
                {t(ui.joinCommunity)}
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-4 gap-3">
              {area.stats.map((s) => (
                <div key={s.label.en} className="glass px-3 py-4 text-center">
                  <dt className={cn("text-2xl font-bold heading-xl", th.text)}>{s.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wide text-white/45">
                    {t(s.label)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-glow lg:animate-float">
              <Image src={area.heroImage} alt={t(area.name)} fill priority sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <NewsTicker items={area.ticker} />

      {/* All modules, ordered per area */}
      <div className="container-page space-y-20 py-20">
        {area.modules.map((k) => (
          <ModuleBlock key={k} area={area} k={k} />
        ))}

        {/* Join community */}
        <section id="join" className="scroll-mt-24">
          <div className="glass relative overflow-hidden p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-grad-brand opacity-30 blur-3xl" />
            <h2 className="heading-xl text-3xl text-white sm:text-4xl">{t(ui.joinCommunity)}</h2>
            <p className="mx-auto mt-2 max-w-md text-white/55">{t(ui.joinSub)}</p>
            <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                placeholder={t(ui.emailPlaceholder)}
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-neon-violet focus:outline-none"
              />
              <button type="submit" className="btn-grad">{t(ui.subscribe)}</button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
