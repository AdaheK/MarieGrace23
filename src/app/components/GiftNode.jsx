"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Crown, Gift, Lock, MapPin } from "lucide-react";

function getGiftImage(id, isCompleted) {
  const number = String(id).padStart(2, "0");

  return isCompleted
    ? `/images/rewards/reward-${number}.jpeg`
    : `/images/gifts/gift-${number}.png`;
}

export default function GiftNode({
  gift,
  index,
  isUnlocked,
  isCompleted,
  onOpen,
}) {
  const isLeft = index % 2 === 0;
  const isFinal = gift.id === 22 || gift.id === 23;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035 }}
      className="relative grid md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] gap-4 md:gap-6 items-stretch md:min-h-[210px]"
    >
      <div className="hidden md:flex md:col-start-2 relative justify-center items-center h-full min-h-[210px]">
        <div className="absolute top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-pink-300 via-fuchsia-300 to-pink-300" />

        <div
          className={`relative z-10 h-14 w-14 rounded-full border-4 flex items-center justify-center shadow-xl ${
            isCompleted
              ? "bg-emerald-100 border-emerald-300 text-emerald-700 shadow-emerald-100"
              : isUnlocked
              ? "bg-[#3b1024] border-pink-200 text-white shadow-pink-200"
              : "bg-white border-pink-100 text-pink-300"
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 size={24} />
          ) : isFinal ? (
            <Crown size={22} />
          ) : (
            <MapPin size={22} />
          )}
        </div>
      </div>

      <div
        className={`flex items-center h-full ${
          isLeft
            ? "md:col-start-1 md:row-start-1"
            : "md:col-start-3 md:row-start-1"
        }`}
      >
        <motion.button
          whileHover={isUnlocked ? { y: -5, scale: 1.015 } : {}}
          whileTap={isUnlocked ? { scale: 0.98 } : {}}
          onClick={() => isUnlocked && onOpen(gift)}
          className={`relative w-full text-left rounded-[2rem] border p-0 overflow-hidden transition shadow-xl ${
            isCompleted
              ? "border-emerald-200 bg-emerald-50/85 shadow-emerald-100/70"
              : isUnlocked
              ? "border-white/80 bg-white/75 hover:bg-white/90 shadow-pink-200/65"
              : "border-white/50 bg-white/35 opacity-60 cursor-not-allowed shadow-transparent"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55"
            style={{
              backgroundImage: `url(${getGiftImage(gift.id, isCompleted)})`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-pink-50/65 to-white/60" />

          <div className="relative z-10 p-5 md:p-6 min-h-[168px] flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div
                className={`rounded-2xl p-3 border backdrop-blur-md ${
                  isCompleted
                    ? "bg-emerald-100/90 border-emerald-200 text-emerald-800"
                    : isUnlocked
                    ? "bg-[#3b1024] border-[#3b1024] text-white"
                    : "bg-white/55 border-white/70 text-[#3b1024]/50"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={24} />
                ) : isUnlocked ? (
                  <Gift size={24} />
                ) : (
                  <Lock size={24} />
                )}
              </div>

              <span className="text-xs rounded-full bg-white/80 border border-white/90 px-3 py-1 text-[#3b1024]/70 font-bold">
                #{gift.id.toString().padStart(2, "0")}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#9d3b68]/75 mb-2">
                {isCompleted
                  ? "Ouvert"
                  : isUnlocked
                  ? "Disponible"
                  : "Verrouillé"}
              </p>

              <h3 className="text-xl font-black text-[#3b1024]">
                {gift.secretName}
              </h3>

              <p className="mt-2 text-sm text-[#6f2948]/70">
                {isCompleted
                  ? gift.title
                  : isUnlocked
                  ? "Clique pour découvrir cette étape."
                  : "Continue le chemin pour y accéder."}
              </p>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}