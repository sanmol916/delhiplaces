import { z } from "zod";

export const MODULE_KEYS = [
  "alerts",
  "advertiser",
  "rentals",
  "pg",
  "institutes",
  "news",
  "openings",
  "events",
  "businesses",
  "influencers",
  "lostfound",
  "schools",
  "hospitals",
  "police",
  "atms",
  "map",
] as const;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

const jsonString = (fallback: string) =>
  z
    .string()
    .optional()
    .transform((v) => (v && v.trim() ? v.trim() : fallback))
    .refine(
      (v) => {
        try {
          JSON.parse(v);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Must be valid JSON" },
    );

export const areaSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and hyphens only"),
  nameEn: z.string().min(1).max(80),
  nameHi: z.string().min(1).max(80),
  taglineEn: z.string().min(1).max(160),
  taglineHi: z.string().min(1).max(160),
  blurbEn: z.string().min(1).max(400),
  blurbHi: z.string().min(1).max(400),
  accent: z.enum(["violet", "lime", "cyan"]),
  heroImage: z.string().url(),
  mapQuery: z.string().min(2).max(120),
  modulesCsv: z.string().max(400),
  statsJson: jsonString("[]"),
  tickerJson: jsonString("[]"),
  published: z.coerce.boolean(),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export const itemSchema = z.object({
  kind: z.enum(MODULE_KEYS),
  nameEn: z.string().min(1).max(160),
  nameHi: z.string().max(160).optional().or(z.literal("")),
  descEn: z.string().max(800).optional().or(z.literal("")),
  descHi: z.string().max(800).optional().or(z.literal("")),
  secEn: z.string().max(160).optional().or(z.literal("")),
  secHi: z.string().max(160).optional().or(z.literal("")),
  extraEn: z.string().max(160).optional().or(z.literal("")),
  extraHi: z.string().max(160).optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),
  price: z.coerce.number().int().min(0).optional().or(z.literal("")),
  rating: z.coerce.number().min(0).max(5).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  meta: z.string().max(60).optional().or(z.literal("")),
  meta2: z.string().max(60).optional().or(z.literal("")),
  flag: z.coerce.boolean(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  published: z.coerce.boolean(),
});

export type AreaInput = z.infer<typeof areaSchema>;
export type ItemInput = z.infer<typeof itemSchema>;
