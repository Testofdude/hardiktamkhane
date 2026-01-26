import { SkipToContent } from "@/components/SkipToContent";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Founded } from "@/components/Founded";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { BookCTA } from "@/components/BookCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <SkipToContent />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Founded />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Testimonials />
        <Blog />
        <BookCTA />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Index;
