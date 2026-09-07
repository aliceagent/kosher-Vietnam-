import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { PwaRegister } from "@/components/pwa/register";
import { AppShell } from "@/components/shell/app-shell";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Karla({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orah-kosher-vietnam.vercel.app"),
  title: {
    default: "Orah — Kosher & Shomer Shabbat Vietnam",
    template: "%s · Orah",
  },
  description:
    "Vietnam travel guide for English-speaking Jewish travelers: kosher food, Chabad, Shabbat times, and itineraries that plan around Friday.",
  manifest: "/manifest.json",
  applicationName: "Orah",
  openGraph: {
    title: "Orah — Kosher & Shomer Shabbat Vietnam",
    description: "Plan Vietnam around Shabbat. Kosher kitchens, walking neighborhoods, Friday arrival math.",
    siteName: "Orah",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orah — Kosher & Shomer Shabbat Vietnam",
    description: "Plan Vietnam around Shabbat. Kosher kitchens, walking neighborhoods, Friday arrival math.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <PwaRegister />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
