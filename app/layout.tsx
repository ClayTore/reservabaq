import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Fredoka } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ReservaBAQ",
  description: "Encuentra y reserva restaurantes en Barranquilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} antialiased`}
      >
        <header className="sticky top-0 z-10 border-b border-zinc-100 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-4xl px-6 py-3">
            <Link
              href="/"
              className="font-heading text-lg font-semibold text-emerald-700"
            >
              ReservaBAQ
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}