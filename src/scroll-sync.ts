import { RefObject, useEffect, useRef } from "react"
import throttle from "lodash/throttle"

export type Options = {
  horizontal?: boolean
  vertical?: boolean
  proportional?: boolean
  throttleWaitTime?: number // ms
}

const defaultOptions: Options = {
  horizontal: true,
  vertical: true,
  proportional: true,
  throttleWaitTime: 100
}

type ScrollSync = <T extends HTMLElement>(
  refs: RefObject<T>[],
  options?: Options
) => void

const updateScrollsPosition = <T extends HTMLElement>(
  target: HTMLElement,
  refs: RefObject<T>[],
  options: Options
) => {
  const scrollLeftOffset =
    target.scrollLeft / (target.scrollWidth - target.clientWidth)

  const scrollTopOffset =
    target.scrollTop / (target.scrollHeight - target.clientHeight)

  refs.forEach(({ current }) => {
    if (!current) return

    if (options.vertical) {
      const position = options.proportional
        ? scrollTopOffset * (current.scrollHeight - current.clientHeight)
        : target.scrollTop

      current.scrollTop = Math.round(position)
    }

    if (options.horizontal) {
      const position = options.proportional
        ? scrollLeftOffset * (current.scrollWidth - current.clientWidth)
        : target.scrollLeft

      current.scrollLeft = Math.round(position)
    }
  })
}

export const useScrollSync: ScrollSync = (refs, options) => {
  if (refs.length < 2) {
    throw Error("You need to pass at least two refs")
  }

  const scrollSyncOptions = {
    ...defaultOptions,
    ...options
  }

  const handleScroll = ({ target }: Event) => {
    if (!target) throw Error("Event target shouldn't be null")

    const refsWithoutTarget = refs.filter(({ current }) => current !== target)

    window.requestAnimationFrame(() => {
      updateScrollsPosition(
        target as HTMLElement,
        refsWithoutTarget,
        scrollSyncOptions
      )
    })
  }

  const throttleScrollRef = useRef(
    throttle((e: Event) => handleScroll(e), scrollSyncOptions.throttleWaitTime)
  )

  useEffect(() => throttleScrollRef.current.cancel, [])

  useEffect(() => {
    const scrollEvent = throttleScrollRef.current

    refs.forEach(({ current }) =>
      current?.addEventListener("scroll", scrollEvent)
    )

    return () => {
      refs.forEach(({ current }) =>
        current?.removeEventListener("scroll", scrollEvent)
      )
    }
  }, [refs])
}
