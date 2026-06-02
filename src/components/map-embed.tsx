"use client";

export function MapEmbed({ query }: { query: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
  return (
    <div className="glass overflow-hidden p-1.5">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.4rem]">
        <iframe
          title={`Map of ${query}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.2]"
          allowFullScreen
        />
      </div>
    </div>
  );
}
