"use client";

import React, { useRef, useState, useEffect } from "react";

interface SyncedCue {
  time: number;
  line: string;
  note: string;
}

const SYNCED_CUES: SyncedCue[] = [
  { time: 0, line: "Intro — You and I", note: "Tarik napas pelan, dengarkan melodi awalnya." },
  { time: 14, line: "I figured it out from black and white...", note: "Dari awal yang sederhana sampai sejauh ini." },
  { time: 30, line: "Seconds and hours, maybe they had to take some time", note: "Setiap proses pendewasaan kita berdua." },
  { time: 48, line: "I know how it goes for someone like me...", note: "Terima kasih sudah selalu sabar." },
  { time: 66, line: "You and I, we don't wanna be like them", note: "Kita punya cara kita sendiri." },
  { time: 86, line: "We can make it 'til the end", note: "Sampai kapan pun, tetap bareng ya." },
  { time: 112, line: "Nothing can come between you and I", note: "Bahkan badai sekalipun." },
  { time: 142, line: "Not even the gods above can separate the two of us", note: "Selalu saling pilih satu sama lain." },
  { time: 175, line: "Bridge — Every moment stays", note: "Setiap detik bersama kamu itu berharga." },
  { time: 205, line: "You and I — Finale", note: "Terima kasih sudah jadi rumah ternyaman." },
];

export default function MusicPlayer({
  isAutoPlay = false,
  theme = "dark",
}: {
  isAutoPlay?: boolean;
  theme?: "dark" | "light";
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const activeCueRef = useRef<HTMLButtonElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [coverFallback, setCoverFallback] = useState(false);

  const isLight = theme === "light";

  // Determine active synced cue index
  const activeCueIndex = SYNCED_CUES.reduce((acc, cue, idx) => {
    return currentTime >= cue.time ? idx : acc;
  }, 0);

  useEffect(() => {
    if (showLyrics && activeCueRef.current) {
      activeCueRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeCueIndex, showLyrics]);

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
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

      canvasCtx.fillStyle = isLight ? "rgba(9, 9, 11, 0.78)" : "rgba(250, 250, 250, 0.85)";

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

  useEffect(() => {
    if (isPlaying) {
      initVisualizer();
    }
  }, [theme]);

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

  const seekToTime = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
    if (!isPlaying) {
      handlePlay();
    }
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

      {/* Floating Toggle Button (Spinning Monochrome Vinyl/Cassette Disc when minimized) */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((o) => !o);
          if (audioContextRef.current && audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume();
          }
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Kecilkan pemutar musik" : "Buka pemutar musik"}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-13 h-13 rounded-full bg-[var(--bg-surface)] border shadow-[var(--shadow-floating)] z-[999] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
          isPlaying ? "border-[var(--accent-ink)] text-[var(--accent-ink)]" : "border-[var(--border-hairline)] text-[var(--text-primary)]"
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className={isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}
        >
          {/* Outer vinyl / cassette disc */}
          <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="11" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.9" strokeDasharray="6 3" />
          <circle cx="18" cy="18" r="7.5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          {/* Center label & spindle */}
          <circle cx="18" cy="18" r="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="18" cy="18" r="1.4" fill="currentColor" />
        </svg>
      </button>

      {/* Music Player Panel (Solid surface so background text never bleeds through) */}
      <div
        className={`fixed inset-x-4 bottom-20 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[340px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-[var(--shadow-floating)] rounded-[18px] p-4 z-[990] flex flex-col gap-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {/* Track Details + Lyrics Toggle + Minimize Button */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-[10px] overflow-hidden border border-[var(--border-hairline)] shrink-0 bg-[var(--bg-elevated)]">
            <img
              src={coverFallback ? "/assets/dummy/memory-1.svg" : "/assets/images/img1.jpeg"}
              alt="You and I — One Direction"
              onError={() => setCoverFallback(true)}
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[var(--text-primary)] text-sm font-medium truncate">You and I</span>
            <span className="text-[var(--text-muted)] text-xs truncate mt-0.5">One Direction</span>
          </div>
          <canvas
            ref={canvasRef}
            width={40}
            height={20}
            className="w-[40px] h-[20px] shrink-0 opacity-90"
          />
          <button
            type="button"
            onClick={() => setShowLyrics((s) => !s)}
            aria-expanded={showLyrics}
            className={`px-2.5 py-1 rounded-full border font-mono text-xs tracking-wider cursor-pointer transition-colors ${
              showLyrics
                ? "bg-[var(--accent-ink)] text-[var(--accent-contrast)] border-[var(--accent-ink)]"
                : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-primary)]"
            }`}
          >
            LIRIK
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Kecilkan ke tombol kaset"
            className="w-7 h-7 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14" />
            </svg>
          </button>
        </div>

        {/* Synced Lyrics & Notes Drawer */}
        {showLyrics && (
          <div
            aria-label="Lirik dan catatan sinkron"
            className="max-h-32 overflow-y-auto border-y border-[var(--border-hairline)] py-2 space-y-1.5 pr-1"
          >
            {SYNCED_CUES.map((cue, idx) => {
              const isActive = idx === activeCueIndex;
              return (
                <button
                  key={cue.time}
                  ref={isActive ? activeCueRef : null}
                  type="button"
                  onClick={() => seekToTime(cue.time)}
                  className={`w-full text-left px-2 py-1.5 rounded-[8px] transition-all cursor-pointer block ${
                    isActive
                      ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] opacity-60 hover:opacity-95"
                  }`}
                >
                  <p className={`font-display italic text-sm leading-snug ${isActive ? "text-[var(--text-primary)]" : ""}`}>
                    {cue.line}
                  </p>
                  <p className="font-body text-xs text-[var(--text-muted)] mt-0.5">
                    {cue.note}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Timeline Progress Bar */}
        <div className="flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek audio timeline"
            className="w-full h-1 bg-[var(--border-hairline)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-ink)]"
          />
          <div className="flex justify-between font-mono text-xs text-[var(--text-muted)] mt-0.5">
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
              className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition-all cursor-pointer"
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
            <span className="font-mono text-xs text-[var(--text-muted)] select-none">
              {isPlaying ? "PLAYING" : "PAUSED"}
            </span>
          </div>

          <div className="flex items-center gap-2 max-w-[96px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-muted)] shrink-0" aria-hidden="true">
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
              className="w-16 h-1 bg-[var(--border-hairline)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-ink)]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
