"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, MeshTransmissionMaterial, Image } from "@react-three/drei";

interface Ripple {
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

function GlassWave() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  const ripples = useRef<Ripple[]>([]);
  const lastMousePos = useRef(new THREE.Vector2());

  // Track scroll velocity for scroll ripples
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  // Use a standard DOM event for scroll to avoid R3F scroll issues
  useMemo(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useFrame((state, delta) => {
    // 1. Calculate scroll velocity
    const scrollDelta = scrollY - lastScrollY.current;
    lastScrollY.current = scrollY;

    // 2. Add ripples on mouse move or scroll
    const mouseMoved = pointer.x !== lastMousePos.current.x || pointer.y !== lastMousePos.current.y;
    
    // Add ripple if mouse moved significantly or scrolling occurred
    if (mouseMoved || Math.abs(scrollDelta) > 5) {
      ripples.current.push({
        x: pointer.x * viewport.width / 2,
        y: pointer.y * viewport.height / 2 + (scrollDelta * 0.01), 
        age: 0,
        maxAge: 2.0
      });
      lastMousePos.current.set(pointer.x, pointer.y);
    }

    // 3. Update ripples
    ripples.current.forEach(r => r.age += delta);
    ripples.current = ripples.current.filter(r => r.age < r.maxAge);

    // 4. Update geometry vertices
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      const position = mesh.current.geometry.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // Very subtle base wave
        const waveX = Math.sin(x * 1.5 + time * 0.5) * 0.01;
        const waveY = Math.cos(y * 1.5 + time * 0.6) * 0.01;
        
        let zOffset = waveX + waveY;

        for (const ripple of ripples.current) {
          const dx = x - ripple.x;
          const dy = y - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const expansion = ripple.age * 3.0;
          
          if (dist < expansion && dist > expansion - 2.0) {
            const fade = 1.0 - (ripple.age / ripple.maxAge);
            const wave = Math.sin((dist - expansion) * 5.0);
            zOffset += wave * 0.02 * fade; // Nearly negligible ripple
          }
        }
        
        position.setZ(i, zOffset);
      }
      
      mesh.current.geometry.computeVertexNormals();
      position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 1]}>
      <planeGeometry args={[viewport.width, viewport.height, 128, 128]} />
      <MeshTransmissionMaterial 
        background={new THREE.Color('#000000')}
        transmission={1}
        thickness={1.5}
        roughness={0.0}
        chromaticAberration={0.03}
        ior={1.4}
        distortion={0.02}
        distortionScale={0.05}
        temporalDistortion={0.0}
      />
    </mesh>
  );
}

function Scene() {
  const { viewport } = useThree();
  
  return (
    <>
      <color attach="background" args={['#000000']} />
      <Environment preset="city" />
      
      {/* Background Pipes Image to be rippled */}
      <Image 
        url="/assets/hero_banner.png" 
        position={[0, 0, -3]} 
        scale={[viewport.width * 1.2, viewport.width * 0.6]} 
        transparent
        opacity={1}
      />
      


      <GlassWave />
    </>
  );
}

export default function Hero() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12 pt-40 pb-12 flex flex-col gap-6">
      <div className="w-full flex justify-center items-center px-4">
        <h1 className="text-sm md:text-base lg:text-lg tracking-[0.25em] md:tracking-[0.3em] text-white uppercase font-medium">
          TRUSTED QUALITY • ENDURING FLOW • EST. 1970
        </h1>
      </div>
      <section id="home" className="relative w-full h-[70vh] rounded-3xl overflow-hidden shadow-sm border border-ink/10">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10 animate-bounce pointer-events-none text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-white/50">Scroll to disturb</span>
        </div>
      </section>
    </div>
  );
}
