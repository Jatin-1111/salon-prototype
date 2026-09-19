"use client";

import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element on the page once as it scrolls into
 * view. Mounted once, so sections stay server-rendered and no wrapper markup
 * is added around them.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    const aboveTheFold: HTMLElement[] = [];
    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        aboveTheFold.push(el);
      } else {
        observer.observe(el);
      }
    }

    // Anything already on screen animates in on load. Waiting two frames lets
    // the hidden state paint first so the transition actually runs.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        aboveTheFold.forEach((el) => el.classList.add("is-revealed"));
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      observer.disconnect();
    };
  }, []);

  return null;
}
