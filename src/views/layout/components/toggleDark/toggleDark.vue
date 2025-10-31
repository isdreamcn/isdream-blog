<template>
  <div class="toggleDark-container" ref="switchRef" @click="toggleDarkHandler">
    <m-icon name="icon-sunny" v-show="!isDark"></m-icon>
    <m-icon name="icon-moon" v-show="isDark"></m-icon>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useDark } from '@/hooks'

const { isDark, toggleDark } = useDark()
const switchRef = ref<any>()

const beforeChange = () => {
  return new Promise<boolean>((resolve) => {
    const isAppearanceTransition =
      // @ts-expect-error: Transition API
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
      resolve(true)
      return
    }

    const switchElement = switchRef.value
    const rect = switchElement.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const ratioX = (100 * x) / innerWidth
    const ratioY = (100 * y) / innerHeight
    const referR = Math.hypot(innerWidth, innerHeight) / Math.SQRT2
    const ratioR = (100 * endRadius) / referR

    const transition = document.startViewTransition(async () => {
      resolve(true)
      await nextTick()
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0% at ${ratioX}% ${ratioY}%)`,
        `circle(${ratioR}% at ${ratioX}% ${ratioY}%)`
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 400,
          easing: 'ease-in',
          fill: 'both',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      )
    })
  })
}

const toggleDarkHandler = () => {
  beforeChange().then((result) => {
    if (result) {
      toggleDark()
    }
  })
}
</script>

<style lang="scss" scoped>
.toggleDark-container {
  font-size: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
