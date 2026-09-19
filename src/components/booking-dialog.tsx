"use client";

import { useEffect, useRef, useState } from "react";
import { salon, services, timeSlots } from "@/lib/content";
import { ArrowRight, Close, Phone, WhatsApp } from "./icons";

const OPEN_EVENT = "looks:book";

/** Any control anywhere on the page can ask for the dialog. */
export function openBooking() {
  document.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

type Fields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  slot: string;
  notes: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  slot: "",
  notes: "",
};

function toLocalDateInput(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseDateInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatLongDate(value: string) {
  const date = parseDateInput(value);
  if (!date) return value;
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function validate(fields: Fields): Errors {
  const errors: Errors = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Please tell us the name the appointment is for.";
  }

  // Indian mobile numbers are 10 digits; allow a country code in front.
  const digits = fields.phone.replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Please enter a 10 digit mobile number we can call you on.";
  }

  // Optional, but must be usable if it is filled in.
  if (
    fields.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())
  ) {
    errors.email = "That email address does not look right.";
  }

  if (!fields.service) errors.service = "Please choose a service.";

  if (!fields.date) {
    errors.date = "Please choose a date.";
  } else {
    const chosen = parseDateInput(fields.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!chosen) errors.date = "Please choose a valid date.";
    else if (chosen < today) errors.date = "Please choose today or a later date.";
  }

  if (!fields.slot) errors.slot = "Please choose roughly when suits you.";

  return errors;
}

const fieldClass =
  "w-full rounded-[2px] border border-hairline-dark bg-night px-4 py-3 text-[0.9375rem] text-chalk transition-colors duration-300 placeholder:text-dim/70 hover:border-dim/60 focus:border-gold focus:outline-none aria-[invalid=true]:border-[#e08b6f]";

const labelClass =
  "mb-2 block text-[0.6875rem] font-medium tracking-[0.18em] text-dim uppercase";

export default function BookingDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Fields | null>(null);

  useEffect(() => {
    const open = () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      dialog.showModal();
      // showModal makes the page inert but does not stop it scrolling.
      document.body.style.overflow = "hidden";
      if (dateRef.current) dateRef.current.min = toLocalDateInput(new Date());
    };
    document.addEventListener(OPEN_EVENT, open);
    return () => document.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
  }, [submitted]);

  function close() {
    dialogRef.current?.close();
  }

  function handleClose() {
    document.body.style.overflow = "";
    // Reset so the next visitor opens a clean form, not the last confirmation.
    setSubmitted(null);
    setFields(emptyFields);
    setErrors({});
  }

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => {
        dialogRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }

    // TODO: send the request on to the booking system or the salon inbox.
    // Nothing leaves the browser in this prototype.
    setSubmitted(fields);
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(event) => {
        // A click landing on the dialog itself is a click on the backdrop.
        if (event.target === dialogRef.current) close();
      }}
      aria-labelledby="booking-title"
      className="booking m-auto w-[min(46rem,calc(100vw-2rem))] rounded-[3px] border border-hairline-dark bg-charcoal p-0 text-chalk"
    >
      <div className="max-h-[min(44rem,calc(100dvh-3rem))] overflow-y-auto p-7 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-gold">Book an appointment</p>
            <h2
              id="booking-title"
              className="mt-3 font-display text-[1.75rem] leading-tight text-chalk sm:text-[2rem]"
            >
              {submitted ? "Request received" : "Tell us what you need"}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mt-1 -mr-1 shrink-0 p-2 text-dim transition-colors duration-300 hover:text-gold"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div
            ref={confirmationRef}
            tabIndex={-1}
            className="mt-6 focus:outline-none"
          >
            <p className="leading-relaxed text-dim">
              Thank you, {submitted.name.trim().split(" ")[0]}. This is a
              request, not a confirmed booking. We will call you on{" "}
              <span className="text-chalk">{submitted.phone}</span> to confirm
              your slot.
            </p>

            <dl className="mt-7 divide-y divide-hairline-dark border-y border-hairline-dark text-sm">
              {(
                [
                  ["Service", submitted.service],
                  ["Preferred date", formatLongDate(submitted.date)],
                  ["Preferred time", submitted.slot],
                  ...(submitted.email.trim()
                    ? [["Email", submitted.email.trim()]]
                    : []),
                  ...(submitted.notes.trim()
                    ? [["Notes", submitted.notes.trim()]]
                    : []),
                ] as [string, string][]
              ).map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr]">
                  <dt className="text-dim">{label}</dt>
                  <dd className="text-chalk">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={close}
                className="btn bg-gold text-night hover:bg-[#eccb94]"
              >
                Done
              </button>
              <a
                href={salon.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-hairline-dark text-chalk hover:border-gold hover:text-gold"
              >
                <WhatsApp className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="b-name">
                  Name
                </label>
                <input
                  id="b-name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "b-name-err" : undefined}
                  className={fieldClass}
                />
                <FieldError id="b-name-err" message={errors.name} />
              </div>

              <div>
                <label className={labelClass} htmlFor="b-phone">
                  Mobile number
                </label>
                <input
                  id="b-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "b-phone-err" : undefined}
                  className={fieldClass}
                />
                <FieldError id="b-phone-err" message={errors.phone} />
              </div>

              <div>
                <label className={labelClass} htmlFor="b-email">
                  Email
                  <span className="ml-2 tracking-normal normal-case">
                    (optional)
                  </span>
                </label>
                <input
                  id="b-email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "b-email-err" : undefined}
                  className={fieldClass}
                />
                <FieldError id="b-email-err" message={errors.email} />
              </div>

              <div>
                <label className={labelClass} htmlFor="b-service">
                  Service
                </label>
                <select
                  id="b-service"
                  value={fields.service}
                  onChange={(e) => update("service", e.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "b-service-err" : undefined}
                  className={fieldClass}
                >
                  <option value="">Please choose</option>
                  {services.map((service) => (
                    <option key={service.id}>{service.name}</option>
                  ))}
                  <option>Something else</option>
                </select>
                <FieldError id="b-service-err" message={errors.service} />
              </div>

              <div>
                <label className={labelClass} htmlFor="b-date">
                  Preferred date
                </label>
                <input
                  id="b-date"
                  ref={dateRef}
                  type="date"
                  value={fields.date}
                  onChange={(e) => update("date", e.target.value)}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "b-date-err" : undefined}
                  className={fieldClass}
                />
                <FieldError id="b-date-err" message={errors.date} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="b-slot">
                  Preferred time
                </label>
                <select
                  id="b-slot"
                  value={fields.slot}
                  onChange={(e) => update("slot", e.target.value)}
                  aria-invalid={Boolean(errors.slot)}
                  aria-describedby={errors.slot ? "b-slot-err" : undefined}
                  className={fieldClass}
                >
                  <option value="">Please choose</option>
                  {timeSlots.map((slot) => (
                    <option key={slot}>{slot}</option>
                  ))}
                </select>
                <FieldError id="b-slot-err" message={errors.slot} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="b-notes">
                  Anything we should know
                  <span className="ml-2 tracking-normal normal-case">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="b-notes"
                  rows={3}
                  value={fields.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Previous colour, a stylist you usually see, or a look you have in mind."
                  className={`${fieldClass} resize-y`}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5 border-t border-hairline-dark pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.8125rem] leading-relaxed text-dim">
                Prefer to talk?{" "}
                <a
                  href={salon.phoneHref}
                  className="text-chalk underline underline-offset-4 transition-colors duration-300 hover:text-gold"
                >
                  <Phone className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />
                  {salon.phone}
                </a>
              </p>
              <button
                type="submit"
                className="btn bg-gold text-night hover:bg-[#eccb94]"
              >
                Request appointment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.8125rem] text-[#e08b6f]">
      {message}
    </p>
  );
}
