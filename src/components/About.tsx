import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, BookOpen, Rocket, TrendingUp, Sparkles, Mail } from "lucide-react";
import { CircuitLines } from "./effects/CircuitLines";
import { GlowOrb } from "./effects/GlowOrb";
import { ParallaxLayer } from "./effects/ParallaxLayer";
import { HolographicOverlay } from "./effects/HolographicOverlay";
import { StatusIndicator } from "./effects/StatusIndicator";
import { TechButton } from "./ui/TechButton";

const timeline = [
  {
    year: "Age 11",
    title: "Code Initiated",
    description: "Started my programming journey by learning core coding fundamentals and building early digital projects. This is where problem-solving became instinct, not optional.",
    icon: Sparkles,
  },
  {
    year: "Age 12",
    title: "Finance & Crypto Deep Dive",
    description: "Entered the world of finance, cryptocurrency markets, and price action. Studied market psychology, risk, and structure to understand how money actually moves.",
    icon: TrendingUp,
  },
  {
    year: "Age 13",
    title: "Marketing & Entrepreneurship",
    description: "Learned modern marketing systems and founded Fusion Interpreter, a performance marketing agency focused on real outcomes, not vanity metrics.",
    icon: Rocket,
  },
  {
    year: "Age 14",
    title: "Cybersecurity Path Activated",
    description: "Began formal cybersecurity training with focus on risk assessment, penetration testing, and cloud security—learning how systems fail, not just how they run.",
    icon: BookOpen,
  },
  {
    year: "Age 14",
    title: "Cyvance Security Founded",
    description: "Launched Cyvance Security, a cybersecurity firm focused on proactive defense, threat analysis, and digital resilience.",
    icon: Rocket,
  },
  {
    year: "Age 14",
    title: "ArcNet Newsletter Launched",
    description: "Started ArcNet, a newsletter breaking down technology, cybersecurity, and the future of digital systems in a clear, signal-over-noise format.",
    icon: BookOpen,
  },
  {
    year: "Age 14",
    title: "SynthaXia AI Released",
    description: "Launched SynthaXia AI, an AI-powered tool designed to simplify workflows and push intelligent automation forward.",
    icon: Sparkles,
  },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "35+", label: "Projects Built" },
  { value: "2", label: "Published Books" },
  { value: "2", label: "Startups" },
];

export const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 circuit-bg opacity-20" />
      </div>

      {/* Animated glow orbs */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 -z-10">
        <GlowOrb size={500} color="primary" className="-top-20 -right-40" delay={0} />
        <GlowOrb size={400} color="accent" className="bottom-1/4 -left-40" delay={2} />
      </ParallaxLayer>

      {/* Circuit lines overlay */}
      <CircuitLines variant="section" />

      {/* Holographic overlay */}
      <HolographicOverlay intensity="subtle" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Status bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <StatusIndicator status="online" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider">
              PROFILE LOADED • DATA VERIFIED
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            About <span className="gradient-text neon-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From publishing my first book to founding two startups—driven by execution, not just ideas
          </p>
        </motion.div>

        {/* Two-Column Layout: Story + Visual */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 gradient-text">
                Building, Shipping, Scaling
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I started coding at 10, published my first finance book at 13, and launched my first startup before turning 15. 
                Not because I had it all figured out—but because I believed execution beats perfection.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Today, I run <span className="text-accent font-semibold">Fusion Interpreter</span>, a performance marketing 
                agency helping brands scale with data-driven Meta and LinkedIn campaigns. And I'm building{" "}
                <span className="text-primary font-semibold">Cyvance Security</span>, where we solve real cybersecurity 
                challenges—penetration testing, risk assessment, and cloud infrastructure protection for businesses that can't afford breaches.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I've shipped 35+ projects, earned certifications in cybersecurity and digital marketing, and built systems that work at scale. 
                My roadmap? Scale Cyvance into a trusted security partner, grow Fusion Interpreter to serve 100+ clients, and share what I learn 
                on YouTube to help the next generation of builders get started faster than I did.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <TechButton
                variant="primary"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </TechButton>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Visual */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
                className="cyber-card glass-card rounded-2xl p-8 text-center relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-display font-bold gradient-text neon-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono tracking-wide">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 inline-flex items-center gap-3">
              <Calendar className="w-8 h-8 text-accent" />
              <span className="gradient-text">My Journey</span>
            </h3>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 10 }}
                  className="cyber-card glass-card rounded-2xl p-6 md:p-8 group relative overflow-hidden md:ml-12"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Timeline dot */}
                  <div className="absolute -left-[3.25rem] top-8 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background hidden md:flex items-center justify-center shadow-lg shadow-primary/50">
                    <div className="w-2 h-2 rounded-full bg-background" />
                  </div>

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 shadow-lg">
                        <item.icon className="w-7 h-7 text-accent" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-mono text-accent mb-1 tracking-wider">{item.year}</div>
                      <h4 className="text-lg md:text-xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
