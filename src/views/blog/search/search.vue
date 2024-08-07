<template>
  <div class="search">
    <div class="blogLayout-header">
      <MImgDefault>
        <div class="blogLayout-header-title">
          <h1>搜索</h1>
          <p>包含{{ title }}的文章，共 {{ artilces.length }} 篇</p>
        </div>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <article
        v-for="item in artilces"
        :key="item.id"
        class="search-article-item"
      >
        <div class="item-cover">
          <MImgDefault
            :src="filePathQuery(item.cover?.url, { w: 750, f: 'webp' })"
            :thumb="filePathQuery(item.cover?.url, { w: 100, f: 'webp' })"
          ></MImgDefault>
        </div>
        <div class="item-info">
          <div class="item-info__header">
            <h2 class="m-ellipsis">
              <a @click="showArticle(item.id)" v-html="item.title"></a>
            </h2>
            <time v-dateFormat>{{ item.createdAt }}</time>
          </div>
          <div class="item-info__desc" v-html="item.text"></div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { filePathQuery } from '@/utils'
import { getArticleList, Article } from '@/api/blog/article'

defineOptions({
  name: 'Search'
})

const route = useRoute()
const { q, tagName, tag } = route.query

// 文章数据
const artilces = ref<Article[]>([])
const getArtilces = () => {
  if (!tag && !q) {
    return
  }
  getArticleList({
    page: 1,
    pageSize: 999,
    tag: tag ? Number(tag) : undefined,
    q: q && String(q)
  }).then((res) => {
    const _q = q ? String(q) : ''
    artilces.value = res.data.map((v) => ({
      ...v,
      title: emphasizeQ(v.title, _q, 100),
      text: emphasizeQ(v.text, _q, 100)
    }))
  })
}

getArtilces()

const title = computed(() => {
  let _title = ' '
  if (q) {
    _title += `关键字 ${q} `
  }
  if (tagName) {
    _title += `标签-${tagName} `
  }
  return _title
})

// 查看文章详情
const router = useRouter()
const showArticle = (id: number) => {
  router.push({
    name: 'article',
    params: {
      id
    }
  })
}

// 强调q
function emphasizeQ(str: string, q: string, len: number) {
  const strLen = str.length
  const index = str.indexOf(q)

  if (!q || index === -1) {
    return len >= strLen ? str : str.substring(0, len) + '...'
  }

  // 截取位置
  const index_start = index <= 10 ? 0 : index - 10
  let index_end = index_start + len
  let str_end = ''
  if (index_end < strLen) {
    str_end = '...'
  } else {
    index_end = strLen
  }

  const _str = str.substring(index_start, index_end) + str_end
  return _str.replaceAll(q, `<span class="emphasize-q">${q}</span>`)
}
</script>

<style lang="scss" scoped>
.search {
  :deep(.emphasize-q) {
    color: var(--el-color-primary);
  }
  .blogLayout-header-title {
    text-align: center;
    h1 {
      font-size: 100%;
    }
    p {
      font-size: 0.24rem;
    }
  }

  .search-article-item {
    position: relative;
    display: flex;
    padding: 0.4rem 0;
    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      width: 50%;
      border-bottom: var(--m-border);
    }
    &:first-child {
      padding-top: 0;
    }
    .item-statistics {
      position: absolute;
    }
    .item-cover {
      flex-shrink: 0;
      width: 0.9rem;
      height: 0.9rem;
      margin-right: 0.16rem;
      border-radius: 50%;
      padding: 0.02rem;
      border: var(--m-border);
      .m-img {
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .item-info {
      flex: 1;
      min-width: 0;
      &__header {
        display: flex;
        align-items: center;
        h2 {
          flex: 1;
          a {
            cursor: pointer;
            left: 0;
            transition: var(--animate-duration);
            &:hover {
              color: var(--el-color-primary);
            }
          }
        }
        time {
          color: var(--m-font-color);
        }
      }
      &__desc {
        color: var(--m-font-color);
        word-break: break-all;
      }
    }
  }
  .q {
    color: var(--el-color-primary);
  }
}
</style>
