export function initCounters(elements: HTMLElement[]): () => void {
  if (!elements || elements.length === 0) return () => {};

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const formatNumberWithCommas = (n: number, decimals: number): string => {
    const parts = n.toFixed(decimals).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const animateElement = (el: HTMLElement) => {
    const rawTarget = el.getAttribute("data-target") || el.textContent || "0";
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";

    // Extract numeric portion
    const match = rawTarget.match(/[\d,.]+/);
    if (!match) return;

    const cleanNumStr = match[0].replace(/,/g, "");
    const targetVal = parseFloat(cleanNumStr);
    if (isNaN(targetVal)) return;

    // Check if decimal places exist
    const hasDecimal = cleanNumStr.includes(".");
    const decimalPlaces = hasDecimal ? (cleanNumStr.split(".")[1]?.length || 0) : 0;

    // Suffix extraction if not explicitly provided
    let finalSuffix = suffix;
    if (!suffix && rawTarget.replace(match[0], "").trim()) {
      finalSuffix = rawTarget.replace(match[0], "").trim();
    }

    if (prefersReduced) {
      el.textContent = `${prefix}${formatNumberWithCommas(targetVal, decimalPlaces)}${finalSuffix}`;
      return;
    }

    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutCubic(progress);
      const currentVal = targetVal * easedProgress;

      el.textContent = `${prefix}${formatNumberWithCommas(currentVal, decimalPlaces)}${finalSuffix}`;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = `${prefix}${formatNumberWithCommas(targetVal, decimalPlaces)}${finalSuffix}`;
      }
    };

    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          obs.unobserve(el);
          animateElement(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}
