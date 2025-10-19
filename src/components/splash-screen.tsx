
"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

interface SplashScreenProps {
  onFinished: () => void;
}

export function SplashScreen({ onFinished }: SplashScreenProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      onFinished();
    }, 2800); // Duration of the splash screen

    return () => clearTimeout(timer);
  }, [onFinished]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background animate-fade-out" style={{animationDelay: '2.5s', animationFillMode: 'forwards'}}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
            <div className="animate-pulse-glow" style={{animationDelay: '1s'}}>
                <Logo />
            </div>
        </div>
        <p className="text-lg text-muted-foreground animate-fade-in" style={{animationDelay: '0.7s'}}>
          Your Path to Better Health
        </p>
        <div className="flex space-x-2 animate-fade-in" style={{animationDelay: '1.2s'}}>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
       <div className="absolute bottom-8 text-sm text-muted-foreground animate-fade-in" style={{animationDelay: '1.5s'}}>
        Created by Hemanth Allam
      </div>
    </div>
  );
}
