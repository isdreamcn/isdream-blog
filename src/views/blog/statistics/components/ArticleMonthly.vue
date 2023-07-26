<template>
  <div class="article-monthly">
    <MChart :options="options"></MChart>
  </div>
</template>

<script setup lang="ts">
import type { ChartOptions } from '@/components'
import { ref } from 'vue'
import { getTrend } from '@/api/blog/statistics'

const options = ref<ChartOptions>({})
getTrend().then(({ data }) => {
  options.value = {
    animationDuration: 7000,
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((v) => v.month)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.map((v) => v.views),
        type: 'line',
        name: '浏览',
        smooth: true,
        showSymbol: false,
        endLabel: {
          show: true,
          formatter: (params) => `${params.seriesName}: ${params.value}`
        }
      },
      {
        data: data.map((v) => v.comments),
        type: 'line',
        name: '评论',
        smooth: true,
        showSymbol: false,
        endLabel: {
          show: true,
          formatter: (params) => `${params.seriesName}: ${params.value}`
        }
      },
      {
        data: data.map((v) => v.articles),
        type: 'line',
        name: '文章发布',
        smooth: true,
        showSymbol: false,
        endLabel: {
          show: true,
          formatter: (params) => `${params.seriesName}: ${params.value}`
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.article-monthly {
  height: 4.8rem;
}
</style>
