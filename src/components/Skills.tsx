import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, LineChart, Shield, Wrench, Cpu } from "lucide-react";
import { CircuitLines } from "./effects/CircuitLines";
import { GlowOrb } from "./effects/GlowOrb";
import { ParallaxLayer } from "./effects/ParallaxLayer";
import { HolographicOverlay } from "./effects/HolographicOverlay";
import { StatusIndicator } from "./effects/StatusIndicator";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "React & Next.js", proof: "35+ production apps shipped to real users" },
      { name: "TypeScript", proof: "Type-safe architectures across all projects" },
      { name: "Tailwind CSS", proof: "Custom design systems for client brands" },
      { name: "Framer Motion", proof: "High-performance animations for premium UX" },
    ],
  },
  {
    title: "Digital Marketing",
    icon: LineChart,
    skills: [
      { name: "Meta Advertising", proof: "Managing multi-client campaigns at Fusion Interpreter" },
      { name: "LinkedIn Ads", proof: "B2B lead generation and conversion optimization" },
      { name: "Brand Strategy", proof: "Positioning brands for measurable growth" },
      { name: "Analytics & Reporting", proof: "Data-driven decisions backed by metrics" },
    ],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    skills: [
      { name: "Risk Assessment", proof: "Securing client infrastructure at Cyvance" },
      { name: "Penetration Testing", proof: "Identifying vulnerabilities before attackers do" },
      { name: "Cloud Security", proof: "AWS & cloud-native security implementation" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", proof: "Managing codebases across multiple projects" },
      { name: "Figma", proof: "Designing before building—every time" },
      { name: "Linux & VS Code", proof: "Development environment optimized for speed" },
      { name: "Make.com", proof: "Automating workflows to scale operations" },
    ],
  },
];

export const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 circuit-bg opacity-20" />
      </div>

      {/* Animated glow orbs */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 -z-10">
        <GlowOrb size={450} color="accent" className="top-1/3 -right-40" delay={1} />
        <GlowOrb size={350} color="primary" className="bottom-0 -left-20" delay={3} />
      </ParallaxLayer>

      {/* Circuit lines overlay */}
      <CircuitLines variant="section" />

      {/* Holographic overlay */}
      <HolographicOverlay intensity="subtle" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
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
              CAPABILITIES LOADED • SKILLS INDEXED
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Skills & <span className="gradient-text neon-text">Expertise</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Technical depth across development, marketing, and security—built through real projects, not just tutorials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
              className="cyber-card glass-card rounded-2xl p-6 md:p-8 group relative overflow-hidden"
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-accent/50 group-hover:border-accent transition-colors" />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
              </div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 shadow-lg shadow-primary/20">
                  <category.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold group-hover:text-accent transition-colors">{category.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Cpu className="w-3 h-3 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">{category.skills.length} modules</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name} 
                    className="relative pl-4 border-l-2 border-primary/30 group-hover:border-accent/50 transition-all"
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50 animate-pulse" />
                      <span className="font-semibold text-sm text-foreground">{skill.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{skill.proof}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
