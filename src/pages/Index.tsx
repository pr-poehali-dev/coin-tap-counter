import { useState, useEffect } from "react";
import Coin from "../components/Coin";
import ScoreBoard from "../components/ScoreBoard";

const Index = () => {
  const [score, setScore] = useState(0);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);

  const handleCoinClick = () => {
    setScore(prevScore => prevScore + 1);
    
    // Короткая анимация счетчика, не блокирующая игровой процесс
    if (!isScoreAnimating) {
      setIsScoreAnimating(true);
      setTimeout(() => setIsScoreAnimating(false), 150);
    }
  };

  // Добавляем обработчик для пробела на уровне компонента страницы
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        handleCoinClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Монетный Тапер</h1>
        <p className="text-gray-600">Тапайте по монете сверхбыстро без задержек!</p>
      </div>
      
      <div className="flex flex-col items-center gap-8 mb-12">
        <ScoreBoard score={score} isAnimating={isScoreAnimating} />
        
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-yellow-200 opacity-20 blur-xl"></div>
          <Coin onCoinClick={handleCoinClick} />
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-auto">
        <p className="mb-1">Тапните {1000 - (score % 1000)} раз, чтобы достичь следующей тысячи!</p>
        <p className="text-xs">Подсказка: удерживайте пробел для максимальной скорости</p>
      </div>
    </div>
  );
};

export default Index;
