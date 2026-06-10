"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { gsap, registerGSAP, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const ParticleScene = dynamic(() => import("./ParticleScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [sceneReady, setSceneReady] = useState(false);
  const [loadScene, setLoadScene] = useState(false);

  const isMobile = useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth < 768,
    () => false,
  );

  useEffect(() => {
    if (isMobile || prefersReducedMotion()) return;

    let cancelled = false;
    const load = () => {
      if (!cancelled) setLoadScene(true);
    };

    window.addEventListener("pointermove", load, { once: true, passive: true });
    const fallback = window.setTimeout(load, 5000);

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", load);
      window.clearTimeout(fallback);
    };
  }, [isMobile]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x, y };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const reduced = prefersReducedMotion();
    const els = [labelRef.current, headlineRef.current, subRef.current, ctaRef.current];

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(els, { opacity: 0, y: 40 });
      gsap.set(ghostRef.current, { opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(ghostRef.current, { opacity: 0.08, scale: 1, duration: 1.8, ease: "power2.out" })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=1.2")
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0b]"
    >
      <div className="absolute inset-0 z-0 bg-[#0a0a0b]" aria-hidden>
        <div className="hero-particle-placeholder absolute inset-0 opacity-40" />
      </div>

      {!isMobile && loadScene && (
        <ParticleScene
          mouseRef={mouseRef}
          onReady={() => setSceneReady(true)}
          className={`absolute inset-0 z-[1] transition-opacity duration-1000 ${
            sceneReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {isMobile && (
        <div className="absolute inset-0 z-0 hero-gradient-fallback" aria-hidden />
      )}

      <div
        ref={ghostRef}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center select-none"
        aria-hidden
      >
        <span className="text-[clamp(6rem,18vw,16rem)] font-bold lowercase tracking-tighter text-white/10">
          nexaforge
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between px-6 py-32 md:min-h-screen md:px-12">
        <div className="mt-auto max-w-3xl">
          <span
            ref={labelRef}
            className="mb-6 inline-block rounded border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/60"
          >
            AI-First Engineering
          </span>
          <h1
            ref={headlineRef}
            className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            One platform. Every stage automated. From legacy to governed production.
          </h1>
        </div>

        <div className="mt-12 flex flex-col gap-8 md:mt-0 md:flex-row md:items-end md:justify-between">
          <p
            ref={subRef}
            className="max-w-md text-base leading-relaxed text-white/50 md:text-lg"
          >
            Core modernization, connected data, &amp; AI in production.
            The full engineering stack for enterprise teams.
          </p>
          <div ref={ctaRef}>
            <MagneticButton href="/contact" variant="primary">
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
