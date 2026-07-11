import React from "react";
import { CircularTestimonials } from '@/components/ui/testimonial-card';


const testimonials = [
  {
    quote:
      "Clickmasters turned our rough idea into a fully functional mobile app that exceeded expectations. The UI/UX, performance, and stability were top-tier.",
    name: "Sarah Mitchell",
    designation: "Founder, FitTrack",
    src:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Their team delivered our MVP incredibly fast without compromising quality. The app is smooth, scalable, and exactly what we envisioned.",
    name: "David Chen",
    designation: "CEO, Nexa Solutions",
   src:
      "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "From UI/UX design to deployment, Clickmasters handled everything perfectly. User engagement increased significantly after launch.",
    name: "Emily Rodriguez",
    designation: "Product Manager, BrightLabs",
    src:
      "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "The technical expertise and attention to detail were outstanding. They built a scalable system that supports our rapid growth.",
    name: "Michael Carter",
    designation: "CTO, ScaleFlow",
    src:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote:
      "Working with Clickmasters felt like having an in-house development team. Communication was smooth and delivery was always on time.",
    name: "Olivia Brooks",
    designation: "Operations Director, NovaTech",
    src:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote:
      "They transformed our complex workflow into a simple, intuitive application that saves us hours every day.",
    name: "James Wilson",
    designation: "Founder, TaskBridge",
    src:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote:
      "The UI/UX alone was worth the investment. Our conversion rate improved immediately after launch.",
    name: "Sophia Turner",
    designation: "Head of Digital, Elevate Commerce",
    src:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote:
      "If you're building a serious digital product, Clickmasters is the team you want. Reliable, skilled, and highly professional.",
    name: "Daniel Foster",
    designation: "CEO, InnovateX",
    src:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1368&auto=format&fit=crop"
  }
];




export const ShuffleCards = () => (
  <section>

     <div className="mx-auto w-[85vw] px-6">
             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
               <div>
                 <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— Client Testimonials</div>
                 <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
                    Real partnerships.
    <br />
    <span className="text-zinc-300">Real results.</span>
                 </h2>
               </div>
              
             </div>
</div>
        
    {/* Dark testimonials section */}
    <div className="bg-[#060507] p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex"
        style={{ maxWidth: "1024px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#f7f7ff",
            designation: "#e1e1e1",
            testimony: "#f1f1f7",
            arrowBackground: "#0582CA",
            arrowForeground: "#141414",
            arrowHoverBackground: "#f7f7ff",
          }}
          fontSizes={{
            name: "28px",
            designation: "20px",
            quote: "20px",
          }}
        />
      </div>
    </div>
  </section>
);
