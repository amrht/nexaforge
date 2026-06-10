"use client";

import { useRef, useMemo, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleField({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2500;

  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = seededRandom(i * 3) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
      const r = 2.5 + seededRandom(i * 3 + 2) * 1.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return [pos, orig];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const mx = mouseRef.current.x * 0.3;
    const my = mouseRef.current.y * 0.3;

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      posAttr.array[i * 3] = ox + Math.sin(t * 0.3 + i * 0.01) * 0.05 + mx;
      posAttr.array[i * 3 + 1] =
        oy + Math.cos(t * 0.2 + i * 0.01) * 0.05 + my;
      posAttr.array[i * 3 + 2] = oz + Math.sin(t * 0.15 + i * 0.005) * 0.03;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    pointsRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.03);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#a5b4fc"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines() {
  const ref = useRef<THREE.LineSegments>(null);
  const segments = 80;

  const geometry = useMemo(() => {
    const positions = new Float32Array(segments * 6);
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const r1 = 2.8;
      const r2 = 3.2 + seededRandom(i * 2) * 0.5;
      positions[i * 6] = Math.cos(angle) * r1;
      positions[i * 6 + 1] = Math.sin(angle) * r1;
      positions[i * 6 + 2] = (seededRandom(i * 2 + 1) - 0.5) * 2;
      positions[i * 6 + 3] = Math.cos(angle + 0.3) * r2;
      positions[i * 6 + 4] = Math.sin(angle + 0.3) * r2;
      positions[i * 6 + 5] = (seededRandom(i * 2 + 2) - 0.5) * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.12} />
    </lineSegments>
  );
}

function SceneContent({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#818cf8" />
      <ParticleField mouseRef={mouseRef} />
      <ConnectionLines />
    </>
  );
}

interface ParticleSceneProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  className?: string;
  onReady?: () => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ParticleScene({ mouseRef, className, onReady }: ParticleSceneProps) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (mounted) onReady?.();
  }, [mounted, onReady]);

  if (!mounted) return null;

  return (
    <div className={className} data-cursor="canvas">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onCreated={() => onReady?.()}
      >
        <SceneContent mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
