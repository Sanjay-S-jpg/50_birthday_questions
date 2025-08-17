import { Heart, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SparkleProps {
  onComplete?: () => void;
}

export const SparkleEffect = ({ onComplete }: SparkleProps) => {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.1
    }));
    
    setSparkles(newSparkles);

    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`
          }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      ))}
    </div>
  );
};

export const HeartBurst = ({ onComplete }: SparkleProps) => {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    scale: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 40,
      scale: 0.5 + Math.random() * 0.5,
      delay: i * 0.1
    }));
    
    setHearts(newHearts);

    const timer = setTimeout(() => {
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-bounce-in"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            transform: `scale(${heart.scale})`,
            animationDelay: `${heart.delay}s`
          }}
        >
          <Heart className="w-6 h-6 fill-primary text-primary" />
        </div>
      ))}
    </div>
  );
};