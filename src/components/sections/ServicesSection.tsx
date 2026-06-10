"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/lib/services-data";

const icons: Record<string, React.ReactNode> = {
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6l-1 1v3l-3-1-3 1v-3l-1-1c-1.5-1.5-3-3.5-3-6a7 7 0 0 1 7-7z" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="m12.83 2.18 8.75 4.52a1 1 0 0 1 0 1.76l-8.75 4.52a1 1 0 0 1-.91 0L3.18 8.46a1 1 0 0 1 0-1.76L12.83 2.18z" />
      <path d="m3.18 12.46 9.65 4.99a1 1 0 0 0 .91 0l9.65-4.99M3.18 16.46l9.65 4.99a1 1 0 0 0 .91 0l9.65-4.99" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll(".service-card");

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -8, duration: 0.4, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-[#0a0a0b] py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="rounded border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Our Capabilities
            </span>
            <h2 className="mt-6 max-w-xl text-3xl font-semibold text-white md:text-5xl">
              Six capabilities. One engineering standard.
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            From strategic consulting to production AI — every engagement follows
            the same rigorous engineering discipline.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-4 md:grid-cols-3 md:gap-5"
        >
          {services.map((service, i) => (
            <article
              key={service.id}
              className={`service-card group rounded-2xl border border-border p-8 transition-colors hover:border-accent/30 hover:bg-surface-elevated ${
                i === 0 || i === 5 ? "md:col-span-1" : ""
              } ${i === 1 ? "md:row-span-1" : ""}`}
              tabIndex={0}
            >
              <div className="mb-6 text-white/40 transition-colors group-hover:text-accent">
                {icons[service.icon]}
              </div>
              <span className="text-xs font-medium text-accent/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold uppercase tracking-wide text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
