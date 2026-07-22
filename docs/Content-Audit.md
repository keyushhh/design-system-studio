# Product Content Audit: Design System Studio

This document presents a comprehensive audit of user-facing copy, metadata, guidelines, template copy, and sample data across Design System Studio. It identifies remaining internal/company-specific terminology, legacy placeholders, and inconsistent messaging, providing clean, production-ready replacement copy tailored for a standalone SaaS product.

---

## 1. Audit Findings & Replacement Recommendations

### Location 1: App Shell Header & Meta Tags
- **File**: [DesignSystem.html](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/DesignSystem.html#L6) / [index.html](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/index.html#L6)
- **Existing Text**: `<title>Design System Studio</title>`
- **Why it should change**: Needs a descriptive, SEO-optimized SaaS product title instead of a generic string.
- **Recommended Replacement**: `<title>Design System Studio — Universal Design Token & Component Workbench</title>`

---

### Location 2: Main Application Hero Subtitle
- **File**: [designsystem.app.jsx](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/designsystem.app.jsx#L545) / [_ds_bundle.js](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/_ds_bundle.js#L3335)
- **Existing Text**: `"One source of truth for every Design System Studio screen, presentation, and component. Emerald-led, light-mode, editorial. Tokens copy straight to code and export to Figma variables."`
- **Why it should change**: References internal marketing platform context ("emerald-led, light-mode, editorial").
- **Recommended Replacement**: `"The continuous control center for your tokens, component primitives, and brand guidelines. Framework-agnostic, token-first, and ready for instant code export."`

---

### Location 3: Overview Section Eyebrow
- **File**: [designsystem.app.jsx](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/designsystem.app.jsx#L543)
- **Existing Text**: `"Design System Studio"` (recently updated from `"Design System Studio · Advocacy Marketing Platform"`)
- **Why it should change**: Needs to clearly describe the product value proposition as a SaaS platform.
- **Recommended Replacement**: `"Design System Studio · Universal Design Token Engine"`

---

### Location 4: Footer Legal & Proprietary Notice
- **File**: [designsystem.app.jsx](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/designsystem.app.jsx#L572-L573) / [_ds_bundle.js](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/_ds_bundle.js#L3426-L3427)
- **Existing Text**: `"PROPRIETARY AND CONFIDENTIAL"`
- **Why it should change**: Reflects an internal confidential enterprise tool rather than an open public/commercial SaaS product.
- **Recommended Replacement**: `"MIT LICENSE · OPEN SOURCE & COMMERCIAL READY"`

---

### Location 5: Sample Data in Interactive Component Forms
- **File**: [designsystem.app.jsx](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/designsystem.app.jsx#L322-L326) / [components/forms/forms.card.html](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/components/forms/forms.card.html#L16)
- **Existing Text**: 
  - `label: 'Enable per-partner leaderboards'`
  - `label: 'Partners'`
  - `label: 'Employees'`
- **Why it should change**: Reflects legacy internal marketing app domain ("partner leaderboards", "employee advocacy").
- **Recommended Replacement**: 
  - `label: 'Enable token sync webhooks'`
  - `label: 'Production'`
  - `label: 'Staging'`

---

### Location 6: Presentation Deck Slide Renderer Copy
- **File**: [slides/slideRenderers.jsx](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/slides/slideRenderers.jsx#L18-L232) / [_ds_bundle.js](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/_ds_bundle.js#L3468-L4320)
- **Existing Text**: 
  - `label: 'PlanView'`
  - `"Activating the PlanView partner ecosystem across APAC through structured advocacy campaigns."`
  - `"With Design System Studio partner advocacy, every channel partner becomes a persistent amplification channel..."`
  - `"Marketing Lead, PlanView APAC"`
- **Why it should change**: Contains hardcoded legacy client sample data ("PlanView", "APAC partner advocacy").
- **Recommended Replacement**: 
  - `label: 'Design System Studio'`
  - `"Scaling design token adoption across cross-functional engineering and product teams."`
  - `"With Design System Studio, every component primitive consumes tokenized brand decisions..."`
  - `"Head of Product, Enterprise UI Platform"`

---

### Location 7: Master Template Generator Section Description
- **File**: [designsystem.app.jsx](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/designsystem.app.jsx#L495)
- **Existing Text**: `"The live application - sidebar, slide nav, presentation canvas, and edit toolbar - turning a Business Record into the 14-template Master Presentation."`
- **Why it should change**: Uses internal project jargon ("Business Record").
- **Recommended Replacement**: `"Generate brand-aligned executive slide decks directly from your active token architecture and component guidelines."`

---

### Location 8: Brand Guidelines Document Footer
- **File**: [export/Brand-Guidelines.html](file:///Users/biradhwaj/Downloads/Design%20System%20Studio/export/Brand-Guidelines.html#L382)
- **Existing Text**: `"Design System Studio activates employees, customers, and partners to organically distribute marketing content..."`
- **Why it should change**: Legacy internal company mission statement in exported guidelines.
- **Recommended Replacement**: `"Design System Studio provides a single source of truth for design tokens, typography, and reusable UI components across all web products."`

---

## 2. Content Consistency Report

### Voice & Tone Audit
- **Inconsistent Voice**: The application currently fluctuates between three distinct personalities:
  1. *Developer-First Token Tool*: Clean, precise, technical language ("W3C DTCG Token JSON", "CSS Custom Properties").
  2. *Internal Enterprise Consulting*: Heavy agency/editorial tone ("PROPRIETARY AND CONFIDENTIAL", "Master Presentation", "Business Record").
  3. *Legacy Marketing Platform*: Domain-specific terminology ("Partner leaderboards", "APAC advocacy campaigns", "PlanView").

### Terminology & Naming Discrepancies
- **Design Tokens**: Referred to variously as "Design Tokens", "Token Engine", "Foundations", and "Variables".
  - *Recommendation*: Standardize on **Design Tokens** for raw values and **Semantic Tokens** for role mappings.
- **Components**: Referred to as "Primitives", "Components", and "UI Kits".
  - *Recommendation*: Use **Core Components** throughout the app shell.

### CTA Wording Consistency
- **Figma Export**: Button labels mix "Export Figma Tokens", "Export Figma Variables", and "Download .json".
  - *Recommendation*: Standardize on **"Export Figma Tokens"** for primary buttons and **"Download DTCG JSON"** for secondary options.

---

## 3. Prioritized Action Checklist

### High Priority (Must fix for public SaaS launch)
- [ ] Replace all hardcoded "PlanView" client references in `slides/slideRenderers.jsx` and `_ds_bundle.js`.
- [ ] Replace "PROPRIETARY AND CONFIDENTIAL" in global footers with open-source/license wording.
- [ ] Replace legacy form inputs (`Enable per-partner leaderboards`, `Partner Advocacy Program`) with generic SaaS defaults.

### Medium Priority (Recommended before public beta)
- [ ] Standardize page title and Open Graph metadata in `index.html` and `DesignSystem.html`.
- [ ] Update hero overview paragraph to emphasize framework-agnostic SaaS value.
- [ ] Update exported `Brand-Guidelines.html` fallback description paragraph.

### Low Priority (Future polish & docs)
- [ ] Clean up internal comments referencing "PlanView Business Record" in developer prompts.
- [ ] Align CTA button text across presentation generators and token export actions.
