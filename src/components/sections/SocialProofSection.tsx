"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

const logos = [
  "Meridian Financial",
  "Atlas Health",
  "Vertex Logistics",
  "Nova Energy",
  "Quantum Retail",
  "Pinnacle Insurance",
  "Helix Pharma",
  "Crest Manufacturing",
];

const testimonials = [
  {
    quote:
      "NexaForge reduced our ML deployment cycle from 6 months to 3 weeks. The governed pipeline gave our compliance team full confidence.",
    author: "Sarah Okonkwo",
    role: "CTO, Meridian Financial",
  },
  {
    quote:
      "Their data mesh architecture unlocked insights we'd been chasing for years. 40% reduction in time-to-insight across all business units.",
    author: "James Whitfield",
    role: "VP Engineering, Atlas Health",
  },
  {
    quote:
      "The team embedded seamlessly with ours. They didn't just deliver a platform — they elevated our entire engineering culture.",
    author: "Yuki Tanaka",
    role: "Director of Platform, Vertex Logistics",
  },
];

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !cardsEl) return;

    const ctx = gsap.context(() => {
      const cards = cardsEl.querySelectorAll(".testimonial-card");
      if (!cards.length || prefersReducedMotion()) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsEl,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-surface py-32">
      <div className="mb-16 px-6 text-center md:px-12">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Trusted By
        </span>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
          Enterprise teams worldwide
        </h2>
      </div>

      <div className="relative mb-24 overflow-hidden border-y border-border py-8" aria-hidden>
        <div className="marquee-track flex w-max gap-16">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="shrink-0 text-lg font-medium tracking-wide text-white/20"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={cardsRef}
        className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3 md:px-12"
      >
        {testimonials.map((t) => (
          <blockquote
            key={t.author}
            className="testimonial-card rounded-2xl border border-border bg-background p-8"
            tabIndex={0}
          >
            <p className="mb-6 leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
            <footer>
              <cite className="not-italic">
                <span className="block text-sm font-medium text-white">{t.author}</span>
                <span className="text-xs text-muted">{t.role}</span>
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
