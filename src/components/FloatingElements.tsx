import { Heart, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  delay: number;
  icon: 'heart' | 'sparkle' | 'star';
  size: 'sm' | 'md' | 'lg';
}

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          icon: ['heart', 'sparkle', 'star'][Math.floor(Math.random() * 3)] as 'heart' | 'sparkle' | 'star',
          size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg'
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  const getIcon = (type: string, size: string) => {
    const sizeMap = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4', 
      lg: 'w-5 h-5'
    };

    const iconSize = sizeMap[size as keyof typeof sizeMap];

    switch (type) {
      case 'heart':
        return <Heart className={`${iconSize} fill-primary text-primary`} />;
      case 'sparkle':
        return <Sparkles className={`${iconSize} text-accent-foreground`} />;
      case 'star':
        return <Star className={`${iconSize} fill-yellow-300 text-yellow-300`} />;
      default:
        return <Heart className={`${iconSize} fill-primary text-primary`} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float opacity-20"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {getIcon(element.icon, element.size)}
        </div>
      ))}
    </div>
  );
};