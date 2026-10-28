import { useEffect, useRef } from "react";

interface CodeParticle {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  alpha: number;
  color: string;
}

const CYBER_CODE_SNIPPETS = [
  "CVE-2026-8912 [RESOLVED]",
  "AES-256-GCM::KEY_ROTATION",
  "0x7FFF82C9 -> ALLOC_SAFE",
  "IPTABLES -A INPUT -p tcp --dport 443",
  "SELINUX=enforcing",
  "GC_AI::ANOMALY_INDEX = 0.001",
  "SHA256::e3b0c44298fc...",
  "FIDO2_PASSKEY::ATTESTED",
  "ZTNA::TOKEN_VERIFIED",
  "TLS_1_3_CHACHA20",
  "WAF::BLOCK 185.220.101.44",
  "MITRE::T1078 [ISOLATED]",
  "ISO27001::ANNEX_A_OK",
  "ROOT_CERT::SHA512_VALID",
  "SOC2_TYPE_II::VERIFIED",
  "DEFCON_5::SECURE",
  "EDR::ACTIVE_128/128",
  "K8S_POD_SECURITY::RESTRICTED",
];

const COLORS = ["#387aff", "#2563eb", "#22c55e", "#06b6d4"];

export default function CyberCodeStream() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // On mobile (<768px), hide floating labels completely as requested
    if (width < 768) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    // Right-side arena boundaries with safe padding to prevent clipping
    const getMinX = () => width * 0.46;
    const getMaxX = () => width - 110;
    const getMinY = () => 105;
    const getMaxY = () => height - 130;

    const mouse = {
      x: width * 0.72,
      y: height * 0.42,
      targetX: width * 0.72,
      targetY: height * 0.42,
      active: true,
      radius: 200,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width * 0.72;
      mouse.targetY = height * 0.42;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      if (width < 768) {
        ctx.clearRect(0, 0, width, height);
        return;
      }
      initParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let particles: CodeParticle[] = [];

    const initParticles = () => {
      particles = [];
      const minX = getMinX();
      const maxX = getMaxX();
      const minY = getMinY();
      const maxY = getMaxY();

      // Reduced by ~40% for subtle luxury aesthetic (18 chips)
      const count = 18;

      ctx.font = '11px "JetBrains Mono", monospace';

      for (let i = 0; i < count; i++) {
        const text = CYBER_CODE_SNIPPETS[i % CYBER_CODE_SNIPPETS.length];
        const textW = ctx.measureText(text).width + 16;
        const textH = 20;

        const x = minX + Math.random() * (maxX - minX - textW);
        const y = minY + Math.random() * (maxY - minY - textH);

        particles.push({
          text,
          x,
          y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35 - 0.1,
          baseX: x,
          baseY: y,
          width: textW,
          height: textH,
          // Lower opacity for refined background luxury
          alpha: Math.random() * 0.18 + 0.14,
          color: COLORS[i % COLORS.length],
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const minX = getMinX();
      const maxX = getMaxX();
      const minY = getMinY();
      const maxY = getMaxY();

      // 1. Particle-to-Particle Collision Avoidance (so they NEVER overlap each other!)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = (p1.x + p1.width / 2) - (p2.x + p2.width / 2);
          const dy = (p1.y + p1.height / 2) - (p2.y + p2.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = 75; // safe distance between chips

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            // Push apart smoothly
            p1.x += nx * overlap * 0.05;
            p1.y += ny * overlap * 0.05;
            p2.x -= nx * overlap * 0.05;
            p2.y -= ny * overlap * 0.05;
          }
        }
      }

      // 2. Cursor Radar Halo when over right arena
      if (mouse.x >= minX - 40) {
        const cursorGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        cursorGradient.addColorStop(0, "rgba(37, 99, 235, 0.12)");
        cursorGradient.addColorStop(0.6, "rgba(34, 197, 94, 0.03)");
        cursorGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = cursorGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Connect particles with subtle data trails
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.08;
            ctx.strokeStyle = `rgba(56, 122, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x + p1.width / 2, p1.y + p1.height / 2);
            ctx.lineTo(p2.x + p2.width / 2, p2.y + p2.height / 2);
            ctx.stroke();
          }
        }
      }

      // 4. Update and Draw Chips
      ctx.font = '10.5px "JetBrains Mono", monospace';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Subtle mouse drift
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.active && mouse.x >= minX) {
          const force = (1 - dist / mouse.radius) * 0.03;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle + Math.PI / 4) * force;
          p.vy += Math.sin(angle + Math.PI / 4) * force;
        } else {
          p.vx *= 0.985;
          p.vy *= 0.985;
          if (Math.abs(p.vx) < 0.05) p.vx = (Math.random() - 0.5) * 0.3;
          if (Math.abs(p.vy) < 0.05) p.vy = -0.15;
        }

        // Keep strictly inside bounds to prevent clipping at edges
        if (p.x < minX + 10) {
          p.x = minX + 10;
          p.vx = Math.abs(p.vx);
        }
        if (p.x > maxX - p.width) {
          p.x = maxX - p.width;
          p.vx = -Math.abs(p.vx);
        }
        if (p.y < minY + 10) {
          p.y = minY + 10;
          p.vy = Math.abs(p.vy);
        }
        if (p.y > maxY - p.height) {
          p.y = maxY - p.height;
          p.vy = -Math.abs(p.vy);
        }

        // Fade near the headline area
        const fadeMultiplier = Math.min(1, Math.max(0, (p.x - minX) / 100));
        const effectiveAlpha = p.alpha * fadeMultiplier;

        if (effectiveAlpha <= 0.01) continue;

        ctx.save();
        ctx.globalAlpha = effectiveAlpha;

        // Chip box
        ctx.fillStyle = "rgba(11, 16, 30, 0.70)";
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.7;

        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.width, p.height, 6);
        ctx.fill();
        ctx.stroke();

        // Status indicator dot
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + 8, p.y + p.height / 2, 2, 0, Math.PI * 2);
        ctx.fill();

        // Text
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText(p.text, p.x + 15, p.y + p.height / 2 + 3.5);

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-[1] hidden md:block"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, transparent 35%, rgba(0,0,0,0.85) 50%, black 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, transparent 35%, rgba(0,0,0,0.85) 50%, black 100%)",
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block pointer-events-auto cursor-crosshair opacity-85"
      />
    </div>
  );
}
