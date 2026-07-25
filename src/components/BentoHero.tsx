import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const EMBER = "#e85d3a";

const Tile = ({
  children,
  className = "",
  delay = 0,
  as: As = "div" as any,
  ...rest
}: any) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl border border-white/[0.06] bg-[#141414] overflow-hidden group ${className}`}
      {...rest}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: `radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(232,93,58,0.08), transparent 60%)` }} />
    </motion.div>
  );
};

export const BentoHero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0a0a0a] text-[#f5f0e8] font-editorialBody overflow-hidden"
      role="banner"
    >
      {/* ambient ember + grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,93,58,0.14), transparent 60%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,93,58,0.06), transparent 60%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-28 pb-16">
        {/* top meta bar */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-8 text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/40 font-editorialBody"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: EMBER, boxShadow: `0 0 10px ${EMBER}` }} />
            <span>Founder Dossier</span>
          </div>
          <span className="hidden md:block">Vol. 01 · Obsidian Edition</span>
          <span>MMXXVI</span>
        </motion.div>

        <div className="grid grid-cols-12 gap-4 md:gap-5 auto-rows-[minmax(0,auto)]">
          {/* HERO IDENTITY */}
          <Tile className="col-span-12 lg:col-span-8 p-8 md:p-12 min-h-[520px] flex flex-col justify-between" delay={0.05}>
            <div className="flex items-start justify-between">
              <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] tracking-[0.3em] uppercase text-[#f5f0e8]/70">
                Founder · Builder · Author
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#f5f0e8]/40">I</span>
            </div>

            <div>
              <h1 className="font-editorial font-extrabold tracking-[-0.04em] leading-[0.85] text-[13vw] md:text-[8vw] lg:text-[5.2vw] uppercase">
                <span className="block">Hardik</span>
                <span className="block">
                  Tamkha<span style={{ color: EMBER }}>n</span>e<span style={{ color: EMBER }}>.</span>
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base md:text-lg text-[#f5f0e8]/60 leading-relaxed">
                Building at the intersection of <span className="text-[#f5f0e8]">code</span>, <span style={{ color: EMBER }}>security</span> and <span className="text-[#f5f0e8]">growth</span>.
                Two ventures in flight. One book in print. Thirty-five projects in the wild.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/founded"
                  className="group/btn inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors"
                  style={{ background: EMBER, color: "#0a0a0a" }}
                >
                  Enter the ecosystem
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-white/15 hover:border-white/40 transition-colors text-[#f5f0e8]"
                >
                  Initiate contact
                </Link>
              </div>
            </div>
          </Tile>

          {/* STATS TILE */}
          <Tile
            className="col-span-6 lg:col-span-4 p-8 md:p-10 min-h-[250px] flex flex-col justify-between"
            style={{ background: EMBER, color: "#0a0a0a" }}
            delay={0.15}
          >
            <div className="flex items-center justify-between text-[10px] tracking-[0.35em] uppercase font-editorialBody font-semibold">
              <span>Output</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-editorial font-extrabold tracking-[-0.05em] leading-none text-[22vw] md:text-[10vw] lg:text-[8vw]">
                35<span className="align-top text-[0.5em]">+</span>
              </div>
              <p className="mt-2 text-sm font-medium max-w-[14ch]">
                Projects delivered across security, growth & code.
              </p>
            </div>
          </Tile>

          {/* CYVANCE */}
          <Tile className="col-span-12 md:col-span-6 lg:col-span-4 p-7 md:p-8 min-h-[240px] flex flex-col justify-between" delay={0.2}>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center" style={{ color: EMBER }}>
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/40">Venture 01</span>
            </div>
            <div>
              <h3 className="font-editorial font-bold text-2xl md:text-3xl tracking-tight uppercase">
                Cyvance <span style={{ color: EMBER }}>Security</span>
              </h3>
              <p className="mt-2 text-sm text-[#f5f0e8]/55 max-w-xs">
                Elite cybersecurity infrastructure engineered for the next generation of digital defense.
              </p>
              <a
                href="https://cyvance.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
              >
                Visit <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Tile>

          {/* FUSION */}
          <Tile className="col-span-12 md:col-span-6 lg:col-span-4 p-7 md:p-8 min-h-[240px] flex flex-col justify-between" delay={0.28}>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-[#f5f0e8]/70">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/40">Venture 02</span>
            </div>
            <div>
              <h3 className="font-editorial font-bold text-2xl md:text-3xl tracking-tight uppercase">
                Fusion Interpreter
              </h3>
              <p className="mt-2 text-sm text-[#f5f0e8]/55 max-w-xs">
                Modular logic synthesis — bridging complex systems with radical clarity.
              </p>
              <a
                href="https://fusioninterpreter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
              >
                Visit <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Tile>

          {/* BOOK */}
          <Tile className="col-span-12 lg:col-span-4 p-7 md:p-8 min-h-[240px] flex flex-col justify-between" delay={0.35}>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-[#f5f0e8]/70">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/40">Author</span>
            </div>
            <div>
              <h3 className="font-editorial font-extrabold text-xl md:text-2xl tracking-tight leading-[1.05] uppercase">
                The Power of<br />
                <span style={{ color: EMBER }}>Financial Clarity</span>
              </h3>
              <p className="mt-2 text-sm text-[#f5f0e8]/55">
                Deciphering economic architecture for the ambitious.
              </p>
              <Link
                to="/thepoweroffinancialclarity"
                className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
              >
                Read the book <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Tile>

          {/* MARQUEE / PRESS */}
          <Tile className="col-span-12 p-6 md:p-7 overflow-hidden" delay={0.42}>
            <div className="flex items-center gap-6">
              <span className="shrink-0 text-[10px] tracking-[0.4em] uppercase text-[#f5f0e8]/40">As featured in</span>
              <div className="flex-1 overflow-hidden relative">
                <div className="flex gap-14 animate-[marquee_28s_linear_infinite] whitespace-nowrap will-change-transform">
                  {[
                    "Entrepreneurs of India",
                    "Tech Press",
                    "Global Forum",
                    "Security Daily",
                    "Founders Weekly",
                    "The Ember Report",
                    "Entrepreneurs of India",
                    "Tech Press",
                    "Global Forum",
                    "Security Daily",
                  ].map((name, i) => (
                    <span
                      key={i}
                      className="font-editorial font-bold tracking-tight text-lg md:text-xl text-[#f5f0e8]/50 hover:text-[#f5f0e8] transition-colors uppercase"
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#141414] to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#141414] to-transparent pointer-events-none" />
              </div>
              <Link
                to="/features"
                className="shrink-0 hidden md:inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
              >
                All features <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Tile>
        </div>

        {/* Bottom discipline strip */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/40"
        >
          <div className="flex gap-8">
            <span>Cybersecurity</span>
            <span>·</span>
            <span>Growth Architecture</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Full-Stack Engineering</span>
          </div>
          <span>Scroll to unfold</span>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
};
