import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Video, Download, FileText, ArrowRight } from "lucide-react";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";

const resources = [
  { type: "Guide", title: "Zero Trust Architecture Implementation Guide", desc: "Step-by-step guide to implementing zero trust across your organization.", category: "Architecture", date: "July 2026", icon: FileText, color: "text-cyber-blue", glow: "rgba(77, 141, 255, 0.25)" },
  { type: "Webinar", title: "AI-Powered Threat Hunting: Live Demo", desc: "Watch our SOC experts demonstrate advanced threat hunting techniques using GC-AI.", category: "Training", date: "June 2026", icon: Video, color: "text-cyber-purple", glow: "rgba(167, 123, 255, 0.25)" },
  { type: "Report", title: "2026 Mid-Year Threat Intelligence Report", desc: "Analysis of the most active threat actors, malware families, and attack vectors.", category: "Intelligence", date: "July 2026", icon: Download, color: "text-cyber-red", glow: "rgba(239, 68, 68, 0.25)" },
  { type: "Guide", title: "ISO 27001:2022 Compliance Checklist", desc: "Complete checklist for achieving ISO 27001:2022 certification.", category: "Compliance", date: "May 2026", icon: FileText, color: "text-cyber-green", glow: "rgba(49, 208, 170, 0.25)" },
  { type: "Blog", title: "How to Build a World-Class SOC on a Budget", desc: "Practical advice for security teams building a Security Operations Center.", category: "Operations", date: "July 2026", icon: BookOpen, color: "text-cyber-yellow", glow: "rgba(245, 158, 11, 0.25)" },
  { type: "Webinar", title: "Ransomware Defense: Detect, Respond, Recover", desc: "Expert panel on modern ransomware tactics and effective defense strategies.", category: "Incident Response", date: "June 2026", icon: Video, color: "text-cyber-orange", glow: "rgba(249, 115, 22, 0.25)" },
];

import { generateGetCyberPDF } from "@/lib/exportPdf";

export default function Resources() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-card]"));
    const cleanupTilt = initTiltCards(cards);
    const headers = Array.from(document.querySelectorAll<HTMLElement>(".header-reveal"));
    const cleanupReveals = initReveals(headers);

    return () => {
      cleanupTilt();
      cleanupReveals();
    };
  }, []);

  const handleResourceDownload = (r: (typeof resources)[0]) => {
    generateGetCyberPDF({
      filename: `GetCyber_${r.title.replace(/[^a-zA-Z0-9]/g, "_")}`,
      meta: {
        title: r.title,
        subtitle: `GetCyber ${r.type} · ${r.category} Edition (${r.date})`,
        classification: "PUBLIC",
        organization: "GetCyber Security Intelligence Hub",
        author: "GetCyber Research & SOC Operations Team",
      },
      executiveSummary: r.desc,
      sections: [
        {
          title: "Executive Overview & Core Directives",
          bulletPoints: [
            "Comprehensive technical architecture designed for enterprise cybersecurity teams and SOC analysts.",
            "Integrates automated zero-trust authorization, micro-segmentation, and dynamic posture validation.",
            "Includes actionable checklists, configuration blueprints, and NIST CSF / ISO 27001 compliance cross-mappings.",
            "Validated by active deployment across over 10,000 enterprise production environments worldwide.",
          ],
        },
        {
          title: "Key Framework Implementation Controls",
          columns: [
            { header: "Domain", key: "domain", width: 44 },
            { header: "Primary Control Objective", key: "objective", width: 76 },
            { header: "Priority", key: "priority", width: 28, align: "center" },
            { header: "Audit Impact", key: "impact", width: 32, align: "center" },
          ],
          rows: [
            { domain: "Identity & Access", objective: "Mandate Phishing-Resistant MFA (FIDO2) across all admin portals", priority: "CRITICAL", impact: "HIGH" },
            { domain: "Perimeter Defense", objective: "Deploy Automated Layer 7 API Gateway Rate Limiting & WAF rules", priority: "HIGH", impact: "HIGH" },
            { domain: "Threat Hunting", objective: "Continuous Endpoint Telemetry Ingestion & AI anomaly detection", priority: "HIGH", impact: "MEDIUM" },
            { domain: "Incident Containment", objective: "Sub-15 minute automated host isolation for ransomware triggers", priority: "CRITICAL", impact: "CRITICAL" },
          ],
        },
        {
          title: "Next Steps & Enterprise Assistance",
          bulletPoints: [
            "For full bespoke architectural review, contact GetCyber Enterprise Solutions at enterprise@getcyber.co.in.",
            "Access continuous live telemetry and automated scans at https://getcyber.co.in/dashboard.",
          ],
        },
      ],
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyber-teal/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4 header-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Security Intelligence Hub
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            Security Intelligence <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-teal to-cyber-green bg-clip-text text-transparent">
              & Threat Research Hub
            </span>
          </h1>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise guides, live webinars, quarterly threat reports, and implementation blueprints curated by GetCyber SOC engineers.
          </p>
        </div>
      </section>

      <section className="pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {[
              { label: "Blog & Articles", href: "/blog", icon: BookOpen, color: "text-cyber-blue", glow: "rgba(56, 122, 255, 0.3)" },
              { label: "Documentation", href: "/documentation", icon: FileText, color: "text-cyber-green", glow: "rgba(34, 197, 94, 0.3)" },
              { label: "Platform Status", href: "/status", icon: "🟢", isEmoji: true, glow: "rgba(34, 197, 94, 0.3)" },
              { label: "Support Center", href: "/support", icon: "❓", isEmoji: true, glow: "rgba(167, 123, 255, 0.3)" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                data-tilt-card
                data-glow={item.glow}
                className="tilt-card p-6 text-center block rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-blue/40 shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                {item.isEmoji ? (
                  <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{item.icon as string}</span>
                ) : (
                  (() => {
                    const Icon = item.icon as React.ElementType;
                    return <Icon className={`w-7 h-7 ${item.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />;
                  })()
                )}
                <p className="tilt-title text-sm font-semibold text-white group-hover:text-cyber-blue transition-colors">{item.label}</p>
              </Link>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  onClick={() => handleResourceDownload(r)}
                  data-tilt-card
                  data-glow={r.glow}
                  className="tilt-card p-6 flex flex-col cursor-pointer rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-blue/40 shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-[#111827] border border-white/10 text-dark-text-bright px-2.5 py-0.5 rounded-full font-mono">
                      {r.type}
                    </span>
                    <span className="text-xs text-dark-text font-mono">{r.date}</span>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-cyber-blue/30 transition-colors">
                    <Icon className={`w-5 h-5 ${r.color}`} />
                  </div>
                  <h3 className="tilt-title font-display font-bold text-white text-base mb-2.5 leading-snug group-hover:text-cyber-blue transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-dark-text text-xs leading-relaxed flex-1 mb-5">
                    {r.desc}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-dark-text font-mono">{r.category}</span>
                    <button className={`flex items-center gap-1.5 text-xs font-semibold ${r.color} group-hover:translate-x-0.5 transition-transform`}>
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-8 sm:p-12 rounded-[24px] bg-[#0B101E]/90 backdrop-blur-2xl border border-white/10 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-2xl mx-auto header-reveal relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyber-blue font-semibold block mb-2">SOC Telemetry Dispatch</span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-3">Get Weekly Threat Intelligence</h2>
              <p className="text-dark-text text-sm sm:text-base mb-6 leading-relaxed">
                Subscribe to GetCyber's weekly threat briefing: zero-day CVE advisories, active threat actor indicators, and automated playbooks.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="input-cyber flex-1 bg-[#05070F]/80 border-white/10 focus:border-cyber-blue rounded-xl text-sm"
                  required
                />
                <button type="submit" className="cyber-btn-primary whitespace-nowrap text-sm px-6 py-2.5 rounded-xl font-semibold shadow-glow-blue">
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
