"use server";

import {
  personalizedHealthRecommendations,
  type PersonalizedHealthRecommendationsInput,
} from "@/ai/flows/personalized-health-recommendations";
import { HealthRiskAssessment } from "@/lib/types";

export async function getHealthRecommendations(
  data: Omit<HealthRiskAssessment, 'personal'> & { personal: HealthRiskAssessment['personal'] & { weight: number; height: number } }
): Promise<{ recommendations: string }> {
  const { personal, lifestyle, history } = data;

  const bmi = (personal.weight / (personal.height / 100) ** 2).toFixed(1);

  const healthMetrics = `Weight: ${personal.weight}kg, Height: ${personal.height}cm, BMI: ${bmi}`;
  const healthRiskAssessmentResults = `Lifestyle Info - Smoking: ${lifestyle.smoking}, Alcohol: ${lifestyle.alcohol}, Exercise: ${lifestyle.exercise} times/week.`;
  const medicalHistory = `Family History: ${
    history.familyHistory.join(", ") || "None"
  }. Personal Conditions: ${history.conditions || "None"}.`;

  const input: PersonalizedHealthRecommendationsInput = {
    healthRiskAssessmentResults,
    healthMetrics,
    medicalHistory,
  };

  try {
    const result = await personalizedHealthRecommendations(input);
    return result;
  } catch (error) {
    console.error("Error calling AI flow:", error);
    throw new Error("Failed to get health recommendations.");
  }
}
