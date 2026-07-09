import { getRiskColor, getRiskLabel } from "@/lib/utils";

interface RiskGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function RiskGauge({ score, size = "md", showLabel = true, className = "" }: RiskGaugeProps) {
  const color = getRiskColor(score);
  const label = getRiskLabel(score);

  const sizes = {
    sm: { r: 32, stroke: 6, textSize: "text-lg" },
    md: { r: 52, stroke: 8, textSize: "text-2xl" },
    lg: { r: 72, stroke: 10, textSize: "text-4xl" },
  };

  const { r, stroke, textSize } = sizes[size];
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const svgSize = (r + stroke + 4) * 2;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={r}
            fill="none"
            stroke="#2D3748"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color}80)`,
              transition: "stroke-dashoffset 1s ease-out",
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold text-white ${textSize}`} style={{ color }}>
            {score}
          </span>
          {showLabel && size !== "sm" && (
            <span className="text-xs text-dark-text font-medium">/100</span>
          )}
        </div>
      </div>

      {showLabel && (
        <div className="text-center mt-2">
          <span className="text-sm font-semibold" style={{ color }}>
            {label} Risk
          </span>
        </div>
      )}
    </div>
  );
}
