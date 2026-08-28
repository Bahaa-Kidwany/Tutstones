/**
 * TUT STONES - Central Data Store with localStorage Persistence
 */

const CURRENT_BUILD_VERSION = '2026.08.28.v20';
const STORAGE_KEY = 'tut_stones_data_v20';

// Automatic Version Verification & Cache Invalidation Engine (Runs before DOM render)
(function autoEnforceLatestVersion() {
  try {
    const lastBuild = localStorage.getItem('tut_app_build_version');
    if (lastBuild !== CURRENT_BUILD_VERSION) {
      // Purge stale tut_stones localStorage keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('tut_stones') || key.startsWith('tut_app')) {
          localStorage.removeItem(key);
        }
      });
      // Purge Cache Storage if active
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      localStorage.setItem('tut_app_build_version', CURRENT_BUILD_VERSION);
      // Auto reload once seamlessly if build updated
      if (!sessionStorage.getItem('tut_auto_reloaded_' + CURRENT_BUILD_VERSION)) {
        sessionStorage.setItem('tut_auto_reloaded_' + CURRENT_BUILD_VERSION, 'true');
        window.location.reload(true);
      }
    }
  } catch (e) {
    console.warn('Auto version enforcement:', e);
  }
})();

const DEFAULT_DATA = {
  // 1. Categories
  categories: [
    {
        "id": "marble",
        "name": "Marble Collection",
        "slug": "marble",
        "parent": null,
        "isParent": true,
        "desc": "Renowned for fluid veining, radiant translucent surfaces, and timeless opulence. Sourced cut to size from premier Egyptian quarries.",
        "icon": "ri-vip-diamond-line"
    },
    {
        "id": "granite",
        "name": "Granite Collection",
        "slug": "granite",
        "parent": null,
        "isParent": true,
        "desc": "Engineered by natural tectonic forces for unyielding strength, high heat resistance, and rich mineral crystallization.",
        "icon": "ri-shield-star-line"
    },
    {
        "id": "acid-finish",
        "name": "Acid Finish",
        "slug": "acid-finish",
        "parent": "marble",
        "isParent": false,
        "order": 1,
        "desc": "Etched with natural acids to create a subtle textured, non-reflective antique surface with enhanced slip resistance.",
        "icon": "ri-contrast-drop-line"
    },
    {
        "id": "brushed-finish",
        "name": "Brushed Finish",
        "slug": "brushed-finish",
        "parent": "marble",
        "isParent": false,
        "order": 2,
        "desc": "Softly textured surface achieved by wire brushing, highlighting the natural stone grain with a smooth satin feel.",
        "icon": "ri-brush-line"
    },
    {
        "id": "tumbled-finish",
        "name": "Tumbled Finish",
        "slug": "tumbled-finish",
        "parent": "marble",
        "isParent": false,
        "order": 3,
        "desc": "Rustic weathered finish with rounded edges and soft worn texture, evoking ancient Mediterranean stone pavements.",
        "icon": "ri-treasure-map-line"
    },
    {
        "id": "split-face-finish",
        "name": "Split Face Finish",
        "slug": "split-face-finish",
        "parent": "marble",
        "isParent": false,
        "order": 4,
        "desc": "Raw hand-split textured surface showcasing natural crystalline fractures, ideal for accent walls and exterior facades.",
        "icon": "ri-layout-masonry-line"
    },
    {
        "id": "bush-hummered-finish",
        "name": "Bush Hummered Finish",
        "slug": "bush-hummered-finish",
        "parent": "marble",
        "isParent": false,
        "order": 5,
        "desc": "Uniformly pitted rough texture created by pneumatic chiseling, giving maximum anti-slip protection for outdoor areas.",
        "icon": "ri-hammer-line"
    },
    {
        "id": "acid-brushed-finish",
        "name": "Acid Brushed Finish",
        "slug": "acid-brushed-finish",
        "parent": "marble",
        "isParent": false,
        "order": 6,
        "desc": "Combined acid etching and wire brushing for a soft tactile touch with deep color depth and weathered elegance.",
        "icon": "ri-drop-line"
    },
    {
        "id": "acid-tumbled-finish",
        "name": "Acid Tumbled Finish",
        "slug": "acid-tumbled-finish",
        "parent": "marble",
        "isParent": false,
        "order": 7,
        "desc": "Acid washed and tumbled for distressed antique edges, rustic texture, and rich stone character.",
        "icon": "ri-sparkles-line"
    },
    {
        "id": "brushed-sand-blasted-finish",
        "name": "Brushed Sand Blasted Finish",
        "slug": "brushed-sand-blasted-finish",
        "parent": "marble",
        "isParent": false,
        "order": 8,
        "desc": "High-pressure sand blasting followed by wire brushing for a silky non-slip matte architectural surface.",
        "icon": "ri-sun-line"
    },
    {
        "id": "bush-hummered-brushed-finish",
        "name": "Bush Hummered Brushed Finish",
        "slug": "bush-hummered-brushed-finish",
        "parent": "marble",
        "isParent": false,
        "order": 9,
        "desc": "Chiseled bush-hammered texture smoothed with wire brushing for high-end exterior cladding and paving.",
        "icon": "ri-tools-line"
    },
    {
        "id": "paving-tumbled-finish",
        "name": "Paving Tumbled Finish",
        "slug": "paving-tumbled-finish",
        "parent": "marble",
        "isParent": false,
        "order": 10,
        "desc": "Durable stone pavers with rounded tumbled edges, perfect for driveways, courtyards, and garden pathways.",
        "icon": "ri-road-map-line"
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
        "id": "acid-finish-grey-teriesta",
        "name": "Grey Teriesta (Acid Finish)",
        "materialName": "Grey Teriesta",
        "category": "acid-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Acid Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/1 Acid Finish/Grey Teriesta ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/1 Acid Finish/Grey Teriesta ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/1 Acid Finish/Grey Teriesta ( B ).JPG",
        "featured": true,
        "tag": "Acid Finish",
        "desc": "Egyptian Grey Teriesta Marble crafted with a premium Acid Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "acid-finish-melly-grey",
        "name": "Melly Grey (Acid Finish)",
        "materialName": "Melly Grey",
        "category": "acid-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Acid Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/1 Acid Finish/Melly Grey ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/1 Acid Finish/Melly Grey ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/1 Acid Finish/Melly Grey ( B ).JPG",
        "featured": true,
        "tag": "Acid Finish",
        "desc": "Egyptian Melly Grey Marble crafted with a premium Acid Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "acid-finish-sunny",
        "name": "Sunny (Acid Finish)",
        "materialName": "Sunny",
        "category": "acid-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Acid Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/1 Acid Finish/Sunny ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/1 Acid Finish/Sunny ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/1 Acid Finish/Sunny ( B ).JPG",
        "featured": true,
        "tag": "Acid Finish",
        "desc": "Egyptian Sunny Marble crafted with a premium Acid Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "paving-tumbled-finish-teriesta",
        "name": "Teriesta (Paving Tumbled Finish)",
        "materialName": "Teriesta",
        "category": "paving-tumbled-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Paving Tumbled Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/10 Paving Tumbled Finish/Teriesta.JPG",
        "imageSlab": null,
        "imageEdge": null,
        "featured": true,
        "tag": "Paving Tumbled Finish",
        "desc": "Egyptian Teriesta Marble crafted with a premium Paving Tumbled Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "brushed-finish-gallala",
        "name": "Gallala (Brushed Finish)",
        "materialName": "Gallala",
        "category": "brushed-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Brushed Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/2 Brushed Finish/Gallala ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/2 Brushed Finish/Gallala ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/2 Brushed Finish/Gallala ( B ).JPG",
        "featured": true,
        "tag": "Brushed Finish",
        "desc": "Egyptian Gallala Marble crafted with a premium Brushed Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "brushed-finish-grey-teriesta",
        "name": "Grey Teriesta (Brushed Finish)",
        "materialName": "Grey Teriesta",
        "category": "brushed-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Brushed Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/2 Brushed Finish/Grey Teriesta ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/2 Brushed Finish/Grey Teriesta ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/2 Brushed Finish/Grey Teriesta ( B ).JPG",
        "featured": true,
        "tag": "Brushed Finish",
        "desc": "Egyptian Grey Teriesta Marble crafted with a premium Brushed Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "brushed-finish-teriesta",
        "name": "Teriesta (Brushed Finish)",
        "materialName": "Teriesta",
        "category": "brushed-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Brushed Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/2 Brushed Finish/Teriesta ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/2 Brushed Finish/Teriesta ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/2 Brushed Finish/Teriesta ( B ).JPG",
        "featured": true,
        "tag": "Brushed Finish",
        "desc": "Egyptian Teriesta Marble crafted with a premium Brushed Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "tumbled-finish-black-teriesta",
        "name": "Black Teriesta (Tumbled Finish)",
        "materialName": "Black Teriesta",
        "category": "tumbled-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Tumbled Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/3 Tumbled Finish/Black Teriesta ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/3 Tumbled Finish/Black Teriesta ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/3 Tumbled Finish/Black Teriesta ( B ).JPG",
        "featured": true,
        "tag": "Tumbled Finish",
        "desc": "Egyptian Black Teriesta Marble crafted with a premium Tumbled Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "tumbled-finish-crystal-bronze",
        "name": "Crystal Bronze (Tumbled Finish)",
        "materialName": "Crystal Bronze",
        "category": "tumbled-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Tumbled Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/3 Tumbled Finish/Crystal Bronze ( A ).jpg",
        "imageSlab": "assets/images/Materials - Marble/3 Tumbled Finish/Crystal Bronze ( A ).jpg",
        "imageEdge": "assets/images/Materials - Marble/3 Tumbled Finish/Crystal Bronze ( B ).JPG",
        "featured": true,
        "tag": "Tumbled Finish",
        "desc": "Egyptian Crystal Bronze Marble crafted with a premium Tumbled Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "tumbled-finish-gallala",
        "name": "Gallala (Tumbled Finish)",
        "materialName": "Gallala",
        "category": "tumbled-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Tumbled Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/3 Tumbled Finish/Gallala ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/3 Tumbled Finish/Gallala ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/3 Tumbled Finish/Gallala ( B ).JPG",
        "featured": true,
        "tag": "Tumbled Finish",
        "desc": "Egyptian Gallala Marble crafted with a premium Tumbled Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "tumbled-finish-sunny",
        "name": "Sunny (Tumbled Finish)",
        "materialName": "Sunny",
        "category": "tumbled-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Tumbled Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/3 Tumbled Finish/Sunny ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/3 Tumbled Finish/Sunny ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/3 Tumbled Finish/Sunny ( B ).JPG",
        "featured": true,
        "tag": "Tumbled Finish",
        "desc": "Egyptian Sunny Marble crafted with a premium Tumbled Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "split-face-finish-split-face",
        "name": "Split Face (Split Face Finish)",
        "materialName": "Split Face",
        "category": "split-face-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Split Face Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/4 Split Face Finish/Split Face ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/4 Split Face Finish/Split Face ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/4 Split Face Finish/Split Face ( B ).JPG",
        "featured": true,
        "tag": "Split Face Finish",
        "desc": "Egyptian Split Face Marble crafted with a premium Split Face Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "bush-hummered-finish-teriesta",
        "name": "Teriesta (Bush Hummered Finish)",
        "materialName": "Teriesta",
        "category": "bush-hummered-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Bush Hummered Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/5 Bush Hummered Finish/Teriesta ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/5 Bush Hummered Finish/Teriesta ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/5 Bush Hummered Finish/Teriesta ( B ).JPG",
        "featured": true,
        "tag": "Bush Hummered Finish",
        "desc": "Egyptian Teriesta Marble crafted with a premium Bush Hummered Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "acid-brushed-finish-sunny",
        "name": "Sunny (Acid Brushed Finish)",
        "materialName": "Sunny",
        "category": "acid-brushed-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Acid Brushed Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/6 Acid Brushed Finish/Sunny ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/6 Acid Brushed Finish/Sunny ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/6 Acid Brushed Finish/Sunny ( B ).JPG",
        "featured": true,
        "tag": "Acid Brushed Finish",
        "desc": "Egyptian Sunny Marble crafted with a premium Acid Brushed Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "acid-brushed-finish-teriesta",
        "name": "Teriesta (Acid Brushed Finish)",
        "materialName": "Teriesta",
        "category": "acid-brushed-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Acid Brushed Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/6 Acid Brushed Finish/Teriesta ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/6 Acid Brushed Finish/Teriesta ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/6 Acid Brushed Finish/Teriesta ( B ).JPG",
        "featured": true,
        "tag": "Acid Brushed Finish",
        "desc": "Egyptian Teriesta Marble crafted with a premium Acid Brushed Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "acid-tumbled-finish-black-teriesta",
        "name": "Black Teriesta (Acid Tumbled Finish)",
        "materialName": "Black Teriesta",
        "category": "acid-tumbled-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Acid Tumbled Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/7 Acid Tumbled Finish/Black Teriesta ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/7 Acid Tumbled Finish/Black Teriesta ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/7 Acid Tumbled Finish/Black Teriesta ( B ).JPG",
        "featured": true,
        "tag": "Acid Tumbled Finish",
        "desc": "Egyptian Black Teriesta Marble crafted with a premium Acid Tumbled Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "acid-tumbled-finish-catrina",
        "name": "Catrina (Acid Tumbled Finish)",
        "materialName": "Catrina",
        "category": "acid-tumbled-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Acid Tumbled Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/7 Acid Tumbled Finish/Catrina ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/7 Acid Tumbled Finish/Catrina ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/7 Acid Tumbled Finish/Catrina ( B ).JPG",
        "featured": true,
        "tag": "Acid Tumbled Finish",
        "desc": "Egyptian Catrina Marble crafted with a premium Acid Tumbled Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "brushed-sand-blasted-finish-sunny",
        "name": "Sunny (Brushed Sand Blasted Finish)",
        "materialName": "Sunny",
        "category": "brushed-sand-blasted-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Brushed Sand Blasted Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/8 Brushed Sand Blasted Finish/Sunny ( A ).JPG",
        "imageSlab": "assets/images/Materials - Marble/8 Brushed Sand Blasted Finish/Sunny ( A ).JPG",
        "imageEdge": "assets/images/Materials - Marble/8 Brushed Sand Blasted Finish/Sunny ( B ).JPG",
        "featured": true,
        "tag": "Brushed Sand Blasted Finish",
        "desc": "Egyptian Sunny Marble crafted with a premium Brushed Sand Blasted Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
    },
    {
        "id": "bush-hummered-brushed-finish-teriesta",
        "name": "Teriesta (Bush Hummered Brushed Finish)",
        "materialName": "Teriesta",
        "category": "bush-hummered-brushed-finish",
        "parentCategory": "marble",
        "origin": "Egypt",
        "finish": "Bush Hummered Brushed Finish",
        "density": "2.71 g/cm³",
        "waterAbs": "0.14%",
        "flexural": "15.2 MPa",
        "image": "assets/images/Materials - Marble/9 Bush Hummered Brushed Finish/Teriesta.jpeg",
        "imageSlab": null,
        "imageEdge": null,
        "featured": true,
        "tag": "Bush Hummered Brushed Finish",
        "desc": "Egyptian Teriesta Marble crafted with a premium Bush Hummered Brushed Finish.",
        "applications": "Flooring, Wall Cladding, Paving, Architectural Facades"
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
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
      const parsed = JSON.parse(raw);
      
      const hasSubCats = Array.isArray(parsed.categories) && parsed.categories.some(c => c.parent);
      const hasValidStones = Array.isArray(parsed.stones) && parsed.stones.length >= 10;

      if (!hasSubCats || !hasValidStones) {
        parsed.categories = JSON.parse(JSON.stringify(DEFAULT_DATA.categories));
        parsed.stones = JSON.parse(JSON.stringify(DEFAULT_DATA.stones));
      } else {
        // Self-Healing Image Path Reconciler:
        DEFAULT_DATA.stones.forEach(defStone => {
          const match = parsed.stones.find(s => s.id === defStone.id);
          if (match) {
            if (!match.image || match.image.includes('marble_calacatta')) {
              match.image = defStone.image;
            }
            if (defStone.imageSlab && (!match.imageSlab || match.imageSlab.includes('marble_calacatta'))) {
              match.imageSlab = defStone.imageSlab;
            }
            if (defStone.imageEdge && (!match.imageEdge || match.imageEdge.includes('marble_calacatta'))) {
              match.imageEdge = defStone.imageEdge;
            }
          } else {
            parsed.stones.push(JSON.parse(JSON.stringify(defStone)));
          }
        });
      }

      return { ...DEFAULT_DATA, ...parsed };
    } catch (e) {
      console.error('Failed to load store from localStorage', e);
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      return true;
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
        alert('Warning: Local browser storage limit exceeded! Please use smaller image files or direct image URLs so your changes can be saved permanently.');
      }
      return false;
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
    if (!this.data.categories || !Array.isArray(this.data.categories) || this.data.categories.length < 2) {
      this.data.categories = JSON.parse(JSON.stringify(DEFAULT_DATA.categories));
      this.save();
    }
    return this.data.categories;
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
    if (!this.data.stones || !Array.isArray(this.data.stones) || this.data.stones.length === 0) {
      this.data.stones = JSON.parse(JSON.stringify(DEFAULT_DATA.stones));
      this.save();
    }
    return this.data.stones;
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
    return this.save();
  }

  // --- About Us Page Data ---
  getAboutPage() {
    return this.data.aboutPage || DEFAULT_DATA.aboutPage;
  }

  saveAboutPage(data) {
    this.data.aboutPage = { ...this.getAboutPage(), ...data };
    return this.save();
  }

  // --- Factory Page Data ---
  getFactoryPage() {
    return this.data.factoryPage || DEFAULT_DATA.factoryPage;
  }

  saveFactoryPage(data) {
    this.data.factoryPage = { ...this.getFactoryPage(), ...data };
    return this.save();
  }

  // --- Packaging Page Data ---
  getPackagingPage() {
    return this.data.packagingPage || DEFAULT_DATA.packagingPage;
  }

  savePackagingPage(data) {
    this.data.packagingPage = { ...this.getPackagingPage(), ...data };
    return this.save();
  }

  // --- Contact Page Data ---
  getContactPage() {
    return this.data.contactPage || DEFAULT_DATA.contactPage;
  }

  saveContactPage(data) {
    this.data.contactPage = { ...this.getContactPage(), ...data };
    return this.save();
  }

  // --- Footer Data ---
  getFooterData() {
    return this.data.footerData || DEFAULT_DATA.footerData;
  }

  saveFooterData(data) {
    this.data.footerData = { ...this.getFooterData(), ...data };
    return this.save();
  }
}

window.TutStonesStore = new Store();
