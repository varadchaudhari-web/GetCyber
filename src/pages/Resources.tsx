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
    <div className="min-h-screen pt-24 bg-[#070b16]">
      <section className="py-12 sm:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 header-reveal">
          <p className="text-cyber-blue text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">Resources</p>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white mb-3 sm:mb-4 break-words">Security Intelligence Hub</h1>
          <p className="text-dark-text text-sm sm:text-lg md:text-xl break-words">Guides, reports, webinars, and tools to elevate your security program.</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Blog & Articles", href: "/blog", icon: BookOpen, color: "text-cyber-blue", glow: "rgba(77, 141, 255, 0.25)" },
              { label: "Documentation", href: "/documentation", icon: FileText, color: "text-cyber-green", glow: "rgba(49, 208, 170, 0.25)" },
              { label: "Platform Status", href: "/status", icon: "🟢", isEmoji: true, glow: "rgba(34, 197, 94, 0.25)" },
              { label: "Support Center", href: "/support", icon: "❓", isEmoji: true, glow: "rgba(167, 123, 255, 0.25)" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                data-tilt-card
                data-glow={item.glow}
                className="tilt-card glass-card-hover p-5 text-center block shadow-lg"
              >
                {item.isEmoji ? (
                  <span className="text-3xl block mb-2">{item.icon as string}</span>
                ) : (
                  (() => { const Icon = item.icon as React.ElementType; return <Icon className={`w-7 h-7 ${item.color} mx-auto mb-2`} />; })()
                )}
                <p className="tilt-title text-sm font-medium text-white">{item.label}</p>
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
                  className="tilt-card glass-card-hover p-5 flex flex-col cursor-pointer shadow-lg group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-dark-card border border-dark-border text-dark-text px-2 py-0.5 rounded">{r.type}</span>
                    <span className="text-xs text-dark-text">{r.date}</span>
                  </div>
                  <Icon className={`w-6 h-6 ${r.color} mb-3`} />
                  <h3 className="tilt-title font-bold text-white text-sm mb-2 leading-tight group-hover:text-cyber-blue transition-colors">{r.title}</h3>
                  <p className="text-dark-text text-xs leading-relaxed flex-1 mb-4">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-dark-card/50 text-dark-text px-2 py-0.5 rounded">{r.category}</span>
                    <button className={`flex items-center gap-1 text-xs font-medium ${r.color} group-hover:underline`}>
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-surface border-y border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center header-reveal">
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
