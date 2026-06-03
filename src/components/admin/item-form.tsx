"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { saveItemAction, type FormState } from "@/app/admin/actions";
import { MODULE_KEYS } from "@/lib/validation";

export interface ItemValues {
  id?: string;
  kind: string;
  nameEn: string;
  nameHi: string;
  descEn: string;
  descHi: string;
  secEn: string;
  secHi: string;
  extraEn: string;
  extraHi: string;
  image: string;
  price: string | number;
  rating: string | number;
  phone: string;
  meta: string;
  meta2: string;
  flag: boolean;
  sortOrder: number;
  published: boolean;
}

const EMPTY: ItemValues = {
  kind: "news",
  nameEn: "",
  nameHi: "",
  descEn: "",
  descHi: "",
  secEn: "",
  secHi: "",
  extraEn: "",
  extraHi: "",
  image: "",
  price: "",
  rating: "",
  phone: "",
  meta: "",
  meta2: "",
  flag: false,
  sortOrder: 0,
  published: true,
};

const input =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-neon-violet focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-white/80";

function Submit({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-grad">
      {pending ? "Saving…" : isEdit ? "Save item" : "Add item"}
    </button>
  );
}

export function ItemForm({ areaId, values }: { areaId: string; values?: ItemValues }) {
  const v = { ...EMPTY, ...values };
  const isEdit = Boolean(v.id);
  const action = saveItemAction.bind(null, areaId, v.id ?? null);
  const [state, formAction] = useFormState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-6">
      <section className="glass p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Module (kind)</label>
            <select name="kind" defaultValue={v.kind} className={input}>
              {MODULE_KEYS.filter((k) => k !== "map").map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Sort order</label>
            <input name="sortOrder" type="number" defaultValue={v.sortOrder} className={input} />
          </div>
          <div>
            <label className={label}>Name / Title (EN)</label>
            <input name="nameEn" defaultValue={v.nameEn} className={input} required />
          </div>
          <div>
            <label className={label}>Name / Title (हिं)</label>
            <input name="nameHi" defaultValue={v.nameHi} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Description / blurb / summary / detail (EN)</label>
            <textarea name="descEn" defaultValue={v.descEn} rows={2} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Description (हिं)</label>
            <textarea name="descHi" defaultValue={v.descHi} rows={2} className={input} />
          </div>
          <div>
            <label className={label}>Secondary — category/type/venue/address/block (EN)</label>
            <input name="secEn" defaultValue={v.secEn} className={input} />
          </div>
          <div>
            <label className={label}>Secondary (हिं)</label>
            <input name="secHi" defaultValue={v.secHi} className={input} />
          </div>
          <div>
            <label className={label}>Extra — tag/time/date/window/offer (EN)</label>
            <input name="extraEn" defaultValue={v.extraEn} className={input} />
          </div>
          <div>
            <label className={label}>Extra (हिं)</label>
            <input name="extraHi" defaultValue={v.extraHi} className={input} />
          </div>
        </div>
      </section>

      <section className="glass p-6">
        <h2 className="mb-1 text-sm font-semibold text-white">Optional fields (used by some modules)</h2>
        <p className="mb-4 text-xs text-white/45">
          image (rentals/news/openings/events/influencers/advertiser) · price (rentals/pg) ·
          rating (businesses/schools) · phone (businesses/hospitals/police/lostfound) ·
          meta = handle/board/bank or subtype (lost/found, power/water) · meta2 = followers or
          alert status (ongoing/scheduled/resolved) · flag = emergency / 24×7 / verified
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Image URL</label>
            <input name="image" defaultValue={v.image} className={input} />
          </div>
          <div>
            <label className={label}>Price (₹)</label>
            <input name="price" type="number" defaultValue={v.price} className={input} />
          </div>
          <div>
            <label className={label}>Rating (0–5)</label>
            <input name="rating" type="number" step="0.1" defaultValue={v.rating} className={input} />
          </div>
          <div>
            <label className={label}>Phone</label>
            <input name="phone" defaultValue={v.phone} className={input} />
          </div>
          <div>
            <label className={label}>meta</label>
            <input name="meta" defaultValue={v.meta} className={input} placeholder="@handle / CBSE / SBI / lost / power" />
          </div>
          <div>
            <label className={label}>meta2</label>
            <input name="meta2" defaultValue={v.meta2} className={input} placeholder="128k / scheduled" />
          </div>
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" name="flag" defaultChecked={v.flag} className="h-4 w-4" />
            Flag (emergency / 24×7 / verified)
          </label>
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" name="published" defaultChecked={v.published} className="h-4 w-4" />
            Published
          </label>
        </div>
      </section>

      {state.error && (
        <p className="rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-300">{state.error}</p>
      )}

      <div className="flex gap-3">
        <Submit isEdit={isEdit} />
        <Link href={`/admin/areas/${areaId}`} className="btn-outline">Cancel</Link>
      </div>
    </form>
  );
}
