import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, label: "Projects Delivered", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
  { value: 40, label: "Enterprise Clients", suffix: "+" },
  { value: 10, label: "Users Impacted", suffix: "M+" },
];

// Counter animation function that runs from current value to target
const animateToTarget = (element: HTMLElement, target: number, suffix: string, duration: number = 1800) => {
  // Get current displayed number (remove suffix and commas)
  const currentText = element.textContent?.replace(suffix, "").replace(/,/g, "") || "0";
  const start = parseInt(currentText, 10) || 0;
  
  if (start === target) return;
  
  const range = target - start;
  const increment = range / (duration / 16); // ~60fps
  let current = start;
  
  // Clear any existing interval
  if ((element as any)._counterInterval) {
    clearInterval((element as any)._counterInterval);
  }
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      current = target;
      element.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
      (element as any)._counterInterval = null;
    } else {
      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }
  }, 16);
  
  (element as any)._counterInterval = timer;
};

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial values to 0
      numberRefs.current.forEach((el, idx) => {
        if (el) {
          el.textContent = "0" + stats[idx].suffix;
        }
      });

      // Kill any existing triggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];

      // Create scroll triggers for each stat item - triggers EVERY time user scrolls into view
      numberRefs.current.forEach((el, idx) => {
        if (!el) return;
        
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => {
            // Animate to target when scrolling down into view
            const targetValue = stats[idx].value;
            animateToTarget(el, targetValue, stats[idx].suffix);
          },
          onLeaveBack: () => {
            // Animate back to 0 when scrolling up and leaving
            animateToTarget(el, 0, stats[idx].suffix, 1200);
          },
          onEnterBack: () => {
            // Animate to target again when scrolling back down into view
            const targetValue = stats[idx].value;
            animateToTarget(el, targetValue, stats[idx].suffix);
          },
          onLeave: () => {
            // Optional: animate to 0 when scrolling up past the element
            // Uncomment if you want it to reset when scrolling past (not just leaving back)
            // animateToTarget(el, 0, stats[idx].suffix, 1200);
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
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto w-[85vw] px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5">— In Numbers</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12">
          {stats.map((s, idx) => (
            <div key={s.label} className="border-t border-white/10 pt-8">
              <div
                ref={(el) => { numberRefs.current[idx] = el; }}
                data-stat
                className="text-chrome-shine text-[clamp(4rem,12vw,11rem)] leading-[0.9] font-medium tracking-[-0.05em]"
              >
                0{s.suffix}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.4em] text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}