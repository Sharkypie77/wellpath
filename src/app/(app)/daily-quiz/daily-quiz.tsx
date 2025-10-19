"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Flame, Check, X } from "lucide-react";
import { getDailyQuizQuestion } from "./actions";
import type { DailyQuizQuestionOutput } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuizStatus = "loading" | "ready" | "answered";

export function DailyQuiz() {
  const [quiz, setQuiz] = useState<DailyQuizQuestionOutput | null>(null);
  const [status, setStatus] = useState<QuizStatus>("loading");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedStreak = parseInt(localStorage.getItem("dailyQuizStreak") || "0");
    const storedLastDate = localStorage.getItem("dailyQuizLastCompleted");

    setStreak(storedStreak);
    setLastCompletedDate(storedLastDate);

    if (storedLastDate === today) {
      setIsAlreadyCompleted(true);
      setStatus("answered");
    } else {
      fetchQuiz();
    }
  }, []);

  const fetchQuiz = async () => {
    setStatus("loading");
    try {
      const result = await getDailyQuizQuestion();
      setQuiz(result);
      setStatus("ready");
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
      // Handle error state
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !quiz) return;

    const correct = selectedAnswer === quiz.correctAnswerIndex;
    setIsCorrect(correct);
    setStatus("answered");

    const today = new Date().toISOString().split("T")[0];
    if (correct) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      
      const newStreak = lastCompletedDate === yesterdayStr ? streak + 1 : 1;
      setStreak(newStreak);
      localStorage.setItem("dailyQuizStreak", newStreak.toString());
    } else {
       setStreak(0);
       localStorage.setItem("dailyQuizStreak", "0");
    }
    
    setLastCompletedDate(today);
    localStorage.setItem("dailyQuizLastCompleted", today);
    setIsAlreadyCompleted(true);
  };

  if (status === "loading" && !isAlreadyCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p>Generating your daily question...</p>
      </div>
    );
  }
  
  if (isAlreadyCompleted) {
      return (
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">You've completed today's quiz!</h3>
          <p className="text-muted-foreground">Come back tomorrow for a new question.</p>
           <div className="flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-2xl font-bold">{streak}</span>
            <span className="text-muted-foreground">day streak</span>
          </div>
          <Button onClick={() => {
            localStorage.removeItem("dailyQuizLastCompleted");
            setIsAlreadyCompleted(false);
            fetchQuiz();
          }}>Take Again (Dev)</Button>
        </div>
      )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2">
        <Flame className="w-5 h-5 text-orange-400" />
        <span className="font-semibold">{streak} day streak</span>
      </div>
      {quiz && (
        <div className="space-y-4">
          <p className="text-center font-semibold text-lg">{quiz.question}</p>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            disabled={status === "answered"}
          >
            {quiz.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === quiz.correctAnswerIndex;
              
              let stateIndicator = null;
              if (status === 'answered' && isSelected) {
                  stateIndicator = isCorrect ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-destructive" />;
              }
              if (status === 'answered' && !isSelected && isCorrectAnswer) {
                  stateIndicator = <Check className="h-5 w-5 text-green-500" />;
              }

              return (
              <Label
                key={index}
                className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors",
                    status === 'answered' && isCorrectAnswer && "border-green-500 bg-green-500/10",
                    status === 'answered' && isSelected && !isCorrectAnswer && "border-destructive bg-destructive/10",
                    status === 'ready' && "hover:bg-muted"
                )}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <span>{option}</span>
                <div className="ml-auto">{stateIndicator}</div>
              </Label>
            )})}
          </RadioGroup>

          {status === "ready" && (
            <Button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          )}

          {status === "answered" && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className={cn(
                    "text-lg",
                    isCorrect ? "text-green-600" : "text-destructive"
                )}>
                  {isCorrect ? "Correct!" : "Not quite!"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
