/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Experience } from './components/Experience';
import { FeaturedDishes } from './components/FeaturedDishes';
import { Story } from './components/Story';
import { Gallery } from './components/Gallery';
import { ReservationCTA } from './components/ReservationCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="bg-charcoal min-h-screen">
      <Navbar />
      <Hero />
      <Intro />
      <Experience />
      <FeaturedDishes />
      <Story />
      <Gallery />
      <ReservationCTA />
      <Footer />
    </main>
  );
}
