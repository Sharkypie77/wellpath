import {z} from 'genkit';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number; // in cm
  weight: number; // in kg
  bloodType?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
}

export type HealthMetricType = 'Blood Pressure' | 'Glucose' | 'Weight' | 'BMI' | 'Heart Rate';

export interface HealthMetric {
  id: string;
  userId: string;
  type: HealthMetricType;
  value: number | { systolic: number; diastolic: number };
  unit: string;
  timestamp: Date;
  notes?: string;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  reminders: Date[];
  instructions: string;
}

export interface Appointment {
  id: string;
  userId: string;
  providerId: string;
  providerName: string;
  providerSpecialty: string;
  type: 'Telemedicine' | 'In-Person';
  dateTime: Date;
  duration: number; // in minutes
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export type ArticleCategory = 'Diabetes' | 'Hypertension' | 'Heart Health' | 'Nutrition' | 'Exercise';

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  readTime: number; // in minutes
  author: string;
  publishDate: Date;
  tags: string[];
}

export interface HealthRiskAssessment {
    personal: {
        age: number;
        gender: 'Male' | 'Female' | 'Other';
        weight: number;
        height: number;
    };
    lifestyle: {
        smoking: 'never' | 'former' | 'current';
        alcohol: 'never' | 'monthly' | 'weekly' | 'daily';
        exercise: 'never' | '1-2' | '3-4' | '5+';
    };
    history: {
        familyHistory: string[];
        conditions?: string;
    };
}


export const ChatbotMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatbotMessage = z.infer<typeof ChatbotMessageSchema>;

export const ChatbotInputSchema = z.object({
  history: z.array(ChatbotMessageSchema),
  prompt: z.string(),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  response: z.string(),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;


export const DailyQuizQuestionInputSchema = z.object({});
export type DailyQuizQuestionInput = z.infer<typeof DailyQuizQuestionInputSchema>;

export const DailyQuizQuestionOutputSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of 4 possible answers.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The index of the correct answer in the options array.'),
  explanation: z.string().describe('A brief explanation of the correct answer.'),
});
export type DailyQuizQuestionOutput = z.infer<typeof DailyQuizQuestionOutputSchema>;

// New types for the new Dashboard
export type MetricStatus = 'Normal' | 'Warning' | 'Alert';
export type Trend = 'up' | 'down' | 'stable';

export interface DashboardMetric {
  type: HealthMetricType;
  value: string;
  unit: string;
  status: MetricStatus;
  trend: Trend;
}
