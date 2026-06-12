import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function ChromeCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.18;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <icosahedronGeometry args={[1.15, 6]} />
      <meshPhysicalMaterial
        color="#e8edf2"
        metalness={1}
        roughness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function OrbitNode({ radius, speed, offset, size = 0.18, color = "#ffffff" }: { radius: number; speed: number; offset: number; size?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * radius * 0.35, Math.sin(t) * radius);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size * 1.6, 0.04]} />
      <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} emissive="#1a1a1a" />
    </mesh>
  );
}

function ConnectionLines({ count = 14 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const a = (i / count) * Math.PI * 2;
      const r = 2.2 + Math.sin(i) * 0.4;
      return new THREE.Vector3(Math.cos(a) * r, Math.sin(a * 1.3) * 0.7, Math.sin(a) * r);
    });
  }, [count]);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y -= dt * 0.04;
  });
  return (
    <group ref={group}>
      {lines.map((p, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([0, 0, 0, p.x, p.y, p.z]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#c9cdd2" transparent opacity={0.22} />
        </line>
      ))}
    </group>
  );
}

function Particles({ count = 250 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#e8edf2" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={[0x050505]} />
      <fog attach="fog" args={[0x050505, 6, 14]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 4, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#c9cdd2" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          <ChromeCore />
        </Float>
        <OrbitNode radius={2.3} speed={0.5} offset={0} />
        <OrbitNode radius={2.6} speed={0.35} offset={1.4} size={0.22} />
        <OrbitNode radius={2.1} speed={0.6} offset={3.0} size={0.14} />
        <OrbitNode radius={2.8} speed={0.28} offset={4.5} size={0.2} />
        <OrbitNode radius={2.4} speed={0.45} offset={5.8} size={0.16} />
        <ConnectionLines />
        <Particles />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
