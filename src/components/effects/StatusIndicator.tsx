import { motion, useReducedMotion } from "framer-motion";

interface StatusIndicatorProps {
  status?: "online" | "processing" | "idle";
  label?: string;
  className?: string;
}

export const StatusIndicator = ({ 
  status = "online", 
  label,
  className = "" 
}: StatusIndicatorProps) => {
  const shouldReduceMotion = useReducedMotion();

  const statusColors = {
    online: "bg-green-500",
    processing: "bg-accent",
    idle: "bg-muted-foreground",
  };

  const glowColors = {
    online: "shadow-[0_0_8px_hsl(142_76%_36%/0.6)]",
    processing: "shadow-[0_0_8px_hsl(189_94%_43%/0.6)]",
    idle: "shadow-none",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={`w-2 h-2 rounded-full ${statusColors[status]} ${glowColors[status]}`}
        animate={shouldReduceMotion ? {} : {
          scale: status === "processing" ? [1, 1.2, 1] : [1, 0.9, 1],
          opacity: status === "idle" ? 0.5 : [0.8, 1, 0.8],
        }}
        transition={{
          duration: status === "processing" ? 1 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {label && (
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};
