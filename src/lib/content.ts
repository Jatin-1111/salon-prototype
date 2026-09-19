export const salon = {
  name: "LOOKS",
  tagline: "Hair | Beauty | You",
  strapline: "Look Good. Feel Better.",
  location: "Delhi",
  // TODO: replace every placeholder below with the real details before launch,
  // and update `metadataBase` in src/app/layout.tsx to the custom domain.
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappHref: "https://wa.me/919876543210",
  email: "hello@looksalon.example",
  address: "DLF Avenue, Saket, New Delhi - 110017",
  hours: "Mon - Sun : 10:00 AM - 9:00 PM",
  mapsUrl: "https://www.google.com/maps",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
} as const;

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

export type HeroFeature = {
  icon: "scissors" | "star" | "diamond" | "heart";
  lines: [string, string];
};

export const heroFeatures: HeroFeature[] = [
  { icon: "scissors", lines: ["Expert", "Stylists"] },
  { icon: "star", lines: ["Personalized", "Experience"] },
  { icon: "diamond", lines: ["Premium", "Products"] },
  { icon: "heart", lines: ["A Space", "You'll Love"] },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: "haircuts",
    name: "Haircuts",
    description: "Trendy & classic cuts tailored to your personality.",
    image: "photo-1618049049816-43a00d5b0c3d",
    alt: "A client with a freshly cut and styled textured crop",
  },
  {
    id: "hair-color",
    name: "Hair Color",
    description: "Balayage, highlights & customized colour.",
    image: "photo-1682450239611-e2c845970926",
    alt: "Long caramel balayage waves photographed from behind",
  },
  {
    id: "treatments",
    name: "Hair Treatments",
    description: "Restore shine, strength & healthy hair.",
    image: "photo-1634449571010-02389ed0f9b0",
    alt: "A client having their hair washed at the salon basin",
  },
  {
    id: "styling",
    name: "Styling",
    description: "Looks for parties, weddings & special occasions.",
    image: "photo-1614020863825-28a0bb7e3c3c",
    alt: "A twisted occasion updo in auburn hair, seen from behind",
  },
];

export const experienceSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "We understand your style and needs.",
  },
  {
    number: "02",
    title: "Personalized Service",
    description: "Tailored care by expert stylists.",
  },
  {
    number: "03",
    title: "Your New Look",
    description: "Walk out with confidence.",
  },
] as const;

export type GalleryItem = { image: string; alt: string; caption: string };

export const gallery: GalleryItem[] = [
  {
    image: "photo-1779350676620-fde279b1d023",
    alt: "A sharp one-length bob photographed from behind",
    caption: "Precision Bob",
  },
  {
    image: "photo-1785456283212-338f5bc44d50",
    alt: "Two clients with long wavy blonde and brunette hair",
    caption: "Lived-in Blonde",
  },
  {
    image: "photo-1743001345835-a8e9f258a823",
    alt: "A client with defined natural curls",
    caption: "Curl Definition",
  },
  {
    image: "photo-1700760934268-8aa0ef52ce0a",
    alt: "A stylist sectioning and cutting a client's hair",
    caption: "Signature Cut",
  },
];

export type Review = { quote: string; name: string; image: string; alt: string };

/**
 * PLACEHOLDER copy standing in for the real thing. These are not real reviews
 * and must be replaced with genuine, attributable ones before launch.
 */
export const reviews: Review[] = [
  {
    quote:
      "Amazing experience! The staff is so professional and friendly. My hair has never looked better!",
    name: "Riya Sharma",
    image: "photo-1725033489648-a819750348eb",
    alt: "",
  },
  {
    quote:
      "Best salon in Delhi! Loved the personalized consultation and the final look was exactly what I wanted.",
    name: "Aman Verma",
    image: "photo-1649433658557-54cf58577c68",
    alt: "",
  },
  {
    quote:
      "A premium salon with top-notch stylists. Highly recommend for anyone who wants a transformation!",
    name: "Neha Kapoor",
    image: "photo-1728053914354-e1e3e09f6239",
    alt: "",
  },
];

export const timeSlots = [
  "Morning, 10:00 AM - 1:00 PM",
  "Afternoon, 1:00 PM - 5:00 PM",
  "Evening, 5:00 PM - 9:00 PM",
];

export const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
