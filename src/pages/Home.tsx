import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ArrowRight,
  Play,
  AlertTriangle,
  Activity,
  Target,
  CheckCircle,
  Zap,
  Bot,
  Database,
  Lock,
  BarChart3,
  Globe,
  Star,
  Users,
  Building2,
  Cpu,
  ChevronDown,
  Sparkles,
  FileCheck,
  Check,
  TrendingUp,
  Radio,
  ExternalLink,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import CyberCodeStream from "@/components/shared/CyberCodeStream";
import HeroProductVisual from "@/components/shared/HeroProductVisual";
import QuickScannerWidget from "@/components/shared/QuickScannerWidget";

// Customer Logos Placeholder
const LOGO_MARQUEE = [
  "FORTUNE 500 GLOBAL",
  "TECHSCALE INC",
  "APEX HEALTHCARE",
  "GLOBAL FINANCIAL CORP",
  "CYBERDEFENSE LABS",
  "CLOUDONE NETWORKS",
  "BIOTECH SYSTEMS",
  "NEXUS DEFENSE",
];

// Stats
const STATS = [
  { value: "99.7%", label: "Threat Detection Rate", change: "+4.2% YoY" },
  { value: "10,000+", label: "Organizations Protected", change: "Across 40+ Countries" },
  { value: "2.3M+", label: "Threats Blocked Daily", change: "< 0.001% False Positives" },
  { value: "< 14s", label: "Mean Time to Remediate", change: "86% Faster than Industry" },
];

// Bento Features
const BENTO_FEATURES = [
  {
    id: "vuln",
    title: "Autonomous Vulnerability Assessment",
    colSpan: "lg:col-span-8",
    badge: "Continuous DAST + SAST",
    benefit: "Scan web apps, APIs, cloud infrastructure, and endpoints with real-time CVSS v4.0 risk prioritization.",
    color: "from-blue-500/20 via-cyan-500/10 to-transparent",
    icon: AlertTriangle,
    accent: "text-cyber-blue",
    border: "border-cyber-blue/30",
    visual: (
      <div className="mt-4 p-4 rounded-xl bg-[#05070F]/80 border border-white/5 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Target: api.techcorp.com</span>
          <span className="text-cyber-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" /> SCANNING ACTIVE
          </span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan w-3/4 rounded-full" />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center pt-1 text-[10px]">
          <div className="p-1.5 rounded bg-slate-900 border border-white/5">0 Critical</div>
          <div className="p-1.5 rounded bg-slate-900 border border-white/5 text-cyber-yellow">2 Moderate</div>
          <div className="p-1.5 rounded bg-slate-900 border border-white/5 text-cyber-green">14 Verified Safe</div>
        </div>
      </div>
    ),
  },
  {
    id: "threat",
    title: "Global Threat Intelligence",
    colSpan: "lg:col-span-4",
    badge: "APT & Dark Web",
    benefit: "Ingest 9.8B+ threat indicators, dark web feeds, and APT malware telemetry with sub-second lookups.",
    color: "from-purple-500/20 via-blue-500/10 to-transparent",
    icon: Activity,
    accent: "text-cyber-purple",
    border: "border-cyber-purple/30",
    visual: (
      <div className="mt-4 p-3.5 rounded-xl bg-[#05070F]/80 border border-white/5 space-y-2 text-xs font-mono">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Dark Web Feed</span>
          <span className="text-cyber-purple">LIVE</span>
        </div>
        <p className="text-[11px] text-slate-300 truncate">IOC::94.102.61.0/24 [Ransomware Node]</p>
        <p className="text-[10px] text-cyber-green">Auto-synced to edge firewall in 4ms</p>
      </div>
    ),
  },
  {
    id: "pentest",
    title: "Penetration Testing Management",
    colSpan: "lg:col-span-4",
    badge: "Red Team Workflows",
    benefit: "Scope assessments, validate proof-of-concept exploits, and orchestrate verified retests seamlessly.",
    color: "from-red-500/20 via-orange-500/10 to-transparent",
    icon: Target,
    accent: "text-cyber-red",
    border: "border-cyber-red/30",
    visual: (
      <div className="mt-4 p-3.5 rounded-xl bg-[#05070F]/80 border border-white/5 font-mono text-xs space-y-1.5">
        <p className="text-[11px] text-white font-semibold">OWASP API Security Audit</p>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Progress: 100% Executed</span>
          <span className="text-cyber-green">Report Signed</span>
        </div>
      </div>
    ),
  },
  {
    id: "compliance",
    title: "Automated GRC & Audit Readiness",
    colSpan: "lg:col-span-8",
    badge: "Continuous Controls",
    benefit: "Map controls automatically to ISO 27001:2022, SOC 2 Type II, HIPAA, and GDPR with exportable audit packs.",
    color: "from-green-500/20 via-teal-500/10 to-transparent",
    icon: CheckCircle,
    accent: "text-cyber-green",
    border: "border-cyber-green/30",
    visual: (
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
        {[
          { name: "ISO 27001", score: "98%", status: "Certified" },
          { name: "SOC 2 Type II", score: "100%", status: "Compliant" },
          { name: "HIPAA", score: "96%", status: "Audit-Ready" },
          { name: "GDPR", score: "99%", status: "Enforced" },
        ].map((c) => (
          <div key={c.name} className="p-2.5 rounded-xl bg-[#05070F]/80 border border-white/5">
            <p className="text-[10px] text-slate-400">{c.name}</p>
            <p className="text-base font-black text-white my-0.5">{c.score}</p>
            <p className="text-[9px] text-cyber-green">{c.status}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "ai-incident",
    title: "GC-AI Security Copilot & Incident Response",
    colSpan: "lg:col-span-12",
    badge: "Deterministic SOAR Engine",
    benefit: "Neural alert clustering compresses 10,000 daily alerts into actionable attack graphs with 15-second containment playbooks.",
    color: "from-blue-600/25 via-teal-500/15 to-transparent",
    icon: Bot,
    accent: "text-cyber-cyan",
    border: "border-cyber-cyan/30",
    visual: (
      <div className="mt-4 p-4 rounded-xl bg-[#05070F]/80 border border-white/5 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-slate-300 text-xs">
            <span className="text-cyber-cyan font-bold">GC-AI Insight:</span> Lateral SMB beaconing detected on subnet 10.240.12.0/24.
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">Automated host isolation executed. Zero sensitive data exfiltration.</p>
        </div>
        <span className="text-xs bg-cyber-green/15 text-cyber-green border border-cyber-green/30 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap">
          Containment: 12.4s
        </span>
      </div>
    ),
  },
];

// 3-Step Timeline
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Agentless Discovery & Mapping",
    desc: "Connect your cloud providers (AWS, Azure, GCP), internal networks, and web domains in under 5 minutes without invasive agents.",
  },
  {
    step: "02",
    title: "AI Correlation & Exploit Validation",
    desc: "GC-AI correlates raw signals with live threat intelligence, validating whether vulnerabilities are weaponized in the wild.",
  },
  {
    step: "03",
    title: "Autonomous Response & Audit Packaging",
    desc: "Deploy automated SOAR mitigation playbooks and instantly export verified compliance documentation for auditors.",
  },
];

// Product Tabs
const PRODUCT_TABS = [
  {
    id: "overview",
    label: "SOC Console",
    title: "Unified Command Center",
    desc: "Real-time posture score, threat metrics, active alerts, and cloud infrastructure telemetry in one single pane of glass.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop",
  },
  {
    id: "vulnerability",
    label: "Vulnerability Scanner",
    title: "Full-Spectrum Attack Surface Scanner",
    desc: "Automated scanning across web apps, APIs, servers, and mobile endpoints with actionable remediation advice.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=700&fit=crop",
  },
  {
    id: "threats",
    label: "Threat Intelligence",
    title: "Live Global Threat Stream",
    desc: "Dark web tracking, zero-day CVE advisories, and malicious IP reputation feeds updated every 60 seconds.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=700&fit=crop",
  },
  {
    id: "compliance",
    label: "Compliance & GRC",
    title: "Automated Evidence Collection",
    desc: "Continuous evidence gathering and pre-built control mappings for ISO 27001, SOC 2, HIPAA, and GDPR.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=700&fit=crop",
  },
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "GetCyber reduced our mean time to detect and contain threats from 4 hours down to under 2 minutes. The AI copilot alone paid for the entire platform in month one.",
    author: "Jennifer Walsh",
    role: "CISO",
    company: "Global Financial Corp",
    roi: "-86% Triage Time",
  },
  {
    quote: "We achieved SOC 2 Type II and ISO 27001 certification in 6 months using GetCyber's automated compliance engine. It would have taken our engineering team 2 years manually.",
    author: "David Vance",
    role: "VP of Engineering",
    company: "TechScale Inc",
    roi: "100% Audit Readiness",
  },
  {
    quote: "GetCyber's zero-day threat intelligence allowed our security operations team to neutralize an active ransomware affiliate campaign before a single endpoint was impacted.",
    author: "Dr. Priya Sharma",
    role: "Head of Cybersecurity",
    company: "National Health System",
    roi: "Zero Data Breaches",
  },
];

// FAQs
const FAQS = [
  {
    q: "How does GetCyber differ from legacy vulnerability scanners?",
    a: "Unlike legacy tools that output noisy 500-page PDF reports filled with false positives, GetCyber uses GC-AI to correlate findings with real-world threat feeds, validating exploitability and providing one-click automated remediation scripts.",
  },
  {
    q: "Can I connect GetCyber to AWS, Azure, and Google Cloud?",
    a: "Yes. GetCyber supports native, agentless API connectors across AWS, Azure, GCP, Kubernetes clusters, and on-premises VMware environments with zero performance overhead.",
  },
  {
    q: "How fast can our team onboard and start running scans?",
    a: "You can sign up in 30 seconds with no credit card required. Initial surface reconnaissance runs immediately, and cloud connectors can be linked in under 5 minutes.",
  },
  {
    q: "Is GetCyber compliant with strict data residency regulations?",
    a: "Yes. GetCyber provides SOC 2 Type II, ISO 27001, and HIPAA-certified infrastructure with configurable data residency regions across the US, EU, and Asia-Pacific.",
  },
  {
    q: "What role types and access controls (RBAC) are supported?",
    a: "GetCyber includes pre-configured role profiles for Security Analysts, Penetration Testers, Compliance Officers, Business Owners, and Enterprise Administrators with granular permissions.",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Mouse spotlight for bento cards
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

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
    <div className="min-h-screen bg-[#05070F] text-slate-100 overflow-x-hidden selection:bg-cyber-blue/30 selection:text-white">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-16 sm:pb-20">
        {/* Faint Cyber Grid with edge fadeout */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {/* Soft Animated Aurora Glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-cyber-blue/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-cyber-green/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Floating Cyber Code Stream (Refined, reduced, collision-safe) */}
        <CyberCodeStream />

        {/* Main Hero Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 sm:pt-6">
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101E]/80 border border-white/10 text-xs text-slate-300 mb-6 backdrop-blur-md shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                <span className="font-semibold text-white">AI-Powered Cybersecurity Platform</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">Trusted by 10,000+ Organizations</span>
              </motion.div>

              {/* Editorial Display Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-5"
              >
                <span className="block">Defend Your</span>
                <span className="block bg-gradient-to-r from-[#2563EB] via-[#38bdf8] to-[#22C55E] bg-clip-text text-transparent">
                  Digital Future
                </span>
              </motion.h1>

              {/* Shortened Subtitle with high WCAG contrast */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl"
              >
                GetCyber is the enterprise AI cybersecurity platform unifying vulnerability scanning, threat intelligence, and compliance in one command center.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5"
              >
                <button
                  onClick={handleGetStarted}
                  className="cyber-btn-primary text-sm sm:text-base py-3 px-7 flex items-center justify-center gap-2 font-bold shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleDemoClick}
                  className="cyber-btn-secondary text-sm sm:text-base py-3 px-6 flex items-center justify-center gap-2 font-semibold"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-cyber-blue" />
                  <span>View Live Demo</span>
                </button>
              </motion.div>

              {/* Instant Reconnaissance Box */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 }}
              >
                <QuickScannerWidget />
              </motion.div>
            </div>

            {/* Right Hero Visual: 3D Tilting SOC Console Mockup */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                <HeroProductVisual />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. LOGO MARQUEE & ANIMATED STAT COUNTERS ── */}
      <section className="py-12 border-y border-white/5 bg-[#080D1A]/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400">
            Trusted by security leaders at high-growth scaleups and Global 2000 enterprises
          </p>
        </div>

        {/* Infinite Logo Scroll Marquee */}
        <div className="relative overflow-hidden w-full py-2">
          <div className="flex w-[200%] animate-[marquee_28s_linear_infinite] gap-12 items-center justify-around opacity-45 grayscale hover:grayscale-0 hover:opacity-80 transition-all">
            {[...LOGO_MARQUEE, ...LOGO_MARQUEE].map((name, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm font-display font-bold tracking-wider text-slate-400 whitespace-nowrap px-4"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Stat Counters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0B101E]/80 border border-white/10 hover:border-cyber-blue/30 transition-all text-center group"
              >
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-cyber-blue transition-colors">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">{s.label}</p>
                <p className="text-[10px] text-cyber-green font-mono mt-1">{s.change}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURES BENTO GRID WITH SPOTLIGHT EFFECT ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-cyber-blue font-semibold bg-cyber-blue/10 border border-cyber-blue/30 px-3 py-1 rounded-full">
              Full-Spectrum Security Mesh
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
              Everything Your SOC Needs to Stay Ahead
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Consolidate point solutions into an intelligent, AI-orchestrated defense architecture.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {BENTO_FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onMouseMove={handleSpotlight}
                  className={`${item.colSpan} relative rounded-2xl p-6 sm:p-7 bg-[#0B101E]/80 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group shadow-xl`}
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(37, 99, 235, 0.12), transparent 70%), #0B101E`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-slate-900 border border-white/10 ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">{item.benefit}</p>

                  {item.visual}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS: 3-STEP HORIZONTAL TIMELINE ── */}
      <section className="py-20 border-t border-white/5 bg-[#080D1A]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-cyber-green font-semibold bg-cyber-green/10 border border-cyber-green/30 px-3 py-1 rounded-full">
              Seamless Deployment
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-3">
              How GetCyber Secures Your Infrastructure
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              From initial zero-friction connection to automated threat neutralisation in three steps.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Horizontal Line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-green opacity-40 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {HOW_IT_WORKS.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0B101E]/90 border border-white/10 relative hover:border-cyber-blue/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center font-display font-extrabold text-cyber-blue text-lg mb-4 shadow-glow-blue">
                    {step.step}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PRODUCT SHOWCASE IN MAC-FRAME TABS ── */}
      <section className="py-24 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Engineered for Precision & Machine Speed
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Explore the interfaces trusted by top-tier SOC analysts and CISOs worldwide.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
            {PRODUCT_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === idx
                    ? "bg-cyber-blue text-white shadow-glow-blue"
                    : "bg-[#0B101E] text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Browser Mockup Frame */}
          <div className="rounded-[22px] bg-[#0A0F1D] border border-white/10 shadow-2xl overflow-hidden p-2 sm:p-3">
            {/* Window bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#05070F] rounded-t-xl border-b border-white/5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">
                  getcyber.io/dashboard/{PRODUCT_TABS[activeTab].id}
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 rounded">
                SECURE SSL
              </span>
            </div>

            {/* Content Preview */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={PRODUCT_TABS[activeTab].image}
                alt={PRODUCT_TABS[activeTab].title}
                className="w-full h-80 sm:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 max-w-2xl">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  {PRODUCT_TABS[activeTab].title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">{PRODUCT_TABS[activeTab].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. COMPLIANCE BADGES ROW ── */}
      <section className="py-12 border-y border-white/5 bg-[#080D1A]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-6 text-center">
            {[
              { name: "ISO/IEC 27001", sub: "2022 Certified" },
              { name: "SOC 2 TYPE II", sub: "Security & Availability" },
              { name: "HIPAA COMPLIANT", sub: "PHI Safeguards" },
              { name: "GDPR READY", sub: "EU Privacy Certified" },
              { name: "PCI DSS v4.0", sub: "Level 1 Verified" },
              { name: "NIST SP 800-207", sub: "Zero Trust Architecture" },
            ].map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-display text-sm sm:text-base font-bold text-white tracking-wider">
                  {badge.name}
                </span>
                <span className="text-[10px] font-mono text-cyber-blue mt-0.5">{badge.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS CAROUSEL ── */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-cyber-yellow font-semibold bg-cyber-yellow/10 border border-cyber-yellow/30 px-3 py-1 rounded-full">
              Enterprise Impact
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-2">
              Proven by Industry Practitioners
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-[22px] bg-[#0B101E]/90 border border-white/10 shadow-2xl relative">
            <div className="flex items-center gap-1 text-cyber-yellow mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-display text-lg sm:text-2xl text-slate-200 leading-relaxed italic mb-6">
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="font-bold text-white text-base">{TESTIMONIALS[activeTestimonial].author}</p>
                <p className="text-xs text-slate-400">
                  {TESTIMONIALS[activeTestimonial].role} • {TESTIMONIALS[activeTestimonial].company}
                </p>
              </div>
              <span className="text-xs font-mono text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-3 py-1 rounded-full">
                ROI: {TESTIMONIALS[activeTestimonial].roi}
              </span>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTestimonial === i ? "bg-cyber-blue w-6" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. PRICING PLANS WITH TOGGLE ── */}
      <section className="py-24 border-t border-white/5 bg-[#080D1A]/50 relative" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-cyber-blue font-semibold bg-cyber-blue/10 border border-cyber-blue/30 px-3 py-1 rounded-full">
              Transparent Pricing
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
              Predictable Investment. Zero Hidden Add-Ons.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Scale protection effortlessly from mid-market teams to multi-tenant global enterprises.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="w-12 h-6 bg-slate-800 rounded-full p-0.5 border border-white/10 relative transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-cyber-blue transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}>
                <span>Annual</span>
                <span className="text-[10px] text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 rounded-full font-bold">
                  SAVE 20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="p-7 rounded-[22px] bg-[#0B101E] border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Starter</h3>
                <p className="text-slate-400 text-xs mt-1">For growing teams securing essential digital assets.</p>
                <div className="my-5">
                  <span className="font-display text-4xl font-extrabold text-white font-mono">
                    ${billingCycle === "yearly" ? "390" : "490"}
                  </span>
                  <span className="text-slate-400 text-xs">/month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                  {["Up to 250 assets scanned", "Automated weekly vulnerability runs", "Basic GC-AI Copilot recommendations", "Standard email alert notifications"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyber-green" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => navigate("/register")} className="cyber-btn-secondary text-xs py-3 w-full">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Growth / Professional - Highlighted */}
            <div className="p-7 rounded-[22px] bg-gradient-to-b from-[#0F1B38] to-[#0A1020] border-2 border-cyber-blue shadow-glow-blue flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-blue text-white text-[10px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow">
                Most Popular
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Growth / Pro</h3>
                <p className="text-slate-300 text-xs mt-1">Full attack surface monitoring & automated compliance.</p>
                <div className="my-5">
                  <span className="font-display text-4xl font-extrabold text-white font-mono">
                    ${billingCycle === "yearly" ? "990" : "1,290"}
                  </span>
                  <span className="text-slate-400 text-xs">/month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
                  {[
                    "Up to 2,500 assets monitored",
                    "Continuous real-time zero-day scanning",
                    "Full GC-AI autonomous SOAR playbooks",
                    "ISO 27001 & SOC 2 compliance engines",
                    "Penetration testing & exploit workflows",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyber-green" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => navigate("/register")} className="cyber-btn-primary text-xs py-3 w-full font-bold shadow-lg">
                Launch My Security Console
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-7 rounded-[22px] bg-[#0B101E] border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Enterprise</h3>
                <p className="text-slate-400 text-xs mt-1">Multi-tenant defense for global cloud footprints.</p>
                <div className="my-5">
                  <span className="font-display text-4xl font-extrabold text-white font-mono">Custom</span>
                  <span className="text-slate-400 text-xs"> /tailored SLA</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                  {[
                    "Unlimited digital assets & endpoints",
                    "Dedicated Security Operations TAM",
                    "Air-gapped & private cloud deployments",
                    "Custom SIEM & SOAR integrations",
                    "99.99% guaranteed uptime SLA",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyber-green" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => navigate("/contact")} className="cyber-btn-secondary text-xs py-3 w-full">
                Talk to Security Architect
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ACCORDION ── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm">Everything you need to know about the GetCyber security platform.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B101E]/80 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-white text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-cyber-blue" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL FULL-WIDTH CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-10 sm:p-14 rounded-[28px] bg-gradient-to-r from-cyber-blue/20 via-cyber-cyan/15 to-cyber-green/10 border border-cyber-blue/30 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Ready to Modernize Your Cyber Defense?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-8">
                Join 10,000+ security analysts, CISOs, and ethical hackers protecting digital assets at machine speed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleGetStarted}
                  className="cyber-btn-primary text-sm sm:text-base py-3 px-8 font-bold shadow-glow-blue w-full sm:w-auto"
                >
                  Start 14-Day Free Trial
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="cyber-btn-secondary text-sm sm:text-base py-3 px-7 w-full sm:w-auto"
                >
                  Request Technical Demo
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-4">
                No credit card required · Instant provisioning in 30 seconds · SOC 2 & ISO 27001 certified
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
