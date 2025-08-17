import { useState, useEffect } from 'react';

export interface Progress {
  startDate: string;
  answeredQuestions: number[];
}

const STORAGE_KEY = 'daily-questions-progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      startDate: new Date().toISOString().split('T')[0],
      answeredQuestions: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getCurrentDay = () => {
    const start = new Date(progress.startDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diffDays);
  };

  const isQuestionUnlocked = (day: number) => {
    return day <= getCurrentDay();
  };

  const isQuestionAnswered = (questionId: number) => {
    return progress.answeredQuestions.includes(questionId);
  };

  const markQuestionAnswered = (questionId: number) => {
    setProgress(prev => ({
      ...prev,
      answeredQuestions: [...prev.answeredQuestions, questionId]
    }));
  };

  const resetProgress = () => {
    setProgress({
      startDate: "2025-08-18",
      answeredQuestions: []
    });
  };

  return {
    currentDay: getCurrentDay(),
    isQuestionUnlocked,
    isQuestionAnswered,
    markQuestionAnswered,
    resetProgress,
    totalAnswered: progress.answeredQuestions.length
  };
};