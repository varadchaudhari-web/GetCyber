import { Link } from "react-router-dom";
import { MessageSquare, BookOpen, Phone, Mail, Search, CheckCircle } from "lucide-react";

const articles = [
  "How to run your first vulnerability scan",
  "Setting up Multi-Factor Authentication (MFA)",
  "Integrating GetCyber with Splunk SIEM",
  "Creating and managing compliance frameworks",
  "Using GC-AI for threat analysis",
  "Generating executive security reports",
  "Managing team roles and permissions",
  "Configuring automated scan schedules",
];

export default function Support() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            SOC Helpdesk & Client Care
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            How Can We <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-teal to-cyber-green bg-clip-text text-transparent">
              Assist You Today?
            </span>
          </h1>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Access 24/7 technical documentation, direct engineer ticketing, or speak with an assigned cybersecurity specialist.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-text" />
            <input
              className="input-cyber pl-12 py-3.5 text-sm bg-[#0B101E]/90 border-white/10 rounded-xl focus:border-cyber-blue"
              placeholder="Search knowledge base, CVE guides, playbooks..."
            />
          </div>
        </div>
      </section>

      <section className="pb-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: MessageSquare, title: "Live SOC Chat", desc: "Average response: under 2 mins", color: "text-cyber-blue", action: "Open Chat Console" },
              { icon: Mail, title: "Email Support", desc: "support@getcyber.io", color: "text-cyber-green", action: "Submit Ticket" },
              { icon: Phone, title: "Priority Hotline", desc: "+1 (800) 555-CYBER", color: "text-cyber-purple", action: "Call Engineering" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="p-7 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-blue/40 shadow-xl transition-all duration-300 text-center group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${c.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-white mb-1 text-base">{c.title}</h3>
                  <p className="text-dark-text text-xs mb-6 font-mono">{c.desc}</p>
                  <button className="cyber-btn-secondary text-xs w-full py-2.5 rounded-xl font-semibold">
                    {c.action}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-8 rounded-[24px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h2 className="font-display font-bold text-white mb-5 text-lg flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-cyber-blue" /> Frequently Consulted Playbooks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {articles.map((a) => (
                <button
                  key={a}
                  className="flex items-center gap-3 p-4 bg-[#05070F]/80 border border-white/5 rounded-xl hover:border-cyber-blue/40 transition-all text-left text-xs text-dark-text-bright group"
                >
                  <CheckCircle className="w-4 h-4 text-cyber-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">{a}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
