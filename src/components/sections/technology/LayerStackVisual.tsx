"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

const LAYERS = 24;

export default function LayerStackVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const layers = layersRef.current;
      if (!layers) return;

      const layerEls = layers.querySelectorAll(".tech-layer");

      if (prefersReducedMotion()) {
        gsap.set(layerEls, { opacity: 1 });
        return;
      }

      layerEls.forEach((layer, i) => {
        gsap.set(layer, {
          opacity: 0,
          rotateX: -45,
          y: -i * 2,
          transformOrigin: "center bottom",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
        },
      });

      layerEls.forEach((layer, i) => {
        tl.to(
          layer,
          {
            opacity: 0.12 + (i / LAYERS) * 0.88,
            rotateX: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          i * 0.035,
        );
      });

      gsap.to(layers, {
        rotateY: 12,
        rotateX: -6,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[420px] items-center justify-center md:h-[520px]"
      data-cursor="canvas"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_70%)]" />

      <div
        ref={layersRef}
        className="relative"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {Array.from({ length: LAYERS }).map((_, i) => (
          <div
            key={i}
            className="tech-layer absolute left-1/2 h-[180px] w-[280px] -translate-x-1/2 rounded-sm border border-indigo-400/20 bg-gradient-to-b from-indigo-500/15 to-violet-500/5 md:w-[360px]"
            style={{
              bottom: i * 6,
              zIndex: i,
            }}
          />
        ))}

        <div className="relative z-50 flex h-[180px] w-[280px] items-center justify-center rounded-sm border border-white/10 bg-surface-elevated/90 shadow-xl shadow-indigo-500/10 backdrop-blur-sm md:w-[360px]">
          <div className="text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              NexaForge Core
            </span>
            <p className="mt-2 text-sm font-semibold text-white">Unified Platform</p>
            <p className="mt-1 text-[10px] text-muted">Governed · Composable · Open</p>
          </div>
        </div>
      </div>
    </div>
  );
}
