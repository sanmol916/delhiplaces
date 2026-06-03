import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { ItemForm, type ItemValues } from "@/components/admin/item-form";

export const metadata: Metadata = { title: "Edit item", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditItemPage({
  params,
}: {
  params: { id: string; itemId: string };
}) {
  await requireAdmin();
  const item = await db.item.findUnique({ where: { id: params.itemId } });
  if (!item || item.areaId !== params.id) notFound();
  const area = await db.area.findUnique({ where: { id: params.id } });
  if (!area) notFound();

  const values: ItemValues = {
    id: item.id,
    kind: item.kind,
    nameEn: item.nameEn,
    nameHi: item.nameHi,
    descEn: item.descEn,
    descHi: item.descHi,
    secEn: item.secEn,
    secHi: item.secHi,
    extraEn: item.extraEn,
    extraHi: item.extraHi,
    image: item.image ?? "",
    price: item.price ?? "",
    rating: item.rating ?? "",
    phone: item.phone ?? "",
    meta: item.meta ?? "",
    meta2: item.meta2 ?? "",
    flag: item.flag,
    sortOrder: item.sortOrder,
    published: item.published,
  };

  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-white/45">
        <Link href="/admin" className="hover:text-white">Admin</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/admin/areas/${area.id}`} className="hover:text-white">{area.nameEn}</Link>
        <span className="mx-1.5">/</span>
        <span>Edit item</span>
      </nav>
      <h1 className="heading-xl mb-6 text-2xl font-bold text-white">Edit item</h1>
      <ItemForm areaId={area.id} values={values} />
    </div>
  );
}
