export function initLayerStack(stageEl: HTMLElement | null, panels: HTMLElement[]): () => void {
  if (!stageEl || !panels || panels.length === 0) return () => {};

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  stageEl.style.perspective = "1200px";
  stageEl.style.transformStyle = "preserve-3d";

  // Offsets for the 5 layers: Perimeter(2), Network(1), Identity(0), Application(-1), Data(-2)
  const offsets = [2, 1, 0, -1, -2];

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = stageEl.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Compute progress: 0 when entering viewport bottom, 1 when exiting top
    const totalDist = windowH + rect.height;
    const currentDist = windowH - rect.top;
    const rawProgress = totalDist > 0 ? currentDist / totalDist : 0.5;
    const p = Math.max(0, Math.min(1, rawProgress));

    const spread = prefersReduced ? 0.7 : Math.sin(p * Math.PI);

    panels.forEach((panel, idx) => {
      const offset = offsets[idx] !== undefined ? offsets[idx] : (2 - idx);
      const ty = offset * 78 * spread;
      const tz = offset * 60 * spread;
      const rotX = 58 - spread * 6;
      const rotZ = -32 + spread * 4;
      const opacity = prefersReduced ? 1 : 0.4 + spread * 0.6;

      panel.style.transform = `translateY(${ty.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
      panel.style.opacity = opacity.toFixed(2);
      panel.style.willChange = "transform, opacity";
    });
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
    stageEl.style.perspective = "";
    stageEl.style.transformStyle = "";
    panels.forEach((panel) => {
      panel.style.transform = "";
      panel.style.opacity = "";
      panel.style.willChange = "";
    });
  };
}
