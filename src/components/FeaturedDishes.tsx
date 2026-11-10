import { motion } from 'motion/react';

const dishes = [
  {
    name: "Charred Octopus",
    description: "Smoked paprika, lemon, herbs",
    price: "$28",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2571&auto=format&fit=crop"
  },
  {
    name: "Ember-Roasted Ribeye",
    description: "Charred onion, sea salt, fire-roasted jus",
    price: "$65",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    name: "Coal-Grilled Prawns",
    description: "Garlic butter, chili, grilled lemon",
    price: "$32",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=2574&auto=format&fit=crop"
  },
  {
    name: "Burnt Honey Carrots",
    description: "Whipped ricotta, herbs, toasted seeds",
    price: "$18",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2513&auto=format&fit=crop"
  },
  {
    name: "Ember Chocolate Tart",
    description: "Dark chocolate, smoked caramel, sea salt",
    price: "$16",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2670&auto=format&fit=crop"
  },
  {
    name: "Ember-Grilled Ribeye",
    description: "Charred ribeye, smoked sea salt, ember-roasted garlic butter, rosemary jus",
    price: "$35",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2670&auto=format&fit=crop"
  }
];

interface FeaturedDishesProps {
  onOpenMenu?: () => void;
}

export function FeaturedDishes({ onOpenMenu }: FeaturedDishesProps) {
  return (
    <section className="bg-[#0f0f0f] py-20 md:py-32 px-6" id="menu">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-5xl md:text-6xl text-cream mb-4">From the Fire</h2>
            <p className="font-sans text-muted-gold tracking-widest uppercase text-sm">Featured Dishes</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:block"
          >
            <button 
              type="button"
              onClick={onOpenMenu}
              className="border-b border-burnt-orange text-cream pb-1 font-sans text-sm tracking-widest uppercase hover:text-burnt-orange transition-colors cursor-pointer"
            >
              View Full Menu
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {dishes.map((dish, index) => (
            <motion.div 
              key={dish.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-charcoal/30 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-serif text-2xl text-cream group-hover:text-burnt-orange transition-colors duration-300">
                  {dish.name}
                </h3>
                <span className="font-sans text-muted-gold text-sm tracking-wider">{dish.price}</span>
              </div>
              <p className="font-sans text-cream/60 text-sm font-light leading-relaxed">
                {dish.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
          <button 
            type="button"
            onClick={onOpenMenu}
            className="border border-burnt-orange text-cream px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-burnt-orange transition-colors w-full cursor-pointer"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
}
