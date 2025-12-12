import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, TrendingUp, Shield, Target, Lightbulb, ChevronDown, Sparkles, DollarSign, PieChart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TechButton } from "@/components/ui/TechButton";

// Floating 3D Book Component
const Book3D = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setRotation({ x: -y, y: x });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <motion.div
      className="relative w-64 h-80 md:w-80 md:h-96 perspective-1000"
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {/* Book shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl scale-110 opacity-40" />
      
      {/* Book cover */}
      <motion.div
        className="relative w-full h-full rounded-lg overflow-hidden transform-style-preserve-3d"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-primary/80 to-primary transform -translate-x-1/2 rounded-l-sm" 
          style={{ transform: "rotateY(-30deg) translateX(-8px)" }} />
        
        {/* Book front cover */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-secondary border border-border/30 rounded-lg overflow-hidden">
          {/* Cover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          
          {/* Cover content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              animate={{ boxShadow: ["0 0 20px hsl(263 70% 65% / 0.3)", "0 0 40px hsl(263 70% 65% / 0.5)", "0 0 20px hsl(263 70% 65% / 0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <DollarSign className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            
            <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-2">The Power of</h3>
            <h2 className="text-xl md:text-2xl font-display font-bold gradient-text mb-4">Financial Clarity</h2>
            
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mb-4" />
            
            <p className="text-xs text-muted-foreground">By Hardik Tamkhane</p>
          </div>
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 opacity-50" />
          
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-accent/10 to-transparent pointer-events-none"
            animate={{ y: [-100, 400] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Book edge shine */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/30 via-primary/50 to-accent/30" />
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-accent/30 via-primary/50 to-accent/30" />
      </motion.div>
    </motion.div>
  );
};

// Particle System
const ParticleField = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Kinetic Typography Component
const KineticText = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Value Card Component
const ValueCard = ({ icon: Icon, title, description, delay }: {
  icon: typeof TrendingUp;
  title: string;
  description: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="cyber-card p-6 h-full transition-all duration-500 group-hover:border-primary/30">
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-xl" />
        
        {/* Icon */}
        <motion.div
          className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 border border-primary/20"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className="w-7 h-7 text-primary" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Insight Card with Data Visualization
const InsightCard = ({ number, label, icon: Icon, delay }: {
  number: string;
  label: string;
  icon: typeof BarChart3;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="glass-card p-6 rounded-xl text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <Icon className="w-8 h-8 text-accent mx-auto mb-3 relative z-10" />
        
        <motion.div
          className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1 relative z-10"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          {number}
        </motion.div>
        
        <p className="text-sm text-muted-foreground relative z-10">{label}</p>
      </div>
    </motion.div>
  );
};

// Gain Item Component
const GainItem = ({ icon: Icon, title, description, index }: {
  icon: typeof Target;
  title: string;
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex gap-4 items-start group"
    >
      <motion.div
        className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20"
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <div>
        <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const BookPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 mesh-gradient" />
        <ParticleField />
        
        {/* Atmospheric lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Circuit overlay */}
        <div className="absolute inset-0 circuit-bg opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-primary/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Now Available</span>
              </motion.div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-tight">
                <KineticText text="The Power of" className="block text-foreground" />
                <KineticText text="Financial Clarity" className="block gradient-text" />
              </h1>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                Master your money. Build lasting wealth. Achieve the financial freedom you deserve.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <TechButton variant="primary" size="lg">
                  <BookOpen className="w-5 h-5" />
                  Get Your Copy
                </TechButton>
                <TechButton variant="outline" size="lg">
                  Preview Chapter
                  <ArrowRight className="w-5 h-5" />
                </TechButton>
              </motion.div>
            </div>
            
            {/* 3D Book */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <Book3D />
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs uppercase tracking-widest">Discover More</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Value Proposition Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-widest text-primary mb-4 block">Why This Book</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                Transform Your <span className="gradient-text">Financial Future</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                This isn't just another finance book. It's a complete system for achieving financial clarity and building lasting wealth.
              </p>
            </motion.div>
          </div>
          
          {/* Value cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard key={value.title} {...value} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Insights Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-20" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm uppercase tracking-widest text-accent mb-4 block">By The Numbers</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Key <span className="gradient-text-accent">Insights</span>
              </h2>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <InsightCard number="150+" label="Pages of Wisdom" icon={BookOpen} delay={0} />
            <InsightCard number="7" label="Core Principles" icon={Target} delay={0.1} />
            <InsightCard number="25+" label="Actionable Strategies" icon={Lightbulb} delay={0.2} />
            <InsightCard number="∞" label="Value Created" icon={TrendingUp} delay={0.3} />
          </div>
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-sm uppercase tracking-widest text-primary mb-4 block">What's Inside</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                  What You'll <span className="gradient-text">Gain</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Practical frameworks and actionable insights that you can implement immediately.
                </p>
              </motion.div>
              
              <div className="space-y-6">
                {gains.slice(0, 3).map((gain, index) => (
                  <GainItem key={gain.title} {...gain} index={index} />
                ))}
              </div>
            </div>
            
            {/* Right: More gains */}
            <div className="space-y-6 lg:pt-20">
              {gains.slice(3).map((gain, index) => (
                <GainItem key={gain.title} {...gain} index={index + 3} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Floating book mockup */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl scale-150 opacity-50" />
                <div className="relative w-48 h-64 rounded-lg glass-card border border-primary/30 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-xs font-display font-bold text-foreground">The Power of</p>
                    <p className="text-sm font-display font-bold gradient-text">Financial Clarity</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Financial Life</span>?
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands who have already taken control of their finances. Your journey to financial clarity starts here.
            </p>
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <button className="relative group px-10 py-5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_hsl(263_70%_65%_/_0.5)]">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-glow/30 to-accent-glow/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Get The Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                Instant Access
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Lifetime Updates
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookPage;
