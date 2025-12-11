import { motion, useReducedMotion } from "framer-motion";

interface GlowOrbProps {
  size?: number;
  color?: "primary" | "accent";
  className?: string;
  delay?: number;
}

export const GlowOrb = ({ 
  size = 300, 
  color = "primary", 
  className = "",
  delay = 0 
}: GlowOrbProps) => {
  const shouldReduceMotion = useReducedMotion();

  const colorClasses = {
    primary: "from-primary/15 via-primary/5 to-transparent",
    accent: "from-accent/12 via-accent/4 to-transparent",
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${colorClasses[color]} ${className}`}
      style={{
        width: size,
        height: size,
        filter: `blur(${size / 3}px)`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={shouldReduceMotion ? { opacity: 0.4, scale: 1 } : {
        opacity: [0.2, 0.4, 0.2],
        scale: [1, 1.1, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: shouldReduceMotion ? 0 : Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
