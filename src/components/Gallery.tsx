import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const images = [
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669&auto=format&fit=crop", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop", aspect: "aspect-[16/9]" },
  { src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=2574&auto=format&fit=crop", aspect: "aspect-[4/5]" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop", aspect: "aspect-[3/4]" },
];

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32 px-6" id="gallery" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-cream mb-4">The Atmosphere</h2>
          <div className="w-12 h-px bg-muted-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8">
            <div className={`relative overflow-hidden group ${images[0].aspect}`}>
              <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src={images[0].src} alt="Gallery image" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
            <div className={`relative overflow-hidden group ${images[3].aspect}`}>
              <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src={images[3].src} alt="Gallery image" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </motion.div>
          
          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:gap-8 md:mt-16 lg:mt-24">
             <div className={`relative overflow-hidden group ${images[1].aspect}`}>
              <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src={images[1].src} alt="Gallery image" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
            <div className={`relative overflow-hidden group ${images[4].aspect}`}>
              <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src={images[4].src} alt="Gallery image" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>

          {/* Column 3 */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 lg:-mt-12">
            <div className={`relative overflow-hidden group ${images[2].aspect}`}>
              <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src={images[2].src} alt="Gallery image" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
            <div className={`relative overflow-hidden group ${images[5].aspect}`}>
              <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src={images[5].src} alt="Gallery image" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
