import { Helmet } from "react-helmet-async";

const SITE_URL = "https://hardiktamkhane.me";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  schema?: object | object[];
  keywords?: string;
}

export const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  schema,
  keywords,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Hardik Tamkhane" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export type BreadcrumbItem = { name: string; path: string };

// Centralized breadcrumb trails so visible UI and JSON-LD stay in sync.
export const pageBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  "/": [{ name: "Home", path: "/" }],
  "/about": [{ name: "Home", path: "/" }, { name: "About", path: "/about" }],
  "/services": [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }],
  "/cases": [{ name: "Home", path: "/" }, { name: "Case Studies", path: "/cases" }],
  "/founded": [{ name: "Home", path: "/" }, { name: "Founded", path: "/founded" }],
  "/features": [{ name: "Home", path: "/" }, { name: "Press & Featured", path: "/features" }],
  "/contact": [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }],
  "/thepoweroffinancialclarity": [
    { name: "Home", path: "/" },
    { name: "The Power of Financial Clarity", path: "/thepoweroffinancialclarity" },
  ],
};

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hardik Tamkhane",
  alternateName: "HT",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  founder: {
    "@type": "Person",
    name: "Hardik Tamkhane",
  },
  sameAs: [
    "https://www.linkedin.com/in/hardik-tamkhane-003679340/",
    "https://www.youtube.com/@Hardik_SMFCYA",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hardiktamkhane632@gmail.com",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hardik Tamkhane",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hardik Tamkhane",
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: "Founder, Marketing Strategist & Developer",
  description:
    "Entrepreneur building ventures in marketing, cybersecurity, and AI.",
  worksFor: [
    { "@type": "Organization", name: "Fusion Interpreter" },
    { "@type": "Organization", name: "Cyvance Security" },
  ],
  sameAs: [
    "https://entrepreneursofindia.com/hardik-tamkhane",
    "https://www.linkedin.com/in/hardik-tamkhane-003679340/",
    "https://www.instagram.com/hardik_tamkhane/",
    "https://www.youtube.com/@Hardik_SMFCYA",
  ],
};

export const featuredArticleSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "Hardik Tamkhane: Solving Real Problems Through Code and Strategy",
  url: "https://entrepreneursofindia.com/hardik-tamkhane",
  mainEntityOfPage: "https://entrepreneursofindia.com/hardik-tamkhane",
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
  inLanguage: "en",
  about: { "@type": "Person", name: "Hardik Tamkhane", url: SITE_URL },
  author: { "@type": "Organization", name: "Entrepreneurs of India" },
  publisher: {
    "@type": "Organization",
    name: "Entrepreneurs of India",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
};
