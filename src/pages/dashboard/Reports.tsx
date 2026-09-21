import { useState } from "react";
import { FileText, Download, Plus, Eye, Calendar, Shield, AlertTriangle, Lock, BarChart3, CheckCircle } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { generateGetCyberPDF, GeneratePdfOptions } from "@/lib/exportPdf";

const REPORT_TYPES = [
  { id: "executive", title: "Executive Security Summary", desc: "C-level overview of security posture, risk, and key metrics", icon: BarChart3, color: "text-cyber-blue", bg: "bg-cyber-blue/10" },
  { id: "vulnerability", title: "Vulnerability Assessment Report", desc: "Detailed findings, CVSS scores, and remediation guidance", icon: AlertTriangle, color: "text-cyber-red", bg: "bg-cyber-red/10" },
  { id: "incident", title: "Incident Response Report", desc: "Incident timeline, RCA, and lessons learned", icon: Shield, color: "text-cyber-orange", bg: "bg-cyber-orange/10" },
  { id: "compliance", title: "Compliance Status Report", desc: "Framework compliance scores, gaps, and audit readiness", icon: Lock, color: "text-cyber-green", bg: "bg-cyber-green/10" },
  { id: "pentest", title: "Penetration Test Report", desc: "Scope, methodology, findings, and remediation plan", icon: FileText, color: "text-cyber-purple", bg: "bg-cyber-purple/10" },
  { id: "threat", title: "Threat Intelligence Report", desc: "Threat landscape, active IOCs, and recommended mitigations", icon: Eye, color: "text-cyber-yellow", bg: "bg-cyber-yellow/10" },
];

const RECENT_REPORTS = [
  { id: 1, name: "Q3 2026 Executive Security Summary", type: "executive", generated: "2026-07-09", size: "2.4 MB", status: "ready" },
  { id: 2, name: "Vulnerability Assessment — July 2026", type: "vulnerability", generated: "2026-07-08", size: "5.1 MB", status: "ready" },
  { id: 3, name: "ISO 27001 Compliance Report Q2", type: "compliance", generated: "2026-06-30", size: "3.8 MB", status: "ready" },
  { id: 4, name: "Incident Report — INC-001 Ransomware", type: "incident", generated: "2026-07-09", size: "1.2 MB", status: "ready" },
  { id: 5, name: "Q3 External Pen Test — Interim", type: "pentest", generated: "2026-07-07", size: "8.6 MB", status: "ready" },
];

export default function Reports() {
  const [generateModal, setGenerateModal] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("executive");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const getReportConfig = (type: string): GeneratePdfOptions => {
    switch (type) {
      case "vulnerability":
        return {
          filename: `GetCyber_Vulnerability_Assessment_${new Date().toISOString().split("T")[0]}`,
          meta: {
            title: "Vulnerability Assessment & Exposure Audit",
            subtitle: "CVSS v3.1 Technical Findings & Patch Prioritization",
            classification: "CONFIDENTIAL",
            organization: "TechCorp Industries",
          },
          executiveSummary: "Assessment of 148 digital assets identified 12 actionable vulnerabilities. Zero active exploits detected in core production infrastructure; 2 critical items scheduled for immediate hotfix.",
          sections: [
            {
              title: "Severity Breakdown",
              metrics: [
                { label: "Critical Findings", value: 2, color: [239, 68, 68] },
                { label: "High Severity", value: 4, color: [249, 115, 22] },
                { label: "Medium / Low", value: 6, color: [34, 197, 94] },
                { label: "Remediated", value: 98, color: [37, 99, 235] },
              ],
            },
            {
              title: "Vulnerability Register",
              columns: [
                { header: "CVE ID", key: "cve", width: 30 },
                { header: "Title", key: "title", width: 62 },
                { header: "Asset Target", key: "asset", width: 44 },
                { header: "CVSS", key: "cvss", width: 14, align: "center" },
                { header: "Severity", key: "severity", width: 18, align: "center" },
                { header: "Status", key: "status", width: 14, align: "center" },
              ],
              rows: [
                { cve: "CVE-2026-2189", title: "SQL Injection in Auth Gateway", asset: "auth.techcorp.com", cvss: "9.8", severity: "CRITICAL", status: "OPEN" },
                { cve: "CVE-2026-1044", title: "Remote Code Execution via Logback", asset: "api.techcorp.com", cvss: "9.4", severity: "CRITICAL", status: "OPEN" },
                { cve: "CVE-2026-0891", title: "Privilege Escalation via JWT Replay", asset: "app.techcorp.com", cvss: "8.1", severity: "HIGH", status: "OPEN" },
                { cve: "CVE-2025-4920", title: "Cross-Site Scripting (Reflected)", asset: "portal.techcorp.com", cvss: "6.5", severity: "MEDIUM", status: "RESOLVED" },
                { cve: "CVE-2025-3318", title: "TLS 1.0/1.1 Deprecated Cipher Suite", asset: "mail.techcorp.com", cvss: "5.3", severity: "MEDIUM", status: "RESOLVED" },
              ],
            },
          ],
        };
      case "incident":
        return {
          filename: `GetCyber_Incident_Response_Report_${new Date().toISOString().split("T")[0]}`,
          meta: {
            title: "Security Incident Response & Forensic Audit",
            subtitle: "Threat Containment, Root Cause Analysis & MTTR Benchmarks",
            classification: "TOP SECRET",
            organization: "TechCorp Industries",
          },
          executiveSummary: "SOC investigation into unauthorized lateral movement attempt on AWS Kubernetes cluster. The threat vector was successfully contained within 18 minutes with zero data exfiltration.",
          sections: [
            {
              title: "Response Key Performance Indicators",
              metrics: [
                { label: "Active Incidents", value: 1, color: [249, 115, 22] },
                { label: "Resolved (30d)", value: 14, color: [34, 197, 94] },
                { label: "Mean Time to Detect", value: "4.2 min", color: [37, 99, 235] },
                { label: "Mean Time to Contain", value: "18.0 min", color: [6, 182, 212] },
              ],
            },
            {
              title: "Incident Incident Log & Timeline",
              columns: [
                { header: "Incident ID", key: "id", width: 26 },
                { header: "Threat Classification", key: "title", width: 66 },
                { header: "Lead Analyst", key: "owner", width: 36 },
                { header: "Severity", key: "severity", width: 22, align: "center" },
                { header: "Status", key: "status", width: 32, align: "center" },
              ],
              rows: [
                { id: "INC-2026-001", title: "LockBit 3.0 Ransomware Beacon Blocked", owner: "Alex Morgan", severity: "CRITICAL", status: "CONTAINED" },
                { id: "INC-2026-002", title: "Distributed SYN Flood on Primary DNS", owner: "Sarah Chen", severity: "HIGH", status: "RESOLVED" },
                { id: "INC-2026-003", title: "Suspicious PowerShell Invocations on Host", owner: "David Wilson", severity: "HIGH", status: "RESOLVED" },
                { id: "INC-2026-004", title: "Multiple Failed SSH Brute Force Attempts", owner: "System SOC", severity: "MEDIUM", status: "RESOLVED" },
              ],
            },
          ],
        };
      case "compliance":
        return {
          filename: `GetCyber_Compliance_Audit_Report_${new Date().toISOString().split("T")[0]}`,
          meta: {
            title: "Regulatory Compliance & Security Framework Audit",
            subtitle: "ISO 27001:2022, SOC 2 Type II, NIST CSF 2.0 & HIPAA Audit Posture",
            classification: "CONFIDENTIAL",
            organization: "TechCorp Industries",
          },
          executiveSummary: "Overall compliance readiness score is 82.4%. All core security controls for SOC 2 Type II and ISO 27001 meet or exceed audit thresholds. Action items identified for third-party vendor review.",
          sections: [
            {
              title: "Framework Scores",
              metrics: [
                { label: "ISO 27001", value: "92%", color: [34, 197, 94] },
                { label: "SOC 2 Type II", value: "88%", color: [37, 99, 235] },
                { label: "NIST CSF", value: "84%", color: [6, 182, 212] },
                { label: "HIPAA Security", value: "79%", color: [249, 115, 22] },
              ],
            },
            {
              title: "Audit Controls Status",
              columns: [
                { header: "Control ID", key: "id", width: 28 },
                { header: "Control Description", key: "title", width: 72 },
                { header: "Framework", key: "framework", width: 30 },
                { header: "Status", key: "status", width: 26, align: "center" },
                { header: "Score", key: "score", width: 26, align: "center" },
              ],
              rows: [
                { id: "AC-1.1", title: "Multi-Factor Authentication on All Admin Endpoints", framework: "SOC 2 / ISO", status: "PASS", score: "100%" },
                { id: "CR-2.4", title: "Data-at-Rest AES-256 GCM Storage Encryption", framework: "NIST / HIPAA", status: "PASS", score: "100%" },
                { id: "IR-3.2", title: "Automated Incident Escalation & Forensics", framework: "ISO 27001", status: "PASS", score: "94%" },
                { id: "TP-4.1", title: "Third-Party SaaS Vendor Security Risk Review", framework: "SOC 2", status: "IN PROGRESS", score: "68%" },
              ],
            },
          ],
        };
      case "pentest":
        return {
          filename: `GetCyber_Penetration_Testing_Summary_${new Date().toISOString().split("T")[0]}`,
          meta: {
            title: "Offensive Security & Penetration Testing Report",
            subtitle: "Black-Box & Grey-Box Red Team Assessment Findings",
            classification: "RESTRICTED",
            organization: "TechCorp Industries",
          },
          executiveSummary: "Red Team penetration test executed across external web apps and internal API networks. Attackers successfully validated 1 high-risk bypass vector, now patched and confirmed secure.",
          sections: [
            {
              title: "Engagement Overview",
              metrics: [
                { label: "Tested Endpoints", value: "340+", color: [37, 99, 235] },
                { label: "Exploits Validated", value: 3, color: [239, 68, 68] },
                { label: "Patches Confirmed", value: 3, color: [34, 197, 94] },
                { label: "Defensive Rating", value: "A- Grade", color: [6, 182, 212] },
              ],
            },
            {
              title: "Exploitation Findings",
              columns: [
                { header: "Finding ID", key: "id", width: 28 },
                { header: "Attack Vector", key: "title", width: 68 },
                { header: "Target Scope", key: "target", width: 40 },
                { header: "Severity", key: "severity", width: 22, align: "center" },
                { header: "Result", key: "result", width: 24, align: "center" },
              ],
              rows: [
                { id: "PT-001", title: "GraphQL Introspection & Unauthorized Querying", target: "api.techcorp.com/graphql", severity: "HIGH", result: "PATCHED" },
                { id: "PT-002", title: "CORS Misconfiguration on Staging Subdomain", target: "staging.techcorp.com", severity: "MEDIUM", result: "PATCHED" },
                { id: "PT-003", title: "Exposed Git Repository Metadata via Directory Traversal", target: "internal.techcorp.com", severity: "CRITICAL", result: "PATCHED" },
              ],
            },
          ],
        };
      case "threat":
        return {
          filename: `GetCyber_Threat_Intelligence_Brief_${new Date().toISOString().split("T")[0]}`,
          meta: {
            title: "Cyber Threat Intelligence & IOC Briefing",
            subtitle: "Global Threat Actor Tracking, Malware Signatures & Threat Feeds",
            classification: "INTERNAL SOC",
            organization: "TechCorp Industries",
          },
          executiveSummary: "Analysis of 1,280 active indicators of compromise (IOCs). Active monitoring established for APT29 and FIN7 financial extortion campaigns targeting cloud infrastructure.",
          sections: [
            {
              title: "Intelligence Metrics",
              metrics: [
                { label: "Tracked IOCs", value: "1,280", color: [37, 99, 235] },
                { label: "Active Campaigns", value: 8, color: [239, 68, 68] },
                { label: "Zero-Day Signatures", value: 12, color: [249, 115, 22] },
                { label: "Automated Blocks", value: "48,920", color: [34, 197, 94] },
              ],
            },
            {
              title: "High-Priority Threat Intel Feeds",
              columns: [
                { header: "Actor / Group", key: "actor", width: 34 },
                { header: "Threat Campaign", key: "campaign", width: 62 },
                { header: "Primary Vector", key: "vector", width: 44 },
                { header: "Threat Level", key: "level", width: 24, align: "center" },
                { header: "Action", key: "action", width: 18, align: "center" },
              ],
              rows: [
                { actor: "APT29 (Cozy Bear)", campaign: "Cloud Credential Harvesting", vector: "OAuth Consent Phishing", level: "CRITICAL", action: "BLOCKED" },
                { actor: "FIN7 / Carbanak", campaign: "Point-of-Sale Memory Scraping", vector: "Malicious Word Macro", level: "HIGH", action: "BLOCKED" },
                { actor: "LockBit Gang", campaign: "Ransomware-as-a-Service 3.0", vector: "Compromised VPN Creds", level: "CRITICAL", action: "BLOCKED" },
                { actor: "Lazarus Group", campaign: "Supply Chain Dependency Injection", vector: "Typosquatted npm pkg", level: "CRITICAL", action: "BLOCKED" },
              ],
            },
          ],
        };
      default: // executive
        return {
          filename: `GetCyber_Executive_Security_Summary_${new Date().toISOString().split("T")[0]}`,
          meta: {
            title: "Executive Security Operations & Risk Briefing",
            subtitle: "Quarterly Comprehensive Cyber Risk Assessment & SOC Health Check",
            classification: "CONFIDENTIAL",
            organization: "TechCorp Industries",
          },
          executiveSummary: "Overall enterprise cyber resilience score is 74% (up 5% quarter-over-quarter). 99.98% of all anomalous attack vectors were automatically mitigated at the edge with zero operational downtime.",
          sections: [
            {
              title: "Key Executive Metrics",
              metrics: [
                { label: "Security Health Score", value: "74%", color: [34, 197, 94] },
                { label: "Overall Risk Index", value: "68 / 100", color: [249, 115, 22] },
                { label: "Blocked Attacks (30d)", value: "2.8M", color: [37, 99, 235] },
                { label: "Compliance Readiness", value: "82.4%", color: [6, 182, 212] },
              ],
            },
            {
              title: "Defense Posture Overview",
              bulletPoints: [
                "Real-time SOC monitoring covering 148 server nodes and 8 cloud availability zones.",
                "Zero data breach incidents recorded across production databases during the current audit cycle.",
                "Automated patch cycle closed 98 vulnerabilities with an average turnaround of under 48 hours.",
                "AI-driven automated incident response reduced median containment time from 45 min to 18 min.",
              ],
            },
            {
              title: "Strategic Recommendations for Next Quarter",
              bulletPoints: [
                "Mandate hardware-backed FIDO2 security keys for all staff with production server access.",
                "Expand continuous red-team simulations to third-party integrations and partner API channels.",
                "Achieve full ISO 27001 recertification audit by end of Q4.",
              ],
            },
          ],
        };
    }
  };

  const handleDownloadReport = (type: string) => {
    const config = getReportConfig(type);
    generateGetCyberPDF(config);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
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
        <button
          onClick={() => {
            setSelectedType("executive");
            setGenerateModal("executive");
            setGenerated(false);
          }}
          className="cyber-btn-primary flex items-center gap-2 text-sm py-2"
        >
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
              onClick={() => {
                setSelectedType(rt.id);
                setGenerateModal(rt.id);
                setGenerated(false);
              }}
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
                  <p className="text-xs text-dark-text">{r.type.toUpperCase()} · {r.size} · {r.generated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {r.status === "ready" ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-cyber-green" />
                    <button
                      onClick={() => handleDownloadReport(r.type)}
                      className="cyber-btn-secondary flex items-center gap-1.5 text-xs py-1.5 px-3"
                    >
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
            <div>
              <label className="label-cyber">Report Type</label>
              <select
                className="input-cyber"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {REPORT_TYPES.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
            </div>
            <div>
              <label className="label-cyber">Organization</label>
              <input className="input-cyber" defaultValue="TechCorp Industries" readOnly />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label-cyber">From Date</label><input type="date" className="input-cyber" defaultValue="2026-06-01" /></div>
              <div><label className="label-cyber">To Date</label><input type="date" className="input-cyber" defaultValue="2026-07-09" /></div>
            </div>
            <div>
              <label className="label-cyber">Include Sections</label>
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
            <p className="text-dark-text text-sm mb-6">Your security report is ready with official GetCyber letterhead, security classification, and data tables.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  handleDownloadReport(selectedType);
                  setGenerateModal(null);
                  setGenerated(false);
                }}
                className="cyber-btn-primary flex items-center gap-2"
              >
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
