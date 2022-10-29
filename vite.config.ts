import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import path from 'path'

import { wrapperLoadEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins'
const pathResolve = (dir: string) => {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root) as LoadViteEnv
  const viteEnv = wrapperLoadEnv(env)
  const isBuild = command === 'build'

  return {
    base: '/',
    server: {
      host: '0.0.0.0',
      proxy: !viteEnv.VITE_USE_MOCK
        ? {
            '^/api/.*': {
              target: viteEnv.VITE_BASE_URL_API,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
        : {}
    },
    build: {
      chunkSizeWarningLimit: 10 * 1024
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '#': pathResolve('typings'),
        '~': pathResolve('./')
      }
    },
    // 编译所有应用 scss 变量的组件
    css: {
      preprocessorOptions: {
        scss: {
          // 修改element变量、全局导入scss变量
          additionalData: `
            @use "@/assets/styles/element.scss" as *;
            @use "@/assets/styles/variables.scss" as *;
            @use "@/assets/styles/mxins.scss" as *;
          `
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
