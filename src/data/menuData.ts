export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: ('Chef’s Special' | 'Popular' | 'Vegetarian' | 'Spicy' | 'Wood-Fired')[];
  featured?: boolean;
  notes?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'starters',
    title: 'Starters',
    subtitle: 'Cold coastal waters, garden roots, and initial hearth embers',
    items: [
      {
        id: 'starter-1',
        name: 'Charred Spanish Octopus',
        description: 'Tender octopus tentacle blistered over red oak, smoked paprika oil, fingerling potato confit, charred lemon emulsion.',
        price: '$28',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2571&auto=format&fit=crop',
        tags: ['Popular', 'Wood-Fired'],
      },
      {
        id: 'starter-2',
        name: 'Coal-Baked Stracciatella',
        description: 'Warm pulled buffalo stracciatella, blistered heirloom tomatoes, wild mountain oregano, basil reduction, grilled levain sourdough.',
        price: '$22',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2568&auto=format&fit=crop',
        tags: ['Vegetarian', 'Wood-Fired'],
      },
      {
        id: 'starter-3',
        name: 'Roasted Bone Marrow',
        description: 'Split beef bone roasted over ash coals, shallot herb marmalade, toasted country bread, flaked Maldon salt.',
        price: '$26',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2669&auto=format&fit=crop',
        tags: ['Chef’s Special'],
      },
      {
        id: 'starter-4',
        name: 'Smoked Yellowfin Tuna Crudo',
        description: 'Hay-smoked yellowfin, fermented chili oil, shaved sea radish, finger lime caviar, cold-pressed olive oil.',
        price: '$25',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2669&auto=format&fit=crop',
        tags: ['Spicy'],
      },
    ],
  },
  {
    id: 'mains',
    title: 'Main Courses',
    subtitle: 'Prime cuts and coastal catches seared over glowing charcoal grids',
    items: [
      {
        id: 'main-1',
        name: 'Ember-Roasted Prime Ribeye (16oz)',
        description: 'Grass-fed prime beef cooked directly over weeping cherry embers, charred baby leeks, fire-roasted marrow jus, smoked garlic confit.',
        price: '$68',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop',
        tags: ['Popular', 'Wood-Fired'],
        notes: 'Aged 35 days in-house',
      },
      {
        id: 'main-2',
        name: 'Whole Roasted Mediterranean Sea Bass',
        description: 'Crispy skin wild sea bass cooked on the plancha, wild fennel pollen, caperberry brown butter, charred Meyer lemon.',
        price: '$54',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2670&auto=format&fit=crop',
        tags: ['Wood-Fired'],
      },
      {
        id: 'main-3',
        name: 'Slow-Smoked Lamb Shoulder',
        description: 'Pasture-raised lamb braised and finished over almond wood smoke, pomegranate molasses glaze, minted yogurt, crushed toasted pistachios.',
        price: '$48',
        image: 'https://images.unsplash.com/photo-1514944298352-df919293144a?q=80&w=2670&auto=format&fit=crop',
        tags: ['Chef’s Special'],
      },
      {
        id: 'main-4',
        name: 'Heritage Pork Chop & Charred Peach',
        description: 'Thick cut Berkshire pork chop, smoked lard glaze, grilled summer stone fruit, fire-wilted mustard greens, reduced cider demi.',
        price: '$44',
        image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop',
        tags: ['Wood-Fired'],
      },
      {
        id: 'main-5',
        name: 'Smoked King Oyster Mushroom Steak',
        description: 'Coal-seared king oyster mushrooms, truffled parsnip velvet, charred shallot puree, crispy sage, port wine reduction.',
        price: '$34',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop',
        tags: ['Vegetarian', 'Wood-Fired'],
      },
      {
        id: 'main-6',
        name: 'Coal-Grilled Tiger Prawns',
        description: 'Jumbo prawns grilled shell-on over white oak coals, roasted fermented garlic chili butter, lime leaves, blistered padron peppers.',
        price: '$46',
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=2574&auto=format&fit=crop',
        tags: ['Spicy', 'Popular'],
      },
    ],
  },
  {
    id: 'signature',
    title: 'Signature Dishes',
    subtitle: 'Our chef’s ultimate open-fire masterpieces — designed for communion and celebration',
    items: [
      {
        id: 'sig-1',
        name: '45-Day Dry-Aged Tomahawk (42oz)',
        description: 'The pinnacle of Ember & Salt. Massive bone-in ribeye seared caveman-style on hardwood coals. Served carved tableside with smoked bone marrow butter, roasted head of garlic, and trio of volcanic sea salts.',
        price: '$165',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2670&auto=format&fit=crop',
        tags: ['Chef’s Special', 'Wood-Fired'],
        featured: true,
        notes: 'Serves 2–3 guests • 45 min preparation',
      },
      {
        id: 'sig-2',
        name: 'Whole Wild Turbot Over Beech Embers',
        description: 'Grilled whole in artisanal fish cages over low glowing embers. Basted continuously with txakoli wine vinegar, toasted garlic, and hot olive oil.',
        price: '$120',
        image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=2574&auto=format&fit=crop',
        tags: ['Chef’s Special'],
        featured: true,
        notes: 'Serves 2 guests • Subject to market arrival',
      },
      {
        id: 'sig-3',
        name: 'The Grand Fire Feast Board',
        description: 'A curated tasting spread: carved prime sirloin, ember pork belly, grilled prawns, blistered farm veggies, and warm hearth bread.',
        price: '$195',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop',
        tags: ['Popular', 'Chef’s Special'],
        featured: true,
        notes: 'Chef recommendation for parties of 3–4',
      },
    ],
  },
  {
    id: 'sides',
    title: 'Sides & Complements',
    subtitle: 'Accompaniments born from garden harvests and hearth embers',
    items: [
      {
        id: 'side-1',
        name: 'Burnt Honey & Whipped Ricotta Carrots',
        description: 'Rainbow carrots roasted directly in embers, whipped sheep milk ricotta, spiced honey drizzle, toasted coriander and pumpkin seeds.',
        price: '$18',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2513&auto=format&fit=crop',
        tags: ['Vegetarian'],
      },
      {
        id: 'side-2',
        name: 'Crispy Smashed Fingerling Potatoes',
        description: 'Double-cooked baby potatoes, rosemary salt, smoked tallow aioli, fresh chives.',
        price: '$15',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2670&auto=format&fit=crop',
        tags: ['Popular'],
      },
      {
        id: 'side-3',
        name: 'Charred Broccolini & Preserved Lemon',
        description: 'Fire-singed tender stems, toasted Marcona almonds, preserved lemon vinaigrette, shaved parmesan.',
        price: '$16',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=2574&auto=format&fit=crop',
        tags: ['Vegetarian'],
      },
      {
        id: 'side-4',
        name: 'Skillet Cornbread with Smoked Honey Butter',
        description: 'Cast-iron baked sweet corn cake, coarse sea salt, whipped house-smoked wildflower honey butter.',
        price: '$14',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2672&auto=format&fit=crop',
        tags: ['Vegetarian', 'Wood-Fired'],
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    subtitle: 'Smoked sweets, caramel crusts, and comforting fireside finishes',
    items: [
      {
        id: 'dessert-1',
        name: 'Dark Chocolate & Ember Caramel Tart',
        description: '70% Valrhona dark chocolate ganache, smoked birch caramel center, black lava sea salt flakes, cocoa nib crust.',
        price: '$17',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2670&auto=format&fit=crop',
        tags: ['Popular'],
      },
      {
        id: 'dessert-2',
        name: 'Burnt Basque Fire Cheesecake',
        description: 'Caramelized mahogany top with an oozing creamy center, fire-macerated wild blackberry compote, mint leaf.',
        price: '$16',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2670&auto=format&fit=crop',
        tags: ['Chef’s Special'],
      },
      {
        id: 'dessert-3',
        name: 'Fire-Roasted Fig & Mascarpone',
        description: 'Black Mission figs caramelized over hickory coals, whipped vanilla mascarpone, pistachio crunch, aged balsamic glaze.',
        price: '$18',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2565&auto=format&fit=crop',
        tags: ['Vegetarian', 'Wood-Fired'],
      },
      {
        id: 'dessert-4',
        name: 'Smoked Vanilla Bean & Honeycomb Affogato',
        description: 'Charcoal-infused gelato, double shot of espresso poured tableside, shattered honeycomb toffee.',
        price: '$14',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2670&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks & Cocktails',
    subtitle: 'Smoked spirits, volcanic terroirs, and handcrafted botanical libations',
    items: [
      {
        id: 'drink-1',
        name: 'Smoked Maple Old Fashioned',
        description: 'High-rye bourbon infused with charred oak, Vermont smoked maple syrup, aromatic bitters, torch-flamed orange twist and smoked rosemary sprig.',
        price: '$21',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop',
        tags: ['Popular'],
      },
      {
        id: 'drink-2',
        name: 'Charred Agave Mezcalita',
        description: 'Artisanal mezcal, roasted pineapple purée, fresh lime juice, organic agave, black volcanic chili salt rim.',
        price: '$20',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2657&auto=format&fit=crop',
        tags: ['Spicy'],
      },
      {
        id: 'drink-3',
        name: 'Ember & Thyme Spritz',
        description: 'Aperol, roasted wild thyme cordial, prosecco di Valdobbiadene, sparkling soda, blood orange slice.',
        price: '$18',
        image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=2574&auto=format&fit=crop',
      },
      {
        id: 'drink-4',
        name: 'Volcanic Etna Rosso 2021',
        description: 'Nerello Mascalese, Sicily. Earthy, smoke-tinged red berries, mineral backbone. Perfectly complements fire-cooked meats.',
        price: '$24 / $95',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop',
        tags: ['Chef’s Special'],
      },
    ],
  },
];
