"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function FullPageLoader({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(text, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: "power2.out",
    }).to(text, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: "power2.in",
      delay: 0.5,
    });

    const timer = setTimeout(() => {
      tl.kill();
      onLoadingComplete();
    }, 2000);

    return () => {
      tl.kill();
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div
        ref={textRef}
        className="text-4xl font-bold text-primary opacity-0 transform translate-y-20"
      >
        Just Imagine It
      </div>
    </div>
  );
}
