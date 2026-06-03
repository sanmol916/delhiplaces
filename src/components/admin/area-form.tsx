"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { saveAreaAction, type FormState } from "@/app/admin/actions";
import { MODULE_KEYS } from "@/lib/validation";

export interface AreaValues {
  id?: string;
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
  published: boolean;
  sortOrder: number;
}

const EMPTY: AreaValues = {
  slug: "",
  nameEn: "",
  nameHi: "",
  taglineEn: "",
  taglineHi: "",
  blurbEn: "",
  blurbHi: "",
  accent: "violet",
  heroImage: "https://images.unsplash.com/photo-1597040663342-45b6c3470d3f?auto=format&fit=crop&w=1200&q=70",
  mapQuery: "Delhi",
  modulesCsv: "alerts,advertiser,rentals,news,openings,events,businesses,influencers,lostfound,schools,hospitals,police,atms,map",
  statsJson: '[{"label":{"en":"Residents","hi":"निवासी"},"value":"50k+"}]',
  tickerJson: '[{"en":"Welcome to your area","hi":"आपके इलाके में स्वागत है"}]',
  published: true,
  sortOrder: 0,
};

const input =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-neon-violet focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-white/80";

function Submit({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-grad">
      {pending ? "Saving…" : isEdit ? "Save area" : "Create area"}
    </button>
  );
}

function Err({ name, fe }: { name: string; fe?: Record<string, string> }) {
  if (!fe?.[name]) return null;
  return <p className="mt-1 text-xs text-rose-300">{fe[name]}</p>;
}

export function AreaForm({ values }: { values?: AreaValues }) {
  const v = { ...EMPTY, ...values };
  const isEdit = Boolean(v.id);
  const action = saveAreaAction.bind(null, v.id ?? null);
  const [state, formAction] = useFormState<FormState, FormData>(action, {});
  const fe = state.fieldErrors;

  return (
    <form action={formAction} className="space-y-6">
      <section className="glass p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Slug (URL)</label>
            <input name="slug" defaultValue={v.slug} className={input} placeholder="laxmi-nagar" required />
            <Err name="slug" fe={fe} />
          </div>
          <div>
            <label className={label}>Accent</label>
            <select name="accent" defaultValue={v.accent} className={input}>
              <option value="violet">Violet</option>
              <option value="lime">Lime</option>
              <option value="cyan">Cyan</option>
            </select>
          </div>
          <div>
            <label className={label}>Name (EN)</label>
            <input name="nameEn" defaultValue={v.nameEn} className={input} required />
            <Err name="nameEn" fe={fe} />
          </div>
          <div>
            <label className={label}>Name (हिं)</label>
            <input name="nameHi" defaultValue={v.nameHi} className={input} required />
            <Err name="nameHi" fe={fe} />
          </div>
          <div>
            <label className={label}>Tagline (EN)</label>
            <input name="taglineEn" defaultValue={v.taglineEn} className={input} required />
          </div>
          <div>
            <label className={label}>Tagline (हिं)</label>
            <input name="taglineHi" defaultValue={v.taglineHi} className={input} required />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Blurb (EN)</label>
            <textarea name="blurbEn" defaultValue={v.blurbEn} rows={2} className={input} required />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Blurb (हिं)</label>
            <textarea name="blurbHi" defaultValue={v.blurbHi} rows={2} className={input} required />
          </div>
        </div>
      </section>

      <section className="glass p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Look & location</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Hero image URL</label>
            <input name="heroImage" defaultValue={v.heroImage} className={input} required />
            <Err name="heroImage" fe={fe} />
          </div>
          <div>
            <label className={label}>Map query</label>
            <input name="mapQuery" defaultValue={v.mapQuery} className={input} placeholder="Laxmi Nagar, Delhi" required />
          </div>
          <div>
            <label className={label}>Sort order</label>
            <input name="sortOrder" type="number" defaultValue={v.sortOrder} className={input} />
          </div>
        </div>
      </section>

      <section className="glass p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Modules & data</h2>
        <div className="space-y-4">
          <div>
            <label className={label}>Modules (comma-separated, in display order)</label>
            <input name="modulesCsv" defaultValue={v.modulesCsv} className={input} />
            <p className="mt-1 text-xs text-white/45">Available: {MODULE_KEYS.join(", ")}</p>
          </div>
          <div>
            <label className={label}>Stats (JSON)</label>
            <textarea name="statsJson" defaultValue={v.statsJson} rows={3} className={`${input} font-mono text-xs`} />
            <Err name="statsJson" fe={fe} />
          </div>
          <div>
            <label className={label}>Ticker (JSON)</label>
            <textarea name="tickerJson" defaultValue={v.tickerJson} rows={3} className={`${input} font-mono text-xs`} />
            <Err name="tickerJson" fe={fe} />
          </div>
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" name="published" defaultChecked={v.published} className="h-4 w-4" />
            Published (visible on the site)
          </label>
        </div>
      </section>

      {state.error && (
        <p className="rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-300">{state.error}</p>
      )}

      <div className="flex gap-3">
        <Submit isEdit={isEdit} />
        <Link href="/admin" className="btn-outline">Cancel</Link>
      </div>
    </form>
  );
}
