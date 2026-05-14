"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function Header({ completedCount, totalCount, progress, onReset }) {
  return (
    <header className="rounded-[2.3rem] border border-white/80 bg-white/60 p-6 md:p-8 shadow-2xl shadow-pink-200/60 backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#9d3b68]/75">Mission anniversaire</p>
          <h1 className="text-4xl md:text-6xl font-black mt-3">Le chemin des 23 cadeaux</h1>
          <p className="text-[#6f2948]/70 mt-3 max-w-2xl">
            Chaque étape cache un cadeau, un défi ou une surprise. Avance dans l'ordre, sauf pour les deux grandes surprises finales.
          </p>
        </div>

        <div className="min-w-[230px]">
          <div className="flex justify-between text-sm text-[#9d3b68] mb-2">
            <span>Progression</span>
            <span>{completedCount}/{totalCount}</span>
          </div>
          <div className="h-3 rounded-full bg-white/70 overflow-hidden border border-white/90">
            <motion.div
              className="h-full bg-[#3b1024]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#9d3b68]/60 mt-1 text-right">{progress}%</p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-pink-100 text-pink-950 border border-pink-200 px-4 py-2 text-sm font-bold hover:bg-pink-200 transition"
      >
        <RotateCcw size={16} /> Reset progression temporaire
      </button>
    </header>
  );
}
