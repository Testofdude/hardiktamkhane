import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

// Floating shape component for background animation
const FloatingShape = ({ delay = 0, duration = 20, size = 300, blur = 60, className = "" }: {
  delay?: number;
  duration?: number;
  size?: number;
  blur?: number;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
      }}
      initial={{ opacity: 0 }}
      animate={shouldReduceMotion ? { opacity: 0.4 } : {
        opacity: [0.3, 0.5, 0.3],
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Lightweight particle dots
const ParticleDots = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => {
        const distanceX = (mousePosition.x / window.innerWidth) * 100 - dot.x;
        const distanceY = (mousePosition.y / window.innerHeight) * 100 - dot.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const offset = Math.max(0, 20 - distance);

        return (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            animate={{
              x: distanceX * offset * 0.5,
              y: distanceY * offset * 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
          />
        );
      })}
    </div>
  );
};

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for staggered animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
      role="banner"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
      </div>

      {/* Floating shapes with glow effects - more subtle */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
          <FloatingShape
            delay={0}
            duration={30}
            size={500}
            blur={140}
            className="bg-gradient-to-br from-primary/12 to-primary/5 -top-32 -left-32"
          />
          <FloatingShape
            delay={10}
            duration={35}
            size={450}
            blur={120}
            className="bg-gradient-to-br from-accent/12 to-accent/5 top-1/4 -right-32"
          />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-6 lg:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main heading with gradient */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight"
            >
              <span className="gradient-text bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Hardik Tamkhane
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium"
            >
              Founder • Web Developer • Digital Marketer • Aspiring Cybersecurity Expert
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Building innovative digital products at the intersection of code, marketing, and security. 
              Started coding in Class 5, published a finance book in Class 7, and founded Fusion Interpreter in 2023.
            </motion.p>

            {/* Call-to-action buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div 
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="gradient"
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full sm:w-auto px-8 py-6 rounded-full text-base font-semibold shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300"
                  aria-label="View my work and projects"
                >
                  View Work
                </Button>
              </motion.div>
              <motion.div 
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto px-8 py-6 rounded-full text-base font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  <a href="#contact" aria-label="Get in touch with me">
                    Contact Me
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50, scale: shouldReduceMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl animate-pulse" />
              
              {/* Profile Image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <motion.img
                  src="/placeholder.svg"
                  alt="Hardik Tamkhane - Founder, Web Developer, Digital Marketer, and Aspiring Cybersecurity Expert"
                  className="w-full h-full object-cover"
                  animate={shouldReduceMotion ? {} : {
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-accent/30"
                animate={shouldReduceMotion ? {} : {
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            animate={shouldReduceMotion ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex flex-col items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-all duration-300 group"
            aria-label="Scroll down to explore more"
          >
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <div className="p-2 rounded-full border-2 border-current group-hover:border-primary transition-all duration-300">
              <ArrowDown className="w-4 h-4" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
