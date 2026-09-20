"use client";

import { useEffect, useState } from "react";
import { navLinks, salon } from "@/lib/content";
import { openBooking } from "./booking-dialog";
import { ArrowRight } from "./icons";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`block ${className}`}>
      <span className="block font-display text-[1.6rem] leading-none tracking-[0.06em] text-chalk">
        {salon.name}
      </span>
      <span className="mt-1.5 block text-[0.5rem] font-medium tracking-[0.34em] text-dim uppercase">
        Beauty <span className="text-dim/50">|</span>{" "}
        <span className="text-gold">Home Salon</span>
      </span>
    </span>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Underlines the nav item for whichever section is currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || menuOpen
          ? "border-b border-hairline-dark bg-night/95 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[84rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <a href="#top" aria-label={`${salon.name} home`}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-1 text-[0.8125rem] transition-colors duration-300 ${
                  isActive ? "text-chalk" : "text-dim hover:text-chalk"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openBooking}
            className="btn hidden bg-gold text-night hover:bg-[#eccb94] sm:inline-flex"
          >
            Book Appointment
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-1 flex items-center gap-2.5 p-2 text-[0.6875rem] font-medium tracking-[0.18em] text-chalk uppercase xl:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-hairline-dark bg-night xl:hidden"
      >
        <nav aria-label="Primary, mobile" className="px-5 py-5 sm:px-8">
          <ul className="divide-y divide-hairline-dark">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 font-display text-[1.5rem] text-chalk"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openBooking();
            }}
            className="btn mt-6 w-full bg-gold text-night"
          >
            Book Appointment
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={salon.phoneHref}
            className="mt-4 block text-center text-sm text-dim"
          >
            {salon.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
