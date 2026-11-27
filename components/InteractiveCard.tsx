"use client";

import React, { useRef, useState } from "react";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  maxRotateX?: number;
  maxRotateY?: number;
  scale?: number;
  translateY?: number;
}

export default function InteractiveCard({
  children,
  className = "",
  perspective = 900,
  maxRotateX = 7,
  maxRotateY = 7,
  scale = 1.02,
  translateY = -8,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>("");
  const requestRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize coordinates from -0.5 to 0.5
      const cx = x / rect.width - 0.5;
      const cy = y / rect.height - 0.5;

      const rotY = cx * maxRotateY;
      const rotX = -cy * maxRotateX;

      setTransformStyle(
        `perspective(${perspective}px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translateY(${translateY}px) scale3d(${scale}, ${scale}, 1)`
      );
    });
  };

  const handleMouseLeave = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    setTransformStyle("");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{
        transform: transformStyle,
      }}
    >
      {children}
    </div>
  );
}
