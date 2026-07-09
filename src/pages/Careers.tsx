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
    <div className="min-h-screen pt-24">
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Careers</p>
          <h1 className="text-5xl font-black text-white mb-4">Join GetCyber</h1>
          <p className="text-dark-text text-xl">Help us build the future of cybersecurity and protect organizations worldwide.</p>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[{ label: "Open Roles", value: jobs.length }, { label: "Countries", value: "12+" }, { label: "Team Size", value: "250+" }, { label: "Avg Tenure", value: "3.2 yrs" }].map((s) => (
              <div key={s.label} className="glass-card p-5 text-center">
                <p className="text-3xl font-black text-cyber-blue">{s.value}</p>
                <p className="text-dark-text text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.title} className="glass-card-hover p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cyber-blue/10 border border-cyber-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-dark-text">
                      <span>{job.dept}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="bg-dark-card border border-dark-border px-2 py-0.5 rounded">{job.type}</span>
                    </div>
                  </div>
                </div>
                <button className="cyber-btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 whitespace-nowrap">
                  Apply <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
