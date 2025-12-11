import { ReactNode, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  parallax?: boolean;
  onClick?: () => void;
}

export const CyberCard = ({ 
  children, 
  className = "",
  glowOnHover = true,
  onClick,
  parallax = false,
}: CyberCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-lg
        bg-gradient-to-br from-card/90 to-card/70
        border border-border/50
        transition-all duration-500
        ${className}
      `}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={shouldReduceMotion ? {} : { 
        y: -4,
        transition: { duration: 0.3 }
      }}
      style={{
        boxShadow: isHovered && glowOnHover
          ? `0 8px 32px -8px hsl(0 0% 0% / 0.5), 0 0 40px hsl(263 70% 65% / 0.08)`
          : `0 4px 16px -4px hsl(0 0% 0% / 0.4)`,
      }}
    >
      {/* Top accent line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(189 94% 43% / 0.5), transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Radial glow follow cursor */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              400px circle at ${mousePosition.x}% ${mousePosition.y}%,
              hsl(263 70% 65% / 0.06),
              transparent 40%
            )`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-px bg-accent/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div 
          className="absolute top-0 left-0 h-full w-px bg-accent/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: "top" }}
        />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-full h-px bg-accent/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: "right" }}
        />
        <motion.div 
          className="absolute top-0 right-0 h-full w-px bg-accent/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: "top" }}
        />
      </div>
    </motion.div>
  );
};
