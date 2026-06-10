"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

function subscribeCoarse(cb: () => void) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getCoarseSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const isCoarse = useSyncExternalStore(subscribeCoarse, getCoarseSnapshot, () => false);

  useEffect(() => {
    if (prefersReducedMotion() || isCoarse) return;

    registerGSAP();
    const cursor = cursorRef.current;
    if (!cursor) return;

    xTo.current = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a, button, [data-cursor='link']");
      const canvas = target.closest("[data-cursor='canvas']");

      cursor.classList.remove("custom-cursor--link", "custom-cursor--canvas");
      if (canvas) cursor.classList.add("custom-cursor--canvas");
      else if (link) cursor.classList.add("custom-cursor--link");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isCoarse]);

  if (isCoarse) return null;

  return <div ref={cursorRef} className="custom-cursor hidden md:block" aria-hidden />;
}
