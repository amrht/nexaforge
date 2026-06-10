"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

const DOT_COUNT = 160;

function seededRandom(seed: number) {
  let a = (seed + 0x6d2b79f5) | 0;
  a = Math.imul(a ^ (a >>> 15), a | 1);
  a ^= a + Math.imul(a ^ (a >>> 7), a | 61);
  return ((a ^ (a >>> 14)) >>> 0) / 4294967296;
}

function roundCoord(n: number) {
  return Math.round(n * 1e4) / 1e4;
}

function buildDots() {
  const scattered: { x: number; y: number; r: number; opacity: number }[] = [];
  const leftGrid: { x: number; y: number }[] = [];
  const rightGrid: { x: number; y: number }[] = [];

  const leftOrigin = { x: 120, y: 80 };
  const rightOrigin = { x: 520, y: 80 };
  const cols = 8;
  const rows = 10;
  const gap = 22;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      leftGrid.push({
        x: leftOrigin.x + col * gap,
        y: leftOrigin.y + row * gap,
      });
      rightGrid.push({
        x: rightOrigin.x + col * gap,
        y: rightOrigin.y + row * gap,
      });
    }
  }

  for (let i = 0; i < DOT_COUNT; i++) {
    const isLeft = i < DOT_COUNT / 2;
    const grid = isLeft ? leftGrid[i % leftGrid.length] : rightGrid[i % rightGrid.length];
    scattered.push({
      x: roundCoord(40 + seededRandom(i * 3) * 720),
      y: roundCoord(40 + seededRandom(i * 3 + 1) * 280),
      r: roundCoord(1 + seededRandom(i * 3 + 2) * 2),
      opacity: roundCoord(0.2 + seededRandom(i * 5) * 0.6),
    });
    void grid;
  }

  return { scattered, leftGrid, rightGrid };
}

export default function DotsTransformVisual() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsData = useMemo(() => buildDots(), []);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const dots = svg.querySelectorAll(".transform-dot");
    const squares = svg.querySelectorAll(".align-square");
    const label = section.querySelector(".dots-label");

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        dots.forEach((dot, i) => {
          const isLeft = i < DOT_COUNT / 2;
          const grid = isLeft
            ? dotsData.leftGrid[i % dotsData.leftGrid.length]
            : dotsData.rightGrid[i % dotsData.rightGrid.length];
          gsap.set(dot, { attr: { cx: grid.x, cy: grid.y } });
        });
        gsap.set([...squares, label], { opacity: 1 });
        return;
      }

      gsap.set(squares, { opacity: 0 });
      gsap.set(label, { opacity: 0, y: 20 });

      dots.forEach((dot, i) => {
        const s = dotsData.scattered[i];
        gsap.set(dot, { attr: { cx: s.x, cy: s.y } });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      dots.forEach((dot, i) => {
        const isLeft = i < DOT_COUNT / 2;
        const grid = isLeft
          ? dotsData.leftGrid[i % dotsData.leftGrid.length]
          : dotsData.rightGrid[i % dotsData.rightGrid.length];
        const stagger = (i % 20) * 0.008;

        tl.to(
          dot,
          {
            attr: { cx: grid.x, cy: grid.y },
            duration: 1,
            ease: "power2.inOut",
          },
          stagger,
        );
      });

      tl.to(squares, { opacity: 0.35, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .to(label, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, [dotsData]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0b]"
      aria-label="Platform data alignment visualization"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_65%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-12">
        <p className="dots-label mb-8 max-w-lg text-sm text-white/50">
          Scattered signals across your estate align into governed, queryable structures —
          left and right data planes converging on a unified control surface.
        </p>

        <div className="relative rounded-2xl border border-white/8 bg-[#111113]/80 p-4 backdrop-blur-sm md:p-8">
          <svg
            ref={svgRef}
            viewBox="0 0 800 360"
            className="w-full"
            aria-hidden
          >
            <rect
              className="align-square"
              x="108"
              y="68"
              width="178"
              height="228"
              rx="4"
              fill="none"
              stroke="rgba(99,102,241,0.5)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <rect
              className="align-square"
              x="508"
              y="68"
              width="178"
              height="228"
              rx="4"
              fill="none"
              stroke="rgba(167,139,250,0.5)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {Array.from({ length: DOT_COUNT }).map((_, i) => {
              const s = dotsData.scattered[i];
              return (
                <circle
                  key={i}
                  className="transform-dot"
                  cx={s.x}
                  cy={s.y}
                  r={s.r}
                  fill="white"
                  opacity={s.opacity}
                />
              );
            })}

            <g opacity="0.6">
              <circle cx="400" cy="180" r={28} fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="400" y="185" textAnchor="middle" fill="#f5f5f5" fontSize="10" fontWeight="600">
                Core
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
