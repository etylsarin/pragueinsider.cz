---
name: Urban Authority
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4d453f'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7f756e'
  outline-variant: '#d0c4bb'
  surface-tint: '#6a5c4f'
  primary: '#42362b'
  on-primary: '#ffffff'
  primary-container: '#5a4d41'
  on-primary-container: '#d0beaf'
  inverse-primary: '#d6c3b4'
  secondary: '#00629e'
  on-secondary: '#ffffff'
  secondary-container: '#69b6fe'
  on-secondary-container: '#004673'
  tertiary: '#3f3828'
  on-tertiary: '#ffffff'
  tertiary-container: '#564f3d'
  on-tertiary-container: '#ccc1ab'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f2dfcf'
  primary-fixed-dim: '#d6c3b4'
  on-primary-fixed: '#231a10'
  on-primary-fixed-variant: '#514439'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#9acbff'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#004a79'
  tertiary-fixed: '#ede1ca'
  tertiary-fixed-dim: '#d0c5af'
  on-tertiary-fixed: '#201b0d'
  on-tertiary-fixed-variant: '#4d4635'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  warm-parchment: '#E9E3B4'
  slate-infrastructure: '#2D3436'
  brick-accent: '#B33939'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
  section-gap: 80px
---

## Brand & Style

The design system is engineered for **Prague Insider**, a platform dedicated to the sophisticated analysis of urban development, public transport, and the evolving architectural landscape of Prague. The brand personality is **authoritative, urban, and intellectually curious**. It moves away from the chaotic "tabloid" energy of standard news sites toward a **Modern Editorial** aesthetic that mirrors the precision of an architectural firm and the credibility of a legacy broadsheet.

The visual direction leverages a **Minimalist-Architectural** style. It emphasizes structured grid layouts, expansive white space to allow long-form journalism to breathe, and high-quality photography of the city’s public spaces. The interface should feel like a premium physical magazine translated perfectly into a digital environment—intentional, curated, and deeply grounded in the urban fabric.

## Colors

The palette is rooted in the "Architectural Neutrals" found in Prague’s stonework and infrastructure. 

- **Primary (Deep Umber):** Used for primary branding and headers to establish a grounded, historical authority.
- **Secondary (Vltava Blue):** A refined sky blue used sparingly for interactive elements, links, and public transport data visualizations.
- **Warm Parchment:** Utilized as a subtle background tint for featured editorial pieces to reduce eye strain and signal premium "long-read" content.
- **Slate Infrastructure:** The core neutral for text and UI borders, providing higher contrast and modern clarity against the softer primary tones.

Use **Brick Accent** exclusively for critical alerts, "Breaking" tags, or to highlight specific urban development zones on maps.

## Typography

The typographic strategy balances **literary authority** with **technical precision**.

- **Headlines (Source Serif 4):** A professional, sturdy serif that conveys historical weight. Use tight letter-spacing for large display sizes to create a "front-page" impact.
- **Body Text (Hanken Grotesk):** A clean, modern sans-serif designed for high legibility in long-form reading. It provides a contemporary counterpoint to the traditional headlines.
- **Labels & Data (JetBrains Mono):** Monospaced type is used for categories, timestamps, and technical data points (like tram line numbers or project IDs). This reinforces the "urban planning/technical" nature of the content.

Maintain a strict vertical rhythm. All line heights are optimized for a 4px baseline grid to ensure a structured, news-like density.

## Layout & Spacing

The layout is governed by a **12-column rigid grid** on desktop and a **4-column grid** on mobile. 

- **Editorial Density:** On article pages, use a centered 8-column layout for text to maintain an optimal line length (65-75 characters). The remaining columns are reserved for "Contextual Sidebars" containing maps, related stats, or transport updates.
- **Section Gaps:** Use generous vertical spacing (`section-gap`) between different news categories (e.g., separating 'Public Spaces' from 'Infrastructure') to prevent visual clutter.
- **Information Hierarchy:** Use `stack-md` for spacing between article headlines and metadata, and `stack-lg` between distinct article cards in a feed.

## Elevation & Depth

To maintain a sophisticated, "flat-print" editorial feel, this design system avoids heavy drop shadows.

- **Tonal Layers:** Depth is created through background color shifts. Use `warm-parchment` for featured sections to pull them forward visually against the white background.
- **Low-Contrast Outlines:** Use 1px borders in `tertiary_color_hex` (80% opacity) for card containers and input fields. This mimics the clean lines of architectural drawings.
- **Subtle Elevation:** For interactive elements like "Hovered Cards," use a very soft, tinted shadow (e.g., 4% opacity of the Primary color) to provide tactile feedback without breaking the minimalist aesthetic.

## Shapes

The shape language is **Sharp (0px)**. 

To reflect the hard lines of urban architecture and the structured nature of news reporting, all UI elements—buttons, cards, images, and input fields—utilize square corners. This provides a serious, institutional, and high-fashion editorial look. Avoid any rounded corners, as they soften the authoritative tone required for the brand.

## Components

- **Article Cards:** Use a vertical layout for main feeds with high-aspect-ratio images (16:9). Metadata (Category, Time) should use the `label-caps` style above the headline.
- **Navigation Bar:** A fixed top-level navigation with a transparent background that transitions to a solid `primary_color_hex` on scroll. Use the logo prominently centered or left-aligned.
- **Interactive Development Map:** A signature component. Map markers should be clean geometric shapes using the `secondary_color_hex`.
- **Buttons:** Use a "Ghost" style for secondary actions (1px border, no fill) and a solid `primary_color_hex` for primary CTAs (e.g., "Subscribe" or "Read Full Report").
- **Category Chips:** Rectangular boxes with 1px borders using `label-caps` typography. The active category should have a solid `slate-infrastructure` background with white text.
- **Input Fields:** Minimalist design with only a bottom border that thickens by 1px on focus, keeping the interface feeling lightweight and professional.