import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface HeroProps {
  onOpenReservation?: () => void;
}

export function Hero({ onOpenReservation }: HeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-20 px-6 bg-charcoal" id="home">
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream tracking-widest mb-6 font-light">
            EMBER & SALT
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 mb-10 md:mb-16 w-full max-w-2xl aspect-[4/3] md:aspect-[21/9] overflow-hidden relative"
        >
          <motion.img
            style={{ y }}
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop"
            alt="Open fire cooking"
            className="absolute inset-0 w-full h-[130%] origin-top object-cover opacity-80 grayscale-[20%]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-cream/60 text-xs md:text-sm tracking-[0.2em] uppercase mb-12 max-w-lg mx-auto leading-loose">
            Where fire brings people together.<br/>
            Open-fire cooking, seasonal ingredients.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <button 
            type="button"
            onClick={onOpenReservation}
            className="border border-cream/20 hover:border-cream text-cream px-10 py-4 text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-500 bg-transparent cursor-pointer active:scale-95"
          >
            Reserve a Table
          </button>
        </motion.div>
      </div>
    </section>
  );
}
