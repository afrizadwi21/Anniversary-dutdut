"use client";

import React, { useState, useEffect, useRef } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import CountdownTimer from "@/components/CountdownTimer";
import TimelineMilestones from "@/components/TimelineMilestones";
import LoveLoomOrbit from "@/components/LoveLoomOrbit";
import OpenWhenLetters from "@/components/OpenWhenLetters";

const CHERISHED_NOTES = [
  {
    title: "Your Smile",
    text: "The one that made me fall — and still does, every single day.",
  },
  {
    title: "Your Soul",
    text: "Rare, luminous, and more precious than anything this world has to offer. I'm so lucky it's mine.",
  },
  {
    title: "Your Kindness",
    text: "The way you love and care for everyone around you makes this world a softer, better place.",
  },
  {
    title: "Your Laughter",
    text: "My favourite sound in the universe. May our days be filled with endless reasons to laugh.",
  },
  {
    title: "Your Strength",
    text: "We've walked through storms with such grace. I admire you more with every passing year.",
  },
  {
    title: "Simply You",
    text: "Every version of you, at every milestone — you are more than enough. You are everything.",
  },
];

const GALLERY_ITEMS = [
  { src: "/assets/images/img1.jpeg", fallback: "/assets/dummy/memory-1.svg", caption: "our" },
  { src: "/assets/images/img2.jpeg", fallback: "/assets/dummy/memory-2.svg", caption: "beautiful" },
  { src: "/assets/images/img3.jpeg", fallback: "/assets/dummy/memory-3.svg", caption: "journey" },
  { src: "/assets/images/img4.jpeg", fallback: "/assets/dummy/memory-4.svg", caption: "together" },
];

export default function Home() {
  const [playMusic, setPlayMusic] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [galleryFallbacks, setGalleryFallbacks] = useState<Record<number, boolean>>({});
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  // Sync theme to <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Bidirectional scroll choreography (smooth reveal on scroll down AND scroll up + top progress hairline)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));

    if (reduced) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    let scrollDir: "down" | "up" = "down";
    let rafId: number | null = null;

    const updateScrollProgress = () => {
      const y = window.scrollY;
      scrollDir = y >= lastScrollY.current ? "down" : "up";
      lastScrollY.current = y;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
          } else {
            const rect = entry.boundingClientRect;
            // Only reset when completely outside the viewport to prevent edge oscillation/jitter
            if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
              el.setAttribute("data-scroll-dir", rect.top < 0 ? "up" : scrollDir);
              el.classList.remove("is-visible");
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] pb-40 sm:pb-32 transition-colors duration-300">
      {/* Hairline Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent-ink)] origin-left z-50 pointer-events-none"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Minimal Header with Light/Dark Toggle */}
      <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--bg-header)] backdrop-blur-md transition-colors duration-300">
        <nav
          aria-label="Navigasi utama"
          className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4"
        >
          <a
            href="#hero"
            onClick={scrollToSection("hero")}
            className="font-display italic text-lg text-[var(--text-primary)] hover:opacity-75 transition-opacity shrink-0"
          >
            buat dutdut
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <a href="#orbit" onClick={scrollToSection("orbit")} className="hover:text-[var(--text-primary)] transition-colors">
                Orbit
              </a>
              <a href="#letter" onClick={scrollToSection("letter")} className="hover:text-[var(--text-primary)] transition-colors">
                Surat
              </a>
              <a href="#open-when" onClick={scrollToSection("open-when")} className="hover:text-[var(--text-primary)] transition-colors">
                Kapsul
              </a>
              <a href="#timeline" onClick={scrollToSection("timeline")} className="hover:text-[var(--text-primary)] transition-colors">
                Jejak
              </a>
              <a href="#memories" onClick={scrollToSection("memories")} className="hover:text-[var(--text-primary)] transition-colors">
                Galeri
              </a>
            </div>

            <button
              type="button"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label={theme === "dark" ? "Ubah ke mode terang" : "Ubah ke mode gelap"}
              aria-pressed={theme === "light"}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono uppercase tracking-[0.1em] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>
        </nav>
      </header>

      <MusicPlayer isAutoPlay={playMusic} theme={theme} />

      <main className="relative z-10">
        {/* ===== HERO SECTION ===== */}
        <section id="hero" className="min-h-[88vh] flex items-center justify-center px-4 sm:px-6 py-20 text-center">
          <div data-scroll-reveal className="scroll-reveal is-visible max-w-3xl mx-auto w-full">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-normal tracking-[-0.02em] leading-[1.05] text-[var(--text-primary)]">
              buat <em className="italic">dutdut</em>
            </h1>

            <p className="font-body text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto mt-6 leading-relaxed">
              Jaja &amp; Dutdut — hari demi hari kita lalui bersama, dan setiap detiknya adalah bagian terindah dalam hidup akuu cayangg.
            </p>

            <CountdownTimer />

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#orbit"
                onClick={scrollToSection("orbit")}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[var(--accent-ink)] text-[var(--accent-contrast)] font-body text-sm font-semibold tracking-wide hover:opacity-85 transition-opacity"
              >
                <span>Jelajahi Orbit 3D</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setPlayMusic(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-body text-sm font-medium hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
                <span>Putar Lagu</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===== 3D PLANETARIUM SECTION ===== */}
        <section id="orbit" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[var(--border-hairline)]">
          <div data-scroll-reveal className="scroll-reveal max-w-5xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--text-primary)] mb-3">
              Pusat Gravitasi <em className="italic">Semesta Kita</em>
            </h2>
            <LoveLoomOrbit theme={theme} />
          </div>
        </section>

        {/* ===== LETTER SECTION ===== */}
        <section id="letter" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[var(--border-hairline)]">
          <div data-scroll-reveal className="scroll-reveal max-w-2xl mx-auto">
            <article className="mono-surface p-7 sm:p-11">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] mb-4">
                Dibacaaaa, awas aja kalo ga dibaca, tau ko lebay
              </p>

              <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)] leading-snug mb-8">
                Menapaki Setiap Detik,{" "}
                <em className="italic">Melangkah Bersama,</em>{" "}
                Menulis Cerita Kita.
              </h2>

              <div className="space-y-5 font-body text-[var(--text-muted)] text-base leading-[1.8]">
                <p>
                  Sejak hari pertama kita melangkah bersama, setiap momen yang kita lalui telah terukir menjadi melodi terindah dalam hidup akuu. Kita telah melewati banyak hal banget yaa hahaha dari menertawakan hal-hal kecil, hingga saling mendekap erat untuk menenangkan badai yang sesekali datang menghampiri. Kamu bukan sekadar seseorang yang mendampingi akuu, kamu adalah rumah tempat ternyaman buat aku.
                </p>
                <p>
                  Hubungan kita bukan hanya tentang hari-hari yang menyenangkan, melainkan tentang bagaimana kita tetap memilih satu sama lain bahkan saat keadaan terasa sulit. Aku bersyukur atas setiap proses pendewasaan yang kita lalui bersama, bagaimana kita belajar mengalah, memahami keheningan masing-masing, dan bangkit kembali dengan cinta yang lebih matang.
                </p>
                <p>
                  Terima kasih udahh ngasih aku kesempatan berkali-kali dengan begitu tulus dan sabar. Terima kasih telah menjadi bagian terbaik dari cerita hidup aku. Semoga kitaaa bisa melewati badai-badai yang akan datang nantii yaaaa, aku harap kamu selamanya sama akuuu.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] font-display italic text-xl text-[var(--text-primary)]">
                — You and I
              </div>
            </article>
          </div>
        </section>

        {/* ===== OPEN-WHEN CAPSULES SECTION ===== */}
        <section id="open-when" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[var(--border-hairline)]">
          <div className="max-w-5xl mx-auto">
            <div data-scroll-reveal className="scroll-reveal text-center mb-12">
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text-primary)] mb-3">
                Kapsul Waktu <em className="italic">Buat Dutdut</em>
              </h2>
              <p className="font-body text-sm text-[var(--text-muted)] max-w-md mx-auto">
                Pilih dan buka salah satu amplop sesuai keadaanmu hari ini.
              </p>
            </div>
            <OpenWhenLetters />
          </div>
        </section>

        {/* ===== TIMELINE SECTION ===== */}
        <section id="timeline" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[var(--border-hairline)]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 data-scroll-reveal className="scroll-reveal font-display text-3xl sm:text-5xl text-[var(--text-primary)] mb-12">
              Perjalanan Indah <em className="italic">Yang Kita Lewati</em>
            </h2>
            <TimelineMilestones />
          </div>
        </section>

        {/* ===== CHERISHED QUALITIES SECTION ===== */}
        <section id="qualities" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[var(--border-hairline)]">
          <div className="max-w-4xl mx-auto">
            <h2 data-scroll-reveal className="scroll-reveal font-display text-3xl sm:text-5xl text-[var(--text-primary)] text-center mb-14">
              What I Cherish About Us
            </h2>

            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 list-none p-0">
              {CHERISHED_NOTES.map((item, i) => (
                <li
                  key={i}
                  data-scroll-reveal
                  className="scroll-reveal pt-5 border-t border-[var(--border-hairline)] flex flex-col gap-2"
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-[var(--text-muted)] pl-7">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== MEMORIES GALLERY SECTION ===== */}
        <section id="memories" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[var(--border-hairline)]">
          <div className="max-w-5xl mx-auto">
            <h2 data-scroll-reveal className="scroll-reveal font-display text-3xl sm:text-5xl text-[var(--text-primary)] text-center mb-12">
              Our Beautiful <em className="italic">Pictures</em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {GALLERY_ITEMS.map((item, idx) => (
                <figure
                  key={idx}
                  data-scroll-reveal
                  className="scroll-reveal mono-surface overflow-hidden flex flex-col"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  <div className="aspect-square w-full bg-[var(--bg-elevated)] overflow-hidden">
                    <img
                      src={galleryFallbacks[idx] ? item.fallback : item.src}
                      alt={`Jaja dan Dutdut — ${item.caption}`}
                      onError={() =>
                        setGalleryFallbacks((prev) => ({ ...prev, [idx]: true }))
                      }
                      className="w-full h-full object-cover grayscale contrast-105 transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <figcaption className="px-4 py-3 font-display italic text-lg text-[var(--text-primary)] border-t border-[var(--border-hairline)] text-center">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CLOSING SECTION ===== */}
        <section id="closing" className="py-24 px-4 sm:px-6 border-t border-[var(--border-hairline)] text-center">
          <div data-scroll-reveal className="scroll-reveal max-w-2xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl text-[var(--text-primary)] mb-6">
              Dutdut Balaga, <em className="italic">Jaja Baik</em>
            </h2>

            <p className="font-body text-[var(--text-muted)] text-base leading-relaxed mb-8">
              Di hari yang istimewa ini, aku ingin kamu tahu bahwa mencintaimu dan melangkah bersamamu adalah petualangan terbaik dalam hidup akuuuu. Setiap tahun yang kita habiskan bersama adalah anugerah terindah bagi akuuu. Setiap tawa, setiap pelukan hangat, dan setiap detak jantung kita yang beriringan.
            </p>

            <p className="font-display italic text-2xl text-[var(--text-primary)]">
              kamu baong
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
