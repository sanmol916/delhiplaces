"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Locale = "en" | "hi";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिंदी", short: "हिं" },
];

/** A piece of text available in every supported language. */
export type Localized = { en: string; hi: string };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Resolve a Localized object (or plain string) to the active language. */
  t: (value: Localized | string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "mohalla.locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore saved choice on mount.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "en" || saved === "hi") setLocaleState(saved);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (value: Localized | string) =>
      typeof value === "string" ? value : value[locale] ?? value.en,
    [locale],
  );

  const ctx = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <LocaleContext.Provider value={ctx}>{children}</LocaleContext.Provider>;
}

export function useT() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useT must be used inside <LocaleProvider>");
  return ctx;
}
