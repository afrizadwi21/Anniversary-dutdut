"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isAnniversaryDay: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isAnniversaryDay: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Target is June 9th
      let targetDate = new Date(currentYear, 5, 9, 0, 0, 0); // Month is 0-indexed, so 5 is June

      // If today is June 9th, show a celebration message
      if (now.getMonth() === 5 && now.getDate() === 9) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isAnniversaryDay: true };
      }

      // If target date has passed for this year, target next year's June 9th
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, 5, 9, 0, 0, 0);
      }

      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds, isAnniversaryDay: false };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="my-8 px-4 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <p className="text-center font-display text-sm uppercase tracking-[0.2em] text-[#ff96b4] mb-4 drop-shadow-[0_0_8px_rgba(255,150,180,0.3)]">
        {timeLeft.isAnniversaryDay ? "Hari Bahagia Kita Telah Tiba!" : "Menghitung Mundur Hari Bahagia Kita"}
      </p>

      {timeLeft.isAnniversaryDay ? (
        <div className="glass px-8 py-6 text-center animate-pulse border border-[#ff96b4]/30 shadow-[0_0_30px_rgba(255,150,180,0.25)]">
          <h3 className="font-display italic text-3xl md:text-4xl text-[#fff8f3] font-light leading-relaxed">
            Happy Anniversary, My Love! 💖
          </h3>
          <p className="font-body text-[#ffc8dc]/80 text-sm font-light mt-2 tracking-wide">
            Hari ini adalah milik kita. Selamat merayakan cinta kita yang indah sayangggg.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full">
          {[
            { value: timeLeft.days, label: "Hari" },
            { value: timeLeft.hours, label: "Jam" },
            { value: timeLeft.minutes, label: "Menit" },
            { value: timeLeft.seconds, label: "Detik" }
          ].map((item, index) => (
            <div
              key={index}
              className="glass flex flex-col items-center justify-center py-4 md:py-6 relative overflow-hidden group hover:border-[#ff96b4]/40 hover:shadow-[0_0_25px_rgba(255,150,180,0.2)] transition-all duration-500"
            >
              {/* Subtle top reflection */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />

              <span className="font-display text-3xl md:text-5xl font-light text-[#fff8f3] tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#ffc8dc]/70 mt-1 font-light">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
