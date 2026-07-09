import { BookOpen, Code, FileText, Terminal } from "lucide-react";

const sections = [
  { title: "Getting Started", items: ["Quick Start Guide", "Platform Overview", "Authentication & API Keys", "SDK Installation"] },
  { title: "Core Modules", items: ["Vulnerability Management API", "Incident Response API", "Threat Intelligence API", "Compliance Management API", "Asset Management API"] },
  { title: "Integrations", items: ["SIEM Integration (Splunk, QRadar)", "SOAR Playbooks", "Slack & Teams Alerts", "Jira Ticketing", "AWS Security Hub"] },
  { title: "Reference", items: ["REST API Reference", "Webhook Events", "Rate Limits", "Error Codes", "Changelog"] },
];

export default function Documentation() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Documentation</p>
          <h1 className="text-5xl font-black text-white mb-4">Platform Documentation</h1>
          <p className="text-dark-text text-xl">Everything you need to integrate, automate, and extend GetCyber.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[{ icon: BookOpen, title: "Guides", desc: "Step-by-step setup guides", color: "text-cyber-blue" }, { icon: Code, title: "API Reference", desc: "Full REST API documentation", color: "text-cyber-green" }, { icon: Terminal, title: "CLI Tools", desc: "Command-line interface docs", color: "text-cyber-purple" }, { icon: FileText, title: "Tutorials", desc: "Video and written tutorials", color: "text-cyber-yellow" }].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="glass-card-hover p-5 text-center">
                  <Icon className={`w-8 h-8 ${c.color} mx-auto mb-3`} />
                  <h3 className="font-bold text-white mb-1">{c.title}</h3>
                  <p className="text-dark-text text-xs">{c.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((s) => (
              <div key={s.title} className="glass-card p-5">
                <h3 className="font-bold text-white mb-3 text-sm">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item}><button className="text-sm text-dark-text hover:text-cyber-blue transition-colors text-left">{item}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 glass-card p-6 border-cyber-blue/20 border">
            <h3 className="font-bold text-white mb-2">Quick API Example</h3>
            <pre className="bg-dark-bg rounded-lg p-4 text-xs font-mono text-cyber-green overflow-x-auto"><code>{`curl -X GET https://api.getcyber.io/v1/vulnerabilities \\
  -H "Authorization: Bearer gcyber_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"severity": "critical", "status": "open"}'`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
}
