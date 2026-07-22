The 1920×1080 editorial slide shell every Master Presentation template builds on. Auto-scales to its container.

```jsx
<SlideFrame glow>
  <HudBar label="Executive Summary" num="03" />
  <div style={{padding:'160px 140px'}}>
    <Eyebrow>Performance Metric</Eyebrow>
    <h1 style={{fontFamily:'var(--font-display)',fontSize:180}}>Objective.</h1>
  </div>
</SlideFrame>

<SlideFrame dark>{/* Section Divider / Exit */}</SlideFrame>
```

`dark` = pure-black slide. `showGrid` (default true) draws the 120px hairline overlay; `glow` adds the corner emerald radial. `fit="none"` renders at full 1920px for export.
