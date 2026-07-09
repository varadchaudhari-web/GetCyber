import { Settings, Users, Building2, Key, Activity, Shield, AlertTriangle, BarChart3, Cpu } from "lucide-react";
import { TEAM_MEMBERS, MOCK_ORGANIZATION } from "@/constants/mockData";
import { formatDate, formatRoleLabel } from "@/lib/utils";

const AUDIT_LOGS = [
  { id: 1, user: "Alex Morgan", action: "Vulnerability Resolved", resource: "vuln_006", timestamp: "2026-07-09T09:15:00Z", ip: "192.168.1.100" },
  { id: 2, user: "Sarah Chen", action: "Incident Created", resource: "inc_001", timestamp: "2026-07-09T07:30:00Z", ip: "192.168.1.105" },
  { id: 3, user: "Platform System", action: "Scan Completed", resource: "webapp-portal", timestamp: "2026-07-09T06:00:00Z", ip: "10.0.0.1" },
  { id: 4, user: "Mike Johnson", action: "Compliance Assessment", resource: "ISO-27001", timestamp: "2026-07-08T17:00:00Z", ip: "192.168.1.102" },
  { id: 5, user: "Elena Vasquez", action: "User Invited", resource: "newuser@techcorp.com", timestamp: "2026-07-08T14:00:00Z", ip: "192.168.1.108" },
];

const PLATFORM_HEALTH = [
  { service: "API Gateway", status: "operational", uptime: "99.99%", latency: "12ms" },
  { service: "Scan Engine", status: "operational", uptime: "99.95%", latency: "–" },
  { service: "Threat Intel Feed", status: "operational", uptime: "99.98%", latency: "8ms" },
  { service: "AI Engine (GC-AI)", status: "operational", uptime: "99.90%", latency: "180ms" },
  { service: "Database Cluster", status: "operational", uptime: "99.99%", latency: "3ms" },
  { service: "Notification Service", status: "degraded", uptime: "98.50%", latency: "250ms" },
];

export default function Administration() {
  return (
    <div className="page-container">
      <h1 className="section-header">Administration</h1>
      <p className="section-subheader">Platform administration, user management, audit logs, and system health</p>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: TEAM_MEMBERS.length, icon: Users, color: "text-cyber-blue" },
          { label: "Organizations", value: 1, icon: Building2, color: "text-cyber-green" },
          { label: "API Keys Active", value: 2, icon: Key, color: "text-cyber-purple" },
          { label: "Audit Events Today", value: 47, icon: Activity, color: "text-cyber-yellow" },
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

      {/* Platform Health */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyber-green" /> Platform Health
        </h3>
        <div className="space-y-3">
          {PLATFORM_HEALTH.map((s) => (
            <div key={s.service} className="flex items-center justify-between p-3 bg-dark-card/40 border border-dark-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.status === "operational" ? "bg-cyber-green" : s.status === "degraded" ? "bg-cyber-yellow animate-pulse" : "bg-cyber-red"}`} />
                <div>
                  <p className="text-sm font-medium text-white">{s.service}</p>
                  <p className="text-xs text-dark-text capitalize">{s.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs text-dark-text">
                <span>Uptime: <span className="text-cyber-green font-semibold">{s.uptime}</span></span>
                <span>Latency: <span className="text-white">{s.latency}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyber-blue" /> User Management
          </h3>
          <button className="cyber-btn-primary text-sm py-2">+ Invite User</button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>MFA</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {TEAM_MEMBERS.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-white">{m.name}</p>
                        <p className="text-xs text-dark-text">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="text-xs bg-dark-card border border-dark-border text-dark-text-bright px-2 py-0.5 rounded">{formatRoleLabel(m.role)}</span></td>
                  <td><span className="text-xs text-dark-text">{m.department}</span></td>
                  <td>{m.mfaEnabled ? <span className="text-xs text-cyber-green">✓ Enabled</span> : <span className="text-xs text-cyber-red">✗ Disabled</span>}</td>
                  <td><span className="text-xs text-dark-text">{formatDate(m.lastActive, "relative")}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors">Edit</button>
                      <button className="text-xs text-cyber-red hover:text-cyber-red transition-colors">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyber-yellow" /> Audit Logs
          </h3>
          <button className="cyber-btn-secondary text-sm py-2 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" /> Export Logs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Resource</th>
                <th>IP Address</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_LOGS.map((log) => (
                <tr key={log.id}>
                  <td><span className="text-sm text-white">{log.user}</span></td>
                  <td><span className="text-sm text-dark-text-bright">{log.action}</span></td>
                  <td><span className="text-xs font-mono text-cyber-blue">{log.resource}</span></td>
                  <td><span className="text-xs font-mono text-dark-text">{log.ip}</span></td>
                  <td><span className="text-xs text-dark-text">{formatDate(log.timestamp, "relative")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Flags */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-cyber-purple" /> Feature Flags
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "AI Assistant (GC-AI)", enabled: true },
            { name: "Dark Web Monitoring", enabled: true },
            { name: "Auto-Remediation Playbooks", enabled: false },
            { name: "Red Team Operations Module", enabled: true },
            { name: "Advanced SIEM Integration", enabled: false },
            { name: "Phishing Simulation", enabled: true },
          ].map((flag) => (
            <div key={flag.name} className="flex items-center justify-between p-3 bg-dark-card/40 border border-dark-border rounded-lg">
              <span className="text-sm font-medium text-white">{flag.name}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={flag.enabled} className="sr-only peer" />
                <div className="w-9 h-5 bg-dark-card border border-dark-border rounded-full peer peer-checked:bg-cyber-blue peer-checked:border-cyber-blue transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
