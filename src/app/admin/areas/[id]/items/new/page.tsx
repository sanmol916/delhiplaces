import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { ItemForm } from "@/components/admin/item-form";

export const metadata: Metadata = { title: "New item", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function NewItemPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const area = await db.area.findUnique({ where: { id: params.id } });
  if (!area) notFound();

  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-white/45">
        <Link href="/admin" className="hover:text-white">Admin</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/admin/areas/${area.id}`} className="hover:text-white">{area.nameEn}</Link>
        <span className="mx-1.5">/</span>
        <span>New item</span>
      </nav>
      <h1 className="heading-xl mb-6 text-2xl font-bold text-white">Add item to {area.nameEn}</h1>
      <ItemForm areaId={area.id} />
    </div>
  );
}
