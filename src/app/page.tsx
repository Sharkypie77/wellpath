import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartPulse, Stethoscope, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";
import { placeholderImages } from "@/lib/data";

const features = [
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: "Health Risk Assessment",
    description: "Our interactive tool helps you understand your health risks and provides personalized recommendations.",
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
    title: "Symptom Checker",
    description: "A guided tool to check your symptoms and receive preliminary guidance on your health.",
  },
  {
    icon: <Syringe className="w-8 h-8 text-primary" />,
    title: "Medication Reminders",
    description: "Never miss a dose with our easy-to-use medication tracking and reminder system.",
  },
];

const testimonials = [
  {
    name: "Sarah J.",
    role: "Working Mom",
    avatar: placeholderImages.find(p => p.id === "testimonial1")?.imageUrl || "",
    avatarFallback: "SJ",
    text: "HealthWise Hub has been a game-changer for managing my family's health. The reminders and educational content are invaluable.",
  },
  {
    name: "David L.",
    role: "Retiree",
    avatar: placeholderImages.find(p => p.id === "testimonial2")?.imageUrl || "",
    avatarFallback: "DL",
    text: "As someone managing a chronic condition, this platform gives me the tools I need to stay on top of my health. It's so empowering!",
  },
  {
    name: "Maria G.",
    role: "Fitness Enthusiast",
    avatar: placeholderImages.find(p => p.id === "testimonial3")?.imageUrl || "",
    avatarFallback: "MG",
    text: "I love tracking my progress and setting new goals. HealthWise Hub makes staying healthy feel rewarding and fun.",
  },
];

export default function LandingPage() {
  const heroImage = placeholderImages.find(p => p.id === "hero");
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <section className="relative w-full pt-20 pb-12 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-primary/10">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground font-headline">
                Your Partner in Preventive Healthcare
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                HealthWise Hub provides the tools and knowledge to take control of your well-being, focusing on prevention and education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/dashboard">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              {heroImage && 
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  fill
                  className="object-cover rounded-xl shadow-2xl"
                  priority
                />
              }
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Tools for a Healthier You</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed with your well-being in mind, offering a suite of features to support your health journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col items-center text-center p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <CardHeader className="p-0">
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Proactive Health Management, Simplified
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From AI-powered recommendations to detailed progress tracking, we empower you to make informed decisions about your health.
              </p>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-accent" />
                  Personalized AI Health Recommendations
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-accent" />
                  Comprehensive Health Education Hub
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-accent" />
                  Seamless Appointment Booking
                </li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                {placeholderImages.find(p => p.id === "feature1") && 
                  <Image
                    src={placeholderImages.find(p => p.id === "feature1")!.imageUrl}
                    width={400}
                    height={600}
                    alt={placeholderImages.find(p => p.id === "feature1")!.description}
                    data-ai-hint={placeholderImages.find(p => p.id === "feature1")!.imageHint}
                    className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover"
                  />
                }
              </div>
              <div className="w-1/2">
                {placeholderImages.find(p => p.id === "feature2") &&
                  <Image
                    src={placeholderImages.find(p => p.id === "feature2")!.imageUrl}
                    width={400}
                    height={600}
                    alt={placeholderImages.find(p => p.id === "feature2")!.description}
                    data-ai-hint={placeholderImages.find(p => p.id === "feature2")!.imageHint}
                    className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover"
                  />
                }
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Trusted by Users Everywhere</h2>
            <p className="max-w-[600px] mx-auto text-center mt-4 text-muted-foreground md:text-xl/relaxed">
              Hear what our community has to say about their journey with HealthWise Hub.
            </p>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="bg-muted/50 border-0">
                  <CardContent className="p-6">
                    <p className="italic">"{testimonial.text}"</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container text-center px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Take the First Step Towards Better Health</h2>
              <p className="text-muted-foreground md:text-xl">
                Join HealthWise Hub today and start your journey to a healthier, more informed life.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard">
                  Create Your Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
