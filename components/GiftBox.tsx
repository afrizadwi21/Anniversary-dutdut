"use client";

import React, { useState, useEffect } from "react";

interface FlowerBurst {
  id: number;
  char: string;
  tx: string;
  ty: string;
  tx2: string;
  ty2: string;
  tx3: string;
  ty3: string;
  rot: string;
  rot2: string;
  rot3: string;
  size: string;
  delay: number;
}

interface RainPetal {
  id: number;
  char: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface GiftBoxProps {
  onOpen: () => void;
}

const BLOOM_FLOWERS = [
  "🌸", "💖", "✨", "💝", "💘", "🌹", "🎈", "🌷", 
  "🌼", "⭐", "🎉", "💌", "🌸", "💕", "🧸", "👑", 
  "🍓", "🧁", "🍩", "🍯", "🍷", "🔮", "🦄", "🎁"
];
const PETAL_SYMBOLS = ["🌸", "💖", "🌷", "✨", "🌹", "💕", "🎈"];

const playChimeSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // Play a beautiful, sparkling romantic chime arpeggio
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, B5, C6, E6, G6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gain.gain.setValueAtTime(0.12, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.9);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.9);
    });
  } catch (err) {
    console.warn("Audio context not allowed or failed to play chimes:", err);
  }
};

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [lidFlying, setLidFlying] = useState(false);
  const [bursts, setBursts] = useState<FlowerBurst[]>([]);
  const [rainPetals, setRainPetals] = useState<RainPetal[]>([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [showScene, setShowScene] = useState(true);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);
    setShaking(true);

    // After shake completes (600ms)
    setTimeout(() => {
      setShaking(false);
      setLidFlying(true);
      
      // Play magical chimes sound
      playChimeSound();

      // Flower burst after lid starts flying (300ms later)
      setTimeout(() => {
        triggerFlowerBurst();
      }, 200);

      // Petal rain starts (600ms later)
      setTimeout(() => {
        triggerPetalRain();
      }, 400);

      // Start journey directly after petals (1500ms later)
      setTimeout(() => {
        handleStartJourney();
      }, 1500);
    }, 700);
  };

  const handleStartJourney = () => {
    setFadeOut(true);

    // Reveal main site and hide intro
    setTimeout(() => {
      onOpen();
      setTimeout(() => {
        setShowScene(false);
      }, 500);
    }, 1200);
  };

  const triggerFlowerBurst = () => {
    // Generate a beautiful dense ring of particles with staggered release times
    const newBursts = BLOOM_FLOWERS.map((flower, i) => {
      const angle = (i / BLOOM_FLOWERS.length) * 360 + Math.random() * 20;
      const dist1 = Math.random() * 90 + 50;
      const dist2 = Math.random() * 170 + 90;
      const dist3 = Math.random() * 250 + 150;
      const rad = (angle * Math.PI) / 180;

      return {
        id: i,
        char: flower,
        tx: `${Math.cos(rad) * dist1}px`,
        ty: `${Math.sin(rad) * dist1}px`,
        tx2: `${Math.cos(rad) * dist2}px`,
        ty2: `${Math.sin(rad) * dist2}px`,
        tx3: `${Math.cos(rad) * dist3}px`,
        ty3: `${Math.sin(rad) * dist3}px`,
        rot: `${Math.random() * 180 - 90}deg`,
        rot2: `${Math.random() * 360 - 180}deg`,
        rot3: `${Math.random() * 540 - 270}deg`,
        size: `${Math.random() * 2.2 + 1.8}rem`,
        delay: Math.random() * 250, // randomized staggered burst delay
      };
    });
    setBursts(newBursts);
  };

  const triggerPetalRain = () => {
    const maxPetals = 60;
    const newPetals = Array.from({ length: maxPetals }).map((_, i) => ({
      id: i,
      char: PETAL_SYMBOLS[Math.floor(Math.random() * PETAL_SYMBOLS.length)],
      left: Math.random() * 100,
      size: Math.random() * 1.2 + 0.8,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 1.5,
    }));
    setRainPetals(newPetals);
  };

  if (!showScene) return null;

  return (
    <div
      id="intro-scene"
      className={`fixed inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100 z-[1000]"
      }`}
    >
      <div id="gift-wrapper" className="relative z-10 flex flex-col items-center">
        <button
          type="button"
          id="gift-container"
          onClick={handleOpen}
          aria-label="Open your anniversary gift box"
          className="cursor-pointer flex flex-col items-center gap-5 transition-transform duration-300 hover:scale-105 group bg-transparent border-0 p-4 rounded-2xl"
        >
          <div
            id="gift-box"
            className={`w-[160px] h-[160px] relative transition-all duration-300 ${
              shaking ? "animate-gift-shake" : ""
            } group-hover:drop-shadow-[0_0_30px_rgba(255,150,180,0.8)]`}
          >
            <div
              className={`gift-lid absolute -left-2 w-[176px] h-[55px] bg-gradient-to-br from-[#e8698a] to-[#c0304a] rounded-t-lg z-2 flex items-center justify-center origin-top ${
                lidFlying ? "animate-lid-fly" : ""
              }`}
            >
              <div className="ribbon-h absolute top-1/2 left-0 w-full h-[14px] bg-gradient-to-r from-[#f7c873] via-[#f4a840] to-[#f7c873] -translate-y-1/2"></div>
              <div className="ribbon-v absolute top-0 left-1/2 w-[14px] h-full bg-gradient-to-b from-[#f7c873] via-[#f4a840] to-[#f7c873] -translate-x-1/2"></div>
              <div className="bow absolute -top-[18px] left-1/2 -translate-x-1/2">
                <div className="bow-left absolute w-8 h-[22px] bg-gradient-to-br from-[#f7e080] to-[#e4a020] rounded-[50%] -left-7 -rotate-[20deg]"></div>
                <div className="bow-right absolute w-8 h-[22px] bg-gradient-to-br from-[#f7e080] to-[#e4a020] rounded-[50%] left-3 rotate-[20deg]"></div>
                <div className="bow-center absolute w-4 h-4 bg-[#f7c873] rounded-full top-[3px] -left-0.5 z-[1]"></div>
              </div>
            </div>
            <div className="gift-body absolute bottom-0 left-0 w-[160px] h-[115px] bg-gradient-to-b from-[#d44a6a] to-[#a02040] rounded-b-xl overflow-hidden">
              <div className="ribbon-body-h absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-[#f7c873] via-[#f4a840] to-[#f7c873] -translate-y-1/2"></div>
              <div className="ribbon-body-v absolute top-0 left-1/2 w-3 h-full bg-gradient-to-b from-[#f7c873] via-[#f4a840] to-[#f7c873] -translate-x-1/2"></div>
            </div>
          </div>
          {!isOpened && (
            <p className="gift-hint text-[#ffc8dc]/75 font-light text-sm tracking-[0.12em] text-center animate-pulse-hint">
              🎂 tap to open your gift ✨
            </p>
          )}
        </button>

        {/* Flower burst container */}
        <div id="bloom-container" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {bursts.map((b) => (
            <div
              key={b.id}
              className="bloom-flower absolute -translate-x-1/2 -translate-y-1/2 animate-bloom-burst opacity-0 scale-0"
              style={{
                fontSize: b.size,
                animationDelay: `${b.delay}ms`,
                // Pass target translate & rotate variables for CSS keyframe interpolation
                // @ts-ignore
                "--tx": b.tx,
                "--ty": b.ty,
                "--tx2": b.tx2,
                "--ty2": b.ty2,
                "--tx3": b.tx3,
                "--ty3": b.ty3,
                "--rot": b.rot,
                "--rot2": b.rot2,
                "--rot3": b.rot3,
              }}
            >
              {b.char}
            </div>
          ))}
        </div>
      </div>

      {/* Petal rain container */}
      <div id="petal-rain-intro" className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {rainPetals.map((p) => (
          <div
            key={p.id}
            className="intro-petal absolute -top-10 animate-fall-petal opacity-0"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}rem`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.char}
          </div>
        ))}
      </div>



      <div
        id="intro-overlay"
        className={`absolute inset-0 bg-[#180410] pointer-events-none z-20 transition-opacity duration-[1200ms] ${
          fadeOut ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
