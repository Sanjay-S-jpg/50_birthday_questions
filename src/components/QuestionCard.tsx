import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Lock, CheckCircle, Sparkles, Zap, Diamond } from 'lucide-react';
import { Question } from '@/data/questions';
import { SparkleEffect, HeartBurst } from '@/components/AnimatedEffects';

interface QuestionCardProps {
  question: Question;
  isUnlocked: boolean;
  isAnswered: boolean;
  onAnswerSubmit: (questionId: number, answer: string) => boolean;
}

export const QuestionCard = ({ 
  question, 
  isUnlocked, 
  isAnswered, 
  onAnswerSubmit 
}: QuestionCardProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setIsSubmitting(true);
    setShowError(false);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const isCorrect = onAnswerSubmit(question.id, userAnswer.trim());
    
    if (isCorrect) {
      setShowSparkles(true);
      setTimeout(() => {
        setShowHeartBurst(true);
      }, 500);
    } else {
      setShowError(true);
      setUserAnswer('');
    }
    
    setIsSubmitting(false);
  };

  if (!isUnlocked) {
    return (
      <Card className="p-6 bg-gradient-subtle border-border shadow-soft hover:animate-wiggle transition-all duration-300">
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          <Lock className="w-8 h-8 mr-3 animate-float" />
          <div className="text-center">
            <p className="font-medium">Day {question.day}</p>
            <p className="text-sm">Unlocks soon...</p>
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (isAnswered) {
    return (
      <Card className="p-6 bg-gradient-romantic border-primary/20 shadow-romantic animate-bounce-in relative overflow-hidden">
        {showSparkles && <SparkleEffect onComplete={() => setShowSparkles(false)} />}
        {showHeartBurst && <HeartBurst onComplete={() => setShowHeartBurst(false)} />}
        
        <div className="text-center space-y-4 relative z-10">
          <div className="flex items-center justify-center text-primary mb-4">
            <CheckCircle className="w-8 h-8 mr-2 animate-heart-beat" />
            <span className="font-semibold">Day {question.day} Complete</span>
            <Sparkles className="w-5 h-5 ml-2 animate-sparkle text-yellow-400" />
          </div>
          
          <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm border border-white/30 shadow-soft">
            <Heart className="w-6 h-6 mx-auto mb-3 text-primary animate-heart-beat" />
            <p className="text-foreground leading-relaxed italic">
              {question.message}
            </p>
          </div>
          
          <div className="flex justify-center space-x-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Zap 
                key={i} 
                className="w-3 h-3 fill-primary text-primary animate-heart-beat" 
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border shadow-soft hover:shadow-romantic transition-all duration-300 animate-slide-up hover:scale-105 hover:animate-pulse-glow relative overflow-hidden">
      <div className="space-y-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-romantic rounded-full mb-4 animate-float shadow-romantic">
            <span className="text-white font-bold text-lg animate-heart-beat">{question.day}</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Day {question.day}
          </h3>
          <div className="flex justify-center space-x-1 mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-sparkle" style={{ animationDelay: '0s' }} />
            <Sparkles className="w-3 h-3 text-accent-foreground animate-sparkle" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="w-4 h-4 text-primary animate-sparkle" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="bg-accent/50 rounded-lg p-4 border border-accent/30 shadow-inner">
          <p className="text-lg text-center text-foreground font-medium leading-relaxed">
            {question.question}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer..."
                className="text-center text-lg h-12 bg-white/80 border-border focus:border-primary focus:ring-primary transition-all duration-300 focus:animate-pulse-glow"
                disabled={isSubmitting}
              />
              {userAnswer && (
                <Heart className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary animate-heart-beat" />
              )}
            </div>
            {showError && (
              <div className="text-center animate-bounce-in">
                <p className="text-destructive text-sm">
                  Not quite right. Try again! 
                </p>
                <div className="flex justify-center space-x-1 mt-1">
                  <Zap className="w-3 h-3 text-destructive animate-wiggle" />
                  <Zap className="w-3 h-3 text-destructive animate-wiggle" style={{ animationDelay: '0.1s' }} />
                  <Zap className="w-3 h-3 text-destructive animate-wiggle" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={!userAnswer.trim() || isSubmitting}
            className="w-full h-12 bg-gradient-romantic hover:opacity-90 text-white font-medium shadow-soft transition-all duration-300 hover:shadow-romantic hover:scale-105 disabled:opacity-50 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <span>Checking</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Submit Answer</span>
                  <Diamond className="w-4 h-4 animate-heart-beat" />
                </div>
              )}
            </span>
            {!isSubmitting && (
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
            )}
          </Button>
        </form>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-2 right-2 opacity-10">
        <Heart className="w-8 h-8 text-primary animate-float" />
      </div>
      <div className="absolute bottom-2 left-2 opacity-10">
        <Sparkles className="w-6 h-6 text-accent-foreground animate-sparkle" />
      </div>
    </Card>
  );
};