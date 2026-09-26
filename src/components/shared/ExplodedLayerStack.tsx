import { useEffect, useRef } from "react";
import { Shield, Lock, Key, Server, Database, CheckCircle2 } from "lucide-react";
import { initLayerStack } from "@/lib/effects/layerStack";

const LAYERS = [
  {
    id: "perimeter",
    title: "Layer 05 · Perimeter Defense",
    icon: Shield,
    color: "#4d8dff",
    borderColor: "border-[#4d8dff]/40",
    bgGradient: "from-[#4d8dff]/15 to-[#0b1222]/90",
    glowColor: "rgba(77, 141, 255, 0.2)",
    desc: "Global Edge WAF, Autonomous DDoS Mitigation & Anycast DNS Scrubbing",
    badges: ["AI WAF", "L3/L4/L7 DDoS", "Bot Shield", "Edge SSL"],
    status: "99.999% Filtered",
  },
  {
    id: "network",
    title: "Layer 04 · Network & Microsegmentation",
    icon: Server,
    color: "#31d0aa",
    borderColor: "border-[#31d0aa]/40",
    bgGradient: "from-[#31d0aa]/15 to-[#0b1222]/90",
    glowColor: "rgba(49, 208, 170, 0.2)",
    desc: "Zero-Trust Encrypted Mesh, East-West Traffic Isolation & Real-Time IDS/IPS",
    badges: ["ZTNA Mesh", "WireGuard IPsec", "Deep Packet", "Microsegmentation"],
    status: "Zero Lateral Movement",
  },
  {
    id: "identity",
    title: "Layer 03 · Identity & Access Fabric",
    icon: Key,
    color: "#a77bff",
    borderColor: "border-[#a77bff]/40",
    bgGradient: "from-[#a77bff]/15 to-[#0b1222]/90",
    glowColor: "rgba(167, 123, 255, 0.2)",
    desc: "FIDO2/Passkey Biometrics, Continuous Contextual Auth & Dynamic RBAC",
    badges: ["FIDO2 Passkeys", "Risk-Based MFA", "JIT Access", "SAML/OIDC"],
    status: "Continuous Validation",
  },
  {
    id: "application",
    title: "Layer 02 · Application Runtime Shield",
    icon: Lock,
    color: "#54c6f0",
    borderColor: "border-[#54c6f0]/40",
    bgGradient: "from-[#54c6f0]/15 to-[#0b1222]/90",
    glowColor: "rgba(84, 198, 240, 0.2)",
    desc: "In-Memory RASP Protection, API Schema Validation & Automated Pen Testing",
    badges: ["RASP Engine", "API Guardian", "SAST/DAST", "Container Sandbox"],
    status: "Runtime Protected",
  },
  {
    id: "data",
    title: "Layer 01 · Cryptographic Data Vault",
    icon: Database,
    color: "#ff6b81",
    borderColor: "border-[#ff6b81]/40",
    bgGradient: "from-[#ff6b81]/15 to-[#0b1222]/90",
    glowColor: "rgba(255, 107, 129, 0.2)",
    desc: "Post-Quantum AES-256-GCM, Envelope Encryption & Immutable Audit Ledger",
    badges: ["Post-Quantum AES", "KMS HSM", "Immutable Logs", "DLP Enforcer"],
    status: "Cryptographically Sealed",
  },
];

export default function ExplodedLayerStack() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const panels = panelRefs.current.filter((p): p is HTMLDivElement => p !== null);
    if (!stageRef.current || panels.length === 0) return;

    const cleanup = initLayerStack(stageRef.current, panels);
    return () => cleanup();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#070b16] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 header-reveal">
          <p className="text-[#31d0aa] text-sm font-semibold uppercase tracking-wider mb-3">
            Multi-Layered Cyber Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Exploded Zero-Trust Defense Stack
          </h2>
          <p className="text-[#93a2c4] max-w-2xl mx-auto text-sm sm:text-base">
            Scroll to inspect the 5 autonomous defense tiers protecting your enterprise from edge to quantum data vault.
          </p>
        </div>

        {/* 3D Exploded Stage Container */}
        <div className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center">
          <div
            ref={stageRef}
            className="perspective-1200 w-full h-[520px] relative flex items-center justify-center"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {LAYERS.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.id}
                  ref={(el) => (panelRefs.current[idx] = el)}
                  className={`absolute top-1/2 left-1/2 w-[90vw] max-w-[320px] sm:max-w-[460px] md:max-w-[540px] h-[190px] sm:h-[180px] -ml-[45vw] sm:-ml-[230px] md:-ml-[270px] -mt-[95px] sm:-mt-[90px] rounded-2xl p-3.5 sm:p-5 bg-gradient-to-r ${layer.bgGradient} backdrop-blur-xl border ${layer.borderColor} shadow-2xl transition-shadow duration-300`}
                  style={{
                    boxShadow: `0 16px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 24px ${layer.glowColor}`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border"
                        style={{ backgroundColor: `${layer.color}15`, borderColor: `${layer.color}40` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: layer.color }} />
                      </div>
                      <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
                        {layer.title}
                      </h4>
                    </div>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full font-medium"
                      style={{ color: layer.color, backgroundColor: `${layer.color}15`, border: `1px solid ${layer.color}30` }}
                    >
                      {layer.status}
                    </span>
                  </div>

                  <p className="text-[#93a2c4] text-xs sm:text-sm leading-relaxed mb-3">
                    {layer.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                    {layer.badges.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-[#0b1222]/80 text-[#eaf0ff] border border-white/10 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#31d0aa]" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
