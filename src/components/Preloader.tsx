"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("jain-tubes-preloaded")) {
      setShouldRender(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setComplete(true);
          setTimeout(() => setShouldRender(false), 1500); // give time for exit anim
          sessionStorage.setItem("jain-tubes-preloaded", "true");
        }, 400);
      }
      setProgress(current);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center overflow-hidden"
          exit={{ 
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.1,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <motion.div 
            className="relative font-heading text-5xl md:text-8xl lg:text-9xl text-white font-bold tracking-tighter mix-blend-difference"
            initial={{ filter: "blur(20px)", scale: 0.8 }}
            animate={{ filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span className="relative z-10 block">JAIN TUBES</span>
            
            {/* RGB Glitch layers */}
            <motion.span 
              className="absolute top-0 left-0 text-primary opacity-80 mix-blend-screen z-0"
              animate={{ x: [-3, 3, -1, 0], y: [1, -1, 0, 0] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.15, repeatDelay: 1.8 }}
              aria-hidden="true"
            >
              JAIN TUBES
            </motion.span>
            <motion.span 
              className="absolute top-0 left-0 text-red-500 opacity-80 mix-blend-screen z-0"
              animate={{ x: [3, -3, 1, 0], y: [-1, 1, 0, 0] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.15, repeatDelay: 1.8 }}
              aria-hidden="true"
            >
              JAIN TUBES
            </motion.span>
          </motion.div>

          <motion.div 
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 font-sans text-xl md:text-3xl text-white/50 font-medium"
            exit={{ opacity: 0, y: 20 }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
