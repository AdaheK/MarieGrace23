"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import Confetti from "./Confetti";
import MemoryGame from "./games/MemoryGame";
import PuzzleGame from "./games/PuzzleGame";
import RouletteGame from "./games/RouletteGame";
import TextTrousGame from "./games/TextTrousGame";
import MotsMeles from "./games/MotsMeles";
import WhoIsWho from "./games/WhoIsWho";
import Countdown23 from "./games/Countdown23";

import DifferencesGame from "./games/DifferencesGame";
import AnagramGame from "./games/AnagramGame";
import SecretCodeGame from "./games/SecretCodeGame";
import PhotoTetrisGame from "./games/PhotoTetrisGame";
import ColorSequenceGame from "./games/ColorSequenceGame";
import CandlesGame from "./games/CandlesGame";
import CatchGame from "./games/CatchGame";
import SutomGame from "./games/SutomGame";
import ShuffleGiftGame from "./games/ShuffleGiftGame";
import CasinoJackpotGame from "./games/CasinoJackpotGame";
import Lyrics4Game from "./games/Lyrics4Game";
import ConnectDotsGame from "./games/ConnectDotsGame";
import QRCodeGame from "./games/QRCodeGame";
import CemantixGame from "./games/CemantixGame";

function getRewardImage(id) {
  return `/images/rewards/reward-${String(id).padStart(2, "0")}.jpeg`;
}

export default function GiftModal({
  gift,
  onClose,
  onComplete,
  isCompleted,
}) {
  const [phase, setPhase] = useState(
    isCompleted ? "revealed" : "challenge"
  );

  const [quizError, setQuizError] = useState(false);
  const [trollMsg, setTrollMsg] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const reveal = useCallback(() => {
    setPhase("revealed");
    setShowConfetti(true);

    onComplete(gift.id);

    setTimeout(() => setShowConfetti(false), 3200);
  }, [gift.id, onComplete]);

  // ─────────────────────────────────────────────
  // CHALLENGES
  // ─────────────────────────────────────────────
  const renderChallenge = () => {
    if (gift.mechanic === "none") {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
            }}
            className="text-6xl"
          >
            🎁
          </motion.div>

          <p className="text-[#6f2948]/70">
            Ce cadeau s'ouvre directement.
          </p>

          <PrimaryButton onClick={reveal}>
            Ouvrir le cadeau
          </PrimaryButton>
        </div>
      );
    }

    if (gift.mechanic === "quiz") {
      return (
        <div className="h-full flex flex-col justify-center space-y-3">
          <ChallengeText gift={gift} />

          <div className="space-y-2">
            {gift.choices?.map((choice) => (
              <ChoiceButton
                key={choice}
                onClick={() => {
                  if (
                    gift.allCorrect ||
                    choice === gift.answer
                  ) {
                    reveal();
                  } else {
                    setQuizError(true);

                    setTimeout(
                      () => setQuizError(false),
                      1200
                    );
                  }
                }}
              >
                {choice}
              </ChoiceButton>
            ))}
          </div>

          {quizError && (
            <p className="text-red-600 text-sm text-center font-bold">
              Mauvaise réponse. Cherche encore.
            </p>
          )}
        </div>
      );
    }

    if (gift.mechanic === "choice") {
      if (trollMsg !== null) {
        return (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-4xl">😂</div>

            <p className="text-[#6f2948]/75 text-sm max-w-lg">
              {trollMsg}
            </p>

            <PrimaryButton
              onClick={() => setTrollMsg(null)}
            >
              Essayer une autre option
            </PrimaryButton>
          </div>
        );
      }

      return (
        <div className="h-full flex flex-col justify-center space-y-4">
          <p className="text-[#6f2948]/70 text-sm text-center">
            Une seule option révèle le vrai cadeau…
          </p>

          <div className="grid grid-cols-2 gap-3">
            {gift.choices.map((choice, index) => (
              <button
                key={choice}
                onClick={() => {
                  if (index === gift.correctChoice) {
                    reveal();
                  } else {
                    const trollIndex =
                      (index < gift.correctChoice
                        ? index
                        : index - 1) %
                      (gift.trollChoices?.length || 1);

                    setTrollMsg(
                      gift.trollChoices?.[trollIndex] ||
                        "Mauvaise option !"
                    );
                  }
                }}
                className="rounded-2xl bg-white/70 border border-pink-100 p-4 text-center font-bold text-[#3b1024] hover:bg-pink-50 transition text-sm"
              >
                🎁
                <br />
                {choice}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ─────────────────────────────────────────────
    // GAMES
    // ─────────────────────────────────────────────
    if (gift.mechanic === "differences")
      return (
        <DifferencesGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "anagram")
      return (
        <AnagramGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "secretcode")
      return (
        <SecretCodeGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "phototetris")
      return (
        <PhotoTetrisGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "colors")
      return (
        <ColorSequenceGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "candles")
      return (
        <CandlesGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "catch")
      return (
        <CatchGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "sutom")
      return (
        <SutomGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "shuffle")
      return (
        <ShuffleGiftGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "casino")
      return (
        <CasinoJackpotGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "lyrics4")
      return (
        <Lyrics4Game
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "connectdots")
      return (
        <ConnectDotsGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "qrcode")
      return (
        <QRCodeGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "cemantix")
      return (
        <CemantixGame
          gift={gift}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "memory")
      return (
        <MemoryGame
          pairs={gift.pairs}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "puzzle")
      return (
        <PuzzleGame
          events={gift.events}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "roulette")
      return (
        <RouletteGame
          items={gift.rouletteItems}
          fixedResult={gift.fixedResult}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "texttrous")
  return (
    <TextTrousGame
      gift={gift}
      onSuccess={reveal}
    />
  );

    if (gift.mechanic === "motsmeles")
      return (
        <MotsMeles
          grid={gift.grid}
          words={gift.words}
          hint={gift.hint}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "whoiswho")
      return (
        <WhoIsWho
          questions={gift.questions}
          onSuccess={reveal}
        />
      );

    if (gift.mechanic === "countdown23")
      return <Countdown23 onSuccess={reveal} />;

    return (
      <div className="h-full flex items-center justify-center text-center">
        <p className="text-[#6f2948]">
          Ce mini-jeu arrive bientôt 🎁
        </p>
      </div>
    );
  };

  // ─────────────────────────────────────────────
  // MODAL
  // ─────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-[#3b1024]/45 backdrop-blur-xl overflow-hidden"
      onClick={(e) =>
        e.target === e.currentTarget && onClose()
      }
    >
      <Confetti active={showConfetti} />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 24,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
        className="relative w-full max-w-4xl h-[min(92dvh,780px)] rounded-[2rem] border border-white/80 bg-[#fff5fb] text-[#3b1024] shadow-2xl shadow-pink-300/60 overflow-hidden flex flex-col"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 md:px-7 md:py-5 border-b border-pink-100 bg-white/65 shrink-0">
          <div>
            <p className="text-sm text-[#b53673]">
              {gift.secretName}
            </p>

            <h2 className="text-2xl md:text-4xl font-black mt-1 leading-tight">
              {phase === "revealed"
                ? gift.title
                : gift.secretName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-[#3b1024] text-white p-3 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="relative flex-1 min-h-0 p-3 md:p-5 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* CHALLENGE */}
            {phase === "challenge" && (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full overflow-hidden"
              >
                {renderChallenge()}
              </motion.div>
            )}

            {/* REVEAL */}
            {phase === "revealed" && (
              <motion.div
                key="reveal"
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                className="h-full grid md:grid-cols-[0.9fr_1.1fr] gap-4 items-center overflow-hidden"
              >
                {/* LEFT SIDE */}
<div className="h-[250px] md:h-full max-h-[470px] rounded-[2rem] border border-pink-100 shadow-xl shadow-pink-200/40 overflow-hidden bg-[#3b1024]">
  {gift.video ? (
    <video
      src={gift.video}
      controls
      playsInline
      preload="metadata"
      className="h-full w-full object-contain bg-black"
    />
  ) : gift.voiceAudio ? (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 px-6 text-white bg-gradient-to-br from-[#3b1024] to-[#8b2f5d]">
      <div className="text-7xl">🎙️</div>

      <p className="text-center text-lg font-black">
        Message vocal
      </p>

      <audio
        src={gift.voiceAudio}
        controls
        preload="metadata"
        className="w-full max-w-sm"
      />
    </div>
  ) : (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,245,251,.20), rgba(59,16,36,.20)), url(${getRewardImage(
          gift.id
        )})`,
      }}
    >
      <div className="h-full w-full rounded-[2rem] flex items-center justify-center bg-pink-100/25 backdrop-blur-[1px]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            rotate: [0, -3, 3, 0],
          }}
          transition={{ delay: 0.2 }}
          className="text-7xl drop-shadow-xl"
        >
          🎁
        </motion.div>
      </div>
    </div>
  )}
</div>
                {/* RIGHT SIDE */}
                <div className="space-y-4 min-h-0">
                  <div className="rounded-3xl bg-white border border-pink-100 p-5 md:p-6 shadow-xl shadow-pink-200/40">
                    <p className="text-xs text-pink-600/80 uppercase tracking-widest mb-3 font-bold">
                      Révélation
                    </p>

                    <p className="text-[#3b1024] leading-relaxed text-base md:text-lg">
                      {gift.content}
                    </p>
                  </div>

                  <PrimaryButton onClick={onClose}>
                    Continuer le chemin →
                  </PrimaryButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// UI
// ─────────────────────────────────────────────
function ChallengeText({ gift }) {
  return (
    <div className="rounded-3xl bg-white/75 border border-pink-100 p-4 md:p-5">
      <p className="text-[#6f2948]/80 text-sm md:text-base">
        {gift.question}
      </p>

      {gift.hint && (
        <p className="text-xs text-[#9d3b68]/70 mt-2">
          Indice : {gift.hint}
        </p>
      )}
    </div>
  );
}

function ChoiceButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-white/70 border border-pink-100 px-4 py-3 text-[#3b1024] hover:bg-pink-50 transition text-sm font-medium"
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl py-3 px-5 font-bold text-white bg-[#3b1024] hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}