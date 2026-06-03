import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAreaContent } from "@/lib/content";
import { AreaHub } from "@/components/area-hub";

type Props = { params: { area: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getAreaContent(params.area);
  if (!content) return { title: "Area not found" };
  return {
    title: `${content.meta.name.en} — Mohalla`,
    description: content.meta.blurb.en,
  };
}

export default async function AreaPage({ params }: Props) {
  const content = await getAreaContent(params.area);
  if (!content) notFound();
  return <AreaHub content={content} />;
}
