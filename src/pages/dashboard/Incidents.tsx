import { useState } from "react";
import { Zap, Plus, Search, Clock, User, ChevronDown, ChevronUp, Download } from "lucide-react";
import { useIncidentStore } from "@/stores/incidentStore";
import { SeverityBadge, StatusBadge } from "@/components/shared/SeverityBadge";
import Modal from "@/components/shared/Modal";
import { formatDate } from "@/lib/utils";
import type { Incident } from "@/types";
import { generateGetCyberPDF } from "@/lib/exportPdf";

export default function Incidents() {
  const { getFilteredIncidents, filter, setFilter, selectedIncident, setSelected, addIncident, closeIncident, addTimelineEvent } = useIncidentStore();
  const [createModal, setCreateModal] = useState(false);
  const [newForm, setNewForm] = useState({ title: "", type: "Malware", severity: "high" as Incident["severity"], description: "" });
  const incidents = getFilteredIncidents();

  const handleExportPDF = () => {
    generateGetCyberPDF({
      filename: `GetCyber_Incident_Response_Log_${new Date().toISOString().split("T")[0]}`,
      meta: {
        title: "Security Incident Response & Forensic Timeline Log",
        subtitle: "SOC Incident Classification, Priority Levels & Remediation Status",
        classification: "TOP SECRET",
        organization: "TechCorp Industries",
      },
      executiveSummary: `Audit record of ${incidents.length} active and resolved security incidents across production and enterprise networks. Mean time to containment: 18 minutes. Zero unauthorized data exfiltration confirmed.`,
      sections: [
        {
          title: "Incident Response Metrics",
          metrics: [
            { label: "Total Incidents", value: incidents.length, color: [37, 99, 235] },
            { label: "Open / Active", value: incidents.filter((i) => i.status === "open").length, color: [239, 68, 68] },
            { label: "In Investigation", value: incidents.filter((i) => i.status === "in_progress").length, color: [249, 115, 22] },
            { label: "Resolved", value: incidents.filter((i) => i.status === "resolved").length, color: [34, 197, 94] },
          ],
        },
        {
          title: "Incident Inventory & Forensics",
          columns: [
            { header: "Incident ID", key: "id", width: 26 },
            { header: "Incident Title", key: "title", width: 64 },
            { header: "Category", key: "type", width: 30 },
            { header: "Lead Analyst", key: "owner", width: 34 },
            { header: "Severity", key: "severity", width: 22, align: "center" },
            { header: "Status", key: "status", width: 24, align: "center" },
          ],
          rows: incidents.map((inc) => ({
            id: inc.id,
            title: inc.title,
            type: inc.type,
            owner: inc.assignedTo,
            severity: inc.severity.toUpperCase(),
            status: inc.status.toUpperCase(),
          })),
        },
      ],
    });
  };

  const handleCreate = () => {
    addIncident({
      ...newForm,
      status: "open",
      priority: "p2",
      affectedAssets: [],
      assignedTo: "Alex Morgan",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [newForm.type.toLowerCase()],
    });
    setCreateModal(false);
    setNewForm({ title: "", type: "Malware", severity: "high", description: "" });
  };

  const priorityColors: Record<string, string> = {
    p1: "text-cyber-red bg-cyber-red/10 border-cyber-red/30",
    p2: "text-cyber-orange bg-cyber-orange/10 border-cyber-orange/30",
    p3: "text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/30",
    p4: "text-dark-text bg-dark-card border-dark-border",
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Incident Response</h1>
          <p className="section-subheader">Manage, investigate, and resolve security incidents across your organization</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportPDF} className="cyber-btn-secondary flex items-center gap-2 text-sm py-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button onClick={() => setCreateModal(true)} className="cyber-btn-primary flex items-center gap-2 text-sm py-2">
            <Plus className="w-4 h-4" /> New Incident
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Open", value: incidents.filter((i) => i.status === "open").length, color: "text-cyber-red" },
          { label: "In Progress", value: incidents.filter((i) => i.status === "in_progress").length, color: "text-cyber-yellow" },
          { label: "Resolved", value: incidents.filter((i) => i.status === "resolved").length, color: "text-cyber-green" },
          { label: "P1 Critical", value: incidents.filter((i) => i.priority === "p1").length, color: "text-cyber-orange" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-sm text-dark-text mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
        <input
          placeholder="Search incidents..."
          className="input-cyber pl-9"
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
      </div>

      {/* Incidents List */}
      <div className="space-y-3">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            className="glass-card p-5 cursor-pointer hover:border-cyber-blue/40 transition-all"
            onClick={() => setSelected(selectedIncident?.id === inc.id ? null : inc)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${priorityColors[inc.priority]}`}>{inc.priority.toUpperCase()}</span>
                  <SeverityBadge severity={inc.severity} />
                  <StatusBadge status={inc.status} />
                  <span className="text-xs bg-dark-card text-dark-text border border-dark-border px-2 py-0.5 rounded">{inc.type}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{inc.title}</h3>
                <p className="text-dark-text text-xs line-clamp-2">{inc.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-dark-text">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(inc.createdAt, "relative")}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{inc.assignedTo}</span>
                  <span>{inc.affectedAssets.length} assets affected</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {inc.status !== "closed" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); closeIncident(inc.id, "Resolved by security team"); }}
                    className="text-xs text-cyber-green hover:text-cyber-green-light transition-colors"
                  >
                    Close
                  </button>
                )}
                {selectedIncident?.id === inc.id ? <ChevronUp className="w-4 h-4 text-dark-text" /> : <ChevronDown className="w-4 h-4 text-dark-text" />}
              </div>
            </div>

            {/* Timeline expansion */}
            {selectedIncident?.id === inc.id && (
              <div className="mt-4 pt-4 border-t border-dark-border" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white">Incident Timeline</h4>
                  <button
                    onClick={() => addTimelineEvent(inc.id, { timestamp: new Date().toISOString(), action: "Status Update", user: "Alex Morgan", details: "Investigating the incident further" })}
                    className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors"
                  >
                    + Add Event
                  </button>
                </div>
                <div className="space-y-3">
                  {inc.timeline.map((event) => (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyber-blue mt-1 flex-shrink-0" />
                        <div className="w-px flex-1 bg-dark-border mt-1" />
                      </div>
                      <div className="pb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-white">{event.action}</span>
                          <span className="text-xs text-dark-text">by {event.user}</span>
                          <span className="text-xs text-dark-text/60">{formatDate(event.timestamp, "relative")}</span>
                        </div>
                        <p className="text-xs text-dark-text">{event.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create New Incident"
        size="md"
        footer={
          <div className="flex gap-3">
            <button onClick={handleCreate} className="cyber-btn-primary flex-1 text-sm">Create Incident</button>
            <button onClick={() => setCreateModal(false)} className="cyber-btn-secondary flex-1 text-sm">Cancel</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="label-cyber">Incident Title</label>
            <input value={newForm.title} onChange={(e) => setNewForm((p) => ({ ...p, title: e.target.value }))} className="input-cyber" placeholder="Describe the incident briefly" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-cyber">Type</label>
              <select className="input-cyber" value={newForm.type} onChange={(e) => setNewForm((p) => ({ ...p, type: e.target.value }))}>
                {["Malware", "Phishing", "Ransomware", "Brute Force", "Data Breach", "Insider Threat", "DDoS", "Unauthorized Access"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label-cyber">Severity</label>
              <select className="input-cyber" value={newForm.severity} onChange={(e) => setNewForm((p) => ({ ...p, severity: e.target.value as Incident["severity"] }))}>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label-cyber">Description</label>
            <textarea value={newForm.description} onChange={(e) => setNewForm((p) => ({ ...p, description: e.target.value }))} className="input-cyber min-h-[100px] resize-none" placeholder="Describe what happened, affected systems, and initial findings..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
