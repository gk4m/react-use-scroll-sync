# react-use-scroll-sync

[![npm version](https://badge.fury.io/js/react-use-scroll-sync.svg)](https://www.npmjs.com/package/react-use-scroll-sync)
[![npm downloads](https://img.shields.io/npm/dt/react-use-scroll-sync.svg)](https://www.npmjs.com/package/react-use-scroll-sync)

React hook for synchronizing scroll position across multiple scrollable
elements.

## Installation

Requires `react >= 18`.

```bash
npm install react-use-scroll-sync
```

or

```bash
yarn add react-use-scroll-sync
```

## Usage

```tsx
import { useMemo, useRef } from "react"
import { useScrollSync } from "react-use-scroll-sync"

export function Example() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const refs = useMemo(() => [leftRef, rightRef], [])

  useScrollSync(refs, {
    horizontal: true,
    vertical: true,
    proportional: true,
    throttleWaitTime: 100,
  })

  return (
    <>
      <div ref={leftRef} style={{ overflow: "auto", width: 300, height: 300 }}>
        <div style={{ width: 600, height: 800 }}>Left content</div>
      </div>

      <div ref={rightRef} style={{ overflow: "auto", width: 300, height: 300 }}>
        <div style={{ width: 900, height: 1200 }}>Right content</div>
      </div>
    </>
  )
}
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `horizontal` | `boolean` | `true` | Sync horizontal scrolling. |
| `vertical` | `boolean` | `true` | Sync vertical scrolling. |
| `proportional` | `boolean` | `true` | Map by scroll ratio instead of copying the raw offset. |
| `throttleWaitTime` | `number` | `100` | Delay in milliseconds before a sync is flushed. |

## Notes

- Pass at least two refs.
- Keep the refs array stable between renders, for example with `useMemo`.
- When an element has no scrollable overflow on an axis, the hook keeps the
  synced position at `0` for that axis.

## Development

```bash
yarn bootstrap
yarn verify
yarn demo:dev
```

Useful root scripts:

- `yarn build` builds the library into `dist/`
- `yarn test` runs the Vitest suite
- `yarn verify` runs lint, tests, library build and demo build
- `yarn demo:dev` starts the Vite demo
- `yarn demo:build` creates a production build of the demo
- `yarn demo:preview` previews the built demo locally

## Demo

The demo app lives in [`example/`](./example) and imports the local library
source through a Vite alias, so it uses the same React instance as the app.

## License

MIT
