import { motion } from 'motion/react';

interface FooterProps {
  onOpenReservation?: () => void;
  onOpenMenu?: () => void;
}

export function Footer({ onOpenReservation, onOpenMenu }: FooterProps) {
  const navLinks = ['Home', 'Our Story', 'Menu', 'Gallery', 'Reservations', 'Contact'];

  return (
    <footer className="bg-[#0a0a0a] text-cream border-t border-white/5 pt-16 md:pt-24 pb-12 px-6" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          
          {/* Brand Col */}
          <div className="flex flex-col">
            <h2 className="font-serif text-3xl tracking-widest uppercase mb-4 text-cream">
              Ember & Salt
            </h2>
            <p className="font-serif italic text-muted-gold text-lg mb-8">
              Where fire brings people together.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-burnt-orange hover:border-burnt-orange transition-colors cursor-pointer">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-burnt-orange hover:border-burnt-orange transition-colors cursor-pointer">
                 <span className="sr-only">Facebook</span>
                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </div>
            </div>
          </div>

          {/* Links Col */}
          <div className="flex flex-col">
            <h3 className="font-sans text-xs tracking-widest uppercase text-white/50 mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  {link === 'Reservations' ? (
                    <button
                      type="button"
                      onClick={onOpenReservation}
                      className="font-sans text-sm text-cream/80 hover:text-burnt-orange transition-colors uppercase tracking-wider text-left cursor-pointer"
                    >
                      {link}
                    </button>
                  ) : link === 'Menu' && onOpenMenu ? (
                    <button
                      type="button"
                      onClick={onOpenMenu}
                      className="font-sans text-sm text-cream/80 hover:text-burnt-orange transition-colors uppercase tracking-wider text-left cursor-pointer"
                    >
                      {link}
                    </button>
                  ) : (
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="font-sans text-sm text-cream/80 hover:text-burnt-orange transition-colors uppercase tracking-wider">
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Hours Col */}
          <div className="flex flex-col">
            <h3 className="font-sans text-xs tracking-widest uppercase text-white/50 mb-6">Opening Hours</h3>
            <ul className="space-y-4 font-sans text-sm text-cream/80 font-light">
              <li>
                <span className="block text-white mb-1">Tuesday – Thursday</span>
                5:00 PM – 10:00 PM
              </li>
              <li>
                <span className="block text-white mb-1">Friday – Saturday</span>
                5:00 PM – 11:00 PM
              </li>
              <li>
                <span className="block text-white mb-1">Sunday</span>
                4:00 PM – 9:00 PM
              </li>
              <li>
                <span className="block text-white mb-1">Monday</span>
                Closed
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col">
             <h3 className="font-sans text-xs tracking-widest uppercase text-white/50 mb-6">Location & Contact</h3>
             <ul className="space-y-4 font-sans text-sm text-cream/80 font-light">
                <li>
                  <span className="block text-white mb-1">Location</span>
                  24 Ember Lane<br/>
                  Lagos, Nigeria
                </li>
                <li>
                  <span className="block text-white mb-1">Contact</span>
                  <a href="mailto:hello@emberandsalt.com" className="hover:text-burnt-orange transition-colors">
                    hello@emberandsalt.com
                  </a>
                </li>
             </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs font-sans text-white/30 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Ember & Salt. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
