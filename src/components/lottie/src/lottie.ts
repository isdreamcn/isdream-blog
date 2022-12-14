import { buildProps, definePropType } from '@/utils'

import type { ExtractPropTypes } from 'vue'
import { AnimationItem, AnimationConfig } from 'lottie-web'
import type Lottie from './lottie.vue'

export const lottieProps = buildProps({
  config: {
    type: definePropType<AnimationConfig>(Object),
    default: () => {}
  },
  width: Number,
  height: Number,
  data: {
    type: Object,
    required: true
  }
} as const)

export const lottieEmits = {
  created: (anim: AnimationItem) => anim
}

export type LottieProps = ExtractPropTypes<typeof lottieProps>
export type LottieEmits = typeof lottieEmits

export type LottieInstance = InstanceType<typeof Lottie>
