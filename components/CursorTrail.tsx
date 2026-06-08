"use client";

import { useEffect } from "react";

const TRAIL_PETALS = ["🌸", "✨", "🌺", "💖", "🌷", "🌹", "✦", "✧"];

export default function CursorTrail() {
  useEffect(() => {
    // Disable on mobile/touch screens
    if (window.matchMedia("(hover: none)").matches) return;

    let lastTrail = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTrail < 100) return; // throttle: ~10 particles per second
      lastTrail = now;

      const el = document.createElement("div");
      el.className = "cursor-petal";
      el.textContent = TRAIL_PETALS[Math.floor(Math.random() * TRAIL_PETALS.length)];

      const size = Math.random() * 9 + 12; // 12px to 21px
      const duration = Math.random() * 0.4 + 0.6; // 0.6s to 1.0s

      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - size / 2}px;
        top: ${e.clientY - size / 2}px;
        font-size: ${size}px;
        animation: cursor-fade ${duration}s ease-in-out forwards;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
      `;

      document.body.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, duration * 1000);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null; // This component operates directly on the document body
}
