import { createRef } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { act } from "react"
import { createRoot, Root } from "react-dom/client"

import { useScrollSync } from "./scroll-sync"

const setScrollableDimensions = (
  element: HTMLElement,
  dimensions: {
    clientHeight: number
    clientWidth: number
    scrollHeight: number
    scrollWidth: number
  },
) => {
  Object.defineProperties(element, {
    clientHeight: { configurable: true, value: dimensions.clientHeight },
    clientWidth: { configurable: true, value: dimensions.clientWidth },
    scrollHeight: { configurable: true, value: dimensions.scrollHeight },
    scrollWidth: { configurable: true, value: dimensions.scrollWidth },
  })
}

const waitForSync = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5))
  })
}

describe("useScrollSync", () => {
  let container: HTMLDivElement
  let root: Root
  let requestAnimationFrameSpy: { mockRestore(): void }
  let cancelAnimationFrameSpy: { mockRestore(): void }

  beforeEach(() => {
    ;(
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT?: boolean
      }
    ).IS_REACT_ACT_ENVIRONMENT = true
    container = document.createElement("div")
    document.body.appendChild(container)
    root = createRoot(container)

    requestAnimationFrameSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback) => {
        return window.setTimeout(() => callback(performance.now()), 0)
      })

    cancelAnimationFrameSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation((handle: number) => {
        window.clearTimeout(handle)
      })
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })

    requestAnimationFrameSpy.mockRestore()
    cancelAnimationFrameSpy.mockRestore()
    container.remove()
  })

  it("syncs proportional vertical and horizontal scroll positions", async () => {
    const refs = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]

    function TestComponent() {
      useScrollSync(refs, { throttleWaitTime: 0 })

      return (
        <>
          <div ref={refs[0]} />
          <div ref={refs[1]} />
        </>
      )
    }

    act(() => {
      root.render(<TestComponent />)
    })

    const [source, target] = refs.map((ref) => ref.current as HTMLDivElement)

    setScrollableDimensions(source, {
      clientHeight: 100,
      clientWidth: 100,
      scrollHeight: 300,
      scrollWidth: 500,
    })
    setScrollableDimensions(target, {
      clientHeight: 100,
      clientWidth: 200,
      scrollHeight: 500,
      scrollWidth: 1000,
    })

    source.scrollTop = 50
    source.scrollLeft = 100

    act(() => {
      source.dispatchEvent(new Event("scroll", { bubbles: true }))
    })

    await waitForSync()

    expect(target.scrollTop).toBe(100)
    expect(target.scrollLeft).toBe(200)
  })

  it("does not produce invalid scroll values when target has no overflow", async () => {
    const refs = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]

    function TestComponent() {
      useScrollSync(refs, { throttleWaitTime: 0 })

      return (
        <>
          <div ref={refs[0]} />
          <div ref={refs[1]} />
        </>
      )
    }

    act(() => {
      root.render(<TestComponent />)
    })

    const [source, target] = refs.map((ref) => ref.current as HTMLDivElement)

    setScrollableDimensions(source, {
      clientHeight: 200,
      clientWidth: 200,
      scrollHeight: 200,
      scrollWidth: 200,
    })
    setScrollableDimensions(target, {
      clientHeight: 100,
      clientWidth: 100,
      scrollHeight: 400,
      scrollWidth: 400,
    })

    source.scrollTop = 10
    source.scrollLeft = 10

    act(() => {
      source.dispatchEvent(new Event("scroll", { bubbles: true }))
    })

    await waitForSync()

    expect(target.scrollTop).toBe(0)
    expect(target.scrollLeft).toBe(0)
  })

  it("cleans up event listeners on unmount", async () => {
    const refs = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]
    const addEventListenerSpy = vi.spyOn(HTMLElement.prototype, "addEventListener")
    const removeEventListenerSpy = vi.spyOn(
      HTMLElement.prototype,
      "removeEventListener",
    )

    function TestComponent() {
      useScrollSync(refs, { throttleWaitTime: 0 })

      return (
        <>
          <div ref={refs[0]} />
          <div ref={refs[1]} />
        </>
      )
    }

    act(() => {
      root.render(<TestComponent />)
    })

    await waitForSync()

    act(() => {
      root.unmount()
    })

    // Avoid double-unmounting the same root in afterEach.
    root = createRoot(container)

    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    )

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })
})
