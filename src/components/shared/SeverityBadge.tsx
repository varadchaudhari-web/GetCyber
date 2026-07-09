import { cn, getSeverityClass, getStatusClass, formatStatusLabel } from "@/lib/utils";
import type { SeverityLevel, StatusType } from "@/types";

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <span className={cn(getSeverityClass(severity), "capitalize", className)}>
      {severity}
    </span>
  );
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(getStatusClass(status), className)}>
      {formatStatusLabel(status)}
    </span>
  );
}

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const getScoreClass = (s: number) => {
    if (s >= 9) return "bg-cyber-red/20 text-cyber-red border border-cyber-red/30";
    if (s >= 7) return "bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30";
    if (s >= 4) return "bg-cyber-yellow/20 text-cyber-yellow border border-cyber-yellow/30";
    return "bg-cyber-green/20 text-cyber-green border border-cyber-green/30";
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold font-mono", getScoreClass(score), className)}>
      {score.toFixed(1)}
    </span>
  );
}
