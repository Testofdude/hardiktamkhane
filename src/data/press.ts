export interface PressMention {
  id: string;
  publication: string;
  publicationShort?: string;
  title: string;
  description: string;
  url: string;
  date: string; // ISO
  dateLabel: string;
  tag?: string;
}

export const pressMentions: PressMention[] = [
  {
    id: "entrepreneurs-of-india-2026",
    publication: "Entrepreneurs of India",
    publicationShort: "EOI",
    title: "Hardik Tamkhane: Solving Real Problems Through Code and Strategy",
    description:
      "A feature on how a young founder is building Fusion Interpreter and Cyvance Security — turning code, marketing, and security into one operating system for modern ventures.",
    url: "https://entrepreneursofindia.com/hardik-tamkhane",
    date: "2026-05-04",
    dateLabel: "May 4, 2026",
    tag: "Founder Feature",
  },
];
