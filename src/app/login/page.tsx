import { AuthTabs } from "@/components/auth-tabs";
import { AuthVisual } from "@/components/auth-visual";

export default function LoginPage() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[700px] bg-card shadow-2xl rounded-2xl overflow-hidden">
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <AuthTabs />
      </div>
      <div className="hidden md:block">
        <AuthVisual />
      </div>
    </div>
  );
}
