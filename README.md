# LOOKS

Single-page prototype site for a hair salon, built to a supplied design
reference with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

```bash
npm run dev
```

## Structure

| Path                                 | What it holds                                              |
| ------------------------------------ | ---------------------------------------------------------- |
| `src/app/page.tsx`                   | The whole page, one function per section                    |
| `src/app/layout.tsx`                 | Fonts, metadata, the pre-paint `js` class                   |
| `src/app/globals.css`                | Theme tokens, utilities, scroll-reveal and dialog styles    |
| `src/app/icon.svg`                   | Favicon                                                     |
| `src/lib/content.ts`                 | All copy and data: nav, services, gallery, reviews, contact |
| `src/components/booking-dialog.tsx`  | The booking modal and its validation                        |
| `src/components/book-button.tsx`     | Opens the modal from anywhere on the page                   |
| `src/components/site-header.tsx`     | Fixed header, scroll-spy nav, mobile menu, wordmark         |
| `src/components/reviews-carousel.tsx`| Scroll-snap review track with the arrow controls            |
| `src/components/icons.tsx`           | The line icon set, drawn inline                             |
| `src/components/scroll-reveal.tsx`   | One observer that reveals every `[data-reveal]` element     |

Almost all wording lives in `src/lib/content.ts`, so the page rarely needs
editing to change what the site says.

## Sections

Hero, Services, The Experience (`#about`), Gallery, Reviews, a closing
call-to-action, and the footer (`#contact`).

The nav in the reference has six items but the reference page shows no gallery,
so a gallery section was added in the same visual language rather than shipping
a nav link that goes nowhere.

The reference has no booking form on the page, only "book" buttons. Every one
of them opens a modal built on the native `<dialog>` element, which gives focus
trapping, `Esc` to close and backdrop inerting for free. The page itself stays a
server component; only the buttons are client components.

## Design

| Token                    | Value     | Used for                                  |
| ------------------------ | --------- | ----------------------------------------- |
| `night`                  | `#100d0a` | Page and hero background                  |
| `charcoal`               | `#1a1512` | The Experience band, dialog surface       |
| `espresso`               | `#0b0908` | Footer                                    |
| `cream`                  | `#f7f2e9` | Services and Reviews sections             |
| `card`                   | `#ffffff` | Service and review cards                  |
| `ink` / `muted`          |           | Text on cream                             |
| `chalk` / `dim`          |           | Text on dark                              |
| `gold`                   | `#e0b87c` | Accent on dark, and button fills          |
| `gold-head`              | `#a87c41` | Large gold headings on cream              |
| `gold-deep`              | `#8a6733` | Small gold labels and links on cream      |
| `hairline`               | `#e3dbcd` | Borders on cream                          |
| `hairline-dark`          | `#2a231c` | Borders on dark                           |

There are three golds because one value cannot be legible on both grounds. The
reference's gold on cream measures about 2.2:1, which fails WCAG at any size, so
it was deepened: `gold-head` is 3.4:1 (AA for large text) and `gold-deep` is
4.6:1 (AA for body text). On `night`, `gold` is 7.8:1. Use `gold-deep` for any
small gold text on a cream background.

Type is Playfair Display for headings and Poppins for everything else, with
Dancing Script for the two decorative flourishes. All three load through
`next/font/google`.

`:root { color-scheme: dark }` keeps the native date picker and scrollbars dark;
`viewport.themeColor` matches `night`. Keep the two in sync.

Shared utilities live in `globals.css`: `eyebrow` for the letter-spaced section
labels and `btn` for the square gold and outlined buttons.

Avoid naming a colour token `base`: Tailwind already ships `text-base` as a font
size, so `text-base` would silently resolve to `font-size: 1rem`.

## Before launch

- [ ] **Confirm the brand.** The name, wordmark and "Hair | Beauty | You"
      strapline come from the supplied reference. If this is not your brand,
      replace them in `src/lib/content.ts` before publishing anything.
- [ ] **Replace the reviews.** The three in `src/lib/content.ts` are
      placeholders copied from the reference and are not real customer reviews.
      Swap in genuine, attributable ones or remove the section.
- [ ] Connect the custom domain, then update `metadataBase` in
      `src/app/layout.tsx`.
- [ ] Replace the placeholder address, phone, WhatsApp, email, hours, map link
      and social URLs in `src/lib/content.ts`.
- [ ] Swap the Unsplash placeholders for the salon's own photography. Image URLs
      are built by `unsplash()` in `src/lib/content.ts`; local files can go in
      `public/` and be imported instead, which also removes the need for the
      `images.remotePatterns` entry in `next.config.ts`.
- [ ] Wire up the booking modal. It validates in the browser and then stops at
      the `TODO` in `src/components/booking-dialog.tsx`; nothing is sent
      anywhere yet. Point it at the booking system or the salon inbox, and
      re-validate on the server.
- [ ] Add an `opengraph-image` to `src/app/` for link previews.

Favicon: done, `src/app/icon.svg`. No third-party badge is rendered anywhere.
