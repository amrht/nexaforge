"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const deliveryItems = [
  {
    number: "01",
    title: "Consulting & Engineering",
    description:
      "Embedded teams that understand your domain. We don't just advise — we ship production code alongside your engineers.",
  },
  {
    number: "02",
    title: "AI Platform",
    description:
      "Governed ML pipelines from training to inference. Model registry, feature stores, and automated compliance checks built in.",
  },
  {
    number: "03",
    title: "Data Architecture",
    description:
      "Real-time data mesh with federated governance. Connect every source without sacrificing security or performance.",
  },
  {
    number: "04",
    title: "Production Operations",
    description:
      "24/7 SRE, observability, and incident response. Your systems stay healthy long after launch day.",
  },
  {
    number: "05",
    title: "Security & Compliance",
    description:
      "Policy-as-code, continuous audit trails, and regulatory frameworks embedded from day one — SOC2, HIPAA, and EU AI Act ready.",
  },
];

export default function DeliverySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const dots = dotsRef.current;
    if (!section || !dots) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const dotEls = dots.querySelectorAll(".delivery-dot");
      dotEls.forEach((dot, i) => {
        gsap.to(dot, {
          attr: { cy: `+=${(i % 3) * 4 - 4}` },
          duration: 2 + (i % 5) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.05,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="delivery" className="relative bg-[#0a0a0b]">
      <div className="mx-auto flex max-w-7xl">
        <div className="relative hidden w-1/2 md:block">
          <div className="sticky top-0 flex h-screen flex-col justify-between p-12 lg:p-16">
            <svg
              ref={dotsRef}
              className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
              aria-hidden
            >
              {Array.from({ length: 60 }).map((_, i) => (
                <circle
                  key={i}
                  className="delivery-dot"
                  cx={`${(i * 37) % 100}%`}
                  cy={`${(i * 53) % 100}%`}
                  r={(i % 5) * 0.3 + 0.8}
                  fill="white"
                  opacity={(i % 7) * 0.06 + 0.12}
                />
              ))}
            </svg>

            <div className="relative">
              <span className="rounded border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                How We Deliver
              </span>
            </div>

            <div className="relative">
              <h2 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
                Five ways to work with NexaForge. One standard of delivery.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted">
                Whether you need a full transformation or targeted expertise,
                every engagement follows the same engineering rigor.
              </p>
              <div className="mt-8">
                <MagneticButton href="/contact" variant="outline">
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </MagneticButton>
              </div>
            </div>

            <div className="relative h-8" />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="border-b border-border px-8 py-12 md:hidden">
            <span className="rounded border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              How We Deliver
            </span>
            <h2 className="mt-6 text-3xl font-semibold text-white">
              Five ways to work with NexaForge.
            </h2>
          </div>

          {deliveryItems.map((item) => (
            <div
              key={item.number}
              className="flex min-h-[60vh] flex-col justify-center border-b border-border bg-surface px-8 py-16 md:min-h-[70vh] md:px-12 lg:px-16"
            >
              <span className="text-sm font-medium text-accent/60">{item.number}</span>
              <h3 className="mt-4 text-2xl font-semibold uppercase tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
