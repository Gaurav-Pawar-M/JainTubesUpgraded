"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GlitchTransition() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    
    setIsActive(true);
    const t = setTimeout(() => setIsActive(false), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  // A slice-based glitch water wipe
  const slices = 12;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
      <AnimatePresence>
        {isActive && [...Array(slices)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full bg-primary/90 backdrop-blur-sm"
            style={{ height: `${100 / slices}%` }}
            initial={{ scaleX: 0, originX: i % 2 === 0 ? 0 : 1, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, originX: i % 2 === 0 ? 1 : 0, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.87, 0, 0.13, 1], // Very snappy Zetta-Joule like easing
              delay: Math.random() * 0.2 // Random delay gives the "glitch" water feel
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
