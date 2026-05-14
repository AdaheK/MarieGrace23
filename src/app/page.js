"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GIFTS_DATA } from "./data/gifts";
import { loadProgress, saveProgress } from "./lib/progress";
import IntroScreen from "./components/IntroScreen";
import Header from "./components/Header";
import GiftNode from "./components/GiftNode";
import GiftModal from "./components/GiftModal";

export default function BirthdayGiftExperience() {
  const [hasStarted, setHasStarted] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    setCompleted(loadProgress());
  }, []);

  useEffect(() => {
    saveProgress(completed);
  }, [completed]);

  const unlockedIds = useMemo(() => {
    const ids = new Set([1, 22, 23]);

    GIFTS_DATA.forEach((gift, index) => {
      if (index === 0) return;
      if (gift.id === 22 || gift.id === 23) return;

      const previousGift = GIFTS_DATA[index - 1];
      if (completed.includes(previousGift.id)) ids.add(gift.id);
    });

    return ids;
  }, [completed]);

  const completeGift = useCallback((id) => {
    setCompleted((current) => Array.from(new Set([...current, id])));
  }, []);

  const resetProgress = () => {
    setCompleted([]);
    saveProgress([]);
    setSelectedGift(null);
    setHasStarted(false);
  };

  const progress = Math.round((completed.length / GIFTS_DATA.length) * 100);

  if (!hasStarted) {
    return <IntroScreen onStart={() => setHasStarted(true)} />;
  }

  return (
    <main className="min-h-screen text-[#3b1024] px-4 py-8 md:px-10 overflow-hidden bg-[#fff0f7]">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.45),transparent_32%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.25),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.95),transparent_35%),linear-gradient(135deg,#fff1f7,#ffe4f1,#fdf2f8)]" />
      <div className="fixed inset-0 pointer-events-none opacity-35 bg-[linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:46px_46px]" />

      <div className="relative max-w-6xl mx-auto space-y-8">
        <Header
          completedCount={completed.length}
          totalCount={GIFTS_DATA.length}
          progress={progress}
          onReset={resetProgress}
        />

        <section className="relative space-y-8 md:space-y-3">
          {GIFTS_DATA.map((gift, index) => (
            <GiftNode
              key={gift.id}
              gift={gift}
              index={index}
              isUnlocked={unlockedIds.has(gift.id)}
              isCompleted={completed.includes(gift.id)}
              onOpen={setSelectedGift}
            />
          ))}
        </section>
      </div>

      <AnimatePresence>
        {selectedGift && (
          <GiftModal
            key={selectedGift.id}
            gift={selectedGift}
            isCompleted={completed.includes(selectedGift.id)}
            onClose={() => setSelectedGift(null)}
            onComplete={completeGift}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
