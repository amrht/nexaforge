"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, registerGSAP, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    registerGSAP();
    const curtain = curtainRef.current;
    if (!curtain) return;

    if (prefersReducedMotion()) {
      gsap.set(curtain, { scaleY: 0 });
      return;
    }

    if (isFirst.current) {
      isFirst.current = false;
      gsap.set(curtain, { scaleY: 0 });
      return;
    }

    ScrollTrigger.getAll().forEach((st) => st.kill());

    const tl = gsap.timeline();
    tl.set(curtain, { scaleY: 0, transformOrigin: "bottom" })
      .to(curtain, { scaleY: 1, duration: 0.35, ease: "power4.inOut" })
      .set(curtain, { transformOrigin: "top" })
      .to(curtain, { scaleY: 0, duration: 0.35, ease: "power4.inOut" });
  }, [pathname]);

  return (
    <>
      <div ref={curtainRef} className="page-curtain" aria-hidden />
      {children}
    </>
  );
}
