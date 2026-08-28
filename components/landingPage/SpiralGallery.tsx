"use client";

import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointer2, Sparkles } from "lucide-react";

const p1 = "/images/p1.jpeg";
const p2 = "/images/p2.jpeg";
const p3 = "/images/p3.jpeg";
const p4 = "/images/p4.jpeg";
const p5 = "/images/p5.jpeg";

const galleryItems: GalleryItem[] = [
  { image: p3, text: "Discovery & Planning" },
  { image: p4, text: "UI/UX Design & Prototyping" },
  { image: p5, text: "Application Development" },
  { image: p1, text: "QA & Testing" },
  { image: p2, text: "Deployment" },
];

/**
 * Enhanced SpiralGallery with better visual design and interactions
 */
export default function SpiralGallery() {
  return (
    <>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-[85vw] px-6 pt-20 pb-10"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/10 grid place-items-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
            Our Process
          </span>
        </div>
        <h2 className="text-white text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
          From Idea to Launch — Our Application Development Process
        </h2>
        <p className="mt-4 text-white/40 text-base md:text-lg max-w-2xl">
          A proven 5-phase methodology that transforms concepts into scalable, secure, and delightful digital products.
        </p>
      </motion.div>

      {/* Gallery Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-[85vw] px-6 pb-20"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.05] via-transparent to-blue-500/[0.03] pointer-events-none rounded-3xl" />
        
        {/* Gallery */}
        <div className="relative h-[650px] w-full rounded-3xl overflow-hidden">
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.08}
            scrollEase={0.08}
            scrollSpeed={1.5}
            autoRotate={true}
            autoRotateSpeed={0.25}
            className="h-full w-full"
          />
          
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent pointer-events-none opacity-30" />
          
          {/* Side gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
            Drag or scroll to explore
            <MousePointer2 className="h-4 w-4 animate-[bounce_1s_ease-in-out_infinite]" />
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-primary animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="w-8 h-px bg-white/10" />
          </div>
        </motion.div>

        {/* Phase indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-10">
          {galleryItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                {index + 1}. {item.text.split(" ").slice(0, 2).join(" ")}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-[85vw] px-6 py-12 border-t border-white/5"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          <StatItem value="5" label="Phases" />
          <StatItem value="12+" label="Years Experience" />
          <StatItem value="500+" label="Projects Delivered" />
          <StatItem value="98%" label="Client Satisfaction" />
          <StatItem value="24/7" label="Support Available" />
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-chrome text-3xl md:text-4xl font-medium leading-[1.1] tracking-tight">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">
        {label}
      </div>
    </div>
  );
}