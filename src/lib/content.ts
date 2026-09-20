export const salon = {
  name: "Your Home Salon",
  tagline: "Beauty Parlour | Home Salon",
  strapline: "Beauty That Comes Home.",
  location: "Chandigarh",
  // TODO: confirm the WhatsApp number and email inbox the salon actually
  // wants bookings routed to before launch.
  phone: "078148 50630",
  phoneHref: "tel:+917814850630",
  whatsappHref: "https://wa.me/917814850630",
  email: "hello@yourhomesalon.example",
  address:
    "First Floor, SCO No 2455-56, Dakshin Marg, near Hotel Aroma, Sector 22C, Chandigarh - 160022",
  hours: "Mon - Sun : 10:00 AM - 9:00 PM",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Your+Home+Salon%2C+SCO+2455-56%2C+Sector+22C%2C+Chandigarh+160022",
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
  { icon: "scissors", lines: ["Skilled", "Stylists"] },
  { icon: "star", lines: ["4.9 Star", "Rated"] },
  { icon: "diamond", lines: ["Home Salon", "Available"] },
  { icon: "heart", lines: ["941+ Happy", "Clients"] },
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
    name: "Haircuts & Styling",
    description: "Trendy & classic cuts from our skilled stylists.",
    image: "photo-1618049049816-43a00d5b0c3d",
    alt: "A client with a freshly cut and styled textured crop",
  },
  {
    id: "hair-straightening",
    name: "Permanent Hair Straightening",
    description: "Smooth, manageable, salon-perfect straight hair.",
    image: "photo-1682450239611-e2c845970926",
    alt: "Long smooth straightened hair photographed from behind",
  },
  {
    id: "nail-extensions",
    name: "Nail Extensions & Nail Art",
    description: "Durable extensions with custom nail art designs.",
    image: "photo-1634449571010-02389ed0f9b0",
    alt: "A close-up of manicured hands with nail art",
  },
  {
    id: "home-salon",
    name: "Home Salon Services",
    description: "Our stylists bring the salon experience to your door.",
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
    alt: "Two clients with long smooth straightened hair",
    caption: "Silky Straight",
  },
  {
    image: "photo-1743001345835-a8e9f258a823",
    alt: "A close-up of nail art and extensions",
    caption: "Nail Art",
  },
  {
    image: "photo-1700760934268-8aa0ef52ce0a",
    alt: "A stylist sectioning and cutting a client's hair",
    caption: "Signature Cut",
  },
];

export type Review = { quote: string; name: string; image: string; alt: string };

// Real Google reviews for Your Home Salon, Sector 22C, Chandigarh.
export const reviews: Review[] = [
  {
    quote:
      "My hair feels so much smoother after the permanent straightening! It's unbelievably manageable. The price was reasonable, and the stylist really listened to what I wanted.",
    name: "Aman Kumar",
    image: "photo-1725033489648-a819750348eb",
    alt: "",
  },
  {
    quote:
      "I'm honestly so happy with my haircut! The whole experience at the salon was really nice and professional. The stylist understood my preference really well instead of cutting too much length.",
    name: "Eyshmeet Kaur",
    image: "photo-1649433658557-54cf58577c68",
    alt: "",
  },
  {
    quote:
      "The service provided here is extremely outstanding and most economical. The hair cutting has been quite outstanding and different from all other salons I have so far visited.",
    name: "Shama Khan",
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
