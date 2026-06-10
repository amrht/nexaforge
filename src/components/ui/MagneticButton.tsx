"use client";

import { useRef, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    xTo.current = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      xTo.current?.(dx);
      yTo.current?.(dy);
    };

    const onLeave = () => {
      xTo.current?.(0);
      yTo.current?.(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300";
  const variants = {
    primary: "border border-white/30 bg-white/5 text-white hover:bg-white hover:text-black backdrop-blur-sm",
    outline: "border border-white/20 text-white hover:border-white/50",
    ghost: "text-white/70 hover:text-white",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} data-cursor="link">
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-50`}
      data-cursor="link"
    >
      {children}
    </button>
  );
}
