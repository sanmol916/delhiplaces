"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type FormState } from "@/app/admin/actions";

const initial: FormState = {};
const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-neon-violet focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-grad w-full">
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initial);
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Email</label>
        <input name="email" type="email" autoComplete="username" required className={inputCls} placeholder="admin@mohalla.app" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Password</label>
        <input name="password" type="password" autoComplete="current-password" required className={inputCls} placeholder="••••••••" />
      </div>
      {state.error && (
        <p className="rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-300">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}
