<template>
  <div class="article-monthly">
    <MChart :options="options"></MChart>
  </div>
</template>

<script setup lang="ts">
import type { ChartOptions } from '@/components'
import { ref } from 'vue'

const options = ref<ChartOptions>({
  animationDuration: 7000,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
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
      data: [100, 932, 101, 634, 10, 1, 15],
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
      data: [82, 93, 91, 93, 129, 130, 120],
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
})
</script>

<style lang="scss" scoped>
.article-monthly {
  height: 30rem;
}
</style>
