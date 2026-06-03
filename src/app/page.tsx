import { getAreasMeta } from "@/lib/content";
import { LandingView } from "@/components/landing-view";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const areas = await getAreasMeta();
  return <LandingView areas={areas} />;
}
