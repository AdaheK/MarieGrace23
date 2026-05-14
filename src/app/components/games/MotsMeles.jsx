"use client";

import { useState } from "react";

const FOUND_COLORS = [
  "bg-pink-100 border-pink-400 text-pink-700",
  "bg-emerald-100 border-emerald-400 text-emerald-700",
  "bg-purple-100 border-purple-400 text-purple-700",
  "bg-orange-100 border-orange-400 text-orange-700",
  "bg-lime-100 border-lime-400 text-lime-700",
];

export default function MotsMeles({ grid = [], words = [], hint, onSuccess }) {
  const [found, setFound] = useState([]);
  const [foundCells, setFoundCells] = useState({});
  const [dragging, setDragging] = useState(false);
  const [selection, setSelection] = useState([]);

  const keyOf = (r, c) => `${r},${c}`;
  const getLetters = (cells) => cells.map(({ r, c }) => grid[r][c]).join("");

  const isSameLine = (cells) => {
    if (cells.length <= 2) return true;

    const dr = cells[1].r - cells[0].r;
    const dc = cells[1].c - cells[0].c;

    return cells.every((cell, index) => {
      if (index === 0) return true;
      return (
        cell.r - cells[index - 1].r === dr &&
        cell.c - cells[index - 1].c === dc
      );
    });
  };

  const addCell = (r, c) => {
    if (selection.some((cell) => keyOf(cell.r, cell.c) === keyOf(r, c))) {
      return;
    }

    const next = [...selection, { r, c }];
    if (!isSameLine(next)) return;

    setSelection(next);
  };

  const startDrag = (r, c) => {
    setDragging(true);
    setSelection([{ r, c }]);
  };

  const endDrag = () => {
    if (!dragging) return;

    const letters = getLetters(selection);
    const reversed = letters.split("").reverse().join("");

    const matchedWord = words.find(
      (word) =>
        !found.includes(word) &&
        (word === letters || word === reversed)
    );

    if (matchedWord) {
      const colorIndex = found.length;
      const nextFound = [...found, matchedWord];

      const nextCells = { ...foundCells };
      selection.forEach((cell) => {
        nextCells[keyOf(cell.r, cell.c)] = colorIndex;
      });

      setFound(nextFound);
      setFoundCells(nextCells);

      if (nextFound.length === words.length) {
        setTimeout(onSuccess, 600);
      }
    }

    setDragging(false);
    setSelection([]);
  };

  const isSelected = (r, c) =>
    selection.some((cell) => cell.r === r && cell.c === c);

  return (
    <div
      className="h-full flex flex-col justify-center gap-1.5 overflow-hidden select-none px-2"
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchEnd={endDrag}
    >
      <p className="text-center text-[11px] md:text-xs text-[#6f2948]/70 shrink-0">
        Clique et glisse sur les lettres pour retrouver les mots cachés.
      </p>

      <div className="flex flex-wrap gap-1 justify-center shrink-0">
        {words.map((word) => {
          const index = found.indexOf(word);
          const isFound = index !== -1;

          return (
            <span
              key={word}
              className={`rounded-full px-2 py-0.5 text-[9px] md:text-[10px] font-bold border transition ${
                isFound
                  ? `${FOUND_COLORS[index % FOUND_COLORS.length]} line-through`
                  : "border-pink-100 bg-white/70 text-[#6f2948]/70"
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>

      {hint && (
        <p className="text-[9px] md:text-[10px] text-center text-[#9d3b68]/70 shrink-0">
          💡 {hint}
        </p>
      )}

      <div className="mx-auto grid gap-0.5 shrink-0">
        {grid.map((row, r) => (
          <div key={r} className="flex gap-0.5">
            {row.map((letter, c) => {
              const cellKey = keyOf(r, c);
              const selected = isSelected(r, c);
              const foundColorIndex = foundCells[cellKey];
              const isFoundCell = foundColorIndex !== undefined;

              return (
                <button
                  key={`${r}-${c}`}
                  onMouseDown={() => startDrag(r, c)}
                  onMouseEnter={() => dragging && addCell(r, c)}
                  onTouchStart={() => startDrag(r, c)}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(
                      touch.clientX,
                      touch.clientY
                    );

                    const cell = element?.closest("[data-cell]");
                    if (!cell) return;

                    addCell(Number(cell.dataset.row), Number(cell.dataset.col));
                  }}
                  data-cell
                  data-row={r}
                  data-col={c}
                  className={`w-7 h-7 md:w-9 md:h-9 rounded-md text-[10px] md:text-xs font-black border transition-all duration-150 ${
                    selected
                      ? "border-pink-500 bg-pink-100 text-pink-800 scale-105"
                      : isFoundCell
                      ? FOUND_COLORS[foundColorIndex % FOUND_COLORS.length]
                      : "border-pink-100 bg-white/80 text-[#3b1024] hover:bg-pink-50"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-center text-[9px] md:text-[10px] text-[#9d3b68]/70 shrink-0">
        {found.length}/{words.length} mots trouvés
      </p>
    </div>
  );
}