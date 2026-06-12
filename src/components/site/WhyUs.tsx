// demo.tsx

import React from 'react';
import { TravelRouteCard } from '@/components/ui/whyUsCard';
import { Zap, Layers, Cpu, Shield, Headphones, Gauge } from 'lucide-react';
import whyUs1 from '@/assets/whyUs1.jpeg';
import whyUs2 from '@/assets/whyUs2.jpeg'
import whyUs3 from '@/assets/whyUs3.jpeg'
import whyUs4 from '@/assets/whyUs4.jpeg'

import whyUs5 from '@/assets/whyUs5.jpeg'
import whyUs6 from '@/assets/whyUs6.jpeg'

const items = [
  { 
    icon: Zap, 
    title: "Fast Delivery", 
    desc: "Tight, opinionated cycles. Production shipping in weeks, not quarters.",
    imageUrl: whyUs1,
  },
  { 
    icon: Layers, 
    title: "Scalable Architecture", 
    desc: "Systems designed for the 10x — modular, observable and resilient.",
    imageUrl:whyUs2,
  },
  { 
    icon: Cpu, 
    title: "Modern Tech Stack", 
    desc: "React, TypeScript, edge runtimes and the latest mobile frameworks.",
    imageUrl: whyUs3
  },
  { 
    icon: Shield, 
    title: "Enterprise Security", 
    desc: "SOC2 mindset, hardened auth, encryption-at-rest and continuous audits.",
    imageUrl: whyUs4
  },
  { 
    icon: Headphones, 
    title: "Dedicated Support", 
    desc: "Senior engineers on call. Real humans, real ownership, real SLAs.",
    imageUrl: whyUs5
  },
  { 
    icon: Gauge, 
    title: "Performance Optimized", 
    desc: "Sub-second LCP and 60fps interactions on every device we ship to.",
    imageUrl: whyUs6
  },
];

export function WhyUs() {
  return (
    <>
    
    
      <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4 mb-42">
      <div className="  w-[85vw] px-6 mx-auto">

          


           
             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
               <div>
                 <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— ENGINEERING EXCELLENCE</div>
                 <h2 className="text-chrome text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em] max-w-2xl">
                    Modern Systems,
    <br />
    <span className="text-zinc-300"> Fast Delivery</span>
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
              className="w-full max-w-none"  // Override the max-w-md
            />
          ))}
        </div>
      </div>
    </div>
    
    </>
  );
}