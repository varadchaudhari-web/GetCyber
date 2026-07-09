import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Building2, CheckCircle, Shield } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Contact Us</p>
          <h1 className="text-5xl font-black text-white mb-4">Get In Touch</h1>
          <p className="text-dark-text text-xl">Talk to our security experts, request a demo, or get help with your account.</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-5">
                <Mail className="w-5 h-5 text-cyber-blue mb-3" />
                <h3 className="font-bold text-white mb-1">Email Us</h3>
                <a href="mailto:security@getcyber.io" className="text-cyber-blue text-sm hover:underline">security@getcyber.io</a>
                <p className="text-dark-text text-xs mt-1">Response within 4 hours</p>
              </div>
              <div className="glass-card p-5">
                <Phone className="w-5 h-5 text-cyber-green mb-3" />
                <h3 className="font-bold text-white mb-1">Call Us</h3>
                <a href="tel:+18005551234" className="text-dark-text-bright text-sm">+1 (800) 555-CYBER</a>
                <p className="text-dark-text text-xs mt-1">Mon–Fri 9am–6pm PT</p>
              </div>
              <div className="glass-card p-5">
                <MapPin className="w-5 h-5 text-cyber-purple mb-3" />
                <h3 className="font-bold text-white mb-1">Our Office</h3>
                <p className="text-dark-text text-sm">101 Security Blvd, Suite 500<br />San Francisco, CA 94105</p>
              </div>
              <div className="glass-card p-5">
                <Building2 className="w-5 h-5 text-cyber-yellow mb-3" />
                <h3 className="font-bold text-white mb-1">Enterprise Sales</h3>
                <a href="mailto:enterprise@getcyber.io" className="text-cyber-yellow text-sm hover:underline">enterprise@getcyber.io</a>
                <p className="text-dark-text text-xs mt-1">Custom pricing & deployment</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 glass-card p-8">
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyber-blue" /> Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="label-cyber">Full Name</label><input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="input-cyber" placeholder="Alex Morgan" required /></div>
                      <div><label className="label-cyber">Work Email</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="input-cyber" placeholder="alex@company.com" required /></div>
                    </div>
                    <div><label className="label-cyber">Company</label><input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} className="input-cyber" placeholder="TechCorp Inc." /></div>
                    <div><label className="label-cyber">Subject</label>
                      <select className="input-cyber">
                        <option>Request a Demo</option>
                        <option>Sales Inquiry</option>
                        <option>Technical Support</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div><label className="label-cyber">Message</label><textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="input-cyber min-h-[140px] resize-none" placeholder="Tell us how we can help..." required /></div>
                    <button type="submit" className="cyber-btn-primary w-full py-3">Send Message</button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-cyber-green mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-dark-text mb-4">Thank you, {form.name}. Our team will respond within 4 business hours.</p>
                  <button onClick={() => setSubmitted(false)} className="cyber-btn-secondary">Send Another Message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="py-12 bg-dark-surface border-t border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-cyber-red/10 border border-cyber-red/30 px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4 text-cyber-red animate-pulse" />
            <span className="text-cyber-red font-semibold text-sm">Security Emergency?</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">24/7 Incident Response Hotline</h2>
          <p className="text-dark-text mb-4">Active breach or ransomware attack? Our emergency response team is available 24/7.</p>
          <a href="tel:+18005550911" className="cyber-btn-danger inline-flex items-center gap-2 text-cyber-red">
            <Phone className="w-4 h-4" /> +1 (800) 555-0911 — Emergency Response
          </a>
        </div>
      </section>
    </div>
  );
}
