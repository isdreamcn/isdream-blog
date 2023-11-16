import type { ExtractPropTypes } from 'vue'
import type { ECharts } from 'echarts/core'
import type { ECOption } from '@/plugins'
import type Chart from './chart.vue'
import { buildProps, definePropType, isNil } from '@/utils'

export const chartProps = buildProps({
  options: {
    type: definePropType<ECOption>(Object),
    required: true
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  lazy: {
    type: Boolean,
    default: false
  }
} as const)

export const chartEmits = {
  init: (chart: ECharts) => !isNil(chart)
}

export type ChartsProps = ExtractPropTypes<typeof chartProps>
export type ChartsEmits = typeof chartEmits

export type ChartOptions = ChartsProps['options']

export type ChartsInstance = InstanceType<typeof Chart>
