import { useState } from "react";
import { Database, Plus, Search, Server, Globe, Cloud, Monitor, Wifi, Code, Download } from "lucide-react";
import { useAssetStore } from "@/stores/assetStore";
import Modal from "@/components/shared/Modal";
import RiskGauge from "@/components/shared/RiskGauge";
import { formatDate, getRiskColor } from "@/lib/utils";
import type { Asset } from "@/types";
import { generateGetCyberPDF } from "@/lib/exportPdf";

const TYPE_ICONS: Record<string, React.ElementType> = {
  server: Server, webapp: Globe, api: Code, cloud: Cloud,
  workstation: Monitor, network: Wifi, domain: Globe, mobile: Monitor, endpoints: Monitor,
};

const PATCH_COLORS: Record<string, string> = {
  up_to_date: "text-cyber-green bg-cyber-green/10 border-cyber-green/30",
  needs_update: "text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/30",
  critical: "text-cyber-red bg-cyber-red/10 border-cyber-red/30",
  unknown: "text-dark-text bg-dark-card border-dark-border",
};

const STATUS_COLORS: Record<string, string> = {
  online: "bg-cyber-green",
  offline: "bg-cyber-red",
  maintenance: "bg-cyber-yellow",
  unknown: "bg-dark-text",
};

export default function Assets() {
  const { getFilteredAssets, filter, setFilter, getHighRiskAssets, addAsset } = useAssetStore();
  const [selected, setSelected] = useState<Asset | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: "", type: "server" as Asset["type"], environment: "production" as Asset["environment"] });
  const assets = getFilteredAssets();
  const highRisk = getHighRiskAssets().slice(0, 3);

  const handleExportPDF = () => {
    generateGetCyberPDF({
      filename: `GetCyber_Asset_Inventory_Audit_${new Date().toISOString().split("T")[0]}`,
      meta: {
        title: "Enterprise Digital Asset & Attack Surface Inventory",
        subtitle: "Hardware, Web Applications, Cloud Infrastructure & Risk Scores",
        classification: "CONFIDENTIAL",
        organization: "TechCorp Industries",
      },
      executiveSummary: `Inventory catalog of ${assets.length} monitored IT assets. ${assets.filter((a) => a.status === "online").length} assets online and operational. ${assets.filter((a) => a.riskScore >= 70).length} high-risk assets flagged for vulnerability scanning and patch verification.`,
      sections: [
        {
          title: "Asset Surface Key Metrics",
          metrics: [
            { label: "Total Assets", value: assets.length, color: [37, 99, 235] },
            { label: "Online Assets", value: assets.filter((a) => a.status === "online").length, color: [34, 197, 94] },
            { label: "High Risk", value: assets.filter((a) => a.riskScore >= 70).length, color: [239, 68, 68] },
            { label: "Patch Required", value: assets.filter((a) => a.patchStatus !== "up_to_date").length, color: [249, 115, 22] },
          ],
        },
        {
          title: "Asset Directory & Security Posture",
          columns: [
            { header: "Asset Name", key: "name", width: 56 },
            { header: "Type", key: "type", width: 26 },
            { header: "Environment", key: "env", width: 28 },
            { header: "Risk Score", key: "risk", width: 22, align: "center" },
            { header: "Patch Status", key: "patch", width: 30, align: "center" },
            { header: "State", key: "status", width: 18, align: "center" },
          ],
          rows: assets.map((a) => ({
            name: a.name,
            type: a.type.toUpperCase(),
            env: a.environment.toUpperCase(),
            risk: `${a.riskScore}/100`,
            patch: a.patchStatus.replace("_", " ").toUpperCase(),
            status: a.status.toUpperCase(),
          })),
        },
      ],
    });
  };

  const handleAdd = () => {
    addAsset({ ...newAsset, status: "online", riskScore: Math.floor(Math.random() * 40) + 20, vulnerabilities: 0, lastScanned: new Date().toISOString(), owner: "IT Team", patchStatus: "up_to_date", tags: [] });
    setAddModal(false);
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Asset Management</h1>
          <p className="section-subheader">Monitor and manage your entire IT asset inventory and security posture</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportPDF} className="cyber-btn-secondary flex items-center gap-2 text-sm py-2">
            <Download className="w-4 h-4" /> Export Inventory
          </button>
          <button onClick={() => setAddModal(true)} className="cyber-btn-primary flex items-center gap-2 text-sm py-2">
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Assets", value: assets.length, color: "text-cyber-blue" },
          { label: "Online", value: assets.filter((a) => a.status === "online").length, color: "text-cyber-green" },
          { label: "High Risk", value: assets.filter((a) => a.riskScore >= 70).length, color: "text-cyber-red" },
          { label: "Needs Patching", value: assets.filter((a) => a.patchStatus !== "up_to_date").length, color: "text-cyber-yellow" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-sm text-dark-text mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* High Risk Assets */}
      {highRisk.length > 0 && (
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyber-red" />
            Highest Risk Assets
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highRisk.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 bg-dark-card/60 border border-dark-border rounded-xl cursor-pointer hover:border-cyber-blue/40 transition-all" onClick={() => setSelected(a)}>
                <RiskGauge score={a.riskScore} size="sm" showLabel={false} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{a.name}</p>
                  <p className="text-xs text-dark-text capitalize">{a.type} · {a.environment}</p>
                  <p className="text-xs text-cyber-orange">{a.vulnerabilities} vulnerabilities</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
          <input placeholder="Search assets..." className="input-cyber pl-9" value={filter.search} onChange={(e) => setFilter({ search: e.target.value })} />
        </div>
        <select className="input-cyber w-full sm:w-36" onChange={(e) => setFilter({ type: e.target.value || undefined })}>
          <option value="">All Types</option>
          {["server", "webapp", "api", "cloud", "network", "domain"].map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
        </select>
        <select className="input-cyber w-full sm:w-40" onChange={(e) => setFilter({ environment: e.target.value || undefined })}>
          <option value="">All Environments</option>
          {["production", "staging", "development", "testing"].map((e) => <option key={e} value={e} className="capitalize">{e}</option>)}
        </select>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((a) => {
          const Icon = TYPE_ICONS[a.type] || Server;
          return (
            <div key={a.id} className="glass-card-hover p-5 cursor-pointer" onClick={() => setSelected(a)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-cyber-blue" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate max-w-[140px]">{a.name}</p>
                    <p className="text-xs text-dark-text capitalize">{a.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[a.status]}`} />
                  <span className="text-xs text-dark-text capitalize">{a.status}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-dark-text mb-0.5">Risk Score</p>
                  <p className="text-xl font-black" style={{ color: getRiskColor(a.riskScore) }}>{a.riskScore}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-dark-text mb-0.5">Vulnerabilities</p>
                  <p className="text-xl font-black text-cyber-orange">{a.vulnerabilities}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${PATCH_COLORS[a.patchStatus]}`}>
                  {a.patchStatus.replace("_", " ")}
                </span>
                <span className="text-xs text-dark-text">{formatDate(a.lastScanned, "relative")}</span>
              </div>

              {a.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-dark-border/50">
                  {a.tags.slice(0, 3).map((t) => <span key={t} className="text-xs bg-dark-card text-dark-text px-1.5 py-0.5 rounded">{t}</span>)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Asset Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle={`${selected?.type} · ${selected?.environment}`} size="md">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <RiskGauge score={selected.riskScore} size="md" />
              <div className="space-y-2 flex-1">
                {selected.ip && <div className="p-2.5 bg-dark-card/40 rounded-lg"><p className="text-xs text-dark-text">IP Address</p><p className="text-sm font-mono text-white">{selected.ip}</p></div>}
                {selected.url && <div className="p-2.5 bg-dark-card/40 rounded-lg"><p className="text-xs text-dark-text">URL</p><p className="text-sm font-mono text-cyber-blue truncate">{selected.url}</p></div>}
                {selected.os && <div className="p-2.5 bg-dark-card/40 rounded-lg"><p className="text-xs text-dark-text">OS</p><p className="text-sm text-white">{selected.os}</p></div>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-dark-card/40 rounded-lg"><p className="text-dark-text text-xs mb-1">Owner</p><p className="text-white font-medium">{selected.owner}</p></div>
              <div className="p-3 bg-dark-card/40 rounded-lg"><p className="text-dark-text text-xs mb-1">Environment</p><p className="text-white font-medium capitalize">{selected.environment}</p></div>
              <div className="p-3 bg-dark-card/40 rounded-lg"><p className="text-dark-text text-xs mb-1">Last Scanned</p><p className="text-white font-medium">{formatDate(selected.lastScanned, "short")}</p></div>
              <div className="p-3 bg-dark-card/40 rounded-lg"><p className="text-dark-text text-xs mb-1">Patch Status</p><p className={`font-medium text-xs capitalize ${PATCH_COLORS[selected.patchStatus].split(" ")[0]}`}>{selected.patchStatus.replace("_", " ")}</p></div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Asset Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New Asset" size="md"
        footer={<div className="flex gap-3"><button onClick={handleAdd} className="cyber-btn-primary flex-1 text-sm">Add Asset</button><button onClick={() => setAddModal(false)} className="cyber-btn-secondary flex-1 text-sm">Cancel</button></div>}
      >
        <div className="space-y-4">
          <div><label className="label-cyber">Asset Name / Hostname</label><input value={newAsset.name} onChange={(e) => setNewAsset((p) => ({ ...p, name: e.target.value }))} className="input-cyber" placeholder="prod-server-02" /></div>
          <div><label className="label-cyber">Asset Type</label><select className="input-cyber" value={newAsset.type} onChange={(e) => setNewAsset((p) => ({ ...p, type: e.target.value as Asset["type"] }))}>{["server", "webapp", "api", "cloud", "network", "domain"].map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}</select></div>
          <div><label className="label-cyber">Environment</label><select className="input-cyber" value={newAsset.environment} onChange={(e) => setNewAsset((p) => ({ ...p, environment: e.target.value as Asset["environment"] }))}>{["production", "staging", "development", "testing"].map((e) => <option key={e} value={e} className="capitalize">{e}</option>)}</select></div>
        </div>
      </Modal>
    </div>
  );
}
