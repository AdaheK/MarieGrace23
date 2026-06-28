"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const US_PHOTOS = Array.from({ length: 125 }, (_, i) => {
  return `/images/final/us/${String(i + 1)}.jpeg`;
});

const GIFT_IMAGES = Array.from({ length: 23 }, (_, i) => {
  return `/images/rewards/reward-${String(i + 1).padStart(2, "0")}.jpeg`;
});

export default function FinalClapModal({ onClose }) {
  const [step, setStep] = useState("photos");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [giftIndex, setGiftIndex] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [videoFinished, setVideoFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (step !== "photos") return;

    const interval = setInterval(() => {
      setPhotoIndex((current) => (current + 1) % US_PHOTOS.length);
    }, 500);

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step !== "transitionToGifts") return;

    const timer = setTimeout(() => {
      setStep("gifts");
    }, 800);

    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== "gifts") return;

    const interval = setInterval(() => {
      setGiftIndex((current) => {
        if (current >= GIFT_IMAGES.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            setStep("transitionToMessage");
          }, 2000);

          return current;
        }

        return current + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step !== "transitionToMessage") return;

    const timer = setTimeout(() => {
      setStep("message");
    }, 2500);

    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== "message") return;

    const interval = setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          clearInterval(interval);
          setStep("video");
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="fixed inset-0 z-[90] bg-[#0d0610] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#db277755,transparent_45%),radial-gradient(circle_at_bottom,#7c3aed55,transparent_45%)]" />

      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-50 rounded-xl bg-white/10 p-3 text-white hover:bg-white/20"
      >
        <X size={22} />
      </button>

      <AnimatePresence mode="wait">
        {step === "photos" && (
          <motion.div
            key="photos"
            initial={{ opacity: 0 }}
            animate={{
              opacity: fadeOut ? 0 : 1,
              scale: fadeOut ? 0.95 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeOut ? 1.5 : 0.5 }}
            className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-pink-300 mb-5">
              Quelques souvenirs...
            </p>

            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-[360px] w-[270px] md:h-[500px] md:w-[380px] rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl shadow-pink-500/30"
            >
              <img
                src={US_PHOTOS[photoIndex]}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>

            <p className="mt-5 text-white/70 text-sm">
              Je t'aime mon bébé d'amour ❤️
            </p>

            <audio
              src="/sounds/final-message.mp3"
              autoPlay
              playsInline
              className="hidden"
              onEnded={() => {
                setFadeOut(true);

                setTimeout(() => {
                  setStep("transitionToGifts");
                }, 2000);
              }}
            />
          </motion.div>
        )}

        {step === "transitionToGifts" && (
          <TransitionScreen
            icon="✨"
            title="Notre histoire continue..."
            subtitle="Et maintenant, retour sur les 23 cadeaux 🎁"
          />
        )}

        {step === "gifts" && (
          <motion.div
            key="gifts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-pink-300 mb-6">
              Récapitulatif des cadeaux
            </p>

            <motion.div
              key={giftIndex}
              initial={{ scale: 0.7, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative h-[320px] w-[240px] md:h-[430px] md:w-[320px] rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl shadow-pink-500/30"
            >
              <img
                src={GIFT_IMAGES[giftIndex]}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

              <div className="absolute bottom-5 left-0 right-0 text-center">
                <p className="text-sm text-white/70">Cadeau</p>
                <p className="text-5xl font-black">
                  #{String(giftIndex + 1).padStart(2, "0")}
                </p>
              </div>
            </motion.div>

            <p className="mt-6 text-white/50 text-sm">
              {giftIndex + 1}/23 cadeaux ouverts ✨
            </p>
          </motion.div>
        )}

        {step === "transitionToMessage" && (
          <TransitionScreen
            icon="🎬"
            title="23 cadeaux plus tard..."
            subtitle="Il reste une dernière surprise."
          />
        )}

        {step === "message" && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="text-6xl mb-6">🎬</p>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Clap de fin
            </h1>

            <div className="max-w-2xl text-lg md:text-2xl leading-relaxed text-white/80 space-y-3">
              <p>Tu as réussi tous les défis.</p>
              <p>Tu as trouvé tous les cadeaux.</p>
              <p>Tu as parcouru tout le chemin.</p>

              <p className="pt-5 text-pink-300 font-bold">
                Mais certaines personnes voulaient aussi te souhaiter un joyeux
                anniversaire...
              </p>
            </div>

            <p className="mt-10 text-white/60 text-sm">
              La vidéo finale se lance dans {countdown}...
            </p>
          </motion.div>
        )}

        {step === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 h-full w-full flex flex-col bg-black"
          >
            <video
              src="/videos/proches.mp4"
              controls
              autoPlay
              playsInline
              onEnded={() => setVideoFinished(true)}
              className="flex-1 h-full w-full object-contain bg-black"
            />

            {videoFinished && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <button
                  onClick={onClose}
                  className="rounded-2xl bg-white px-8 py-3 font-black text-[#3b1024] shadow-xl"
                >
                  Quitter et revenir au chemin ❤️
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TransitionScreen({ icon, title, subtitle }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-6xl mb-6">{icon}</p>

      <h2 className="text-3xl md:text-5xl font-black mb-4">
        {title}
      </h2>

      <p className="text-white/70 text-lg md:text-2xl max-w-2xl">
        {subtitle}
      </p>
    </motion.div>
  );
}