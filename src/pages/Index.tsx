import { useState } from 'react';
import { questions } from '@/data/questions';
import { useProgress } from '@/hooks/useProgress';
import { QuestionCard } from '@/components/QuestionCard';
import { ProgressHeader } from '@/components/ProgressHeader';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FloatingElements } from '@/components/FloatingElements';
import { CelebrationOverlay } from '@/components/CelebrationOverlay';



const Index = () => {
  const { 
    currentDay, 
    isQuestionUnlocked, 
    isQuestionAnswered, 
    markQuestionAnswered, 
    resetProgress,
    totalAnswered 
  } = useProgress();
  
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(false);

  const handleAnswerSubmit = (questionId: number, userAnswer: string): boolean => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return false;

    const isCorrect = userAnswer.toLowerCase().trim() === question.answer.toLowerCase();
    
    if (isCorrect) {
      markQuestionAnswered(questionId);
      setShowCelebration(true);
      toast({
        title: "Correct! 🎉",
        description: "You did it lil grl...",
        duration: 3000,
      });
      return true;
    }
    
    return false;
  };

  const availableQuestions = questions.filter(q => 
    isQuestionUnlocked(q.day) && !isQuestionAnswered(q.id)
  );

  const answeredQuestions = questions.filter(q => 
    isQuestionAnswered(q.id)
  );

  const futureQuestions = questions.filter(q => 
    !isQuestionUnlocked(q.day)
  );

  return (
    <div className="min-h-screen relative" style={{background: "linear-gradient(to bottom, #252329, #2b2930)"}}>
      <FloatingElements />
      <CelebrationOverlay 
        trigger={showCelebration} 
        onComplete={() => setShowCelebration(false)} 
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <ProgressHeader 
          currentDay={currentDay}
          totalAnswered={totalAnswered}
          totalQuestions={questions.length}
        />

        <div className="space-y-8">
          {/* Available Questions */}
          {availableQuestions.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-white">
                Ready to Answer gurl?
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableQuestions.map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isUnlocked={true}
                    isAnswered={false}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Answered Questions */}
          {answeredQuestions.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-white" >
                Today's story completed!
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {answeredQuestions.sort((a, b) => b.day - a.day).map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isUnlocked={true}
                    isAnswered={true}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Future Questions Preview */}
          {futureQuestions.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-white">
                Coming Soon
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {futureQuestions.slice(0, 6).map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isUnlocked={false}
                    isAnswered={false}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reset Button - Hidden in production, useful for testing */}
          <div className="text-center pt-8">
            <Button
              onClick={resetProgress}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Progress to Day1
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
