"use client";

import { openBooking } from "./booking-dialog";

/**
 * Every "book" control on the page is one of these, so the whole page can stay
 * a server component apart from the button itself.
 */
export default function BookButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openBooking} className={className}>
      {children}
    </button>
  );
}
