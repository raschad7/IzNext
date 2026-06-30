import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
  The real site typeface: Suisse Int'l Regular (used site-wide).
  Self-hosted from src/fonts/ and exposed as --font-suisse, which every
  component reads through globals.css.
*/
const suisse = localFont({
  variable: "--font-suisse",
  src: "../fonts/SuisseIntl-Regular.ttf",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haven Constructions — Crafted, personal, shaped around you",
  description:
    "A Haven home is more than bricks and mortar. It's crafted, personal and shaped around you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${suisse.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
