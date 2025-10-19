import Link from "next/link";
import { Logo } from "@/components/logo";

export function LandingFooter() {
  return (
    <footer id="about" className="bg-muted p-6 md:py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-full md:col-span-2 flex flex-col gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <p className="text-muted-foreground">
            Empowering individuals to take control of their health through technology and education.
          </p>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Product</h3>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="/#pricing" className="hover:underline">Pricing</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Company</h3>
          <Link href="#about" className="hover:underline">About</Link>
          <Link href="/#contact" className="hover:underline">Contact</Link>
          <Link href="/#careers" className="hover:underline">Careers</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link href="/#privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/#terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} WellPath. All rights reserved.
      </div>
    </footer>
  );
}
