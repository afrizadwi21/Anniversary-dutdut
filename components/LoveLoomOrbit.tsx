"use client";

import React, { useState, useEffect, useRef } from "react";

interface OrbitPlanet {
  id: number;
  image: string;
  fallbackImage: string;
  caption: string;
  message: string;
  radius: number;
  orbitRadius: number;
  speed: number;
  initialAngle: number;
  inclination: number;
  hasRing?: boolean;
}

const ORBIT_PLANETS: OrbitPlanet[] = [
  {
    id: 1,
    image: "/assets/images/img1.jpeg",
    fallbackImage: "/assets/dummy/memory-1.svg",
    caption: "Jalan Jalan",
    message: "Iniiii seruuuu bangettt walaupun kamu nyebelinnnnnn",
    radius: 26,
    orbitRadius: 115,
    speed: 0.34,
    initialAngle: 0.4,
    inclination: 0.08,
  },
  {
    id: 2,
    image: "/assets/images/img2.jpeg",
    fallbackImage: "/assets/dummy/memory-2.svg",
    caption: "Mam Seblakkkk",
    message: "tahhhhh kamu so kerassss pisannn mam seblak pedess wae hayang teboga perut deui mereun.",
    radius: 31,
    orbitRadius: 175,
    speed: 0.24,
    initialAngle: 2.1,
    inclination: -0.06,
    hasRing: true,
  },
  {
    id: 3,
    image: "/assets/images/img3.jpeg",
    fallbackImage: "/assets/dummy/memory-3.svg",
    caption: "Selamattt cayangggg",
    message: "Pastiii nanti rintangann nya tambah susahhh, tapiii aku yakin kamu bisaa sayanggg aku akan terus support kamuuu",
    radius: 28,
    orbitRadius: 235,
    speed: 0.17,
    initialAngle: 3.9,
    inclination: 0.05,
  },
  {
    id: 4,
    image: "/assets/images/img4.jpeg",
    fallbackImage: "/assets/dummy/memory-4.svg",
    caption: "Kedua kalinyaaa fotbar",
    message: "Disiniiiiii aku deg deg an bangettt, saltingggg banget bisa fotbar samaaa cewe cantikkk dan imuttt sedunia inii",
    radius: 34,
    orbitRadius: 295,
    speed: 0.12,
    initialAngle: 5.2,
    inclination: -0.04,
    hasRing: true,
  },
];

interface ProjectedPlanet {
  planet: OrbitPlanet;
  screenX: number;
  screenY: number;
  z: number;
  scale: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

export default function LoveLoomOrbit({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [selectedPlanet, setSelectedPlanet] = useState<OrbitPlanet | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [tiltDeg, setTiltDeg] = useState(24);
  const [yawOffset, setYawOffset] = useState(0);
  const [timeSec, setTimeSec] = useState(0);
  const [imgFallbacks, setImgFallbacks] = useState<Record<number, boolean>>({});
  const [stageSize, setStageSize] = useState(640);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; startYaw: number; startTilt: number }>({
    active: false,
    startX: 0,
    startY: 0,
    startYaw: 0,
    startTilt: 24,
  });

  const isLight = theme === "light";

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 480) setStageSize(320);
      else if (w < 768) setStageSize(460);
      else setStageSize(640);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!selectedPlanet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPlanet(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPlanet]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || isPaused) return;

    let rafId: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setTimeSec((prev) => prev + dt);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

  // Monochrome 3D Starfield + Tilted Orbital Ellipses
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const height = Math.round(stageSize * 0.72);
    canvas.width = stageSize * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${stageSize}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = stageSize / 2;
    const cy = height / 2;
    const scaleFactor = stageSize / 640;
    const fov = 720;
    const tiltRad = (tiltDeg * Math.PI) / 180;

    ctx.clearRect(0, 0, stageSize, height);

    // Deterministic monochrome stars / dust
    for (let i = 0; i < 65; i++) {
      const sx = ((Math.sin(i * 127.1) * 43758.5453) % 1 + 1) % 1;
      const sy = ((Math.sin(i * 311.7) * 24634.6345) % 1 + 1) % 1;
      const alpha = 0.1 + (i % 5) * 0.07;
      const r = i % 7 === 0 ? 1.3 : 0.8;
      ctx.beginPath();
      ctx.arc(sx * stageSize, sy * height, r, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(9, 9, 11, ${alpha * 0.75})`
        : `rgba(250, 250, 250, ${alpha})`;
      ctx.fill();
    }

    // 3D tilted orbital rings
    ORBIT_PLANETS.forEach((planet) => {
      const rOrbit = planet.orbitRadius * scaleFactor;
      const steps = 96;

      for (let s = 0; s < steps; s++) {
        const a1 = (s / steps) * Math.PI * 2;
        const a2 = ((s + 1) / steps) * Math.PI * 2;

        const x1 = Math.cos(a1) * rOrbit;
        const z1Raw = Math.sin(a1) * rOrbit;
        const y1Raw = Math.sin(a1) * rOrbit * planet.inclination;
        const y1 = y1Raw * Math.cos(tiltRad) - z1Raw * Math.sin(tiltRad);
        const z1 = y1Raw * Math.sin(tiltRad) + z1Raw * Math.cos(tiltRad);

        const x2 = Math.cos(a2) * rOrbit;
        const z2Raw = Math.sin(a2) * rOrbit;
        const y2Raw = Math.sin(a2) * rOrbit * planet.inclination;
        const y2 = y2Raw * Math.cos(tiltRad) - z2Raw * Math.sin(tiltRad);
        const z2 = y2Raw * Math.sin(tiltRad) + z2Raw * Math.cos(tiltRad);

        const p1 = fov / (fov + z1);
        const p2 = fov / (fov + z2);
        const isFront = (z1 + z2) / 2 < 0;

        ctx.beginPath();
        ctx.moveTo(cx + x1 * p1, cy + y1 * p1);
        ctx.lineTo(cx + x2 * p2, cy + y2 * p2);
        ctx.strokeStyle = isLight
          ? isFront
            ? "rgba(9, 9, 11, 0.28)"
            : "rgba(9, 9, 11, 0.1)"
          : isFront
            ? "rgba(250, 250, 250, 0.28)"
            : "rgba(161, 161, 170, 0.12)";
        ctx.lineWidth = isFront ? 1.15 : 0.75;
        ctx.stroke();
      }
    });
  }, [stageSize, tiltDeg, isLight]);

  const stageHeight = Math.round(stageSize * 0.72);
  const scaleFactor = stageSize / 640;
  const fov = 720;
  const tiltRad = (tiltDeg * Math.PI) / 180;

  const projected: ProjectedPlanet[] = ORBIT_PLANETS.map((planet) => {
    const angle = planet.initialAngle + timeSec * planet.speed + yawOffset;
    const rOrbit = planet.orbitRadius * scaleFactor;

    const x = Math.cos(angle) * rOrbit;
    const zRaw = Math.sin(angle) * rOrbit;
    const yRaw = Math.sin(angle) * rOrbit * planet.inclination;

    const y = yRaw * Math.cos(tiltRad) - zRaw * Math.sin(tiltRad);
    const z = yRaw * Math.sin(tiltRad) + zRaw * Math.cos(tiltRad);

    const perspective = fov / (fov + z);
    const screenX = stageSize / 2 + x * perspective;
    const screenY = stageHeight / 2 + y * perspective;

    const norm = Math.hypot(x, y, z) || 1;
    const shadowOffsetX = (x / norm) * 38;
    const shadowOffsetY = (y / norm) * 38;

    return {
      planet,
      screenX,
      screenY,
      z,
      scale: perspective,
      shadowOffsetX,
      shadowOffsetY,
    };
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startYaw: yawOffset,
      startTilt: tiltDeg,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setYawOffset(dragRef.current.startYaw + dx * 0.008);
    setTiltDeg(Math.max(8, Math.min(58, dragRef.current.startTilt + dy * 0.25)));
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
  };

  const sunSize = Math.round(74 * scaleFactor + 18);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center">
      <p className="text-center font-body text-sm text-[var(--text-muted)] max-w-lg mx-auto mb-6 leading-relaxed">
        Geser bidang orbit untuk memiringkan sudut pandang 3D, atau pilih salah satu planet untuk membuka catatan di dalamnya.
      </p>

      {/* Controls bar */}
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className="px-3.5 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono tracking-wider text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
        >
          {isPaused ? "RESUME ORBIT" : "PAUSE ORBIT"}
        </button>
        <span className="text-xs font-mono text-[var(--text-muted)]">
          TILT {Math.round(tiltDeg)}°
        </span>
      </div>

      {/* 3D Orbital Stage */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          width: stageSize,
          height: stageHeight,
          background: isLight
            ? "radial-gradient(circle at 50% 50%, #ffffff 0%, #f4f4f5 75%)"
            : "radial-gradient(circle at 50% 50%, #1c1c21 0%, #09090b 75%)",
        }}
        className="relative select-none touch-none cursor-grab active:cursor-grabbing rounded-[18px] border border-[var(--border-hairline)] overflow-hidden shadow-[var(--shadow-card)] transition-colors duration-300"
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Central Star (Monochrome Eclipse / Silver Core) */}
        <div
          aria-hidden="true"
          style={{
            width: sunSize,
            height: sunSize,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
          }}
          className="absolute rounded-full pointer-events-none"
        >
          <div
            className="absolute -inset-6 rounded-full opacity-55 blur-xl"
            style={{
              background: isLight
                ? "radial-gradient(circle, rgba(9,9,11,0.2) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(250,250,250,0.35) 0%, transparent 72%)",
            }}
          />
          <div
            className="relative w-full h-full rounded-full"
            style={{
              background: isLight
                ? "radial-gradient(circle at 38% 35%, #52525b 0%, #18181b 55%, #09090b 100%)"
                : "radial-gradient(circle at 38% 35%, #ffffff 0%, #d4d4d8 42%, #71717a 82%, #27272a 100%)",
              boxShadow: isLight
                ? "0 8px 28px rgba(9, 9, 11, 0.28)"
                : "0 0 42px rgba(250, 250, 250, 0.35)",
            }}
          />
        </div>

        {/* 3D Planets sorted dynamically by Z depth */}
        {projected.map(({ planet, screenX, screenY, z, scale, shadowOffsetX, shadowOffsetY }) => {
          const diameter = Math.max(30, Math.round(planet.radius * 2 * scaleFactor * scale));
          const zIndex = Math.round(50 - z);
          const isBehind = z > 0;
          const imgSrc = imgFallbacks[planet.id] ? planet.fallbackImage : planet.image;

          return (
            <button
              key={planet.id}
              type="button"
              onClick={() => setSelectedPlanet(planet)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-label={`Buka kenangan: ${planet.caption}`}
              style={{
                width: diameter,
                height: diameter,
                left: screenX,
                top: screenY,
                transform: "translate(-50%, -50%)",
                zIndex,
                opacity: isBehind ? 0.78 : 1,
                filter: isBehind ? "brightness(0.84)" : "brightness(1)",
              }}
              className="absolute rounded-full p-0 border-0 bg-transparent cursor-pointer group transition-[opacity,filter] duration-150"
            >
              {/* Planetary Ring */}
              {planet.hasRing && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 pointer-events-none rounded-full border"
                  style={{
                    width: diameter * 1.65,
                    height: diameter * 0.48,
                    transform: "translate(-50%, -50%) rotate(-18deg)",
                    borderColor: isLight ? "rgba(9, 9, 11, 0.35)" : "rgba(250, 250, 250, 0.4)",
                  }}
                />
              )}

              {/* Sphere Body */}
              <span
                className="relative block w-full h-full rounded-full overflow-hidden"
                style={{
                  boxShadow: isLight
                    ? "0 6px 18px rgba(9, 9, 11, 0.22), inset 0 0 8px rgba(0, 0, 0, 0.35)"
                    : "0 0 18px rgba(250, 250, 250, 0.22), inset 0 0 10px rgba(0, 0, 0, 0.65)",
                }}
              >
                <img
                  src={imgSrc}
                  alt={planet.caption}
                  onError={() =>
                    setImgFallbacks((prev) => ({ ...prev, [planet.id]: true }))
                  }
                  className="w-full h-full object-cover grayscale contrast-110 select-none transition-transform duration-300 group-hover:scale-110"
                  draggable={false}
                />

                {/* 3D Spherical Terminator Shadow */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${50 - shadowOffsetX}% ${50 - shadowOffsetY}%, rgba(255,255,255,0.2) 0%, rgba(9,9,11,0.12) 48%, rgba(9,9,11,0.84) 88%)`,
                  }}
                />

                {/* Specular Atmospheric Rim */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full pointer-events-none border"
                  style={{
                    borderColor: isLight ? "rgba(9, 9, 11, 0.25)" : "rgba(250, 250, 250, 0.3)",
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Secret Memory Modal */}
      {selectedPlanet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="planet-modal-title"
          className="fixed inset-0 bg-[#09090b]/75 backdrop-blur-md z-[2000] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPlanet(null)}
        >
          <div
            className="w-full max-w-md mono-floating rounded-[18px] p-6 md:p-8 relative animate-modal-enter cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup catatan planet"
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors flex items-center justify-center cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-[var(--border-strong)] overflow-hidden shadow-[var(--shadow-card)] mb-5">
                <img
                  src={imgFallbacks[selectedPlanet.id] ? selectedPlanet.fallbackImage : selectedPlanet.image}
                  alt={selectedPlanet.caption}
                  onError={() =>
                    setImgFallbacks((prev) => ({ ...prev, [selectedPlanet.id]: true }))
                  }
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] mb-2">
                {selectedPlanet.caption}
              </span>

              <h4 id="planet-modal-title" className="font-display text-2xl text-[var(--text-primary)] italic mb-4">
                Catatan Orbit
              </h4>

              <p className="font-body text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
                &ldquo;{selectedPlanet.message}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
