<template>
  <div class="statistics">
    <div class="blogLayout-header">
      <MImgDefault>
        <div class="blogLayout-header-title">
          <h1>统计</h1>
          <p>
            最后更新于
            <span
              v-if="totalData?.lastTime"
              v-dateFormat:YYYY__年__MM__月__DD__日.space
              >{{ totalData?.lastTime }}</span
            >
          </p>
        </div>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <ul class="statistics__types">
        <li>
          <p>{{ totalData?.views }}+</p>
          <p>浏览</p>
        </li>
        <li>
          <p>{{ totalData?.comments }}+</p>
          <p>评论</p>
        </li>
        <li>
          <p>{{ totalData?.articles }}+</p>
          <p>文章</p>
        </li>
        <li>
          <p>{{ totalData?.articleTags }}+</p>
          <p>标签</p>
        </li>
      </ul>

      <div class="statistics-chart">
        <ArticleMonthly></ArticleMonthly>
      </div>

      <div class="statistics-chart">
        <TagProportion></TagProportion>
      </div>
      <MComment
        v-if="articleInfo?.isCommented"
        :article="articleInfo.id"
      ></MComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleMonthly from './components/ArticleMonthly.vue'
import TagProportion from './components/TagProportion.vue'
import { getTotal, TotalData } from '@/api/blog/statistics'
import { useArticle, ArticleId } from '@/views/blog/article/hooks/useArticle'

defineOptions({
  name: 'Statistics'
})

const { articleInfo } = useArticle(ArticleId.Statistics)

const totalData = ref<TotalData>()
getTotal().then((res) => {
  totalData.value = res.data
})
</script>

<style lang="scss" scoped>
.statistics {
  .blogLayout-header-title {
    h1 {
      font-size: 100%;
      text-align: center;
    }
    p {
      font-size: 0.24rem;
    }
  }
  .statistics__types {
    display: flex;
    padding-left: 0;
    list-style-type: none;
    color: var(--m-font-color);
    li {
      flex: 1;
      text-align: center;
      p {
        font-size: 0.2rem;
        margin-top: 0;
        margin-bottom: 0.16rem;
      }
    }
  }

  .statistics-chart {
  }
}
</style>
