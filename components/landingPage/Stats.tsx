"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DELIVERED } from "@/lib/company";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: PROJECTS_DELIVERED, label: "Projects Delivered", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
  { value: 40, label: "Enterprise Clients", suffix: "+" },
  { value: 10, label: "Users Impacted", suffix: "M+" },
];

const animateToTarget = (
  element: HTMLElement,
  target: number,
  suffix: string,
  duration: number = 1800,
  animations: Map<HTMLElement, gsap.core.Tween>,
) => {
  const currentText =
    element.textContent?.replace(suffix, "").replace(/,/g, "") || "0";
  const start = parseInt(currentText, 10) || 0;

  animations.get(element)?.kill();
  if (start === target) return;

  const counter = { value: start };
  const tween = gsap.to(counter, {
    value: target,
    duration: duration / 1000,
    ease: "power1.out",
    onUpdate: () => {
      element.textContent = Math.floor(counter.value).toLocaleString() + suffix;
    },
    onComplete: () => {
      element.textContent = target.toLocaleString() + suffix;
      animations.delete(element);
    },
  });
  animations.set(element, tween);
};

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const counterAnimationsRef = useRef(new Map<HTMLElement, gsap.core.Tween>());

  useEffect(() => {
    const counterAnimations = counterAnimationsRef.current;

    const ctx = gsap.context(() => {
      // Kill any existing triggers
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];

      // Create scroll triggers for each stat item - triggers EVERY time user scrolls into view
      numberRefs.current.forEach((el, idx) => {
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => {
            const targetValue = stats[idx].value;
            el.textContent = "0" + stats[idx].suffix;
            animateToTarget(
              el,
              targetValue,
              stats[idx].suffix,
              1800,
              counterAnimations,
            );
          },
          onEnterBack: () => {
            const targetValue = stats[idx].value;
            el.textContent = "0" + stats[idx].suffix;
            animateToTarget(
              el,
              targetValue,
              stats[idx].suffix,
              1800,
              counterAnimations,
            );
          },
        });

        scrollTriggersRef.current.push(trigger);

        // Also add entrance animation for the whole block
        gsap.from(el, {
          y: 120,
          opacity: 0,
          scale: 0.9,
          duration: 1.4,
          ease: "expo.out",
        });
      });
    }, ref);

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      counterAnimations.forEach((animation) => animation.kill());
      counterAnimations.clear();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto w-[85vw] px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">
          — In Numbers
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12">
          {stats.map((s, idx) => (
            <div key={s.label} className="border-t border-white/10 pt-8">
              <div
                ref={(el) => {
                  numberRefs.current[idx] = el;
                }}
                data-stat
                className="text-chrome-shine text-[clamp(4rem,12vw,11rem)] leading-[0.9] font-medium tracking-[-0.05em]"
              >
                {s.value.toLocaleString()}
                {s.suffix}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.4em] text-white/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
