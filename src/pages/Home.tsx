import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, ChevronRight, Play, AlertTriangle, Activity, Target,
  CheckCircle, Lock, Bot, BarChart3, Zap, Globe, ArrowRight,
  Star, TrendingUp, Users, Building2, Award, Cpu,
  Landmark, Hospital, University, Laptop2, GraduationCap, ShoppingCart, Zap as BoltIcon, Scale
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import AuthPromptModal from "@/components/shared/AuthPromptModal";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "99.7%", label: "Threat Detection Rate", icon: Shield },
  { value: "10,000+", label: "Organizations Protected", icon: Building2 },
  { value: "2.3M+", label: "Threats Blocked Daily", icon: AlertTriangle },
  { value: "<2min", label: "Mean Time to Detect", icon: Zap },
];

const solutions = [
  { icon: AlertTriangle, title: "Vulnerability Assessment", desc: "Continuously scan your attack surface for weaknesses before attackers exploit them.", color: "text-cyber-blue", bg: "bg-cyber-blue/10", border: "border-cyber-blue/20", href: "/solutions#vulnerability" },
  { icon: Target, title: "Penetration Testing", desc: "Simulate real cyberattacks with expert-led and automated pen testing workflows.", color: "text-cyber-red", bg: "bg-cyber-red/10", border: "border-cyber-red/20", href: "/solutions#pentest" },
  { icon: Activity, title: "Threat Intelligence", desc: "Real-time global threat feeds, dark web monitoring, IOC management and APT tracking.", color: "text-cyber-purple", bg: "bg-cyber-purple/10", border: "border-cyber-purple/20", href: "/solutions#threat" },
  { icon: CheckCircle, title: "Compliance Management", desc: "Achieve ISO 27001, SOC 2, NIST, GDPR, and PCI DSS compliance with automated controls.", color: "text-cyber-green", bg: "bg-cyber-green/10", border: "border-cyber-green/20", href: "/solutions#compliance" },
  { icon: Zap, title: "Incident Response", desc: "Detect, contain and recover from security incidents with AI-assisted playbooks.", color: "text-cyber-yellow", bg: "bg-cyber-yellow/10", border: "border-cyber-yellow/20", href: "/solutions#incident" },
  { icon: Bot, title: "AI Security Assistant", desc: "GC-AI analyzes threats, logs, and recommendations 24/7 in natural language.", color: "text-cyber-cyan", bg: "bg-cyber-cyan/10", border: "border-cyber-cyan/20", href: "/solutions#ai" },
];

const features = [
  { title: "Zero-Trust Architecture", desc: "Verify every user, device, and connection with continuous validation." },
  { title: "AI-Powered Detection", desc: "Machine learning models trained on 1B+ threat indicators catch what others miss." },
  { title: "Single Pane of Glass", desc: "Unified dashboard for your entire security stack and threat landscape." },
  { title: "Automated Remediation", desc: "SOAR-powered playbooks respond to threats in seconds, not hours." },
  { title: "Real-Time Analytics", desc: "Continuous risk scoring, KPI tracking, and executive reporting." },
  { title: "Multi-Cloud Support", desc: "Native integrations with AWS, Azure, GCP, and hybrid environments." },
  { title: "Role-Based Access", desc: "Granular RBAC for security analysts, managers, and compliance officers." },
  { title: "API-First Design", desc: "Connect to any SIEM, SOAR, ticketing, or DevSecOps tool via REST API." },
];

const securityStats = [
  { value: "9.8B+", label: "Threat indicators processed", color: "text-cyber-blue" },
  { value: "450+", label: "MITRE ATT&CK techniques covered", color: "text-cyber-green" },
  { value: "40+", label: "Compliance frameworks supported", color: "text-cyber-purple" },
  { value: "99.99%", label: "Platform uptime SLA", color: "text-cyber-yellow" },
  { value: "<30s", label: "Threat alert response time", color: "text-cyber-red" },
  { value: "180+", label: "Countries monitored", color: "text-cyber-cyan" },
];

const industries = [
  { name: "Financial Services", Icon: Landmark, desc: "PCI DSS, SOX compliance and fraud detection", color: "text-cyber-blue" },
  { name: "Healthcare", Icon: Building2, desc: "HIPAA compliance and patient data protection", color: "text-cyber-red" },
  { name: "Government", Icon: Shield, desc: "FedRAMP, FISMA and critical infrastructure", color: "text-cyber-green" },
  { name: "Technology", Icon: Cpu, desc: "DevSecOps integration and SaaS protection", color: "text-cyber-purple" },
  { name: "Education", Icon: GraduationCap, desc: "Student data privacy and research protection", color: "text-cyber-yellow" },
  { name: "Retail", Icon: ShoppingCart, desc: "E-commerce security and payment protection", color: "text-cyber-orange" },
  { name: "Energy", Icon: Zap, desc: "NERC CIP and OT/ICS security", color: "text-cyber-cyan" },
  { name: "Legal", Icon: Scale, desc: "Attorney-client privilege data protection", color: "text-cyber-green" },
];

const testimonials = [
  {
    name: "Jennifer Walsh",
    title: "CISO, Global Financial Corp",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    quote: "GetCyber reduced our mean time to detect threats from 4 hours to under 2 minutes. The AI assistant alone pays for the entire platform.",
    rating: 5,
    company: "Global Financial Corp",
  },
  {
    name: "Marcus Thompson",
    title: "VP of Security, TechScale Inc",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    quote: "We achieved SOC 2 Type II certification in 6 months using GetCyber's compliance automation. Would have taken 2 years manually.",
    rating: 5,
    company: "TechScale Inc",
  },
  {
    name: "Dr. Priya Sharma",
    title: "Head of Cybersecurity, National Health System",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    quote: "GetCyber's threat intelligence helped us prevent a ransomware attack that hit 3 other hospital systems the same week. Invaluable.",
    rating: 5,
    company: "National Health System",
  },
];

function AnimatedCounter({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const match = target.match(/[\d.]+/);
    if (!match) { setDisplay(target); return; }
    const num = parseFloat(match[0]);
    const suffix = target.replace(match[0], "");
    let start = 0;
    const step = duration / 60;
    const increment = num / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(`${start % 1 === 0 ? Math.floor(start) : start.toFixed(1)}${suffix}`);
      }
    }, step);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{display}</span>;
}

export default function Home() {
  const { isAuthenticated, loginWithMock } = useAuthStore();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleDemoLogin = () => {
    loginWithMock("security_analyst");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyber-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full px-4 py-1.5 text-sm text-cyber-blue mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-medium">AI-Powered Cybersecurity Platform</span>
              <span className="text-dark-text">· Trusted by 10,000+ Organizations</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in">
              Defend Your
              <br />
              <span className="text-gradient-cyber">Digital Future</span>
            </h1>

            <p className="text-xl text-dark-text-bright leading-relaxed mb-10 max-w-2xl animate-fade-in">
              GetCyber is the enterprise AI-powered cybersecurity platform that unifies vulnerability assessment, threat intelligence, penetration testing, compliance, and incident response — all in one SOC-grade command center.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in">
              <button onClick={handleGetStarted} className="cyber-btn-primary text-base py-4 px-8 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={handleDemoLogin} className="cyber-btn-secondary text-base py-4 px-8 flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                View Live Demo
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card p-4">
                    <Icon className="w-5 h-5 text-cyber-blue mb-2" />
                    <p className="text-2xl font-black text-white"><AnimatedCounter target={stat.value} /></p>
                    <p className="text-xs text-dark-text mt-0.5">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs text-dark-text">Scroll to explore</p>
          <div className="w-6 h-10 rounded-full border border-dark-border flex items-center justify-center">
            <div className="w-1.5 h-3 bg-cyber-blue rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Platform Overview ── */}
      <section className="py-20 bg-dark-surface border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Platform Overview</p>
            <h2 className="text-4xl font-black text-white mb-4">One Platform. Total Security Coverage.</h2>
            <p className="text-dark-text max-w-2xl mx-auto">Replace your fragmented security tool stack with a unified AI-powered platform that covers every aspect of your cybersecurity program.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {["Vulnerability & Exposure Management", "Penetration Testing & Red Team Ops", "Threat Intelligence & Dark Web Monitoring", "Compliance & GRC Automation", "Incident Detection & Response", "AI Security Operations Center"].map((item, i) => (
                <div key={item} className="flex items-center gap-3 p-4 glass-card hover:border-cyber-blue/40 transition-all cursor-pointer group">
                  <div className="w-8 h-8 bg-cyber-blue/10 rounded-lg flex items-center justify-center border border-cyber-blue/20 group-hover:border-cyber-blue/50 transition-all flex-shrink-0">
                    <span className="text-cyber-blue text-sm font-bold font-mono">0{i + 1}</span>
                  </div>
                  <span className="text-dark-text-bright font-medium">{item}</span>
                  <ChevronRight className="w-4 h-4 text-dark-text ml-auto group-hover:text-cyber-blue transition-colors" />
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="glass-card p-6 border-cyber-blue/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyber-red" />
                    <div className="w-3 h-3 rounded-full bg-cyber-yellow" />
                    <div className="w-3 h-3 rounded-full bg-cyber-green" />
                  </div>
                  <span className="font-mono text-xs text-dark-text">getcyber.io/dashboard</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-dark-card/60 rounded-lg">
                    <span className="text-sm text-dark-text">Risk Score</span>
                    <span className="text-cyber-yellow font-bold text-sm">68 / 100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-card/60 rounded-lg">
                    <span className="text-sm text-dark-text">Critical Vulnerabilities</span>
                    <span className="text-cyber-red font-bold text-sm">12 Open</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-card/60 rounded-lg">
                    <span className="text-sm text-dark-text">Active Threats</span>
                    <span className="text-cyber-orange font-bold text-sm">23 Detected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-card/60 rounded-lg">
                    <span className="text-sm text-dark-text">Compliance Score</span>
                    <span className="text-cyber-green font-bold text-sm">82%</span>
                  </div>
                  <div className="h-2 bg-dark-card rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-gradient-to-r from-cyber-red via-cyber-yellow to-cyber-green rounded-full" style={{ width: "68%" }} />
                  </div>
                  <p className="text-xs text-dark-text text-center">Overall Security Posture: Moderate</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyber-blue/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyber-green/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-cyber-green text-sm font-semibold uppercase tracking-wider mb-3">Security Solutions</p>
            <h2 className="text-4xl font-black text-white mb-4">Complete Security Coverage</h2>
            <p className="text-dark-text max-w-2xl mx-auto">Every security capability you need — seamlessly integrated, AI-enhanced, and built for enterprise scale.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <Link
                  key={sol.title}
                  to={sol.href}
                  className={`glass-card-hover p-6 border ${sol.border} group block`}
                >
                  <div className={`w-12 h-12 ${sol.bg} rounded-xl flex items-center justify-center mb-4 border ${sol.border} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${sol.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{sol.title}</h3>
                  <p className="text-dark-text text-sm leading-relaxed mb-4">{sol.desc}</p>
                  <div className={`flex items-center gap-1 text-sm font-medium ${sol.color}`}>
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-dark-surface border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-cyber-purple text-sm font-semibold uppercase tracking-wider mb-3">Platform Features</p>
            <h2 className="text-4xl font-black text-white mb-4">Built for Security Teams at Every Level</h2>
            <p className="text-dark-text max-w-2xl mx-auto">From individual security practitioners to enterprise SOC teams — GetCyber scales with your needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div key={feature.title} className="glass-card-hover p-5">
                <div className="w-8 h-8 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="font-mono text-cyber-blue text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{feature.title}</h3>
                <p className="text-dark-text text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security Statistics ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-blue opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">By The Numbers</p>
            <h2 className="text-4xl font-black text-white mb-4">Proven Security at Enterprise Scale</h2>
            <p className="text-dark-text max-w-2xl mx-auto">Real-world performance metrics that demonstrate the power and reliability of the GetCyber platform.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {securityStats.map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <p className={`text-3xl font-black mb-2 ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-dark-text leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "86% Faster Remediation", desc: "Organizations using GetCyber resolve vulnerabilities 86% faster than industry average.", color: "text-cyber-green" },
              { icon: Shield, title: "99.7% Detection Accuracy", desc: "Our AI models achieve best-in-class detection rates with minimal false positives.", color: "text-cyber-blue" },
              { icon: Award, title: "#1 Rated Platform 2026", desc: "Voted top cybersecurity platform by G2, Gartner, and Forrester analysts.", color: "text-cyber-yellow" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card p-6 flex gap-4">
                  <Icon className={`w-8 h-8 ${item.color} flex-shrink-0`} />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-dark-text text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI Security Assistant ── */}
      <section className="py-20 bg-dark-surface border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-cyber-cyan text-sm font-semibold uppercase tracking-wider mb-3">AI-Powered Intelligence</p>
              <h2 className="text-4xl font-black text-white mb-6">Meet GC-AI: Your 24/7 Security Co-Pilot</h2>
              <p className="text-dark-text leading-relaxed mb-6">
                GC-AI is your always-available AI security advisor. Analyze threats in natural language, investigate logs, prioritize vulnerabilities, and generate executive reports — all without leaving your dashboard.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Natural language threat analysis and log investigation",
                  "Automated vulnerability prioritization by business impact",
                  "Incident explanation and response guidance",
                  "AI-generated executive security reports",
                  "Proactive best practice recommendations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                    <span className="text-dark-text-bright text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="cyber-btn-primary flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                Try GC-AI Now
              </button>
            </div>

            {/* AI Chat Preview */}
            <div className="glass-card overflow-hidden">
              <div className="bg-dark-card/60 border-b border-dark-border px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-red" />
                <div className="w-2 h-2 rounded-full bg-cyber-yellow" />
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs text-dark-text ml-2 font-mono">GC-AI Terminal</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="text-xs text-cyber-green">Active</span>
                </div>
              </div>
              <div className="p-4 space-y-4 h-80 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-cyber-blue" />
                  </div>
                  <div className="bg-dark-card/60 border border-dark-border rounded-lg rounded-tl-sm p-3 text-sm text-dark-text-bright max-w-xs">
                    Hello! I'm GC-AI. I detected 3 critical vulnerabilities in your environment. Would you like me to generate a remediation plan?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg rounded-tr-sm p-3 text-sm text-white max-w-xs">
                    Yes, and create an executive summary for my board meeting.
                  </div>
                  <div className="w-7 h-7 rounded-full bg-dark-card border border-dark-border flex items-center justify-center flex-shrink-0 text-xs font-bold text-dark-text">
                    A
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-cyber-blue" />
                  </div>
                  <div className="bg-dark-card/60 border border-dark-border rounded-lg rounded-tl-sm p-3 text-sm text-dark-text-bright max-w-xs">
                    <strong className="text-white">Executive Summary generated</strong> — SQL Injection (CVSS 9.8), RCE via Deserialization (9.6), and Default Credentials (9.3) require immediate action. Estimated remediation: 72 hours.
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-text mt-2">
                  <span className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" />
                  <span>GC-AI is analyzing your environment...</span>
                </div>
              </div>
              <div className="border-t border-dark-border p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask GC-AI anything about your security..."
                    className="input-cyber flex-1 py-2 text-xs"
                    onFocus={() => setAuthModalOpen(true)}
                  />
                  <button onClick={() => setAuthModalOpen(true)} className="cyber-btn-primary px-3 py-2">
                    <Cpu className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-cyber-orange text-sm font-semibold uppercase tracking-wider mb-3">Industries We Serve</p>
            <h2 className="text-4xl font-black text-white mb-4">Security Solutions for Every Sector</h2>
            <p className="text-dark-text max-w-2xl mx-auto">Industry-specific security frameworks, compliance controls, and threat intelligence tailored to your sector's unique risks.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((industry) => {
              const Icon = industry.Icon;
              return (
                <Link
                  to="/solutions"
                  key={industry.name}
                  className="glass-card-hover p-5 text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-dark-card/60 border border-dark-border flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className={`w-6 h-6 ${industry.color}`} />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{industry.name}</h3>
                  <p className="text-dark-text text-xs">{industry.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-dark-surface border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-cyber-green text-sm font-semibold uppercase tracking-wider mb-3">Customer Stories</p>
            <h2 className="text-4xl font-black text-white mb-4">Trusted by Security Leaders Worldwide</h2>
            <p className="text-dark-text max-w-2xl mx-auto">See how security teams are transforming their organizations with GetCyber.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card p-6 flex flex-col">
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-cyber-yellow fill-current" />
                  ))}
                </div>
                <blockquote className="text-dark-text-bright text-sm leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-dark-border" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-dark-text text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {["Gartner Peer Insights ★4.8", "G2 Leader 2026", "Forrester Wave Leader", "SC Media Award Winner"].map((badge) => (
              <div key={badge} className="glass-card px-4 py-2 text-sm text-dark-text-bright border border-dark-border">
                <Award className="w-4 h-4 text-cyber-yellow inline mr-2" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-transparent to-cyber-green/10" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full px-4 py-1.5 text-sm text-cyber-blue mb-6">
            <Globe className="w-4 h-4" />
            <span>Available Worldwide · 24/7 Support</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-6">
            Start Protecting Your
            <br />
            <span className="text-gradient-cyber">Organization Today</span>
          </h2>
          <p className="text-dark-text text-xl mb-10 max-w-2xl mx-auto">
            Join 10,000+ organizations that have transformed their cybersecurity with GetCyber. No credit card required for the free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={handleGetStarted} className="cyber-btn-primary text-lg py-4 px-10 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link to="/contact" className="cyber-btn-secondary text-lg py-4 px-10 text-center">
              Talk to Sales
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-dark-text">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyber-green" /> Free 14-day trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyber-green" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyber-green" /> SOC 2 certified</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyber-green" /> 24/7 support</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-cyber-blue" /> 10,000+ organizations</span>
          </div>
        </div>
      </section>

      <AuthPromptModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} feature="GC-AI Assistant" />
    </div>
  );
}
