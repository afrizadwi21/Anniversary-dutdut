"use client";

import React, { useRef, useState, useEffect } from "react";

export default function MusicPlayer({ isAutoPlay = false }: { isAutoPlay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [coverFallback, setCoverFallback] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isAutoPlay) {
      handlePlay();
    }
  }, [isAutoPlay]);

  const initVisualizer = () => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    if (!audioContextRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;

        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch {
        return;
      }
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    const analyser = analyserRef.current;
    const canvasCtx = canvas.getContext("2d");
    if (!analyser || !canvasCtx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      analyser.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, w, h);

      const gradient = canvasCtx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, "rgba(226, 168, 86, 0.45)");
      gradient.addColorStop(0.5, "rgba(245, 205, 130, 0.9)");
      gradient.addColorStop(1, "rgba(226, 168, 86, 0.45)");
      canvasCtx.fillStyle = gradient;

      const barWidth = (w / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * h * 0.85;
        const y = h - barHeight;
        canvasCtx.beginPath();
        if (canvasCtx.roundRect) {
          canvasCtx.roundRect(x, y, Math.max(2, barWidth - 2), barHeight, 2);
        } else {
          canvasCtx.rect(x, y, Math.max(2, barWidth - 2), barHeight);
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

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        initVisualizer();
      })
      .catch(() => {
        setIsPlaying(false);
      });
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const togglePlay = () => {
    if (isPlaying) handlePause();
    else handlePlay();
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

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((o) => !o);
          if (audioContextRef.current && audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume();
          }
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Tutup pemutar musik" : "Buka pemutar musik"}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 rounded-full observatory-floating z-[999] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#e2a856] active:scale-95 ${
          isPlaying ? "border-[#e2a856] text-[#e2a856]" : "text-[#f3efe7]"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>

      {/* Music Player Panel */}
      <div
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 w-[calc(100vw-5.5rem)] sm:w-[320px] observatory-floating rounded-[18px] p-4 z-[990] flex flex-col gap-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {/* Track Details */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[10px] overflow-hidden border border-[#243044] shrink-0 bg-[#182233]">
            <img
              src={coverFallback ? "/assets/dummy/memory-1.svg" : "/assets/images/img1.jpeg"}
              alt="You and I — One Direction"
              onError={() => setCoverFallback(true)}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[#f3efe7] text-sm font-medium truncate">You and I</span>
            <span className="text-[#9aa6b8] text-xs truncate mt-0.5">One Direction</span>
          </div>
          <canvas
            ref={canvasRef}
            width={60}
            height={24}
            className="w-[60px] h-6 shrink-0 opacity-90"
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
            aria-label="Seek audio timeline"
            className="w-full h-1 bg-[#243044] rounded-lg appearance-none cursor-pointer accent-[#e2a856]"
          />
          <div className="flex justify-between font-mono text-xs text-[#9aa6b8] mt-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Jeda lagu" : "Putar lagu"}
              className="w-9 h-9 rounded-full bg-[#182233] border border-[#243044] hover:border-[#e2a856] flex items-center justify-center text-[#f3efe7] active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="7 4 20 12 7 20 7 4" />
                </svg>
              )}
            </button>
            <span className="font-mono text-xs text-[#9aa6b8] select-none">
              {isPlaying ? "PLAYING" : "PAUSED"}
            </span>
          </div>

          <div className="flex items-center gap-2 max-w-[96px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[#9aa6b8] shrink-0" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Audio volume"
              className="w-16 h-1 bg-[#243044] rounded-lg appearance-none cursor-pointer accent-[#e2a856]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
