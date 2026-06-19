"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const milestones = [
  {
    year: "1970",
    title: "The First Pour",
    desc: "Founding JAIN Tubes with a vision to build enduring infrastructure.",
    image: "/assets/generated/milestone_1_first_pour_1781638616565.png"
  },
  {
    year: "2000",
    title: "Certified for Excellence",
    desc: "Achieving ISO 9001:2000 certification, cementing our commitment to quality.",
    image: "/assets/generated/milestone_2_quality_1781638629967.png"
  },
  {
    year: "2010",
    title: "Expanding the Line",
    desc: "The Ductile Iron Era begins, scaling up capacity for national demand.",
    image: "/assets/generated/milestone_3_ductile_iron_1781638641825.png"
  },
  {
    year: "2021",
    title: "Jal Jeevan Mission",
    desc: "Providing pipes to bring drinking water to every rural home in India.",
    image: "/assets/generated/milestone_4_jal_jeevan_1781638726286.png"
  },
  {
    year: "2023",
    title: "AMRUT 2.0",
    desc: "Building the backbone for urban water rejuvenation across major cities.",
    image: "/assets/generated/milestone_5_amrut_1781638739195.png"
  },
  {
    year: "2026",
    title: "55 Years of Flow",
    desc: "Over five decades of unyielding strength. Still pouring strong.",
    image: "/assets/generated/milestone_6_flow_1781638756705.png"
  }
];

export default function Journey() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = milestones.length - 1;
    if (newIndex >= milestones.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  const current = milestones[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "10%" : "-10%",
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-10%" : "10%",
      opacity: 0,
      scale: 0.95,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
    })
  };

  return (
    <section id="journey" className="relative w-full h-[80vh] min-h-[600px] bg-background flex overflow-hidden">
      
      {/* Left side: Image Carousel */}
      <div className="w-[60%] h-full relative overflow-hidden hidden md:block">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={current.image}
            alt={current.title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-background/10 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Right side: Content */}
      <div className="w-full md:w-[40%] h-full flex flex-col justify-center p-12 lg:p-24 bg-background text-ink relative">
        <div className="mb-12">
          <span className="font-sans text-sm tracking-widest uppercase text-steel font-semibold">Our Journey</span>
        </div>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="font-heading text-6xl font-bold text-primary mb-4">{current.year}</h3>
              <h4 className="font-heading text-3xl font-bold text-ink mb-4">{current.title}</h4>
              <p className="font-sans text-ink/70 leading-relaxed text-lg max-w-md">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-16 flex items-center gap-8">
          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)} 
              className="w-12 h-12 rounded-full border border-steel/30 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => paginate(1)} 
              className="w-12 h-12 rounded-full border border-steel/30 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="font-sans font-medium text-ink/50 tracking-widest">
            0{currentIndex + 1} / 0{milestones.length}
          </div>
        </div>
      </div>

      {/* Mobile background (since left side is hidden on mobile) */}
      <div className="md:hidden absolute inset-0 -z-10 opacity-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={current.image}
            alt={current.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
