import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, BookOpen, Trophy, Sparkles } from "lucide-react";

const achievements = [
  {
    icon: Sparkles,
    title: "Started IT Experience",
    description: "Began journey in information technology and programming",
    year: "Class 5th",
  },
  {
    icon: Trophy,
    title: "Founded Fusion Interpreter",
    description: "Performance marketing agency specializing in Meta & LinkedIn ads",
    year: "Class 8th",
  },
  {
    icon: BookOpen,
    title: "Published Author",
    description: "Published finance book covering investing and trading",
    year: "Class 8th",
  },
  {
    icon: Award,
    title: "Founded Cyvance Security",
    description: "Launched cybersecurity solutions company",
    year: "Class 8th",
  },
];

export const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="achievements" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Achievements & <span className="gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Milestones</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Key moments that shaped my journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all border border-border/30 group"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 shadow-lg">
                <achievement.icon className="w-10 h-10 text-primary" />
              </div>
              <div className="text-sm font-bold text-accent mb-3 tracking-wider uppercase">{achievement.year}</div>
              <h3 className="font-display font-bold text-lg mb-3">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
