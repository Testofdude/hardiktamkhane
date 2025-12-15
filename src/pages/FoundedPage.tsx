import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitLines } from "@/components/effects/CircuitLines";
import { GlowOrb } from "@/components/effects/GlowOrb";
import bookCover from "@/assets/book-cover.png";

interface Venture {
  id: string;
  name: string;
  domain: string;
  description: string;
  impact: string[];
  status: "Live" | "Building" | "Scaling";
  link?: string;
  isExternal?: boolean;
  featured?: boolean;
}

const ventures: Venture[] = [
  {
    id: "cyvance",
    name: "Cyvance Security",
    domain: "Cybersecurity Firm",
    description:
      "Enterprise-grade cybersecurity solutions providing proactive defense and digital resilience for businesses navigating modern threat landscapes.",
    impact: ["Risk Assessment", "Penetration Testing", "Cloud Security", "Threat Intelligence"],
    status: "Live",
    link: "https://cyvance.in/",
    isExternal: true,
    featured: true,
  },
  {
    id: "fusion",
    name: "Fusion Interpreter",
    domain: "Performance Marketing Agency",
    description:
      "Data-driven marketing agency engineered for measurable growth. Every campaign optimized for conversion, not vanity metrics.",
    impact: ["Growth Systems", "Conversion Optimization", "Performance Analytics", "ROI Engineering"],
    status: "Scaling",
    link: "https://fusioninterpreter.com/",
    isExternal: true,
    featured: true,
  },
  {
    id: "synthaxia",
    name: "SynthaXia AI",
    domain: "AI Workflow Automation",
    description:
      "Intelligence layer for workflow automation. Building AI systems that integrate seamlessly into existing business processes.",
    impact: ["Workflow Automation", "AI Integration", "Process Optimization", "Custom AI Tools"],
    status: "Live",
    featured: true,
  },
  {
    id: "arcnet",
    name: "ArcNet Newsletter",
    domain: "Knowledge Network",
    description:
      "High-signal newsletter delivering curated insights on technology, cybersecurity, and the future of digital infrastructure.",
    impact: ["Tech Insights", "Security Updates", "Industry Analysis", "Trend Forecasting"],
    status: "Live",
  },
  {
    id: "book",
    name: "The Power of Financial Clarity",
    domain: "Published Author",
    description:
      "A comprehensive guide to mastering personal finance, building wealth foundations, and achieving financial independence through clarity and discipline.",
    impact: ["Financial Education", "Wealth Building", "Personal Finance", "Investment Strategy"],
    status: "Live",
    link: "/thepoweroffinancialclarity",
    isExternal: false,
    featured: true,
  },
  {
    id: "cyber-initiatives",
    name: "Cybersecurity Research",
    domain: "Security Initiatives",
    description:
      "Ongoing research and development in vulnerability assessment, ethical hacking methodologies, and defensive security frameworks.",
    impact: ["Vulnerability Research", "Ethical Hacking", "Defense Frameworks", "Security Training"],
    status: "Building",
  },
  {
    id: "marketing-systems",
    name: "Performance Marketing R&D",
    domain: "Growth Engineering",
    description:
      "Experimental marketing systems and automation tools designed to scale acquisition channels efficiently.",
    impact: ["Funnel Engineering", "Automation Systems", "Channel Optimization", "Scale Testing"],
    status: "Scaling",
  },
  {
    id: "ai-experiments",
    name: "AI Lab & Experiments",
    domain: "Applied Intelligence",
    description:
      "Hands-on exploration of practical AI applications. Building tools that solve real problems, not demos that impress investors.",
    impact: ["Practical AI", "Tool Development", "Use Case Testing", "Integration Research"],
    status: "Building",
  },
];

const VentureCard = ({ venture, index }: { venture: Venture; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const statusColors = {
    Live: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
    Building: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-500" },
    Scaling: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  };

  const handleClick = () => {
    if (venture.link) {
      if (venture.isExternal) {
        window.open(venture.link, "_blank");
      } else {
        window.location.href = venture.link;
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${venture.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onClick={venture.link ? handleClick : undefined}
        className={`relative h-full glass-card rounded-2xl p-6 md:p-8 border border-border/30 transition-all duration-500 ${
          venture.link ? "cursor-pointer hover:border-primary/40 hover:shadow-[0_0_50px_hsl(263_70%_65%_/_0.15)]" : ""
        }`}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusColors[venture.status].bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusColors[venture.status].dot} animate-pulse`} />
            <span className={`font-mono text-xs ${statusColors[venture.status].text}`}>{venture.status}</span>
          </div>
          {venture.link && (
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              {venture.isExternal ? (
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-wider mb-2">{venture.domain}</p>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {venture.name}
            </h3>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">{venture.description}</p>

          {/* Impact tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {venture.impact.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-md text-[10px] font-mono text-muted-foreground bg-secondary/50 border border-border/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const FoundedPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 relative overflow-hidden">
        {/* Background effects */}
        <CircuitLines />
        <GlowOrb color="primary" size={600} className="top-0 right-0 -translate-y-1/2 translate-x-1/3" />
        <GlowOrb color="accent" size={400} className="bottom-0 left-0 translate-y-1/2 -translate-x-1/3" />

        {/* Grain overlay */}
        <div
          className="fixed inset-0 opacity-[0.015] pointer-events-none z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="font-mono text-xs text-accent uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
                The Ecosystem
              </span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <span className="block">Things I've Founded.</span>
              <span className="block gradient-text">Systems I'm Building.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              I don't experiment casually. I build ecosystems. Every venture is a node in a connected system of
              innovation.
            </p>
          </motion.div>

          {/* Featured Book Banner */}
          <motion.div
            className="max-w-5xl mx-auto mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="/thepoweroffinancialclarity"
              className="group relative flex flex-col md:flex-row items-center gap-8 glass-card rounded-3xl p-8 md:p-12 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_hsl(263_70%_65%_/_0.15)]"
            >
              {/* Book cover */}
              <div className="relative w-40 md:w-48 flex-shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                <img
                  src={bookCover}
                  alt="The Power of Financial Clarity"
                  className="relative w-full rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block font-mono text-xs text-accent uppercase tracking-wider mb-3">
                  Published Author
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  The Power of Financial Clarity
                </h2>
                <p className="text-muted-foreground mb-6">
                  A comprehensive guide to mastering personal finance and building lasting wealth through clarity,
                  discipline, and strategic thinking.
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-medium">
                  <span>Read More</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </a>
          </motion.div>

          {/* Ventures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ventures.map((venture, index) => (
              <VentureCard key={venture.id} venture={venture} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="font-mono text-sm text-muted-foreground mb-4">Want to collaborate or invest?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card border border-accent/30 hover:border-accent/60 transition-all duration-500 hover:shadow-[0_0_40px_hsl(189_94%_43%_/_0.2)]"
            >
              <span className="font-display font-medium text-foreground">Get in Touch</span>
              <ArrowUpRight className="w-5 h-5 text-accent" />
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FoundedPage;
