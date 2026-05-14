"use client";

import { useEffect, useMemo, useState } from "react";

const COLORS = [
  { name: "rose", cls: "bg-pink-400" },
  { name: "violet", cls: "bg-purple-400" },
  { name: "jaune", cls: "bg-yellow-300" },
  { name: "vert", cls: "bg-emerald-400" },
];

export default function ColorSequenceGame({ gift, onSuccess }) {
  const length = gift.sequenceLength || 6;
  const sequence = useMemo(() => Array.from({ length }, () => Math.floor(Math.random() * COLORS.length)), [length]);
  const [showing, setShowing] = useState(true);
  const [active, setActive] = useState(null);
  const [input, setInput] = useState([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    let index = 0;
    setShowing(true);
    setInput([]);
    const play = () => {
      setActive(sequence[index]);
      setTimeout(() => setActive(null), 420);
      index++;
      if (index < sequence.length) setTimeout(play, 700);
      else setTimeout(() => setShowing(false), 800);
    };
    const t = setTimeout(play, 500);
    return () => clearTimeout(t);
  }, [sequence, round]);

  const press = (colorIndex) => {
    if (showing) return;
    const next = [...input, colorIndex];
    const wrong = next.some((value, i) => value !== sequence[i]);
    if (wrong) {
      setRound((r) => r + 1);
      return;
    }
    setInput(next);
    if (next.length === sequence.length) setTimeout(onSuccess, 400);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5 text-center overflow-hidden">
      <p className="text-sm text-[#6f2948]/70">{showing ? "Mémorise la séquence..." : `Reproduis la séquence (${input.length}/${sequence.length})`}</p>

      <div className="grid grid-cols-2 gap-4">
        {COLORS.map((color, index) => (
          <button
            key={color.name}
            onClick={() => press(index)}
            className={`h-28 w-28 md:h-36 md:w-36 rounded-[2rem] border-4 border-white shadow-xl transition ${color.cls} ${active === index ? "scale-110 brightness-125" : "opacity-80"}`}
          />
        ))}
      </div>
    </div>
  );
}
