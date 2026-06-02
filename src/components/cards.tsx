"use client";

import Image from "next/image";
import { MapPin, Star, Phone, ArrowUpRight, Clock, Search, PackageCheck } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ui } from "@/lib/dictionary";
import { formatINR, cn } from "@/lib/utils";
import type {
  Rental,
  NewsItem,
  Spot,
  EventItem,
  LostFound,
  Business,
  Accent,
} from "@/lib/areas";
import { accentTheme } from "@/lib/areas";

export function RentalCard({ item, accent }: { item: Rental; accent: Accent }) {
  const { t } = useT();
  const th = accentTheme[accent];
  return (
    <div className="group glass overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={item.image} alt={t(item.title)} fill sizes="33vw" className="object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        {item.tag && (
          <span className={cn("absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-ink", th.gradient)}>
            {t(item.tag)}
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-white/60">{t(item.type)}</p>
            <p className="text-2xl font-bold heading-xl text-white">
              {formatINR(item.price)}
              <span className="text-sm font-medium text-white/60">{t(ui.perMonth)}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <h3 className="font-semibold text-white">{t(item.title)}</h3>
        <ArrowUpRight className={cn("h-5 w-5 shrink-0", th.text)} />
      </div>
    </div>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const { t } = useT();
  return (
    <article className="group glass flex gap-4 overflow-hidden p-3 transition hover:bg-white/[0.07]">
      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl">
        <Image src={item.image} alt={t(item.title)} fill sizes="120px" className="object-cover transition duration-500 group-hover:scale-110" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-neon-violet/20 px-2 py-0.5 font-semibold text-neon-fuchsia">{t(item.category)}</span>
          <span className="flex items-center gap-1 text-white/40"><Clock className="h-3 w-3" />{t(item.time)}</span>
        </div>
        <h3 className="mt-1 font-semibold leading-snug text-white">{t(item.title)}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/55">{t(item.summary)}</p>
      </div>
    </article>
  );
}

export function OpeningCard({ item }: { item: Spot }) {
  const { t } = useT();
  return (
    <div className="group glass overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={item.image} alt={t(item.name)} fill sizes="33vw" className="object-cover transition duration-500 group-hover:scale-110" />
        <span className="absolute right-3 top-3 rounded-full bg-neon-lime px-3 py-1 text-xs font-bold text-ink shadow-glow-lime">
          ✦ {t(item.kind)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold heading-xl text-white">{t(item.name)}</h3>
        <p className="mt-1 text-sm text-white/55">{t(item.blurb)}</p>
      </div>
    </div>
  );
}

export function EventCard({ item }: { item: EventItem }) {
  const { t } = useT();
  return (
    <div className="group relative overflow-hidden rounded-3xl">
      <Image src={item.image} alt={t(item.name)} fill sizes="50vw" className="object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="relative flex h-64 flex-col justify-end p-5">
        <span className="chip mb-2 w-fit bg-grad-brand text-white">{t(item.date)}</span>
        <h3 className="text-xl font-bold heading-xl text-white">{t(item.name)}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
          <MapPin className="h-4 w-4" />{t(item.venue)}
        </p>
      </div>
    </div>
  );
}

export function LostFoundCard({ item }: { item: LostFound }) {
  const { t } = useT();
  const isLost = item.kind === "lost";
  return (
    <div className="glass flex items-start gap-3 p-4">
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
          isLost ? "bg-neon-fuchsia/20 text-neon-fuchsia" : "bg-neon-lime/20 text-neon-lime",
        )}
      >
        {isLost ? <Search className="h-5 w-5" /> : <PackageCheck className="h-5 w-5" />}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              isLost ? "bg-neon-fuchsia/20 text-neon-fuchsia" : "bg-neon-lime/20 text-neon-lime",
            )}
          >
            {t(isLost ? ui.lost : ui.found)}
          </span>
          <span className="text-xs text-white/40">{t(item.time)}</span>
        </div>
        <h3 className="mt-1 font-semibold text-white">{t(item.title)}</h3>
        <p className="text-sm text-white/55">{t(item.detail)}</p>
        <a
          href={`tel:${item.contact.replace(/[^\d+]/g, "")}`}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-neon-cyan hover:underline"
        >
          <Phone className="h-3 w-3" /> {item.contact}
        </a>
      </div>
    </div>
  );
}

export function BusinessCard({ item }: { item: Business }) {
  const { t } = useT();
  return (
    <div className="glass flex items-center justify-between gap-3 p-4">
      <div>
        <h3 className="font-semibold text-white">{t(item.name)}</h3>
        <p className="text-xs text-white/50">{t(item.category)}</p>
      </div>
      <div className="text-right">
        <span className="flex items-center justify-end gap-1 text-sm font-bold text-neon-lime">
          <Star className="h-4 w-4 fill-neon-lime" />
          {item.rating}
        </span>
        <span className="flex items-center justify-end gap-1 text-xs text-white/50">
          <Phone className="h-3 w-3" />
          {item.phone}
        </span>
      </div>
    </div>
  );
}
