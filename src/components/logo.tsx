import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--accent))" }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--primary))" }} />
          </linearGradient>
        </defs>
        <path
          d="M4 20C4 17.2667 6.66667 15.3333 9 14C11.3333 12.6667 12.5 10 14 10C15.5 10 16.6667 12.6667 19 14C21.3333 15.3333 24 17.2667 24 20"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 10C12.5 10 10.5 7.5 10.5 6C10.5 4.5 12 2.5 14 2.5C16 2.5 17.5 4.5 17.5 6C17.5 7.5 15.5 10 14 10Z"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 25.5L14 18"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 22.5L16.5 22.5"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline text-xl font-bold">WellPath</span>
    </div>
  );
}
