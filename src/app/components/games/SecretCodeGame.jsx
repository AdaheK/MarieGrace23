"use client";

import { useState } from "react";

export default function SecretCodeGame({ gift, onSuccess }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const check = () => {
    if (code.trim() === String(gift.answer)) return onSuccess();
    setError(true);
    setTimeout(() => setError(false), 1300);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4 text-center">
      <div className="text-6xl">🔐</div>
      <p className="text-[#6f2948]/80">{gift.question || "Entre le code secret."}</p>
      {gift.hint && <p className="text-xs text-[#9d3b68]/70">Indice : {gift.hint}</p>}

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="••••"
        maxLength={8}
        className="w-full max-w-sm rounded-2xl bg-white border border-pink-100 px-4 py-3 text-center text-3xl tracking-[0.35em] font-black outline-none"
      />

      {error && <p className="text-red-600 font-bold text-sm">Code incorrect.</p>}

      <button onClick={check} className="w-full max-w-sm rounded-2xl py-3 bg-[#3b1024] text-white font-bold">
        Déverrouiller
      </button>
    </div>
  );
}
