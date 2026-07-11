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
    tags: ["DI", "Water Mains", "High Tensile"],
    image: "/assets/products/di_pipe.jpg",
    description: "Ductile Iron (DI) Pipes are among the most reliable and durable piping solutions for modern water infrastructure. Engineered with exceptional strength, flexibility, and corrosion resistance, they are widely used for potable water supply, irrigation networks, wastewater systems, fire protection, and industrial pipeline applications.",
    features: [
      "High tensile strength and superior durability",
      "Excellent resistance to corrosion and abrasion",
      "Leak-proof push-on and restrained joint systems",
      "Long service life with minimal maintenance",
      "Suitable for high-pressure water transmission",
      "High impact resistance and flexibility",
      "Safe for drinking water distribution",
      "Environmentally friendly and fully recyclable"
    ],
    applications: [
      "Drinking water supply projects",
      "Urban and rural water distribution networks",
      "Irrigation and agricultural pipelines",
      "Sewage and wastewater systems",
      "Industrial water supply",
      "Firefighting pipeline networks",
      "Smart city and municipal infrastructure projects",
      "Government projects, including the Jal Jeevan Mission"
    ],
    whyChoose: "With over 40 years of industry experience, Jain Tubes is a trusted supplier of premium Ductile Iron Pipes to government departments, contractors, infrastructure developers, and industries across India. We combine genuine products, competitive pricing, technical expertise, and a strong distribution network to ensure every project receives the right piping solution, delivered on time."
  },
  {
    id: "hdpe",
    name: "HDPE Pipes",
    tags: ["HDPE", "Irrigation", "Potable Water"],
    image: "/assets/products/hdpe.jpg",
    description: "High-Density Polyethylene (HDPE) Pipes are advanced piping solutions known for their exceptional durability, flexibility, and corrosion resistance. Manufactured from high-quality polyethylene, HDPE pipes are designed to withstand harsh environmental conditions, making them an ideal choice for water supply, irrigation, sewerage, industrial, and infrastructure projects.",
    features: [
      "High strength with excellent flexibility",
      "Corrosion, rust, and chemical resistant",
      "Leak-proof butt fusion and electrofusion joints",
      "Lightweight for easy handling and installation",
      "UV-resistant and weatherproof",
      "Smooth inner surface for superior flow efficiency",
      "Low maintenance and long service life (up to 50 years or more)",
      "Environmentally friendly and fully recyclable"
    ],
    applications: [
      "Drinking water distribution systems",
      "Agricultural irrigation and sprinkler systems",
      "Underground water pipelines",
      "Sewerage and drainage networks",
      "Industrial fluid transportation",
      "Mining and slurry pipelines",
      "Cable ducting and telecom infrastructure",
      "Gas distribution networks (using approved HDPE gas pipes)",
      "Municipal and smart city infrastructure projects"
    ],
    whyChoose: "With over 40 years of industry experience, Jain Tubes has built a reputation for supplying reliable piping solutions for government departments, contractors, industries, and infrastructure developers across India. We offer high-quality HDPE pipes, competitive pricing, technical guidance, and timely delivery to ensure the success of every project."
  },
  {
    id: "dwc-pipes",
    name: "Double Wall Corrugated (DWC) Pipes",
    tags: ["DWC", "Drainage", "Underground"],
    image: "/assets/products/drainage.jpg",
    description: "Double Wall Corrugated (DWC) Pipes are high-performance piping solutions specifically designed for underground drainage, sewerage, stormwater management, cable ducting, and infrastructure projects. Manufactured from premium High-Density Polyethylene (HDPE), DWC pipes feature a unique dual-wall construction with a corrugated outer wall for exceptional strength and a smooth inner wall for efficient flow.",
    features: [
      "Double-wall construction for maximum strength and durability",
      "High ring stiffness for heavy underground loads",
      "Smooth inner surface for superior flow efficiency",
      "Corrosion, chemical, and abrasion resistant",
      "Lightweight and easy to transport and install",
      "Leak-proof joints for reliable performance",
      "Long service life with minimal maintenance",
      "UV-resistant and environmentally friendly",
      "Suitable for both gravity and non-pressure applications"
    ],
    applications: [
      "Underground sewerage systems",
      "Stormwater drainage networks",
      "Highway and railway drainage",
      "Cable ducting for electrical and telecom networks",
      "Industrial drainage systems",
      "Rainwater harvesting projects",
      "Municipal infrastructure projects",
      "Smart city developments",
      "Residential and commercial drainage systems"
    ],
    whyChoose: "Whether you're developing a drainage network, cable ducting system, or large-scale infrastructure project, Jain Tubes offers dependable DWC piping solutions built for long-lasting performance."
  },
  {
    id: "gi-pipes",
    name: "Galvanized Iron (GI) Pipes",
    tags: ["GI", "Plumbing", "Structural"],
    image: "/assets/products/ci_pipe.jpg",
    description: "Galvanized Iron (GI) Pipes are trusted for their strength, durability, and excellent corrosion resistance, making them an ideal choice for water supply, plumbing, industrial applications, fire protection systems, and structural projects. Coated with a protective layer of zinc, GI pipes offer enhanced resistance to rust and environmental wear, ensuring reliable performance and a long service life.",
    features: [
      "High strength and long-lasting durability",
      "Zinc-coated for superior corrosion and rust resistance",
      "Suitable for indoor and outdoor applications",
      "Smooth internal surface for efficient water flow",
      "High pressure and temperature resistance",
      "Easy to install, maintain, and replace",
      "Available in multiple sizes and thicknesses",
      "Manufactured in accordance with IS standards"
    ],
    applications: [
      "Domestic and commercial water supply systems",
      "Plumbing and sanitation projects",
      "Firefighting and sprinkler systems",
      "Industrial piping and process plants",
      "Agricultural irrigation systems",
      "Borewell and pump installations",
      "Structural and fabrication applications",
      "HVAC and compressed air pipelines",
      "Government and infrastructure projects"
    ],
    whyChoose: "Jain Tubes has earned the trust of contractors, industries, government departments, and infrastructure developers across India. We offer high-quality GI Pipes backed by expert technical guidance, competitive pricing, reliable stock availability, and prompt delivery."
  },
  {
    id: "meters",
    name: "Water Meters",
    tags: ["Meters", "Measurement"],
    image: "/assets/products/meter.jpg",
    description: "Water Meters are precision measuring devices designed to accurately monitor and record water consumption in residential, commercial, industrial, and municipal applications. They play a vital role in efficient water management, helping utilities, industries, and property owners optimize water usage, reduce wastage, and ensure accurate billing.",
    features: [
      "High accuracy for precise water measurement",
      "Durable construction for long service life",
      "Corrosion and wear-resistant materials",
      "Low maintenance and reliable performance",
      "Easy installation and operation",
      "Suitable for domestic, commercial, industrial, and municipal applications",
      "Tamper-resistant design for secure operation",
      "Available in multiple sizes and flow capacities"
    ],
    applications: [
      "Residential water supply systems",
      "Commercial buildings and housing societies",
      "Municipal water distribution networks",
      "Industrial water management",
      "Agricultural irrigation systems",
      "Hotels, hospitals, schools, and institutions",
      "Smart water management projects",
      "Government water supply schemes, including the Jal Jeevan Mission"
    ],
    whyChoose: "Whether you require water meters for domestic installations or large-scale municipal projects, Jain Tubes offers dependable solutions that ensure accurate measurement, efficient water management, and long-lasting performance."
  },
  {
    id: "flange",
    name: "CI Double Flange Pipes",
    tags: ["Flange", "Pump"],
    image: "/assets/products/flange_pipe.jpg",
    description: "Cast Iron Double Flange (CI DF) Pipes are robust and durable piping solutions designed for above-ground and underground water transmission systems. Featuring flanges at both ends, these pipes provide strong, leak-proof, and secure bolted connections, making them ideal for installations that require easy assembly, maintenance, and disassembly.",
    features: [
      "High mechanical strength and durability",
      "Double flange ends for secure and leak-proof bolted joints",
      "Excellent corrosion and abrasion resistance",
      "Suitable for high-pressure water transmission",
      "Easy installation, maintenance, and replacement",
      "Long service life with minimal maintenance",
      "High dimensional accuracy and reliable performance",
      "Available in various diameters and pressure classes"
    ],
    applications: [
      "Water supply and distribution networks",
      "Pumping stations",
      "Water treatment and sewage treatment plants",
      "Firefighting and hydrant systems",
      "Industrial water pipelines",
      "Municipal infrastructure projects",
      "Irrigation and utility services",
      "Government water supply schemes, including the Jal Jeevan Mission"
    ],
    whyChoose: "Jain Tubes is a trusted supplier of high-quality Cast Iron Double Flange Pipes for government departments, contractors, industries, and infrastructure developers across India. We ensure genuine products, competitive pricing, technical assistance, and prompt delivery to support projects of every scale."
  },
  {
    id: "valves",
    name: "CI & DI Sluice Valves",
    tags: ["Valves", "Flow Control"],
    image: "/assets/products/valve.jpg",
    description: "Cast Iron (CI) and Ductile Iron (DI) Sluice Valves are essential flow-control devices used in water supply, irrigation, wastewater, and industrial pipeline systems. Designed to start or stop the flow of water efficiently, these valves provide reliable operation, tight shut-off performance, and long service life under demanding conditions.",
    features: [
      "Robust Cast Iron and Ductile Iron construction",
      "Excellent corrosion and wear resistance",
      "Tight sealing for leak-proof performance",
      "Low operating torque for smooth operation",
      "Suitable for underground and above-ground installations",
      "Long service life with minimal maintenance",
      "Available in non-rising stem and rising stem designs",
      "Compatible with a wide range of pipeline systems"
    ],
    applications: [
      "Water supply and distribution networks",
      "Municipal and rural water projects",
      "Irrigation systems",
      "Pumping stations",
      "Water and wastewater treatment plants",
      "Industrial process pipelines",
      "Fire protection systems",
      "Infrastructure and utility projects",
      "Government schemes, including the Jal Jeevan Mission"
    ],
    whyChoose: "Jain Tubes is a trusted supplier of high-performance valves and piping solutions. We offer genuine products from leading manufacturers, technical expertise, competitive pricing, and reliable delivery support for projects across India."
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

              <div className="glass-card bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl relative overflow-hidden w-full flex flex-col gap-8">
                <div>
                  <h4 className="font-sans text-sm text-white/50 uppercase tracking-widest mb-4">Overview</h4>
                  <p className="font-sans text-lg text-white/90 leading-relaxed">
                    {activeProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-sans text-sm text-white/50 uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Key Features</h4>
                    <ul className="flex flex-col gap-3">
                      {activeProduct.features.map((feature, idx) => (
                        <li key={idx} className="font-sans text-sm text-white/80 flex items-start gap-2">
                          <span className="text-white/40 mt-1">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-sans text-sm text-white/50 uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Applications</h4>
                    <ul className="flex flex-col gap-3">
                      {activeProduct.applications.map((app, idx) => (
                        <li key={idx} className="font-sans text-sm text-white/80 flex items-start gap-2">
                          <span className="text-white/40 mt-1">•</span> {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-4">
                  <h4 className="font-sans text-sm text-white/50 uppercase tracking-widest mb-3">Why Choose Jain Tubes?</h4>
                  <p className="font-sans text-sm text-white/80 leading-relaxed">
                    {activeProduct.whyChoose}
                  </p>
                </div>
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
