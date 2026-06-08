"use client";

import React, { useEffect, useRef } from "react";

interface PetalCanvasProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  colors?: string[];
  className?: string;
  isFixed?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  rot: number;
  rspd: number;
  phase: number;
  pspd: number;
  sway: number;
  type: number;
}

export default function PetalCanvas({
  count = 40,
  minSize = 2,
  maxSize = 7,
  speed = 0.3,
  colors = ["rgba(200,60,100,", "rgba(160,40,80,", "rgba(220,80,120,"],
  className = "",
  isFixed = true,
}: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Petal[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const scrollOffset = useRef<number>(0);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (isFixed) {
        width = window.innerWidth;
        height = window.innerHeight;
      } else {
        const parent = canvas.parentElement;
        width = parent ? parent.offsetWidth : window.innerWidth;
        height = parent ? parent.offsetHeight : window.innerHeight;
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const createPetal = (atTop = false): Petal => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const type = Math.floor(Math.random() * 3); // 0=sakura, 1=rose, 2=soft
      return {
        x: Math.random() * width,
        y: atTop ? -20 : Math.random() * height * 1.2,
        size: Math.random() * (maxSize - minSize) + minSize,
        color,
        alpha: Math.random() * 0.30 + 0.08,
        vx: (Math.random() - 0.5) * speed,
        vy: Math.random() * speed * 0.55 + 0.08,
        rot: Math.random() * Math.PI * 2,
        rspd: (Math.random() - 0.5) * 0.018,
        phase: Math.random() * Math.PI * 2,
        pspd: Math.random() * 0.012 + 0.003,
        sway: Math.random() * 0.4 + 0.15,
        type,
      };
    };

    const drawPetal = (p: Petal) => {
      const alpha = p.alpha * (0.55 + 0.45 * Math.sin(p.phase));
      const sz = p.size;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;

      if (p.type === 0) {
        // Sakura - classic teardrop
        ctx.beginPath();
        ctx.moveTo(0, -sz);
        ctx.bezierCurveTo(sz * 0.8, -sz * 0.8, sz * 0.9, sz * 0.3, 0, sz * 0.55);
        ctx.bezierCurveTo(-sz * 0.9, sz * 0.3, -sz * 0.8, -sz * 0.8, 0, -sz);
        ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;
        ctx.fill();

        // delicate center vein
        ctx.globalAlpha = alpha * 0.28;
        ctx.strokeStyle = "rgba(255,240,248,0.7)";
        ctx.lineWidth = sz * 0.07;
        ctx.beginPath();
        ctx.moveTo(0, -sz * 0.72);
        ctx.lineTo(0, sz * 0.44);
        ctx.stroke();
      } else if (p.type === 1) {
        // Rose - slim upright ellipse with highlight
        ctx.beginPath();
        ctx.ellipse(0, 0, sz * 0.42, sz, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;
        ctx.fill();

        // inner shimmer
        ctx.globalAlpha = alpha * 0.22;
        ctx.beginPath();
        ctx.ellipse(-sz * 0.1, -sz * 0.28, sz * 0.12, sz * 0.3, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      } else {
        // Soft narrow petal - tapered oval
        ctx.beginPath();
        ctx.ellipse(0, 0, sz * 0.32, sz * 0.88, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;
        ctx.fill();
      }

      ctx.restore();
    };

    const handleScroll = () => {
      const sy = window.scrollY;
      scrollOffset.current = (sy - lastScrollY.current) * 0.2;
      lastScrollY.current = sy;
    };

    // Initialize particles
    resize();
    particles.current = Array.from({ length: count }, () => createPetal(false));

    window.addEventListener("resize", resize, { passive: true });
    if (isFixed) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Decelerate scroll effect
      scrollOffset.current *= 0.9;

      particles.current.forEach((p, i) => {
        p.phase += p.pspd;
        p.rot += p.rspd;
        p.x += p.vx + Math.sin(p.phase) * p.sway;

        // Add vertical scroll wind speed
        p.y += p.vy + scrollOffset.current;

        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          particles.current[i] = createPetal(true);
        } else {
          drawPetal(p);
        }
      });

      animationFrameId.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [count, minSize, maxSize, speed, colors, isFixed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block ${isFixed ? "fixed inset-0" : "absolute inset-0"} ${className}`}
      style={{ zIndex: isFixed ? 3 : 0 }}
    />
  );
}
