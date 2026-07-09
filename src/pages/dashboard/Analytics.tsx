import { BarChart3, TrendingUp, TrendingDown, Download } from "lucide-react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { COMPLIANCE_DATA, ASSET_BY_TYPE, VULN_BY_SEVERITY } from "@/constants/mockData";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts";

const COLORS = ["#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316"];

const monthlyData = [
  { month: "Jan", vulns: 180, incidents: 14, resolved: 160, riskScore: 82 },
  { month: "Feb", vulns: 165, incidents: 11, resolved: 150, riskScore: 78 },
  { month: "Mar", vulns: 172, incidents: 13, resolved: 155, riskScore: 80 },
  { month: "Apr", vulns: 158, incidents: 9, resolved: 148, riskScore: 75 },
  { month: "May", vulns: 155, incidents: 8, resolved: 145, riskScore: 72 },
  { month: "Jun", vulns: 150, incidents: 9, resolved: 142, riskScore: 71 },
  { month: "Jul", vulns: 147, incidents: 8, resolved: 130, riskScore: 68 },
];

const kpis = [
  { title: "MTTR (Mean Time to Resolve)", value: "4.2 hours", trend: -18, color: "text-cyber-green", desc: "vs last month" },
  { title: "MTTD (Mean Time to Detect)", value: "1.8 min", trend: -31, color: "text-cyber-green", desc: "vs last month" },
  { title: "Vulnerability Closure Rate", value: "87%", trend: 5, color: "text-cyber-blue", desc: "vs last month" },
  { title: "False Positive Rate", value: "2.3%", trend: -8, color: "text-cyber-green", desc: "vs last month" },
  { title: "Security Incidents (MTD)", value: "8", trend: 14, color: "text-cyber-red", desc: "vs last month" },
  { title: "Compliance Score", value: "82%", trend: 3, color: "text-cyber-blue", desc: "vs last month" },
];

export default function Analytics() {
  const { riskTrend } = useDashboardStore();

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Security Analytics</h1>
          <p className="section-subheader">Visualize security trends, KPIs, and executive-level insights</p>
        </div>
        <button className="cyber-btn-secondary flex items-center gap-2 text-sm py-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="glass-card p-4">
            <p className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-dark-text mt-1 leading-tight">{kpi.title}</p>
            <div className={`flex items-center gap-1 mt-2 text-xs ${kpi.trend < 0 ? "text-cyber-green" : "text-cyber-red"}`}>
              {kpi.trend < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
              {Math.abs(kpi.trend)}% {kpi.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Trend */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Monthly Security Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="vulnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9" }} />
            <Legend formatter={(val) => <span style={{ color: "#94A3B8", fontSize: "11px" }}>{val}</span>} />
            <Area type="monotone" dataKey="vulns" stroke="#EF4444" fill="url(#vulnGrad)" strokeWidth={2} name="Open Vulns" />
            <Area type="monotone" dataKey="resolved" stroke="#22C55E" fill="url(#resolvedGrad)" strokeWidth={2} name="Resolved" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Score Line */}
        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Risk Score Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9" }} />
              <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: "#EF4444", r: 4 }} name="Risk Score" />
              <Line type="monotone" dataKey="value2" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 4 }} name="Security Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vulnerability Distribution */}
        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Vulnerability Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={VULN_BY_SEVERITY} layout="vertical">
              <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={55} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9" }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {VULN_BY_SEVERITY.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Comparison */}
        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Compliance by Framework</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={COMPLIANCE_DATA}>
              <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {COMPLIANCE_DATA.map((entry) => <Cell key={entry.name} fill={entry.color || "#2563EB"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Types */}
        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Assets by Type</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={ASSET_BY_TYPE} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={45}>
                  {ASSET_BY_TYPE.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", fontSize: "12px", color: "#F1F5F9" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {ASSET_BY_TYPE.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-dark-text text-xs">{d.name}</span>
                  </div>
                  <span className="font-bold text-white text-xs">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
