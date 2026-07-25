import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "ht_intro_played_v1";

export const CinematicIntro = () => {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setVisible(true);
    sessionStorage.setItem(KEY, "1");
    const t = setTimeout(() => setVisible(false), shouldReduceMotion ? 400 : 2600);
    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  const letters = "HARDIK TAMKHANE".split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] } }}
        >
          {/* ember halo */}
          <motion.div
            aria-hidden
            className="absolute w-[60vw] h-[60vw] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,93,58,0.25), transparent 60%)", filter: "blur(60px)" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="overflow-hidden px-6">
            <div className="flex flex-wrap justify-center gap-x-[0.04em]">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-editorial font-extrabold tracking-tighter text-[#f5f0e8] text-[14vw] md:text-[11vw] leading-[0.9] inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: ch === " " ? 0 : 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ width: ch === " " ? "0.35em" : undefined }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <span className="h-px w-10 bg-[#e85d3a]" />
            <span className="font-editorialBody text-[10px] tracking-[0.4em] uppercase text-[#f5f0e8]/60">
              Founder Dossier · 2026
            </span>
            <span className="h-px w-10 bg-[#e85d3a]" />
          </motion.div>

          {/* sweeping line */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e85d3a] to-transparent"
              initial={{ top: "0%", opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
