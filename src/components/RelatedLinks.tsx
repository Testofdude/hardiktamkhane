import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CyberCard } from "@/components/ui/CyberCard";

export interface RelatedLink {
  title: string;
  description: string;
  href: string;
  anchor: string;
}

const ALL_LINKS: Record<string, RelatedLink> = {
  home: {
    title: "Home",
    description: "Meet Hardik Tamkhane — founder, developer, and builder shaping ecosystems in public.",
    href: "/",
    anchor: "Visit the Hardik Tamkhane homepage",
  },
  about: {
    title: "About Hardik",
    description: "The journey from coding at age 11 to founding Cyvance Security and Fusion Interpreter.",
    href: "/about",
    anchor: "Read the founder story and journey",
  },
  services: {
    title: "Services",
    description: "Web development, cybersecurity, and growth marketing services for ambitious teams.",
    href: "/services",
    anchor: "Explore web development, security & marketing services",
  },
  cases: {
    title: "Case Studies",
    description: "Real outcomes from shipped products, security audits, and growth campaigns.",
    href: "/cases",
    anchor: "See client case studies & project outcomes",
  },
  founded: {
    title: "Founded & Building",
    description: "Companies, newsletters, and AI products founded and currently being built.",
    href: "/founded",
    anchor: "Discover everything Hardik has founded",
  },
  book: {
    title: "The Book",
    description: "‘The Power of Financial Clarity’ — a guide to clear thinking about money.",
    href: "/thepoweroffinancialclarity",
    anchor: "Read about The Power of Financial Clarity book",
  },
  contact: {
    title: "Contact",
    description: "Start a conversation about partnerships, projects, or collaborations.",
    href: "/contact",
    anchor: "Get in touch with Hardik Tamkhane",
  },
  features: {
    title: "Press & Featured",
    description: "Media mentions and recognition — including the feature in Entrepreneurs of India.",
    href: "/features",
    anchor: "See press mentions and featured coverage",
  },
};

interface RelatedLinksProps {
  /** Keys of pages to show; current page key should be excluded by caller */
  links: Array<keyof typeof ALL_LINKS>;
  heading?: string;
  subheading?: string;
}

export const RelatedLinks = ({
  links,
  heading = "Explore More",
  subheading = "Continue the journey across the rest of the ecosystem.",
}: RelatedLinksProps) => {
  const shouldReduceMotion = useReducedMotion();
  const items = links.map((k) => ALL_LINKS[k]).filter(Boolean);

  return (
    <section
      aria-labelledby="related-links-heading"
      className="py-16 md:py-20 relative"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-xs font-mono text-accent tracking-wider mb-3 block">
              SITE://EXPLORE
            </span>
            <h2
              id="related-links-heading"
              className="text-2xl md:text-4xl font-display font-bold mb-3"
            >
              <span className="gradient-text">{heading}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              {subheading}
            </p>
          </div>

          <nav aria-label="Related pages">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    aria-label={item.anchor}
                    title={item.anchor}
                    className="block h-full group"
                  >
                    <CyberCard className="p-6 h-full transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-display font-bold group-hover:gradient-text transition-all">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-accent opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <span className="sr-only">{item.anchor}</span>
                    </CyberCard>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};
