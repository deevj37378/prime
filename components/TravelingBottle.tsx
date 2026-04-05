"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { productData } from "@/data/product";

interface TravelingBottleProps {
  scrollYProgress: MotionValue<number>;
}

export default function TravelingBottle({ scrollYProgress }: TravelingBottleProps) {
  // Visibility Handoff: 0 opacity first 50%, smoothly fade to 1 at 0.5-0.55
  const opacity = useTransform(
    scrollYProgress,
    [0.45, 0.55],
    [0, 1]
  );

  // Movement Path:
  // Scroll 0.6 -> 0.8: Rotate (-10deg) and move 20% to the left (-20vw)
  // Scroll 0.8 -> 0.95: Rotate (+10deg) and move to the right (+20vw)
  // Final (0.95 -> 1.0): Settle at scale-110 in the center
  const x = useTransform(
    scrollYProgress,
    [0.55, 0.6, 0.8, 0.95, 1],
    ["0vw", "0vw", "-20vw", "20vw", "0vw"]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0.55, 0.6, 0.8, 0.95, 1],
    [0, 0, -10, 10, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0.55, 0.9, 0.95, 1],
    [1, 1, 1, 1.1]
  );

  return (
    <motion.div
      className="fixed left-1/2 top-1/2 z-20 pointer-events-none drop-shadow-2xl flex items-center justify-center mix-blend-multiply"
      style={{
        x: "-50%", // base center centering
        y: "-50%",
        translateX: x,
        opacity,
        scale,
        rotate,
      }}
    >
      <img
        src={productData.staticAssets.staticBottle}
        alt="Prime Bottle"
        className="w-auto max-h-[35vh] md:max-h-[55vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      />
    </motion.div>
  );
}
