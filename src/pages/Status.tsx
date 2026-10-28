import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const services = [
  { name: "API Gateway", status: "operational" },
  { name: "Web Dashboard", status: "operational" },
  { name: "Scan Engine", status: "operational" },
  { name: "Threat Intelligence Feed", status: "operational" },
  { name: "AI Engine (GC-AI)", status: "operational" },
  { name: "Notification Service", status: "degraded" },
  { name: "Report Generation", status: "operational" },
  { name: "Authentication Service", status: "operational" },
];

const incidents = [
  { date: "Jul 9, 2026", title: "Notification Service Degraded Performance", status: "investigating", desc: "Some users may experience delayed email notifications. Our team is investigating." },
  { date: "Jul 5, 2026", title: "Scheduled Maintenance — Database Upgrade", status: "resolved", desc: "Successfully completed database upgrade with zero data loss. All systems operational." },
];

export default function Status() {
  const allOperational = services.every((s) => s.status === "operational");
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            Live Infrastructure Posture
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
            GetCyber Cloud Status
          </h1>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-mono ${
            allOperational ? "bg-cyber-green/10 border border-cyber-green/30 text-cyber-green shadow-glow-green" : "bg-cyber-yellow/10 border border-cyber-yellow/30 text-cyber-yellow"
          }`}>
            {allOperational ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {allOperational ? "All Global Systems Operational · 99.99% Uptime" : "Partial System Degradation"}
          </div>
        </div>

        <div className="p-7 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 shadow-2xl mb-8">
          <h2 className="font-display font-bold text-white mb-5 text-lg flex items-center justify-between">
            <span>Core Subsystem Health</span>
            <span className="text-xs font-mono text-dark-text font-normal">Real-Time Telemetry</span>
          </h2>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3.5 bg-[#05070F]/80 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <span className="text-sm font-medium text-dark-text-bright">{s.name}</span>
                <div className="flex items-center gap-2 font-mono">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.status === "operational" ? "bg-cyber-green shadow-glow-green" : "bg-cyber-yellow animate-pulse"}`} />
                  <span className={`text-xs capitalize font-medium ${s.status === "operational" ? "text-cyber-green" : "text-cyber-yellow"}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-7 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h2 className="font-display font-bold text-white mb-5 text-lg">Historical Incident Log</h2>
          <div className="space-y-5">
            {incidents.map((inc) => (
              <div key={inc.title} className="border-l-2 border-cyber-blue/60 pl-4 py-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-dark-text" />
                  <span className="text-xs text-dark-text font-mono">{inc.date}</span>
                  <span className={`text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded-full ${
                    inc.status === "resolved" ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20" : "bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/20"
                  }`}>{inc.status}</span>
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-1">{inc.title}</h3>
                <p className="text-dark-text text-xs leading-relaxed">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
