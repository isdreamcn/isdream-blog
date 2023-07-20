import type { Ref } from 'vue'
import { ref, watch } from 'vue'

interface UseMenuListOptions {
  startLevel: number
  endLevel: number
  scrollElRef?: Ref<HTMLElement | undefined>
}

interface MenuListItem {
  id: number
  el: HTMLElement
  label: string
  level: number
  offsetTop: number
  children: MenuListItem[]
}

// 观察元素高度变化
const watchElHeight = (el: HTMLElement, fn: () => void) => {
  let preH: number
  const fnHandler = (height: number) => {
    if (preH === height) return
    preH = height
    fn()
  }

  let observer: ResizeObserver
  let timer: NodeJS.Timer
  if (window.ResizeObserver) {
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect
        fnHandler(height)
      }
    })
    observer.observe(el)
  } else {
    timer = setInterval(() => {
      fnHandler(el.clientHeight)
    }, 1000)
  }

  // 取消watch
  return () => {
    if (observer) {
      observer.unobserve(el)
    } else if (timer) {
      clearInterval(timer)
    }
  }
}

// nodes => tree
const getMenuList = (containerEl: HTMLElement, selectors: string) => {
  const nodes: MenuListItem[] = Array.from(
    containerEl.querySelectorAll<HTMLElement>(selectors)
  )
    .map((el, index) => ({
      el,
      id: index + 1,
      label: el.innerText,
      level: Number(el.nodeName.charAt(1)),
      offsetTop: el.offsetTop,
      children: []
    }))
    .reverse()

  const menuList: MenuListItem[] = []
  const _nodes = [...nodes]
  // 从后往前找level必自己小的元素
  // 未找到，放入menuList
  // 找到，放入找到元素的children里
  while (_nodes.length) {
    const node = _nodes.shift()!
    const parentTag = _nodes.find((item) => item.level < node.level)
    if (parentTag) {
      parentTag.children.unshift(node)
    } else {
      menuList.unshift(node)
    }
  }

  return {
    menuList,
    nodes
  }
}

export const useMenuList = (
  containerElRef: Ref<HTMLElement | undefined>,
  { startLevel, endLevel, scrollElRef }: UseMenuListOptions
) => {
  // h1,h2
  const selectors = new Array(endLevel - startLevel + 1)
    .fill(0)
    .map((_, index) => `h${index + startLevel}`)
    .join()
  let watchElHeightCancel = () => {}

  const menuList = ref<MenuListItem[]>([])
  const activedId = ref(0)
  let nodes: MenuListItem[] = []

  watch(containerElRef, (el) => {
    activedId.value = 0
    if (!el) {
      menuList.value = []
      return
    }
    watchElHeightCancel()
    watchElHeightCancel = watchElHeight(el, () => {
      const { menuList: _menuList, nodes: _nodes } = getMenuList(el, selectors)
      if (_nodes.length > 1) {
        menuList.value = _menuList
        nodes = _nodes
      } else {
        menuList.value = []
        nodes = []
      }
    })
  })

  // 显示点击的item
  const scrollIntoView = (item: MenuListItem) => {
    activedId.value = item.id
    item.el.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const scrollElScrollTop = ref(0)
  const scrollHandler = () => {
    const scrollEl = scrollElRef?.value
    if (!scrollEl) return

    const offsetTop = scrollEl.offsetTop + 1
    const scrollTop = scrollEl.scrollTop + 1
    scrollElScrollTop.value = scrollTop

    const item = nodes.find((v) => v.offsetTop - offsetTop <= scrollTop)
    activedId.value = item?.id || 0
  }

  const scrollHandlerCancel = () => {
    if (scrollElRef?.value) {
      scrollElRef.value.removeEventListener('scroll', scrollHandler)
    }
  }

  if (scrollElRef) {
    watch(
      scrollElRef,
      (scrollEl) => {
        scrollHandlerCancel()
        scrollElScrollTop.value = 0
        if (scrollEl) {
          scrollEl.addEventListener('scroll', scrollHandler, {
            passive: true
          })
        }
      },
      { immediate: true }
    )
  }

  return {
    menuList,
    activedId,
    scrollElScrollTop,
    cancel: () => {
      watchElHeightCancel()
      scrollHandlerCancel()
    },
    scrollIntoView
  }
}
