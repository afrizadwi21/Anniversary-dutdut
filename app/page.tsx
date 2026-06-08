"use client";

import React, { useState, useEffect } from "react";
import GiftBox from "@/components/GiftBox";
import PetalCanvas from "@/components/PetalCanvas";
import CursorTrail from "@/components/CursorTrail";
import InteractiveCard from "@/components/InteractiveCard";
import MusicPlayer from "@/components/MusicPlayer";
import CountdownTimer from "@/components/CountdownTimer";
import TimelineMilestones from "@/components/TimelineMilestones";
import LoveLoomOrbit from "@/components/LoveLoomOrbit";

const CELEBRATE_CARDS = [
  {
    icon: "🌹",
    title: "Your Smile",
    text: "The one that made me fall — and still does, every single day. Happy anniversary to that smile.",
    delayClass: "delay0",
  },
  {
    icon: "💫",
    title: "Your Soul",
    text: "Rare, luminous, and more precious than anything this world has to offer. I'm so lucky it's mine.",
    delayClass: "delay1",
  },
  {
    icon: "🌸",
    title: "Your Kindness",
    text: "The way you love and care for everyone around you makes this world a softer, better place.",
    delayClass: "delay2",
  },
  {
    icon: "✨",
    title: "Your Laughter",
    text: "My favourite sound in the universe. May our days be filled with endless reasons to laugh.",
    delayClass: "delay3",
  },
  {
    icon: "🌺",
    title: "Your Strength",
    text: "We've walked through storms with such grace. I admire you more with every passing year.",
    delayClass: "delay4",
  },
  {
    icon: "💖",
    title: "Simply You",
    text: "Every version of you, at every milestone — you are more than enough. You are everything.",
    delayClass: "delay5",
  },
];

const GARDEN_FLOWERS = [
  { emoji: "🌹", name: "Rose", wish: "May love surround us always", class: "gf1" },
  { emoji: "🌸", name: "Cherry Blossom", wish: "May our love be as soft as you", class: "gf2" },
  { emoji: "🪷", name: "Lotus", wish: "May we bloom in all our glory", class: "gf3" },
  { emoji: "🌺", name: "Hibiscus", wish: "May passion light our path", class: "gf4" },
  { emoji: "🌼", name: "Daisy", wish: "May joy follow us everywhere", class: "gf5" },
  { emoji: "🌷", name: "Tulip", wish: "May all our wishes come true", class: "gf6" },
  { emoji: "🌻", name: "Sunflower", wish: "May our future shine bright", class: "gf7" },
];

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [theme, setTheme] = useState<"dark" | "pink">("pink");

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "pink" : "dark"));
  };

  // Handle intersection observer for scroll reveals
  useEffect(() => {
    if (!isOpened) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [isOpened]);

  const handleOpenGift = () => {
    setIsOpened(true);
    setPlayMusic(true);
  };

  const handleScrollToMessage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("message");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#ff96b4] selection:text-[#0e0208]">
      {/* Theme Toggle Button */}
      {isOpened && (
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-[1900] px-4 py-2 rounded-full glass border border-[#ff96b4]/30 text-xs font-body tracking-wider text-[#ff96b4] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,150,180,0.25)] flex items-center gap-2 cursor-pointer"
        >
          {theme === "dark" ? "🌸 Sweet Pink" : "🍷 Romantic Dark"}
        </button>
      )}
      {/* Intro Scene / Unopened state */}
      {!isOpened && <GiftBox onOpen={handleOpenGift} />}

      {/* Global Background Layer */}
      <div id="global-bg-layer" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Falling Petals Canvas (Starts after opening gift box) */}
      {isOpened && (
        <>
          <PetalCanvas count={45} isFixed={true} speed={0.4} />
          <CursorTrail />
          <MusicPlayer isAutoPlay={playMusic} />
        </>
      )}

      {/* Main Website Surprises */}
      <div id="main-site" className={`${isOpened ? "entering block" : "hidden"}`}>

        {/* ===== HERO SECTION ===== */}
        <section id="hero" className="flex items-center justify-center min-h-screen text-center">
          <div className="hero-content w-full">
            <p className="hero-eyebrow">Jaja & Dutdut</p>
            <h1 className="hero-title">
              <span className="line1 font-display">Happy Anniversary,</span>
              <span className="line2 italic font-display">Dutdut</span>
            </h1>
            <p className="hero-sub">
              Hari demi hari kita lalui bersama, dan setiap detiknya adalah bagian terindah dalam hidup akuu cayangg.
            </p>

            <CountdownTimer />

            <div className="hero-flowers mt-6">
              <svg className="hero-flower" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="flower-group">
                  <ellipse cx="50" cy="30" rx="12" ry="22" fill="rgba(255,182,193,0.85)" className="petal p1" />
                  <ellipse cx="50" cy="30" rx="12" ry="22" fill="rgba(255,182,193,0.85)" className="petal p2" transform="rotate(60,50,50)" />
                  <ellipse cx="50" cy="30" rx="12" ry="22" fill="rgba(255,182,193,0.85)" className="petal p3" transform="rotate(120,50,50)" />
                  <ellipse cx="50" cy="30" rx="12" ry="22" fill="rgba(255,192,203,0.85)" className="petal p4" transform="rotate(180,50,50)" />
                  <ellipse cx="50" cy="30" rx="12" ry="22" fill="rgba(255,192,203,0.85)" className="petal p5" transform="rotate(240,50,50)" />
                  <ellipse cx="50" cy="30" rx="12" ry="22" fill="rgba(255,192,203,0.85)" className="petal p6" transform="rotate(300,50,50)" />
                  <circle cx="50" cy="50" r="10" fill="rgba(255,220,180,0.95)" />
                </g>
              </svg>
            </div>

            <a href="#message" onClick={handleScrollToMessage} className="scroll-btn cursor-pointer">
              <span>Discover our anniversary surprise</span>
              <div className="scroll-arrow">↓</div>
            </a>
          </div>
        </section>

        {/* ===== MESSAGE SECTION ===== */}
        <section id="message" className="relative">
          <div className="section-inner">
            <InteractiveCard maxRotateX={5} maxRotateY={5} scale={1.01}>
              <div className="message-card glass">
                <div className="card-flowers-top">
                  <span className="inline-flower">🌸</span>
                  <span className="inline-flower delay1">🌺</span>
                  <span className="inline-flower delay2">🌸</span>
                </div>
                <p className="msg-label">Dibacaaaa, awas aja kalo ga dibaca, tau ko lebay</p>
                <h2 className="msg-title">
                  Menapaki Setiap Detik<br />
                  <em>Melangkah Bersama</em><br />
                  Menulis Cerita Kita.
                </h2>
                <p className="msg-body">
                  Sejak hari pertama kita melangkah bersama, setiap momen yang kita lalui telah terukir menjadi melodi terindah dalam hidup akuu. Kita telah melewati banyak hal banget yaa hahaha dari menertawakan hal-hal kecil, hingga saling mendekap erat untuk menenangkan badai yang sesekali datang menghampiri. Kamu bukan sekadar seseorang yang mendampingi akuu kamu adalah rumah tempat ternyaman buat aku.
                </p>
                <p className="msg-body">
                  Hubungan kita bukan hanya tentang hari hari yang menyenangkan, melainkan tentang bagaimana kita tetap memilih satu sama lain bahkan saat keadaan terasa sulit. Aku bersyukur atas setiap proses pendewasaan yang kita lalui bersama, bagaimana kita belajar mengalah, memahami keheningan masing masing, dan bangkit kembali dengan cinta yang lebih matang.
                </p>
                <p className="msg-body">
                  Terima kasih udahh ngasih aku kesempatan ber kali kali dengan begitu tulus dan sabar. Terima kasih telah menjadi bagian terbaik dari cerita hidup aku. Happy anniversary, sayangku, cintakuuuu. Semoga kitaaa bisa melewati badai badai yang akan datang nantii yaaaa, aku harap kamu selamanya sama akuuu.
                </p>
                <div className="msg-signature">— You and I</div>
              </div>
            </InteractiveCard>
          </div>

          <div className="section-petals">
            <div className="s-petal sp1">🌸</div>
            <div className="s-petal sp2">🌺</div>
            <div className="s-petal sp3">🌼</div>
            <div className="s-petal sp4">🌸</div>
            <div className="s-petal sp5">🌷</div>
          </div>
        </section>

        {/* ===== LOVELOOM ORBIT SECTION ===== */}
        <section id="loveloom" className="relative">
          <div className="section-inner">
            <p className="section-eyebrow">galaxy of us</p>
            <h2 className="section-title">
              Pusat Gravitasi<br />
              <em>Semesta Cintaku</em>
            </h2>
            <LoveLoomOrbit />
          </div>
        </section>

        {/* ===== TIMELINE SECTION ===== */}
        <section id="timeline" className="relative">
          <div className="section-inner">
            <p className="section-eyebrow">kisah kita</p>
            <h2 className="section-title">
              Perjalanan Indah<br />
              <em>Yang Kita Lewati Bersama</em>
            </h2>
            <TimelineMilestones />
          </div>
        </section>

        {/* ===== REASONS SECTION ===== */}
        <section id="reasons">
          <div className="section-inner">
            <p className="section-eyebrow">a thousand sweet memories</p>
            <h2 className="section-title">What I Cherish About Us</h2>

            <div className="reasons-grid">
              {CELEBRATE_CARDS.map((card, i) => (
                <InteractiveCard
                  key={i}
                  maxRotateX={8}
                  maxRotateY={8}
                  scale={1.03}
                  className={`reveal-card ${card.delayClass}`}
                >
                  <div className="reason-card glass min-h-[250px]">
                    <div className="reason-icon">{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GARDEN SECTION ===== */}
        <section id="garden">
          <div className="garden-bg" />
          <div className="section-inner">
            <p className="section-eyebrow">our anniversary garden</p>
            <h2 className="section-title garden-title">
              A Garden Blooming<br />
              <em>For Our Love Today</em>
            </h2>

            <div className="flower-garden">
              {GARDEN_FLOWERS.map((flower, i) => (
                <div key={i} className={`garden-flower ${flower.class}`}>
                  <div className="gf-bloom">{flower.emoji}</div>
                  <div className="gf-stem" />
                  <div className="gf-tooltip glass">
                    <strong>{flower.name}</strong>
                    <span>{flower.wish}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="garden-note">💖 hover each flower — an anniversary wish is hiding inside ✨</p>
          </div>
        </section>

        {/* ===== MEMORIES SECTION ===== */}
        <section id="memories">
          <div className="section-inner">
            {/* Git conflict markers displayed literally to replicate site exactly */}
            {`<<<<<<< HEAD`}
            <p className="section-eyebrow">captured in time</p>
            {`=======`}
            <p className="section-eyebrow">celebrating us</p>
            {`>>>>>>> eef0d1c (update)`}

            <h2 className="section-title">
              Our Beautiful<br />
              <em>Pictures</em>
            </h2>

            <div className="gallery-grid">
              <InteractiveCard className="gallery-card glass gc1" maxRotateX={4} maxRotateY={4}>
                <img src="/assets/images/img1.jpeg" className="gallery-img w-full object-cover aspect-square" alt="Photo 1" />
                <div className="gallery-caption">our</div>
              </InteractiveCard>

              <InteractiveCard className="gallery-card glass gc2" maxRotateX={4} maxRotateY={4}>
                <img src="/assets/images/img2.jpeg" className="gallery-img w-full object-cover aspect-square" alt="Photo 2" />
                <div className="gallery-caption">beautiful</div>
              </InteractiveCard>

              <InteractiveCard className="gallery-card glass gc3" maxRotateX={4} maxRotateY={4}>
                <img src="/assets/images/img3.jpeg" className="gallery-img w-full object-cover aspect-square" alt="Photo 3" />
                <div className="gallery-caption">journey</div>
              </InteractiveCard>

              <InteractiveCard className="gallery-card glass gc4" maxRotateX={4} maxRotateY={4}>
                <img src="/assets/images/img4.jpeg" className="gallery-img w-full object-cover aspect-square" alt="Photo 4" />
                <div className="gallery-caption">together</div>
              </InteractiveCard>
            </div>
          </div>
        </section>

        {/* ===== FINALE SECTION ===== */}
        <section id="finale">
          {/* Internal relative canvas petal rain just for finale section background */}
          <div className="absolute inset-0 z-0 opacity-40 overflow-hidden pointer-events-none">
            <PetalCanvas count={15} isFixed={false} speed={0.2} />
          </div>

          <div className="finale-inner">
            <div className="finale-flowers">
              <span className="ff">🌸</span>
              <span className="ff delay1">🌺</span>
              <span className="ff delay2">🌹</span>
              <span className="ff delay3">🌸</span>
              <span className="ff delay4">🌷</span>
            </div>

            <p className="finale-eyebrow">happy anniversary, my love 💖</p>

            <h2 className="finale-title">
              Dutdut Balaga,<br />
              <em>Jaja Baik</em>
            </h2>

            <p className="finale-body">
              Di hari yang istimewa ini, aku ingin kamu tahu bahwa mencintaimu dan melangkah bersamamu adalah petualangan terbaik dalam hidup akuuuu. Setiap tahun yang kita habiskan bersama adalah anugerah terindah bagi akuuu. Setiap tawa, setiap pelukan hangat, dan setiap detak jantung kita yang beriringan. Happy anniversary,cintaku. 🌸
            </p>

            <div className="finale-heart">
              <div className="heart-pulse text-6xl">💗</div>
            </div>

            <p className="finale-sig">kamu baong</p>
          </div>
        </section>

        {/* ===== FOOTER ===== */}

      </div>
    </div>
  );
}
