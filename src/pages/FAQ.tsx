import { HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "What is GetCyber?", a: "GetCyber is an AI-powered cybersecurity platform providing vulnerability assessment, penetration testing management, threat intelligence, compliance, and incident response in one unified dashboard." },
  { q: "How does the free plan work?", a: "The free Starter plan includes 5 asset scans per month, basic vulnerability assessment, and a security score dashboard. No credit card required." },
  { q: "Can I try the platform before purchasing?", a: "Yes! All paid plans include a 14-day free trial with full feature access. You can also use the demo login on our login page to explore the platform instantly." },
  { q: "What compliance frameworks are supported?", a: "We support 40+ frameworks including ISO 27001, SOC 2, NIST CSF 2.0, GDPR, PCI DSS 4.0, HIPAA, FedRAMP, CIS Controls, and more." },
  { q: "Is my data secure on GetCyber?", a: "Absolutely. GetCyber is SOC 2 Type II certified and ISO 27001 compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never share your security data." },
  { q: "Does GetCyber integrate with existing tools?", a: "Yes. We offer native integrations with Splunk, QRadar, Microsoft Sentinel, Jira, ServiceNow, Slack, Microsoft Teams, AWS Security Hub, and more via REST API." },
  { q: "How does GC-AI work?", a: "GC-AI is our proprietary AI engine trained on billions of threat indicators. It analyzes your live security data to provide context-aware threat analysis, recommendations, and reports in natural language." },
  { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time with no penalties. You'll retain access until the end of your billing period." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Knowledge Base & Answers
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            Frequently Asked <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-teal to-cyber-green bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about GetCyber architecture, security certifications, pricing, and enterprise deployment.
          </p>
        </div>
      </section>

      <section className="pb-20 relative z-10">
        <div className="max-w-3xl mx-auto px-4 space-y-3.5">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-[20px] transition-all duration-300 border backdrop-blur-xl ${
                open === i
                  ? "bg-[#0B101E]/95 border-cyber-blue/40 shadow-xl shadow-cyber-blue/5"
                  : "bg-[#0B101E]/75 border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
              >
                <span className="font-display font-semibold text-white text-base sm:text-lg pr-4 group-hover:text-cyber-blue transition-colors">
                  {faq.q}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-mono flex-shrink-0 transition-transform ${
                  open === i ? "bg-cyber-blue text-white rotate-180" : "bg-white/5 text-dark-text group-hover:text-white"
                }`}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-5 sm:px-6 pb-6 text-dark-text text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
