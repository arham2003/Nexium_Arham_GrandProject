import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Aurora from "@/components/backgrounds/Aurora/Aurora";
import { HeroHeader } from "@/components/header";
import LenisProvider from "@/components/LenisProvider";
import FooterSection from "@/components/footer";
import toast, { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PitchCraft | Home",
  description:
    "an AI powered Pitch Writer Application for founders and university students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black">
            <Aurora
              colorStops={["#66FFD9", "#B19EEF", "#5227FF"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
          <main className="flex-1">
            <LenisProvider>
              <HeroHeader />
              {children}
            </LenisProvider>
          </main>
          <FooterSection />
        </div>
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
