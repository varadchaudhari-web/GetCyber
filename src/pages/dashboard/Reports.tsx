import { useState } from "react";
import { FileText, Download, Plus, Eye, Calendar, Shield, AlertTriangle, Lock, BarChart3, CheckCircle } from "lucide-react";
import Modal from "@/components/shared/Modal";

const REPORT_TYPES = [
  { id: "executive", title: "Executive Security Summary", desc: "C-level overview of security posture, risk, and key metrics", icon: BarChart3, color: "text-cyber-blue", bg: "bg-cyber-blue/10" },
  { id: "vulnerability", title: "Vulnerability Assessment Report", desc: "Detailed findings, CVSS scores, and remediation guidance", icon: AlertTriangle, color: "text-cyber-red", bg: "bg-cyber-red/10" },
  { id: "incident", title: "Incident Response Report", desc: "Incident timeline, RCA, and lessons learned", icon: Shield, color: "text-cyber-orange", bg: "bg-cyber-orange/10" },
  { id: "compliance", title: "Compliance Status Report", desc: "Framework compliance scores, gaps, and audit readiness", icon: Lock, color: "text-cyber-green", bg: "bg-cyber-green/10" },
  { id: "pentest", title: "Penetration Test Report", desc: "Scope, methodology, findings, and remediation plan", icon: FileText, color: "text-cyber-purple", bg: "bg-cyber-purple/10" },
  { id: "threat", title: "Threat Intelligence Report", desc: "Threat landscape, active IOCs, and recommended mitigations", icon: Eye, color: "text-cyber-yellow", bg: "bg-cyber-yellow/10" },
];

const RECENT_REPORTS = [
  { id: 1, name: "Q3 2026 Executive Security Summary", type: "Executive", generated: "2026-07-09", size: "2.4 MB", status: "ready" },
  { id: 2, name: "Vulnerability Assessment — July 2026", type: "Vulnerability", generated: "2026-07-08", size: "5.1 MB", status: "ready" },
  { id: 3, name: "ISO 27001 Compliance Report Q2", type: "Compliance", generated: "2026-06-30", size: "3.8 MB", status: "ready" },
  { id: 4, name: "Incident Report — INC-001 Ransomware", type: "Incident", generated: "2026-07-09", size: "1.2 MB", status: "generating" },
  { id: 5, name: "Q3 External Pen Test — Interim", type: "PenTest", generated: "2026-07-07", size: "8.6 MB", status: "ready" },
];

export default function Reports() {
  const [generateModal, setGenerateModal] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Security Reports</h1>
          <p className="section-subheader">Generate professional PDF reports for executives, auditors, and compliance teams</p>
        </div>
        <button onClick={() => setGenerateModal("executive")} className="cyber-btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="w-4 h-4" /> Generate Report
        </button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORT_TYPES.map((rt) => {
          const Icon = rt.icon;
          return (
            <button
              key={rt.id}
              onClick={() => { setGenerateModal(rt.id); setGenerated(false); }}
              className="glass-card-hover p-5 text-left group"
            >
              <div className={`w-10 h-10 ${rt.bg} rounded-xl flex items-center justify-center mb-3 border border-white/5`}>
                <Icon className={`w-5 h-5 ${rt.color}`} />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{rt.title}</h3>
              <p className="text-dark-text text-xs leading-relaxed">{rt.desc}</p>
              <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${rt.color}`}>
                Generate Report →
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Reports */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyber-blue" /> Recent Reports
        </h3>
        <div className="space-y-3">
          {RECENT_REPORTS.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 bg-dark-card/40 border border-dark-border rounded-xl hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-cyber-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{r.name}</p>
                  <p className="text-xs text-dark-text">{r.type} · {r.size} · {r.generated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {r.status === "ready" ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-cyber-green" />
                    <button className="cyber-btn-secondary flex items-center gap-1.5 text-xs py-1.5 px-3">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-cyber-yellow flex items-center gap-1.5 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-cyber-yellow animate-pulse" />
                    Generating...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Modal */}
      <Modal
        isOpen={!!generateModal}
        onClose={() => { setGenerateModal(null); setGenerated(false); setGenerating(false); }}
        title="Generate Security Report"
        subtitle="Configure your report parameters"
        size="md"
      >
        {!generated ? (
          <div className="space-y-4">
            <div><label className="label-cyber">Report Type</label>
              <select className="input-cyber" defaultValue={generateModal || "executive"}>
                {REPORT_TYPES.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
            </div>
            <div><label className="label-cyber">Organization</label><input className="input-cyber" defaultValue="TechCorp Industries" readOnly /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label-cyber">From Date</label><input type="date" className="input-cyber" defaultValue="2026-06-01" /></div>
              <div><label className="label-cyber">To Date</label><input type="date" className="input-cyber" defaultValue="2026-07-09" /></div>
            </div>
            <div><label className="label-cyber">Include Sections</label>
              <div className="space-y-2 mt-1">
                {["Executive Summary", "Risk Score Analysis", "Vulnerability Details", "Incident Summary", "Compliance Status", "Recommendations"].map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-dark-border" />
                    <span className="text-sm text-dark-text-bright">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleGenerate} disabled={generating} className="cyber-btn-primary flex-1 flex items-center justify-center gap-2">
                {generating ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating PDF...</>) : (<><FileText className="w-4 h-4" />Generate PDF Report</>)}
              </button>
              <button onClick={() => setGenerateModal(null)} className="cyber-btn-secondary">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-cyber-green mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Report Generated!</h3>
            <p className="text-dark-text text-sm mb-6">Your security report is ready with professional letterhead, watermarks, and pagination.</p>
            <div className="flex gap-3 justify-center">
              <button className="cyber-btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button onClick={() => { setGenerateModal(null); setGenerated(false); }} className="cyber-btn-secondary">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
