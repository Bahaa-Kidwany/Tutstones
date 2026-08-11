/**
 * TUT STONES - Marble & Granite Catalogue Web Application Logic
 */

// Stone Catalogue Database
const STONE_DATABASE = [
  {
    id: 'calacatta-gold',
    name: 'Calacatta Gold',
    category: 'marble',
    origin: 'Carrara, Italy',
    finish: 'Polished / Honed',
    density: '2.72 g/cm³',
    waterAbs: '0.15%',
    flexural: '14.8 MPa',
    image: 'assets/images/marble_calacatta.png',
    featured: true,
    tag: 'Exclusive Luxury',
    desc: 'World-renowned white marble with thick, dramatic gold and taupe veining. Perfect for grand entrance halls and luxury vanity tops.',
    applications: 'Flooring, Feature Walls, Countertops, Bathroom Vanities'
  },
  {
    id: 'bianco-carrara',
    name: 'Bianco Carrara',
    category: 'marble',
    origin: 'Tuscany, Italy',
    finish: 'Polished / Brushed',
    density: '2.68 g/cm³',
    waterAbs: '0.18%',
    flexural: '13.5 MPa',
    image: 'assets/images/marble_carrara.png',
    featured: true,
    tag: 'Classic Italian',
    desc: 'Timeless light grey marble featuring feather-like soft veining. Known for its historical prestige in European sculpture and architecture.',
    applications: 'Interior Floors, Sculptures, Staircases, Cladding'
  },
  {
    id: 'black-galaxy',
    name: 'Black Galaxy',
    category: 'granite',
    origin: 'Andhra Pradesh, India',
    finish: 'Polished',
    density: '2.95 g/cm³',
    waterAbs: '0.04%',
    flexural: '22.1 MPa',
    image: 'assets/images/granite_black_galaxy.png',
    featured: true,
    tag: 'High Durability',
    desc: 'Deep obsidian black granite embedded with natural copper and metallic gold bronzite crystals that sparkle like a night sky.',
    applications: 'Kitchen Countertops, High-Traffic Commercial Flooring'
  },
  {
    id: 'blue-pearl',
    name: 'Blue Pearl',
    category: 'granite',
    origin: 'Larvik, Norway',
    finish: 'Polished / Leathered',
    density: '2.78 g/cm³',
    waterAbs: '0.08%',
    flexural: '19.4 MPa',
    image: 'assets/images/granite_blue_pearl.png',
    featured: true,
    tag: 'Rare Pearlescent',
    desc: 'Exotic Norwegian larvikite granite presenting mesmerizing silvery-blue feldspar reflections with ultra-high scratch resistance.',
    applications: 'Exterior Facades, Bar Tops, Luxury Flooring'
  },
  {
    id: 'nero-marquina',
    name: 'Nero Marquina',
    category: 'marble',
    origin: 'Basque Country, Spain',
    finish: 'Polished',
    density: '2.69 g/cm³',
    waterAbs: '0.17%',
    flexural: '14.0 MPa',
    image: 'assets/images/hero_slider_1.png',
    featured: false,
    tag: 'Dramatic Contrast',
    desc: 'Intense deep black marble punctuated by crisp white linear quartz veins. Creates high-impact modern minimalist interiors.',
    applications: 'Accent Walls, Fireplace Surrounds, Bathrooms'
  },
  {
    id: 'absolute-black',
    name: 'Absolute Black',
    category: 'granite',
    origin: 'Khammam, India',
    finish: 'Honed / Leathered / Polished',
    density: '3.01 g/cm³',
    waterAbs: '0.02%',
    flexural: '24.5 MPa',
    image: 'assets/images/hero_slider_2.png',
    featured: false,
    tag: 'Maximum Hardness',
    desc: 'Solid uniform dark granite devoid of grain variation. Renowned for zero porosity and supreme stain resistance.',
    applications: 'Kitchen Countertops, Outdoor Kitchens, Monumental Works'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  renderFeaturedSections();
  initCatalogue();
  initModal();
});

/* ==========================================================================
   1. Navbar Scroll & Toggle
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. Hero Slider Logic
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;

  // Render dots
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = (index + slides.length) % slides.length;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });

  function startTimer() {
    autoTimer = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    clearInterval(autoTimer);
    startTimer();
  }

  startTimer();
}

/* ==========================================================================
   3. Render Marble & Granite Showcase Sections
   ========================================================================== */
function renderFeaturedSections() {
  const marbleContainer = document.getElementById('marble-showcase-grid');
  const graniteContainer = document.getElementById('granite-showcase-grid');

  const marbles = STONE_DATABASE.filter(s => s.category === 'marble');
  const granites = STONE_DATABASE.filter(s => s.category === 'granite');

  if (marbleContainer) {
    marbleContainer.innerHTML = marbles.map(createStoneCardHTML).join('');
  }

  if (graniteContainer) {
    graniteContainer.innerHTML = granites.map(createStoneCardHTML).join('');
  }
}

function createStoneCardHTML(stone) {
  return `
    <div class="stone-card">
      <div class="stone-thumb">
        <img src="${stone.image}" alt="${stone.name}" loading="lazy">
        <span class="stone-badge">${stone.tag}</span>
      </div>
      <div class="stone-body">
        <h3 class="stone-name">${stone.name}</h3>
        <div class="stone-meta">
          <div class="stone-meta-item">
            <i class="ri-map-pin-line"></i> ${stone.origin}
          </div>
          <div class="stone-meta-item">
            <i class="ri-sparkling-line"></i> ${stone.finish.split('/')[0]}
          </div>
        </div>
        <p class="stone-desc">${stone.desc}</p>
        <div class="stone-footer">
          <button class="btn-spec" onclick="openStoneModal('${stone.id}')">
            View Specs Sheet <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   4. Catalogue Filter & Search Logic
   ========================================================================== */
function initCatalogue() {
  const catalogueGrid = document.getElementById('catalogue-grid');
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('catalogue-search');

  let currentCategory = 'all';
  let searchQuery = '';

  function filterAndRender() {
    let filtered = STONE_DATABASE;

    if (currentCategory !== 'all') {
      filtered = filtered.filter(s => s.category === currentCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.origin.toLowerCase().includes(q) || 
        s.desc.toLowerCase().includes(q)
      );
    }

    if (catalogueGrid) {
      if (filtered.length === 0) {
        catalogueGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--color-text-muted);">
            <i class="ri-search-line" style="font-size: 2.5rem; color: var(--color-gold-primary); display: block; margin-bottom: 1rem;"></i>
            <h3>No stones found matching your criteria.</h3>
            <p>Try searching for different terms or reset filters.</p>
          </div>
        `;
      } else {
        catalogueGrid.innerHTML = filtered.map(createStoneCardHTML).join('');
      }
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.filter;
      filterAndRender();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterAndRender();
  });

  filterAndRender();
}

/* ==========================================================================
   5. Specification Modal & Inquiry Handler
   ========================================================================== */
function initModal() {
  const overlay = document.getElementById('spec-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

function openStoneModal(stoneId) {
  const stone = STONE_DATABASE.find(s => s.id === stoneId);
  if (!stone) return;

  const overlay = document.getElementById('spec-modal');
  const modalContent = document.getElementById('modal-content-body');

  modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-image">
        <img src="${stone.image}" alt="${stone.name}">
      </div>
      <div class="modal-details">
        <span class="section-tag">${stone.category.toUpperCase()}</span>
        <h3>${stone.name}</h3>
        <p style="color: var(--color-text-muted); margin-bottom: 1rem;">${stone.desc}</p>
        
        <table class="spec-table">
          <tr>
            <td>Country of Origin</td>
            <td>${stone.origin}</td>
          </tr>
          <tr>
            <td>Available Finishes</td>
            <td>${stone.finish}</td>
          </tr>
          <tr>
            <td>Bulk Density</td>
            <td>${stone.density}</td>
          </tr>
          <tr>
            <td>Water Absorption</td>
            <td>${stone.waterAbs}</td>
          </tr>
          <tr>
            <td>Flexural Strength</td>
            <td>${stone.flexural}</td>
          </tr>
          <tr>
            <td>Recommended Uses</td>
            <td>${stone.applications}</td>
          </tr>
        </table>

        <div style="margin-top: 1.5rem; background: var(--color-bg-surface); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border-gold);">
          <h4 style="color: var(--color-gold-primary); font-size: 1rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="ri-mail-send-line"></i> Request Spec Sheet & Sample
          </h4>
          <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 1rem;">
            Send an instant request to our stone specialist team for full technical documentation and slab availability.
          </p>
          <form onsubmit="handleInquirySubmit(event, '${stone.name}')">
            <div class="form-group" style="margin-bottom: 0.75rem;">
              <input type="text" placeholder="Your Name or Firm" required>
            </div>
            <div class="form-group" style="margin-bottom: 0.75rem;">
              <input type="email" placeholder="Your Email Address" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.6rem;">
              Request Details (No Payment Required)
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('spec-modal');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleInquirySubmit(e, stoneName) {
  e.preventDefault();
  alert(`Thank you for your interest in ${stoneName}! Our stone specialists will email you the official technical specification sheet and available slab inventory shortly.`);
  closeModal();
}
