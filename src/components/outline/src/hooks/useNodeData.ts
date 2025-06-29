import { ref, shallowRef, onUnmounted } from 'vue'
import { throttle } from 'lodash-unified'

interface Options {
  startLevel: number
  endLevel: number
}

interface NodeItem {
  id: number
  el: HTMLElement
  label: string
  level: number
  absoluteTop: number
  children?: NodeItem[]
}

// 观察元素高度变化
const watchElHeight = (el: HTMLElement, fn: () => void) => {
  let preH = el.clientHeight
  const fnHandler = () => {
    const newH = el.clientHeight

    if (preH === newH) return
    preH = newH
    fn()
  }
  const fnHandlerThrottle = throttle(fnHandler, 200, {
    trailing: true
  })

  let observer: ResizeObserver | null = null
  let timer: number | null = null

  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(fnHandlerThrottle)
    observer.observe(el)
  } else {
    fnHandler() // 立即执行一次初始化
    timer = window.setInterval(fnHandler, 1000)
  }

  // 取消watch
  return () => {
    observer?.disconnect()
    fnHandlerThrottle.cancel()
    if (timer) clearInterval(timer)
  }
}

// 使用栈结构构建标题树
const buildTree = (nodes: NodeItem[]): NodeItem[] => {
  const tree: NodeItem[] = []
  const stack: NodeItem[] = []

  for (const node of nodes) {
    // 弹出所有层级大于等于当前节点的项
    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      tree.push(node)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) parent.children = []
      parent.children.push(node)
    }

    stack.push(node)
  }

  return tree
}

// 绝对位置
const absoluteTop = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return (window.scrollY || window.pageYOffset) + rect.top
}

// 获取节点数据
const getNodeList = (containerEl: HTMLElement, selectors: string) => {
  const nodeList: NodeItem[] = []
  const elements = containerEl.querySelectorAll<HTMLElement>(selectors)

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    if (el.offsetParent === null) continue // 过滤掉隐藏元素

    // 清理标题文本中的多余空格
    const label = (el.textContent || '').replace(/\s+/g, ' ').trim()
    if (!label) continue // 跳过空标题

    nodeList.push({
      el,
      id: i + 1,
      label,
      level: Number(el.tagName.charAt(1)),
      absoluteTop: absoluteTop(el)
    })
  }

  return nodeList
}

// 获取最近的滚动容器
const getScrollEl = (el: HTMLElement): HTMLElement | Window => {
  let current: HTMLElement | null = el

  while (current) {
    if (current === document.body || current === document.documentElement) {
      return window
    }

    const { overflowY } = window.getComputedStyle(current)
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return current
    }

    current = current.parentElement
  }

  return window
}

export const useNodeData = (containerEl: HTMLElement, options: Options) => {
  const { startLevel, endLevel } = options
  const selectors = Array.from(
    { length: endLevel - startLevel + 1 },
    (_, i) => `h${startLevel + i}`
  ).join(',')

  let nodeList: NodeItem[] = []
  const nodeTree = shallowRef<NodeItem[]>([])
  const activedId = ref(0)
  let scrollEl: HTMLElement | Window = window
  let containerTop = 0

  // 更新节点数据
  const updateNodeData = () => {
    nodeList = getNodeList(containerEl, selectors)
    nodeTree.value = buildTree(nodeList)

    // 计算容器位置
    if (scrollEl === window) {
      containerTop = 0
    } else {
      containerTop = absoluteTop(containerEl as HTMLElement)
    }
  }

  // 设置活动节点ID
  const setActivedId = () => {
    if (nodeList.length === 0) return

    const scrollPosition =
      scrollEl === window
        ? window.scrollY || window.pageYOffset
        : (scrollEl as HTMLElement).scrollTop

    // 找到第一个进入视口的标题
    let activeNode = null
    for (let i = 0; i < nodeList.length; i++) {
      const node = nodeList[i]
      const nodeTop = node.absoluteTop - containerTop + 5 // 5px偏移量优化

      if (nodeTop >= scrollPosition) {
        activeNode = node
        break
      }
    }

    // 使用最后一个节点作为回退
    activedId.value = activeNode?.id || nodeList[nodeList.length - 1]?.id || 0
  }

  // 滚动到指定节点
  const scrollIntoView = (item: NodeItem) => {
    if (!item) return

    activedId.value = item.id

    const targetTop = item.absoluteTop - containerTop
    if (scrollEl === window) {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      })
    } else {
      ;(scrollEl as HTMLElement).scrollTo({
        top: targetTop,
        behavior: 'smooth'
      })
    }
  }

  // 初始化
  const init = () => {
    scrollEl = getScrollEl(containerEl)
    updateNodeData()
    setActivedId() // 初始化激活状态
  }

  init()

  // 监听变化
  const stopHeightWatch = watchElHeight(containerEl, () => {
    updateNodeData()
    setActivedId()
  })

  // 添加滚动监听
  const scrollHandler = throttle(setActivedId, 100, {
    trailing: true
  })

  scrollEl.addEventListener('scroll', scrollHandler, { passive: true })

  // 组件卸载时清理
  onUnmounted(() => {
    stopHeightWatch()
    scrollEl.removeEventListener('scroll', scrollHandler)
    scrollHandler.cancel()
  })

  return {
    nodeTree,
    activedId,
    scrollIntoView
  }
}
