import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery";

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
 * Default demo for the CircularGallery.
 * It automatically adapts to light/dark mode text colors.
 */
export default function SpiralGallery() {
  return (
    // A container is needed to define the gallery's size
    <>
      <div className="mx-auto w-[85vw] px-6 pt-32 pb-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
          {" "}
          — Our Process
        </div>
        <h2 className="text-white text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
          From Idea to Launch — Our Application Development Process
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
