import { useState } from "react";
import { AlertTriangle, Search, Filter, Play, Download, RefreshCw, ExternalLink, ChevronRight } from "lucide-react";
import { useVulnerabilityStore } from "@/stores/vulnerabilityStore";
import { SeverityBadge, StatusBadge, ScoreBadge } from "@/components/shared/SeverityBadge";
import Modal from "@/components/shared/Modal";
import { ScanLoader } from "@/components/shared/LoadingSpinner";
import { formatDate } from "@/lib/utils";
import type { Vulnerability } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { VULN_BY_SEVERITY } from "@/constants/mockData";

const PIE_COLORS = ["#EF4444", "#F97316", "#F59E0B", "#22C55E", "#06B6D4"];

export default function Vulnerabilities() {
  const { getFilteredVulnerabilities, filter, setFilter, isScanning, scanProgress, startScan, resolveVulnerability, updateVulnerability } = useVulnerabilityStore();
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);
  const [showScanModal, setShowScanModal] = useState(false);
  const vulns = getFilteredVulnerabilities();

  const stats = {
    critical: vulns.filter((v) => v.severity === "critical").length,
    high: vulns.filter((v) => v.severity === "high").length,
    medium: vulns.filter((v) => v.severity === "medium").length,
    open: vulns.filter((v) => v.status === "open").length,
  };

  const handleScan = async () => {
    setShowScanModal(false);
    await startScan("webapp-portal.techcorp.com");
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Vulnerability Management</h1>
          <p className="section-subheader">Track, prioritize, and remediate security vulnerabilities across your attack surface</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowScanModal(true)} className="cyber-btn-green flex items-center gap-2 text-sm py-2">
            <Play className="w-4 h-4" />
            Run Scan
          </button>
          <button className="cyber-btn-secondary flex items-center gap-2 text-sm py-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Critical", value: stats.critical, color: "text-cyber-red", bg: "bg-cyber-red/10 border-cyber-red/20" },
          { label: "High", value: stats.high, color: "text-cyber-orange", bg: "bg-cyber-orange/10 border-cyber-orange/20" },
          { label: "Medium", value: vulns.filter((v) => v.severity === "medium").length, color: "text-cyber-yellow", bg: "bg-cyber-yellow/10 border-cyber-yellow/20" },
          { label: "Open", value: stats.open, color: "text-cyber-blue", bg: "bg-cyber-blue/10 border-cyber-blue/20" },
        ].map((s) => (
          <div key={s.label} className={`glass-card p-4 border ${s.bg}`}>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-sm text-dark-text mt-1">{s.label} Severity</p>
          </div>
        ))}
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="glass-card border-cyber-green/30 border">
          <ScanLoader progress={scanProgress} />
        </div>
      )}

      {/* Chart + Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-3 text-sm">By Severity</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={VULN_BY_SEVERITY} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                {VULN_BY_SEVERITY.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", fontSize: "12px", color: "#F1F5F9" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {VULN_BY_SEVERITY.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-dark-text capitalize">{d.name}</span>
                </div>
                <span className="font-bold text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 glass-card p-5">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
              <input
                placeholder="Search vulnerabilities..."
                className="input-cyber pl-9"
                value={filter.search}
                onChange={(e) => setFilter({ search: e.target.value })}
              />
            </div>
            <select className="input-cyber w-full sm:w-36" onChange={(e) => setFilter({ severity: e.target.value as Vulnerability["severity"] || undefined })}>
              <option value="">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select className="input-cyber w-full sm:w-36" onChange={(e) => setFilter({ status: e.target.value as Vulnerability["status"] || undefined })}>
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vulnerability</th>
                  <th>Asset</th>
                  <th>Severity</th>
                  <th>CVSS</th>
                  <th>Status</th>
                  <th>Discovered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vulns.map((v) => (
                  <tr key={v.id} className="cursor-pointer" onClick={() => setSelectedVuln(v)}>
                    <td>
                      <div className="max-w-xs">
                        <p className="text-white font-medium text-sm truncate">{v.title}</p>
                        {v.cve && <span className="text-xs text-cyber-blue font-mono">{v.cve}</span>}
                      </div>
                    </td>
                    <td><span className="text-xs font-mono text-dark-text-bright">{v.asset}</span></td>
                    <td><SeverityBadge severity={v.severity} /></td>
                    <td><ScoreBadge score={v.cvssScore} /></td>
                    <td><StatusBadge status={v.status} /></td>
                    <td><span className="text-xs text-dark-text">{formatDate(v.discoveredAt, "relative")}</span></td>
                    <td>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {v.status !== "resolved" && (
                          <button onClick={() => resolveVulnerability(v.id)} className="text-xs text-cyber-green hover:text-cyber-green-light transition-colors">Resolve</button>
                        )}
                        <button onClick={() => updateVulnerability(v.id, { status: "in_progress" })} className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors">Assign</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-dark-text mt-3">{vulns.length} vulnerabilities found</p>
        </div>
      </div>

      {/* Vulnerability Detail Modal */}
      <Modal
        isOpen={!!selectedVuln}
        onClose={() => setSelectedVuln(null)}
        title={selectedVuln?.title || ""}
        subtitle={`${selectedVuln?.asset} · ${selectedVuln?.assetType}`}
        size="lg"
        footer={
          <div className="flex gap-3">
            <button onClick={() => { if (selectedVuln) resolveVulnerability(selectedVuln.id); setSelectedVuln(null); }} className="cyber-btn-green text-sm py-2 px-4">
              Mark Resolved
            </button>
            <button className="cyber-btn-secondary text-sm py-2 px-4 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" /> View in CVE Database
            </button>
          </div>
        }
      >
        {selectedVuln && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <SeverityBadge severity={selectedVuln.severity} />
              <StatusBadge status={selectedVuln.status} />
              <ScoreBadge score={selectedVuln.cvssScore} />
              {selectedVuln.cve && <span className="text-xs font-mono bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 px-2.5 py-0.5 rounded-full">{selectedVuln.cve}</span>}
              {selectedVuln.exploitable && <span className="text-xs bg-cyber-red/20 text-cyber-red border border-cyber-red/30 px-2.5 py-0.5 rounded-full">Actively Exploitable</span>}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Description</h4>
              <p className="text-dark-text text-sm leading-relaxed">{selectedVuln.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Category</p>
                <p className="text-white font-medium">{selectedVuln.category}</p>
              </div>
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Assigned To</p>
                <p className="text-white font-medium">{selectedVuln.assignedTo || "Unassigned"}</p>
              </div>
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Discovered</p>
                <p className="text-white font-medium">{formatDate(selectedVuln.discoveredAt, "long")}</p>
              </div>
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Asset Type</p>
                <p className="text-white font-medium capitalize">{selectedVuln.assetType}</p>
              </div>
            </div>

            <div className="p-4 bg-cyber-green/5 border border-cyber-green/20 rounded-xl">
              <h4 className="text-sm font-semibold text-cyber-green mb-2">Remediation Recommendation</h4>
              <p className="text-dark-text-bright text-sm leading-relaxed">{selectedVuln.recommendation}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Scan Modal */}
      <Modal isOpen={showScanModal} onClose={() => setShowScanModal(false)} title="Launch Vulnerability Scan" size="md">
        <div className="space-y-4">
          <p className="text-dark-text text-sm">Configure and launch an automated vulnerability scan across your assets.</p>
          <div>
            <label className="label-cyber">Scan Target</label>
            <select className="input-cyber">
              <option>webapp-portal.techcorp.com (Web App)</option>
              <option>api.techcorp.com (API)</option>
              <option>prod-server-01 (Server)</option>
              <option>All Production Assets</option>
            </select>
          </div>
          <div>
            <label className="label-cyber">Scan Profile</label>
            <select className="input-cyber">
              <option>Quick Scan (5 min)</option>
              <option>Standard Scan (30 min)</option>
              <option>Full Assessment (2 hours)</option>
              <option>OWASP Top 10 Only</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleScan} className="cyber-btn-green flex-1 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Start Scan
            </button>
            <button onClick={() => setShowScanModal(false)} className="cyber-btn-secondary flex-1">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
