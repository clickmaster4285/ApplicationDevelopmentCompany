"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Ebook data
interface Ebook {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  pages: number;
  downloadCount: string;
  coverColor: string;
  coverGradient: string;
  image: string;
  authors: string[];
  tags: string[];
  featured?: boolean;
  releaseDate: string;
}

const ebooks: Ebook[] = [
  {
    id: "1",
    title: "The Zero-Trust Playbook",
    subtitle: "Building Secure Systems in a Hostile World",
    description:
      "A comprehensive guide to implementing zero-trust architecture in modern applications, from identity verification to continuous monitoring.",
    category: "Security",
    pages: 184,
    downloadCount: "24.5K",
    coverColor: "#0a0e14",
    coverGradient: "from-[#0a0e14] to-[#1a1f2e]",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=1600&fit=crop",
    authors: ["Dr. Sarah Chen", "Marcus Aurelius"],
    tags: ["Security", "Architecture", "DevOps"],
    featured: true,
    releaseDate: "June 2026",
  },
  {
    id: "2",
    title: "Designing for Emotion",
    subtitle: "The Psychology of Digital Experience",
    description:
      "How to create products that resonate on a human level, using neuroscience, behavioral psychology, and aesthetic principles.",
    category: "Design",
    pages: 212,
    downloadCount: "18.2K",
    coverColor: "#1a0e0a",
    coverGradient: "from-[#1a0e0a] to-[#2e1a14]",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=1600&fit=crop",
    authors: ["Isabella Rossi", "Elena Vogt"],
    tags: ["UX", "Psychology", "Design"],
    releaseDate: "May 2026",
  },
  {
    id: "3",
    title: "Fintech Infrastructure",
    subtitle: "Building Trading Systems That Never Sleep",
    description:
      "Architectural patterns, performance optimization, and reliability engineering for high-frequency trading platforms.",
    category: "Engineering",
    pages: 256,
    downloadCount: "12.8K",
    coverColor: "#0e1a14",
    coverGradient: "from-[#0e1a14] to-[#1a2e24]",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=1600&fit=crop",
    authors: ["James Okonkwo", "Marcus Aurelius"],
    tags: ["Fintech", "Performance", "Systems"],
    releaseDate: "April 2026",
  },
  {
    id: "4",
    title: "The AI Product Handbook",
    subtitle: "From Prototype to Production",
    description:
      "A practical guide for product managers and engineers building AI-powered products that actually deliver value.",
    category: "Technology",
    pages: 168,
    downloadCount: "9.4K",
    coverColor: "#14100e",
    coverGradient: "from-[#14100e] to-[#2e1e14]",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=1600&fit=crop",
    authors: ["Dr. Sarah Chen", "Elena Vogt"],
    tags: ["AI", "Product", "Machine Learning"],
    releaseDate: "March 2026",
  },
  {
    id: "5",
    title: "Scale & Sustainability",
    subtitle: "Engineering for 10x Growth",
    description:
      "Strategies for building systems that can handle massive growth without breaking—from databases to deployment pipelines.",
    category: "Engineering",
    pages: 196,
    downloadCount: "7.1K",
    coverColor: "#0e0e14",
    coverGradient: "from-[#0e0e14] to-[#1e1e2e]",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=1600&fit=crop",
    authors: ["James Okonkwo", "Marcus Aurelius"],
    tags: ["Scalability", "Infrastructure", "DevOps"],
    releaseDate: "February 2026",
  },
  {
    id: "6",
    title: "The Human Interface",
    subtitle: "Designing for Accessibility & Inclusion",
    description:
      "A framework for creating digital products that work for everyone, regardless of ability or context.",
    category: "Design",
    pages: 144,
    downloadCount: "5.8K",
    coverColor: "#1a0e1a",
    coverGradient: "from-[#1a0e1a] to-[#2e1a2e]",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=1600&fit=crop",
    authors: ["Isabella Rossi"],
    tags: ["Accessibility", "Inclusion", "Design"],
    releaseDate: "January 2026",
  },
];

function EbookCard({ ebook, index }: { ebook: Ebook; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: index * 0.06,
      });

      // Cover 3D tilt on scroll
      if (coverRef.current) {
        gsap.to(coverRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
          rotateX: 2,
          rotateY: index % 2 === 0 ? 3 : -3,
          y: -15,
          ease: "none",
        });
      }

      // Content reveal
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 82%",
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Badge animation
      if (badgeRef.current && ebook.featured) {
        gsap.from(badgeRef.current, {
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 85%",
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2.5)",
          delay: 0.3,
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, ebook.featured]);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-500 ${
        ebook.featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Cover */}
        <div
          ref={coverRef}
          className={`relative flex-shrink-0 overflow-hidden ${
            ebook.featured ? "md:w-2/5" : "md:w-1/3"
          }`}
        >
          <div
            className={`aspect-[3/4] w-full bg-gradient-to-br ${ebook.coverGradient}`}
          >
            <img
              src={ebook.image}
              alt={ebook.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Gradient overlays - only bottom and subtle edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/10 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/10 pointer-events-none" />

            {/* Pages count */}
            <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-white/50">
              {ebook.pages} pages
            </div>

            {/* Category */}
            <div className="absolute top-4 right-4">
              <span className="text-[8px] uppercase tracking-[0.3em] bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10 text-white/70">
                {ebook.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className={`flex-1 p-6 lg:p-8 flex flex-col ${
            ebook.featured ? "md:w-3/5" : "md:w-2/3"
          }`}
        >
          {/* Featured Badge */}
          {ebook.featured && (
            <div ref={badgeRef} className="mb-4">
              <span className="text-[8px] uppercase tracking-[0.3em] bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 text-amber-400/90">
                ★ Editors Pick
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            className={`font-medium text-white leading-tight ${
              ebook.featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
            }`}
          >
            {ebook.title}
          </h3>

          <p className="text-white/40 text-sm mt-1">{ebook.subtitle}</p>

          {/* Description */}
          <p
            className={`text-white/50 leading-relaxed mt-3 ${
              ebook.featured ? "text-sm" : "text-sm"
            }`}
          >
            {ebook.description}
          </p>

          {/* Authors */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex -space-x-2">
              {ebook.authors.map((author, i) => (
                <div
                  key={author}
                  className="w-7 h-7 rounded-full bg-white/10 border border-[#050505] flex items-center justify-center text-white/40 text-[8px] font-medium"
                  style={{ zIndex: ebook.authors.length - i }}
                >
                  {author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-white/30">
              {ebook.authors.join(" & ")}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
            <div>
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                Downloads
              </span>
              <p className="text-sm text-white/70 font-medium">
                {ebook.downloadCount}
              </p>
            </div>
            <div className="w-px h-8 bg-white/5" />
            <div>
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                Released
              </span>
              <p className="text-sm text-white/70 font-medium">
                {ebook.releaseDate}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {ebook.tags.map((tag) => (
              <span
                key={tag}
                className="text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/30 hover:bg-white/10 hover:text-white/60 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Download Button */}
          <div className="mt-4">
            <button className="w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] transition-all duration-300 group-hover:border-white/20">
              Download Free PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EbooksPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Grid entrance
      if (gridRef.current) {
        gsap.from(gridRef.current, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // CTA entrance
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const featuredEbooks = ebooks.filter((ebook) => ebook.featured);
  const regularEbooks = ebooks.filter((ebook) => !ebook.featured);

  return (
    <section className="relative bg-[#050505] overflow-hidden min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.015)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.01)_0%,_transparent_50%)] pointer-events-none" />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative w-full max-w-[85vw] mx-auto px-6 pt-32 pb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">
                — Library
              </span>
              <span className="h-px w-12 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                {ebooks.length} Ebooks
              </span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.03em] leading-[0.95]">
              Free <span className="text-white/20">Ebooks</span>
            </h1>
            <p className="text-white/30 text-base max-w-xl mt-4">
              In-depth guides and frameworks from our team — available for free
              download.
            </p>
          </div>

          <div className="flex gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20 pb-1">
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              All
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              Design
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              Engineering
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              Security
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="w-full max-w-[85vw] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...featuredEbooks, ...regularEbooks].map((ebook, index) => (
            <EbookCard key={ebook.id} ebook={ebook} index={index} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="w-full max-w-[85vw] mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 lg:p-14">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
                — Get more
              </span>
              <h3 className="text-2xl lg:text-3xl font-medium text-white mt-2">
                Want early access to <span className="text-white/20">new</span>{" "}
                ebooks?
              </h3>
              <p className="text-white/30 text-sm max-w-lg mt-1">
                Join our community of 12,000+ readers. Get new releases before
                anyone else.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-[220px] px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EbooksPage;
