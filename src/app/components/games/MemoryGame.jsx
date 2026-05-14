"use client";

import { useMemo, useState } from "react";

export default function MemoryGame({ pairs, onSuccess }) {
  const cards = useMemo(() => {
    const doubled = [...pairs, ...pairs].map((pair, index) => ({
      ...pair,
      uid: index,
    }));

    return doubled.sort(() => Math.random() - 0.5);
  }, [pairs]);

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const flip = (uid) => {
    if (disabled || flipped.includes(uid) || matched.includes(uid)) return;

    if (flipped.length === 0) {
      setFlipped([uid]);
      return;
    }

    const firstUid = flipped[0];

    const first = cards.find((card) => card.uid === firstUid);
    const second = cards.find((card) => card.uid === uid);

    setFlipped([firstUid, uid]);
    setDisabled(true);

    setTimeout(() => {
      if (first.id === second.id) {
        const newMatched = [...matched, firstUid, uid];
        setMatched(newMatched);

        if (newMatched.length === cards.length) {
          setTimeout(onSuccess, 500);
        }
      }

      setFlipped([]);
      setDisabled(false);
    }, 650);
  };

  return (
    <div className="h-full flex flex-col justify-center gap-3 overflow-hidden">
      <p className="text-sm md:text-base text-[#6f2948]/70 text-center shrink-0">
        Retrouve toutes les paires pour débloquer le cadeau 💞
      </p>

      <div className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-[620px] mx-auto px-2">
        {cards.map((card) => {
          const isFlipped =
            flipped.includes(card.uid) || matched.includes(card.uid);

          return (
            <button
              key={card.uid}
              onClick={() => flip(card.uid)}
              className={`
                h-[72px] md:h-[95px]
                rounded-2xl
                overflow-hidden
                border
                transition-all
                duration-300
                flex
                items-center
                justify-center
                ${
                  isFlipped
                    ? "bg-pink-100 border-pink-300 scale-105"
                    : "bg-white/70 border-pink-100 hover:bg-pink-50"
                }
              `}
            >
              {isFlipped ? (
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-300 to-pink-500 text-3xl md:text-4xl">
                  💖
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm text-[#9d3b68]/70 shrink-0">
        {matched.length / 2}/{pairs.length} paires trouvées
      </p>
    </div>
  );
}