import { BookOpen, Code, FileText, Terminal } from "lucide-react";

const sections = [
  { title: "Getting Started", items: ["Quick Start Guide", "Platform Overview", "Authentication & API Keys", "SDK Installation"] },
  { title: "Core Modules", items: ["Vulnerability Management API", "Incident Response API", "Threat Intelligence API", "Compliance Management API", "Asset Management API"] },
  { title: "Integrations", items: ["SIEM Integration (Splunk, QRadar)", "SOAR Playbooks", "Slack & Teams Alerts", "Jira Ticketing", "AWS Security Hub"] },
  { title: "Reference", items: ["REST API Reference", "Webhook Events", "Rate Limits", "Error Codes", "Changelog"] },
];

export default function Documentation() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Developer & Platform Specs
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            GetCyber Platform <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-teal to-cyber-green bg-clip-text text-transparent">
              API & Integration Docs
            </span>
          </h1>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to automate threat hunting, stream SIEM telemetry, and extend GetCyber through our high-throughput REST APIs.
          </p>
        </div>
      </section>

      <section className="pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: BookOpen, title: "Guides", desc: "Step-by-step setup guides", color: "text-cyber-blue" },
              { icon: Code, title: "API Reference", desc: "Full REST API documentation", color: "text-cyber-green" },
              { icon: Terminal, title: "CLI Tools", desc: "Command-line interface docs", color: "text-cyber-purple" },
              { icon: FileText, title: "Playbooks", desc: "Automated SOAR response flows", color: "text-cyber-yellow" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="p-6 text-center rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-blue/40 shadow-xl transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${c.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-white mb-1.5 text-base group-hover:text-cyber-blue transition-colors">{c.title}</h3>
                  <p className="text-dark-text text-xs leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sections.map((s) => (
              <div key={s.title} className="p-6 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 shadow-xl">
                <h3 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider text-cyber-blue">{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item}>
                      <button className="text-xs text-dark-text hover:text-white transition-colors text-left flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyber-blue transition-colors" />
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[24px] bg-[#0B101E]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyber-green" /> Quick API Example
              </h3>
              <span className="text-xs font-mono text-dark-text">bash / cURL</span>
            </div>
            <pre className="bg-[#05070F] rounded-xl p-5 text-xs font-mono text-cyber-green overflow-x-auto border border-white/5 leading-relaxed">
              <code>{`curl -X GET https://api.getcyber.io/v1/vulnerabilities \\
  -H "Authorization: Bearer gcyber_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"severity": "critical", "status": "open"}'`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
