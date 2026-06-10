"use client";

import { useMemo, useRef, useState, useEffect } from "react";

function normalize(value) {
  return value
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function TextTrousGame({ gift, onSuccess }) {
  const lyrics = gift?.lyrics || "";
  const answers = gift?.answers || [];
  const hint = gift?.hint || "";

  const audioRef = useRef(null);
  const [values, setValues] = useState(() => new Array(answers.length).fill(""));
  const [statuses, setStatuses] = useState(() =>
    new Array(answers.length).fill("idle")
  );
  const [error, setError] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.35;

    audioRef.current
      .play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const parts = useMemo(() => lyrics.split("_____"), [lyrics]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.volume = 0.35;
      await audioRef.current.play();
      setMusicPlaying(true);
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  const checkStatuses = (nextValues) => {
    return answers.map((answer, index) => {
      const value = nextValues[index] || "";

      if (!value.trim()) return "idle";
      return normalize(value) === normalize(answer) ? "correct" : "wrong";
    });
  };

  const validate = () => {
    const nextStatuses = checkStatuses(values);
    setStatuses(nextStatuses);

    const hasEmptyInput = values.some((value) => value.trim() === "");
    const allCorrect = nextStatuses.every((status) => status === "correct");

    if (hasEmptyInput || !allCorrect) {
      setError(true);
      setTimeout(() => setError(false), 900);
      return;
    }

    onSuccess();
  };

  const inputClass = (status) => {
    if (status === "correct") {
      return "border-emerald-400 bg-emerald-50 text-emerald-700";
    }

    if (status === "wrong" || error) {
      return "border-red-300 bg-red-50 text-red-600";
    }

    return "border-pink-200 bg-white text-[#3b1024]";
  };

  return (
    <div className="h-full flex flex-col justify-center gap-3 overflow-hidden px-2">
      {gift?.backgroundAudio && (
        <audio ref={audioRef} loop preload="metadata">
          <source src={gift.backgroundAudio} type="audio/mpeg" />
        </audio>
      )}

      <div className="text-center space-y-2 shrink-0">
        <p className="text-sm md:text-base text-[#6f2948]/70">
          Complète les paroles 🎶
        </p>

        {hint && (
          <p className="text-xs md:text-sm text-[#b04b7c]">
            Indice : {hint}
          </p>
        )}

        {gift?.backgroundAudio && (
          <button
            type="button"
            onClick={toggleMusic}
            className="rounded-full border border-pink-200 bg-white/80 px-4 py-1.5 text-xs font-bold text-[#3b1024] hover:bg-pink-50"
          >
            {musicPlaying ? "⏸️ Couper la musique" : "▶️ Lancer la musique"}
          </button>
        )}
      </div>

      <div
        className={`rounded-[2rem] border bg-white/75 px-5 py-4 shadow-xl shadow-pink-100/40 shrink-0 ${
          error ? "border-red-300" : "border-pink-100"
        }`}
      >
        <div className="text-[#3b1024] text-sm md:text-base font-bold leading-[2.4] text-center">
          {parts.map((part, index) => (
            <span key={index}>
              {part}

              {index < answers.length && (
                <input
                  value={values[index] || ""}
                  onChange={(e) => {
                    const next = [...values];
                    next[index] = e.target.value;

                    setValues(next);
                    setStatuses(checkStatuses(next));
                    setError(false);
                  }}
                  className={`inline-block w-[120px] md:w-[150px] mx-2 px-3 py-1.5 rounded-2xl border-2 text-center font-black outline-none transition ${inputClass(
                    statuses[index]
                  )}`}
                  placeholder="..."
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-center text-xs font-bold text-red-500 shrink-0">
          Les cases rouges sont à corriger. Les vertes sont bonnes.
        </p>
      )}

      <button
        onClick={validate}
        className="rounded-3xl bg-[#3b1024] text-white py-3 text-lg md:text-xl font-black shadow-xl hover:scale-[1.01] transition shrink-0"
      >
        Valider les paroles 🎤
      </button>
    </div>
  );
}