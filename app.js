/**
 * VOYANTA - Ultra-Premium Travel & Tourism Platform
 * Main Application Logic & Interactivity
 */

(function () {
  'use strict';

  // Master Application State
  const AppState = {
    currency: 'USD',
    wishlist: JSON.parse(localStorage.getItem('voyanta_wishlist')) || ['dest-switzerland', 'pkg-dubai-luxury'],
    bookings: JSON.parse(localStorage.getItem('voyanta_bookings')) || [
      {
        id: 'BK-89421',
        title: 'Swiss Alpine Grandeur Escape',
        destination: 'Switzerland',
        date: '2026-10-15',
        guests: 2,
        price: 4290,
        status: 'Confirmed'
      }
    ],
    galleryFilter: 'all',
    currentLightboxIndex: 0,
    activeReviewIndex: 0,
    reviewInterval: null,
    countersTriggered: false
  };

  // Helper: Format Price based on active currency
  function formatPrice(amountInUSD) {
    const cur = VOYANTA_DATA.config.currencies[AppState.currency] || VOYANTA_DATA.config.currencies.USD;
    const converted = Math.round(amountInUSD * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  }

  // Helper: Toast Notifications
  function showToast(message, type = 'info', icon = '✨') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'gold' ? 'toast-gold' : ''}`;
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // 1. NAVIGATION & SCROLL HANDLERS
  // --------------------------------------------------------------------------
  function initNavigation() {
    const navbarWrapper = document.getElementById('navbarWrapper');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const currencyBtn = document.getElementById('currencyBtn');
    const currencyDropdown = document.getElementById('currencyDropdown');

    // Sticky Navbar & Scroll To Top Visibility
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 60) {
        navbarWrapper.classList.add('scrolled');
      } else {
        navbarWrapper.classList.remove('scrolled');
      }

      if (scrollPos > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }

      updateActiveNavLink();
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Drawer Toggle
    function toggleDrawer(open) {
      if (open) {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('open');
        mobileToggle.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('open');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      toggleDrawer(!isOpen);
    });

    drawerBackdrop.addEventListener('click', () => toggleDrawer(false));

    // Close mobile drawer when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });

    // Currency Dropdown
    currencyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currencyDropdown.classList.toggle('active');
    });

    document.querySelectorAll('.currency-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const curCode = e.target.getAttribute('data-currency');
        if (curCode && VOYANTA_DATA.config.currencies[curCode]) {
          AppState.currency = curCode;
          document.getElementById('currentCurrencyLabel').textContent = curCode;
          currencyDropdown.classList.remove('active');
          showToast(`Currency changed to ${curCode}`, 'gold', '💱');
          renderAllDynamicCards();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!currencyBtn.contains(e.target) && !currencyDropdown.contains(e.target)) {
        currencyDropdown.classList.remove('active');
      }
    });

    // Scrollspy for Nav Links
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    updateWishlistBadge();
  }

  // Update Wishlist Badge Counter
  function updateWishlistBadge() {
    const badge = document.getElementById('wishlistBadge');
    if (badge) {
      badge.textContent = AppState.wishlist.length;
      badge.style.transform = 'scale(1.25)';
      setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }
  }

  // Toggle Wishlist Item
  function toggleWishlistItem(id, title = 'Item') {
    const index = AppState.wishlist.indexOf(id);
    if (index > -1) {
      AppState.wishlist.splice(index, 1);
      showToast(`Removed "${title}" from your wishlist`, 'info', '♡');
    } else {
      AppState.wishlist.push(id);
      showToast(`Added "${title}" to your curated wishlist`, 'gold', '❤️');
    }
    localStorage.setItem('voyanta_wishlist', JSON.stringify(AppState.wishlist));
    updateWishlistBadge();
    renderDestinations();
    renderPackages();
  }

  // --------------------------------------------------------------------------
  // 2. HERO SEARCH & FLOATING TEASERS
  // --------------------------------------------------------------------------
  function initHeroSearch() {
    const searchForm = document.getElementById('heroSearchForm');
    const destSelect = document.getElementById('heroDestSelect');

    // Populate Destination select
    if (destSelect) {
      VOYANTA_DATA.destinations.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.name;
        opt.textContent = `${d.name} (${d.country})`;
        destSelect.appendChild(opt);
      });
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const destination = destSelect.value;
        const dates = document.getElementById('heroDatesInput').value;
        const travelers = document.getElementById('heroTravelersInput').value;

        showToast(`Searching curated journeys for ${destination}...`, 'gold', '🔍');

        // Smooth scroll to destinations section and highlight
        const destSection = document.getElementById('destinations');
        if (destSection) {
          destSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 3. DESTINATIONS Discovery Section
  // --------------------------------------------------------------------------
  function renderDestinations(categoryFilter = 'all') {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = categoryFilter === 'all'
      ? VOYANTA_DATA.destinations
      : VOYANTA_DATA.destinations.filter(d => d.continent.toLowerCase().includes(categoryFilter.toLowerCase()));

    filtered.forEach(dest => {
      const isWishlisted = AppState.wishlist.includes(dest.id);
      const card = document.createElement('div');
      card.className = 'dest-card';
      card.innerHTML = `
        <div class="dest-card-media">
          <img class="dest-card-img" src="${dest.image}" alt="${dest.name} - Luxury travel with Voyanta" loading="lazy">
          <span class="dest-card-badge">${dest.badge}</span>
          <button class="dest-wishlist-btn ${isWishlisted ? 'active' : ''}" title="Save to Wishlist" data-dest-id="${dest.id}" data-title="${dest.name}">
            ${isWishlisted ? '❤️' : '♡'}
          </button>
          <div class="dest-card-rating">
            <span class="star">★</span> ${dest.rating} <span style="font-size:0.7rem;opacity:0.8">(${dest.reviewsCount})</span>
          </div>
        </div>
        <div class="dest-card-body">
          <div class="dest-card-location">${dest.country} • ${dest.continent}</div>
          <h3 class="dest-card-title">${dest.name}</h3>
          <p class="dest-card-desc">${dest.shortDesc}</p>
          <div class="dest-card-footer">
            <div class="dest-price-box">
              <span class="dest-price-label">Journeys from</span>
              <span class="dest-price-val">${formatPrice(dest.startingPrice)}</span>
            </div>
            <button class="btn btn-sm btn-primary btn-explore-dest" data-dest-id="${dest.id}">
              Explore
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach Wishlist listeners
    grid.querySelectorAll('.dest-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-dest-id');
        const title = btn.getAttribute('data-title');
        toggleWishlistItem(id, title);
      });
    });

    // Attach Explore Destination modal triggers
    grid.querySelectorAll('.btn-explore-dest').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-dest-id');
        openDestinationModal(id);
      });
    });
  }

  function initDestinationFilters() {
    const filterButtons = document.querySelectorAll('.dest-filter-chip');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        renderDestinations(cat);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. FEATURED TOUR PACKAGES
  // --------------------------------------------------------------------------
  function renderPackages() {
    const grid = document.getElementById('packagesGrid');
    if (!grid) return;

    grid.innerHTML = '';
    VOYANTA_DATA.packages.forEach(pkg => {
      const isWishlisted = AppState.wishlist.includes(pkg.id);
      const card = document.createElement('div');
      card.className = 'pkg-card';
      card.innerHTML = `
        <div class="pkg-media">
          <img class="pkg-img" src="${pkg.image}" alt="${pkg.title}" loading="lazy">
          <span class="pkg-badge">${pkg.badge}</span>
          <div class="pkg-duration-pill">
            <span>🗓️</span> ${pkg.duration}
          </div>
          <button class="dest-wishlist-btn ${isWishlisted ? 'active' : ''}" style="top:16px; right:16px;" data-pkg-id="${pkg.id}" data-title="${pkg.title}">
            ${isWishlisted ? '❤️' : '♡'}
          </button>
        </div>
        <div class="pkg-body">
          <div class="pkg-dest">${pkg.destination}</div>
          <h3 class="pkg-title">${pkg.title}</h3>
          <p class="pkg-desc">${pkg.shortDesc}</p>
          <div class="pkg-inclusions">
            ${pkg.includedActivities.slice(0, 3).map(act => `
              <div class="pkg-inclusion-item">
                <span class="pkg-inclusion-icon">✓</span>
                <span>${act}</span>
              </div>
            `).join('')}
          </div>
          <div class="pkg-footer">
            <div class="pkg-price-col">
              <span class="pkg-price-was">${formatPrice(pkg.price)}</span>
              <span class="pkg-price-now">${formatPrice(pkg.discountPrice)} <small style="font-size:0.75rem;font-weight:normal;color:#64748b">/ person</small></span>
            </div>
            <div class="pkg-actions">
              <button class="btn btn-sm btn-outline btn-pkg-details" data-pkg-id="${pkg.id}">
                View Details
              </button>
              <button class="btn btn-sm btn-gold btn-pkg-book" data-pkg-id="${pkg.id}" data-title="${pkg.title}" data-price="${pkg.discountPrice}">
                Book Now
              </button>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Wishlist listeners
    grid.querySelectorAll('.dest-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-pkg-id');
        const title = btn.getAttribute('data-title');
        toggleWishlistItem(id, title);
      });
    });

    // View Details triggers
    grid.querySelectorAll('.btn-pkg-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-pkg-id');
        openPackageDetailModal(id);
      });
    });

    // Book Now triggers
    grid.querySelectorAll('.btn-pkg-book').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-pkg-id');
        const title = btn.getAttribute('data-title');
        const price = btn.getAttribute('data-price');
        openBookingModal({ packageId: id, title, price });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. INTERACTIVE TRIP PLANNER
  // --------------------------------------------------------------------------
  function initTripPlanner() {
    const destSelect = document.getElementById('plannerDestSelect');
    const budgetSlider = document.getElementById('plannerBudgetSlider');
    const budgetDisplay = document.getElementById('plannerBudgetDisplay');
    const travelersInput = document.getElementById('plannerTravelers');
    const styleCards = document.querySelectorAll('.style-card-btn');
    const generateBtn = document.getElementById('plannerGenerateBtn');
    const resultCard = document.getElementById('plannerResultCard');

    let selectedStyle = 'Luxury';

    // Populate planner destinations
    if (destSelect) {
      VOYANTA_DATA.destinations.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.name;
        opt.textContent = `${d.name} (${d.country})`;
        destSelect.appendChild(opt);
      });
    }

    // Budget Slider sync
    if (budgetSlider && budgetDisplay) {
      budgetSlider.addEventListener('input', () => {
        const val = parseInt(budgetSlider.value, 10);
        budgetDisplay.textContent = formatPrice(val);
      });
    }

    // Style button clicks
    styleCards.forEach(card => {
      card.addEventListener('click', () => {
        styleCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedStyle = card.getAttribute('data-style');
      });
    });

    // Generate Custom Trip
    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        const destination = destSelect.value;
        const budget = parseInt(budgetSlider.value, 10);
        const travelers = parseInt(travelersInput.value, 10) || 2;
        const dates = document.getElementById('plannerDates').value || 'Flexible Summer 2026';

        // Calculate dynamic bespoke itinerary
        const matchDest = VOYANTA_DATA.destinations.find(d => d.name === destination) || VOYANTA_DATA.destinations[0];
        const perPersonBudget = Math.round(budget / travelers);

        resultCard.classList.add('visible');
        resultCard.innerHTML = `
          <div class="planner-result-header">
            <div>
              <div style="font-size:0.8rem; font-weight:700; color:var(--color-accent); text-transform:uppercase;">Custom Tailored Itinerary • 99% Match</div>
              <h3 style="font-size:1.6rem; font-weight:800; color:#ffffff; margin-top:4px;">${selectedStyle} Voyage to ${destination}</h3>
              <p style="font-size:0.9rem; color:rgba(255,255,255,0.75); margin-top:2px;">Curated for ${travelers} Guests • Total Budget: ${formatPrice(budget)} (${formatPrice(perPersonBudget)} / guest)</p>
            </div>
            <div style="text-align:right;">
              <span class="dest-card-badge" style="position:static; display:inline-block;">★ 5-Star Certified</span>
            </div>
          </div>

          <div style="margin-bottom:20px;">
            <p style="font-size:0.95rem; color:rgba(255,255,255,0.9); line-height:1.6;">
              Based on your selection of <strong>${selectedStyle}</strong> travel in <strong>${destination}</strong>, our intelligent concierge algorithm has structured an exclusive 7-day luxury program featuring private charters, Michelin gastronomy, and 5-star sanctuary retreats.
            </p>
          </div>

          <div class="itinerary-preview-list">
            <div class="itinerary-day-box">
              <span class="itinerary-day-tag">Day 1</span>
              <div>
                <strong style="color:#ffffff;">VIP Chauffeur & Sanctuary Check-In</strong>
                <p style="font-size:0.82rem; color:rgba(255,255,255,0.7);">Private Mercedes Maybach transfer to 5-star retreat. Evening bespoke champagne tasting.</p>
              </div>
            </div>
            <div class="itinerary-day-box">
              <span class="itinerary-day-tag">Day 2 - 4</span>
              <div>
                <strong style="color:#ffffff;">${selectedStyle} Signature Highlights</strong>
                <p style="font-size:0.82rem; color:rgba(255,255,255,0.7);">${matchDest.highlights.join(' • ')}.</p>
              </div>
            </div>
            <div class="itinerary-day-box">
              <span class="itinerary-day-tag">Day 5 - 7</span>
              <div>
                <strong style="color:#ffffff;">Wellness, Private Yachting & VIP Departure</strong>
                <p style="font-size:0.82rem; color:rgba(255,255,255,0.7);">Full-day private catamaran cruise, private spa sanctuary, and seamless VIP airport tarmac escort.</p>
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1);">
            <div>
              <span style="font-size:0.8rem; color:rgba(255,255,255,0.7);">Estimated Complete Package:</span>
              <div style="font-size:1.5rem; font-weight:800; color:var(--color-gold);">${formatPrice(budget)}</div>
            </div>
            <button class="btn btn-gold" id="btnBookCustomTrip">
              Book This Custom Itinerary ✨
            </button>
          </div>
        `;

        showToast('Personalized bespoke itinerary generated!', 'gold', '🧭');

        // Smooth scroll to result
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        document.getElementById('btnBookCustomTrip').addEventListener('click', () => {
          openBookingModal({
            packageId: 'custom-planner',
            title: `${selectedStyle} Journey to ${destination}`,
            price: budget,
            guests: travelers
          });
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. EXPERIENCES SECTION
  // --------------------------------------------------------------------------
  function renderExperiences() {
    const grid = document.getElementById('experiencesGrid');
    if (!grid) return;

    grid.innerHTML = '';
    VOYANTA_DATA.experiences.forEach(exp => {
      const card = document.createElement('div');
      card.className = 'exp-card';
      card.innerHTML = `
        <img class="exp-bg-img" src="${exp.image}" alt="${exp.title}" loading="lazy">
        <span class="exp-badge-top">${exp.badge}</span>
        <div class="exp-overlay">
          <div class="exp-icon">${exp.icon}</div>
          <h3 class="exp-title">${exp.title}</h3>
          <p class="exp-subtitle">${exp.subtitle}</p>
          <div class="exp-count">
            <span>Explore ${exp.tripCount}+ Curated Journeys</span>
            <span>→</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        showToast(`Filtering experiences for "${exp.title}"...`, 'info', exp.icon);
        const pkgSection = document.getElementById('packages');
        if (pkgSection) pkgSection.scrollIntoView({ behavior: 'smooth' });
      });

      grid.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // 7. HOTELS & STAYS (Working Dynamic Filters)
  // --------------------------------------------------------------------------
  function renderHotels(filterParams = {}) {
    const grid = document.getElementById('hotelsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    let filtered = [...VOYANTA_DATA.hotels];

    // Filter by type
    if (filterParams.type && filterParams.type !== 'all') {
      filtered = filtered.filter(h => h.type.toLowerCase() === filterParams.type.toLowerCase());
    }

    // Filter by location/destination
    if (filterParams.dest && filterParams.dest !== 'all') {
      filtered = filtered.filter(h => h.destination.toLowerCase().includes(filterParams.dest.toLowerCase()) || h.location.toLowerCase().includes(filterParams.dest.toLowerCase()));
    }

    // Filter by max price
    if (filterParams.maxPrice) {
      filtered = filtered.filter(h => h.pricePerNight <= filterParams.maxPrice);
    }

    // Filter by min rating
    if (filterParams.minRating) {
      filtered = filtered.filter(h => h.rating >= filterParams.minRating);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: var(--color-card-bg); border-radius: var(--radius-lg);">
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No sanctuaries found matching your criteria</h3>
          <p style="color: var(--color-text-muted); margin-bottom: 16px;">Try adjusting your filters or search keywords.</p>
          <button class="btn btn-sm btn-outline" id="btnResetHotelFilters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetHotelFilters');
      if (resetBtn) resetBtn.addEventListener('click', resetAllHotelFilters);
      return;
    }

    filtered.forEach(hotel => {
      const card = document.createElement('div');
      card.className = 'hotel-card';
      card.innerHTML = `
        <div class="hotel-media">
          <img class="hotel-img" src="${hotel.image}" alt="${hotel.name}" loading="lazy">
          <span class="hotel-type-badge">${hotel.type}</span>
          <div class="dest-card-rating">
            <span class="star">★</span> ${hotel.rating}
          </div>
        </div>
        <div class="hotel-body">
          <div class="hotel-location">${hotel.location}</div>
          <h3 class="hotel-name">${hotel.name}</h3>
          <div class="hotel-amenities-tags">
            ${hotel.amenities.slice(0, 3).map(a => `<span class="amenity-chip">✓ ${a}</span>`).join('')}
          </div>
          <div class="hotel-footer">
            <div class="hotel-price">
              ${formatPrice(hotel.pricePerNight)} <small>/ night</small>
            </div>
            <button class="btn btn-sm btn-outline btn-view-hotel" data-hotel-id="${hotel.id}">
              View Hotel
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // View Hotel Modal trigger
    grid.querySelectorAll('.btn-view-hotel').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-hotel-id');
        openHotelModal(id);
      });
    });
  }

  function initHotelFilters() {
    const typeSelect = document.getElementById('hotelFilterType');
    const destSelect = document.getElementById('hotelFilterDest');
    const priceSelect = document.getElementById('hotelFilterPrice');
    const ratingSelect = document.getElementById('hotelFilterRating');
    const resetBtn = document.getElementById('hotelFilterReset');

    function applyFilters() {
      const params = {
        type: typeSelect ? typeSelect.value : 'all',
        dest: destSelect ? destSelect.value : 'all',
        maxPrice: priceSelect && priceSelect.value !== 'all' ? parseInt(priceSelect.value, 10) : null,
        minRating: ratingSelect && ratingSelect.value !== 'all' ? parseFloat(ratingSelect.value) : null
      };
      renderHotels(params);
    }

    if (typeSelect) typeSelect.addEventListener('change', applyFilters);
    if (destSelect) destSelect.addEventListener('change', applyFilters);
    if (priceSelect) priceSelect.addEventListener('change', applyFilters);
    if (ratingSelect) ratingSelect.addEventListener('change', applyFilters);

    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllHotelFilters);
    }
  }

  function resetAllHotelFilters() {
    const typeSelect = document.getElementById('hotelFilterType');
    const destSelect = document.getElementById('hotelFilterDest');
    const priceSelect = document.getElementById('hotelFilterPrice');
    const ratingSelect = document.getElementById('hotelFilterRating');

    if (typeSelect) typeSelect.value = 'all';
    if (destSelect) destSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    if (ratingSelect) ratingSelect.value = 'all';

    renderHotels();
    showToast('Hotel filters reset', 'info', '🔄');
  }

  // --------------------------------------------------------------------------
  // 8. TRAVEL GALLERY & LIGHTBOX
  // --------------------------------------------------------------------------
  function renderGallery(filterCategory = 'all') {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '';
    AppState.galleryFilter = filterCategory;

    const filtered = filterCategory === 'all'
      ? VOYANTA_DATA.gallery
      : VOYANTA_DATA.gallery.filter(g => g.category === filterCategory);

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `gallery-card aspect-${item.aspect || 'square'}`;
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-card-overlay">
          <h4 class="gallery-card-title">${item.title}</h4>
          <span class="gallery-card-loc">📍 ${item.location}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(index, filtered);
      });

      grid.appendChild(card);
    });
  }

  function initGalleryFilters() {
    const buttons = document.querySelectorAll('.gallery-filter-chip');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-gallery-cat');
        renderGallery(cat);
      });
    });
  }

  function openLightbox(index, itemsList) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    const items = itemsList || VOYANTA_DATA.gallery;

    AppState.currentLightboxIndex = index;

    function updateView() {
      const current = items[AppState.currentLightboxIndex];
      img.src = current.image;
      img.alt = current.title;
      caption.innerHTML = `
        <h4 style="font-size:1.2rem; font-weight:700;">${current.title}</h4>
        <p style="font-size:0.9rem; color:var(--color-accent);">${current.location}</p>
      `;
    }

    updateView();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Handlers
    document.getElementById('lightboxClose').onclick = () => closeLightbox();
    document.getElementById('lightboxPrev').onclick = (e) => {
      e.stopPropagation();
      AppState.currentLightboxIndex = (AppState.currentLightboxIndex - 1 + items.length) % items.length;
      updateView();
    };
    document.getElementById('lightboxNext').onclick = (e) => {
      e.stopPropagation();
      AppState.currentLightboxIndex = (AppState.currentLightboxIndex + 1) % items.length;
      updateView();
    };

    // Keyboard navigation
    window.onkeydown = (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
      if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
    };
  }

  function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      window.onkeydown = null;
    }
  }

  // --------------------------------------------------------------------------
  // 9. CLIENT TESTIMONIALS CAROUSEL
  // --------------------------------------------------------------------------
  function initReviewsCarousel() {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('reviewsDots');
    if (!track || !dotsContainer) return;

    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    VOYANTA_DATA.testimonials.forEach((rev, idx) => {
      // Slide
      const slide = document.createElement('div');
      slide.className = 'review-slide';
      slide.innerHTML = `
        <div class="review-card">
          <div class="review-rating">${'★'.repeat(rev.rating)}</div>
          <p class="review-quote">“${rev.review}”</p>
          <div class="reviewer-meta">
            <img class="reviewer-avatar" src="${rev.avatar}" alt="${rev.name}" loading="lazy">
            <div>
              <div class="reviewer-name">${rev.name}</div>
              <div class="reviewer-role">${rev.role} • <em>${rev.destination}</em></div>
            </div>
          </div>
        </div>
      `;
      track.appendChild(slide);

      // Dot
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToReview(idx));
      dotsContainer.appendChild(dot);
    });

    function goToReview(index) {
      AppState.activeReviewIndex = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      document.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    }

    // Auto-advance
    function startAutoReview() {
      AppState.reviewInterval = setInterval(() => {
        const next = (AppState.activeReviewIndex + 1) % VOYANTA_DATA.testimonials.length;
        goToReview(next);
      }, 6000);
    }

    track.parentElement.addEventListener('mouseenter', () => clearInterval(AppState.reviewInterval));
    track.parentElement.addEventListener('mouseleave', () => startAutoReview());

    startAutoReview();
  }

  // --------------------------------------------------------------------------
  // 10. ANIMATED TRAVEL STATISTICS (Intersection Observer)
  // --------------------------------------------------------------------------
  function initStatistics() {
    const statsSection = document.getElementById('statisticsSection');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !AppState.countersTriggered) {
          AppState.countersTriggered = true;
          animateStatCounters();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  function animateStatCounters() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1800;
      const start = 0;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = start + (target - start) * easeProgress;

        el.innerHTML = `${isDecimal ? current.toFixed(1) : Math.floor(current)}<span class="stat-suffix">${suffix}</span>`;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          el.innerHTML = `${target}<span class="stat-suffix">${suffix}</span>`;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  // --------------------------------------------------------------------------
  // 11. SPECIAL OFFER COUNTDOWN & PROMO CODE
  // --------------------------------------------------------------------------
  function initSpecialOffer() {
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');
    const copyBtn = document.getElementById('copyPromoBtn');

    // 48 hour rolling countdown
    let totalSeconds = 48 * 3600 + 35 * 60 + 12;

    setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const d = Math.floor(totalSeconds / (3600 * 24));
        const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
      }
    }, 1000);

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('VOYANTA-SUMMER').then(() => {
          showToast('Promo code VOYANTA-SUMMER copied to clipboard! (20% applied)', 'gold', '🎉');
          copyBtn.textContent = 'Copied!';
          setTimeout(() => copyBtn.textContent = 'Copy Code', 2000);
        }).catch(() => {
          showToast('Promo code: VOYANTA-SUMMER', 'gold', '🏷️');
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // 12. FAQ ACCORDION
  // --------------------------------------------------------------------------
  function renderFaqs() {
    const list = document.getElementById('faqList');
    if (!list) return;

    list.innerHTML = '';
    VOYANTA_DATA.faqs.forEach((faq, idx) => {
      const item = document.createElement('div');
      item.className = `faq-item ${idx === 0 ? 'active' : ''}`;
      item.innerHTML = `
        <button class="faq-header-btn" aria-expanded="${idx === 0}">
          <span>${faq.q}</span>
          <span class="faq-icon-chevron">▼</span>
        </button>
        <div class="faq-content-body">
          <p>${faq.a}</p>
        </div>
      `;

      const header = item.querySelector('.faq-header-btn');
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        } else {
          header.setAttribute('aria-expanded', 'false');
        }
      });

      list.appendChild(item);
    });
  }

  // --------------------------------------------------------------------------
  // 13. CONTACT FORM VALIDATION & INTERACTION
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const dest = document.getElementById('contactDest').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please provide your name, email, and travel vision.', 'info', '⚠️');
        return;
      }

      // Friendly validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'info', '⚠️');
        return;
      }

      showToast(`Thank you, ${name}! Your Voyanta Private Concierge will reach out within 2 hours.`, 'gold', '✨');
      form.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 14. USER DASHBOARD MODAL
  // --------------------------------------------------------------------------
  function initDashboard() {
    const dashboardModal = document.getElementById('dashboardModal');
    const openBtn = document.getElementById('navUserBtn');
    const closeBtn = document.getElementById('dashboardCloseBtn');
    const navItems = document.querySelectorAll('.dash-nav-item');
    const tabPanels = document.querySelectorAll('.dash-tab-panel');

    function renderDashboardContent() {
      // 1. My Bookings Panel
      const bookingsContainer = document.getElementById('dashBookingsList');
      if (bookingsContainer) {
        if (AppState.bookings.length === 0) {
          bookingsContainer.innerHTML = `<p style="color:var(--color-text-muted); padding:20px 0;">No active bookings found. Explore our Tour Packages to start your journey.</p>`;
        } else {
          bookingsContainer.innerHTML = AppState.bookings.map(bk => `
            <div class="dash-trip-card">
              <div>
                <span class="dest-card-badge" style="position:static; padding:2px 8px; font-size:0.7rem; margin-bottom:4px; display:inline-block;">${bk.status}</span>
                <h4 style="font-size:1.1rem; font-weight:700;">${bk.title}</h4>
                <p style="font-size:0.82rem; color:var(--color-text-muted);">Destination: ${bk.destination} • Guests: ${bk.guests} • Departure: ${bk.date}</p>
              </div>
              <div style="text-align:right;">
                <div style="font-size:1.2rem; font-weight:800; color:var(--color-primary);">${formatPrice(bk.price)}</div>
                <button class="btn btn-sm btn-outline" style="margin-top:6px;" onclick="window.print()">Print Voucher</button>
              </div>
            </div>
          `).join('');
        }
      }

      // 2. Wishlist Panel
      const wishlistContainer = document.getElementById('dashWishlistList');
      if (wishlistContainer) {
        if (AppState.wishlist.length === 0) {
          wishlistContainer.innerHTML = `<p style="color:var(--color-text-muted); padding:20px 0;">Your wishlist is currently empty. Click the heart icon on any destination or package to save it here.</p>`;
        } else {
          const items = [];
          AppState.wishlist.forEach(id => {
            const dest = VOYANTA_DATA.destinations.find(d => d.id === id);
            if (dest) items.push({ title: dest.name, desc: dest.shortDesc, price: dest.startingPrice, id: dest.id });
            const pkg = VOYANTA_DATA.packages.find(p => p.id === id);
            if (pkg) items.push({ title: pkg.title, desc: pkg.shortDesc, price: pkg.discountPrice, id: pkg.id });
          });

          wishlistContainer.innerHTML = items.map(item => `
            <div class="dash-trip-card">
              <div>
                <h4 style="font-size:1.05rem; font-weight:700;">${item.title}</h4>
                <p style="font-size:0.82rem; color:var(--color-text-muted);">${item.desc.substring(0, 80)}...</p>
              </div>
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-weight:700; color:var(--color-primary);">${formatPrice(item.price)}</span>
                <button class="btn btn-sm btn-outline btn-remove-wishlist" data-item-id="${item.id}" style="color:#ef4444; border-color:#ef4444;">Remove</button>
              </div>
            </div>
          `).join('');

          wishlistContainer.querySelectorAll('.btn-remove-wishlist').forEach(btn => {
            btn.addEventListener('click', () => {
              const id = btn.getAttribute('data-item-id');
              toggleWishlistItem(id, 'Item');
              renderDashboardContent();
            });
          });
        }
      }
    }

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        renderDashboardContent();
        dashboardModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    // Wishlist Nav Icon in header also opens dashboard to wishlist tab!
    const navWishlistBtn = document.getElementById('navWishlistBtn');
    if (navWishlistBtn) {
      navWishlistBtn.addEventListener('click', () => {
        renderDashboardContent();
        dashboardModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Switch to wishlist tab
        navItems.forEach(n => n.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        document.querySelector('[data-tab="wishlist"]').classList.add('active');
        document.getElementById('dashTabWishlist').classList.add('active');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dashboardModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Tab switching
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        const tabId = item.getAttribute('data-tab');
        const panel = document.getElementById(`dashTab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 15. BOOKING & INQUIRY MODAL
  // --------------------------------------------------------------------------
  function openBookingModal(itemData = {}) {
    const modal = document.getElementById('bookingModal');
    const form = document.getElementById('bookingForm');
    const titleEl = document.getElementById('bookingItemTitle');
    const priceEl = document.getElementById('bookingItemPrice');

    if (!modal) return;

    if (titleEl) titleEl.textContent = itemData.title || 'Custom Luxury Journey';
    if (priceEl) priceEl.textContent = itemData.price ? `${formatPrice(itemData.price)} / person` : 'Custom Quote';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('bookingModalClose');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      };
    }

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const guestName = document.getElementById('bkName').value;
        const guestEmail = document.getElementById('bkEmail').value;
        const guestPhone = document.getElementById('bkPhone').value;
        const departure = document.getElementById('bkDate').value || '2026-09-20';
        const guests = parseInt(document.getElementById('bkGuests').value, 10) || 2;

        const newBooking = {
          id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
          title: itemData.title || 'Voyanta Luxury Journey',
          destination: itemData.title ? itemData.title.split(' ')[0] : 'International',
          date: departure,
          guests: guests,
          price: (itemData.price || 3500) * guests,
          status: 'Confirmed'
        };

        AppState.bookings.unshift(newBooking);
        localStorage.setItem('voyanta_bookings', JSON.stringify(AppState.bookings));

        modal.classList.remove('active');
        document.body.style.overflow = '';

        showToast(`Reservation Confirmed for ${guestName}! Booking ID: ${newBooking.id}`, 'gold', '🥂');
      };
    }
  }

  // --------------------------------------------------------------------------
  // 16. DETAIL MODALS (Destinations, Packages, Hotels)
  // --------------------------------------------------------------------------
  function openDestinationModal(destId) {
    const dest = VOYANTA_DATA.destinations.find(d => d.id === destId);
    if (!dest) return;

    const modal = document.getElementById('detailModal');
    const body = document.getElementById('detailModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="position:relative; height:280px; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:20px;">
        <img src="${dest.image}" style="width:100%; height:100%; object-fit:cover;" alt="${dest.name}">
        <span class="dest-card-badge" style="position:absolute; top:16px; left:16px;">${dest.badge}</span>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:12px;">
        <div>
          <span style="font-size:0.8rem; font-weight:700; color:var(--color-accent); text-transform:uppercase;">${dest.country}</span>
          <h2 style="font-size:2rem; font-weight:800; color:var(--color-primary);">${dest.name}</h2>
        </div>
        <div style="font-size:1.4rem; font-weight:800; color:var(--color-gold);">
          from ${formatPrice(dest.startingPrice)}
        </div>
      </div>
      <p style="color:var(--color-text-muted); font-size:1rem; line-height:1.6; margin-bottom:20px;">
        ${dest.shortDesc}
      </p>
      <h4 style="font-size:1.1rem; font-weight:700; margin-bottom:10px;">Exclusive Highlights</h4>
      <ul style="margin-bottom:24px;">
        ${dest.highlights.map(h => `<li style="margin-bottom:8px; display:flex; align-items:center; gap:8px;">💎 <span>${h}</span></li>`).join('')}
      </ul>
      <div style="display:flex; gap:12px;">
        <button class="btn btn-gold" style="flex:1;" id="btnBookFromDestModal">
          Plan Journey to ${dest.name}
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('detailModalClose').onclick = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    document.getElementById('btnBookFromDestModal').onclick = () => {
      modal.classList.remove('active');
      openBookingModal({
        packageId: dest.id,
        title: `Signature Journey to ${dest.name}`,
        price: dest.startingPrice
      });
    };
  }

  function openPackageDetailModal(pkgId) {
    const pkg = VOYANTA_DATA.packages.find(p => p.id === pkgId);
    if (!pkg) return;

    const modal = document.getElementById('detailModal');
    const body = document.getElementById('detailModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="position:relative; height:260px; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:20px;">
        <img src="${pkg.image}" style="width:100%; height:100%; object-fit:cover;" alt="${pkg.title}">
        <span class="pkg-badge" style="position:absolute; top:16px; left:16px;">${pkg.badge}</span>
      </div>
      <span style="font-size:0.8rem; font-weight:700; color:var(--color-accent); text-transform:uppercase;">${pkg.destination} • ${pkg.duration}</span>
      <h2 style="font-size:1.8rem; font-weight:800; color:var(--color-primary); margin:6px 0 16px;">${pkg.title}</h2>
      <p style="color:var(--color-text-muted); font-size:0.95rem; line-height:1.6; margin-bottom:20px;">${pkg.shortDesc}</p>

      <h4 style="font-size:1.1rem; font-weight:700; margin-bottom:12px;">Day-by-Day Private Itinerary</h4>
      <div style="max-height:220px; overflow-y:auto; margin-bottom:24px; padding-right:8px;">
        ${pkg.itinerary.map(item => `
          <div class="itinerary-day-box">
            <span class="itinerary-day-tag">Day ${item.day}</span>
            <div style="font-size:0.88rem; color:#fff;">${item.title}</div>
          </div>
        `).join('')}
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--color-border); padding-top:16px;">
        <div>
          <span style="font-size:0.8rem; color:var(--color-text-muted);">Total Price:</span>
          <div style="font-size:1.5rem; font-weight:800; color:var(--color-primary);">${formatPrice(pkg.discountPrice)} <small style="font-size:0.75rem; font-weight:normal;">/ guest</small></div>
        </div>
        <button class="btn btn-gold" id="btnBookFromPkgModal">
          Reserve Now
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('detailModalClose').onclick = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    document.getElementById('btnBookFromPkgModal').onclick = () => {
      modal.classList.remove('active');
      openBookingModal({
        packageId: pkg.id,
        title: pkg.title,
        price: pkg.discountPrice
      });
    };
  }

  function openHotelModal(hotelId) {
    const hotel = VOYANTA_DATA.hotels.find(h => h.id === hotelId);
    if (!hotel) return;

    const modal = document.getElementById('detailModal');
    const body = document.getElementById('detailModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="position:relative; height:260px; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:20px;">
        <img src="${hotel.image}" style="width:100%; height:100%; object-fit:cover;" alt="${hotel.name}">
        <span class="hotel-type-badge" style="position:absolute; top:16px; left:16px;">${hotel.tag}</span>
      </div>
      <span style="font-size:0.8rem; font-weight:700; color:var(--color-accent); text-transform:uppercase;">${hotel.location}</span>
      <h2 style="font-size:1.8rem; font-weight:800; color:var(--color-primary); margin:4px 0 12px;">${hotel.name}</h2>
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px; color:var(--color-gold);">
        ${'★'.repeat(hotel.stars)} <span style="color:var(--color-text-main); font-weight:700;">${hotel.rating} / 5.0 Exceptional</span>
      </div>
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:8px;">Exclusive Voyanta Privileges</h4>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
        ${hotel.amenities.map(a => `<span class="amenity-chip">✓ ${a}</span>`).join('')}
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--color-border); padding-top:16px;">
        <div>
          <span style="font-size:0.8rem; color:var(--color-text-muted);">Nightly Rate:</span>
          <div style="font-size:1.5rem; font-weight:800; color:var(--color-primary);">${formatPrice(hotel.pricePerNight)} <small style="font-size:0.75rem; font-weight:normal;">/ night</small></div>
        </div>
        <button class="btn btn-gold" id="btnBookFromHotelModal">
          Reserve Sanctuary
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('detailModalClose').onclick = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    document.getElementById('btnBookFromHotelModal').onclick = () => {
      modal.classList.remove('active');
      openBookingModal({
        packageId: hotel.id,
        title: `${hotel.name} Reservation`,
        price: hotel.pricePerNight
      });
    };
  }

  // Render all dynamic cards when currency changes
  function renderAllDynamicCards() {
    renderDestinations();
    renderPackages();
    renderHotels();
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroSearch();
    renderDestinations();
    initDestinationFilters();
    renderPackages();
    initTripPlanner();
    renderExperiences();
    renderHotels();
    initHotelFilters();
    renderGallery();
    initGalleryFilters();
    initReviewsCarousel();
    initStatistics();
    initSpecialOffer();
    renderFaqs();
    initContactForm();
    initDashboard();

    // Attach CTA buttons across page
    const heroExploreBtn = document.getElementById('heroExploreBtn');
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener('click', () => {
        document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
      });
    }

    const heroPlanBtn = document.getElementById('heroPlanBtn');
    if (heroPlanBtn) {
      heroPlanBtn.addEventListener('click', () => {
        document.getElementById('planner').scrollIntoView({ behavior: 'smooth' });
      });
    }

    const offerCtaBtn = document.getElementById('offerCtaBtn');
    if (offerCtaBtn) {
      offerCtaBtn.addEventListener('click', () => {
        openBookingModal({
          packageId: 'special-summer-offer',
          title: 'Swiss Alpine Summer Luxury (20% OFF)',
          price: 3912
        });
      });
    }

    // Modal close on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    const dashModal = document.getElementById('dashboardModal');
    if (dashModal) {
      dashModal.addEventListener('click', (e) => {
        if (e.target === dashModal) {
          dashModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // Global scope helper for testing
  window.VoyantaApp = {
    AppState,
    showToast,
    openBookingModal,
    openDestinationModal,
    openPackageDetailModal,
    openHotelModal
  };

})();
