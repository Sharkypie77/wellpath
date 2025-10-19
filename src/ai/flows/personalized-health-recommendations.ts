'use server';

/**
 * @fileOverview A flow to provide personalized health recommendations based on user data.
 *
 * - personalizedHealthRecommendations - A function that generates personalized health recommendations.
 * - PersonalizedHealthRecommendationsInput - The input type for the personalizedHealthRecommendations function.
 * - PersonalizedHealthRecommendationsOutput - The return type for the personalizedHealthRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthRecommendationsInputSchema = z.object({
  healthRiskAssessmentResults: z.string().describe('The results from the health risk assessment.'),
  healthMetrics: z.string().describe('The user health metrics such as blood pressure, glucose, weight, and BMI.'),
  medicalHistory: z.string().describe('The user medical history including conditions, medications, and allergies.'),
});
export type PersonalizedHealthRecommendationsInput = z.infer<typeof PersonalizedHealthRecommendationsInputSchema>;

const PersonalizedHealthRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('Personalized health recommendations based on the provided information.'),
});
export type PersonalizedHealthRecommendationsOutput = z.infer<typeof PersonalizedHealthRecommendationsOutputSchema>;

export async function personalizedHealthRecommendations(
  input: PersonalizedHealthRecommendationsInput
): Promise<PersonalizedHealthRecommendationsOutput> {
  return personalizedHealthRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHealthRecommendationsPrompt',
  input: {schema: PersonalizedHealthRecommendationsInputSchema},
  output: {schema: PersonalizedHealthRecommendationsOutputSchema},
  prompt: `You are an AI health assistant providing personalized health recommendations to users.

  Based on the user's health risk assessment results, health metrics, and medical history, generate personalized health recommendations.

  Health Risk Assessment Results: {{{healthRiskAssessmentResults}}}
  Health Metrics: {{{healthMetrics}}}
  Medical History: {{{medicalHistory}}}

  Provide clear, actionable, and concise recommendations. Focus on preventive measures and lifestyle adjustments.
  Return the recommendations in the following format:
  {{recommendations}}`,
});

const personalizedHealthRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedHealthRecommendationsFlow',
    inputSchema: PersonalizedHealthRecommendationsInputSchema,
    outputSchema: PersonalizedHealthRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
