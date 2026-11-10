import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Flame, 
  ArrowUp, 
  Calendar, 
  Sparkles,
  Leaf,
  FlameKindling,
  Info
} from 'lucide-react';
import { MENU_CATEGORIES, MenuItem } from '../data/menuData';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation?: () => void;
}

export function FullScreenMenu({ isOpen, onClose, onOpenReservation }: FullScreenMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>('starters');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  // Prevent background scroll when menu is open & handle Escape key
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

  // Scroll spy to update active category based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isOpen) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + 180;
      for (const cat of MENU_CATEGORIES) {
        const el = categoryRefs.current[cat.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const target = categoryRefs.current[categoryId];
    const container = scrollContainerRef.current;
    if (target && container) {
      const targetTop = target.offsetTop - 140;
      container.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    }
  };

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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[80] w-screen h-screen bg-[#111111] text-cream flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Restaurant Menu"
        >
          {/* Top Decorative Ember Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-burnt-orange via-muted-gold to-burnt-orange shrink-0" />

          {/* Sticky Header */}
          <header className="sticky top-0 z-40 bg-[#111111]/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between shrink-0">
            {/* Brand Logo & Name */}
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-full bg-burnt-orange/15 border border-burnt-orange/30 flex items-center justify-center text-burnt-orange">
                <Flame size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-widest uppercase text-cream leading-tight">
                  Ember & Salt
                </span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-gold font-light">
                  Open Hearth Gastronomy
                </span>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenReservation?.();
                }}
                className="hidden sm:flex items-center space-x-2 border border-burnt-orange/80 hover:bg-burnt-orange text-cream px-5 py-2 text-xs uppercase tracking-widest font-sans transition-all duration-300"
              >
                <Calendar size={13} />
                <span>Book a Table</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center space-x-2 border border-white/15 hover:border-burnt-orange text-cream/80 hover:text-burnt-orange px-4 py-2 text-xs uppercase tracking-widest font-sans transition-colors cursor-pointer"
              >
                <span className="hidden md:inline">Close</span>
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Sticky Category Navigation Strip */}
          <div className="sticky top-[69px] z-30 bg-[#141414]/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-3 shrink-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Category buttons list */}
              <nav className="flex space-x-2 overflow-x-auto py-1 scrollbar-none w-full md:w-auto" aria-label="Menu Categories">
                {MENU_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => scrollToCategory(cat.id)}
                      className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest font-sans transition-all duration-200 border cursor-pointer ${
                        isActive
                          ? 'bg-burnt-orange text-cream border-burnt-orange font-medium shadow-md shadow-burnt-orange/20'
                          : 'bg-white/5 text-cream/70 border-white/5 hover:border-white/20 hover:text-cream'
                      }`}
                    >
                      {cat.title}
                    </button>
                  );
                })}
              </nav>

              <div className="hidden lg:flex items-center space-x-2 text-[11px] font-sans text-cream/50">
                <Info size={13} className="text-muted-gold" />
                <span>All proteins wood-grilled to order</span>
              </div>
            </div>
          </div>

          {/* Scrollable Menu Content */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 lg:px-12 py-12 scroll-smooth"
          >
            <div className="max-w-7xl mx-auto space-y-24">
              
              {/* Introduction Section */}
              <div className="text-center max-w-3xl mx-auto pt-4 pb-8 space-y-6 border-b border-white/10">
                <div className="inline-flex items-center space-x-2 text-muted-gold">
                  <FlameKindling size={16} className="text-burnt-orange" />
                  <span className="font-sans text-xs tracking-[0.3em] uppercase">
                    Seasonal Culinary Collection
                  </span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl text-cream tracking-wide font-light">
                  Our Menu
                </h1>

                <div className="w-12 h-px bg-burnt-orange mx-auto my-4" />

                <p className="font-sans text-base md:text-lg text-cream/80 font-light leading-relaxed max-w-2xl mx-auto">
                  Every cut, crustacean, and root is cooked over live wood fires, honoring the elemental harmony of smoke, heat, and sea salt. We source exclusively from sustainable coastal fisheries and small regenerative growers.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-cream/60 font-sans tracking-wider">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange"></span>
                    <span>Executive Chef Julian Montgomery</span>
                  </span>
                  <span className="text-white/20">•</span>
                  <span>Red Oak & Cherry Charcoal Hearth</span>
                  <span className="text-white/20">•</span>
                  <span>Tasting & À La Carte Available</span>
                </div>
              </div>

              {/* Menu Categories */}
              {MENU_CATEGORIES.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el;
                  }}
                  className="space-y-10 scroll-mt-36"
                >
                  {/* Category Header */}
                  <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-muted-gold font-sans mb-1">
                        Collection
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl text-cream tracking-wide">
                        {category.title}
                      </h2>
                    </div>
                    <p className="font-sans text-sm text-cream/60 max-w-md font-light italic md:text-right">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* If this is the "Signature Dishes" category, render distinctive Featured Section */}
                  {category.id === 'signature' ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-charcoal/90 border border-burnt-orange/30 p-6 flex flex-col justify-between relative group hover:border-burnt-orange transition-all duration-500 shadow-xl shadow-black/60"
                          >
                            <div>
                              {/* Large Photo with Zoom */}
                              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-black/40">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                  loading="lazy"
                                />
                                <div className="absolute top-3 left-3 bg-burnt-orange text-cream text-[10px] uppercase font-sans tracking-widest px-3 py-1 font-semibold flex items-center space-x-1.5 shadow-md">
                                  <Sparkles size={11} />
                                  <span>Chef's Recommendation</span>
                                </div>
                              </div>

                              {/* Title & Price */}
                              <div className="flex justify-between items-start gap-4 mb-3">
                                <h3 className="font-serif text-2xl md:text-3xl text-cream group-hover:text-burnt-orange transition-colors">
                                  {item.name}
                                </h3>
                                <span className="font-mono text-xl text-muted-gold font-semibold tracking-wider shrink-0">
                                  {item.price}
                                </span>
                              </div>

                              <p className="font-sans text-sm text-cream/75 font-light leading-relaxed mb-4">
                                {item.description}
                              </p>
                            </div>

                            {/* Specialty notes / serving tag */}
                            {item.notes && (
                              <div className="border-t border-white/10 pt-3 text-xs text-muted-gold/90 font-sans italic flex items-center space-x-2">
                                <Flame size={12} className="text-burnt-orange shrink-0" />
                                <span>{item.notes}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Standard Category Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-charcoal/50 border border-white/5 hover:border-white/15 p-5 md:p-6 transition-all duration-300 flex flex-col sm:flex-row gap-5 group"
                        >
                          {/* Image Box */}
                          <div className="w-full sm:w-40 sm:h-36 h-48 shrink-0 overflow-hidden relative bg-black/40">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-baseline gap-3 mb-1.5">
                                <h3 className="font-serif text-2xl text-cream group-hover:text-burnt-orange transition-colors">
                                  {item.name}
                                </h3>
                                <span className="font-mono text-base text-muted-gold font-medium shrink-0">
                                  {item.price}
                                </span>
                              </div>

                              {/* Dietary Tags */}
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {item.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[10px] tracking-widest uppercase font-sans text-cream/60 border border-white/10 px-2 py-0.5"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <p className="font-sans text-xs md:text-sm text-cream/70 font-light leading-relaxed">
                                {item.description}
                              </p>
                            </div>

                            {item.notes && (
                              <div className="mt-3 text-[11px] text-muted-gold font-sans italic">
                                {item.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Menu Footer Section */}
              <div className="border-t border-white/10 pt-16 pb-12 text-center space-y-8 max-w-4xl mx-auto">
                <div className="space-y-3">
                  <h3 className="font-serif text-3xl md:text-4xl text-cream">
                    Join Us at the Hearth
                  </h3>
                  <p className="font-sans text-sm md:text-base text-cream/70 font-light max-w-xl mx-auto leading-relaxed">
                    Reservations are recommended for dinner seating. We accommodate dietary preferences with advance notice. Private fire room available for intimate gatherings.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenReservation?.();
                    }}
                    className="w-full sm:w-auto bg-burnt-orange hover:bg-ember-red text-cream px-10 py-4 text-xs uppercase tracking-widest font-sans transition-colors duration-300 font-medium cursor-pointer shadow-lg shadow-black/40"
                  >
                    Reserve a Table
                  </button>

                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="w-full sm:w-auto border border-white/20 hover:border-cream text-cream px-8 py-4 text-xs uppercase tracking-widest font-sans transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ArrowUp size={14} />
                    <span>Back to Top</span>
                  </button>
                </div>

                <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-cream/60 font-sans">
                  <div>
                    <span className="block text-cream font-medium mb-1">Hours</span>
                    Tue–Sun 5:00 PM – 11:00 PM
                  </div>
                  <div>
                    <span className="block text-cream font-medium mb-1">Location</span>
                    24 Ember Lane, Lagos, Nigeria
                  </div>
                  <div>
                    <span className="block text-cream font-medium mb-1">Inquiries</span>
                    hello@emberandsalt.com
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
