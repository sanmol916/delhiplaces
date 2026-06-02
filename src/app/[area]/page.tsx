import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArea, getAreaSlugs } from "@/lib/areas";
import { AreaHub } from "@/components/area-hub";

type Props = { params: { area: string } };

export function generateStaticParams() {
  return getAreaSlugs().map((area) => ({ area }));
}

export function generateMetadata({ params }: Props): Metadata {
  const area = getArea(params.area);
  if (!area) return { title: "Area not found" };
  return {
    title: `${area.name.en} — Mohalla`,
    description: area.blurb.en,
  };
}

export default function AreaPage({ params }: Props) {
  const area = getArea(params.area);
  if (!area) notFound();
  return <AreaHub area={area} />;
}
