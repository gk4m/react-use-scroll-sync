import { RefObject, useEffect } from "react"

export type Options = {
  horizontal?: boolean
  vertical?: boolean
  proportional?: boolean
}

const defaultOptions: Options = {
  horizontal: true,
  vertical: true,
  proportional: true
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

export const useSrollSync: ScrollSync = (refs, options) => {
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

    updateScrollsPosition(
      target as HTMLElement,
      refsWithoutTarget,
      scrollSyncOptions
    )
  }

  useEffect(() => {
    refs.forEach(({ current }) =>
      current?.addEventListener("scroll", handleScroll)
    )

    return () => {
      refs.forEach(({ current }) =>
        current?.removeEventListener("scroll", handleScroll)
      )
    }
  }, [refs])
}
