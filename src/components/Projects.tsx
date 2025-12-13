import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Layers } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { CircuitLines } from "./effects/CircuitLines";
import { GlowOrb } from "./effects/GlowOrb";
import { ParallaxLayer } from "./effects/ParallaxLayer";
import { HolographicOverlay } from "./effects/HolographicOverlay";
import { StatusIndicator } from "./effects/StatusIndicator";
import { TechButton } from "./ui/TechButton";

const projects = [
  {
    id: 1,
    title: "Cyvance Security",
    description: "Cybersecurity solutions platform focused on risk assessment and threat detection",
    impact: "Helping organizations identify vulnerabilities and strengthen security posture",
    role: "Security Consultant & Developer",
    tags: ["Cybersecurity", "Risk Assessment", "Penetration Testing", "Cloud Security"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    details: "Cyvance Security provides comprehensive cybersecurity solutions including risk assessment, penetration testing, and cloud security implementation. The platform helps organizations identify vulnerabilities, assess threats, and implement robust security measures to protect their digital assets and infrastructure.",
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Fusion Interpreter",
    description: "Performance marketing agency platform with campaign management & analytics",
    impact: "Serving multiple clients with data-driven Meta & LinkedIn campaigns",
    role: "Founder & Lead Developer",
    tags: ["React", "Next.js", "Analytics", "Marketing"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    details: "Built the complete digital presence for Fusion Interpreter, a performance marketing agency specializing in Meta marketing and LinkedIn advertising. The platform includes campaign management tools, analytics dashboards, and client reporting systems to deliver measurable results.",
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Luxury Perfume E-Commerce",
    description: "Premium perfume website with stunning transitions and interactive effects",
    impact: "Engaging user experience with smooth animations and modern design",
    role: "Full-Stack Developer & Designer",
    tags: ["Next.js", "Framer Motion", "Tailwind", "E-Commerce"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    details: "Designed and developed a high-end e-commerce website for a luxury perfume brand. Features include smooth page transitions, interactive product showcases, parallax effects, and an elegant checkout experience. Focused on creating a premium feel that matches the brand identity.",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Stock Trading Signal Bot",
    description: "Automated trading signals using SMA logic with Telegram integration",
    impact: "Real-time market analysis and instant alerts for trading opportunities",
    role: "Developer & Algorithm Designer",
    tags: ["Python", "Trading", "Telegram API", "Automation"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    details: "Created an automated stock trading signal bot that analyzes market data using Simple Moving Average (SMA) logic to identify potential trading opportunities. The bot sends real-time alerts via Telegram, helping traders make informed decisions based on technical indicators.",
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Finance Education Book",
    description: "Comprehensive guide covering investing, trading, and financial literacy",
    impact: "Published in 2024, educating readers on financial fundamentals",
    role: "Author",
    tags: ["Finance", "Education", "Writing", "Marketing"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    details: "Authored and published a finance book covering essential topics including investing basics, trading strategies, compound interest principles, and marketing fundamentals. Written to make financial concepts accessible and engaging for a wide audience.",
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Educational YouTube Channel",
    description: "Creating educational content for aspiring developers and marketers",
    impact: "Growing community of 50+ subscribers with engaging tutorials",
    role: "Content Creator & Educator",
    tags: ["YouTube", "Education", "Content", "Community"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    details: "Building an educational YouTube channel focused on web development, digital marketing, and entrepreneurship. Creating practical tutorials, case studies, and insights to help others learn and grow in the tech and marketing space.",
    link: "#",
    github: "#",
  },
];

export const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 circuit-bg opacity-20" />
      </div>

      {/* Animated glow orbs */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 -z-10">
        <GlowOrb size={500} color="primary" className="top-1/4 -right-40" delay={0} />
        <GlowOrb size={400} color="accent" className="bottom-1/3 -left-40" delay={2} />
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
              PORTFOLIO ACTIVE • {projects.length} PROJECTS LOADED
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Featured <span className="gradient-text neon-text">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects. Real clients. Real results—not just case studies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="cyber-card glass-card rounded-2xl overflow-hidden relative">
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-20">
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-accent/50 group-hover:border-accent transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden z-20">
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
                </div>

                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Scanline effect on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100"
                    animate={shouldReduceMotion ? {} : { y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-accent/30">
                      <ExternalLink className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono text-muted-foreground">{project.role}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed text-sm md:text-base">{project.description}</p>
                  <p className="text-sm text-accent font-mono mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    {project.impact}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-mono text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="px-3 py-1 bg-accent/10 text-accent border-accent/20">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass border-border/50">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display gradient-text">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-accent font-mono text-sm">// PROBLEM & SOLUTION</h4>
                    <p className="text-muted-foreground">{selectedProject.details}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-accent font-mono text-sm">// MY ROLE</h4>
                    <p className="text-muted-foreground">{selectedProject.role}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-accent font-mono text-sm">// RESULTS & IMPACT</h4>
                    <p className="text-primary font-medium">{selectedProject.impact}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-accent font-mono text-sm">// TECH STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} className="bg-primary/20 text-primary border-primary/30">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
