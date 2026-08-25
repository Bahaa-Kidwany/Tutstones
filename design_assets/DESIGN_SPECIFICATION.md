# TUT STONES — Brand & Design Assets Specification

> **Official Design Guide & Assets Index**  
> *Exporter of Premium Egyptian Marble & Granite to Global Markets*

---

## 1. Brand Identity & Design Philosophy

TUT Stones combines **Egypt’s 5,000-year geological heritage** with **modern luxury architectural design**. The visual language is defined by rich stone textures, high-contrast dark modes, elegant Pharaonic color pigments (Terracotta Red, Nile Lapis Blue, Egyptian Gold), and classical typography.

---

## 2. Color Palettes & Color Schemes

The website features a dynamic 3-theme palette switcher located in the top header navigation bar.

### Theme 1: Default Luxury (Noir & Gold)
*Used for modern international architecture presentations with dark glassmorphism.*

| Token Name | Hex Code | RGB Value | Usage |
| :--- | :--- | :--- | :--- |
| **Gold Primary** | `#D4AF37` | `rgb(212, 175, 55)` | Primary CTAs, active states, highlighted titles |
| **Gold Hover** | `#E5C158` | `rgb(229, 193, 88)` | Button hover glow & focused input borders |
| **Gold Muted** | `rgba(212,175,55,0.15)` | — | Section tag pill backgrounds |
| **Background Dark** | `#0B0C0E` | `rgb(11, 12, 14)` | Global page body background |
| **Card Background** | `#14161A` | `rgb(20, 22, 26)` | Feature cards, modals, dropdowns |
| **Surface Glass** | `rgba(20, 22, 26, 0.75)` | — | Backdrop filter blurred navigation header |
| **Text Primary** | `#F3F4F6` | `rgb(243, 244, 246)` | Main heading & body text |
| **Text Muted** | `#9CA3AF` | `rgb(156, 163, 175)` | Secondary subtitles & card body copy |

---

### Theme 2: Eastern Elegance (Sand & Bronze)
*Inspired by natural Egyptian desert sands and polished travertine stone.*

| Token Name | Hex Code | RGB Value | Usage |
| :--- | :--- | :--- | :--- |
| **Bronze Primary** | `#A67C52` | `rgb(166, 124, 82)` | Primary buttons & title spans |
| **Terracotta Accent**| `#8C5A47` | `rgb(140, 90, 71)` | Active badges & highlighted borders |
| **Background Sand** | `#FDFBF7` | `rgb(253, 251, 247)` | Warm sandstone page background |
| **Card Sandstone** | `#F5EFEB` | `rgb(245, 239, 235)` | Light card containers & modal body |
| **Text Dark** | `#2A2421` | `rgb(42, 36, 33)` | High contrast body typography |

---

### Theme 3: Pharaonic Heritage (Egyptian Pigments)
*Directly derived from ancient Egyptian temple wall frescoes, lapis lazuli, red ochre, and papyrus.*

| Token Name | Hex Code | RGB Value | Usage |
| :--- | :--- | :--- | :--- |
| **Egyptian Terracotta**| `#8D4F4E` | `rgb(141, 79, 78)` | Badges, card borders, primary accents |
| **Nile Lapis Blue** | `#567394` | `rgb(86, 115, 148)` | Subheaders, experience badges, secondary icons |
| **Egyptian Gold** | `#DFB77D` | `rgb(223, 183, 125)` | Header borders, slider indicators, highlights |
| **Papyrus Base** | `#F5E9D8` | `rgb(245, 233, 216)` | Warm papyrus light background |
| **Sandstone White** | `#FFFDF5` | `rgb(255, 253, 245)` | Card backgrounds & hero badge containers |
| **Hieroglyph Brown** | `#241C18` | `rgb(36, 28, 24)` | Primary readable body text |

---

## 3. Typography Hierarchy

Imported via Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```

| Element | Font Family | Weight | Size | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `Cormorant Garamond`, Georgia, serif | `700` | `3.5rem` (`56px`) | Main home slider & page hero titles |
| **Section Title** | `Cormorant Garamond`, Georgia, serif | `600` | `2.75rem` (`44px`)| Section headers (`.section-title`) |
| **Pharaonic Accent**| `Cinzel`, `Cinzel Decorative`, serif | `700` | `2.2rem` (`35px`)| Theme 3 decorative titles |
| **Body Copy** | `Plus Jakarta Sans`, sans-serif | `400 / 500` | `1.0rem` (`16px`) | Paragraphs & technical specifications |
| **Section Tag** | `Plus Jakarta Sans`, sans-serif | `600 / 700` | `0.825rem` (`13px`)| Uppercase pill tags (`.section-tag`) |
| **Button Text** | `Plus Jakarta Sans`, sans-serif | `600` | `0.95rem` (`15px`)| Interactive CTAs & dropdown links |

---

## 4. Design Assets Directory Index (`design_assets/`)

All high-resolution visual assets used across the TUT Stones web application are stored in `design_assets/`:

| Filename | Type | Description |
| :--- | :--- | :--- |
| `tut_stones_logo.png` | PNG | Original brand logo |
| `tut_stones_logo_without_background.png` | PNG (Transparent) | Brand logo with transparent background for dark/light headers |
| `tut_stones_logo_with_background.png` | PNG | Luxury brand logo set on dark stone background texture |
| `pharaonic_temple_bg.png` | PNG (1920x1080) | Karnak Pharaonic Temple background for Hero Slide 1 |
| `egyptian_stone_beauty_bg.png` | PNG (1920x1080) | Egyptian Pyramids & stone relief background for Hero Slide 2 |
| `pharaonic_hero_bg.png` | PNG | Ancient Egyptian tomb columns & relief texture |
| `factory_processing.png` | PNG (1920x1080) | Industrial gangsaw machinery & automated polishing line image |
| `packaging_loading.png` | PNG (1920x1080) | ISPM-15 wooden crate packaging & container lashing preview |
| `about_craft.png` | PNG | Egyptian stonemasonry craftsmanship feature image |
| `pharaonic_bg_home.png` | PNG | Header background banner texture for Home page |
| `pharaonic_bg_about.png` | PNG | Header background banner texture for About Us page |
| `pharaonic_bg_factory.png` | PNG | Header background banner texture for Factory page |
| `pharaonic_bg_packaging.png` | PNG | Header background banner texture for Packaging page |
| `pharaonic_bg_materials.png` | PNG | Header background banner texture for Materials page |
| `pharaonic_bg_contact.png` | PNG | Header background banner texture for Contact page |
| `pharaonic_bg_catalogue.png` | PNG | Header background banner texture for Catalogue page |
| `hero_slider_1.png` | PNG | Modern luxury marble architectural interior slide |
| `hero_slider_2.png` | PNG | Egyptian stone quarry landscape slide |
| `hero_slider_3.png` | PNG | Slab finishing factory slide |
| `marble_calacatta.png` | PNG | High-res sample tile for Egyptian Galala / Calacatta Marble |
| `marble_carrara.png` | PNG | High-res sample tile for White Marble |
| `granite_black_galaxy.png` | PNG | High-res sample tile for Egyptian Aswan / Black Granite |
| `granite_blue_pearl.png` | PNG | High-res sample tile for Blue/Grey Egyptian Granite |
| `eastern_mosaic_hero_bg.png` | PNG | Geometric mosaic background pattern for sub-banners |

---

## 5. UI Component Guidelines

### Buttons (`.btn`)
- **Primary Button (`.btn-primary`)**:
  - Background: `linear-gradient(135deg, #D4AF37 0%, #B89025 100%)` (Default) / `#8D4F4E` (Pharaonic)
  - Color: `#000000` (Default) / `#FFFFFF` (Pharaonic)
  - Border-Radius: `var(--radius-full)` (`9999px`)
  - Padding: `0.9rem 2rem` (`0.6rem 1.2rem` for header nav)

### Cards (`.feature-card`, `.process-card`, `.loading-card`)
- Background: `var(--color-bg-card)` (`#14161A`)
- Border: `1px solid var(--color-border-gold)`
- Radius: `var(--radius-md)` (`12px`)
- Box Shadow: `0 10px 30px -5px rgba(0, 0, 0, 0.7)`

### Icons
- **Library**: Remix Icon 3.5.0 (`ri-*`)
- **Primary Color**: `#D4AF37` (Gold) / `#8D4F4E` (Terracotta) / `#567394` (Lapis Blue)
