import { Heart, Star, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const CelebrationOverlay = ({ trigger, onComplete }: CelebrationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
    icon: 'heart' | 'star' | 'sparkle';
    delay: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      
      // Generate confetti
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: ['text-primary', 'text-yellow-400', 'text-pink-400', 'text-purple-400'][Math.floor(Math.random() * 4)],
        icon: ['heart', 'star', 'sparkle'][Math.floor(Math.random() * 3)] as 'heart' | 'star' | 'sparkle',
        delay: Math.random() * 1
      }));
      
      setConfetti(newConfetti);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'heart':
        return <Heart className="w-4 h-4 fill-current" />;
      case 'star':
        return <Star className="w-4 h-4 fill-current" />;
      case 'sparkle':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4 fill-current" />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-romantic/20 animate-fade-in" />
      
      {confetti.map((item) => (
        <div
          key={item.id}
          className={`absolute animate-bounce-in ${item.color}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `rotate(${item.rotation}deg)`,
            animationDelay: `${item.delay}s`,
            animationDuration: '2s'
          }}
        >
          {getIcon(item.icon)}
        </div>
      ))}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-romantic animate-bounce-in border border-primary/20">
          <div className="text-center space-y-4">
            <div className="text-6xl animate-heart-beat">😎</div>
            <h2 className="text-2xl font-bold text-primary">Noicee!</h2>
            <p className="text-muted-foreground">You did it lil gurl.. 🫡</p>
          </div>
        </div>
      </div>
    </div>
  );
};