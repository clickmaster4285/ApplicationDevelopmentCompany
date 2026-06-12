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
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame(({ camera, clock }) => {
    const p = progressRef.current;
    // Move camera through tunnel
    camera.position.z = 6 - p * 55;
    camera.position.x = Math.sin(clock.elapsedTime * 0.15) * 0.2;
    camera.position.y = Math.cos(clock.elapsedTime * 0.2) * 0.15;
    camera.lookAt(0, 0, camera.position.z - 1);
    
    if (tunnel.current) {
      tunnel.current.rotation.z += 0.003;
      tunnel.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Tunnel ring geometry
  const ringCount = 45;
  
  return (
    <>
      <color attach="background" args={[0x020210]} />
      <fog attach="fog" args={[0x020210, 8, 45]} />
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} color="#e8eef5" />
      <directionalLight position={[-2, 1, -3]} intensity={0.5} color="#8a9bb5" />
      <pointLight position={[0, 2, 0]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 0, 10]} intensity={1.2} color="#c0d0e8" distance={20} />
      <pointLight position={[0, 0, -15]} intensity={0.8} color="#5a6e8a" distance={25} />
      
      <group ref={tunnel}>
        {/* Main tunnel rings */}
        {Array.from({ length: ringCount }).map((_, i) => {
          const z = -i * 2.4;
          const ringColor = i % 5 === 0 ? "#d0d8e8" : "#8a9bb5";
          const emissiveIntensity = i % 8 === 0 ? 0.15 : 0.05;
          
          return (
            <mesh key={`ring-${i}`} position={[0, 0, z]} rotation={[0, 0, (i * Math.PI) / 16]}>
              <torusGeometry args={[3.0, 0.045, 24, 96]} />
              <meshStandardMaterial 
                color={ringColor} 
                metalness={0.92} 
                roughness={0.22} 
                emissive={i % 4 === 0 ? "#4a6080" : "#1a2030"}
                emissiveIntensity={emissiveIntensity}
              />
            </mesh>
          );
        })}
        
        {/* Inner glow rings */}
        {Array.from({ length: 15 }).map((_, i) => {
          const z = -i * 7;
          return (
            <mesh key={`glow-${i}`} position={[0, 0, z]} rotation={[0, 0, 0]}>
              <torusGeometry args={[2.85, 0.012, 16, 120]} />
              <meshStandardMaterial color="#a0c0e8" emissive="#6080b0" emissiveIntensity={0.3} transparent opacity={0.6} />
            </mesh>
          );
        })}
        
        {/* Outer cylinder ambience */}
        <mesh position={[0, 0, -52]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[3.5, 3.5, 115, 48, 1, true]} />
          <meshStandardMaterial
            color="#080c18"
            metalness={0.7}
            roughness={0.4}
            side={THREE.BackSide}
            emissive="#050810"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Additional rail wires */}
        {[-1.8, 1.8].map((xOffset, idx) => (
          Array.from({ length: 30 }).map((_, i) => {
            const z = -i * 3.5;
            return (
              <mesh key={`rail-${idx}-${i}`} position={[xOffset, 0, z]}>
                <sphereGeometry args={[0.035, 6, 6]} />
                <meshStandardMaterial color="#b8c8e0" emissive="#4060a0" emissiveIntensity={0.2} />
              </mesh>
            );
          })
        ))}
        
        {/* Floating tool icons */}
        {tunnelIcons.map(({ Icon, position, rot }, i) => (
          <group key={`icon-${i}`} position={position} rotation={[0, 0, rot]}>
            <Html
              center
              transform
              sprite
              distanceFactor={2.2}
              style={{ pointerEvents: "none" }}
              zIndexRange={[1, 0]}
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(100,150,220,0.3)] transition-all duration-300 hover:scale-105">
                <Icon size={20} strokeWidth={1.5} className="text-white/90" />
              </div>
            </Html>
          </group>
        ))}
      </group>
      
      {/* Star particles for depth */}
      {Array.from({ length: 800 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 80 - 40;
        return (
          <mesh key={`star-${i}`} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshStandardMaterial color="#e0e8ff" emissive="#6080c0" emissiveIntensity={0.4} />
          </mesh>
        );
      })}
      
      <Environment preset="night" />
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
