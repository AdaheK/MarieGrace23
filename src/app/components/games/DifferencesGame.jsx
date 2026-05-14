"use client";

import { useState } from "react";

const DEFAULT_SPOTS = [
  {
    id: "batiment",
    label: "Lumière du bâtiment",
    x: 21,
    y: 15,
    w: 25,
    h: 25,
  },
  {
    id: "decoration",
    label: "Guirlandes retirées sur le palmier",
    x: 35,
    y: 20,
    w: 8,
    h: 30,
  },
  {
    id: "arbre",
    label: "Luminosité rose/violette de l'arbre",
    x: 66,
    y: 20,
    w: 25,
    h: 24,
  },
  {
    id: "traineau",
    label: "Traineau rouge",
    x: 82,
    y: 41,
    w: 19,
    h: 18,
  },
  {
    id: "tshirt",
    label: "Couleur du t-shirt",
    x: 50,
    y: 56,
    w: 13,
    h: 15,
  },
  {
    id: "sac",
    label: "Sac retiré",
    x: 35,
    y: 95,
    w: 18,
    h: 17,
  },
  {
    id: "flocon",
    label: "Forme du flocon",
    x: 89,
    y: 74,
    w: 16,
    h: 15,
  },
];

export default function DifferencesGame({ gift, onSuccess }) {
  const spots = gift.differenceSpots || DEFAULT_SPOTS;
  const [found, setFound] = useState([]);

  const left = gift.images?.diffLeft || "/images/games/differences-02-a.jpg";
  const right = gift.images?.diffRight || "/images/games/differences-02-b.jpg";

  const clickSpot = (id) => {
    if (found.includes(id)) return;

    const next = [...found, id];
    setFound(next);

    if (next.length === spots.length) {
      setTimeout(onSuccess, 700);
    }
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden">
      <p className="text-center text-sm text-[#6f2948]/70 shrink-0">
        Clique sur les {spots.length} différences sur l'image de droite (Oui l'image est généré avec ChatGPT).
      </p>

      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {/* Image originale */}
        <div className="relative rounded-3xl overflow-hidden border border-pink-100 bg-white/60">
          <img
            src={left}
            alt="Image originale"
            className="h-full w-full object-cover"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#3b1024]">
            Original
          </div>
        </div>

        {/* Image avec différences */}
        <div className="relative rounded-3xl overflow-hidden border border-pink-100 bg-white/60">
          <img
            src={right}
            alt="Image avec différences"
            className="h-full w-full object-cover"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#3b1024]">
            {found.length}/{spots.length}
          </div>

          {spots.map((spot) => {
            const isFound = found.includes(spot.id);

            return (
              <button
                key={spot.id}
                onClick={() => clickSpot(spot.id)}
                title={spot.label}
                className={`absolute rounded-full border-2 transition-all duration-300 ${
                  isFound
                    ? "border-emerald-500 bg-emerald-300/35 scale-105"
                    : "border-transparent bg-transparent hover:border-pink-400 hover:bg-pink-200/20"
                }`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${spot.w}%`,
                  height: `${spot.h}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {isFound && (
                  <span className="absolute inset-0 flex items-center justify-center text-emerald-700 font-black text-xl">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}