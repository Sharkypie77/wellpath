"use server";

import { generateDailyQuizQuestion } from "@/ai/flows/daily-quiz-flow";
import { DailyQuizQuestionOutput } from "@/lib/types";

export async function getDailyQuizQuestion(): Promise<DailyQuizQuestionOutput> {
  try {
    const result = await generateDailyQuizQuestion();
    return result;
  } catch (error) {
    console.error("Error calling AI flow:", error);
    throw new Error("Failed to get daily quiz question.");
  }
}
