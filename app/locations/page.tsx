"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Building,
  Calendar,
  Award,
  TrendingUp,
  Globe,
  Star,
  ChevronRight,
  Filter,
  X,
  Check,
  Navigation,
  Target,
} from "lucide-react";

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
  region: "americas" | "europe" | "apac";
}

// Noise overlay background image (defined outside component to avoid template literal issues)
const noiseBackgroundImage = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

const locations: Location[] = [
  {
    id: "1",
    name: "ClickMasters HQ",
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
    region: "americas",
    coordinates: { lat: 40.713, lng: -74.013 },
  },
  {
    id: "2",
    name: "ClickMasters London",
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
    region: "europe",
    coordinates: { lat: 51.505, lng: -0.02 },
  },
  {
    id: "3",
    name: "ClickMasters Singapore",
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
    region: "apac",
    coordinates: { lat: 1.28, lng: 103.85 },
  },
  {
    id: "4",
    name: "ClickMasters Chicago",
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
    region: "americas",
    coordinates: { lat: 41.878, lng: -87.636 },
  },
  {
    id: "5",
    name: "ClickMasters Tokyo",
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
    region: "apac",
    coordinates: { lat: 35.66, lng: 139.729 },
  },
  {
    id: "6",
    name: "ClickMasters Sydney",
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
    region: "apac",
    coordinates: { lat: -33.866, lng: 151.21 },
  },
];

const regionConfig = {
  americas: { label: "Americas", icon: <Globe className="h-3.5 w-3.5" />, color: "text-blue-400" },
  europe: { label: "Europe", icon: <Building className="h-3.5 w-3.5" />, color: "text-emerald-400" },
  apac: { label: "APAC", icon: <Target className="h-3.5 w-3.5" />, color: "text-amber-400" },
};

function LocationCard({
  location,
  index,
  isActive = true,
}: {
  location: Location;
  index: number;
  isActive?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current || !isActive) return;

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
        delay: index * 0.08,
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
          y: index % 2 === 0 ? 40 : -40,
          scale: 1.08,
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
  }, [index, isActive]);

  const region = regionConfig[location.region];

  if (!isActive) return null;

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-500 ${
        location.featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Image */}
        <div ref={imageRef} className="relative overflow-hidden">
          <div className={`aspect-[16/10] w-full bg-[#0a0a0a] ${location.featured ? "md:aspect-[4/3]" : ""}`}>
            <motion.img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Accent line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Location badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">
                  {location.city}
                </span>
              </div>
            </div>

            {/* Region badge */}
            <div className="absolute top-4 right-4">
              <span className={`flex items-center gap-1.5 text-[8px] uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 ${region.color}`}>
                {region.icon}
                {region.label}
              </span>
            </div>

            {/* Featured badge */}
            {location.featured && (
              <div className="absolute bottom-4 left-4">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] bg-amber-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-400/90">
                  <Star className="h-3 w-3 fill-current" />
                  Global Headquarters
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 p-6 lg:p-8 space-y-5">
          <div className="space-y-1.5">
            <h3 className="text-xl lg:text-2xl font-medium text-white group-hover:text-primary transition-colors">
              {location.name}
            </h3>
            <p className="text-sm text-white/40 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {location.city}, {location.country}
            </p>
          </div>

          <p className="text-white/50 text-sm leading-relaxed">
            {location.description}
          </p>

          {/* Address */}
          <div className="flex items-start gap-2 text-[10px] uppercase tracking-[0.1em] text-white/30">
            <Navigation className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{location.address}</span>
          </div>

          {/* Metrics */}
          <div
            ref={metricRef}
            className="flex items-center gap-6 pt-4 border-t border-white/5"
          >
            <div className="metric-item flex-1">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20 block mb-0.5">
                Team
              </span>
              <p className="text-lg text-white/70 font-medium">
                {location.teamSize}
              </p>
            </div>
            <div className="w-px h-10 bg-white/5 hidden md:block" />
            <div className="metric-item flex-1">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20 block mb-0.5">
                Founded
              </span>
              <p className="text-lg text-white/70 font-medium">
                {location.founded}
              </p>
            </div>
            <div className="w-px h-10 bg-white/5 hidden md:block" />
            <div className="metric-item flex-1">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20 block mb-0.5">
                Region
              </span>
              <p className="text-lg text-white/70 font-medium flex items-center gap-1.5">
                {region.icon}
                {region.label}
              </p>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {location.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/30 hover:bg-primary/20 hover:border-primary/30 hover:text-primary transition-all cursor-default group-hover:bg-primary/10 group-hover:border-primary/20"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Action button */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              View studio details
            </span>
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-white/40 hover:text-primary transition-colors group-hover:text-primary"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LocationsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "americas" | "europe" | "apac">("all");
  const [filteredLocations, setFilteredLocations] = useState(locations);

  useEffect(() => {
    const filtered = activeFilter === "all" 
      ? locations 
      : locations.filter(loc => loc.region === activeFilter);
    setFilteredLocations(filtered);
  }, [activeFilter]);

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

  const featuredLocation = filteredLocations.find((loc) => loc.featured);
  const regularLocations = filteredLocations.filter((loc) => !loc.featured);

  const totalTeam = locations.reduce((acc, loc) => acc + loc.teamSize, 0);
  const totalCountries = new Set(locations.map(l => l.country)).size;
  const earliestYear = Math.min(...locations.map(l => parseInt(l.founded)));
  const americasCount = locations.filter(l => l.region === "americas").length;
  const europeCount = locations.filter(l => l.region === "europe").length;
  const apacCount = locations.filter(l => l.region === "apac").length;

  return (
    <section className="relative bg-[#050505] overflow-hidden min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.015)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: noiseBackgroundImage,
        mixBlendMode: 'overlay',
      }} />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative w-full max-w-[85vw] mx-auto px-6 pt-32 pb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">
                — Global Footprint
              </span>
              <span className="h-px w-12 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                {locations.length} Studios Worldwide
              </span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.03em] leading-[0.95] max-w-3xl">
              Where <span className="text-white/20">Finance</span> Meets{" "}
              <span className="text-white/20">Innovation</span>
            </h1>
            <p className="text-white/30 text-base max-w-xl mt-5">
              Six global studios, united by a mission to build the future of
              financial technology — from trading floors to wealth management.
            </p>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            <FilterTab
              label="All"
              count={locations.length}
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            <FilterTab
              label="Americas"
              count={americasCount}
              active={activeFilter === "americas"}
              onClick={() => setActiveFilter("americas")}
              icon={<Globe className="h-3 w-3" />}
              color="text-blue-400"
            />
            <FilterTab
              label="Europe"
              count={europeCount}
              active={activeFilter === "europe"}
              onClick={() => setActiveFilter("europe")}
              icon={<Building className="h-3 w-3" />}
              color="text-emerald-400"
            />
            <FilterTab
              label="APAC"
              count={apacCount}
              active={activeFilter === "apac"}
              onClick={() => setActiveFilter("apac")}
              icon={<Target className="h-3 w-3" />}
              color="text-amber-400"
            />
          </motion.div>
      </motion.div>
    </div>

    {/* Stats Bar */}
      <div ref={statsRef} className="w-full max-w-[85vw] mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          <StatCard
            value={locations.length}
            label="Global Studios"
            icon={<Building className="h-6 w-6" />}
            delay={0}
          />
          <StatCard
            value={totalTeam}
            label="Team Members"
            icon={<Users className="h-6 w-6" />}
            delay={0.1}
          />
          <StatCard
            value="$3.8B"
            label="AUM Managed"
            icon={<TrendingUp className="h-6 w-6" />}
            delay={0.2}
          />
          <StatCard
            value={totalCountries}
            label="Countries Served"
            icon={<Globe className="h-6 w-6" />}
            delay={0.3}
          />
        </motion.div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="w-full max-w-[85vw] mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
          {filteredLocations.length === 0 && (
            <motion.div
              className="col-span-full text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Filter className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">No studios found</h3>
              <p className="text-white/40">Try selecting a different region</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="w-full max-w-[85vw] mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 lg:p-14"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 grid place-items-center">
                  <Target className="h-4 w-4 text-primary" />
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
                  — Join the movement
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-medium text-white">
                Build the future of{" "}
                <span className="text-white/20">finance</span> with us
              </h3>
              <p className="text-white/30 text-sm max-w-lg mt-2">
                We're hiring across all our studios. Remote-first, globally
                connected — join a team that's redefining fintech.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2"
            >
              View Open Roles
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FilterTab({
  label,
  count,
  active,
  onClick,
  icon,
  color = "text-white/40",
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
        active
          ? "bg-white/10 border-white/20 text-white"
          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {icon && <span className={color}>{icon}</span>}
      <span className="text-[9px] uppercase tracking-[0.2em] font-medium">
        {label}
      </span>
      <span className={`text-[9px] font-medium ${active ? "text-white" : "text-white/30"}`}>
        {count}
      </span>
    </motion.button>
  );
}

function StatCard({
  value,
  label,
  icon,
  delay = 0,
}: {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all group"
    >
      <div className="flex justify-center mb-3 text-primary/80 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-light text-white leading-[1.1]">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1 font-medium">
        {label}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary transition-all duration-500 group-hover:w-1/2" />
    </motion.div>
  );
}

export default LocationsPage;