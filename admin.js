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
  renderAboutForm();
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
   9. TAB 6: ABOUT US FORM EDITOR
   ========================================================================== */
function renderAboutForm() {
  const about = TutStonesStore.getAbout();
  document.getElementById('about-tag').value = about.tag || '';
  document.getElementById('about-title').value = about.title || '';
  document.getElementById('about-desc1').value = about.desc1 || '';
  document.getElementById('about-desc2').value = about.desc2 || '';
  document.getElementById('about-craft-url').value = about.craftImage || '';
  document.getElementById('about-craft-img-preview').src = about.craftImage || '';
  document.getElementById('about-exp-num').value = about.expNumber || '';
  document.getElementById('about-exp-text').value = about.expText || '';
  
  if (document.getElementById('about-phone')) document.getElementById('about-phone').value = about.phone || '';
  if (document.getElementById('about-phone-visible')) document.getElementById('about-phone-visible').checked = about.phoneVisible !== false;

  if (document.getElementById('about-phone2')) document.getElementById('about-phone2').value = about.phoneSecondary || '';
  if (document.getElementById('about-phone2-visible')) document.getElementById('about-phone2-visible').checked = about.phoneSecondaryVisible !== false;

  if (document.getElementById('about-email')) document.getElementById('about-email').value = about.email || '';
  if (document.getElementById('about-email-visible')) document.getElementById('about-email-visible').checked = about.emailVisible !== false;

  if (document.getElementById('about-email2')) document.getElementById('about-email2').value = about.emailSecondary || '';
  if (document.getElementById('about-email2-visible')) document.getElementById('about-email2-visible').checked = about.emailSecondaryVisible !== false;

  if (document.getElementById('about-address')) document.getElementById('about-address').value = about.address || '';
  if (document.getElementById('about-address-visible')) document.getElementById('about-address-visible').checked = about.addressVisible !== false;

  if (document.getElementById('about-hours')) document.getElementById('about-hours').value = about.hours || '';
  if (document.getElementById('about-hours-visible')) document.getElementById('about-hours-visible').checked = about.hoursVisible !== false;

  const statsContainer = document.getElementById('about-stats-container');
  if (statsContainer && about.stats) {
    statsContainer.innerHTML = about.stats.map((stat, idx) => `
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: 0.75rem; margin-bottom: 0.5rem;">
        <input type="text" id="about-stat-count-${idx}" class="form-control" value="${stat.count}" placeholder="e.g. 150+">
        <input type="text" id="about-stat-label-${idx}" class="form-control" value="${stat.label}" placeholder="e.g. Stone Varieties">
      </div>
    `).join('');
  }
}

function saveAboutForm() {
  const currentAbout = TutStonesStore.getAbout();
  const about = {
    ...currentAbout,
    tag: document.getElementById('about-tag').value,
    title: document.getElementById('about-title').value,
    desc1: document.getElementById('about-desc1').value,
    desc2: document.getElementById('about-desc2').value,
    craftImage: document.getElementById('about-craft-url').value,
    expNumber: document.getElementById('about-exp-num').value,
    expText: document.getElementById('about-exp-text').value,
    phone: document.getElementById('about-phone')?.value || '',
    phoneVisible: document.getElementById('about-phone-visible')?.checked ?? true,
    phoneSecondary: document.getElementById('about-phone2')?.value || '',
    phoneSecondaryVisible: document.getElementById('about-phone2-visible')?.checked ?? true,
    email: document.getElementById('about-email')?.value || '',
    emailVisible: document.getElementById('about-email-visible')?.checked ?? true,
    emailSecondary: document.getElementById('about-email2')?.value || '',
    emailSecondaryVisible: document.getElementById('about-email2-visible')?.checked ?? true,
    address: document.getElementById('about-address')?.value || '',
    addressVisible: document.getElementById('about-address-visible')?.checked ?? true,
    hours: document.getElementById('about-hours')?.value || '',
    hoursVisible: document.getElementById('about-hours-visible')?.checked ?? true,
    stats: [
      { id: 'stat-1', count: document.getElementById('about-stat-count-0')?.value || '150+', label: document.getElementById('about-stat-label-0')?.value || 'Stone Varieties' },
      { id: 'stat-2', count: document.getElementById('about-stat-count-1')?.value || '1,200+', label: document.getElementById('about-stat-label-1')?.value || 'Completed Projects' },
      { id: 'stat-3', count: document.getElementById('about-stat-count-2')?.value || '100%', label: document.getElementById('about-stat-label-2')?.value || 'Natural Origin' }
    ]
  };

  TutStonesStore.saveAbout(about);
  showToast('About Us & Contact content saved successfully!');
  refreshAllAdminViews();
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

  if (document.getElementById('social-contact-hours')) document.getElementById('social-contact-hours').value = about.hours || '';
  if (document.getElementById('social-contact-hours-visible')) document.getElementById('social-contact-hours-visible').checked = about.hoursVisible !== false;
}

function saveShowroomContact() {
  const currentAbout = TutStonesStore.getAbout();
  const updatedAbout = {
    ...currentAbout,
    address: document.getElementById('social-contact-address')?.value || currentAbout.address,
    addressVisible: document.getElementById('social-contact-address-visible')?.checked ?? true,

    email: document.getElementById('social-contact-email')?.value || currentAbout.email,
    emailVisible: document.getElementById('social-contact-email-visible')?.checked ?? true,

    emailSecondary: document.getElementById('social-contact-email2')?.value || currentAbout.emailSecondary,
    emailSecondaryVisible: document.getElementById('social-contact-email2-visible')?.checked ?? true,

    phone: document.getElementById('social-contact-phone')?.value || currentAbout.phone,
    phoneVisible: document.getElementById('social-contact-phone-visible')?.checked ?? true,

    hours: document.getElementById('social-contact-hours')?.value || currentAbout.hours,
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
   12. IMAGE FILE UPLOADER (BASE64 CONVERTER)
   ========================================================================== */
function handleImageFileUpload(event, targetInputId, previewImgId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById(targetInputId).value = dataUrl;
    if (previewImgId) {
      document.getElementById(previewImgId).src = dataUrl;
    }
    showToast('Image uploaded and converted successfully!');
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
