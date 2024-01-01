import type { ExtractPropTypes } from 'vue'
import type Menu from './menu.vue'
import { buildProps } from '@/utils'

export const menuProps = buildProps({
  containerEl: {
    type: HTMLElement
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

export const menuEmits = {}

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuEmits = typeof menuEmits

export type MenuInstance = InstanceType<typeof Menu>
