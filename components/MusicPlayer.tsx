"use client";

import React, { useRef, useState, useEffect } from "react";

interface Note {
  id: number;
  char: string;
  left: number;
  size: number;
  duration: number;
}

const MUSICAL_NOTES = ["♫", "♪", "♬", "♩", "🎶"];

export default function MusicPlayer({ isAutoPlay = false }: { isAutoPlay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [notes, setNotes] = useState<Note[]>([]);
  const noteIdCounter = useRef(0);

  // Initialize audio volume and load metadata
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Sync volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle Autoplay trigger from Gift Box open
  useEffect(() => {
    if (isAutoPlay) {
      // Small timeout to guarantee browser interaction unlock registers
      setTimeout(() => {
        handlePlay();
      }, 100);
    }
  }, [isAutoPlay]);

  // Floating music notes generator
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      const id = noteIdCounter.current++;
      const newNote: Note = {
        id,
        char: MUSICAL_NOTES[Math.floor(Math.random() * MUSICAL_NOTES.length)],
        left: Math.random() * 40 - 20, // offset centered around button
        size: Math.random() * 10 + 12, // 12px to 22px
        duration: Math.random() * 1.5 + 1.5, // 1.5s to 3s
      };

      setNotes((prev) => [...prev.slice(-15), newNote]);

      // clean up note after animation completes
      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }, newNote.duration * 1000);
    }, 600);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Web Audio Visualizer setup
  const initVisualizer = () => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    if (!audioContextRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // small fft for clean visualizer waves

        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch (err) {
        console.error("Failed to initialize Web Audio API:", err);
        return;
      }
    }

    const ctxState = audioContextRef.current;
    if (ctxState && ctxState.state === "suspended") {
      ctxState.resume();
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!canvasCtx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, w, h);

      // Create beautiful soft rose gradient for visualizer
      const gradient = canvasCtx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, "rgba(232, 105, 138, 0.4)");
      gradient.addColorStop(0.5, "rgba(255, 160, 190, 0.85)");
      gradient.addColorStop(1, "rgba(232, 105, 138, 0.4)");

      canvasCtx.fillStyle = gradient;

      const barWidth = (w / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // scale frequency to canvas height
        barHeight = (dataArray[i] / 255) * h * 0.85;

        // Draw symmetrical rounded bars
        const y = h - barHeight;
        canvasCtx.beginPath();
        if (canvasCtx.roundRect) {
          canvasCtx.roundRect(x, y, barWidth - 2, barHeight, 3);
        } else {
          canvasCtx.rect(x, y, barWidth - 2, barHeight);
        }
        canvasCtx.fill();

        x += barWidth;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    render();
  };

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().then(() => {
      setIsPlaying(true);
      initVisualizer();
    }).catch((err) => {
      console.warn("Audio autoplay blocked or failed:", err);
    });
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <audio ref={audioRef} src="/music/song1.mp3" preload="auto" loop />

      {/* Floating Notes Container */}
      <div
        className="fixed bottom-[90px] right-[28px] z-[999] pointer-events-none"
        style={{ width: "60px", height: "150px" }}
      >
        {notes.map((n) => (
          <div
            key={n.id}
            className="absolute bottom-0 text-[#ff96b4]/85 animate-float-note pointer-events-none select-none font-bold"
            style={{
              left: `${50 + n.left}%`,
              fontSize: `${n.size}px`,
              animation: `float-note-anim ${n.duration}s ease-out forwards`,
            }}
          >
            {n.char}
          </div>
        ))}
      </div>

      {/* Floating Toggle Button (Bottom Right) */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          // Resume audio context if it was suspended on user gesture
          if (audioContextRef.current && audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume();
          }
        }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full glass z-[999] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,150,180,0.3)] ${isPlaying ? "border-[#ff96b4] border" : "border-white/20 border"
          }`}
        aria-label="Toggle Music Player"
      >
        <span className={`text-2xl transition-transform duration-[4s] linear infinite ${isPlaying ? "animate-[spin_4s_linear_infinite] filter drop-shadow-[0_0_8px_rgba(255,150,180,0.8)]" : ""}`}>
          🌸
        </span>
      </button>

      {/* Main Music Player Panel (Slides from Left) */}
      <div
        className={`fixed bottom-6 left-6 w-[320px] glass p-4 z-[990] flex flex-col gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "-translate-x-10 opacity-0 pointer-events-none"
          }`}
      >
        {/* Track Details */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden relative border border-white/10 shrink-0">
            <img
              src="/assets/images/img1.jpeg"
              alt="Song Cover"
              className={`w-full h-full object-cover ${isPlaying ? "animate-[spin_8s_linear_infinite]" : ""}`}
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-white text-sm font-medium truncate tracking-wide">You and I</span>
            <span className="text-[#ffc8dc]/70 text-xs truncate font-light mt-0.5">One Direction</span>
          </div>
          {/* Active Audio Visualizer Canvas */}
          <canvas
            ref={canvasRef}
            width={60}
            height={24}
            className="w-[60px] h-6 shrink-0 opacity-80"
          />
        </div>

        {/* Timeline Progress Bar */}
        <div className="flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff96b4] hover:accent-[#ffc8dc]"
          />
          <div className="flex justify-between text-[10px] text-[#ffc8dc]/60 font-light mt-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls Layout */}
        <div className="flex items-center justify-between mt-1">
          {/* Left: Playback toggles */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <span className="text-xs text-white/80 select-none">
              {isPlaying ? "Playing Surenade..." : "Paused"}
            </span>
          </div>

          {/* Right: Volume control slider */}
          <div className="flex items-center gap-2 max-w-[90px]">
            <span className="text-[10px] text-[#ffc8dc]/75">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff96b4]"
            />
          </div>
        </div>
      </div>

      {/* Injected animations specifically for floating notes */}
      <style jsx global>{`
        @keyframes float-note-anim {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.6) rotate(0deg);
          }
          15% {
            opacity: 1;
            transform: translate3d(var(--x-mid, -10px), -30px, 0) scale(1.1) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--x-end, 15px), -120px, 0) scale(0.7) rotate(-30deg);
          }
        }
      `}</style>
    </>
  );
}
