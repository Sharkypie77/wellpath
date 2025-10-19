'use server';

/**
 * @fileOverview A flow to generate a daily health quiz question.
 *
 * - generateDailyQuizQuestion - A function that generates a single multiple-choice health question.
 */

import { ai } from '@/ai/genkit';
import {
  DailyQuizQuestionInputSchema,
  DailyQuizQuestionOutputSchema,
  type DailyQuizQuestionInput,
  type DailyQuizQuestionOutput,
} from '@/lib/types';

export async function generateDailyQuizQuestion(
  input?: DailyQuizQuestionInput
): Promise<DailyQuizQuestionOutput> {
  return dailyQuizQuestionFlow(input || {});
}

const prompt = ai.definePrompt({
  name: 'dailyQuizQuestionPrompt',
  input: { schema: DailyQuizQuestionInputSchema },
  output: { schema: DailyQuizQuestionOutputSchema },
  prompt: `Generate a single, unique, multiple-choice quiz question on the topic of health, wellness, or medicine.
The question should be interesting and not something commonly known.
Provide 4 plausible options, with only one being correct.
Also provide a brief explanation for the correct answer.`,
});


const dailyQuizQuestionFlow = ai.defineFlow(
  {
    name: 'dailyQuizQuestionFlow',
    inputSchema: DailyQuizQuestionInputSchema,
    outputSchema: DailyQuizQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
