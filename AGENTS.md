# AGENTS.md

This file provides guidelines and constraints for AI agents working in this repository.

---

## Non-Negotiable Rules

1. **Do NOT Modify Core Functionality Unless Requested**:
   - Preserve component props, component APIs, state management logic, and design token names.
   - Do not refactor UI components or alter styling parameters during non-styling tasks.

2. **Brand & Identity Integrity**:
   - Keep all codebase references generic, modular, and brand-agnostic.
   - Never introduce proprietary company names or hardcoded internal organization references.

3. **CSS & Token Hierarchy**:
   - Always reference design tokens (`var(--neutral-100)`, `var(--brand-500)`, `var(--radius-md)`) rather than hardcoding hex colors or pixel dimensions.
   - Component styles must rely on shared tokens in `tokens/` rather than scoped custom colors.

4. **Zero-Build Architecture**:
   - The application relies on native ES module / browser-compatible execution (`DesignSystem.html`, `designsystem.app.jsx`).
   - Do not introduce complex node compilation pipelines (e.g. Webpack, Vite, Turbo) unless explicitly instructed by the user.

5. **Code & File Modification Safety**:
   - Check existing files before creating duplicate utilities.
   - Preserve comments, license headers, and docstrings.
