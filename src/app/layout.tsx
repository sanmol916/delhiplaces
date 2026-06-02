import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mohalla — Your neighbourhood, alive online",
    template: "%s · Mohalla",
  },
  description:
    "Mohalla is a bold hyperlocal hub for your neighbourhood — rentals, news, new openings, events, lost & found and trusted local businesses. Available in English & हिंदी.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
