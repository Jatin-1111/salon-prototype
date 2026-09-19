import type { SVGProps } from "react";

/**
 * Thin line icons drawn to one grid: 24x24, 1.25 stroke, round caps. Inline
 * rather than an icon package so the set stays small and consistent.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Line({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Scissors(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="6" cy="18" r="2.6" />
      <circle cx="6" cy="6" r="2.6" />
      <path d="M8 16.5 19 5M8 7.5 19 19M11.5 12.5 8.4 15.6M12.5 11.5 8.4 8.4" />
    </Line>
  );
}

export function Star(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" />
    </Line>
  );
}

export function Diamond(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M7.5 3.5h9l4 5-8.5 12L3.5 8.5z" />
      <path d="M3.5 8.5h17M9 3.5l-1.5 5L12 20.5l4.5-12-1.5-5" />
    </Line>
  );
}

export function Heart(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 20.3S3.5 15.4 3.5 9.55A4.05 4.05 0 0 1 12 7.4a4.05 4.05 0 0 1 8.5 2.15c0 5.85-8.5 10.75-8.5 10.75z" />
    </Line>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Line>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </Line>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </Line>
  );
}

export function Phone(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M8.1 3.7 9.9 8 8.2 9.7a11.5 11.5 0 0 0 6.1 6.1l1.7-1.7 4.3 1.8v3.3a1.5 1.5 0 0 1-1.7 1.5C10.9 20 4 13.1 3.2 5.4A1.5 1.5 0 0 1 4.7 3.7z" />
    </Line>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M3.6 20.4l1.2-4.2a8 8 0 1 1 3 3z" />
      <path d="M9 9.3c0 3 2.2 5.2 5.2 5.2.5 0 .9-.4.9-.9v-.8l-1.7-.7-.8.9a5.6 5.6 0 0 1-2.1-2.1l.9-.8-.7-1.7h-.8c-.5 0-.9.4-.9.9z" />
    </Line>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </Line>
  );
}

export function Clock(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </Line>
  );
}

export function Instagram(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </Line>
  );
}

export function Facebook(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M14.8 8.2h2.2V4.9h-2.4c-2.2 0-3.6 1.4-3.6 3.7v1.9H8.6v3.3H11V21h3.3v-7.2h2.4l.4-3.3h-2.8V9.1c0-.6.2-.9.5-.9z" />
    </Line>
  );
}

export function YouTube(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="2.8" y="5.8" width="18.4" height="12.4" rx="3.6" />
      <path d="M10.4 9.6l4.6 2.4-4.6 2.4z" />
    </Line>
  );
}

export function Close(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Line>
  );
}

/** Solid, because a five-pointed outline reads as noise at this size. */
export function StarSolid(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.8l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3-1.09-6.35L.59 9.51l6.38-.93z" />
    </svg>
  );
}
