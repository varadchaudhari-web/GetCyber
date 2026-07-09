import { useState } from "react";
import { Lock, CheckCircle, XCircle, AlertTriangle, BarChart3 } from "lucide-react";
import { useComplianceStore } from "@/stores/complianceStore";
import Modal from "@/components/shared/Modal";
import { formatDate } from "@/lib/utils";
import type { ComplianceFramework } from "@/types";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { COMPLIANCE_DATA } from "@/constants/mockData";

export default function Compliance() {
  const { frameworks, selectedFramework, setSelected } = useComplianceStore();
  const [detailModal, setDetailModal] = useState<ComplianceFramework | null>(null);

  const overallScore = Math.round(frameworks.reduce((s, f) => s + f.score, 0) / frameworks.length);

  const statusColors: Record<string, string> = {
    compliant: "text-cyber-green bg-cyber-green/10 border-cyber-green/30",
    partially_compliant: "text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/30",
    non_compliant: "text-cyber-red bg-cyber-red/10 border-cyber-red/30",
  };

  const radarData = COMPLIANCE_DATA.map((d) => ({ subject: d.name, score: d.value }));

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Compliance Management</h1>
          <p className="section-subheader">Manage regulatory frameworks, track controls, and prepare for audits</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-cyber-green">{overallScore}%</p>
          <p className="text-sm text-dark-text">Overall Compliance</p>
        </div>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Compliance Radar</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2D3748" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94A3B8", fontSize: 11 }} />
              <Radar dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #2D3748", borderRadius: "8px", color: "#F1F5F9", fontSize: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-4">Framework Summary</h3>
          <div className="space-y-3">
            {frameworks.map((f) => (
              <div key={f.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white truncate">{f.name}</span>
                    <span className="text-sm font-bold text-white ml-2">{f.score}%</span>
                  </div>
                  <div className="h-1.5 bg-dark-card rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${f.score}%`,
                        background: f.score >= 80 ? "#22C55E" : f.score >= 60 ? "#F59E0B" : "#EF4444",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Framework Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((f) => (
          <div
            key={f.id}
            className="glass-card-hover p-5 cursor-pointer"
            onClick={() => setDetailModal(f)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-white text-sm">{f.name}</h3>
                <p className="text-xs text-dark-text">{f.category}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${statusColors[f.status]}`}>
                {f.status.replace("_", " ")}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-3xl font-black text-white">{f.score}%</span>
                <span className="text-dark-text text-xs mb-1">compliance score</span>
              </div>
              <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${f.score}%`, background: f.score >= 80 ? "#22C55E" : f.score >= 60 ? "#F59E0B" : "#EF4444" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
              <div className="bg-cyber-green/10 border border-cyber-green/20 rounded p-2">
                <p className="font-bold text-cyber-green">{f.passedControls}</p>
                <p className="text-dark-text">Passed</p>
              </div>
              <div className="bg-cyber-red/10 border border-cyber-red/20 rounded p-2">
                <p className="font-bold text-cyber-red">{f.failedControls}</p>
                <p className="text-dark-text">Failed</p>
              </div>
              <div className="bg-dark-card border border-dark-border rounded p-2">
                <p className="font-bold text-dark-text">{f.notApplicable}</p>
                <p className="text-dark-text">N/A</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-dark-text">
              <span>Last assessed: {formatDate(f.lastAssessed, "short")}</span>
              <span>Next: {formatDate(f.nextAudit, "short")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!detailModal}
        onClose={() => setDetailModal(null)}
        title={detailModal?.name || ""}
        subtitle={detailModal?.description}
        size="lg"
      >
        {detailModal && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusColors[detailModal.status]}`}>
                {detailModal.status.replace("_", " ")}
              </span>
              <span className="text-xs bg-dark-card text-dark-text border border-dark-border px-2.5 py-1 rounded-full">
                {detailModal.totalControls} Total Controls
              </span>
              <span className="text-xs bg-dark-card text-dark-text border border-dark-border px-2.5 py-1 rounded-full">
                {detailModal.category}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-cyber-green/10 border border-cyber-green/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-cyber-green mx-auto mb-2" />
                <p className="text-2xl font-black text-cyber-green">{detailModal.passedControls}</p>
                <p className="text-xs text-dark-text">Controls Passed</p>
              </div>
              <div className="text-center p-4 bg-cyber-red/10 border border-cyber-red/20 rounded-xl">
                <XCircle className="w-6 h-6 text-cyber-red mx-auto mb-2" />
                <p className="text-2xl font-black text-cyber-red">{detailModal.failedControls}</p>
                <p className="text-xs text-dark-text">Controls Failed</p>
              </div>
              <div className="text-center p-4 bg-dark-card border border-dark-border rounded-xl">
                <AlertTriangle className="w-6 h-6 text-dark-text mx-auto mb-2" />
                <p className="text-2xl font-black text-dark-text">{detailModal.notApplicable}</p>
                <p className="text-xs text-dark-text">Not Applicable</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Last Assessed</p>
                <p className="text-white font-medium">{formatDate(detailModal.lastAssessed, "long")}</p>
              </div>
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Next Audit</p>
                <p className="text-white font-medium">{formatDate(detailModal.nextAudit, "long")}</p>
              </div>
            </div>

            <div className="p-4 bg-cyber-blue/5 border border-cyber-blue/20 rounded-xl">
              <h4 className="text-sm font-semibold text-cyber-blue mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Improvement Recommendations
              </h4>
              <ul className="space-y-1">
                {["Review and update access control policies", "Implement additional logging for privileged accounts", "Complete missing evidence for audit trail", "Schedule remediation for failed controls"].map((r) => (
                  <li key={r} className="text-xs text-dark-text-bright flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue flex-shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
