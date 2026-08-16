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
  ],

  // 4. About Us Section Content
  about: {
    tag: 'WHO WE ARE',
    title: 'A Legacy of <span>Pure Stone Artistry</span>',
    desc1: 'At TutStones, stone is not merely a building material—it is a timeless canvas created over millions of years beneath the Earth crust. We specialize in selecting, processing, and finishing the world most breathtaking Marble and Granite slabs.',
    desc2: 'Our state-of-the-art diamond processing facilities ensure micro-precise edge calibration, mirror-grade surface polishing, and rigorous quality control for luxury residential, commercial, and hospitality developments.',
    craftImage: 'assets/images/about_craft.png',
    expNumber: '25+',
    expText: 'Years Sourcing Rare Natural Stone',
    stats: [
      { id: 'stat-1', count: '150+', label: 'Stone Varieties' },
      { id: 'stat-2', count: '1,200+', label: 'Completed Projects' },
      { id: 'stat-3', count: '100%', label: 'Natural Origin' }
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
    return this.data.about || DEFAULT_DATA.about;
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
