import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Shield, Zap, Building2, HelpCircle } from "lucide-react";
import { PRICING_PLANS } from "@/constants/mockData";

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, with prorated billing adjustments." },
  { q: "Is there a free trial?", a: "All paid plans include a 14-day free trial with full feature access. No credit card required to start." },
  { q: "What compliance frameworks are supported?", a: "We support ISO 27001, SOC 2, NIST CSF, GDPR, PCI DSS, HIPAA, FedRAMP, and 35+ additional frameworks." },
  { q: "How does the AI assistant work?", a: "GC-AI uses your live security data for context-aware analysis, threat investigation, and reporting. It processes data within your secure environment." },
  { q: "Is there an on-premise deployment option?", a: "On-premise and hybrid deployment is available on the Enterprise plan. Contact our sales team for architecture consultation." },
  { q: "What support is included?", a: "Starter includes community support. Professional includes priority email support. Enterprise includes 24/7 phone support with a dedicated Customer Success Manager." },
];

export default function Pricing() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Pricing</p>
          <h1 className="text-5xl font-black text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-dark-text text-xl max-w-2xl mx-auto">Start free, scale as you grow. No hidden fees, no per-seat tricks.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.id} className={`glass-card p-8 flex flex-col relative ${plan.popular ? "border-cyber-blue/50" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-blue text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {plan.id === "free" && <Shield className="w-5 h-5 text-dark-text" />}
                    {plan.id === "professional" && <Zap className="w-5 h-5 text-cyber-blue" />}
                    {plan.id === "enterprise" && <Building2 className="w-5 h-5 text-cyber-green" />}
                    <h2 className="text-xl font-bold text-white">{plan.name}</h2>
                  </div>
                  <p className="text-dark-text text-sm mb-4">{plan.description}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white">${plan.price}</span>
                    <span className="text-dark-text mb-2">/{plan.period}</span>
                  </div>
                </div>

                <Link
                  to="/register"
                  className={`w-full text-center py-3 rounded-lg font-semibold text-sm mb-6 transition-all block ${plan.popular ? "cyber-btn-primary" : plan.id === "enterprise" ? "cyber-btn-green" : "cyber-btn-secondary"}`}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-cyber-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-dark-text-bright">{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 opacity-50">
                      <XCircle className="w-4 h-4 text-dark-text flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-dark-text">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 bg-dark-surface border-y border-dark-border">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white text-center mb-12">Why GetCyber vs Others?</h2>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left p-4 text-dark-text">Feature</th>
                  <th className="p-4 text-cyber-blue font-bold">GetCyber</th>
                  <th className="p-4 text-dark-text">Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI-Powered Security Analysis", true, false],
                  ["All-in-One Platform", true, false],
                  ["Dark Web Monitoring", true, "Addon"],
                  ["Unlimited Scans", true, "Limited"],
                  ["40+ Compliance Frameworks", true, false],
                  ["Real-time Threat Intelligence", true, "Partial"],
                  ["Executive Reporting", true, true],
                  ["On-premise Deployment", true, "Enterprise only"],
                ].map(([feat, us, others]) => (
                  <tr key={feat as string} className="border-b border-dark-border/50">
                    <td className="p-4 text-dark-text-bright">{feat as string}</td>
                    <td className="p-4 text-center">{us === true ? <CheckCircle className="w-4 h-4 text-cyber-green mx-auto" /> : <span className="text-cyber-blue text-xs">{us}</span>}</td>
                    <td className="p-4 text-center">{others === false ? <XCircle className="w-4 h-4 text-dark-text mx-auto opacity-50" /> : <span className="text-dark-text text-xs">{others as string}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white text-center mb-12 flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-cyber-blue" /> Pricing FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card p-5">
                <h3 className="font-bold text-white mb-2 text-sm">{faq.q}</h3>
                <p className="text-dark-text text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-dark-text mb-4">Have more questions?</p>
            <Link to="/contact" className="cyber-btn-primary">Contact Our Sales Team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
