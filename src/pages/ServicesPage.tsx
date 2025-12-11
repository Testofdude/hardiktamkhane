import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Shield, Megaphone, Rocket, Zap, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitLines } from "@/components/effects/CircuitLines";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { HolographicOverlay } from "@/components/effects/HolographicOverlay";
import { CyberCard } from "@/components/ui/CyberCard";
import { TechButton } from "@/components/ui/TechButton";

const services = [
  {
    icon: Code,
    title: "Web Development",
    subtitle: "Full-Stack Solutions",
    description: "Custom web applications built with modern frameworks. From MVP to scale. React, TypeScript, Node.js, and cloud infrastructure.",
    features: ["Custom Web Apps", "API Development", "Cloud Architecture", "Performance Optimization"],
    color: "primary",
    stats: { projects: "35+", satisfaction: "100%" },
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    subtitle: "Digital Defense",
    description: "Comprehensive security solutions for your digital assets. Penetration testing, security audits, and threat mitigation strategies.",
    features: ["Security Audits", "Penetration Testing", "Threat Analysis", "Compliance"],
    color: "accent",
    stats: { assessments: "50+", vulnerabilities: "200+" },
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    subtitle: "Growth Engineering",
    description: "Data-driven marketing strategies that convert. Performance marketing, SEO, and growth hacking for startups and enterprises.",
    features: ["Performance Marketing", "SEO & Content", "Analytics", "Growth Strategy"],
    color: "primary",
    stats: { campaigns: "100+", roi: "300%" },
  },
  {
    icon: Rocket,
    title: "Startup Consulting",
    subtitle: "Launch Acceleration",
    description: "From idea to execution. Technical guidance, MVP development, and go-to-market strategy for early-stage startups.",
    features: ["MVP Strategy", "Technical Advisory", "Go-to-Market", "Investor Prep"],
    color: "accent",
    stats: { startups: "10+", raised: "$1M+" },
  },
];

const process = [
  { step: "01", title: "Discovery", description: "Understanding your vision, goals, and challenges" },
  { step: "02", title: "Strategy", description: "Crafting a roadmap with clear milestones" },
  { step: "03", title: "Execution", description: "Building with precision and agility" },
  { step: "04", title: "Launch", description: "Deploying and optimizing for success" },
];

const ServicesPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 mesh-gradient opacity-40" />
            <GlowOrb size={500} color="accent" className="-top-40 -right-40" />
            <GlowOrb size={400} color="primary" className="bottom-0 -left-40" />
          </div>
          <CircuitLines variant="section" />
          <HolographicOverlay intensity="subtle" />

          <div className="container mx-auto px-6">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-xs font-mono text-accent tracking-wider mb-4 block">
                SYSTEM://SERVICES/CATALOG
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                What I <span className="gradient-text">Build</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                End-to-end solutions for modern businesses. From code to security 
                to growth—everything you need to scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={servicesRef} className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CyberCard className="p-8 h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          service.color === "accent" 
                            ? "bg-gradient-to-br from-accent/20 to-accent/5" 
                            : "bg-gradient-to-br from-primary/20 to-primary/5"
                        }`}>
                          <service.icon className={`w-7 h-7 ${
                            service.color === "accent" ? "text-accent" : "text-primary"
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold">{service.title}</h3>
                          <p className="text-xs font-mono text-muted-foreground">{service.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Zap className="w-3 h-3 text-accent" />
                          <span className="text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 pt-4 border-t border-border/30">
                      {Object.entries(service.stats).map(([key, value], i) => (
                        <div key={i}>
                          <div className="text-lg font-display font-bold gradient-text">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CyberCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 circuit-bg opacity-20" />
          </div>

          <div className="container mx-auto px-6">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-mono text-accent tracking-wider mb-4 block">
                WORKFLOW.PROTOCOL
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                The <span className="gradient-text">Process</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A systematic approach to delivering exceptional results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <CyberCard className="p-6 text-center h-full">
                    <div className="text-4xl font-display font-bold gradient-text mb-3">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CyberCard>
                  
                  {/* Connector arrow */}
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-accent/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <CyberCard className="p-12 text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Ready to <span className="gradient-text">Start Building</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Let's discuss your project and create something exceptional together.
              </p>
              <Link to="/contact">
                <TechButton variant="primary" size="lg">
                  Initialize Project
                  <ArrowRight className="w-5 h-5" />
                </TechButton>
              </Link>
            </CyberCard>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default ServicesPage;
