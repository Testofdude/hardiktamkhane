import { Linkedin, Mail, Youtube, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border/30 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="absolute inset-0 circuit-bg opacity-10" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-display font-bold mb-2 gradient-text neon-text">Hardik</h3>
            <p className="text-sm text-muted-foreground font-mono">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex gap-6" aria-label="Footer navigation">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-accent transition-colors font-mono"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { href: "https://www.linkedin.com/in/hardik-tamkhane-003679340/", icon: Linkedin, label: "LinkedIn" },
              { href: "https://www.youtube.com/@Hardik_SMFCYA", icon: Youtube, label: "YouTube" },
              { href: "mailto:hardiktamkhane632@gmail.com", icon: Mail, label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="w-10 h-10 rounded-xl cyber-card glass-card flex items-center justify-center group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Terminal style footer text */}
        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/60 font-mono flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3" />
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
