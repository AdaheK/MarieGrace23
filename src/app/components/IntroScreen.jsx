"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const introPhotos = [
  "/images/intro/photo-1.jpeg",
  "/images/intro/photo-2.jpeg",
  "/images/intro/photo-3.jpeg",
  "/images/intro/photo-4.jpeg",
  "/images/intro/photo-5.jpeg",
];

export default function IntroScreen({ onStart }) {
  return (
    <div className="relative h-screen max-h-screen text-[#3b1024] flex items-center justify-center px-4 overflow-hidden bg-[#fff0f7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.62),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.34),transparent_38%),linear-gradient(135deg,#fff1f7,#ffe4f1,#fdf2f8)]" />
      <div className="absolute inset-0 opacity-35 bg-[linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="absolute inset-0 pointer-events-none opacity-70">
        {introPhotos.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * index }}
            className={[
              "absolute hidden md:block h-48 w-36 rounded-3xl border-[6px] border-white/70 bg-white/50 shadow-2xl shadow-pink-300/50 overflow-hidden",
              index === 0 && "left-8 top-16 -rotate-12",
              index === 1 && "right-12 top-20 rotate-12",
              index === 2 && "left-16 bottom-16 rotate-6",
              index === 3 && "right-20 bottom-20 -rotate-6",
              index === 4 && "left-[18%] bottom-8 -rotate-3",
            ].filter(Boolean).join(" ")}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(rgba(244,114,182,.18), rgba(59,16,36,.12)), url(${src})` }}
            />
          </motion.div>
        ))}
        <div className="absolute left-[8%] top-[12%] text-5xl text-pink-300/70">♡</div>
        <div className="absolute right-[10%] top-[18%] text-6xl text-pink-300/70">♡</div>
        <div className="absolute right-[14%] bottom-[14%] text-4xl text-fuchsia-300/70">♡</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-3xl text-center rounded-[2.7rem] bg-white/70 border border-white/90 shadow-2xl shadow-pink-300/60 backdrop-blur-xl px-6 py-8 md:px-12 md:py-10"
      >
        <motion.div animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }} transition={{ duration: 3.2, repeat: Infinity }} className="text-6xl md:text-7xl mb-5">
          🎁
        </motion.div>

        <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/90 bg-white/75 px-4 py-2 text-sm md:text-base text-pink-950/70">
          <Sparkles size={16} /> 30 juin — joyeux anniversaire bébé d'amour
        </div>

        <h1 className="mt-8 text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          <span className="text-pink-700">23 ans,</span>
          <br />
          23 cadeaux
        </h1>

        <p className="mt-7 text-base md:text-xl text-[#6f2948]/80 leading-relaxed max-w-2xl mx-auto">
          Bienvenue dans cette expérience pensée exceptionnellement pour toi pour ce jour si spécial.
        </p>

        <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} onClick={onStart} className="mt-8 rounded-2xl bg-[#3b1024] text-white px-8 py-4 font-bold shadow-2xl shadow-pink-300/70">
          Commencer l'expérience ✨
        </motion.button>
      </motion.div>
    </div>
  );
}
