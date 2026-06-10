"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

const pillars = [
  {
    id: "standards",
    label: "Open Standards",
    title: "Industry-proven protocols turned into production infrastructure",
    description:
      "All our platform integrations are built on open standards — Kubernetes, OpenTelemetry, CloudEvents, and CNCF-graduated projects. Responsibly sourced to protect your vendor independence, support your engineering teams, and uphold the highest interoperability benchmarks.",
    stat: "0",
    statSuffix: " vendor lock-in",
    image: "standards",
  },
  {
    id: "efficiency",
    label: "Operational Efficiency",
    title: "A reduced engineering carbon footprint",
    description:
      "Our platform operates with high automation efficiency, keeping your operational overhead low while avoiding any persistent technical debt. Automated testing, policy enforcement, and infrastructure-as-code mean your team ships features — not firefights.",
    stat: "40%",
    statSuffix: " lower TCO",
    image: "efficiency",
  },
  {
    id: "knowledge",
    label: "Knowledge Circularity",
    title: "Reusable patterns to end engineering waste",
    description:
      "Unlike 60% of enterprise codebases, which accumulate dead features, deprecated services, and undocumented workarounds, NexaForge packages encode institutional knowledge into reusable modules. That means your engineering patterns can be recycled easily, every time, across every team.",
    stat: "3x",
    statSuffix: " faster onboarding",
    image: "knowledge",
  },
];

const impactStats = [
  { value: "40%", label: "lower operational carbon footprint" },
  { value: "2T", label: "fewer failed deployments annually" },
  { value: "12wk", label: "average time to production AI" },
];

export default function PlatformPillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const blocks = section.querySelectorAll(".pillar-block");

      blocks.forEach((block) => {
        const content = block.querySelector(".pillar-content");
        const visual = block.querySelector(".pillar-visual");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(content?.children || [], {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
        }).from(
          visual,
          { opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        );
      });

      if (impactRef.current) {
        gsap.from(impactRef.current.children, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: impactRef.current,
            start: "top 85%",
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
      id="impact"
      className="bg-[#0a0a0b] text-white"
      aria-label="Platform impact and sustainability"
    >
      {/* Impact headline — nfinite "Our Impact" style */}
      <div
        ref={impactRef}
        className="border-b border-border px-6 py-24 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Our Impact
          </span>
          <h2 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            {impactStats.map((s, i) => (
              <span key={s.label}>
                {i > 0 && " · "}
                <span className="text-accent">{s.value}</span> {s.label}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Pillar blocks */}
      {pillars.map((pillar, i) => (
        <div
          key={pillar.id}
          className={`pillar-block border-b border-border ${
            i % 2 === 0 ? "bg-[#0a0a0b]" : "bg-surface"
          }`}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:px-12 lg:grid-cols-2 lg:gap-20">
            <div
              className={`pillar-content ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {pillar.label}
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">
                {pillar.title}
              </h3>
              <p className="mt-6 leading-relaxed text-muted">{pillar.description}</p>
              <div className="mt-8 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-accent">{pillar.stat}</span>
                <span className="text-lg text-muted">{pillar.statSuffix}</span>
              </div>
            </div>

            <div
              className={`pillar-visual relative ${i % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-elevated">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(99,102,241,0.15),transparent_60%)]" />

                {pillar.image === "standards" && (
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="grid grid-cols-3 gap-4">
                      {["K8s", "OTel", "CNCF", "gRPC", "S3", "SQL"].map((tech) => (
                        <div
                          key={tech}
                          className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-background text-xs font-medium text-muted"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pillar.image === "efficiency" && (
                  <div className="flex h-full flex-col justify-center p-8">
                    <div className="space-y-3">
                      {[85, 62, 40, 28].map((w, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div
                            className="h-2 rounded-full bg-accent/80"
                            style={{ width: `${w}%` }}
                          />
                          <span className="text-[10px] text-muted">{w}%</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-center text-xs text-muted">
                      Automation coverage over 12 months
                    </p>
                  </div>
                )}

                {pillar.image === "knowledge" && (
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="relative">
                      {[0, 1, 2, 3].map((ring) => (
                        <div
                          key={ring}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20"
                          style={{
                            width: 60 + ring * 50,
                            height: 60 + ring * 50,
                            opacity: 1 - ring * 0.2,
                          }}
                        />
                      ))}
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xs font-semibold">
                        DNA
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manufacturing plant equivalent */}
      <div className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-surface-elevated p-8 md:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold md:text-3xl">
                Our Platform Engineering Hub, scaling governed AI across continents
              </h3>
              <p className="mt-4 leading-relaxed text-muted">
                From Waterloo to Singapore, our distributed engineering hubs deploy
                NexaForge instances with the same rigor as our headquarters —
                ensuring every client gets production-grade infrastructure, not a
                proof of concept that never ships.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { city: "Waterloo", role: "R&D HQ" },
                { city: "London", role: "EMEA Hub" },
                { city: "Singapore", role: "APAC Hub" },
                { city: "Austin", role: "Americas Hub" },
              ].map((hub) => (
                <div
                  key={hub.city}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <p className="font-medium text-white">{hub.city}</p>
                  <p className="text-xs text-muted">{hub.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
