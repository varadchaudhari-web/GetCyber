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
    <div className="min-h-screen pt-24">
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <HelpCircle className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
          <h1 className="text-5xl font-black text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-dark-text text-xl">Everything you need to know about GetCyber.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                <span className="text-cyber-blue text-xl flex-shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="px-5 pb-5 text-dark-text text-sm leading-relaxed border-t border-dark-border pt-4">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
