"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      countersRef.current.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        const isPlus = counter.getAttribute("data-plus") === "true";
        
        const counterObj = { value: 0 };
        
        gsap.to(counterObj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const roundedValue = Math.floor(counterObj.value);
            const formatted = target === 9001 ? roundedValue.toString() : roundedValue.toLocaleString();
            counter.innerHTML = isPlus ? `${formatted}+` : formatted;
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Years of Experience", value: 55, plus: true },
    { label: "Projects Delivered", value: 1200, plus: true },
    { label: "ISO Certified", value: 9001, plus: false },
    { label: "Trusted Partners", value: 50, plus: true },
  ];

  return (
    <section id="about" className="py-24 md:py-40 relative overflow-hidden text-white" ref={containerRef}>
      {/* Background aesthetic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left Column: Heading & Highlight */}
          <div className="flex flex-col gap-8">
            <h3 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              Pioneering India&apos;s Water Infrastructure Since 1970.
            </h3>
          </div>

          {/* Right Column: Content & Stats */}
          <div className="flex flex-col justify-center gap-8">
            <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
              JAIN Tubes is an ISO 9001:2000 certified manufacturer, trader, and distributor. For over five decades, we have engineered enduring flow systems—delivering Cast Iron, Ductile Iron, HDPE, and PVC pipes, valves, and fittings for national water infrastructure projects.
            </p>
            <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
              Operating from Bhopal, our robust infrastructure and client-centric approach ensure every product meets the highest standards of reliability and strength.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-8">
              {stats.map((stat, i) => (
                <div key={i} className="border-l-2 border-white/50 pl-4">
                  <div 
                    className="font-heading text-4xl md:text-5xl font-bold text-white"
                    ref={(el) => {
                      if (el) countersRef.current[i] = el;
                    }}
                    data-target={stat.value}
                    data-plus={stat.plus}
                  >
                    0
                  </div>
                  <div className="font-sans text-sm text-white/60 uppercase tracking-wide mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
