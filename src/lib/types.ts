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

export interface HealthMetric {
  id: string;
  userId: string;
  type: 'Blood Pressure' | 'Glucose' | 'Weight' | 'BMI' | 'Heart Rate';
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

export interface Article {
  id: string;
  title: string;
  category: 'Diabetes' | 'Hypertension' | 'Heart Health' | 'Nutrition';
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
    };
    lifestyle: {
        smoking: 'never' | 'former' | 'current';
        alcohol: 'never' | 'monthly' | 'weekly' | 'daily';
        exercise: 'never' | '1-2' | '3-4' | '5+';
    };
    history: {
        familyHistory: ('diabetes' | 'hypertension' | 'heart-disease')[];
    };
}
