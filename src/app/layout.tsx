import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutProvider } from "@/context/layout-context";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twitch Clone & Redesign Engine",
  description: "Estudio de caso UX y clon funcional de Twitch con arquitectura modular.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full dark`}>
      <body className="h-full antialiased bg-[#0e0e10] text-[#efeff1]">
        <LayoutProvider>
          <AppShell>{children}</AppShell>
        </LayoutProvider>
      </body>
    </html>
  );
}
