export type Project = {
  title: string;
  client: string;
  category: "Web" | "Mobile" | "Brand" | "Platform";
  year: string;
  summary: string;
  tags: string[];
  metric: string;
  hue: number;
};

export const projects: Project[] = [
  { title: "Aurelia Private Banking", client: "Aurelia Capital", category: "Platform", year: "2026", summary: "A wealth-management portal with real-time portfolios and concierge messaging.", tags: ["React", "Node", "Postgres"], metric: "+42% client engagement", hue: 40 },
  { title: "Nomad Atlas", client: "Nomad Travel Co.", category: "Mobile", year: "2026", summary: "An offline-first travel companion with curated itineraries for 60+ cities.", tags: ["React Native", "Maps", "Offline"], metric: "4.9★ App Store rating", hue: 200 },
  { title: "Verdant Commerce", client: "Verdant Living", category: "Web", year: "2025", summary: "A headless storefront for a sustainable home brand with sub-second page loads.", tags: ["Next.js", "Shopify", "Edge"], metric: "2.3× conversion rate", hue: 150 },
  { title: "Helix Health Studio", client: "Helix Clinics", category: "Platform", year: "2025", summary: "Patient scheduling, telehealth and records in a single, calm interface.", tags: ["TypeScript", "WebRTC", "HIPAA"], metric: "−38% no-show rate", hue: 260 },
  { title: "Maison Lumière", client: "Lumière Atelier", category: "Brand", year: "2025", summary: "Identity, art direction and a cinematic site for a Parisian lighting atelier.", tags: ["Identity", "Motion", "Web"], metric: "Awwwards Honorable Mention", hue: 20 },
  { title: "Pulse Analytics", client: "Pulse Labs", category: "Web", year: "2024", summary: "A data-dense SaaS dashboard made legible with thoughtful visual hierarchy.", tags: ["React", "D3", "Design System"], metric: "60% faster insights", hue: 320 },
];

export const services = [
  { title: "Product Strategy", body: "Discovery workshops, research and roadmaps that align ambition with measurable outcomes." },
  { title: "Interface Design", body: "Design systems and interfaces with editorial polish, accessibility and clarity built in." },
  { title: "Web Engineering", body: "Fast, resilient web platforms on modern stacks — React, edge rendering and robust APIs." },
  { title: "Mobile Apps", body: "Native-feeling iOS and Android apps that are delightful in the hand and simple to maintain." },
  { title: "Brand & Motion", body: "Identities, art direction and motion languages that make products feel unmistakable." },
  { title: "Growth & Care", body: "Analytics, experimentation and ongoing partnership to keep products improving." },
];

export const steps = [
  { n: "01", title: "Discover", body: "We immerse ourselves in your business, users and goals to define what success looks like." },
  { n: "02", title: "Design", body: "We prototype rapidly, test with real people and refine every detail until it feels inevitable." },
  { n: "03", title: "Build", body: "We engineer with craft — typed, tested, accessible and fast — shipping in visible increments." },
  { n: "04", title: "Evolve", body: "We launch, measure and iterate together, turning insight into continuous improvement." },
];

export const testimonials = [
  { quote: "DevMinds delivered a platform our clients genuinely love. The attention to detail is unlike any agency we've worked with.", name: "Sara Rahimi", role: "COO, Aurelia Capital" },
  { quote: "They combined strategic thinking with flawless execution. Our launch was the smoothest in company history.", name: "Daniel Okafor", role: "Founder, Nomad Travel Co." },
  { quote: "Fast, thoughtful and honest partners. Our conversion more than doubled within the first quarter.", name: "Lena Fischer", role: "Head of Digital, Verdant Living" },
];
