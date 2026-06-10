"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

const painPoints = [
  {
    number: "01",
    title: "Legacy Debt",
    stat: "73%",
    statLabel: "of enterprises cite legacy as top blocker",
    description:
      "Monolithic systems block innovation. Every new feature risks cascading failures across decades-old COBOL, Java, and mainframe infrastructure that nobody wants to touch.",
    tags: ["Mainframe", "Technical Debt", "Risk"],
  },
  {
    number: "02",
    title: "Data Silos",
    stat: "70%",
    statLabel: "of time spent on data wrangling",
    description:
      "Critical insights trapped in disconnected ERPs, CRMs, and warehouse systems. Teams duplicate pipelines, fight schema drift, and still can't get a unified customer view.",
    tags: ["Fragmentation", "ETL", "Governance"],
  },
  {
    number: "03",
    title: "AI Gap",
    stat: "87%",
    statLabel: "of ML models never reach production",
    description:
      "Models stuck in Jupyter notebooks. No path from prototype to governed production without months of custom MLOps engineering and compliance review cycles.",
    tags: ["MLOps", "Governance", "Scale"],
  },
  {
    number: "04",
    title: "Talent Shortage",
    stat: "4.2M",
    statLabel: "unfilled tech roles globally",
    description:
      "Competition for senior engineers is fierce. Hiring cycles stretch 6+ months while transformation timelines compress. Knowledge walks out the door with every departure.",
    tags: ["Hiring", "Retention", "Velocity"],
  },
  {
    number: "05",
    title: "Compliance Drag",
    stat: "18mo",
    statLabel: "average audit remediation cycle",
    description:
      "SOC2, HIPAA, and EU AI Act requirements multiply with every new system. Manual evidence collection and policy enforcement slow every release to a crawl.",
    tags: ["Regulation", "Audit", "Policy"],
  },
  {
    number: "06",
    title: "Cloud Sprawl",
    stat: "35%",
    statLabel: "of cloud spend is wasted",
    description:
      "Multi-cloud strategies become multi-cloud mess. Orphaned resources, overlapping tools, and no single pane of glass for cost, security, or performance observability.",
    tags: ["FinOps", "Multi-Cloud", "Observability"],
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(track.querySelectorAll(".pain-card"), { opacity: 1, x: 0 });
        return;
      }

      const cards = track.querySelectorAll(".pain-card");
      const scrollWidth = track.scrollWidth - window.innerWidth + 48;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -scrollWidth, ease: "none" });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.4, scale: 0.92, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 85%",
              end: "left 40%",
              scrub: true,
            },
          },
        );
      });

      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative overflow-hidden bg-[#0a0a0b]"
      aria-label="Enterprise challenges"
    >
      <div ref={headerRef} className="px-6 pt-24 pb-12 md:px-12">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          The Challenge
        </span>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white md:text-5xl">
          Six barriers standing between you and AI-native operations
        </h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Enterprise transformation fails when these structural problems compound.
          Scroll to explore each barrier — and why traditional approaches fall short.
        </p>
      </div>

      <div ref={trackRef} className="flex gap-5 px-6 pb-24 md:gap-6 md:px-12">
        {painPoints.map((point) => (
          <article
            key={point.number}
            className="pain-card group flex w-[82vw] shrink-0 flex-col rounded-2xl border border-white/8 bg-surface-elevated p-8 transition-colors hover:border-accent/20 md:w-[400px] md:p-10"
            tabIndex={0}
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-accent/60">{point.number}</span>
              <div className="text-right">
                <span className="block text-2xl font-semibold text-white">{point.stat}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  {point.statLabel}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-12">
              <h3 className="mb-3 text-2xl font-semibold text-white">{point.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted">{point.description}</p>
              <div className="flex flex-wrap gap-2">
                {point.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted transition-colors group-hover:border-accent/30 group-hover:text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
