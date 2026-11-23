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

export interface NavLink {
  href: `#${string}`;
  label: string;
}

/** In-page sections shown in the header and footer navigation. */
export const navLinks: readonly NavLink[] = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Clients" },
];

export const contactLink: NavLink = { href: "#contact", label: "Start a project" };

export const CONTACT_EMAIL = "hello@devminds.net";
