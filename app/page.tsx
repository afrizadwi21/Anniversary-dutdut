"use client";

import React, { useState } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import CountdownTimer from "@/components/CountdownTimer";
import TimelineMilestones from "@/components/TimelineMilestones";
import LoveLoomOrbit from "@/components/LoveLoomOrbit";

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
  const [galleryFallbacks, setGalleryFallbacks] = useState<Record<number, boolean>>({});

  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090d14] text-[#f3efe7] pb-28">
      {/* Subtle Ambient Observatory Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 40% at 50% 0%, rgba(226, 168, 86, 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 85% 90%, rgba(24, 34, 51, 0.55) 0%, transparent 70%)",
        }}
      />

      {/* Minimal Header */}
      <header className="sticky top-0 z-40 border-b border-[#243044]/70 bg-[#090d14]/85 backdrop-blur-md">
        <nav
          aria-label="Navigasi utama"
          className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
        >
          <a
            href="#hero"
            onClick={scrollToSection("hero")}
            className="font-display italic text-lg text-[#f3efe7] hover:text-[#e2a856] transition-colors"
          >
            buat dutdut
          </a>

          <div className="flex items-center gap-5 sm:gap-7 font-mono text-xs uppercase tracking-[0.12em] text-[#9aa6b8]">
            <a href="#orbit" onClick={scrollToSection("orbit")} className="hover:text-[#e2a856] transition-colors">
              Orbit
            </a>
            <a href="#letter" onClick={scrollToSection("letter")} className="hover:text-[#e2a856] transition-colors">
              Surat
            </a>
            <a href="#timeline" onClick={scrollToSection("timeline")} className="hover:text-[#e2a856] transition-colors">
              Jejak
            </a>
            <a href="#memories" onClick={scrollToSection("memories")} className="hover:text-[#e2a856] transition-colors">
              Galeri
            </a>
          </div>
        </nav>
      </header>

      <MusicPlayer isAutoPlay={playMusic} />

      <main className="relative z-10">
        {/* ===== HERO SECTION ===== */}
        <section id="hero" className="min-h-[88vh] flex items-center justify-center px-4 sm:px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto w-full">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-normal tracking-[-0.02em] leading-[1.05] text-[#f3efe7]">
              buat <em className="italic text-[#e2a856]">dutdut</em>
            </h1>

            <p className="font-body text-base sm:text-lg text-[#9aa6b8] max-w-xl mx-auto mt-6 leading-relaxed">
              Jaja &amp; Dutdut — hari demi hari kita lalui bersama, dan setiap detiknya adalah bagian terindah dalam hidup akuu cayangg.
            </p>

            <CountdownTimer />

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#orbit"
                onClick={scrollToSection("orbit")}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#e2a856] text-[#090d14] font-body text-sm font-semibold tracking-wide hover:bg-[#f5cd82] transition-colors"
              >
                <span>Jelajahi Orbit 3D</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setPlayMusic(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#243044] bg-[#111824] text-[#f3efe7] font-body text-sm font-medium hover:border-[#e2a856] transition-colors cursor-pointer"
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
        <section id="orbit" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[#243044]/60">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-5xl text-[#f3efe7] mb-3">
              Pusat Gravitasi <em className="italic text-[#e2a856]">Semesta Kita</em>
            </h2>
            <LoveLoomOrbit />
          </div>
        </section>

        {/* ===== LETTER SECTION ===== */}
        <section id="letter" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[#243044]/60">
          <div className="max-w-2xl mx-auto">
            <article className="observatory-surface p-7 sm:p-11">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#e2a856] mb-4">
                Dibacaaaa, awas aja kalo ga dibaca, tau ko lebay
              </p>

              <h2 className="font-display text-3xl sm:text-4xl text-[#f3efe7] leading-snug mb-8">
                Menapaki Setiap Detik,{" "}
                <em className="italic text-[#e2a856]">Melangkah Bersama,</em>{" "}
                Menulis Cerita Kita.
              </h2>

              <div className="space-y-5 font-body text-[#9aa6b8] text-base leading-[1.8]">
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

              <div className="mt-8 pt-6 border-t border-[#243044] font-display italic text-xl text-[#e2a856]">
                — You and I
              </div>
            </article>
          </div>
        </section>

        {/* ===== TIMELINE SECTION ===== */}
        <section id="timeline" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[#243044]/60">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-5xl text-[#f3efe7] mb-12">
              Perjalanan Indah <em className="italic text-[#e2a856]">Yang Kita Lewati</em>
            </h2>
            <TimelineMilestones />
          </div>
        </section>

        {/* ===== CHERISHED QUALITIES SECTION ===== */}
        <section id="qualities" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[#243044]/60">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-5xl text-[#f3efe7] text-center mb-14">
              What I Cherish About Us
            </h2>

            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 list-none p-0">
              {CHERISHED_NOTES.map((item, i) => (
                <li
                  key={i}
                  className="pt-5 border-t border-[#243044] flex flex-col gap-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#e2a856]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl text-[#f3efe7]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-[#9aa6b8] pl-7">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== MEMORIES GALLERY SECTION ===== */}
        <section id="memories" className="py-20 md:py-28 px-4 sm:px-6 border-t border-[#243044]/60">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl sm:text-5xl text-[#f3efe7] text-center mb-12">
              Our Beautiful <em className="italic text-[#e2a856]">Pictures</em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {GALLERY_ITEMS.map((item, idx) => (
                <figure
                  key={idx}
                  className="observatory-surface overflow-hidden flex flex-col"
                >
                  <div className="aspect-square w-full bg-[#182233] overflow-hidden">
                    <img
                      src={galleryFallbacks[idx] ? item.fallback : item.src}
                      alt={`Jaja dan Dutdut — ${item.caption}`}
                      onError={() =>
                        setGalleryFallbacks((prev) => ({ ...prev, [idx]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <figcaption className="px-4 py-3 font-display italic text-lg text-[#f3efe7] border-t border-[#243044] text-center">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CLOSING SECTION ===== */}
        <section id="closing" className="py-24 px-4 sm:px-6 border-t border-[#243044]/60 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl text-[#f3efe7] mb-6">
              Dutdut Balaga, <em className="italic text-[#e2a856]">Jaja Baik</em>
            </h2>

            <p className="font-body text-[#9aa6b8] text-base leading-relaxed mb-8">
              Di hari yang istimewa ini, aku ingin kamu tahu bahwa mencintaimu dan melangkah bersamamu adalah petualangan terbaik dalam hidup akuuuu. Setiap tahun yang kita habiskan bersama adalah anugerah terindah bagi akuuu. Setiap tawa, setiap pelukan hangat, dan setiap detak jantung kita yang beriringan.
            </p>

            <p className="font-display italic text-2xl text-[#e2a856]">
              kamu baong
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
