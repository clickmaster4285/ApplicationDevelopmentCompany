import * as React from "react";
import { motion } from "framer-motion";

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
  avatar,        // ← now using the real avatar
}) {
  const dragRef = React.useRef(0);

  const currentPosition = position || "back";
  const isFront = currentPosition === "front";

  return (
    <motion.div
      style={{
        zIndex:
          currentPosition === "front"
            ? 3
            : currentPosition === "middle"
            ? 2
            : 1,
      }}
      animate={{
        rotate:
          currentPosition === "front"
            ? -6
            : currentPosition === "middle"
            ? 0
            : 6,

        x:
          currentPosition === "front"
            ? "0%"
            : currentPosition === "middle"
            ? "33%"
            : "66%",

        scale:
          currentPosition === "front"
            ? 1
            : currentPosition === "middle"
            ? 0.95
            : 0.9,

        opacity:
          currentPosition === "front"
            ? 1
            : currentPosition === "middle"
            ? 0.85
            : 0.7,
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e: any) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className={`absolute left-0 top-0 flex h-[450px] w-[350px] flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]
      ${isFront ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      <div>
        <img
          src={avatar}                    // ← Fixed: use real avatar
          alt={author}
          className="mx-auto mb-6 h-24 w-24 rounded-full border border-white/20 object-cover"
        />

        <p className="text-center text-lg italic leading-relaxed text-white/80">
          "{testimonial}"
        </p>
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="text-center text-sm font-medium text-white">
          {author}
        </p>
      </div>
    </motion.div>
  );
}