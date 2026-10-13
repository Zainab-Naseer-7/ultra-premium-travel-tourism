/**
 * VOYANTA - Ultra-Premium Travel & Tourism Platform
 * Master Data Store: Curated Luxury Destinations, Tour Packages, Hotels, Experiences, & Testimonials
 */

const VOYANTA_DATA = {
  // Brand Configuration & Currencies
  config: {
    brandName: "Voyanta",
    tagline: "Explore Beyond. Experience More.",
    supportEmail: "concierge@voyanta-luxury.com",
    phone: "+1 (800) 869-2682",
    headquarters: "450 Park Avenue, 28th Floor, New York, NY 10022",
    currencies: {
      USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
      EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
      GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" }
    }
  },

  // 10 Featured Global Destinations
  destinations: [
    {
      id: "dest-switzerland",
      name: "Switzerland",
      country: "Switzerland",
      continent: "Europe",
      shortDesc: "Majestic alpine summits, pristine glacier lakes, and world-renowned five-star chalet sanctuaries.",
      startingPrice: 3450,
      rating: 4.98,
      reviewsCount: 428,
      bestSeason: "Dec - Mar / Jun - Sep",
      badge: "Alpine Luxury",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Zermatt Matterhorn Heli-Tour", "Glacier 3000 Private Walk", "St. Moritz Luxury Chalets"],
      featured: true
    },
    {
      id: "dest-dubai",
      name: "Dubai",
      country: "United Arab Emirates",
      continent: "Middle East",
      shortDesc: "Futuristic architectural marvels, ultra-luxury desert dunes, Michelin dining, and private yacht charters.",
      startingPrice: 2890,
      rating: 4.95,
      reviewsCount: 612,
      bestSeason: "Nov - Apr",
      badge: "Ultramodern Glamour",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Burj Al Arab Private Suite", "Desert Royal Camp Stargazing", "Palm Jumeirah Helicopter Flight"],
      featured: true
    },
    {
      id: "dest-turkey",
      name: "Turkey",
      country: "Turkey",
      continent: "Europe / Asia",
      shortDesc: "Hot-air balloon flights above Cappadocia, Bosphorus luxury cruise, and historic Ottoman palaces.",
      startingPrice: 2350,
      rating: 4.92,
      reviewsCount: 389,
      bestSeason: "Apr - Jun / Sep - Nov",
      badge: "Imperial Heritage",
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Sunrise Ballooning in Göreme", "Bosphorus Private Yacht", "Ephesus VIP Archaeological Access"],
      featured: true
    },
    {
      id: "dest-maldives",
      name: "Maldives",
      country: "Maldives",
      continent: "Asia",
      shortDesc: "Secluded overwater villas, bioluminescent turquoise lagoons, underwater dining, and bespoke private atolls.",
      startingPrice: 4200,
      rating: 4.99,
      reviewsCount: 540,
      bestSeason: "Nov - Apr",
      badge: "Island Paradise",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Glass-Bottom Luxury Villa", "Coral Reef Private Dive", "Sub-Oceanic Gourmet Tasting"],
      featured: true
    },
    {
      id: "dest-paris",
      name: "Paris",
      country: "France",
      continent: "Europe",
      shortDesc: "Haute couture boutiques, Louvre private evening viewings, Seine sunset yachting, and grand palace hotels.",
      startingPrice: 3100,
      rating: 4.94,
      reviewsCount: 710,
      bestSeason: "Apr - Oct",
      badge: "Art & Romance",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Exclusive Versailles Palace Tour", "3-Star Michelin Gastronomy", "Vintage Rolls Royce City Tour"],
      featured: true
    },
    {
      id: "dest-london",
      name: "London",
      country: "United Kingdom",
      continent: "Europe",
      shortDesc: "Aristocratic Mayfair estates, Royal theatre galas, historic crown landmarks, and bespoke British hospitality.",
      startingPrice: 2950,
      rating: 4.91,
      reviewsCount: 460,
      bestSeason: "May - Sep",
      badge: "Royal Heritage",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Tower of London VIP Opening", "West End VIP Royal Box", "Cotswolds Private Estate Chauffeur"],
      featured: false
    },
    {
      id: "dest-bali",
      name: "Bali",
      country: "Indonesia",
      continent: "Asia",
      shortDesc: "Lush jungle infinity sanctuaries in Ubud, sacred cliffside temples of Uluwatu, and bespoke wellness retreats.",
      startingPrice: 1980,
      rating: 4.93,
      reviewsCount: 680,
      bestSeason: "Apr - Oct",
      badge: "Tropical Serenity",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Ubud Hanging Villa Oasis", "Private Shamanic Blessing", "Nusa Penida Yacht Charter"],
      featured: true
    },
    {
      id: "dest-japan",
      name: "Japan",
      country: "Japan",
      continent: "Asia",
      shortDesc: "Kyoto zen temple gardens, Mount Fuji ryokan onsens, Tokyo Michelin gastronomy, and bullet train elegance.",
      startingPrice: 3850,
      rating: 4.97,
      reviewsCount: 590,
      bestSeason: "Mar - May / Oct - Nov",
      badge: "Zen & Timeless Tradition",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Private Tea Ceremony with Master", "Mount Fuji Heli-Transfer", "Kaiseki Banquet with Geiko"],
      featured: true
    },
    {
      id: "dest-pakistan",
      name: "Pakistan",
      country: "Pakistan",
      continent: "Asia",
      shortDesc: "Breathtaking Hunza Karakoram peaks, emerald Attabad Lake, ancient Silk Road castles, and luxury mountain lodges.",
      startingPrice: 2200,
      rating: 4.96,
      reviewsCount: 310,
      bestSeason: "May - Oct",
      badge: "Alpine Frontier",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Hunza Valley Serena Glamping", "Rakaposhi Glacier Trek", "Attabad Lake Private Speedboat"],
      featured: true
    },
    {
      id: "dest-thailand",
      name: "Thailand",
      country: "Thailand",
      continent: "Asia",
      shortDesc: "Emerald limestone karsts of Phang Nga, golden Bangkok sanctuaries, private Koh Samui villas, and royal Thai dining.",
      startingPrice: 2150,
      rating: 4.90,
      reviewsCount: 495,
      bestSeason: "Nov - Apr",
      badge: "Exotic Coastal Luxury",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Phuket Catamaran Island Cruise", "Chiang Mai Elephant Sanctuary", "Rooftop Sky Bar Michelin Dinner"],
      featured: false
    }
  ],

  // Featured Tour Packages
  packages: [
    {
      id: "pkg-swiss-escape",
      title: "Swiss Alpine Grandeur Escape",
      destination: "Switzerland",
      duration: "7 Days / 6 Nights",
      days: 7,
      nights: 6,
      price: 4890,
      discountPrice: 4290,
      rating: 4.99,
      reviewsCount: 142,
      badge: "Signature Collection",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
      shortDesc: "Traverse Zurich, Lucerne, Interlaken, and Zermatt with private panoramic First-Class rail and alpine luxury suites.",
      includedActivities: [
        "First-Class Panoramic Glacier Express Pass",
        "Private Matterhorn Helicopter Flyover & Champagne",
        "5-Star Alpine Spa & Thermal Bath Access",
        "Gourmet Swiss Fondue & Wine Cellar Tasting"
      ],
      itinerary: [
        { day: 1, title: "Arrival in Zurich & Private Lake Cruise" },
        { day: 2, title: "Scenic Rail to Lucerne & Mount Pilatus Golden Roundtrip" },
        { day: 3, title: "Interlaken Adventure & Jungfraujoch Top of Europe" },
        { day: 4, title: "Glacier Express to Zermatt & Matterhorn Views" },
        { day: 5, title: "Private Heli-Tour & Mountain Chalet Fondue Experience" },
        { day: 6, title: "Lake Geneva Luxury Wellness & Vineyard Tour" },
        { day: 7, title: "Private Chauffeur Transfer to Geneva Departure" }
      ]
    },
    {
      id: "pkg-dubai-luxury",
      title: "Dubai Royal Ultramodern Journey",
      destination: "Dubai",
      duration: "5 Days / 4 Nights",
      days: 5,
      nights: 4,
      price: 3650,
      discountPrice: 3190,
      rating: 4.96,
      reviewsCount: 218,
      badge: "Ultra Luxury",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
      shortDesc: "Experience the epitome of futuristic grandeur with Burj Al Arab accommodation, private desert safaris, and yacht sails.",
      includedActivities: [
        "Burj Al Arab Private Sea View Suite with Butler",
        "Private Sunset Luxury Yacht Charter along Dubai Marina",
        "Royal Desert Safari with Private Michelin-Trained Chef",
        "VIP Sky View Lounge Access at Burj Khalifa 148th Floor"
      ],
      itinerary: [
        { day: 1, title: "Chauffeured Rolls Royce Arrival & Burj Al Arab Check-in" },
        { day: 2, title: "Old Dubai Heritage & Private Helicopter Skyline Tour" },
        { day: 3, title: "Palm Jumeirah Yacht Charter & Michelin-Starred Dining" },
        { day: 4, title: "Exclusive Vintage Land Rover Desert Oasis Glamping" },
        { day: 5, title: "Bespoke Personal Shopper Experience & VIP Airport Escort" }
      ]
    },
    {
      id: "pkg-turkey-discovery",
      title: "Imperial Turkey & Cappadocia Odyssey",
      destination: "Turkey",
      duration: "8 Days / 7 Nights",
      days: 8,
      nights: 7,
      price: 3100,
      discountPrice: 2690,
      rating: 4.94,
      reviewsCount: 185,
      badge: "Cultural Wonder",
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
      shortDesc: "Marvel at the domes of Istanbul, sail the turquoise Aegean, and float over Cappadocia’s fairy chimneys at sunrise.",
      includedActivities: [
        "Private Sunrise Hot Air Balloon Flight over Göreme Valley",
        "Sultan Cave Luxury Suite with Panoramic Terrace",
        "Bosphorus Private Sunset Cruise with Turkish Meze",
        "VIP Skip-the-Line Access to Hagia Sophia & Topkapi Palace"
      ],
      itinerary: [
        { day: 1, title: "Welcome to Istanbul & Luxury Bosphorus Waterfront Hotel" },
        { day: 2, title: "Private Historian Tour of Hagia Sophia & Grand Bazaar" },
        { day: 3, title: "Sunset Bosphorus Yacht Sail & Modern Ottoman Gastronomy" },
        { day: 4, title: "Flight to Cappadocia & Historic Cave Villa Check-in" },
        { day: 5, title: "Sunrise Hot Air Balloon Flight & Underground City" },
        { day: 6, title: "Pottery Masterclass & Red Valley Sunset Horseback Ride" },
        { day: 7, title: "Whirling Dervishes Spiritual Ceremony & Farewell Gala" },
        { day: 8, title: "Private Airport Transfer & Istanbul Departure" }
      ]
    },
    {
      id: "pkg-maldives-paradise",
      title: "Maldives Azure Overwater Sanctuary",
      destination: "Maldives",
      duration: "6 Days / 5 Nights",
      days: 6,
      nights: 5,
      price: 5400,
      discountPrice: 4750,
      rating: 4.99,
      reviewsCount: 290,
      badge: "Romantic Haven",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
      shortDesc: "Pure barefoot indulgence in an ultra-private ocean villa with glass floors, private pool, and personal sommelier.",
      includedActivities: [
        "Seaplane Scenic Flight with Aerial Atoll Views",
        "Overwater Villa with Private Infinity Pool & Waterslide",
        "Undersea Restaurant 5-Course Champagne Dinner",
        "Guided Whale Shark & Manta Ray Snorkeling Safari"
      ],
      itinerary: [
        { day: 1, title: "Scenic Seaplane Arrival & Overwater Villa Welcome" },
        { day: 2, title: "Private Lagoon Kayaking & Sunset Dolphin Cruise" },
        { day: 3, title: "Marine Biologist Snorkeling Safari with Manta Rays" },
        { day: 4, title: "Undersea Spa Sanctuary & Candlelit Sandbank Dinner" },
        { day: 5, title: "Catamaran Sailing & Bespoke Wine Tasting Session" },
        { day: 6, title: "Floating Breakfast & Return Seaplane to Malé" }
      ]
    },
    {
      id: "pkg-japan-cherry",
      title: "Kyoto & Tokyo Cherry Blossom Voyage",
      destination: "Japan",
      duration: "9 Days / 8 Nights",
      days: 9,
      nights: 8,
      price: 5200,
      discountPrice: 4680,
      rating: 4.98,
      reviewsCount: 164,
      badge: "Seasonal Masterpiece",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      shortDesc: "Experience ancient shrines, private tea ceremonies, ryokan hot springs, and Tokyo's ultra-futuristic gastronomy.",
      includedActivities: [
        "First-Class Shinkansen Bullet Train Passes",
        "Private After-Hours Access to Fushimi Inari & Golden Pavilion",
        "Traditional Ryokan Stay with Private Natural Onsen",
        "12-Course Omakase Sushi Dinner with Master Itamae"
      ],
      itinerary: [
        { day: 1, title: "Arrival in Tokyo & Luxury Shinjuku Sky Hotel" },
        { day: 2, title: "Tokyo Modern Arts, teamLab Borderless VIP Access" },
        { day: 3, title: "Tsukiji Market Master Tour & Omakase Dining" },
        { day: 4, title: "Bullet Train to Kyoto & Traditional Gion Walking Tour" },
        { day: 5, title: "Private Zen Garden Tea Ceremony & Arashiyama Bamboo Grove" },
        { day: 6, title: "Scenic Transfer to Hakone Ryokan & Mount Fuji Views" },
        { day: 7, title: "Natural Hot Springs Onsen Healing & Kaiseki Feast" },
        { day: 8, title: "Return to Tokyo & Ginza Luxury Shopping Concierge" },
        { day: 9, title: "VIP Airport Chauffeur & Departure" }
      ]
    },
    {
      id: "pkg-pakistan-karakoram",
      title: "Karakoram & Hunza Valley Crown Expedition",
      destination: "Pakistan",
      duration: "8 Days / 7 Nights",
      days: 8,
      nights: 7,
      price: 2950,
      discountPrice: 2490,
      rating: 4.97,
      reviewsCount: 112,
      badge: "Epic Explorer",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80",
      shortDesc: "Traverse the legendary Karakoram Highway, witness 7,000m peaks, and reside in boutique luxury lodges overlooking glacier lakes.",
      includedActivities: [
        "Private 4x4 Land Cruiser Chauffeur with Expert Mountain Guide",
        "Serena Hunza Baltit Fort Luxury Heritage Suites",
        "Attabad Lake Private Speedboat Excursion",
        "Passu Cones Golden Hour Photography & Apricot Feast"
      ],
      itinerary: [
        { day: 1, title: "Scenic Flight from Islamabad to Gilgit & Mountain Welcome" },
        { day: 2, title: "Journey along Karakoram Highway to Karimabad, Hunza" },
        { day: 3, title: "800-Year-Old Baltit & Altit Forts Private Heritage Tour" },
        { day: 4, title: "Attabad Lake Turquoise Waters & Boating Adventure" },
        { day: 5, title: "Passu Glacier Trek & Suspension Bridge Crossing" },
        { day: 6, title: "Duikar Eagle’s Nest Sunrise over Rakaposhi & Ultar Sar" },
        { day: 7, title: "Return to Gilgit Bazaar & Traditional Silk Road Dinner" },
        { day: 8, title: "Return Flight to Islamabad & Departure" }
      ]
    }
  ],

  // Hotels & Stays
  hotels: [
    {
      id: "hotel-chedi",
      name: "The Chedi Andermatt",
      location: "Andermatt, Switzerland",
      destination: "Switzerland",
      rating: 4.98,
      stars: 5,
      pricePerNight: 980,
      type: "Resort",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      amenities: ["Heated Indoor-Outdoor Pool", "Michelin-Starred Restaurant", "Full-Service Ski Butler", "Luxury Alpine Spa", "Fireplace Suites"],
      tag: "Best Mountain Luxury"
    },
    {
      id: "hotel-burj-al-arab",
      name: "Burj Al Arab Jumeirah",
      location: "Jumeirah Beach, Dubai",
      destination: "Dubai",
      rating: 4.99,
      stars: 5,
      pricePerNight: 1850,
      type: "5-Star Hotel",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
      amenities: ["24-Hour Dedicated Butler", "Private Beach Access", "Helipad Arrival Service", "Infinity Terrace Pool", "Gold-Accented Duplex"],
      tag: "Iconic Ultra-Luxury"
    },
    {
      id: "hotel-museum-turkey",
      name: "Museum Hotel Cappadocia",
      location: "Uçhisar, Turkey",
      destination: "Turkey",
      rating: 4.95,
      stars: 5,
      pricePerNight: 640,
      type: "Boutique",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
      amenities: ["Heated Cave Pool", "Living Museum Artifacts", "Panoramic Balloon Terrace", "Lil'a Fine Dining", "Organic Kitchen Garden"],
      tag: "Historic Cave Sanctuary"
    },
    {
      id: "hotel-soneva-jani",
      name: "Soneva Jani Overwater Reserve",
      location: "Noonu Atoll, Maldives",
      destination: "Maldives",
      rating: 5.0,
      stars: 5,
      pricePerNight: 2400,
      type: "Private Villa",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80",
      amenities: ["Retractable Roof for Stargazing", "Private Lagoon Waterslide", "Dedicated Barefoot Butler", "Overwater Silent Cinema", "Wine Tower"],
      tag: "World's Best Overwater"
    },
    {
      id: "hotel-ritz-paris",
      name: "Ritz Paris Place Vendôme",
      location: "Place Vendôme, Paris, France",
      destination: "Paris",
      rating: 4.97,
      stars: 5,
      pricePerNight: 1650,
      type: "5-Star Hotel",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
      amenities: ["Chanel Spa au Ritz", "Bar Hemingway", "Private Historic Garden", "Bespoke Concierge", "Marble Bathrooms"],
      tag: "Parisian Royalty"
    },
    {
      id: "hotel-mandapa-bali",
      name: "Mandapa, a Ritz-Carlton Reserve",
      location: "Ubud, Bali, Indonesia",
      destination: "Bali",
      rating: 4.96,
      stars: 5,
      pricePerNight: 890,
      type: "Resort",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
      amenities: ["Ayung River Pod Dining", "Patih (Private Butler)", "Holistic Ayurvedic Wellness", "Organic Rice Terrace Views", "Private River Pool"],
      tag: "Jungle Sanctuary"
    },
    {
      id: "hotel-aman-tokyo",
      name: "Aman Tokyo Sanctuary",
      location: "Otemachi, Tokyo, Japan",
      destination: "Japan",
      rating: 4.98,
      stars: 5,
      pricePerNight: 1450,
      type: "5-Star Hotel",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
      amenities: ["Panoramic Tokyo Skyline Views", "Traditional Black Basalt Onsen", "Washi Paper Architectural Design", "Cigar & Wine Lounge", "Private Sushi Master Bar"],
      tag: "Zen Urban Retreat"
    },
    {
      id: "hotel-serena-hunza",
      name: "Hunza Serena Mountain Resort",
      location: "Karimabad, Hunza, Pakistan",
      destination: "Pakistan",
      rating: 4.93,
      stars: 5,
      pricePerNight: 450,
      type: "Resort",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
      amenities: ["Ultar Glacier & Rakaposhi Views", "Traditional Walnut Wood Decor", "Osho Maraka Garden Dining", "Private Jeep Excursions", "Campfire Musical Evenings"],
      tag: "Roof of the World"
    }
  ],

  // 8 Travel Experiences
  experiences: [
    {
      id: "exp-mountain",
      title: "Mountain Adventures",
      subtitle: "Alpine summits, glacial treks & helicopter horizons",
      tripCount: 48,
      badge: "Thrilling",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      icon: "🏔️"
    },
    {
      id: "exp-beach",
      title: "Beach Escapes",
      subtitle: "Private atolls, turquoise waters & barefoot luxury",
      tripCount: 64,
      badge: "Serene",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      icon: "🏖️"
    },
    {
      id: "exp-city",
      title: "City Tours",
      subtitle: "Cosmopolitan wonders, Michelin dining & VIP architecture",
      tripCount: 52,
      badge: "Vibrant",
      image: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80",
      icon: "🌆"
    },
    {
      id: "exp-cultural",
      title: "Cultural Experiences",
      subtitle: "Ancient temples, imperial rituals & living folklore",
      tripCount: 76,
      badge: "Timeless",
      image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80",
      icon: "🏛️"
    },
    {
      id: "exp-wildlife",
      title: "Wildlife & Safaris",
      subtitle: "Serengeti migrations, marine reserves & rare encounters",
      tripCount: 35,
      badge: "Untamed",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      icon: "🦁"
    },
    {
      id: "exp-food",
      title: "Food & Wine Expeditions",
      subtitle: "Private vineyards, masterclasses & Michelin gastronomy",
      tripCount: 42,
      badge: "Gourmet",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
      icon: "🍷"
    },
    {
      id: "exp-luxury",
      title: "Ultra-Luxury Escapes",
      subtitle: "Superyachts, private jets & presidential sanctuaries",
      tripCount: 88,
      badge: "Exclusive",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      icon: "💎"
    },
    {
      id: "exp-family",
      title: "Family Grand Adventures",
      subtitle: "Multi-generational luxury retreats curated with care",
      tripCount: 59,
      badge: "Memorable",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
      icon: "👨‍👩‍👧‍👦"
    }
  ],

  // Travel Gallery
  gallery: [
    {
      id: "gal-1",
      category: "mountains",
      title: "The Matterhorn at Sunrise",
      location: "Zermatt, Switzerland",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
      aspect: "tall"
    },
    {
      id: "gal-2",
      category: "beaches",
      title: "Bioluminescent Lagoon",
      location: "Baa Atoll, Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
      aspect: "wide"
    },
    {
      id: "gal-3",
      category: "cities",
      title: "Dubai Marina at Twilight",
      location: "Dubai, United Arab Emirates",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
      aspect: "square"
    },
    {
      id: "gal-4",
      category: "hotels",
      title: "Overwater Pavilion Sanctuary",
      location: "Noonu Atoll, Maldives",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80",
      aspect: "wide"
    },
    {
      id: "gal-5",
      category: "adventure",
      title: "Hot Air Balloons of Cappadocia",
      location: "Göreme, Turkey",
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
      aspect: "tall"
    },
    {
      id: "gal-6",
      category: "culture",
      title: "Yasaka Pagoda in Evening Glow",
      location: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      aspect: "square"
    },
    {
      id: "gal-7",
      category: "mountains",
      title: "Rakaposhi Glacier Peak",
      location: "Hunza Valley, Pakistan",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80",
      aspect: "wide"
    },
    {
      id: "gal-8",
      category: "hotels",
      title: "The Chedi Infinity Pool",
      location: "Andermatt, Switzerland",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      aspect: "tall"
    },
    {
      id: "gal-9",
      category: "culture",
      title: "Louvre Pyramid by Night",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
      aspect: "square"
    }
  ],

  // Client Testimonials
  testimonials: [
    {
      id: "rev-1",
      name: "Victoria St. Claire",
      role: "Private Equity Partner, London",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      destination: "Swiss Alpine Grandeur Escape",
      rating: 5,
      review: "Voyanta orchestrated the most flawless 7 days of my life. From the private helicopter over the Matterhorn to the effortless luggage logistics between luxury chalets, their concierge standard is peerless.",
      date: "October 2025"
    },
    {
      id: "rev-2",
      name: "Alistair Sterling",
      role: "Architectural Director, Zurich",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      destination: "Kyoto & Tokyo Cherry Blossom Voyage",
      rating: 5,
      review: "As someone obsessed with design and discretion, Voyanta exceeded every expectation. Our private evening tour of Daitoku-ji and personal tea ceremony masterclass felt like stepping into an imperial dream.",
      date: "December 2025"
    },
    {
      id: "rev-3",
      name: "Dr. Farah & Tariq Mansour",
      role: "Founders, Dubai Healthcare Group",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      destination: "Maldives Azure Overwater Sanctuary",
      rating: 5,
      review: "Our 10th anniversary was celebrated in the highest echelon of tranquility. Soneva Jani's private overwater villa and candlelit sandbank dining under the southern stars will remain with us forever.",
      date: "January 2026"
    },
    {
      id: "rev-4",
      name: "Marcus Vance",
      role: "Tech Executive, San Francisco",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      destination: "Karakoram & Hunza Expedition",
      rating: 5,
      review: "I have traveled to over 80 countries, but Northern Pakistan with Voyanta was transcendental. The private helicopter shuttle, Serena heritage lodges, and mountain hospitality were extraordinary.",
      date: "February 2026"
    }
  ],

  // Travel Statistics
  statistics: [
    { target: 120, suffix: "+", label: "Destinations", sub: "Curated Across 6 Continents" },
    { target: 25, suffix: "K+", label: "Happy Travelers", sub: "Discerning Global Voyagers" },
    { target: 850, suffix: "+", label: "Travel Experiences", sub: "Handcrafted Itineraries" },
    { target: 4.9, suffix: "/5", label: "Average Rating", sub: "From Over 14,000 Reviews" }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "How do I book an ultra-premium trip with Voyanta?",
      a: "Booking is effortless. You can select any of our curated Signature Tour Packages, reserve luxury hotels directly through our portal, or use our Interactive Trip Planner to craft a bespoke itinerary. Once your request is submitted, a dedicated Private Travel Concierge is assigned to finalize your preferences and manage every detail."
    },
    {
      q: "Can I customize my tour package or itinerary?",
      a: "Absolutely. In fact, over 80% of Voyanta journeys are customized. You can alter dates, upgrade suites, request private jet or helicopter charters, integrate private dining, and add unique cultural accesses through our concierge team."
    },
    {
      q: "What payment methods and financial protections are available?",
      a: "We support major international cards (Visa, MasterCard, American Express Centurion/Platinum), wire transfers in USD/EUR/GBP, and secure digital escrow. All funds are secured in bonded client accounts with comprehensive travel insolvency insurance."
    },
    {
      q: "What is Voyanta's cancellation and flexibility policy?",
      a: "We offer elite flexible booking terms. Most signature packages allow complimentary rescheduling or cancellation up to 21 days prior to departure. We also offer comprehensive bespoke cancellation protection with 100% credit guarantees."
    },
    {
      q: "Do you provide luxury airport transfers and VIP tarmac services?",
      a: "Yes. Every Voyanta package includes private chauffeur transfers in top-tier executive vehicles (Mercedes S-Class, Range Rover Autobiography, Rolls Royce, or executive vans). Fast-track VIP airport tarmac immigration escorts are standard across all major hubs."
    },
    {
      q: "Can I book hotels and private villas separately?",
      a: "Yes. Our Hotels & Stays catalog allows independent reservations with exclusive Voyanta Privileges, including complimentary daily breakfast, $100 resort credits, room upgrades upon availability, and early check-in/late checkout."
    }
  ],

  // Special Limited Offers
  specialOffers: [
    {
      code: "VOYANTA-SUMMER",
      title: "Swiss Alpine Summer Luxury",
      discount: "20% OFF",
      dest: "Switzerland",
      desc: "Receive complimentary helicopter transfer from Zurich Airport plus private Swiss wine cellar dinner.",
      validTill: "Valid for next 48 hours",
      originalPrice: 4890,
      offerPrice: 3912
    },
    {
      code: "MALDIVES-VILLA",
      title: "Maldives Overwater Upgrade",
      discount: "Free Upgrade",
      dest: "Maldives",
      desc: "Complimentary upgrade to Two-Bedroom Water Reserve with private slide + daily undersea spa voucher.",
      validTill: "Limited to 5 Suites",
      originalPrice: 5400,
      offerPrice: 4750
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.VOYANTA_DATA = VOYANTA_DATA;
}
