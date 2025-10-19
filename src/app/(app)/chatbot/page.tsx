
"use client";

import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ChatbotUI = dynamic(() => import('./chatbot-ui').then(mod => mod.ChatbotUI), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col h-full items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ),
});


export default function ChatbotPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Health Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions and get information from our AI health assistant.
        </p>
      </div>
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>
            This is a conversation with an AI health assistant. It can be helpful for
            answering questions and providing information.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ChatbotUI />
        </CardContent>
      </Card>
    </div>
  );
}
