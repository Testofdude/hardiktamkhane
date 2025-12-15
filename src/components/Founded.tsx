import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

const EcosystemNode = ({
  venture,
  isHovered,
  onHover,
  onLeave,
  mousePosition,
}: {
  venture: VentureNode;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  mousePosition: { x: number; y: number };
}) => {
  const navigate = useNavigate();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!nodeRef.current || !isHovered) {
      setMagneticOffset({ x: 0, y: 0 });
      return;
    }

    const rect = nodeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (mousePosition.x - centerX) * 0.15;
    const deltaY = (mousePosition.y - centerY) * 0.15;

    setMagneticOffset({ x: deltaX, y: deltaY });
  }, [mousePosition, isHovered]);

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

  const statusColors = {
    Live: "bg-emerald-500",
    Building: "bg-amber-500",
    Scaling: "bg-primary",
  };

  return (
    <motion.div
      ref={nodeRef}
      className="absolute cursor-pointer group"
      style={{
        left: `${venture.position.x}%`,
        top: `${venture.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        x: magneticOffset.x,
        y: magneticOffset.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl"
        style={{
          background: "radial-gradient(circle, hsl(263 70% 65% / 0.4), transparent 70%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.5 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Node card */}
      <motion.div
        className="relative glass-card rounded-2xl p-4 md:p-5 min-w-[160px] md:min-w-[200px] border border-border/30"
        animate={{
          borderColor: isHovered ? "hsl(263 70% 65% / 0.5)" : "hsl(0 0% 100% / 0.06)",
          boxShadow: isHovered
            ? "0 0 40px hsl(263 70% 65% / 0.2), 0 8px 32px hsl(0 0% 0% / 0.4)"
            : "0 4px 24px hsl(0 0% 0% / 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulse indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ backgroundColor: statusColors[venture.status].replace("bg-", "") }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className={`absolute inset-0 rounded-full ${statusColors[venture.status]}`} />
        </motion.div>

        <div className="relative z-10">
          <h3 className="font-display font-semibold text-foreground text-sm md:text-base mb-1">
            {venture.name}
          </h3>
          <p className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-wider mb-2">
            {venture.domain}
          </p>

          {/* Expandable content on hover */}
          <motion.div
            className="overflow-hidden"
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-muted-foreground mb-2">{venture.impact}</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${statusColors[venture.status]} text-background`}
              >
                {venture.status}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
          <motion.line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={isActive ? "url(#lineGradientActive)" : "url(#lineGradient)"}
            strokeWidth={isActive ? 2 : 1}
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: isActive ? 1 : 0.4,
              strokeDashoffset: [0, -24],
            }}
            transition={{
              pathLength: { duration: 1.5, delay: index * 0.1 },
              opacity: { duration: 0.3 },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
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

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founded"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="founded-heading"
    >
      {/* Cinematic grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(263 70% 65% / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="font-mono text-xs text-accent uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              Founder Console
            </span>
          </motion.div>

          <h2
            id="founded-heading"
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              I build companies before
            </motion.span>
            <motion.span
              className="block gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              trends become crowded.
            </motion.span>
          </h2>

          <motion.p
            className="font-mono text-sm md:text-base text-muted-foreground tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Startups • Cybersecurity • Marketing • AI • Media Systems
          </motion.p>
        </motion.div>

        {/* Ecosystem Grid */}
        <motion.div
          ref={ecosystemRef}
          className="relative h-[500px] md:h-[600px] lg:h-[700px] mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(90deg, hsl(263 70% 65% / 0.03) 1px, transparent 1px),
                linear-gradient(180deg, hsl(263 70% 65% / 0.03) 1px, transparent 1px)
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.8 + index * 0.1,
                duration: 0.5,
                type: "spring",
              }}
            >
              <EcosystemNode
                venture={venture}
                isHovered={hoveredNode === venture.id}
                onHover={() => setHoveredNode(venture.id)}
                onLeave={() => setHoveredNode(null)}
                mousePosition={mousePosition}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={() => navigate("/founded")}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card border border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_40px_hsl(263_70%_65%_/_0.2)]"
          >
            <span className="font-display font-medium text-foreground">
              Explore Everything I've Founded
            </span>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
