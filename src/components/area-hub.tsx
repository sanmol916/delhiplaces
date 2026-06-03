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
import {
  accentTheme,
  type ModuleKey,
  type Rental,
  type Spot,
  type NewsItem,
  type EventItem,
  type LostFound,
  type Business,
  type Influencer,
  type School,
  type Hospital,
  type Police,
  type Atm,
  type Alert,
} from "@/lib/areas";
import type { AreaContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const GRID_2 = "grid gap-4 sm:grid-cols-2";
const GRID_3 = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";

function ModuleBlock({ content, k }: { content: AreaContent; k: ModuleKey }) {
  const { t } = useT();
  const copy = sections[k];
  const list = content.items[k] ?? [];
  let body: React.ReactNode = null;

  switch (k) {
    case "alerts":
      if (!list.length) return null;
      body = (
        <div className={GRID_2}>
          {(list as Alert[]).map((a) => <AlertCard key={a.id} item={a} />)}
        </div>
      );
      break;
    case "advertiser":
      if (!content.advertiser) return null;
      body = <AdvertiserCard item={content.advertiser} />;
      break;
    case "rentals":
    case "pg":
      if (!list.length) return null;
      body = (
        <div className={GRID_3}>
          {(list as Rental[]).map((r) => (
            <RentalCard key={r.id} item={r} accent={content.meta.accent} />
          ))}
        </div>
      );
      break;
    case "institutes":
    case "openings":
      if (!list.length) return null;
      body = (
        <div className={GRID_3}>
          {(list as Spot[]).map((s) => <OpeningCard key={s.id} item={s} />)}
        </div>
      );
      break;
    case "news":
      if (!list.length) return null;
      body = (
        <div className="grid gap-4 lg:grid-cols-2">
          {(list as NewsItem[]).map((n) => <NewsCard key={n.id} item={n} />)}
        </div>
      );
      break;
    case "events":
      if (!list.length) return null;
      body = (
        <div className={GRID_2}>
          {(list as EventItem[]).map((e) => <EventCard key={e.id} item={e} />)}
        </div>
      );
      break;
    case "businesses":
      if (!list.length) return null;
      body = (
        <div className={GRID_3}>
          {(list as Business[]).map((b) => <BusinessCard key={b.id} item={b} />)}
        </div>
      );
      break;
    case "influencers":
      if (!list.length) return null;
      body = (
        <div className={GRID_2}>
          {(list as Influencer[]).map((i) => <InfluencerCard key={i.id} item={i} />)}
        </div>
      );
      break;
    case "lostfound":
      if (!list.length) return null;
      body = (
        <>
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/60">⚠️ {t(ui.lostFoundNote)}</p>
            <button type="button" className="btn-lime shrink-0">
              <Plus className="h-4 w-4" /> {t(ui.reportItem)}
            </button>
          </div>
          <div className={GRID_2}>
            {(list as LostFound[]).map((l) => <LostFoundCard key={l.id} item={l} />)}
          </div>
        </>
      );
      break;
    case "schools":
      if (!list.length) return null;
      body = (
        <div className={GRID_2}>
          {(list as School[]).map((s) => <SchoolCard key={s.id} item={s} />)}
        </div>
      );
      break;
    case "hospitals":
      if (!list.length) return null;
      body = (
        <div className={GRID_2}>
          {(list as Hospital[]).map((h) => <HospitalCard key={h.id} item={h} />)}
        </div>
      );
      break;
    case "police":
      if (!list.length) return null;
      body = (
        <div className={GRID_2}>
          {(list as Police[]).map((p) => <PoliceCard key={p.id} item={p} />)}
        </div>
      );
      break;
    case "atms":
      if (!list.length) return null;
      body = (
        <div className={GRID_3}>
          {(list as Atm[]).map((a) => <AtmCard key={a.id} item={a} />)}
        </div>
      );
      break;
    case "map":
      body = <MapEmbed query={content.meta.mapQuery} />;
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

export function AreaHub({ content }: { content: AreaContent }) {
  const { t } = useT();
  const { meta } = content;
  const th = accentTheme[meta.accent] ?? accentTheme.violet;

  return (
    <>
      <Header area={{ name: meta.name }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-neon-lime" />
              {t(meta.tagline)}
            </span>
            <h1 className="heading-xl mt-4 text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              <span className={cn("bg-clip-text text-transparent", th.gradient)}>
                {t(meta.name)}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/60">{t(meta.blurb)}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#rentals" className="btn-grad">
                {t(ui.exploreArea)} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#join" className="btn-outline">
                {t(ui.joinCommunity)}
              </a>
            </div>

            {meta.stats.length > 0 && (
              <dl className="mt-10 grid grid-cols-4 gap-3">
                {meta.stats.map((s, i) => (
                  <div key={i} className="glass px-3 py-4 text-center">
                    <dt className={cn("text-2xl font-bold heading-xl", th.text)}>{s.value}</dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-wide text-white/45">
                      {t(s.label)}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-glow lg:animate-float">
              <Image src={meta.heroImage} alt={t(meta.name)} fill priority sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {meta.ticker.length > 0 && <NewsTicker items={meta.ticker} />}

      {/* Modules, ordered per area */}
      <div className="container-page space-y-20 py-20">
        {meta.modules.map((k) => (
          <ModuleBlock key={k} content={content} k={k} />
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
