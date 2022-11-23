<template>
  <div class="search">
    <div class="blogLayout-header">
      <MImgDefault>
        <div class="blogLayout-header-title">
          <h1>搜索</h1>
          <p>包含{{ title }}的文章</p>
        </div>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <article class="search-article-item">
        <!-- <div class="item-statistics">123456</div> -->
        <div class="item-cover">
          <MImgDefault></MImgDefault>
        </div>
        <div class="item-info">
          <div class="item-info__header">
            <h2 class="m-ellipsis">
              <a @click="showArticle(1)"> 测试标题1 </a>
            </h2>
            <time>2022-11-23</time>
          </div>
          <div class="item-info__desc">测试测试测试测试测</div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

defineOptions({
  name: 'Search'
})

const route = useRoute()
const query = route.query
const q = ref(query.q)

const title = computed(() => {
  const { q, tagName } = query
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
</script>

<style lang="scss" scoped>
.search {
  .blogLayout-header-title {
    text-align: center;
    h1 {
      font-size: 100%;
    }
    p {
      font-size: 1.5rem;
    }
  }

  .search-article-item {
    position: relative;
    display: flex;
    padding: 2.5rem 0;
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
      margin-right: 1rem;
      border-radius: 50%;
      padding: 0.1rem;
      border: var(--m-border);
      .m-img {
        width: 5.5rem;
        height: 5.5rem;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .item-info {
      flex: 1;
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
      }
    }
  }
  .q {
    color: var(--el-color-primary);
  }
}
</style>
