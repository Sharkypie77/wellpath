
"use client";

import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

const AssessmentForm = dynamic(() => import('./assessment-form').then(mod => mod.AssessmentForm), { 
  ssr: false,
  loading: () => <AssessmentFormSkeleton />
});

function AssessmentFormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
       <div className="flex justify-end">
         <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}


export default function AssessmentPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Health Risk Assessment
          </CardTitle>
          <CardDescription>
            Answer a few questions about your lifestyle and medical history to
            receive personalized health recommendations from our AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssessmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
