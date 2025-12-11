import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Rocket, BookOpen, Code, Shield, Award } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitLines } from "@/components/effects/CircuitLines";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { HolographicOverlay } from "@/components/effects/HolographicOverlay";
import { CyberCard } from "@/components/ui/CyberCard";

const timeline = [
  {
    year: "Age 10",
    title: "Started Coding",
    description: "Wrote my first line of code. The spark that started everything.",
    icon: Code,
    color: "accent",
  },
  {
    year: "Age 16",
    title: "Published First Book",
    description: "Authored and published a book while still in school. Words became another form of code.",
    icon: BookOpen,
    color: "primary",
  },
  {
    year: "2023",
    title: "Founded Fusion Interpreter",
    description: "Launched my first startup—bridging language gaps with technology.",
    icon: Rocket,
    color: "accent",
  },
  {
    year: "2024",
    title: "Founded Cyvance Security",
    description: "Started a cybersecurity company to protect the digital frontier.",
    icon: Shield,
    color: "primary",
  },
  {
    year: "2024",
    title: "35+ Projects Shipped",
    description: "Consistent execution across web development, marketing, and security.",
    icon: Award,
    color: "accent",
  },
];

const values = [
  {
    title: "Build > Talk",
    description: "Execution over ideas. Ship fast, iterate faster.",
  },
  {
    title: "Security First",
    description: "Every system is a fortress waiting to be built.",
  },
  {
    title: "Compound Growth",
    description: "Small daily improvements lead to exponential results.",
  },
  {
    title: "Learn in Public",
    description: "Share the journey. Help others climb.",
  },
];

const AboutPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 mesh-gradient opacity-40" />
            <GlowOrb size={500} color="primary" className="-top-40 -right-40" />
            <GlowOrb size={400} color="accent" className="bottom-0 -left-40" />
          </div>
          <CircuitLines variant="section" />
          <HolographicOverlay intensity="subtle" />

          <div className="container mx-auto px-6">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <span className="text-xs font-mono text-accent tracking-wider mb-4 block">
                SYSTEM://ABOUT/FOUNDER
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                <span className="gradient-text">Hardik Tamkhane</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                From publishing my first book to founding two startups—driven by 
                execution, not just ideas. I build at the intersection of code, 
                security, and growth.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  India
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  Building since Age 10
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <CyberCard className="p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold mb-2">The Mission</h2>
                  <p className="text-muted-foreground">What drives everything I build</p>
                </div>
              </div>
              <p className="text-lg text-foreground/90 leading-relaxed">
                "To build technology that protects, connects, and scales—creating 
                systems that outlast trends and solve real problems. Every line of 
                code, every security protocol, every marketing campaign is a step 
                toward that vision."
              </p>
            </CyberCard>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 circuit-bg opacity-20" />
          </div>

          <div className="container mx-auto px-6">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-mono text-accent tracking-wider mb-4 block">
                TIMELINE.EXE
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                The <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Key milestones that shaped my path as a founder and builder.
              </p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/50" />

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow z-10" />

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <CyberCard className="p-6">
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.color === "accent" 
                            ? "bg-accent/20" 
                            : "bg-primary/20"
                        }`}>
                          <item.icon className={`w-5 h-5 ${
                            item.color === "accent" ? "text-accent" : "text-primary"
                          }`} />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{item.year}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CyberCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-20 relative">
          <div className="absolute inset-0 -z-10">
            <GlowOrb size={400} color="accent" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="container mx-auto px-6">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-mono text-accent tracking-wider mb-4 block">
                CORE_VALUES.CONFIG
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Operating <span className="gradient-text">Principles</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CyberCard className="p-6 h-full">
                    <div className="text-3xl font-display font-bold gradient-text mb-3">
                      0{index + 1}
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CyberCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default AboutPage;
