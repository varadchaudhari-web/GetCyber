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
import HeroGlobe from "@/components/shared/HeroGlobe";
import ExplodedLayerStack from "@/components/shared/ExplodedLayerStack";
import LiveThreatFeed from "@/components/shared/LiveThreatFeed";
import { initHeadlineDepth } from "@/lib/effects/headlineDepth";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";
import { initCounters } from "@/lib/effects/counters";

const stats = [
  { value: "99.7%", label: "Threat Detection Rate", icon: Shield },
  { value: "10,000+", label: "Organizations Protected", icon: Building2 },
  { value: "2.3M+", label: "Threats Blocked Daily", icon: AlertTriangle },
  { value: "<2min", label: "Mean Time to Detect", icon: Zap },
];

const solutions = [
  { icon: AlertTriangle, title: "Vulnerability Assessment", desc: "Continuously scan your attack surface for weaknesses before attackers exploit them.", color: "text-cyber-blue", bg: "bg-cyber-blue/10", border: "border-cyber-blue/20", glow: "rgba(77, 141, 255, 0.28)", href: "/solutions#vulnerability" },
  { icon: Target, title: "Penetration Testing", desc: "Simulate real cyberattacks with expert-led and automated pen testing workflows.", color: "text-cyber-red", bg: "bg-cyber-red/10", border: "border-cyber-red/20", glow: "rgba(239, 68, 68, 0.28)", href: "/solutions#pentest" },
  { icon: Activity, title: "Threat Intelligence", desc: "Real-time global threat feeds, dark web monitoring, IOC management and APT tracking.", color: "text-cyber-purple", bg: "bg-cyber-purple/10", border: "border-cyber-purple/20", glow: "rgba(167, 123, 255, 0.28)", href: "/solutions#threat" },
  { icon: CheckCircle, title: "Compliance Management", desc: "Achieve ISO 27001, SOC 2, NIST, GDPR, and PCI DSS compliance with automated controls.", color: "text-cyber-green", bg: "bg-cyber-green/10", border: "border-cyber-green/20", glow: "rgba(49, 208, 170, 0.28)", href: "/solutions#compliance" },
  { icon: Zap, title: "Incident Response", desc: "Detect, contain and recover from security incidents with AI-assisted playbooks.", color: "text-cyber-yellow", bg: "bg-cyber-yellow/10", border: "border-cyber-yellow/20", glow: "rgba(245, 158, 11, 0.28)", href: "/solutions#incident" },
  { icon: Bot, title: "AI Security Assistant", desc: "GC-AI analyzes threats, logs, and recommendations 24/7 in natural language.", color: "text-cyber-cyan", bg: "bg-cyber-cyan/10", border: "border-cyber-cyan/20", glow: "rgba(6, 182, 212, 0.28)", href: "/solutions#ai" },
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

function AnimatedCounter({ target }: { target: string }) {
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!spanRef.current) return;
    const cleanup = initCounters([spanRef.current]);
    return () => cleanup();
  }, [target]);

  return <span ref={spanRef} data-target={target}>{target}</span>;
}

export default function Home() {
  const { isAuthenticated, loginWithMock } = useAuthStore();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const solutionsGridRef = useRef<HTMLDivElement | null>(null);
  const featuresGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Headline Depth Parallax
    let cleanupHeadline: (() => void) | undefined;
    if (heroRef.current) {
      cleanupHeadline = initHeadlineDepth(heroRef.current);
    }

    // 2. 3D Tilt Cards for all interactive cards across the page
    const tiltCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt-card]")
    );
    const cleanupTilt = initTiltCards(tiltCards);

    // 3. Section Header Fade-Up Reveals
    const headerElements = Array.from(
      document.querySelectorAll<HTMLElement>(".header-reveal")
    );
    const cleanupReveals = initReveals(headerElements);

    // 4. Stat numbers in securityStats section
    const statElements = Array.from(
      document.querySelectorAll<HTMLElement>(".counter-item")
    );
    const cleanupCounters = initCounters(statElements);

    return () => {
      if (cleanupHeadline) cleanupHeadline();
      cleanupTilt();
      cleanupReveals();
      cleanupCounters();
    };
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleDemoClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#070b16] pt-24 pb-12 sm:pb-16">
        {/* Subtle Cyber Grid & Ambient Glows */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-[#4d8dff]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#31d0aa]/8 rounded-full blur-[130px] pointer-events-none" />

        {/* 3D WebGL Globe Canvas */}
        <HeroGlobe />

        {/* Main Hero Content Container */}
        <div className="relative z-[2] w-full max-w-[1920px] 2xl:max-w-[2400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-28 flex-1 flex flex-col justify-between">
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl pt-4 sm:pt-8 lg:pt-10 2xl:pt-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0b1222]/80 border border-white/10 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm text-[#4d8dff] mb-6 backdrop-blur-md animate-fade-in shadow-lg">
              <div className="w-2 h-2 rounded-full bg-[#31d0aa] animate-pulse" />
              <span className="font-semibold text-[#eaf0ff]">AI-Powered Cybersecurity Platform</span>
              <span className="text-[#93a2c4] hidden sm:inline">· Trusted by 10,000+ Organizations</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[7rem] font-black text-white tracking-tight leading-[1.05] mb-6 animate-fade-in preserve-3d">
              <span data-depth="1.6" className="block transform-gpu">
                Defend Your
              </span>
              <span data-depth="2.6" className="block bg-gradient-to-r from-[#4d8dff] via-[#54c6f0] to-[#31d0aa] bg-clip-text text-transparent transform-gpu">
                Digital Future
              </span>
            </h1>

            {/* Subtitle - Normal balanced font size */}
            <p className="text-base sm:text-lg text-[#93a2c4] leading-relaxed mb-8 sm:mb-10 max-w-2xl animate-fade-in">
              GetCyber is the enterprise AI-powered cybersecurity platform that unifies vulnerability assessment, threat intelligence, penetration testing, compliance, and incident response — all in one SOC-grade command center.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 sm:mb-14 animate-fade-in">
              <button
                onClick={handleGetStarted}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-10 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleDemoClick}
                className="bg-[#0b1222]/80 hover:bg-[#0b1222] border border-white/10 hover:border-white/20 text-[#eaf0ff] font-semibold text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-10 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-[#4d8dff]" />
                View Live Demo
              </button>
            </div>
          </div>

          {/* Quick Stats Grid spanning across bottom */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 mt-8 sm:mt-12 2xl:mt-16 animate-fade-in">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-tilt-card
                data-glow="rgba(77, 141, 255, 0.28)"
                className="tilt-card bg-[#0b1222]/60 hover:bg-[#0b1222]/80 border border-white/10 hover:border-[#4d8dff]/30 backdrop-blur-xl rounded-2xl 2xl:rounded-3xl p-5 sm:p-6 2xl:p-8 transition-all duration-300 shadow-xl cursor-pointer group"
              >
                <p className="stat-value text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight">
                  <AnimatedCounter target={stat.value} />
                </p>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#93a2c4] mt-2 2xl:mt-3 font-medium leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Overview & Live Threat Ingest ── */}
      <section className="py-20 bg-dark-surface border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 header-reveal">
            <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Platform Overview</p>
            <h2 className="text-4xl font-black text-white mb-4">One Platform. Total Security Coverage.</h2>
            <p className="text-dark-text max-w-2xl mx-auto">Replace your fragmented security tool stack with a unified AI-powered platform that covers every aspect of your cybersecurity program.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {["Vulnerability & Exposure Management", "Penetration Testing & Red Team Ops", "Threat Intelligence & Dark Web Monitoring", "Compliance & GRC Automation", "Incident Detection & Response", "AI Security Operations Center"].map((item, i) => (
                <div
                  key={item}
                  data-tilt-card
                  data-glow="rgba(77, 141, 255, 0.25)"
                  className="tilt-card flex items-center gap-3 p-4 glass-card hover:border-cyber-blue/40 transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-cyber-blue/10 rounded-lg flex items-center justify-center border border-cyber-blue/20 group-hover:border-cyber-blue/50 transition-all flex-shrink-0">
                    <span className="text-cyber-blue text-sm font-bold font-mono">0{i + 1}</span>
                  </div>
                  <span className="text-dark-text-bright font-medium">{item}</span>
                  <ChevronRight className="w-4 h-4 text-dark-text ml-auto group-hover:text-cyber-blue transition-colors" />
                </div>
              ))}

              {/* Dashboard Preview Card */}
              <div
                data-tilt-card
                data-glow="rgba(77, 141, 255, 0.22)"
                className="tilt-card glass-card p-6 border-cyber-blue/20 relative mt-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyber-red" />
                    <div className="w-3 h-3 rounded-full bg-cyber-yellow" />
                    <div className="w-3 h-3 rounded-full bg-cyber-green" />
                  </div>
                  <span className="font-mono text-xs text-dark-text">getcyber.io/dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-dark-card/60 rounded-lg">
                    <span className="text-xs text-dark-text block">Risk Score</span>
                    <span className="text-cyber-yellow font-bold text-sm">68 / 100</span>
                  </div>
                  <div className="p-3 bg-dark-card/60 rounded-lg">
                    <span className="text-xs text-dark-text block">Critical Vulnerabilities</span>
                    <span className="text-cyber-red font-bold text-sm">12 Open</span>
                  </div>
                </div>
                <div className="h-2 bg-dark-card rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-gradient-to-r from-cyber-red via-cyber-yellow to-cyber-green rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
            </div>

            {/* Live Threat Stream Terminal */}
            <div>
              <LiveThreatFeed />
            </div>
          </div>
        </div>
      </section>

      {/* ── Solutions (with 3D Card Tilt) ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 header-reveal">
            <p className="text-cyber-green text-sm font-semibold uppercase tracking-wider mb-3">Security Solutions</p>
            <h2 className="text-4xl font-black text-white mb-4">Complete Security Coverage</h2>
            <p className="text-dark-text max-w-2xl mx-auto">Every security capability you need — seamlessly integrated, AI-enhanced, and built for enterprise scale.</p>
          </div>
          <div ref={solutionsGridRef} className="perspective-1100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <Link
                  key={sol.title}
                  to={sol.href}
                  data-tilt-card
                  data-glow={sol.glow}
                  className={`tilt-card glass-card-hover p-6 border ${sol.border} group block`}
                >
                  <div className={`w-12 h-12 ${sol.bg} rounded-xl flex items-center justify-center mb-4 border ${sol.border} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${sol.color}`} />
                  </div>
                  <h3 className="tilt-title text-lg font-bold text-white mb-2">{sol.title}</h3>
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

      {/* ── Features (with 3D Card Tilt) ── */}
      <section className="py-20 bg-dark-surface border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 header-reveal">
            <p className="text-cyber-purple text-sm font-semibold uppercase tracking-wider mb-3">Platform Features</p>
            <h2 className="text-4xl font-black text-white mb-4">Built for Security Teams at Every Level</h2>
            <p className="text-dark-text max-w-2xl mx-auto">From individual security practitioners to enterprise SOC teams — GetCyber scales with your needs.</p>
          </div>
          <div ref={featuresGridRef} className="perspective-1100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                data-tilt-card
                data-glow="rgba(77, 141, 255, 0.22)"
                className="tilt-card glass-card-hover p-5 cursor-pointer"
              >
                <div className="w-8 h-8 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="font-mono text-cyber-blue text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="tilt-title font-bold text-white mb-2 text-sm">{feature.title}</h3>
                <p className="text-dark-text text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scroll-Driven Exploded Layer Stack ── */}
      <ExplodedLayerStack />

      {/* ── Security Statistics ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-blue opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 header-reveal">
            <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">By The Numbers</p>
            <h2 className="text-4xl font-black text-white mb-4">Proven Security at Enterprise Scale</h2>
            <p className="text-dark-text max-w-2xl mx-auto">Real-world performance metrics that demonstrate the power and reliability of the GetCyber platform.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {securityStats.map((stat) => (
              <div
                key={stat.label}
                data-tilt-card
                data-glow="rgba(77, 141, 255, 0.25)"
                className="tilt-card glass-card p-5 text-center cursor-pointer"
              >
                <p className={`counter-item text-3xl font-black mb-2 ${stat.color}`} data-target={stat.value}>
                  {stat.value}
                </p>
                <p className="text-xs text-dark-text leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "86% Faster Remediation", desc: "Organizations using GetCyber resolve vulnerabilities 86% faster than industry average.", color: "text-cyber-green", glow: "rgba(34, 197, 94, 0.25)" },
              { icon: Shield, title: "99.7% Detection Accuracy", desc: "Our AI models achieve best-in-class detection rates with minimal false positives.", color: "text-cyber-blue", glow: "rgba(37, 99, 235, 0.25)" },
              { icon: Award, title: "#1 Rated Platform 2026", desc: "Voted top cybersecurity platform by G2, Gartner, and Forrester analysts.", color: "text-cyber-yellow", glow: "rgba(245, 158, 11, 0.25)" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-tilt-card
                  data-glow={item.glow}
                  className="tilt-card glass-card p-6 flex gap-4 cursor-pointer"
                >
                  <Icon className={`w-8 h-8 ${item.color} flex-shrink-0`} />
                  <div>
                    <h3 className="tilt-title font-bold text-white mb-1">{item.title}</h3>
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
            <div
              data-tilt-card
              data-glow="rgba(6, 182, 212, 0.22)"
              className="tilt-card glass-card overflow-hidden"
            >
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
          <div className="text-center mb-12 header-reveal">
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
                  data-tilt-card
                  data-glow="rgba(249, 115, 22, 0.25)"
                  className="tilt-card glass-card-hover p-5 text-center group block"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-dark-card/60 border border-dark-border flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className={`w-6 h-6 ${industry.color}`} />
                  </div>
                  <h3 className="tilt-title font-bold text-white text-sm mb-1">{industry.name}</h3>
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
          <div className="text-center mb-12 header-reveal">
            <p className="text-cyber-green text-sm font-semibold uppercase tracking-wider mb-3">Customer Stories</p>
            <h2 className="text-4xl font-black text-white mb-4">Trusted by Security Leaders Worldwide</h2>
            <p className="text-dark-text max-w-2xl mx-auto">See how security teams are transforming their organizations with GetCyber.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                data-tilt-card
                data-glow="rgba(34, 197, 94, 0.22)"
                className="tilt-card glass-card p-6 flex flex-col cursor-pointer"
              >
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
                    <p className="tilt-title font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-dark-text text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {["Gartner Peer Insights ★4.8", "G2 Leader 2026", "Forrester Wave Leader", "SC Media Award Winner"].map((badge) => (
              <div
                key={badge}
                data-tilt-card
                data-glow="rgba(245, 158, 11, 0.25)"
                className="tilt-card glass-card px-4 py-2 text-sm text-dark-text-bright border border-dark-border cursor-pointer"
              >
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
