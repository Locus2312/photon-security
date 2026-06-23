"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const N = 6000;
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

const FRAG = `
  uniform vec3 uColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(uColor, a);
  }
`;

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

      const pts: [number, number][] = [];
      for (let y = 0; y < SZ; y++) {
        for (let x = 0; x < SZ; x++) {
          const i = (y * SZ + x) * 4;
          if (data[i + 3] > 60 && data[i] > 100) pts.push([x, y]);
        }
      }

      if (pts.length === 0) {
        const out = new Float32Array(count * 3);
        resolve(out);
        return;
      }

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
        out[i * 3 + 1] = -(py - cY) * scale;
        out[i * 3 + 2] = (rnd() - 0.5) * 0.1;
      }
      resolve(out);
    };

    img.onerror = () => {
      const out = new Float32Array(count * 3);
      resolve(out);
    };
  });
}

interface CloudProps {
  targets: Float32Array | null;
  progress: number;
}

const CAM_Z = 7;
const FOV_DEG = 52;
const HALF_H = Math.tan((FOV_DEG / 2) * (Math.PI / 180)) * CAM_Z;
const REPEL_R = 0.45;
const REPEL_STR = 0.006;

function Cloud({ targets, progress }: CloudProps) {
  const meshRef = useRef<THREE.Points>(null);

  const velRef = useRef(new Float32Array(N * 3));

  const { _geo, _mat } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const sz = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      const phi = Math.acos(2 * rnd() - 1);
      const theta = Math.PI * 2 * rnd();
      const r = 5 + rnd() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = rnd() * 1.5 + 0.8;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color("#000000") } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    return { _geo: geo, _mat: mat };
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const geometry = mesh.geometry as THREE.BufferGeometry;
    const _pos = geometry.attributes.position.array as Float32Array;
    const _vel = velRef.current;

    const animProgress = Math.min(progress / 0.70, 1.0);

    const enterPhase = Math.min(animProgress / 0.20, 1.0);
    const morphPhase = Math.max(0, (animProgress - 0.20) / 0.80);

    const easeEnter = 1 - Math.pow(1 - enterPhase, 3);
    const easeMorph = morphPhase < 0.5 ? 4 * morphPhase * morphPhase * morphPhase : 1 - Math.pow(-2 * morphPhase + 2, 3) / 2;

    const aspect = state.size.width / state.size.height;

    const ptrWX = state.pointer.x * HALF_H * aspect;
    const ptrWY = state.pointer.y * HALF_H;

    for (let i = 0; i < N; i++) {
      const xi = i * 3, yi = xi + 1, zi = xi + 2;

      let tx = 0, ty = 0, tz = 0;
      if (targets) {
        const baseAngle = (i / N) * Math.PI * 20;
        const t_layer = (i / N);
        const radius = Math.pow(t_layer, 1.3) * 4.0;
        const angle = baseAngle + state.clock.getElapsedTime() * 0.5;

        const startX = -15.0;
        const startY = 15.0;
        const startZ = -30.0;

        const isMobile = aspect < 1.0;

        const tornadoX = isMobile ? 0.0 : -3.5;
        const tornadoY = isMobile ? 2.0 : 2.0;
        const tornadoZ = -10.0 + easeMorph * 10.0;

        const swoopArcX = Math.sin((1 - easeEnter) * Math.PI) * -8.0;
        const swoopArcY = Math.sin((1 - easeEnter) * Math.PI) * 5.0;

        const currentOriginX = startX * (1 - easeEnter) + tornadoX * easeEnter + swoopArcX;
        const currentOriginY = startY * (1 - easeEnter) + tornadoY * easeEnter + swoopArcY;
        const currentOriginZ = startZ * (1 - easeEnter) + tornadoZ * easeEnter;

        const invE = 1 - easeEnter;
        const scatter = Math.pow(invE, 2) * 25.0;
        const spin = Math.pow(invE, 1.5) * Math.PI * 8.0;
        const pseudoRand = Math.sin(i * 99.99);

        const sX = currentOriginX + (radius + scatter * (0.5 + Math.abs(pseudoRand))) * Math.cos(angle + spin);
        const sY = currentOriginY + (radius + scatter * (0.5 + Math.abs(pseudoRand))) * Math.sin(angle + spin);
        const sZ = currentOriginZ + t_layer * 20.0 + pseudoRand * scatter * 1.5;

        const fScale = isMobile ? 0.8 : 1.0;
        const fShiftX = isMobile ? 0.0 : 3.5;
        const fShiftY = isMobile ? 1.5 : 0.0;

        const falconX = targets[xi] * fScale + fShiftX;
        const falconY = targets[yi] * fScale + fShiftY;
        const falconZ = targets[zi] * fScale;

        tx = sX * (1 - easeMorph) + falconX * easeMorph;
        ty = sY * (1 - easeMorph) + falconY * easeMorph;
        tz = sZ * (1 - easeMorph) + falconZ * easeMorph;
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

    (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return <points ref={meshRef} geometry={_geo} material={_mat} />;
}

export default function FalconStaticParticles() {
  const [targets, setTargets] = useState<Float32Array | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScrub = (e: Event) => {
      const customEvent = e as CustomEvent;
      setProgress(customEvent.detail);
    };
    window.addEventListener("scrub-turmoil", handleScrub);
    return () => window.removeEventListener("scrub-turmoil", handleScrub);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const streamPts = await sampleTargets(N);
        setTargets(streamPts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTargets();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, CAM_Z], fov: FOV_DEG }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        className="w-full h-full"
      >
        <Cloud targets={targets} progress={progress} />
      </Canvas>
    </div>
  );
}
