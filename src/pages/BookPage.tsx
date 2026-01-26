import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, TrendingUp, Shield, Target, Lightbulb, ChevronDown, Sparkles, DollarSign, PieChart, BarChart3, Play } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import bookCover from "@/assets/book-cover.png";

// Physics-based spring config for Apple-like feel
const springConfig = { stiffness: 100, damping: 30, mass: 1 };
const smoothSpring = { stiffness: 50, damping: 20 };

// Ambient Particle System with depth
const AmbientParticles = () => {
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random(),
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.z > 0.5 
              ? `radial-gradient(circle, hsl(263 70% 65% / ${0.3 * p.z}), transparent)`
              : `radial-gradient(circle, hsl(189 94% 43% / ${0.3 * p.z}), transparent)`,
            filter: `blur(${p.z * 2}px)`,
          }}
          animate={{
            y: [0, -150 * p.z, 0],
            x: [0, Math.sin(p.id) * 30, 0],
            opacity: [0, 0.8 * p.z, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Cinematic Light Sweep
const LightSweep = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <motion.div
      className="absolute w-[200%] h-full"
      style={{
        background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.03) 45%, hsl(0 0% 100% / 0.08) 50%, hsl(0 0% 100% / 0.03) 55%, transparent 100%)",
      }}
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut", delay }}
    />
  </motion.div>
);

// Premium 3D Book with realistic lighting
const Book3DPremium = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), smoothSpring);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), smoothSpring);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 h-96 md:w-80 md:h-[440px] cursor-pointer"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-4 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse at center, hsl(263 70% 50% / 0.4), transparent 70%)",
          filter: "blur(40px)",
          x: shadowX,
          y: shadowY,
        }}
      />

      {/* Environmental glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
            "0 0 60px hsl(263 70% 65% / 0.2), 0 0 120px hsl(189 94% 43% / 0.1)",
            "0 0 80px hsl(263 70% 65% / 0.3), 0 0 150px hsl(189 94% 43% / 0.15)",
            "0 0 60px hsl(263 70% 65% / 0.2), 0 0 120px hsl(189 94% 43% / 0.1)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* 3D Book container */}
      <motion.div
        className="relative w-full h-full"
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Book spine - left side */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-8 origin-right"
          style={{
            background: "linear-gradient(90deg, hsl(263 50% 35%), hsl(263 60% 45%))",
            transform: "translateX(-100%) rotateY(-90deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </motion.div>

        {/* Book pages - right edge */}
        <div
          className="absolute right-0 top-2 bottom-2 w-4 origin-left"
          style={{
            background: "linear-gradient(90deg, hsl(40 20% 95%), hsl(40 15% 90%))",
            transform: "translateX(100%) rotateY(90deg)",
            borderRadius: "0 2px 2px 0",
          }}
        >
          {/* Page lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gray-300/50"
              style={{ top: `${(i + 1) * 5}%` }}
            />
          ))}
        </div>

        {/* Main book cover */}
        <motion.div
          className="relative w-full h-full rounded-xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Real Book Cover Image */}
          <img 
            src={bookCover} 
            alt="The Power of Financial Clarity by Hardik Tamkhane"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Holographic overlay */}
          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "linear-gradient(125deg, hsl(263 70% 65% / 0.3) 0%, transparent 30%, hsl(189 94% 43% / 0.3) 50%, transparent 70%, hsl(263 70% 65% / 0.3) 100%)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-x-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent, hsl(189 94% 43% / 0.08), transparent)",
            }}
            animate={{ y: [-150, 500] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Edge highlights */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Magnetic Button with liquid effect
const MagneticButton = ({ 
  children, 
  variant = "primary",
  size = "lg",
  className = "",
  onClick 
}: { 
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const sizeClasses = size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base";

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl font-medium transition-all duration-300 ${sizeClasses} ${className}`}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Background */}
      <motion.div
        className={`absolute inset-0 ${
          variant === "primary"
            ? "bg-gradient-to-r from-primary via-primary to-accent"
            : "bg-transparent border-2 border-border"
        }`}
        animate={isHovered && variant === "primary" ? {
          background: [
            "linear-gradient(90deg, hsl(263 70% 65%), hsl(263 70% 65%), hsl(189 94% 43%))",
            "linear-gradient(90deg, hsl(189 94% 43%), hsl(263 70% 65%), hsl(263 70% 65%))",
            "linear-gradient(90deg, hsl(263 70% 65%), hsl(263 70% 65%), hsl(189 94% 43%))",
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Liquid hover effect */}
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: 2.5, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ borderRadius: "50%" }}
      />

      {/* Glow */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={isHovered ? {
            boxShadow: "0 0 40px hsl(263 70% 65% / 0.5), 0 0 80px hsl(189 94% 43% / 0.3)"
          } : {
            boxShadow: "0 0 20px hsl(263 70% 65% / 0.2)"
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <span className={`relative z-10 flex items-center justify-center gap-3 ${
        variant === "primary" ? "text-white" : "text-foreground"
      }`}>
        {children}
      </span>
    </motion.button>
  );
};

// Cinematic Section Reveal
const SectionReveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Kinetic Typography with word-by-word reveal
const KineticHeadline = ({ 
  line1, 
  line2, 
  className = "" 
}: { 
  line1: string; 
  line2: string; 
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words1 = line1.split(" ");
  const words2 = line2.split(" ");

  return (
    <div ref={ref} className={className}>
      <div className="overflow-hidden">
        {words1.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em] text-foreground"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
      <div className="overflow-hidden">
        {words2.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em] gradient-text"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: words1.length * 0.1 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

// Premium Value Card
const PremiumCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: {
  icon: typeof TrendingUp;
  title: string;
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        className="relative h-full p-8 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, hsl(240 12% 10% / 0.8), hsl(240 12% 6% / 0.9))",
          backdropFilter: "blur(20px)",
        }}
        animate={isHovered ? { y: -8 } : { y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glass border */}
        <div className="absolute inset-0 rounded-2xl border border-white/5" />
        
        {/* Top highlight */}
        <motion.div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.2), transparent)",
          }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
        />

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={isHovered ? {
            boxShadow: "0 20px 60px -10px hsl(263 70% 65% / 0.2), 0 0 40px hsl(189 94% 43% / 0.1)",
          } : {
            boxShadow: "0 10px 30px -10px hsl(0 0% 0% / 0.3)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon container */}
        <motion.div
          className="relative w-16 h-16 mb-6 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(263 70% 65% / 0.15), hsl(189 94% 43% / 0.15))",
          }}
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-8 h-8 text-primary" />
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/20 blur-xl"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          />
        </motion.div>

        <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>

        <LightSweep delay={index * 2} />
      </motion.div>
    </motion.div>
  );
};

// Stats Counter
const StatCounter = ({ 
  number, 
  label, 
  suffix = "", 
  delay 
}: { 
  number: number; 
  label: string; 
  suffix?: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= number) {
          setDisplayNumber(number);
          clearInterval(interval);
        } else {
          setDisplayNumber(Math.floor(current));
        }
      }, duration / steps);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, number, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-display font-bold gradient-text mb-2">
        {displayNumber}{suffix}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
};

// Gain Item with stagger
const GainItemPremium = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: {
  icon: typeof Target;
  title: string;
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5 items-start group"
    >
      <motion.div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg, hsl(263 70% 65% / 0.1), hsl(189 94% 43% / 0.1))",
          border: "1px solid hsl(263 70% 65% / 0.2)",
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Floating Navigation Indicator
const FloatingNavDot = ({ 
  active, 
  label, 
  onClick 
}: { 
  active: boolean; 
  label: string;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className="group flex items-center gap-3"
    whileHover={{ x: -5 }}
  >
    <motion.div
      className="w-3 h-3 rounded-full relative"
      animate={active ? {
        scale: 1,
        background: "hsl(263 70% 65%)",
        boxShadow: "0 0 15px hsl(263 70% 65% / 0.5)",
      } : {
        scale: 0.6,
        background: "hsl(240 5% 30%)",
        boxShadow: "none",
      }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="text-xs font-medium whitespace-nowrap"
      animate={active ? { opacity: 1, color: "hsl(0 0% 98%)" } : { opacity: 0.5, color: "hsl(240 5% 55%)" }}
    >
      {label}
    </motion.span>
  </motion.button>
);

const BookPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const gainsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Section scroll progress for effects
  const heroScroll = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll.scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll.scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], [0, 150]);

  const [activeSection, setActiveSection] = useState(0);
  const sections = ["Hero", "Value", "Insights", "Gains", "Get Book"];

  const scrollToSection = (index: number) => {
    const refs = [heroRef, valueRef, insightsRef, gainsRef, ctaRef];
    refs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const refs = [heroRef, valueRef, insightsRef, gainsRef, ctaRef];
      const scrollY = window.scrollY + window.innerHeight / 2;
      
      refs.forEach((ref, index) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const values = [
    { icon: TrendingUp, title: "Wealth Building Framework", description: "Learn the fundamental principles that separate wealth builders from everyone else." },
    { icon: Shield, title: "Financial Security", description: "Build an unshakeable financial foundation that protects you in any economic climate." },
    { icon: Target, title: "Goal Achievement", description: "Transform vague financial dreams into actionable, achievable milestones." },
    { icon: Lightbulb, title: "Money Mindset", description: "Rewire your relationship with money for lasting abundance and clarity." },
  ];

  const gains = [
    { icon: PieChart, title: "Budget Mastery", description: "Create a budget that actually works and sticks—no more guesswork." },
    { icon: TrendingUp, title: "Investment Clarity", description: "Understand where, when, and how to grow your money intelligently." },
    { icon: Shield, title: "Debt Freedom Blueprint", description: "Strategic approaches to eliminate debt faster than you thought possible." },
    { icon: BarChart3, title: "Passive Income Streams", description: "Build multiple income sources that work while you sleep." },
    { icon: Target, title: "Financial Goal Setting", description: "Set and achieve financial goals with proven frameworks." },
    { icon: Lightbulb, title: "Money Psychology", description: "Overcome limiting beliefs and develop a wealthy mindset." },
  ];

  return (
    <PageTransition>
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Floating Navigation */}
      <motion.nav
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {sections.map((label, i) => (
          <FloatingNavDot
            key={label}
            label={label}
            active={activeSection === i}
            onClick={() => scrollToSection(i)}
          />
        ))}
      </motion.nav>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Ambient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(263 70% 50% / 0.15), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(189 94% 43% / 0.1), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          />
        </div>

        <AmbientParticles />

        <motion.div style={{ y: heroY }} className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10"
                style={{
                  background: "linear-gradient(135deg, hsl(263 70% 65% / 0.1), hsl(189 94% 43% / 0.05))",
                  border: "1px solid hsl(263 70% 65% / 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-foreground/80">Now Available</span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-8 leading-[1.1]">
                <KineticHeadline line1="The Power of" line2="Financial Clarity" />
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-xl"
              >
                Master your money. Build lasting wealth. Achieve the financial freedom you deserve.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
              >
                <MagneticButton variant="primary" size="lg">
                  <BookOpen className="w-5 h-5" />
                  Get Your Copy
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
                <MagneticButton variant="secondary" size="lg">
                  <Play className="w-5 h-5" />
                  Preview Chapter
                </MagneticButton>
              </motion.div>
            </div>

            {/* 3D Book */}
            <div className="flex-shrink-0">
              <Book3DPremium />
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>

        <LightSweep delay={2} />
      </motion.section>

      {/* Value Section */}
      <section ref={valueRef} className="py-32 md:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why This Book
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
              <KineticHeadline line1="Transform Your" line2="Financial Future" />
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              This isn't just another finance book. It's a complete system for achieving financial clarity and building lasting wealth.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <PremiumCard key={value.title} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section ref={insightsRef} className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(189 94% 43% / 0.08), transparent 60%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <SectionReveal className="text-center mb-20">
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-accent mb-6">By The Numbers</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Key <span className="gradient-text-accent">Insights</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            <StatCounter number={150} suffix="+" label="Pages of Wisdom" delay={0} />
            <StatCounter number={7} suffix="" label="Core Principles" delay={0.2} />
            <StatCounter number={25} suffix="+" label="Actionable Strategies" delay={0.4} />
            <StatCounter number={1000} suffix="s" label="Readers Impacted" delay={0.6} />
          </div>
        </div>
      </section>

      {/* Gains Section */}
      <section ref={gainsRef} className="py-32 md:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <SectionReveal>
              <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-6">What's Inside</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                What You'll <span className="gradient-text">Gain</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                Practical frameworks and actionable insights that you can implement immediately.
              </p>

              <div className="space-y-8">
                {gains.slice(0, 3).map((gain, index) => (
                  <GainItemPremium key={gain.title} {...gain} index={index} />
                ))}
              </div>
            </SectionReveal>

            <div className="space-y-8 lg:pt-32">
              {gains.slice(3).map((gain, index) => (
                <GainItemPremium key={gain.title} {...gain} index={index + 3} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 md:py-48 relative overflow-hidden">
        {/* Cinematic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(263 70% 50% / 0.2), transparent 50%)",
              filter: "blur(100px)",
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <AmbientParticles />

        <div className="container mx-auto px-4 relative z-10">
          <SectionReveal className="max-w-4xl mx-auto text-center">
            {/* Mini book */}
            <motion.div
              animate={{ y: [0, -15, 0], rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-16"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50 blur-3xl scale-150 opacity-40" />
                <div 
                  className="relative w-40 h-56 rounded-xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, hsl(240 12% 12%), hsl(240 12% 8%))",
                    boxShadow: "0 30px 60px -15px hsl(0 0% 0% / 0.5), 0 0 40px hsl(263 70% 65% / 0.2)",
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-display text-foreground/80">The Power of</p>
                    <p className="text-sm font-display font-bold gradient-text">Financial Clarity</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
              <KineticHeadline line1="Ready to Transform" line2="Your Financial Life?" />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands who have already taken control of their finances. Your journey to financial clarity starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton 
                variant="primary" 
                size="lg" 
                className="text-xl px-12 py-6"
                onClick={() => window.open('https://amzn.in/d/hOZ63oS', '_blank')}
              >
                <BookOpen className="w-6 h-6" />
                Get The Book Now
                <ArrowRight className="w-6 h-6" />
              </MagneticButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center justify-center gap-10 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Instant Access
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Lifetime Updates
              </span>
            </motion.div>
          </SectionReveal>
        </div>

        <LightSweep delay={1} />
      </section>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default BookPage;
