"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
const _orbitParams = new Float32Array(N * 5);

(function () {
  for (let i = 0; i < N; i++) {
    const oRad = 1.0 + rnd() * 3.5;
    const oSpeed = 1.5 + rnd() * 2.0;
    const oPhase = rnd() * Math.PI * 2;
    const oTheta = rnd() * Math.PI;
    const oPsi = rnd() * Math.PI * 2;

    _orbitParams[i * 5] = oRad;
    _orbitParams[i * 5 + 1] = oSpeed;
    _orbitParams[i * 5 + 2] = oPhase;
    _orbitParams[i * 5 + 3] = oTheta;
    _orbitParams[i * 5 + 4] = oPsi;

    const xBase = oRad * Math.cos(oPhase);
    const yBase = oRad * Math.sin(oPhase);

    const x1 = xBase;
    const y1 = yBase * Math.cos(oTheta);
    const z1 = yBase * Math.sin(oTheta);

    _pos[i * 3] = x1 * Math.cos(oPsi) + z1 * Math.sin(oPsi);
    _pos[i * 3 + 1] = y1;
    _pos[i * 3 + 2] = -x1 * Math.sin(oPsi) + z1 * Math.cos(oPsi);

    _sz[i] = rnd() * 1.5 + 0.8;
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
  blending: THREE.AdditiveBlending,
});

interface CloudProps {
  targets: Float32Array | null;
  streamTargets: Float32Array | null;
  terrainTargets: Float32Array | null;
  mouse: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
  scrollProgress: React.MutableRefObject<number>;
  introProgress: React.MutableRefObject<number>;
  staticMode?: boolean;
}

const CAM_Z = 7;
const FOV_DEG = 52;
const HALF_H = Math.tan((FOV_DEG / 2) * (Math.PI / 180)) * CAM_Z;
const REPEL_R = 0.45;
const REPEL_STR = 0.006;

function Cloud({ targets, streamTargets, terrainTargets, mouse, scrollProgress, introProgress, staticMode }: CloudProps) {
  const meshRef = useRef<THREE.Points>(null);
  const isFirstFrameRef = useRef(true);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.getElapsedTime();
    const aspect = state.size.width / state.size.height;
    const scroll = staticMode ? 0 : scrollProgress.current;

    const isMobile = aspect < 1.0;
    const fShiftX = isMobile ? 0.0 : (staticMode ? 0 : 3.0);
    const fShiftY = isMobile ? 1.5 : 0.0;

    // Initialize positions on the first frame to align with the responsive orbit center
    if (isFirstFrameRef.current) {
      for (let i = 0; i < N; i++) {
        const xi = i * 3, yi = xi + 1, zi = xi + 2;
        const opIdx = i * 5;
        const oRad = _orbitParams[opIdx];
        const oPhase = _orbitParams[opIdx + 2];
        const oTheta = _orbitParams[opIdx + 3];
        const oPsi = _orbitParams[opIdx + 4];

        const xBase = oRad * Math.cos(oPhase);
        const yBase = oRad * Math.sin(oPhase);

        const x1 = xBase;
        const y1 = yBase * Math.cos(oTheta);
        const z1 = yBase * Math.sin(oTheta);

        _pos[xi] = x1 * Math.cos(oPsi) + z1 * Math.sin(oPsi) + fShiftX;
        _pos[yi] = y1 + fShiftY;
        _pos[zi] = -x1 * Math.sin(oPsi) + z1 * Math.cos(oPsi);
      }
      isFirstFrameRef.current = false;
    }

    const ptrWX = mouse.current.active ? mouse.current.x * HALF_H * aspect : -9999;
    const ptrWY = mouse.current.active ? mouse.current.y * HALF_H : -9999;

    const blend = introProgress.current;

    for (let i = 0; i < N; i++) {
      const xi = i * 3, yi = xi + 1, zi = xi + 2;

      // 1. Calculate Orbit Position at time t
      const opIdx = i * 5;
      const oRad = _orbitParams[opIdx];
      const oSpeed = _orbitParams[opIdx + 1];
      const oPhase = _orbitParams[opIdx + 2];
      const oTheta = _orbitParams[opIdx + 3];
      const oPsi = _orbitParams[opIdx + 4];

      const angle = oPhase + t * oSpeed;
      const xBase = oRad * Math.cos(angle);
      const yBase = oRad * Math.sin(angle);

      const x1 = xBase;
      const y1 = yBase * Math.cos(oTheta);
      const z1 = yBase * Math.sin(oTheta);

      const oX = x1 * Math.cos(oPsi) + z1 * Math.sin(oPsi) + fShiftX;
      const oY = y1 + fShiftY;
      const oZ = -x1 * Math.sin(oPsi) + z1 * Math.cos(oPsi);

      // 2. Calculate Layout Target
      let lx = 0, ly = 0, lz = 0;
      if (targets && streamTargets) {
        const fScale = isMobile ? 0.8 : 1.0;

        const falconX = targets[xi] * fScale + fShiftX;
        const falconY = targets[yi] * fScale + fShiftY;
        const falconZ = targets[zi] * fScale;

        const t_layer = streamTargets[xi];
        const baseAngle = streamTargets[yi];

        let funnelX = 5.0;
        let funnelY = 0.0;

        const p = scroll;

        if (p > 0.0) {
          const pull = Math.min(p / 0.35, 1.0);
          const tipFactor = Math.pow(1.0 - t_layer, 2.0);

          funnelX = 5.0 - pull * tipFactor * 35.0;
          funnelY = 0.0 - pull * tipFactor * 25.0;
        }

        const funnelZ = -18.0 + t_layer * 22.0;

        const radius = Math.pow(t_layer, 1.3) * 4.0;

        const angleS = baseAngle + p * Math.PI * 0.5;

        const sX = funnelX + radius * Math.cos(angleS);
        const sY = funnelY + radius * Math.sin(angleS);
        const sZ = funnelZ;

        let fW = 0, gW = 0, cW = 0;

        if (staticMode) {
          fW = 1;
        } else if (p < 0.15) {
          gW = p / 0.15;
          fW = 1 - gW;
        } else if (p < 0.35) {
          gW = 1;
        } else if (p < 0.45) {
          cW = (p - 0.35) / 0.10;
          gW = 1 - cW;
        } else {
          cW = 1;
        }

        let cX = 0, cY = 0, cZ = 0;
        if (terrainTargets && cW > 0) {
          const rawX = terrainTargets[xi];
          const rawZ = terrainTargets[zi];

          const wave1 = Math.sin(rawX * 0.15 + t * 0.4) * 2.5;
          const wave2 = Math.cos(rawZ * 0.15 + t * 0.3) * 2.5;
          const wave3 = Math.sin((rawX + rawZ) * 0.1 - t * 0.2) * 1.5;

          const actualY = wave1 + wave2 + wave3;

          cX = rawX * 1.2;
          cY = actualY - 5.0;
          cZ = rawZ - 10.0;
        }

        let mX = 0, mY = 0, mZ = 0, mW = 0;
        if (isMobile && !staticMode) {
          fW = 0;
          gW = 0;

          if (p < 0.30) {
            mW = 1;
            cW = 0;
          } else if (p < 0.45) {
            cW = (p - 0.30) / 0.15;
            mW = 1 - cW;
          } else {
            cW = 1;
            mW = 0;
          }

          mX = -20.0;
          mY = -5.0;
          mZ = -10.0;
        }

        lx = falconX * fW + sX * gW + cX * cW + mX * mW;
        ly = falconY * fW + sY * gW + cY * cW + mY * mW;
        lz = falconZ * fW + sZ * gW + cZ * cW + mZ * mW;
      } else {
        lx = oX;
        ly = oY;
        lz = oZ;
      }

      // Blend Orbit and Layout targets
      const tx = oX * blend + lx * (1.0 - blend);
      const ty = oY * blend + ly * (1.0 - blend);
      const tz = oZ * blend + lz * (1.0 - blend);

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
  const [streamTargets, setStreamTargets] = useState<Float32Array | null>(null);
  const [terrainTargets, setTerrainTargets] = useState<Float32Array | null>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const scrollProgress = useRef(0);
  const introProgress = useRef(1.0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.active = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const load = () => {
      sampleTargets(N).then((t) => {
        setTargets(t);
        const stream = new Float32Array(N * 3);
        const rings = 80;
        const dotsPerRing = Math.floor(N / rings);

        for (let i = 0; i < N; i++) {
          const ringIdx = Math.floor(i / dotsPerRing);
          const dotIdx = i % dotsPerRing;

          const t_layer = Math.pow(ringIdx / (rings - 1), 1.2);
          const angle = (dotIdx / dotsPerRing) * Math.PI * 2;

          stream[i * 3] = t_layer;
          stream[i * 3 + 1] = angle;
          stream[i * 3 + 2] = 0;
        }
        setStreamTargets(stream);


        // Animate introProgress down to 0
        introProgress.current = 1.0;
        gsap.to(introProgress, {
          current: 0.0,
          duration: 4.0,
          ease: "power2.inOut",
          delay: 0.8,
        });

        const terrain = new Float32Array(N * 3);
        const side = Math.ceil(Math.sqrt(N));
        const spacingX = 50.0 / side;
        const spacingZ = 40.0 / side;

        for (let i = 0; i < N; i++) {
          const row = Math.floor(i / side);
          const col = i % side;

          const x = (col - side / 2.0) * spacingX;
          const z = (row - side / 2.0) * spacingZ;

          terrain[i * 3] = x;
          terrain[i * 3 + 1] = 0;
          terrain[i * 3 + 2] = z;
        }
        setTerrainTargets(terrain);
      });
    };

    if (typeof window !== "undefined" && (window as Window & typeof globalThis & { __preloaderComplete?: boolean }).__preloaderComplete) {
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

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      }
    });

    return () => st.kill();
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, CAM_Z], fov: FOV_DEG }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        className="w-full h-full"
      >
        <Cloud targets={targets} streamTargets={streamTargets} terrainTargets={terrainTargets} mouse={mouse} scrollProgress={scrollProgress} introProgress={introProgress} />
      </Canvas>
    </div>
  );
}
