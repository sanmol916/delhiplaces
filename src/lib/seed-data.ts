import { Prisma, type PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { areas, type Area, type Rental, type Spot } from "@/lib/areas";

type SeedItem = Omit<Prisma.ItemCreateManyInput, "areaId">;

function rental(kind: string, x: Rental, i: number): SeedItem {
  return {
    kind,
    sortOrder: i,
    nameEn: x.title.en,
    nameHi: x.title.hi,
    secEn: x.type.en,
    secHi: x.type.hi,
    price: x.price,
    image: x.image,
    ...(x.tag ? { extraEn: x.tag.en, extraHi: x.tag.hi } : {}),
  };
}

function spot(kind: string, x: Spot, i: number): SeedItem {
  return {
    kind,
    sortOrder: i,
    nameEn: x.name,
    nameHi: x.name,
    secEn: x.kind.en,
    secHi: x.kind.hi,
    descEn: x.blurb.en,
    descHi: x.blurb.hi,
    image: x.image,
  };
}

function buildItems(a: Area): SeedItem[] {
  const out: SeedItem[] = [];

  a.alerts.forEach((x, i) =>
    out.push({
      kind: "alerts",
      sortOrder: i,
      nameEn: x.block.en,
      nameHi: x.block.hi,
      secEn: x.block.en,
      secHi: x.block.hi,
      extraEn: x.window.en,
      extraHi: x.window.hi,
      meta: x.kind,
      meta2: x.status,
    }),
  );

  out.push({
    kind: "advertiser",
    sortOrder: 0,
    nameEn: a.advertiser.name,
    nameHi: a.advertiser.name,
    secEn: a.advertiser.category.en,
    secHi: a.advertiser.category.hi,
    descEn: a.advertiser.tagline.en,
    descHi: a.advertiser.tagline.hi,
    extraEn: a.advertiser.offer.en,
    extraHi: a.advertiser.offer.hi,
    image: a.advertiser.image,
  });

  a.rentals.forEach((x, i) => out.push(rental("rentals", x, i)));
  (a.pgs ?? []).forEach((x, i) => out.push(rental("pg", x, i)));
  (a.institutes ?? []).forEach((x, i) => out.push(spot("institutes", x, i)));
  a.openings.forEach((x, i) => out.push(spot("openings", x, i)));

  a.news.forEach((x, i) =>
    out.push({
      kind: "news",
      sortOrder: i,
      nameEn: x.title.en,
      nameHi: x.title.hi,
      descEn: x.summary.en,
      descHi: x.summary.hi,
      secEn: x.category.en,
      secHi: x.category.hi,
      extraEn: x.time.en,
      extraHi: x.time.hi,
      image: x.image,
    }),
  );

  a.events.forEach((x, i) =>
    out.push({
      kind: "events",
      sortOrder: i,
      nameEn: x.name.en,
      nameHi: x.name.hi,
      secEn: x.venue.en,
      secHi: x.venue.hi,
      extraEn: x.date.en,
      extraHi: x.date.hi,
      image: x.image,
    }),
  );

  a.businesses.forEach((x, i) =>
    out.push({
      kind: "businesses",
      sortOrder: i,
      nameEn: x.name,
      secEn: x.category.en,
      secHi: x.category.hi,
      rating: x.rating,
      phone: x.phone,
    }),
  );

  a.influencers.forEach((x, i) =>
    out.push({
      kind: "influencers",
      sortOrder: i,
      nameEn: x.name,
      secEn: x.niche.en,
      secHi: x.niche.hi,
      meta: x.handle,
      meta2: x.followers,
      image: x.image,
    }),
  );

  a.lostFound.forEach((x, i) =>
    out.push({
      kind: "lostfound",
      sortOrder: i,
      nameEn: x.title.en,
      nameHi: x.title.hi,
      descEn: x.detail.en,
      descHi: x.detail.hi,
      extraEn: x.time.en,
      extraHi: x.time.hi,
      meta: x.kind,
      phone: x.contact,
    }),
  );

  a.schools.forEach((x, i) =>
    out.push({
      kind: "schools",
      sortOrder: i,
      nameEn: x.name,
      meta: x.board,
      rating: x.rating,
      ...(x.tag ? { extraEn: x.tag.en, extraHi: x.tag.hi } : {}),
    }),
  );

  a.hospitals.forEach((x, i) =>
    out.push({
      kind: "hospitals",
      sortOrder: i,
      nameEn: x.name,
      secEn: x.type.en,
      secHi: x.type.hi,
      flag: x.emergency,
      phone: x.phone,
    }),
  );

  a.police.forEach((x, i) =>
    out.push({
      kind: "police",
      sortOrder: i,
      nameEn: x.name,
      secEn: x.address.en,
      secHi: x.address.hi,
      phone: x.phone,
    }),
  );

  a.atms.forEach((x, i) =>
    out.push({
      kind: "atms",
      sortOrder: i,
      nameEn: x.bank,
      secEn: x.location.en,
      secHi: x.location.hi,
      flag: x.is24x7,
    }),
  );

  return out;
}

/**
 * Idempotent seed: admin user + both areas + all their content items.
 * Re-running refreshes the seeded content (it replaces items for seeded areas).
 */
export async function runSeed(db: PrismaClient) {
  const email = (process.env.ADMIN_EMAIL || "admin@mohalla.app").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe!2024";
  const passwordHash = await bcrypt.hash(password, 12);

  await db.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Site Admin", role: "superadmin" },
  });

  for (let i = 0; i < areas.length; i++) {
    const a = areas[i];
    const meta = {
      nameEn: a.name.en,
      nameHi: a.name.hi,
      taglineEn: a.tagline.en,
      taglineHi: a.tagline.hi,
      blurbEn: a.blurb.en,
      blurbHi: a.blurb.hi,
      accent: a.accent,
      heroImage: a.heroImage,
      mapQuery: a.mapQuery,
      modulesCsv: a.modules.join(","),
      statsJson: JSON.stringify(a.stats),
      tickerJson: JSON.stringify(a.ticker),
      published: true,
      sortOrder: i,
    };

    const area = await db.area.upsert({
      where: { slug: a.slug },
      update: meta,
      create: { slug: a.slug, ...meta },
    });

    // Replace seeded items for a clean, repeatable seed.
    await db.item.deleteMany({ where: { areaId: area.id } });
    const items = buildItems(a).map((it) => ({ ...it, areaId: area.id }));
    if (items.length) await db.item.createMany({ data: items });
  }

  return { admin: email, areas: areas.length };
}
