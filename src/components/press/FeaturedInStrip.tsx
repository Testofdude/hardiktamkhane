import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { pressMentions } from "@/data/press";
import { PressLogo } from "./PressLogo";

/**
 * "As Featured In" homepage strip — marquee of publication wordmarks
 * linking to /features. Reinforces authority signals above the fold.
 */
export const FeaturedInStrip = () => {
  const shouldReduceMotion = useReducedMotion();
  // Duplicate for seamless marquee
  const items = [...pressMentions, ...pressMentions, ...pressMentions];

  return (
    <section
      aria-labelledby="featured-in-heading"
      className="py-14 md:py-20 relative overflow-hidden border-y border-border/30 bg-muted/20"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-[0.2em] uppercase">
            <Sparkles className="w-3 h-3" />
            Press & Recognition
          </span>
          <h2
            id="featured-in-heading"
            className="mt-3 text-2xl md:text-3xl font-display font-bold"
          >
            As <span className="gradient-text">Featured In</span>
          </h2>
        </div>

        <div className="relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="overflow-hidden">
            <motion.ul
              className="flex items-center gap-12 md:gap-20 whitespace-nowrap"
              animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
              transition={{
                duration: 28,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {items.map((m, i) => (
                <li key={`${m.id}-${i}`} className="shrink-0">
                  <Link
                    to="/features"
                    aria-label={`Read coverage in ${m.publication}`}
                    className="group inline-flex items-center"
                  >
                    <PressLogo
                      name={m.publication}
                      className="text-2xl md:text-3xl text-foreground/60 group-hover:text-foreground transition-colors duration-300"
                    />
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors story-link"
          >
            View all press mentions →
          </Link>
        </div>
      </div>
    </section>
  );
};
