/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Experience } from './components/Experience';
import { FeaturedDishes } from './components/FeaturedDishes';
import { Story } from './components/Story';
import { Gallery } from './components/Gallery';
import { ReservationCTA } from './components/ReservationCTA';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { FullScreenMenu } from './components/FullScreenMenu';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <main className="bg-charcoal min-h-screen">
      <Navbar onOpenMenu={handleOpenMenu} />
      <Hero onOpenReservation={handleOpenReservation} />
      <Intro />
      <Experience />
      <FeaturedDishes onOpenMenu={handleOpenMenu} />
      <Story />
      <Gallery />
      <ReservationCTA onOpenReservation={handleOpenReservation} />
      <Footer 
        onOpenReservation={handleOpenReservation} 
        onOpenMenu={handleOpenMenu} 
      />

      {/* Full-Screen Premium Menu Overlay */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onOpenReservation={handleOpenReservation}
      />

      {/* Reservation Booking Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
      />
    </main>
  );
}
