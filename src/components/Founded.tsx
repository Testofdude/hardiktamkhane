import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface VentureNode {
  id: string;
  name: string;
  domain: string;
  impact: string;
  status: "Live" | "Building" | "Scaling";
  link?: string;
  connections: string[];
  position: { x: number; y: number };
}

const ventures: VentureNode[] = [
  {
    id: "cyvance",
    name: "Cyvance Security",
    domain: "Cybersecurity Firm",
    impact: "Enterprise-grade protection for digital assets",
    status: "Live",
    link: "https://cyvance.in/",
    connections: ["cyber", "synthaxia"],
    position: { x: 20, y: 25 },
  },
  {
    id: "fusion",
    name: "Fusion Interpreter",
    domain: "Marketing Agency",
    impact: "Performance-driven growth systems",
    status: "Scaling",
    link: "https://fusioninterpreter.com/",
    connections: ["marketing", "arcnet"],
    position: { x: 75, y: 20 },
  },
  {
    id: "synthaxia",
    name: "SynthaXia",
    domain: "AI Systems",
    impact: "Intelligence layer for workflow automation",
    status: "Live",
    connections: ["ai", "cyvance"],
    position: { x: 50, y: 45 },
  },
  {
    id: "arcnet",
    name: "ArcNet Newsletter",
    domain: "Knowledge Network",
    impact: "High-signal insights on tech & security",
    status: "Live",
    connections: ["fusion", "book"],
    position: { x: 25, y: 65 },
  },
  {
    id: "cyber",
    name: "Cybersecurity Initiatives",
    domain: "Defense Systems",
    impact: "Risk assessment & penetration testing",
    status: "Building",
    connections: ["cyvance", "ai"],
    position: { x: 80, y: 55 },
  },
  {
    id: "marketing",
    name: "Performance Marketing",
    domain: "Growth Engineering",
    impact: "Built for conversion, not vanity",
    status: "Scaling",
    connections: ["fusion", "ai"],
    position: { x: 15, y: 45 },
  },
  {
    id: "ai",
    name: "AI Experiments",
    domain: "Applied Intelligence",
    impact: "Real-world AI, not demos",
    status: "Building",
    connections: ["synthaxia", "cyber", "marketing"],
    position: { x: 60, y: 75 },
  },
  {
    id: "book",
    name: "Published Author",
    domain: "Thought Leadership",
    impact: "The Power of Financial Clarity",
    status: "Live",
    link: "/thepoweroffinancialclarity",
    connections: ["arcnet"],
    position: { x: 45, y: 25 },
  },
];

const statusColors: Record<string, string> = {
  Live: "bg-emerald-500",
  Building: "bg-amber-500",
  Scaling: "bg-primary",
};

// Mobile card component - simpler, no magnetic effects
const MobileVentureCard = ({ venture }: { venture: VentureNode }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (venture.link) {
      if (venture.link.startsWith("http")) {
        window.open(venture.link, "_blank");
      } else {
        navigate(venture.link);
      }
    } else {
      navigate("/founded");
    }
  };

  return (
    <motion.div
      className="glass-card rounded-xl p-4 border border-border/30 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground text-sm mb-1 truncate">
            {venture.name}
          </h3>
          <p className="font-mono text-[10px] text-accent uppercase tracking-wider mb-2">
            {venture.domain}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">{venture.impact}</p>
        </div>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] font-mono ${statusColors[venture.status]} text-background`}
        >
          {venture.status}
        </span>
      </div>
    </motion.div>
  );
};

// Desktop node component with magnetic effects
const DesktopEcosystemNode = ({
  venture,
  isHovered,
  onHover,
  onLeave,
  magneticOffset,
}: {
  venture: VentureNode;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  magneticOffset: { x: number; y: number };
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (venture.link) {
      if (venture.link.startsWith("http")) {
        window.open(venture.link, "_blank");
      } else {
        navigate(venture.link);
      }
    } else {
      navigate("/founded");
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${venture.position.x}%`,
        top: `${venture.position.y}%`,
        transform: "translate(-50%, -50%)",
        willChange: isHovered ? "transform" : "auto",
      }}
      animate={{
        x: isHovered ? magneticOffset.x : 0,
        y: isHovered ? magneticOffset.y : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{
            background: `radial-gradient(circle, hsl(var(--node-glow) / var(--node-glow-opacity)), transparent 70%)`,
            transform: "scale(1.5)",
          }}
        />
      )}

      {/* Node card */}
      <div
        className="relative glass-card rounded-2xl p-5 min-w-[200px] border transition-all duration-300"
        style={{
          borderColor: isHovered ? "var(--card-border-hover)" : "var(--card-border-default)",
          boxShadow: isHovered
            ? "var(--card-shadow-hover)"
            : "var(--card-shadow-default)",
        }}
      >
        {/* Pulse indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full">
          <span className={`absolute inset-0 rounded-full ${statusColors[venture.status]} animate-pulse`} />
        </div>

        <div className="relative z-10">
          <h3 className="font-display font-semibold text-foreground text-base mb-1">
            {venture.name}
          </h3>
          <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
            {venture.domain}
          </p>

          {/* Expandable content on hover */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ 
              height: isHovered ? "auto" : 0, 
              opacity: isHovered ? 1 : 0,
              maxHeight: isHovered ? "100px" : 0,
            }}
          >
            <p className="text-xs text-muted-foreground mb-2">{venture.impact}</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${statusColors[venture.status]} text-background`}
              >
                {venture.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Simplified connection lines - no continuous animation
const ConnectionLines = ({
  ventures,
  hoveredId,
  containerRef,
}: {
  ventures: VentureNode[];
  hoveredId: string | null;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [containerRef]);

  const getNodePosition = (id: string) => {
    const node = ventures.find((v) => v.id === id);
    if (!node) return { x: 0, y: 0 };
    return {
      x: (node.position.x / 100) * dimensions.width,
      y: (node.position.y / 100) * dimensions.height,
    };
  };

  const lines: { from: string; to: string }[] = [];
  ventures.forEach((venture) => {
    venture.connections.forEach((connId) => {
      if (!lines.find((l) => (l.from === connId && l.to === venture.id) || (l.from === venture.id && l.to === connId))) {
        lines.push({ from: venture.id, to: connId });
      }
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(263 70% 65% / 0.3)" />
          <stop offset="50%" stopColor="hsl(189 94% 43% / 0.5)" />
          <stop offset="100%" stopColor="hsl(263 70% 65% / 0.3)" />
        </linearGradient>
        <linearGradient id="lineGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(263 70% 65% / 0.6)" />
          <stop offset="50%" stopColor="hsl(189 94% 43% / 0.8)" />
          <stop offset="100%" stopColor="hsl(263 70% 65% / 0.6)" />
        </linearGradient>
      </defs>
      {lines.map((line, index) => {
        const from = getNodePosition(line.from);
        const to = getNodePosition(line.to);
        const isActive = hoveredId === line.from || hoveredId === line.to;

        return (
          <line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={isActive ? "url(#lineGradientActive)" : "url(#lineGradient)"}
            strokeWidth={isActive ? 2 : 1}
            strokeDasharray="8 4"
            style={{
              opacity: isActive ? 1 : 0.4,
              transition: "opacity 0.3s, stroke-width 0.3s",
            }}
          />
        );
      })}
    </svg>
  );
};

export const Founded = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  // Throttled mouse move handler for desktop only
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobile || !hoveredNode) return;
    
    const nodes = document.querySelectorAll('[data-venture-id]');
    nodes.forEach((node) => {
      if ((node as HTMLElement).dataset.ventureId === hoveredNode) {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMagneticOffset({
          x: (e.clientX - centerX) * 0.12,
          y: (e.clientY - centerY) * 0.12,
        });
      }
    });
  }, [hoveredNode, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    
    let rafId: number;
    let lastX = 0;
    let lastY = 0;
    
    const throttledHandler = (e: MouseEvent) => {
      // Only update if mouse moved significantly
      if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
        lastX = e.clientX;
        lastY = e.clientY;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => handleMouseMove(e));
      }
    };
    
    window.addEventListener("mousemove", throttledHandler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", throttledHandler);
      cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="founded"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="founded-heading"
    >
      {/* Ambient glow - simplified */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--ambient-glow) 0%, transparent 60%)`,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-[0.2em] md:tracking-[0.3em] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-accent/20 bg-accent/5">
              Founder Console
            </span>
          </motion.div>

          <h2
            id="founded-heading"
            className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 max-w-4xl mx-auto leading-tight"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              I build companies before
            </motion.span>
            <motion.span
              className="block gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              trends become crowded.
            </motion.span>
          </h2>

          <motion.p
            className="font-mono text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Startups • Cybersecurity • Marketing • AI • Media Systems
          </motion.p>
        </motion.div>

        {/* Mobile: Simple grid layout */}
        {isMobile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {ventures.map((venture) => (
              <MobileVentureCard key={venture.id} venture={venture} />
            ))}
          </div>
        ) : (
          /* Desktop: Ecosystem Grid with nodes */
          <motion.div
            ref={ecosystemRef}
            className="relative h-[500px] md:h-[600px] lg:h-[700px] mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px),
                  linear-gradient(180deg, var(--grid-line-color) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Connection lines */}
            <ConnectionLines ventures={ventures} hoveredId={hoveredNode} containerRef={ecosystemRef} />

            {/* Venture nodes */}
            {ventures.map((venture, index) => (
              <motion.div
                key={venture.id}
                data-venture-id={venture.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.5 + index * 0.08,
                  duration: 0.4,
                }}
              >
                <DesktopEcosystemNode
                  venture={venture}
                  isHovered={hoveredNode === venture.id}
                  onHover={() => setHoveredNode(venture.id)}
                  onLeave={() => {
                    setHoveredNode(null);
                    setMagneticOffset({ x: 0, y: 0 });
                  }}
                  magneticOffset={hoveredNode === venture.id ? magneticOffset : { x: 0, y: 0 }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => navigate("/founded")}
            className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full glass-card border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-glow active:scale-[0.98]"
          >
            <span className="font-display font-medium text-foreground text-sm md:text-base">
              Explore Everything I've Founded
            </span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};