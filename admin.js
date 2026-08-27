/**
 * TUT STONES - Admin Dashboard Interactivity & Controller Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuthSession();
  initRoleState();
  initTabNavigation();
  refreshAllAdminViews();
});

/* ==========================================================================
   1. ROLE SWITCHER & PERMISSION ENFORCEMENT
   ========================================================================== */
function initRoleState() {
  const currentRole = TutStonesStore.getRole();
  applyRoleUI(currentRole);
}

function switchActiveRole(role) {
  TutStonesStore.setRole(role);
  applyRoleUI(role);
  showToast(`Switched active role to: ${role === 'admin' ? 'Developer / Super Admin' : 'Content Editor'}`);
}

function applyRoleUI(role) {
  const body = document.body;
  const btnEditor = document.getElementById('role-btn-editor');
  const btnAdmin = document.getElementById('role-btn-admin');
  const bannerTitle = document.getElementById('banner-role-title');
  const bannerDesc = document.getElementById('banner-role-desc');

  if (role === 'admin') {
    body.classList.remove('mode-editor');
    body.classList.add('mode-admin');
    btnEditor?.classList.remove('active');
    btnAdmin?.classList.add('active');

    if (bannerTitle) bannerTitle.innerText = "Developer / Super Admin Access Enabled";
    if (bannerDesc) bannerDesc.innerText = "Full access enabled. Developer tools, raw JSON viewer, and database resets are available.";
  } else {
    body.classList.remove('mode-admin');
    body.classList.add('mode-editor');
    btnEditor?.classList.add('active');
    btnAdmin?.classList.remove('active');

    if (bannerTitle) bannerTitle.innerText = "Currently in Content Editor Mode";
    if (bannerDesc) bannerDesc.innerText = "Technical developer options are hidden so content managers can focus cleanly on editing images, categories, and copy.";

    // If currently on a developer tab, switch back to overview
    const activeTab = document.querySelector('.admin-nav-item.active');
    if (activeTab && activeTab.classList.contains('developer-only')) {
      switchTab('tab-overview');
    }
  }
}

/* ==========================================================================
   2. TAB NAVIGATION CONTROLLER
   ========================================================================== */
function initTabNavigation() {
  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.dataset.tab;
      if (targetTab) switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  const navItems = document.querySelectorAll('.admin-nav-item');
  const tabPanes = document.querySelectorAll('.admin-tab-pane');

  navItems.forEach(item => {
    if (item.dataset.tab === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  tabPanes.forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  if (tabId === 'tab-dev') {
    renderRawJSON();
  }
}

/* ==========================================================================
   3. REFRESH ALL VIEWS FROM STORE
   ========================================================================== */
function refreshAllAdminViews() {
  renderOverviewMetrics();
  renderCategoriesTable();
  renderStoneCards();
  renderSliderCards();
  renderParagraphImages();
  renderHomePageForm();
  renderAboutPageForm();
  renderFactoryPageForm();
  renderPackagingPageForm();
  renderContactPageForm();
  renderFooterForm();
  renderSocialTable();
  renderUsersTable();
  populateCategoryDropdowns();
}

/* ==========================================================================
   4. TAB 1: OVERVIEW METRICS
   ========================================================================== */
function renderOverviewMetrics() {
  const stones = TutStonesStore.getStones();
  const categories = TutStonesStore.getCategories();
  const slider = TutStonesStore.getHeroSlides();
  const social = TutStonesStore.getSocialLinks();

  document.getElementById('metric-stone-count').innerText = stones.length;
  document.getElementById('metric-category-count').innerText = categories.length;
  document.getElementById('metric-slider-count').innerText = slider.length;
  document.getElementById('metric-social-count').innerText = social.length;
}

/* ==========================================================================
   5. TAB 2: CATEGORIES MANAGEMENT
   ========================================================================== */
function renderCategoriesTable() {
  const categories = TutStonesStore.getCategories();
  const tableBody = document.getElementById('categories-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = categories.map(cat => `
    <tr>
      <td><i class="${cat.icon || 'ri-folder-line'}" style="font-size: 1.2rem; color: var(--color-gold-primary);"></i></td>
      <td><strong>${cat.name}</strong></td>
      <td><code>${cat.slug || cat.id}</code></td>
      <td>${cat.desc || 'No description'}</td>
      <td style="text-align: right;">
        <button class="btn btn-outline btn-sm" onclick="openCategoryModal('${cat.id}')"><i class="ri-edit-line"></i> Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteCategoryConfirm('${cat.id}')"><i class="ri-delete-bin-line"></i></button>
      </td>
    </tr>
  `).join('');
}

/* ==========================================================================
   6. TAB 3: STONE & IMAGE CATALOGUE
   ========================================================================== */
function renderStoneCards() {
  const stones = TutStonesStore.getStones();
  const categories = TutStonesStore.getCategories();
  const cardsGrid = document.getElementById('stone-cards-grid');
  const searchInput = document.getElementById('stone-search-input');
  const catFilter = document.getElementById('stone-cat-filter');

  if (!cardsGrid) return;

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catFilter ? catFilter.value : 'all';

  let filtered = stones;
  if (selectedCat !== 'all') {
    filtered = filtered.filter(s => s.category === selectedCat);
  }

  if (query) {
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(query) || 
      (s.origin && s.origin.toLowerCase().includes(query)) ||
      (s.tag && s.tag.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    cardsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--color-text-muted);">
        <p>No stones match the selected criteria.</p>
      </div>
    `;
    return;
  }

  cardsGrid.innerHTML = filtered.map(stone => {
    const catObj = categories.find(c => c.id === stone.category || c.slug === stone.category);
    const catName = catObj ? catObj.name : stone.category.toUpperCase();

    return `
      <div class="stone-admin-card">
        <img src="${stone.image}" alt="${stone.name}" class="stone-admin-img" onerror="this.src='assets/images/marble_calacatta.png'">
        <div class="stone-admin-body">
          <div class="stone-admin-header">
            <h3 class="stone-admin-title">${stone.name}</h3>
            <span class="badge-tag">${stone.tag || catName}</span>
          </div>
          <p class="stone-admin-desc">${stone.desc || 'No description provided.'}</p>
          
          <table class="card-spec-table" style="margin: 0.5rem 0;">
            <tr>
              <td>Origin</td>
              <td>${stone.origin || 'N/A'}</td>
            </tr>
            <tr>
              <td>Finishes</td>
              <td>${stone.finish || 'Polished'}</td>
            </tr>
            <tr>
              <td>Density</td>
              <td>${stone.density || '2.70 g/cm³'}</td>
            </tr>
            <tr>
              <td>Water Abs.</td>
              <td>${stone.waterAbs || '0.15%'}</td>
            </tr>
            <tr>
              <td>Flexural Str.</td>
              <td>${stone.flexural || '14.8 MPa'}</td>
            </tr>
            <tr>
              <td>Uses</td>
              <td>${stone.applications || 'Flooring, Countertops'}</td>
            </tr>
          </table>

          <div class="stone-admin-footer">
            <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase;">${catName}</span>
            <div>
              <button class="btn btn-outline btn-sm" onclick="openStoneModal('${stone.id}')"><i class="ri-edit-line"></i> Edit Specs & Image</button>
              <button class="btn btn-danger btn-sm" onclick="deleteStoneConfirm('${stone.id}')"><i class="ri-delete-bin-line"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterStoneCards() {
  renderStoneCards();
}

/* ==========================================================================
   7. TAB 4: HERO SLIDER EDITOR
   ========================================================================== */
function renderSliderCards() {
  const slides = TutStonesStore.getHeroSlides();
  const sliderGrid = document.getElementById('slider-cards-grid');
  if (!sliderGrid) return;

  sliderGrid.innerHTML = slides.map((slide, idx) => `
    <div class="stone-admin-card">
      <img src="${slide.image}" alt="${slide.title}" class="stone-admin-img" onerror="this.src='assets/images/hero_slider_1.png'">
      <div class="stone-admin-body">
        <div class="stone-admin-header">
          <h3 class="stone-admin-title">Slide #${idx + 1}</h3>
          <span class="badge-tag">${slide.badge || 'Slide Badge'}</span>
        </div>
        <h4 style="font-size: 1rem; color: var(--color-gold-light); margin: 0.3rem 0;">${slide.title}</h4>
        <p class="stone-admin-desc">${slide.slogan}</p>
        <div class="stone-admin-footer">
          <span style="font-size: 0.8rem; color: var(--color-text-muted);"><i class="ri-link"></i> ${slide.btnLink || 'N/A'}</span>
          <div>
            <button class="btn btn-outline btn-sm" onclick="openSliderModal('${slide.id}')"><i class="ri-edit-line"></i> Edit Slide</button>
            <button class="btn btn-danger btn-sm" onclick="deleteSliderConfirm('${slide.id}')"><i class="ri-delete-bin-line"></i></button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   8. TAB 5: PARAGRAPH IMAGES EDITOR
   ========================================================================== */
function renderParagraphImages() {
  const images = TutStonesStore.getParagraphImages();
  const grid = document.getElementById('paragraph-images-grid');
  if (!grid) return;

  grid.innerHTML = images.map(img => `
    <div class="stone-admin-card">
      <img src="${img.url}" alt="${img.keyName}" class="stone-admin-img" onerror="this.src='assets/images/about_craft.png'">
      <div class="stone-admin-body">
        <div class="stone-admin-header">
          <h3 class="stone-admin-title">${img.keyName}</h3>
          <span class="badge-tag">${img.section}</span>
        </div>
        <p class="stone-admin-desc">${img.description}</p>
        <div class="stone-admin-footer">
          <code style="font-size: 0.75rem; color: var(--color-gold-primary);">${img.url}</code>
          <button class="btn btn-outline btn-sm" onclick="openParagraphModal('${img.id}')"><i class="ri-image-edit-line"></i> Change Image</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   9. PAGE CONTENT MANAGERS (HOMEPAGE, ABOUT, FACTORY, PACKAGING, CONTACT, FOOTER)
   ========================================================================== */

// --- 9a. Homepage Manager ---
function renderHomePageForm() {
  const hp = TutStonesStore.getHomePage();
  if (document.getElementById('hp-about-tag')) document.getElementById('hp-about-tag').value = hp.aboutTag || '';
  if (document.getElementById('hp-about-title')) document.getElementById('hp-about-title').value = hp.aboutTitle || '';
  if (document.getElementById('hp-about-desc1')) document.getElementById('hp-about-desc1').value = hp.aboutDesc1 || '';
  if (document.getElementById('hp-about-desc2')) document.getElementById('hp-about-desc2').value = hp.aboutDesc2 || '';
  if (document.getElementById('hp-about-desc3')) document.getElementById('hp-about-desc3').value = hp.aboutDesc3 || '';
  if (document.getElementById('hp-about-exp-num')) document.getElementById('hp-about-exp-num').value = hp.aboutExpNumber || '';
  if (document.getElementById('hp-about-exp-text')) document.getElementById('hp-about-exp-text').value = hp.aboutExpText || '';
  
  if (document.getElementById('hp-boxes-tag')) document.getElementById('hp-boxes-tag').value = hp.boxesTag || '';
  if (document.getElementById('hp-boxes-title')) document.getElementById('hp-boxes-title').value = hp.boxesTitle || '';

  renderHpAboutSliderImages();
  renderHpBoxes();
}

function renderHpAboutSliderImages() {
  const hp = TutStonesStore.getHomePage();
  const container = document.getElementById('hp-about-slider-images-container');
  if (!container) return;

  const images = hp.aboutSliderImages || [];
  container.innerHTML = images.map((img, idx) => `
    <div style="display: flex; gap: 1rem; align-items: center; background: var(--color-bg-surface); padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
      <img id="hp-about-img-prev-${idx}" src="${img.url}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px;" onerror="this.src='assets/images/about_craft.png'">
      <div style="flex: 1; display: flex; gap: 0.5rem; align-items: center;">
        <input type="text" id="hp-about-img-url-${idx}" class="form-control" value="${img.url}" placeholder="Image URL..." oninput="document.getElementById('hp-about-img-prev-${idx}').src=this.value">
        <label class="upload-btn-label" style="margin: 0; white-space: nowrap;">
          <i class="ri-upload-cloud-line"></i> Upload
          <input type="file" accept="image/*" onchange="handleImageFileUpload(event, 'hp-about-img-url-${idx}', 'hp-about-img-prev-${idx}')" hidden>
        </label>
      </div>
      <button type="button" class="btn btn-danger btn-sm" onclick="removeHpAboutSliderImage(${idx})"><i class="ri-delete-bin-line"></i></button>
    </div>
  `).join('');
}

function addHpAboutSliderImage() {
  const hp = TutStonesStore.getHomePage();
  if (!hp.aboutSliderImages) hp.aboutSliderImages = [];
  hp.aboutSliderImages.push({ id: 'h-about-' + Date.now(), url: 'assets/images/Factory/1.jpg' });
  TutStonesStore.saveHomePage(hp);
  renderHpAboutSliderImages();
}

function removeHpAboutSliderImage(idx) {
  const hp = TutStonesStore.getHomePage();
  if (hp.aboutSliderImages && hp.aboutSliderImages[idx]) {
    hp.aboutSliderImages.splice(idx, 1);
    TutStonesStore.saveHomePage(hp);
    renderHpAboutSliderImages();
  }
}

function renderHpBoxes() {
  const hp = TutStonesStore.getHomePage();
  const container = document.getElementById('hp-boxes-container');
  if (!container) return;

  const boxes = hp.boxes || [];
  container.innerHTML = boxes.map((box, idx) => `
    <div style="background: var(--color-bg-surface); padding: 1.25rem; border: 1px solid var(--color-border-gold); border-radius: var(--radius-md);">
      <h4 style="color: var(--color-gold-primary); font-size: 1rem; margin-bottom: 0.75rem;">Box #${idx + 1}</h4>
      <div class="form-group">
        <label>Box Title</label>
        <input type="text" id="hp-box-title-${idx}" class="form-control" value="${box.title}">
      </div>
      <div class="form-group">
        <label>Box Description</label>
        <textarea id="hp-box-desc-${idx}" class="form-control" rows="3">${box.desc}</textarea>
      </div>
      <div class="form-group">
        <label>Card Image (Optional)</label>
        <div class="image-upload-wrapper">
          <img id="hp-box-img-preview-${idx}" src="${box.image || ''}" class="image-preview-thumb" style="${box.image ? 'display: block;' : 'display: none;'}" onerror="this.style.display='none'">
          <div class="upload-actions">
            <label class="upload-btn-label">
              <i class="ri-upload-cloud-line"></i> Upload File
              <input type="file" accept="image/*" onchange="handleImageFileUpload(event, 'hp-box-img-url-${idx}', 'hp-box-img-preview-${idx}')" hidden>
            </label>
            <input type="text" id="hp-box-img-url-${idx}" class="form-control" value="${box.image || ''}" placeholder="Image URL (Optional)..." oninput="updateImagePreview('hp-box-img-preview-${idx}', this.value)">
          </div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
        <div class="form-group">
          <label>Button Text</label>
          <input type="text" id="hp-box-btntext-${idx}" class="form-control" value="${box.btnText || 'Explore'}">
        </div>
        <div class="form-group">
          <label>Button Link</label>
          <input type="text" id="hp-box-btnlink-${idx}" class="form-control" value="${box.btnLink || 'factory.html'}">
        </div>
      </div>
    </div>
  `).join('');
}

function saveHomePageForm() {
  const hp = TutStonesStore.getHomePage();
  
  const aboutSliderImages = [];
  (hp.aboutSliderImages || []).forEach((img, idx) => {
    const urlElem = document.getElementById(`hp-about-img-url-${idx}`);
    if (urlElem) aboutSliderImages.push({ id: img.id || `h-about-${idx}`, url: urlElem.value });
  });

  const boxes = (hp.boxes || []).map((box, idx) => ({
    ...box,
    title: document.getElementById(`hp-box-title-${idx}`)?.value || box.title,
    desc: document.getElementById(`hp-box-desc-${idx}`)?.value || box.desc,
    image: document.getElementById(`hp-box-img-url-${idx}`)?.value || box.image,
    btnText: document.getElementById(`hp-box-btntext-${idx}`)?.value || box.btnText,
    btnLink: document.getElementById(`hp-box-btnlink-${idx}`)?.value || box.btnLink
  }));

  const updatedHp = {
    ...hp,
    aboutTag: document.getElementById('hp-about-tag')?.value || hp.aboutTag,
    aboutTitle: document.getElementById('hp-about-title')?.value || hp.aboutTitle,
    aboutDesc1: document.getElementById('hp-about-desc1')?.value || hp.aboutDesc1,
    aboutDesc2: document.getElementById('hp-about-desc2')?.value || hp.aboutDesc2,
    aboutDesc3: document.getElementById('hp-about-desc3')?.value || hp.aboutDesc3,
    aboutExpNumber: document.getElementById('hp-about-exp-num')?.value || hp.aboutExpNumber,
    aboutExpText: document.getElementById('hp-about-exp-text')?.value || hp.aboutExpText,
    aboutSliderImages: aboutSliderImages.length > 0 ? aboutSliderImages : hp.aboutSliderImages,
    boxesTag: document.getElementById('hp-boxes-tag')?.value || hp.boxesTag,
    boxesTitle: document.getElementById('hp-boxes-title')?.value || hp.boxesTitle,
    boxes: boxes
  };

  const res = TutStonesStore.saveHomePage(updatedHp);
  if (res !== false) {
    showToast('Homepage settings saved successfully!');
  }
}

// --- 9b. About Us Page Manager ---
function renderAboutPageForm() {
  const ab = TutStonesStore.getAboutPage();
  if (document.getElementById('abp-banner-tag')) document.getElementById('abp-banner-tag').value = ab.bannerTag || '';
  if (document.getElementById('abp-banner-title')) document.getElementById('abp-banner-title').value = ab.bannerTitle || '';
  if (document.getElementById('abp-banner-desc')) document.getElementById('abp-banner-desc').value = ab.bannerDesc || '';

  if (document.getElementById('abp-main-tag')) document.getElementById('abp-main-tag').value = ab.mainTag || '';
  if (document.getElementById('abp-main-title')) document.getElementById('abp-main-title').value = ab.mainTitle || '';
  if (document.getElementById('abp-main-img-url')) document.getElementById('abp-main-img-url').value = ab.mainImage || '';
  if (document.getElementById('abp-main-img-preview')) document.getElementById('abp-main-img-preview').src = ab.mainImage || '';
  if (document.getElementById('abp-desc1')) document.getElementById('abp-desc1').value = ab.desc1 || '';
  if (document.getElementById('abp-desc2')) document.getElementById('abp-desc2').value = ab.desc2 || '';
  if (document.getElementById('abp-desc3')) document.getElementById('abp-desc3').value = ab.desc3 || '';
  if (document.getElementById('abp-exp-num')) document.getElementById('abp-exp-num').value = ab.expNumber || '';
  if (document.getElementById('abp-exp-text')) document.getElementById('abp-exp-text').value = ab.expText || '';

  if (document.getElementById('abp-bottom-tag')) document.getElementById('abp-bottom-tag').value = ab.bottomTag || '';
  if (document.getElementById('abp-bottom-title')) document.getElementById('abp-bottom-title').value = ab.bottomTitle || '';

  renderAbpCards();
}

function renderAbpCards() {
  const ab = TutStonesStore.getAboutPage();
  const container = document.getElementById('abp-cards-container');
  if (!container) return;

  const cards = ab.bottomCards || [];
  container.innerHTML = cards.map((card, idx) => `
    <div style="background: var(--color-bg-surface); padding: 1.25rem; border: 1px solid var(--color-border-gold); border-radius: var(--radius-md);">
      <h4 style="color: var(--color-gold-primary); font-size: 1rem; margin-bottom: 0.75rem;">Paragraph Card #${idx + 1}</h4>
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="abp-card-title-${idx}" class="form-control" value="${card.title}">
      </div>
      <div class="form-group">
        <label>Text Description</label>
        <textarea id="abp-card-desc-${idx}" class="form-control" rows="3">${card.desc}</textarea>
      </div>
      <div class="form-group">
        <label>Card Image (Optional)</label>
        <div class="image-upload-wrapper">
          <img id="abp-card-img-preview-${idx}" src="${card.image || ''}" class="image-preview-thumb" style="${card.image ? 'display: block;' : 'display: none;'}" onerror="this.style.display='none'">
          <div class="upload-actions">
            <label class="upload-btn-label">
              <i class="ri-upload-cloud-line"></i> Upload File
              <input type="file" accept="image/*" onchange="handleImageFileUpload(event, 'abp-card-img-url-${idx}', 'abp-card-img-preview-${idx}')" hidden>
            </label>
            <input type="text" id="abp-card-img-url-${idx}" class="form-control" value="${card.image || ''}" placeholder="Image URL (Optional)..." oninput="updateImagePreview('abp-card-img-preview-${idx}', this.value)">
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function saveAboutPageForm() {
  const ab = TutStonesStore.getAboutPage();

  const cards = (ab.bottomCards || []).map((card, idx) => ({
    ...card,
    title: document.getElementById(`abp-card-title-${idx}`)?.value || card.title,
    desc: document.getElementById(`abp-card-desc-${idx}`)?.value || card.desc,
    image: document.getElementById(`abp-card-img-url-${idx}`)?.value || card.image
  }));

  const updatedAb = {
    ...ab,
    bannerTag: document.getElementById('abp-banner-tag')?.value || ab.bannerTag,
    bannerTitle: document.getElementById('abp-banner-title')?.value || ab.bannerTitle,
    bannerDesc: document.getElementById('abp-banner-desc')?.value || ab.bannerDesc,
    mainTag: document.getElementById('abp-main-tag')?.value || ab.mainTag,
    mainTitle: document.getElementById('abp-main-title')?.value || ab.mainTitle,
    mainImage: document.getElementById('abp-main-img-url')?.value || ab.mainImage,
    desc1: document.getElementById('abp-desc1')?.value || ab.desc1,
    desc2: document.getElementById('abp-desc2')?.value || ab.desc2,
    desc3: document.getElementById('abp-desc3')?.value || ab.desc3,
    expNumber: document.getElementById('abp-exp-num')?.value || ab.expNumber,
    expText: document.getElementById('abp-exp-text')?.value || ab.expText,
    bottomTag: document.getElementById('abp-bottom-tag')?.value || ab.bottomTag,
    bottomTitle: document.getElementById('abp-bottom-title')?.value || ab.bottomTitle,
    bottomCards: cards
  };

  const res = TutStonesStore.saveAboutPage(updatedAb);
  if (res !== false) {
    showToast('About Us Page settings saved successfully!');
  }
}

// --- 9c. Factory Page Manager ---
function renderFactoryPageForm() {
  const fac = TutStonesStore.getFactoryPage();
  if (document.getElementById('fac-banner-tag')) document.getElementById('fac-banner-tag').value = fac.bannerTag || '';
  if (document.getElementById('fac-banner-title')) document.getElementById('fac-banner-title').value = fac.bannerTitle || '';
  if (document.getElementById('fac-banner-desc')) document.getElementById('fac-banner-desc').value = fac.bannerDesc || '';

  if (document.getElementById('fac-main-tag')) document.getElementById('fac-main-tag').value = fac.mainTag || '';
  if (document.getElementById('fac-main-title')) document.getElementById('fac-main-title').value = fac.mainTitle || '';
  if (document.getElementById('fac-main-img-url')) document.getElementById('fac-main-img-url').value = fac.mainImage || '';
  if (document.getElementById('fac-main-img-preview')) document.getElementById('fac-main-img-preview').src = fac.mainImage || '';
  if (document.getElementById('fac-desc1')) document.getElementById('fac-desc1').value = fac.desc1 || '';
  if (document.getElementById('fac-desc2')) document.getElementById('fac-desc2').value = fac.desc2 || '';
  if (document.getElementById('fac-exp-num')) document.getElementById('fac-exp-num').value = fac.expNumber || '';
  if (document.getElementById('fac-exp-text')) document.getElementById('fac-exp-text').value = fac.expText || '';

  if (document.getElementById('fac-workflow-tag')) document.getElementById('fac-workflow-tag').value = fac.workflowTag || '';
  if (document.getElementById('fac-workflow-title')) document.getElementById('fac-workflow-title').value = fac.workflowTitle || '';

  renderFacCards();
}

function renderFacCards() {
  const fac = TutStonesStore.getFactoryPage();
  const container = document.getElementById('fac-cards-container');
  if (!container) return;

  const cards = fac.cards || [];
  container.innerHTML = cards.map((card, idx) => `
    <div style="background: var(--color-bg-surface); padding: 1.25rem; border: 1px solid var(--color-border-gold); border-radius: var(--radius-md);">
      <h4 style="color: var(--color-gold-primary); font-size: 1rem; margin-bottom: 0.75rem;">Process Step #${card.step || (idx + 1)}</h4>
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="fac-card-title-${idx}" class="form-control" value="${card.title}">
      </div>
      <div class="form-group">
        <label>Text Description</label>
        <textarea id="fac-card-desc-${idx}" class="form-control" rows="3">${card.desc}</textarea>
      </div>
      <div class="form-group">
        <label>Card Image (Optional)</label>
        <div class="image-upload-wrapper">
          <img id="fac-card-img-preview-${idx}" src="${card.image || ''}" class="image-preview-thumb" style="${card.image ? 'display: block;' : 'display: none;'}" onerror="this.style.display='none'">
          <div class="upload-actions">
            <label class="upload-btn-label">
              <i class="ri-upload-cloud-line"></i> Upload File
              <input type="file" accept="image/*" onchange="handleImageFileUpload(event, 'fac-card-img-url-${idx}', 'fac-card-img-preview-${idx}')" hidden>
            </label>
            <input type="text" id="fac-card-img-url-${idx}" class="form-control" value="${card.image || ''}" placeholder="Image URL (Optional)..." oninput="updateImagePreview('fac-card-img-preview-${idx}', this.value)">
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function saveFactoryPageForm() {
  const fac = TutStonesStore.getFactoryPage();

  const cards = (fac.cards || []).map((card, idx) => ({
    ...card,
    title: document.getElementById(`fac-card-title-${idx}`)?.value || card.title,
    desc: document.getElementById(`fac-card-desc-${idx}`)?.value || card.desc,
    image: document.getElementById(`fac-card-img-url-${idx}`)?.value || card.image
  }));

  const updatedFac = {
    ...fac,
    bannerTag: document.getElementById('fac-banner-tag')?.value || fac.bannerTag,
    bannerTitle: document.getElementById('fac-banner-title')?.value || fac.bannerTitle,
    bannerDesc: document.getElementById('fac-banner-desc')?.value || fac.bannerDesc,
    mainTag: document.getElementById('fac-main-tag')?.value || fac.mainTag,
    mainTitle: document.getElementById('fac-main-title')?.value || fac.mainTitle,
    mainImage: document.getElementById('fac-main-img-url')?.value || fac.mainImage,
    desc1: document.getElementById('fac-desc1')?.value || fac.desc1,
    desc2: document.getElementById('fac-desc2')?.value || fac.desc2,
    expNumber: document.getElementById('fac-exp-num')?.value || fac.expNumber,
    expText: document.getElementById('fac-exp-text')?.value || fac.expText,
    workflowTag: document.getElementById('fac-workflow-tag')?.value || fac.workflowTag,
    workflowTitle: document.getElementById('fac-workflow-title')?.value || fac.workflowTitle,
    cards: cards
  };

  const res = TutStonesStore.saveFactoryPage(updatedFac);
  if (res !== false) {
    showToast('Factory Page settings saved successfully!');
  }
}

// --- 9d. Packaging Page Manager ---
function renderPackagingPageForm() {
  const pkg = TutStonesStore.getPackagingPage();
  if (document.getElementById('pkg-banner-tag')) document.getElementById('pkg-banner-tag').value = pkg.bannerTag || '';
  if (document.getElementById('pkg-banner-title')) document.getElementById('pkg-banner-title').value = pkg.bannerTitle || '';
  if (document.getElementById('pkg-banner-desc')) document.getElementById('pkg-banner-desc').value = pkg.bannerDesc || '';

  if (document.getElementById('pkg-main-tag')) document.getElementById('pkg-main-tag').value = pkg.mainTag || '';
  if (document.getElementById('pkg-main-title')) document.getElementById('pkg-main-title').value = pkg.mainTitle || '';
  if (document.getElementById('pkg-main-img-url')) document.getElementById('pkg-main-img-url').value = pkg.mainImage || '';
  if (document.getElementById('pkg-main-img-preview')) document.getElementById('pkg-main-img-preview').src = pkg.mainImage || '';
  if (document.getElementById('pkg-desc1')) document.getElementById('pkg-desc1').value = pkg.desc1 || '';
  if (document.getElementById('pkg-desc2')) document.getElementById('pkg-desc2').value = pkg.desc2 || '';
  if (document.getElementById('pkg-exp-num')) document.getElementById('pkg-exp-num').value = pkg.expNumber || '';
  if (document.getElementById('pkg-exp-text')) document.getElementById('pkg-exp-text').value = pkg.expText || '';

  if (document.getElementById('pkg-specs-tag')) document.getElementById('pkg-specs-tag').value = pkg.specsTag || '';
  if (document.getElementById('pkg-specs-title')) document.getElementById('pkg-specs-title').value = pkg.specsTitle || '';

  renderPkgCards();
}

function renderPkgCards() {
  const pkg = TutStonesStore.getPackagingPage();
  const container = document.getElementById('pkg-cards-container');
  if (!container) return;

  const cards = pkg.cards || [];
  container.innerHTML = cards.map((card, idx) => `
    <div style="background: var(--color-bg-surface); padding: 1.25rem; border: 1px solid var(--color-border-gold); border-radius: var(--radius-md);">
      <h4 style="color: var(--color-gold-primary); font-size: 1rem; margin-bottom: 0.75rem;">Spec Card #${idx + 1}</h4>
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="pkg-card-title-${idx}" class="form-control" value="${card.title}">
      </div>
      <div class="form-group">
        <label>Text Description</label>
        <textarea id="pkg-card-desc-${idx}" class="form-control" rows="3">${card.desc}</textarea>
      </div>
      <div class="form-group">
        <label>Card Image (Optional)</label>
        <div class="image-upload-wrapper">
          <img id="pkg-card-img-preview-${idx}" src="${card.image || ''}" class="image-preview-thumb" style="${card.image ? 'display: block;' : 'display: none;'}" onerror="this.style.display='none'">
          <div class="upload-actions">
            <label class="upload-btn-label">
              <i class="ri-upload-cloud-line"></i> Upload File
              <input type="file" accept="image/*" onchange="handleImageFileUpload(event, 'pkg-card-img-url-${idx}', 'pkg-card-img-preview-${idx}')" hidden>
            </label>
            <input type="text" id="pkg-card-img-url-${idx}" class="form-control" value="${card.image || ''}" placeholder="Image URL (Optional)..." oninput="updateImagePreview('pkg-card-img-preview-${idx}', this.value)">
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function savePackagingPageForm() {
  const pkg = TutStonesStore.getPackagingPage();

  const cards = (pkg.cards || []).map((card, idx) => ({
    ...card,
    title: document.getElementById(`pkg-card-title-${idx}`)?.value || card.title,
    desc: document.getElementById(`pkg-card-desc-${idx}`)?.value || card.desc,
    image: document.getElementById(`pkg-card-img-url-${idx}`)?.value || card.image
  }));

  const updatedPkg = {
    ...pkg,
    bannerTag: document.getElementById('pkg-banner-tag')?.value || pkg.bannerTag,
    bannerTitle: document.getElementById('pkg-banner-title')?.value || pkg.bannerTitle,
    bannerDesc: document.getElementById('pkg-banner-desc')?.value || pkg.bannerDesc,
    mainTag: document.getElementById('pkg-main-tag')?.value || pkg.mainTag,
    mainTitle: document.getElementById('pkg-main-title')?.value || pkg.mainTitle,
    mainImage: document.getElementById('pkg-main-img-url')?.value || pkg.mainImage,
    desc1: document.getElementById('pkg-desc1')?.value || pkg.desc1,
    desc2: document.getElementById('pkg-desc2')?.value || pkg.desc2,
    expNumber: document.getElementById('pkg-exp-num')?.value || pkg.expNumber,
    expText: document.getElementById('pkg-exp-text')?.value || pkg.expText,
    specsTag: document.getElementById('pkg-specs-tag')?.value || pkg.specsTag,
    specsTitle: document.getElementById('pkg-specs-title')?.value || pkg.specsTitle,
    cards: cards
  };

  const res = TutStonesStore.savePackagingPage(updatedPkg);
  if (res !== false) {
    showToast('Packaging Page settings saved successfully!');
  }
}

// --- 9e. Contact Page Manager ---
function renderContactPageForm() {
  const cnt = TutStonesStore.getContactPage();
  if (document.getElementById('cnt-banner-tag')) document.getElementById('cnt-banner-tag').value = cnt.bannerTag || '';
  if (document.getElementById('cnt-banner-title')) document.getElementById('cnt-banner-title').value = cnt.bannerTitle || '';
  if (document.getElementById('cnt-banner-desc')) document.getElementById('cnt-banner-desc').value = cnt.bannerDesc || '';

  if (document.getElementById('cnt-main-tag')) document.getElementById('cnt-main-tag').value = cnt.mainTag || '';
  if (document.getElementById('cnt-main-title')) document.getElementById('cnt-main-title').value = cnt.mainTitle || '';
  if (document.getElementById('cnt-main-desc')) document.getElementById('cnt-main-desc').value = cnt.mainDesc || '';
  if (document.getElementById('cnt-form-title')) document.getElementById('cnt-form-title').value = cnt.formTitle || '';
  if (document.getElementById('cnt-form-desc')) document.getElementById('cnt-form-desc').value = cnt.formDesc || '';

  if (document.getElementById('cnt-address-title')) document.getElementById('cnt-address-title').value = cnt.addressTitle || '';
  if (document.getElementById('cnt-address-text')) document.getElementById('cnt-address-text').value = cnt.addressText || '';
  if (document.getElementById('cnt-address-map-link')) document.getElementById('cnt-address-map-link').value = cnt.addressMapLink || '';

  if (document.getElementById('cnt-email-title')) document.getElementById('cnt-email-title').value = cnt.emailTitle || '';
  if (document.getElementById('cnt-email-primary')) document.getElementById('cnt-email-primary').value = cnt.emailPrimary || '';
  if (document.getElementById('cnt-email-secondary')) document.getElementById('cnt-email-secondary').value = cnt.emailSecondary || '';

  if (document.getElementById('cnt-phone-title')) document.getElementById('cnt-phone-title').value = cnt.phoneTitle || '';
  if (document.getElementById('cnt-phone-primary')) document.getElementById('cnt-phone-primary').value = cnt.phonePrimary || '';
  if (document.getElementById('cnt-whatsapp-num')) document.getElementById('cnt-whatsapp-num').value = cnt.whatsappNumber || '';
}

function saveContactPageForm() {
  const cnt = TutStonesStore.getContactPage();

  const updatedCnt = {
    ...cnt,
    bannerTag: document.getElementById('cnt-banner-tag')?.value || cnt.bannerTag,
    bannerTitle: document.getElementById('cnt-banner-title')?.value || cnt.bannerTitle,
    bannerDesc: document.getElementById('cnt-banner-desc')?.value || cnt.bannerDesc,
    mainTag: document.getElementById('cnt-main-tag')?.value || cnt.mainTag,
    mainTitle: document.getElementById('cnt-main-title')?.value || cnt.mainTitle,
    mainDesc: document.getElementById('cnt-main-desc')?.value || cnt.mainDesc,
    formTitle: document.getElementById('cnt-form-title')?.value || cnt.formTitle,
    formDesc: document.getElementById('cnt-form-desc')?.value || cnt.formDesc,
    addressTitle: document.getElementById('cnt-address-title')?.value || cnt.addressTitle,
    addressText: document.getElementById('cnt-address-text')?.value || cnt.addressText,
    addressMapLink: document.getElementById('cnt-address-map-link')?.value || cnt.addressMapLink,
    emailTitle: document.getElementById('cnt-email-title')?.value || cnt.emailTitle,
    emailPrimary: document.getElementById('cnt-email-primary')?.value || cnt.emailPrimary,
    emailSecondary: document.getElementById('cnt-email-secondary')?.value || cnt.emailSecondary,
    phoneTitle: document.getElementById('cnt-phone-title')?.value || cnt.phoneTitle,
    phonePrimary: document.getElementById('cnt-phone-primary')?.value || cnt.phonePrimary,
    whatsappNumber: document.getElementById('cnt-whatsapp-num')?.value || cnt.whatsappNumber
  };

  const res = TutStonesStore.saveContactPage(updatedCnt);
  if (res !== false) {
    showToast('Contact Page settings saved successfully!');
  }
}

// --- 9f. Footer Manager ---
function renderFooterForm() {
  const ftr = TutStonesStore.getFooterData();
  if (document.getElementById('ftr-brand-desc')) document.getElementById('ftr-brand-desc').value = ftr.brandDesc || '';
  if (document.getElementById('ftr-address')) document.getElementById('ftr-address').value = ftr.address || '';
  if (document.getElementById('ftr-address-link')) document.getElementById('ftr-address-link').value = ftr.addressLink || '';
  if (document.getElementById('ftr-email-primary')) document.getElementById('ftr-email-primary').value = ftr.emailPrimary || '';
  if (document.getElementById('ftr-email-secondary')) document.getElementById('ftr-email-secondary').value = ftr.emailSecondary || '';
  if (document.getElementById('ftr-phone-primary')) document.getElementById('ftr-phone-primary').value = ftr.phonePrimary || '';
  if (document.getElementById('ftr-whatsapp-num')) document.getElementById('ftr-whatsapp-num').value = ftr.whatsappNumber || '';
  if (document.getElementById('ftr-hours')) document.getElementById('ftr-hours').value = ftr.hours || '';
}

function saveFooterForm() {
  const ftr = TutStonesStore.getFooterData();

  const updatedFtr = {
    ...ftr,
    brandDesc: document.getElementById('ftr-brand-desc')?.value || ftr.brandDesc,
    address: document.getElementById('ftr-address')?.value || ftr.address,
    addressLink: document.getElementById('ftr-address-link')?.value || ftr.addressLink,
    emailPrimary: document.getElementById('ftr-email-primary')?.value || ftr.emailPrimary,
    emailSecondary: document.getElementById('ftr-email-secondary')?.value || ftr.emailSecondary,
    phonePrimary: document.getElementById('ftr-phone-primary')?.value || ftr.phonePrimary,
    whatsappNumber: document.getElementById('ftr-whatsapp-num')?.value || ftr.whatsappNumber,
    hours: document.getElementById('ftr-hours')?.value || ftr.hours
  };

  const res = TutStonesStore.saveFooterData(updatedFtr);
  if (res !== false) {
    showToast('Footer settings saved successfully!');
  }
}

/* ==========================================================================
   10. TAB 7: SOCIAL MEDIA LINKS & CONTACT DETAILS EDITOR
   ========================================================================== */
function renderSocialTable() {
  const links = TutStonesStore.getSocialLinks();
  const tableBody = document.getElementById('social-table-body');
  if (tableBody) {
    tableBody.innerHTML = links.map(link => `
      <tr>
        <td><i class="${link.icon}" style="font-size: 1.3rem; color: var(--color-gold-primary);"></i></td>
        <td><strong>${link.platform}</strong></td>
        <td><a href="${link.url}" target="_blank" style="color: var(--color-gold-light); text-decoration: none;">${link.url}</a></td>
        <td>
          <span class="badge-tag" style="${link.active ? 'background: rgba(16, 185, 129, 0.15); color: #10B981; border-color: rgba(16, 185, 129, 0.4);' : 'background: rgba(239, 68, 68, 0.15); color: #EF4444; border-color: rgba(239, 68, 68, 0.4);'}">
            ${link.active ? 'Active' : 'Disabled'}
          </span>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-outline btn-sm" onclick="openSocialModal('${link.id}')"><i class="ri-edit-line"></i> Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteSocialConfirm('${link.id}')"><i class="ri-delete-bin-line"></i></button>
        </td>
      </tr>
    `).join('');
  }

  // Populate Showroom & Office Contact Details form
  const about = TutStonesStore.getAbout();
  if (document.getElementById('social-contact-address')) document.getElementById('social-contact-address').value = about.address || '';
  if (document.getElementById('social-contact-address-visible')) document.getElementById('social-contact-address-visible').checked = about.addressVisible !== false;

  if (document.getElementById('social-contact-email')) document.getElementById('social-contact-email').value = about.email || '';
  if (document.getElementById('social-contact-email-visible')) document.getElementById('social-contact-email-visible').checked = about.emailVisible !== false;

  if (document.getElementById('social-contact-email2')) document.getElementById('social-contact-email2').value = about.emailSecondary || '';
  if (document.getElementById('social-contact-email2-visible')) document.getElementById('social-contact-email2-visible').checked = about.emailSecondaryVisible !== false;

  if (document.getElementById('social-contact-phone')) document.getElementById('social-contact-phone').value = about.phone || '';
  if (document.getElementById('social-contact-phone-visible')) document.getElementById('social-contact-phone-visible').checked = about.phoneVisible !== false;

  if (document.getElementById('social-contact-phone2')) document.getElementById('social-contact-phone2').value = about.phoneSecondary || '';
  if (document.getElementById('social-contact-phone2-visible')) document.getElementById('social-contact-phone2-visible').checked = about.phoneSecondaryVisible !== false;

  if (document.getElementById('social-contact-hours')) document.getElementById('social-contact-hours').value = about.hours || '';
  if (document.getElementById('social-contact-hours-visible')) document.getElementById('social-contact-hours-visible').checked = about.hoursVisible !== false;
}

function saveShowroomContact() {
  const currentAbout = TutStonesStore.getAbout();
  const updatedAbout = {
    ...currentAbout,
    address: document.getElementById('social-contact-address') ? document.getElementById('social-contact-address').value : currentAbout.address,
    addressVisible: document.getElementById('social-contact-address-visible')?.checked ?? true,

    email: document.getElementById('social-contact-email') ? document.getElementById('social-contact-email').value : currentAbout.email,
    emailVisible: document.getElementById('social-contact-email-visible')?.checked ?? true,

    emailSecondary: document.getElementById('social-contact-email2') ? document.getElementById('social-contact-email2').value : currentAbout.emailSecondary,
    emailSecondaryVisible: document.getElementById('social-contact-email2-visible')?.checked ?? true,

    phone: document.getElementById('social-contact-phone') ? document.getElementById('social-contact-phone').value : currentAbout.phone,
    phoneVisible: document.getElementById('social-contact-phone-visible')?.checked ?? true,

    phoneSecondary: document.getElementById('social-contact-phone2') ? document.getElementById('social-contact-phone2').value : currentAbout.phoneSecondary,
    phoneSecondaryVisible: document.getElementById('social-contact-phone2-visible')?.checked ?? true,

    hours: document.getElementById('social-contact-hours') ? document.getElementById('social-contact-hours').value : currentAbout.hours,
    hoursVisible: document.getElementById('social-contact-hours-visible')?.checked ?? true
  };

  TutStonesStore.saveAbout(updatedAbout);
  showToast('Showroom & Office contact information saved successfully!');
  refreshAllAdminViews();
}

/* ==========================================================================
   11. HELPER: POPULATE CATEGORY DROPDOWNS
   ========================================================================== */
function populateCategoryDropdowns() {
  const categories = TutStonesStore.getCategories();
  const stoneSelect = document.getElementById('stone-category');
  const catFilter = document.getElementById('stone-cat-filter');

  if (stoneSelect) {
    stoneSelect.innerHTML = categories.map(c => `
      <option value="${c.id}">${c.name}</option>
    `).join('');
  }

  if (catFilter) {
    catFilter.innerHTML = '<option value="all">All Categories</option>' + categories.map(c => `
      <option value="${c.id}">${c.name}</option>
    `).join('');
  }
}

/* ==========================================================================
   12. IMAGE FILE UPLOADER & PREVIEW HELPER
   ========================================================================== */
function updateImagePreview(previewImgId, value) {
  const imgElem = document.getElementById(previewImgId);
  if (!imgElem) return;
  const val = (value || '').trim();
  if (val) {
    imgElem.src = val;
    imgElem.style.display = 'block';
  } else {
    imgElem.src = '';
    imgElem.style.display = 'none';
  }
}

function handleImageFileUpload(event, targetInputId, previewImgId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const rawDataUrl = e.target.result;
    
    // Auto-compress image using HTML5 Canvas to prevent browser localStorage quota overflow
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1200;
      const MAX_HEIGHT = 1200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to lightweight JPEG Data URL (quality: 0.8)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

      const inputElem = document.getElementById(targetInputId);
      if (inputElem) inputElem.value = compressedDataUrl;
      
      if (previewImgId) {
        const imgElem = document.getElementById(previewImgId);
        if (imgElem) {
          imgElem.src = compressedDataUrl;
          imgElem.style.display = 'block';
        }
      }
      showToast('Image uploaded and optimized successfully!');
    };

    img.onerror = function() {
      // Fallback if image object fails
      const inputElem = document.getElementById(targetInputId);
      if (inputElem) inputElem.value = rawDataUrl;
      if (previewImgId) {
        const imgElem = document.getElementById(previewImgId);
        if (imgElem) {
          imgElem.src = rawDataUrl;
          imgElem.style.display = 'block';
        }
      }
      showToast('Image uploaded successfully!');
    };

    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
}

/* ==========================================================================
   13. MODAL DIALOG CONTROLLERS & FORM SAVERS
   ========================================================================== */
function closeAdminModal(modalId) {
  document.getElementById(modalId)?.classList.remove('active');
}

function openStoneModal(stoneId = null) {
  const modal = document.getElementById('stone-modal');
  const title = document.getElementById('stone-modal-title');
  populateCategoryDropdowns();

  if (stoneId) {
    const stone = TutStonesStore.getStone(stoneId);
    if (!stone) return;
    title.innerText = "Edit Stone Item";
    document.getElementById('stone-id').value = stone.id;
    document.getElementById('stone-name').value = stone.name;
    document.getElementById('stone-category').value = stone.category;
    document.getElementById('stone-image-url').value = stone.image;
    document.getElementById('stone-img-preview').src = stone.image;
    document.getElementById('stone-origin').value = stone.origin || '';
    document.getElementById('stone-tag').value = stone.tag || '';
    document.getElementById('stone-finish').value = stone.finish || '';
    document.getElementById('stone-density').value = stone.density || '';
    document.getElementById('stone-water').value = stone.waterAbs || '';
    document.getElementById('stone-flexural').value = stone.flexural || '';
    document.getElementById('stone-desc').value = stone.desc || '';
    document.getElementById('stone-applications').value = stone.applications || '';
  } else {
    title.innerText = "Add New Stone Item";
    document.getElementById('stone-id').value = '';
    document.getElementById('stone-name').value = '';
    document.getElementById('stone-image-url').value = '';
    document.getElementById('stone-img-preview').src = '';
    document.getElementById('stone-origin').value = '';
    document.getElementById('stone-tag').value = '';
    document.getElementById('stone-finish').value = 'Polished';
    document.getElementById('stone-density').value = '2.70 g/cm³';
    document.getElementById('stone-water').value = '0.15%';
    document.getElementById('stone-flexural').value = '15.0 MPa';
    document.getElementById('stone-desc').value = '';
    document.getElementById('stone-applications').value = '';
  }

  modal.classList.add('active');
}

function saveStoneForm() {
  const stone = {
    id: document.getElementById('stone-id').value,
    name: document.getElementById('stone-name').value,
    category: document.getElementById('stone-category').value,
    image: document.getElementById('stone-image-url').value,
    origin: document.getElementById('stone-origin').value,
    tag: document.getElementById('stone-tag').value,
    finish: document.getElementById('stone-finish').value,
    density: document.getElementById('stone-density').value,
    waterAbs: document.getElementById('stone-water').value,
    flexural: document.getElementById('stone-flexural').value,
    desc: document.getElementById('stone-desc').value,
    applications: document.getElementById('stone-applications').value,
    featured: true
  };

  TutStonesStore.saveStone(stone);
  closeAdminModal('stone-modal');
  showToast(`Stone "${stone.name}" saved successfully!`);
  refreshAllAdminViews();
}

function deleteStoneConfirm(id) {
  if (confirm('Are you sure you want to delete this stone item?')) {
    TutStonesStore.deleteStone(id);
    showToast('Stone item deleted.');
    refreshAllAdminViews();
  }
}

// --- Category Modal ---
function openCategoryModal(catId = null) {
  const modal = document.getElementById('category-modal');
  if (catId) {
    const categories = TutStonesStore.getCategories();
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    document.getElementById('cat-id').value = cat.id;
    document.getElementById('cat-name').value = cat.name;
    document.getElementById('cat-icon').value = cat.icon || 'ri-vip-diamond-line';
    document.getElementById('cat-desc').value = cat.desc || '';
  } else {
    document.getElementById('cat-id').value = '';
    document.getElementById('cat-name').value = '';
    document.getElementById('cat-icon').value = 'ri-vip-diamond-line';
    document.getElementById('cat-desc').value = '';
  }
  modal.classList.add('active');
}

function saveCategoryForm() {
  const id = document.getElementById('cat-id').value;
  const name = document.getElementById('cat-name').value;
  const icon = document.getElementById('cat-icon').value;
  const desc = document.getElementById('cat-desc').value;

  if (id) {
    TutStonesStore.updateCategory(id, { name, icon, desc });
  } else {
    TutStonesStore.addCategory({ name, icon, desc });
  }

  closeAdminModal('category-modal');
  showToast(`Category "${name}" saved!`);
  refreshAllAdminViews();
}

function deleteCategoryConfirm(id) {
  if (confirm('Are you sure you want to delete this category?')) {
    TutStonesStore.deleteCategory(id);
    showToast('Category deleted.');
    refreshAllAdminViews();
  }
}

// --- Hero Slider Modal ---
function openSliderModal(slideId = null) {
  const modal = document.getElementById('slider-modal');
  const slides = TutStonesStore.getHeroSlides();

  if (slideId) {
    const slide = slides.find(s => s.id === slideId);
    if (!slide) return;
    document.getElementById('slider-id').value = slide.id;
    document.getElementById('slider-image-url').value = slide.image;
    document.getElementById('slider-img-preview').src = slide.image;
    document.getElementById('slider-badge').value = slide.badge || '';
    document.getElementById('slider-title').value = slide.title || '';
    document.getElementById('slider-slogan').value = slide.slogan || '';
    document.getElementById('slider-btn-text').value = slide.btnText || '';
    document.getElementById('slider-btn-link').value = slide.btnLink || '';
  } else {
    document.getElementById('slider-id').value = '';
    document.getElementById('slider-image-url').value = 'assets/images/hero_slider_1.png';
    document.getElementById('slider-img-preview').src = 'assets/images/hero_slider_1.png';
    document.getElementById('slider-badge').value = 'Natural Stone Curators';
    document.getElementById('slider-title').value = 'Masterpieces <span>Sculpted by Nature</span>';
    document.getElementById('slider-slogan').value = '';
    document.getElementById('slider-btn-text').value = 'Explore Full Catalogue';
    document.getElementById('slider-btn-link').value = 'catalogue.html';
  }
  modal.classList.add('active');
}

function saveSliderForm() {
  const slide = {
    id: document.getElementById('slider-id').value,
    image: document.getElementById('slider-image-url').value,
    badge: document.getElementById('slider-badge').value,
    title: document.getElementById('slider-title').value,
    slogan: document.getElementById('slider-slogan').value,
    btnText: document.getElementById('slider-btn-text').value,
    btnLink: document.getElementById('slider-btn-link').value
  };

  TutStonesStore.saveHeroSlide(slide);
  closeAdminModal('slider-modal');
  showToast('Hero slide saved!');
  refreshAllAdminViews();
}

function deleteSliderConfirm(id) {
  if (confirm('Are you sure you want to delete this slide?')) {
    TutStonesStore.deleteHeroSlide(id);
    showToast('Hero slide deleted.');
    refreshAllAdminViews();
  }
}

// --- Paragraph Modal ---
function openParagraphModal(imgId) {
  const images = TutStonesStore.getParagraphImages();
  const img = images.find(i => i.id === imgId);
  if (!img) return;

  document.getElementById('para-img-id').value = img.id;
  document.getElementById('para-img-key').value = `${img.keyName} (${img.section})`;
  document.getElementById('para-img-url').value = img.url;
  document.getElementById('para-img-preview').src = img.url;
  document.getElementById('para-img-desc').value = img.description || '';

  document.getElementById('paragraph-modal').classList.add('active');
}

function saveParagraphImageForm() {
  const id = document.getElementById('para-img-id').value;
  const url = document.getElementById('para-img-url').value;
  const desc = document.getElementById('para-img-desc').value;

  const images = TutStonesStore.getParagraphImages();
  const imgObj = images.find(i => i.id === id);
  if (imgObj) {
    imgObj.url = url;
    imgObj.description = desc;
    TutStonesStore.saveParagraphImage(imgObj);

    // If it's the about craft image, update about store too
    if (id === 'img-about-craft') {
      const about = TutStonesStore.getAbout();
      about.craftImage = url;
      TutStonesStore.saveAbout(about);
    }
  }

  closeAdminModal('paragraph-modal');
  showToast('Paragraph image updated!');
  refreshAllAdminViews();
}

// --- Social Modal ---
function openSocialModal(socialId = null) {
  const modal = document.getElementById('social-modal');
  const links = TutStonesStore.getSocialLinks();

  if (socialId) {
    const link = links.find(l => l.id === socialId);
    if (!link) return;
    document.getElementById('social-id').value = link.id;
    document.getElementById('social-platform').value = link.platform;
    document.getElementById('social-icon').value = link.icon;
    document.getElementById('social-url').value = link.url;
    document.getElementById('social-active').checked = link.active;
  } else {
    document.getElementById('social-id').value = '';
    document.getElementById('social-platform').value = '';
    document.getElementById('social-icon').value = 'ri-share-line';
    document.getElementById('social-url').value = 'https://';
    document.getElementById('social-active').checked = true;
  }
  modal.classList.add('active');
}

function saveSocialForm() {
  const link = {
    id: document.getElementById('social-id').value,
    platform: document.getElementById('social-platform').value,
    icon: document.getElementById('social-icon').value,
    url: document.getElementById('social-url').value,
    active: document.getElementById('social-active').checked
  };

  TutStonesStore.saveSocialLink(link);
  closeAdminModal('social-modal');
  showToast(`Social link "${link.platform}" saved!`);
  refreshAllAdminViews();
}

function deleteSocialConfirm(id) {
  if (confirm('Are you sure you want to delete this social link?')) {
    TutStonesStore.deleteSocialLink(id);
    showToast('Social link deleted.');
    refreshAllAdminViews();
  }
}

/* ==========================================================================
   14. DEVELOPER TOOLS: RAW JSON & FACTORY RESET
   ========================================================================== */
function renderRawJSON() {
  const viewer = document.getElementById('raw-json-viewer');
  if (viewer) {
    viewer.value = JSON.stringify(TutStonesStore.data, null, 2);
  }
}

function resetDatabaseWithConfirmation() {
  if (confirm('CAUTION: This will overwrite all custom stones, categories, slides, and about text with initial factory data. Continue?')) {
    TutStonesStore.resetToDefaults();
    showToast('Store reset to factory default state.');
    refreshAllAdminViews();
  }
}

function exportStoreJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(TutStonesStore.data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "tut_stones_data_backup.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('JSON backup downloaded!');
}

/* ==========================================================================
   15. TOAST NOTIFICATION GENERATOR
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: var(--color-gold-primary);"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   16. AUTHENTICATION & SECURITY CONTROLLER
   ========================================================================== */
let failedLoginAttempts = parseInt(localStorage.getItem('tut_stones_failed_attempts') || '0', 10);
let lockoutUntil = parseInt(localStorage.getItem('tut_stones_lockout_until') || '0', 10);

function initAuthSession() {
  const session = TutStonesStore.getAuthSession();
  const authOverlay = document.getElementById('admin-auth-overlay');
  const userDisplayName = document.getElementById('user-display-name');

  if (!session) {
    authOverlay?.classList.remove('hidden');
    return;
  }

  authOverlay?.classList.add('hidden');

  if (userDisplayName) {
    const isSuperAdmin = session.role === 'admin';
    userDisplayName.innerHTML = `
      <i class="${isSuperAdmin ? 'ri-user-star-line' : 'ri-user-3-line'}" style="color: var(--color-gold-primary);"></i>
      ${session.name} (${isSuperAdmin ? 'Super Admin' : 'Editor'})
    `;
  }

  applyRoleUI(session.role);
}

function handleAdminLogin() {
  const now = Date.now();
  const alertBox = document.getElementById('auth-alert-box');
  const alertMsg = document.getElementById('auth-alert-msg');
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');

  if (lockoutUntil && now < lockoutUntil) {
    const remainingSeconds = Math.ceil((lockoutUntil - now) / 1000);
    if (alertBox && alertMsg) {
      alertBox.className = 'auth-alert lockout';
      alertBox.style.display = 'flex';
      alertMsg.innerText = `Too many failed attempts. Security lockout active for ${remainingSeconds}s.`;
    }
    return;
  }

  const username = usernameInput ? usernameInput.value : '';
  const password = passwordInput ? passwordInput.value : '';

  const res = TutStonesStore.authenticateUser(username, password);

  if (res.success) {
    failedLoginAttempts = 0;
    lockoutUntil = 0;
    localStorage.removeItem('tut_stones_failed_attempts');
    localStorage.removeItem('tut_stones_lockout_until');

    if (alertBox) alertBox.style.display = 'none';

    initAuthSession();
    showToast(`Authenticated successfully as ${res.session.name}`);

    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';
  } else {
    failedLoginAttempts += 1;
    localStorage.setItem('tut_stones_failed_attempts', failedLoginAttempts);

    if (failedLoginAttempts >= 5) {
      lockoutUntil = now + (5 * 60 * 1000);
      localStorage.setItem('tut_stones_lockout_until', lockoutUntil);
      if (alertBox && alertMsg) {
        alertBox.className = 'auth-alert lockout';
        alertBox.style.display = 'flex';
        alertMsg.innerText = 'Security threshold exceeded! Access locked for 5 minutes due to multiple failed attempts.';
      }
    } else {
      if (alertBox && alertMsg) {
        alertBox.className = 'auth-alert';
        alertBox.style.display = 'flex';
        alertMsg.innerText = `${res.message} (${5 - failedLoginAttempts} attempt(s) remaining before lockout).`;
      }
    }
  }
}

function performAdminLogout() {
  TutStonesStore.logout();
  const authOverlay = document.getElementById('admin-auth-overlay');
  authOverlay?.classList.remove('hidden');
  const alertBox = document.getElementById('auth-alert-box');
  if (alertBox) alertBox.style.display = 'none';
  showToast('Logged out of Admin Portal.');
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '<i class="ri-eye-off-line"></i>';
  } else {
    input.type = 'password';
    btn.innerHTML = '<i class="ri-eye-line"></i>';
  }
}

/* ==========================================================================
   17. USER MANAGEMENT CONTROLLER & PASSWORD EVALUATOR
   ========================================================================== */
function renderUsersTable() {
  const users = TutStonesStore.getUsers();
  const tableBody = document.getElementById('users-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = users.map(u => {
    const isProtected = u.username.toLowerCase() === 'tut_admin';
    const pwdEval = TutStonesStore.validatePassword(u.passwordHash);
    
    let strengthBadge = '<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10B981;">Strong (Compliant)</span>';
    if (!pwdEval.isValid) {
      strengthBadge = '<span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #EF4444;">Weak (Action Required)</span>';
    }

    return `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td><code>${u.username}</code></td>
        <td><span class="badge ${u.role === 'admin' ? 'badge-dev' : 'badge-category'}">${u.role === 'admin' ? 'Developer / Super Admin' : 'Content Editor'}</span></td>
        <td>${strengthBadge}</td>
        <td style="text-align: right;">
          <button class="btn btn-outline btn-sm" onclick="openUserModal('${u.username}')"><i class="ri-edit-line"></i> Change Password / Role</button>
          ${!isProtected ? `<button class="btn btn-danger btn-sm" onclick="deleteUserConfirm('${u.username}')"><i class="ri-delete-bin-line"></i></button>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function evaluateModalPasswordStrength(pwd) {
  const fill = document.getElementById('modal-password-fill');
  const res = TutStonesStore.validatePassword(pwd);

  if (fill) {
    fill.className = `password-meter-fill score-${res.score}`;
  }

  const updateRule = (id, isValid) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isValid) {
      el.className = 'valid';
      el.querySelector('i').className = 'ri-checkbox-circle-line';
    } else {
      el.className = '';
      el.querySelector('i').className = 'ri-close-circle-line';
    }
  };

  updateRule('rule-len', pwd.length >= 10);
  updateRule('rule-upper', /[A-Z]/.test(pwd));
  updateRule('rule-lower', /[a-z]/.test(pwd));
  updateRule('rule-num', /[0-9]/.test(pwd));
  updateRule('rule-spec', /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd));
}

function openUserModal(username = null) {
  const modal = document.getElementById('user-modal');
  const title = document.getElementById('user-modal-title');
  const origUsernameInput = document.getElementById('user-original-username');
  const nameInput = document.getElementById('user-name');
  const usernameInput = document.getElementById('user-username');
  const roleSelect = document.getElementById('user-role');
  const pwdInput = document.getElementById('user-password');

  if (!modal) return;

  if (username) {
    const users = TutStonesStore.getUsers();
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (target) {
      if (title) title.innerHTML = '<i class="ri-user-settings-line"></i> Edit User Account';
      if (origUsernameInput) origUsernameInput.value = target.username;
      if (nameInput) nameInput.value = target.name;
      if (usernameInput) {
        usernameInput.value = target.username;
        if (target.username.toLowerCase() === 'tut_admin') {
          usernameInput.readOnly = true;
        } else {
          usernameInput.readOnly = false;
        }
      }
      if (roleSelect) roleSelect.value = target.role;
      if (pwdInput) {
        pwdInput.value = target.passwordHash;
        evaluateModalPasswordStrength(target.passwordHash);
      }
    }
  } else {
    if (title) title.innerHTML = '<i class="ri-user-add-line"></i> Add New User Account';
    if (origUsernameInput) origUsernameInput.value = '';
    if (nameInput) nameInput.value = '';
    if (usernameInput) {
      usernameInput.value = '';
      usernameInput.readOnly = false;
    }
    if (roleSelect) roleSelect.value = 'editor';
    if (pwdInput) {
      pwdInput.value = '';
      evaluateModalPasswordStrength('');
    }
  }

  modal.classList.add('active');
}

function saveUserForm() {
  const name = document.getElementById('user-name')?.value.trim();
  const username = document.getElementById('user-username')?.value.trim();
  const role = document.getElementById('user-role')?.value;
  const password = document.getElementById('user-password')?.value;

  if (!name || !username || !password) {
    showToast('Please complete all user fields.');
    return;
  }

  const pwdEval = TutStonesStore.validatePassword(password);
  if (!pwdEval.isValid) {
    alert('STRONG PASSWORD REQUIRED:\n\n' + pwdEval.feedback.join('\n'));
    return;
  }

  const userObj = {
    username: username,
    name: name,
    role: role,
    passwordHash: password
  };

  TutStonesStore.saveUser(userObj);
  closeAdminModal('user-modal');
  refreshAllAdminViews();
  showToast(`User ${username} saved with strong password credentials.`);
}

function deleteUserConfirm(username) {
  if (username.toLowerCase() === 'tut_admin') {
    alert('Protected Account: The primary Super Admin account (tut_admin) cannot be deleted.');
    return;
  }

  if (confirm(`Delete user account "${username}"? This action cannot be undone.`)) {
    TutStonesStore.deleteUser(username);
    refreshAllAdminViews();
    showToast(`User ${username} removed.`);
  }
}

async function triggerWPSync() {
  showToast('Connecting to WordPress REST API (port 8888)...');
  const res = await TutStonesStore.syncWithWordPress();
  if (res.success) {
    refreshAllAdminViews();
    showToast('Bi-directional WordPress synchronization complete!');
  } else {
    showToast('Could not sync with WordPress (check if port 8888 is active).');
  }
}
