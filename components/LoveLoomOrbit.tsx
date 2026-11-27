"use client";

import React, { useState, useEffect } from "react";

interface OrbitPlanet {
  id: number;
  image: string;
  caption: string;
  message: string;
  sizeClass: string;
  orbitSizeClass: string;
  duration: string;
  delay: string;
}

const ORBIT_PLANETS: OrbitPlanet[] = [
  {
    id: 1,
    image: "/assets/images/img1.jpeg",
    caption: "Jalan Jalan",
    message: "Iniiii seruuuu bangettt walaupun kamu nyebelinnnnnn",
    sizeClass: "w-[40px] h-[40px] md:w-[55px] md:h-[55px]",
    orbitSizeClass: "w-[160px] h-[160px] md:w-[220px] md:h-[220px]",
    duration: "18s",
    delay: "0s",
  },
  {
    id: 2,
    image: "/assets/images/img2.jpeg",
    caption: "Mam Seblakkkk",
    message: "tahhhhh kamu so kerassss pisannn mam seblak pedess wae hayang teboga perut deui mereun.",
    sizeClass: "w-[45px] h-[45px] md:w-[60px] md:h-[60px]",
    orbitSizeClass: "w-[240px] h-[240px] md:w-[340px] md:h-[340px]",
    duration: "28s",
    delay: "-5s",
  },
  {
    id: 3,
    image: "/assets/images/img3.jpeg",
    caption: "Selamattt cayangggg",
    message: "Pastiii nanti rintangann nya tambah susahhh, tapiii aku yakin kamu bisaa sayanggg aku akan terus support kamuuu",
    sizeClass: "w-[42px] h-[42px] md:w-[58px] md:h-[58px]",
    orbitSizeClass: "w-[320px] h-[320px] md:w-[460px] md:h-[460px]",
    duration: "38s",
    delay: "-12s",
  },
  {
    id: 4,
    image: "/assets/images/img4.jpeg",
    caption: "Kedua kalinyaaa fotbar",
    message: "Disiniiiiii aku deg deg an bangettt, saltingggg banget bisa fotbar samaaa cewe cantikkk dan imuttt sedunia inii",
    sizeClass: "w-[50px] h-[50px] md:w-[65px] md:h-[65px]",
    orbitSizeClass: "w-[400px] h-[400px] md:w-[580px] md:h-[580px]",
    duration: "48s",
    delay: "-20s",
  },
];

export default function LoveLoomOrbit() {
  const [selectedPlanet, setSelectedPlanet] = useState<OrbitPlanet | null>(null);

  useEffect(() => {
    if (!selectedPlanet) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPlanet(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPlanet]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center relative select-none">

      {/* Description */}
      <p className="text-center font-body text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-12 font-light leading-relaxed">
        Seperti planet yang setia mengitari matahari, dunia aku berputar di sekeliling Dutdut Pendek. Klik foto planet ini dut buat liat pesan rahasia yang tersembunyi 💖
      </p>

      {/* Galaxy Container */}
      <div
        className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[450px] md:h-[450px] my-10 md:my-16"
      >
        {/* Central Sun (Matahari) */}
        <div className="absolute z-30 flex items-center justify-center group" aria-hidden="true">
          {/* Sun Glow Effects */}
          <div className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-[#fef08a]/40 via-[#fde047]/40 to-[#eab308]/40 blur-xl animate-pulse group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#fde047]/30 to-[#eab308]/30 animate-spin-slow" />

          {/* Sun core */}
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#fef08a] via-[#fde047] to-[#eab308] flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.7)] group-hover:shadow-[0_0_40px_rgba(250,204,21,0.9)] transition-all duration-500 border border-white/40" />
        </div>

        {/* Orbit Rings and Planet Photos */}
        {ORBIT_PLANETS.map((planet) => {
          return (
            <React.Fragment key={planet.id}>
              {/* Transparent Orbit Ring */}
              <div
                className={`absolute inset-0 m-auto rounded-full border border-[#ff96b4]/10 md:border-[#ff96b4]/15 border-dashed pointer-events-none z-10 ${planet.orbitSizeClass}`}
              />

              {/* Orbiting Planet Container (Rotates) */}
              <div
                className={`absolute inset-0 m-auto z-20 rounded-full pointer-events-none ${planet.orbitSizeClass}`}
                style={{
                  animation: `orbit-anim ${planet.duration} linear infinite`,
                  animationDelay: planet.delay,
                }}
              >
                {/* Actual Planet Image (Revolves at the top center of the ring, counter-rotates to stay upright) */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanet(planet);
                  }}
                  aria-label={`Open secret memory: ${planet.caption}`}
                  className={`absolute top-0 left-1/2 rounded-full border-2 border-[var(--accent-primary)] hover:border-white shadow-[0_6px_18px_rgba(0,0,0,0.22)] cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden pointer-events-auto p-0 bg-transparent ${planet.sizeClass}`}
                  style={{
                    animation: `counter-orbit-anim ${planet.duration} linear infinite`,
                    animationDelay: planet.delay,
                  }}
                >
                  <img
                    src={planet.image}
                    alt={planet.caption}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Secret Message Modal */}
      {selectedPlanet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="planet-modal-title"
          className="fixed inset-0 backdrop-blur-md z-[2000] flex items-center justify-center p-4 transition-all duration-300 cursor-pointer"
          style={{ backgroundColor: "var(--modal-overlay, rgba(24, 4, 16, 0.85))" }}
          onClick={() => setSelectedPlanet(null)}
        >
          <div
            className="w-full max-w-md glass border border-[var(--surface-card-border)] shadow-[0_24px_64px_rgba(0,0,0,0.35)] p-6 md:p-8 rounded-3xl relative overflow-hidden animate-scale-up cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Glow Accent */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#ff96b4]/10 rounded-full blur-2xl pointer-events-none" />

            <button
              type="button"
              aria-label="Close memory modal"
              onClick={() => {
                setSelectedPlanet(null);
              }}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xl font-light cursor-pointer w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/15"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[var(--accent-primary)] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.22)] mb-4">
                <img
                  src={selectedPlanet.image}
                  alt={selectedPlanet.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-body text-xs uppercase tracking-[0.2em] text-[var(--accent-primary)] mb-2 font-medium">
                {selectedPlanet.caption}
              </span>

              <h4 id="planet-modal-title" className="font-display text-2xl text-[var(--text-primary)] font-light italic mb-4">
                Galaksi Cinta Kita
              </h4>

              <p className="font-body text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed italic">
                &ldquo;{selectedPlanet.message}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
