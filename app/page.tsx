"use client";

import { useEffect } from "react";
import ScrollSequence from "@/components/ScrollSequence";
import PostSequenceContent from "@/components/PostSequenceContent";
import Navbar from "@/components/Navbar";
import TextOverlays from "@/components/TextOverlays";
import { useScroll, motion, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Transition background color from Blue to Red across the page
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["#0072BC", "#E31C23"]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main 
      style={{ backgroundColor }}
      className="relative min-h-screen w-full transition-colors duration-100 ease-linear"
    >
      <Navbar />
      
      {/* Target area for the tracking content */}
      <div id="content-container" className="relative w-full">
        {/* Phase 1: Interactive Scroll Sequence */}
        <ScrollSequence />
        <TextOverlays scrollYProgress={scrollYProgress} />

        {/* The content sections the bottle will travel across */}
        <PostSequenceContent />
      </div>

    </motion.main>
  );
}

