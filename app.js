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
  try { initStoneImagePopup(); } catch (e) { console.error('Error initStoneImagePopup:', e); }
});

// Re-render page content when server data.json is fetched (async after initial DOM render).
// This ensures admin edits persisted server-side appear on all pages without a full reload.
window.addEventListener('tutstones:server-data-ready', () => {
  const page = document.body.dataset.page || 'home';
  try { renderSocialLinks(); } catch (e) {}
  try { renderFooterContent(); } catch (e) {}
  if (page === 'home') {
    try { renderHomePageContent(); } catch (e) {}
    try { initHeroSlider(); } catch (e) {}
    try { initAboutSlider(); } catch (e) {}
  } else if (page === 'about') {
    try { renderAboutPageContent(); } catch (e) {}
  } else if (page === 'factory') {
    try { renderFactoryPageContent(); } catch (e) {}
  } else if (page === 'packaging') {
    try { renderPackagingPageContent(); } catch (e) {}
  } else if (page === 'contact') {
    try { renderContactPageContent(); } catch (e) {}
  }
  try { renderFeaturedSections(); } catch (e) {}
});

function isFieldVisible(obj, fieldId) {
  if (!obj || !obj.fieldVisibility) return true;
  return obj.fieldVisibility[fieldId] !== false;
}



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

  const footer = document.querySelector('footer.footer') || document.querySelector('footer');
  if (!footer) return;

  // Brand paragraph
  const brandP = footer.querySelector('.footer-brand p');
  if (brandP) {
    if (!isFieldVisible(ftr, 'ftr-brand-desc')) {
      brandP.style.display = 'none';
    } else {
      brandP.style.display = '';
      if (ftr.brandDesc) brandP.innerText = ftr.brandDesc;
    }
  }

  // Headquarters column
  const hqCols = footer.querySelectorAll('.footer-col');
  hqCols.forEach(col => {
    const h5 = col.querySelector('h5');
    if (h5 && (h5.textContent.includes('Headquarters') || h5.textContent.includes('Export') || h5.textContent.includes('Showroom') || h5.textContent.includes('Contact'))) {
      const ul = col.querySelector('.footer-links');
      if (ul) {
        let items = [];
        if (ftr.address && isFieldVisible(ftr, 'ftr-address')) {
          const hasLink = ftr.addressLink && isFieldVisible(ftr, 'ftr-address-link');
          const addrHTML = hasLink
            ? `<a href="${ftr.addressLink}" target="_blank" rel="noopener noreferrer" style="color: inherit;">${ftr.address}</a>`
            : `${ftr.address}`;
          items.push(`<li><i class="ri-map-pin-2-line" style="color: var(--color-gold-primary);"></i> ${addrHTML}</li>`);
        }
        let emails = [];
        if (ftr.emailPrimary && isFieldVisible(ftr, 'ftr-email-primary')) {
          emails.push(`<a href="mailto:${ftr.emailPrimary}" style="color: inherit;">${ftr.emailPrimary}</a>`);
        }
        if (ftr.emailSecondary && isFieldVisible(ftr, 'ftr-email-secondary')) {
          emails.push(`<a href="mailto:${ftr.emailSecondary}" style="color: inherit;">${ftr.emailSecondary}</a>`);
        }
        if (emails.length > 0) {
          items.push(`<li><i class="ri-mail-line" style="color: var(--color-gold-primary);"></i> ${emails.join(' | ')}</li>`);
        }
        if (ftr.phonePrimary && isFieldVisible(ftr, 'ftr-phone-primary')) {
          items.push(`<li><i class="ri-phone-line" style="color: var(--color-gold-primary);"></i> <a href="tel:${ftr.phonePrimary}" style="color: inherit;">${ftr.phonePrimary}</a></li>`);
        }
        if (ftr.whatsappNumber && isFieldVisible(ftr, 'ftr-whatsapp-num')) {
          items.push(`<li><i class="ri-whatsapp-line" style="color: #25D366;"></i> <a href="https://wa.me/${ftr.whatsappNumber.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" style="color: inherit;">WhatsApp: ${ftr.whatsappNumber}</a></li>`);
        }
        if (ftr.hours && isFieldVisible(ftr, 'ftr-hours')) {
          items.push(`<li><i class="ri-time-line" style="color: var(--color-gold-primary);"></i> ${ftr.hours}</li>`);
        }
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
    const expCard = aboutSection.querySelector('.exp-badge, .about-exp-card, .about-experience');
    const pContainer = aboutSection.querySelector('.about-paragraphs');

    if (tagElem) {
      tagElem.style.display = isFieldVisible(hp, 'hp-about-tag') ? '' : 'none';
      if (hp.aboutTag) tagElem.innerText = hp.aboutTag;
    }
    if (titleElem) {
      titleElem.style.display = isFieldVisible(hp, 'hp-about-title') ? '' : 'none';
      if (hp.aboutTitle) titleElem.innerHTML = hp.aboutTitle;
    }

    const expNumVis = isFieldVisible(hp, 'hp-about-exp-num');
    const expTextVis = isFieldVisible(hp, 'hp-about-exp-text');
    if (expNumElem) {
      expNumElem.style.display = expNumVis ? '' : 'none';
      if (hp.aboutExpNumber) expNumElem.innerText = hp.aboutExpNumber;
    }
    if (expTextElem) {
      expTextElem.style.display = expTextVis ? '' : 'none';
      if (hp.aboutExpText) expTextElem.innerHTML = hp.aboutExpText;
    }
    if (expCard) {
      expCard.style.display = (!expNumVis && !expTextVis) ? 'none' : '';
    }

    if (pContainer) {
      let pContent = '';
      if (hp.aboutDesc1 && isFieldVisible(hp, 'hp-about-desc1')) pContent += `<p style="color: var(--color-text-muted); font-size: 1.05rem; margin-bottom: 1.25rem;">${hp.aboutDesc1}</p>`;
      if (hp.aboutDesc2 && isFieldVisible(hp, 'hp-about-desc2')) pContent += `<p style="color: var(--color-text-muted); font-size: 0.98rem; margin-bottom: 1.25rem;">${hp.aboutDesc2}</p>`;
      if (hp.aboutDesc3 && isFieldVisible(hp, 'hp-about-desc3')) pContent += `<p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 2rem;">${hp.aboutDesc3}</p>`;
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

    if (tagElem) {
      tagElem.style.display = isFieldVisible(hp, 'hp-boxes-tag') ? '' : 'none';
      if (hp.boxesTag) tagElem.innerText = hp.boxesTag;
    }
    if (titleElem) {
      titleElem.style.display = isFieldVisible(hp, 'hp-boxes-title') ? '' : 'none';
      if (hp.boxesTitle) titleElem.innerHTML = hp.boxesTitle;
    }

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
    const bTag = banner.querySelector('.section-tag');
    const bTitle = banner.querySelector('.section-title');
    const bDesc = banner.querySelector('.section-desc');

    if (bTag) {
      bTag.style.display = isFieldVisible(ab, 'abp-banner-tag') ? '' : 'none';
      if (ab.bannerTag) bTag.innerText = ab.bannerTag;
    }
    if (bTitle) {
      bTitle.style.display = isFieldVisible(ab, 'abp-banner-title') ? '' : 'none';
      if (ab.bannerTitle) bTitle.innerHTML = ab.bannerTitle;
    }
    if (bDesc) {
      bDesc.style.display = isFieldVisible(ab, 'abp-banner-desc') ? '' : 'none';
      if (ab.bannerDesc) bDesc.innerText = ab.bannerDesc;
    }
  }

  // Main story section
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const mainImgWrapper = aboutSection.querySelector('.about-image-wrapper');
    const mainImg = aboutSection.querySelector('.about-image-wrapper img');
    const expNum = aboutSection.querySelector('.exp-number');
    const expText = aboutSection.querySelector('.exp-text');
    const expCard = aboutSection.querySelector('.exp-badge, .about-exp-card, .about-experience');
    const tag = aboutSection.querySelector('.about-text .section-tag');
    const title = aboutSection.querySelector('.about-text .section-title');
    const pContainer = aboutSection.querySelector('.about-paragraphs');
    const statsGrid = aboutSection.querySelector('.stats-grid');

    if (mainImg) {
      const imgVis = isFieldVisible(ab, 'abp-main-img-url');
      if (mainImgWrapper) mainImgWrapper.style.display = imgVis ? '' : 'none';
      if (ab.mainImage) mainImg.src = ab.mainImage;
    }
    const expNumVis = isFieldVisible(ab, 'abp-exp-num');
    const expTextVis = isFieldVisible(ab, 'abp-exp-text');
    if (expNum) {
      expNum.style.display = expNumVis ? '' : 'none';
      if (ab.expNumber) expNum.innerText = ab.expNumber;
    }
    if (expText) {
      expText.style.display = expTextVis ? '' : 'none';
      if (ab.expText) expText.innerHTML = ab.expText;
    }
    if (expCard) {
      expCard.style.display = (!expNumVis && !expTextVis) ? 'none' : '';
    }

    if (tag) {
      tag.style.display = isFieldVisible(ab, 'abp-main-tag') ? '' : 'none';
      if (ab.mainTag) tag.innerText = ab.mainTag;
    }
    if (title) {
      title.style.display = isFieldVisible(ab, 'abp-main-title') ? '' : 'none';
      if (ab.mainTitle) title.innerHTML = ab.mainTitle;
    }

    if (pContainer) {
      let pContent = '';
      if (ab.desc1 && isFieldVisible(ab, 'abp-desc1')) pContent += `<p style="color: var(--color-text-muted); font-size: 1.05rem; margin-bottom: 1.25rem;">${ab.desc1}</p>`;
      if (ab.desc2 && isFieldVisible(ab, 'abp-desc2')) pContent += `<p style="color: var(--color-text-muted); font-size: 0.98rem; margin-bottom: 1.25rem;">${ab.desc2}</p>`;
      if (ab.desc3 && isFieldVisible(ab, 'abp-desc3')) pContent += `<p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 2rem;">${ab.desc3}</p>`;
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

    if (tag) {
      tag.style.display = isFieldVisible(ab, 'abp-bottom-tag') ? '' : 'none';
      if (ab.bottomTag) tag.innerText = ab.bottomTag;
    }
    if (title) {
      title.style.display = isFieldVisible(ab, 'abp-bottom-title') ? '' : 'none';
      if (ab.bottomTitle) title.innerHTML = ab.bottomTitle;
    }

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
    const bTag = banner.querySelector('.section-tag');
    const bTitle = banner.querySelector('.section-title');
    const bDesc = banner.querySelector('.section-desc');

    if (bTag) {
      bTag.style.display = isFieldVisible(fac, 'fac-banner-tag') ? '' : 'none';
      if (fac.bannerTag) bTag.innerText = fac.bannerTag;
    }
    if (bTitle) {
      bTitle.style.display = isFieldVisible(fac, 'fac-banner-title') ? '' : 'none';
      if (fac.bannerTitle) bTitle.innerHTML = fac.bannerTitle;
    }
    if (bDesc) {
      bDesc.style.display = isFieldVisible(fac, 'fac-banner-desc') ? '' : 'none';
      if (fac.bannerDesc) bDesc.innerText = fac.bannerDesc;
    }
  }

  // Main Section
  const mainSec = document.querySelector('body[data-page="factory"] section.section-padding:nth-of-type(1)');
  if (mainSec) {
    const imgWrapper = mainSec.querySelector('.about-image-wrapper');
    const img = mainSec.querySelector('.about-image-wrapper img');
    const expNum = mainSec.querySelector('.exp-number');
    const expText = mainSec.querySelector('.exp-text');
    const expCard = mainSec.querySelector('.exp-badge, .about-exp-card, .about-experience');
    const tag = mainSec.querySelector('.about-text .section-tag');
    const title = mainSec.querySelector('.about-text .section-title');
    const paragraphs = mainSec.querySelectorAll('.about-text p');
    const statsGrid = mainSec.querySelector('.stats-grid');

    if (img) {
      const imgVis = isFieldVisible(fac, 'fac-main-img-url');
      if (imgWrapper) imgWrapper.style.display = imgVis ? '' : 'none';
      if (fac.mainImage) img.src = fac.mainImage;
    }
    const expNumVis = isFieldVisible(fac, 'fac-exp-num');
    const expTextVis = isFieldVisible(fac, 'fac-exp-text');
    if (expNum) {
      expNum.style.display = expNumVis ? '' : 'none';
      if (fac.expNumber) expNum.innerText = fac.expNumber;
    }
    if (expText) {
      expText.style.display = expTextVis ? '' : 'none';
      if (fac.expText) expText.innerHTML = fac.expText;
    }
    if (expCard) {
      expCard.style.display = (!expNumVis && !expTextVis) ? 'none' : '';
    }

    if (tag) {
      tag.style.display = isFieldVisible(fac, 'fac-main-tag') ? '' : 'none';
      if (fac.mainTag) tag.innerText = fac.mainTag;
    }
    if (title) {
      title.style.display = isFieldVisible(fac, 'fac-main-title') ? '' : 'none';
      if (fac.mainTitle) title.innerHTML = fac.mainTitle;
    }

    if (paragraphs && paragraphs.length >= 2) {
      paragraphs[0].style.display = isFieldVisible(fac, 'fac-desc1') ? '' : 'none';
      if (fac.desc1) paragraphs[0].innerText = fac.desc1;

      paragraphs[1].style.display = isFieldVisible(fac, 'fac-desc2') ? '' : 'none';
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

    if (tag) {
      tag.style.display = isFieldVisible(fac, 'fac-workflow-tag') ? '' : 'none';
      if (fac.workflowTag) tag.innerText = fac.workflowTag;
    }
    if (title) {
      title.style.display = isFieldVisible(fac, 'fac-workflow-title') ? '' : 'none';
      if (fac.workflowTitle) title.innerHTML = fac.workflowTitle;
    }

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
    const bTag = banner.querySelector('.section-tag');
    const bTitle = banner.querySelector('.section-title');
    const bDesc = banner.querySelector('.section-desc');

    if (bTag) {
      bTag.style.display = isFieldVisible(pkg, 'pkg-banner-tag') ? '' : 'none';
      if (pkg.bannerTag) bTag.innerText = pkg.bannerTag;
    }
    if (bTitle) {
      bTitle.style.display = isFieldVisible(pkg, 'pkg-banner-title') ? '' : 'none';
      if (pkg.bannerTitle) bTitle.innerHTML = pkg.bannerTitle;
    }
    if (bDesc) {
      bDesc.style.display = isFieldVisible(pkg, 'pkg-banner-desc') ? '' : 'none';
      if (pkg.bannerDesc) bDesc.innerText = pkg.bannerDesc;
    }
  }

  // Main Section
  const mainSec = document.querySelector('body[data-page="packaging"] section.section-padding:nth-of-type(1)');
  if (mainSec) {
    const imgWrapper = mainSec.querySelector('.about-image-wrapper');
    const img = mainSec.querySelector('.about-image-wrapper img');
    const expNum = mainSec.querySelector('.exp-number');
    const expText = mainSec.querySelector('.exp-text');
    const expCard = mainSec.querySelector('.exp-badge, .about-exp-card, .about-experience');
    const tag = mainSec.querySelector('.about-text .section-tag');
    const title = mainSec.querySelector('.about-text .section-title');
    const paragraphs = mainSec.querySelectorAll('.about-text p');
    const statsGrid = mainSec.querySelector('.stats-grid');

    if (img) {
      const imgVis = isFieldVisible(pkg, 'pkg-main-img-url');
      if (imgWrapper) imgWrapper.style.display = imgVis ? '' : 'none';
      if (pkg.mainImage) img.src = pkg.mainImage;
    }
    const expNumVis = isFieldVisible(pkg, 'pkg-exp-num');
    const expTextVis = isFieldVisible(pkg, 'pkg-exp-text');
    if (expNum) {
      expNum.style.display = expNumVis ? '' : 'none';
      if (pkg.expNumber) expNum.innerText = pkg.expNumber;
    }
    if (expText) {
      expText.style.display = expTextVis ? '' : 'none';
      if (pkg.expText) expText.innerHTML = pkg.expText;
    }
    if (expCard) {
      expCard.style.display = (!expNumVis && !expTextVis) ? 'none' : '';
    }

    if (tag) {
      tag.style.display = isFieldVisible(pkg, 'pkg-main-tag') ? '' : 'none';
      if (pkg.mainTag) tag.innerText = pkg.mainTag;
    }
    if (title) {
      title.style.display = isFieldVisible(pkg, 'pkg-main-title') ? '' : 'none';
      if (pkg.mainTitle) title.innerHTML = pkg.mainTitle;
    }

    if (paragraphs && paragraphs.length >= 2) {
      paragraphs[0].style.display = isFieldVisible(pkg, 'pkg-desc1') ? '' : 'none';
      if (pkg.desc1) paragraphs[0].innerText = pkg.desc1;

      paragraphs[1].style.display = isFieldVisible(pkg, 'pkg-desc2') ? '' : 'none';
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

    if (tag) {
      tag.style.display = isFieldVisible(pkg, 'pkg-specs-tag') ? '' : 'none';
      if (pkg.specsTag) tag.innerText = pkg.specsTag;
    }
    if (title) {
      title.style.display = isFieldVisible(pkg, 'pkg-specs-title') ? '' : 'none';
      if (pkg.specsTitle) title.innerHTML = pkg.specsTitle;
    }

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
    const bTag = banner.querySelector('.section-tag');
    const bTitle = banner.querySelector('.section-title');
    const bDesc = banner.querySelector('.section-desc');

    if (bTag) {
      bTag.style.display = isFieldVisible(cnt, 'cnt-banner-tag') ? '' : 'none';
      if (cnt.bannerTag) bTag.innerText = cnt.bannerTag;
    }
    if (bTitle) {
      bTitle.style.display = isFieldVisible(cnt, 'cnt-banner-title') ? '' : 'none';
      if (cnt.bannerTitle) bTitle.innerHTML = cnt.bannerTitle;
    }
    if (bDesc) {
      bDesc.style.display = isFieldVisible(cnt, 'cnt-banner-desc') ? '' : 'none';
      if (cnt.bannerDesc) bDesc.innerText = cnt.bannerDesc;
    }
  }

  // Main Section Headings
  const wrapper = document.querySelector('.contact-info-wrapper');
  if (wrapper) {
    const tag = wrapper.querySelector('.section-tag');
    const title = wrapper.querySelector('.section-title');
    const descP = wrapper.querySelector('p');

    if (tag) {
      tag.style.display = isFieldVisible(cnt, 'cnt-main-tag') ? '' : 'none';
      if (cnt.mainTag) tag.innerText = cnt.mainTag;
    }
    if (title) {
      title.style.display = isFieldVisible(cnt, 'cnt-main-title') ? '' : 'none';
      if (cnt.mainTitle) title.innerHTML = cnt.mainTitle;
    }
    if (descP) {
      descP.style.display = isFieldVisible(cnt, 'cnt-main-desc') ? '' : 'none';
      if (cnt.mainDesc) descP.innerText = cnt.mainDesc;
    }

    // Contact info cards
    const cards = wrapper.querySelectorAll('.contact-info-wrapper > div > div');
    if (cards && cards.length >= 3) {
      // Address card
      const addrH5 = cards[0].querySelector('h5');
      const addrP = cards[0].querySelector('p');
      const addrMap = cards[0].querySelector('a');
      const addrTitleVis = isFieldVisible(cnt, 'cnt-address-title');
      const addrTextVis = isFieldVisible(cnt, 'cnt-address-text');
      const addrMapVis = isFieldVisible(cnt, 'cnt-address-map-link');

      if (addrH5) {
        addrH5.style.display = addrTitleVis ? '' : 'none';
        if (cnt.addressTitle) addrH5.innerText = cnt.addressTitle;
      }
      if (addrP) {
        addrP.style.display = addrTextVis ? '' : 'none';
        if (cnt.addressText) addrP.innerText = cnt.addressText;
      }
      if (addrMap) {
        addrMap.style.display = addrMapVis ? '' : 'none';
        if (cnt.addressMapLink) addrMap.href = cnt.addressMapLink;
      }
      cards[0].style.display = (!addrTitleVis && !addrTextVis && !addrMapVis) ? 'none' : '';

      // Email card
      const emailH5 = cards[1].querySelector('h5');
      const emailP = cards[1].querySelector('p');
      const emailTitleVis = isFieldVisible(cnt, 'cnt-email-title');
      const emailTextVis = isFieldVisible(cnt, 'cnt-email-primary');

      if (emailH5) {
        emailH5.style.display = emailTitleVis ? '' : 'none';
        if (cnt.emailTitle) emailH5.innerText = cnt.emailTitle;
      }
      if (emailP) {
        emailP.style.display = emailTextVis ? '' : 'none';
        emailP.innerHTML = `<a href="mailto:${cnt.emailPrimary || 'info@tutstones.com'}" style="color: inherit;">${cnt.emailPrimary || 'info@tutstones.com'}</a> ${cnt.emailSecondary ? '| <a href="mailto:' + cnt.emailSecondary + '" style="color: inherit;">' + cnt.emailSecondary + '</a>' : ''}`;
      }
      cards[1].style.display = (!emailTitleVis && !emailTextVis) ? 'none' : '';

      // Phone card
      const phoneH5 = cards[2].querySelector('h5');
      const phoneP = cards[2].querySelector('p');
      const waLink = cards[2].querySelector('a[href*="wa.me"]');
      const phoneTitleVis = isFieldVisible(cnt, 'cnt-phone-title');
      const phoneTextVis = isFieldVisible(cnt, 'cnt-phone-primary');
      const waVis = isFieldVisible(cnt, 'cnt-whatsapp-num');

      if (phoneH5) {
        phoneH5.style.display = phoneTitleVis ? '' : 'none';
        if (cnt.phoneTitle) phoneH5.innerText = cnt.phoneTitle;
      }
      if (phoneP) {
        phoneP.style.display = phoneTextVis ? '' : 'none';
        if (cnt.phonePrimary) phoneP.innerHTML = `<a href="tel:${cnt.phonePrimary}" style="color: inherit;">${cnt.phonePrimary}</a>`;
      }
      if (waLink) {
        waLink.style.display = waVis ? '' : 'none';
        if (cnt.whatsappNumber) waLink.href = `https://wa.me/${cnt.whatsappNumber.replace(/[^0-9]/g, '')}`;
      }
      cards[2].style.display = (!phoneTitleVis && !phoneTextVis && !waVis) ? 'none' : '';
    }
  }

  // Form Card
  const formCard = document.querySelector('.contact-form-card');
  if (formCard) {
    const h3 = formCard.querySelector('h3');
    const p = formCard.querySelector('p');
    if (h3) {
      h3.style.display = isFieldVisible(cnt, 'cnt-form-title') ? '' : 'none';
      if (cnt.formTitle) h3.innerText = cnt.formTitle;
    }
    if (p) {
      p.style.display = isFieldVisible(cnt, 'cnt-form-desc') ? '' : 'none';
      if (cnt.formDesc) p.innerText = cnt.formDesc;
    }
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
  const hasSplit = Boolean(isFieldVisible(stone, 'stone-image-edge') && stone.imageSlab && stone.imageEdge && stone.imageSlab !== stone.imageEdge);
  
  const slabUrl = safeImgSrc(stone.imageSlab || stone.image);
  const edgeUrl = safeImgSrc(stone.imageEdge || stone.image);
  const mainUrl = safeImgSrc(stone.image);

  if (hasSplit) {
    const p1 = new Image(); p1.src = slabUrl;
    const p2 = new Image(); p2.src = edgeUrl;
  }

  let thumbHTML = '';
  if (hasSplit) {
    thumbHTML = `
      <div class="stone-thumb" data-stone-id="${stone.id}" data-slab="${slabUrl}" data-edge="${edgeUrl}" data-main="${mainUrl}">
        <img id="card-img-${stone.id}" src="${slabUrl}" alt="${stone.name} Full Tile" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${mainUrl}';">
        <div id="card-badge-${stone.id}" class="card-img-badge">
          <i class="ri-aspect-ratio-line"></i> Full Tile
        </div>
        <button type="button" class="card-arrow-btn card-arrow-prev" onclick="event.stopPropagation(); toggleCardImage('${stone.id}', -1)" title="Switch image view (Full / Edge)" aria-label="Previous view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button type="button" class="card-arrow-btn card-arrow-next" onclick="event.stopPropagation(); toggleCardImage('${stone.id}', 1)" title="Switch image view (Full / Edge)" aria-label="Next view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    `;
  } else {
    thumbHTML = `
      <div class="stone-thumb" data-stone-id="${stone.id}" data-main="${mainUrl}" title="${stone.name}">
        <img src="${mainUrl}" alt="${stone.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/marble_calacatta.png';">
      </div>
    `;
  }

  const nameVisible = isFieldVisible(stone, 'stone-name');
  const finishVisible = isFieldVisible(stone, 'stone-finish');

  return `
    <div class="stone-card" data-stone-id="${stone.id}" onclick="openStoneModal('${stone.id}')" style="cursor: pointer;" title="Click to view details & switch images for ${stone.name}">
      ${thumbHTML}
      <div class="stone-body" style="padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
          ${nameVisible ? `<h3 class="stone-name" style="margin-bottom: 0; font-size: 1.15rem;">${stone.name}</h3>` : ''}
          ${finishVisible ? `
          <span style="font-size: 0.78rem; color: var(--color-gold-primary); text-transform: uppercase; font-weight: 600; background: rgba(141, 79, 78, 0.15); padding: 0.25rem 0.65rem; border-radius: 4px; border: 1px solid rgba(141, 79, 78, 0.35); white-space: nowrap;">
            <i class="ri-sparkling-line" style="font-size: 0.75rem;"></i> ${stone.finish || stone.category || 'Natural Finish'}
          </span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function toggleCardImage(stoneId, delta) {
  const stone = typeof TutStonesStore !== 'undefined' ? TutStonesStore.getStone(stoneId) : null;
  if (!stone) return;

  const cardImg = document.getElementById(`card-img-${stoneId}`);
  const cardBadge = document.getElementById(`card-badge-${stoneId}`);
  if (!cardImg) return;

  const slabUrl = safeImgSrc(stone.imageSlab || stone.image);
  const edgeUrl = safeImgSrc(stone.imageEdge);
  if (!edgeUrl) return;

  const isCurrentSlab = cardImg.src.includes(encodeURI(stone.imageSlab || stone.image)) || cardImg.alt.includes('Full Tile') || cardImg.alt.includes('Full Slab');

  if (isCurrentSlab) {
    cardImg.src = edgeUrl;
    cardImg.alt = `${stone.name} Edge View`;
    if (cardBadge) {
      cardBadge.innerHTML = `<i class="ri-stack-line"></i> Edge View`;
    }
  } else {
    cardImg.src = slabUrl;
    cardImg.alt = `${stone.name} Full Tile`;
    if (cardBadge) {
      cardBadge.innerHTML = `<i class="ri-aspect-ratio-line"></i> Full Tile`;
    }
  }
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
    const banner = document.getElementById('category-description-banner') || document.getElementById('category-desc-banner');
    if (!banner) return;

    if (!catId || catId === 'all') {
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
    const safeCatId = String(catId).toLowerCase();
    const cat = currentCats.find(c => 
      (c.id && String(c.id).toLowerCase() === safeCatId) || 
      (c.slug && String(c.slug).toLowerCase() === safeCatId) || 
      (c.name && typeof c.name === 'string' && String(c.name).toLowerCase().includes(safeCatId))
    );

    if (cat) {
      const parentCat = cat.parent ? currentCats.find(p => p.id === cat.parent) : null;
      const parentName = parentCat && typeof parentCat.name === 'string' ? parentCat.name : '';
      const catName = cat.name || 'Category';

      const breadcrumbHTML = parentName 
        ? `<div style="font-size: 0.78rem; font-weight: 700; color: #8D4F4E; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.3rem;"><i class="ri-node-tree"></i> ${parentName} &rsaquo; ${catName} (Sub-Category)</div>` 
        : `<div style="font-size: 0.78rem; font-weight: 700; color: #8D4F4E; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.3rem;"><i class="ri-vip-diamond-line"></i> Primary Stone Collection</div>`;

      banner.innerHTML = `
        <div class="category-desc-card">
          <div class="category-desc-icon"><i class="${cat.icon || 'ri-price-tag-3-line'}"></i></div>
          <div class="category-desc-content">
            ${breadcrumbHTML}
            <h4 class="category-desc-title">${catName}</h4>
            <p class="category-desc-text">${cat.desc || `Explore our curated selection of ${catName} slabs.`}</p>
          </div>
        </div>
      `;
    } else {
      banner.innerHTML = '';
    }
  }

  let itemsPerPage = 20;
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

    if (currentCategory && currentCategory !== 'all') {
      const safeCurrentCat = String(currentCategory).toLowerCase();
      const currentCats = TutStonesStore.getCategories();
      
      const targetCatObj = currentCats.find(c => 
        (c.id && String(c.id).toLowerCase() === safeCurrentCat) || 
        (c.slug && String(c.slug).toLowerCase() === safeCurrentCat)
      );

      const validCatIds = new Set();
      validCatIds.add(safeCurrentCat);

      if (targetCatObj) {
        if (targetCatObj.id) validCatIds.add(String(targetCatObj.id).toLowerCase());
        if (targetCatObj.slug) validCatIds.add(String(targetCatObj.slug).toLowerCase());

        // If filtering by a primary parent collection (e.g. 'marble'), include all sub-categories belonging to it
        currentCats.filter(c => c.parent === targetCatObj.id).forEach(sub => {
          if (sub.id) validCatIds.add(String(sub.id).toLowerCase());
          if (sub.slug) validCatIds.add(String(sub.slug).toLowerCase());
        });
      }

      filtered = filtered.filter(s => {
        const sCat = typeof s.category === 'string' ? s.category.toLowerCase() : (s.category && s.category.id ? String(s.category.id).toLowerCase() : '');
        const sParent = typeof s.parentCategory === 'string' ? s.parentCategory.toLowerCase() : (s.parentCategory && s.parentCategory.id ? String(s.parentCategory.id).toLowerCase() : '');
        
        // Also check category parent mapping from store categories
        const catObj = currentCats.find(c => (c.id && String(c.id).toLowerCase() === sCat) || (c.slug && String(c.slug).toLowerCase() === sCat));
        const catParentId = catObj && catObj.parent ? String(catObj.parent).toLowerCase() : '';

        return validCatIds.has(sCat) || validCatIds.has(sParent) || validCatIds.has(catParentId);
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
let currentModalStoneId = null;
let currentModalImgIndex = 0; // 0 = Full Slab (A), 1 = Edge View (B)

function initModal() {
  const overlay = document.getElementById('spec-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Keyboard navigation for image switching & closing
  document.addEventListener('keydown', (e) => {
    const activeOverlay = document.getElementById('spec-modal');
    if (activeOverlay && activeOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (currentModalStoneId) {
          switchModalImage(currentModalStoneId, e.key === 'ArrowLeft' ? -1 : 1);
        }
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }
  });
}

function openStoneModal(stoneId) {
  if (typeof window.hideStonePreview === 'function') {
    window.hideStonePreview();
  }
  if (typeof TutStonesStore === 'undefined') return;
  const stone = TutStonesStore.getStone(stoneId);
  if (!stone) return;

  currentModalStoneId = stoneId;
  currentModalImgIndex = 0; // Default to Full Slab View (0)

  const overlay = document.getElementById('spec-modal');
  const modalContent = document.getElementById('modal-content-body');
  if (!overlay || !modalContent) return;

  const fullImg = safeImgSrc(stone.imageSlab || stone.image);
  const edgeImg = safeImgSrc(stone.imageEdge);
  const hasTwoImages = Boolean(isFieldVisible(stone, 'stone-image-edge') && stone.imageEdge && stone.imageEdge !== (stone.imageSlab || stone.image));

  if (hasTwoImages) {
    const p1 = new Image(); p1.src = fullImg;
    const p2 = new Image(); p2.src = edgeImg;
  }

  let imageBlock = '';
  if (hasTwoImages) {
    imageBlock = `
      <div class="modal-image-gallery" style="display: flex !important; flex-direction: column !important; gap: 1rem !important; width: 100% !important; align-items: center !important;">
        <div class="modal-img-stage" id="modal-img-stage" style="position: relative !important; width: 100% !important; height: 380px !important; max-height: 48vh !important; border-radius: 12px !important; overflow: hidden !important; border: 1.5px solid #DFB77D !important; background: #FAF6F0 !important; display: flex !important; align-items: center !important; justify-content: center !important; flex-shrink: 0 !important; cursor: pointer !important;">
          <img id="modal-active-img" src="${fullImg}" alt="${stone.name} Full Tile View" onclick="openImageLightbox(this.src, this.alt)" style="width: 100% !important; height: 100% !important; max-width: 100% !important; max-height: 100% !important; object-fit: contain !important; display: block !important; cursor: zoom-in !important;" onerror="this.onerror=null; this.src='${safeImgSrc(stone.image)}';">
          
          <div id="modal-view-badge" class="modal-view-badge" style="position: absolute !important; top: 0.85rem !important; left: 0.85rem !important; background: rgba(255, 253, 248, 0.96) !important; color: #8D4F4E !important; border: 1.5px solid #8D4F4E !important; padding: 0.35rem 0.85rem !important; border-radius: 20px !important; font-size: 0.82rem !important; font-weight: 700 !important; display: flex !important; align-items: center !important; gap: 0.4rem !important; box-shadow: 0 4px 14px rgba(36, 28, 24, 0.18) !important; z-index: 10 !important; pointer-events: none !important; margin: 0 !important;">
            <i class="ri-aspect-ratio-line"></i> <span>Full Tile View (A)</span>
          </div>

          <div class="zoom-tap-hint" onclick="openImageLightbox(document.getElementById('modal-active-img')?.src, document.getElementById('modal-active-img')?.alt)">
            <i class="ri-fullscreen-line"></i> <span>Fullscreen</span>
          </div>

          <button type="button" class="modal-gallery-arrow arrow-prev" onclick="switchModalImage('${stone.id}', 'prev')" aria-label="Previous view" title="Switch image view (Click Arrow)" style="position: absolute !important; top: 50% !important; transform: translateY(-50%) !important; left: 0.75rem !important; width: 46px !important; height: 46px !important; border-radius: 50% !important; background: #FFFFFF !important; border: 2px solid #8D4F4E !important; color: #000000 !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; z-index: 15 !important; box-shadow: 0 4px 15px rgba(36, 28, 24, 0.2) !important; margin: 0 !important; padding: 0 !important;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" class="modal-gallery-arrow arrow-next" onclick="switchModalImage('${stone.id}', 'next')" aria-label="Next view" title="Switch image view (Click Arrow)" style="position: absolute !important; top: 50% !important; transform: translateY(-50%) !important; right: 0.75rem !important; width: 46px !important; height: 46px !important; border-radius: 50% !important; background: #FFFFFF !important; border: 2px solid #8D4F4E !important; color: #000000 !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; z-index: 15 !important; box-shadow: 0 4px 15px rgba(36, 28, 24, 0.2) !important; margin: 0 !important; padding: 0 !important;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div class="modal-img-thumbs" style="display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.75rem !important; width: 100% !important; flex-shrink: 0 !important;">
          <button type="button" class="thumb-card active" id="thumb-0" onclick="switchModalImage('${stone.id}', 'full')">
            <img src="${fullImg}" alt="${stone.name} Full Tile">
            <div class="thumb-info">
              <i class="ri-aspect-ratio-line"></i> <span>Full Tile (A)</span>
            </div>
          </button>
          <button type="button" class="thumb-card" id="thumb-1" onclick="switchModalImage('${stone.id}', 'edge')">
            <img src="${edgeImg}" alt="${stone.name} Edge View">
            <div class="thumb-info">
              <i class="ri-stack-line"></i> <span>Edge View (B)</span>
            </div>
          </button>
        </div>
      </div>
    `;
  } else {
    imageBlock = `
      <div class="modal-image-gallery" style="display: flex !important; flex-direction: column !important; gap: 1rem !important; width: 100% !important; align-items: center !important;">
        <div class="modal-img-stage" style="position: relative !important; width: 100% !important; height: 380px !important; max-height: 48vh !important; border-radius: 12px !important; overflow: hidden !important; border: 1.5px solid #DFB77D !important; background: #FAF6F0 !important; display: flex !important; align-items: center !important; justify-content: center !important; flex-shrink: 0 !important; cursor: pointer !important;">
          <img id="modal-active-img" src="${fullImg}" alt="${stone.name}" onclick="openImageLightbox(this.src, this.alt)" style="width: 100% !important; height: 100% !important; max-width: 100% !important; max-height: 100% !important; object-fit: contain !important; display: block !important; cursor: zoom-in !important;" onerror="this.onerror=null; this.src='assets/images/marble_calacatta.png';">
          <div class="modal-view-badge" style="position: absolute !important; top: 0.85rem !important; left: 0.85rem !important; background: rgba(255, 253, 248, 0.96) !important; color: #8D4F4E !important; border: 1.5px solid #8D4F4E !important; padding: 0.35rem 0.85rem !important; border-radius: 20px !important; font-size: 0.82rem !important; font-weight: 700 !important; display: flex !important; align-items: center !important; gap: 0.4rem !important; box-shadow: 0 4px 14px rgba(36, 28, 24, 0.18) !important; z-index: 10 !important; pointer-events: none !important; margin: 0 !important;">
            <i class="ri-image-line"></i> <span>Full View</span>
          </div>
          <div class="zoom-tap-hint" onclick="openImageLightbox(document.getElementById('modal-active-img')?.src, document.getElementById('modal-active-img')?.alt)">
            <i class="ri-fullscreen-line"></i> <span>Fullscreen</span>
          </div>
        </div>
      </div>
    `;
  }

  const nameVisible = isFieldVisible(stone, 'stone-name');
  const finishVisible = isFieldVisible(stone, 'stone-finish');

  modalContent.innerHTML = `
    <div class="modal-clean-layout" style="padding: 1.75rem !important; display: flex !important; flex-direction: column !important; align-items: center !important; width: 100% !important; box-sizing: border-box !important; max-height: 90vh !important; overflow-y: auto !important;">
      <div class="modal-header-simple" style="text-align: center !important; margin-bottom: 1rem !important; width: 100% !important; flex-shrink: 0 !important;">
        ${finishVisible ? `
        <span class="section-tag" style="font-size: 0.78rem; letter-spacing: 1.5px; color: #8D4F4E; font-weight: 700; text-transform: uppercase;">
          <i class="ri-sparkling-line"></i> ${(stone.finish || stone.category || 'NATURAL STONE').toUpperCase()}
        </span>` : ''}
        ${nameVisible ? `<h3 style="font-family: var(--font-heading); font-size: 1.95rem; color: #241C18; margin: 0.35rem 0 0 0; font-weight: 700;">${stone.name}</h3>` : ''}
      </div>
      ${imageBlock}
    </div>
  `;

  if (overlay) {
    overlay.classList.add('active');
  }

  // Initialize zoomed-in popup inspection on image hover
  setTimeout(initModalZoomEvents, 50);
}

let modalZoomPopupEl = null;

function ensureModalZoomPopupDOM() {
  if (!modalZoomPopupEl) {
    modalZoomPopupEl = document.getElementById('modal-zoom-popup');
    if (!modalZoomPopupEl) {
      modalZoomPopupEl = document.createElement('div');
      modalZoomPopupEl.id = 'modal-zoom-popup';
      modalZoomPopupEl.className = 'modal-zoom-popup';
      modalZoomPopupEl.innerHTML = '';
      document.body.appendChild(modalZoomPopupEl);
    }
  }
}

function initModalZoomEvents() {
  ensureModalZoomPopupDOM();
  const stage = document.getElementById('modal-img-stage');
  const activeImg = document.getElementById('modal-active-img');
  if (!stage || !activeImg) return;

  function handleZoomPointer(clientX, clientY, target) {
    // Disable zoom popup completely on mobile screens (width <= 768px)
    if (window.innerWidth <= 768) {
      hideModalZoomPopup();
      return;
    }

    if (target && (target.closest('.modal-gallery-arrow') || target.closest('.modal-view-badge'))) {
      hideModalZoomPopup();
      return;
    }

    const rect = stage.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      hideModalZoomPopup();
      return;
    }

    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    if (modalZoomPopupEl) {
      modalZoomPopupEl.style.backgroundImage = `url("${activeImg.src}")`;
      modalZoomPopupEl.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

      let popupLeft = clientX + 25;
      let popupTop = clientY - 160;
      const popupW = 330;
      const popupH = 330;

      if (popupLeft + popupW > window.innerWidth) {
        popupLeft = clientX - popupW - 15;
      }
      if (popupLeft < 10) popupLeft = 10;

      if (popupTop < 10) popupTop = 10;
      if (popupTop + popupH > window.innerHeight) {
        popupTop = window.innerHeight - popupH - 10;
      }

      modalZoomPopupEl.style.left = `${popupLeft}px`;
      modalZoomPopupEl.style.top = `${popupTop}px`;
      modalZoomPopupEl.classList.add('active');
    }
  }

  // Desktop Mouse Listeners ONLY
  stage.onmousemove = function(e) {
    handleZoomPointer(e.clientX, e.clientY, e.target);
  };

  stage.onmouseleave = function() {
    hideModalZoomPopup();
  };
}

function hideModalZoomPopup() {
  if (modalZoomPopupEl) {
    modalZoomPopupEl.classList.remove('active');
  }
}

function switchModalImage(stoneId, action) {
  hideModalZoomPopup();
  const stone = typeof TutStonesStore !== 'undefined' ? TutStonesStore.getStone(stoneId) : null;
  if (!stone) return;

  const fullImg = safeImgSrc(stone.imageSlab || stone.image);
  const edgeImg = safeImgSrc(stone.imageEdge);
  if (!edgeImg) return;

  const activeImg = document.getElementById('modal-active-img');
  const viewBadge = document.getElementById('modal-view-badge');
  const thumb0 = document.getElementById('thumb-0');
  const thumb1 = document.getElementById('thumb-1');

  if (!activeImg) return;

  if (action === 'prev' || action === -1 || action === 'next' || action === 1) {
    currentModalImgIndex = currentModalImgIndex === 0 ? 1 : 0;
  } else if (action === 0 || action === 'full') {
    currentModalImgIndex = 0;
  } else if (action === 'edge') {
    currentModalImgIndex = 1;
  }

  const targetSrc = currentModalImgIndex === 0 ? fullImg : edgeImg;

  // Immediately assign image src and badge text synchronously for zero latency
  activeImg.src = targetSrc;

  if (currentModalImgIndex === 0) {
    activeImg.alt = `${stone.name} Full Tile View (A)`;
    if (viewBadge) {
      viewBadge.innerHTML = `<i class="ri-aspect-ratio-line"></i> <span>Full Tile View (A)</span>`;
    }
    thumb0?.classList.add('active');
    thumb1?.classList.remove('active');
  } else {
    activeImg.alt = `${stone.name} Edge View (B)`;
    if (viewBadge) {
      viewBadge.innerHTML = `<i class="ri-stack-line"></i> <span>Edge View (B)</span>`;
    }
    thumb0?.classList.remove('active');
    thumb1?.classList.add('active');
  }
}

function closeModal() {
  hideModalZoomPopup();
  const overlay = document.getElementById('spec-modal');
  overlay?.classList.remove('active');
}

/* ==========================================================================
   Clean Fullscreen Image Lightbox (Zero-Flash Native Zoom)
   ========================================================================== */
function openImageLightbox(src, alt) {
  if (!src) return;
  hideModalZoomPopup();

  let lightbox = document.getElementById('image-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.onclick = function(e) {
      if (e.target === lightbox || e.target.closest('.lightbox-close') || e.target.classList.contains('lightbox-content')) {
        closeImageLightbox();
      }
    };
    lightbox.innerHTML = `
      <button type="button" class="lightbox-close" onclick="closeImageLightbox()" aria-label="Close fullscreen view">
        <i class="ri-close-line"></i>
      </button>
      <div class="lightbox-content">
        <img id="lightbox-img" src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const imgEl = document.getElementById('lightbox-img');
  if (imgEl) {
    imgEl.src = src;
    imgEl.alt = alt || 'Fullscreen Stone Image View';
  }
  lightbox.classList.add('active');
}

function closeImageLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
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

/* Outside Hover Preview Disabled */
window.showStonePreview = function() {};
window.swapStonePreviewView = function() {};
window.hideStonePreview = function() {};
function initStoneImagePopup() {}

