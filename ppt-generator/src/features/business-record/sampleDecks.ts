import componentMigrationMd from '../../../samples/component-migration.md?raw';

/** Campaign types named in customer interviews - used to filter the sample library. */
export type CampaignType =
  | 'Component Migration'
  | 'Design System Adoption'
  | 'Token Architecture'
  | 'Pattern Library'
  | 'Accessibility Audit'
  | 'Process Workflow';

export interface SampleDeck {
  id: string;
  name: string;
  description: string;
  campaignType: CampaignType;
  markdown: string;
}

export const CAMPAIGN_TYPES: CampaignType[] = [
  'Component Migration',
  'Design System Adoption',
  'Token Architecture',
  'Pattern Library',
  'Accessibility Audit',
  'Process Workflow',
];

/** Ready-to-load Business Records so users never start from a blank page. Every
 *  sample uses obvious placeholder tokens ([CLIENT], [LOGO]) so what still needs
 *  swapping before this goes to a real client is unambiguous. */
export const SAMPLE_DECKS: SampleDeck[] = [
  {
    id: 'component-migration',
    name: 'Component Migration Strategy',
    description: 'A phased approach to migrating legacy components to the new design system.',
    campaignType: 'Component Migration',
    markdown: componentMigrationMd,
  },
  {
    id: 'token-architecture',
    name: 'Design Token Architecture',
    description: 'Establishing a scalable foundation for colors, typography, and spacing.',
    campaignType: 'Token Architecture',
    markdown: `---
version: 1.0
type: business-record
client: "[PRODUCT_TEAM]"
title: Design Token Architecture
subtitle: The foundation of a scalable design system
tagline: Creating a unified language for design and engineering.
---

## Executive Summary

[PRODUCT_TEAM] struggles with hardcoded values and inconsistent styling. This architecture introduces design tokens to bridge the gap between design specs and code.

## Key Metric

- value: 85
- unit: %
- title: Reduction in styling inconsistencies across products

## Comparison

- row: Approach | Hardcoded Values | Design Tokens | Impact
- row: Maintenance | High effort | Centralized | Faster updates
- row: Theming | Manual overrides | Automated | Effortless dark mode

## Roadmap

- phase: Define | Establish core primitive tokens. | done
- phase: Semantic | Create semantic tokens for specific use cases.
- phase: Implement | Integrate tokens into the codebase and Figma variables.

## Quote

Design tokens have completely transformed how our teams collaborate.

- author: Alex Rivera
- role: Lead Designer, [PRODUCT_TEAM]
`,
  },
  {
    id: 'system-adoption',
    name: 'Design System Adoption Plan',
    description: 'A comprehensive plan for driving adoption across multiple product teams.',
    campaignType: 'Design System Adoption',
    markdown: `---
version: 1.0
type: business-record
client: "[PRODUCT_TEAM]"
title: Design System Adoption Plan
subtitle: Scaling the system across product teams
tagline: Ensuring the design system becomes the default way we build products.
---

## Executive Summary

Building a design system is only half the battle; adoption is where the value is realized. This plan details how [PRODUCT_TEAM] will roll out the system to all active product teams.

- Focused onboarding and clear documentation increase adoption rates by 40%.

## Context

Teams are hesitant to adopt the new system due to perceived learning curves and lack of clear migration paths.

A structured rollout plan with dedicated support channels removes friction.

- Low initial adoption rates
- Lack of clear documentation
- Teams operating in silos

## Process

- step: Educate | Run workshops and provide comprehensive documentation.
- step: Pilot | Partner with a single team for a pilot integration.
- step: Scale | Roll out to remaining teams with established best practices.

## Metrics

Adoption compounds as more teams see the benefits.

- bar: Q1 | 25
- bar: Q2 | 65
- bar: Q3 | 90 | active
- kpi: Active Teams | 12
- kpi: Components Used | 45
- kpi: Satisfaction Score | 4.8

## Closing

Full rollout schedule and training materials to follow.

- email: hello@designsystem.studio
- web: www.designsystem.studio
`,
  },
];
