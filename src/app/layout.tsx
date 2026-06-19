import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import GlobalNav from "@/components/GlobalNav";
import FallingDroplet from "@/components/FallingDroplet";
import GlitchTransition from "@/components/GlitchTransition";

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
      <body className="font-sans font-switzer bg-background text-ink" style={{'--font-heading': 'PP Neue Montreal', '--font-sans': 'Switzer'} as React.CSSProperties}>
        <GlitchTransition />
        <GlobalNav />
        <FallingDroplet />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        <footer className="bg-transparent text-white/50 text-center py-6 font-sans text-sm border-t border-white/10 relative z-50">
          <p>&copy; {new Date().getFullYear()} JAIN Tubes. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
