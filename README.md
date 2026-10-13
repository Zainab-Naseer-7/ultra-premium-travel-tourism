# Voyanta — Ultra-Premium World-Class Travel & Tourism Platform

[![Voyanta Luxury Travel](https://img.shields.io/badge/Brand-Voyanta-00b4d8.svg?style=flat-square)](#)
[![Design-System](https://img.shields.io/badge/Design_System-Midnight_Navy_%26_Warm_Gold-d4af37.svg?style=flat-square)](#)
[![Performance](https://img.shields.io/badge/Performance-Ultra--Fast_Vanilla_Stack-10b981.svg?style=flat-square)](#)

> **"Explore Beyond. Experience More."**
> Discover unforgettable destinations, extraordinary experiences, and journeys designed around you with five-star concierge precision.

---

## 💎 Brand Identity & Visual System

* **Brand Name**: **Voyanta**
* **Primary Color Palette**:
  - **Midnight Navy / Deep Sapphire**: `#070d1e`, `#0a142f`, `#0d1a3a`
  - **Turquoise / Sky Blue Accent**: `#00b4d8`, `#0096c7`, `#90e0ef`
  - **Warm Gold Highlights**: `#d4af37`, `#c59b27`, `#fef9e7`
  - **Clean Backgrounds**: Soft off-white `#f8fafc`, crisp white `#ffffff`
* **Typography**:
  - **Headings & Body**: `Plus Jakarta Sans`
  - **Editorial Luxury Accents**: `Playfair Display`
* **Visual Language**:
  - Layered glassmorphism (`backdrop-filter: blur(18px)`)
  - Multi-tier ambient shadows & gentle glows
  - Micro-interactions on hover, click, and scroll
  - Hardware-accelerated transitions (smooth and responsive)

---

## 🌟 Core Features & Modules

1. **Luxury Sticky Navigation**:
   - Compact morphing upon scroll
   - Active scrollspy section highlighting
   - Dynamic currency selector (`USD $`, `EUR €`, `GBP £`) that updates all prices across the platform in real time
   - Wishlist indicator with animated badge counter synced to `localStorage`
   - Dedicated User Dashboard modal toggle
   - Fully responsive mobile drawer with accessible backdrop

2. **Extraordinary Hero Section**:
   - High-definition cinematic background visual with gentle Ken Burns animation
   - Floating destination preview cards (Switzerland Alps & Azure Maldives)
   - Floating glass search interface with destination picker, date selector, guest counter, and search routing
   - Trust strip highlighting concierge benefits and bonded travel guarantee

3. **Travel Statistics Counter**:
   - `IntersectionObserver` animated counter triggering smoothly on viewport entry:
     - **120+** Destinations
     - **25K+** Happy Travelers
     - **850+** Travel Experiences
     - **4.9/5** Average Rating (14,000+ Reviews)

4. **Destinations Discovery Section**:
   - 10 curated global destinations (Switzerland, Dubai, Turkey, Maldives, Paris, London, Bali, Japan, Pakistan, Thailand)
   - Category filtering (All, Europe, Asia, Middle East)
   - Starting prices, ratings, verified badges, wishlist toggles, and detail view modals

5. **Featured Tour Packages**:
   - Turnkey Signature Expeditions (Swiss Alpine Grandeur, Dubai Royal Ultramodern, Imperial Turkey & Cappadocia, Maldives Azure Sanctuary, Kyoto & Tokyo Blossom, Karakoram & Hunza Expedition)
   - Duration tags, price discounts, included luxury activities
   - Direct "Book Now" reservation modal with prefilled data and "View Details" modal

6. **Interactive Bespoke Trip Planner**:
   - 4-step interactive trip designer
   - Destination selector & season picker
   - 6 travel styles: Adventure, Ultra-Luxury, Family Grand, Romantic Haven, Cultural Heritage, Zen Relaxation
   - Dynamic budget range slider ($2,500 to $35,000+)
   - Generates custom day-by-day tailored itinerary with 99% match score and direct booking trigger

7. **Curated Experiences Section**:
   - 8 signature travel categories (Mountain Adventures, Beach Escapes, City Tours, Cultural Experiences, Wildlife & Safaris, Food & Wine, Ultra-Luxury, Family Adventures)
   - Responsive cards with zoom and overlay effects

8. **Hotels & Stays (With Live Dynamic Filters)**:
   - Handpicked 5-star properties, overwater villas, and heritage boutiques
   - Real-time client-side filters:
     - Filter by Property Type (Resorts, 5-Star Hotels, Private Villas, Boutiques)
     - Filter by Destination
     - Filter by Maximum Nightly Rate
     - Filter by Minimum Star Rating
     - Instant filter reset

9. **Travel Gallery & Interactive Lightbox**:
   - Masonry layout featuring mountains, beaches, cities, hotels, and culture
   - Lightbox modal with keyboard support (Left, Right, Escape), prev/next controls, and captions

10. **Client Testimonials Carousel**:
    - High-profile traveler stories with authentic avatars, roles, ratings, and quotes
    - Smooth carousel with pagination dots and pause-on-hover

11. **Special Offer Promotion**:
    - Real-time 48-hour countdown clock
    - Copyable promo code (`VOYANTA-SUMMER`) with instant clipboard toast confirmation
    - Direct booking activation

12. **FAQ Accordion**:
    - Smooth animated accordion addressing booking policies, private customization, payment securities, cancellation flexibility, and airport VIP services

13. **Contact Section & Map Preview**:
    - Contact form with client-side field validation and feedback
    - Global headquarters details (New York, Zurich, Dubai)
    - Interactive stylized map visual

14. **User Dashboard (Voyanta Member Portal)**:
    - Tabbed view: My Bookings, Curated Wishlist, Concierge Preferences, Notifications
    - Live booking creation and voucher printing
    - Direct wishlist item removal and management

15. **Quick Booking & Reservation Modal**:
    - Lead guest details, dates, party size, and payment method selection
    - Saves reservations to `localStorage` and alerts via custom toasts

---

## ⚡ Technical Quality & Performance

* **Zero Heavy Dependencies**: Pure Vanilla HTML5, CSS3, and modern JavaScript (ES6+).
* **Instant Load Times**: CDN-optimized image delivery with modern query formatting, lazy loading, and hardware acceleration.
* **100% Responsive**: Tested breakpoints for 4K/wide desktop, standard laptop, tablet portrait/landscape, and small mobile phones.
* **SEO Optimized**: Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`), OpenGraph metadata, and structured JSON-LD schema for `TravelAgency`.
* **Keyboard Accessible**: Focus indicators, ARIA attributes (`aria-expanded`, `aria-label`, `role="dialog"`, `aria-modal`), and ESC key modal closing.

---

## 🚀 How to Open and Preview

Simply double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox). No server installation or build step is required!
