"use client";

import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

export default function LazySection({
  children,
  rootMargin = "300px",
  minHeight,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={minHeight ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
}
