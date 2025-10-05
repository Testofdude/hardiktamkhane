import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, BookOpen, Rocket, TrendingUp, Sparkles, Download, Mail } from "lucide-react";
import { Button } from "./ui/button";

const timeline = [
  {
    year: "Class 5",
    title: "Became a Coder",
    description: "Started my programming journey, learning the fundamentals of coding and developing a passion for building digital solutions",
    icon: Sparkles,
  },
  {
    year: "Class 6",
    title: "Finance & Crypto Enthusiast",
    description: "Began learning finance, cryptocurrency trading, and price action analysis to understand market dynamics",
    icon: TrendingUp,
  },
  {
    year: "Class 7",
    title: "Marketing & Entrepreneurship",
    description: "Started learning marketing strategies and founded Fusion Interpreter, a performance marketing agency",
    icon: Rocket,
  },
  {
    year: "Class 8",
    title: "Cybersecurity Journey",
    description: "Embarked on cybersecurity path, focusing on risk assessment, penetration testing, and cloud security",
    icon: BookOpen,
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
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            About <span className="gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
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
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Building, Shipping, Scaling
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I started coding at 10, published my first finance book at 13, and launched my first startup before turning 15. 
                Not because I had it all figured out—but because I believed execution beats perfection.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Today, I run <span className="text-foreground font-semibold">Fusion Interpreter</span>, a performance marketing 
                agency helping brands scale with data-driven Meta and LinkedIn campaigns. And I'm building{" "}
                <span className="text-foreground font-semibold">Cyvance Security</span>, where we solve real cybersecurity 
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto rounded-full"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  asChild
                >
                  <a href="#contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </a>
                </Button>
              </motion.div>
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all border border-border/30 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-display font-bold gradient-text bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold tracking-wide">{stat.label}</div>
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
              <Calendar className="w-8 h-8 text-primary" />
              My Journey
            </h3>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="glass rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all border border-border/30 group relative overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background hidden md:block shadow-lg shadow-primary/50" />

                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 shadow-lg">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 relative z-10">
                    <div className="text-sm font-bold text-accent mb-2 tracking-wider uppercase">{item.year}</div>
                    <h4 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
