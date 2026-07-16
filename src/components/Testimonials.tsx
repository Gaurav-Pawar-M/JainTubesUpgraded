"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const testimonials = [
  {
    quote: "JAIN Tubes has been our primary supplier for ductile iron pipes for over a decade. Their commitment to quality and delivery timelines is unmatched in the industry.",
    author: "Ramesh Sharma",
    company: "MK Industries",
    initials: "RS"
  },
  {
    quote: "The durability of their HDPE pipes and the precision of their fittings have significantly reduced our maintenance overheads on major municipal projects.",
    author: "Harpreet Singh",
    company: "Kartar",
    initials: "HS"
  },
  {
    quote: "When dealing with high-pressure fluid transport, you cannot compromise on valves. Sigma Flow trusts JAIN Tubes because their engineering is flawless.",
    author: "Anirudh Mehta",
    company: "Sigma Flow",
    initials: "AM"
  },
  {
    quote: "From procurement to installation support, the team at JAIN Tubes acts as a true partner. Their cast iron range is the gold standard for our drainage contracts.",
    author: "Priya Venkatesan",
    company: "Ajanta Valves",
    initials: "PV"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // GSAP removed to ensure content is always visible and compatible with smooth scroll
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.6
    });
  };

  return (
    <section id="testimonials" className="relative py-32 px-6 md:px-12 bg-transparent text-white" ref={containerRef}>
      
      {/* Background Caustic Texture */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/assets/generated/caustic_texture_1781638767040.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-sm tracking-widest uppercase text-white/60 font-semibold mb-4 jt-pill">Client Feedback</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center uppercase">
            Trusted by Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              className="bg-[#030816]/5 border border-gray-200 shadow-sm p-8 md:p-12 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-500"
            >
              <div>
                <svg className="w-10 h-10 text-white/40 mb-6 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  &quot;{test.quote}&quot;
                </p>
              </div>
              
              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-white font-bold text-lg">
                  {test.initials}
                </div>
                <div>
                  <h4 className="jt-heading text-xl font-bold text-white">{test.author}</h4>
                  <p className="text-sm text-white/60">{test.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
