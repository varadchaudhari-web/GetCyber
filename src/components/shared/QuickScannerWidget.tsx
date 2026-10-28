import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield, AlertTriangle, CheckCircle, ArrowRight, Loader2, Terminal, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function QuickScannerWidget() {
  const [domain, setDomain] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    target: string;
    score: number;
    issues: { level: string; text: string }[];
    ip: string;
    sslStatus: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleRunScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      toast.error("Please enter a domain or IP address to scan.");
      return;
    }

    setIsScanning(true);
    setScanResult(null);

    // Simulate real-time dynamic cyber reconnaissance
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        target: domain.replace(/^(https?:\/\/)/, "").replace(/\/$/, ""),
        score: 78,
        ip: "104.21.58.192 (Edge Protected)",
        sslStatus: "TLS 1.3 Active (256-bit GCM)",
        issues: [
          { level: "high", text: "Missing Content-Security-Policy (CSP) enforcement" },
          { level: "medium", text: "Exposed API endpoint /v1/health lacking rate-limiting" },
          { level: "low", text: "Server header leaks backend technology signature" },
        ],
      });
      toast.success("Surface reconnaissance complete! 3 potential vectors identified.");
    }, 1800);
  };

  return (
    <div className="w-full max-w-2xl bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl mt-4 mb-6 relative overflow-hidden group">
      {/* Top subtle glow edge */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-75" />

      {/* Animated scan line across widget when active */}
      {isScanning && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/10 to-transparent pointer-events-none animate-scan-line z-10" />
      )}

      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-mono text-cyber-blue font-semibold flex items-center gap-1.5 uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" /> Instant Attack Surface Reconnaissance
        </span>
        <span className="text-slate-400 font-mono text-[11px] hidden sm:flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
          Sensor Engine Active
        </span>
      </div>

      <form onSubmit={handleRunScan} className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Enter domain or IP (e.g. acme.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={isScanning}
              className="w-full bg-[#05070F]/90 border border-white/10 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/40 text-xs sm:text-sm text-white placeholder-slate-400 pl-10 pr-3 py-2.5 rounded-xl outline-none font-mono transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className="cyber-btn-primary whitespace-nowrap text-xs sm:text-sm py-2.5 px-6 flex items-center justify-center gap-2 font-bold shadow-glow-blue"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Scanning Target...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Analyze Surface</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 font-medium pl-1 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyber-green" />
          <span>No signup required · Results in 30 seconds</span>
        </p>
      </form>

      {/* Results Drawer */}
      {scanResult && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#05070F]/90 p-3.5 rounded-xl border border-white/10">
            <div>
              <p className="text-xs text-slate-400 font-mono">
                Target Asset: <span className="text-white font-bold">{scanResult.target}</span>
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {scanResult.ip} • {scanResult.sslStatus}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Posture Score:</span>
              <span className="text-sm sm:text-base font-black font-mono text-cyber-yellow bg-cyber-yellow/10 border border-cyber-yellow/30 px-2.5 py-0.5 rounded-lg">
                {scanResult.score}/100
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            {scanResult.issues.map((issue, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#0E1527] border border-white/5"
              >
                <span className="text-slate-300 flex items-center gap-2">
                  <AlertTriangle
                    className={`w-3.5 h-3.5 ${
                      issue.level === "high" ? "text-cyber-red" : "text-cyber-yellow"
                    }`}
                  />
                  {issue.text}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                    issue.level === "high"
                      ? "text-cyber-red border-cyber-red/30 bg-cyber-red/10"
                      : "text-cyber-yellow border-cyber-yellow/30 bg-cyber-yellow/10"
                  }`}
                >
                  {issue.level}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={() => navigate("/register")}
              className="text-xs font-semibold text-cyber-blue hover:text-white flex items-center gap-1.5 group"
            >
              <span>Remediate vulnerabilities in full dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
