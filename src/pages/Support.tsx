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
    <div className="min-h-screen pt-24 pb-20">
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-black text-white mb-4">Support Center</h1>
          <p className="text-dark-text text-xl mb-8">How can we help you today?</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-text" />
            <input className="input-cyber pl-12 py-4 text-base" placeholder="Search support articles..." />
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[{ icon: MessageSquare, title: "Live Chat", desc: "Chat with support now", color: "text-cyber-blue", action: "Start Chat" }, { icon: Mail, title: "Email Support", desc: "support@getcyber.io", color: "text-cyber-green", action: "Send Email" }, { icon: Phone, title: "Phone Support", desc: "+1 (800) 555-CYBER", color: "text-cyber-purple", action: "Call Now" }].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="glass-card p-6 text-center">
                  <Icon className={`w-8 h-8 ${c.color} mx-auto mb-3`} />
                  <h3 className="font-bold text-white mb-1">{c.title}</h3>
                  <p className="text-dark-text text-sm mb-4">{c.desc}</p>
                  <button className="cyber-btn-secondary text-sm w-full">{c.action}</button>
                </div>
              );
            })}
          </div>
          <div className="glass-card p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-cyber-blue" /> Popular Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {articles.map((a) => (
                <button key={a} className="flex items-center gap-2 p-3 bg-dark-card/40 border border-dark-border rounded-lg hover:border-cyber-blue/40 transition-all text-left text-sm text-dark-text-bright">
                  <CheckCircle className="w-4 h-4 text-cyber-blue flex-shrink-0" />{a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
