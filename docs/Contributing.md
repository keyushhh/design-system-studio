# Contributing Guidelines

We welcome contributions to **Design System Studio**! Please follow these guidelines when submitting pull requests or opening issues.

---

## Code of Conduct

Maintain a respectful, open, and welcoming environment for all contributors.

---

## Development Guidelines

1. **Brand Neutrality**:
   - Keep code, comments, documentation, and asset filenames brand-agnostic.
   - Do not commit proprietary brand names or organization-specific credentials.

2. **Use Design Tokens**:
   - Do not hardcode hex colors or static dimensions in components. Always use CSS Custom Properties from `tokens/`.
   - Ensure new components support both Light and Dark themes seamlessly.

3. **Zero-Build Compatibility**:
   - Test changes directly by serving `DesignSystem.html` using a local HTTP server (`python3 -m http.server`).
   - Do not add build scripts that break direct browser preview capabilities.

4. **Component Consistency**:
   - Provide clean TypeScript type declarations (`.d.ts`) alongside JSX component files where applicable.
   - Update component specimen cards when modifying or adding UI controls.

---

## Submitting Changes

1. Fork the repository and create a feature branch (`git checkout -b feature/my-feature`).
2. Verify visual rendering and dark theme compatibility across browsers.
3. Commit your changes with clear, descriptive commit messages (`git commit -m "Add Segmented Control primitive"`).
4. Push to your branch and open a Pull Request.
