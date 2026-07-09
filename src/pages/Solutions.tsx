import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/constants/mockData";
import * as LucideIcons from "lucide-react";

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
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 text-center" id="top">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Security Solutions</p>
          <h1 className="text-5xl font-black text-white mb-4">Every Security Need, One Platform</h1>
          <p className="text-dark-text text-xl max-w-2xl mx-auto">GetCyber unifies all essential cybersecurity capabilities into a single AI-powered platform built for enterprises of every size.</p>
        </div>

        {/* Quick nav anchors */}
        <div className="max-w-5xl mx-auto px-4 mt-10 flex flex-wrap justify-center gap-2">
          {SOLUTIONS.map((sol, i) => (
            <a
              key={sol.id}
              href={`#${SECTION_IDS[i]}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(SECTION_IDS[i]);
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="text-xs bg-dark-card border border-dark-border text-dark-text-bright hover:text-cyber-blue hover:border-cyber-blue/40 px-3 py-1.5 rounded-full transition-all"
            >
              {sol.title}
            </a>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SOLUTIONS.map((sol, i) => {
            const Icon = (LucideIcons as Record<string, React.ElementType>)[sol.icon] || LucideIcons.Shield;
            const isEven = i % 2 === 0;
            const sectionId = SECTION_IDS[i] || sol.id;
            return (
              <div
                key={sol.id}
                id={sectionId}
                className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:grid-flow-dense" : ""}`}
              >
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  <div className="w-14 h-14 bg-cyber-blue/10 rounded-2xl flex items-center justify-center mb-5 border border-cyber-blue/20">
                    <Icon className="w-7 h-7 text-cyber-blue" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-3">{sol.title}</h2>
                  <p className="text-dark-text leading-relaxed mb-6">{sol.description}</p>
                  <div className="space-y-2.5 mb-8">
                    {sol.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-cyber-green flex-shrink-0" />
                        <span className="text-dark-text-bright text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/register" className="cyber-btn-primary inline-flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="glass-card p-6 border-cyber-blue/20">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyber-red" />
                      <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow" />
                      <div className="w-2.5 h-2.5 rounded-full bg-cyber-green" />
                      <span className="text-xs text-dark-text ml-2">{sol.title} Module</span>
                    </div>
                    <p className="text-xs text-dark-text uppercase tracking-wider mb-3">Key Use Cases</p>
                    <div className="space-y-2">
                      {sol.useCases.map((uc) => (
                        <div key={uc} className="flex items-center gap-2 p-2.5 bg-dark-card/60 rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-cyber-blue flex-shrink-0" />
                          <span className="text-sm text-dark-text-bright">{uc}</span>
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
      <section className="py-16 bg-dark-surface border-t border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Secure Your Organization?</h2>
          <p className="text-dark-text mb-8">Start your free 14-day trial today. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="cyber-btn-primary inline-flex items-center justify-center gap-2 text-base py-3 px-8">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="cyber-btn-secondary inline-flex items-center justify-center text-base py-3 px-8">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
