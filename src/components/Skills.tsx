import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Palette, LineChart, Shield, Wrench } from "lucide-react";

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
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Skills & <span className="gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Technical depth across development, marketing, and security—built through real projects, not just tutorials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all border border-border/30 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 shadow-lg">
                  <category.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="relative pl-4 border-l-2 border-primary/20 group-hover:border-primary/40 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
                      <span className="font-semibold text-sm">{skill.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{skill.proof}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
