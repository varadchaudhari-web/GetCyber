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
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="py-12 text-center relative overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-glow-blue opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="w-14 h-14 bg-cyber-blue/10 border border-cyber-blue/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-cyber-blue" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-dark-text text-sm">Last updated: July 1, 2026 — Effective: July 1, 2026</p>
          <p className="text-dark-text-bright mt-4 leading-relaxed max-w-2xl mx-auto">
            At GetCyber, your privacy and the security of your data are paramount. This policy explains what data we collect, how we use it, and your rights as a user.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-dark-surface border-y border-dark-border" id="toc">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-dark-text uppercase tracking-wider mb-4 font-semibold">Quick Navigation</p>
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
                className="text-xs bg-dark-card border border-dark-border text-dark-text-bright hover:text-cyber-blue hover:border-cyber-blue/40 px-3 py-1.5 rounded-full transition-all"
              >
                {s.title.replace(/^\d+\.\s/, "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-5">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} id={section.id} className="glass-card p-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-dark-card/60 border border-dark-border`}>
                  <Icon className={`w-4.5 h-4.5 ${section.color}`} />
                </div>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-dark-text leading-relaxed">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${section.color.replace("text-", "bg-")}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer Links */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-sm mb-1">Related Legal Documents</p>
            <p className="text-dark-text text-xs">Review our complete legal framework</p>
          </div>
          <div className="flex gap-3">
            <Link to="/terms" className="cyber-btn-secondary text-sm py-2 px-4">Terms of Service</Link>
            <Link to="/cookie-settings" className="cyber-btn-secondary text-sm py-2 px-4">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
