import { FileText, CreditCard, Lock, AlertTriangle, Scale, Clock, XCircle, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "acceptance",
    icon: FileText,
    title: "1. Acceptance of Terms",
    color: "text-cyber-blue",
    content: [
      "By accessing or using GetCyber's platform and services, you agree to be legally bound by these Terms of Service.",
      "If you are entering into these Terms on behalf of an organization, you represent that you have authority to bind that organization.",
      "If you do not agree to these terms, you may not access or use our services.",
      "We may update these Terms from time to time. Continued use after notice constitutes acceptance of updated Terms.",
    ],
  },
  {
    id: "services",
    icon: Lock,
    title: "2. Service Description",
    color: "text-cyber-green",
    content: [
      "GetCyber provides an AI-powered cybersecurity SaaS platform including vulnerability assessment, penetration testing management, threat intelligence feeds, compliance automation, incident response tools, and an AI security assistant.",
      "Services are provided on an 'as-is' basis and may be updated, modified, or discontinued at any time with reasonable notice.",
      "Certain features may be restricted based on your subscription tier.",
      "Uptime SLA of 99.9% applies to paid Enterprise plans as defined in the applicable Order Form.",
    ],
  },
  {
    id: "acceptable-use",
    icon: AlertTriangle,
    title: "3. Acceptable Use",
    color: "text-cyber-yellow",
    content: [
      "You may use GetCyber only for lawful cybersecurity purposes on systems you own or have explicit written authorization to test.",
      "You must not use the platform to conduct unauthorized access, vulnerability scanning, or penetration testing on third-party systems without their consent.",
      "You must not use the platform to develop offensive cyber tools intended for illegal use.",
      "You must not attempt to circumvent any security controls, rate limits, or access restrictions of the platform itself.",
      "Violation of acceptable use may result in immediate account termination and reporting to law enforcement.",
    ],
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "4. Subscription & Billing",
    color: "text-cyber-purple",
    content: [
      "Paid subscriptions are billed in advance on a monthly or annual basis depending on the plan selected.",
      "All fees are non-refundable except as required by applicable law or as specified in a signed Order Form.",
      "We reserve the right to change pricing with 30 days written notice. Price changes take effect at the next renewal date.",
      "Failure to pay may result in suspension of your account after a 10-day grace period.",
      "Annual plans may be cancelled within 14 days of renewal for a pro-rated refund.",
    ],
  },
  {
    id: "data",
    icon: Lock,
    title: "5. Data Ownership & License",
    color: "text-cyber-cyan",
    content: [
      "You retain all intellectual property rights in data you input into the platform, including security scan results, asset inventories, and custom reports.",
      "By using our services, you grant GetCyber a limited, non-exclusive license to process your data solely for the purpose of providing the contracted services.",
      "GetCyber does not claim ownership of your data and will not use it for any purpose other than service delivery.",
      "Aggregated, anonymized platform usage data may be used for product improvement and security research.",
    ],
  },
  {
    id: "liability",
    icon: Scale,
    title: "6. Limitation of Liability",
    color: "text-cyber-orange",
    content: [
      "GetCyber's total cumulative liability for any claims arising from or related to these Terms is limited to the amount paid by you in the 12 months preceding the claim.",
      "We are not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits or business interruption.",
      "GetCyber is not liable for damages arising from your failure to implement recommended security controls or patches.",
      "Nothing in these Terms excludes liability for gross negligence, fraud, or death/personal injury caused by our negligence.",
    ],
  },
  {
    id: "termination",
    icon: XCircle,
    title: "7. Termination",
    color: "text-cyber-red",
    content: [
      "Either party may terminate these Terms at any time by providing 30 days written notice.",
      "GetCyber may terminate immediately if you materially breach these Terms and fail to cure within 10 days of notice.",
      "Upon termination, your access to the platform ceases. We will retain your data for 30 days to allow export.",
      "After the 30-day retention period, all your data will be permanently deleted from our systems.",
      "Provisions that by their nature should survive termination (liability, IP rights, governing law) will remain in effect.",
    ],
  },
  {
    id: "governing-law",
    icon: Clock,
    title: "8. Governing Law & Dispute Resolution",
    color: "text-cyber-blue",
    content: [
      "These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles.",
      "Disputes will be resolved by binding arbitration under the AAA Commercial Arbitration Rules, except for injunctive relief.",
      "You waive any right to participate in class action lawsuits against GetCyber.",
      "EU and UK users retain rights under applicable consumer protection laws.",
    ],
  },
  {
    id: "contact-terms",
    icon: Mail,
    title: "9. Legal Contact",
    color: "text-cyber-green",
    content: [
      "Legal inquiries and notices: legal@getcyber.io",
      "Mailing address: GetCyber, Inc., 101 Security Blvd, Suite 500, San Francisco, CA 94105, USA",
      "For DMCA takedown requests: dmca@getcyber.io",
      "For law enforcement requests: lawenforcement@getcyber.io",
    ],
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero */}
      <section className="py-12 sm:py-16 text-center relative z-10" id="hero">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Legal Agreement
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-dark-text text-xs sm:text-sm font-mono mb-4">Last updated: July 1, 2026 · Global Commercial Standard</p>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Please review these Terms carefully before accessing GetCyber platforms, threat intelligence endpoints, or automated API services.
          </p>
        </div>
      </section>

      {/* Quick Nav */}
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
            <p className="text-white font-display font-bold text-base mb-1">Questions regarding Terms?</p>
            <p className="text-dark-text text-xs">Our legal counsel and compliance officers are available to assist.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="cyber-btn-secondary text-xs py-2.5 px-5 rounded-xl font-semibold">Contact Legal</Link>
            <Link to="/privacy" className="cyber-btn-primary text-xs py-2.5 px-5 rounded-xl font-semibold flex items-center gap-1.5">
              Privacy Policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
