"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

const nodes = [
  { cx: 100, cy: 200, label: "Assess", sub: "Legacy Audit" },
  { cx: 275, cy: 200, label: "Modernize", sub: "Cloud Migration" },
  { cx: 450, cy: 200, label: "Connect", sub: "Data Mesh" },
  { cx: 625, cy: 200, label: "Deploy", sub: "AI Production" },
];

const connectorPaths = [
  "M 128 200 L 247 200",
  "M 303 200 L 422 200",
  "M 478 200 L 597 200",
];

const feedbackPath = "M 275 172 Q 275 90 450 90 Q 625 90 625 172";

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const svg = svgRef.current;
    const diagram = diagramRef.current;
    if (!section || !svg || !diagram) return;

    const paths = svg.querySelectorAll(".solution-path");
    const nodeEls = svg.querySelectorAll(".solution-node");
    const labelEls = svg.querySelectorAll(".solution-label");

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        paths.forEach((p) => {
          (p as SVGPathElement).style.strokeDashoffset = "0";
        });
        gsap.set([...nodeEls, ...labelEls], { opacity: 1, scale: 1 });
        return;
      }

      paths.forEach((path) => {
        const el = path as SVGPathElement;
        const length = el.getTotalLength();
        el.style.strokeDasharray = `${length}`;
        el.style.strokeDashoffset = `${length}`;
      });

      gsap.set(nodeEls, { opacity: 0, scale: 0, transformOrigin: "center center" });
      gsap.set(labelEls, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      tl.to(nodeEls[0], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" })
        .to(labelEls[0], { opacity: 1, y: 0, duration: 0.3 }, "<0.1")
        .to(labelEls[1], { opacity: 1, y: 0, duration: 0.3 }, "<")
        .to(paths[0], { strokeDashoffset: 0, duration: 0.8, ease: "none" })
        .to(nodeEls[1], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" })
        .to(labelEls[2], { opacity: 1, y: 0, duration: 0.3 }, "<0.1")
        .to(labelEls[3], { opacity: 1, y: 0, duration: 0.3 }, "<")
        .to(paths[1], { strokeDashoffset: 0, duration: 0.8, ease: "none" })
        .to(nodeEls[2], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" })
        .to(labelEls[4], { opacity: 1, y: 0, duration: 0.3 }, "<0.1")
        .to(labelEls[5], { opacity: 1, y: 0, duration: 0.3 }, "<")
        .to(paths[2], { strokeDashoffset: 0, duration: 0.8, ease: "none" })
        .to(nodeEls[3], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" })
        .to(labelEls[6], { opacity: 1, y: 0, duration: 0.3 }, "<0.1")
        .to(labelEls[7], { opacity: 1, y: 0, duration: 0.3 }, "<")
        .to(paths[3], { strokeDashoffset: 0, duration: 1, ease: "none" }, "-=0.2");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="relative bg-surface"
      aria-label="Our solution"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              The Solution
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
              One unified platform for the entire engineering lifecycle
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            NexaForge connects legacy modernization, data infrastructure, and AI
            production into a single governed pipeline — from assessment to deployment.
          </p>
        </div>

        <div
          ref={diagramRef}
          className="rounded-2xl border border-border bg-background p-6 md:p-12"
        >
          <svg
            ref={svgRef}
            viewBox="0 0 800 400"
            className="w-full"
            aria-label="Solution architecture diagram"
            role="img"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {connectorPaths.map((d, i) => (
              <path
                key={`connector-${i}`}
                className="solution-path"
                d={d}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
              />
            ))}
            <path
              className="solution-path"
              d={feedbackPath}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.45"
            />

            {nodes.map((node) => (
              <g key={node.label}>
                <circle
                  className="solution-node"
                  cx={node.cx}
                  cy={node.cy}
                  r="28"
                  fill="#18181b"
                  stroke="#6366f1"
                  strokeWidth="2"
                  filter="url(#nodeGlow)"
                />
                <text
                  className="solution-label"
                  x={node.cx}
                  y={node.cy + 50}
                  textAnchor="middle"
                  fill="#f5f5f5"
                  fontSize="14"
                  fontWeight="600"
                >
                  {node.label}
                </text>
                <text
                  className="solution-label"
                  x={node.cx}
                  y={node.cy + 68}
                  textAnchor="middle"
                  fill="#a1a1aa"
                  fontSize="11"
                >
                  {node.sub}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
