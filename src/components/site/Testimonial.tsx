
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { useState, useMemo } from "react";

const testimonials = [
  {
    id: 1,
    testimonial: "Clickmasters transformed our idea into a polished mobile app that exceeded expectations. The entire process was smooth, transparent, and incredibly professional.",
    author: "Sarah Mitchell - Founder @ FitTrack",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 2,
    testimonial: "Their team delivered our MVP in record time without compromising quality. The app performs flawlessly and our users love the experience.",
    author: "David Chen - CEO @ Nexa Solutions",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    id: 3,
    testimonial: "From UI/UX design to deployment, Clickmasters handled everything perfectly. We saw a significant increase in user engagement after launch.",
    author: "Emily Rodriguez - Product Manager @ BrightLabs",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    id: 4,
    testimonial: "The attention to detail and technical expertise were outstanding. They built a scalable application that continues to support our rapid growth.",
    author: "Michael Carter - CTO @ ScaleFlow",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    id: 5,
    testimonial: "Working with Clickmasters felt like having an in-house development team. Communication was excellent and every milestone was delivered on time.",
    author: "Olivia Brooks - Operations Director @ NovaTech",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg"
  },
  {
    id: 6,
    testimonial: "Our complex business workflow was turned into an intuitive application that saved hundreds of hours every month. Exceptional work.",
    author: "James Wilson - Founder @ TaskBridge",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: 7,
    testimonial: "The UI/UX design alone was worth the investment. Our customers immediately noticed the improvement and conversion rates increased substantially.",
    author: "Sophia Turner - Head of Digital @ Elevate Commerce",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg"
  },
  {
    id: 8,
    testimonial: "If you're looking for a reliable app development partner, Clickmasters is the team to trust. Their technical skills and commitment are unmatched.",
    author: "Daniel Foster - CEO @ InnovateX",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg"
  }
];
function ShuffleCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [positions, setPositions] = useState(["front", "middle", "back"]);

  // Get 3 testimonials at a time (cycling)
  const visibleTestimonials = useMemo(() => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      items.push(testimonials[idx]);
    }
    return items;
  }, [currentIndex]);

  const handleShuffle = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    
    // Optional: visual rotation of positions
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop()!);
    setPositions(newPositions);
  };

  return (
    <>
    <div className="mx-auto max-w-7xl px-6 pt-32">
  <div className="mb-5 text-[10px] uppercase tracking-[0.4em] text-white/40">
    Client Testimonials
  </div>

  <h2 className="max-w-3xl text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] text-white">
    Real partnerships.
    <br />
   <span className="text-zinc-300"> Real results.</span>
  </h2>
</div>

      <div className="grid place-content-center -pt-20 -my-30 overflow-hidden px-8 text-slate-50 min-h-screen w-full">
        <div className="relative -ml-[100px] h-[450px] w-[350px] md:-ml-[175px]">
          {visibleTestimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial.id}-${currentIndex}`} // force re-render on cycle
              {...testimonial}
              handleShuffle={handleShuffle}
              position={positions[idx]}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export { ShuffleCards };