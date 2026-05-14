"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Confetti({ active }) {
  const colors = ["#f472b6", "#c084fc", "#fb7185", "#e879f9", "#f9a8d4", "#fbbf24", "#ffffff"];

  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.6,
        duration: 1.2 + Math.random() * 1.2,
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    []
  );

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: p.rotate + 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            width: p.size,
            height: p.size,
            borderRadius: 2,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
