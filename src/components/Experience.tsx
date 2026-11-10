import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const concepts = [
  {
    title: "FIRE",
    description: "Open flames, slow embers and the unmistakable flavor of smoke.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669&auto=format&fit=crop"
  },
  {
    title: "FLAVOR",
    description: "Simple ingredients elevated through thoughtful seasoning.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=2574&auto=format&fit=crop"
  },
  {
    title: "GATHER",
    description: "A restaurant designed around the table, conversation and shared experiences.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop"
  }
];

function ExperienceCard({ concept, index }: { concept: typeof concepts[0], index: number, key?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div 
      ref={ref}
      className={`flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24 items-center ${
        index % 2 !== 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Image Container */}
      <motion.div 
        className="w-full md:w-1/2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative aspect-[4/5] overflow-hidden group">
          <div className="absolute inset-0 bg-charcoal/20 z-20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
          <motion.img 
            style={{ y }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={concept.image} 
            alt={concept.title}
            className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover z-10"
          />
        </div>
      </motion.div>
      
      {/* Text Container */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="font-serif text-muted-gold text-xl italic mb-4">The Experience</h3>
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream mb-6 md:mb-8">
          {concept.title}
        </h2>
        <div className="w-8 h-px bg-burnt-orange mb-6 md:mb-8"></div>
        <p className="font-sans text-lg text-cream/80 max-w-md font-light leading-relaxed">
          {concept.description}
        </p>
      </motion.div>
    </div>
  );
}

export function Experience() {
  return (
    <section className="bg-charcoal py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-20 md:gap-32">
          {concepts.map((concept, index) => (
            <ExperienceCard key={concept.title} concept={concept} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
