"use client";

import { useMemo, useState } from "react";

export default function PhotoTetrisGame({ gift, onSuccess }) {
  const size = 3;
  const photo = gift.photo || "/images/games/photo-tetris-12.jpeg";
  const initial = useMemo(() => Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5), []);
  const [pieces, setPieces] = useState(initial);
  const [selected, setSelected] = useState(null);

  const swap = (index) => {
    if (selected === null) return setSelected(index);
    const next = [...pieces];
    [next[selected], next[index]] = [next[index], next[selected]];
    setPieces(next);
    setSelected(null);
  };

  const check = () => {
    if (pieces.every((piece, index) => piece === index)) onSuccess();
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-3 overflow-hidden">
      <p className="text-sm text-[#6f2948]/70 text-center">Recompose la photo en échangeant les pièces.</p>

      <div className="grid grid-cols-3 gap-1 h-[min(58dvh,430px)] w-[min(58dvh,430px)]">
        {pieces.map((piece, index) => {
          const x = piece % size;
          const y = Math.floor(piece / size);
          return (
            <button
              key={index}
              onClick={() => swap(index)}
              className={`rounded-xl border-2 overflow-hidden bg-cover transition ${selected === index ? "border-pink-500 scale-95" : "border-white"}`}
              style={{
                backgroundImage: `url(${photo})`,
                backgroundSize: `${size * 100}% ${size * 100}%`,
                backgroundPosition: `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`,
              }}
            />
          );
        })}
      </div>

      <button onClick={check} className="w-full max-w-md rounded-2xl py-3 bg-[#3b1024] text-white font-bold">
        Valider la photo
      </button>
    </div>
  );
}
