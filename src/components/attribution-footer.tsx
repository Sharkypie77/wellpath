import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function AttributionFooter() {
  return (
    <footer className="py-4 px-6 text-center bg-background border-t">
      <div className="flex items-center justify-center space-x-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Created with <span className="text-primary">❤️</span> by Hemanth Allam
        </p>
        <div className="flex items-center space-x-2">
          <Link href="https://www.linkedin.com/in/hemanth-allam77777777777/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary hover:scale-110 transition-transform">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://github.com/Sharkypie77" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary hover:scale-110 transition-transform">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="mailto:hemanthallam1@gmail.com" className="text-gray-600 hover:text-primary hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
