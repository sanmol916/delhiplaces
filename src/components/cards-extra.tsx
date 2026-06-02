"use client";

import Image from "next/image";
import {
  Zap,
  Droplets,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  Banknote,
  Star,
  Phone,
  BadgeCheck,
  Megaphone,
  Instagram,
  Clock3,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { ui } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import type {
  Advertiser,
  Alert,
  School,
  Hospital,
  Police,
  Atm,
  Influencer,
} from "@/lib/areas";

/* ----------------------------- Advertiser of the day ----------------------------- */
export function AdvertiserCard({ item }: { item: Advertiser }) {
  const { t } = useT();
  return (
    <div className="glass relative grid overflow-hidden md:grid-cols-2">
      <div className="relative aspect-[16/10] md:aspect-auto">
        <Image src={item.image} alt={item.name} fill sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-grad-brand px-3 py-1 text-xs font-bold text-white shadow-glow">
          <Megaphone className="h-3.5 w-3.5" /> {t(ui.sponsored)}
        </span>
      </div>
      <div className="flex flex-col justify-center gap-2 p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-neon-lime">
          {t(ui.advertiserOfDay)}
        </span>
        <h3 className="heading-xl text-2xl text-white">{item.name}</h3>
        <p className="text-sm text-white/55">{t(item.category)}</p>
        <p className="text-white/75">{t(item.tagline)}</p>
        <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-2xl border border-neon-lime/30 bg-neon-lime/10 px-4 py-2 text-sm font-bold text-neon-lime">
          🎁 {t(ui.todaysOffer)}: {t(item.offer)}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Power / water alerts ----------------------------- */
const STATUS_STYLE: Record<Alert["status"], string> = {
  ongoing: "bg-neon-fuchsia/20 text-neon-fuchsia",
  scheduled: "bg-amber-400/20 text-amber-300",
  resolved: "bg-neon-lime/20 text-neon-lime",
};
const STATUS_LABEL = {
  ongoing: ui.statusOngoing,
  scheduled: ui.statusScheduled,
  resolved: ui.statusResolved,
} as const;

export function AlertCard({ item }: { item: Alert }) {
  const { t } = useT();
  const isPower = item.kind === "power";
  return (
    <div className="glass flex items-center gap-4 p-4">
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
          isPower ? "bg-amber-400/15 text-amber-300" : "bg-neon-cyan/15 text-neon-cyan",
        )}
      >
        {isPower ? <Zap className="h-6 w-6" /> : <Droplets className="h-6 w-6" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-white">
            {t(isPower ? ui.powerCut : ui.waterCut)}
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", STATUS_STYLE[item.status])}>
            {t(STATUS_LABEL[item.status])}
          </span>
        </div>
        <p className="text-sm text-white/60">{t(item.block)}</p>
      </div>
      <span className="flex items-center gap-1 whitespace-nowrap text-sm text-white/50">
        <Clock3 className="h-4 w-4" /> {t(item.window)}
      </span>
    </div>
  );
}

/* ----------------------------- School ----------------------------- */
export function SchoolCard({ item }: { item: School }) {
  const { t } = useT();
  return (
    <div className="glass flex items-center gap-4 p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neon-violet/15 text-neon-fuchsia">
        <GraduationCap className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">{item.name}</h3>
        <div className="mt-0.5 flex items-center gap-2 text-xs">
          <span className="chip">{item.board}</span>
          {item.tag && <span className="text-neon-lime">{t(item.tag)}</span>}
        </div>
      </div>
      <span className="flex items-center gap-1 text-sm font-bold text-neon-lime">
        <Star className="h-4 w-4 fill-neon-lime" /> {item.rating}
      </span>
    </div>
  );
}

/* ----------------------------- Hospital ----------------------------- */
export function HospitalCard({ item }: { item: Hospital }) {
  const { t } = useT();
  return (
    <div className="glass flex items-center gap-4 p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300">
        <Stethoscope className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">{item.name}</h3>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-white/55">
          <span>{t(item.type)}</span>
          {item.emergency && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2 py-0.5 font-bold text-rose-300">
              ● {t(ui.emergency)}
            </span>
          )}
        </div>
      </div>
      <a href={`tel:${item.phone.replace(/[^\d+]/g, "")}`} className="btn-outline px-3 py-2 text-xs">
        <Phone className="h-3.5 w-3.5" /> {t(ui.callNow)}
      </a>
    </div>
  );
}

/* ----------------------------- Police ----------------------------- */
export function PoliceCard({ item }: { item: Police }) {
  const { t } = useT();
  return (
    <div className="glass flex items-center gap-4 p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neon-cyan/15 text-neon-cyan">
        <ShieldCheck className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">{item.name}</h3>
        <p className="text-sm text-white/55">{t(item.address)}</p>
      </div>
      <a href={`tel:${item.phone}`} className="btn-grad px-4 py-2 text-xs">
        <Phone className="h-3.5 w-3.5" /> {item.phone}
      </a>
    </div>
  );
}

/* ----------------------------- ATM ----------------------------- */
export function AtmCard({ item }: { item: Atm }) {
  const { t } = useT();
  return (
    <div className="glass flex items-center gap-4 p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neon-lime/15 text-neon-lime">
        <Banknote className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">{item.bank}</h3>
        <p className="text-sm text-white/55">{t(item.location)}</p>
      </div>
      {item.is24x7 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-neon-lime/15 px-2.5 py-1 text-[11px] font-bold text-neon-lime">
          <BadgeCheck className="h-3.5 w-3.5" /> {t(ui.open24x7)}
        </span>
      )}
    </div>
  );
}

/* ----------------------------- Influencer ----------------------------- */
export function InfluencerCard({ item }: { item: Influencer }) {
  const { t } = useT();
  return (
    <div className="glass flex items-center gap-4 p-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-neon-violet/40">
        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">{item.name}</h3>
        <p className="flex items-center gap-1 text-sm text-neon-fuchsia">
          <Instagram className="h-3.5 w-3.5" /> {item.handle}
        </p>
        <p className="text-xs text-white/55">{t(item.niche)}</p>
      </div>
      <div className="text-right">
        <p className="heading-xl text-lg font-bold text-white">{item.followers}</p>
        <p className="text-[11px] text-white/45">{t(ui.followers)}</p>
      </div>
    </div>
  );
}
