import { useEffect, useRef } from "react";
import { Terminal, ShieldAlert, Radio } from "lucide-react";
import { initFeed } from "@/lib/effects/threatFeed";

export default function LiveThreatFeed() {
  const feedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!feedRef.current) return;
    const cleanup = initFeed(feedRef.current);
    return () => cleanup();
  }, []);

  return (
    <div className="glass-card overflow-hidden border border-white/10 shadow-2xl bg-[#0b1222]/90 backdrop-blur-xl">
      {/* Header bar */}
      <div className="bg-[#070b16] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-[#4d8dff]" />
          <span className="font-mono text-xs font-semibold text-white tracking-wide">
            LIVE_THREAT_STREAM // TELEMETRY_INGEST
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[#31d0aa] animate-pulse" />
          <span className="text-[11px] font-mono text-[#31d0aa] font-medium uppercase">
            STREAM ACTIVE
          </span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={feedRef}
        className="divide-y divide-white/5 min-h-[320px] max-h-[360px] overflow-hidden"
      >
        {/* Rows will be populated and dynamically prepended by initFeed */}
      </div>

      {/* Footer bar */}
      <div className="bg-[#070b16]/80 px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#93a2c4]">
        <span className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#ff6b81]" />
          Zero-Day Heuristics Enabled
        </span>
        <span className="text-white/40">SOC Engine v4.8.2</span>
      </div>
    </div>
  );
}
