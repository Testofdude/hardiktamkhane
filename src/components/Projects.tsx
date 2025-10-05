import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";

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
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Featured <span className="gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects. Real clients. Real results—not just case studies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="glass rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all border border-border/30">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{project.description}</p>
                  <p className="text-sm text-accent font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {project.impact}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold mb-2">Problem & Solution</h4>
                    <p className="text-muted-foreground">{selectedProject.details}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">My Role</h4>
                    <p className="text-muted-foreground">{selectedProject.role}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Results & Impact</h4>
                    <p className="text-accent font-medium">{selectedProject.impact}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
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
