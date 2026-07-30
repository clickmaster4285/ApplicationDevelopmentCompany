"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Location data
interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  description: string;
  image: string;
  teamSize: number;
  founded: string;
  specialties: string[];
  coordinates: { lat: number; lng: number };
  featured?: boolean;
}

const locations: Location[] = [
  {
    id: "1",
    name: "Auto Motive HQ",
    city: "New York",
    country: "USA",
    address: "One World Trade Center, 85th Floor, New York, NY 10007",
    description:
      "Our global headquarters where we build institutional-grade trading platforms and portfolio analytics for the world's leading financial institutions.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    teamSize: 52,
    founded: "2018",
    specialties: ["Fintech", "Trading Systems", "Analytics"],
    featured: true,
    coordinates: { lat: 40.713, lng: -74.013 }, // Added coordinates
  },
  {
    id: "2",
    name: "Auto Motive London",
    city: "London",
    country: "UK",
    address: "One Canada Square, Canary Wharf, London, E14 5AB",
    description:
      "Our European fintech hub, focused on algorithmic trading, risk management, and regulatory technology for the UK and European markets.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop",
    teamSize: 34,
    founded: "2020",
    specialties: ["Algorithmic Trading", "Risk", "RegTech"],
    coordinates: { lat: 51.505, lng: -0.02 },
  },
  {
    id: "3",
    name: "Auto Motive Singapore",
    city: "Singapore",
    country: "Singapore",
    address: "Marina Bay Financial Centre, 8 Marina Blvd, Singapore 018981",
    description:
      "Our Asia-Pacific headquarters, specializing in high-frequency trading infrastructure and AI-driven market intelligence.",
    image:
      "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?w=1200&h=800&fit=crop",
    teamSize: 28,
    founded: "2021",
    specialties: ["HFT", "AI", "Market Intelligence"],
    coordinates: { lat: 1.28, lng: 103.85 },
  },
  {
    id: "4",
    name: "Auto Motive Chicago",
    city: "Chicago",
    country: "USA",
    address: "233 S Wacker Dr, Willis Tower, Chicago, IL 60606",
    description:
      "Our US trading technology hub, located in the heart of America's financial derivatives market. Home to our latency optimization team.",
    image:
      "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=1200&h=800&fit=crop",
    teamSize: 22,
    founded: "2022",
    specialties: ["Derivatives", "Latency", "Infrastructure"],
    coordinates: { lat: 41.878, lng: -87.636 },
  },
  {
    id: "5",
    name: "Auto Motive Tokyo",
    city: "Tokyo",
    country: "Japan",
    address:
      "Roppongi Hills Mori Tower, 6-10-1 Roppongi, Minato-ku, Tokyo 106-6108",
    description:
      "Our Japanese studio, focused on fintech innovation, mobile trading, and blockchain-based settlement systems for Asian markets.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    teamSize: 18,
    founded: "2023",
    specialties: ["Mobile Trading", "Blockchain", "Settlement"],
    coordinates: { lat: 35.66, lng: 139.729 },
  },
  {
    id: "6",
    name: "Auto Motive Sydney",
    city: "Sydney",
    country: "Australia",
    address: "1 Bligh Street, Sydney, NSW 2000",
    description:
      "Our newest studio, building next-generation wealth management platforms and sustainable finance solutions for the Asia-Pacific region.",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&h=800&fit=crop",
    teamSize: 14,
    founded: "2024",
    specialties: ["Wealth Management", "Sustainable Finance", "APAC"],
    coordinates: { lat: -33.866, lng: 151.21 },
  },
];

function LocationCard({
  location,
  index,
}: {
  location: Location;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);

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
            trigger: cardRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Metrics stagger
      if (metricRef.current) {
        const metrics = metricRef.current.querySelectorAll(".metric-item");
        gsap.from(metrics, {
          scrollTrigger: {
            trigger: metricRef.current,
            start: "top 85%",
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
          delay: 0.3,
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-500 ${
        location.featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Image */}
        <div ref={imageRef} className="relative overflow-hidden">
          <div className={`aspect-[16/10] w-full bg-[#0a0a0a]`}>
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />

            {/* Location badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">
                  {location.city}
                </span>
              </div>
            </div>

            {/* Featured badge */}
            {location.featured && (
              <div className="absolute top-4 right-4">
                <span className="text-[8px] uppercase tracking-[0.3em] bg-amber-500/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-amber-500/30 text-amber-400/90">
                  ★ Headquarters
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 p-6 lg:p-8 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl lg:text-2xl font-medium text-white">
              {location.name}
            </h3>
            <p className="text-sm text-white/40">
              {location.city}, {location.country}
            </p>
          </div>

          <p className="text-white/50 text-sm leading-relaxed">
            {location.description}
          </p>

          {/* Address */}
          <div className="flex items-start gap-2 text-[10px] uppercase tracking-[0.1em] text-white/30">
            <svg
              className="w-3 h-3 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="leading-relaxed">{location.address}</span>
          </div>

          {/* Metrics */}
          <div
            ref={metricRef}
            className="flex items-center gap-6 pt-4 border-t border-white/5"
          >
            <div className="metric-item">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                Team
              </span>
              <p className="text-sm text-white/70 font-medium">
                {location.teamSize}
              </p>
            </div>
            <div className="w-px h-8 bg-white/5" />
            <div className="metric-item">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                Founded
              </span>
              <p className="text-sm text-white/70 font-medium">
                {location.founded}
              </p>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {location.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/30 hover:bg-white/10 hover:text-white/60 transition-all cursor-default"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LocationsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
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

      // Stats entrance
      if (statsRef.current) {
        gsap.from(statsRef.current, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.15,
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
          delay: 0.3,
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
          delay: 0.4,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const featuredLocation = locations.find((loc) => loc.featured);
  const regularLocations = locations.filter((loc) => !loc.featured);

  return (
    <section className="relative bg-[#050505] overflow-hidden min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.015)_0%,_transparent_70%)] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative w-full max-w-[85vw] mx-auto px-6 pt-32 pb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">
                — Global Footprint
              </span>
              <span className="h-px w-12 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                {locations.length} Studios
              </span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.03em] leading-[0.95]">
              Where <span className="text-white/20">Finance</span> Meets{" "}
              <span className="text-white/20">Innovation</span>
            </h1>
            <p className="text-white/30 text-base max-w-xl mt-4">
              Six global studios, united by a mission to build the future of
              financial technology — from trading floors to wealth management.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              All
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              Americas
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              Europe
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              APAC
            </span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsRef} className="w-full max-w-[85vw] mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-light text-white">
              {locations.length}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1">
              Global Studios
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-light text-white">
              {locations.reduce((acc, loc) => acc + loc.teamSize, 0)}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1">
              Team Members
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-light text-white">
              $3.8B
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1">
              AUM Managed
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-light text-white">27</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1">
              Countries Served
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="w-full max-w-[85vw] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLocation && (
            <LocationCard
              key={featuredLocation.id}
              location={featuredLocation}
              index={0}
            />
          )}
          {regularLocations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              index={index + 1}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="w-full max-w-[85vw] mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 lg:p-14">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
                — Join the movement
              </span>
              <h3 className="text-2xl lg:text-3xl font-medium text-white mt-2">
                Build the future of{" "}
                <span className="text-white/20">finance</span> with us
              </h3>
              <p className="text-white/30 text-sm max-w-lg mt-1">
                We're hiring across all our studios. Remote-first, globally
                connected — join a team that's redefining fintech.
              </p>
            </div>

            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap">
              View Open Roles →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationsPage;
