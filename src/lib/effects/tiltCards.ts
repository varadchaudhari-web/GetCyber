export function initTiltCards(target: HTMLElement | HTMLElement[] | null): () => void {
  if (!target) return () => {};

  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isCoarsePointer || prefersReduced) return () => {};

  let cards: HTMLElement[] = [];

  if (Array.isArray(target)) {
    cards = target;
  } else if (target instanceof HTMLElement) {
    if (target.matches(".tilt-card, [data-tilt-card]")) {
      cards = [target];
    } else {
      target.style.perspective = "1100px";
      cards = Array.from(target.querySelectorAll<HTMLElement>(".tilt-card, [data-tilt-card]"));
    }
  }

  if (cards.length === 0) return () => {};

  const cleanups: (() => void)[] = [];

  cards.forEach((card) => {
    card.classList.add("tilt-card");
    card.style.transformStyle = "preserve-3d";

    if (card.parentElement && !card.parentElement.style.perspective) {
      card.parentElement.style.perspective = "1100px";
    }

    const glowColor = card.getAttribute("data-glow") || "rgba(77, 141, 255, 0.22)";
    card.style.setProperty("--card-glow", glowColor);

    const title = card.querySelector<HTMLElement>(".tilt-title, h3, h4, .stat-value");
    if (title) {
      title.style.transform = "translateZ(28px)";
      title.style.transformStyle = "preserve-3d";
      title.style.transition = "transform 0.2s ease";
    }

    let resetTimer: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (resetTimer) {
        window.clearTimeout(resetTimer);
        resetTimer = null;
      }
      card.style.transition = "none";

      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotY = (px - 0.5) * 14;
      const rotX = (0.5 - py) * 14;

      card.style.transform = `rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translateZ(18px)`;

      // Set CSS custom properties for radial glow
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      card.style.setProperty("--mx", `${mx}px`);
      card.style.setProperty("--my", `${my}px`);
    };

    const handlePointerLeave = () => {
      card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      card.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px)";

      resetTimer = window.setTimeout(() => {
        card.style.transition = "";
        card.style.setProperty("--mx", "-1000px");
        card.style.setProperty("--my", "-1000px");
      }, 500);
    };

    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    cleanups.push(() => {
      if (resetTimer) window.clearTimeout(resetTimer);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      card.style.transform = "";
      card.style.transition = "";
      card.style.transformStyle = "";
      card.style.removeProperty("--card-glow");
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
      if (title) {
        title.style.transform = "";
        title.style.transformStyle = "";
      }
    });
  });

  return () => {
    cleanups.forEach((c) => c());
  };
}
