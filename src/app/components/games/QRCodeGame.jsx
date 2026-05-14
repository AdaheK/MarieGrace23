"use client";

import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGame({ gift, onSuccess }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const qrUrl = useMemo(() => {
    if (typeof window === "undefined") return "/qr-consigne";
    return `${window.location.origin}/qr-consigne`;
  }, []);

  const password = (gift.password || gift.answer || "").toLowerCase().trim();

  const validate = () => {
    if (value.toLowerCase().trim() === password) {
      onSuccess();
      return;
    }

    setError(true);
    setTimeout(() => setError(false), 900);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 overflow-hidden px-4 text-center">
      <p className="text-xs md:text-sm text-[#6f2948]/70 max-w-xl">
        Scanne le QR Code, suis la consigne, puis entre la phrase secrète.
      </p>

      <div className="rounded-[2rem] bg-white border border-pink-100 p-4 shadow-xl shadow-pink-100/50 shrink-0">
        <QRCodeSVG value={qrUrl} size={210} />
      </div>

      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => e.key === "Enter" && validate()}
        placeholder="Phrase secrète..."
        className={`w-full max-w-xl rounded-2xl bg-white border-2 px-4 py-3 text-center font-bold outline-none ${
          error
            ? "border-red-300 text-red-600"
            : "border-pink-100 text-[#3b1024]"
        }`}
      />

      {error && (
        <p className="text-xs font-bold text-red-500">
          Mauvaise phrase secrète.
        </p>
      )}

      <button
        onClick={validate}
        className="w-full max-w-xl rounded-2xl bg-[#3b1024] text-white py-3 font-black"
      >
        Valider la phrase
      </button>
    </div>
  );
}