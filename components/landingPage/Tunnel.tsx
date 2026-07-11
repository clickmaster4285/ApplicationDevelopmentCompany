import { useEffect, useRef, useState, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  Search, Compass, Map, Users, Target, Lightbulb,
  Palette, PenTool, Layers, Frame, MousePointer2, Brush,
  Code2, Terminal, GitBranch, Braces, Boxes, Cpu,
  Bug, ShieldCheck, Gauge, FlaskConical, Activity, CheckCircle2,
  Rocket, Cloud, BarChart3, Globe, Zap, TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type IconCmp = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

const stages: Array<{
  title: string; num: string; desc: string; icons: IconCmp[];
}> = [
  { title: "Discovery & Strategy", num: "01", desc: "We map the territory — users, market, business model, and the first sketch of the system.",
    icons: [Search, Compass, Map, Users, Target, Lightbulb] },
  { title: "UI/UX Design", num: "02", desc: "Interfaces assemble from grids and wireframes into living, interactive prototypes.",
    icons: [Palette, PenTool, Layers, Frame, MousePointer2, Brush] },
  { title: "Development", num: "03", desc: "Code streams together — services, components and infrastructure compile as one.",
    icons: [Code2, Terminal, GitBranch, Braces, Boxes, Cpu] },
  { title: "Testing & Optimization", num: "04", desc: "QA, performance and accessibility tuned until every interaction lands precisely.",
    icons: [Bug, ShieldCheck, Gauge, FlaskConical, Activity, CheckCircle2] },
  { title: "Launch & Scale", num: "05", desc: "A polished product enters the world — cloud, analytics and a roadmap to scale.",
    icons: [Rocket, Cloud, BarChart3, Globe, Zap, TrendingUp] },
];

// Flatten icons across the tunnel length, grouped by stage so each segment
// shows the right tool family as the camera passes through.
const TUNNEL_LENGTH = 110; // matches outer cylinder length
const ICONS_PER_STAGE = 6;
const tunnelIcons = stages.flatMap((stage, sIdx) =>
  stage.icons.map((Icon, i) => {
    const total = stages.length * ICONS_PER_STAGE;
    const flatIndex = sIdx * ICONS_PER_STAGE + i;
    // Spread along z within the stage's slice
    const stageStart = -(sIdx / stages.length) * TUNNEL_LENGTH - 2;
    const stageEnd = -((sIdx + 1) / stages.length) * TUNNEL_LENGTH - 2;
    const t = (i + 0.5) / ICONS_PER_STAGE;
    const z = stageStart + (stageEnd - stageStart) * t;
    const angle = flatIndex * 1.7;
    const radius = 2.1 + ((flatIndex * 13) % 7) * 0.05;
    return {
      Icon,
      position: [Math.cos(angle) * radius, Math.sin(angle) * radius, z] as [number, number, number],
      rot: angle,
    };
  })
);

function TunnelScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const tunnel = useRef<THREE.Group>(null);
  const camera = useRef<THREE.PerspectiveCamera>(null);
  useFrame(({ camera: cam, clock }) => {
    const p = progressRef.current;
    // Move camera through tunnel
    cam.position.z = 6 - p * 60;
    cam.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.04;
    if (tunnel.current) {
      tunnel.current.rotation.z += 0.0008;
    }
  });

  // Tunnel ring geometry
  const ringCount = 40;
  return (
    <>
      <color attach="background" args={[0x050505]} />
      <fog attach="fog" args={[0x050505, 4, 30]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 0, -20]} intensity={1.5} color="#e8edf2" />
      <group ref={tunnel}>
        {Array.from({ length: ringCount }).map((_, i) => {
          const z = -i * 2.5;
          return (
            <mesh key={i} position={[0, 0, z]} rotation={[0, 0, (i * Math.PI) / 12]}>
              <torusGeometry args={[3.2, 0.04, 16, 64]} />
            </mesh>
          );
        })}
        {/* Outer cylinder for ambience */}
        <mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[3.4, 3.4, 110, 32, 1, true]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.6}
            roughness={0.5}
            side={THREE.BackSide}
            emissive="#050505"
          />
        </mesh>
        {/* Floating tool icons (per-stage) */}
        {tunnelIcons.map(({ Icon, position, rot }, i) => (
          <group key={`icon-${i}`} position={position} rotation={[0, 0, rot]}>
            <Html
              center
              transform
              sprite
              distanceFactor={2.4}
              style={{ pointerEvents: "none" }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/15 bg-black/40 backdrop-blur-md shadow-[0_0_24px_rgba(232,237,242,0.18)]">
                <Icon size={22} strokeWidth={1.5} className="text-white/90" />
              </div>
            </Html>
          </group>
        ))}
      </group>
      <Environment preset="studio" />
    </>
  );
}

export function Tunnel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * stages.length * 1.2}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const idx = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
          setActive(idx);
          stageRefs.current.forEach((el, i) => {
            if (!el) return;
            const localStart = i / stages.length;
            const localEnd = (i + 1) / stages.length;
            const within = (self.progress - localStart) / (localEnd - localStart);
            const opacity = within < 0 || within > 1 ? 0 : within < 0.2 ? within / 0.2 : within > 0.8 ? (1 - within) / 0.2 : 1;
            const translate = (within - 0.5) * 60;
            el.style.opacity = String(Math.max(0, opacity));
            el.style.transform = `translateY(${translate}px)`;
          });
        },
      });
      return () => trigger.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.8]} className="!absolute inset-0">
        <TunnelScene progressRef={progressRef} />
      </Canvas>

      {/* Cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.85)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,transparent_15%,transparent_85%,#050505_100%)]" />

      {/* Eyebrow */}
      <div className="absolute top-10 left-0 right-0 flex justify-center z-10">
        <div className="text-[10px] uppercase tracking-[0.5em] text-white/40 border border-white/10 rounded-full px-5 py-2 backdrop-blur bg-black/30">
          The Application Growth Tunnel
        </div>
      </div>

      {/* Stage copy (absolute, faded by scroll) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        {stages.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => { stageRefs.current[i] = el; }}
            className="absolute text-center max-w-2xl"
            style={{ opacity: 0 }}
          >
            <div className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-5">Stage {s.num}</div>
            <h3 className="text-chrome text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02]">
              {s.title}
            </h3>
            <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className={`text-[10px] tracking-[0.3em] transition-colors ${active === i ? "text-white" : "text-white/30"}`}>
              {s.num}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${active === i ? "w-10 bg-chrome" : "w-4 bg-white/20"}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
