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
          className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left Column: Heading & Content */}
          <div className="flex flex-col gap-8 xl:pr-8">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              About Jain Tubes
            </h2>
            <div className="flex flex-col gap-6">
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                Jain Tubes has been a trusted name in India&apos;s piping industry, delivering high-quality piping solutions for infrastructure, industrial, agricultural, and water supply projects. Built on a foundation of quality, integrity, and customer satisfaction, we have earned the confidence of government departments, contractors, infrastructure developers, and businesses across the country.
              </p>
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                We specialize in the supply and distribution of a comprehensive range of piping products, including <strong className="text-white font-medium">Ductile Iron (DI) Pipes, Cast Iron Pipes, Galvanized Iron (GI) Pipes, HDPE Pipes, MS Pipes</strong>, fittings, valves, and allied pipeline accessories. As an <strong className="text-white font-medium">authorized distributor of Jindal Pipe</strong>, we proudly serve customers across <strong className="text-white font-medium">Madhya Pradesh, Chhattisgarh, Maharashtra, and Odisha</strong>, ensuring genuine products, competitive pricing, and dependable service.
              </p>
            </div>
          </div>

          {/* Right Column: Content & Stats */}
          <div className="flex flex-col justify-between gap-12">
            <div className="flex flex-col gap-6">
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                Jain Tubes has played an active role in major government and infrastructure projects, including the <strong className="text-white font-medium">Jal Jeevan Mission</strong>, supporting India&apos;s vision of providing safe and reliable drinking water to every household. Our extensive industry experience, strong supply network, and technical expertise enable us to deliver solutions that meet the highest standards of quality and performance.
              </p>
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                With our headquarters in <strong className="text-white font-medium">Bhopal</strong> and branch operations in <strong className="text-white font-medium">Nashik</strong> and <strong className="text-white font-medium">Chhattisgarh</strong>, we are committed to providing timely deliveries, expert guidance, and exceptional customer support. Whether it&apos;s a municipal water supply project, industrial application, irrigation system, or commercial development, Jain Tubes is your reliable partner for durable, efficient, and cost-effective piping solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/20">
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

        {/* Our Commitment */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-24 md:mt-32 pt-16 border-t border-white/20"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-12 uppercase tracking-wider text-white">Our Commitment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-8">
            {[
              "Premium quality products from trusted manufacturers",
              "Authorized distributor of Jindal Pipe",
              "Reliable supply chain and on-time delivery",
              "Competitive pricing with technical support",
              "Trusted partner for government and private infrastructure projects"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-6 group cursor-default">
                <div className="w-2 h-2 rounded-full bg-white/40 mt-2.5 flex-shrink-0 group-hover:bg-white transition-colors duration-500" />
                <p className="font-sans text-lg text-white/80 leading-relaxed group-hover:text-white transition-colors duration-500">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
