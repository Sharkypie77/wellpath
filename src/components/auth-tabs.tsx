"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "./logo"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/firebase"
import {
  initiateEmailSignIn,
  initiateEmailSignUp,
} from "@/firebase/non-blocking-login"
import { Github, Linkedin, Mail } from "lucide-react"


const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
  remember: z.boolean().default(false),
})

const signupSchema = z
  .object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    agree: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  })

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
        <path d="M10 2c1 .5 2 2 2 5" />
      </svg>
    )
}
  
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15.5 15.5L12 12l-3.5 3.5" />
            <path d="M8.5 8.5L12 12l3.5-3.5" />
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
}

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const auth = useAuth()

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  })

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", agree: false },
  })

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    try {
      initiateEmailSignIn(auth, values.email, values.password);
      toast({
        title: "Login Attempted",
        description: "Check your authentication state.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      initiateEmailSignUp(auth, values.email, values.password);
      toast({
        title: "Signup Successful",
        description: "Your account has been created.",
      });
      setActiveTab("login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <Logo />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="flex-1 flex flex-col">
          <div className="text-center my-6">
            <h2 className="text-2xl font-bold font-headline">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">Enter your credentials to access your account.</p>
          </div>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField control={loginForm.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="name@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={loginForm.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                          {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField control={loginForm.control} name="remember" render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                <Link href="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-auto pt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <Button variant="outline" className="w-full"><GoogleIcon className="mr-2" />Continue with Google</Button>
              <Button variant="outline" className="w-full"><AppleIcon className="mr-2" />Continue with Apple</Button>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account? <Button variant="link" className="p-0" onClick={() => setActiveTab("signup")}>Sign up</Button>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="signup" className="flex-1 flex flex-col">
           <div className="text-center my-6">
            <h2 className="text-2xl font-bold font-headline">Create an Account</h2>
            <p className="text-muted-foreground text-sm">Start your journey to better health today.</p>
          </div>
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <FormField control={signupForm.control} name="fullName" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField control={signupForm.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="name@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField control={signupForm.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                         <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                          {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField control={signupForm.control} name="confirmPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField control={signupForm.control} name="agree" render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="grid gap-1 leading-none">
                        <FormLabel>I agree to the <Link href="#" className="text-primary hover:underline">Terms</Link> & <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.</FormLabel>
                        <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </Form>
           <div className="mt-auto pt-6">
             <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Button variant="link" className="p-0" onClick={() => setActiveTab("login")}>Login</Button>
            </p>
           </div>
        </TabsContent>
      </Tabs>
      <div className="text-center text-xs text-muted-foreground mt-4">
        <p>Built by Hemanth Allam | Powered by React & Genkit</p>
        <div className="flex items-center justify-center space-x-2 mt-1">
          <Link href="https://www.linkedin.com/in/hemanth-allam77777777777/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary hover:scale-110 transition-transform">
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link href="https://github.com/Sharkypie77" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary hover:scale-110 transition-transform">
            <Github className="w-4 h-4" />
          </Link>
          <Link href="mailto:hemanthallam1@gmail.com" className="text-gray-600 hover:text-primary hover:scale-110 transition-transform">
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
