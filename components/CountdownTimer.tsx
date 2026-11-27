"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isSpecialDay: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isSpecialDay: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 5, 9, 0, 0, 0);

      if (now.getMonth() === 5 && now.getDate() === 9) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isSpecialDay: true };
      }

      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, 5, 9, 0, 0, 0);
      }

      const difference = targetDate.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds, isSpecialDay: false };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="my-8 flex flex-col items-center justify-center w-full max-w-xl mx-auto">
      <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        {timeLeft.isSpecialDay ? "Hari Istimewa Kita — 9 Juni" : "Menuju 9 Juni Berikutnya"}
      </p>

      {timeLeft.isSpecialDay ? (
        <div className="mono-surface px-8 py-6 text-center w-full">
          <h3 className="font-display italic text-2xl md:text-3xl text-[var(--text-primary)] leading-relaxed">
            Hari Ini Milik Kita, Dutdut
          </h3>
          <p className="font-body text-[var(--text-muted)] text-sm mt-2">
            Terima kasih sudah terus melangkah bersama sampai hari ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full">
          {[
            { value: timeLeft.days, label: "Hari" },
            { value: timeLeft.hours, label: "Jam" },
            { value: timeLeft.minutes, label: "Menit" },
            { value: timeLeft.seconds, label: "Detik" },
          ].map((item, index) => (
            <div
              key={index}
              className="mono-surface flex flex-col items-center justify-center py-4 md:py-5"
            >
              <span className="font-mono text-2xl md:text-4xl font-medium text-[var(--text-primary)] tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] mt-1.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
