import { Blocks, Code2, GitBranch, Terminal, Coffee } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-gray-400">
              <Code2 className="size-6" />
              <Terminal className="size-6" />
              <span className="text-lg">Built for developers, by developers</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Coffee className="size-5" />
              <span className="text-base">Fueled by coffee and semicolons;</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 text-gray-500">
              <GitBranch className="size-5" />
              <span className="text-base">main • v1.0.0</span>
            </div>
            <div className="flex items-center gap-8">
              <Link 
                href="/support" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base"
              >
                Support
              </Link>
              <Link 
                href="/docs" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base"
              >
                Docs
              </Link>
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;