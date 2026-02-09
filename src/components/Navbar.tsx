import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { StatusIndicator } from "./effects/StatusIndicator";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Cases", href: "/cases" },
  { name: "Contact", href: "/contact" },
];

// Magnetic hover effect hook
const useMagneticHover = (strength: number = 0.3) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
};

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

const MagneticLink = ({ href, children, isActive, onClick }: MagneticLinkProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagneticHover(0.4);

  const isExternal = href.startsWith("#");

  if (isExternal) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={shouldReduceMotion ? {} : { x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`
          relative px-4 py-2 text-sm font-medium
          transition-colors duration-300
          ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
        `}
      >
        {children}
        <motion.span 
          className="absolute -bottom-0.5 left-1/2 h-0.5 bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0, x: "-50%" }}
          animate={{ width: isActive ? "60%" : 0, x: "-50%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    );
  }

  return (
    <motion.div
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={shouldReduceMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        ref={ref as any}
        to={href}
        onClick={onClick}
        className={`
          relative px-4 py-2 text-sm font-medium block
          transition-colors duration-300
          ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
        `}
      >
        {children}
        <motion.span 
          className="absolute -bottom-0.5 left-1/2 h-0.5 bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0, x: "-50%" }}
          animate={{ width: isActive ? "60%" : 0, x: "-50%" }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={shouldReduceMotion ? {} : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500
        ${isScrolled ? "top-4" : "top-6"}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Floating nav container */}
      <motion.div
        className={`
          glass-strong rounded-2xl px-2 py-2
          border border-border/30
          shadow-xl shadow-black/20
          transition-all duration-500
          ${isScrolled ? "shadow-glow" : ""}
        `}
        layout
      >
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Terminal className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-sm font-display font-bold gradient-text">
              HT
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <MagneticLink
                key={item.name}
                href={item.href}
                isActive={location.pathname === item.href}
              >
                {item.name}
              </MagneticLink>
            ))}
          </div>

          {/* Status indicator & Theme toggle */}
          <div className="hidden md:flex items-center gap-2 px-2">
            <StatusIndicator status="online" label="Available" />
            <ThemeToggle />
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden md:block"
          >
            <motion.div
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              Let's Talk
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2 border-t border-border/30 mt-2"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.href}
                  className={`
                    block py-3 px-4 rounded-lg
                    transition-colors duration-200
                    ${location.pathname === item.href 
                      ? "bg-primary/10 text-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
              className="pt-2 flex items-center gap-3"
            >
              <ThemeToggle />
              <Link
                to="/contact"
                className="block flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
};
