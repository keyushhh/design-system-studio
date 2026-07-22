Editorial action button for the Design System Studio shell and deck chrome - mostly square corners, neutral-900 primary CTA, emerald `brand` variant.

```jsx
<Button variant="primary" iconLeft="upload">Upload Document</Button>
<Button variant="brand" size="md">Generate Deck</Button>
<Button variant="outline" size="sm" iconLeft="download">Export PDF</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger">Confirm Reset?</Button>
<Button disabled fullWidth>Generate Deck</Button>
```

Variants: `primary` (neutral-900), `brand` (emerald-600), `secondary`, `outline`, `ghost`, `danger`. Sizes `sm` 34px / `md` 44px / `lg` 52px. `radius` defaults to `sharp` (product/deck); pass `md` or `full` for web surfaces. `iconLeft`/`iconRight` take an Icon glyph name.
