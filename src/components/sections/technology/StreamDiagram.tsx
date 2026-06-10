"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function StreamDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll(".stream-path");
      const particles = svg.querySelectorAll(".stream-particle");
      const nodes = svg.querySelectorAll(".stream-node");

      if (prefersReducedMotion()) {
        paths.forEach((p) => {
          (p as SVGPathElement).style.strokeDashoffset = "0";
        });
        gsap.set([...particles, ...nodes], { opacity: 1 });
        return;
      }

      paths.forEach((path) => {
        const el = path as SVGPathElement;
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
        },
      });

      paths.forEach((path, i) => {
        tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "none" }, i * 0.2);
      });

      gsap.from(nodes, {
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      particles.forEach((particle, i) => {
        gsap.to(particle, {
          x: 560,
          y: i < 3 ? (i % 2 === 0 ? -20 : 20) : (i % 2 === 0 ? 20 : -20),
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-border bg-background p-6 md:p-10"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 700 320"
        className="w-full"
        aria-label="Event-driven architecture diagram showing event ingest and policy orchestration streams"
        role="img"
      >
        <defs>
          <linearGradient id="streamGradA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="streamGradB" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        <path
          className="stream-path"
          d="M 150 100 Q 250 80 340 160 T 550 140"
          fill="none"
          stroke="url(#streamGradA)"
          strokeWidth="2"
        />
        <path
          className="stream-path"
          d="M 150 220 Q 250 240 340 160 T 550 180"
          fill="none"
          stroke="url(#streamGradB)"
          strokeWidth="2"
        />

        <circle className="stream-particle" cx="180" cy="100" r="4" fill="#6366f1" />
        <circle className="stream-particle" cx="220" cy="95" r="3" fill="#6366f1" opacity="0.7" />
        <circle className="stream-particle" cx="260" cy="105" r="3" fill="#6366f1" opacity="0.5" />
        <circle className="stream-particle" cx="180" cy="220" r="4" fill="#7c3aed" />
        <circle className="stream-particle" cx="220" cy="225" r="3" fill="#7c3aed" opacity="0.7" />
        <circle className="stream-particle" cx="260" cy="215" r="3" fill="#7c3aed" opacity="0.5" />

        <g className="stream-node">
          <rect x="40" y="70" width="110" height="60" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
          <text x="95" y="95" textAnchor="middle" fill="#f5f5f5" fontSize="11" fontWeight="600">
            Event Ingest
          </text>
          <text x="95" y="115" textAnchor="middle" fill="#a1a1aa" fontSize="9">
            Kafka · Kinesis
          </text>
        </g>

        <g className="stream-node">
          <rect x="40" y="190" width="110" height="60" rx="8" fill="#18181b" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="95" y="215" textAnchor="middle" fill="#f5f5f5" fontSize="11" fontWeight="600">
            Policy Engine
          </text>
          <text x="95" y="235" textAnchor="middle" fill="#a1a1aa" fontSize="9">
            OPA · Cedar
          </text>
        </g>

        <g className="stream-node">
          <rect x="285" y="130" width="110" height="60" rx="8" fill="#18181b" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="340" y="155" textAnchor="middle" fill="#f5f5f5" fontSize="11" fontWeight="600">
            Orchestrator
          </text>
          <text x="340" y="175" textAnchor="middle" fill="#a1a1aa" fontSize="9">
            200+ services
          </text>
        </g>

        <g className="stream-node">
          <rect x="530" y="120" width="130" height="80" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="2" />
          <text x="595" y="155" textAnchor="middle" fill="#f5f5f5" fontSize="11" fontWeight="600">
            Production
          </text>
          <text x="595" y="175" textAnchor="middle" fill="#a1a1aa" fontSize="9">
            Governed Output
          </text>
        </g>
      </svg>
    </div>
  );
}
