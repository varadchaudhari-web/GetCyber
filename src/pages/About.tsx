import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Target, Globe, Heart, Award, Users, ArrowRight } from "lucide-react";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";

const values = [
  { icon: Shield, title: "Security First", desc: "We enforce the same zero-trust standards on our platform that we advocate for global customers.", color: "text-cyber-blue", glow: "rgba(37, 99, 235, 0.25)" },
  { icon: Target, title: "Mission Driven", desc: "Democratizing defense so that mid-market enterprises have the same defensive armor as nation-states.", color: "text-cyber-red", glow: "rgba(239, 68, 68, 0.25)" },
  { icon: Globe, title: "Global Impact", desc: "Safeguarding infrastructure, data vaults, and endpoints across 180+ sovereign regions.", color: "text-cyber-green", glow: "rgba(34, 197, 94, 0.25)" },
  { icon: Heart, title: "Practitioner Obsession", desc: "Engineered by red-teamers and SOC leaders for real-world analyst efficiency.", color: "text-cyber-purple", glow: "rgba(139, 92, 246, 0.25)" },
];

const timeline = [
  { year: "2022", event: "GetCyber founded by former NSA, Google, and Mandiant senior security engineers." },
  { year: "2023", event: "Shipped Autonomous Vulnerability Scanner and Global Threat Stream. Reached 500 enterprise customers." },
  { year: "2024", event: "Secured $48M Series B. Integrated GC-AI Copilot and automated ISO 27001 evidence generation." },
  { year: "2025", event: "Expanded points of presence to 180+ regions. Achieved SOC 2 Type II, ISO 27001, and HIPAA certifications." },
  { year: "2026", event: "Protected 10,000+ organizations. Recognized as a market leader in Autonomous SecOps." },
];

const awards = [
  "Gartner Peer Insights 4.8★",
  "G2 Enterprise Leader 2026",
  "SC Media Award Winner",
  "Inc 5000 Fastest Growing",
  "CISA Framework Aligned",
  "SOC 2 Type II Certified",
  "ISO 27001:2022 Certified",
  "FIPS 140-3 Cryptographic Core",
];

const pressItems = [
  { outlet: "TechCrunch", headline: "GetCyber secures $48M to bring autonomous SOC defense to every business", date: "March 2024", glow: "rgba(34, 197, 94, 0.22)" },
  { outlet: "Forbes", headline: "The startup making military-grade cybersecurity accessible to commercial enterprises", date: "August 2024", glow: "rgba(37, 99, 235, 0.22)" },
  { outlet: "Dark Reading", headline: "How GetCyber's GC-AI engine cuts Mean Time to Remediate by 86%", date: "January 2025", glow: "rgba(139, 92, 246, 0.22)" },
  { outlet: "SC Media", headline: "GetCyber awarded Best Enterprise Threat Management Platform 2026", date: "June 2026", glow: "rgba(245, 158, 11, 0.22)" },
];

export default function About() {
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
      {/* Background ambient glows */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-cyber-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-cyber-green/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero */}
      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 header-reveal">
          <span className="text-xs font-mono uppercase tracking-wider text-cyber-blue font-semibold bg-cyber-blue/10 border border-cyber-blue/30 px-3 py-1 rounded-full">
            Our Origin & Mission
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Democratizing Enterprise Cyber Defense
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded by veteran intelligence community researchers and tech architects who believe modern attack surfaces require machine-speed autonomous response.
          </p>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="py-12 border-y border-white/10 bg-[#080D1A]/50 relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: "2022", label: "Founded in SF", color: "text-cyber-blue" },
              { value: "10,000+", label: "Active Deployments", color: "text-cyber-green" },
              { value: "180+", label: "Countries Covered", color: "text-cyber-purple" },
              { value: "$48M", label: "Series B Capital", color: "text-cyber-yellow" },
            ].map((s) => (
              <div
                key={s.label}
                data-tilt-card
                className="tilt-card p-5 rounded-2xl bg-[#0B101E]/80 border border-white/10 hover:border-cyber-blue/40 shadow-xl transition-all"
              >
                <p className={`font-display text-3xl sm:text-4xl font-extrabold ${s.color} font-mono`}>{s.value}</p>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Core Values */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase tracking-wider text-cyber-green font-semibold bg-cyber-green/10 border border-cyber-green/30 px-3 py-1 rounded-full">
                Core Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-4">
                Asymmetric Threat Landscape Demands Unified Defense
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Cyber adversaries do not respect corporate perimeters or budget constraints. A regional hospital faces the exact same automated ransomware syndicates as a Tier-1 financial institution.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                GetCyber eliminates defensive friction by blending neural attack graph correlation, push-button SOAR playbooks, and continuous compliance into one accessible command console.
              </p>
              <Link to="/register" className="cyber-btn-primary inline-flex items-center gap-2 text-xs sm:text-sm py-2.5 px-6 font-bold shadow-glow-blue">
                <span>Join the Mission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    data-tilt-card
                    data-glow={v.glow}
                    className="tilt-card p-5 rounded-[22px] bg-[#0B101E]/85 border border-white/10 hover:border-white/25 transition-all shadow-xl"
                  >
                    <Icon className={`w-6 h-6 ${v.color} mb-3`} />
                    <h3 className="font-display text-base font-bold text-white mb-1.5">{v.title}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Historical Journey Timeline */}
      <section className="py-20 border-y border-white/10 bg-[#080D1A]/50 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 header-reveal">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">Our Execution Journey</h2>
            <p className="text-slate-400 text-sm">Milestones in engineering autonomous cybersecurity infrastructure.</p>
          </div>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div
                key={item.year}
                data-tilt-card
                className="tilt-card p-4 sm:p-5 rounded-2xl bg-[#0B101E]/80 border border-white/10 flex items-start gap-4 shadow-lg hover:border-cyber-blue/30 transition-all"
              >
                <div className="w-16 sm:w-20 flex-shrink-0">
                  <span className="text-cyber-blue font-mono font-bold text-sm bg-cyber-blue/10 border border-cyber-blue/30 px-2.5 py-1 rounded-lg inline-block">
                    {item.year}
                  </span>
                </div>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Validation & Recognition */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Industry Recognition
          </h2>
          <p className="text-slate-400 text-sm mb-10">Peer-reviewed and certified by international standards bodies.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {awards.map((award) => (
              <div
                key={award}
                data-tilt-card
                className="tilt-card p-4 rounded-xl bg-[#0B101E] border border-white/10 text-center shadow-lg hover:border-cyber-yellow/40 transition-all"
              >
                <Award className="w-5 h-5 text-cyber-yellow mx-auto mb-2" />
                <p className="text-slate-200 text-xs font-semibold">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Mentions */}
      <section className="py-20 border-t border-white/10 bg-[#080D1A]/50 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 header-reveal">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">In The Press</h2>
            <p className="text-slate-400 text-sm">Coverage of GetCyber's research and autonomous defense architecture.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pressItems.map((item) => (
              <div
                key={item.headline}
                data-tilt-card
                className="tilt-card p-5 rounded-2xl bg-[#0B101E]/90 border border-white/10 shadow-lg hover:border-cyber-blue/40 transition-all"
              >
                <p className="text-[11px] font-mono font-bold text-cyber-blue uppercase tracking-wider mb-1.5">{item.outlet}</p>
                <h4 className="font-display font-semibold text-white text-sm leading-snug mb-2">"{item.headline}"</h4>
                <p className="text-[10px] text-slate-400 font-mono">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
