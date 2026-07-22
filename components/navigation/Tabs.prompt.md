Underline tab bar with an emerald active indicator.

```jsx
<Tabs tabs={['Overview','Advocates','Campaigns']} defaultValue="Overview" onChange={setTab} />
<Tabs tabs={[{value:'a',label:'Analytics'}]} value={tab} onChange={setTab} />
```

Controlled via `value`/`onChange` or uncontrolled via `defaultValue`.