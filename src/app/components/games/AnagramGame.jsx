"use client";

import { useMemo, useState } from "react";

export default function AnagramGame({ gift, word, hint, onSuccess }) {
  const answer = (gift?.answer || word || "").toUpperCase();
  const clue = gift?.hint || hint || "";
  const scrambled = gift?.scrambledWord || answer;

  const letters = useMemo(() => {
    return scrambled.toUpperCase().split("");
  }, [scrambled]);

  const [selected, setSelected] = useState([]);
  const [wrong, setWrong] = useState(false);

  const addLetter = (letter, originalIndex) => {
    if (selected.length >= answer.length) return;

    setSelected((current) => [
      ...current,
      { letter, originalIndex },
    ]);
  };

  const removeLetter = (indexToRemove) => {
    setSelected((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  };

  const submit = () => {
    const response = selected.map((item) => item.letter).join("");

    if (response === answer) {
      onSuccess?.();
      return;
    }

    setWrong(true);
    setTimeout(() => setWrong(false), 700);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5 px-4 text-center overflow-hidden">
      <p className="text-sm md:text-base text-[#6f2948]/70 shrink-0">
        Remets les lettres dans le bon ordre.
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-[760px] shrink-0">
        {letters.map((letter, index) => {
          const isUsed = selected.some(
            (item) => item.originalIndex === index
          );

          return (
            <button
              key={`${letter}-${index}`}
              disabled={isUsed}
              onClick={() => addLetter(letter, index)}
              className={`h-14 w-14 md:h-16 md:w-16 rounded-2xl text-2xl md:text-3xl font-black border shadow-lg transition-all duration-200 ${
                isUsed
                  ? "opacity-20 scale-90"
                  : "bg-white border-pink-100 text-pink-600 hover:scale-105"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <p className="text-[#c06b91] text-sm shrink-0">
        Indice : {clue}
      </p>

      <div
        className={`min-h-[84px] w-full max-w-[650px] rounded-3xl border-2 flex flex-wrap items-center justify-center gap-2 px-4 py-3 transition shrink-0 ${
          wrong
            ? "border-red-400 bg-red-50"
            : "border-pink-100 bg-white/70"
        }`}
      >
        {selected.length === 0 ? (
          <p className="text-[#9ca3af] font-bold text-2xl">
            TA RÉPONSE...
          </p>
        ) : (
          selected.map((item, index) => (
            <button
              key={`${item.letter}-${index}`}
              onClick={() => removeLetter(index)}
              className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-pink-100 border border-pink-300 text-pink-700 text-xl md:text-2xl font-black hover:scale-105 transition"
            >
              {item.letter}
            </button>
          ))
        )}
      </div>

      <button
        onClick={submit}
        disabled={selected.length !== answer.length}
        className="rounded-2xl px-12 md:px-16 py-3 text-xl font-black text-white bg-[#3b1024] disabled:opacity-40 shrink-0"
      >
        Valider
      </button>
    </div>
  );
}