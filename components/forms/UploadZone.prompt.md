Dashed drag-and-drop upload zone - the shell's "Source Material" input for Business Record Markdown.

```jsx
<UploadZone onFileSelect={(f) => importRecord(f)} />
<UploadZone filename="planview-business-record.md" onFileSelect={fn} />
<UploadZone validating onFileSelect={fn} />
```

Hover/drag tint to the emerald wash. `filename` switches the label to the file + "Click to replace"; `validating` shows the parsing state. `accept` defaults to `.md,.markdown`.
