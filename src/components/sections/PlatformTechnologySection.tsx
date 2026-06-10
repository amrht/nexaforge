"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";
import LayerStackVisual from "./technology/LayerStackVisual";
import StreamDiagram from "./technology/StreamDiagram";
import DotsTransformVisual from "./technology/DotsTransformVisual";

const platformLayers = [
  {
    id: "data",
    label: "Data Fabric",
    title: "Streaming ingestion on high-performance pipelines",
    description:
      "A highly engineered data layer designed to run on real-time event streams at enterprise scale. Schema registry, CDC connectors, and federated query engines — all water-thin abstractions that dissolve into your existing warehouse when you need them.",
    detail: "Kafka · Flink · dbt · Iceberg",
  },
  {
    id: "ai",
    label: "AI Orchestration",
    title: "Model lifecycle management with built-in governance",
    description:
      "We use composable MLOps primitives to train, validate, and deploy models. Feature stores, experiment tracking, and A/B routing are ultra-thin, invisible layers that keep your AI fully auditable and production-ready.",
    detail: "MLflow · Feast · Ray · Triton",
  },
  {
    id: "governance",
    label: "Governance Mesh",
    title: "Policy-as-code barrier for every deployment",
    description:
      "An ultra-high integrity control plane created through continuous policy evaluation. OPA, Cedar, and custom rule engines react in sequence, forming hundreds of guardrail checks only a few lines thick — invisible protection without changing developer velocity.",
    detail: "OPA · Cedar · Sigstore · Vault",
  },
];

const performanceMetrics = [
  {
    value: "<50ms",
    label: "P99 inference latency",
    description: "Edge-optimized model serving with autoscaling",
  },
  {
    value: "99.99%",
    label: "Platform uptime SLA",
    description: "Multi-region active-active architecture",
  },
  {
    value: "200+",
    label: "Pre-built integrations",
    description: "Drop-in connectors for enterprise systems",
  },
];

const barrierCards = [
  { title: "Latency", spec: "<50ms P99", desc: "Real-time inference at scale" },
  { title: "Throughput", spec: "1M+ events/sec", desc: "Stream processing capacity" },
  { title: "Compliance", spec: "SOC2 · HIPAA · EU AI Act", desc: "Built-in regulatory frameworks" },
  { title: "Data Residency", spec: "12 global regions", desc: "Sovereign cloud deployments" },
  { title: "Model Registry", spec: "Full lineage tracking", desc: "From training data to inference" },
  { title: "Observability", spec: "OpenTelemetry native", desc: "End-to-end distributed tracing" },
  { title: "Deployment", spec: "GitOps + Canary", desc: "Zero-downtime progressive rollouts" },
  { title: "Cost Efficiency", spec: "40% lower TCO", desc: "vs. fragmented tooling stacks" },
  { title: "Recovery", spec: "<15min RTO", desc: "Automated disaster recovery" },
];

export default function PlatformTechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const header = section.querySelector(".tech-header");
      if (header) {
        gsap.from(header.children, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    registerGSAP();
    const cardsEl = cardsRef.current;
    if (!cardsEl) return;

    const ctx = gsap.context(() => {
      const cards = cardsEl.querySelectorAll(".barrier-card");
      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 30,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsEl,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, cardsEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative bg-[#0a0a0b] text-white"
      aria-label="Platform technology"
    >
      <div className="tech-header mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Our Platform Technology
        </span>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          A fully governed ultra high-performance stack for the enterprise AI industry.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          NexaForge replaces fragmented tooling with a unified engineering platform —
          designed to run on your existing infrastructure with no compromise on speed,
          maintaining governance performance post-deployment.
        </p>
      </div>

      <DotsTransformVisual />

      <div className="border-t border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="border-b border-border px-6 py-16 md:px-12 lg:border-b-0 lg:border-r">
            <LayerStackVisual />

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {platformLayers.map((layer, i) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(i)}
                  className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                    activeLayer === i
                      ? "bg-accent text-white"
                      : "border border-border text-muted hover:border-white/20 hover:text-white"
                  }`}
                  aria-pressed={activeLayer === i}
                >
                  {layer.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-16 md:px-12">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-muted">
              Composable layers on a unified control plane
            </p>

            <div className="layer-block min-h-[280px]">
              <h3
                key={platformLayers[activeLayer].id + "-title"}
                className="mt-6 text-2xl font-semibold md:text-3xl"
              >
                {platformLayers[activeLayer].title}
              </h3>
              <p
                key={platformLayers[activeLayer].id + "-desc"}
                className="mt-4 leading-relaxed text-muted"
              >
                {platformLayers[activeLayer].description}
              </p>
              <span className="mt-6 inline-block rounded border border-border px-3 py-1.5 text-xs font-medium text-muted">
                {platformLayers[activeLayer].detail}
              </span>
            </div>

            <ul className="mt-12 space-y-4 border-t border-border pt-8">
              {platformLayers.map((layer, i) => (
                <li key={layer.id}>
                  <button
                    onClick={() => setActiveLayer(i)}
                    className={`flex w-full items-center gap-3 text-left text-sm transition-colors ${
                      activeLayer === i ? "text-white" : "text-muted hover:text-white/70"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        activeLayer === i ? "bg-accent" : "bg-white/20"
                      }`}
                    />
                    {layer.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold md:text-4xl">
                Hundreds of microservices
                <span className="block text-muted">by Event-Driven Architecture</span>
              </h3>
              <h4 className="mt-8 text-sm font-medium uppercase tracking-[0.15em] text-muted">
                Orchestration Science in Two Streams
              </h4>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">
                    Event Ingest Stream
                  </span>
                  <p className="mt-2 text-sm text-muted">
                    Real-time data from every source — CDC, webhooks, IoT, and batch — normalized into a single event bus.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#a78bfa]">
                    Policy Reactant Stream
                  </span>
                  <p className="mt-2 text-sm text-muted">
                    Governance rules evaluate in sequence against every event, forming guardrail layers only atoms thick.
                  </p>
                </div>
              </div>

              <p className="mt-8 leading-relaxed text-muted">
                Our ultra-high performance orchestration is created through a unique
                event-driven process using two composable streams: an ingest source and a
                policy reactant, separated by the orchestration mesh. These streams react
                in sequence, forming hundreds of service layers only a few milliseconds
                apart. The result is an invisible platform that gives enterprises the same
                protective performance as bespoke engineering, without changing developer
                experience.
              </p>
            </div>

            <StreamDiagram />
          </div>

          <div className="mt-20 grid gap-8 border-t border-border pt-16 md:grid-cols-3">
            {performanceMetrics.map((metric) => (
              <div key={metric.label}>
                <span className="text-4xl font-semibold md:text-5xl">{metric.value}</span>
                <p className="mt-2 font-medium">{metric.label}</p>
                <p className="mt-1 text-sm text-muted">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12">
          <h3 className="text-2xl font-semibold md:text-3xl">Platform Performance</h3>
          <p className="mt-3 max-w-xl text-muted">
            Every metric benchmarked against enterprise requirements — not startup demos.
          </p>

          <div ref={cardsRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {barrierCards.map((card) => (
              <article
                key={card.title}
                className="barrier-card group rounded-xl border border-border bg-surface-elevated p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  {card.title}
                </span>
                <p className="mt-3 text-xl font-semibold text-white">{card.spec}</p>
                <p className="mt-2 text-sm text-muted">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
