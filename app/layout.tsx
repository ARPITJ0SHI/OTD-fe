import type { Metadata } from "next";
import { Inter, Anton, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OTD - Off The Dribble",
  description: "Street basketball platform showcasing competitive games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anton.variable} ${caveat.variable} font-sans antialiased`}
      >
        {/* Server-rendered cover — visible from first paint, hidden once PreloaderOverlay hydrates */}
        <div
          id="preloader-cover"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "#FF2A2A",
            pointerEvents: "none",
          }}
        />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
