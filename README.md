# react-use-scroll-sync

[![npm version](https://img.shields.io/npm/v/react-use-scroll-sync.svg)](https://www.npmjs.com/package/react-use-scroll-sync)
[![npm downloads](https://img.shields.io/npm/dt/react-use-scroll-sync.svg)](https://www.npmjs.com/package/react-use-scroll-sync)

Custom react hook for synced scroll position across multiple scrollable
elements.

## Demo

https://gk4m.github.io/react-use-scroll-sync/

## Installation

Install it with yarn:

```
yarn add react-use-scroll-sync
```

Or with npm:

```
npm i react-use-scroll-sync --save
```

## How to use
```typescript
import * as React from "react"
import { useSrollSync } from "react-use-scroll-sync"

const App = () => {
  const ref1 = React.useRef<HTMLDivElement>(null)
  const ref2 = React.useRef<HTMLDivElement>(null)

  useSrollSync([ref1, ref2], {
    horizontal: true,
    vertical: true,
    proportional: true
  })

  return (
    <>
      <div
        ref={ref1}
        style={{ overflow: "auto", width: "300px", height: "300px" }}
      >
        <div style={{ width: "500px" }}>Lorem ipsum dolor sit amet...</div>
      </div>

      <div
        ref={ref2}
        style={{ overflow: "auto", width: "300px", height: "300px" }}
      >
        <div style={{ width: "500px" }}>Lorem ipsum dolor sit amet...</div>
      </div>
    </>
  )
}

```
## License

MIT
