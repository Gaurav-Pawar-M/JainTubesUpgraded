"use client";

import { useEffect, useRef } from "react";
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

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="font-sans text-sm tracking-widest uppercase text-white/60 font-semibold mb-4">Client Feedback</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white text-center uppercase">
            WORDS FROM OUR PARTNERS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="glass-card p-10 rounded-2xl flex flex-col justify-between h-full group border border-white/20 bg-white/10 backdrop-blur-md"
            >
              <div className="mb-8">
                <svg className="w-10 h-10 text-white/40 mb-6 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  &quot;{test.quote}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/20 pt-6">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white font-heading font-bold text-lg">
                  {test.initials}
                </div>
                <div>
                  <h4 className="font-heading text-xl font-bold text-white">{test.author}</h4>
                  <p className="font-sans text-sm text-white/60">{test.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
