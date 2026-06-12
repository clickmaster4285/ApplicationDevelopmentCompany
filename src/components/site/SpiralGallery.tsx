import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery"; 

import p1 from "@/assets/p1.jpeg"

import p2 from "@/assets/p2.jpeg"
import p3 from "@/assets/p3.jpeg"

import p4 from "@/assets/p4.jpeg"


import p5 from "@/assets/p5.jpeg"


const galleryItems: GalleryItem[] = [
  { image: p3, text: "Bridge" },
  {
    image:p4,
    text: "Desk Setup",
  },
  {
    image: p5,
    text: "Waterfall",
  },
  {
    image: p1,
    text: "Strawberries",
  },

  {
    image:p2 ,
    text: "Good Boy",
  },

];

/**
 * Default demo for the CircularGallery.
 * It automatically adapts to light/dark mode text colors.
 */
export default function SpiralGallery() {
  return (
    // A container is needed to define the gallery's size
      <>
      
          

          <div className="mx-auto max-w-7xl px-6 pt-32 pb-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5"> Scalable Architecture</div>
      <h2 className="text-white text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
            Our Process, Engineered for Scale
         </h2>
      </div>


          
        <div className="relative h-[600px] w-full rounded-lg">
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
      />
      </div>
      
      
      </>



    //       <section id="work" className="relative bg-[#050505] overflow-hidden">
    //   <div className="mx-auto max-w-7xl px-6 pt-32 pb-10">
    //     <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— Selected Work</div>
    //     <h2 className="text-white text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
    //       Products that move markets.
    //     </h2>
    //   </div>
    //   {projects.map((p, i) => (
    //     <ProjectCard key={p.name} p={p} i={i} />
    //   ))}
    // </section>
  );
}