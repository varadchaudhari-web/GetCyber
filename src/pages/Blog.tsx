import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";

const posts = [
  { title: "LockBit 3.0 Analysis: What Security Teams Need to Know", category: "Threat Intel", date: "Jul 9, 2026", readTime: "8 min", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=220&fit=crop", glow: "rgba(239, 68, 68, 0.25)" },
  { title: "ISO 27001:2022 — Key Changes and What They Mean for Your Business", category: "Compliance", date: "Jul 7, 2026", readTime: "12 min", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop", glow: "rgba(49, 208, 170, 0.25)" },
  { title: "AI in Cybersecurity: How GC-AI Reduces MTTR by 86%", category: "Product", date: "Jul 5, 2026", readTime: "6 min", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=220&fit=crop", glow: "rgba(77, 141, 255, 0.25)" },
  { title: "Building a Zero Trust Architecture: Step-by-Step Guide", category: "Architecture", date: "Jul 3, 2026", readTime: "15 min", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=220&fit=crop", glow: "rgba(167, 123, 255, 0.25)" },
  { title: "Ransomware Response Playbook: A Practical Guide", category: "Incident Response", date: "Jul 1, 2026", readTime: "10 min", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=220&fit=crop", glow: "rgba(249, 115, 22, 0.25)" },
  { title: "CVSS 4.0: Understanding the New Scoring System", category: "Vulnerabilities", date: "Jun 28, 2026", readTime: "7 min", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=220&fit=crop", glow: "rgba(245, 158, 11, 0.25)" },
];

export default function Blog() {
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
    <div className="min-h-screen pt-24 bg-[#070b16]">
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 header-reveal">
          <p className="text-cyber-blue text-sm font-semibold uppercase tracking-wider mb-3">Blog</p>
          <h1 className="text-5xl font-black text-white mb-4">Security Intelligence Blog</h1>
          <p className="text-dark-text text-xl">Expert insights, threat analysis, and best practices from the GetCyber security team.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <div
                key={p.title}
                data-tilt-card
                data-glow={p.glow}
                className="tilt-card glass-card-hover overflow-hidden cursor-pointer shadow-xl"
              >
                <img src={p.img} alt={p.title} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 px-2 py-0.5 rounded-full">{p.category}</span>
                    <span className="text-xs text-dark-text">{p.readTime} read</span>
                  </div>
                  <h3 className="tilt-title font-bold text-white text-sm mb-3 leading-tight">{p.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-text">{p.date}</span>
                    <button className="flex items-center gap-1 text-xs text-cyber-blue">Read <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
