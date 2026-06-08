"use client";

import React from "react";
import InteractiveCard from "./InteractiveCard";

interface Milestone {
  date: string;
  title: string;
  desc: string;
}

const MILESTONES: Milestone[] = [
  {
    date: "Awal Pertemuan",
    title: "dirumah andres",
    desc: "Aku sangat ber Terimakasih ke orang orang yang sudah mempertemukan kita, walaupun aku malu banget waktu ketemu kamu, tapi aku ga nyangka kita bisa sejauh ini dan aku sayang banget sama kamu",
  },
  {
    date: "Komitmen Bersama",
    title: "Satu Frekuensi, Satu Tujuan",
    desc: "Hari di mana kita berani mengakui rasa dan memutuskan untuk berlayar di bahtera yang sama. Komitmen yang berlandaskan ketulusan dan harapan.",
  },
  {
    date: "Proses Pendewasaan",
    title: "Melewati Badai & Tawa Bersama",
    desc: "Bukan hanya tentang hari hari cerah, tapi juga saat saat mendung. Kita belajar mengalah, meredam ego, merengkuh kelemahan, dan tumbuh menjadi pribadi yang lebih dewasa bersama.",
  },
  {
    date: "Hari Ini & Selamanya",
    title: "Selamat Hari Jadi, Cintaku",
    desc: "Melihat ke belakang dengan senyuman dan menatap masa depan dengan penuh keyakinan. Setiap detik bersama kamu adalah hal terindah yang paling aku punya.",
  },
];

export default function TimelineMilestones() {
  return (
    <div className="relative py-12 w-full max-w-4xl mx-auto px-4 overflow-hidden">
      {/* Central line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff96b4]/10 via-[#ff96b4]/40 to-[#ff96b4]/10 -translate-x-1/2 z-0 hidden md:block" />

      <div className="flex flex-col gap-12 md:gap-16 relative z-10">
        {MILESTONES.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center w-full relative ${isEven ? "md:justify-start" : "md:justify-end"
                }`}
            >
              {/* Central Timeline Dot */}
              <div
                className="absolute left-1/2 top-[22px] w-5 h-5 rounded-full bg-[var(--bg-body,#0e0208)] border-2 border-[#ff96b4] -translate-x-1/2 z-20 hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(255,150,180,0.8)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff96b4] animate-ping" />
              </div>

              {/* Card wrapper */}
              <div
                className={`w-full md:w-[45%] transition-all duration-700 reveal-card delay${index}`}
              >
                <InteractiveCard maxRotateX={6} maxRotateY={6} scale={1.02}>
                  <div className="glass p-6 text-left relative overflow-hidden group hover:border-[#ff96b4]/30 transition-all duration-300">
                    {/* Glowing highlight inside card */}
                    <div className="absolute -right-12 -top-12 w-24 h-24 bg-[#ff96b4]/5 rounded-full blur-xl group-hover:bg-[#ff96b4]/10 transition-colors duration-500" />

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-body text-xs uppercase tracking-[0.15em] text-[#ffc8dc]/75 font-light">
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl text-[#fff8f3] font-light mb-2 group-hover:text-[#ff96b4] transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-[#ffc8dc]/75 text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </InteractiveCard>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
