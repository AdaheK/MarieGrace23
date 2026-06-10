"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const POINTS = [
  { x: 50, y: 18 }, // 1

  { x: 57, y: 15 }, // 2
  { x: 66, y: 16 }, // 3
  { x: 74, y: 22 }, // 4
  { x: 80, y: 32 }, // 5
  { x: 82, y: 44 }, // 6
  { x: 77, y: 56 }, // 7
  { x: 68, y: 66 }, // 8
  { x: 58, y: 74 }, // 9
  { x: 52, y: 82 }, // 10

  { x: 50, y: 88 }, // 11 pointe basse

  { x: 48, y: 82 }, // 12
  { x: 42, y: 74 }, // 13
  { x: 32, y: 66 }, // 14
  { x: 23, y: 56 }, // 15
  { x: 18, y: 44 }, // 16
  { x: 20, y: 32 }, // 17
  { x: 26, y: 22 }, // 18
  { x: 34, y: 16 }, // 19
  { x: 43, y: 15 }, // 20

  { x: 47, y: 14 }, // 21
  { x: 50, y: 13 }, // 22
  { x: 53, y: 14 }, // 23
];

export default function ConnectDotsGame({ onSuccess }) {
  const [current, setCurrent] = useState(1);
  const [lines, setLines] = useState([]);

  const handlePointClick = (index) => {
    const pointNumber = index + 1;

    if (pointNumber !== current) return;

    if (current > 1) {
      const prev = POINTS[current - 2];
      const next = POINTS[current - 1];

      setLines((prevLines) => [
        ...prevLines,
        {
          x1: prev.x,
          y1: prev.y,
          x2: next.x,
          y2: next.y,
        },
      ]);
    }

    if (current === POINTS.length) {
      setTimeout(() => {
        onSuccess();
      }, 700);
    }

    setCurrent((p) => p + 1);
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden">
      <p className="text-center text-[#9d627d] text-sm md:text-base shrink-0">
        clique sur les points dans l'ordre.
      </p>

      <div className="relative flex-1 rounded-[2rem] border border-pink-100 bg-white/40 overflow-hidden">
        {/* lignes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map((line, index) => (
            <motion.line
              key={index}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25 }}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="#db2777"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* points */}
        {POINTS.map((point, index) => {
          const pointNumber = index + 1;

          const isDone = pointNumber < current;
          const isCurrent = pointNumber === current;

          return (
            <motion.button
              key={pointNumber}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePointClick(index)}
              className={`absolute rounded-full flex items-center justify-center font-black transition-all duration-300 ${
                isDone
                  ? "bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-300"
                  : isCurrent
                  ? "bg-white border-pink-400 text-[#3b1024] ring-4 ring-pink-200 shadow-xl"
                  : "bg-white border-pink-200 text-[#3b1024]"
              }`}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
                width: "38px",
                height: "38px",
                borderWidth: "3px",
                fontSize: "13px",
              }}
            >
              {pointNumber}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}