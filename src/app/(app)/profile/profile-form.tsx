

"use client";

import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useFirestore, useUser, useMemoFirebase } from "@/firebase/provider";
import { useDoc } from "@/firebase/firestore/use-doc";
import { doc, setDoc } from "firebase/firestore";
import { SettingsContent } from "./settings-content";

const profileSchema = z.object({
  personal: z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    age: z.coerce.number().min(18, "You must be at least 18."),
    gender: z.enum(["Male", "Female", "Other"]),
    phone: z.string().optional(),
    height: z.coerce.number().min(50, "Height must be a positive number."),
    weight: z.coerce.number().min(20, "Weight must be a positive number."),
    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"]),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const [bmi, setBmi] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<ProfileFormData['personal']>(userDocRef);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      personal: {
        name: "",
        email: "",
        age: 0,
        gender: "Male",
        phone: "",
        height: 0,
        weight: 0,
        bloodType: "Unknown",
      },
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({ personal: userProfile });
    } else if (user && !isProfileLoading) { // Check isProfileLoading to avoid race conditions
      form.reset({
        personal: {
          ...form.getValues().personal,
          name: user.displayName || "",
          email: user.email || "",
        }
      });
    }
  }, [user, userProfile, isProfileLoading, form]);


  const watchHeight = form.watch("personal.height");
  const watchWeight = form.watch("personal.weight");
  const watchName = form.watch("personal.name");
  const watchEmail = form.watch("personal.email");
  const userInitials = (watchName || '').split(' ').map(n => n[0]).join('') || (watchEmail || '').charAt(0).toUpperCase();


  useEffect(() => {
    if (watchHeight > 0 && watchWeight > 0) {
      const heightInMeters = watchHeight / 100;
      const calculatedBmi = (watchWeight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(calculatedBmi);
    } else {
      setBmi(null);
    }
  }, [watchHeight, watchWeight]);

  async function onSubmit(data: ProfileFormData) {
    if (!userDocRef) {
      toast({
        variant: "destructive",
        title: "Not Authenticated",
        description: "You must be logged in to save your profile.",
      });
      return;
    }

    setIsSaving(true);
    try {
        await setDoc(userDocRef, data.personal, { merge: true });
        toast({
            title: "Profile Saved!",
            description: "Your personal information has been updated.",
        });
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message || "Could not save profile.",
        });
    } finally {
        setIsSaving(false);
    }
  }

  if (isUserLoading || isProfileLoading) {
    return <div className="flex justify-center items-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="medical">Medical History</TabsTrigger>
        <TabsTrigger value="emergency">Emergency</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="privacy">Data & Privacy</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.photoURL || undefined} alt={watchName} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                 <h3 className="text-xl font-semibold">{watchName}</h3>
                 <p className="text-sm text-muted-foreground">{watchEmail}</p>
                 <Button variant="outline" size="sm" type="button">Change Picture</Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="personal.name" render={({ field }) => (
                    <FormItem> <FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /> </FormItem>
                )} />
                <FormField control={form.control} name="personal.email" render={({ field }) => (
                    <FormItem> <FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} readOnly /></FormControl><FormMessage /> </FormItem>
                )} />
                <FormField control={form.control} name="personal.age" render={({ field }) => (
                    <FormItem> <FormLabel>Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /> </FormItem>
                )} />
                <FormField control={form.control} name="personal.gender" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="personal.height" render={({ field }) => (
                    <FormItem> <FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /> </FormItem>
                )} />
                 <FormField control={form.control} name="personal.weight" render={({ field }) => (
                    <FormItem> <FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /> </FormItem>
                )} />
                <FormField control={form.control} name="personal.bloodType" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blood Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                            <SelectContent>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex items-end">
                    <Card className="w-full">
                        <CardHeader className="p-3">
                            <CardDescription>Calculated BMI</CardDescription>
                            <CardTitle className="text-2xl">{bmi || "N/A"}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="medical">
        <Card className="mt-6">
            <CardHeader><CardTitle>Coming Soon</CardTitle><CardDescription>This feature is under development.</CardDescription></CardHeader>
            <CardContent><p>Manage your medical history, conditions, and allergies here.</p></CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="emergency">
        <Card className="mt-6">
            <CardHeader><CardTitle>Coming Soon</CardTitle><CardDescription>This feature is under development.</CardDescription></CardHeader>
            <CardContent><p>Add and manage your emergency contacts.</p></CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
         <SettingsContent />
      </TabsContent>
      
      <TabsContent value="privacy">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>
              Manage your account data and privacy settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <Button variant="outline">Export My Data</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  );
}
