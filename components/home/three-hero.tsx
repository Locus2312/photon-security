"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Shader for the fluid simulation
const fluidShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uColor: { value: new THREE.Color("#22d3ee") },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor;
    varying vec2 vUv;

    // Simplex noise for fluid motion
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 a0 = x - floor(x + 0.5);
      float m0 = 1.0 - 0.5 * dot(m, m);
      vec3 g = a0 * vec3(x0.x, x12.xz) + h * vec3(x0.y, x12.yw);
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      float d = distance(st, uMouse);
      
      // Fluid-like distortion
      float n = snoise(st * 3.0 + uTime * 0.2);
      float m = smoothstep(0.4, 0.0, d + n * 0.1);
      
      vec3 color = mix(vec3(0.02), uColor, m * 0.4);
      color += uColor * pow(m, 3.0) * 0.8;
      
      // Add subtle noise grain
      color += (snoise(st * 100.0) * 0.02);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function FluidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColor: { value: new THREE.Color("#ffffff") },
  }), [size]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smoothly interpolate mouse position
      const targetX = (state.mouse.x + 1) / 2;
      const targetY = (state.mouse.y + 1) / 2;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        vertexShader={fluidShader.vertexShader}
        fragmentShader={fluidShader.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ThreeHero() {
  return (
    <Canvas 
      className="w-full h-full" 
      camera={{ position: [0, 0, 1] }}
      dpr={[1, 2]}
    >
      <FluidBackground />
    </Canvas>
  );
}
