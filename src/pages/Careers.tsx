import { Link } from "react-router-dom";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

const jobs = [
  { title: "Senior Security Engineer", dept: "Engineering", location: "San Francisco, CA / Remote", type: "Full-time" },
  { title: "Threat Intelligence Analyst", dept: "Security Research", location: "Remote", type: "Full-time" },
  { title: "Frontend Engineer (React/TypeScript)", dept: "Engineering", location: "San Francisco, CA / Remote", type: "Full-time" },
  { title: "Product Manager — Compliance", dept: "Product", location: "San Francisco, CA", type: "Full-time" },
  { title: "Customer Success Manager", dept: "Sales", location: "New York, NY / Remote", type: "Full-time" },
  { title: "Security Researcher (Red Team)", dept: "Security", location: "Remote", type: "Full-time" },
];

export default function Careers() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Engineering & Research Careers
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            Build The Future Of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-teal to-cyber-green bg-clip-text text-transparent">
              Autonomous Defense
            </span>
          </h1>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join elite reverse engineers, ethical hackers, and distributed systems architects protecting the world’s most critical infrastructure.
          </p>
        </div>
      </section>

      <section className="pb-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Active Openings", value: jobs.length },
              { label: "Global Hubs", value: "12+" },
              { label: "SOC Engineers", value: "250+" },
              { label: "Equity & 401(k)", value: "100%" },
            ].map((s) => (
              <div key={s.label} className="p-6 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 text-center shadow-xl">
                <p className="text-3xl font-display font-extrabold text-white">{s.value}</p>
                <p className="text-dark-text text-xs uppercase font-mono tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="p-6 rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl border border-white/10 hover:border-cyber-blue/40 shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-cyber-blue/30 transition-transform">
                    <Briefcase className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base group-hover:text-cyber-blue transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-dark-text font-mono">
                      <span>{job.dept}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-dark-text" />{job.location}</span>
                      <span className="bg-[#05070F] border border-white/10 px-2 py-0.5 rounded-full text-dark-text-bright">{job.type}</span>
                    </div>
                  </div>
                </div>
                <button className="cyber-btn-secondary text-xs py-2.5 px-5 rounded-xl flex items-center gap-2 whitespace-nowrap self-end sm:self-auto font-semibold">
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
