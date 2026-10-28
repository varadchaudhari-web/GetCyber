import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageSquare, Building2, CheckCircle, Shield } from "lucide-react";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyber-teal/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4 header-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Get In Touch
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            Connect With Our <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-teal to-cyber-green bg-clip-text text-transparent">
              Security Operations Experts
            </span>
          </h1>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Request an enterprise architecture review, book a private SOC demo, or speak with an on-call security engineer.
          </p>
        </div>
      </section>

      <section className="pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div
                data-tilt-card
                data-glow="rgba(56, 122, 255, 0.3)"
                className="tilt-card p-6 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-blue/40 shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-cyber-blue" />
                </div>
                <h3 className="tilt-title font-display font-bold text-white text-base mb-1">Email Us</h3>
                <a href="mailto:security@getcyber.io" className="text-cyber-blue text-sm hover:underline font-mono">security@getcyber.io</a>
                <p className="text-dark-text text-xs mt-1">Guaranteed response within 4 hours</p>
              </div>

              <div
                data-tilt-card
                data-glow="rgba(34, 197, 94, 0.3)"
                className="tilt-card p-6 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-green/40 shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-cyber-green" />
                </div>
                <h3 className="tilt-title font-display font-bold text-white text-base mb-1">Direct Call</h3>
                <a href="tel:+18005551234" className="text-dark-text-bright text-sm font-mono">+1 (800) 555-CYBER</a>
                <p className="text-dark-text text-xs mt-1">Mon–Fri 9am–6pm PT (Global Lines)</p>
              </div>

              <div
                data-tilt-card
                data-glow="rgba(167, 123, 255, 0.3)"
                className="tilt-card p-6 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-purple/40 shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-cyber-purple" />
                </div>
                <h3 className="tilt-title font-display font-bold text-white text-base mb-1">Global Headquarters</h3>
                <p className="text-dark-text text-sm leading-relaxed">101 Security Blvd, Suite 500<br />San Francisco, CA 94105</p>
              </div>

              <div
                data-tilt-card
                data-glow="rgba(245, 158, 11, 0.3)"
                className="tilt-card p-6 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-yellow/40 shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-cyber-yellow/10 border border-cyber-yellow/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-cyber-yellow" />
                </div>
                <h3 className="tilt-title font-display font-bold text-white text-base mb-1">Enterprise Advisory</h3>
                <a href="mailto:enterprise@getcyber.io" className="text-cyber-yellow text-sm hover:underline font-mono">enterprise@getcyber.io</a>
                <p className="text-dark-text text-xs mt-1">Dedicated solutions architects & SLAs</p>
              </div>
            </div>

            {/* Contact Form */}
            <div
              data-tilt-card
              data-glow="rgba(56, 122, 255, 0.25)"
              className="tilt-card lg:col-span-2 p-8 sm:p-10 rounded-[24px] bg-[#0B101E]/90 backdrop-blur-2xl border border-white/10 shadow-2xl relative"
            >
              {!submitted ? (
                <>
                  <h2 className="tilt-title text-2xl font-display font-bold text-white mb-2 flex items-center gap-2.5">
                    <MessageSquare className="w-6 h-6 text-cyber-blue" /> Send a Direct Transmission
                  </h2>
                  <p className="text-dark-text text-sm mb-8">
                    Fill out the fields below and our SOC dispatch will route your message to the appropriate engineer.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-cyber text-xs uppercase font-mono tracking-wider">Full Name</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          className="input-cyber bg-[#05070F]/80 border-white/10 rounded-xl"
                          placeholder="Alex Morgan"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-cyber text-xs uppercase font-mono tracking-wider">Work Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className="input-cyber bg-[#05070F]/80 border-white/10 rounded-xl"
                          placeholder="alex@company.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-cyber text-xs uppercase font-mono tracking-wider">Company / Organization</label>
                      <input
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                        className="input-cyber bg-[#05070F]/80 border-white/10 rounded-xl"
                        placeholder="Acme Financial Corp"
                      />
                    </div>
                    <div>
                      <label className="label-cyber text-xs uppercase font-mono tracking-wider">Inquiry Topic</label>
                      <select className="input-cyber bg-[#05070F]/80 border-white/10 rounded-xl text-dark-text-bright">
                        <option>Request an Enterprise Demo</option>
                        <option>SOC Command Center Licensing</option>
                        <option>Technical Architecture Review</option>
                        <option>Compliance Audit Acceleration</option>
                        <option>Integration & API Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-cyber text-xs uppercase font-mono tracking-wider">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        className="input-cyber min-h-[140px] resize-none bg-[#05070F]/80 border-white/10 rounded-xl"
                        placeholder="Tell us about your infrastructure scope, compliance needs, or threat hunting requirements..."
                        required
                      />
                    </div>
                    <button type="submit" className="cyber-btn-primary w-full py-3.5 rounded-xl font-semibold shadow-glow-blue">
                      Transmit Secure Message
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-cyber-green" />
                  </div>
                  <h3 className="tilt-title text-2xl font-display font-bold text-white mb-2">Transmission Received</h3>
                  <p className="text-dark-text max-w-md mx-auto mb-6 text-sm">
                    Thank you, {form.name}. A GetCyber enterprise security engineer has been notified and will respond to {form.email} within 4 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="cyber-btn-secondary text-xs py-2.5 px-6 rounded-xl">
                    Send Another Transmission
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Hotline */}
      <section className="py-14 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-8 sm:p-10 rounded-[24px] bg-cyber-red/5 border border-cyber-red/25 backdrop-blur-2xl text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-red/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-2xl mx-auto header-reveal relative z-10">
              <div className="inline-flex items-center gap-2 bg-cyber-red/15 border border-cyber-red/30 px-3.5 py-1.5 rounded-full mb-3">
                <Shield className="w-4 h-4 text-cyber-red animate-pulse" />
                <span className="text-cyber-red font-semibold text-xs uppercase tracking-wider font-mono">24/7 Incident Hotline</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-3">Active Breach or Ransomware Emergency?</h2>
              <p className="text-dark-text text-sm sm:text-base mb-6 leading-relaxed">
                If your organization is currently experiencing an unauthorized intrusion or ransomware extortion, contact our 24/7 global rapid response unit immediately.
              </p>
              <a
                href="tel:+18005550911"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyber-red text-white font-bold text-sm hover:bg-cyber-red/90 transition-colors shadow-lg shadow-cyber-red/30"
              >
                <Phone className="w-4 h-4 animate-bounce" /> +1 (800) 555-0911 — Emergency SOC Dispatch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
