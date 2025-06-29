<template>
  <div class="m-outline">
    <SubOutline
      :nodeTree="nodeTree"
      :activedId="activedId"
      @click="scrollIntoView"
    ></SubOutline>
  </div>
</template>

<script setup lang="ts">
import { outlineProps } from './outline'
import { useNodeData } from './hooks'
import SubOutline from './subOutline.vue'

defineOptions({
  name: 'MOutline'
})

const props = defineProps(outlineProps)

const { nodeTree, activedId, scrollIntoView } = useNodeData(props.containerEl, {
  startLevel: props.startLevel,
  endLevel: props.endLevel
})
</script>

<style lang="scss" scoped>
.m-outline {
  box-sizing: border-box;
  width: 2.7rem;
  height: 4rem;
  overflow-y: auto;
  // transition: var(--animate-duration);
}
</style>
