/**
 * TUT STONES - Marble & Granite Catalogue Web Application Logic
 * Powered by TutStonesStore (localStorage dynamic store)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderSocialLinks();
  renderAboutSection();
  initHeroSlider();
  renderFeaturedSections();
  initCatalogue();
  initModal();
});

/* ==========================================================================
   1. Navbar Scroll & Dynamic Links
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  toggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
}

function renderSocialLinks() {
  if (typeof TutStonesStore === 'undefined') return;
  const socialLinks = TutStonesStore.getSocialLinks().filter(l => l.active);
  const containers = document.querySelectorAll('.footer-social-links, .social-links-container');

  containers.forEach(container => {
    if (container) {
      container.innerHTML = socialLinks.map(link => `
        <a href="${link.url}" target="_blank" title="${link.platform}">
          <i class="${link.icon}"></i>
        </a>
      `).join('');
    }
  });
}

/* ==========================================================================
   2. Dynamic About Section Rendering
   ========================================================================== */
function renderAboutSection() {
  if (typeof TutStonesStore === 'undefined') return;
  const about = TutStonesStore.getAbout();
  const aboutSection = document.getElementById('about');

  if (!aboutSection || !about) return;

  const tagElem = aboutSection.querySelector('.section-tag');
  const titleElem = aboutSection.querySelector('.section-title');
  const imgElem = aboutSection.querySelector('.about-image-wrapper img');
  const expNumElem = aboutSection.querySelector('.exp-number');
  const expTextElem = aboutSection.querySelector('.exp-text');
  const textContainer = aboutSection.querySelector('.about-text');

  if (tagElem) tagElem.innerText = about.tag || 'WHO WE ARE';
  if (titleElem) titleElem.innerHTML = about.title || 'A Legacy of <span>Pure Stone Artistry</span>';
  if (imgElem && about.craftImage) imgElem.src = about.craftImage;
  if (expNumElem) expNumElem.innerText = about.expNumber || '25+';
  if (expTextElem) expTextElem.innerHTML = (about.expText || 'Years Sourcing<br>Rare Natural Stone').replace(/\n/g, '<br>');

  // Update paragraphs and stats cards
  const paragraphs = textContainer?.querySelectorAll('p');
  if (paragraphs && paragraphs.length >= 2) {
    paragraphs[0].innerHTML = about.desc1 || paragraphs[0].innerHTML;
    paragraphs[1].innerHTML = about.desc2 || paragraphs[1].innerHTML;
  }

  const statsGrid = aboutSection.querySelector('.stats-grid');
  if (statsGrid && about.stats) {
    statsGrid.innerHTML = about.stats.map(s => `
      <div class="stat-card">
        <h4>${s.count}</h4>
        <p>${s.label}</p>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   3. Hero Slider Logic
   ========================================================================== */
function initHeroSlider() {
  if (typeof TutStonesStore === 'undefined') return;
  const slidesData = TutStonesStore.getHeroSlides();
  const sliderContainer = document.querySelector('.hero-slider');
  const heroContentContainer = document.querySelector('.hero-content');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');

  if (!sliderContainer || !slidesData || slidesData.length === 0) return;

  // Dynamically render slides
  sliderContainer.innerHTML = slidesData.map((slide, idx) => `
    <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${slide.image}');"></div>
  `).join('');

  if (dotsContainer) dotsContainer.innerHTML = '';
  slidesData.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer?.appendChild(dot);
  });

  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');

  let currentIndex = 0;
  let autoTimer = null;

  function updateHeroContent(slide) {
    if (!heroContentContainer || !slide) return;
    heroContentContainer.innerHTML = `
      <div class="hero-badge">
        <i class="ri-vip-diamond-line"></i> ${slide.badge || 'Natural Stone Curators'}
      </div>
      <h1 class="hero-title">
        ${slide.title || 'Masterpieces <span>Sculpted by Nature</span>'}
      </h1>
      <p class="hero-slogan">
        ${slide.slogan || ''}
      </p>
      <div class="hero-actions">
        <a href="${slide.btnLink || 'catalogue.html'}" class="btn btn-primary">
          <i class="ri-compass-3-line"></i> ${slide.btnText || 'Explore Full Catalogue'}
        </a>
      </div>
    `;
  }

  function goToSlide(index) {
    if (slides[currentIndex]) slides[currentIndex].classList.remove('active');
    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    if (slides[currentIndex]) slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');

    updateHeroContent(slidesData[currentIndex]);
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

  // Initial Content Load
  updateHeroContent(slidesData[0]);
  startTimer();
}

/* ==========================================================================
   4. Render Dynamic Collections (Marble, Granite, and Custom Categories)
   ========================================================================== */
function renderFeaturedSections() {
  if (typeof TutStonesStore === 'undefined') return;
  const stones = TutStonesStore.getStones();
  const categories = TutStonesStore.getCategories();

  const marbleContainer = document.getElementById('marble-showcase-grid');
  const graniteContainer = document.getElementById('granite-showcase-grid');

  if (marbleContainer) {
    const marbles = stones.filter(s => s.category === 'marble');
    marbleContainer.innerHTML = marbles.map(createStoneCardHTML).join('');
  }

  if (graniteContainer) {
    const granites = stones.filter(s => s.category === 'granite');
    graniteContainer.innerHTML = granites.map(createStoneCardHTML).join('');
  }
}

function createStoneCardHTML(stone) {
  return `
    <div class="stone-card">
      <div class="stone-thumb">
        <img src="${stone.image}" alt="${stone.name}" loading="lazy" onerror="this.src='assets/images/marble_calacatta.png'">
        <span class="stone-badge">${stone.tag || 'Natural Stone'}</span>
      </div>
      <div class="stone-body">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
          <h3 class="stone-name">${stone.name}</h3>
          <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase; font-weight: 600;">${(stone.category || '').toUpperCase()}</span>
        </div>
        
        <p class="stone-desc" style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${stone.desc || ''}</p>

        <!-- Full Specifications Details On Card -->
        <table class="card-spec-table">
          <tr>
            <td><i class="ri-map-pin-line"></i> Origin</td>
            <td>${stone.origin || 'N/A'}</td>
          </tr>
          <tr>
            <td><i class="ri-sparkling-line"></i> Finishes</td>
            <td>${stone.finish || 'Polished'}</td>
          </tr>
          <tr>
            <td><i class="ri-ruler-2-line"></i> Density</td>
            <td>${stone.density || '2.70 g/cm³'}</td>
          </tr>
          <tr>
            <td><i class="ri-drop-line"></i> Water Abs.</td>
            <td>${stone.waterAbs || '0.15%'}</td>
          </tr>
          <tr>
            <td><i class="ri-shield-flash-line"></i> Flexural Str.</td>
            <td>${stone.flexural || '14.8 MPa'}</td>
          </tr>
          <tr>
            <td><i class="ri-layout-grid-line"></i> Uses</td>
            <td>${stone.applications || 'Flooring, Countertops'}</td>
          </tr>
        </table>

        <div class="stone-footer" style="margin-top: auto; padding-top: 0.75rem;">
          <button class="btn-spec" style="width: 100%; justify-content: center;" onclick="openStoneModal('${stone.id}')">
            <i class="ri-mail-send-line"></i> Request Spec Sheet & Sample Slabs
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   5. Catalogue Filter & Search Logic
   ========================================================================== */
function initCatalogue() {
  if (typeof TutStonesStore === 'undefined') return;
  const catalogueGrid = document.getElementById('catalogue-grid');
  const filterPillsContainer = document.querySelector('.filter-pills');
  const searchInput = document.getElementById('catalogue-search');

  if (!catalogueGrid) return;

  const categories = TutStonesStore.getCategories();
  const stones = TutStonesStore.getStones();

  // Render Dynamic Category Filter Pills if container exists
  if (filterPillsContainer) {
    let pillsHTML = `<button class="filter-pill active" data-filter="all">All Stone Types</button>`;
    categories.forEach(cat => {
      pillsHTML += `<button class="filter-pill" data-filter="${cat.id}">${cat.name}</button>`;
    });
    filterPillsContainer.innerHTML = pillsHTML;
  }

  let currentCategory = 'all';
  let searchQuery = '';

  // Background sync with WordPress REST API (port 8888) if active
  if (TutStonesStore.syncWithWordPress) {
    TutStonesStore.syncWithWordPress().then(res => {
      if (res && res.success) {
        // Refresh category filter pills and grid if new WP content arrived
        const updatedCats = TutStonesStore.getCategories();
        if (filterPillsContainer) {
          let pillsHTML = `<button class="filter-pill active" data-filter="all">All Stone Types</button>`;
          updatedCats.forEach(cat => {
            pillsHTML += `<button class="filter-pill" data-filter="${cat.id}">${cat.name}</button>`;
          });
          filterPillsContainer.innerHTML = pillsHTML;
        }
        filterAndRender();
      }
    });
  }

  function renderCategoryDescriptionBanner(catId) {
    const banner = document.getElementById('category-description-banner');
    if (!banner) return;

    if (catId === 'all') {
      banner.innerHTML = `
        <div class="category-desc-card">
          <div class="category-desc-icon"><i class="ri-apps-2-line"></i></div>
          <div class="category-desc-content">
            <h4 class="category-desc-title">All Stone Collections</h4>
            <p class="category-desc-text">Browsing our entire portfolio of luxury natural marble, granite, and architectural stone slabs sourced from world-class quarries.</p>
          </div>
        </div>
      `;
      return;
    }

    const currentCats = TutStonesStore.getCategories();
    const cat = currentCats.find(c => c.id === catId || c.slug === catId || (c.id && c.id.toLowerCase() === catId.toLowerCase()));

    if (cat && cat.desc) {
      banner.innerHTML = `
        <div class="category-desc-card">
          <div class="category-desc-icon"><i class="${cat.icon || 'ri-price-tag-3-line'}"></i></div>
          <div class="category-desc-content">
            <h4 class="category-desc-title">${cat.name}</h4>
            <p class="category-desc-text">${cat.desc}</p>
          </div>
        </div>
      `;
    } else if (cat) {
      banner.innerHTML = `
        <div class="category-desc-card">
          <div class="category-desc-icon"><i class="${cat.icon || 'ri-price-tag-3-line'}"></i></div>
          <div class="category-desc-content">
            <h4 class="category-desc-title">${cat.name}</h4>
            <p class="category-desc-text">Explore our curated selection of ${cat.name} slabs.</p>
          </div>
        </div>
      `;
    } else {
      banner.innerHTML = '';
    }
  }

  function filterAndRender() {
    renderCategoryDescriptionBanner(currentCategory);
    let filtered = TutStonesStore.getStones();

    if (currentCategory !== 'all') {
      filtered = filtered.filter(s => s.category === currentCategory || s.category.toLowerCase() === currentCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        (s.origin && s.origin.toLowerCase().includes(q)) || 
        (s.desc && s.desc.toLowerCase().includes(q))
      );
    }

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

  const filterPills = document.querySelectorAll('.filter-pill');
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
   6. Specification Modal & Inquiry Handler
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
  if (typeof TutStonesStore === 'undefined') return;
  const stone = TutStonesStore.getStone(stoneId);
  if (!stone) return;

  const overlay = document.getElementById('spec-modal');
  const modalContent = document.getElementById('modal-content-body');

  modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-image">
        <img src="${stone.image}" alt="${stone.name}" onerror="this.src='assets/images/marble_calacatta.png'">
      </div>
      <div class="modal-details">
        <span class="section-tag">${(stone.category || 'STONE').toUpperCase()}</span>
        <h3>${stone.name}</h3>
        <p style="color: var(--color-text-muted); margin-bottom: 1rem;">${stone.desc || ''}</p>
        
        <table class="spec-table">
          <tr>
            <td>Country of Origin</td>
            <td>${stone.origin || 'N/A'}</td>
          </tr>
          <tr>
            <td>Available Finishes</td>
            <td>${stone.finish || 'Polished'}</td>
          </tr>
          <tr>
            <td>Bulk Density</td>
            <td>${stone.density || 'N/A'}</td>
          </tr>
          <tr>
            <td>Water Absorption</td>
            <td>${stone.waterAbs || 'N/A'}</td>
          </tr>
          <tr>
            <td>Flexural Strength</td>
            <td>${stone.flexural || 'N/A'}</td>
          </tr>
          <tr>
            <td>Recommended Uses</td>
            <td>${stone.applications || 'Flooring, Countertops'}</td>
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

  overlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('spec-modal');
  overlay?.classList.remove('active');
  document.body.style.overflow = '';
}

function handleInquirySubmit(e, stoneName) {
  e.preventDefault();
  alert(`Thank you for your interest in ${stoneName}! Our stone specialists will email you the official technical specification sheet and available slab inventory shortly.`);
  closeModal();
}
