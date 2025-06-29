import type { ExtractPropTypes } from 'vue'
import type Outline from './outline.vue'
import { buildProps } from '@/utils'

export const outlineProps = buildProps({
  containerEl: {
    type: HTMLElement,
    required: true
  },
  startLevel: {
    type: Number,
    default: 2
  },
  endLevel: {
    type: Number,
    default: 4
  }
} as const)

export const outlineEmits = {}

export type OutlineProps = ExtractPropTypes<typeof outlineProps>
export type OutlineEmits = typeof outlineEmits

export type OutlineInstance = InstanceType<typeof Outline>
