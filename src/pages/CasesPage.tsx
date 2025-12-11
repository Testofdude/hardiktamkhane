import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, X, Code, Shield, Megaphone, Rocket } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitLines } from "@/components/effects/CircuitLines";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { HolographicOverlay } from "@/components/effects/HolographicOverlay";
import { CyberCard } from "@/components/ui/CyberCard";

const categories = ["All", "Web Dev", "Security", "Marketing", "Startup"];

const cases = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Dev",
    description: "Full-stack e-commerce solution with real-time inventory management and payment integration.",
    image: "/placeholder.svg",
    icon: Code,
    stats: { metric: "300%", label: "Sales increase" },
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: 2,
    title: "Security Audit - FinTech",
    category: "Security",
    description: "Comprehensive security assessment for a financial technology startup handling sensitive data.",
    image: "/placeholder.svg",
    icon: Shield,
    stats: { metric: "47", label: "Vulnerabilities fixed" },
    tech: ["Penetration Testing", "OWASP", "Compliance"],
  },
  {
    id: 3,
    title: "Growth Campaign - SaaS",
    category: "Marketing",
    description: "Multi-channel growth strategy that scaled user acquisition by 5x in 6 months.",
    image: "/placeholder.svg",
    icon: Megaphone,
    stats: { metric: "5x", label: "User growth" },
    tech: ["Google Ads", "SEO", "Content Marketing"],
  },
  {
    id: 4,
    title: "Fusion Interpreter",
    category: "Startup",
    description: "Co-founded and built an AI-powered interpretation platform from scratch.",
    image: "/placeholder.svg",
    icon: Rocket,
    stats: { metric: "1000+", label: "Users served" },
    tech: ["React", "AI/ML", "WebRTC", "Node.js"],
  },
  {
    id: 5,
    title: "Enterprise Dashboard",
    category: "Web Dev",
    description: "Real-time analytics dashboard for enterprise resource monitoring.",
    image: "/placeholder.svg",
    icon: Code,
    stats: { metric: "99.9%", label: "Uptime" },
    tech: ["React", "D3.js", "GraphQL", "AWS"],
  },
  {
    id: 6,
    title: "Cyvance Security Platform",
    category: "Startup",
    description: "Building the next-generation cybersecurity company for modern threats.",
    image: "/placeholder.svg",
    icon: Shield,
    stats: { metric: "Active", label: "Development" },
    tech: ["Security", "AI", "Cloud", "Enterprise"],
  },
];

const CasesPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [casesRef, casesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  const filteredCases = activeCategory === "All" 
    ? cases 
    : cases.filter(c => c.category === activeCategory);

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 mesh-gradient opacity-40" />
            <GlowOrb size={500} color="primary" className="-top-40 -left-40" />
            <GlowOrb size={400} color="accent" className="bottom-0 -right-40" />
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
                SYSTEM://CASES/ARCHIVE
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Case <span className="gradient-text">Studies</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real projects. Real clients. Real results—not just case studies. 
                Explore the work that defines my approach.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter and Cases */}
        <section ref={casesRef} className="py-20 relative">
          <div className="container mx-auto px-6">
            {/* Category Filter */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={casesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeCategory === category 
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Cases Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredCases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.id}
                    layout
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CyberCard 
                      className="cursor-pointer group"
                      onClick={() => setSelectedCase(caseItem)}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <caseItem.icon className="w-16 h-16 text-foreground/20" />
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 rounded-full text-xs font-mono bg-background/80 backdrop-blur-sm">
                            {caseItem.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-display font-bold mb-2 group-hover:text-accent transition-colors">
                          {caseItem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {caseItem.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/30">
                          <div>
                            <div className="text-xl font-display font-bold gradient-text">
                              {caseItem.stats.metric}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {caseItem.stats.label}
                            </div>
                          </div>
                          <motion.div
                            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center"
                            whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--accent) / 0.2)" }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </CyberCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Case Detail Modal */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
              onClick={() => setSelectedCase(null)}
            >
              <motion.div
                initial={shouldReduceMotion ? {} : { scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <selectedCase.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-accent">{selectedCase.category}</span>
                      <h2 className="text-2xl font-display font-bold">{selectedCase.title}</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6">{selectedCase.description}</p>

                {/* Stats */}
                <div className="glass p-4 rounded-xl mb-6">
                  <div className="text-3xl font-display font-bold gradient-text mb-1">
                    {selectedCase.stats.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedCase.stats.label}</div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-mono text-muted-foreground mb-3">TECH_STACK</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full text-sm bg-secondary/50 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default CasesPage;
