import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
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
  title: "Orah — Kosher Vietnam Travel",
  description:
    "Private kosher journeys through Vietnam — Shabbat-ready itineraries, trusted meals, and guides who understand Jewish travel.",
  openGraph: {
    title: "Orah — Kosher Vietnam Travel",
    description:
      "Vietnam, planned for Jewish life. Kosher meals, Shabbat timing, and heritage-minded routes from Hanoi to the Mekong.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
