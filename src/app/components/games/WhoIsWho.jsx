"use client";

import { useState } from "react";

export default function WhoIsWho({ questions, onSuccess }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const answeredCount = Object.keys(answers).length;
  const canSubmit = answeredCount === questions.length;

  const submit = () => {
    if (!canSubmit) return;

    const result = questions.filter(
      (question, index) => answers[index] === question.answer
    ).length;

    setScore(result);
    setChecked(true);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden px-1">
      <p className="text-xs md:text-sm text-[#6f2948]/70 text-center mb-2 shrink-0">
        Réponds à chaque question selon toi.
      </p>

      <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
        {questions.map((question, index) => (
          <div
            key={`${question.text}-${index}`}
            className="rounded-2xl bg-white/70 border border-pink-100 px-3 py-2 flex flex-col gap-1.5"
          >
            <p className="text-xs md:text-sm text-[#3b1024] leading-tight">
              {question.text}
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              {["Moi", "Toi", "Nous deux"].map((option) => (
                <button
                  key={`${option}-${index}`}
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [index]: option,
                    }))
                  }
                  className={`rounded-xl py-1.5 text-[11px] md:text-xs font-bold border transition ${
                    answers[index] === option
                      ? "border-pink-400 bg-pink-100 text-pink-800"
                      : "border-pink-100 bg-white/70 text-[#6f2948]/60 hover:bg-pink-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 pt-2">
        {!checked ? (
          <button
            onClick={submit}
            disabled={!canSubmit}
            className="w-full rounded-2xl py-2.5 font-bold text-white bg-[#3b1024] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {canSubmit
              ? "Valider mes réponses"
              : `Réponds aux questions (${answeredCount}/${questions.length})`}
          </button>
        ) : (
          <div className="rounded-2xl bg-pink-100 border border-pink-200 py-2 px-3 text-center">
            <p className="text-pink-800 font-bold text-sm leading-none">
              {score}/{questions.length} bonnes réponses
            </p>

            <p className="text-[#6f2948]/70 text-[11px] mt-1 leading-none">
              {score >= Math.min(4, questions.length)
                ? "On se connaît par cœur 🥰"
                : "On a encore des choses à découvrir 😊"}
            </p>

            <button
              onClick={onSuccess}
              className="mt-2 w-full rounded-xl py-2 bg-[#3b1024] text-white font-bold text-sm"
            >
              Continuer →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}