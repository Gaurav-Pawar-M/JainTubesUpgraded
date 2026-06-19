"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "jal-jeevan",
    title: "Jal Jeevan Mission",
    shortDesc: "Delivering drinking water to rural households.",
    fullDesc: "Under the prestigious Jal Jeevan Mission, JAIN Tubes has supplied thousands of kilometers of ultra-durable HDPE and DI pipes to remote villages across India. Our infrastructure acts as the vital arteries delivering safe, clean drinking water directly to household taps.",
    image: "/assets/generated/jal_jeevan_vibrant.png",
    metric1: "5M+",
    metric1Label: "Lives Impacted",
    metric2: "12k km",
    metric2Label: "Pipes Laid"
  },
  {
    id: "amrut",
    title: "AMRUT 2.0 Urban Grids",
    shortDesc: "Rejuvenating urban water infrastructure.",
    fullDesc: "Powering the rapid urbanization of India, JAIN Tubes is a core supplier for the Atal Mission for Rejuvenation and Urban Transformation (AMRUT 2.0). We provide high-pressure Cast Iron and Ductile Iron pipes and massive valving systems for city trunk mains.",
    image: "/assets/generated/amrut_urban_water.png",
    metric1: "45+",
    metric1Label: "Cities Served",
    metric2: "Zero",
    metric2Label: "Tolerance Leaks"
  },
  {
    id: "treatment",
    title: "Water Treatment Plants",
    shortDesc: "Industrial & municipal purification.",
    fullDesc: "At the heart of clean water lies state-of-the-art purification. JAIN Tubes supplies the complex, highly engineered piping and valve networks required inside massive Water Treatment Plants (WTP) and Sewage Treatment Plants (STP).",
    image: "/assets/generated/water_treatment_plant.png",
    metric1: "99.9%",
    metric1Label: "Flow Reliability",
    metric2: "24/7",
    metric2Label: "Operation"
  },
  {
    id: "namami-gange",
    title: "Namami Gange Programme",
    shortDesc: "Comprehensive River Ganges rejuvenation.",
    fullDesc: "Under the Namami Gange Programme, JAIN Tubes provides massive, high-performance pipelines and filtration components essential for the extensive network of STPs (Sewage Treatment Plants) along the Ganges. Our piping ensures zero-leakage, shielding the sacred river from untreated effluent discharge.",
    image: "/assets/projects/namami_gange.png",
    metric1: "150+",
    metric1Label: "STPs Supported",
    metric2: "Zero",
    metric2Label: "Effluent Leaks"
  },
  {
    id: "ken-betwa",
    title: "Ken-Betwa Link Project",
    shortDesc: "Inter-basin water transfer systems.",
    fullDesc: "A cornerstone of India's river interlinking strategy, the Ken-Betwa link relies on massive bulk-conveyance infrastructure. JAIN Tubes has supplied ultra-large diameter ductile iron pipes capable of withstanding immense hydraulic pressure to safely transport water to drought-prone regions.",
    image: "/assets/projects/ken_betwa.png",
    metric1: "900k",
    metric1Label: "Hectares Irrigated",
    metric2: "Heavy Duty",
    metric2Label: "Pressure Rating"
  },
  {
    id: "krishi-sinchayee",
    title: "PM Krishi Sinchayee Yojana",
    shortDesc: "Enhancing farm water-use efficiency.",
    fullDesc: "Dedicated to the motto 'More crop per drop', JAIN Tubes supports the PMKSY by delivering thousands of miles of durable HDPE and PVC pipes for micro and macro irrigation. We empower farmers with reliable, modern agricultural water distribution networks.",
    image: "/assets/projects/krishi_sinchayee.png",
    metric1: "10k+",
    metric1Label: "Villages Covered",
    metric2: "40%",
    metric2Label: "Water Saved"
  },
  {
    id: "nal-jal",
    title: "Pradhan Mantri Nal Jal Yojna",
    shortDesc: "Har Ghar Jal: Piped water for all.",
    fullDesc: "A core pillar of the government's water initiatives, the Nal Jal Yojna relies heavily on our premium, rust-proof ductile iron and HDPE pipes. JAIN Tubes is proud to be the backbone of this initiative, ensuring pressurized tap water reaches every rural household.",
    image: "/assets/projects/nal_jal.png",
    metric1: "100%",
    metric1Label: "Potable Safe",
    metric2: "50+ Yrs",
    metric2Label: "Design Life"
  }
];

export default function Projects() {
  type Project = typeof projects[0];
  const [selectedProject, setSelectedProject] = useState<(Project & { cloneIndex: number }) | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden text-white">
      <div className="px-6 md:px-12 mb-16">
        <h2 className="font-heading text-5xl md:text-7xl font-bold text-white uppercase">
          PROJECTS DELIVERED
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <p className="font-sans text-white/60 uppercase tracking-widest text-sm">
            Auto scroll • Click to expand
          </p>
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Auto Scroll Marquee Carousel */}
      <div className="overflow-visible pb-16">
        <div className="flex w-max animate-custom-marquee hover:[animation-play-state:paused]">
          {[0, 1, 2, 3].map(cloneIndex => (
            <div key={cloneIndex} className="flex gap-8 md:gap-16 px-4 md:px-8">
              {projects.map((project, idx) => {
                const uniqueId = `${project.id}-${cloneIndex}`;
                return (
                  <motion.div
                    key={uniqueId}
                    layoutId={`card-${uniqueId}`}
                    onClick={() => setSelectedProject({ ...project, cloneIndex })}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="relative w-[350px] h-[500px] md:w-[500px] md:h-[700px] flex-shrink-0 cursor-pointer shadow-2xl bg-white overflow-hidden"
                    style={{
                      clipPath: "polygon(0 0, 30% 0, 35% 6%, 100% 6%, 100% 100%, 0 100%)",
                      borderRadius: "16px"
                    }}
                  >
                    <motion.div layoutId={`image-container-${uniqueId}`} className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 350px, 500px"
                        priority
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-90" />
                    </motion.div>
                    
                    <div className="absolute top-2 left-6 z-10">
                      <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
                        Project 0{idx + 1}
                      </span>
                    </div>

                    <motion.div layoutId={`text-container-${uniqueId}`} className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end z-10">
                      <motion.h3 layoutId={`title-${uniqueId}`} className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {project.title}
                      </motion.h3>
                      <p className="font-sans text-white/80 text-sm md:text-lg leading-relaxed">
                        {project.shortDesc}
                      </p>
                      
                      <div className="mt-8 flex items-center text-white/60 text-sm uppercase tracking-widest gap-2">
                        <span>View Dossier</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#001f65]/80 backdrop-blur-md pointer-events-auto cursor-pointer"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div 
              layoutId={`card-${selectedProject.id}-${selectedProject.cloneIndex}`}
              className="relative w-full max-w-7xl h-[85vh] bg-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row z-10 pointer-events-auto border border-white/20"
              // Remove the folder clip path when expanded to show a full modal
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                borderRadius: "24px"
              }}
            >
              {/* Left: Expanded Image */}
              <motion.div layoutId={`image-container-${selectedProject.id}-${selectedProject.cloneIndex}`} className="relative w-full lg:w-1/2 h-64 lg:h-full">
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent lg:hidden" />
              </motion.div>

              {/* Right: Elaborated Content */}
              <motion.div layoutId={`text-container-${selectedProject.id}-${selectedProject.cloneIndex}`} className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center h-full overflow-y-auto bg-transparent">
                <motion.h3 layoutId={`title-${selectedProject.id}-${selectedProject.cloneIndex}`} className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
                  {selectedProject.title}
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-sans text-lg text-white/80 leading-relaxed mb-12"
                >
                  {selectedProject.fullDesc}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 gap-8"
                >
                  <div className="border-l-2 border-white/50 pl-4">
                    <div className="font-heading text-4xl md:text-5xl font-bold text-white">{selectedProject.metric1}</div>
                    <div className="font-sans text-xs uppercase tracking-widest text-white/60 mt-1">{selectedProject.metric1Label}</div>
                  </div>
                  <div className="border-l-2 border-white/50 pl-4">
                    <div className="font-heading text-4xl md:text-5xl font-bold text-white">{selectedProject.metric2}</div>
                    <div className="font-sans text-xs uppercase tracking-widest text-white/60 mt-1">{selectedProject.metric2Label}</div>
                  </div>
                </motion.div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L13 1M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
