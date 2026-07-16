"use client";

import Marquee from "react-fast-marquee";

const logos1 = [
  "/assets/Brand1.jpg",
  "/assets/BRAND2.jpg",
  "/assets/BRAND3.jpg",
  "/assets/BRAND4.jpg",
  "/assets/BRAND5.jpg",
  "/assets/BRAND6.jpg",
];

const logos2 = [
  "/assets/BRAND7.jpg",
  "/assets/BARND8.jpg", // Note the spelling in original assets
  "/assets/BRAND9.jpg",
  "/assets/BRAND10.jpg",
  "/assets/BRAND11.jpg",
  "/assets/BRAND12.jpg",
];

export default function Clients() {
  return (
    <section id="clients" className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center uppercase">
          TRUSTED BY INDUSTRY LEADERS
        </h2>
      </div>

      <div className="flex flex-col gap-8 relative"
           style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
        {/* Soft edge masks handled by CSS mask-image on wrapper */}

        <Marquee speed={40} pauseOnHover gradient={false} className="py-4">
          {logos1.map((logo, i) => (
            <div key={i} className="mx-8 md:mx-16 flex items-center justify-center w-48 h-28 group bg-[#030816]/5 rounded-2xl shadow-xl p-4 border border-gray-200">
              <img 
                src={logo} 
                alt="Client Logo" 
                className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          ))}
        </Marquee>

        <Marquee speed={35} pauseOnHover gradient={false} direction="right" className="py-4">
          {logos2.map((logo, i) => (
            <div key={i} className="mx-8 md:mx-16 flex items-center justify-center w-48 h-28 group bg-[#030816]/5 rounded-2xl shadow-xl p-4 border border-gray-200">
              <img 
                src={logo} 
                alt="Client Logo" 
                className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
