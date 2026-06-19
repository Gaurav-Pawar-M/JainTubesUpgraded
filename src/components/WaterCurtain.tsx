"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WaterCurtain() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Need dimensions to calculate proper SVG path
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || !pathRef.current || !containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Initial Path (Curtain is fully pulled up / hidden at top)
    const startPath = `M 0 0 L 0 0 Q ${dimensions.width / 2} 0 ${dimensions.width} 0 L ${dimensions.width} 0 Z`;
    
    // Mid Path (Curtain is fully covering the screen, with a liquid droop at the bottom)
    const midPath = `M 0 0 L 0 ${dimensions.height} Q ${dimensions.width / 2} ${dimensions.height + 200} ${dimensions.width} ${dimensions.height} L ${dimensions.width} 0 Z`;
    
    // End Path (Curtain is pulled up to reveal the next section)
    const endPath = `M 0 0 L 0 0 Q ${dimensions.width / 2} 0 ${dimensions.width} 0 L ${dimensions.width} 0 Z`;

    // Set initial path
    gsap.set(pathRef.current, { attr: { d: startPath } });

    // We tie this animation to the scroll position of the 'About' section
    const aboutSection = document.getElementById('about');
    const heroSection = document.getElementById('home');
    
    if (!aboutSection || !heroSection) return;

    // Create a timeline that triggers when scrolling from Hero to About
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "top bottom", // When top of About hits bottom of viewport
        end: "top top", // When top of About hits top of viewport
        scrub: 1, // Smooth scrubbing
      }
    });

    // 1. Pull curtain down over screen (waggling)
    tl.to(pathRef.current, {
      attr: { d: midPath },
      ease: "power2.inOut",
    })
    // 2. Pull curtain back up (revealing About)
    .to(pathRef.current, {
      attr: { d: endPath },
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [dimensions]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-start"
      style={{ height: '100vh', width: '100vw' }}
    >
      <svg 
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <path 
          ref={pathRef}
          fill="#1E3A8A" // Deep water blue
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
}
