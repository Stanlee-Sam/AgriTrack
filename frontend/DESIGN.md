---
name: AgriTrack Identity
colors:
  surface: '#f6f9ff'
  surface-dim: '#d4dbe3'
  surface-bright: '#f6f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4fd'
  surface-container: '#e8eef7'
  surface-container-high: '#e2e9f1'
  surface-container-highest: '#dce3ec'
  on-surface: '#151c22'
  on-surface-variant: '#404943'
  inverse-surface: '#2a3138'
  inverse-on-surface: '#ebf1fa'
  outline: '#707973'
  outline-variant: '#bfc9c1'
  surface-tint: '#2c694e'
  primary: '#0f5238'
  on-primary: '#ffffff'
  primary-container: '#2d6a4f'
  on-primary-container: '#a8e7c5'
  inverse-primary: '#95d4b3'
  secondary: '#0e6c4a'
  on-secondary: '#ffffff'
  secondary-container: '#a0f4c8'
  on-secondary-container: '#19724f'
  tertiary: '#274f3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f6754'
  on-tertiary-container: '#b8e3cb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f0ce'
  primary-fixed-dim: '#95d4b3'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#0e5138'
  secondary-fixed: '#a0f4c8'
  secondary-fixed-dim: '#85d7ad'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#c1ecd4'
  tertiary-fixed-dim: '#a5d0b9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#274e3d'
  background: '#f6f9ff'
  on-background: '#151c22'
  surface-variant: '#dce3ec'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is anchored in the concept of "Digital Agronomy"—the intersection of organic growth and high-precision data. It aims to evoke a sense of reliability, environmental stewardship, and technological sophistication. The target audience includes modern farm managers and agricultural analysts who require clarity and efficiency in complex data environments.

The visual style is **Corporate Modern with Minimalist influences**. It leverages generous whitespace to reduce cognitive load and emphasizes a clear information hierarchy. By stripping away unnecessary ornamentation, the design system ensures that critical agricultural metrics remain the focal point, creating an atmosphere of professional calm and operational control.

## Colors

The color palette is derived from the lifecycle of healthy crops. The primary color is a **Professional Leaf Green**, specifically chosen for its high legibility and association with vitality and stable growth. 

- **Primary (#2D6A4F):** Used for main actions, active states, and brand identifiers.
- **Secondary (#74C69D):** A softer green used for accents, progress bars, and success states.
- **Tertiary (#1B4332):** A deep evergreen for high-contrast text and dark backgrounds.
- **Neutral Palette:** Utilizes cool grays and off-whites to provide a clean, non-distracting canvas for the green accents. Backgrounds should primarily use a soft white (#F8F9FA) to minimize eye strain.

## Typography

The design system utilizes **Manrope** as the sole typeface. This font was selected for its modern, balanced proportions and geometric clarity, making it highly effective for both large headlines and dense data tables.

Headlines use a tighter letter-spacing and heavier weights to establish a bold presence, while body text maintains a generous line height (1.6) to ensure readability during extended periods of monitoring. Data labels and captions use semi-bold weights to remain distinct even at smaller scales, ensuring that units of measurement and field identifiers are never missed.

## Layout & Spacing

The design system employs a **12-column fluid grid** for high-level dashboard layouts, allowing the interface to scale seamlessly across tablets and desktop monitors used in the field. 

Spacing is based on an **8px linear scale**, promoting mathematical harmony between elements. Content containers utilize 24px gutters to prevent visual crowding. For specialized data views, a "compact mode" can be toggled which reduces the base unit to 4px, allowing for higher information density without compromising the underlying structural logic.

## Elevation & Depth

This design system uses **Ambient Shadows** to create a sense of organized layering. Rather than harsh, high-contrast shadows, we use extra-diffused, low-opacity shadows with a subtle green tint (`rgba(45, 106, 79, 0.08)`) to tie the depth effects back to the brand color.

- **Level 0 (Surface):** The main background, completely flat.
- **Level 1 (Cards/Inputs):** A soft, wide-spread shadow (12px blur) to lift interactive modules off the page.
- **Level 2 (Modals/Dropdowns):** A more pronounced shadow (24px blur) with a slight vertical offset to indicate temporary overlay and priority.

Surfaces should primarily be solid colors; avoid gradients to maintain the minimalist aesthetic.

## Shapes

The shape language is characterized by **Level 2 (Rounded)** corners. This specific radius (0.5rem / 8px for standard elements) strikes a balance between the precision of a grid and the organic nature of agriculture.

- **Buttons & Inputs:** Use the standard 8px radius.
- **Cards:** Utilize the `rounded-lg` (16px) or `rounded-xl` (24px) property to create soft, approachable containers for data.
- **Selection Indicators:** Small indicators (like checkbox inner marks) maintain a smaller 2px radius to preserve detail at small scales.

## Components

### Buttons
Primary buttons use the Professional Leaf Green background with white text. Hover states should darken the green by 10% rather than changing hue. Secondary buttons should use a subtle 1px border in the primary color with a transparent background.

### Cards
Cards are the primary container for the design system. They must feature a white background, Level 1 soft shadows, and a 16px corner radius. Padding inside cards should default to 24px to ensure content breathes.

### Input Fields
Inputs use a light gray background (#F1F3F5) with a subtle 1px border. Upon focus, the border transitions to the primary green and a soft glow effect is applied using the primary color at 10% opacity.

### Chips & Badges
Used for status indicators (e.g., "Harvested," "Irrigating"). These should use the secondary green with a high transparency background to keep them legible but secondary to the main text.

### Data Tables
Tables should avoid heavy vertical lines. Use subtle horizontal dividers (1px, #E9ECEF) and alternating row highlights in a very pale green (#F0F7F4) to assist with horizontal eye tracking.

### Specialized Components
- **Growth Timeline:** A custom horizontal progress indicator using varying shades of green.
- **Map Overlays:** Minimalist map pins and boundary strokes that utilize the primary green for selected fields and tertiary green for unselected zones.