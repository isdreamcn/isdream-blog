import type { Ref } from 'vue'
import { watch } from 'vue'

export const useShowElClassName = (
  els: Ref<Element[]>,
  className: string,
  intersectionObserverOptions?: IntersectionObserverInit
) => {
  // TODO: https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    for (const entrie of entries) {
      if (entrie.intersectionRatio <= 0) {
        return
      }
      const target = entrie.target
      target.classList.add(className)
      observer.unobserve(target)
    }
  }, intersectionObserverOptions)

  watch(
    () => els.value,
    () => {
      for (const el of els.value) {
        if (!el.className.includes(className)) {
          observer.observe(el)
        }
      }
    },
    {
      immediate: true
    }
  )
}
