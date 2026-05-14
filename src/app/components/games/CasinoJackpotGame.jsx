"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = ["🏋🏾", "👟", "🏝️", "💍", "⚽"];

export default function CasinoJackpotGame({ onSuccess }) {
  const [slots, setSlots] = useState(["❔", "❔", "❔"]);
  const [attempt, setAttempt] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(false);

  const generateLosingCombo = () => {
    let a = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    let b = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    let c = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    // empêcher 3 symboles identiques
    while (a === b && b === c) {
      b = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      c = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    }

    return [a, b, c];
  };

  const spin = () => {
    if (spinning || won) return;

    setSpinning(true);

    const nextAttempt = attempt + 1;
    setAttempt(nextAttempt);

    // animation fake pendant le spin
    const fakeSpin = setInterval(() => {
      setSlots([
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      ]);
    }, 90);

    setTimeout(() => {
      clearInterval(fakeSpin);

      // Jackpot uniquement à la 23e tentative
      if (nextAttempt >= 23) {
        const jackpot = "🏋🏾";

        setSlots([jackpot, jackpot, jackpot]);

        setWon(true);
        setSpinning(false);

        setTimeout(() => {
          onSuccess();
        }, 1400);

        return;
      }

      // Combinaisons perdantes avant la 23e
      setSlots(generateLosingCombo());

      setSpinning(false);
    }, 1700);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5 overflow-hidden text-center">

      {/* Slots */}
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {slots.map((emoji, index) => (
          <motion.div
            key={`${emoji}-${index}-${attempt}`}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.22 }}
            className={`h-32 w-32 md:h-40 md:w-40 rounded-[2rem] border shadow-xl flex items-center justify-center text-6xl md:text-7xl bg-white ${
              won
                ? "border-emerald-300 shadow-emerald-200"
                : "border-pink-100 shadow-pink-100"
            }`}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Tentative */}
      <div className="text-[#c05b8d] font-medium text-lg">
        Tentative {Math.min(attempt, 23)}
      </div>

      {/* Bouton */}
      {!won ? (
        <button
          onClick={spin}
          disabled={spinning}
          className="rounded-3xl bg-[#3b1024] text-white px-10 py-5 text-2xl font-black shadow-xl hover:scale-[1.02] transition disabled:opacity-50"
        >
          {spinning ? "Jackpot..." : "Tenter le jackpot 🎰"}
        </button>
      ) : (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <div className="text-5xl">🎉</div>

          <p className="text-2xl font-black text-emerald-600">
            JACKPOT !!!
          </p>

          <button
            onClick={onSuccess}
            className="rounded-3xl bg-emerald-500 text-white px-10 py-4 text-xl font-black shadow-xl"
          >
            Découvrir le cadeau →
          </button>
        </motion.div>
      )}
    </div>
  );
}