import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, BookOpen, Trophy, Sparkles, TrendingUp, Coins, Shield, LineChart } from "lucide-react";

const achievements = [
  {
    icon: Sparkles,
    title: "Started Coding",
    description: "First lines of code—building the foundation for everything to come",
    year: "Age 10",
  },
  {
    icon: TrendingUp,
    title: "Dove Into Finance & Crypto",
    description: "Studied investing, trading, and blockchain—learning how markets really work",
    year: "Age 11",
  },
  {
    icon: Trophy,
    title: "Founded Fusion Interpreter",
    description: "Launched performance marketing agency—now serving multiple clients with data-driven campaigns",
    year: "Age 13",
  },
  {
    icon: LineChart,
    title: "Certified Performance Marketer",
    description: "Earned digital marketing certification to formalize what I was already doing",
    year: "Age 13",
  },
  {
    icon: BookOpen,
    title: "Published Finance Book",
    description: "Authored and published a book on investing, trading, and financial literacy",
    year: "Age 14",
  },
  {
    icon: Shield,
    title: "Certified in Cybersecurity",
    description: "Became a certified cybersecurity expert—penetration testing and cloud security",
    year: "Age 14",
  },
  {
    icon: Award,
    title: "Founded Cyvance Security",
    description: "Launched cybersecurity firm focused on real-world risk assessment and penetration testing",
    year: "Age 14",
  },
  {
    icon: Coins,
    title: "35+ Projects Shipped",
    description: "From MVPs to production apps—each one a lesson in building, shipping, and iterating",
    year: "Ongoing",
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
            Milestones built on action, not age—proof that execution matters more than experience
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
