import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Our Story', 'Menu', 'Gallery', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
          isScrolled ? 'bg-charcoal/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-24">
          <a href="#home" className="text-2xl font-serif tracking-widest text-cream uppercase hover:text-burnt-orange transition-colors">
            Ember & Salt
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-sans tracking-widest text-cream/70 hover:text-burnt-orange transition-colors uppercase"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-cream"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-charcoal flex flex-col items-center justify-center">
          <button 
            className="absolute top-8 right-6 text-cream"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-cream hover:text-burnt-orange transition-colors uppercase"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
