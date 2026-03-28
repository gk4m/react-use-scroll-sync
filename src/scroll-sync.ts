import { RefObject, useEffect, useRef } from "react"

export type Options = {
  horizontal?: boolean
  vertical?: boolean
  proportional?: boolean
  throttleWaitTime?: number
}

type ResolvedOptions = Required<Options>

const defaultOptions: ResolvedOptions = {
  horizontal: true,
  vertical: true,
  proportional: true,
  throttleWaitTime: 100,
}

type ScrollSync = <T extends HTMLElement>(
  refs: ReadonlyArray<RefObject<T | null>>,
  options?: Options,
) => void

const getScrollableRange = (scrollSize: number, clientSize: number) =>
  Math.max(scrollSize - clientSize, 0)

const getScrollRatio = (scrollPosition: number, scrollSize: number, clientSize: number) => {
  const range = getScrollableRange(scrollSize, clientSize)

  if (range === 0) {
    return 0
  }

  return scrollPosition / range
}

const updateScrollPositions = <T extends HTMLElement>(
  target: HTMLElement,
  refs: ReadonlyArray<RefObject<T | null>>,
  options: ResolvedOptions,
  ignoredElements: WeakSet<HTMLElement>,
) => {
  const horizontalRatio = getScrollRatio(
    target.scrollLeft,
    target.scrollWidth,
    target.clientWidth,
  )
  const verticalRatio = getScrollRatio(
    target.scrollTop,
    target.scrollHeight,
    target.clientHeight,
  )

  refs.forEach(({ current }) => {
    if (!current || current === target) {
      return
    }

    if (options.vertical) {
      const nextScrollTop = options.proportional
        ? verticalRatio * getScrollableRange(current.scrollHeight, current.clientHeight)
        : target.scrollTop

      ignoredElements.add(current)
      current.scrollTop = Math.round(nextScrollTop)
    }

    if (options.horizontal) {
      const nextScrollLeft = options.proportional
        ? horizontalRatio * getScrollableRange(current.scrollWidth, current.clientWidth)
        : target.scrollLeft

      ignoredElements.add(current)
      current.scrollLeft = Math.round(nextScrollLeft)
    }
  })
}

export const useScrollSync: ScrollSync = (refs, options) => {
  if (refs.length < 2) {
    throw new Error("You need to pass at least two refs")
  }

  const resolvedOptions: ResolvedOptions = {
    horizontal: options?.horizontal ?? defaultOptions.horizontal,
    vertical: options?.vertical ?? defaultOptions.vertical,
    proportional: options?.proportional ?? defaultOptions.proportional,
    throttleWaitTime: options?.throttleWaitTime ?? defaultOptions.throttleWaitTime,
  }

  const frameRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const queuedTargetRef = useRef<HTMLElement | null>(null)
  const optionsRef = useRef<ResolvedOptions>(resolvedOptions)
  const ignoredElementsRef = useRef(new WeakSet<HTMLElement>())

  optionsRef.current = resolvedOptions

  useEffect(() => {
    const elements: HTMLElement[] = []

    refs.forEach(({ current }) => {
      if (current) {
        elements.push(current)
      }
    })

    const clearPendingSync = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      queuedTargetRef.current = null
    }

    const flushSync = () => {
      frameRef.current = null

      if (!queuedTargetRef.current) {
        return
      }

      updateScrollPositions(
        queuedTargetRef.current,
        refs,
        optionsRef.current,
        ignoredElementsRef.current,
      )

      queuedTargetRef.current = null
    }

    const scheduleSync = (target: HTMLElement) => {
      queuedTargetRef.current = target

      if (timeoutRef.current !== null) {
        return
      }

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current)
        }

        frameRef.current = window.requestAnimationFrame(flushSync)
      }, optionsRef.current.throttleWaitTime)
    }

    const handleScroll = (event: Event) => {
      const target = event.currentTarget

      if (!(target instanceof HTMLElement)) {
        return
      }

      if (ignoredElementsRef.current.has(target)) {
        ignoredElementsRef.current.delete(target)
        return
      }

      scheduleSync(target)
    }

    elements.forEach((element) => element.addEventListener("scroll", handleScroll))

    return () => {
      clearPendingSync()
      elements.forEach((element) =>
        element.removeEventListener("scroll", handleScroll),
      )
    }
  }, [
    refs,
    resolvedOptions.horizontal,
    resolvedOptions.proportional,
    resolvedOptions.throttleWaitTime,
    resolvedOptions.vertical,
  ])
}
