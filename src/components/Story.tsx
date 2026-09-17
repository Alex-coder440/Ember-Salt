import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="bg-charcoal py-20 md:py-32 relative overflow-hidden" id="our-story">
      {/* Abstract Background Texture */}
      <motion.div className="absolute right-0 w-1/2 h-[140%] -top-[20%] opacity-5" style={{ y: bgY }}>
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1506458539166-3408b0cb01c5?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <motion.div 
          className="w-full lg:w-5/12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none overflow-hidden">
            <motion.img 
              style={{ y: imgY }}
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2677&auto=format&fit=crop" 
              alt="Chef cooking over open fire" 
              className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover grayscale opacity-80 z-0"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-charcoal border border-white/10 flex items-center justify-center p-8 hidden md:flex z-10">
              <p className="font-serif text-muted-gold italic text-center leading-snug">
                "There was always a fire."
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="w-full lg:w-7/12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl md:text-6xl text-cream mb-8 md:mb-10">Our Story</h2>
          
          <div className="space-y-6 font-sans text-cream/80 text-lg font-light leading-relaxed mb-10 md:mb-12 max-w-2xl">
            <p>
              The restaurant was founded by a chef who grew up around communal cooking, where preparing food was part of the gathering itself.
            </p>
            <p>
              There was always a fire. Someone tending the coals. Someone seasoning the food. Someone talking around the table.
            </p>
            <p>
              That experience inspired Ember & Salt. We believe a restaurant isn't simply about food — it is about bringing people together around fire and the table.
            </p>
          </div>
          
          <button className="border-b border-cream text-cream pb-1 font-sans text-sm tracking-widest uppercase hover:text-burnt-orange hover:border-burnt-orange transition-colors">
            Discover Our Story
          </button>
        </motion.div>

      </div>
    </section>
  );
}
