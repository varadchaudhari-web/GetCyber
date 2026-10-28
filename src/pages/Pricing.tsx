import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Shield, Zap, Building2, HelpCircle, ArrowRight, Check } from "lucide-react";
import { PRICING_PLANS } from "@/constants/mockData";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, with prorated billing adjustments." },
  { q: "Is there a free trial?", a: "All paid plans include a 14-day free trial with full feature access. No credit card required to start." },
  { q: "What compliance frameworks are supported?", a: "We support ISO 27001, SOC 2, NIST CSF, GDPR, PCI DSS, HIPAA, FedRAMP, and 35+ additional frameworks." },
  { q: "How does the AI assistant work?", a: "GC-AI uses your live security data for context-aware analysis, threat investigation, and reporting. It processes data within your secure environment." },
  { q: "Is there an on-premise deployment option?", a: "On-premise and hybrid deployment is available on the Enterprise plan. Contact our sales team for architecture consultation." },
  { q: "What support is included?", a: "Starter includes community support. Professional includes priority email support. Enterprise includes 24/7 phone support with a dedicated Customer Success Manager." },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

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

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#05070F] text-slate-100 relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-cyber-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-cyber-green/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero */}
      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 header-reveal">
          <span className="text-xs font-mono uppercase tracking-wider text-cyber-blue font-semibold bg-cyber-blue/10 border border-cyber-blue/30 px-3 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Predictable Security Investment
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Deploy enterprise AI cyber defense today. Start free, scale as your cloud attack surface expands.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xs sm:text-sm font-semibold ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-12 h-6 bg-[#0B101E] rounded-full p-0.5 border border-white/15 relative transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full bg-cyber-blue transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}>
              <span>Annual Billing</span>
              <span className="text-[10px] text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 rounded-full font-bold">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16 sm:pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PRICING_PLANS.map((plan) => {
              const isPopular = plan.popular;
              const calculatedPrice =
                billingCycle === "yearly"
                  ? Math.round(plan.price * 0.8)
                  : plan.price;

              return (
                <div
                  key={plan.id}
                  data-tilt-card
                  data-glow={isPopular ? "rgba(37, 99, 235, 0.35)" : "rgba(34, 197, 94, 0.25)"}
                  className={`tilt-card rounded-[24px] p-6 sm:p-8 flex flex-col justify-between relative cursor-pointer shadow-2xl transition-all ${
                    isPopular
                      ? "bg-gradient-to-b from-[#0F1B38] to-[#0A1020] border-2 border-cyber-blue ring-1 ring-cyber-blue/40 shadow-glow-blue"
                      : "bg-[#0B101E]/85 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-blue text-white text-[10px] font-mono uppercase font-bold tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {plan.id === "free" && <Shield className="w-5 h-5 text-slate-400" />}
                      {plan.id === "professional" && <Zap className="w-5 h-5 text-cyber-blue" />}
                      {plan.id === "enterprise" && <Building2 className="w-5 h-5 text-cyber-green" />}
                      <h2 className="tilt-title font-display text-xl font-bold text-white">{plan.name}</h2>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm mb-5 leading-relaxed">{plan.description}</p>

                    <div className="flex items-baseline gap-1.5 mb-6">
                      <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                        ${calculatedPrice}
                      </span>
                      <span className="text-slate-400 text-xs">/month</span>
                    </div>

                    <Link
                      to="/register"
                      className={`w-full text-center py-3 rounded-xl font-bold text-xs sm:text-sm mb-6 transition-all block ${
                        isPopular
                          ? "cyber-btn-primary shadow-glow-blue"
                          : "cyber-btn-secondary"
                      }`}
                    >
                      {plan.cta}
                    </Link>

                    <div className="space-y-2.5">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-cyber-green flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 text-xs text-slate-500 opacity-60">
                          <XCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 border-y border-white/10 bg-[#080D1A]/50 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white text-center mb-10 header-reveal">
            Why Security Leaders Choose GetCyber
          </h2>
          <div
            data-tilt-card
            className="tilt-card rounded-[22px] bg-[#0B101E]/90 border border-white/10 overflow-hidden shadow-2xl p-4 sm:p-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm min-w-[420px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3.5 px-4 text-slate-400 font-mono text-xs uppercase">Platform Capability</th>
                    <th className="py-3.5 px-4 text-center text-cyber-blue font-bold font-mono">GetCyber SOC</th>
                    <th className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs uppercase">Legacy Scanners</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AI-Powered Exploit Validation & Correlation", true, false],
                    ["Unified Attack Surface & SOC Console", true, false],
                    ["Automated ISO 27001 & SOC 2 Evidence Collection", true, "Manual Addon"],
                    ["Unlimited Continuous Scans", true, "Per-scan pricing"],
                    ["Dark Web & Zero-Day Threat Stream", true, "Partial"],
                    ["Deterministic 15s SOAR Containment", true, false],
                    ["Executive & Board-Level Audit PDFs", true, true],
                  ].map(([feat, us, others], idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 text-slate-200 font-medium">{feat as string}</td>
                      <td className="py-3 px-4 text-center">
                        {us === true ? <CheckCircle className="w-4 h-4 text-cyber-green mx-auto" /> : <span className="text-cyber-blue font-mono text-xs">{us}</span>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {others === false ? <XCircle className="w-4 h-4 text-slate-600 mx-auto" /> : <span className="text-slate-400 font-mono text-xs">{others as string}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white text-center mb-10 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-cyber-blue" />
            <span>Pricing & Architecture FAQ</span>
          </h2>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B101E]/80 border border-white/10 p-5 shadow-lg hover:border-cyber-blue/30 transition-all"
              >
                <h3 className="font-semibold text-white text-sm mb-1.5">{faq.q}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 rounded-2xl bg-[#0B101E]/60 border border-white/10">
            <h4 className="font-bold text-white text-base mb-1">Require a custom enterprise deployment?</h4>
            <p className="text-slate-400 text-xs mb-4">Dedicated SOC instances, air-gapped support, and custom SLAs available.</p>
            <Link to="/contact" className="cyber-btn-primary text-xs py-2.5 px-6 font-bold shadow-glow-blue inline-flex items-center gap-2">
              <span>Speak with Security Architect</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
