<template>
  <ul>
    <li v-for="item in nodeTree" :key="item.id">
      <span
        :style="spanStyle"
        :class="{ actived: activedId === item.id }"
        @click="clickItem(item)"
        >{{ item.label }}</span
      >
      <SubOutline
        v-if="Array.isArray(item.children) && item.children.length"
        :nodeTree="item.children"
        :activedId="activedId"
        :level="level + 1"
        @click="clickItem"
      ></SubOutline>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { subOutlineProps, subOutlineEmits } from './subOutline'

defineOptions({
  name: 'SubOutline'
})

const props = defineProps(subOutlineProps)
const emit = defineEmits(subOutlineEmits)

const spanStyle = {
  paddingLeft: `${props.level * 0.16}rem`
}

const clickItem = (item: any) => {
  emit('click', item)
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
  li > span {
    display: inline-block;
    color: var(--el-menu-text-color);
    transition: var(--animate-duration);
    cursor: pointer;
    padding: 0.04rem 0;
    border-left: 0.03rem solid var(--el-border-color);
    &:hover {
      color: var(--el-color-primary);
    }
    &.actived {
      color: var(--el-color-primary);
      border-left-color: var(--el-color-primary);
    }
  }
}
</style>
