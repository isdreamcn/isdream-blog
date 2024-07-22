interface ScrollData {
  el: HTMLElement
  scrollHeight: number
  clientHeight: number
  offsetTop: number
  scrollTop: number
  scrollTo: typeof window.scrollTo
}

type ScrollHandler = (data: ScrollData) => void

export const useScrollEl = (handler: ScrollHandler) => {
  const el = document.documentElement
  handler({
    el,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    offsetTop: el.offsetTop,
    scrollTop: window.scrollY,
    scrollTo: window.scrollTo
  })
}

const handlers: Set<ScrollHandler> = new Set()

const addScrollListener = () => {
  window.addEventListener(
    'scroll',
    () => {
      useScrollEl((data) => {
        handlers.forEach((handler) => handler(data))
      })
    },
    {
      passive: true
    }
  )
}

let addedScrollListener = false
export const useScrollListener = (handler: ScrollHandler) => {
  handlers.add(handler)

  if (!addedScrollListener) {
    addScrollListener()
    addedScrollListener = true
  }

  const removeScrollListener = () => {
    handlers.delete(handler)
    if (handlers.size === 0) {
      window.removeEventListener('scroll', addScrollListener)
      addedScrollListener = false
    }
  }

  return {
    removeScrollListener
  }
}
