"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reviews, unsplash } from "@/lib/content";
import { ChevronLeft, ChevronRight, StarSolid } from "./icons";

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // A native scroller rather than a transform, so it stays swipeable and
  // keyboard-scrollable, and the arrows are only a convenience on top.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft >= max - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.clientWidth + 24 : track.clientWidth;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors duration-300 hover:border-gold-head hover:text-gold-head disabled:opacity-35 disabled:hover:border-hairline disabled:hover:text-ink";

  return (
    <>
      <div className="flex justify-center gap-3 sm:justify-end">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous reviews"
          className={arrow}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next reviews"
          className={arrow}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Client reviews"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:col-span-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <li
            key={review.name}
            className="w-[min(22rem,82vw)] shrink-0 snap-start border border-hairline bg-card p-6 sm:w-[21rem] lg:w-[calc((100%-3rem)/3)]"
          >
            <div className="flex gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-hairline">
                <Image
                  src={unsplash(review.image)}
                  alt={review.alt}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <p className="text-[0.875rem] leading-relaxed text-muted">
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>
            <p className="mt-5 pl-16 text-[0.875rem] font-medium text-ink">
              {review.name}
            </p>
            <p
              className="mt-1.5 flex gap-0.5 pl-16 text-gold-head"
              aria-label="Rated 5 out of 5"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <StarSolid key={i} className="h-3 w-3" />
              ))}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
