"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";

function ParticleField() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const particleCount = 2000;

  const particles = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
       /* eslint-disable react-hooks/purity */
      temp[i * 3] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 40;
       /* eslint-enable react-hooks/purity */
    }
    return temp;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.0001;
      ref.current.rotation.y += 0.0002;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#65d9ff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function ThreeHero() {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 25]} />
      <ParticleField />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </Canvas>
  );
}
