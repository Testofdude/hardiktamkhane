import { ReactNode, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TechButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export const TechButton = ({ 
  children, 
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}: TechButtonProps) => {
  const shouldReduceMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    if (!shouldReduceMotion && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setRipplePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }
    
    onClick?.();
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary to-accent
      text-primary-foreground
      shadow-lg shadow-primary/20
      hover:shadow-xl hover:shadow-primary/30
      border-0
    `,
    secondary: `
      bg-secondary
      text-secondary-foreground
      border border-border/50
      hover:bg-secondary/80
      hover:border-accent/30
    `,
    outline: `
      bg-transparent
      text-foreground
      border border-border
      hover:bg-primary/10
      hover:border-primary/50
      hover:text-primary
    `,
    ghost: `
      bg-transparent
      text-muted-foreground
      border-0
      hover:bg-muted
      hover:text-foreground
    `,
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative overflow-hidden
        font-medium rounded-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      {/* Ripple effect */}
      {showRipple && !shouldReduceMotion && (
        <motion.span
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{
            left: ripplePosition.x,
            top: ripplePosition.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
          animate={{ 
            width: 400, 
            height: 400, 
            x: -200, 
            y: -200, 
            opacity: 0 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Shimmer effect on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), transparent)",
          transform: "translateX(-100%)",
        }}
        whileHover={shouldReduceMotion ? {} : {
          transform: "translateX(100%)",
          transition: { duration: 0.5 },
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
