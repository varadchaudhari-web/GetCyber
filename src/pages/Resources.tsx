import { Link } from "react-router-dom";
import { BookOpen, Video, Download, FileText, ArrowRight } from "lucide-react";

const resources = [
  { type: "Guide", title: "Zero Trust Architecture Implementation Guide", desc: "Step-by-step guide to implementing zero trust across your organization.", category: "Architecture", date: "July 2026", icon: FileText, color: "text-cyber-blue" },
  { type: "Webinar", title: "AI-Powered Threat Hunting: Live Demo", desc: "Watch our SOC experts demonstrate advanced threat hunting techniques using GC-AI.", category: "Training", date: "June 2026", icon: Video, color: "text-cyber-purple" },
  { type: "Report", title: "2026 Mid-Year Threat Intelligence Report", desc: "Analysis of the most active threat actors, malware families, and attack vectors.", category: "Intelligence", date: "July 2026", icon: Download, color: "text-cyber-red" },
  { type: "Guide", title: "ISO 27001:2022 Compliance Checklist", desc: "Complete checklist for achieving ISO 27001:2022 certification.", category: "Compliance", date: "May 2026", icon: FileText, color: "text-cyber-green" },
  { type: "Blog", title: "How to Build a World-Class SOC on a Budget", desc: "Practical advice for security teams building a Security Operations Center.", category: "Operations", date: "July 2026", icon: BookOpen, color: "text-cyber-yellow" },
  { type: "Webinar", title: "Ransomware Defense: Detect, Respond, Recover", desc: "Expert panel on modern ransomware tactics and effective defense strategies.", category: "Incident Response", date: "June 2026", icon: Video, color: "text-cyber-orange" },
];

export default function Resources() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Resources</p>
          <h1 className="text-5xl font-black text-white mb-4">Security Intelligence Hub</h1>
          <p className="text-dark-text text-xl">Guides, reports, webinars, and tools to elevate your security program.</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Blog & Articles", href: "/blog", icon: BookOpen, color: "text-cyber-blue" },
              { label: "Documentation", href: "/documentation", icon: FileText, color: "text-cyber-green" },
              { label: "Platform Status", href: "/status", icon: "🟢", isEmoji: true },
              { label: "Support Center", href: "/support", icon: "❓", isEmoji: true },
            ].map((item) => (
              <Link key={item.label} to={item.href} className="glass-card-hover p-5 text-center">
                {item.isEmoji ? (
                  <span className="text-3xl block mb-2">{item.icon as string}</span>
                ) : (
                  (() => { const Icon = item.icon as React.ElementType; return <Icon className={`w-7 h-7 ${item.color} mx-auto mb-2`} />; })()
                )}
                <p className="text-sm font-medium text-white">{item.label}</p>
              </Link>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="glass-card-hover p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-dark-card border border-dark-border text-dark-text px-2 py-0.5 rounded">{r.type}</span>
                    <span className="text-xs text-dark-text">{r.date}</span>
                  </div>
                  <Icon className={`w-6 h-6 ${r.color} mb-3`} />
                  <h3 className="font-bold text-white text-sm mb-2 leading-tight">{r.title}</h3>
                  <p className="text-dark-text text-xs leading-relaxed flex-1 mb-4">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-dark-card/50 text-dark-text px-2 py-0.5 rounded">{r.category}</span>
                    <button className={`flex items-center gap-1 text-xs font-medium ${r.color}`}>
                      {r.type === "Webinar" ? "Watch" : r.type === "Report" ? "Download" : "Read"} <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-surface border-y border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Get Weekly Threat Intelligence</h2>
          <p className="text-dark-text mb-6">Subscribe to GetCyber's weekly threat briefing and stay ahead of emerging threats.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="input-cyber flex-1" />
            <button className="cyber-btn-primary whitespace-nowrap">Subscribe Free</button>
          </div>
        </div>
      </section>
    </div>
  );
}
