import { SkipToContent } from "@/components/SkipToContent";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { BookCTA } from "@/components/BookCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main id="main-content">
        <Hero />
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
    </>
  );
};

export default Index;
