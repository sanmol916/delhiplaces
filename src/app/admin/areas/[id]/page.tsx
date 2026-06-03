import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { deleteItemAction } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Manage content", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function ManageAreaPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const area = await db.area.findUnique({
    where: { id: params.id },
    include: { items: { orderBy: [{ kind: "asc" }, { sortOrder: "asc" }] } },
  });
  if (!area) notFound();

  // Group items by module kind.
  const groups = new Map<string, typeof area.items>();
  for (const it of area.items) {
    if (!groups.has(it.kind)) groups.set(it.kind, []);
    groups.get(it.kind)!.push(it);
  }

  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-white/45">
        <Link href="/admin" className="hover:text-white">Admin</Link>
        <span className="mx-1.5">/</span>
        <span>{area.nameEn}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="heading-xl text-2xl font-bold text-white">{area.nameEn} — content</h1>
          <p className="text-sm text-white/55">/{area.slug} · {area.items.length} items</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/areas/${area.id}/items/new`} className="btn-grad">+ Add item</Link>
          <Link href={`/${area.slug}`} className="btn-outline">Open site</Link>
        </div>
      </div>

      {area.items.length === 0 ? (
        <div className="glass mt-8 p-10 text-center">
          <p className="text-lg font-semibold text-white">No content yet</p>
          <p className="mt-1 text-white/55">Add news, rentals, alerts and more.</p>
          <Link href={`/admin/areas/${area.id}/items/new`} className="btn-grad mt-5">+ Add item</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {[...groups.entries()].map(([kind, items]) => (
            <section key={kind}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-neon-lime">
                {kind} <span className="text-white/40">({items.length})</span>
              </h2>
              <div className="glass divide-y divide-white/10">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {it.nameEn}
                        {!it.published && <span className="ml-2 chip text-white/40">Draft</span>}
                      </p>
                      {it.secEn && <p className="truncate text-xs text-white/45">{it.secEn}</p>}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Link href={`/admin/areas/${area.id}/items/${it.id}/edit`} className="btn-outline px-3 py-1.5 text-xs">Edit</Link>
                      <form action={deleteItemAction}>
                        <input type="hidden" name="id" value={it.id} />
                        <input type="hidden" name="areaId" value={area.id} />
                        <button type="submit" className="rounded-full px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/10">Delete</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
