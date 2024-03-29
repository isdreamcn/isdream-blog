import { definePropType, buildProps } from '@/utils'

interface MenuListItem {
  id: number
  label: string
  children?: MenuListItem[]
}

export const subMenuProps = buildProps({
  menuList: {
    type: definePropType<MenuListItem[]>(Array),
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

export const subMenuEmits = {
  click: (e: any) => true || e
}
