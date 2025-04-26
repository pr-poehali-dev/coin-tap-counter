import { useRef, useEffect } from "react";

interface ScoreBoardProps {
  score: number;
  isAnimating: boolean;
}

const ScoreBoard = ({ score, isAnimating }: ScoreBoardProps) => {
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnimating && scoreRef.current) {
      scoreRef.current.classList.add("score-pop");
      setTimeout(() => {
        if (scoreRef.current) {
          scoreRef.current.classList.remove("score-pop");
        }
      }, 300);
    }
  }, [isAnimating, score]);

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg w-full max-w-xs">
      <div className="text-center mb-2 text-gray-400 text-xs uppercase tracking-wide">Монет собрано</div>
      <div 
        ref={scoreRef}
        className="text-center text-5xl font-bold font-mono p-2"
      >
        {score.toString().padStart(6, '0')}
      </div>
    </div>
  );
};

export default ScoreBoard;
