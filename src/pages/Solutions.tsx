import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight, Shield } from "lucide-react";
import { SOLUTIONS } from "@/constants/mockData";
import * as LucideIcons from "lucide-react";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";

const SECTION_IDS: Record<number, string> = {
  0: "vulnerability",
  1: "pentest",
  2: "threat",
  3: "compliance",
  4: "incident",
  5: "ai",
  6: "analytics",
  7: "assets",
};

export default function Solutions() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

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
      {/* Background soft ambient glows */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-cyber-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-cyber-green/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero */}
      <section className="py-12 sm:py-16 text-center relative z-10" id="top">
        <div className="max-w-4xl mx-auto px-4 header-reveal">
          <span className="text-xs font-mono uppercase tracking-wider text-cyber-blue font-semibold bg-cyber-blue/10 border border-cyber-blue/30 px-3 py-1 rounded-full">
            Full-Spectrum Capabilities
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Every Security Need, One Autonomous Platform
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            GetCyber unifies all essential cybersecurity pillars into a single AI-driven SOC architecture engineered for enterprise speed and precision.
          </p>
        </div>

        {/* Quick nav anchors */}
        <div className="max-w-5xl mx-auto px-4 mt-8 flex flex-wrap justify-center gap-2">
          {SOLUTIONS.map((sol, i) => (
            <button
              key={sol.id}
              onClick={() => {
                const el = document.getElementById(SECTION_IDS[i]);
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 90;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="text-xs font-semibold bg-[#0B101E]/80 border border-white/10 text-slate-300 hover:text-white hover:border-cyber-blue/40 px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-glow-blue"
            >
              {sol.title}
            </button>
          ))}
        </div>
      </section>

      {/* Solutions Detailed Grid */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SOLUTIONS.map((sol, i) => {
            const Icon = (LucideIcons as Record<string, React.ElementType>)[sol.icon] || LucideIcons.Shield;
            const isEven = i % 2 === 0;
            const sectionId = SECTION_IDS[i] || sol.id;
            return (
              <div
                key={sol.id}
                id={sectionId}
                className={`scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
                  !isEven ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  <div className="w-14 h-14 bg-cyber-blue/15 rounded-2xl flex items-center justify-center mb-5 border border-cyber-blue/30 shadow-glow-blue">
                    <Icon className="w-7 h-7 text-cyber-blue" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                    {sol.title}
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {sol.description}
                  </p>
                  <div className="space-y-2.5 mb-8">
                    {sol.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle className="w-4 h-4 text-cyber-green flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/register"
                    className="cyber-btn-primary inline-flex items-center gap-2 text-xs sm:text-sm py-2.5 px-6 font-bold shadow-glow-blue"
                  >
                    <span>Deploy {sol.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div
                    data-tilt-card
                    data-glow="rgba(37, 99, 235, 0.25)"
                    className="tilt-card rounded-[22px] p-6 sm:p-8 bg-[#0B101E]/85 backdrop-blur-2xl border border-white/10 shadow-2xl hover:border-cyber-blue/40 transition-all cursor-pointer group"
                  >
                    <div className="mb-4 flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="text-xs font-mono text-slate-400 ml-1">{sol.title} Architecture</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 rounded">
                        AUTONOMOUS
                      </span>
                    </div>

                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                      Production Enterprise Use Cases
                    </p>

                    <div className="space-y-2">
                      {sol.useCases.map((uc) => (
                        <div
                          key={uc}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-[#05070F]/80 border border-white/5 hover:border-cyber-blue/30 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-cyber-blue flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-slate-200">{uc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-10 rounded-[28px] bg-gradient-to-r from-cyber-blue/20 via-cyber-cyan/15 to-cyber-green/10 border border-cyber-blue/30 shadow-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Ready to Upgrade Your Security Posture?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Start your free 14-day enterprise trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link
                to="/register"
                className="cyber-btn-primary inline-flex items-center justify-center gap-2 text-sm py-3 px-8 font-bold shadow-glow-blue"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="cyber-btn-secondary inline-flex items-center justify-center text-sm py-3 px-8"
              >
                Talk to Security Architect
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
