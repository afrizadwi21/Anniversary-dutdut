"use client";

import React from "react";

interface Milestone {
  date: string;
  title: string;
  desc: string;
}

const MILESTONES: Milestone[] = [
  {
    date: "Awal Pertemuan",
    title: "dirumah andres",
    desc: "Aku sangat berterima kasih ke orang-orang yang sudah mempertemukan kita. Walaupun aku malu banget waktu ketemu kamu, aku tidak menyangka kita bisa sejauh ini dan aku sayang banget sama kamu.",
  },
  {
    date: "Komitmen Bersama",
    title: "Satu Frekuensi, Satu Tujuan",
    desc: "Hari di mana kita berani mengakui rasa dan memutuskan untuk berlayar di bahtera yang sama. Komitmen yang berlandaskan ketulusan dan harapan.",
  },
  {
    date: "Proses Pendewasaan",
    title: "Melewati Badai & Tawa Bersama",
    desc: "Bukan hanya tentang hari-hari cerah, tapi juga saat-saat mendung. Kita belajar mengalah, meredam ego, merengkuh kelemahan, dan tumbuh menjadi pribadi yang lebih dewasa bersama.",
  },
  {
    date: "Hari Ini & Selamanya",
    title: "Langkah Berikutnya",
    desc: "Melihat ke belakang dengan senyuman dan menatap masa depan dengan penuh keyakinan. Setiap detik bersama kamu adalah hal terbaik yang aku punya.",
  },
];

export default function TimelineMilestones() {
  return (
    <div className="relative py-8 w-full max-w-4xl mx-auto">
      {/* Central vertical hairline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#243044] -translate-x-1/2 hidden md:block" />

      <div className="flex flex-col gap-10 md:gap-14 relative z-10">
        {MILESTONES.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center w-full relative ${
                isEven ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Node */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-7 w-3 h-3 rounded-full bg-[#090d14] border-2 border-[#e2a856] -translate-x-1/2 z-20 hidden md:block"
              />

              <div className="w-full md:w-[45%]">
                <article className="observatory-surface p-6 md:p-7 text-left">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#e2a856] block mb-2">
                    {item.date}
                  </span>

                  <h3 className="font-display text-xl md:text-2xl text-[#f3efe7] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="font-body text-[#9aa6b8] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
