"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { productData } from "@/data/product";

interface TextOverlaysProps {
  scrollYProgress: MotionValue<number>;
}

export default function TextOverlays({ scrollYProgress }: TextOverlaysProps) {
  const sections = productData.storySections;
  
  return (
    <>
      {/* Background Dimming for Mobile only to ensure contrast */}
      <div className="fixed inset-0 pointer-events-none md:hidden bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />

      {/* Changed `top-[20%] md:top-0` to shift text slightly higher on mobile */}
      <div className="fixed inset-x-0 top-[15%] md:inset-0 pointer-events-none flex items-center justify-center text-center z-20 px-8">
        {sections.map((section, index) => {
          // Stagger the sections across the first 50% of the total scroll
          // Duration of each sequence is roughly 0.15
          const base = index * 0.16; // 0, 0.16, 0.32
          const inStart = base + 0.02;     // fade in start
          const holdStart = base + 0.06;   // hold start
          const holdEnd = base + 0.11;     // hold end
          const outEnd = base + 0.15;      // fade out end

          const opacity = useTransform(
            scrollYProgress,
            [inStart, holdStart, holdEnd, outEnd],
            [0, 1, 1, 0]
          );
          const y = useTransform(
            scrollYProgress,
            [inStart, holdStart, holdEnd, outEnd],
            [50, 0, 0, -50]
          );
          const scale = useTransform(
            scrollYProgress,
            [inStart, holdStart, holdEnd, outEnd],
            [0.9, 1, 1, 1.1]
          );

          return (
            <motion.div
              key={index}
              style={{ opacity, y, scale }}
              className="absolute flex flex-col items-center justify-center w-full"
            >
              <h1 className="font-bebas text-5xl sm:text-7xl md:text-9xl leading-[0.9] font-black uppercase text-white tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                {section.title}
              </h1>
              <p className="text-white text-xl md:text-3xl mt-4 font-bold tracking-wide max-w-2xl mx-auto drop-shadow-lg uppercase">
                {section.subtitle}
              </p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
