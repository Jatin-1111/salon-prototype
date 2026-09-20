import type { Metadata, Viewport } from "next";
import { Dancing_Script, Playfair_Display, Poppins } from "next/font/google";
import { salon } from "@/lib/content";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

const description =
  `${salon.name} is a top-rated beauty parlour and home salon in ${salon.location}. ` +
  "Haircuts, permanent hair straightening, nail extensions and doorstep beauty services. Book an appointment online.";

export const metadata: Metadata = {
  // TODO: point this at the custom domain once it is connected.
  metadataBase: new URL("https://yourhomesalon.example"),
  title: {
    default: `${salon.name} | Beauty Parlour & Home Salon in ${salon.location}`,
    template: `%s | ${salon.name}`,
  },
  description,
  keywords: [
    "beauty parlour",
    "home salon",
    "salon in Chandigarh",
    "haircut",
    "permanent hair straightening",
    "nail extensions",
    "Sector 22",
    "Tricity",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: salon.name,
    title: `${salon.name} | Beauty Parlour & Home Salon in ${salon.location}`,
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  // Matches --color-night, so mobile browser chrome blends into the header.
  themeColor: "#100d0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      // The inline script below adds a class to this element before React
      // hydrates, which is a difference React would otherwise warn about.
      suppressHydrationWarning
      className={`${playfair.variable} ${poppins.variable} ${script.variable} h-full antialiased`}
    >
      <head>
        <script
          // Marks the document as scripted before first paint so the reveal
          // styles never hide content from visitors without JavaScript.
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-night">{children}</body>
    </html>
  );
}
