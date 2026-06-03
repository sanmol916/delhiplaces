import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { AreaForm } from "@/components/admin/area-form";

export const metadata: Metadata = { title: "New area", robots: { index: false } };

export default async function NewAreaPage() {
  await requireAdmin();
  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-white/45">
        <Link href="/admin" className="hover:text-white">Admin</Link>
        <span className="mx-1.5">/</span>
        <span>New area</span>
      </nav>
      <h1 className="heading-xl mb-6 text-2xl font-bold text-white">Create a new area</h1>
      <AreaForm />
    </div>
  );
}
