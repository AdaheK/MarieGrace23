"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Countdown23({ onSuccess }) {
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(23);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!counting) return;
    if (count === 0) {
      setDone(true);
      setTimeout(onSuccess, 700);
      return;
    }
    const timeout = setTimeout(() => setCount((current) => current - 1), 1000);
    return () => clearTimeout(timeout);
  }, [counting, count, onSuccess]);

  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-8">
      {!counting && !done && (
        <>
          <p className="text-[#6f2948]/70">La dernière surprise mérite d'être attendue.</p>
          <p className="text-[#9d3b68]/70 text-sm">23 secondes. Une par année.</p>
          <button onClick={() => setCounting(true)} className="rounded-2xl px-8 py-4 font-bold text-white text-lg bg-[#3b1024]">Lancer le compte à rebours</button>
        </>
      )}
      {counting && !done && <motion.div key={count} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-8xl md:text-9xl font-black text-pink-500">{count}</motion.div>}
      {done && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl">🎉</motion.div>}
    </div>
  );
}
