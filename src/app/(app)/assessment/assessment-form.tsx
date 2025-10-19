"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { getHealthRecommendations } from "./actions";
import { Loader2, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  personal: z.object({
    age: z.coerce.number().min(18, "You must be at least 18 years old."),
    gender: z.enum(["Male", "Female", "Other"]),
    weight: z.coerce.number().min(20, "Please enter a valid weight."),
    height: z.coerce.number().min(100, "Please enter a valid height in cm."),
  }),
  lifestyle: z.object({
    smoking: z.enum(["never", "former", "current"]),
    alcohol: z.enum(["never", "monthly", "weekly", "daily"]),
    exercise: z.enum(["never", "1-2", "3-4", "5+"]),
  }),
  history: z.object({
    familyHistory: z.array(z.string()),
    conditions: z.string().optional(),
  }),
});

type FormData = z.infer<typeof formSchema>;

export function AssessmentForm() {
  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personal: { age: 30, gender: "Male", weight: 70, height: 175 },
      lifestyle: { smoking: "never", alcohol: "monthly", exercise: "3-4" },
      history: { familyHistory: [], conditions: "" },
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getHealthRecommendations(data);
      setRecommendations(result.recommendations);
      setStep(4);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      // Handle error display
    } finally {
      setIsLoading(false);
    }
  }

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <FormField control={form.control} name="personal.age" render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="personal.gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="personal.weight" render={({ field }) => (
                    <FormItem> <FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="personal.height" render={({ field }) => (
                    <FormItem> <FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lifestyle</h3>
            <FormField control={form.control} name="lifestyle.smoking" render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking Habits</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="former">Former Smoker</SelectItem>
                      <SelectItem value="current">Current Smoker</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="lifestyle.alcohol" render={({ field }) => (
                <FormItem>
                  <FormLabel>Alcohol Consumption</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="monthly">Monthly or less</SelectItem>
                      <SelectItem value="weekly">A few times a week</SelectItem>
                       <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="lifestyle.exercise" render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Exercise</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="1-2">1-2 times a week</SelectItem>
                      <SelectItem value="3-4">3-4 times a week</SelectItem>
                      <SelectItem value="5+">5+ times a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical History</h3>
             <FormField control={form.control} name="history.familyHistory" render={() => (
                <FormItem>
                    <FormLabel>Family History</FormLabel>
                    <FormDescription>Select any conditions that run in your immediate family.</FormDescription>
                    {['diabetes', 'hypertension', 'heart-disease'].map((item) => (
                    <FormField
                        key={item}
                        control={form.control}
                        name="history.familyHistory"
                        render={({ field }) => {
                        return (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                        (value) => value !== item
                                        )
                                    )
                                }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal capitalize">{item.replace('-', ' ')}</FormLabel>
                            </FormItem>
                        )
                        }}
                    />
                    ))}
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField control={form.control} name="history.conditions" render={({ field }) => (
                <FormItem>
                    <FormLabel>Existing Conditions</FormLabel>
                    <FormDescription>List any existing medical conditions you have, separated by commas.</FormDescription>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Sparkles className="text-accent" />
                  Your Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="ml-4">Our AI is generating your recommendations...</p>
                  </div>
                ) : recommendations ? (
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">{recommendations}</div>
                ) : <p>Could not generate recommendations.</p>}
              </CardContent>
            </Card>
            <Button variant="outline" onClick={() => { setStep(1); setRecommendations(null); form.reset(); }}>
                Start Over
            </Button>
          </div>
        )}
        
        <Separator />

        <div className="flex justify-between">
            <div>
            {step > 1 && step < 4 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                Previous
                </Button>
            )}
            </div>
            <div>
            {step < 3 && (
                <Button type="button" onClick={nextStep}>
                Next
                </Button>
            )}
            {step === 3 && (
                <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                    </>
                ) : (
                    "Get Recommendations"
                )}
                </Button>
            )}
            </div>
        </div>

      </form>
    </Form>
  );
}
