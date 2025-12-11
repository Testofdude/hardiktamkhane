import { motion, useReducedMotion } from "framer-motion";

interface HolographicOverlayProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export const HolographicOverlay = ({ className = "", intensity = "subtle" }: HolographicOverlayProps) => {
  const shouldReduceMotion = useReducedMotion();

  const opacityMap = {
    subtle: 0.03,
    medium: 0.06,
    strong: 0.1,
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Scanline effect */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(0 0% 100% / ${opacityMap[intensity] / 2}) 2px,
              hsl(0 0% 100% / ${opacityMap[intensity] / 2}) 4px
            )`,
          }}
          animate={{
            backgroundPosition: ["0 0", "0 4px"],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Moving scan beam */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/30 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-accent/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-accent/30 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-accent/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-accent/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-accent/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-accent/30 to-transparent" />
      </div>

      {/* Holographic shimmer */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              125deg,
              transparent 0%,
              hsl(263 70% 65% / ${opacityMap[intensity]}) 25%,
              transparent 50%,
              hsl(189 94% 43% / ${opacityMap[intensity]}) 75%,
              transparent 100%
            )`,
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      )}
    </div>
  );
};
