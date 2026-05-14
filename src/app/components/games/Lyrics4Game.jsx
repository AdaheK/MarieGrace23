"use client";

import { useState } from "react";

export default function Lyrics4Game({ gift, onSuccess }) {
  const words = gift.missingWords || ["mot1", "mot2", "mot3", "mot4"];
  const [values, setValues] = useState(Array(words.length).fill(""));
  const [error, setError] = useState(false);

  const check = () => {
    const ok = words.every((word, i) => values[i].trim().toLowerCase() === word.toLowerCase());
    if (ok) return onSuccess();
    setError(true);
    setTimeout(() => setError(false), 1300);
  };

  return (
    <div className="h-full flex flex-col justify-center gap-4 overflow-hidden">
      <p className="text-center text-sm text-[#6f2948]/70">Remplace les 4 mots manquants dans les paroles.</p>

      <div className="rounded-3xl bg-white/75 border border-pink-100 p-5 text-[#3b1024] text-center">
        {gift.lyrics || "Les paroles seront placées ici."}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {words.map((_, index) => (
          <input
            key={index}
            value={values[index]}
            onChange={(e) => {
              const next = [...values];
              next[index] = e.target.value;
              setValues(next);
            }}
            placeholder={`Mot ${index + 1}`}
            className="rounded-2xl bg-white border border-pink-100 px-4 py-3 outline-none"
          />
        ))}
      </div>

      {error && <p className="text-red-600 font-bold text-center text-sm">Il y a encore une erreur.</p>}

      <button onClick={check} className="rounded-2xl py-3 bg-[#3b1024] text-white font-bold">Valider les paroles</button>
    </div>
  );
}
