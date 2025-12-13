import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Send, Linkedin, Youtube, Terminal } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { CircuitLines } from "./effects/CircuitLines";
import { GlowOrb } from "./effects/GlowOrb";
import { ParallaxLayer } from "./effects/ParallaxLayer";
import { HolographicOverlay } from "./effects/HolographicOverlay";
import { StatusIndicator } from "./effects/StatusIndicator";
import { TechButton } from "./ui/TechButton";

export const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // In a real app, you would send this to a serverless function
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Partial<ContactFormData> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please check the form for errors");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 circuit-bg opacity-20" />
      </div>

      {/* Animated glow orbs */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 -z-10">
        <GlowOrb size={500} color="primary" className="top-1/2 -left-40" delay={0} />
        <GlowOrb size={450} color="accent" className="top-1/3 -right-40" delay={2} />
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
              COMMUNICATION CHANNEL OPEN • READY TO CONNECT
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Get In <span className="gradient-text neon-text">Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's build something amazing together
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-display font-semibold mb-6 gradient-text">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in hearing about new projects and opportunities. Whether you
                have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 5 }}
                className="cyber-card glass-card flex items-start gap-4 p-5 rounded-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-primary/30 transition-shadow">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-foreground">Email</div>
                  <a
                    href="mailto:hardiktamkhane632@gmail.com"
                    className="text-muted-foreground hover:text-accent transition-colors text-sm font-mono"
                  >
                    hardiktamkhane632@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 5 }}
                className="cyber-card glass-card flex items-start gap-4 p-5 rounded-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-accent/30 transition-shadow">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-foreground">Location</div>
                  <p className="text-muted-foreground text-sm font-mono">Building remotely, impacting globally</p>
                </div>
              </motion.div>
            </div>

            <div className="pt-6">
              <div className="font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm">Connect with me</span>
              </div>
              <div className="flex gap-3">
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -3 }}
                  href="https://www.linkedin.com/in/hardik-tamkhane-003679340/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl cyber-card glass-card flex items-center justify-center group"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.a>
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -3 }}
                  href="https://www.youtube.com/@Hardik_SMFCYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl cyber-card glass-card flex items-center justify-center group"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 cyber-card glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-accent/50" />
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/50" />
              </div>

              <div className="relative z-10">
                <Label htmlFor="name" className="font-mono text-sm">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-2 bg-background/50 border-border/50 focus:border-accent"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive mt-1 font-mono">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative z-10">
                <Label htmlFor="email" className="font-mono text-sm">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="mt-2 bg-background/50 border-border/50 focus:border-accent"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive mt-1 font-mono">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative z-10">
                <Label htmlFor="message" className="font-mono text-sm">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="mt-2 resize-none bg-background/50 border-border/50 focus:border-accent"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive mt-1 font-mono">
                    {errors.message}
                  </p>
                )}
              </div>

              <TechButton 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⟳
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </span>
                )}
              </TechButton>

              <p className="text-xs text-muted-foreground text-center font-mono">
                Your information will be kept private and will not be shared with third parties.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
