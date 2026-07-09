import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: number;
  trendLabel?: string;
  onClick?: () => void;
  className?: string;
  valueColor?: string;
  badge?: string;
  badgeColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-cyber-blue",
  iconBg = "bg-cyber-blue/10",
  trend,
  trendLabel,
  onClick,
  className,
  valueColor,
  badge,
  badgeColor = "bg-dark-card text-dark-text",
}: StatCardProps) {
  const isPositiveTrend = trend !== undefined && trend > 0;
  const isNegativeTrend = trend !== undefined && trend < 0;

  return (
    <div
      className={cn("stat-card", onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border border-white/5", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {badge && (
          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", badgeColor)}>
            {badge}
          </span>
        )}
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            isPositiveTrend ? "text-cyber-green bg-cyber-green/10" :
            isNegativeTrend ? "text-cyber-red bg-cyber-red/10" :
            "text-dark-text bg-dark-card"
          )}>
            {isPositiveTrend ? <TrendingUp className="w-3 h-3" /> :
             isNegativeTrend ? <TrendingDown className="w-3 h-3" /> :
             <Minus className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div>
        <p className={cn("text-3xl font-bold mb-1", valueColor || "text-white")}>
          {value}
        </p>
        <p className="text-sm font-medium text-dark-text-bright">{title}</p>
        {(subtitle || trendLabel) && (
          <p className="text-xs text-dark-text mt-1">{subtitle || trendLabel}</p>
        )}
      </div>
    </div>
  );
}
