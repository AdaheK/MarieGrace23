"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TOTAL_CASES = 23;

const SPECIAL_CASES = {
  7: {
    label: "+3",
    text: "Case bonus : avance de 3 cases 🎁",
    move: 3,
    type: "bonus",
  },
  16: {
    label: "-6",
    text: "Oups : recule de 6 cases 😭",
    move: -6,
    type: "malus",
  },
  18: {
    label: "Départ",
    text: "Catastrophe : retour à la case départ 💀",
    reset: true,
    type: "danger",
  },
  21: {
    label: "+1",
    text: "Petit coup de pouce : avance de 1 case ✨",
    move: 1,
    type: "bonus",
  },
};

const PATH = [
  { x: 9, y: 78 },
  { x: 17, y: 78 },
  { x: 25, y: 78 },
  { x: 33, y: 78 },
  { x: 41, y: 78 },
  { x: 49, y: 78 },
  { x: 57, y: 76 },
  { x: 63, y: 68 },
  { x: 57, y: 60 },
  { x: 49, y: 58 },
  { x: 41, y: 58 },
  { x: 33, y: 58 },
  { x: 25, y: 56 },
  { x: 18, y: 48 },
  { x: 24, y: 40 },
  { x: 33, y: 38 },
  { x: 42, y: 38 },
  { x: 51, y: 38 },
  { x: 60, y: 36 },
  { x: 68, y: 28 },
  { x: 77, y: 22 },
  { x: 86, y: 22 },
  { x: 94, y: 18 },
];

export default function CemantixGame({ onSuccess }) {
  const [playerPos, setPlayerPos] = useState(0);
  const [botPos, setBotPos] = useState(0);
  const [turn, setTurn] = useState("player");
  const [dice, setDice] = useState(null);
  const [message, setMessage] = useState("À toi de commencer. Lance le dé.");
  const [rolling, setRolling] = useState(false);
  const [round, setRound] = useState(1);

  const resetGame = () => {
    setPlayerPos(0);
    setBotPos(0);
    setTurn("player");
    setDice(null);
    setRolling(false);
    setRound((current) => current + 1);
    setMessage("La machine a gagné... On recommence jusqu'à ce que tu gagnes 💪");
  };

  const applySpecialCase = (position) => {
    const special = SPECIAL_CASES[position];

    if (!special) return { position, text: "" };

    if (special.reset) {
      return {
        position: 0,
        text: special.text,
      };
    }

    return {
      position: Math.max(0, Math.min(TOTAL_CASES, position + special.move)),
      text: special.text,
    };
  };

  const move = (who, roll) => {
    const currentPosition = who === "player" ? playerPos : botPos;
    const rawNext = currentPosition + roll;

    if (rawNext > TOTAL_CASES) {
      return {
        finalPosition: currentPosition,
        text:
          who === "player"
            ? `Tu fais ${roll}, mais il faut tomber exactement sur 23. Tu restes là.`
            : `La machine fait ${roll}, elle dépasse 23 et reste là.`,
      };
    }

    if (rawNext === TOTAL_CASES) {
      return {
        finalPosition: TOTAL_CASES,
        text:
          who === "player"
            ? "Tu arrives pile sur la case 23 🎉"
            : "La machine arrive sur la case 23 😭",
      };
    }

    const specialResult = applySpecialCase(rawNext);

    return {
      finalPosition: specialResult.position,
      text:
        specialResult.text ||
        (who === "player"
          ? `Tu avances jusqu'à la case ${rawNext}.`
          : `La machine avance jusqu'à la case ${rawNext}.`),
    };
  };

  const rollDice = () => {
    if (rolling || turn !== "player") return;

    setRolling(true);

    const playerRoll = Math.floor(Math.random() * 6) + 1;
    setDice(playerRoll);
    setMessage("Tu lances le dé...");

    setTimeout(() => {
      const playerMove = move("player", playerRoll);
      setPlayerPos(playerMove.finalPosition);
      setMessage(playerMove.text);

      if (playerMove.finalPosition === TOTAL_CASES) {
        setTimeout(onSuccess, 900);
        return;
      }

      setTurn("bot");

      setTimeout(() => {
        const botRoll = Math.floor(Math.random() * 6) + 1;
        setDice(botRoll);
        setMessage("La machine lance le dé...");

        setTimeout(() => {
          const botMove = move("bot", botRoll);
          setBotPos(botMove.finalPosition);
          setMessage(botMove.text);

          if (botMove.finalPosition === TOTAL_CASES) {
            setTimeout(resetGame, 1300);
            return;
          }

          setTurn("player");
          setRolling(false);
        }, 850);
      }, 850);
    }, 850);
  };

  return (
    <div className="h-full flex flex-col gap-2 overflow-hidden px-2">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 shrink-0">
        <PlayerCard label="Toi" emoji="💖" position={playerPos} />
        <div className="flex flex-col items-center gap-2">
          <motion.div
            key={dice}
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="h-12 w-12 rounded-2xl bg-white border border-pink-100 shadow-xl flex items-center justify-center text-2xl font-black text-[#3b1024]"
          >
            {dice || "🎲"}
          </motion.div>

          <button
            onClick={rollDice}
            disabled={rolling || turn !== "player"}
            className="rounded-2xl bg-[#3b1024] text-white px-5 py-2 text-sm font-black disabled:opacity-40"
          >
            {rolling ? "Patiente..." : "Lancer 🎲"}
          </button>
        </div>
        <PlayerCard label="Machine" emoji="🤖" position={botPos} />
      </div>

      <div className="rounded-2xl bg-white/80 border border-pink-100 px-3 py-2 text-center text-sm font-bold text-[#6f2948] shrink-0">
        {message}
      </div>

      <Legend />

      <Board playerPos={playerPos} botPos={botPos} />

      <p className="text-center text-[10px] text-[#9d3b68]/70 shrink-0">
        Partie {round} · La case 23 ouvre le cadeau 👟
      </p>
    </div>
  );
}

function PlayerCard({ label, emoji, position }) {
  return (
    <div className="rounded-2xl bg-white/70 border border-pink-100 px-3 py-2 text-center shadow-sm">
      <div className="text-xl">{emoji}</div>
      <p className="font-black text-[#3b1024] text-sm">{label}</p>
      <p className="text-[10px] text-[#9d3b68]/70">Case {position}</p>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-2 shrink-0 text-[10px] font-bold">
      <span className="rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 px-2 py-1">
        7 : +3
      </span>
      <span className="rounded-full bg-rose-100 border border-rose-300 text-rose-700 px-2 py-1">
        16 : -6
      </span>
      <span className="rounded-full bg-red-100 border border-red-300 text-red-700 px-2 py-1">
        18 : retour départ
      </span>
      <span className="rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 px-2 py-1">
        21 : +1
      </span>
    </div>
  );
}

function Board({ playerPos, botPos }) {
  return (
    <div className="relative flex-1 rounded-[2rem] border border-pink-100 bg-white/60 overflow-hidden min-h-0">
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={PATH.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#f9a8d4"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />
        <polyline
          points={PATH.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#db2777"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      {PATH.map((point, index) => {
        const cell = index + 1;
        const special = SPECIAL_CASES[cell];
        const hasPlayer = playerPos === cell;
        const hasBot = botPos === cell;
        const isFinish = cell === TOTAL_CASES;

        return (
          <div
            key={cell}
            className={`absolute -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full border-2 flex items-center justify-center text-xs font-black shadow-sm ${
              isFinish
                ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                : special?.type === "bonus"
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : special?.type === "malus"
                ? "bg-rose-50 border-rose-300 text-rose-700"
                : special?.type === "danger"
                ? "bg-red-50 border-red-300 text-red-700"
                : "bg-white border-pink-200 text-[#3b1024]"
            }`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
          >
            {special?.label || cell}

            <div className="absolute -bottom-3 flex gap-0.5 text-xs">
              {hasPlayer && <span>💖</span>}
              {hasBot && <span>🤖</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}