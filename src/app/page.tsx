import Image from "next/image";
import BookButton from "@/components/book-button";
import BookingDialog from "@/components/booking-dialog";
import ReviewsCarousel from "@/components/reviews-carousel";
import ScrollReveal from "@/components/scroll-reveal";
import SiteHeader, { Wordmark } from "@/components/site-header";
import {
  ArrowRight,
  Clock,
  Diamond,
  Facebook,
  Heart,
  Instagram,
  MapPin,
  Phone,
  Scissors,
  Star,
  WhatsApp,
  YouTube,
} from "@/components/icons";
import {
  experienceSteps,
  gallery,
  heroFeatures,
  salon,
  services,
  unsplash,
} from "@/lib/content";

/**
 * Staggers a reveal. The class names are spelled out in full because Tailwind
 * only picks up literal strings when it scans the source.
 */
const delayClasses = [
  "[--reveal-delay:0ms]",
  "[--reveal-delay:80ms]",
  "[--reveal-delay:160ms]",
  "[--reveal-delay:240ms]",
  "[--reveal-delay:320ms]",
];
const delay = (step: number) =>
  delayClasses[Math.min(step, delayClasses.length - 1)];

const container = "mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-10";

const featureIcons = {
  scissors: Scissors,
  star: Star,
  diamond: Diamond,
  heart: Heart,
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:text-night"
      >
        Skip to content
      </a>

      <SiteHeader />
      <ScrollReveal />
      <BookingDialog />

      <main id="main">
        <Hero />
        <Services />
        <Experience />
        <Gallery />
        <Reviews />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-night">
      {/* The photograph sits to the right on desktop and behind everything on
          mobile, where the flat wash below carries the contrast instead. */}
      <div className="absolute inset-0 lg:left-[42%]">
        <Image
          src={unsplash("photo-1560869713-7d0a29430803")}
          alt="A stylist curling a client's long hair at the salon chair"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-night/75 lg:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/20 lg:via-night/95 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent"
      />

      <div
        className={`relative ${container} flex min-h-[44rem] flex-col justify-center pt-32 pb-14 lg:min-h-[46rem] lg:pt-36`}
      >
        <div className="max-w-xl">
          <p data-reveal className={`eyebrow text-dim ${delay(0)}`}>
            Premium Hair Salon in {salon.location}
          </p>

          <h1
            data-reveal
            className={`mt-7 text-[2.5rem] leading-[1.12] font-bold text-chalk uppercase sm:text-[3.25rem] lg:text-[3.75rem] ${delay(1)}`}
          >
            Your Hair.
            <br />
            Your Style.
            <br />
            <span className="text-gold">Our Expertise.</span>
          </h1>

          <p
            data-reveal
            className={`mt-7 max-w-md text-[1.0625rem] leading-relaxed text-dim ${delay(2)}`}
          >
            From everyday styling to complete transformations, our expert
            stylists create looks made for you.
          </p>

          <div
            data-reveal
            className={`mt-9 flex flex-col gap-3 sm:flex-row ${delay(3)}`}
          >
            <BookButton className="btn bg-gold text-night hover:bg-[#eccb94]">
              Book Your Appointment
              <ArrowRight className="h-4 w-4" />
            </BookButton>
            <a
              href="#services"
              className="btn border border-chalk/30 text-chalk hover:border-chalk hover:bg-chalk hover:text-night"
            >
              Explore Services
            </a>
          </div>

          <ul
            data-reveal
            className={`mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 ${delay(4)}`}
          >
            {heroFeatures.map((feature) => {
              const Icon = featureIcons[feature.icon];
              return (
                <li key={feature.icon} className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-gold" />
                  <span className="text-[0.8125rem] leading-snug text-chalk/90">
                    {feature.lines[0]}
                    <br />
                    {feature.lines[1]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-cream py-20 lg:py-28">
      <div className={container}>
        <div className="text-center">
          <p data-reveal className="eyebrow text-gold-deep">
            Our Services
          </p>
          <h2
            data-reveal
            className={`mt-4 text-[2.125rem] leading-tight text-ink sm:text-[2.75rem] ${delay(1)}`}
          >
            Everything <span className="text-gold-head">Your Hair Needs</span>
          </h2>
          <p
            data-reveal
            className={`mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted ${delay(2)}`}
          >
            Discover a range of premium services designed to bring out your best
            look.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li
              key={service.id}
              data-reveal
              className={`group flex flex-col bg-card shadow-[0_1px_3px_rgba(28,23,18,0.06),0_12px_28px_-18px_rgba(28,23,18,0.25)] ${delay(index)}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={unsplash(service.image)}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.375rem] leading-tight text-ink">
                  {service.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-muted">
                  {service.description}
                </p>
                <BookButton className="mt-6 inline-flex items-center gap-2 self-start text-[0.6875rem] font-semibold tracking-[0.18em] text-gold-deep uppercase transition-colors duration-300 hover:text-ink">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" />
                </BookButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="about" className="scroll-mt-20 bg-charcoal">
      <div className="grid lg:grid-cols-[38%_1fr]">
        <div className="relative min-h-[22rem] lg:min-h-[34rem]">
          <Image
            src={unsplash("photo-1773904215697-e6c21fc27ac2")}
            alt="The salon floor, with styling chairs facing a wall of lit mirrors"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-night/45 via-transparent to-charcoal"
          />
          <p
            data-reveal
            className="absolute right-6 bottom-8 font-display text-[1.3rem] leading-[1.35] tracking-[0.14em] text-gold uppercase lg:top-1/2 lg:right-10 lg:bottom-auto lg:-translate-y-1/2"
          >
            Self
            <br />
            Care
            <br />
            Looks
            <br />
            Good
            <br />
            On You
            <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold/50" />
          </p>
        </div>

        <div className="relative isolate overflow-hidden px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
          <LeafWatermark />

          <div className="relative max-w-xl">
            <p data-reveal className="eyebrow text-dim">
              The Experience
            </p>
            <h2
              data-reveal
              className={`mt-4 text-[2rem] leading-tight text-chalk sm:text-[2.5rem] ${delay(1)}`}
            >
              More Than a
              <br />
              <span className="text-gold">Hair Appointment</span>
            </h2>
            <p
              data-reveal
              className={`mt-5 max-w-md text-[0.9375rem] leading-relaxed text-dim ${delay(2)}`}
            >
              Step into a space where every detail is designed around you.
              Relax, refresh and leave feeling more confident.
            </p>

            <ol className="mt-10 space-y-7">
              {experienceSteps.map((step, index) => (
                <li
                  key={step.number}
                  data-reveal
                  className={`flex items-baseline gap-6 ${delay(index + 1)}`}
                >
                  <span className="font-display text-[1.75rem] leading-none text-gold tabular-nums">
                    {step.number}
                  </span>
                  <span>
                    <span className="block text-[0.8125rem] font-semibold tracking-[0.14em] text-chalk uppercase">
                      {step.title}
                    </span>
                    <span className="mt-1.5 block text-[0.875rem] text-dim">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p
            aria-hidden="true"
            className="pointer-events-none mt-12 font-script text-[1.9rem] leading-[1.25] text-gold lg:absolute lg:top-1/2 lg:right-10 lg:mt-0 lg:-translate-y-1/2 lg:text-right"
          >
            Beautiful
            <br />
            Looks
            <br />
            Brighter
            <br />
            You
            <span className="mt-4 block h-px w-16 bg-gold/50 lg:ml-auto" />
          </p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-night py-20 lg:py-28">
      <div className={container}>
        <div className="text-center">
          <p data-reveal className="eyebrow text-gold">
            Our Work
          </p>
          <h2
            data-reveal
            className={`mt-4 text-[2.125rem] leading-tight text-chalk sm:text-[2.75rem] ${delay(1)}`}
          >
            Looks We Have <span className="text-gold">Created</span>
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {gallery.map((item, index) => (
            <li
              key={item.image}
              data-reveal
              className={`group relative aspect-[3/4] overflow-hidden ${delay(index)}`}
            >
              <Image
                src={unsplash(item.image)}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 20rem, 45vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent"
              />
              <span className="absolute inset-x-4 bottom-4 text-[0.6875rem] font-semibold tracking-[0.18em] text-chalk uppercase">
                {item.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-cream py-20 lg:py-24">
      {/* The carousel renders two grid children: the arrows, and the track
          that spans the full width beneath them. */}
      <div
        className={`${container} grid items-end gap-y-10 sm:grid-cols-[1fr_auto]`}
      >
        <div className="text-center sm:text-left">
          <p data-reveal className="eyebrow text-gold-deep">
            What Our Clients Say
          </p>
          <h2
            data-reveal
            className={`mt-4 text-[2.125rem] leading-tight text-ink sm:text-[2.5rem] ${delay(1)}`}
          >
            Loved by Our Clients
          </h2>
        </div>
        <ReviewsCarousel />
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <div className="absolute inset-y-0 left-0 w-1/2 lg:w-[38%]">
        <Image
          src={unsplash("photo-1620939391250-eb822ac0818a")}
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-night/70 via-night via-50% to-night lg:from-night/45 lg:via-36%"
      />

      <div
        className={`relative ${container} grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:py-20`}
      >
        <div className="text-center lg:text-left">
          <p data-reveal className="eyebrow text-dim">
            Ready for Your Next Look?
          </p>
          <h2
            data-reveal
            className={`mt-4 text-[2rem] leading-tight text-chalk sm:text-[2.5rem] ${delay(1)}`}
          >
            Your New Look <span className="text-gold">Starts Here</span>
          </h2>
          <p
            data-reveal
            className={`mt-4 text-[0.9375rem] leading-relaxed text-dim ${delay(2)}`}
          >
            Book your appointment today and let our experts take care of the
            rest.
          </p>
        </div>

        <div data-reveal className="text-center lg:text-right">
          <BookButton className="btn w-full bg-gold px-10 py-4 text-night hover:bg-[#eccb94] sm:w-auto">
            Book Your Appointment
            <ArrowRight className="h-4 w-4" />
          </BookButton>

          <p className="mt-5 text-[0.8125rem] text-dim">Or connect with us</p>
          <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-end">
            <a
              href={salon.phoneHref}
              className="inline-flex items-center gap-2.5 text-[0.875rem] text-chalk transition-colors duration-300 hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" />
              {salon.phone}
            </a>
            <a
              href={salon.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[0.875rem] text-chalk transition-colors duration-300 hover:text-gold"
            >
              <WhatsApp className="h-4 w-4 text-gold" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    { href: salon.instagram, label: "Instagram", Icon: Instagram },
    { href: salon.facebook, label: "Facebook", Icon: Facebook },
    { href: salon.youtube, label: "YouTube", Icon: YouTube },
  ];

  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-hairline-dark bg-espresso py-10"
    >
      <div
        className={`${container} flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-10 lg:text-left`}
      >
        <Wordmark />

        <div className="flex flex-col items-center gap-5 text-[0.8125rem] text-dim sm:flex-row sm:gap-9">
          <a
            href={salon.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-gold"
          >
            <MapPin className="h-4 w-4 shrink-0 text-gold" />
            {salon.address}
          </a>
          <span className="inline-flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-gold" />
            {salon.hours}
          </span>
        </div>

        <ul className="flex items-center gap-5">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-dim transition-colors duration-300 hover:text-gold"
              >
                <Icon className="h-[1.15rem] w-[1.15rem]" />
              </a>
            </li>
          ))}
        </ul>

        <p className="flex items-center gap-4 text-[0.8125rem] text-dim">
          {salon.strapline}
          <span
            aria-hidden="true"
            className="hidden h-px w-10 bg-gold/40 lg:block"
          />
        </p>
      </div>

      <div className={`${container} mt-8 border-t border-hairline-dark pt-6`}>
        <p className="text-center text-[0.75rem] text-dim/70">
          &copy; {new Date().getFullYear()} {salon.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/**
 * Decorative foliage behind the experience copy, drawn rather than fetched so
 * it scales cleanly and costs no request.
 */
function LeafWatermark() {
  const leaves = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 170 380"
      className="pointer-events-none absolute -top-10 right-0 h-[26rem] w-auto text-gold/[0.09]"
    >
      <path
        d="M85 10C79 120 77 250 82 372"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {leaves.map((i) => {
        const y = 42 + i * 29;
        const len = 54 - Math.abs(i - 3) * 3.6;
        return (
          <g key={i} fill="currentColor">
            <ellipse
              cx={85 - len / 2}
              cy={y}
              rx={len / 2}
              ry={8.5}
              transform={`rotate(-26 ${85 - len / 2} ${y})`}
            />
            <ellipse
              cx={85 + len / 2}
              cy={y + 14}
              rx={len / 2}
              ry={8.5}
              transform={`rotate(26 ${85 + len / 2} ${y + 14})`}
            />
          </g>
        );
      })}
    </svg>
  );
}
