import MemoryGame from "./MemoryGame";
import RouletteGame from "./RouletteGame";
import QuizGame from "./QuizGame";

export default function GameRenderer({ game, onSuccess }) {
  switch (game) {
    case "memory":
      return <MemoryGame onSuccess={onSuccess} />;

    case "roulette":
      return <RouletteGame onSuccess={onSuccess} />;

    case "quiz":
      return <QuizGame onSuccess={onSuccess} />;

    default:
      return (
        <div className="text-center text-[#6f2948]">
          Jeu bientôt disponible 🎁
        </div>
      );
  }
}