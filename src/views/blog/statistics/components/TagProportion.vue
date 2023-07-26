<template>
  <div class="tag-proportion">
    <MChart :options="options"></MChart>
  </div>
</template>

<script setup lang="ts">
import type { ChartOptions } from '@/components'
import { ref } from 'vue'
import { getArticleTags } from '@/api/blog/articleTag'

const options = ref<ChartOptions>({})
getArticleTags().then(({ data }) => {
  const sum = data.reduce((pre, item) => pre + item.articleCount, 0)

  options.value = {
    tooltip: {
      trigger: 'item',
      formatter: (param) => {
        const { marker, name, value } = param as any
        const percent = sum ? ((value / sum) * 100).toFixed(2) : 0

        let result = `<div>${marker}${name}</div>`
        result += `<div>关联文章数：${value}</div>`
        result += `<div>所占百分比：${percent}%</div>`
        return result
      }
    },
    legend: {
      bottom: '0%',
      left: 'center',
      textStyle: {
        fontSize: '0.13rem'
      }
    },
    series: [
      {
        name: '标签占比',
        type: 'pie',
        radius: ['40%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '0.16rem',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        color: data.map((v) => v.color),
        data: data.map((item) => ({
          value: item.articleCount,
          name: item.title
        }))
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.tag-proportion {
  height: 3.2rem;
}
</style>
