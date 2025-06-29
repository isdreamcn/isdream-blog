import { definePropType, buildProps } from '@/utils'

interface NodeItem {
  id: number
  label: string
  children?: NodeItem[]
}

export const subOutlineProps = buildProps({
  nodeTree: {
    type: definePropType<NodeItem[]>(Array),
    default: () => []
  },
  activedId: {
    type: Number
  },
  level: {
    type: Number,
    default: 1
  }
} as const)

export const subOutlineEmits = {
  click: (e: any) => true || e
}
