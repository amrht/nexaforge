import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scope GSAP + ScrollTrigger animations to a section; call ctx.revert() on cleanup. */
export function sectionContext(
  scope: Element | string,
  setup: () => void,
) {
  registerGSAP();
  const ctx = gsap.context(setup, scope);
  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
