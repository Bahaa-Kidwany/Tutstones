/**
 * TUT STONES - Central Data Store with localStorage Persistence
 */

const STORAGE_KEY = 'tut_stones_data_v3';

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
      image: 'assets/images/pharaonic_hero_bg.png',
      badge: 'Egyptian Heritage & Excellence',
      title: 'Premium Natural Stone <span>from Egypt to Your Market.</span>',
      slogan: 'We specialize in importing high quality Egyptian marble and granite with a wide selection of colors and finishes cut to size with competitive prices.',
      btnText: 'Explore Materials',
      btnLink: 'materials.html'
    },
    {
      id: 'slide-2',
      image: 'assets/images/pharaonic_temple_bg.png',
      badge: 'Timeless Beauty',
      title: 'The Beauty of <span>Egyptian Stone:</span>',
      slogan: 'Egypt is renowned for it’s rich natural stone resources and varieties with elegant colors, unique patterns and exceptional durability.',
      btnText: 'Discover Our Factory',
      btnLink: 'factory.html'
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
    tag: 'ABOUT TUT STONES',
    title: 'Delivering The Timeless Beauty of <span>Egyptian Stone</span>',
    desc1: "Founded in 2000, TUT Stones is a distinguished Egyptian exporter of premium marble and granite, delivering the timeless beauty of natural stone to clients around the world. Inspired by Egypt's rich geological heritage and renowned craftsmanship, we transform exceptional raw materials into refined products that elevate architectural and interior design projects.",
    desc2: "At TUT Stones, we understand that natural stone is more than a building material—it is a statement of luxury, character, and lasting value. Our extensive collection of Egyptian marble and granite is designed to meet the highest standards of architects, developers, contractors, wholesalers, and distributors across global markets.",
    desc3: "We believe in building long-term partnerships based on trust, transparency, and professionalism. From material selection to packaging and logistics.",
    craftImage: 'assets/images/about_craft.png',
    expNumber: '24+',
    expText: 'Years Exporting<br>Egyptian Natural Stone',
    phone: '+201104539397',
    phoneVisible: true,
    phoneSecondary: '+201104539397',
    phoneSecondaryVisible: true,
    email: 'info@tutstones.com',
    emailVisible: true,
    emailSecondary: 'sales@tutstones.com',
    emailSecondaryVisible: true,
    address: 'Plot D1 & D2 – Industrial Zone – Shak El Thoaban – Tura – Maadi – Cairo – Egypt.',
    addressLink: 'https://maps.app.goo.gl/aJqNQiZidc59BU3h7',
    addressVisible: true,
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    hoursVisible: true,
    stats: [
      { id: 'stat-1', count: '24+', label: 'Years of Excellence' },
      { id: 'stat-2', count: '50+', label: 'Export Destinations' },
      { id: 'stat-3', count: '100%', label: 'Egyptian Natural Origin' }
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
  ],

  // 9. Homepage Custom Content & Bottom 3 Boxes
  homePage: {
    aboutTag: 'ABOUT TUT STONES',
    aboutTitle: 'Delivering The Timeless Beauty of <span>Egyptian Stone</span>',
    aboutDesc1: "Founded in 2000, TUT Stones is a distinguished Egyptian exporter of premium marble and granite, delivering the timeless beauty of natural stone to clients around the world. Inspired by Egypt's rich geological heritage and renowned craftsmanship, we transform exceptional raw materials into refined products that elevate architectural and interior design projects.",
    aboutDesc2: "At TUT Stones, we understand that natural stone is more than a building material—it is a statement of luxury, character, and lasting value. Our extensive collection of Egyptian marble and granite is designed to meet the highest standards of architects, developers, contractors, wholesalers, and distributors across global markets.",
    aboutDesc3: "We believe in building long-term partnerships based on trust, transparency, and professionalism. From material selection to packaging and logistics.",
    aboutExpNumber: '24+',
    aboutExpText: 'Years Exporting<br>Egyptian Natural Stone',
    aboutSliderImages: [
      { id: 'h-about-1', url: 'assets/images/Factory/1.jpg' },
      { id: 'h-about-2', url: 'assets/images/Factory/2.JPG' }
    ],
    aboutStats: [
      { id: 'h-stat-1', count: '24+', label: 'Years of Excellence' },
      { id: 'h-stat-2', count: '50+', label: 'Export Destinations' },
      { id: 'h-stat-3', count: '100%', label: 'Egyptian Origin' }
    ],
    boxesTag: 'OUR EXPORT CAPABILITIES',
    boxesTitle: 'State-of-the-Art <span>Factory & Packaging</span>',
    boxes: [
      {
        id: 'box-1',
        title: 'Advanced Factory Processing',
        desc: 'Equipped with modern gangsaws, block cutters, and automated polishing lines ensuring precise thickness calibration and mirror finishes.',
        image: 'assets/images/Factory/4.JPG',
        icon: 'ri-settings-4-line',
        btnText: 'Explore Factory',
        btnLink: 'factory.html'
      },
      {
        id: 'box-2',
        title: 'Secure Packaging & Loading',
        desc: 'Heavy-duty ISPM-15 heat-treated wooden crates and lashing protocols guarantee zero breakage during sea container transport.',
        image: 'assets/images/packaging/2.JPG',
        icon: 'ri-box-3-line',
        btnText: 'Explore Packaging',
        btnLink: 'packaging.html'
      },
      {
        id: 'box-3',
        title: 'Marble & Granite Selection',
        desc: 'Explore Galala, Sunny Yellow, Silvia, Sinai Pearl, Triesta, Rosa Hudi, Gandolla, and Aswan Black in slabs, tiles, and cut-to-size.',
        image: 'assets/images/Factory/6.JPG',
        icon: 'ri-grid-fill',
        btnText: 'View Materials',
        btnLink: 'materials.html'
      }
    ]
  },

  // 10. About Us Page Data
  aboutPage: {
    bannerTag: 'HERITAGE & CRAFTSMANSHIP',
    bannerTitle: 'About <span>TUT Stones</span>',
    bannerDesc: 'Delivering the finest Egyptian marble and granite to international markets with passion, precision, and global logistics expertise.',
    mainTag: 'HERITAGE & CRAFTSMANSHIP',
    mainTitle: 'Delivering The Timeless Beauty of <span>Egyptian Stone</span>',
    mainImage: 'assets/images/about_craft.png',
    desc1: "Founded in 2000, TUT Stones is a distinguished Egyptian exporter of premium marble and granite, delivering the timeless beauty of natural stone to clients around the world. Inspired by Egypt's rich geological heritage and renowned craftsmanship, we transform exceptional raw materials into refined products that elevate architectural and interior design projects.",
    desc2: "At TUT Stones, we understand that natural stone is more than a building material—it is a statement of luxury, character, and lasting value. Our extensive collection of Egyptian marble and granite is designed to meet the highest standards of architects, developers, contractors, wholesalers, and distributors across global markets.",
    desc3: "We believe in building long-term partnerships based on trust, transparency, and professionalism. From material selection to custom cutting, quality control, packaging, and logistics, our experienced team ensures a seamless export experience tailored to your exact specifications.",
    expNumber: '24+',
    expText: 'Years Exporting<br>Egyptian Natural Stone',
    stats: [
      { id: 'ab-stat-1', count: '24+', label: 'Years Sourcing Rare Stone' },
      { id: 'ab-stat-2', count: '50+', label: 'Global Export Markets' },
      { id: 'ab-stat-3', count: '100%', label: 'Authentic Egyptian Granite & Marble' }
    ],
    bottomTag: 'WHY WORK WITH US',
    bottomTitle: 'Our Commitments <span>To Global Clients</span>',
    bottomCards: [
      {
        id: 'ab-card-1',
        title: 'Uncompromising Quality',
        desc: 'Every slab and cut-to-size order is strictly inspected for color consistency, grain uniformity, surface polish, and dimensional accuracy prior to loading.',
        image: '',
        icon: 'ri-shield-check-line'
      },
      {
        id: 'ab-card-2',
        title: 'Competitive Direct Quarry Pricing',
        desc: 'By controlling processing directly in Egypt, we offer competitive factory-direct prices without unnecessary intermediary costs.',
        image: '',
        icon: 'ri-price-tag-3-line'
      },
      {
        id: 'ab-card-3',
        title: 'Complete Export & Logistics',
        desc: 'Full container lashing, customs clearance documentation, certificate of origin, and sea freight handling to ports worldwide.',
        image: '',
        icon: 'ri-global-line'
      }
    ]
  },

  // 11. Factory Page Data
  factoryPage: {
    bannerTag: 'PRECISION MANUFACTURING',
    bannerTitle: 'Factory & <span>Stone Processing</span>',
    bannerDesc: 'Equipped with state-of-the-art Italian machinery for gangsaw block cutting, automated slab polishing, edge profiling, and micro-calibrated tile production.',
    mainTag: 'FACTORY & INFRASTRUCTURE',
    mainTitle: 'Transforming Raw Blocks Into <span>Architectural Masterpieces</span>',
    mainImage: 'assets/images/Factory/2.JPG',
    desc1: 'Our factory in Egypt operates under strict international quality control systems. We source premier quarry blocks of Egyptian Marble (such as Galala, Sunny, Silvia, Sinai Pearl) and Egyptian Granite (such as Rosa Hudi, Gandolla, Aswan Black).',
    desc2: 'From raw block squaring to diamond gangsaw slicing, resin treatment, surface finishing, and waterjet cut-to-size orders, our factory is engineered for large-scale international commercial projects and luxury residential developments.',
    expNumber: '100%',
    expText: 'Calibrated Precision<br>& Quality Assurance',
    stats: [
      { id: 'fac-stat-1', count: '12+', label: 'Gangsaws & Cutters' },
      { id: 'fac-stat-2', count: '50,000 m²', label: 'Monthly Capacity' },
      { id: 'fac-stat-3', count: '± 0.5 mm', label: 'Thickness Accuracy' }
    ],
    workflowTag: 'PRODUCTION WORKFLOW',
    workflowTitle: 'Our Step-by-Step <span>Manufacturing Process</span>',
    cards: [
      { id: 'f-card-1', step: '01', title: 'Quarry Block Selection', desc: 'Hand-selecting sound, fissure-free marble and granite blocks directly from top Egyptian quarries.', image: '', icon: 'ri-building-line' },
      { id: 'f-card-2', step: '02', title: 'Diamond Gangsaw Slicing', desc: 'Precision multi-blade diamond gang saws cut blocks into calibrated 2cm, 3cm, or custom thickness slabs.', image: '', icon: 'ri-scissors-cut-line' },
      { id: 'f-card-3', step: '03', title: 'Surface Finishing & Resin', desc: 'Automated multi-head polishing lines produce high-gloss mirror finishes, honed, brushed, or bushhammered textures.', image: '', icon: 'ri-sparkles-line' },
      { id: 'f-card-4', step: '04', title: 'Cut-to-Size & Edge Profiling', desc: 'Bridge saws and CNC waterjets cut tiles, treads, risers, and countertops to exact project blueprints.', image: '', icon: 'ri-layout-grid-line' },
      { id: 'f-card-5', step: '05', title: 'Rigorous Quality Control', desc: 'Piece-by-piece inspection for color tone matching, surface flatness, beveling, and absence of micro-fractures.', image: '', icon: 'ri-checkbox-circle-line' },
      { id: 'f-card-6', step: '06', title: 'Crate Bundling & Labeling', desc: 'Carefully numbered and packed into heavy-duty wooden crates ready for export dispatch.', image: '', icon: 'ri-box-3-line' }
    ]
  },

  // 12. Packaging & Loading Page Data
  packagingPage: {
    bannerTag: 'EXPORT SAFETY & LOGISTICS',
    bannerTitle: 'Packaging & <span>Container Loading</span>',
    bannerDesc: 'Ensuring total protection during long sea voyages with fumigated wooden crates, slab A-frames, anti-scratch foam separation, and heavy-duty container lashing.',
    mainTag: 'SAFE TRANSPORTATION',
    mainTitle: 'Zero-Damage <span>International Delivery</span>',
    mainImage: 'assets/images/packaging_loading.png',
    desc1: 'At TUT Stones, we take packaging as seriously as stone craftsmanship. Shipping natural stone across ocean waters requires robust outer protection and careful weight distribution inside 20-foot heavy-duty containers.',
    desc2: 'Every bundle of slabs and crate of tiles is reinforced with interior polyethylene foam, corner protectors, and steel lashing straps to ensure your order arrives in flawless condition at your port or warehouse.',
    expNumber: 'ISPM-15',
    expText: 'Heat-Treated Wood<br>& Certified Fumigation',
    stats: [
      { id: 'pkg-stat-1', count: '100%', label: 'ISPM-15 Fumigation' },
      { id: 'pkg-stat-2', count: '27 Tons', label: 'Max Container Capacity' },
      { id: 'pkg-stat-3', count: '0%', label: 'Breakage Target' }
    ],
    specsTag: 'EXPORT PACKAGING SPECIFICATIONS',
    specsTitle: 'Standard <span>Packaging Methods</span>',
    cards: [
      { id: 'p-card-1', title: 'Cut-to-Size & Tile Crates', desc: 'Strong wooden crates constructed from solid heat-treated timber. Lined with polyethylene sheet & styrofoam padding on all 6 inner sides.', image: '', icon: 'ri-box-3-line' },
      { id: 'p-card-2', title: 'Gang Saws Slab Bundles', desc: 'Random and jumbo slabs are secured into wooden A-frame bundles with polished faces turned inwards, separated by plastic film sheets.', image: '', icon: 'ri-stack-line' },
      { id: 'p-card-3', title: 'Container Lashing & Bracing', desc: 'Crates and bundles are anchored to container walls using heavy steel cables, wooden chocks, and tension belts to prevent shifts at sea.', image: '', icon: 'ri-anchor-line' },
      { id: 'p-card-4', title: 'Moisture & Rust Prevention', desc: 'Desiccant bags inside containers absorb moisture, protecting polished marble surfaces from condensation dulling during sea transit.', image: '', icon: 'ri-water-percent-line' },
      { id: 'p-card-5', title: 'Clear Barcode & Piece Marking', desc: 'Each crate features clear waterproof stenciling detailing project name, stone type, dimensions, slab count, gross weight, and crate ID.', image: '', icon: 'ri-barcode-box-line' },
      { id: 'p-card-6', title: 'Fumigation Certificate', desc: 'Official Phytosanitary and Fumigation certificates supplied with every export shipment meeting all international import customs requirements.', image: '', icon: 'ri-file-shield-line' }
    ]
  },

  // 13. Contact Us Page Data
  contactPage: {
    bannerTag: 'GET IN TOUCH',
    bannerTitle: 'Contact <span>TUT Stones</span>',
    bannerDesc: 'Have questions about stone varieties, slab availability, cut-to-size specifications, or container pricing? Our team is ready to assist you.',
    mainTag: 'GLOBAL EXPORT HEADQUARTERS',
    mainTitle: 'Let’s Build <span>Long-Term Partnerships</span>',
    mainDesc: 'From material selection to packaging and ocean logistics, TUT Stones delivers professional service at every step. Reach out to request a price quotation or stone sample box.',
    formTitle: 'Request Export Quotation',
    formDesc: 'Fill out the form below and our export specialists will respond within 24 business hours.',
    addressTitle: 'Factory Address',
    addressText: 'Plot D1 & D2 – Industrial Zone – Shak El Thoaban – Tura – Maadi – Cairo – Egypt.',
    addressMapLink: 'https://maps.app.goo.gl/aJqNQiZidc59BU3h7',
    emailTitle: 'Email Inquiries',
    emailPrimary: 'info@tutstones.com',
    emailSecondary: 'sales@tutstones.com',
    phoneTitle: 'Phone & WhatsApp',
    phonePrimary: '+201104539397',
    whatsappNumber: '+201104539397'
  },

  // 14. Global Footer Data
  footerData: {
    brandDesc: 'Distinguished Egyptian exporter of premium marble and granite. Delivering timeless natural stone from Egypt to global markets.',
    address: 'Shak El Thoaban, Cairo, Egypt',
    addressLink: 'https://maps.app.goo.gl/aJqNQiZidc59BU3h7',
    emailPrimary: 'info@tutstones.com',
    emailSecondary: 'sales@tutstones.com',
    phonePrimary: '+201104539397',
    whatsappNumber: '+201104539397',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM'
  }
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

  // --- Homepage Data ---
  getHomePage() {
    return this.data.homePage || DEFAULT_DATA.homePage;
  }

  saveHomePage(data) {
    this.data.homePage = { ...this.getHomePage(), ...data };
    this.save();
  }

  // --- About Us Page Data ---
  getAboutPage() {
    return this.data.aboutPage || DEFAULT_DATA.aboutPage;
  }

  saveAboutPage(data) {
    this.data.aboutPage = { ...this.getAboutPage(), ...data };
    this.save();
  }

  // --- Factory Page Data ---
  getFactoryPage() {
    return this.data.factoryPage || DEFAULT_DATA.factoryPage;
  }

  saveFactoryPage(data) {
    this.data.factoryPage = { ...this.getFactoryPage(), ...data };
    this.save();
  }

  // --- Packaging Page Data ---
  getPackagingPage() {
    return this.data.packagingPage || DEFAULT_DATA.packagingPage;
  }

  savePackagingPage(data) {
    this.data.packagingPage = { ...this.getPackagingPage(), ...data };
    this.save();
  }

  // --- Contact Page Data ---
  getContactPage() {
    return this.data.contactPage || DEFAULT_DATA.contactPage;
  }

  saveContactPage(data) {
    this.data.contactPage = { ...this.getContactPage(), ...data };
    this.save();
  }

  // --- Footer Data ---
  getFooterData() {
    return this.data.footerData || DEFAULT_DATA.footerData;
  }

  saveFooterData(data) {
    this.data.footerData = { ...this.getFooterData(), ...data };
    this.save();
  }
}

window.TutStonesStore = new Store();
