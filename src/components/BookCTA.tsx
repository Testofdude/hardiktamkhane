import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, ArrowRight, DollarSign, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TechButton } from "./ui/TechButton";

export const BookCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      
      {/* Circuit overlay */}
      <div className="absolute inset-0 circuit-bg opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 border border-primary/20 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            {/* Scan line */}
            <motion.div
              className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"
              animate={{ y: [-200, 500] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Book Preview */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl scale-125 opacity-50" />
                  <div className="relative w-40 h-56 md:w-48 md:h-64 rounded-lg bg-gradient-to-br from-card to-secondary border border-border/30 p-4 flex flex-col items-center justify-center">
                    <motion.div
                      className="w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                      animate={{ boxShadow: ["0 0 15px hsl(263 70% 65% / 0.3)", "0 0 30px hsl(263 70% 65% / 0.5)", "0 0 15px hsl(263 70% 65% / 0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <DollarSign className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                    <p className="text-xs font-display font-bold text-foreground text-center">The Power of</p>
                    <p className="text-sm font-display font-bold gradient-text text-center">Financial Clarity</p>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent mt-2" />
                  </div>
                </div>
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-primary/20 mb-4">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs text-muted-foreground">Published Author</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">
                    Get My Book: <span className="gradient-text">The Power of Financial Clarity</span>
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 max-w-lg">
                    Master the fundamentals of money management, build lasting wealth, and achieve the financial freedom you deserve. A complete guide for taking control of your financial future.
                  </p>
                  
                  <Link to="/thepoweroffinancialclarity">
                    <TechButton variant="primary" size="lg">
                      <BookOpen className="w-5 h-5" />
                      Explore The Book
                      <ArrowRight className="w-4 h-4" />
                    </TechButton>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
