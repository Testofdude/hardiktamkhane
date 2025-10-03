import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Mail } from "lucide-react";
import { Button } from "./ui/button";
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
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            What Clients Say{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
                    <div className="glass rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all border border-border/30 relative overflow-hidden group">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Quote icon */}
                      <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-24 h-24 text-primary" />
                      </div>

                      <div className="relative z-10">
                        {/* Avatar */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
                            <span className="text-xl font-display font-bold text-primary">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-xl font-display font-bold text-foreground">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground font-semibold">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {testimonials.length > 1 && (
              <>
                <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16" />
                <CarouselNext className="hidden md:flex -right-12 lg:-right-16" />
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
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Want to work together?
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default"
              size="lg"
              className="rounded-full"
              asChild
            >
              <a href="#contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me Today
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
