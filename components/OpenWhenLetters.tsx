"use client";

import React, { useState } from "react";

interface CapsuleLetter {
  id: string;
  code: string;
  prompt: string;
  subtitle: string;
  message: string;
  closing: string;
}

const CAPSULE_LETTERS: CapsuleLetter[] = [
  {
    id: "kangen",
    code: "01",
    prompt: "Buka saat lagi kangen",
    subtitle: "Untuk malam atau siang yang terasa sepi",
    message:
      "Kalau kamu lagi buka ini karena kangen, inget ya aku juga pasti lagi mikirin kamu di sini. Pejamin mata sebentar, tarik napas, terus inget semua tawa kecil kita yang paling konyol. Jarak atau sibuknya hari cuma sementara — aku selalu pulang ke kamu.",
    closing: "Selalu ada buat kamu, Jaja",
  },
  {
    id: "berat",
    code: "02",
    prompt: "Buka saat hari terasa berat",
    subtitle: "Ketika dunia terasa terlalu bising",
    message:
      "Kamu boleh capek, kamu boleh istirahat, dan kamu nggak harus selalu terlihat kuat sendirian. Ceritain semuanya ke aku — yang penting kamu nggak nanggung semuanya sendirian. Aku bangga banget sama kamu yang sudah bertahan sejauh ini.",
    closing: "Peluk hangat dari jauh",
  },
  {
    id: "berantem",
    code: "03",
    prompt: "Buka saat kita lagi berantem",
    subtitle: "Saat ego sama-sama lagi tinggi",
    message:
      "Maaf kalau aku bikin kamu kesel atau kurang peka. Tapi ingat satu hal: aku selalu lebih milih kita daripada menang argumen. Kalau sudah agak tenang, kabari aku ya — aku nggak pernah mau tidur dalam keadaan jauh dari kamu.",
    closing: "Kita tim yang sama",
  },
  {
    id: "senyum",
    code: "04",
    prompt: "Buka saat lagi butuh alasan senyum",
    subtitle: "Pengingat kecil untuk Dutdut",
    message:
      "Fun fact: senyum kamu masih jadi hal paling favorit aku dari hari pertama sampai sekarang. Jangan lupa makan yang bener (jangan seblak pedes terus), minum air putih, dan inget kalau kamu itu berharga banget.",
    closing: "Jangan lupa senyum hari ini",
  },
];

export default function OpenWhenLetters() {
  const [openedIds, setOpenedIds] = useState<Record<string, boolean>>({});

  const toggleLetter = (id: string) => {
    setOpenedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {CAPSULE_LETTERS.map((letter, idx) => {
        const isOpen = !!openedIds[letter.id];
        return (
          <article
            key={letter.id}
            data-scroll-reveal
            className="scroll-reveal mono-surface overflow-hidden flex flex-col"
            style={{ transitionDelay: `${idx * 65}ms` }}
          >
            <button
              type="button"
              onClick={() => toggleLetter(letter.id)}
              aria-expanded={isOpen}
              aria-controls={`capsule-body-${letter.id}`}
              className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[var(--accent-ink)]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {letter.code}
                  </span>
                  <span className="h-px w-4 bg-[var(--border-hairline)]" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {isOpen ? "TERBUKA" : "TERSEGEL"}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-[var(--text-primary)] leading-snug group-hover:opacity-80 transition-opacity">
                  {letter.prompt}
                </h3>

                <p className="font-body text-xs text-[var(--text-muted)] mt-1.5">
                  {letter.subtitle}
                </p>
              </div>

              {/* Tactile Monochrome Seal Icon */}
              <span
                aria-hidden="true"
                className={`w-10 h-10 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "bg-[var(--accent-ink)] text-[var(--accent-contrast)] border-[var(--accent-ink)] rotate-180"
                    : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-hairline)] group-hover:border-[var(--border-strong)]"
                }`}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            {/* Expandable Letter Content */}
            <div
              id={`capsule-body-${letter.id}`}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-[var(--border-hairline)]">
                  <p className="font-body text-sm text-[var(--text-muted)] leading-[1.8] pt-3">
                    {letter.message}
                  </p>
                  <p className="font-display italic text-base text-[var(--text-primary)] mt-4">
                    — {letter.closing}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
