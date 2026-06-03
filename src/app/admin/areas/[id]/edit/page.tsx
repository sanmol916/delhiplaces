import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { AreaForm, type AreaValues } from "@/components/admin/area-form";

export const metadata: Metadata = { title: "Edit area", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditAreaPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const a = await db.area.findUnique({ where: { id: params.id } });
  if (!a) notFound();

  const values: AreaValues = {
    id: a.id,
    slug: a.slug,
    nameEn: a.nameEn,
    nameHi: a.nameHi,
    taglineEn: a.taglineEn,
    taglineHi: a.taglineHi,
    blurbEn: a.blurbEn,
    blurbHi: a.blurbHi,
    accent: a.accent,
    heroImage: a.heroImage,
    mapQuery: a.mapQuery,
    modulesCsv: a.modulesCsv,
    statsJson: a.statsJson,
    tickerJson: a.tickerJson,
    published: a.published,
    sortOrder: a.sortOrder,
  };

  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-white/45">
        <Link href="/admin" className="hover:text-white">Admin</Link>
        <span className="mx-1.5">/</span>
        <span>Edit {a.nameEn}</span>
      </nav>
      <h1 className="heading-xl mb-6 text-2xl font-bold text-white">Edit: {a.nameEn}</h1>
      <AreaForm values={values} />
    </div>
  );
}
