"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Image URLs (using Unsplash for high-quality placeholders)
const images = {
  helix:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
  lumen:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
  atelier:
    "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
  sapien:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
};

interface Project {
  name: string;
  category: string;
  desc: string;
  metric: string;
  hue: string;
  image: string;
  challenge: string;
  solution: string;
  result: string;
}

const projects: Project[] = [
  {
    name: "HMS",
    category: "Healthcare App",
    desc: "A patient-first telehealth platform redefining care delivery for 1.2M users.",
    metric: "+412% engagement",
    hue: "#1a2630",
    image: images.helix,
    challenge:
      "Legacy systems created fragmented patient journeys, leading to 43% appointment no-shows and clinician burnout.",
    solution:
      "We built a unified care coordination layer with AI-powered scheduling, real-time vitals integration, and HIPAA-compliant messaging.",
    result:
      "No-show rates dropped to 8%, clinician satisfaction improved 67%, and 1.2M patients now access care seamlessly.",
  },
  {
    name: "Luxora",
    category: "E-Commerce Mobile App",
    desc: "Boutique commerce experience with cinematic product storytelling.",
    metric: "5.2× conversion",
    hue: "#1a1818",
    image: images.atelier,
    challenge:
      "Luxury brands struggled to convey craftsmanship digitally, with 82% of visitors abandoning carts on traditional PDPs.",
    solution:
      "Immersive 3D product viewers, curated editorial content, and a 'slow commerce' checkout flow that mimics a private shopping appointment.",
    result:
      "Conversion rate multiplied by 5.2×, average order value increased 214%, and return rates fell to 4.2%.",
  },
  {
    name: "Auto Motive",
    category: "Fintech Platform",
    desc: "Institutional trading and portfolio analytics with sub-second responsiveness.",
    metric: "$3.8B AUM",
    hue: "#1f1f24",
    image: images.lumen,
    challenge:
      "Legacy terminals offered stale data and clunky UX, costing traders critical milliseconds and millions in slippage.",
    solution:
      "A lightweight, GPU-accelerated dashboard with 50μs market data processing, customizable heatmaps, and one-click risk scenario modeling.",
    result:
      "Now manages $3.8B in AUM, trade execution improved 89%, and platform uptime has held at 99.997%.",
  },
  {
    name: "NexusEdu",
    category: "Education Platform",
    desc: "Adaptive learning for ambitious learners across 27 countries.",
    metric: "98% retention",
    hue: "#161e1c",
    image: images.sapien,
    challenge:
      "One-size-fits-all curriculum led to high churn; only 34% of students completed courses.",
    solution:
      "Adaptive knowledge graph that adjusts pacing and content in real-time, plus community-powered live cohorts.",
    result:
      "Course completion surged to 98%, NPS scored 87, and learners achieved 3.2× faster skill mastery.",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Screen tilt
      gsap.to(screenRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -40,
        rotateX: -2,
        ease: "none",
      });

      // Image reveal
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
          },
          scale: 1.1,
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
        });

        // Parallax
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
          y: index % 2 === 0 ? 50 : -50,
          ease: "none",
        });
      }

      // Details reveal
      if (detailsRef.current) {
        gsap.from(detailsRef.current, {
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const isReverse = index % 2 === 1;

  return (
    <div
      ref={cardRef}
      className="relative min-h-screen flex items-center py-20 md:py-28 border-b border-white/5 last:border-0"
    >
      <div className="w-full max-w-[85vw] mx-auto px-6">
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            isReverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Text content */}
          <div className="lg:col-span-5 [direction:ltr] space-y-5">
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
                — {project.category}
              </span>
              <span className="h-px w-8 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                Case {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-white">
              {project.name}
            </h3>

            <p className="text-white/60 leading-relaxed max-w-lg text-base md:text-lg">
              {project.desc}
            </p>

            <div className="flex items-center gap-6 pt-2">
              <span className="text-2xl md:text-3xl font-light text-white/90">
                {project.metric}
              </span>
              <span className="h-px w-10 bg-white/15" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Impact
              </span>
            </div>

            {/* Challenge / Solution / Result */}
            <div
              ref={detailsRef}
              className="pt-6 space-y-4 border-t border-white/5 mt-6"
            >
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Challenge
                </span>
                <p className="text-sm text-white/50 leading-relaxed max-w-md">
                  {project.challenge}
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Solution
                </span>
                <p className="text-sm text-white/50 leading-relaxed max-w-md">
                  {project.solution}
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Result
                </span>
                <p className="text-sm text-white/70 leading-relaxed max-w-md font-medium">
                  {project.result}
                </p>
              </div>
            </div>
          </div>

          {/* Device / Image */}
          <div className="lg:col-span-7 [direction:ltr]">
            <div
              ref={screenRef}
              className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${project.hue}, #050505 70%)`,
              }}
            >
              {/* Chrome bar */}
              <div className="absolute top-0 inset-x-0 h-10 flex items-center px-4 gap-1.5 border-b border-white/10 bg-black/40 backdrop-blur-sm z-10">
                <span className="h-2 w-2 rounded-full bg-red-500/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                <span className="h-2 w-2 rounded-full bg-green-500/80" />
                <span className="ml-4 text-[9px] tracking-[0.3em] text-white/40 uppercase">
                  {project.name}.app
                </span>
              </div>

              {/* Image */}
              <div className="absolute inset-0 pt-10">
                <img
                  ref={imageRef}
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Floating UI elements */}
              <div className="absolute inset-x-4 bottom-6 flex gap-2 pointer-events-none">
                <div className="h-14 w-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20" />
                <div className="flex-1 h-14 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10" />
              </div>

              {/* Reflection / shine */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-3xl" />
              <div className="absolute -top-1/2 -left-1/4 h-[200%] w-1/3 rotate-12 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section className="relative bg-[#050505] overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-[85vw] mx-auto px-6 pt-32 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
            — Case Studies
          </span>
          <span className="h-px w-12 bg-white/10" />
        </div>
        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-4xl">
          Where vision meets
          <span className="block text-white/20">execution.</span>
        </h2>
        <p className="text-white/30 text-sm md:text-base max-w-xl mt-4">
          Deep dives into products that redefined industries—from healthcare to
          fintech, education to luxury commerce.
        </p>
      </div>

      {/* Projects */}
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}

      {/* Footer */}
      <div className="w-full max-w-[85vw] mx-auto px-6 py-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">
            © 2026 Lumen Studio
          </span>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <span>Strategy</span>
            <span>Design</span>
            <span>Engineering</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default export for page usage
export default CaseStudies;
