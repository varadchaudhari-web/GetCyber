import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, Twitter, Linkedin, Github, Youtube, Mail, Phone, MapPin, ExternalLink, Activity } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/getcyber", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/getcyber", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/getcyber", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/getcyber", label: "YouTube" },
];

const certifications = ["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "FedRAMP Ready", "PCI DSS"];

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
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLink = (href: string) => {
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSolutionLink = (hash: string) => {
    if (window.location.pathname === "/solutions") {
      scrollToSection(hash);
    } else {
      navigate(`/solutions#${hash}`);
    }
  };

  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      {/* Newsletter */}
      <div className="border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Stay Ahead of Cyber Threats</h3>
              <p className="text-dark-text text-sm">Weekly threat intelligence, security tips, and platform updates.</p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input type="email" placeholder="Your email address" className="input-cyber flex-1 lg:w-72" />
              <button className="cyber-btn-primary whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-cyber-blue/20 rounded-lg flex items-center justify-center border border-cyber-blue/40">
                <Shield className="w-5 h-5 text-cyber-blue" />
              </div>
              <span className="font-bold text-xl text-white">
                Get<span className="text-gradient-blue">Cyber</span>
              </span>
            </Link>
            <p className="text-dark-text text-sm leading-relaxed mb-6">
              Enterprise AI-powered cybersecurity platform protecting organizations worldwide from modern cyber threats.
            </p>
            <div className="space-y-2.5 mb-6">
              <a href="mailto:security@getcyber.io" className="flex items-center gap-2 text-sm text-dark-text hover:text-cyber-blue transition-colors">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                security@getcyber.io
              </a>
              <a href="tel:+18005551234" className="flex items-center gap-2 text-sm text-dark-text hover:text-cyber-blue transition-colors">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                +1 (800) 555-CYBER
              </a>
              <div className="flex items-center gap-2 text-sm text-dark-text">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                San Francisco, CA 94105
              </div>
            </div>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 bg-dark-card rounded-lg flex items-center justify-center text-dark-text hover:text-cyber-blue border border-dark-border transition-all duration-200 hover:bg-cyber-blue/10 hover:border-cyber-blue/50"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleQuickLink(link.href)}
                    className="text-sm text-dark-text hover:text-cyber-blue transition-colors duration-150 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Security Solutions</h4>
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
                    className="text-sm text-dark-text hover:text-cyber-blue transition-colors duration-150 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs text-dark-text">Certified:</span>
              {certifications.map((cert) => (
                <span key={cert} className="text-xs bg-dark-card border border-dark-border text-dark-text-bright px-2.5 py-1 rounded-full">
                  {cert}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <Link to="/status" className="text-xs text-cyber-green hover:text-cyber-green-light flex items-center gap-1 transition-colors">
                All Systems Operational
                <Activity className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-dark-text">
              © {new Date().getFullYear()} GetCyber, Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-xs text-dark-text hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-xs text-dark-text hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookie-settings" className="text-xs text-dark-text hover:text-white transition-colors">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
