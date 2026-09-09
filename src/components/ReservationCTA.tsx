import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ReservationCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative py-24 md:py-48 flex items-center justify-center overflow-hidden">
      {/* Background Image / Overlay */}
      <motion.div className="absolute inset-0 z-0 h-[140%] -top-[20%]" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop"
          alt="Restaurant interior at night"
          className="w-full h-full object-cover object-center grayscale opacity-30"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal pointer-events-none"></div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl md:text-7xl text-cream mb-6">
            Pull up a chair.
          </h2>
          
          <p className="font-sans text-xl text-muted-gold italic mb-12">
            "Good food tastes better when there's someone across the table."
          </p>
          
          <button className="bg-burnt-orange hover:bg-ember-red text-cream px-10 py-5 text-sm uppercase tracking-widest font-sans transition-colors duration-300">
            Reserve a Table
          </button>
        </motion.div>
      </div>
    </section>
  );
}
