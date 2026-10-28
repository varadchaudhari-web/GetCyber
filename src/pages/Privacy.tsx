import { Shield, Lock, Eye, FileText, Globe, Bell, Trash2, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "collection",
    icon: Eye,
    title: "1. Information We Collect",
    color: "text-cyber-blue",
    content: [
      "Account information: name, email address, organization name, job title, and password when you register.",
      "Security data: vulnerability scan results, asset inventories, threat data, and compliance records you input or generate.",
      "Usage data: pages visited, features used, session duration, IP address, browser type, and device identifiers.",
      "Communications: support tickets, emails, and chat messages you send us.",
      "Payment information: processed securely by Stripe; we do not store full card numbers.",
    ],
  },
  {
    id: "usage",
    icon: FileText,
    title: "2. How We Use Your Information",
    color: "text-cyber-green",
    content: [
      "Provide, operate, and improve the GetCyber platform and its security modules.",
      "Process transactions and send billing-related communications.",
      "Send security alerts, threat notifications, and important service updates.",
      "Respond to support requests and provide customer assistance.",
      "Conduct security research, analytics, and platform performance monitoring.",
      "Comply with legal obligations and enforce our Terms of Service.",
      "We never sell your personal data or security data to third parties.",
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "3. Data Security",
    color: "text-cyber-purple",
    content: [
      "AES-256 encryption for all data at rest across our infrastructure.",
      "TLS 1.3 for all data in transit between your browser and our servers.",
      "SOC 2 Type II certified security controls audited annually by independent auditors.",
      "ISO 27001:2022 certified information security management system.",
      "Zero-trust network architecture with continuous verification and least-privilege access.",
      "Regular penetration testing by third-party security firms.",
      "Incident response plan with a 72-hour breach notification policy under GDPR.",
    ],
  },
  {
    id: "retention",
    icon: Trash2,
    title: "4. Data Retention",
    color: "text-cyber-yellow",
    content: [
      "Account data is retained for the duration of your active subscription.",
      "Upon account deletion, personal data is deleted or anonymized within 30 days.",
      "Security scan data and logs may be retained for up to 12 months for forensic purposes.",
      "Billing records are retained for 7 years as required by applicable tax laws.",
      "Backup copies are purged within 90 days of the primary deletion.",
    ],
  },
  {
    id: "rights",
    icon: Lock,
    title: "5. Your Rights",
    color: "text-cyber-red",
    content: [
      "Access: Request a copy of all personal data we hold about you.",
      "Correction: Request correction of inaccurate or incomplete data.",
      "Deletion: Request deletion of your personal data (right to be forgotten).",
      "Portability: Receive your data in a structured, machine-readable format.",
      "Objection: Object to processing of your data for direct marketing purposes.",
      "Restriction: Request restriction of processing in certain circumstances.",
      "To exercise any right, contact privacy@getcyber.io. We respond within 30 days.",
    ],
  },
  {
    id: "cookies",
    icon: Globe,
    title: "6. Cookies & Tracking",
    color: "text-cyber-cyan",
    content: [
      "Essential cookies: Required for platform authentication and core functionality. Cannot be disabled.",
      "Analytics cookies: Help us understand how you use the platform so we can improve it (optional).",
      "Preference cookies: Remember your settings and customizations (optional).",
      "We do not use advertising cookies, cross-site tracking pixels, or behavioral profiling.",
      "You can manage cookie preferences at any time via our Cookie Settings page.",
    ],
  },
  {
    id: "third-parties",
    icon: Globe,
    title: "7. Third-Party Services",
    color: "text-cyber-orange",
    content: [
      "Stripe: Payment processing. Subject to Stripe's privacy policy.",
      "AWS: Cloud infrastructure and data storage in SOC 2 certified data centers.",
      "SendGrid: Transactional email delivery.",
      "Datadog: Platform monitoring and performance analytics.",
      "All third-party processors are bound by Data Processing Agreements (DPAs) and may not use your data for their own purposes.",
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "8. Contact & DPO",
    color: "text-cyber-blue",
    content: [
      "General privacy inquiries: privacy@getcyber.io",
      "Data Protection Officer: dpo@getcyber.io",
      "Mailing address: GetCyber, Inc., 101 Security Blvd, Suite 500, San Francisco, CA 94105",
      "EU representative: GetCyber GmbH, Friedrichstrasse 123, 10117 Berlin, Germany",
      "For GDPR complaints, you also have the right to lodge a complaint with your local supervisory authority.",
    ],
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero */}
      <section className="py-12 sm:py-16 text-center relative z-10" id="hero">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Compliance & Transparency
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            Enterprise Privacy Policy
          </h1>
          <p className="text-dark-text text-xs sm:text-sm font-mono mb-4">Last updated: July 1, 2026 · SOC 2 & ISO 27001 Aligned</p>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            At GetCyber, data isolation and cryptographic security are core architectural primitives. This document outlines our data lifecycle, processing principles, and user governance rights.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6 relative z-10" id="toc">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-cyber-blue uppercase font-mono tracking-widest mb-3 font-semibold">Quick Index</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(s.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="text-xs bg-[#0B101E]/80 border border-white/10 text-dark-text hover:text-white hover:border-cyber-blue/40 px-3.5 py-1.5 rounded-full transition-all font-mono"
              >
                {s.title.replace(/^\d+\.\s/, "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4 relative z-10">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} id={section.id} className="p-7 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                  <Icon className={`w-5 h-5 ${section.color}`} />
                </div>
                <h2 className="text-lg font-display font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-dark-text leading-relaxed">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${section.color.replace("text-", "bg-")}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer Links */}
      <div className="max-w-4xl mx-auto px-4 pt-6 relative z-10">
        <div className="p-7 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <p className="text-white font-display font-bold text-base mb-1">Related Governance Documents</p>
            <p className="text-dark-text text-xs">Review our end-to-end contractual framework and privacy commitments</p>
          </div>
          <div className="flex gap-3">
            <Link to="/terms" className="cyber-btn-secondary text-xs py-2.5 px-5 rounded-xl font-semibold">Terms of Service</Link>
            <Link to="/cookie-settings" className="cyber-btn-secondary text-xs py-2.5 px-5 rounded-xl font-semibold">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
