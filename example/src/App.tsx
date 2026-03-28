import { useMemo, useRef, useState } from "react"
import type { CSSProperties, RefObject } from "react"

import { Options, useScrollSync } from "react-use-scroll-sync"

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum sagittis augue, quis scelerisque mauris euismod vitae. Vestibulum elit nisi, porta ut elit tincidunt, eleifend fermentum mauris. Proin sapien massa, elementum quis imperdiet sit amet, feugiat vitae mi. Praesent bibendum mi ac ultricies feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus.`

const columnWidths = [480, 720, 960, 1240]
const paragraphCounts = [2, 3, 5, 8]

type ScrollPaneProps = {
  accent: string
  bodyWidth: number
  paragraphs: number
  refObject: RefObject<HTMLDivElement | null>
  title: string
}

function ScrollPane({
  accent,
  bodyWidth,
  paragraphs,
  refObject,
  title,
}: ScrollPaneProps) {
  const bodyStyle = {
    "--accent": accent,
    width: `${bodyWidth}px`,
  } as CSSProperties

  return (
    <article className="pane">
      <header className="pane-header">
        <span className="pane-badge">Panel</span>
        <div>
          <h2>{title}</h2>
          <p>{bodyWidth}px content width</p>
        </div>
      </header>

      <div className="scroll-frame" ref={refObject}>
        <div className="scroll-body" style={bodyStyle}>
          {Array.from({ length: paragraphs }, (_, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </article>
  )
}

export function App() {
  const [options, setOptions] = useState<Options>({
    horizontal: true,
    vertical: true,
    proportional: true,
    throttleWaitTime: 100,
  })
  const paneOneRef = useRef<HTMLDivElement>(null)
  const paneTwoRef = useRef<HTMLDivElement>(null)
  const paneThreeRef = useRef<HTMLDivElement>(null)
  const paneFourRef = useRef<HTMLDivElement>(null)

  const refs = useMemo(
    () => [paneOneRef, paneTwoRef, paneThreeRef, paneFourRef],
    [paneFourRef, paneOneRef, paneThreeRef, paneTwoRef],
  )

  useScrollSync(refs, options)

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">react-use-scroll-sync</p>
        <h1>Scroll four independent panes as if they were one surface.</h1>
        <p className="lede">
          This demo runs against the local package build and shows horizontal,
          vertical and proportional synchronization across differently sized
          containers.
        </p>
      </section>

      <section className="controls" aria-label="Scroll sync controls">
        <label className="toggle">
          <input
            checked={options.horizontal}
            onChange={() =>
              setOptions((current) => ({
                ...current,
                horizontal: !current.horizontal,
              }))
            }
            type="checkbox"
          />
          <span>Horizontal</span>
        </label>

        <label className="toggle">
          <input
            checked={options.vertical}
            onChange={() =>
              setOptions((current) => ({
                ...current,
                vertical: !current.vertical,
              }))
            }
            type="checkbox"
          />
          <span>Vertical</span>
        </label>

        <label className="toggle">
          <input
            checked={options.proportional}
            onChange={() =>
              setOptions((current) => ({
                ...current,
                proportional: !current.proportional,
              }))
            }
            type="checkbox"
          />
          <span>Proportional</span>
        </label>
      </section>

      <section className="grid">
        {refs.map((ref, index) => (
          <ScrollPane
            key={index}
            accent={`hsl(${25 + index * 55} 85% 58%)`}
            bodyWidth={columnWidths[index]}
            paragraphs={paragraphCounts[index]}
            refObject={ref}
            title={`Pane ${index + 1}`}
          />
        ))}
      </section>
    </main>
  )
}
