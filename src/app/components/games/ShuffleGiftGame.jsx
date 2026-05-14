"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const CUP_POSITIONS = [
  { x: -190, y: 0 },
  { x: 0, y: 0 },
  { x: 190, y: 0 },
];

export default function ShuffleGiftGame({ gift, onSuccess }) {
  const [phase, setPhase] = useState("intro");
  const [giftCup, setGiftCup] = useState(() => Math.floor(Math.random() * 3));
  const [positions, setPositions] = useState([0, 1, 2]);
  const [message, setMessage] = useState("Le cadeau est sous un gobelet.");
  const [selected, setSelected] = useState(null);

  const cupOrder = useMemo(() => [0, 1, 2], []);

  const startGame = () => {
    setPhase("show");
    setMessage("Observe bien où se cache le cadeau.");

    setTimeout(() => {
      setPhase("cover");
      setMessage("Les gobelets se baissent...");
    }, 1800);

    setTimeout(() => {
      setPhase("shuffle");
      setMessage("Mélange en cours...");
      runShuffle();
    }, 3000);
  };

  const runShuffle = () => {
    let count = 0;
    let currentPositions = [0, 1, 2];

    const interval = setInterval(() => {
      const a = Math.floor(Math.random() * 3);
      let b = Math.floor(Math.random() * 3);

      while (b === a) {
        b = Math.floor(Math.random() * 3);
      }

      const nextPositions = [...currentPositions];
      [nextPositions[a], nextPositions[b]] = [
        nextPositions[b],
        nextPositions[a],
      ];

      currentPositions = nextPositions;
      setPositions(nextPositions);

      count++;

      if (count >= 9) {
        clearInterval(interval);
        setPhase("guess");
        setMessage("À toi de retrouver le bon gobelet.");
      }
    }, 520);
  };

  const chooseCup = (cupId) => {
    if (phase !== "guess") return;

    setSelected(cupId);

    const isCorrect = cupId === giftCup;

    if (isCorrect) {
      setMessage("Bien joué ! Tu as retrouvé le cadeau 🎁");
      setPhase("success");
      setTimeout(onSuccess, 900);
    } else {
      setMessage("Raté 😭 Le cadeau était ailleurs. On recommence.");
      setPhase("wrong");

      setTimeout(() => {
        setSelected(null);
        setPositions([0, 1, 2]);
        setGiftCup(Math.floor(Math.random() * 3));
        setPhase("intro");
        setMessage("Le cadeau est sous un gobelet.");
      }, 1600);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 overflow-hidden text-center px-4">
      <p className="text-sm md:text-base text-[#6f2948]/70 shrink-0">
        {message}
      </p>

      <div className="relative h-[260px] w-full max-w-[680px] shrink-0">
        {/* cadeau visible au départ */}
        {phase === "show" && (
          <motion.div
            initial={{ scale: 0, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute left-1/2 top-[150px] z-0 -translate-x-1/2 text-5xl"
            style={{
              transform: `translateX(${CUP_POSITIONS[giftCup].x}px)`,
            }}
          >
            🎁
          </motion.div>
        )}

        {cupOrder.map((cupId) => {
          const slot = positions[cupId];
          const pos = CUP_POSITIONS[slot];

          const isGiftCup = cupId === giftCup;
          const isSelected = selected === cupId;
          const reveal =
            phase === "success" ||
            phase === "wrong" ||
            (phase === "show" && isGiftCup);

          return (
            <motion.button
              key={cupId}
              disabled={phase !== "guess"}
              onClick={() => chooseCup(cupId)}
              animate={{
                x: pos.x,
                y:
                  phase === "show" && isGiftCup
                    ? -45
                    : isSelected && phase !== "guess"
                    ? -35
                    : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              className={`
                absolute left-1/2 top-[80px]
                -translate-x-1/2
                w-[130px] h-[150px]
                rounded-b-[3rem] rounded-t-2xl
                border-4
                shadow-2xl
                flex items-center justify-center
                text-5xl
                transition
                ${
                  phase === "guess"
                    ? "cursor-pointer hover:-translate-y-2"
                    : "cursor-default"
                }
                ${
                  isSelected && isGiftCup
                    ? "border-emerald-400 bg-emerald-100"
                    : isSelected
                    ? "border-red-400 bg-red-100"
                    : "border-pink-200 bg-gradient-to-b from-pink-200 to-pink-400"
                }
              `}
            >
              <span className="absolute top-4 h-5 w-20 rounded-full bg-white/50" />
              <span className="absolute bottom-3 text-sm font-black text-[#3b1024]/40">
                {phase === "guess" ? "?" : ""}
              </span>

              {reveal && isGiftCup ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-4xl"
                >
                  🎁
                </motion.span>
              ) : (
                <span className="text-5xl">🥤</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {phase === "intro" && (
        <button
          onClick={startGame}
          className="rounded-2xl px-8 py-3 font-bold text-white bg-[#3b1024] shrink-0"
        >
          Commencer le mélange
        </button>
      )}

      {phase === "shuffle" && (
        <p className="text-xs text-[#9d3b68]/70 shrink-0">
          Suis bien les gobelets 👀
        </p>
      )}
    </div>
  );
}