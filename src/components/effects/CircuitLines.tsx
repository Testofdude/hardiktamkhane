import { motion, useReducedMotion } from "framer-motion";

interface CircuitLinesProps {
  className?: string;
  variant?: "hero" | "section" | "card";
}

export const CircuitLines = ({ className = "", variant = "section" }: CircuitLinesProps) => {
  const shouldReduceMotion = useReducedMotion();

  const lines = variant === "hero" ? 8 : variant === "card" ? 3 : 5;
  const nodes = variant === "hero" ? 12 : variant === "card" ? 4 : 6;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Horizontal circuit lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          style={{
            top: `${(i + 1) * (100 / (lines + 1))}%`,
            left: 0,
            right: 0,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={shouldReduceMotion ? { scaleX: 1, opacity: 0.5 } : { 
            scaleX: [0, 1, 1],
            opacity: [0, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: shouldReduceMotion ? 0 : Infinity,
            repeatDelay: 5,
          }}
        />
      ))}

      {/* Vertical circuit lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent"
          style={{
            left: `${(i + 1) * (100 / (lines + 1))}%`,
            top: 0,
            bottom: 0,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={shouldReduceMotion ? { scaleY: 1, opacity: 0.3 } : { 
            scaleY: [0, 1, 1],
            opacity: [0, 0.3, 0.2],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.3,
            repeat: shouldReduceMotion ? 0 : Infinity,
            repeatDelay: 6,
          }}
        />
      ))}

      {/* Circuit nodes */}
      {Array.from({ length: nodes }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        return (
          <motion.div
            key={`node-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { scale: 1, opacity: 0.4 } : {
              scale: [0, 1, 1, 0],
              opacity: [0, 0.6, 0.4, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: shouldReduceMotion ? 0 : Infinity,
              repeatDelay: 3,
            }}
          />
        );
      })}

      {/* Animated data pulse lines */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(189 94% 43% / 0.4), transparent)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-3/4 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(263 70% 65% / 0.3), transparent)",
            }}
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear",
            }}
          />
        </>
      )}
    </div>
  );
};
