import React, { useRef, useState, useEffect } from "react";
import { Shield, Sparkles, ChevronLeft, ChevronRight, Eye, Cpu, Zap, Activity, Radio, Lock } from "lucide-react";
import { initTiltCards } from "@/lib/effects/tiltCards";

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tagColor: string;
  glowColor: string;
  image: string;
  metrics: { label: string; value: string }[];
  description: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "soc-command",
    title: "SOC Command Center",
    subtitle: "24/7 Global Defense Operations",
    category: "Autonomous SOC",
    tagColor: "text-[#4d8dff] bg-[#4d8dff]/10 border-[#4d8dff]/30",
    glowColor: "rgba(77, 141, 255, 0.35)",
    image: "/images/soc-command-center.jpg",
    metrics: [
      { label: "Uptime SLA", value: "99.999%" },
      { label: "Active Analysts", value: "240+ Global" },
      { label: "Daily Events", value: "2.8B+" },
    ],
    description: "Enterprise-grade command theater delivering unified visibility across hybrid cloud infrastructure, endpoints, and identity perimeters.",
  },
  {
    id: "neural-threat",
    title: "Neural Threat Matrix",
    subtitle: "Deep Learning Pattern Detection",
    category: "AI Engine",
    tagColor: "text-[#a77bff] bg-[#a77bff]/10 border-[#a77bff]/30",
    glowColor: "rgba(167, 123, 255, 0.35)",
    image: "/images/neural-threat-matrix.svg",
    metrics: [
      { label: "Vectors Scanned", value: "1.8B/sec" },
      { label: "Zero-Day Accuracy", value: "99.8%" },
      { label: "Neural Layers", value: "64-Deep" },
    ],
    description: "Self-evolving neural networks detect polymorphic malware, adversary lateral movements, and zero-day exploits in real-time.",
  },
  {
    id: "cloud-shield",
    title: "Zero-Trust Cloud Armor",
    subtitle: "Adaptive Perimeter Defense",
    category: "Cloud Security",
    tagColor: "text-[#31d0aa] bg-[#31d0aa]/10 border-[#31d0aa]/30",
    glowColor: "rgba(49, 208, 170, 0.35)",
    image: "/images/cloud-defense-shield.svg",
    metrics: [
      { label: "Micro-segments", value: "50,000+" },
      { label: "Latency Added", value: "<0.4ms" },
      { label: "Cloud Coverage", value: "AWS/Azure/GCP" },
    ],
    description: "Continuous identity validation and sub-millisecond micro-segmentation safeguarding multi-cloud workloads from unauthorized access.",
  },
  {
    id: "quantum-crypto",
    title: "Quantum-Safe Encryption",
    subtitle: "Post-Quantum Cryptography Core",
    category: "Cryptography",
    tagColor: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30",
    glowColor: "rgba(56, 189, 248, 0.35)",
    image: "/images/quantum-cryptography.svg",
    metrics: [
      { label: "Cipher Depth", value: "AES-512 Lattice" },
      { label: "Entropy", value: "99.9997%" },
      { label: "NIST Status", value: "FIPS 203/204" },
    ],
    description: "Next-generation post-quantum cryptographic primitives securing data in transit and at rest against quantum computing decryption attacks.",
  },
  {
    id: "red-team",
    title: "Autonomous Red Team Ops",
    subtitle: "Continuous Adversary Simulation",
    category: "Offensive Security",
    tagColor: "text-[#ff3366] bg-[#ff3366]/10 border-[#ff3366]/30",
    glowColor: "rgba(255, 51, 102, 0.35)",
    image: "/images/red-team-ops.svg",
    metrics: [
      { label: "Attack Playbooks", value: "1,200+" },
      { label: "MITRE ATT&CK", value: "100% Mapped" },
      { label: "Simulations/Day", value: "8,500+" },
    ],
    description: "Automated breach and attack simulation platforms exposing security gaps and misconfigurations before real adversaries strike.",
  },
  {
    id: "incident-soar",
    title: "Real-Time SOAR Containment",
    subtitle: "Autonomous Incident Response",
    category: "Threat Response",
    tagColor: "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/30",
    glowColor: "rgba(6, 182, 212, 0.35)",
    image: "/images/incident-response-radar.svg",
    metrics: [
      { label: "Mean MTTR", value: "840 ms" },
      { label: "Auto-Isolation", value: "Automated" },
      { label: "Playbooks Active", value: "450+ SOAR" },
    ],
    description: "Sub-second autonomous containment and quarantine engine neutralizing malware, ransomware, and credential compromises instantly.",
  },
];

export default function CyberShowcaseCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ShowcaseItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll animation logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.75; // Pixels per frame for smooth cinematic motion

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        // Seamless loop reset
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    const tiltCleanup = initTiltCards(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      tiltCleanup();
    };
  }, [isPaused]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Duplicate items array for continuous infinite scrolling
  const duplicatedItems = [...showcaseItems, ...showcaseItems];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070b16] border-y border-white/5">
      {/* Background cyber ambient gradients */}
      <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-[#4d8dff]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-[#31d0aa]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 header-reveal">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4d8dff]/10 border border-[#4d8dff]/25 rounded-full px-3.5 py-1 text-xs font-semibold text-[#4d8dff] mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SOC-GRADE VISUAL DEFENSE SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Enterprise Cyber Defense{" "}
              <span className="bg-gradient-to-r from-[#4d8dff] via-[#38bdf8] to-[#31d0aa] bg-clip-text text-transparent">
                in Action
              </span>
            </h2>
            <p className="text-[#93a2c4] text-sm sm:text-base max-w-2xl mt-3">
              Explore how GetCyber visualizes and neutralizes threats across multi-cloud, offensive simulations, quantum cryptography, and 24/7 SOC operations.
            </p>
          </div>

          {/* Controls: Manual Prev/Next & Play/Pause status */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="text-xs text-[#93a2c4] flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b1222]/80 border border-white/10">
              <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-[#31d0aa] animate-pulse"}`} />
              <span>{isPaused ? "Paused" : "Auto-Scrolling"}</span>
            </div>
            <button
              onClick={() => handleManualScroll("left")}
              aria-label="Scroll previous cards"
              className="p-2.5 rounded-xl bg-[#0b1222]/90 hover:bg-[#131e36] text-white border border-white/10 hover:border-[#4d8dff]/40 transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualScroll("right")}
              aria-label="Scroll next cards"
              className="p-2.5 rounded-xl bg-[#0b1222]/90 hover:bg-[#131e36] text-white border border-white/10 hover:border-[#4d8dff]/40 transition-all shadow-md active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-scrolling horizontal container */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-hidden no-scrollbar px-6 sm:px-12 py-4 select-none cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            data-tilt-card
            data-glow={item.glowColor}
            onClick={() => setSelectedImage(item)}
            className="tilt-card flex-shrink-0 w-[270px] xs:w-[320px] sm:w-[380px] lg:w-[420px] bg-[#0b1222]/80 hover:bg-[#0f192e] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col"
          >
            {/* Image Container with high-tech HUD overlay */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#050913]">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1222] via-transparent to-black/30 pointer-events-none" />

              {/* Category Badge */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-md ${item.tagColor}`}>
                  {item.category}
                </span>
              </div>

              {/* View Detail Hover Hint */}
              <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <Eye className="w-4 h-4 text-[#38bdf8]" />
                </div>
              </div>

              {/* Subtle Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            </div>

            {/* Content Container */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="tilt-title text-xl font-bold text-white group-hover:text-[#4d8dff] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#38bdf8] mt-0.5 mb-2.5">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#93a2c4] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Telemetry Metrics Bar */}
              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
                {item.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="text-center p-2 rounded-lg bg-[#070b16]/70 border border-white/5">
                    <span className="block text-[10px] text-[#93a2c4] font-medium truncate">
                      {metric.label}
                    </span>
                    <span className="block text-xs sm:text-sm font-mono font-bold text-white mt-0.5 truncate">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview on click */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0b1222] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative h-80 sm:h-96 w-full bg-black overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain sm:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1222] via-transparent to-transparent pointer-events-none" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${selectedImage.tagColor}`}>
                  {selectedImage.category}
                </span>
                <span className="text-xs font-mono text-[#38bdf8]">{selectedImage.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {selectedImage.title}
              </h3>
              <p className="text-sm sm:text-base text-[#93a2c4] leading-relaxed mb-6">
                {selectedImage.description}
              </p>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-3 gap-3">
                {selectedImage.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#070b16] border border-white/10 text-center">
                    <p className="text-xs text-[#93a2c4]">{metric.label}</p>
                    <p className="text-base sm:text-lg font-mono font-bold text-white mt-1">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
