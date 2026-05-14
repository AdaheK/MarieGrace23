"use client";

import { useEffect, useState } from "react";

export default function CatchGame({ gift, onSuccess }) {
  const emojis = gift.itemsToCatch || ["🎁", "💖", "✨"];
  const [basket, setBasket] = useState(45);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const target = 23;

  useEffect(() => {
    const spawn = setInterval(() => {
      setItems((current) => [
        ...current.slice(-23),
        { id: Date.now() + Math.random(), x: Math.random() * 88, y: 0, emoji: emojis[Math.floor(Math.random() * emojis.length)] },
      ]);
    }, 650);

    const fall = setInterval(() => {
      setItems((current) => current.map((item) => ({ ...item, y: item.y + 5 })).filter((item) => item.y < 105));
    }, 120);

    return () => {
      clearInterval(spawn);
      clearInterval(fall);
    };
  }, [emojis]);

  useEffect(() => {
    const caught = items.filter((item) => item.y > 78 && Math.abs(item.x - basket) < 23);
    if (caught.length) {
      setScore((s) => {
        const next = s + caught.length;
        if (next >= target) setTimeout(onSuccess, 400);
        return next;
      });
      setItems((current) => current.filter((item) => !caught.some((c) => c.id === item.id)));
    }
  }, [items, basket, onSuccess]);

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden">
      <p className="text-center text-sm text-[#6f2948]/70">Déplace le panier et récolte les objets.</p>
      <div
        className="relative flex-1 min-h-0 rounded-3xl bg-white/60 border border-pink-100 overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setBasket(Math.max(5, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)));
        }}
        onTouchMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.touches[0].clientX;
          setBasket(Math.max(5, Math.min(90, ((x - rect.left) / rect.width) * 100)));
        }}
      >
        {items.map((item) => (
          <div key={item.id} className="absolute text-3xl" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
            {item.emoji}
          </div>
        ))}
        <div className="absolute bottom-3 text-5xl -translate-x-1/2" style={{ left: `${basket}%` }}>🧺</div>
      </div>
      <p className="text-center font-bold text-[#3b1024]">{score}/{target}</p>
    </div>
  );
}
