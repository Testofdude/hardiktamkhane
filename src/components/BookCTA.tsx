import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TechButton } from "./ui/TechButton";
import bookCover from "@/assets/book-cover.png";

export const BookCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      
      {/* Circuit overlay */}
      <div className="absolute inset-0 circuit-bg opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-12 border border-primary/20 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            {/* Scan line */}
            <motion.div
              className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"
              animate={{ y: [-200, 500] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              {/* Book Cover */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl scale-125 opacity-50" />
                  <img 
                    src={bookCover} 
                    alt="The Power of Financial Clarity by Hardik Tamkhane"
                    className="relative w-32 sm:w-40 md:w-48 h-auto rounded-lg shadow-2xl shadow-primary/30"
                  />
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
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">
                    Get My Book: <span className="gradient-text">The Power of Financial Clarity</span>
                  </h2>
                  
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-lg">
                    Master the fundamentals of money management, build lasting wealth, and achieve the financial freedom you deserve. A complete guide for taking control of your financial future.
                  </p>
                  
                  <Link to="/thepoweroffinancialclarity">
                    <TechButton variant="primary" size="lg">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                      Explore The Book
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
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
