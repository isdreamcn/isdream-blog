<template>
  <div class="m-menu" :style="menuStyle">
    <SubMenu
      :menuList="menuList"
      :activedId="activedId"
      @click="scrollIntoView"
    ></SubMenu>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, onUnmounted, CSSProperties } from 'vue'
import { useAppLayoutEl } from '@/store'
import { menuProps } from './menu'
import { useMenuList } from './hooks'
import SubMenu from './subMenu.vue'

defineOptions({
  name: 'MMenu'
})

const props = defineProps(menuProps)

const containerEl = toRef(props, 'containerEl')

const { menuList, activedId, scrollElScrollTop, scrollIntoView, cancel } =
  useMenuList(containerEl, {
    startLevel: props.startLevel,
    endLevel: props.endLevel,
    scrollElRef: useAppLayoutEl()
  })

const menuStyle = computed(() => {
  const styles: CSSProperties = {}

  if (!scrollElScrollTop.value) {
    return styles
  }

  const offsetTop = containerEl.value?.offsetTop || 0
  if (scrollElScrollTop.value >= offsetTop) {
    styles.top = '5rem'
  } else {
    styles.top = `max(${offsetTop - scrollElScrollTop.value}px, 5rem)`
  }

  return styles
})

onUnmounted(() => {
  cancel()
})
</script>

<style lang="scss" scoped>
.m-menu {
  position: fixed;
  top: calc(40vh + 3.5rem);
  left: calc(max(750px, 50%) + 25% + 1rem);
  box-sizing: border-box;
  width: 17rem;
  opacity: 1;
  border-radius: 0.5rem;
  // transition: var(--animate-duration);
}

@media (max-width: 1600px) {
  .m-menu {
    opacity: 0;
  }
}
</style>
