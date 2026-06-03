import { PrismaClient } from "@prisma/client";
import { runSeed } from "../src/lib/seed-data";

const db = new PrismaClient();

runSeed(db)
  .then(async (r) => {
    console.log(`✓ Seeded admin=${r.admin}, ${r.areas} areas with content`);
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
