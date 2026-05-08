import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Award, Newspaper, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitLines } from "@/components/effects/CircuitLines";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { HolographicOverlay } from "@/components/effects/HolographicOverlay";
import { CyberCard } from "@/components/ui/CyberCard";
import { TechButton } from "@/components/ui/TechButton";
import { SEO, buildBreadcrumbSchema, pageBreadcrumbs } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PressLogo } from "@/components/press/PressLogo";
import { pressMentions, type PressMention } from "@/data/press";

const SITE_URL = "https://hardiktamkhane.com";

const PAGE_PATH = "/features";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PERSON_ID = `${SITE_URL}/#person`;

const buildArticleSchema = (m: PressMention) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "@id": `${m.url}#article`,
  headline: m.title,
  name: m.title,
  url: m.url,
  mainEntityOfPage: { "@type": "WebPage", "@id": m.url },
  datePublished: m.date,
  dateModified: m.date,
  inLanguage: "en",
  isAccessibleForFree: true,
  about: { "@type": "Person", "@id": PERSON_ID, name: "Hardik Tamkhane", url: SITE_URL },
  mentions: { "@type": "Person", "@id": PERSON_ID },
  author: { "@type": "Organization", name: m.publication },
  publisher: {
    "@type": "Organization",
    name: m.publication,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  description: m.description,
});

const buildItemListSchema = (mentions: PressMention[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#press-list`,
  name: "Press & Media Mentions of Hardik Tamkhane",
  numberOfItems: mentions.length,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  itemListElement: mentions.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: m.url,
    item: { "@id": `${m.url}#article` },
  })),
});

const buildWebPageSchema = (mentions: PressMention[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Press & Featured In — Hardik Tamkhane",
  description:
    "Curated media mentions and press coverage of Hardik Tamkhane.",
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Hardik Tamkhane" },
  about: { "@type": "Person", "@id": PERSON_ID, name: "Hardik Tamkhane", url: SITE_URL },
  mainEntity: { "@id": `${PAGE_URL}#press-list` },
  hasPart: mentions.map((m) => ({ "@id": `${m.url}#article` })),
});

const FeaturesPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [gridRef, gridInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const featured = pressMentions[0];

  return (
    <PageTransition>
      <SEO
        title="Press & Featured In — Hardik Tamkhane Media Mentions"
        description="Media mentions and press coverage of Hardik Tamkhane — featured in Entrepreneurs of India for work in performance marketing, cybersecurity, and AI."
        path="/features"
        keywords="Hardik Tamkhane press, featured in, media mentions, Entrepreneurs of India"
        schema={[
          buildBreadcrumbSchema(pageBreadcrumbs["/features"]),
          buildWebPageSchema(pressMentions),
          buildItemListSchema(pressMentions),
          ...pressMentions.map(buildArticleSchema),
        ]}
      />
      <Navbar />
      <Breadcrumbs items={pageBreadcrumbs["/features"]} />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden py-16 md:py-24">
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
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-[0.25em] uppercase mb-5">
                <Award className="w-3.5 h-3.5" />
                Press / Recognition
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.05]">
                Featured <span className="gradient-text">In</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Recognized for building and scaling ventures in marketing,
                cybersecurity, and AI.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured article — large hero card */}
        {featured && (
          <section className="py-10 md:py-16 relative">
            <div className="container mx-auto px-6">
              <motion.article
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="max-w-5xl mx-auto"
              >
                <CyberCard className="p-8 md:p-12 lg:p-16 relative overflow-hidden group transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.35)]">
                  {/* Glow accent */}
                  <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 grid lg:grid-cols-[auto,1fr] gap-8 lg:gap-12 items-start">
                    {/* Publication */}
                    <div className="flex flex-col items-start lg:border-r lg:border-border/40 lg:pr-12">
                      <div className="flex items-center gap-2 text-xs font-mono text-accent tracking-wider uppercase mb-4">
                        <Newspaper className="w-3.5 h-3.5" />
                        {featured.tag ?? "Feature"}
                      </div>
                      <PressLogo
                        name={featured.publication}
                        className="text-3xl md:text-4xl text-foreground"
                      />
                      <time
                        dateTime={featured.date}
                        className="mt-4 text-sm text-muted-foreground"
                      >
                        {featured.dateLabel}
                      </time>
                    </div>

                    {/* Content */}
                    <div>
                      <Quote className="w-8 h-8 text-accent/40 mb-4" />
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-tight mb-5">
                        {featured.title}
                      </h2>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                        {featured.description}
                      </p>
                      <a
                        href={featured.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read full article in ${featured.publication}`}
                      >
                        <TechButton variant="primary" size="lg">
                          Read Full Article
                          <ExternalLink className="w-4 h-4" />
                        </TechButton>
                      </a>
                    </div>
                  </div>
                </CyberCard>
              </motion.article>
            </div>
          </section>
        )}

        {/* Additional mentions grid (scales as more added) */}
        {pressMentions.length > 1 && (
          <section ref={gridRef} className="py-16 md:py-20 relative">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <motion.h3
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-display font-bold mb-10 text-center"
                >
                  More <span className="gradient-text">Mentions</span>
                </motion.h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pressMentions.slice(1).map((m, i) => (
                    <motion.a
                      key={m.id}
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read article in ${m.publication}: ${m.title}`}
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                      animate={gridInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      whileHover={shouldReduceMotion ? {} : { y: -4 }}
                      className="block group"
                    >
                      <CyberCard className="p-6 h-full transition-shadow duration-300 group-hover:shadow-[0_20px_50px_-15px_hsl(var(--accent)/0.3)]">
                        <PressLogo
                          name={m.publication}
                          className="text-xl text-foreground mb-3"
                        />
                        <time
                          dateTime={m.date}
                          className="text-xs text-muted-foreground block mb-4"
                        >
                          {m.dateLabel}
                        </time>
                        <h4 className="font-display font-bold leading-snug mb-3 group-hover:gradient-text transition-all">
                          {m.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {m.description}
                        </p>
                        <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono text-accent">
                          Read article
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </CyberCard>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <CyberCard className="p-10 md:p-14 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Press <span className="gradient-text">inquiries?</span>
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                For interviews, podcasts, or feature requests, reach out
                directly — happy to share insights on building in public.
              </p>
              <Link to="/contact">
                <TechButton variant="primary" size="lg">
                  Get in Touch
                </TechButton>
              </Link>
            </CyberCard>
          </div>
        </section>

        <RelatedLinks
          links={["about", "founded", "services", "cases", "book", "contact"]}
          heading="Explore More"
          subheading="See the work, the ventures, and the story behind the mentions."
        />
      </main>

      <Footer />
    </PageTransition>
  );
};

export default FeaturesPage;
