export function initHeadlineDepth(container: HTMLElement | null): () => void {
  if (!container) return () => {};

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return () => {};

  const depthSpans = container.querySelectorAll<HTMLElement>("[data-depth]");
  if (!depthSpans || depthSpans.length === 0) return () => {};

  let currentRx = 0;
  let currentRy = 0;
  let targetRx = 0;
  let targetRy = 0;
  let rafId: number | null = null;
  let isPointerInside = false;

  const updateTransforms = () => {
    currentRx += (targetRx - currentRx) * 0.1;
    currentRy += (targetRy - currentRy) * 0.1;

    depthSpans.forEach((span) => {
      const depthAttr = span.getAttribute("data-depth");
      const depth = depthAttr ? parseFloat(depthAttr) : 1;
      const tx = -currentRx * depth * 10;
      const ty = -currentRy * depth * 6;
      span.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0px)`;
      span.style.willChange = "transform";
    });

    if (isPointerInside || Math.abs(currentRx) > 0.001 || Math.abs(currentRy) > 0.001) {
      rafId = requestAnimationFrame(updateTransforms);
    } else {
      rafId = null;
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    targetRx = (e.clientX - rect.left) / rect.width - 0.5;
    targetRy = (e.clientY - rect.top) / rect.height - 0.5;
    isPointerInside = true;

    if (!rafId) {
      rafId = requestAnimationFrame(updateTransforms);
    }
  };

  const handlePointerLeave = () => {
    isPointerInside = false;
    targetRx = 0;
    targetRy = 0;
    if (!rafId) {
      rafId = requestAnimationFrame(updateTransforms);
    }
  };

  container.addEventListener("pointermove", handlePointerMove, { passive: true });
  container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    container.removeEventListener("pointermove", handlePointerMove);
    container.removeEventListener("pointerleave", handlePointerLeave);
    depthSpans.forEach((span) => {
      span.style.transform = "";
      span.style.willChange = "";
    });
  };
}
