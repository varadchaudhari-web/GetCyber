import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Shield,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Activity,
  ArrowUp,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/getcyber", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/getcyber", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/getcyber", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/getcyber", label: "YouTube" },
];

const certifications = ["SOC 2 Type II", "ISO 27001:2022", "GDPR Compliant", "HIPAA Compliant", "PCI DSS v4.0", "NIST 800-207"];

const quickLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Documentation", href: "/documentation" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support" },
  { label: "Platform Status", href: "/status" },
  { label: "FAQ", href: "/faq" },
];

function scrollToSection(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickLink = (href: string) => {
    scrollToTop();
    navigate(href);
  };

  const handleSolutionLink = (hash: string) => {
    if (location.pathname === "/solutions") {
      scrollToSection(hash);
    } else {
      navigate(`/solutions#${hash}`);
      setTimeout(() => scrollToSection(hash), 150);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid work email.");
      return;
    }
    toast.success("Subscribed to GetCyber Threat Intelligence Briefing!");
    setEmail("");
  };

  return (
    <footer className="bg-[#05070F] border-t border-white/10 text-slate-300 relative z-20">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                Stay Ahead of Emerging Cyber Threats
              </h3>
              <p className="text-slate-400 text-sm">
                Zero-day advisories, reverse engineering reports, and SOC mitigation playbooks delivered weekly.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2.5 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your security team email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-cyber flex-1 lg:w-80 text-xs sm:text-sm bg-[#0B101E] border-white/10 focus:border-cyber-blue"
              />
              <button type="submit" className="cyber-btn-primary text-xs sm:text-sm whitespace-nowrap shadow-glow-blue">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <button
              onClick={() => {
                scrollToTop();
                navigate("/");
              }}
              className="inline-flex items-center gap-2.5 mb-4 group text-left"
            >
              <div className="w-9 h-9 bg-cyber-blue/15 rounded-xl flex items-center justify-center border border-cyber-blue/40 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-cyber-blue" />
              </div>
              <span className="font-display font-black text-xl text-white">
                Get<span className="text-gradient-blue">Cyber</span>
              </span>
            </button>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
              Enterprise AI-powered cybersecurity platform protecting cloud infrastructure, identity, and endpoints at machine speed.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#0B101E] border border-white/10 hover:border-cyber-blue/40 hover:text-cyber-blue flex items-center justify-center transition-all"
                    title={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs font-bold text-white mb-4 uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleQuickLink(link.href)}
                    className="text-xs sm:text-sm text-slate-400 hover:text-cyber-blue transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Solutions */}
          <div>
            <h4 className="font-display text-xs font-bold text-white mb-4 uppercase tracking-wider text-slate-200">
              Security Capabilities
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Vulnerability Assessment", hash: "vulnerability" },
                { label: "Penetration Testing", hash: "pentest" },
                { label: "Threat Intelligence", hash: "threat" },
                { label: "Compliance Management", hash: "compliance" },
                { label: "Incident Response", hash: "incident" },
                { label: "AI Security Assistant", hash: "ai" },
              ].map((item) => (
                <li key={item.hash}>
                  <button
                    onClick={() => handleSolutionLink(item.hash)}
                    className="text-xs sm:text-sm text-slate-400 hover:text-cyber-blue transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Back to Top Column */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-display text-xs font-bold text-white mb-4 uppercase tracking-wider text-slate-200">
                Security Headquarters
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                24/7 SOC Telemetry & Autonomous Incident Dispatch
              </p>
              <p className="text-xs font-mono text-cyber-blue">security-operations@getcyber.io</p>
            </div>

            {/* Back to top button */}
            <div className="pt-6">
              <button
                onClick={scrollToTop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B101E] border border-white/10 hover:border-cyber-blue/40 text-xs font-semibold text-slate-300 hover:text-white shadow-lg transition-all group"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-cyber-blue group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Bar */}
      <div className="border-t border-white/10 bg-[#04060C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="text-[11px] font-mono text-slate-400">Validated:</span>
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] font-mono bg-[#0B101E] border border-white/10 text-slate-300 px-2.5 py-0.5 rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <button
                onClick={() => handleQuickLink("/status")}
                className="text-xs font-mono text-cyber-green hover:underline flex items-center gap-1"
              >
                All 128 Global Sensors Operational
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Legal Links */}
      <div className="border-t border-white/5 bg-[#03050A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} GetCyber Security Technologies, Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <button onClick={() => handleQuickLink("/privacy")} className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => handleQuickLink("/terms")} className="hover:text-white transition-colors">
                Terms of Service
              </button>
              <button onClick={() => handleQuickLink("/cookie-settings")} className="hover:text-white transition-colors">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
