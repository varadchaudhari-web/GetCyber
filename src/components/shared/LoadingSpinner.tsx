import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ size = "md", text, className, fullScreen = false }: LoadingSpinnerProps) {
  const sizes = { sm: "w-6 h-6", md: "w-10 h-10", lg: "w-16 h-16" };

  const spinner = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        <div className={cn("animate-spin rounded-full border-2 border-dark-border border-t-cyber-blue", sizes[size])} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className={cn("text-cyber-blue", size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-7 h-7")} />
        </div>
      </div>
      {text && <p className="text-dark-text text-sm animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-bg/90 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <LoadingSpinner size="md" text="Loading..." />
    </div>
  );
}

export function ScanLoader({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="relative w-20 h-20">
        <div className="animate-spin rounded-full border-2 border-dark-border border-t-cyber-green w-20 h-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cyber-green font-mono text-sm font-bold">{progress}%</span>
        </div>
      </div>
      <div className="w-64">
        <div className="flex justify-between text-xs text-dark-text mb-2">
          <span>Scanning assets...</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-dark-card rounded-full overflow-hidden">
          <div
            className="h-full bg-cyber-green rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-xs text-dark-text text-center font-mono terminal-text animate-pulse">
        {progress < 30 ? "► Initializing scan engine..." :
         progress < 60 ? "► Probing target endpoints..." :
         progress < 90 ? "► Analyzing vulnerabilities..." :
         "► Generating report..."}
      </p>
    </div>
  );
}
