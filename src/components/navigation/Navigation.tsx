"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, registerGSAP } from "@/lib/gsap";

const links = [
  { href: "/", label: "Home" },
  { href: "/#technology", label: "Technology" },
  { href: "/#services", label: "Services" },
  { href: "/#delivery", label: "Delivery" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
] as const;

function isLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    registerGSAP();
    const activeHref = links.find((link) => isLinkActive(pathname, link.href))?.href;
    if (!activeHref) {
      gsap.to(underlineRef.current, { width: 0, duration: 0.3 });
      return;
    }
    const activeLink = document.querySelector(`[data-nav="${activeHref}"]`) as HTMLElement;
    const underline = underlineRef.current;
    if (!activeLink || !underline) return;

    const rect = activeLink.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    if (!navRect) return;

    gsap.to(underline, {
      width: rect.width,
      x: rect.left - navRect.left,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-black/60 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
          data-cursor="link"
        >
          nexa<span className="text-accent">forge</span>
        </Link>

        <div className="relative hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-nav={link.href}
              data-cursor="link"
              className={`text-sm transition-colors ${
                isLinkActive(pathname, link.href)
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span
            ref={underlineRef}
            className="absolute -bottom-1 h-px bg-accent"
            style={{ width: 0, left: 0 }}
          />
        </div>

        <Link
          href="/contact"
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white hover:text-black md:hidden"
          data-cursor="link"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
