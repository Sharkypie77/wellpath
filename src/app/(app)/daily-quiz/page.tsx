import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DailyQuiz } from "./daily-quiz";

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
