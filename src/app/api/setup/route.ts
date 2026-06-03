import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { runSeed } from "@/lib/seed-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Setup/seed endpoint for fresh deployments.
 *   Fresh DB:        open /api/setup            (no key needed)
 *   Re-seed later:   open /api/setup?key=SETUP_KEY
 * Idempotent.
 */
export async function GET(req: Request) {
  let isBootstrap = false;
  try {
    isBootstrap = (await db.adminUser.count()) === 0;
  } catch (e) {
    console.error("[setup] cannot reach database:", e);
    return NextResponse.json(
      { error: "Cannot reach the database. Check DATABASE_URL, then redeploy." },
      { status: 500 },
    );
  }

  const setupKey = (process.env.SETUP_KEY || "").trim();
  const providedKey = (new URL(req.url).searchParams.get("key") || "").trim();
  const keyMatches = setupKey.length > 0 && providedKey === setupKey;

  if (!isBootstrap && !keyMatches) {
    return NextResponse.json(
      { error: "Already initialised. Add ?key=YOUR_SETUP_KEY to re-seed." },
      { status: 401 },
    );
  }

  try {
    const result = await runSeed(db);
    return NextResponse.json({
      ok: true,
      message: "Seeded successfully. Sign in at /admin/login.",
      ...result,
    });
  } catch (e) {
    console.error("[setup] seed failed:", e);
    return NextResponse.json({ error: "Seeding failed. Check logs." }, { status: 500 });
  }
}
