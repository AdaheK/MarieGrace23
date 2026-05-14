"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "#f472b6",
  "#60a5fa",
  "#ef4444",
  "#22c55e",
  "#8b5cf6",
  "#fde047",
  "#14b8a6",
  "#fb923c",
];

export default function RouletteGame({ items, fixedResult = 0, onSuccess }) {
  const [spinning, setSpinning] = useState(false);
  const [done, setDone] = useState(false);
  const [rotation, setRotation] = useState(0);

  const safeItems = items || [];

  if (!safeItems.length) {
    return (
      <div className="h-full flex items-center justify-center text-center">
        <p className="text-[#6f2948]/70">
          Aucune proposition n'a été configurée pour cette roulette.
        </p>
      </div>
    );
  }

  const segmentAngle = 360 / safeItems.length;

  const SIZE = 260;
  const R = SIZE / 2;
  const RIM = 17;
  const r = R - RIM;
  const rInner = 38;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const segPath = (i) => {
    const a1 = i * segmentAngle - 90;
    const a2 = a1 + segmentAngle;

    const x1 = R + r * Math.cos(toRad(a1));
    const y1 = R + r * Math.sin(toRad(a1));
    const x2 = R + r * Math.cos(toRad(a2));
    const y2 = R + r * Math.sin(toRad(a2));

    const xi1 = R + rInner * Math.cos(toRad(a1));
    const yi1 = R + rInner * Math.sin(toRad(a1));
    const xi2 = R + rInner * Math.cos(toRad(a2));
    const yi2 = R + rInner * Math.sin(toRad(a2));

    return `M${xi1} ${yi1} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} L${xi2} ${yi2} A${rInner} ${rInner} 0 0 0 ${xi1} ${yi1}Z`;
  };

  const segCenter = (i) => {
    const midDeg = i * segmentAngle + segmentAngle / 2 - 90;
    const dist = rInner + (r - rInner) * 0.58;

    return {
      x: R + dist * Math.cos(toRad(midDeg)),
      y: R + dist * Math.sin(toRad(midDeg)),
      rotate: midDeg + 90,
    };
  };

  const parseItem = (item) => {
    const emojiRegex =
      /([\u{1F000}-\u{1FFFF}][\uFE0F\u20D0-\u20FF]?|[\u2600-\u27BF][\uFE0F]?)/u;

    const match = item.match(emojiRegex);
    const emoji = match ? match[0] : "";
    const text = item.replace(emoji, "").trim();

    if (text.length > 13) {
      const splitIndex = text.lastIndexOf(" ", Math.ceil(text.length / 2) + 2);

      if (splitIndex > 0) {
        return {
          lines: [text.slice(0, splitIndex), text.slice(splitIndex + 1)],
          emoji,
        };
      }
    }

    return { lines: [text], emoji };
  };

  const bolts = Array.from({ length: 24 }, (_, i) => {
    const angle = toRad((i * 360) / 24 - 90);
    const br = R - RIM / 2;

    return {
      x: R + br * Math.cos(angle),
      y: R + br * Math.sin(angle),
    };
  });

  const spin = () => {
  if (spinning || done) return;

  setSpinning(true);

  const targetIndex = Number(fixedResult);
  const targetCenterAngle = targetIndex * segmentAngle + segmentAngle / 2;
  const extraTurns = 7 * 360;

  setRotation(extraTurns - targetCenterAngle);

  setTimeout(() => {
    setSpinning(false);
    setDone(true);
  }, 4300);
};

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 overflow-hidden text-center">
      <p className="text-xs md:text-sm text-[#6f2948]/70 shrink-0">
        Tente ta chance — la roue ne ment jamais.
      </p>

      <div
        className="relative shrink-0"
        style={{
          width: SIZE,
          height: SIZE + 18,
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 z-30"
          style={{ top: -8 }}
        >
          <svg width="26" height="30" viewBox="0 0 26 30">
            <polygon points="13,30 0,0 26,0" fill="#ef4444" />
            <polygon points="13,24 4,4 22,4" fill="#dc2626" />
          </svg>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-b-2xl bg-[#2b1b23]"
          style={{
            bottom: 0,
            width: 54,
            height: 19,
          }}
        />

        <motion.div
          animate={{ rotate: rotation }}
          transition={{
            duration: 4.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SIZE,
            height: SIZE,
          }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ display: "block" }}
          >
            <circle cx={R} cy={R} r={R} fill="#2b1b23" />

            {bolts.map((bolt, index) => (
              <circle
                key={index}
                cx={bolt.x}
                cy={bolt.y}
                r={2.4}
                fill="white"
                opacity={0.55}
              />
            ))}

            {safeItems.map((rawItem, index) => {
              const { lines, emoji } = parseItem(rawItem);
              const center = segCenter(index);

              const lineHeight = 11;
              const totalTextHeight = lines.length * lineHeight;
              const startY =
                center.y - (totalTextHeight + 14) / 2 + lineHeight / 2;

              return (
                <g key={`${rawItem}-${index}`}>
                  <path
                    d={segPath(index)}
                    fill={COLORS[index % COLORS.length]}
                  />

                  <line
                    x1={
                      R +
                      rInner *
                        Math.cos(toRad(index * segmentAngle - 90))
                    }
                    y1={
                      R +
                      rInner *
                        Math.sin(toRad(index * segmentAngle - 90))
                    }
                    x2={
                      R + r * Math.cos(toRad(index * segmentAngle - 90))
                    }
                    y2={
                      R + r * Math.sin(toRad(index * segmentAngle - 90))
                    }
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth={1.4}
                  />

                  <g
                    transform={`rotate(${center.rotate},${center.x},${center.y})`}
                  >
                    {lines.map((line, lineIndex) => (
                      <text
                        key={lineIndex}
                        x={center.x}
                        y={startY + lineIndex * lineHeight}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="8.8"
                        fontWeight="900"
                        fontFamily="system-ui, -apple-system, sans-serif"
                        fill="white"
                        style={{
                          filter:
                            "drop-shadow(0 1px 2px rgba(0,0,0,0.55))",
                        }}
                      >
                        {line}
                      </text>
                    ))}

                    {emoji && (
                      <text
                        x={center.x}
                        y={startY + totalTextHeight + 5}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="12"
                      >
                        {emoji}
                      </text>
                    )}
                  </g>
                </g>
              );
            })}

            <circle cx={R} cy={R} r={rInner} fill="white" />
            <circle
              cx={R}
              cy={R}
              r={rInner}
              fill="none"
              stroke="#2b1b23"
              strokeWidth={7}
            />
            <circle cx={R} cy={R} r={9} fill="#2b1b23" />
            <circle cx={R} cy={R} r={4.5} fill="white" opacity={0.5} />
          </svg>
        </motion.div>
      </div>

      {!done ? (
        <button
          onClick={spin}
          disabled={spinning}
          className="mt-4 rounded-2xl px-7 py-2.5 font-bold text-white bg-[#3b1024] disabled:opacity-50 shrink-0"
        >
          {spinning ? "La roue tourne…" : "Lancer la roulette 🎯"}
        </button>
      ) : (
        <button
          onClick={onSuccess}
          className="mt-4 rounded-2xl px-7 py-2.5 font-bold text-white bg-[#3b1024] shrink-0"
        >
          Découvrir le cadeau →
        </button>
      )}
    </div>
  );
}