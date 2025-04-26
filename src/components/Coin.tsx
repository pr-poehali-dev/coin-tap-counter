import { useState, useRef } from "react";

interface CoinProps {
  onCoinClick: () => void;
}

const Coin = ({ onCoinClick }: CoinProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const coinRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (coinRef.current) {
      coinRef.current.classList.add("coin-pulse");
      setTimeout(() => {
        if (coinRef.current) {
          coinRef.current.classList.remove("coin-pulse");
          setIsAnimating(false);
        }
      }, 300);
    }
    
    onCoinClick();
  };

  return (
    <div 
      ref={coinRef}
      className="cursor-pointer w-48 h-48 md:w-64 md:h-64 rounded-full bg-[hsl(var(--coin-gold))] 
                flex items-center justify-center border-8 border-[hsl(var(--coin-gold-light))]
                shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] 
                hover:bg-[hsl(var(--coin-gold-light))] transition-colors duration-200 select-none"
      onClick={handleClick}
    >
      <div className="text-6xl md:text-8xl font-bold text-[hsl(var(--coin-shadow))]">SL</div>
    </div>
  );
};

export default Coin;
