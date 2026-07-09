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
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-4">Platform Status</h1>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${allOperational ? "bg-cyber-green/10 border border-cyber-green/30 text-cyber-green" : "bg-cyber-yellow/10 border border-cyber-yellow/30 text-cyber-yellow"}`}>
            {allOperational ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {allOperational ? "All Systems Operational" : "Partial System Degradation"}
          </div>
        </div>
        <div className="glass-card p-6 mb-6">
          <h2 className="font-bold text-white mb-4">Service Status</h2>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 bg-dark-card/40 rounded-lg border border-dark-border">
                <span className="text-sm text-dark-text-bright">{s.name}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.status === "operational" ? "bg-cyber-green" : "bg-cyber-yellow animate-pulse"}`} />
                  <span className={`text-xs font-medium capitalize ${s.status === "operational" ? "text-cyber-green" : "text-cyber-yellow"}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h2 className="font-bold text-white mb-4">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((inc) => (
              <div key={inc.title} className="border-l-2 border-cyber-blue pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-dark-text" />
                  <span className="text-xs text-dark-text">{inc.date}</span>
                  <span className={`text-xs font-semibold capitalize ${inc.status === "resolved" ? "text-cyber-green" : "text-cyber-yellow"}`}>{inc.status}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{inc.title}</h3>
                <p className="text-dark-text text-xs">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
