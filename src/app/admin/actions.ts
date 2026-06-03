"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { setAdminSession, clearAdminSession } from "@/lib/session";
import { adminLoginSchema, areaSchema, itemSchema } from "@/lib/validation";

export interface FormState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

/* ------------------------------- Auth ------------------------------- */

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter a valid email and password." };

  const user = await db.adminUser.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  const hash = user?.passwordHash ?? "$2a$12$invalidinvalidinvalidinvalidinv";
  const ok = await bcrypt.compare(parsed.data.password, hash);
  if (!user || !ok) return { error: "Invalid email or password." };

  await setAdminSession({ id: user.id, email: user.email, role: user.role });
  redirect("/admin");
}

export async function logoutAction() {
  clearAdminSession();
  redirect("/admin/login");
}

/* ------------------------------- Areas ------------------------------- */

function fieldErrorsFrom(
  issues: { path: (string | number)[]; message: string }[],
): Record<string, string> {
  const fe: Record<string, string> = {};
  for (const i of issues) fe[i.path.join(".")] = i.message;
  return fe;
}

export async function saveAreaAction(
  id: string | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = areaSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }
  const d = parsed.data;
  const data = {
    slug: d.slug,
    nameEn: d.nameEn,
    nameHi: d.nameHi,
    taglineEn: d.taglineEn,
    taglineHi: d.taglineHi,
    blurbEn: d.blurbEn,
    blurbHi: d.blurbHi,
    accent: d.accent,
    heroImage: d.heroImage,
    mapQuery: d.mapQuery,
    modulesCsv: d.modulesCsv,
    statsJson: d.statsJson,
    tickerJson: d.tickerJson,
    published: d.published,
    sortOrder: d.sortOrder,
  };

  try {
    if (id) await db.area.update({ where: { id }, data });
    else await db.area.create({ data });
  } catch (e) {
    console.error(e);
    return { error: "Could not save. Is the slug already in use?" };
  }

  revalidatePath("/");
  revalidatePath(`/${d.slug}`);
  redirect("/admin");
}

export async function deleteAreaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) {
    await db.area.delete({ where: { id } });
    revalidatePath("/");
  }
}

/* ------------------------------- Items ------------------------------- */

const str = (v: FormDataEntryValue | null) => {
  const s = (v == null ? "" : String(v)).trim();
  return s.length ? s : null;
};

export async function saveItemAction(
  areaId: string,
  itemId: string | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = itemSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }
  const d = parsed.data;

  const data = {
    kind: d.kind,
    nameEn: d.nameEn,
    nameHi: d.nameHi || "",
    descEn: d.descEn || "",
    descHi: d.descHi || "",
    secEn: d.secEn || "",
    secHi: d.secHi || "",
    extraEn: d.extraEn || "",
    extraHi: d.extraHi || "",
    image: str(formData.get("image")),
    price: d.price === "" || d.price === undefined ? null : Number(d.price),
    rating: d.rating === "" || d.rating === undefined ? null : Number(d.rating),
    phone: str(formData.get("phone")),
    meta: str(formData.get("meta")),
    meta2: str(formData.get("meta2")),
    flag: d.flag,
    sortOrder: d.sortOrder,
    published: d.published,
  };

  try {
    if (itemId) await db.item.update({ where: { id: itemId }, data });
    else await db.item.create({ data: { ...data, areaId } });
  } catch (e) {
    console.error(e);
    return { error: "Could not save the item." };
  }

  revalidatePath("/");
  redirect(`/admin/areas/${areaId}`);
}

export async function deleteItemAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const areaId = String(formData.get("areaId") || "");
  if (id) {
    await db.item.delete({ where: { id } });
    revalidatePath("/");
  }
  if (areaId) redirect(`/admin/areas/${areaId}`);
}
