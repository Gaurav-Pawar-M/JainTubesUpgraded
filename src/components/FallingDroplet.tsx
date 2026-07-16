"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FallingDroplet() {
  const dropletRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!dropletRef.current || !containerRef.current) return;
    
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const droplet = dropletRef.current;
    
    const tl = gsap.to(droplet, {
      y: () => window.innerHeight - 80,
      scale: 0.3,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed right-4 md:right-12 top-0 bottom-0 w-[1px] bg-white/10 z-30 pointer-events-none hidden md:block"
    >
      <div 
        ref={dropletRef}
        className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-6 bg-primary/80 blur-[1px] mix-blend-screen"
        style={{
          boxShadow: "0 0 15px 2px rgba(15, 193, 242, 0.6)",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          clipPath: "ellipse(50% 50% at 50% 50%)",
        }}
      >
        <div className="absolute inset-0 bg-white/30 rounded-full blur-[2px] translate-y-[-2px] scale-75" />
      </div>
    </div>
  );
}
