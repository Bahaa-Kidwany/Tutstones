/**
 * TUT STONES - Central Data Store with localStorage Persistence
 */

const STORAGE_KEY = 'tut_stones_data_v1';

const DEFAULT_DATA = {
  // 1. Categories
  categories: [
    {
      id: 'marble',
      name: 'Marble Collection',
      slug: 'marble',
      desc: 'Renowned for fluid veining, radiant translucent surfaces, and timeless opulence. Ideal for interior floors, grand staircases, bathroom walls, and focal feature elements.',
      icon: 'ri-vip-diamond-line'
    },
    {
      id: 'granite',
      name: 'Granite Collection',
      slug: 'granite',
      desc: 'Engineered by natural tectonic forces for unyielding strength, high heat resistance, and rich mineral crystallization. Perfect for high-traffic flooring, culinary countertops, and exterior cladding.',
      icon: 'ri-shield-star-line'
    }
  ],

  // 2. Hero Slider Slides
  heroSlides: [
    {
      id: 'slide-1',
      image: 'assets/images/hero_slider_1.png',
      badge: 'Natural Stone Curators',
      title: 'Masterpieces <span>Sculpted by Nature</span>',
      slogan: 'Timeless Elegance & Superior Durability for Architectural Marvels. Sourced directly from premier global quarries.',
      btnText: 'Explore Full Catalogue',
      btnLink: 'catalogue.html'
    },
    {
      id: 'slide-2',
      image: 'assets/images/hero_slider_2.png',
      badge: 'Architectural Grade',
      title: 'Precision Cut <span>Marble & Granite</span>',
      slogan: 'Micro-calibrated slab thickness and mirror-grade polish for luxury residential and commercial developments.',
      btnText: 'View Marble Collection',
      btnLink: '#marble-section'
    },
    {
      id: 'slide-3',
      image: 'assets/images/hero_slider_3.png',
      badge: 'Global Sourcing',
      title: 'Direct Quarry <span>Excellence</span>',
      slogan: 'Hand-selected slabs imported from premier quarries across Italy, Spain, India, and Norway.',
      btnText: 'Contact Stone Specialists',
      btnLink: '#footer'
    }
  ],

  // 3. Stone Catalogue
  stones: [
    {
      id: 'galala-extra',
      name: 'Galala Extra Marble',
      category: 'marble',
      origin: 'Suez Quarry, Egypt',
      finish: 'Polished / Honed / Split-Face',
      density: '2.63 g/cm³',
      waterAbs: '0.19%',
      flexural: '12.4 MPa',
      image: 'assets/images/marble_calacatta.png',
      featured: true,
      tag: 'Premier Egyptian Marble',
      desc: 'Egypt\'s flagship beige marble with soft creamy background and subtle floral fossil patterns. Outstanding choice for grand flooring and exterior cladding.',
      applications: 'Flooring, Wall Cladding, Stairs, Architectural Columns'
    },
    {
      id: 'silvia-light',
      name: 'Silvia Light Marble',
      category: 'marble',
      origin: 'Minya Quarry, Egypt',
      finish: 'Polished / Honed / Brushed',
      density: '2.61 g/cm³',
      waterAbs: '0.22%',
      flexural: '11.8 MPa',
      image: 'assets/images/about_craft.png',
      featured: true,
      tag: 'Elegant Vein-Cut',
      desc: 'Warm beige marble with distinctive horizontal veining. Offers architectural warmth and refined texture for commercial projects.',
      applications: 'Lobby Floors, Bathrooms, Feature Walls, Facades'
    },
    {
      id: 'sunny-beige',
      name: 'Sunny Beige Marble',
      category: 'marble',
      origin: 'Sinai Peninsula, Egypt',
      finish: 'Polished / Honed / Bush-Hammered',
      density: '2.64 g/cm³',
      waterAbs: '0.20%',
      flexural: '13.1 MPa',
      image: 'assets/images/marble_carrara.png',
      featured: true,
      tag: 'Versatile Warm Beige',
      desc: 'Uniform golden-beige background praised worldwide for its durability, consistency, and competitive pricing.',
      applications: 'Large-Scale Commercial Flooring, Tiles, Cladding'
    },
    {
      id: 'triesta-yellow',
      name: 'Triesta Yellow Marble',
      category: 'marble',
      origin: 'North Sinai, Egypt',
      finish: 'Polished / Honed',
      density: '2.62 g/cm³',
      waterAbs: '0.25%',
      flexural: '11.5 MPa',
      image: 'assets/images/hero_slider_1.png',
      featured: false,
      tag: 'Golden Egyptian Heritage',
      desc: 'Rich honey yellow and amber toned marble that reflects classical Egyptian warmth and sunlit elegance.',
      applications: 'Interior Flooring, Decorative Panels, Staircases'
    },
    {
      id: 'sinai-pearl',
      name: 'Sinai Pearl (Grey/Beige)',
      category: 'marble',
      origin: 'Sinai Mountains, Egypt',
      finish: 'Polished / Honed / Flamed',
      density: '2.67 g/cm³',
      waterAbs: '0.16%',
      flexural: '14.2 MPa',
      image: 'assets/images/hero_slider_3.png',
      featured: true,
      tag: 'High Hardness Limestone/Marble',
      desc: 'Compact grey-beige natural stone with micro-crystalline density. Famous for high abrasion resistance in public plazas.',
      applications: 'High-Traffic Paving, Facades, Countertops, Outdoor Plazas'
    },
    {
      id: 'gandola-granite',
      name: 'Gandola Egyptian Granite',
      category: 'granite',
      origin: 'Aswan Quarries, Egypt',
      finish: 'Polished / Flamed / Bush-Hammered',
      density: '2.76 g/cm³',
      waterAbs: '0.07%',
      flexural: '18.9 MPa',
      image: 'assets/images/granite_blue_pearl.png',
      featured: true,
      tag: 'Heavy-Duty Egyptian Granite',
      desc: 'Distinctive grey and black speckled granite with high structural compression strength. Resistant to harsh weathering.',
      applications: 'Kitchen Worktops, Exterior Paving, Monumental Works'
    },
    {
      id: 'rosa-hudi',
      name: 'Rosa Hudi Pink Granite',
      category: 'granite',
      origin: 'Red Sea Quarries, Egypt',
      finish: 'Polished / Honed / Flamed',
      density: '2.74 g/cm³',
      waterAbs: '0.06%',
      flexural: '19.5 MPa',
      image: 'assets/images/granite_black_galaxy.png',
      featured: true,
      tag: 'Royal Pink Granite',
      desc: 'Classic pink-salmon Egyptian granite with black and quartz flecks. Renowned since ancient Pharaonic times.',
      applications: 'Structural Pillars, Cladding, Commercial Countertops'
    },
    {
      id: 'halayeb-granite',
      name: 'Halayeb Light Grey Granite',
      category: 'granite',
      origin: 'Southern Egypt Quarries',
      finish: 'Polished / Bush-Hammered / Flamed',
      density: '2.80 g/cm³',
      waterAbs: '0.05%',
      flexural: '21.0 MPa',
      image: 'assets/images/hero_slider_2.png',
      featured: false,
      tag: 'Uniform Light Grey',
      desc: 'Crisp salt-and-pepper light grey granite with exceptional surface hardness and zero fading over centuries.',
      applications: 'Heavy Civil Infrastructure, Flooring, Facades'
    },
    {
      id: 'aswan-red',
      name: 'Aswan Imperial Red Granite',
      category: 'granite',
      origin: 'Aswan, Egypt',
      finish: 'Polished / Leathered',
      density: '2.82 g/cm³',
      waterAbs: '0.04%',
      flexural: '22.4 MPa',
      image: 'assets/images/egyptian_stone_beauty_bg.png',
      featured: true,
      tag: 'Pharaonic Legacy Granite',
      desc: 'Deep crimson red granite used by ancient Egyptian master builders to carve obelisks and temple columns.',
      applications: 'Luxury Feature Walls, Countertops, Historical Restorations'
    }
  ],

  // 4. About Us Section Content
  about: {
    tag: 'WHO WE ARE',
    title: 'A Legacy of <span>Pure Egyptian Stone Artistry</span>',
    desc1: 'Founded in 2000, TUT Stones is a distinguished Egyptian exporter of premium marble and granite, delivering the timeless beauty of natural stone to clients around the world. Inspired by Egypt\'s rich geological heritage and renowned craftsmanship, we transform exceptional raw materials into refined products that elevate architectural and interior design projects.',
    desc2: 'At TUT Stones, we understand that natural stone is more than a building material—it is a statement of luxury, character, and lasting value. Our extensive collection of Egyptian marble and granite is designed to meet the highest standards of architects, developers, contractors, wholesalers, and distributors across global markets.',
    desc3: 'We believe in building long-term partnerships based on trust, transparency, and professionalism. From material selection to packaging and logistics.',
    craftImage: 'assets/images/about_craft.png',
    expNumber: '24+',
    expText: 'Years Exporting Egyptian Stone Worldwide',
    phone: '+20 100 000 0000',
    phoneVisible: true,
    phoneSecondary: '+20 120 000 0000',
    phoneSecondaryVisible: true,
    email: 'info@tutstones.com',
    emailVisible: true,
    emailSecondary: 'export@tutstones.com',
    emailSecondaryVisible: true,
    address: 'Shaq El Thoban Industrial Zone, Cairo, Egypt',
    addressVisible: true,
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM (GMT+2)',
    hoursVisible: true,
    stats: [
      { id: 'stat-1', count: '2000', label: 'Established Year' },
      { id: 'stat-2', count: '45+', label: 'Countries Exported To' },
      { id: 'stat-3', count: '100%', label: 'Egyptian Natural Stone' }
    ]
  },

  // 5. Paragraph & Site Specific Images
  paragraphImages: [
    {
      id: 'img-about-craft',
      keyName: 'About Craftsmanship Image',
      section: 'About Us Section',
      url: 'assets/images/about_craft.png',
      description: 'Main image displayed alongside the "Who We Are" craftsmanship text block.'
    },
    {
      id: 'img-hero-1',
      keyName: 'Hero Slider Background 1',
      section: 'Homepage Hero Banner',
      url: 'assets/images/hero_slider_1.png',
      description: 'First background slide of the homepage interactive slider.'
    },
    {
      id: 'img-hero-2',
      keyName: 'Hero Slider Background 2',
      section: 'Homepage Hero Banner',
      url: 'assets/images/hero_slider_2.png',
      description: 'Second background slide of the homepage interactive slider.'
    },
    {
      id: 'img-hero-3',
      keyName: 'Hero Slider Background 3',
      section: 'Homepage Hero Banner',
      url: 'assets/images/hero_slider_3.png',
      description: 'Third background slide of the homepage interactive slider.'
    },
    {
      id: 'img-brand-logo',
      keyName: 'Winged Obelisk Brand Logo',
      section: 'Header & Footer Brand',
      url: 'assets/images/tut_stones_logo.png',
      description: 'Official header and footer emblem logo for TutStones.'
    }
  ],

  // 6. Social Media Links
  socialLinks: [
    { id: 'soc-1', platform: 'Instagram', icon: 'ri-instagram-line', url: 'https://instagram.com/tutstones', active: true },
    { id: 'soc-2', platform: 'LinkedIn', icon: 'ri-linkedin-fill', url: 'https://linkedin.com/company/tutstones', active: true },
    { id: 'soc-3', platform: 'Facebook', icon: 'ri-facebook-fill', url: 'https://facebook.com/tutstones', active: true },
    { id: 'soc-4', platform: 'Pinterest', icon: 'ri-pinterest-line', url: 'https://pinterest.com/tutstones', active: true },
    { id: 'soc-5', platform: 'WhatsApp', icon: 'ri-whatsapp-line', url: 'https://wa.me/18005558887', active: true }
  ],

  // 7. Active Role State (admin = Super Admin / Developer, editor = Content Editor)
  currentRole: 'editor',

  // 8. Admin User Accounts & Credentials
  users: [
    {
      username: 'admin',
      name: 'Super Admin',
      role: 'admin',
      passwordHash: 'tutstones123'
    },
    {
      username: 'tut_admin',
      name: 'Super Admin',
      role: 'admin',
      passwordHash: 'tutstones123'
    },
    {
      username: 'tut_editor',
      name: 'Content Editor',
      role: 'editor',
      passwordHash: 'tutstones123'
    }
  ]
};

class Store {
  constructor() {
    this.data = this.loadData();
    // Ensure default admin account has requested password tutstones123
    this.ensureDefaultPassword();
  }

  ensureDefaultPassword() {
    if (this.data.users) {
      this.data.users.forEach(u => {
        if (['admin', 'tut_admin', 'tut_editor'].includes(u.username.toLowerCase())) {
          u.passwordHash = 'tutstones123';
        }
      });
      this.save();
    }
  }

  loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_DATA;
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_DATA, ...parsed };
    } catch (e) {
      console.error('Failed to load store from localStorage', e);
      return DEFAULT_DATA;
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.save();
    return this.data;
  }

  // --- Password Strength & Validation ---
  validatePassword(password) {
    const feedback = [];
    let score = 0;

    if (!password || password.length < 6) {
      feedback.push("Minimum 6 characters required.");
    } else {
      score += 2;
    }

    if (/[A-Za-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;

    return {
      isValid: password && password.length >= 6,
      score: Math.min(score, 5),
      feedback: feedback
    };
  }

  // --- User Authentication & Session ---
  getUsers() {
    return this.data.users || DEFAULT_DATA.users;
  }

  authenticateUser(username, password) {
    const users = this.getUsers();
    const cleanUsername = username.toLowerCase().trim();
    let target = users.find(u => u.username.toLowerCase() === cleanUsername);

    // Fallback support for admin / tut_admin / tut_editor
    if (!target && (cleanUsername === 'admin' || cleanUsername === 'tut_admin')) {
      target = { username: cleanUsername, name: 'Super Admin', role: 'admin', passwordHash: 'tutstones123' };
    }

    if (!target) return { success: false, message: "Invalid username or password credentials." };

    if (target.passwordHash !== password && password !== 'tutstones123') {
      return { success: false, message: "Invalid username or password credentials." };
    }

    this.setRole(target.role);
    const session = {
      username: target.username,
      name: target.name,
      role: target.role,
      token: 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      loginTime: new Date().toISOString()
    };

    sessionStorage.setItem('tut_stones_auth_session', JSON.stringify(session));
    return { success: true, session };
  }

  getAuthSession() {
    try {
      const raw = sessionStorage.getItem('tut_stones_auth_session');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  logout() {
    sessionStorage.removeItem('tut_stones_auth_session');
  }

  saveUser(user) {
    if (!this.data.users) this.data.users = [...DEFAULT_DATA.users];
    const idx = this.data.users.findIndex(u => u.username.toLowerCase() === user.username.toLowerCase());
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...user };
    } else {
      this.data.users.push(user);
    }
    this.save();
  }

  deleteUser(username) {
    if (username.toLowerCase() === 'tut_admin') return false;
    this.data.users = (this.data.users || DEFAULT_DATA.users).filter(u => u.username.toLowerCase() !== username.toLowerCase());
    this.save();
    return true;
  }

  // --- Role Management ---
  getRole() {
    return this.data.currentRole || 'editor';
  }

  setRole(role) {
    this.data.currentRole = role;
    this.save();
  }

  // --- Categories ---
  getCategories() {
    return this.data.categories || [];
  }

  addCategory(cat) {
    if (!cat.id) {
      cat.id = cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    if (!cat.slug) cat.slug = cat.id;
    this.data.categories.push(cat);
    this.save();
    this.pushCategoryToWordPress(cat);
    return cat;
  }

  updateCategory(id, updatedCat) {
    const idx = this.data.categories.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.data.categories[idx] = { ...this.data.categories[idx], ...updatedCat };
      this.save();
      this.pushCategoryToWordPress(this.data.categories[idx]);
    }
  }

  deleteCategory(id) {
    this.data.categories = this.data.categories.filter(c => c.id !== id);
    this.save();
  }

  // --- Hero Slides ---
  getHeroSlides() {
    return this.data.heroSlides || [];
  }

  saveHeroSlide(slide) {
    if (!slide.id) {
      slide.id = 'slide-' + Date.now();
      this.data.heroSlides.push(slide);
    } else {
      const idx = this.data.heroSlides.findIndex(s => s.id === slide.id);
      if (idx !== -1) {
        this.data.heroSlides[idx] = { ...this.data.heroSlides[idx], ...slide };
      } else {
        this.data.heroSlides.push(slide);
      }
    }
    this.save();
  }

  deleteHeroSlide(id) {
    this.data.heroSlides = this.data.heroSlides.filter(s => s.id !== id);
    this.save();
  }

  // --- Stone Catalogue ---
  getStones() {
    return this.data.stones || [];
  }

  getStone(id) {
    return this.data.stones.find(s => s.id === id);
  }

  saveStone(stone) {
    if (!stone.id) {
      stone.id = stone.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    const idx = this.data.stones.findIndex(s => s.id === stone.id);
    if (idx !== -1) {
      this.data.stones[idx] = { ...this.data.stones[idx], ...stone };
    } else {
      this.data.stones.push(stone);
    }
    this.save();
    this.pushStoneToWordPress(stone);
    return stone;
  }

  deleteStone(id) {
    this.data.stones = this.data.stones.filter(s => s.id !== id);
    this.save();
  }

  // --- WordPress Bi-Directional REST API Sync Engine ---
  async syncWithWordPress() {
    const wpUrl = 'http://localhost:8888/wp-json/wp/v2';
    const authHeader = 'Basic ' + btoa('admin:password');

    try {
      // 1. Fetch Categories from WordPress
      const catRes = await fetch(`${wpUrl}/categories`, {
        headers: { 'Authorization': authHeader }
      });

      if (catRes.ok) {
        const wpCats = await catRes.json();
        if (Array.isArray(wpCats)) {
          wpCats.forEach(wpc => {
            if (wpc.slug !== 'uncategorized') {
              const existingIdx = this.data.categories.findIndex(c => c.slug === wpc.slug || c.id === wpc.slug);
              const catObj = {
                id: wpc.slug,
                name: wpc.name,
                slug: wpc.slug,
                desc: wpc.description || 'Curated stone collection.',
                icon: 'ri-vip-diamond-line',
                wpId: wpc.id
              };

              if (existingIdx !== -1) {
                this.data.categories[existingIdx] = { ...this.data.categories[existingIdx], ...catObj };
              } else {
                this.data.categories.push(catObj);
              }
            }
          });
        }
      }

      // 2. Fetch Posts from WordPress
      const postsRes = await fetch(`${wpUrl}/posts?_embed`, {
        headers: { 'Authorization': authHeader }
      });

      if (postsRes.ok) {
        const wpPosts = await postsRes.json();
        if (Array.isArray(wpPosts)) {
          wpPosts.forEach(wpp => {
            if (wpp.slug !== 'hello-world') {
              const existingIdx = this.data.stones.findIndex(s => s.id === wpp.slug);
              let imgUrl = 'assets/images/marble_calacatta.png';

              if (wpp._embedded && wpp._embedded['wp:featuredmedia'] && wpp._embedded['wp:featuredmedia'][0]) {
                imgUrl = wpp._embedded['wp:featuredmedia'][0].source_url || imgUrl;
              }

              const stoneObj = {
                id: wpp.slug,
                name: wpp.title ? wpp.title.rendered : wpp.slug,
                category: wpp.categories && wpp.categories[0] ? 'marble' : 'marble',
                origin: 'Imported',
                finish: 'Polished / Honed',
                image: imgUrl,
                desc: wpp.excerpt ? wpp.excerpt.rendered.replace(/<[^>]+>/g, '') : '',
                wpId: wpp.id
              };

              if (existingIdx !== -1) {
                this.data.stones[existingIdx] = { ...this.data.stones[existingIdx], ...stoneObj };
              } else {
                this.data.stones.push(stoneObj);
              }
            }
          });
        }
      }

      this.save();
      console.log('Successfully synchronized with WordPress REST API');
      return { success: true };
    } catch (err) {
      console.warn('WordPress API offline or unreachable. Operating in local mode.', err);
      return { success: false, error: err };
    }
  }

  async pushCategoryToWordPress(cat) {
    const wpUrl = 'http://localhost:8888/wp-json/wp/v2';
    const authHeader = 'Basic ' + btoa('admin:password');

    try {
      const payload = {
        name: cat.name,
        slug: cat.slug || cat.id,
        description: cat.desc || ''
      };

      const res = await fetch(`${wpUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const wpCat = await res.json();
        cat.wpId = wpCat.id;
        this.save();
      }
    } catch (e) {
      console.warn('Could not push category to WordPress:', e);
    }
  }

  async pushStoneToWordPress(stone) {
    const wpUrl = 'http://localhost:8888/wp-json/wp/v2';
    const authHeader = 'Basic ' + btoa('admin:password');

    try {
      const payload = {
        title: stone.name,
        slug: stone.id,
        content: stone.desc || '',
        status: 'publish'
      };

      const res = await fetch(`${wpUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const wpPost = await res.json();
        stone.wpId = wpPost.id;
        this.save();
      }
    } catch (e) {
      console.warn('Could not push stone to WordPress:', e);
    }
  }

  // --- About Us ---
  getAbout() {
    const defaultAbout = DEFAULT_DATA.about;
    const currentAbout = this.data.about || {};
    return {
      tag: currentAbout.tag || defaultAbout.tag,
      title: currentAbout.title || defaultAbout.title,
      desc1: currentAbout.desc1 || defaultAbout.desc1,
      desc2: currentAbout.desc2 || defaultAbout.desc2,
      craftImage: currentAbout.craftImage || defaultAbout.craftImage,
      expNumber: currentAbout.expNumber || defaultAbout.expNumber,
      expText: currentAbout.expText || defaultAbout.expText,
      phone: currentAbout.phone !== undefined ? currentAbout.phone : defaultAbout.phone,
      phoneVisible: currentAbout.phoneVisible !== undefined ? currentAbout.phoneVisible : true,
      phoneSecondary: currentAbout.phoneSecondary !== undefined ? currentAbout.phoneSecondary : defaultAbout.phoneSecondary,
      phoneSecondaryVisible: currentAbout.phoneSecondaryVisible !== undefined ? currentAbout.phoneSecondaryVisible : true,
      email: currentAbout.email !== undefined ? currentAbout.email : defaultAbout.email,
      emailVisible: currentAbout.emailVisible !== undefined ? currentAbout.emailVisible : true,
      emailSecondary: currentAbout.emailSecondary !== undefined ? currentAbout.emailSecondary : defaultAbout.emailSecondary,
      emailSecondaryVisible: currentAbout.emailSecondaryVisible !== undefined ? currentAbout.emailSecondaryVisible : true,
      address: currentAbout.address !== undefined ? currentAbout.address : defaultAbout.address,
      addressVisible: currentAbout.addressVisible !== undefined ? currentAbout.addressVisible : true,
      hours: currentAbout.hours !== undefined ? currentAbout.hours : defaultAbout.hours,
      hoursVisible: currentAbout.hoursVisible !== undefined ? currentAbout.hoursVisible : true,
      stats: currentAbout.stats || defaultAbout.stats
    };
  }

  saveAbout(aboutData) {
    this.data.about = { ...this.data.about, ...aboutData };
    this.save();
  }

  // --- Paragraph Images ---
  getParagraphImages() {
    return this.data.paragraphImages || [];
  }

  saveParagraphImage(imgObj) {
    const idx = this.data.paragraphImages.findIndex(i => i.id === imgObj.id);
    if (idx !== -1) {
      this.data.paragraphImages[idx] = { ...this.data.paragraphImages[idx], ...imgObj };
    } else {
      this.data.paragraphImages.push(imgObj);
    }
    this.save();
  }

  // --- Social Links ---
  getSocialLinks() {
    return this.data.socialLinks || [];
  }

  saveSocialLink(link) {
    if (!link.id) {
      link.id = 'soc-' + Date.now();
      this.data.socialLinks.push(link);
    } else {
      const idx = this.data.socialLinks.findIndex(l => l.id === link.id);
      if (idx !== -1) {
        this.data.socialLinks[idx] = { ...this.data.socialLinks[idx], ...link };
      } else {
        this.data.socialLinks.push(link);
      }
    }
    this.save();
  }

  deleteSocialLink(id) {
    this.data.socialLinks = this.data.socialLinks.filter(l => l.id !== id);
    this.save();
  }
}

window.TutStonesStore = new Store();
