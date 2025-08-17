import { Heart, Calendar, Award, Sparkles,Star } from 'lucide-react';

interface ProgressHeaderProps {
  currentDay: number;
  totalAnswered: number;
  totalQuestions: number;
}

export const ProgressHeader = ({ 
  currentDay, 
  totalAnswered, 
  totalQuestions 
}: ProgressHeaderProps) => {
  const progressPercentage = (totalAnswered / totalQuestions) * 100;

  return (
    <div className="text-center space-y-6 mb-8 relative">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-1/4 animate-float">
        <Sparkles className="w-4 h-4 text-primary opacity-30" />
      </div>
      <div className="absolute top-0 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <Heart className="w-3 h-3 text-primary opacity-30" />
      </div>

      <div className="space-y-2 animate-bounce-in">
        <h1 className="text-4xl font-bold bg-gradient-romantic bg-clip-text text-transparent animate-pulse-glow">
          THINGS TO REMEMBER!
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <Heart className="w-5 h-5 text-primary animate-heart-beat" />
          <p className="text-muted-foreground text-lg">
            10 Questions to Answer! 
          </p>
          <Heart className="w-5 h-5 text-primary animate-heart-beat" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      <div className="flex items-center justify-center space-x-8 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center space-x-2 text-foreground bg-white/50 px-3 py-2 rounded-full shadow-soft">
          <Calendar className="w-5 h-5 text-primary animate-wiggle" />
          <span className="font-medium">Day {currentDay}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-foreground bg-white/50 px-3 py-2 rounded-full shadow-soft">
          <Award className="w-5 h-5 text-primary animate-float" />
          <span className="font-medium">{totalAnswered}/{totalQuestions} Complete</span>
        </div>
      </div>

      <div className="max-w-md mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-secondary rounded-full h-4 overflow-hidden shadow-inner border border-white/30">
          <div 
            className="h-full bg-gradient-romantic rounded-full transition-all duration-1000 ease-out animate-pulse-glow"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2 font-medium">
          {progressPercentage.toFixed(0)}% of the journey completed ✨
        </p>
      </div>

      {totalAnswered > 0 && (
        <div className="animate-bounce-in" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center justify-center space-x-1 text-primary mb-2">
            {Array.from({ length: Math.min(5, totalAnswered) }).map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 fill-current animate-heart-beat" 
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
            {totalAnswered > 5 && (
              <span className="text-sm font-medium animate-pulse">+{totalAnswered - 5}</span>
            )}
          </div>
          {totalAnswered >= 10 && (
            <div className="flex justify-center space-x-1">
              <Sparkles className="w-3 h-3 text-yellow-400 animate-sparkle" />
              <span className="text-xs text-muted-foreground">You're doing amazing!</span>
              <Sparkles className="w-3 h-3 text-yellow-400 animate-sparkle" style={{ animationDelay: '0.5s' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};