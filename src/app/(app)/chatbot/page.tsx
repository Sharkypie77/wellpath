import { ChatbotUI } from './chatbot-ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ChatbotPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Chatbot</h1>
        <p className="text-muted-foreground">
          Ask questions and get information from our AI assistant.
        </p>
      </div>
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>
            This is a conversation with an AI assistant. It can be helpful for
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
