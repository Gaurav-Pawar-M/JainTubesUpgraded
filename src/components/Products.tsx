"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const ROTATIONS = [-4, 6, -5, 3, -7, 5, -3, 8, -6];

const products = [
  {
    id: "di-pipes",
    name: "Ductile Iron (DI) Pipes",
    specs: "IS:8329, DN80–DN1200, K7/K9 wall-thickness classes, min. 420 MPa tensile strength, flexible push-on/restrained joints, standard lengths 5.5m/6m, cement-mortar or epoxy lining.",
    use: "For water mains, sewage, industrial fluid transport.",
    tags: ["DI", "Water Mains", "High Tensile"],
    image: "/assets/products/di_pipe.jpg",
  },
  {
    id: "ci-pipes",
    name: "Cast (Spun) Iron Pipes",
    specs: "IS:1536, Classes LA/A/B, 80mm–300mm.",
    use: "For underground drainage, water supply, fire protection.",
    tags: ["CI", "Drainage", "Fire Protection"],
    image: "/assets/products/ci_pipe.jpg",
  },
  {
    id: "hdpe",
    name: "HDPE Pipes",
    specs: "IS:4984/IS:14333, PE63/PE80/PE100 grades, PN6–PN16, typical range 20mm–630mm, coil or straight lengths.",
    use: "For potable water, irrigation, gas distribution.",
    tags: ["HDPE", "Irrigation", "Potable Water"],
    image: "/assets/products/hdpe.jpg",
  },
  {
    id: "drainage",
    name: "Drainage Pipes & Fittings",
    specs: "CI, PVC, HDPE; bends, junctions, traps.",
    use: "For stormwater, sanitary, industrial drainage.",
    tags: ["Fittings", "Stormwater"],
    image: "/assets/products/drainage.jpg",
  },
  {
    id: "fittings",
    name: "DI, CI & GI Fittings",
    specs: "Flanged bends, tees, reducers, sockets, collars; sized to match parent pipe range.",
    use: "For joining and directing pipelines.",
    tags: ["Fittings", "Flanged"],
    image: "/assets/products/fitting.jpg",
  },
  {
    id: "valves",
    name: "Valves",
    specs: "Gate, sluice, butterfly, NRV, air valves; CI/DI body; IS:780/IS:13095; PN6/PN10/PN16; typical DN50–DN600.",
    use: "For flow control and regulation.",
    tags: ["Valves", "Flow Control"],
    image: "/assets/products/valve.jpg",
  },
  {
    id: "meters",
    name: "Water Meters",
    specs: "Multi-jet and single-jet, IS:779, DN15–DN150, flanged/threaded ends.",
    use: "For volume measurement.",
    tags: ["Meters", "Measurement"],
    image: "/assets/products/meter.jpg",
  },
  {
    id: "flange",
    name: "CI Double Flange Pipes",
    specs: "IS:1538/BS:4504, 80mm–600mm.",
    use: "For valve isolation, pump flanging.",
    tags: ["Flange", "Pump"],
    image: "/assets/products/flange_pipe.jpg",
  },
  {
    id: "earthing",
    name: "Earthing Pipes",
    specs: "IS:3043, solid/perforated barrel.",
    use: "For industrial plants, substations.",
    tags: ["Earthing", "Industrial"],
    image: "/assets/products/earthing.jpg",
  }
];

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingContainerRef = useRef<HTMLDivElement>(null);
  const floatingInnerRef = useRef<HTMLDivElement>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quickToX = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quickToY = useRef<any>(null);

  const [isTouch, setIsTouch] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeProductIndex, setActiveProductIndex] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null); 
  const [isDetailView, setIsDetailView] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipState = useRef<any>(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (!floatingContainerRef.current || isDetailView || isTouch) return;
    gsap.set(floatingContainerRef.current, { xPercent: -50, yPercent: -50 });
    quickToX.current = gsap.quickTo(floatingContainerRef.current, "x", { duration: 0.6, ease: "power3" });
    quickToY.current = gsap.quickTo(floatingContainerRef.current, "y", { duration: 0.6, ease: "power3" });
  }, [isDetailView, isTouch]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || isDetailView) return;
    if (quickToX.current && quickToY.current) {
      quickToX.current(e.clientX);
      quickToY.current(e.clientY);
    }
  };

  const handleMouseEnterRow = (index: number) => {
    if (isTouch || isDetailView) return;
    setHoveredIndex(index);
    
    if (floatingContainerRef.current && floatingInnerRef.current) {
      gsap.to(floatingContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(floatingInnerRef.current, {
        rotation: ROTATIONS[index % ROTATIONS.length],
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeaveList = () => {
    if (isTouch || isDetailView) return;
    setHoveredIndex(null);
    if (floatingContainerRef.current) {
      gsap.to(floatingContainerRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const openDetail = (index: number) => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouch || isReducedMotion) {
      setActiveProductIndex(index);
      setIsDetailView(true);
      return;
    }

    flipState.current = Flip.getState("[data-flip-id='product-img']");
    setActiveProductIndex(index);
    setIsDetailView(true);
  };

  const closeDetail = () => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouch || isReducedMotion) {
      setActiveProductIndex(null);
      setIsDetailView(false);
      return;
    }

    flipState.current = Flip.getState("[data-flip-id='product-img']");
    setActiveProductIndex(null);
    setIsDetailView(false);
  };

  useLayoutEffect(() => {
    if (flipState.current) {
      Flip.from(flipState.current, {
        duration: 0.6,
        ease: "power2.inOut",
        absolute: true,
        zIndex: 100,
        targets: "[data-flip-id='product-img']"
      });
      flipState.current = null;
    }
  }, [isDetailView, activeProductIndex]);

  const activeProduct = activeProductIndex !== null ? products[activeProductIndex] : null;
  const currentHoveredImage = hoveredIndex !== null ? products[hoveredIndex].image : (products[0]?.image || "");

  return (
    <section 
      id="products" 
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-transparent text-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveList}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Detail View */}
        {isDetailView && activeProduct && (
          <div className="flex flex-col lg:flex-row-reverse gap-16 min-h-[70vh] items-center mt-12">
            
            {/* Detail Image Slot */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div 
                className="relative w-full max-w-[500px] aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl"
                data-flip-id="product-img"
              >
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a388e]/90 to-transparent" />
              </div>
            </div>

            {/* Detail Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start fade-in-up">
              <button 
                onClick={closeDetail}
                className="mb-8 font-sans text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to products
              </button>
              
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase leading-none">
                {activeProduct.name}
              </h2>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {activeProduct.tags.map((tag) => (
                  <span key={tag} className="px-4 py-1 border border-white/40 rounded-full text-xs uppercase tracking-wider text-white">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="glass-card bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl relative overflow-hidden w-full">
                <h4 className="font-sans text-sm text-white/50 uppercase tracking-widest mb-2">Specifications</h4>
                <p className="font-sans text-lg text-white mb-6 leading-relaxed">
                  {activeProduct.specs}
                </p>
                <h4 className="font-sans text-sm text-white/50 uppercase tracking-widest mb-2">Primary Use</h4>
                <p className="font-sans text-white/90">
                  {activeProduct.use}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* List View */}
        {!isDetailView && (
          <div className="flex flex-col relative w-full pt-16">
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white uppercase mb-12 px-4 border-b border-white/10 pb-8">Our Core Products</h2>
            
            {products.map((product, i) => (
              <div key={product.id} className="w-full">
                {/* Desktop Row */}
                <div 
                  className="hidden md:flex py-8 px-4 border-b border-white/10 cursor-pointer items-center justify-between group transition-colors hover:bg-white/5"
                  onMouseEnter={() => handleMouseEnterRow(i)}
                  onClick={() => openDetail(i)}
                >
                  <div className="font-heading text-4xl lg:text-7xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-6 flex items-center w-full">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4 text-white/50 text-2xl lg:text-4xl w-8">→</span>
                    <span className="truncate pr-8">{product.name}</span>
                  </div>
                  <span className="font-sans text-white/30 text-xl tracking-widest shrink-0">
                    0{i + 1}
                  </span>
                </div>

                {/* Mobile / Touch Row */}
                <div className="md:hidden flex flex-col py-6 border-b border-white/10">
                  <div 
                    className="flex justify-between items-center cursor-pointer px-2"
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                  >
                    <span className="font-heading text-3xl font-bold uppercase tracking-tight">{product.name}</span>
                    <span className="text-white/50 text-2xl">{expandedRow === i ? '−' : '+'}</span>
                  </div>
                  
                  {expandedRow === i && (
                    <div className="mt-6 px-2 flex flex-col gap-6 fade-in">
                      <div className="w-full h-[250px] relative rounded-xl overflow-hidden shadow-xl">
                         <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a388e]/80 to-transparent" />
                      </div>
                      <button 
                        onClick={() => openDetail(i)}
                        className="self-start px-6 py-3 border border-white/30 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-[#001f65] transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}

            {/* Desktop Floating Image Container */}
            {!isTouch && (
              <div 
                ref={floatingContainerRef}
                className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 opacity-0"
                data-flip-id="product-img"
              >
                <div ref={floatingInnerRef} className="w-full h-full overflow-hidden rounded-2xl shadow-2xl relative">
                  <img 
                    src={currentHoveredImage} 
                    alt="Product Preview" 
                    className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a388e]/80 to-transparent" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
