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
                (e: any) =>
                  goPage({
                    q: e?.target?.value
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
            :key="tag.id"
            :style="{ fontSize: `${tag.fontSize}rem`, color: tag.color }"
          >
            <a
              @click="
                goPage({
                  tag: tag.id,
                  tagName: tag.title
                })
              "
              >{{ tag.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTagFontSize } from './hooks/useTagFontSize'
import { getArticleTags, ArticleTag } from '@/api/blog/articleTag'

defineOptions({
  name: 'LayoutCpnSearch'
})

const tags = ref<(ArticleTag & { fontSize: number })[]>([])
getArticleTags().then((res) => {
  tags.value = useTagFontSize(
    res.data.map((v) => ({
      ...v,
      count: v.articleCount
    })),
    0.24,
    0.16
  )
})

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
const route = useRoute()
const goPage = (query = {}) => {
  closeDialog()
  if (route.name === 'search') {
    router.push('/').then(() =>
      router.replace({
        name: 'search',
        query
      })
    )
  } else {
    router.push({
      name: 'search',
      query
    })
  }
}
</script>

<style lang="scss" scoped>
.m-search {
  .show-dialog {
    display: flex;
    align-items: center;
  }

  .m-icon {
    margin-right: 0.05rem;
  }
  .m-search-dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--m-card-bg-color);
    color: var(--m-font-color);
    z-index: 95;
    &-close {
      position: fixed;
      right: 0.16rem;
      top: 0.16rem;
      z-index: 5;
      font-size: 0.32rem;
    }
    .m-search__content {
      border: none;
      box-shadow: none;
      padding: 0.5rem 0.16rem 0.16rem 0.16rem;
      margin-bottom: 0;
      .m-search-form {
        width: min(5.6rem, 100%);
        margin: 0 auto;
        p {
          padding-left: 0.16rem;
        }
      }
      .m-search-input {
        position: relative;
        .m-icon {
          position: absolute;
          font-size: 0.32rem;
          top: 50%;
          left: 0.16rem;
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          font-size: 0.24rem;
          border: var(--m-border);
          border-radius: 0.24rem;
          padding: 0.08rem 0.16rem 0.08rem 0.55rem;
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
        margin: 0.08rem;
        transition: var(--animate-duration);
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
