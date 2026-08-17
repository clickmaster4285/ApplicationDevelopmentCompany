// demo.tsx

import React from "react";
import { TravelRouteCard } from "@/components/ui/whyUsCard";
import { Zap, Layers, Cpu, Shield, Headphones, Gauge } from "lucide-react";

const whyUs1 = "/images/whyUs1.jpeg";
const whyUs2 = "/images/whyUs2.jpeg";
const whyUs3 = "/images/whyUs3.jpeg";
const whyUs4 = "/images/whyUs4.jpeg";
const whyUs5 = "/images/whyUs5.jpeg";
const whyUs6 = "/images/whyUs6.jpeg";

const items = [
  {
    icon: Zap,
    title: "Business-Focused Development",
    desc: "We connect technical decisions with real business needs, user requirements, and project goals.",
    imageUrl: whyUs1,
  },
  {
    icon: Layers,
    title: "Custom Development",
    desc: "Your application is built around your required features, workflows, users, and integrations instead of a fixed template.",
    imageUrl: whyUs2,
  },
  {
    icon: Cpu,
    title: "Clear Development Process",
    desc: "You know what stage your application is in and what work comes next throughout the development process.",
    imageUrl: whyUs3,
  },
  {
    icon: Gauge,
    title: "Scalable Architecture",
    desc: "We plan applications so they can support new users, features, integrations, and changing business requirements.",
    imageUrl: whyUs4,
  },
  {
    icon: Shield,
    title: "Security in Development",
    desc: "Security is considered throughout planning, development, testing, deployment, and ongoing support.",
    imageUrl: whyUs5,
  },
  {
    icon: Headphones,
    title: "Long-Term Support",
    desc: "Our relationship does not need to end at launch. We can continue improving and maintaining your application as your business grows.",
    imageUrl: whyUs6,
  },
];

export function WhyUs() {
  return (
    <>
      <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4 mb-42">
        <div className="  w-[85vw] px-6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
                — WHY CHOOSE US
              </div>
              <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
                Why Choose
                <br />
                <span className="text-zinc-300"> ClickMasters?</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <TravelRouteCard
                key={index}
                title={item.title}
                author={item.desc}
                distance="12K"
                initialLikes={1527}
                imageUrl={item.imageUrl}
                className="w-full max-w-none" // Override the max-w-md
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
