export function initReveals(elements: HTMLElement[]): () => void {
  if (!elements || elements.length === 0) return () => {};

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    elements.forEach((el) => {
      el.classList.add("is-revealed");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add("is-revealed");
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => {
    el.classList.add("reveal-header");
    observer.observe(el);
  });

  return () => {
    observer.disconnect();
  };
}
