Slide top HUD - mono section label left, slide number right, over a hairline rule.

```jsx
<HudBar label="Executive Summary" num="04" />
<HudBar label="Section Divider" num="05" dark />
```

Absolutely positioned inside a `SlideFrame` by default; pass `position="static"` to flow inline. Use `dark` on the black divider/exit slides.
