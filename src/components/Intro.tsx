import { motion } from 'motion/react';

export function Intro() {
  return (
    <section className="bg-charcoal text-cream py-20 md:py-48 px-6 relative" id="intro">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-12 leading-tight">
            Two simple elements.<br className="hidden md:block" /> Endless possibilities.
          </h2>
          
          <div className="w-12 h-px bg-burnt-orange mx-auto mb-12"></div>
          
          <p className="font-sans text-lg md:text-xl text-cream/80 leading-relaxed font-light max-w-2xl mx-auto">
            At Ember & Salt, fire is more than a source of heat. It is where our food begins. We cook over open flame, season with intention, and let simple ingredients speak for themselves.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
