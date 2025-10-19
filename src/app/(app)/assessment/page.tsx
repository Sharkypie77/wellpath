import { AssessmentForm } from "./assessment-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
