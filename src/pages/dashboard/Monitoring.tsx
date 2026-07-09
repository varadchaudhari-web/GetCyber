import { Eye, Server, Wifi, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { useAssetStore } from "@/stores/assetStore";
import { THREAT_ACTIVITY_DATA } from "@/constants/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { getRiskColor } from "@/lib/utils";

export default function Monitoring() {
  const { assets } = useAssetStore();
  const onlineAssets = assets.filter((a) => a.status === "online");

  return (
    <div className="page-container">
      <h1 className="section-header">Security Monitoring</h1>
      <p className="section-subheader">Real-time monitoring of assets, network traffic, and security events</p>

      {/* Live Status */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Assets Online", value: onlineAssets.length, icon: Server, color: "text-cyber-green" },
          { label: "Active Scans", value: 3, icon: Eye, color: "text-cyber-blue" },
          { label: "Events/Hour", value: "2.4K", icon: Activity, color: "text-cyber-yellow" },
          { label: "Network Anomalies", value: 2, icon: Wifi, color: "text-cyber-orange" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card p-4">
              <Icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-sm text-dark-text mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Live Event Feed */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyber-blue animate-pulse" />
          Live Event Feed
          <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse ml-auto" />
        </h3>
        <div className="space-y-2 font-mono text-xs">
          {[
            { time: "09:23:41", level: "CRITICAL", msg: "SQL Injection attempt blocked — webapp-portal.techcorp.com:443" },
            { time: "09:22:18", level: "HIGH", msg: "Brute force attempt — 1432 failed logins from 185.220.101.x" },
            { time: "09:21:05", level: "MEDIUM", msg: "Unusual outbound traffic detected — WS-042 → 185.220.x.x:4444" },
            { time: "09:20:33", level: "INFO", msg: "Vulnerability scan completed — api.techcorp.com — 15 findings" },
            { time: "09:19:12", level: "HIGH", msg: "Malware signature detected — file: invoice_q3.zip on WS-042" },
            { time: "09:18:44", level: "INFO", msg: "New asset registered — staging-server-02 (10.0.2.11)" },
            { time: "09:17:22", level: "MEDIUM", msg: "SSL certificate expiring in 14 days — mail.techcorp.com" },
            { time: "09:16:09", level: "INFO", msg: "User login — alex.morgan@getcyber.io from 192.168.1.100" },
          ].map((event, i) => {
            const levelColors: Record<string, string> = { CRITICAL: "text-cyber-red", HIGH: "text-cyber-orange", MEDIUM: "text-cyber-yellow", INFO: "text-cyber-green" };
            return (
              <div key={i} className="flex gap-3 p-2.5 bg-dark-card/30 rounded hover:bg-dark-card/60 transition-colors">
                <span className="text-dark-text/60 flex-shrink-0">{event.time}</span>
                <span className={`font-bold flex-shrink-0 w-16 ${levelColors[event.level]}`}>[{event.level}]</span>
                <span className="text-dark-text-bright">{event.msg}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network Activity */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Network Threat Activity (7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={THREAT_ACTIVITY_DATA}>
            <defs>
              <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9" }} />
            <Area type="monotone" dataKey="value" stroke="#2563EB" fill="url(#netGrad)" strokeWidth={2} name="Events" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Asset Health Grid */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Asset Health Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {assets.map((asset) => (
            <div key={asset.id} className="p-3 bg-dark-card/40 border border-dark-border rounded-xl hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-white truncate max-w-[120px]">{asset.name}</p>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${asset.status === "online" ? "bg-cyber-green" : "bg-cyber-red"}`} />
              </div>
              <div className="h-1.5 bg-dark-card rounded-full overflow-hidden mb-1">
                <div className="h-full rounded-full" style={{ width: `${asset.riskScore}%`, background: getRiskColor(asset.riskScore) }} />
              </div>
              <div className="flex justify-between text-[10px] text-dark-text">
                <span>Risk: {asset.riskScore}</span>
                <span>{asset.vulnerabilities} vulns</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
