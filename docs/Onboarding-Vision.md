# Onboarding Vision: Design System Studio

This document defines the strategic vision for the onboarding experience in Design System Studio. Instead of landing users into a blank editor or overwhelming canvas, the product guides users through an intuitive, 5-minute setup wizard that generates a complete, tailormade starter design system on first launch.

---

## 1. Onboarding Philosophy

Blank canvases create decision paralysis. A great design system tool should feel like an expert consultant guiding a team through initial design choices, making smart defaults, and revealing a fully functioning, populated workspace in seconds.

---

## 2. Step-by-Step Onboarding Flow

```text
[Step 1: Brand Essence] ──> [Step 2: Color Archetype] ──> [Step 3: Visual Personality]
                                                                  │
[Full Interactive Studio] <── [Real-Time Generation] <─────────────┘
```

### Step 1: Brand Essence
- **Goal**: Identify the organization and foundational brand identity.
- **Fields Collected**:
  - `Product / Brand Name` *(Required)*: Used to customize token namespaces and documentation headers.
  - `Primary Brand Color (Seed Hex)` *(Optional)*: If left blank, users can pick from 6 curated seed palettes (e.g., Cyber Indigo, Emerald, Warm Amber, Slate, Electric Violet, Obsidian).
  - `Logo Upload` *(Optional)*: Auto-extracts dominant colors if provided.

### Step 2: Color Archetype & Surface Strategy
- **Goal**: Determine color scale generation rules.
- **Fields Collected**:
  - `Palette Archetype` *(Required - Choice Cards)*:
    - *Tech / Crisp* (Pure neutral grays with cool undertones)
    - *Warm / Human* (Warm stone and cream neutral tones)
    - *High Contrast / Bold* (Deep rich blacks and vibrant pop colors)
  - `Default Theme Mode` *(Required)*: Light Mode First, Dark Mode First, or Dual Sync.

### Step 3: Visual Personality & Spacing Architecture
- **Goal**: Shape component geometry and typography hierarchy.
- **Fields Collected**:
  - `Corner Radius Vibe` *(Required - Visual Selector)*:
    - *Sharp / Dense* (`0px` – `4px`, enterprise/data-heavy feel)
    - *Balanced Modern* (`6px` – `8px`, default SaaS standard)
    - *Soft & Friendly* (`12px` – `16px`, consumer/mobile vibe)
    - *Pill / Playful* (`9999px` fully rounded controls)
  - `Typography Scale` *(Required - Visual Selector)*:
    - *Clean Grotesk* (Inter / Satoshi style)
    - *Tech Monospace* (JetBrains / Space Mono style)
    - *Editorial Serif* (Classic contrast style)

---

## 3. Intelligent Generation & Output Engine

When the user clicks **"Generate Design System"**, the studio initiates a 2-second visual build sequence that generates:

1. **Complete Color System**:
   - 10-step Primitive Scales for Brand, Neutrals, and Semantic states (Success, Warning, Error, Info).
   - Dynamic Semantic Surface tokens (`surface-canvas`, `surface-card`, `surface-overlay`).
   - High-contrast text/icon tokens guaranteeing WCAG AA compliance.
2. **Typography Scale**:
   - Calculated font-size ladder (Display, H1-H4, Body, Small, Micro) with proportional line heights.
3. **Spatial & Geometric Tokens**:
   - 8pt/4pt Spacing scale tokens (`space-1` through `space-16`).
   - Radii, border widths, and elevation shadow tokens.
4. **Pre-Staged Core Components**:
   - Interactive Buttons, Cards, Inputs, Badges, Toasts, Tooltips, Switches, and Tabs populated instantly with the generated tokens.
5. **Interactive Guidelines & Documentation**:
   - A generated brand guideline page with color swatches, typography hierarchy, and usage rules.

---

## 4. UX Principles for Onboarding

1. **Instant Feedback**: Every selection (selecting a radius or color archetype) dynamically previews on a sample component card within the onboarding wizard side panel.
2. **Zero Dead Ends**: Optional fields are pre-filled with high-grade curated defaults so users can complete onboarding by simply hitting "Next".
3. **No Upfront Registration Required**: Users can run the onboarding flow and interact with their generated system immediately in local storage without signing up.
4. **Progressive Disclosure**: Show high-level visual dials during onboarding (Radius, Color, Type); hide complex raw DTCG JSON configurations until the user enters the main workbench.

---

## 5. Progressive Disclosure Map

| Stage | What the User Sees | Hidden Complexity |
| :--- | :--- | :--- |
| **Onboarding Wizard** | Visual personality cards, color pickers, preview cards | Raw HSL color math, CSS variable compilation rules |
| **First Workspace Load** | Pre-staged components, main token swatches, WCAG indicators | DTCG JSON schemas, raw token export scripts |
| **Advanced Workbench** | Multi-tier token inheritance, custom surface roles, code exporter | Full TypeScript definitions, raw token ASTs |

---

## 6. Empty State Strategy

- **Never Show Empty Lists**: If a user resets or creates a new token set, display smart template cards (e.g., "Load Default Emerald Palette" or "Generate Neutral Scale").
- **Component Playgrounds**: If a component has no custom overrides, display interactive state triggers (Hover, Focus, Disabled) with helpful inline tips explaining which tokens drive each state.

---

## 7. Error Handling & Guardrails

- **Contrast Shield**: If a user selects a seed brand color that produces illegal WCAG contrast pairings against text surfaces, the onboarding flow automatically calculates and suggests the nearest accessible shade variant.
- **Invalid Input Protection**: Direct hex inputs validate in real-time with visual color chips. Invalid inputs fallback gracefully without breaking the generation pipeline.

---

## 8. Future AI Enhancements (Post-V1)

- **Website / URL Scanner**: Input an existing website URL to automatically extract color palettes, typography specs, and radii into a new design system.
- **Prompt-to-System Generation**: Describe a brand identity (e.g., *"A warm, organic coffee subscription service with muted earthy tones and soft radii"*) and generate a complete token set.
- **Figma File Auto-Mapper**: Upload a Figma file link to parse and auto-map design variables into Design System Studio tokens.
