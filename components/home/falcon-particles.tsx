"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const N = 2800;
const K = 0.005;
const DMP = 0.80;
const SZ = 600;

const rnd = () => Math.random();

const VERT = `
  attribute float aSize;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (18.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.25, d);
    gl_FragColor = vec4(uColor, a * 0.92);
  }
`;

// ─── Logo sampling ────────────────────────────────────────────────────────────
// Samples white/opaque pixels, computes bounding box, then normalises positions
// so the bird is always centred at (0,0) and fits ≈3.6 world units tall.
function sampleTargets(count: number): Promise<Float32Array> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = "/assets/falcon_no_bg.png";

    img.onload = () => {
      const oc = document.createElement("canvas");
      oc.width = oc.height = SZ;
      const ctx = oc.getContext("2d")!;
      ctx.drawImage(img, 0, 0, SZ, SZ);
      const { data } = ctx.getImageData(0, 0, SZ, SZ);

      // Step-1 sampling for maximum fidelity
      const pts: [number, number][] = [];
      for (let y = 0; y < SZ; y++) {
        for (let x = 0; x < SZ; x++) {
          const i = (y * SZ + x) * 4;
          if (data[i + 3] > 60 && data[i] > 100) pts.push([x, y]);
        }
      }

      if (pts.length === 0) {
        // Sphere fallback when image is unavailable
        const out = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const phi = Math.acos(2 * rnd() - 1);
          const theta = Math.PI * 2 * rnd();
          out[i * 3] = 2.5 * Math.sin(phi) * Math.cos(theta);
          out[i * 3 + 1] = 2.5 * Math.sin(phi) * Math.sin(theta);
          out[i * 3 + 2] = 2.5 * Math.cos(phi);
        }
        resolve(out);
        return;
      }

      // Bounding box so bird is always centred regardless of canvas padding
      let minX = SZ, maxX = 0, minY = SZ, maxY = 0;
      for (const [px, py] of pts) {
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      }
      const cX = (minX + maxX) / 2;
      const cY = (minY + maxY) / 2;
      const span = Math.max(maxX - minX, maxY - minY);
      const scale = 3.8 / span;

      const out = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor((i / count) * pts.length);
        const [px, py] = pts[idx];
        out[i * 3] = (px - cX) * scale;
        out[i * 3 + 1] = -(py - cY) * scale;   // flip Y (image Y is down)
        out[i * 3 + 2] = (rnd() - 0.5) * 0.1; // slightly flatter
      }
      resolve(out);
    };

    img.onerror = () => {
      const out = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(2 * rnd() - 1);
        const theta = Math.PI * 2 * rnd();
        const r = 2.5;
        out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        out[i * 3 + 2] = r * Math.cos(phi);
      }
      resolve(out);
    };
  });
}

const _pos = new Float32Array(N * 3);
const _vel = new Float32Array(N * 3);
const _sz = new Float32Array(N);

(function () {
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(2 * rnd() - 1);
    const theta = Math.PI * 2 * rnd();
    const r = 5 + rnd() * 3;
    _pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    _pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    _pos[i * 3 + 2] = r * Math.cos(phi);
    _sz[i] = rnd() * 0.7 + 0.35;   // 0.35 – 1.05 base size
  }
})();

const _geo = new THREE.BufferGeometry();
_geo.setAttribute("position", new THREE.BufferAttribute(_pos, 3));
_geo.setAttribute("aSize", new THREE.BufferAttribute(_sz, 1));

const _mat = new THREE.ShaderMaterial({
  uniforms: { uColor: { value: new THREE.Color("#ffffff") } },
  vertexShader: VERT,
  fragmentShader: FRAG,
  transparent: true,
  depthWrite: false,
  blending: THREE.NormalBlending,
});

interface CloudProps {
  targets: Float32Array | null;
  mouseActive: React.MutableRefObject<boolean>;
}

const CAM_Z = 7;
const FOV_DEG = 52;
const HALF_H = Math.tan((FOV_DEG / 2) * (Math.PI / 180)) * CAM_Z; // ≈ 3.43
const REPEL_R = 0.45;
const REPEL_STR = 0.006;

function Cloud({ targets, mouseActive }: CloudProps) {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.getElapsedTime();
    const aspect = state.size.width / state.size.height;

    // Use native R3F state.pointer coordinates (perfectly mapped to canvas bounds),
    // and only repel if cursor is actually active over the canvas container.
    const ptrWX = mouseActive.current ? state.pointer.x * HALF_H * aspect : -9999;
    const ptrWY = mouseActive.current ? state.pointer.y * HALF_H : -9999;

    for (let i = 0; i < N; i++) {
      const xi = i * 3, yi = xi + 1, zi = xi + 2;

      let tx = 0, ty = 0, tz = 0;
      if (targets) {
        tx = targets[xi];
        ty = targets[yi];
        tz = targets[zi];
      }

      const dx = _pos[xi] - ptrWX;
      const dy = _pos[yi] - ptrWY;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < REPEL_R * REPEL_R && dist2 > 0.0001) {
        const dist = Math.sqrt(dist2);
        const force = (1 - dist / REPEL_R) * REPEL_STR;
        _vel[xi] += (dx / dist) * force;
        _vel[yi] += (dy / dist) * force;
      }

      _vel[xi] = (_vel[xi] + (tx - _pos[xi]) * K) * DMP;
      _vel[yi] = (_vel[yi] + (ty - _pos[yi]) * K) * DMP;
      _vel[zi] = (_vel[zi] + (tz - _pos[zi]) * K) * DMP;

      _pos[xi] += _vel[xi];
      _pos[yi] += _vel[yi];
      _pos[zi] += _vel[zi];
    }

    (_geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return <points ref={meshRef} geometry={_geo} material={_mat} />;
}

export default function FalconParticles() {
  const [targets, setTargets] = useState<Float32Array | null>(null);
  const mouseActive = useRef(false);

  useEffect(() => {
    const load = () => {
      sampleTargets(N).then(setTargets);
    };

    if (typeof window !== "undefined" && (window as any).__preloaderComplete) {
      load();
    } else {
      const handleComplete = () => {
        setTimeout(load, 250);
        window.removeEventListener("preloaderComplete", handleComplete);
      };
      window.addEventListener("preloaderComplete", handleComplete);

      const fallback = setTimeout(load, 4000);

      return () => {
        window.removeEventListener("preloaderComplete", handleComplete);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <div 
      className="w-full h-full"
      onPointerMove={() => { mouseActive.current = true; }}
      onPointerLeave={() => { mouseActive.current = false; }}
    >
      <Canvas
        camera={{ position: [0, 0, CAM_Z], fov: FOV_DEG }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        className="w-full h-full"
      >
        <Cloud targets={targets} mouseActive={mouseActive} />
      </Canvas>
    </div>
  );
}
