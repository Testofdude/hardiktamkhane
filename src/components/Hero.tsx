import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Zap, Shield, Code } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircuitLines } from "./effects/CircuitLines";
import { GlowOrb } from "./effects/GlowOrb";
import { ParallaxLayer } from "./effects/ParallaxLayer";
import { HolographicOverlay } from "./effects/HolographicOverlay";
import { StatusIndicator } from "./effects/StatusIndicator";
import { TechButton } from "./ui/TechButton";

// Animated data streams
const DataStream = ({ delay = 0 }: { delay?: number }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className="absolute h-px w-32 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      style={{ top: `${20 + Math.random() * 60}%` }}
      initial={{ x: "-100%", opacity: 0 }}
      animate={shouldReduceMotion ? { opacity: 0.3 } : { 
        x: ["calc(-100%)", "calc(100vw + 100%)"],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 2,
        ease: "linear",
      }}
    />
  );
};

// Tech stat display
const TechStat = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className="glass-card p-4 rounded-xl flex items-center gap-3"
      whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <div className="text-lg font-display font-bold gradient-text">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [glitchText, setGlitchText] = useState(false);

  // Subtle glitch effect on name
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 100);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      role="banner"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="absolute inset-0 circuit-bg opacity-30" />
      </div>

      {/* Animated glow orbs */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 -z-10">
        <GlowOrb size={600} color="primary" className="-top-40 -left-40" delay={0} />
        <GlowOrb size={500} color="accent" className="top-1/4 -right-40" delay={2} />
        <GlowOrb size={400} color="primary" className="bottom-0 left-1/3" delay={4} />
      </ParallaxLayer>

      {/* Circuit lines overlay */}
      <CircuitLines variant="hero" />

      {/* Data streams */}
      {!shouldReduceMotion && (
        <>
          <DataStream delay={0} />
          <DataStream delay={1.5} />
          <DataStream delay={3} />
        </>
      )}

      {/* Holographic overlay */}
      <HolographicOverlay intensity="subtle" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status bar */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4 mb-8"
          >
            <StatusIndicator status="online" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider">
              SYSTEM ACTIVE • FOUNDER MODE ENABLED
            </span>
          </motion.div>

          {/* Name with signature effect */}
          <motion.div variants={itemVariants} className="mb-4">
            <motion.span 
              className="text-sm md:text-base font-mono text-accent tracking-[0.3em] uppercase"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              I'm
            </motion.span>
          </motion.div>

          {/* Main name */}
          <motion.h1
            variants={itemVariants}
            className={`text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-4 ${
              glitchText ? "animate-pulse" : ""
            }`}
          >
            <span className="block gradient-text neon-text relative">
              Hardik
              <motion.span
                className="absolute -right-2 md:-right-4 top-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent"
                animate={shouldReduceMotion ? {} : { 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            <span className="block text-foreground/90 relative">
              Tamkhane
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground font-medium mb-4 max-w-2xl"
          >
            Founder & Builder at the Intersection of 
            <span className="text-accent"> Code</span>, 
            <span className="text-primary"> Security</span> & 
            <span className="text-foreground"> Growth</span>
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-xl mb-8"
          >
            Building two startups—
            <a 
              href="https://cyvance.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
            >
              Cyvance Security
            </a>
            {" "}and{" "}
            <a 
              href="https://fusioninterpreter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors underline-offset-4 hover:underline"
            >
              Fusion Interpreter
            </a>
            —while scaling cybersecurity solutions and performance marketing campaigns. 
            Published author. 35+ projects shipped. Turning ideas into impact.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 mb-10 max-w-lg"
          >
            <TechStat value="35+" label="Projects" icon={Code} />
            <TechStat value="2" label="Startups" icon={Zap} />
            <TechStat value="1" label="Book" icon={Shield} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <TechButton
              variant="primary"
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>Explore Work</span>
              <motion.span
                animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </TechButton>
            
            <TechButton variant="outline" size="lg">
              <Link to="/contact" className="flex items-center gap-2">
                Initialize Contact
              </Link>
            </TechButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-xs font-mono tracking-wider">SCROLL</span>
            <div className="w-6 h-10 rounded-full border border-border/50 flex items-start justify-center p-2 group-hover:border-accent/50 transition-colors">
              <motion.div
                className="w-1 h-2 rounded-full bg-accent"
                animate={shouldReduceMotion ? {} : { y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
