"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export default function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12 md:py-6",
          scrolled ? "bg-[#001f65]/60 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white font-heading text-2xl md:text-3xl tracking-wide font-bold uppercase z-50 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/jain-logo1.png" alt="Jain Tubes" className="h-10 md:h-12 w-auto brightness-0 invert" />
            JAIN Tubes
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base md:text-lg text-white/80 hover:text-white transition-colors font-sans"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white z-50 p-2 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="w-8 flex flex-col gap-2 relative z-50">
              <span className={clsx("w-full h-0.5 bg-white transition-all", mobileMenuOpen ? "rotate-45 translate-y-2.5" : "")} />
              <span className={clsx("w-full h-0.5 bg-white transition-all", mobileMenuOpen ? "opacity-0" : "")} />
              <span className={clsx("w-full h-0.5 bg-white transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : "")} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#001f65] flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="text-4xl font-heading text-white hover:text-white/70 transition-colors block"
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
