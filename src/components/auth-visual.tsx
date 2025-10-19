import { HeartPulse, ShieldCheck, Zap } from "lucide-react";

export function AuthVisual() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-primary/20 via-background to-background p-12 flex flex-col justify-between overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-72 h-72 bg-accent/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[30%] right-[10%] w-60 h-60 bg-secondary/20 rounded-full filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold font-headline text-foreground">
          Your Path to Better Health Starts Here
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Join WellPath to gain AI-powered insights, track your wellness journey, and receive personalized care plans.
        </p>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-card rounded-xl shadow-sm">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AI-Powered Health Insights</h3>
            <p className="text-sm text-muted-foreground">Get personalized recommendations based on your data.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-card rounded-xl shadow-sm">
            <HeartPulse className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Track Your Wellness Journey</h3>
            <p className="text-sm text-muted-foreground">Monitor metrics, set goals, and see your progress.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-card rounded-xl shadow-sm">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Personalized Care Plans</h3>
            <p className="text-sm text-muted-foreground">Work with providers to create a plan that's right for you.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: -2s;
        }
        .animation-delay-4000 {
          animation-delay: -4s;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 40px) scale(0.9); }
          75% { transform: translate(30px, -10px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
