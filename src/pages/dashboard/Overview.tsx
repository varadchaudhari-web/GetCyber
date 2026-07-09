import { useNavigate } from "react-router-dom";
import { AlertTriangle, Shield, Activity, Zap, Database, Lock, BarChart3, RefreshCw, TrendingDown } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useVulnerabilityStore } from "@/stores/vulnerabilityStore";
import { useIncidentStore } from "@/stores/incidentStore";
import { useThreatStore } from "@/stores/threatStore";
import StatCard from "@/components/shared/StatCard";
import RiskGauge from "@/components/shared/RiskGauge";
import { SeverityBadge, StatusBadge } from "@/components/shared/SeverityBadge";
import { formatDate } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { VULN_BY_SEVERITY } from "@/constants/mockData";

const CHART_COLORS = ["#EF4444", "#F97316", "#F59E0B", "#22C55E", "#06B6D4"];

export default function Overview() {
  const { user } = useAuthStore();
  const { stats, riskTrend, threatActivity, isRefreshing, lastUpdated, refreshDashboard } = useDashboardStore();
  const { vulnerabilities } = useVulnerabilityStore();
  const { incidents } = useIncidentStore();
  const { threats } = useThreatStore();
  const navigate = useNavigate();

  const recentVulns = vulnerabilities.slice(0, 5);
  const recentIncidents = incidents.slice(0, 4);
  const criticalThreats = threats.filter((t) => t.severity === "critical").slice(0, 3);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">
            Good morning, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="section-subheader">
            Security Operations Center — {user?.organizationName || "Personal Workspace"}
          </p>
        </div>
        <button
          onClick={() => refreshDashboard()}
          disabled={isRefreshing}
          className="cyber-btn-secondary flex items-center gap-2 text-sm py-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Critical Alert Banner */}
      {stats.criticalVulnerabilities > 0 && (
        <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-cyber-red flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              {stats.criticalVulnerabilities} Critical Vulnerabilities Require Immediate Attention
            </p>
            <p className="text-dark-text text-xs">Including active exploits in production systems — immediate remediation recommended</p>
          </div>
          <button onClick={() => navigate("/dashboard/vulnerabilities")} className="cyber-btn-danger text-xs py-1.5 px-3 whitespace-nowrap">
            View Now
          </button>
        </div>
      )}

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Open Vulnerabilities"
          value={stats.openVulnerabilities}
          icon={AlertTriangle}
          iconColor="text-cyber-red"
          iconBg="bg-cyber-red/10"
          badge={`${stats.criticalVulnerabilities} Critical`}
          badgeColor="severity-critical"
          onClick={() => navigate("/dashboard/vulnerabilities")}
        />
        <StatCard
          title="Active Incidents"
          value={stats.openIncidents}
          icon={Zap}
          iconColor="text-cyber-orange"
          iconBg="bg-cyber-orange/10"
          badge="P1/P2 Open"
          badgeColor="severity-high"
          onClick={() => navigate("/dashboard/incidents")}
        />
        <StatCard
          title="Threat Alerts"
          value={stats.activeThreats}
          icon={Activity}
          iconColor="text-cyber-purple"
          iconBg="bg-cyber-purple/10"
          trend={-8}
          onClick={() => navigate("/dashboard/threats")}
        />
        <StatCard
          title="Total Assets"
          value={stats.totalAssets}
          icon={Database}
          iconColor="text-cyber-cyan"
          iconBg="bg-cyber-cyan/10"
          trend={5}
          onClick={() => navigate("/dashboard/assets")}
        />
      </div>

      {/* Second row stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Security Score"
          value={`${stats.securityScore}%`}
          icon={Shield}
          iconColor="text-cyber-blue"
          iconBg="bg-cyber-blue/10"
          trend={stats.riskTrend}
        />
        <StatCard
          title="Compliance Score"
          value={`${stats.complianceScore}%`}
          icon={Lock}
          iconColor="text-cyber-green"
          iconBg="bg-cyber-green/10"
          badge="ISO + SOC2 + NIST"
          badgeColor="bg-cyber-green/10 text-cyber-green border border-cyber-green/20"
          onClick={() => navigate("/dashboard/compliance")}
        />
        <StatCard
          title="Patch Compliance"
          value={`${stats.patchCompliance}%`}
          icon={RefreshCw}
          iconColor="text-cyber-yellow"
          iconBg="bg-cyber-yellow/10"
          trend={-3}
        />
        <StatCard
          title="Training Completion"
          value={`${stats.trainingCompletion}%`}
          icon={BarChart3}
          iconColor="text-cyber-cyan"
          iconBg="bg-cyber-cyan/10"
          trend={7}
          onClick={() => navigate("/dashboard/training")}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Trend */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white">Risk Score Trend</h3>
              <p className="text-xs text-dark-text">Risk score vs Security score (7 months)</p>
            </div>
            <div className="flex items-center gap-1 text-cyber-green text-xs">
              <TrendingDown className="w-3.5 h-3.5" />
              Improving
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={riskTrend}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="secGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9" }} />
              <Area type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} fill="url(#riskGrad)" name="Risk" />
              <Area type="monotone" dataKey="value2" stroke="#22C55E" strokeWidth={2} fill="url(#secGrad)" name="Security" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Gauge + Vuln Pie */}
        <div className="glass-card p-6 flex flex-col items-center">
          <h3 className="font-bold text-white mb-4 self-start">Overall Risk Posture</h3>
          <RiskGauge score={stats.riskScore} size="lg" />
          <div className="w-full mt-6">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={VULN_BY_SEVERITY} dataKey="value" cx="50%" cy="50%" outerRadius={50} innerRadius={30}>
                  {VULN_BY_SEVERITY.map((entry, i) => (
                    <Cell key={i} fill={CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-1 mt-2">
              {VULN_BY_SEVERITY.map((d, i) => (
                <div key={d.name} className="text-center">
                  <p className="text-xs font-bold" style={{ color: CHART_COLORS[i] }}>{d.value}</p>
                  <p className="text-[10px] text-dark-text capitalize">{d.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vulnerabilities */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Vulnerabilities</h3>
            <button onClick={() => navigate("/dashboard/vulnerabilities")} className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors">View all →</button>
          </div>
          <div className="space-y-3">
            {recentVulns.map((v) => (
              <div key={v.id} className="flex items-center justify-between p-3 bg-dark-card/40 rounded-lg border border-dark-border/50 hover:border-cyber-blue/30 transition-all cursor-pointer group">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-medium text-white truncate group-hover:text-cyber-blue transition-colors">{v.title}</p>
                  <p className="text-xs text-dark-text truncate">{v.asset}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <SeverityBadge severity={v.severity} />
                  <span className="text-xs font-mono text-dark-text">{v.cvssScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Active Incidents</h3>
            <button onClick={() => navigate("/dashboard/incidents")} className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors">View all →</button>
          </div>
          <div className="space-y-3">
            {recentIncidents.map((inc) => (
              <div key={inc.id} className="flex items-center justify-between p-3 bg-dark-card/40 rounded-lg border border-dark-border/50 hover:border-cyber-blue/30 transition-all cursor-pointer group">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-medium text-white truncate group-hover:text-cyber-blue transition-colors">{inc.title}</p>
                  <p className="text-xs text-dark-text">{formatDate(inc.createdAt, "relative")} · {inc.assignedTo}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <SeverityBadge severity={inc.severity} />
                  <StatusBadge status={inc.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Activity Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-white">Threat Activity (Last 7 Days)</h3>
            <p className="text-xs text-dark-text">Threats detected vs incidents created</p>
          </div>
          <button onClick={() => navigate("/dashboard/threats")} className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors">View Intel →</button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={threatActivity} barGap={4}>
            <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9" }} />
            <Legend formatter={(val) => <span style={{ color: "#94A3B8", fontSize: "11px" }}>{val}</span>} />
            <Bar dataKey="value" fill="#2563EB" radius={[3, 3, 0, 0]} name="Threats" />
            <Bar dataKey="value2" fill="#EF4444" radius={[3, 3, 0, 0]} name="Incidents" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Run Vulnerability Scan", icon: AlertTriangle, color: "text-cyber-red", path: "/dashboard/vulnerabilities" },
            { label: "Create Incident", icon: Zap, color: "text-cyber-orange", path: "/dashboard/incidents" },
            { label: "Check Threat Feed", icon: Activity, color: "text-cyber-purple", path: "/dashboard/threats" },
            { label: "Generate Report", icon: BarChart3, color: "text-cyber-blue", path: "/dashboard/reports" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="glass-card-hover p-4 text-center flex flex-col items-center gap-2 cursor-pointer"
              >
                <Icon className={`w-6 h-6 ${action.color}`} />
                <span className="text-xs text-dark-text-bright font-medium leading-tight">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-dark-text text-center">Last updated: {formatDate(lastUpdated, "relative")}</p>
    </div>
  );
}
