import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const roadmap = [
  {
    title: "Scale Cyvance Security",
    excerpt:
      "Building a cybersecurity company that businesses trust. Goal: 50+ enterprise clients and a team of security experts by 2026.",
    date: "2025-2026",
    readTime: "Next 12-18 months",
    category: "Cybersecurity",
  },
  {
    title: "Grow Fusion Interpreter to 100+ Clients",
    excerpt:
      "Scaling performance marketing agency with proven systems. Targeting 100+ active campaigns and expanding service offerings.",
    date: "2025",
    readTime: "Next 12 months",
    category: "Marketing",
  },
  {
    title: "Launch YouTube Channel to 10K Subscribers",
    excerpt:
      "Sharing what I learn—cybersecurity, marketing, building startups. Educational content for founders and developers starting out.",
    date: "2025-2026",
    readTime: "Ongoing",
    category: "Content",
  },
];

export const Blog = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="roadmap" ref={ref} className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            What's <span className="gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Next</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Building in public—here's what I'm working on and where I'm headed
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8 max-w-6xl mx-auto">
          {roadmap.map((item, index) => (
            <motion.article
              key={item.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all border border-border/30 group"
            >
              <div className="text-sm text-primary font-bold mb-2 tracking-wider uppercase">{item.category}</div>
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{item.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{item.readTime}</span>
                </div>
                <div className="font-semibold text-accent">{item.date}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
