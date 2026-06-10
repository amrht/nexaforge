import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import DeferredCustomCursor from "@/components/cursor/DeferredCustomCursor";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/transitions/PageTransition";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nexaforge.vercel.app",
  ),
  title: {
    default: "NexaForge — AI-First Enterprise Engineering",
    template: "%s | NexaForge",
  },
  description:
    "Premium B2B enterprise AI and IT services. Core modernization, connected data, and AI in production.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NexaForge",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Providers>
          <DeferredCustomCursor />
          <div className="grain-overlay" aria-hidden />
          <Navigation />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
