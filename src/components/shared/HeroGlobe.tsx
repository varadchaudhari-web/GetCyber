import { useEffect, useRef } from "react";

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isMounted = true;

    // Lazy load the Three.js globe chunk so initial HTML paints first
    import("@/lib/effects/globe")
      .then(({ initGlobe }) => {
        if (isMounted && canvasRef.current) {
          cleanup = initGlobe(canvasRef.current);
        }
      })
      .catch((err) => {
        console.error("Failed to load 3D globe bundle:", err);
      });

    return () => {
      isMounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block pointer-events-auto"
      />
    </div>
  );
}
