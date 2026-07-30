"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Blog post data
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title:
      "The Architecture of Trust: Building HIPAA-Compliant Systems at Scale",
    excerpt:
      "How we engineered a telehealth platform that processes 2M+ daily requests while maintaining zero-trust security and sub-100ms latency.",
    category: "Engineering",
    date: "May 15, 2026",
    readTime: "8 min read",
    author: "Dr. Sarah Chen",
    authorRole: "CTO, Lumen Studio",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=800&fit=crop",
    tags: ["Security", "Healthcare", "Scalability"],
    featured: true,
  },
  {
    id: "2",
    title: "Cinematic Commerce: Why Luxury Brands Are Embracing Slow UX",
    excerpt:
      "In an era of instant gratification, high-end retailers are discovering that friction—when designed intentionally—can become their greatest asset.",
    category: "Design",
    date: "May 8, 2026",
    readTime: "6 min read",
    author: "Marcus Aurelius",
    authorRole: "Design Director",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop",
    tags: ["UX", "Luxury", "E-commerce"],
  },
  {
    id: "3",
    title: "From 34% to 98%: The Retention Playbook for EdTech",
    excerpt:
      "A deep dive into the adaptive learning algorithms and community mechanics that transformed course completion rates for a global education platform.",
    category: "Product",
    date: "April 28, 2026",
    readTime: "10 min read",
    author: "Elena Vogt",
    authorRole: "Head of Product",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop",
    tags: ["EdTech", "Retention", "AI"],
  },
  {
    id: "4",
    title: "Sub-Millisecond Trading: The Fintech Infrastructure Race",
    excerpt:
      "Building a trading platform that processes 10M+ quotes daily with 50μs latency required rethinking everything from network topology to memory management.",
    category: "Engineering",
    date: "April 20, 2026",
    readTime: "12 min read",
    author: "James Okonkwo",
    authorRole: "Lead Engineer",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop",
    tags: ["Fintech", "Performance", "Systems"],
  },
  {
    id: "5",
    title: "The Psychology of Premium: Designing for Emotional Connection",
    excerpt:
      "How we use color, typography, and micro-interactions to create digital experiences that feel like physical luxury—and why it matters.",
    category: "Design",
    date: "April 12, 2026",
    readTime: "7 min read",
    author: "Isabella Rossi",
    authorRole: "Senior Designer",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=800&fit=crop",
    tags: ["Psychology", "Branding", "Interaction"],
  },
  {
    id: "6",
    title: "Beyond the Hype: Practical AI in Production",
    excerpt:
      "A pragmatic look at where AI actually delivers value today—from predictive analytics to natural language interfaces—without the buzzwords.",
    category: "Technology",
    date: "April 5, 2026",
    readTime: "9 min read",
    author: "Dr. Sarah Chen",
    authorRole: "CTO, Lumen Studio",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop",
    tags: ["AI", "Machine Learning", "Production"],
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: index * 0.05,
      });

      // Image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
          y: index % 2 === 0 ? 30 : -30,
          scale: 1.05,
          ease: "none",
        });
      }

      // Content reveal
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Tags stagger
      if (tagsRef.current) {
        const tags = tagsRef.current.querySelectorAll(".tag-item");
        gsap.from(tags, {
          scrollTrigger: {
            trigger: tagsRef.current,
            start: "top 85%",
          },
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.3,
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-700 ${
        post.featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {/* Image Container */}
      <div
        ref={imageRef}
        className="relative h-56 lg:h-64 overflow-hidden bg-[#0a0a0a]"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] uppercase tracking-[0.25em] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 text-white/70">
            {post.category}
          </span>
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="text-[8px] uppercase tracking-[0.2em] bg-amber-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-400/90">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6 lg:p-8 space-y-4">
        {/* Meta */}
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-white/30">
          <span>{post.date}</span>
          <span className="w-px h-3 bg-white/10" />
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3
          className={`font-medium leading-tight text-white transition-colors ${
            post.featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-[10px] font-medium">
            {post.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-xs text-white/70 font-medium">{post.author}</p>
            <p className="text-[10px] text-white/30">{post.authorRole}</p>
          </div>
        </div>

        {/* Tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-2 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="tag-item text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/30 hover:bg-white/10 hover:text-white/60 transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}

export function BlogPage() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured section entrance
      if (featuredRef.current) {
        gsap.from(featuredRef.current, {
          scrollTrigger: {
            trigger: featuredRef.current,
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
    });

    return () => ctx.revert();
  }, []);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section className="relative bg-[#050505] overflow-hidden min-h-screen">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="relative w-full max-w-[85vw] mx-auto px-6 pt-32 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">
            — Insights
          </span>
          <span className="h-px w-16 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            {blogPosts.length} Articles
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.03em] leading-[0.95]">
              The <span className="text-white/20">Alpha's</span> Blog
            </h1>
            <p className="text-white/30 text-base max-w-xl mt-4">
              Stories, frameworks, and lessons from building products that
              define industries.
            </p>
          </div>

          <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-white/20 pb-1">
            <span className="hover:text-white/60 transition-colors cursor-pointer">
              Design
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer">
              Engineering
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer">
              Product
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer">
              Culture
            </span>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPosts.length > 0 && (
        <div
          ref={featuredRef}
          className="w-full max-w-[85vw] mx-auto px-6 pb-16"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
                <img
                  src={featuredPosts[0].image}
                  alt={featuredPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-60 lg:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent lg:hidden" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-amber-400/70">
                    Featured Story
                  </span>
                  <span className="w-px h-4 bg-white/10" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {featuredPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-4xl font-medium text-white leading-tight mb-4">
                  {featuredPosts[0].title}
                </h2>
                <p className="text-white/50 text-sm lg:text-base leading-relaxed max-w-lg">
                  {featuredPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-xs font-medium">
                      {featuredPosts[0].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm text-white/80 font-medium">
                        {featuredPosts[0].author}
                      </p>
                      <p className="text-[10px] text-white/30">
                        {featuredPosts[0].authorRole}
                      </p>
                    </div>
                  </div>
                  <span className="w-px h-8 bg-white/10" />
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    {featuredPosts[0].date}
                    <span className="block">{featuredPosts[0].readTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featuredPosts[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div ref={gridRef} className="w-full max-w-[85vw] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="w-full max-w-[85vw] mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent p-8 lg:p-12">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
                — Stay in the loop
              </span>
              <h3 className="text-2xl lg:text-3xl font-medium text-white mt-2">
                Subscribe to our <span className="text-white/20">weekly</span>{" "}
                digest
              </h3>
              <p className="text-white/30 text-sm max-w-md mt-1">
                Insights from the trenches — delivered every Friday.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-[200px] px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPage;
