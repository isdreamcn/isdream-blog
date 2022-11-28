<template>
  <div class="tag-proportion">
    <MChart :options="options"></MChart>
  </div>
</template>

<script setup lang="ts">
import type { ChartOptions } from '@/components'
import { ref } from 'vue'

const options = ref<ChartOptions>({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '0%',
    left: 'center',
    textStyle: {
      fontSize: '0.8rem'
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
          fontSize: '1rem',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped>
.tag-proportion {
  height: 20rem;
}
</style>
