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
import { SEO, organizationSchema, websiteSchema, personSchema, featuredArticleSchema, buildBreadcrumbSchema, pageBreadcrumbs } from "@/components/SEO";
import { RelatedLinks } from "@/components/RelatedLinks";
import { FeaturedInStrip } from "@/components/press/FeaturedInStrip";

const Index = () => {
  return (
    <PageTransition>
      <SEO
        title="Hardik Tamkhane — Founder, Web Developer & Digital Marketer"
        description="Founder of Fusion Interpreter & Cyvance Security. Full-stack developer, performance marketer, and cybersecurity builder shaping ecosystems in public."
        path="/"
        keywords="Hardik Tamkhane, Fusion Interpreter, Cyvance Security, founder, web developer, digital marketing, cybersecurity"
        schema={[organizationSchema, websiteSchema, personSchema, featuredArticleSchema, buildBreadcrumbSchema(pageBreadcrumbs["/"])]}
      />
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
        <RelatedLinks
          links={["about", "services", "founded", "cases", "book", "contact"]}
          heading="Explore the Ecosystem"
          subheading="Dive deeper into the work, the story, and the systems being built."
        />
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Index;
