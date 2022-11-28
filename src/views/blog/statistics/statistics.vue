<template>
  <div class="statistics">
    <div class="blogLayout-header">
      <MImgDefault>
        <div class="blogLayout-header-title">
          <h1>统计</h1>
          <p>最后更新于 2022 年 11 月 25 日</p>
        </div>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <ul class="statistics__types">
        <li>
          <p>100+</p>
          <p>浏览</p>
        </li>
        <li>
          <p>100+</p>
          <p>评论</p>
        </li>
        <li>
          <p>100+</p>
          <p>文章</p>
        </li>
        <li>
          <p>100+</p>
          <p>标签</p>
        </li>
      </ul>

      <div class="statistics-chart">
        <ArticleMonthly></ArticleMonthly>
      </div>

      <div class="statistics-chart">
        <TagProportion></TagProportion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleMonthly from './components/ArticleMonthly.vue'
import TagProportion from './components/TagProportion.vue'

defineOptions({
  name: 'Statistics'
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
      font-size: 1.5rem;
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
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 1rem;
      }
    }
  }

  .statistics-chart {
  }
}
</style>
