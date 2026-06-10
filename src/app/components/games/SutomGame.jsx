"use client";

import { useState } from "react";

export default function SutomGame({ gift, onSuccess }) {
  const answer = (gift.answer || "PARFUM").toUpperCase();
  const maxRows = gift.maxTries || 6;

  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState([]);

  // ─────────────────────────────────────────────
  // Gestion correcte des lettres doublées
  // ─────────────────────────────────────────────
  const evaluateGuess = (guess) => {
    const result = Array(answer.length).fill("absent");
    const remainingLetters = {};

    // 1. Lettres bien placées
    for (let i = 0; i < answer.length; i++) {
      if (guess[i] === answer[i]) {
        result[i] = "correct";
      } else {
        remainingLetters[answer[i]] =
          (remainingLetters[answer[i]] || 0) + 1;
      }
    }

    // 2. Lettres présentes mais mal placées
    for (let i = 0; i < answer.length; i++) {
      if (result[i] === "correct") continue;

      const letter = guess[i];

      if (remainingLetters[letter] > 0) {
        result[i] = "present";
        remainingLetters[letter] -= 1;
      }
    }

    return result;
  };

  // ─────────────────────────────────────────────
  // Score caché interne
  // ─────────────────────────────────────────────
  const scoreGuess = (result) => {
    return result.reduce((score, status) => {
      if (status === "correct") return score + 3;
      if (status === "present") return score + 1;
      return score;
    }, 0);
  };

  // ─────────────────────────────────────────────
  // Validation
  // ─────────────────────────────────────────────
  const submit = () => {
    const guess = input.trim().toUpperCase();

    if (guess.length !== answer.length) return;

    const alreadyTried = guesses.some((item) => item.word === guess);

    if (alreadyTried) {
      setInput("");
      return;
    }

    const result = evaluateGuess(guess);
    const score = scoreGuess(result);

    let nextGuesses = [
      ...guesses,
      {
        word: guess,
        result,
        score,
      },
    ];

    // Mot trouvé
    if (guess === answer) {
      setGuesses(nextGuesses);
      setTimeout(onSuccess, 700);
      return;
    }

    // Garde les meilleures tentatives
    if (nextGuesses.length > maxRows) {
      nextGuesses = nextGuesses
        .sort((a, b) => b.score - a.score)
        .slice(0, maxRows);
    }

    setGuesses(nextGuesses);
    setInput("");
  };

  // ─────────────────────────────────────────────
  // Préparation affichage
  // ─────────────────────────────────────────────
  const rows = Array.from({ length: maxRows }, (_, index) => {
    return guesses[index] || null;
  });

  const getColor = (status) => {
    if (status === "correct") {
      return "bg-emerald-100 border-emerald-400 text-emerald-700";
    }

    if (status === "present") {
      return "bg-yellow-100 border-yellow-400 text-yellow-700";
    }

    if (status === "absent") {
      return "bg-red-100 border-red-300 text-red-600";
    }

    return "bg-white/70 border-pink-100 text-[#3b1024]";
  };

  return (
    <div className="h-full flex flex-col justify-center gap-2 overflow-hidden px-2">
      {/* ─────────────── Infos ─────────────── */}
      <div className="text-center space-y-1 shrink-0">
        <p className="text-[14px] md:text-xs text-[#6f2948]/70">
          Trouve un mot de {answer.length} lettres en rapport avec ton cadeau.
        </p>

        <p className="text-[11px] md:text-[11px] text-[#9d3b68]/70">
          🟩 Bonne lettre bien placée · 🟨 Bonne lettre mal placée · 🟥 Lettre absente
        </p>

      </div>

      {/* ─────────────── Grille ─────────────── */}
      <div className="mx-auto grid gap-1 shrink-0">
        {rows.map((row, rowIndex) => {
          const word =
            row?.word ||
            (rowIndex === guesses.length ? input.toUpperCase() : "");

          return (
            <div key={rowIndex} className="flex gap-1 justify-center">
              {Array.from({ length: answer.length }).map((_, colIndex) => {
                const letter = word[colIndex] || "";
                const status = row?.result?.[colIndex];

                return (
                  <div
                    key={colIndex}
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-lg border flex items-center justify-center text-sm md:text-base font-black transition ${getColor(
                      status
                    )}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ─────────────── Input ─────────────── */}
      <div className="flex gap-2 shrink-0">
        <input
          value={input}
          onChange={(e) => {
            const value = e.target.value
              .toUpperCase()
              .replace(/[^A-ZÀ-Ÿ]/g, "")
              .slice(0, answer.length);

            setInput(value);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="TON MOT..."
          className="flex-1 rounded-2xl bg-white border border-pink-100 px-4 py-2.5 outline-none uppercase font-black text-[#3b1024]"
        />

        <button
          onClick={submit}
          disabled={input.length !== answer.length}
          className="rounded-2xl px-5 bg-[#3b1024] text-white font-bold disabled:opacity-40"
        >
          OK
        </button>
      </div>
    </div>
  );
}