import type { Metadata } from "next";
import { Baloo_2, Poppins } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import GlobalNav from "@/components/GlobalNav";
import FallingDroplet from "@/components/FallingDroplet";
import GlitchTransition from "@/components/GlitchTransition";

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: "JAIN Tubes | Enduring Flow Since 1970",
  description: "Trusted Quality. Enduring Flow. Since 1970. Manufacturer and distributor of Cast Iron, Ductile Iron, HDPE pipes, valves, fittings, and water meters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} ${poppins.variable} text-white bg-transparent`}>
        <GlitchTransition />
        <GlobalNav />
        <FallingDroplet />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        <footer className="bg-transparent text-white/50 text-center py-6 font-sans text-sm border-t border-gray-200 relative z-50">
          <p>&copy; {new Date().getFullYear()} JAIN Tubes. All rights reserved.</p>
        </footer>
        <Script src="/watercolor-bg.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
