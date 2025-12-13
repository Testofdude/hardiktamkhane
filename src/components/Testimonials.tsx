import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { CircuitLines } from "./effects/CircuitLines";
import { GlowOrb } from "./effects/GlowOrb";
import { ParallaxLayer } from "./effects/ParallaxLayer";
import { HolographicOverlay } from "./effects/HolographicOverlay";
import { StatusIndicator } from "./effects/StatusIndicator";
import { TechButton } from "./ui/TechButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Priscy Photography",
    company: "Priscy Photography",
    text: "Working with Hardik has been an absolute pleasure. His technical skills and creative vision brought our brand's digital presence to life. He understands both design and marketing, making him an invaluable partner. Highly recommended!",
    avatar: "PP",
  },
];

export const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 circuit-bg opacity-20" />
      </div>

      {/* Animated glow orbs */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 -z-10">
        <GlowOrb size={450} color="accent" className="top-0 -left-40" delay={0} />
        <GlowOrb size={400} color="primary" className="bottom-0 -right-40" delay={2} />
      </ParallaxLayer>

      {/* Circuit lines overlay */}
      <CircuitLines variant="section" />

      {/* Holographic overlay */}
      <HolographicOverlay intensity="subtle" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
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
              FEEDBACK RECEIVED • TRUST VERIFIED
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            What Clients Say{" "}
            <span className="gradient-text neon-text">
              About My Work
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by businesses to deliver exceptional results
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/1">
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-1"
                  >
                    <div className="cyber-card glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent/50 group-hover:border-accent transition-colors" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
                      </div>
                      
                      {/* Quote icon */}
                      <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-24 h-24 text-accent" />
                      </div>

                      <div className="relative z-10">
                        {/* Avatar */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/20">
                            <span className="text-xl font-display font-bold gradient-text">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-xl font-display font-bold text-foreground">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground font-mono">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>

                        {/* Testimonial Text */}
                        <div className="relative">
                          <MessageSquare className="w-5 h-5 text-accent mb-3" />
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            "{testimonial.text}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {testimonials.length > 1 && (
              <>
                <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 border-primary/30 hover:bg-primary/20" />
                <CarouselNext className="hidden md:flex -right-12 lg:-right-16 border-primary/30 hover:bg-primary/20" />
              </>
            )}
          </Carousel>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg md:text-xl text-muted-foreground mb-6 font-mono">
            Want to work together?
          </p>
          <TechButton variant="primary" size="lg">
            <Link to="/contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Me Today
            </Link>
          </TechButton>
        </motion.div>
      </div>
    </section>
  );
};
