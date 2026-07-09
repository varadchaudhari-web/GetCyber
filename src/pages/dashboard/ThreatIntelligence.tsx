import { useState } from "react";
import { Activity, Search, ExternalLink, Shield, AlertTriangle, Eye } from "lucide-react";
import { useThreatStore } from "@/stores/threatStore";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import Modal from "@/components/shared/Modal";
import { formatDate } from "@/lib/utils";
import type { ThreatIntel } from "@/types";

const TYPE_COLORS: Record<string, string> = {
  ransomware: "text-cyber-red bg-cyber-red/10 border-cyber-red/30",
  apt: "text-cyber-purple bg-cyber-purple/10 border-cyber-purple/30",
  malware: "text-cyber-orange bg-cyber-orange/10 border-cyber-orange/30",
  phishing: "text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/30",
  vulnerability: "text-cyber-blue bg-cyber-blue/10 border-cyber-blue/30",
  data_breach: "text-cyber-red bg-cyber-red/10 border-cyber-red/30",
  ddos: "text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30",
  ioc: "text-dark-text bg-dark-card border-dark-border",
};

export default function ThreatIntelligence() {
  const { getFilteredThreats, filter, setFilter, iocs } = useThreatStore();
  const [selected, setSelected] = useState<ThreatIntel | null>(null);
  const threats = getFilteredThreats();

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Threat Intelligence</h1>
          <p className="section-subheader">Real-time global threat feeds, IOC management, and adversary tracking</p>
        </div>
        <div className="flex items-center gap-2 bg-cyber-red/10 border border-cyber-red/30 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-cyber-red animate-pulse" />
          <span className="text-sm text-cyber-red font-semibold">{threats.filter((t) => t.severity === "critical").length} Critical Alerts</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Critical Threats", value: threats.filter((t) => t.severity === "critical").length, color: "text-cyber-red" },
          { label: "High Relevance", value: threats.filter((t) => t.relevance === "high").length, color: "text-cyber-orange" },
          { label: "Active IOCs", value: iocs.length, color: "text-cyber-purple" },
          { label: "Total Intelligence", value: threats.length, color: "text-cyber-blue" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-sm text-dark-text mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* IOC Feed */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyber-purple" /> Active Indicators of Compromise (IOCs)
        </h3>
        <div className="flex flex-wrap gap-2">
          {iocs.map((ioc) => (
            <span key={ioc} className="text-xs font-mono bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple px-3 py-1.5 rounded-full">
              {ioc}
            </span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
          <input placeholder="Search threats..." className="input-cyber pl-9" value={filter.search} onChange={(e) => setFilter({ search: e.target.value })} />
        </div>
        <select className="input-cyber w-full sm:w-36" onChange={(e) => setFilter({ type: e.target.value || undefined })}>
          <option value="">All Types</option>
          {["ransomware", "apt", "malware", "phishing", "vulnerability", "data_breach"].map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
        </select>
        <select className="input-cyber w-full sm:w-36" onChange={(e) => setFilter({ severity: e.target.value || undefined })}>
          <option value="">All Severity</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
        </select>
      </div>

      {/* Threat Cards */}
      <div className="space-y-3">
        {threats.map((t) => (
          <div
            key={t.id}
            className="glass-card p-5 cursor-pointer hover:border-cyber-blue/40 transition-all"
            onClick={() => setSelected(t)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${TYPE_COLORS[t.type] || TYPE_COLORS.ioc}`}>{t.type.replace("_", " ")}</span>
                  <SeverityBadge severity={t.severity} />
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${t.relevance === "high" ? "text-cyber-red bg-cyber-red/10 border-cyber-red/30" : "text-dark-text bg-dark-card border-dark-border"}`}>
                    {t.relevance} relevance
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{t.title}</h3>
                <p className="text-dark-text text-xs line-clamp-2">{t.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-dark-text">
                  <span>Source: {t.source}</span>
                  <span>Confidence: <span className="text-cyber-green">{t.confidence}%</span></span>
                  <span>{formatDate(t.publishedAt, "relative")}</span>
                </div>
              </div>
              <Eye className="w-4 h-4 text-dark-text flex-shrink-0 mt-1" />
            </div>
            {t.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dark-border/50">
                {t.tags.map((tag) => <span key={tag} className="text-xs bg-dark-card text-dark-text px-2 py-0.5 rounded">{tag}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || ""} size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <SeverityBadge severity={selected.severity} />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${TYPE_COLORS[selected.type]}`}>{selected.type.replace("_", " ")}</span>
            </div>
            <div>
              <p className="text-dark-text text-sm leading-relaxed">{selected.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Source</p>
                <p className="text-white font-medium">{selected.source}</p>
              </div>
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Confidence</p>
                <p className="text-cyber-green font-bold">{selected.confidence}%</p>
              </div>
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Relevance</p>
                <p className="text-white font-medium capitalize">{selected.relevance}</p>
              </div>
              <div className="p-3 bg-dark-card/40 rounded-lg">
                <p className="text-dark-text text-xs mb-1">Published</p>
                <p className="text-white font-medium">{formatDate(selected.publishedAt, "long")}</p>
              </div>
            </div>
            {selected.ioc && selected.ioc.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Indicators of Compromise</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.ioc.map((ioc) => (
                    <span key={ioc} className="text-xs font-mono bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple px-2.5 py-1 rounded">{ioc}</span>
                  ))}
                </div>
              </div>
            )}
            {selected.ttps && selected.ttps.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">MITRE ATT&CK TTPs</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.ttps.map((ttp) => (
                    <span key={ttp} className="text-xs font-mono bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue px-2.5 py-1 rounded">{ttp}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
