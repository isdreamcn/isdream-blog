<template>
  <ul>
    <li v-for="item in menuList" :key="item.id">
      <span
        :style="spanStyle"
        :class="{ actived: activedId === item.id }"
        @click="clickItem(item)"
        >{{ item.label }}</span
      >
      <SubMenu
        v-if="Array.isArray(item.children) && item.children.length"
        :menuList="item.children"
        :activedId="activedId"
        :level="level + 1"
        @click="clickItem"
      ></SubMenu>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { subMenuProps, subMenuEmits } from './subMenu'

defineOptions({
  name: 'SubMenu'
})

const props = defineProps(subMenuProps)
const emit = defineEmits(subMenuEmits)

const spanStyle = {
  paddingLeft: `${props.level}rem`
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
    color: var(--m-font-color);
    transition: var(--animate-duration);
    cursor: pointer;
    padding: 0.25rem 0;
    border-left: 0.2rem solid #eeeeee;
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
