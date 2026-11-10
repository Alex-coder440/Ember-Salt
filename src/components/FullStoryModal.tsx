import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, ArrowUp, Sparkles } from 'lucide-react';

interface FullStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation?: () => void;
}

export function FullStoryModal({ isOpen, onClose, onOpenReservation }: FullStoryModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility and scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[85] w-screen h-screen bg-[#111111] text-cream flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="The Full Story of Ember & Salt"
        >
          {/* Top Ember Glow Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-burnt-orange via-muted-gold to-burnt-orange shrink-0" />

          {/* Sticky Header */}
          <header className="sticky top-0 z-40 bg-[#111111]/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-full bg-burnt-orange/15 border border-burnt-orange/30 flex items-center justify-center text-burnt-orange">
                <Flame size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-widest uppercase text-cream leading-tight">
                  Ember & Salt
                </span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-gold font-light">
                  Our Philosophy & Origin
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close story"
                className="flex items-center space-x-2 border border-white/15 hover:border-burnt-orange text-cream/80 hover:text-burnt-orange px-4 py-2 text-xs uppercase tracking-widest font-sans transition-colors cursor-pointer"
              >
                <span className="hidden md:inline">Close</span>
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Scrollable Story Content */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 lg:px-12 py-16 scroll-smooth"
          >
            <article className="max-w-3xl mx-auto space-y-16">
              
              {/* Hero Banner Header */}
              <div className="text-center space-y-6 pb-10 border-b border-white/10">
                <div className="inline-flex items-center space-x-2 text-muted-gold">
                  <Flame size={15} className="text-burnt-orange" />
                  <span className="font-sans text-xs tracking-[0.3em] uppercase">
                    The Complete Chronicle
                  </span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream tracking-wide font-light">
                  It started around a fire.
                </h1>

                <div className="w-16 h-px bg-burnt-orange mx-auto" />

                <p className="font-serif italic text-xl md:text-2xl text-muted-gold max-w-xl mx-auto leading-relaxed">
                  "Before Ember & Salt became a restaurant, it was simply an idea shaped by memories, tradition, and a love for bringing people together."
                </p>
              </div>

              {/* Story Intro Prose */}
              <div className="space-y-6 font-sans text-lg text-cream/85 font-light leading-relaxed">
                <p>
                  Our story begins with a chef who grew up in a home where cooking was never just another household responsibility. It was an experience shared by everyone. Family gatherings often revolved around an open fire, where meals were prepared slowly, ingredients were passed from one person to another, and conversations continued long after the food was ready.
                </p>

                <p>
                  There was always something happening around the fire. Someone tending the coals, someone carefully seasoning the food, and someone sharing stories while waiting for the next dish to come off the grill. It was never just about what was being cooked. It was about the people, the atmosphere, and the memories being created along the way.
                </p>

                <p className="text-cream text-xl font-normal border-l-2 border-burnt-orange pl-6 py-1 italic font-serif">
                  Those moments left a lasting impression.
                </p>

                <p>
                  As the chef grew older and developed a deeper understanding of food, one thing became increasingly clear: some of the most memorable meals are created using the simplest elements. A little heat, quality ingredients, the right seasoning, and the patience to let everything come together.
                </p>

                <p>
                  That realization eventually became the foundation of Ember & Salt.
                </p>
              </div>

              {/* Atmospheric Image Break 1 */}
              <div className="relative aspect-[16/9] overflow-hidden my-12 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop"
                  alt="Open hearth embers glowing"
                  className="w-full h-full object-cover grayscale-[30%] opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="font-sans text-xs uppercase tracking-widest text-muted-gold">
                    The Kitchen Hearth • Live Oak & Red Cherry Embers
                  </span>
                </div>
              </div>

              {/* Section 2: Two Elements. One Philosophy. */}
              <div className="space-y-8 pt-4">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-gold font-sans block">
                    Chapter I
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl text-cream tracking-wide">
                    TWO ELEMENTS. ONE PHILOSOPHY.
                  </h2>
                </div>

                <div className="w-12 h-px bg-burnt-orange" />

                <div className="space-y-6 font-sans text-lg text-cream/85 font-light leading-relaxed">
                  <p>
                    Fire and salt may seem like simple things, but together, they have the ability to transform an entire dining experience.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-[#171717] border border-burnt-orange/30 p-6 space-y-3">
                      <div className="flex items-center space-x-2 text-burnt-orange">
                        <Flame size={18} />
                        <h3 className="font-serif text-2xl text-cream">Fire</h3>
                      </div>
                      <p className="text-sm text-cream/80 leading-relaxed font-light">
                        To us, fire represents creativity, patience, and transformation. It brings out the natural character of ingredients, creating layers of smoke, texture, and depth that cannot be replicated. From the first spark to the final ember, every stage of cooking contributes something unique to the plate.
                      </p>
                    </div>

                    <div className="bg-[#171717] border border-muted-gold/30 p-6 space-y-3">
                      <div className="flex items-center space-x-2 text-muted-gold">
                        <Sparkles size={18} />
                        <h3 className="font-serif text-2xl text-cream">Salt</h3>
                      </div>
                      <p className="text-sm text-cream/80 leading-relaxed font-light">
                        Salt, on the other hand, represents balance. It is a reminder that great cooking doesn't always require complexity. Sometimes, the smallest details make the biggest difference. The right amount of seasoning can bring an ingredient to life without taking away what makes it special.
                      </p>
                    </div>
                  </div>

                  <p>
                    These two elements guide everything we do.
                  </p>

                  <p className="text-xl font-serif italic text-cream">
                    Our approach is simple: respect the ingredients, understand the fire, and never lose sight of the details.
                  </p>
                </div>
              </div>

              {/* Section 3: The Art of Open-Fire Cooking */}
              <div className="space-y-8 pt-8">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-gold font-sans block">
                    Chapter II
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl text-cream tracking-wide">
                    THE ART OF OPEN-FIRE COOKING
                  </h2>
                </div>

                <div className="w-12 h-px bg-burnt-orange" />

                <div className="space-y-6 font-sans text-lg text-cream/85 font-light leading-relaxed">
                  <p>
                    At Ember & Salt, the kitchen is more than a place where meals are prepared. It is the heart of the restaurant.
                  </p>

                  <p>
                    We embrace open-fire cooking because we believe food should be experienced beyond the plate. The crackling of wood, the glow of burning embers, the aroma of freshly grilled ingredients, and the movement of our chefs around the fire are all part of what makes dining here special.
                  </p>

                  <p>
                    Our menu brings together carefully selected ingredients, seasonal inspiration, and techniques that celebrate natural flavors.
                  </p>

                  <p>
                    From flame-grilled cuts of meat and freshly prepared seafood to roasted vegetables and thoughtfully crafted desserts, every dish is an opportunity to explore the relationship between fire and flavor.
                  </p>

                  <p className="text-cream text-lg font-medium border-l-2 border-muted-gold pl-6 py-1 italic font-serif">
                    We don't believe in overcomplicating good food. We believe in knowing when to let an ingredient speak for itself.
                  </p>
                </div>
              </div>

              {/* Atmospheric Image Break 2 */}
              <div className="relative aspect-[16/9] overflow-hidden my-12 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop"
                  alt="Atmospheric dining room and table"
                  className="w-full h-full object-cover grayscale-[20%] opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="font-sans text-xs uppercase tracking-widest text-muted-gold">
                    Communal Tables • Shared Warmth and Conversation
                  </span>
                </div>
              </div>

              {/* Section 4: More Than Just a Meal */}
              <div className="space-y-8 pt-8">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-gold font-sans block">
                    Chapter III
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl text-cream tracking-wide">
                    MORE THAN JUST A MEAL
                  </h2>
                </div>

                <div className="w-12 h-px bg-burnt-orange" />

                <div className="space-y-6 font-sans text-lg text-cream/85 font-light leading-relaxed">
                  <p>
                    Food has always had a way of bringing people closer.
                  </p>

                  <p>
                    A table can bring together old friends, introduce new ones, celebrate important moments, or turn an ordinary evening into something worth remembering.
                  </p>

                  <p>
                    That is the feeling we want every guest to experience at Ember & Salt.
                  </p>

                  <p>
                    Our space is designed to feel warm, welcoming, and full of life. With an open kitchen, intimate lighting, thoughtfully arranged seating, and an atmosphere shaped around shared experiences, we want every visit to feel personal.
                  </p>

                  <p className="text-burnt-orange text-lg font-serif italic">
                    Whether you're joining us for a quiet dinner, celebrating something special, or simply looking for somewhere to enjoy good food and great company, there's always a place for you at our table.
                  </p>
                </div>
              </div>

              {/* Section 5: Our Promise */}
              <div className="space-y-8 pt-8 pb-12 border-b border-white/10">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-gold font-sans block">
                    Our Dedication
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl text-cream tracking-wide">
                    OUR PROMISE
                  </h2>
                </div>

                <div className="w-12 h-px bg-burnt-orange" />

                <div className="space-y-6 font-sans text-lg text-cream/85 font-light leading-relaxed">
                  <p>
                    We started with a simple belief: the best dining experiences are built on more than great food.
                  </p>

                  <p>
                    They come from the care behind every ingredient, the passion behind every dish, and the people who make every gathering worthwhile.
                  </p>

                  <p>
                    We remain committed to thoughtful cooking, honest ingredients, genuine hospitality, and creating experiences that stay with you long after the last plate has been cleared.
                  </p>

                  <div className="py-4 space-y-2">
                    <p className="font-serif text-2xl md:text-3xl text-cream font-light">
                      Because at the end of the day, it's never just about the food.
                    </p>
                    <p className="font-serif text-2xl md:text-3xl text-burnt-orange font-light italic">
                      It's about everything that happens around it.
                    </p>
                  </div>

                  <div className="pt-8 text-center sm:text-left space-y-1">
                    <div className="font-serif text-3xl md:text-4xl tracking-widest uppercase text-cream">
                      EMBER & SALT
                    </div>
                    <div className="font-serif italic text-muted-gold text-lg">
                      Where fire brings people together.
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing Action Bar */}
              <div className="pt-4 pb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-full sm:w-auto border border-white/20 hover:border-cream text-cream px-8 py-4 text-xs uppercase tracking-widest font-sans transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ArrowUp size={14} />
                  <span>Back to Top</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto border border-white/10 hover:border-burnt-orange text-cream/70 hover:text-burnt-orange px-8 py-4 text-xs uppercase tracking-widest font-sans transition-colors cursor-pointer"
                >
                  <span>Close Story</span>
                </button>
              </div>

            </article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
