"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 192;

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // We want to track scroll over a tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const getFrameNum = (progress: number) => {
    // scale from 0 to 191 (for 192 frames: index 0 to 191)
    return Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
  };

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `/images/sequence/ezgif-frame-${num}.jpg`;
      
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        // Use 95% threshold to start showing so it appears faster for user
        if (loadedCount >= FRAME_COUNT - 5) {
          setLoaded(true);
        }
      };
      
      imgs.push(img);
    }
    imagesRef.current = imgs;
    
    return () => {
      isMounted = false;
    };
  }, []);

  const drawFrame = (frameIndex: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0 || !imagesRef.current[frameIndex]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    
    const img = imagesRef.current[frameIndex];
    if (!img.complete || img.naturalHeight === 0) return; // avoid drawing incomplete images

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const canvasRatio = canvas.width / canvas.height;
    const imageRatio = img.width / img.height;
    
    let w, h, x, y;
    
    const isMobile = window.innerWidth < 768;
    
    // Scale image to fit within canvas: Cover for Mobile, Contain for Desktop
    if (isMobile) {
      // Cover Logic: Fill height on tall screens, cropping sides cleanly
      if (canvasRatio > imageRatio) {
         w = canvas.width;
         h = canvas.width / imageRatio;
         x = 0;
         y = (canvas.height - h) / 2;
      } else {
         h = canvas.height;
         w = canvas.height * imageRatio;
         x = (canvas.width - w) / 2;
         y = 0;
      }
    } else {
      // Contain Logic: Original high-precision desktop view
      if (canvasRatio > imageRatio) {
         h = canvas.height;
         w = canvas.height * imageRatio;
         x = (canvas.width - w) / 2;
         y = 0;
      } else {
         w = canvas.width;
         h = canvas.width / imageRatio;
         x = 0;
         y = (canvas.height - h) / 2;
      }
    }
    
    // Paint black background to avoid white flashes
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
  };

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    
    const handleResize = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        // Do not scale the context here because w, h, x, and y in drawFrame 
        // are perfectly calculated in physical backing store pixels (canvas.width / canvas.height).
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        drawFrame(getFrameNum(scrollYProgress.get()));
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (loaded) {
      // Small optimization to avoid re-drawing if the frame number didn't change
      drawFrame(getFrameNum(latest));
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[1400vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bebas tracking-widest z-10 bg-black">
            LOADING ASSETS...
          </div>
        )}
        <canvas ref={canvasRef} className="fixed inset-0 w-screen h-screen object-contain" />
      </div>
    </div>
  );
}
