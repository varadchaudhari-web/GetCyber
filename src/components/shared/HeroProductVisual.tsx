import { useState, useEffect, useRef } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  Globe,
  Radio,
  Lock,
  ArrowUpRight,
  TrendingDown,
  Server,
} from "lucide-react";

export default function HeroProductVisual() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeAlert, setActiveAlert] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Rotate active alert highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto perspective-1200 transition-all duration-300"
      style={{
        transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Soft Glow Mesh */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyber-blue/20 via-cyber-cyan/15 to-cyber-green/15 rounded-3xl blur-2xl opacity-60 pointer-events-none -z-10" />

      {/* Main Glassmorphic SOC Console Window */}
      <div className="rounded-[22px] bg-[#0A0F1D]/85 backdrop-blur-2xl border border-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden group">
        {/* Top subtle laser stroke */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-80" />

        {/* Window Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/80" />
            <span className="ml-2 text-xs font-mono text-slate-300 font-medium">
              GC-SOC // COMMAND CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-[10px] font-mono text-cyber-green">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span>AUTONOMOUS ACTIVE</span>
          </div>
        </div>

        {/* Threat Posture Ring & Key SOC Stats */}
        <div className="grid grid-cols-12 gap-3.5 mb-4">
          {/* Circular Posture Gauge */}
          <div className="col-span-5 p-3.5 rounded-2xl bg-[#05070F]/80 border border-white/5 flex flex-col items-center justify-center text-center">
            <div className="relative w-20 h-20 flex items-center justify-center mb-1.5">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyber-green"
                  strokeDasharray="88, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-white font-mono">88</span>
                <span className="text-[9px] uppercase font-mono text-slate-400">Score</span>
              </div>
            </div>
            <p className="text-[11px] font-bold text-white">Posture: Optimal</p>
            <p className="text-[9px] text-cyber-green font-mono">0 Critical Zero-Days</p>
          </div>

          {/* Quick Metrics */}
          <div className="col-span-7 flex flex-col justify-between gap-2">
            <div className="p-3 rounded-xl bg-[#05070F]/80 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-mono text-slate-400">Mean Time to Remediate</p>
                <p className="text-sm font-black text-white font-mono mt-0.5">14.2 Seconds</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center text-[10px] font-mono text-cyber-green bg-cyber-green/10 border border-cyber-green/30 px-1.5 py-0.5 rounded">
                  <TrendingDown className="w-3 h-3 mr-0.5" /> -86% MTTR
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#05070F]/80 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-mono text-slate-400">Attack Surface</p>
                <p className="text-sm font-black text-white font-mono mt-0.5">1,280 Endpoints</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center text-[10px] font-mono text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/30 px-1.5 py-0.5 rounded">
                  <Shield className="w-3 h-3 mr-0.5" /> 100% Sealed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Threat Stream Feed */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5 uppercase font-semibold text-slate-300">
              <Activity className="w-3.5 h-3.5 text-cyber-blue" />
              Live Telemetry & Threat Stream
            </span>
            <span>Real-time</span>
          </div>

          {[
            {
              id: 0,
              type: "Zero-Day Exploit Blocked",
              target: "api-gateway.prod / CVE-2026-4019",
              action: "Auto-Quarantine & WAF Rule Applied",
              color: "text-cyber-green border-cyber-green/30 bg-cyber-green/10",
              tag: "NEUTRALIZED",
            },
            {
              id: 1,
              type: "Credential Stuffing Mitigated",
              target: "Auth Cluster // 1,420 Failed Attempts",
              action: "FIDO2 Enforced & IP Blacklisted",
              color: "text-cyber-blue border-cyber-blue/30 bg-cyber-blue/10",
              tag: "ISOLATED",
            },
            {
              id: 2,
              type: "Lateral Movement Intercepted",
              target: "Host win-srv-04 // SeDebugPrivilege",
              action: "Kerberos Ticket Revoked in 1.2s",
              color: "text-cyber-purple border-cyber-purple/30 bg-cyber-purple/10",
              tag: "TERMINATED",
            },
          ].map((item) => (
            <div
              key={item.id}
              className={`p-2.5 rounded-xl border transition-all duration-300 text-xs flex items-center justify-between ${
                activeAlert === item.id
                  ? "bg-[#0E1628] border-cyber-blue/50 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                  : "bg-[#05070F]/60 border-white/5 opacity-80"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeAlert === item.id ? "bg-cyber-blue animate-pulse" : "bg-slate-500"
                  }`}
                />
                <div>
                  <p className="font-semibold text-white text-[11px]">{item.type}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{item.target}</p>
                </div>
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${item.color}`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Mini World Threat Map Graphic Footer */}
        <div className="p-3 rounded-xl bg-[#05070F]/90 border border-white/5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyber-cyan" />
            <span className="text-[11px] text-slate-300">180+ Global SOC Points of Presence</span>
          </div>
          <span className="text-[10px] text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 px-2 py-0.5 rounded-full">
            Latency 8ms
          </span>
        </div>
      </div>
    </div>
  );
}
