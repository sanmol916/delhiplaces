import type { Item } from "@prisma/client";
import { db } from "@/lib/db";
import type { Localized } from "@/lib/i18n";
import type {
  ModuleKey,
  Accent,
  Stat,
  Rental,
  Spot,
  NewsItem,
  EventItem,
  LostFound,
  Business,
  Influencer,
  School,
  Hospital,
  Police,
  Atm,
  Alert,
  Advertiser,
} from "@/lib/areas";

export interface AreaMeta {
  slug: string;
  name: Localized;
  tagline: Localized;
  blurb: Localized;
  accent: Accent;
  heroImage: string;
  mapQuery: string;
  modules: ModuleKey[];
  stats: Stat[];
  ticker: Localized[];
}

export interface AreaContent {
  meta: AreaMeta;
  items: Record<string, unknown[]>;
  advertiser?: Advertiser;
}

const L = (en: string, hi: string): Localized => ({ en, hi: hi || en });

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function parseModules(csv: string): ModuleKey[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as ModuleKey[];
}

/* -------------------- per-kind mappers: Item row -> view-model -------------------- */

function mapItem(kind: string, it: Item): unknown {
  switch (kind) {
    case "rentals":
    case "pg":
      return {
        id: it.id,
        title: L(it.nameEn, it.nameHi),
        type: L(it.secEn, it.secHi),
        price: it.price ?? 0,
        image: it.image ?? "",
        tag: it.extraEn ? L(it.extraEn, it.extraHi) : undefined,
      } satisfies Rental;
    case "institutes":
    case "openings":
      return {
        id: it.id,
        name: it.nameEn,
        kind: L(it.secEn, it.secHi),
        blurb: L(it.descEn, it.descHi),
        image: it.image ?? "",
      } satisfies Spot;
    case "news":
      return {
        id: it.id,
        title: L(it.nameEn, it.nameHi),
        summary: L(it.descEn, it.descHi),
        category: L(it.secEn, it.secHi),
        time: L(it.extraEn, it.extraHi),
        image: it.image ?? "",
      } satisfies NewsItem;
    case "events":
      return {
        id: it.id,
        name: L(it.nameEn, it.nameHi),
        date: L(it.extraEn, it.extraHi),
        venue: L(it.secEn, it.secHi),
        image: it.image ?? "",
      } satisfies EventItem;
    case "lostfound":
      return {
        id: it.id,
        kind: it.meta === "found" ? "found" : "lost",
        title: L(it.nameEn, it.nameHi),
        detail: L(it.descEn, it.descHi),
        time: L(it.extraEn, it.extraHi),
        contact: it.phone ?? "",
      } satisfies LostFound;
    case "businesses":
      return {
        id: it.id,
        name: it.nameEn,
        category: L(it.secEn, it.secHi),
        rating: it.rating ?? 0,
        phone: it.phone ?? "",
      } satisfies Business;
    case "influencers":
      return {
        id: it.id,
        name: it.nameEn,
        handle: it.meta ?? "",
        niche: L(it.secEn, it.secHi),
        followers: it.meta2 ?? "",
        image: it.image ?? "",
      } satisfies Influencer;
    case "schools":
      return {
        id: it.id,
        name: it.nameEn,
        board: it.meta ?? "",
        rating: it.rating ?? 0,
        tag: it.extraEn ? L(it.extraEn, it.extraHi) : undefined,
      } satisfies School;
    case "hospitals":
      return {
        id: it.id,
        name: it.nameEn,
        type: L(it.secEn, it.secHi),
        emergency: it.flag,
        phone: it.phone ?? "",
      } satisfies Hospital;
    case "police":
      return {
        id: it.id,
        name: it.nameEn,
        address: L(it.secEn, it.secHi),
        phone: it.phone ?? "",
      } satisfies Police;
    case "atms":
      return {
        id: it.id,
        bank: it.nameEn,
        location: L(it.secEn, it.secHi),
        is24x7: it.flag,
      } satisfies Atm;
    case "alerts":
      return {
        id: it.id,
        kind: it.meta === "water" ? "water" : "power",
        block: L(it.secEn, it.secHi),
        window: L(it.extraEn, it.extraHi),
        status: (["ongoing", "scheduled", "resolved"].includes(it.meta2 ?? "")
          ? it.meta2
          : "scheduled") as Alert["status"],
      } satisfies Alert;
    case "advertiser":
      return {
        name: it.nameEn,
        category: L(it.secEn, it.secHi),
        tagline: L(it.descEn, it.descHi),
        offer: L(it.extraEn, it.extraHi),
        image: it.image ?? "",
      } satisfies Advertiser;
    default:
      return null;
  }
}

function metaFromArea(a: {
  slug: string;
  nameEn: string;
  nameHi: string;
  taglineEn: string;
  taglineHi: string;
  blurbEn: string;
  blurbHi: string;
  accent: string;
  heroImage: string;
  mapQuery: string;
  modulesCsv: string;
  statsJson: string;
  tickerJson: string;
}): AreaMeta {
  return {
    slug: a.slug,
    name: L(a.nameEn, a.nameHi),
    tagline: L(a.taglineEn, a.taglineHi),
    blurb: L(a.blurbEn, a.blurbHi),
    accent: a.accent as Accent,
    heroImage: a.heroImage,
    mapQuery: a.mapQuery,
    modules: parseModules(a.modulesCsv),
    stats: parseJson<Stat[]>(a.statsJson, []),
    ticker: parseJson<Localized[]>(a.tickerJson, []),
  };
}

/* -------------------------------- public queries -------------------------------- */

export async function getAreasMeta(): Promise<AreaMeta[]> {
  try {
    const rows = await db.area.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map(metaFromArea);
  } catch (e) {
    console.error("[content] getAreasMeta failed:", e);
    return [];
  }
}

export async function getAreaContent(slug: string): Promise<AreaContent | null> {
  try {
    const area = await db.area.findUnique({
      where: { slug },
      include: {
        items: {
          where: { published: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        },
      },
    });
    if (!area || !area.published) return null;

    const items: Record<string, unknown[]> = {};
    let advertiser: Advertiser | undefined;

    for (const it of area.items) {
      const mapped = mapItem(it.kind, it);
      if (!mapped) continue;
      if (it.kind === "advertiser") {
        if (!advertiser) advertiser = mapped as Advertiser;
        continue;
      }
      (items[it.kind] ??= []).push(mapped);
    }

    return { meta: metaFromArea(area), items, advertiser };
  } catch (e) {
    console.error("[content] getAreaContent failed:", e);
    return null;
  }
}

export async function getAreaSlugs(): Promise<string[]> {
  try {
    const rows = await db.area.findMany({ select: { slug: true } });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}
