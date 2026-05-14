"use client";

import { useMemo, useState } from "react";

export default function CandlesGame({ gift, onSuccess }) {
  const count = gift.candles || 23;
  const candles = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);
  const [off, setOff] = useState([]);

  const click = (i) => {
    if (off.includes(i)) return;
    const next = [...off, i];
    setOff(next);
    if (next.length === count) setTimeout(onSuccess, 500);
  };

  return (
    <div className="h-full flex flex-col justify-center gap-3 overflow-hidden">
      <p className="text-center text-sm text-[#6f2948]/70">Éteins les 23 bougies en cliquant dessus.</p>

      <div className="grid grid-cols-6 md:grid-cols-8 gap-2 max-w-2xl mx-auto">
        {candles.map((i) => {
          const isOff = off.includes(i);
          return (
            <button
              key={i}
              onClick={() => click(i)}
              className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl border flex items-center justify-center text-2xl transition ${isOff ? "bg-slate-100 border-slate-200 opacity-50" : "bg-white/80 border-pink-100 hover:scale-105"}`}
            >
              {isOff ? "💨" : "🕯️"}
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-[#9d3b68]/70">{off.length}/{count} bougies éteintes</p>
    </div>
  );
}
