import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitLines } from "@/components/effects/CircuitLines";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { HolographicOverlay } from "@/components/effects/HolographicOverlay";
import { CyberCard } from "@/components/ui/CyberCard";
import { TechButton } from "@/components/ui/TechButton";
import { StatusIndicator } from "@/components/effects/StatusIndicator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hardiktamkhane632@gmail.com",
    href: "mailto:hardiktamkhane632@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "< 24 hours",
    href: null,
  },
];

const ContactPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formState.name.trim(),
          email: formState.email.trim(),
          subject: formState.subject,
          message: formState.message.trim(),
        },
      });

      if (error) {
        console.error('Error sending email:', error);
        toast.error("Failed to send message. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message transmitted successfully!");
      
      // Reset after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <section ref={ref} className="relative overflow-hidden py-20">
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
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-xs font-mono text-accent tracking-wider mb-4 block">
                SYSTEM://CONTACT/INIT
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to collaborate on something great? Send a transmission 
                and I'll respond within 24 hours.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CyberCard className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display font-bold">
                      Send Message
                    </h2>
                    <StatusIndicator 
                      status={isSubmitting ? "processing" : "online"} 
                      label={isSubmitting ? "Sending..." : "Online"} 
                    />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground mb-2">
                          NAME_
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_hsl(189_94%_43%/0.1)] transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground mb-2">
                          EMAIL_
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_hsl(189_94%_43%/0.1)] transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-2">
                        SUBJECT_
                      </label>
                      <select
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_hsl(189_94%_43%/0.1)] transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="project">Project Collaboration</option>
                        <option value="consulting">Consulting</option>
                        <option value="startup">Startup Discussion</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-2">
                        MESSAGE_
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_hsl(189_94%_43%/0.1)] transition-all resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <TechButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Transmitting...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Transmitted!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Transmission
                        </>
                      )}
                    </TechButton>
                  </form>
                </CyberCard>
              </motion.div>

              {/* Contact Info Panel */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Diagnostic Panel */}
                <CyberCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_hsl(142_76%_36%/0.6)]" />
                    <span className="text-xs font-mono text-muted-foreground">
                      SYSTEM DIAGNOSTICS
                    </span>
                  </div>
                  <div className="font-mono text-sm space-y-2 text-muted-foreground">
                    <p>→ Response Protocol: <span className="text-accent">ACTIVE</span></p>
                    <p>→ Availability: <span className="text-green-400">OPEN</span></p>
                    <p>→ Current Projects: <span className="text-primary">2</span></p>
                    <p>→ Message Queue: <span className="text-foreground">0</span></p>
                  </div>
                </CyberCard>

                {/* Contact Details */}
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <CyberCard className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-xs font-mono text-muted-foreground mb-1">
                              {item.label.toUpperCase()}_
                            </p>
                            {item.href ? (
                              <a 
                                href={item.href}
                                className="text-foreground hover:text-accent transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-foreground">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </CyberCard>
                    </motion.div>
                  ))}
                </div>

                {/* Fun diagnostic readout */}
                <CyberCard className="p-6 mt-6">
                  <div className="text-xs font-mono text-muted-foreground space-y-1">
                    <p className="text-accent">// TRANSMISSION NOTES</p>
                    <p>→ Serious inquiries only</p>
                    <p>→ Open to startup discussions</p>
                    <p>→ Available for consulting</p>
                    <p>→ No spam, please</p>
                  </div>
                </CyberCard>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default ContactPage;
