<template>
  <div class="m-search">
    <span @click="showDialog" class="show-dialog">
      <MIcon name="icon-search"></MIcon>
      搜索
    </span>

    <div v-show="visible" class="m-search-dialog">
      <MIcon
        @click="closeDialog"
        class="m-search-dialog-close"
        name="icon-close"
      ></MIcon>

      <div class="blogLayout-card m-search__content">
        <div class="m-search-form">
          <p>想要找点什么呢？</p>
          <div class="m-search-input">
            <MIcon name="icon-search"></MIcon>
            <input
              type="search"
              placeholder="Search"
              @keyup.enter="
                (e) =>
                  goPage({
                    q: e.target.value
                  })
              "
            />
          </div>
        </div>
      </div>
      <div class="blogLayout-card">
        <ul class="m-search__tags">
          <li
            v-for="tag in tags"
            :key="tag.value"
            :style="{ fontSize: `${tag.fontSize}rem`, color: tag.color }"
          >
            <a
              @click="
                goPage({
                  tag: tag.value,
                  tagName: tag.label
                })
              "
              >{{ tag.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from './hooks/useTagFontSize'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTagFontSize } from './hooks/useTagFontSize'

defineOptions({
  name: 'LayoutCpnSearch'
})

const tags = ref<Tag[]>([])

const data = [
  {
    label: 'vue',
    value: 1,
    count: 14,
    color: '#1abc9c'
  },
  {
    label: 'javaScript',
    value: 2,
    count: 15,
    color: '#e67e22'
  },
  {
    label: '算法',
    value: 3,
    count: 10,
    color: '#9b59b6'
  }
]

tags.value = useTagFontSize(data, 1.5, 0.9)

// 弹框
const visible = ref(false)
const showDialog = () => {
  visible.value = true
}
const closeDialog = () => {
  visible.value = false
}

// 显示搜索内容
const router = useRouter()
const goPage = (query = {}) => {
  closeDialog()
  router.push({
    name: 'search',
    query
  })
}
</script>

<style lang="scss" scoped>
.m-search {
  .show-dialog {
    display: flex;
    align-items: center;
  }

  .m-icon {
    margin-right: 0.3rem;
  }
  .m-search-dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--m-card-bg-color);
    color: var(--m-font-color);
    &-close {
      position: fixed;
      right: 1rem;
      top: 1rem;
      z-index: 5;
      font-size: 2rem;
    }
    .m-search__content {
      border: none;
      box-shadow: none;
      padding-bottom: 0;
      margin-bottom: 0;
      .m-search-form {
        width: min(35rem, 100%);
        margin: 0 auto;
        p {
          padding-left: 1rem;
        }
      }
      .m-search-input {
        position: relative;
        .m-icon {
          position: absolute;
          font-size: 2rem;
          top: 50%;
          left: 1rem;
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          font-size: 1.5rem;
          border: var(--m-border);
          border-radius: 1.5rem;
          padding: 0.5rem 1rem 0.5rem 3.5rem;
          transition: var(--animate-duration);
          &:focus {
            outline: none;
            border-color: var(--el-color-primary);
          }
        }
      }
    }

    .m-search__tags {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      align-items: center;
      li {
        list-style: none;
        margin: 0.5rem;
        transition: var(--animate-duration);
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
