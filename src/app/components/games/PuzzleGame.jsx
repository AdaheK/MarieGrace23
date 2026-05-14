"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PuzzleGame({ events, onSuccess }) {
  const [items, setItems] = useState(() => [...events].sort(() => Math.random() - 0.5));
  const [dragIndex, setDragIndex] = useState(null);
  const [error, setError] = useState(false);

  const move = (from, to) => {
    const next = [...items];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed);
    setItems(next);
  };

  const check = () => {
    const correct = items.every((item, index) => item.order === index + 1);
    if (correct) return onSuccess();
    setError(true);
    setTimeout(() => setError(false), 1200);
  };

  return (
    <div className="h-full flex flex-col justify-center space-y-3">
      <p className="text-sm text-[#6f2948]/70 text-center">Glisse les événements dans l'ordre chronologique.</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div key={item.text} layout draggable onDragStart={() => setDragIndex(index)} onDragOver={(event) => {
            event.preventDefault();
            if (dragIndex !== null && dragIndex !== index) {
              move(dragIndex, index);
              setDragIndex(index);
            }
          }} onDragEnd={() => setDragIndex(null)} className="flex items-center gap-3 rounded-2xl bg-white/70 border border-pink-100 px-4 py-2.5 cursor-grab active:cursor-grabbing hover:bg-pink-50 transition">
            <span className="text-[#9d3b68]/60 font-mono text-sm w-5">{index + 1}.</span>
            <span className="text-[#3b1024] text-sm flex-1">{item.text}</span>
            <span className="text-[#9d3b68]/40 text-xs">⠿⠿</span>
          </motion.div>
        ))}
      </div>
      {error && <p className="text-red-600 text-sm text-center font-bold">Pas encore dans le bon ordre.</p>}
      <button onClick={check} className="w-full rounded-2xl py-3 font-bold text-white bg-[#3b1024]">Valider l'ordre</button>
    </div>
  );
}
