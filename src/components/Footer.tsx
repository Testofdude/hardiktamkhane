import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-display font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hardik</h3>
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved. Built with React, TypeScript & Tailwind CSS
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex gap-6" aria-label="Footer navigation">
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/hardiktamkhane"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/hardiktamkhane"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hardiktamkhane632@gmail.com"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
