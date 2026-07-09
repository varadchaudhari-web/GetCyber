import { Link } from "react-router-dom";
import { Shield, Target, Globe, Heart, Award, Users, ArrowRight } from "lucide-react";

const values = [
  { icon: Shield, title: "Security First", desc: "We apply the same security standards to ourselves that we recommend to our customers.", color: "text-cyber-blue" },
  { icon: Target, title: "Mission Driven", desc: "Our mission is to make enterprise-grade security accessible to every organization.", color: "text-cyber-red" },
  { icon: Globe, title: "Global Impact", desc: "Protecting organizations across 180+ countries from modern cyber threats.", color: "text-cyber-green" },
  { icon: Heart, title: "Customer Obsession", desc: "Every feature we build is driven by the real-world needs of security professionals.", color: "text-cyber-purple" },
];

const timeline = [
  { year: "2022", event: "GetCyber founded by ex-NSA, Google, and Mandiant security engineers." },
  { year: "2023", event: "Launched Vulnerability Assessment and Threat Intelligence modules. Reached 500 customers." },
  { year: "2024", event: "Raised $48M Series B. Launched AI Security Assistant (GC-AI) and Compliance Automation." },
  { year: "2025", event: "Expanded to 180+ countries. Achieved SOC 2 Type II and ISO 27001 certifications." },
  { year: "2026", event: "Reached 10,000+ organizations. Named Gartner Leader and G2 Top Rated Platform." },
];

const awards = [
  "Gartner Peer Insights 4.8 Stars",
  "G2 Leader 2026",
  "Forrester Wave Leader",
  "SC Media Award 2026",
  "Inc 5000 Fastest Growing",
  "CISA Recognized",
  "SOC 2 Type II Certified",
  "ISO 27001 Certified",
];

const pressItems = [
  { outlet: "TechCrunch", headline: "GetCyber raises $48M to bring enterprise security to every business", date: "March 2024" },
  { outlet: "Forbes", headline: "The startup making NSA-grade security affordable for SMBs", date: "August 2024" },
  { outlet: "Dark Reading", headline: "GetCyber's AI assistant changes how analysts investigate threats", date: "January 2025" },
  { outlet: "SC Media", headline: "GetCyber named Best Enterprise Security Platform 2026", date: "June 2026" },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 text-center relative overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-glow-blue opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Our Story</p>
          <h1 className="text-5xl font-black text-white mb-6">Making Cybersecurity Accessible to All</h1>
          <p className="text-dark-text text-xl max-w-3xl mx-auto leading-relaxed">
            GetCyber was founded in 2022 by a team of former NSA, Google, and Mandiant security experts who believed that enterprise-grade cybersecurity should not be limited to Fortune 500 companies.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-dark-surface border-y border-dark-border" id="stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "2022", label: "Founded", color: "text-cyber-blue" },
              { value: "10,000+", label: "Customers", color: "text-cyber-green" },
              { value: "180+", label: "Countries", color: "text-cyber-purple" },
              { value: "$48M", label: "Series B Raised", color: "text-cyber-yellow" },
            ].map((s) => (
              <div key={s.label}>
                <p className={`text-4xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-dark-text mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20" id="mission">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">Our Mission</h2>
              <p className="text-dark-text leading-relaxed mb-4">
                Cyber threats do not discriminate. A mid-size hospital faces the same ransomware gangs as a Fortune 500 bank. A government agency faces the same APT groups as a tech unicorn. Yet the security tools available to protect them are vastly different.
              </p>
              <p className="text-dark-text leading-relaxed mb-6">
                GetCyber was built to change this. By combining AI, automation, and deep security expertise into one unified platform, we empower every organization — regardless of size or budget — to defend against modern cyber threats.
              </p>
              <Link to="/register" className="cyber-btn-primary inline-flex items-center gap-2">
                Join the Mission <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="glass-card p-5">
                    <Icon className={`w-6 h-6 ${v.color} mb-3`} />
                    <h3 className="font-bold text-white text-sm mb-2">{v.title}</h3>
                    <p className="text-dark-text text-xs leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-dark-surface border-y border-dark-border" id="timeline">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Our Journey</h2>
            <p className="text-dark-text">From a small team of security researchers to a global cybersecurity platform.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[120px] top-0 bottom-0 w-px bg-dark-border hidden sm:block" />
            <div className="space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-6 items-start">
                  <div className="w-[100px] sm:w-[120px] flex-shrink-0 text-right">
                    <span className="text-cyber-blue font-bold text-sm font-mono">{item.year}</span>
                  </div>
                  <div className="hidden sm:flex w-5 h-5 rounded-full bg-cyber-blue/20 border border-cyber-blue/60 flex-shrink-0 mt-0.5 items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyber-blue" />
                  </div>
                  <div className="glass-card p-4 flex-1">
                    <p className="text-dark-text-bright text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20" id="awards">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Recognition</h2>
          <p className="text-dark-text mb-10">Industry recognition from the world's leading analyst firms.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {awards.map((award) => (
              <div key={award} className="glass-card p-4 text-center">
                <Award className="w-5 h-5 text-cyber-yellow mx-auto mb-2" />
                <p className="text-dark-text-bright text-xs font-medium">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-20 bg-dark-surface border-y border-dark-border" id="press">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-3">In The Press</h2>
            <p className="text-dark-text">What the media is saying about GetCyber.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pressItems.map((item) => (
              <div key={item.headline} className="glass-card p-5">
                <p className="text-xs font-bold text-cyber-blue uppercase tracking-wider mb-2">{item.outlet}</p>
                <p className="text-white font-semibold text-sm leading-snug mb-2">{item.headline}</p>
                <p className="text-xs text-dark-text">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-16" id="careers-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Users className="w-10 h-10 text-cyber-blue mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-4">Join Our Team</h2>
          <p className="text-dark-text mb-6">Help us build the future of cybersecurity. We are hiring security engineers, researchers, and product managers worldwide.</p>
          <Link to="/careers" className="cyber-btn-primary inline-flex items-center gap-2">
            View Open Positions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
