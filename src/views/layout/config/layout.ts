import type { Component } from 'vue'
import type { AppSettingPartial } from '@/store/index'
import mainLayout from '../mainLayout/mainLayout.vue'
import topMenuLayout from '../topMenuLayout/topMenuLayout.vue'
import blogLayout from '../blogLayout/blogLayout.vue'

export interface LayoutFunctionItem {
  label: string
  appSettingKey: string
  default?: boolean
}

export interface LayoutMapItem {
  componnet: Component
  label: string
  appSetting: AppSettingPartial
  functions: LayoutFunctionItem[]
}

export type LayoutKeys = 'blogLayout' | 'mainLayout' | 'topMenuLayout'

export interface layoutOption {
  label: string
  value: LayoutKeys
}

export const layoutMap = new Map<LayoutKeys, LayoutMapItem>([
  [
    'blogLayout',
    {
      componnet: blogLayout,
      label: '博客布局',
      appSetting: {},
      functions: []
    }
  ],
  [
    'mainLayout',
    {
      componnet: mainLayout,
      label: '左侧菜单',
      appSetting: {
        menu: {
          mode: 'vertical'
        }
      },
      functions: [
        {
          label: '折叠菜单',
          appSettingKey: 'menu.collapsed'
        },
        {
          label: 'logo',
          appSettingKey: 'showLogo'
        },
        {
          label: '面包屑',
          appSettingKey: 'breadcrumb.show'
        },
        {
          label: '面包屑图标',
          appSettingKey: 'breadcrumb.icon'
        },
        {
          label: '标签页',
          appSettingKey: 'routeHistory.show'
        },
        {
          label: '标签页按钮',
          appSettingKey: 'routeHistory.actions'
        },
        {
          label: '页脚',
          appSettingKey: 'footer.show'
        }
      ]
    }
  ],
  [
    'topMenuLayout',
    {
      componnet: topMenuLayout,
      label: '顶部菜单',
      appSetting: {
        menu: {
          mode: 'horizontal',
          collapsed: false
        }
      },
      functions: [
        {
          label: 'logo',
          appSettingKey: 'showLogo'
        },
        {
          label: '面包屑',
          appSettingKey: 'breadcrumb.show'
        },
        {
          label: '面包屑图标',
          appSettingKey: 'breadcrumb.icon'
        },
        {
          label: '标签页',
          appSettingKey: 'routeHistory.show'
        },
        {
          label: '标签页按钮',
          appSettingKey: 'routeHistory.actions'
        },
        {
          label: '页脚',
          appSettingKey: 'footer.show'
        }
      ]
    }
  ]
])

export const layoutOptions: layoutOption[] = []
layoutMap.forEach((item, key) => {
  layoutOptions.push({
    label: item.label,
    value: key
  })
})

export const getLayout = (key: LayoutKeys) => {
  return layoutMap.get(key)!
}
