/**
 * TUT STONES - Marble & Granite Catalogue Web Application Logic
 * Powered by TutStonesStore (localStorage dynamic store)
 */

// Immediately apply saved theme on script load to eliminate flicker (Default: Pharaonic)
(function applyEarlyTheme() {
  const savedTheme = localStorage.getItem('tutstones_palette') || 'pharaonic';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (document.body) document.body.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  try { initThemeSwitcher(); } catch (e) { console.error('Error initThemeSwitcher:', e); }
  try { initNavbar(); } catch (e) { console.error('Error initNavbar:', e); }
  try { renderSocialLinks(); } catch (e) { console.error('Error renderSocialLinks:', e); }
  try { renderFooterContent(); } catch (e) { console.error('Error renderFooterContent:', e); }

  const page = document.body.dataset.page || 'home';
  if (page === 'home') {
    try { renderHomePageContent(); } catch (e) { console.error('Error renderHomePageContent:', e); }
    try { initHeroSlider(); } catch (e) { console.error('Error initHeroSlider:', e); }
    try { initAboutSlider(); } catch (e) { console.error('Error initAboutSlider:', e); }
  } else if (page === 'about') {
    try { renderAboutPageContent(); } catch (e) { console.error('Error renderAboutPageContent:', e); }
  } else if (page === 'factory') {
    try { renderFactoryPageContent(); } catch (e) { console.error('Error renderFactoryPageContent:', e); }
  } else if (page === 'packaging') {
    try { renderPackagingPageContent(); } catch (e) { console.error('Error renderPackagingPageContent:', e); }
  } else if (page === 'contact') {
    try { renderContactPageContent(); } catch (e) { console.error('Error renderContactPageContent:', e); }
  }

  try { renderFeaturedSections(); } catch (e) { console.error('Error renderFeaturedSections:', e); }
  try { initCatalogue(); } catch (e) { console.error('Error initCatalogue:', e); }
  try { initModal(); } catch (e) { console.error('Error initModal:', e); }
});

/* ==========================================================================
   0. Theme & Palette Switcher Logic
   ========================================================================== */
function initThemeSwitcher() {
  const savedTheme = localStorage.getItem('tutstones_palette') || 'pharaonic';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const activeTheme = theme || 'pharaonic';
  document.documentElement.setAttribute('data-theme', activeTheme);
  if (document.body) document.body.setAttribute('data-theme', activeTheme);
}


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
  const toggleIcon = toggle?.querySelector('i');

  if (toggle && navMenu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      toggle.classList.toggle('active', isActive);
      if (toggleIcon) {
        toggleIcon.className = isActive ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        if (toggleIcon) toggleIcon.className = 'ri-menu-line';
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        if (toggleIcon) toggleIcon.className = 'ri-menu-line';
      });
    });
  }
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
   2. Dynamic Page Content Rendering Functions
   ========================================================================== */

// --- 2a. Global Footer Hydration ---
function renderFooterContent() {
  if (typeof TutStonesStore === 'undefined') return;
  const ftr = TutStonesStore.getFooterData();
  if (!ftr) return;

  const footer = document.querySelector('footer.footer');
  if (!footer) return;

  // Brand paragraph
  const brandP = footer.querySelector('.footer-brand p');
  if (brandP && ftr.brandDesc) brandP.innerText = ftr.brandDesc;

  // Headquarters column
  const hqCols = footer.querySelectorAll('.footer-col');
  hqCols.forEach(col => {
    const h5 = col.querySelector('h5');
    if (h5 && (h5.textContent.includes('Headquarters') || h5.textContent.includes('Showroom'))) {
      const ul = col.querySelector('.footer-links');
      if (ul) {
        let items = [];
        if (ftr.address) items.push(`<li><i class="ri-map-pin-2-line" style="color: var(--color-gold-primary);"></i> <a href="${ftr.addressLink || '#'}" target="_blank" rel="noopener noreferrer" style="color: inherit;">${ftr.address}</a></li>`);
        if (ftr.emailPrimary || ftr.emailSecondary) items.push(`<li><i class="ri-mail-line" style="color: var(--color-gold-primary);"></i> ${ftr.emailPrimary || ''} ${ftr.emailSecondary ? '| ' + ftr.emailSecondary : ''}</li>`);
        if (ftr.phonePrimary) items.push(`<li><i class="ri-phone-line" style="color: var(--color-gold-primary);"></i> <a href="tel:${ftr.phonePrimary}" style="color: inherit;">${ftr.phonePrimary}</a></li>`);
        if (ftr.whatsappNumber) items.push(`<li><i class="ri-whatsapp-line" style="color: #25D366;"></i> <a href="https://wa.me/${ftr.whatsappNumber.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" style="color: inherit;">WhatsApp: ${ftr.whatsappNumber}</a></li>`);
        if (ftr.hours) items.push(`<li><i class="ri-time-line" style="color: var(--color-gold-primary);"></i> ${ftr.hours}</li>`);
        ul.innerHTML = items.join('');
      }
    }
  });
}

// --- 2b. Homepage Dynamic Hydration ---
function renderHomePageContent() {
  if (typeof TutStonesStore === 'undefined') return;
  const hp = TutStonesStore.getHomePage();
  if (!hp) return;

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const tagElem = aboutSection.querySelector('.section-tag');
    const titleElem = aboutSection.querySelector('.section-title');
    const expNumElem = aboutSection.querySelector('.exp-number');
    const expTextElem = aboutSection.querySelector('.exp-text');
    const pContainer = aboutSection.querySelector('.about-paragraphs');

    if (tagElem && hp.aboutTag) tagElem.innerText = hp.aboutTag;
    if (titleElem && hp.aboutTitle) titleElem.innerHTML = hp.aboutTitle;
    if (expNumElem && hp.aboutExpNumber) expNumElem.innerText = hp.aboutExpNumber;
    if (expTextElem && hp.aboutExpText) expTextElem.innerHTML = hp.aboutExpText;

    if (pContainer) {
      let pContent = '';
      if (hp.aboutDesc1) pContent += `<p style="color: var(--color-text-muted); font-size: 1.05rem; margin-bottom: 1.25rem;">${hp.aboutDesc1}</p>`;
      if (hp.aboutDesc2) pContent += `<p style="color: var(--color-text-muted); font-size: 0.98rem; margin-bottom: 1.25rem;">${hp.aboutDesc2}</p>`;
      if (hp.aboutDesc3) pContent += `<p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 2rem;">${hp.aboutDesc3}</p>`;
      pContainer.innerHTML = pContent;
    }

    const statsGrid = aboutSection.querySelector('.stats-grid');
    if (statsGrid && hp.aboutStats) {
      statsGrid.innerHTML = hp.aboutStats.map(s => `
        <div class="stat-card">
          <h4>${s.count}</h4>
          <p>${s.label}</p>
        </div>
      `).join('');
    }

    // Homepage About Slider Images Hydration
    const aboutSlider = aboutSection.querySelector('.about-slider');
    if (aboutSlider) {
      const defaultImages = [
        { id: 'h-about-1', url: 'assets/images/Factory/1.jpg' },
        { id: 'h-about-2', url: 'assets/images/Factory/2.JPG' }
      ];
      const sliderImages = (hp.aboutSliderImages && hp.aboutSliderImages.length > 0)
        ? hp.aboutSliderImages
        : defaultImages;

      let slidesHTML = sliderImages.map((img, idx) => `
        <div class="about-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${img.url || 'assets/images/Factory/1.jpg'}');"></div>
      `).join('');

      aboutSlider.innerHTML = `
        ${slidesHTML}
        <div class="about-slider-controls">
          <div class="slider-arrows about-arrows">
            <button class="slider-arrow prev" aria-label="Previous Slide"><i class="ri-arrow-left-s-line"></i></button>
            <button class="slider-arrow next" aria-label="Next Slide"><i class="ri-arrow-right-s-line"></i></button>
          </div>
        </div>
      `;
    }
  }

  // Homepage Bottom 3 Boxes ("OUR EXPORT CAPABILITIES")
  const boxesSection = document.querySelector('body[data-page="home"] section.section-padding:nth-of-type(3)');
  if (boxesSection) {
    const tagElem = boxesSection.querySelector('.section-tag');
    const titleElem = boxesSection.querySelector('.section-title');
    const grid = boxesSection.querySelector('.process-grid');

    if (tagElem && hp.boxesTag) tagElem.innerText = hp.boxesTag;
    if (titleElem && hp.boxesTitle) titleElem.innerHTML = hp.boxesTitle;

    if (grid && hp.boxes) {
      grid.innerHTML = hp.boxes.map(box => `
        <div class="feature-card">
          <div class="feature-image-wrapper">
            <img src="${box.image}" alt="${box.title}" style="width: 100%; height: 100%; object-fit: cover !important; object-position: ${box.imagePosition || '50% 10%'} !important;">
            <div class="feature-icon"><i class="${box.icon || 'ri-settings-4-line'}"></i></div>
          </div>
          <div class="feature-card-content">
            <h3>${box.title}</h3>
            <p style="color: var(--color-text-muted); margin: 0.75rem 0 1.5rem; font-size: 0.9rem;">${box.desc}</p>
            <a href="${box.btnLink || 'factory.html'}" class="btn btn-outline" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">
              ${box.btnText || 'Explore'} <i class="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      `).join('');
    }
  }
}

// --- 2c. About Us Page Dynamic Hydration ---
function renderAboutPageContent() {
  if (typeof TutStonesStore === 'undefined') return;
  const ab = TutStonesStore.getAboutPage();
  if (!ab) return;

  // Banner
  const banner = document.querySelector('.page-header-banner');
  if (banner) {
    if (ab.bannerTag && banner.querySelector('.section-tag')) banner.querySelector('.section-tag').innerText = ab.bannerTag;
    if (ab.bannerTitle && banner.querySelector('.section-title')) banner.querySelector('.section-title').innerHTML = ab.bannerTitle;
    if (ab.bannerDesc && banner.querySelector('.section-desc')) banner.querySelector('.section-desc').innerText = ab.bannerDesc;
  }

  // Main story section
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const mainImg = aboutSection.querySelector('.about-image-wrapper img');
    const expNum = aboutSection.querySelector('.exp-number');
    const expText = aboutSection.querySelector('.exp-text');
    const tag = aboutSection.querySelector('.about-text .section-tag');
    const title = aboutSection.querySelector('.about-text .section-title');
    const pContainer = aboutSection.querySelector('.about-paragraphs');
    const statsGrid = aboutSection.querySelector('.stats-grid');

    if (mainImg && ab.mainImage) mainImg.src = ab.mainImage;
    if (expNum && ab.expNumber) expNum.innerText = ab.expNumber;
    if (expText && ab.expText) expText.innerHTML = ab.expText;
    if (tag && ab.mainTag) tag.innerText = ab.mainTag;
    if (title && ab.mainTitle) title.innerHTML = ab.mainTitle;

    if (pContainer) {
      let pContent = '';
      if (ab.desc1) pContent += `<p style="color: var(--color-text-muted); font-size: 1.05rem; margin-bottom: 1.25rem;">${ab.desc1}</p>`;
      if (ab.desc2) pContent += `<p style="color: var(--color-text-muted); font-size: 0.98rem; margin-bottom: 1.25rem;">${ab.desc2}</p>`;
      if (ab.desc3) pContent += `<p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 2rem;">${ab.desc3}</p>`;
      pContainer.innerHTML = pContent;
    }

    if (statsGrid && ab.stats) {
      statsGrid.innerHTML = ab.stats.map(s => `
        <div class="stat-card">
          <h4>${s.count}</h4>
          <p>${s.label}</p>
        </div>
      `).join('');
    }
  }

  // Bottom 3 Cards ("Our Commitments To Global Clients")
  const bottomSec = document.querySelector('body[data-page="about"] section.section-padding:nth-of-type(2)');
  if (bottomSec) {
    const tag = bottomSec.querySelector('.section-tag');
    const title = bottomSec.querySelector('.section-title');
    const grid = bottomSec.querySelector('.process-grid');

    if (tag && ab.bottomTag) tag.innerText = ab.bottomTag;
    if (title && ab.bottomTitle) title.innerHTML = ab.bottomTitle;

    if (grid && ab.bottomCards) {
      grid.innerHTML = ab.bottomCards.map(card => `
        <div class="feature-card">
          ${card.image ? `<div class="feature-image-wrapper"><img src="${card.image}" alt="${card.title}" style="width: 100%; height: 100%; object-fit: cover !important; object-position: ${card.imagePosition || '50% 10%'} !important;"><div class="feature-icon"><i class="${card.icon || 'ri-shield-check-line'}"></i></div></div>` : `<div class="feature-icon"><i class="${card.icon || 'ri-shield-check-line'}"></i></div>`}
          <h3>${card.title}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">${card.desc}</p>
        </div>
      `).join('');
    }
  }
}

// --- 2d. Factory Page Dynamic Hydration ---
function renderFactoryPageContent() {
  if (typeof TutStonesStore === 'undefined') return;
  const fac = TutStonesStore.getFactoryPage();
  if (!fac) return;

  // Banner
  const banner = document.querySelector('.page-header-banner');
  if (banner) {
    if (fac.bannerTag && banner.querySelector('.section-tag')) banner.querySelector('.section-tag').innerText = fac.bannerTag;
    if (fac.bannerTitle && banner.querySelector('.section-title')) banner.querySelector('.section-title').innerHTML = fac.bannerTitle;
    if (fac.bannerDesc && banner.querySelector('.section-desc')) banner.querySelector('.section-desc').innerText = fac.bannerDesc;
  }

  // Main Section
  const mainSec = document.querySelector('body[data-page="factory"] section.section-padding:nth-of-type(1)');
  if (mainSec) {
    const img = mainSec.querySelector('.about-image-wrapper img');
    const expNum = mainSec.querySelector('.exp-number');
    const expText = mainSec.querySelector('.exp-text');
    const tag = mainSec.querySelector('.about-text .section-tag');
    const title = mainSec.querySelector('.about-text .section-title');
    const paragraphs = mainSec.querySelectorAll('.about-text p');
    const statsGrid = mainSec.querySelector('.stats-grid');

    if (img && fac.mainImage) img.src = fac.mainImage;
    if (expNum && fac.expNumber) expNum.innerText = fac.expNumber;
    if (expText && fac.expText) expText.innerHTML = fac.expText;
    if (tag && fac.mainTag) tag.innerText = fac.mainTag;
    if (title && fac.mainTitle) title.innerHTML = fac.mainTitle;

    if (paragraphs && paragraphs.length >= 2) {
      if (fac.desc1) paragraphs[0].innerText = fac.desc1;
      if (fac.desc2) paragraphs[1].innerText = fac.desc2;
    }

    if (statsGrid && fac.stats) {
      statsGrid.innerHTML = fac.stats.map(s => `
        <div class="stat-card">
          <h4>${s.count}</h4>
          <p>${s.label}</p>
        </div>
      `).join('');
    }
  }

  // Production Workflow Section
  const workflowSec = document.querySelector('body[data-page="factory"] section.section-padding:nth-of-type(2)');
  if (workflowSec) {
    const tag = workflowSec.querySelector('.section-tag');
    const title = workflowSec.querySelector('.section-title');
    const grid = workflowSec.querySelector('.process-grid');

    if (tag && fac.workflowTag) tag.innerText = fac.workflowTag;
    if (title && fac.workflowTitle) title.innerHTML = fac.workflowTitle;

    if (grid && fac.cards) {
      grid.innerHTML = fac.cards.map((card, idx) => `
        <div class="process-card">
          ${card.image ? `<img src="${card.image}" alt="${card.title}" style="width: 100%; height: 160px; object-fit: cover !important; object-position: ${card.imagePosition || '50% 10%'} !important; border-radius: var(--radius-sm); margin-bottom: 1rem;">` : ''}
          <div class="process-icon">${card.step || '0' + (idx + 1)}</div>
          <h3>${card.title}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">${card.desc}</p>
        </div>
      `).join('');
    }
  }
}

// --- 2e. Packaging Page Dynamic Hydration ---
function renderPackagingPageContent() {
  if (typeof TutStonesStore === 'undefined') return;
  const pkg = TutStonesStore.getPackagingPage();
  if (!pkg) return;

  // Banner
  const banner = document.querySelector('.page-header-banner');
  if (banner) {
    if (pkg.bannerTag && banner.querySelector('.section-tag')) banner.querySelector('.section-tag').innerText = pkg.bannerTag;
    if (pkg.bannerTitle && banner.querySelector('.section-title')) banner.querySelector('.section-title').innerHTML = pkg.bannerTitle;
    if (pkg.bannerDesc && banner.querySelector('.section-desc')) banner.querySelector('.section-desc').innerText = pkg.bannerDesc;
  }

  // Main Section
  const mainSec = document.querySelector('body[data-page="packaging"] section.section-padding:nth-of-type(1)');
  if (mainSec) {
    const img = mainSec.querySelector('.about-image-wrapper img');
    const expNum = mainSec.querySelector('.exp-number');
    const expText = mainSec.querySelector('.exp-text');
    const tag = mainSec.querySelector('.about-text .section-tag');
    const title = mainSec.querySelector('.about-text .section-title');
    const paragraphs = mainSec.querySelectorAll('.about-text p');
    const statsGrid = mainSec.querySelector('.stats-grid');

    if (img && pkg.mainImage) img.src = pkg.mainImage;
    if (expNum && pkg.expNumber) expNum.innerText = pkg.expNumber;
    if (expText && pkg.expText) expText.innerHTML = pkg.expText;
    if (tag && pkg.mainTag) tag.innerText = pkg.mainTag;
    if (title && pkg.mainTitle) title.innerHTML = pkg.mainTitle;

    if (paragraphs && paragraphs.length >= 2) {
      if (pkg.desc1) paragraphs[0].innerText = pkg.desc1;
      if (pkg.desc2) paragraphs[1].innerText = pkg.desc2;
    }

    if (statsGrid && pkg.stats) {
      statsGrid.innerHTML = pkg.stats.map(s => `
        <div class="stat-card">
          <h4>${s.count}</h4>
          <p>${s.label}</p>
        </div>
      `).join('');
    }
  }

  // Specifications Section
  const specsSec = document.querySelector('body[data-page="packaging"] section.section-padding:nth-of-type(2)');
  if (specsSec) {
    const tag = specsSec.querySelector('.section-tag');
    const title = specsSec.querySelector('.section-title');
    const grid = specsSec.querySelector('.process-grid');

    if (tag && pkg.specsTag) tag.innerText = pkg.specsTag;
    if (title && pkg.specsTitle) title.innerHTML = pkg.specsTitle;

    if (grid && pkg.cards) {
      grid.innerHTML = pkg.cards.map(card => `
        <div class="feature-card">
          ${card.image ? `<div class="feature-image-wrapper"><img src="${card.image}" alt="${card.title}" style="width: 100%; height: 100%; object-fit: cover !important; object-position: ${card.imagePosition || '50% 10%'} !important;"><div class="feature-icon"><i class="${card.icon || 'ri-box-3-line'}"></i></div></div>` : `<div class="feature-icon"><i class="${card.icon || 'ri-box-3-line'}"></i></div>`}
          <h3>${card.title}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">${card.desc}</p>
        </div>
      `).join('');
    }
  }
}

// --- 2f. Contact Page Dynamic Hydration ---
function renderContactPageContent() {
  if (typeof TutStonesStore === 'undefined') return;
  const cnt = TutStonesStore.getContactPage();
  if (!cnt) return;

  // Banner
  const banner = document.querySelector('.page-header-banner');
  if (banner) {
    if (cnt.bannerTag && banner.querySelector('.section-tag')) banner.querySelector('.section-tag').innerText = cnt.bannerTag;
    if (cnt.bannerTitle && banner.querySelector('.section-title')) banner.querySelector('.section-title').innerHTML = cnt.bannerTitle;
    if (cnt.bannerDesc && banner.querySelector('.section-desc')) banner.querySelector('.section-desc').innerText = cnt.bannerDesc;
  }

  // Main Section Headings
  const wrapper = document.querySelector('.contact-info-wrapper');
  if (wrapper) {
    const tag = wrapper.querySelector('.section-tag');
    const title = wrapper.querySelector('.section-title');
    const descP = wrapper.querySelector('p');

    if (tag && cnt.mainTag) tag.innerText = cnt.mainTag;
    if (title && cnt.mainTitle) title.innerHTML = cnt.mainTitle;
    if (descP && cnt.mainDesc) descP.innerText = cnt.mainDesc;

    // Contact info cards
    const cards = wrapper.querySelectorAll('.contact-info-wrapper > div > div');
    if (cards && cards.length >= 3) {
      // Address card
      const addrH5 = cards[0].querySelector('h5');
      const addrP = cards[0].querySelector('p');
      const addrMap = cards[0].querySelector('a');
      if (addrH5 && cnt.addressTitle) addrH5.innerText = cnt.addressTitle;
      if (addrP && cnt.addressText) addrP.innerText = cnt.addressText;
      if (addrMap && cnt.addressMapLink) addrMap.href = cnt.addressMapLink;

      // Email card
      const emailH5 = cards[1].querySelector('h5');
      const emailP = cards[1].querySelector('p');
      if (emailH5 && cnt.emailTitle) emailH5.innerText = cnt.emailTitle;
      if (emailP) {
        emailP.innerHTML = `<a href="mailto:${cnt.emailPrimary || 'info@tutstones.com'}" style="color: inherit;">${cnt.emailPrimary || 'info@tutstones.com'}</a> ${cnt.emailSecondary ? '| <a href="mailto:' + cnt.emailSecondary + '" style="color: inherit;">' + cnt.emailSecondary + '</a>' : ''}`;
      }

      // Phone card
      const phoneH5 = cards[2].querySelector('h5');
      const phoneP = cards[2].querySelector('p');
      const waLink = cards[2].querySelector('a[href*="wa.me"]');
      if (phoneH5 && cnt.phoneTitle) phoneH5.innerText = cnt.phoneTitle;
      if (phoneP && cnt.phonePrimary) phoneP.innerHTML = `<a href="tel:${cnt.phonePrimary}" style="color: inherit;">${cnt.phonePrimary}</a>`;
      if (waLink && cnt.whatsappNumber) waLink.href = `https://wa.me/${cnt.whatsappNumber.replace(/[^0-9]/g, '')}`;
    }
  }

  // Form Card
  const formCard = document.querySelector('.contact-form-card');
  if (formCard) {
    const h3 = formCard.querySelector('h3');
    const p = formCard.querySelector('p');
    if (h3 && cnt.formTitle) h3.innerText = cnt.formTitle;
    if (p && cnt.formDesc) p.innerText = cnt.formDesc;
  }
}

/* ==========================================================================
   2b. About Section Image Slider Logic
   ========================================================================== */
function initAboutSlider() {
  const sliderContainer = document.querySelector('.about-slider');
  if (!sliderContainer) return;

  const slides = sliderContainer.querySelectorAll('.about-slide');
  const dots = sliderContainer.querySelectorAll('.about-dots .slider-dot');
  const prevBtn = sliderContainer.querySelector('.about-arrows .prev');
  const nextBtn = sliderContainer.querySelector('.about-arrows .next');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  let autoTimer = null;

  function goToSlide(index) {
    if (index === currentIndex) return;
    const oldIndex = currentIndex;

    slides.forEach(s => s.classList.remove('active', 'prev-slide'));
    dots.forEach(d => d.classList.remove('active'));

    if (slides[oldIndex]) {
      slides[oldIndex].classList.add('prev-slide');
    }

    currentIndex = (index + slides.length) % slides.length;

    if (slides[currentIndex]) {
      slides[currentIndex].classList.add('active');
    }
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  }

  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(nextSlide, 4500);
  }

  function stopAutoPlay() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(i);
      startAutoPlay();
    });
  });

  sliderContainer.addEventListener('mouseenter', stopAutoPlay);
  sliderContainer.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();
}

function renderContactDetails() {
  if (typeof TutStonesStore === 'undefined') return;
  const about = TutStonesStore.getAbout();
  if (!about) return;

  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach(col => {
    const h5 = col.querySelector('h5');
    if (h5 && h5.textContent.includes('Showroom & Office')) {
      const ul = col.querySelector('.footer-links');
      if (ul) {
        let items = [];
        if (about.address && about.addressVisible !== false) {
          items.push(`<li><i class="ri-map-pin-2-line" style="color: var(--color-gold-primary);"></i> ${about.address}</li>`);
        }
        if (about.email && about.emailVisible !== false) {
          items.push(`<li><i class="ri-mail-line" style="color: var(--color-gold-primary);"></i> <a href="mailto:${about.email}">${about.email}</a></li>`);
        }
        if (about.emailSecondary && about.emailSecondaryVisible !== false) {
          items.push(`<li><i class="ri-mail-send-line" style="color: var(--color-gold-primary);"></i> <a href="mailto:${about.emailSecondary}">${about.emailSecondary}</a></li>`);
        }
        if (about.phone && about.phoneVisible !== false) {
          items.push(`<li><i class="ri-phone-line" style="color: var(--color-gold-primary);"></i> <a href="tel:${about.phone}">${about.phone}</a></li>`);
        }
        if (about.phoneSecondary && about.phoneSecondaryVisible !== false) {
          items.push(`<li><i class="ri-whatsapp-line" style="color: var(--color-gold-primary);"></i> <a href="tel:${about.phoneSecondary}">${about.phoneSecondary}</a></li>`);
        }
        if (about.hours && about.hoursVisible !== false) {
          items.push(`<li><i class="ri-time-line" style="color: var(--color-gold-primary);"></i> ${about.hours}</li>`);
        }
        ul.innerHTML = items.join('');
      }
    }
  });
}

/* ==========================================================================
   3. Hero Slider Logic
   ========================================================================== */
function initHeroSlider() {
  if (typeof TutStonesStore === 'undefined') return;
  const slidesData = TutStonesStore.getHeroSlides();
  const sliderContainer = document.querySelector('.hero-slider');
  const heroContentContainer = document.querySelector('.hero-content');
  const dotsContainer = document.querySelector('#home .slider-dots') || document.querySelector('.hero .slider-dots');
  const prevBtn = document.querySelector('#home .slider-arrow.prev') || document.querySelector('.hero .slider-arrow.prev');
  const nextBtn = document.querySelector('#home .slider-arrow.next') || document.querySelector('.hero .slider-arrow.next');

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
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

  let currentIndex = 0;
  let autoTimer = null;

  function updateHeroContent(slide) {
    if (!heroContentContainer || !slide) return;
    heroContentContainer.style.opacity = '0';
    heroContentContainer.style.transform = 'translateY(8px)';
    setTimeout(() => {
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
      heroContentContainer.style.opacity = '1';
      heroContentContainer.style.transform = 'translateY(0)';
    }, 200);
  }

  function goToSlide(index) {
    const oldIndex = currentIndex;
    slides.forEach(s => s.classList.remove('active', 'prev-slide'));
    dots.forEach(d => d.classList.remove('active'));

    if (slides[oldIndex]) {
      slides[oldIndex].classList.add('prev-slide');
    }

    currentIndex = (index + slides.length) % slides.length;

    if (slides[currentIndex]) {
      slides[currentIndex].classList.add('active');
    }
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }

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

function safeImgSrc(url) {
  if (!url) return 'assets/images/marble_calacatta.png';
  try {
    return encodeURI(url);
  } catch(e) {
    return url;
  }
}

function createStoneCardHTML(stone) {
  const hasSplit = Boolean(stone.imageSlab && stone.imageEdge && stone.imageSlab !== stone.imageEdge);
  
  let thumbHTML = '';
  if (hasSplit) {
    thumbHTML = `
      <div class="stone-thumb">
        <div class="stone-diag-split">
          <div class="diag-half diag-left" title="${stone.name} - Full Slab (A)">
            <img src="${safeImgSrc(stone.imageSlab)}" alt="${stone.name} Full Slab" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${safeImgSrc(stone.image)}';">
            <span class="diag-label"><i class="ri-aspect-ratio-line"></i> Full Slab</span>
          </div>
          <div class="diag-half diag-right" title="${stone.name} - Edge View (B)">
            <img src="${safeImgSrc(stone.imageEdge)}" alt="${stone.name} Edge View" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${safeImgSrc(stone.image)}';">
            <span class="diag-label"><i class="ri-stack-line"></i> Edge View</span>
          </div>
          <div class="diag-split-line"></div>
        </div>
      </div>
    `;
  } else {
    thumbHTML = `
      <div class="stone-thumb">
        <img src="${safeImgSrc(stone.image)}" alt="${stone.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/marble_calacatta.png';">
      </div>
    `;
  }

  return `
    <div class="stone-card" onclick="openStoneModal('${stone.id}')" style="cursor: pointer;" title="Click to view specifications for ${stone.name}">
      ${thumbHTML}
      <div class="stone-body" style="padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
          <h3 class="stone-name" style="margin-bottom: 0; font-size: 1.15rem;">${stone.name}</h3>
          <span style="font-size: 0.78rem; color: var(--color-gold-primary); text-transform: uppercase; font-weight: 600; background: rgba(141, 79, 78, 0.15); padding: 0.25rem 0.65rem; border-radius: 4px; border: 1px solid rgba(141, 79, 78, 0.35); white-space: nowrap;">
            <i class="ri-sparkling-line" style="font-size: 0.75rem;"></i> ${stone.finish || stone.category || 'Natural Finish'}
          </span>
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

  let currentCategory = 'all';
  let searchQuery = '';

  // Check URL query param or hash (e.g. materials.html?type=marble or catalogue.html?category=marble)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('type') || urlParams.get('category') || urlParams.get('cat') || (window.location.hash ? window.location.hash.replace('#', '') : null);
  if (catParam) {
    currentCategory = catParam;
  }

  function renderFilterPills() {
    if (!filterPillsContainer) return;
    const categories = TutStonesStore.getCategories();
    
    // Split into Primary collections vs Sub-categories
    const primaryCats = categories.filter(c => !c.parent || c.isParent);
    const subCats = categories.filter(c => c.parent);

    // Primary Pills HTML
    let pillsHTML = `<button class="filter-pill ${currentCategory === 'all' ? 'active' : ''}" data-filter="all"><i class="ri-apps-2-line"></i> All Stone Materials</button>`;
    primaryCats.forEach(cat => {
      const isActive = currentCategory.toLowerCase() === cat.id.toLowerCase() || currentCategory.toLowerCase() === (cat.slug || '').toLowerCase();
      const subCount = subCats.filter(s => s.parent === cat.id).length;
      const badgeHTML = subCount > 0 ? `<span class="pill-badge">${subCount} Sub-Categories</span>` : '';
      pillsHTML += `<button class="filter-pill ${isActive ? 'active' : ''}" data-filter="${cat.id}">${cat.icon ? `<i class="${cat.icon}"></i> ` : ''}${cat.name} ${badgeHTML}</button>`;
    });
    filterPillsContainer.innerHTML = pillsHTML;

    // Sub-category filter bar container
    let subBar = document.getElementById('sub-category-filter-bar');
    if (!subBar) {
      subBar = document.createElement('div');
      subBar.id = 'sub-category-filter-bar';
      subBar.className = 'sub-category-filter-bar';
      filterPillsContainer.parentNode.insertBefore(subBar, filterPillsContainer.nextSibling);
    }

    // Determine active parent for sub-bar display (e.g. 'marble')
    const activeSubCat = subCats.find(s => s.id.toLowerCase() === currentCategory.toLowerCase() || (s.slug && s.slug.toLowerCase() === currentCategory.toLowerCase()));
    const activePrimary = primaryCats.find(p => p.id.toLowerCase() === currentCategory.toLowerCase());
    
    const showSubBarForParent = activePrimary ? activePrimary.id : (activeSubCat ? activeSubCat.parent : 'marble');

    if (showSubBarForParent) {
      const parentObj = primaryCats.find(p => p.id === showSubBarForParent);
      const relevantSubCats = subCats.filter(s => s.parent === showSubBarForParent);
      relevantSubCats.sort((a, b) => (a.order || 99) - (b.order || 99));

      if (relevantSubCats.length > 0) {
        let subHTML = `
          <div class="sub-filter-header">
            <i class="ri-git-merge-line" style="color: #8D4F4E;"></i>
            <span>${parentObj ? parentObj.name : 'Marble'} Sub-Categories & Surface Finishes:</span>
          </div>
          <div class="sub-filter-pills">
            <button class="sub-filter-pill ${currentCategory === showSubBarForParent ? 'active' : ''}" data-filter="${showSubBarForParent}">
              All ${parentObj ? parentObj.name : 'Marble'}
            </button>
        `;

        relevantSubCats.forEach(s => {
          const isSubActive = currentCategory.toLowerCase() === s.id.toLowerCase() || currentCategory.toLowerCase() === (s.slug || '').toLowerCase();
          subHTML += `
            <button class="sub-filter-pill ${isSubActive ? 'active' : ''}" data-filter="${s.id}">
              ${s.icon ? `<i class="${s.icon}"></i> ` : ''}${s.name}
            </button>
          `;
        });

        subHTML += `</div>`;
        subBar.innerHTML = subHTML;
        subBar.style.display = 'block';
      } else {
        subBar.style.display = 'none';
      }
    } else {
      subBar.style.display = 'none';
    }
  }

  renderFilterPills();

  // Event Delegation for Primary and Sub-Category Filter Pills
  const catalogueControls = filterPillsContainer?.parentNode;
  if (catalogueControls) {
    catalogueControls.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill, .sub-filter-pill');
      if (!pill) return;
      
      currentCategory = pill.dataset.filter || 'all';
      renderFilterPills();
      filterAndRender();
    });
  }

  // Background sync with WordPress REST API (port 8888) if active & local
  if (TutStonesStore.syncWithWordPress && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    TutStonesStore.syncWithWordPress().then(res => {
      if (res && res.success) {
        renderFilterPills();
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
    const cat = currentCats.find(c => 
      c.id.toLowerCase() === catId.toLowerCase() || 
      (c.slug && c.slug.toLowerCase() === catId.toLowerCase()) || 
      c.name.toLowerCase().includes(catId.toLowerCase())
    );

    if (cat) {
      const parentCat = cat.parent ? currentCats.find(p => p.id === cat.parent) : null;
      const breadcrumbHTML = parentCat 
        ? `<div style="font-size: 0.78rem; font-weight: 700; color: #8D4F4E; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.3rem;"><i class="ri-node-tree"></i> ${parentCat.name}  &rsaquo;  ${cat.name} (Sub-Category)</div>` 
        : `<div style="font-size: 0.78rem; font-weight: 700; color: #8D4F4E; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.3rem;"><i class="ri-vip-diamond-line"></i> Primary Stone Collection</div>`;

      banner.innerHTML = `
        <div class="category-desc-card">
          <div class="category-desc-icon"><i class="${cat.icon || 'ri-price-tag-3-line'}"></i></div>
          <div class="category-desc-content">
            ${breadcrumbHTML}
            <h4 class="category-desc-title">${cat.name}</h4>
            <p class="category-desc-text">${cat.desc || `Explore our curated selection of ${cat.name} slabs.`}</p>
          </div>
        </div>
      `;
    } else {
      banner.innerHTML = '';
    }
  }

  let itemsPerPage = 9;
  let visibleCount = itemsPerPage;

  function resetPagination() {
    visibleCount = itemsPerPage;
  }

  function renderResultsCountBar(visibleItemsCount, totalFilteredCount) {
    const countBar = document.getElementById('results-count-bar');
    if (!countBar) return;

    if (totalFilteredCount === 0) {
      countBar.style.display = 'none';
      return;
    }

    countBar.style.display = 'flex';
    countBar.innerHTML = `
      <div class="results-count-badge">
        <i class="ri-stack-line"></i>
        Showing <strong>${visibleItemsCount}</strong> of <strong>${totalFilteredCount}</strong> Stone Materials
      </div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted);">
        <i class="ri-filter-3-line"></i> Filter: <span style="font-weight: 700; text-transform: capitalize; color: #8D4F4E;">${currentCategory.replace('-', ' ')}</span>
      </div>
    `;
  }

  function renderLoadMoreButton(visibleItemsCount, totalFilteredCount) {
    const loadMoreContainer = document.getElementById('load-more-container');
    if (!loadMoreContainer) return;

    if (totalFilteredCount <= visibleItemsCount) {
      if (totalFilteredCount > 0) {
        loadMoreContainer.style.display = 'block';
        loadMoreContainer.innerHTML = `
          <span class="all-loaded-text">
            <i class="ri-checkbox-circle-fill" style="color: #25D366;"></i> All ${totalFilteredCount} Stone Materials Loaded
          </span>
        `;
      } else {
        loadMoreContainer.style.display = 'none';
      }
      return;
    }

    const remaining = totalFilteredCount - visibleItemsCount;
    loadMoreContainer.style.display = 'block';
    loadMoreContainer.innerHTML = `
      <button type="button" id="btn-load-more" class="btn-load-more">
        <i class="ri-loader-4-line"></i> Load More Materials (${remaining} Remaining)
      </button>
    `;

    document.getElementById('btn-load-more')?.addEventListener('click', () => {
      visibleCount += itemsPerPage;
      filterAndRender(false);
    });
  }

  function filterAndRender(resetPage = true) {
    if (resetPage) {
      resetPagination();
    }

    renderCategoryDescriptionBanner(currentCategory);
    let allStones = TutStonesStore.getStones();

    // Async Data Protection Safeguard:
    if ((!allStones || allStones.length === 0) && typeof TutStonesStore.loadData === 'function') {
      TutStonesStore.data = TutStonesStore.loadData();
      allStones = TutStonesStore.getStones();
    }

    if (!allStones || allStones.length === 0) {
      catalogueGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--color-text-muted);">
          <i class="ri-loader-4-line" style="font-size: 2.5rem; color: var(--color-gold-primary); display: block; margin-bottom: 1rem; animation: spin 1s infinite linear;"></i>
          <h3>Loading Natural Stone Catalogue...</h3>
          <p>Fetching material specifications and finishes.</p>
        </div>
      `;
      setTimeout(() => filterAndRender(resetPage), 150);
      return;
    }

    let filtered = allStones;

    if (currentCategory !== 'all') {
      const targetCat = currentCategory.toLowerCase();
      filtered = filtered.filter(s => {
        const stoneCat = (s.category || '').toLowerCase();
        const parentCat = (s.parentCategory || '').toLowerCase();
        return stoneCat === targetCat || parentCat === targetCat;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        (s.origin && s.origin.toLowerCase().includes(q)) || 
        (s.desc && s.desc.toLowerCase().includes(q))
      );
    }

    // Sort stones strictly by sub-category order (1 through 10), then by name
    const subCatOrderMap = {};
    TutStonesStore.getCategories().forEach(c => {
      if (c.order) subCatOrderMap[c.id] = c.order;
    });

    filtered.sort((a, b) => {
      const orderA = subCatOrderMap[a.category] || 99;
      const orderB = subCatOrderMap[b.category] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });

    const totalCount = filtered.length;
    const visibleItems = filtered.slice(0, visibleCount);

    renderResultsCountBar(visibleItems.length, totalCount);

    if (totalCount === 0) {
      catalogueGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--color-text-muted);">
          <i class="ri-search-line" style="font-size: 2.5rem; color: var(--color-gold-primary); display: block; margin-bottom: 1rem;"></i>
          <h3>No stones found matching your criteria.</h3>
          <p>Try searching for different terms or reset filters.</p>
        </div>
      `;
    } else {
      catalogueGrid.innerHTML = visibleItems.map(createStoneCardHTML).join('');
    }

    renderLoadMoreButton(visibleItems.length, totalCount);
  }

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterAndRender(true);
  });

  filterAndRender(true);

  // Safety retries for slow or async image/script initialization
  setTimeout(() => filterAndRender(false), 200);
  setTimeout(() => filterAndRender(false), 600);
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

  const hasSplit = Boolean(stone.imageSlab && stone.imageEdge && stone.imageSlab !== stone.imageEdge);

  let imageBlock = '';
  if (hasSplit) {
    imageBlock = `
      <div class="modal-image">
        <div class="stone-diag-split modal-diag-split">
          <div class="diag-half diag-left" title="${stone.name} - Full Slab (A)">
            <img src="${safeImgSrc(stone.imageSlab)}" alt="${stone.name} Full Slab" onerror="this.onerror=null; this.src='${safeImgSrc(stone.image)}';">
            <span class="diag-label"><i class="ri-aspect-ratio-line"></i> Full Slab (A)</span>
          </div>
          <div class="diag-half diag-right" title="${stone.name} - Edge View (B)">
            <img src="${safeImgSrc(stone.imageEdge)}" alt="${stone.name} Edge View" onerror="this.onerror=null; this.src='${safeImgSrc(stone.image)}';">
            <span class="diag-label"><i class="ri-stack-line"></i> Edge View (B)</span>
          </div>
          <div class="diag-split-line"></div>
        </div>
        <p style="text-align: center; font-size: 0.78rem; color: var(--color-text-muted); margin-top: 0.6rem;">
          <i class="ri-cursor-line"></i> Hover left or right to expand Full Slab (A) or Edge View (B)
        </p>
      </div>
    `;
  } else {
    imageBlock = `
      <div class="modal-image">
        <img src="${safeImgSrc(stone.image)}" alt="${stone.name}" onerror="this.onerror=null; this.src='assets/images/marble_calacatta.png';">
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-grid">
      ${imageBlock}
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

/* ==========================================================================
   Interactive Diagonal Split Event Handlers (Full Slab A / Edge View B)
   ========================================================================== */
document.addEventListener('mouseover', (e) => {
  const left = e.target.closest('.diag-left');
  const right = e.target.closest('.diag-right');
  const container = e.target.closest('.stone-diag-split');
  if (!container) return;

  if (left) {
    container.classList.add('hover-left');
    container.classList.remove('hover-right');
  } else if (right) {
    container.classList.add('hover-right');
    container.classList.remove('hover-left');
  }
});

document.addEventListener('mouseout', (e) => {
  const container = e.target.closest('.stone-diag-split');
  if (container && !container.contains(e.relatedTarget)) {
    container.classList.remove('hover-left', 'hover-right');
  }
});

