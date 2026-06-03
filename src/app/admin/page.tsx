import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { logoutAction, deleteAreaAction } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await requireAdmin();
  const areas = await db.area.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="heading-xl text-2xl font-bold text-white">Areas</h1>
          <p className="text-sm text-white/55">Signed in as {session.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="btn-outline">View site</Link>
          <Link href="/admin/areas/new" className="btn-grad">+ New area</Link>
          <form action={logoutAction}>
            <button type="submit" className="btn-outline">Sign out</button>
          </form>
        </div>
      </div>

      {areas.length === 0 ? (
        <div className="glass mt-8 p-10 text-center">
          <p className="text-lg font-semibold text-white">No areas yet</p>
          <p className="mt-1 text-white/55">Create your first neighbourhood to get started.</p>
          <Link href="/admin/areas/new" className="btn-grad mt-5">+ New area</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <div key={a.id} className="glass p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">{a.nameEn}</h2>
                <span className={`chip ${a.published ? "text-neon-lime" : "text-white/40"}`}>
                  {a.published ? "Live" : "Draft"}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-white/50">/{a.slug} · {a._count.items} items</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/admin/areas/${a.id}`} className="btn-grad px-4 py-2 text-xs">Manage content</Link>
                <Link href={`/admin/areas/${a.id}/edit`} className="btn-outline px-4 py-2 text-xs">Edit area</Link>
                <Link href={`/${a.slug}`} className="btn-outline px-4 py-2 text-xs">Open</Link>
                <form action={deleteAreaAction}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="rounded-full px-3 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/10">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
