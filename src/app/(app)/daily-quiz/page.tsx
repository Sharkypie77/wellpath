
"use client";

import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

const DailyQuiz = dynamic(() => import('./daily-quiz').then(mod => mod.DailyQuiz), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p>Loading quiz...</p>
    </div>
  )
});


export default function DailyQuizPage() {
  return (
    <div className="max-w-2xl mx-auto">
       <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Daily Health Quiz</h1>
        <p className="text-muted-foreground">
          Test your knowledge and build a healthy habit streak!
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Today's Question</CardTitle>
          <CardDescription>
            Answer today's question to maintain your streak. A new question appears every 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DailyQuiz />
        </CardContent>
      </Card>
    </div>
  );
}
