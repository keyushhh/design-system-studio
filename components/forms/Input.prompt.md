Text input with label, hint, error and emerald focus ring. 44px control height, square corners.

```jsx
<Input label="Deck title" placeholder="Partner Advocacy Program" />
<Input label="Client" hint="Shown on the cover" />
<Input label="Email" error="Enter a valid email" defaultValue="hello@" />
<Input label="Locked" disabled defaultValue="Read only" />
```

Sizes sm/md/lg. Focus draws `--brand-500` border + `--brand-100` halo; `error` swaps to the error palette.
